// 🚀 BACKEND API SERVER FOR CV PARSING
// Node.js + Express server with enhanced CV parsing capabilities

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

// PDF parsing
const pdfParse = require('pdf-parse');

// Word document parsing  
const mammoth = require('mammoth');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'], // Add your frontend URLs
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 25 * 1024 * 1024, // 25MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, Word, and text files are allowed.'));
    }
  }
});

// Enhanced regex patterns for CV parsing
const patterns = {
  email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/gi,
  phone: /(?:\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})|([0-9]{3})[-.\s]?([0-9]{4})/g,
  linkedin: /(?:linkedin\.com\/in\/|linkedin\.com\/pub\/)[A-Za-z0-9\-\.]+/gi,
  github: /(?:github\.com\/)[A-Za-z0-9\-\.]+/gi,
  website: /(?:https?:\/\/)?(?:www\.)?[A-Za-z0-9\-\.]+\.[A-Za-z]{2,}(?:\/[^\s]*)?/g,
  
  // Name patterns
  name: /^([A-Z][a-z]+ [A-Z][a-z]+(?:\s[A-Z][a-z]+)?)|([A-Z][A-Z\s]+)$/m,
  
  // Section headers with multiple language support
  sections: {
    experience: /(?:work\s+)?(?:experience|employment|professional\s+experience|career|work\s+history)/i,
    education: /(?:education|academic|qualifications|degrees|studies)/i,
    skills: /(?:skills|competencies|expertise|technical\s+skills|abilities)/i,
    projects: /(?:projects|portfolio|work\s+samples)/i,
    certifications: /(?:certifications?|certificates?|licenses?)/i,
    languages: /(?:languages?|linguistic\s+skills)/i,
    references: /(?:references?|referees?)/i,
    achievements: /(?:achievements?|accomplishments?|awards?|honors?)/i,
    volunteer: /(?:volunteer(?:ing)?|community\s+service|social\s+work)/i,
    hobbies: /(?:hobbies|interests|personal\s+interests|activities)/i,
    summary: /(?:summary|profile|objective|about|professional\s+summary)/i
  }
};

// Main CV parsing endpoint
app.post('/api/parse-resume', upload.single('resume'), async (req, res) => {
  console.log('📄 Received CV parsing request');
  
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }

    const { originalname, mimetype, buffer, size } = req.file;
    const options = JSON.parse(req.body.options || '{}');
    
    console.log(`🔍 Processing file: ${originalname} (${mimetype}, ${size} bytes)`);

    // Extract text based on file type
    let extractedText = '';
    let metadata = {
      fileSize: size,
      fileName: originalname,
      fileType: mimetype,
      extractionMethod: '',
      processingTime: 0
    };

    const startTime = Date.now();

    if (mimetype === 'application/pdf') {
      console.log('📖 Extracting text from PDF...');
      const pdfData = await pdfParse(buffer);
      extractedText = pdfData.text;
      metadata.extractionMethod = 'pdf-parse';
      metadata.pageCount = pdfData.numpages;
      
    } else if (mimetype.includes('word') || mimetype.includes('document')) {
      console.log('📝 Extracting text from Word document...');
      
      if (originalname.toLowerCase().endsWith('.docx')) {
        const result = await mammoth.extractRawText({ buffer });
        extractedText = result.value;
        metadata.extractionMethod = 'mammoth-docx';
      } else {
        // Basic DOC handling
        extractedText = buffer.toString('utf8');
        metadata.extractionMethod = 'basic-doc';
      }
      
    } else if (mimetype === 'text/plain') {
      console.log('📄 Processing text file...');
      extractedText = buffer.toString('utf8');
      metadata.extractionMethod = 'text-direct';
    }

    if (!extractedText || extractedText.trim().length < 50) {
      throw new Error('No readable text found in the document');
    }

    console.log(`✅ Text extracted: ${extractedText.length} characters`);

    // Parse the extracted text into structured CV data
    const parsedData = await parseTextToCV(extractedText);
    
    // Calculate confidence score
    const confidence = calculateConfidence(parsedData, extractedText);
    
    // Calculate field confidence
    const fieldConfidence = calculateFieldConfidence(parsedData);

    metadata.processingTime = Date.now() - startTime;

    console.log(`🎯 Parsing completed with ${confidence}% confidence`);

    res.json({
      success: true,
      data: parsedData,
      extractedText: extractedText.substring(0, 1000), // First 1000 chars for reference
      confidence,
      metadata: {
        ...metadata,
        fieldConfidence,
        qualityScore: confidence
      }
    });

  } catch (error) {
    console.error('❌ CV parsing error:', error);
    
    let userMessage = 'Failed to parse resume';
    let statusCode = 500;
    
    // Provide specific error messages based on error type
    if (error.message?.includes('No readable text')) {
      userMessage = 'No readable text found in the document. Please ensure the file is not corrupted or password-protected.';
      statusCode = 400;
    } else if (error.message?.includes('file type') || error.message?.includes('format')) {
      userMessage = 'Unsupported file format. Please upload a PDF, Word document, or text file.';
      statusCode = 400;
    } else if (error.message?.includes('size')) {
      userMessage = 'File is too large. Please use a file smaller than 25MB.';
      statusCode = 413;
    } else if (error.message?.includes('memory') || error.message?.includes('timeout')) {
      userMessage = 'The document is too complex to process. Please try with a simpler format.';
      statusCode = 503;
    }
    
    res.status(statusCode).json({
      success: false,
      error: userMessage,
      technicalError: error.message,
      metadata: {
        fileSize: req.file?.size || 0,
        extractionMethod: 'failed',
        processingTime: Date.now() - (req.startTime || Date.now()),
        errorType: error.name || 'UnknownError'
      }
    });
  }
});

