# OpenAI Integration Setup Guide

## Overview
Your CV Builder now includes AI-powered text rewriting functionality. The "Rewrite with AI" button appears in text fields across multiple forms, allowing users to improve their CV content professionally.

## Setup Instructions

### 1. Install Dependencies
The OpenAI package has already been installed:
```bash
npm install openai
```

### 2. Environment Configuration
You need to add your OpenAI API key to your environment variables.

#### Create or Update `.env` file:
```
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

**Important:** Replace `your_openai_api_key_here` with your actual OpenAI API key from [OpenAI Dashboard](https://platform.openai.com/api-keys)

#### For Vercel Deployment:
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add: `VITE_OPENAI_API_KEY` with your OpenAI API key

### 3. API Model
The integration uses `gpt-3.5-turbo` model by default. You can change this in `src/utils/aiRewrite.ts`:
```typescript
model: 'gpt-3.5-turbo', // Change this to another model if needed
```

Available models: `gpt-3.5-turbo`, `gpt-4`, `gpt-4-turbo-preview`, etc.

## Features Implemented

### Components Added

1. **AIRewriteButton Component** (`src/components/common/AIRewriteButton.tsx`)
   - Reusable button for all forms
   - Shows loading state while processing
   - Displays error messages if API fails
   - Disabled when text field is empty

2. **AI Rewrite Utility** (`src/utils/aiRewrite.ts`)
   - Handles OpenAI API communication
   - Error handling and validation
   - Configurable context for better rewrites

### Forms Enhanced with "Rewrite with AI" Button

The following forms now have AI rewrite functionality:

1. **PersonalInfoForm** - Personal Summary section
2. **ExperienceForm** - Job Description section
3. **EducationForm** - Education Description section
4. **ProjectsForm** - Project Description section
5. **VolunteerForm** - Volunteer Description section
6. **AchievementsForm** - Achievement Description section

## How It Works

1. Users enter text in any supported form field
2. Click the "Rewrite with AI" button
3. The text is sent to OpenAI API with a professional context
4. The rewritten text is automatically inserted back into the field
5. Users can review and edit the result

## Usage Example

```typescript
import AIRewriteButton from '../common/AIRewriteButton';

// In your form component:
<AIRewriteButton
  text={fieldValue}
  onRewrite={(rewrittenText) => handleChange(rewrittenText)}
  context="professional summary"
/>
```

## Troubleshooting

### Issue: "OpenAI API key not configured"
- Ensure `VITE_OPENAI_API_KEY` is set in your `.env` file
- Restart your development server after adding the env variable
- For Vercel, ensure the environment variable is set in project settings

### Issue: "Failed to rewrite text: 429"
- This means you've hit the API rate limit
- Wait a moment before trying again
- Consider upgrading your OpenAI plan for higher limits

### Issue: "Failed to rewrite text: 401"
- Your API key is invalid or expired
- Check that your API key is correct in the `.env` file
- Generate a new key from OpenAI Dashboard if needed

### Issue: CORS errors in browser
- The configuration allows browser usage with `dangerouslyAllowBrowser: true`
- For production, consider moving API calls to a backend API route

## Security Considerations

⚠️ **Important for Production:**
The current implementation sends API keys from the browser. For production applications, consider:

1. Creating a backend API endpoint that calls OpenAI
2. Moving the API key to backend environment variables
3. Using server-to-server communication instead of browser-to-API

Example backend setup would look like:
```typescript
// api/rewrite.ts or similar
export default async function handler(req, res) {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Backend env var
  });
  // ... handle request
}
```

## Cost Considerations

- Each rewrite uses OpenAI API tokens
- GPT-3.5-turbo is the most cost-effective option (~$0.002 per 1K tokens)
- Monitor your usage at [OpenAI Usage Dashboard](https://platform.openai.com/account/usage/overview)
- Set usage limits to prevent unexpected charges

## Customization

### Change the AI Context
Modify the system prompt in `src/utils/aiRewrite.ts`:
```typescript
const response = await client.chat.completions.create({
  model: 'gpt-3.5-turbo',
  messages: [
    {
      role: 'system',
      content: 'Your custom system prompt here',
    },
    // ...
  ],
});
```

### Adjust Button Styling
Edit `src/components/common/AIRewriteButton.tsx` to customize colors, sizes, etc.

## Support
For OpenAI API documentation, visit: https://platform.openai.com/docs/api-reference
