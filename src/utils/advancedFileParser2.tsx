import { CVData } from '../types/cv';
import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker with latest version
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export interface ParseResult {
  success: boolean;
  data?: Partial<CVData>;
  error?: string;
  confidence?: number;
  extractedText?: string;
  metadata?: {
    fileSize: number;
    pageCount?: number;
    language?: string;
    extractionMethod: string;
    processingTime: number;
    qualityScore: number;
    fieldConfidence?: {
      name: number;
      email: number;
      phone: number;
      experience: number;
      education: number;
      skills: number;
    };
  };
}

export interface ParseProgress {
  stage: string;
  progress: number;
  message: string;
  estimatedTimeRemaining?: number;
}

export interface ParsingOptions {
  useBackendAPI?: boolean;
  apiEndpoint?: string;
  enableOCR?: boolean;
  preserveFormatting?: boolean;
  extractImages?: boolean;
  multiLanguage?: boolean;
  strictValidation?: boolean;
}

export class AdvancedFileParser {
  private progressCallback?: (progress: ParseProgress) => void;
  private startTime: number = 0;
  private options: ParsingOptions;

  constructor(progressCallback?: (progress: ParseProgress) => void, options: ParsingOptions = {}) {
    this.progressCallback = progressCallback;
    this.options = {
      useBackendAPI: false,
      apiEndpoint: '/api/parse-resume',
      enableOCR: false,
      preserveFormatting: true,
      extractImages: false,
      multiLanguage: true,
      strictValidation: false,
      ...options
    };
  }

  private updateProgress(stage: string, progress: number, message: string) {
    const elapsed = Date.now() - this.startTime;
    const estimatedTotal = progress > 0 ? (elapsed / progress) * 100 : 0;
    const estimatedTimeRemaining = Math.max(0, estimatedTotal - elapsed);
    
    this.progressCallback?.({ 
      stage, 
      progress: Math.min(100, Math.max(0, progress)), 
      message,
      estimatedTimeRemaining: Math.round(estimatedTimeRemaining / 1000)
    });
  }