// Enhanced CV parsing function
async function parseTextToCV(text) {
  console.log('🧠 Starting intelligent CV parsing...');
  
  const cvData = {
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: '',
      summary: ''
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

  // Extract personal information
  await extractPersonalInfo(text, cvData);
  
  // Extract sections
  await extractSections(text, cvData);

  return cvData;
}

// Extract personal information
async function extractPersonalInfo(text, cvData) {
  const lines = text.split('\n').slice(0, 20); // Focus on top of document
  const topText = lines.join(' ');

  // Extract name - enhanced logic
  const nameMatches = topText.match(patterns.name);
  if (nameMatches) {
    const names = nameMatches.map(match => ({
      name: match.trim(),
      score: scoreNameCandidate(match.trim(), lines)
    }));
    
    names.sort((a, b) => b.score - a.score);
    if (names[0] && names[0].score > 0.5) {
      cvData.personalInfo.fullName = names[0].name;
    }
  }

  // Extract email
  const emailMatches = text.match(patterns.email);
  if (emailMatches) {
    const validEmails = emailMatches.filter(email => isValidEmail(email));
    if (validEmails.length > 0) {
      cvData.personalInfo.email = validEmails[0];
    }
  }

  // Extract phone
  const phoneMatches = text.match(patterns.phone);
  if (phoneMatches) {
    cvData.personalInfo.phone = formatPhoneNumber(phoneMatches[0]);
  }

  // Extract LinkedIn
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
      isValidWebsite(url) && 
      !url.includes('@') && 
      !url.includes('linkedin.com')
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

  // Extract summary
  const summaryMatch = text.match(patterns.sections.summary);
  if (summaryMatch) {
    const summaryStart = summaryMatch.index;
    const summarySection = text.slice(summaryStart, summaryStart + 500);
    const summaryLines = summarySection.split('\n').slice(1, 4);
    cvData.personalInfo.summary = summaryLines.join(' ').trim();
  }
}

// Extract sections
async function extractSections(text, cvData) {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line);
  let currentSection = '';
  let sectionContent = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let foundSection = false;
    
    // Check if this line is a section header
    for (const [section, pattern] of Object.entries(patterns.sections)) {
      if (pattern.test(line)) {
        // Process previous section if exists
        if (currentSection && sectionContent.length > 0) {
          await processSectionContent(currentSection, sectionContent, cvData);
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
    await processSectionContent(currentSection, sectionContent, cvData);
  }
}

// Process section content
async function processSectionContent(section, content, cvData) {
  const text = content.join('\n');
  
  switch (section) {
    case 'experience':
      cvData.experience = await extractExperience(text);
      break;
    case 'education':
      cvData.education = await extractEducation(text);
      break;
    case 'skills':
      cvData.skills = await extractSkills(text);
      break;
    case 'projects':
      cvData.projects = await extractProjects(text);
      break;
    case 'certifications':
      cvData.certifications = await extractCertifications(text);
      break;
    case 'languages':
      cvData.languages = await extractLanguages(text);
      break;
    case 'achievements':
      cvData.achievements = await extractAchievements(text);
      break;
    case 'volunteer':
      cvData.volunteerWork = await extractVolunteer(text);
      break;
    case 'hobbies':
      cvData.hobbies = await extractHobbies(text);
      break;
  }
}

// Enhanced extraction functions
async function extractExperience(text) {
  const experiences = [];
  const blocks = splitIntoBlocks(text, /^[A-Z][a-zA-Z\s]+ at [A-Z][a-zA-Z\s]+/);
  
  for (const block of blocks) {
    const experience = parseExperienceBlock(block);
    if (experience) {
      experiences.push(experience);
    }
  }
  
  return experiences;
}

async function extractEducation(text) {
  const education = [];
  const lines = text.split('\n').filter(line => line.trim());
  
  for (const line of lines) {
    const degreePattern = /(bachelor|master|phd|doctorate|diploma|certificate|degree|bs|ba|ms|ma)/i;
    
    if (degreePattern.test(line)) {
      education.push({
        id: generateId(),
        institution: '',
        degree: line.trim(),
        field: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      });
    }
  }
  
  return education;
}

async function extractSkills(text) {
  const skills = [];
  const skillText = text.replace(/[,;|•]/g, ',');
  const skillItems = skillText.split(',').map(s => s.trim()).filter(s => s);
  
  for (const skill of skillItems) {
    if (skill.length > 1 && skill.length < 50) {
      skills.push({
        id: generateId(),
        name: skill,
        level: 'intermediate'
      });
    }
  }
  
  return skills;
}

// Helper functions
function scoreNameCandidate(name, lines) {
  let score = 0;
  
  const lineIndex = lines.findIndex(line => line.includes(name));
  if (lineIndex !== -1) {
    score += Math.max(0, 1 - lineIndex * 0.2);
  }
  
  const words = name.split(/\s+/);
  if (words.length >= 2 && words.length <= 4) {
    score += 0.3;
  }
  
  if (words.every(word => /^[A-Z][a-z]+$/.test(word))) {
    score += 0.3;
  }
  
  const nonNameWords = ['experience', 'education', 'skills', 'resume', 'cv'];
  if (nonNameWords.some(word => name.toLowerCase().includes(word))) {
    score -= 0.5;
  }
  
  return Math.max(0, Math.min(1, score));
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && !email.includes('example.com');
}

function formatPhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
}

function isValidWebsite(url) {
  try {
    new URL(url.startsWith('http') ? url : `https://${url}`);
    return true;
  } catch {
    return false;
  }
}

function splitIntoBlocks(text, pattern) {
  const lines = text.split('\n');
  const blocks = [];
  let currentBlock = [];
  
  for (const line of lines) {
    if (pattern.test(line) && currentBlock.length > 0) {
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

function parseExperienceBlock(block) {
  const lines = block.split('\n').filter(line => line.trim());
  if (lines.length === 0) return null;
  
  const experience = {
    id: generateId(),
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
  const atMatch = firstLine.match(/^(.+)\s+at\s+(.+)$/);
  
  if (atMatch) {
    experience.position = atMatch[1].trim();
    experience.company = atMatch[2].trim();
  } else {
    experience.position = firstLine;
  }
  
  // Extract dates and description from remaining lines
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    
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

function calculateConfidence(data, text) {
  let score = 0;
  let maxScore = 100;
  
  // Personal info (40 points)
  if (data.personalInfo.fullName) score += 15;
  if (data.personalInfo.email && isValidEmail(data.personalInfo.email)) score += 15;
  if (data.personalInfo.phone) score += 10;
  
  // Content sections (60 points)
  if (data.experience && data.experience.length > 0) score += 20;
  if (data.education && data.education.length > 0) score += 15;
  if (data.skills && data.skills.length > 0) score += 15;
  if (data.projects && data.projects.length > 0) score += 5;
  if (data.achievements && data.achievements.length > 0) score += 5;
  
  return Math.round((score / maxScore) * 100);
}

function calculateFieldConfidence(data) {
  return {
    name: data.personalInfo.fullName ? 90 : 0,
    email: data.personalInfo.email && isValidEmail(data.personalInfo.email) ? 95 : 0,
    phone: data.personalInfo.phone ? 85 : 0,
    experience: data.experience && data.experience.length > 0 ? 80 : 0,
    education: data.education && data.education.length > 0 ? 80 : 0,
    skills: data.skills && data.skills.length > 0 ? 75 : 0
  };
}

function generateId() {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

// Implement other extraction functions...
async function extractProjects(text) {
  const projects = [];
  const projectSection = text.toLowerCase();
  
  // Look for project indicators
  const projectPatterns = [
    /project[s]?\s*[:|\-]\s*([^\n]+)/gi,
    /built\s+([^\n]+)/gi,
    /developed\s+([^\n]+)/gi,
    /created\s+([^\n]+)/gi
  ];
  
  for (const pattern of projectPatterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const projectName = match[1].trim();
      if (projectName && projectName.length > 3 && projectName.length < 100) {
        projects.push({
          id: generateId(),
          name: projectName,
          description: '',
          technologies: '',
          link: '',
          startDate: '',
          endDate: ''
        });
      }
    }
  }
  
  return projects.slice(0, 10); // Limit to 10 projects
}

async function extractCertifications(text) {
  const certifications = [];
  const lines = text.split('\n').map(line => line.trim()).filter(line => line);
  
  const certPatterns = [
    /certified?\s+(.+)/gi,
    /(aws|azure|google|microsoft|oracle|cisco|comptia)\s+(.+)/gi,
    /certificate\s+(.+)/gi,
    /certification\s+(.+)/gi
  ];
  
  for (const line of lines) {
    for (const pattern of certPatterns) {
      const match = line.match(pattern);
      if (match && match[1] && match[1].length > 3) {
        certifications.push(match[1].trim());
      }
    }
  }
  
  return [...new Set(certifications)].slice(0, 15); // Remove duplicates, limit to 15
}

async function extractLanguages(text) {
  const languages = [];
  const knownLanguages = [
    'english', 'spanish', 'french', 'german', 'italian', 'portuguese', 'russian',
    'chinese', 'japanese', 'korean', 'arabic', 'hindi', 'dutch', 'swedish',
    'norwegian', 'danish', 'finnish', 'polish', 'czech', 'hungarian'
  ];
  
  const languageSection = text.toLowerCase();
  
  for (const lang of knownLanguages) {
    if (languageSection.includes(lang)) {
      // Determine proficiency level
      let level = 'Intermediate';
      if (languageSection.includes(`${lang} native`) || languageSection.includes(`native ${lang}`)) {
        level = 'Native';
      } else if (languageSection.includes(`${lang} fluent`) || languageSection.includes(`fluent ${lang}`)) {
        level = 'Fluent';
      } else if (languageSection.includes(`${lang} advanced`) || languageSection.includes(`advanced ${lang}`)) {
        level = 'Advanced';
      } else if (languageSection.includes(`${lang} basic`) || languageSection.includes(`basic ${lang}`) || languageSection.includes(`${lang} beginner`) || languageSection.includes(`beginner ${lang}`)) {
        level = 'Beginner';
      }
      
      languages.push({
        id: generateId(),
        name: lang.charAt(0).toUpperCase() + lang.slice(1),
        level: level
      });
    }
  }
  
  return languages;
}

async function extractAchievements(text) {
  const achievements = [];
  const lines = text.split('\n').map(line => line.trim()).filter(line => line);
  
  const achievementPatterns = [
    /award[ed]?\s+(.+)/gi,
    /won\s+(.+)/gi,
    /achieved\s+(.+)/gi,
    /recognized\s+(.+)/gi,
    /honored\s+(.+)/gi,
    /received\s+(.+)\s+award/gi,
    /\d+%\s+(.+)/gi, // Performance metrics
    /increased\s+(.+)\s+by\s+\d+/gi
  ];
  
  for (const line of lines) {
    for (const pattern of achievementPatterns) {
      const match = line.match(pattern);
      if (match && match[1] && match[1].length > 5) {
        achievements.push({
          id: generateId(),
          title: match[1].trim(),
          description: '',
          date: ''
        });
      }
    }
  }
  
  return achievements.slice(0, 10); // Limit to 10 achievements
}

async function extractVolunteer(text) {
  const volunteer = [];
  const volunteerSection = text.toLowerCase();
  
  const volunteerPatterns = [
    /volunteer[ed]?\s+(.+)/gi,
    /community\s+service\s+(.+)/gi,
    /helped\s+(.+)/gi,
    /donated\s+(.+)/gi,
    /charity\s+(.+)/gi
  ];
  
  for (const pattern of volunteerPatterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const description = match[1].trim();
      if (description && description.length > 5) {
        volunteer.push({
          id: generateId(),
          organization: description.split(',')[0] || 'Local Organization',
          role: 'Volunteer',
          description: description,
          startDate: '',
          endDate: '',
          current: false
        });
      }
    }
  }
  
  return volunteer.slice(0, 5); // Limit to 5 volunteer experiences
}

async function extractHobbies(text) {
  const hobbies = [];
  const hobbyKeywords = [
    'reading', 'writing', 'photography', 'traveling', 'cooking', 'gaming',
    'sports', 'music', 'art', 'dancing', 'hiking', 'cycling', 'swimming',
    'yoga', 'meditation', 'gardening', 'chess', 'painting', 'drawing',
    'singing', 'guitar', 'piano', 'tennis', 'football', 'basketball',
    'running', 'fitness', 'blogging', 'volunteering', 'learning'
  ];
  
  const hobbySection = text.toLowerCase();
  
  for (const hobby of hobbyKeywords) {
    if (hobbySection.includes(hobby)) {
      hobbies.push(hobby.charAt(0).toUpperCase() + hobby.slice(1));
    }
  }
  
  return [...new Set(hobbies)]; // Remove duplicates
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'CV Parser API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('❌ Server error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: error.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 CV Parser API server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📄 Parse endpoint: http://localhost:${PORT}/api/parse-resume`);
});

module.exports = app;