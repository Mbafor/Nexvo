// utils/aiRewrite.ts

// We keep this one because we use it to type the response data
interface RewriteResponse {
  rewritten?: string;
  error?: string;
}

export async function rewriteWithAI(text: string, context: string = 'professional'): Promise<string> {
  if (!text || !text.trim()) throw new Error('No text provided to rewrite');

  const maxRetries = 3;
  let attempt = 0;
  
  // Add a timeout limit (e.g., 15 seconds)
  const TIMEOUT_MS = 15000;

  while (attempt < maxRetries) {
    attempt++;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const resp = await fetch('/api/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, context }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // 1. Handle Rate Limiting (429)
      if (resp.status === 429) {
        const retryAfter = resp.headers.get('retry-after');
        const waitSeconds = retryAfter ? parseInt(retryAfter, 10) : Math.pow(2, attempt);
        
        console.warn(`Rate limit hit. Retrying in ${waitSeconds}s...`);
        await new Promise((r) => setTimeout(r, waitSeconds * 1000));
        continue;
      }

      // 2. Handle Client Errors (400-499) - Do not retry
      if (resp.status >= 400 && resp.status < 500) {
        const errorData = await resp.json().catch(() => ({}));
        throw new Error(errorData.error || `Client Error: ${resp.status}`);
      }

      // 3. Handle Server Errors (500+)
      if (!resp.ok) {
         throw new Error(`Server Error: ${resp.status}`);
      }

      // 4. Success
      const data: RewriteResponse = await resp.json();
      return data.rewritten || text; 

    } catch (err: any) {
      clearTimeout(timeoutId);

      if (err.message.startsWith('Client Error') || err.message.startsWith('No text')) {
        throw err;
      }
      
      if (err.name === 'AbortError') {
         console.error(`Attempt ${attempt} timed out`);
      } else {
         console.error(`Attempt ${attempt} failed:`, err);
      }

      if (attempt >= maxRetries) {
        throw new Error(`Failed to rewrite after ${maxRetries} attempts. Please check your connection.`);
      }

      await new Promise((r) => setTimeout(r, Math.pow(2, attempt) * 1000));
    }
  }

  throw new Error('Unexpected error in rewrite utility.');
}