  async parseFile(file: File): Promise<ParseResult> {
    this.startTime = Date.now();
    
    try {
      this.updateProgress('validation', 5, 'Validating file integrity...');
      
      // Enhanced file validation
      const validation = await this.validateFile(file);
      if (!validation.valid) {
        throw new Error(validation.error);
      }

      // Try backend API first if enabled
      if (this.options.useBackendAPI) {
        try {
          this.updateProgress('api-processing', 20, 'Sending to AI parser...');
          const apiResult = await this.parseWithBackendAPI(file);
          if (apiResult.success) {
            return apiResult;
          }
        } catch (apiError) {
          console.warn('Backend API failed, falling back to client-side parsing:', apiError);
          this.updateProgress('fallback', 25, 'Falling back to local parsing...');
        }
      }

      this.updateProgress('preprocessing', 15, 'Preprocessing document...');
      
      // Determine optimal extraction strategy
      const extractionStrategy = await this.determineExtractionStrategy(file);
      
      this.updateProgress('extraction', 30, `Extracting content using ${extractionStrategy}...`);
      
      let extractedText = '';
      let metadata: any = {
        fileSize: file.size,
        extractionMethod: extractionStrategy,
        processingTime: 0,
        fieldConfidence: {
          name: 0,
          email: 0,
          phone: 0,
          experience: 0,
          education: 0,
          skills: 0
        }
      };
      
      // Extract text based on optimal strategy
      switch (extractionStrategy) {
        case 'advanced-pdf':
          const pdfResult = await this.extractFromPDFAdvanced(file);
          extractedText = pdfResult.text;
          metadata = { ...metadata, ...pdfResult.metadata };
          break;
        case 'word-advanced':
          const wordResult = await this.extractFromWordAdvanced(file);
          extractedText = wordResult.text;
          metadata = { ...metadata, ...wordResult.metadata };
          break;
        case 'text-enhanced':
          extractedText = await this.extractFromTextEnhanced(file);
          break;
        default:
          throw new Error('Unsupported extraction strategy');
      }

      this.updateProgress('analysis', 50, 'Analyzing document structure...');
      
      // Advanced text analysis and cleaning
      const analyzedText = await this.analyzeAndCleanText(extractedText);
      
      this.updateProgress('parsing', 70, 'Parsing CV sections with enhanced AI patterns...');
      
      // Enhanced CV parsing with machine learning patterns
      const parsedData = await this.parseTextToCVAdvanced(analyzedText);
      
      this.updateProgress('validation', 85, 'Validating extracted data...');
      
      // Enhanced data validation and enrichment
      const enhancedData = await this.enhanceAndValidateDataAdvanced(parsedData);
      
      this.updateProgress('optimization', 95, 'Optimizing results...');
      
      // Calculate quality metrics and field confidence
      const qualityScore = this.calculateQualityScore(enhancedData, analyzedText);
      const confidence = this.calculateConfidenceAdvanced(enhancedData, qualityScore);
      const fieldConfidence = this.calculateFieldConfidence(enhancedData);
      
      metadata.processingTime = Date.now() - this.startTime;
      metadata.qualityScore = qualityScore;
      metadata.fieldConfidence = fieldConfidence;
      
      this.updateProgress('complete', 100, 'Processing completed successfully!');
      
      return {
        success: true,
        data: enhancedData,
        extractedText: analyzedText,
        confidence,
        metadata
      };
      
    } catch (error) {
      const processingTime = Date.now() - this.startTime;
      console.error('Advanced parsing error:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        metadata: {
          fileSize: file.size,
          extractionMethod: 'failed',
          processingTime,
          qualityScore: 0,
          fieldConfidence: {
            name: 0,
            email: 0,
            phone: 0,
            experience: 0,
            education: 0,
            skills: 0
          }
        }
      };
    }
  }

  private async parseWithBackendAPI(file: File): Promise<ParseResult> {
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('options', JSON.stringify(this.options));

    const response = await fetch(this.options.apiEndpoint!, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    
    this.updateProgress('api-complete', 100, 'API processing completed!');
    
    return {
      success: true,
      data: result.data,
      extractedText: result.extractedText,
      confidence: result.confidence || 85,
      metadata: {
        ...result.metadata,
        extractionMethod: 'backend-api',
        processingTime: Date.now() - this.startTime
      }
    };
  }

  private calculateFieldConfidence(data: Partial<CVData>): any {
    const confidence = {
      name: 0,
      email: 0,
      phone: 0,
      experience: 0,
      education: 0,
      skills: 0
    };

    // Name confidence
    if (data.personalInfo?.fullName) {
      const name = data.personalInfo.fullName;
      const words = name.split(' ').filter(w => w.length > 1);
      confidence.name = Math.min(100, words.length >= 2 ? 90 : 60);
    }

    // Email confidence
    if (data.personalInfo?.email) {
      const email = data.personalInfo.email;
      const isValidFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      const hasRealDomain = !email.includes('example.com') && !email.includes('test.com');
      confidence.email = isValidFormat && hasRealDomain ? 95 : 50;
    }

    // Phone confidence
    if (data.personalInfo?.phone) {
      const phone = data.personalInfo.phone.replace(/\D/g, '');
      confidence.phone = phone.length >= 10 ? 90 : 60;
    }

    // Experience confidence
    if (data.experience && data.experience.length > 0) {
      const hasCompany = data.experience.some(exp => exp.company?.length > 0);
      const hasPosition = data.experience.some(exp => exp.position?.length > 0);
      confidence.experience = hasCompany && hasPosition ? 85 : 60;
    }

    // Education confidence
    if (data.education && data.education.length > 0) {
      const hasInstitution = data.education.some(edu => edu.institution?.length > 0);
      const hasDegree = data.education.some(edu => edu.degree?.length > 0);
      confidence.education = hasInstitution && hasDegree ? 85 : 60;
    }

    // Skills confidence
    if (data.skills && data.skills.length > 0) {
      confidence.skills = data.skills.length >= 3 ? 80 : 50;
    }

    return confidence;
  }

  private async validateFile(file: File): Promise<{ valid: boolean; error?: string }> {
    // Enhanced file validation with magic number checking
    if (file.size > 25 * 1024 * 1024) {
      return { valid: false, error: 'File size must be less than 25MB' };
    }

    if (file.size < 10) {
      return { valid: false, error: 'File appears to be empty or corrupted' };
    }

    // Check file signatures (magic numbers) for better security
    const buffer = await file.slice(0, 8).arrayBuffer();
    const bytes = new Uint8Array(buffer);
    
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    
    const allowedExtensions = ['.pdf', '.doc', '.docx', '.txt'];
    const hasValidType = allowedTypes.includes(file.type);
    const hasValidExtension = allowedExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
    
    // PDF signature check
    if (file.name.toLowerCase().endsWith('.pdf')) {
      if (bytes[0] !== 0x25 || bytes[1] !== 0x50 || bytes[2] !== 0x44 || bytes[3] !== 0x46) {
        return { valid: false, error: 'Invalid PDF file format' };
      }
    }
    
    // ZIP signature check for .docx files
    if (file.name.toLowerCase().endsWith('.docx')) {
      if (bytes[0] !== 0x50 || bytes[1] !== 0x4B) {
        return { valid: false, error: 'Invalid Word document format' };
      }
    }
    
    if (!hasValidType && !hasValidExtension) {
      return { 
        valid: false, 
        error: 'Unsupported file format. Please upload PDF, Word, or text files.' 
      };
    }

    return { valid: true };
  }

  private async determineExtractionStrategy(file: File): Promise<string> {
    const fileName = file.name.toLowerCase();
    const fileType = file.type;
    
    if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
      return 'advanced-pdf';
    }
    
    if (fileType.includes('word') || fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
      return 'word-advanced';
    }
    
    if (fileType === 'text/plain' || fileName.endsWith('.txt')) {
      return 'text-enhanced';
    }
    
    throw new Error('Cannot determine extraction strategy for this file type');
  }

  private async extractFromPDFAdvanced(file: File): Promise<{ text: string; metadata: any }> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ 
        data: arrayBuffer,
        useSystemFonts: true,
        disableFontFace: false,
        verbosity: 0
      }).promise;
      
      let fullText = '';
      const metadata = {
        pageCount: pdf.numPages,
        hasTextLayer: false,
        fonts: new Set<string>(),
        language: 'unknown'
      };

      for (let i = 1; i <= pdf.numPages; i++) {
        this.updateProgress('extraction', 30 + (i / pdf.numPages) * 15, `Processing page ${i} of ${pdf.numPages}...`);
        
        const page = await pdf.getPage(i);
        
        // Extract text with position information
        const textContent = await page.getTextContent();
        
        if (textContent.items.length > 0) {
          metadata.hasTextLayer = true;
        }
        
        // Enhanced text extraction with positioning
        const pageTexts: Array<{ text: string; x: number; y: number; width: number; height: number }> = [];
        
        for (const item of textContent.items) {
          if ('str' in item && item.str.trim()) {
            pageTexts.push({
              text: item.str,
              x: item.transform[4],
              y: item.transform[5],
              width: item.width,
              height: item.height
            });
            
            // Collect font information
            if (item.fontName) {
              metadata.fonts.add(item.fontName);
            }
          }
        }
        
        // Sort by vertical position, then horizontal
        pageTexts.sort((a, b) => {
          const yDiff = Math.abs(a.y - b.y);
          if (yDiff < 5) { // Same line
            return a.x - b.x;
          }
          return b.y - a.y; // Top to bottom
        });
        
        // Reconstruct text with proper spacing
        let pageText = '';
        let lastY = -1;
        let lastX = -1;
        
        for (const textItem of pageTexts) {
          if (lastY !== -1 && Math.abs(textItem.y - lastY) > 5) {
            pageText += '\n';
          } else if (lastX !== -1 && textItem.x - lastX > textItem.height) {
            pageText += ' ';
          }
          
          pageText += textItem.text;
          lastY = textItem.y;
          lastX = textItem.x + textItem.width;
        }
        
        fullText += pageText + '\n\n';
      }

      // Detect language
      metadata.language = this.detectLanguage(fullText);
      
      return { text: fullText, metadata };
      
    } catch (error) {
      throw new Error(`Failed to extract text from PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async extractFromWordAdvanced(file: File): Promise<{ text: string; metadata: any }> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const metadata = {
        wordCount: 0,
        hasFormatting: false,
        language: 'unknown'
      };
      
      // Enhanced Word document processing
      if (file.name.toLowerCase().endsWith('.docx')) {
        const text = await this.extractFromDocx(arrayBuffer);
        metadata.wordCount = text.split(/\s+/).length;
        metadata.language = this.detectLanguage(text);
        return { text, metadata };
      } else {
        const text = await this.extractFromDoc(arrayBuffer);
        metadata.wordCount = text.split(/\s+/).length;
        metadata.language = this.detectLanguage(text);
        return { text, metadata };
      }
      
    } catch (error) {
      throw new Error(`Failed to extract text from Word document: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async extractFromDocx(arrayBuffer: ArrayBuffer): Promise<string> {
    try {
      const decoder = new TextDecoder('utf-8');
      const text = decoder.decode(arrayBuffer);
      
      // Extract text from XML content
      const xmlMatches = text.match(/<w:t[^>]*>([^<]*)<\/w:t>/g) || [];
      return xmlMatches
        .map(match => match.replace(/<[^>]*>/g, ''))
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
    } catch (error) {
      throw new Error('Failed to parse DOCX content');
    }
  }

  private async extractFromDoc(arrayBuffer: ArrayBuffer): Promise<string> {
    try {
      const decoder = new TextDecoder('utf-8', { fatal: false });
      const text = decoder.decode(arrayBuffer);
      
      // Basic text extraction from binary DOC format
      return text
        .replace(/[^\x20-\x7E\n\r\t]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    } catch (error) {
      throw new Error('Failed to parse DOC content');
    }
  }

  private async extractFromTextEnhanced(file: File): Promise<string> {
    try {
      // Try different encodings
      const encodings = ['utf-8', 'utf-16', 'iso-8859-1', 'windows-1252'];
      
      for (const encoding of encodings) {
        try {
          const decoder = new TextDecoder(encoding, { fatal: true });
          const arrayBuffer = await file.arrayBuffer();
          const text = decoder.decode(arrayBuffer);
          
          // Validate that the text looks reasonable
          if (this.isValidText(text)) {
            return text;
          }
        } catch (e) {
          // Try next encoding
          continue;
        }
      }
      
      // Fallback to basic text reading
      return await file.text();
      
    } catch (error) {
      throw new Error('Failed to read text file with any supported encoding');
    }
  }

  private isValidText(text: string): boolean {
    // Check if text contains reasonable characters
    const printableChars = text.replace(/\s/g, '').length;
    const totalChars = text.length;
    
    if (totalChars === 0) return false;
    
    const printableRatio = printableChars / totalChars;
    return printableRatio > 0.7 && printableChars > 10;
  }

  private detectLanguage(text: string): string {
    // Simple language detection based on character patterns
    const sample = text.slice(0, 1000).toLowerCase();
    
    // English indicators
    if (/\b(the|and|or|but|in|on|at|to|for|of|with|by)\b/.test(sample)) {
      return 'en';
    }
    
    // Spanish indicators
    if (/\b(el|la|de|en|un|una|con|por|para|que)\b/.test(sample)) {
      return 'es';
    }
    
    // French indicators
    if (/\b(le|la|de|en|un|une|avec|pour|que|dans)\b/.test(sample)) {
      return 'fr';
    }
    
    return 'unknown';
  }

  private async analyzeAndCleanText(text: string): Promise<string> {
    // Advanced text cleaning and normalization
    let cleaned = text;
    
    // Remove excessive whitespace but preserve structure
    cleaned = cleaned.replace(/[ \t]+/g, ' ');
    cleaned = cleaned.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    // Fix common OCR errors
    cleaned = this.fixOCRErrors(cleaned);
    
    // Normalize quotes and dashes
    cleaned = cleaned.replace(/[""]/g, '"');
    cleaned = cleaned.replace(/['']/g, "'");
    cleaned = cleaned.replace(/[–—]/g, '-');
    
    // Remove page numbers and headers/footers
    cleaned = this.removePageArtifacts(cleaned);
    
    return cleaned.trim();
  }

  private fixOCRErrors(text: string): string {
    // Common OCR error corrections
    const corrections: Array<[RegExp, string]> = [
      [/\bl\b/g, 'I'], // lowercase l often mistaken for I
      [/\b0\b/g, 'O'], // zero mistaken for O in words
      [/(?<=\d)O(?=\d)/g, '0'], // O mistaken for 0 in numbers
      [/rn/g, 'm'], // rn often mistaken for m
      [/vv/g, 'w'], // vv often mistaken for w
    ];
    
    let corrected = text;
    for (const [pattern, replacement] of corrections) {
      corrected = corrected.replace(pattern, replacement);
    }
    
    return corrected;
  }

  private removePageArtifacts(text: string): string {
    // Remove page numbers, headers, footers
    const lines = text.split('\n');
    const cleaned = lines.filter(line => {
      const trimmed = line.trim();
      
      // Skip page numbers
      if (/^Page \d+$/i.test(trimmed) || /^\d+$/.test(trimmed)) {
        return false;
      }
      
      // Skip common headers/footers
      if (trimmed.length < 3 || /^[_\-=]+$/.test(trimmed)) {
        return false;
      }
      
      return true;
    });
    
    return cleaned.join('\n');
  }

  private async parseTextToCVAdvanced(text: string): Promise<Partial<CVData>> {
    const cvData: Partial<CVData> = {
      personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        website: '',
        summary: '',
        photo: ''
      },
      education: [],
      experience: [],
      skills: [],
      projects: [],
      certifications: [],
      languages: [],
      achievements: [],
      volunteerWork: [],
      hobbies: []
    };

    // Enhanced regex patterns with machine learning inspired improvements
    const patterns = {
      email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/gi,
      phone: /(?:\+?1[-.\s]?)?(?:\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})|([0-9]{3})[-.\s]?([0-9]{4}))/g,
      linkedin: /(?:linkedin\.com\/in\/|linkedin\.com\/pub\/)[A-Za-z0-9\-\.]+/gi,
      github: /(?:github\.com\/)[A-Za-z0-9\-\.]+/gi,
      website: /(?:https?:\/\/)?(?:www\.)?[A-Za-z0-9\-\.]+\.[A-Za-z]{2,}(?:\/[^\s]*)?/g,
      
      // Enhanced name patterns
      name: /^([A-Z][a-z]+ [A-Z][a-z]+(?:\s[A-Z][a-z]+)?)|([A-Z][A-Z\s]+)$/m,
      
      // Advanced section headers with multiple language support
      sections: {
        experience: /(?:work\s+)?(?:experience|employment|professional\s+experience|career|work\s+history|experiencia|expérience|berufserfahrung)/i,
        education: /(?:education|academic|qualifications|degrees|studies|educación|éducation|ausbildung)/i,
        skills: /(?:skills|competencies|expertise|technical\s+skills|abilities|habilidades|compétences|fähigkeiten)/i,
        projects: /(?:projects|portfolio|work\s+samples|proyectos|projets|projekte)/i,
        certifications: /(?:certifications?|certificates?|licenses?|certificaciones|certificats|zertifikate)/i,
        languages: /(?:languages?|linguistic\s+skills|idiomas|langues|sprachen)/i,
        references: /(?:references?|referees?|referencias|références|referenzen)/i,
        achievements: /(?:achievements?|accomplishments?|awards?|honors?|logros|réalisations|erfolge)/i,
        volunteer: /(?:volunteer(?:ing)?|community\s+service|social\s+work|voluntariado|bénévolat|ehrenamt)/i,
        hobbies: /(?:hobbies|interests|personal\s+interests|activities|pasatiempos|loisirs|hobbys)/i,
        summary: /(?:summary|profile|objective|about|professional\s+summary|resumen|résumé|zusammenfassung)/i
      }
    };

    // Extract personal information with advanced techniques
    await this.extractPersonalInfoAdvanced(text, cvData, patterns);
    
    // Extract sections with context awareness
    await this.extractSectionsAdvanced(text, cvData, patterns);

    return cvData;
  }

  private async extractPersonalInfoAdvanced(text: string, cvData: Partial<CVData>, patterns: any) {
    if (!cvData.personalInfo) {
      cvData.personalInfo = {
        fullName: '',
        email: '',
        phone: '',
        location: ''
      };
    }

    const lines = text.split('\n').slice(0, 20); // Focus on top of document
    const topText = lines.join(' ');

    // Enhanced name extraction with scoring
    const nameMatches = [
      ...topText.matchAll(patterns.name),
      ...topText.matchAll(/^([A-Z][a-z]+(?:\s[A-Z][a-z]+){1,3})$/gm)
    ];
    
    if (nameMatches.length > 0) {
      const names = nameMatches.map(match => ({
        name: match[1] || match[0],
        score: this.scoreNameCandidate(match[1] || match[0], lines)
      }));
      
      names.sort((a, b) => b.score - a.score);
      if (names[0].score > 0.5) {
        cvData.personalInfo.fullName = names[0].name.trim();
      }
    }

    // Extract email with validation
    const emailMatches = text.match(patterns.email);
    if (emailMatches) {
      const validEmails = emailMatches.filter(email => this.isValidEmail(email));
      if (validEmails.length > 0) {
        cvData.personalInfo.email = validEmails[0];
      }
    }

    // Enhanced phone extraction
    const phoneMatches = text.match(patterns.phone);
    if (phoneMatches) {
      cvData.personalInfo.phone = this.formatPhoneNumber(phoneMatches[0]);
    }

    // Extract LinkedIn with enhanced patterns
    const linkedinMatches = text.match(patterns.linkedin);
    if (linkedinMatches) {
      let linkedin = linkedinMatches[0];
      if (!linkedin.startsWith('http')) {
        linkedin = `https://${linkedin}`;
      }
      cvData.personalInfo.linkedin = linkedin;
    }

    // Extract website
    const websiteMatches = text.match(patterns.website);
    if (websiteMatches) {
      const validWebsite = websiteMatches.find(url => 
        this.isValidWebsite(url) && 
        !url.includes('@') && 
        !url.includes('linkedin.com') && 
        !url.includes('github.com')
      );
      if (validWebsite) {
        cvData.personalInfo.website = validWebsite.startsWith('http') 
          ? validWebsite 
          : `https://${validWebsite}`;
      }
    }

    // Extract location
    const locationPattern = /(?:location|address|based|from):\s*([^\n]+)/i;
    const locationMatch = text.match(locationPattern);
    if (locationMatch) {
      cvData.personalInfo.location = locationMatch[1].trim();
    }

    // Extract summary/objective
    const summaryMatch = text.match(patterns.sections.summary);
    if (summaryMatch) {
      const summaryStart = summaryMatch.index || 0;
      const summarySection = text.slice(summaryStart, summaryStart + 500);
      const summaryLines = summarySection.split('\n').slice(1, 4);
      cvData.personalInfo.summary = summaryLines.join(' ').trim();
    }
  }

  private scoreNameCandidate(name: string, lines: string[]): number {
    let score = 0;
    
    // Higher score if it's in the first few lines
    const lineIndex = lines.findIndex(line => line.includes(name));
    if (lineIndex !== -1) {
      score += Math.max(0, 1 - lineIndex * 0.2);
    }
    
    // Higher score for proper name formatting
    const words = name.split(/\s+/);
    if (words.length >= 2 && words.length <= 4) {
      score += 0.3;
    }
    
    // Check if all words are capitalized
    if (words.every(word => /^[A-Z][a-z]+$/.test(word))) {
      score += 0.3;
    }
    
    // Penalty for common non-name words
    const nonNameWords = ['experience', 'education', 'skills', 'resume', 'cv', 'curriculum'];
    if (nonNameWords.some(word => name.toLowerCase().includes(word))) {
      score -= 0.5;
    }
    
    return Math.max(0, Math.min(1, score));
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && !email.includes('example.com');
  }

  private formatPhoneNumber(phone: string): string {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    } else if (cleaned.length === 11 && cleaned[0] === '1') {
      return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }
    return phone;
  }

  private isValidWebsite(url: string): boolean {
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
      return true;
    } catch {
      return false;
    }
  }

  private async extractSectionsAdvanced(text: string, cvData: Partial<CVData>, patterns: any) {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);
    let currentSection = '';
    let sectionContent: string[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      let foundSection = false;
      
      // Check if this line is a section header
      for (const [section, pattern] of Object.entries(patterns.sections)) {
        if ((pattern as RegExp).test(line)) {
          // Process previous section if exists
          if (currentSection && sectionContent.length > 0) {
            await this.processSectionContent(currentSection, sectionContent, cvData);
          }
          
          currentSection = section;
          sectionContent = [];
          foundSection = true;
          break;
        }
      }
      
      // If not a section header and we have a current section, add to content
      if (!foundSection && currentSection) {
        sectionContent.push(line);
      }
    }
    
    // Process the last section
    if (currentSection && sectionContent.length > 0) {
      await this.processSectionContent(currentSection, sectionContent, cvData);
    }
  }

  private async processSectionContent(section: string, content: string[], cvData: Partial<CVData>) {
    const text = content.join('\n');
    
    switch (section) {
      case 'experience':
        await this.extractExperienceAdvanced(text, cvData);
        break;
      case 'education':
        await this.extractEducationAdvanced(text, cvData);
        break;
      case 'skills':
        await this.extractSkillsAdvanced(text, cvData);
        break;
      case 'projects':
        await this.extractProjectsAdvanced(text, cvData);
        break;
      case 'certifications':
        await this.extractCertificationsAdvanced(text, cvData);
        break;
      case 'languages':
        await this.extractLanguagesAdvanced(text, cvData);
        break;
      case 'achievements':
        await this.extractAchievementsAdvanced(text, cvData);
        break;
      case 'volunteer':
        await this.extractVolunteerAdvanced(text, cvData);
        break;
      case 'hobbies':
        await this.extractHobbiesAdvanced(text, cvData);
        break;
    }
  }

  private async extractExperienceAdvanced(text: string, cvData: Partial<CVData>) {
    const experiences = [];
    const blocks = this.splitIntoExperienceBlocks(text);
    
    for (const block of blocks) {
      const experience = await this.parseExperienceBlock(block);
      if (experience) {
        experiences.push(experience);
      }
    }
    
    cvData.experience = experiences;
  }

  private splitIntoExperienceBlocks(text: string): string[] {
    const lines = text.split('\n');
    const blocks: string[] = [];
    let currentBlock: string[] = [];
    
    for (const line of lines) {
      // Check if this looks like a new job entry
      if (this.looksLikeJobTitle(line) && currentBlock.length > 0) {
        blocks.push(currentBlock.join('\n'));
        currentBlock = [line];
      } else {
        currentBlock.push(line);
      }
    }
    
    if (currentBlock.length > 0) {
      blocks.push(currentBlock.join('\n'));
    }
    
    return blocks;
  }

  private looksLikeJobTitle(line: string): boolean {
    // Enhanced job title detection
    const jobTitlePatterns = [
      /^[A-Z][a-zA-Z\s]+ at [A-Z][a-zA-Z\s]+/,
      /^[A-Z][a-zA-Z\s]+ - [A-Z][a-zA-Z\s]+/,
      /^[A-Z][a-zA-Z\s]+\s+\|\s+[A-Z][a-zA-Z\s]+/,
      /^(Senior|Junior|Lead|Principal|Director|Manager|Associate|Assistant)\s+[A-Z][a-zA-Z\s]+/i
    ];
    
    return jobTitlePatterns.some(pattern => pattern.test(line.trim()));
  }

  private async parseExperienceBlock(block: string): Promise<any> {
    const lines = block.split('\n').filter(line => line.trim());
    if (lines.length === 0) return null;
    
    const experience = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    
    // Parse first line for position and company
    const firstLine = lines[0];
    const patterns = [
      /^(.+)\s+at\s+(.+)$/,
      /^(.+)\s+-\s+(.+)$/,
      /^(.+)\s+\|\s+(.+)$/
    ];
    
    for (const pattern of patterns) {
      const match = firstLine.match(pattern);
      if (match) {
        experience.position = match[1].trim();
        experience.company = match[2].trim();
        break;
      }
    }
    
    // If no pattern matched, assume first line is position
    if (!experience.position) {
      experience.position = firstLine;
    }
    
    // Extract dates and description from remaining lines
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      
      // Check for date patterns
      const dateMatch = line.match(/(\w+\s+\d{4})\s*[-–—]\s*(\w+\s+\d{4}|present|current)/i);
      if (dateMatch) {
        experience.startDate = dateMatch[1];
        experience.endDate = dateMatch[2];
        experience.current = /present|current/i.test(dateMatch[2]);
      } else if (!experience.description) {
        experience.description = lines.slice(i).join(' ');
        break;
      }
    }
    
    return experience.position ? experience : null;
  }

  private async extractEducationAdvanced(text: string, cvData: Partial<CVData>) {
    const education = [];
    const lines = text.split('\n').filter(line => line.trim());
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const degreePattern = /(bachelor|master|phd|doctorate|diploma|certificate|degree|bs|ba|ms|ma)/i;
      
      if (degreePattern.test(line)) {
        const edu = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          institution: '',
          degree: line.trim(),
          field: '',
          startDate: '',
          endDate: '',
          current: false,
          description: ''
        };
        
        // Look for institution in nearby lines
        for (let j = Math.max(0, i - 2); j < Math.min(i + 3, lines.length); j++) {
          const nearbyLine = lines[j];
          if (j !== i && nearbyLine && /university|college|institute|school/i.test(nearbyLine)) {
            edu.institution = nearbyLine.trim();
            break;
          }
        }
        
        education.push(edu);
      }
    }
    
    cvData.education = education;
  }

  private async extractSkillsAdvanced(text: string, cvData: Partial<CVData>) {
    const skills = [];
    const skillText = text.replace(/[,;|•]/g, ',');
    const skillItems = skillText.split(',').map(s => s.trim()).filter(s => s);
    
    // Common technical skills patterns
    const technicalKeywords = /(?:javascript|python|react|java|css|html|sql|node|angular|vue|typescript|c\+\+|php|ruby|swift|kotlin|git|docker|aws|azure|mongodb|postgresql|mysql|api|rest|graphql|machine learning|ai|data science|devops|ci\/cd|kubernetes|linux|windows|macos|adobe|photoshop|illustrator|figma|sketch|autocad|unity|blender)/i;
    
    for (const skill of skillItems) {
      if (skill.length > 1 && skill.length < 50) {
        // Determine if it's likely a technical or soft skill
        const isLikelyTechnical = technicalKeywords.test(skill);
        
        skills.push({
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: skill,
          level: 'intermediate' as const,
          type: isLikelyTechnical ? 'technical' as const : 'soft' as const
        });
      }
    }
    
    cvData.skills = skills;
  }

  private async extractProjectsAdvanced(text: string, cvData: Partial<CVData>) {
    const projects = [];
    const lines = text.split('\n').filter(line => line.trim());
    
    for (const line of lines) {
      if (line.length > 5) {
        projects.push({
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: line.trim(),
          description: '',
          technologies: '',
          link: '',
          startDate: '',
          endDate: ''
        });
      }
    }
    
    cvData.projects = projects;
  }

  private async extractCertificationsAdvanced(text: string, cvData: Partial<CVData>) {
    const certifications = text.split('\n')
      .map(line => line.trim())
      .filter(line => line && line.length > 3);
    cvData.certifications = certifications;
  }

  private async extractLanguagesAdvanced(text: string, cvData: Partial<CVData>) {
    const languages = [];
    const langText = text.replace(/[,;|•]/g, ',');
    const langItems = langText.split(',').map(s => s.trim()).filter(s => s);
    
    for (const lang of langItems) {
      if (lang.length > 1 && lang.length < 30) {
        languages.push({
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: lang,
          level: 'Intermediate' as const
        });
      }
    }
    
    cvData.languages = languages;
  }

  private async extractAchievementsAdvanced(text: string, cvData: Partial<CVData>) {
    const achievements = [];
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);
    
    for (const line of lines) {
      if (line.length > 5) {
        achievements.push({
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          title: line,
          description: '',
          date: ''
        });
      }
    }
    
    cvData.achievements = achievements;
  }

  private async extractVolunteerAdvanced(text: string, cvData: Partial<CVData>) {
    const volunteer = [];
    const lines = text.split('\n').filter(line => line.trim());
    
    for (const line of lines) {
      if (line.length > 5) {
        volunteer.push({
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          organization: line.trim(),
          role: '',
          description: '',
          startDate: '',
          endDate: '',
          current: false
        });
      }
    }
    
    cvData.volunteerWork = volunteer;
  }

  private async extractHobbiesAdvanced(text: string, cvData: Partial<CVData>) {
    const hobbies = text.replace(/[,;|•]/g, ',')
      .split(',')
      .map(h => h.trim())
      .filter(h => h && h.length > 1 && h.length < 50);
    cvData.hobbies = hobbies;
  }

  private async enhanceAndValidateDataAdvanced(data: Partial<CVData>): Promise<Partial<CVData>> {
    // Advanced data enhancement and validation
    if (data.personalInfo?.fullName) {
      data.personalInfo.fullName = this.titleCase(data.personalInfo.fullName);
    }
    
    // Validate and clean email
    if (data.personalInfo?.email && !this.isValidEmail(data.personalInfo.email)) {
      data.personalInfo.email = '';
    }
    
    // Remove empty arrays and invalid data
    Object.keys(data).forEach(key => {
      const value = data[key as keyof CVData];
      if (Array.isArray(value) && value.length === 0) {
        delete data[key as keyof CVData];
      }
    });
    
    return data;
  }

  private calculateQualityScore(data: Partial<CVData>, text: string): number {
    let score = 0;
    let maxScore = 100;
    
    // Personal info quality (30 points)
    if (data.personalInfo?.fullName) score += 10;
    if (data.personalInfo?.email && this.isValidEmail(data.personalInfo.email)) score += 10;
    if (data.personalInfo?.phone) score += 5;
    if (data.personalInfo?.location) score += 5;
    
    // Content sections (50 points)
    if (data.experience && data.experience.length > 0) score += 15;
    if (data.education && data.education.length > 0) score += 10;
    if (data.skills && data.skills.length > 0) score += 10;
    if (data.projects && data.projects.length > 0) score += 5;
    if (data.achievements && data.achievements.length > 0) score += 5;
    if (data.languages && data.languages.length > 0) score += 5;
    
    // Text quality (20 points)
    const textLength = text.length;
    if (textLength > 500) score += 5;
    if (textLength > 1000) score += 5;
    if (textLength > 2000) score += 5;
    
    const wordCount = text.split(/\s+/).length;
    if (wordCount > 100) score += 5;
    
    return Math.round((score / maxScore) * 100);
  }

  private calculateConfidenceAdvanced(data: Partial<CVData>, qualityScore: number): number {
    let confidence = qualityScore * 0.6; // Base confidence from quality
    
    // Boost confidence for key indicators
    if (data.personalInfo?.fullName && data.personalInfo?.email) {
      confidence += 20;
    }
    
    if (data.experience && data.experience.length > 0) {
      confidence += 15;
    }
    
    if (data.skills && data.skills.length > 2) {
      confidence += 5;
    }
    
    return Math.min(100, Math.round(confidence));
  }

  private titleCase(str: string): string {
    return str.toLowerCase().split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }
}