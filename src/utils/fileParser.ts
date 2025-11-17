// Lightweight file parser for TXT, DOCX and PDF in the browser (best-effort)
export async function extractTextFromFile(file: File): Promise<string> {
  const name = file.name.toLowerCase();

  if (name.endsWith('.txt')) {
    return await readTextFile(file);
  }

  if (name.endsWith('.docx')) {
    try {
      // mammoth works in browsers if bundled
      // import dynamically to avoid SSR/bundling issues
      const mammoth = await import('mammoth');
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      return result.value || '';
    } catch (err) {
      console.warn('DOCX parsing failed, falling back to text', err);
      return await readTextFile(file);
    }
  }

  if (name.endsWith('.pdf')) {
    try {
      const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf');
      // @ts-ignore
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      let text = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items.map((s: any) => s.str);
        text += strings.join(' ') + '\n\n';
      }
      return text;
    } catch (err) {
      console.warn('PDF parsing failed, falling back to text', err);
      return await readTextFile(file);
    }
  }

  // Fallback: try to read as text
  return await readTextFile(file);
}

function readTextFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = (e) => reject(e);
    reader.readAsText(file);
  });
}
