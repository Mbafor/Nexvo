# Email Service Setup - QuickCV

This project now has a fully functional email service that sends all contact form submissions to `mbaforfoghang@gmail.com`.

## Features Implemented

### ✅ Contact Forms
All contact forms in the application are now working and sending emails:

1. **Landing Page Contact Form** (`src/pages/LandingPage.tsx`)
   - Quick contact form in the footer section
   - Sends to mbaforfoghang@gmail.com

2. **Main Contact Page** (`src/pages/ContactPage.tsx`)
   - Full featured contact form with inquiry types and urgency levels
   - Professional email templates
   - Sends to mbaforfoghang@gmail.com

3. **Dashboard Support Form** (`src/components/Dashboard.tsx`)
   - Quick support request form for logged-in users
   - Includes user context (name, email from auth)
   - Sends to mbaforfoghang@gmail.com

### ✅ Email Service Architecture

#### Backend API
- **File**: `api/contact.ts`
- **Endpoint**: `/api/contact`
- **Method**: POST
- **Service**: Resend (https://resend.com)

#### Frontend Service
- **File**: `src/utils/contactService.ts`
- **Function**: `sendContactMessage()`
- **Features**: Form validation, API calls, error handling

### ✅ Email Features
- **Admin Notifications**: All form submissions go to mbaforfoghang@gmail.com
- **User Confirmations**: Users receive confirmation emails with ticket IDs
- **Professional Templates**: HTML email templates with branding
- **Error Handling**: Graceful fallbacks and user feedback
- **Form Validation**: Client-side and server-side validation

## Setup Instructions

### 1. Get Resend API Key
1. Sign up at https://resend.com
2. Create an API key in your dashboard
3. Add the API key to your environment variables

### 2. Environment Variables
Update your `.env` file with:
```env
RESEND_API_KEY=re_YourAPIKeyHere
```

### 3. Domain Verification (Optional but Recommended)
For production use:
1. Add your domain in Resend dashboard
2. Verify domain ownership
3. Update the `from` field in `api/contact.ts` to use your domain

### 4. Deploy to Vercel
The API endpoint will automatically work when deployed to Vercel as a serverless function.

## Email Template Customization

The email templates in `api/contact.ts` can be customized:
- **Admin notification template**: Sent to mbaforfoghang@gmail.com
- **User confirmation template**: Sent to form submitters
- **Branding**: Update colors, logos, and styling
- **Content**: Modify text and structure as needed

## Testing

### Local Development
1. Set up environment variables
2. Run `npm run dev`
3. Test forms at:
   - `/` (Landing page contact)
   - `/contact` (Main contact page)
   - Dashboard support form (when logged in)

### Production Testing
After deployment, all forms will send real emails to mbaforfoghang@gmail.com.

## Form Types Supported

All forms collect:
- **Name**: User's full name
- **Email**: User's email address (for replies)
- **Message**: The actual message/support request
- **Inquiry Type**: General, Support, Technical, Business, etc.
- **Urgency**: Low, Medium, High priority levels

## Response Times Communicated

The system tells users to expect responses:
- **High Priority**: Within 30 minutes
- **Medium Priority**: Within 2 hours  
- **Low Priority**: Within 24 hours

## Troubleshooting

### Email Not Sending
1. Check Resend API key is valid
2. Verify environment variables are set
3. Check browser console for errors
4. Check Vercel function logs

### Domain Issues
If using a custom domain, ensure:
1. Domain is verified in Resend
2. DNS records are properly configured
3. `from` field matches verified domain

### Rate Limiting
Resend has rate limits. For high volume:
1. Upgrade Resend plan
2. Implement client-side rate limiting
3. Add CAPTCHA if needed

## Support

For issues with the email service, contact:
- **Primary**: mbaforfoghang@gmail.com
- **Technical**: Check logs in Vercel dashboard
- **Service**: Resend support documentation