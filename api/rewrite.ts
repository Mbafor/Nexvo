import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) return res.status(500).json({ error: 'Server API key missing' });

  const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

  try {
    const { text, context = 'general' } = req.body || {};
    if (!text || !text.trim()) return res.status(400).json({ error: 'Text required' });

    const prompts: Record<string, string> = {
      summary: "Rewrite this professional summary to be compelling and impactful:",
      experience: "Rewrite this work experience to be achievement-focused using action verbs:",
      general: "Rewrite this text to be professional for a CV:",
    };

    const contextPrompt = prompts[context] || prompts.general;
    const fullPrompt = `${contextPrompt}\n\n"${text}"\n\nReturn ONLY the improved text, no quotes or explanations.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: fullPrompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const rewrittenText = completion.choices[0].message?.content?.trim() || '';

    return res.status(200).json({ rewritten: rewrittenText });

  } catch (error: any) {
    console.error('Rewrite error:', error);
    return res.status(500).json({ error: error.message || 'Failed to rewrite text' });
  }
}
