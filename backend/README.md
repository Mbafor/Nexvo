# CV Parser Backend API

## 🚀 Enhanced CV/Resume Parsing API

This backend service provides intelligent CV/Resume parsing capabilities with AI-powered extraction and confidence scoring.

### Features

- ✅ **Multi-format Support**: PDF, Word (DOC/DOCX), Plain Text
- ✅ **Intelligent Parsing**: Advanced pattern recognition for CV sections
- ✅ **Confidence Scoring**: Field-level accuracy assessment
- ✅ **Enhanced Extraction**: Smart detection of personal info, experience, education, skills
- ✅ **Error Handling**: Comprehensive validation and error recovery
- ✅ **CORS Support**: Ready for frontend integration
- ✅ **File Validation**: Type and size checking
- ✅ **Metadata Tracking**: Processing time and extraction method logging

### 📦 Installation

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm run dev
```

4. **Or start production server:**
```bash
npm start
```

### 🔧 Dependencies

The following packages will be installed:

- **express**: Web framework
- **multer**: File upload handling
- **cors**: Cross-origin requests
- **pdf-parse**: PDF text extraction
- **mammoth**: Word document processing
- **helmet**: Security middleware
- **dotenv**: Environment variables

### 🌐 API Endpoints

#### Health Check
```
GET /api/health
```

Response:
```json
{
  "status": "ok",
  "message": "CV Parser API is running",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "version": "1.0.0"
}
```

#### Parse Resume
```
POST /api/parse-resume
```

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body:
  - `resume`: File (PDF, DOC, DOCX, TXT)
  - `options`: JSON string with parsing options

**Response:**
```json
{
  "success": true,
  "data": {
    "personalInfo": {
      "fullName": "John Doe",
      "email": "john.doe@example.com",
      "phone": "(555) 123-4567",
      "location": "New York, NY",
      "linkedin": "https://linkedin.com/in/johndoe",
      "website": "https://johndoe.com",
      "summary": "Experienced software developer..."
    },
    "experience": [
      {
        "id": "exp_1",
        "company": "Tech Corp",
        "position": "Senior Developer",
        "location": "San Francisco, CA",
        "startDate": "Jan 2020",
        "endDate": "Present",
        "current": true,
        "description": "Led development of web applications..."
      }
    ],
    "education": [...],
    "skills": [...],
    "projects": [...],
    "certifications": [...],
    "languages": [...],
    "achievements": [...],
    "volunteerWork": [...],
    "hobbies": [...]
  },
  "extractedText": "First 1000 characters of extracted text...",
  "confidence": 85,
  "metadata": {
    "fileSize": 245760,
    "fileName": "resume.pdf",
    "fileType": "application/pdf",
    "extractionMethod": "pdf-parse",
    "pageCount": 2,
    "processingTime": 1250,
    "fieldConfidence": {
      "name": 90,
      "email": 95,
      "phone": 85,
      "experience": 80,
      "education": 80,
      "skills": 75
    },
    "qualityScore": 85
  }
}
```

### 🔄 Frontend Integration

Update your frontend parser to use the backend API:

```typescript
// In your advancedFileParser2.tsx
const useBackendAPI = true; // Toggle backend usage

if (useBackendAPI) {
  const result = await parseWithBackendAPI(file, options);
  return result;
}
```

Make sure your frontend is running on the allowed origins (localhost:3000 or localhost:5173).

### 🛠️ Development

1. **Start the backend in development mode:**
```bash
npm run dev
```

2. **Test the health endpoint:**
```bash
curl http://localhost:3001/api/health
```

3. **Test CV parsing with a file:**
```bash
curl -X POST \
  -F "resume=@path/to/your/resume.pdf" \
  -F "options={\"useAdvancedParsing\": true}" \
  http://localhost:3001/api/parse-resume
```

### 📝 Configuration

Create a `.env` file in the backend directory for environment variables:

```env
PORT=3001
NODE_ENV=development
MAX_FILE_SIZE=26214400
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### 🚦 Error Codes

- **400**: Bad Request (no file uploaded, invalid file type)
- **413**: File too large (> 25MB)
- **415**: Unsupported file type
- **500**: Internal server error (parsing failed)

### 🔮 Future Enhancements

- **OpenAI Integration**: Enhanced AI-powered parsing
- **OCR Support**: Image-based text extraction
- **Multi-language**: International CV format support
- **Database Storage**: Parsed data persistence
- **Authentication**: User-based parsing limits
- **Batch Processing**: Multiple file uploads

### 📚 Usage Notes

1. **File Size Limit**: Maximum 25MB per file
2. **Supported Formats**: PDF, DOC, DOCX, TXT
3. **Processing Time**: Varies by file size and complexity
4. **Confidence Scoring**: 0-100% accuracy estimation
5. **Field Validation**: Built-in data quality checks

Start the backend server and your enhanced CV parser will be ready to use! 🎉