import { CVData } from '../types/cv';

interface ParseResponse {
  parsed?: Partial<CVData>;
  error?: string;
  type?: string;
  details?: string;
}

export async function parseTextToCV(text: string): Promise<Partial<CVData>> {
  if (!text || !text.trim()) throw new Error('No text provided to parse');
  if (text.length < 50) throw new Error('Text is too short to parse meaningfully. Please provide more detailed CV content.');

  console.log('🔍 Parsing CV text...', { length: text.length });

  const maxRetries = 2;
  let attempt = 0;

  while (attempt < maxRetries) {
    attempt++;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const res = await fetch('/api/parse-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const body: ParseResponse = await res.json().catch(() => ({}));
        if (res.status === 429) {
          console.warn('Rate limit hit, retrying...');
          await new Promise(resolve => setTimeout(resolve, 2000 * attempt));
          continue;
        }
        throw new Error(body.error || `Server error: ${res.status}`);
      }

      const response: ParseResponse = await res.json();
      if (!response.parsed) throw new Error('No parsed data received from server');

      console.log('✅ CV parsed successfully:', {
        personalInfo: !!response.parsed.personalInfo?.fullName,
        sections: Object.keys(response.parsed).length,
      });

      return validateAndCleanParsedData(response.parsed);

    } catch (err: any) {
      if (err.name === 'AbortError') console.error(`Attempt ${attempt} timed out`);
      else console.error(`Parse attempt ${attempt} failed:`, err.message);

      if (attempt >= maxRetries) {
        if (err.message.includes('rate limit') || err.message.includes('429')) {
          throw new Error('AI service is currently busy. Please try again in a few minutes.');
        }
        if (err.message.includes('timeout') || err.name === 'AbortError') {
          throw new Error('Parsing request timed out. Please try with shorter text or check your connection.');
        }
        throw new Error(err.message || 'Failed to parse CV after multiple attempts. Please try again.');
      }

      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }

  throw new Error('Unexpected error in CV parsing');
}

export async function parseURLToCV(url: string): Promise<Partial<CVData>> {
  if (!url || !url.trim()) throw new Error('No URL provided to parse');

  try { new URL(url); } catch { throw new Error('Invalid URL format. Please provide a valid LinkedIn profile URL.'); }

  console.log('🔗 Parsing CV from URL...', url);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000);

    const res = await fetch('/api/parse-cv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const body: ParseResponse = await res.json().catch(() => ({}));
      if (res.status === 400) throw new Error(body.error || 'Failed to access the URL. Please ensure the profile is public.');
      throw new Error(body.error || `Failed to parse URL: ${res.status}`);
    }

    const response: ParseResponse = await res.json();
    if (!response.parsed) throw new Error('No data could be extracted from the URL');

    console.log('✅ URL parsed successfully');

    return validateAndCleanParsedData(response.parsed);

  } catch (err: any) {
    if (err.name === 'AbortError') throw new Error('URL parsing timed out. The page may be too large or slow to load.');
    throw new Error(err.message || 'Failed to parse CV from URL');
  }
}

// ------------------------
// Helper: validate & clean
// ------------------------
function validateAndCleanParsedData(data: Partial<CVData>): Partial<CVData> {
  const cleaned: Partial<CVData> = {
    personalInfo: data.personalInfo || {
      fullName: '', email: '', phone: '', location: '',
      linkedin: '', website: '', summary: '', photo: ''
    },
    education: Array.isArray(data.education) ? data.education : [],
    experience: Array.isArray(data.experience) ? data.experience : [],
    skills: Array.isArray(data.skills) ? data.skills : [],
    projects: Array.isArray(data.projects) ? data.projects : [],
    volunteerWork: Array.isArray(data.volunteerWork) ? data.volunteerWork : [],
    achievements: Array.isArray(data.achievements) ? data.achievements : [],
    references: Array.isArray(data.references) ? data.references : [],
    languages: Array.isArray(data.languages) ? data.languages : [],
    certifications: Array.isArray(data.certifications) ? data.certifications : [],
    hobbies: Array.isArray(data.hobbies) ? data.hobbies : []
  };

  const ensureIds = <T extends { id?: string }>(items: T[], prefix: string): T[] => {
    return items.map((item, index) => ({ ...item, id: item.id || `${prefix}_${index + 1}` }));
  };

cleaned.education = ensureIds(cleaned.education ?? [], 'edu');
cleaned.experience = ensureIds(cleaned.experience ?? [], 'exp');
cleaned.skills = ensureIds(cleaned.skills ?? [], 'skill');
cleaned.projects = ensureIds(cleaned.projects ?? [], 'proj');
cleaned.volunteerWork = ensureIds(cleaned.volunteerWork ?? [], 'vol');
cleaned.achievements = ensureIds(cleaned.achievements ?? [], 'ach');
cleaned.references = ensureIds(cleaned.references ?? [], 'ref');
cleaned.languages = ensureIds(cleaned.languages ?? [], 'lang');


  return cleaned;
}
