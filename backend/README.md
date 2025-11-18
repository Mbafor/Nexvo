# Backend API

This folder contains the backend API endpoints for the QuickCV application.

## Structure

- `contact.ts` - Contact form handler with email notifications
- `parse-cv.ts` - CV parsing using OpenAI API  
- `rewrite.ts` - AI-powered text rewriting for CV content

## Deployment

These files are deployed as serverless functions on Vercel. The routing is configured in `vercel.json` to map `/api/*` routes to `/backend/*` files.

## Environment Variables

Make sure to set the following environment variables:

- `OPENAI_API_KEY` - Your OpenAI API key for AI features
- `RESEND_API_KEY` - Your Resend API key for email functionality

## API Endpoints

### POST /api/contact
Handles contact form submissions and sends emails.

**Body:**
```json
{
  "name": "string",
  "email": "string", 
  "subject": "string",
  "message": "string",
  "inquiryType": "string",
  "urgency": "string"
}
```

### POST /api/parse-cv
Parses CV content using AI and returns structured data.

**Body:**
```json
{
  "text": "string",
  "url": "string" // optional alternative to text
}
```

### POST /api/rewrite
Rewrites text content using AI for professional CV writing.

**Body:**
```json
{
  "text": "string",
  "context": "string" // optional context
}
```