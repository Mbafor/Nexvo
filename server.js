import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// CV Parse endpoint
app.post('/api/parse-cv', async (req, res) => {
  try {
    const { text, url } = req.body || {};

    let inputText = '';
    if (url) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);
        
        const fetched = await fetch(url, { 
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; CVParser/1.0)',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
          },
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        if (!fetched.ok) {
          return res.status(400).json({ error: `Failed to fetch URL: ${fetched.status}` });
        }
        const html = await fetched.text();
        
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
      } catch (fetchError) {
        return res.status(400).json({ error: 'Failed to fetch URL' });
      }
    } else if (text) {
      inputText = text.trim();
    } else {
      return res.status(400).json({ error: 'Missing text or url' });
    }

    if (!inputText || inputText.length < 20) {
      return res.status(400).json({ error: 'Text content is too short' });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Extract CV information and return ONLY valid JSON:
{
  "personalInfo": {"fullName": "", "email": "", "phone": "", "location": "", "linkedin": "", "website": "", "summary": "", "photo": ""},
  "education": [{"id": "", "institution": "", "degree": "", "field": "", "startDate": "YYYY-MM", "endDate": "YYYY-MM", "current": false, "description": "", "graduationDate": "", "gpa": ""}],
  "experience": [{"id": "", "company": "", "position": "", "jobTitle": "", "location": "", "startDate": "YYYY-MM", "endDate": "YYYY-MM", "current": false, "description": ""}],
  "skills": [{"id": "", "name": "", "level": "beginner|intermediate|advanced|expert", "type": "technical|soft"}],
  "projects": [{"id": "", "name": "", "description": "", "technologies": "", "link": "", "url": "", "startDate": "YYYY-MM", "endDate": "YYYY-MM"}],
  "volunteerWork": [{"id": "", "organization": "", "role": "", "startDate": "YYYY-MM", "endDate": "YYYY-MM", "current": false, "description": ""}],
  "achievements": [{"id": "", "title": "", "description": "", "date": "YYYY-MM"}],
  "references": [{"id": "", "name": "", "position": "", "company": "", "email": "", "phone": ""}],
  "languages": [{"id": "", "name": "", "language": "", "level": "Beginner|Intermediate|Advanced|Fluent|Native", "proficiency": ""}],
  "certifications": [],
  "hobbies": []
}`
        },
        { role: 'user', content: `Extract CV info from:\n\n${inputText}` }
      ],
      temperature: 0.1,
      max_tokens: 6000
    });

    let raw = response.choices[0].message.content.trim();
    let jsonText = raw;
    
    if (jsonText.includes('```')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '').replace(/```/g, '');
    }
    
    const firstBrace = jsonText.indexOf('{');
    const lastBrace = jsonText.lastIndexOf('}');
    
    if (firstBrace !== -1 && lastBrace !== -1) {
      jsonText = jsonText.slice(firstBrace, lastBrace + 1);
    }

    const parsed = JSON.parse(jsonText);
    
    const requiredArrays = ['education', 'experience', 'skills', 'projects', 'volunteerWork', 'achievements', 'references', 'languages', 'certifications', 'hobbies'];
    requiredArrays.forEach(field => {
      if (!Array.isArray(parsed[field])) {
        parsed[field] = [];
      }
    });

    res.json({ parsed });

  } catch (error) {
    console.error('Parse error:', error);
    res.status(500).json({ error: 'Failed to parse CV content' });
  }
});

// Rewrite endpoint
app.post('/api/rewrite', async (req, res) => {
  try {
    const { text, context = 'general' } = req.body || {};

    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const prompts = {
      summary: 'Rewrite this professional summary to be more compelling and impactful. Use strong action words:',
      experience: 'Rewrite this work experience to be more achievement-focused with strong action verbs:',
      general: 'Rewrite this text to be more professional and impactful for a CV:'
    };

    const systemPrompt = prompts[context] || prompts.general;
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Improve this text:\n\n"${text}"\n\nReturn only the improved text.` }
      ],
      temperature: 0.5,
      max_tokens: 500
    });

    const rewrittenText = response.choices[0].message.content.trim()
      .replace(/^["']+|["']+$/g, ''); // Remove surrounding quotes
    res.json({ rewritten: rewrittenText });

  } catch (error) {
    console.error('Rewrite error:', error);
    res.status(500).json({ error: 'Failed to rewrite text' });
  }
});

app.listen(PORT, () => {
  console.log(' Local AI API server running on http://localhost:3001');
  console.log('Available endpoints:');
  console.log('  POST /api/parse-cv - CV parsing and LinkedIn import');
  console.log('  POST /api/rewrite - AI text enhancement');
});
