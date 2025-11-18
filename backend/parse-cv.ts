import OpenAI from 'openai';

export default async function handler(req: any, res: any) {
  // Handle CORS for development
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const OPENAI_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_KEY) {
    return res.status(500).json({ error: 'Server misconfiguration: OPENAI_API_KEY is missing' });
  }

  try {
    const { text, url } = req.body || {};

    let inputText = '';
    if (url) {
      try {
        // Enhanced URL fetching with proper headers and timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const fetched = await fetch(url, { 
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; CVParser/1.0)'
          },
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        if (!fetched.ok) {
          return res.status(400).json({ error: `Failed to fetch URL: ${fetched.status}` });
        }
        const html = await fetched.text();
        
        // Enhanced HTML cleaning
        inputText = html
          .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
          .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
          .replace(/<nav[\s\S]*?>[\s\S]*?<\/nav>/gi, '')
          .replace(/<header[\s\S]*?>[\s\S]*?<\/header>/gi, '')
          .replace(/<footer[\s\S]*?>[\s\S]*?<\/footer>/gi, '')
          .replace(/<[^>]+>/g, ' ')
          .replace(/\s{2,}/g, ' ')
          .replace(/&[^;]+;/g, ' ')
          .trim();
      } catch (fetchError: any) {
        if (fetchError.name === 'AbortError') {
          return res.status(400).json({ error: 'URL request timed out - please try a different URL' });
        }
        return res.status(400).json({ error: 'Failed to fetch URL - please ensure it\'s publicly accessible' });
      }
    } else if (text) {
      inputText = text.trim();
    } else {
      return res.status(400).json({ error: 'Missing text or url in request body' });
    }

    if (!inputText || inputText.length < 50) {
      return res.status(400).json({ error: 'Text content is too short to parse meaningfully' });
    }

    if (inputText.length > 75000) {
      return res.status(400).json({ error: 'Text content is too long (max 75,000 characters)' });
    }

    const client = new OpenAI({ apiKey: OPENAI_KEY });

    // Updated schema to match TypeScript types exactly
    const system = `You are an expert CV/Resume data extractor. Extract information from unstructured text and return ONLY valid JSON matching this exact schema:

{
  "personalInfo": {
    "fullName": "string",
    "email": "string",
    "phone": "string",
    "location": "string",
    "linkedin": "string (optional)",
    "website": "string (optional)",
    "summary": "string (optional)",
    "photo": "string (optional)"
  },
  "education": [
    {
      "id": "string (generate unique ID)",
      "institution": "string",
      "degree": "string",
      "field": "string",
      "startDate": "YYYY-MM format",
      "endDate": "YYYY-MM format or empty if current",
      "current": boolean,
      "description": "string (optional)"
    }
  ],
  "experience": [
    {
      "id": "string (generate unique ID)",
      "company": "string",
      "position": "string",
      "location": "string",
      "startDate": "YYYY-MM format",
      "endDate": "YYYY-MM format or empty if current",
      "current": boolean,
      "description": "string"
    }
  ],
  "skills": [
    {
      "id": "string (generate unique ID)",
      "name": "string",
      "level": "beginner|intermediate|advanced|expert",
      "type": "technical|soft"
    }
  ],
  "projects": [
    {
      "id": "string (generate unique ID)",
      "name": "string",
      "description": "string",
      "technologies": "string (comma-separated)",
      "link": "string (optional)",
      "startDate": "YYYY-MM format",
      "endDate": "YYYY-MM format"
    }
  ],
  "volunteerWork": [
    {
      "id": "string (generate unique ID)",
      "organization": "string",
      "role": "string",
      "startDate": "YYYY-MM format",
      "endDate": "YYYY-MM format or empty if current",
      "current": boolean,
      "description": "string"
    }
  ],
  "achievements": [
    {
      "id": "string (generate unique ID)",
      "title": "string",
      "description": "string",
      "date": "YYYY-MM format"
    }
  ],
  "references": [
    {
      "id": "string (generate unique ID)",
      "name": "string",
      "position": "string",
      "company": "string",
      "email": "string",
      "phone": "string"
    }
  ],
  "languages": [
    {
      "id": "string (generate unique ID)",
      "name": "string",
      "level": "Beginner|Intermediate|Advanced|Fluent|Native"
    }
  ],
  "certifications": ["string array"],
  "hobbies": ["string array"]
}

IMPORTANT RULES:
1. Return ONLY the JSON object, no markdown or explanations
2. All IDs should be unique (use format: section_1, section_2, etc.)
3. If information is missing, use empty string "" or empty array []
4. Dates must be YYYY-MM format
5. Boolean fields must be true/false
6. Skills should be categorized as "technical" or "soft"
7. Extract as much relevant information as possible`;

    const user = `Extract CV information from this content:\n\n${inputText}`;

    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini', // Updated to better model
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      temperature: 0.1, // Low temperature for consistent parsing
      max_tokens: 2500, // Increased for comprehensive parsing
    });

    const raw = response.choices?.[0]?.message?.content || '';
    console.log('AI Raw Response:', raw.substring(0, 200) + '...');

    // Enhanced JSON extraction
    let jsonText = raw.trim();
    
    // Remove markdown code blocks if present
    if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?$/g, '');
    }
    
    // Find JSON object boundaries
    const firstBrace = jsonText.indexOf('{');
    const lastBrace = jsonText.lastIndexOf('}');
    
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      jsonText = jsonText.slice(firstBrace, lastBrace + 1);
    }

    let parsed: any;
    try {
      parsed = JSON.parse(jsonText);
      
      // Validate required structure
      if (!parsed.personalInfo || typeof parsed.personalInfo !== 'object') {
        throw new Error('Invalid personalInfo structure');
      }
      
      // Ensure arrays exist
      const requiredArrays = ['education', 'experience', 'skills', 'projects', 'volunteerWork', 'achievements', 'references'];
      requiredArrays.forEach((field: string) => {
        if (!Array.isArray(parsed[field])) {
          parsed[field] = [];
        }
      });
      
      // Ensure optional arrays exist
      if (!Array.isArray(parsed.languages)) parsed.languages = [];
      if (!Array.isArray(parsed.certifications)) parsed.certifications = [];
      if (!Array.isArray(parsed.hobbies)) parsed.hobbies = [];
      
      console.log('Successfully parsed CV data:', {
        personalInfo: !!parsed.personalInfo.fullName,
        education: parsed.education.length,
        experience: parsed.experience.length,
        skills: parsed.skills.length
      });
      
    } catch (parseError: any) {
      console.error('JSON Parse Error:', parseError);
      console.error('Raw AI Output:', raw);
      return res.status(500).json({ 
        error: 'Failed to parse AI output as valid JSON', 
        details: parseError?.message || 'Unknown parsing error',
        raw: raw.substring(0, 500) + '...' 
      });
    }

    return res.status(200).json({ parsed });
    
  } catch (error: any) {
    console.error('CV parse-cv error:', error);
    
    // Enhanced error response
    if (error.name === 'OpenAIError' || error.type === 'insufficient_quota') {
      return res.status(429).json({ 
        error: 'AI service temporarily unavailable. Please try again in a few minutes.',
        type: 'rate_limit'
      });
    }
    
    return res.status(500).json({ 
      error: error?.message || 'Failed to parse CV content',
      type: 'server_error'
    });
  }
}