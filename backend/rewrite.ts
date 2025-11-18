import OpenAI from 'openai';

export default async function handler(req: any, res: any) {
  // Enhanced CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
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
    const { text, context } = req.body || {};

    console.log('Rewrite request received:', { textLength: text?.length, context });

    // Enhanced input validation
    if (!text || typeof text !== 'string' || !text.trim()) {
      console.error('Invalid text input:', { text: typeof text, hasText: !!text });
      return res.status(400).json({ error: 'Missing or invalid text to rewrite' });
    }
    
    if (text.length > 5000) {
      return res.status(400).json({ error: 'Text is too long (max 5000 characters)' });
    }
    
    if (text.length < 10) {
      return res.status(400).json({ error: 'Text is too short to rewrite meaningfully' });
    }

    const client = new OpenAI({ apiKey: OPENAI_KEY });
    console.log('OpenAI client created successfully');

    // Enhanced system prompt based on context
    const getSystemPrompt = (contextType: string): string => {
      const basePrompt = `You are an expert CV/Resume writer and career coach. Your goal is to rewrite text to be professional, impactful, and ATS-friendly.`;
      
      // Use explicit switch for better reliability
      switch (contextType) {
        case 'experience':
          return `${basePrompt} Focus on:
- Use strong action verbs (Led, Developed, Implemented, Achieved)
- Quantify results with numbers, percentages, or metrics where possible
- Highlight accomplishments, not just responsibilities
- Keep bullet points concise but impactful
- Use present tense for current roles, past tense for previous roles`;
        
        case 'summary':
          return `${basePrompt} Focus on:
- Create a compelling professional summary
- Highlight key skills and years of experience
- Mention specific achievements or areas of expertise
- Keep it 2-3 sentences, professional but engaging
- Use industry-relevant keywords`;
        
        case 'skills':
          return `${basePrompt} Focus on:
- Present skills in a clear, professional manner
- Group related skills together
- Use industry-standard terminology
- Be specific rather than vague`;
        
        case 'education':
          return `${basePrompt} Focus on:
- Present educational background professionally
- Include relevant coursework, honors, or achievements
- Use proper institutional names and degree titles`;
        
        case 'projects':
          return `${basePrompt} Focus on:
- Describe projects with clear outcomes and impact
- Mention technologies, methodologies, or skills used
- Quantify results where possible
- Show problem-solving and technical capabilities`;
        
        default:
          return `${basePrompt} Make the text:
- Professional and polished
- Clear and concise
- Action-oriented with strong verbs
- Free of grammatical errors
- Appropriate for a professional resume/CV`;
      }
    };

    const systemPrompt = getSystemPrompt(context || 'default');
    const userContent = `Please rewrite this ${context || 'professional'} content to be more impactful and professional:\n\n"${text}"\n\nReturn ONLY the rewritten text, no explanations or quotes.`;

    console.log(`Rewriting ${context || 'default'} content: ${text.substring(0, 100)}...`);
    console.log('System prompt length:', systemPrompt.length);

    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userContent },
      ],
      temperature: 0.7, // Good balance of creativity and consistency
      max_tokens: 800, // Increased for longer content
      presence_penalty: 0.1, // Slight penalty to avoid repetition
      frequency_penalty: 0.1, // Encourage varied language
    });

    console.log('OpenAI response received, processing...');

    let rewritten = response.choices?.[0]?.message?.content || '';
    
    // Enhanced cleaning
    rewritten = rewritten
      .trim()
      .replace(/^["'`]|["'`]$/g, '') // Remove surrounding quotes
      .replace(/^(Here's the rewritten|Here is the rewritten|Rewritten).*?:/i, '') // Remove AI prefixes
      .trim();

    // Fallback if rewrite failed
    if (!rewritten || rewritten.length < 5) {
      console.warn('AI returned empty or very short rewrite, using original');
      return res.status(200).json({ rewritten: text });
    }

    console.log(`Successfully rewrote content: ${rewritten.substring(0, 100)}...`);
    return res.status(200).json({ rewritten });
    
  } catch (err: any) {
    console.error('AI rewrite error details:', {
      name: err.name,
      message: err.message,
      type: err.type,
      code: err.code,
      status: err.status,
      stack: err.stack
    });
    
    // Enhanced error handling
    if (err.name === 'OpenAIError' || err.type === 'insufficient_quota' || err.status === 429) {
      return res.status(429).json({ 
        error: 'AI service temporarily unavailable. Please try again in a few minutes.',
        type: 'rate_limit'
      });
    }
    
    if (err.code === 'context_length_exceeded') {
      return res.status(400).json({ 
        error: 'Text is too long for processing. Please shorten it and try again.',
        type: 'content_too_long'
      });
    }

    if (err.status === 401 || err.code === 'invalid_api_key') {
      return res.status(500).json({ 
        error: 'AI service configuration error. Please contact support.',
        type: 'auth_error'
      });
    }
    
    return res.status(500).json({ 
      error: err?.message || 'Failed to rewrite text. Please try again.',
      type: 'server_error',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
}