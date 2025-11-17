import { CVData } from '../types/cv';

export async function parseTextToCV(text: string): Promise<Partial<CVData>> {
  // Call server-side endpoint to keep API key secret
  const res = await fetch('/api/parse-cv', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || 'Parsing failed');
  }

  const { parsed } = await res.json();
  return parsed as Partial<CVData>;
}
