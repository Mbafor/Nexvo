import OpenAI from 'openai';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const OPENAI_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_KEY) return res.status(500).json({ error: 'Server misconfiguration: OPENAI_API_KEY is missing' });

  try {
    const { text, context } = req.body || {};
    if (!text || !text.trim()) return res.status(400).json({ error: 'Missing text in request body' });

    const client = new OpenAI({ apiKey: OPENAI_KEY });

    const system = `You are a professional CV writer. Rewrite the given text to make it more professional, impactful, and concise. Keep the same meaning but improve the wording and structure. Only return the rewritten text without any explanation.`;

    const user = `Context: ${context || 'professional'}\n\nText to rewrite:\n${text}`;

    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      temperature: 0.7,
      max_tokens: 1024,
    });

    const rewritten = response.choices?.[0]?.message?.content || '';

    return res.status(200).json({ rewritten });
  } catch (error: any) {
    console.error('rewrite error:', error);
    const status = error?.status || 500;
    return res.status(status).json({ error: error?.message || 'Unknown error' });
  }
}
