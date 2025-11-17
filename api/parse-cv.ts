import OpenAI from 'openai';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const OPENAI_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_KEY) return res.status(500).json({ error: 'Server misconfiguration: OPENAI_API_KEY is missing' });

  try {
    const { text, url } = req.body || {};

    let inputText = '';
    if (url) {
      // Fetch the URL server-side to avoid CORS and allow scraping
      const fetched = await fetch(url, { method: 'GET' });
      if (!fetched.ok) return res.status(400).json({ error: 'Failed to fetch URL' });
      const html = await fetched.text();
      // Very small/html-to-text fallback: strip tags
      inputText = html.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
                      .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
                      .replace(/<[^>]+>/g, ' ')
                      .replace(/\s{2,}/g, ' ')
                      .trim();
    } else if (text) {
      inputText = text;
    } else {
      return res.status(400).json({ error: 'Missing text or url in request body' });
    }

    const client = new OpenAI({ apiKey: OPENAI_KEY });

    const system = `You are a data extractor. Receive an unstructured CV or LinkedIn text and output strictly valid JSON matching this schema: {
  personalInfo: { fullName, email, phone, location, linkedin, website, summary },
  education: [ { institution, degree, field, startDate, endDate, current, description } ],
  experience: [ { company, position, location, startDate, endDate, current, description } ],
  volunteerWork: [],
  skills: [],
  projects: [],
  achievements: [],
  references: []
}
Only return parsable JSON. If a field is unknown, use empty string or empty array. Dates should be ISO (YYYY-MM) where possible.`;

    const user = `Parse the following content into the JSON schema. Content: ${inputText}`;

    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      temperature: 0.0,
      max_tokens: 1500,
    });

    const raw = response.choices?.[0]?.message?.content || '';

    // Extract JSON from model output
    const first = raw.indexOf('{');
    const last = raw.lastIndexOf('}');
    const jsonText = first !== -1 && last !== -1 ? raw.slice(first, last + 1) : raw;

    let parsed;
    try {
      parsed = JSON.parse(jsonText);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to parse AI output as JSON', raw });
    }

    return res.status(200).json({ parsed });
  } catch (error: any) {
    console.error('parse-cv error:', error);
    return res.status(500).json({ error: error?.message || 'Unknown error' });
  }
}
