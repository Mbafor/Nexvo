export async function rewriteWithAI(text: string, context: string = 'professional'): Promise<string> {
  if (!text || !text.trim()) throw new Error('No text provided to rewrite');

  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const resp = await fetch('/api/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, context }),
      });

      if (resp.status === 429) {
        attempt += 1;
        const retryAfter = resp.headers.get('retry-after');
        const waitSeconds = retryAfter ? Number(retryAfter) : Math.pow(2, attempt);

        if (attempt >= maxRetries) {
          throw new Error('Failed to rewrite text: rate limit exceeded (429). Try again later.');
        }

        await new Promise((r) => setTimeout(r, waitSeconds * 1000));
        continue;
      }

      if (!resp.ok) {
        const body = await resp.text().catch(() => '');
        throw new Error(`Rewrite request failed: ${resp.status} ${resp.statusText} ${body}`);
      }

      const data = await resp.json();
      return data.rewritten || '';
    } catch (err: any) {
      attempt += 1;
      // network error or other transient failures: retry with backoff
      if (attempt >= maxRetries) {
        const message = err instanceof Error ? err.message : JSON.stringify(err);
        throw new Error(`Failed to rewrite text after ${maxRetries} attempts: ${message}`);
      }

      await new Promise((r) => setTimeout(r, Math.pow(2, attempt) * 1000));
      continue;
    }
  }

  throw new Error('Failed to rewrite text after multiple attempts.');
}
