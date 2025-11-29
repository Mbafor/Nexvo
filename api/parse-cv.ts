import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';
import fetch from 'node-fetch';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) return res.status(500).json({ error: 'Server API key missing' });

  const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

  try {
    const { text, url } = req.body || {};
    let inputText = '';

    // Fetch text from URL if provided
    if (url) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const fetched = await fetch(url, {
        headers: { 'User-Agent': 'CVParser/1.0' },
        signal: controller.signal as any,
      });

      clearTimeout(timeoutId);

      if (!fetched.ok) return res.status(400).json({ error: 'Failed to fetch URL' });

      const html = await fetched.text();
      inputText = html.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
                      .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
                      .replace(/<[^>]+>/g, ' ')
                      .replace(/\s{2,}/g, ' ')
                      .trim();
    } else {
      inputText = text?.trim();
    }

    if (!inputText || inputText.length < 50) {
      return res.status(400).json({ error: 'Text too short' });
    }

    // Use OpenAI to parse the CV
    const prompt = `Extract CV information from the following text and return ONLY valid JSON:
{
  "personalInfo": { "fullName": "", "email": "", "phone": "", "location": "", "linkedin": "", "website": "", "summary": "" },
  "education": [],
  "experience": [],
  "skills": [],
  "projects": [],
  "volunteerWork": [],
  "achievements": [],
  "references": [],
  "languages": [],
  "certifications": [],
  "hobbies": []
}

Text:
${inputText}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.1,
      max_tokens: 3000,
    });

    let rawText = completion.choices[0].message?.content || '';
    rawText = rawText.replace(/```json|```/g, '').trim();

    const firstBrace = rawText.indexOf('{');
    const lastBrace = rawText.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      rawText = rawText.slice(firstBrace, lastBrace + 1);
    }

    const parsed = JSON.parse(rawText);
    ['education', 'experience', 'skills', 'projects', 'volunteerWork', 'achievements', 'references', 'languages', 'certifications', 'hobbies'].forEach(k => {
      if (!parsed[k]) parsed[k] = [];
    });

    return res.status(200).json({ parsed });

  } catch (error: any) {
    console.error('Parse error:', error);
    return res.status(500).json({ error: error.message });
  }
}
