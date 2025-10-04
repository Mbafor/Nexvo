// src/utils/fileParser.ts
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";
import * as mammoth from "mammoth";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export async function parseFile(file: File): Promise<string> {
  const fileType = file.type;
  const fileName = file.name.toLowerCase();

  if (fileType === "application/pdf" || fileName.endsWith(".pdf")) {
    return await parsePDF(file);
  } else if (
    fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    fileName.endsWith(".docx")
  ) {
    return await parseDOCX(file);
  } else if (fileType === "text/plain" || fileName.endsWith(".txt")) {
    return await parseTXT(file);
  } else {
    throw new Error("Unsupported file type");
  }
}

async function parsePDF(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const typedArray = new Uint8Array(reader.result as ArrayBuffer);
        const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;

        let fullText = "";

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();

          const pageText = textContent.items
            .map((item: any) => ("str" in item ? item.str : ""))
            .join(" ");

          fullText += pageText + "\n";
        }

        resolve(fullText);
      } catch (error) {
        reject(new Error(`Failed to parse PDF: ${error}`));
      }
    };

    reader.onerror = () => reject(new Error("Failed to read PDF file"));
    reader.readAsArrayBuffer(file);
  });
}

async function parseDOCX(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const result = await mammoth.extractRawText({
          arrayBuffer: reader.result as ArrayBuffer,
        });
        resolve(result.value);
      } catch (error) {
        reject(new Error(`Failed to parse DOCX: ${error}`));
      }
    };

    reader.onerror = () => reject(new Error("Failed to read DOCX file"));
    reader.readAsArrayBuffer(file);
  });
}

async function parseTXT(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.onerror = () => reject(new Error("Failed to read text file"));
    reader.readAsText(file);
  });
}
