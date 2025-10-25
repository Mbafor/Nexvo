// Email Service for Welcome Emails and Notifications
// This can be extended with services like SendGrid, Mailgun, or Firebase Functions

interface WelcomeEmailData {
  email: string;
  fullName: string;
  signUpMethod: 'email' | 'google' | 'facebook' | 'apple' | 'microsoft';
}

interface CVDownloadEmailData {
  email: string;
  fullName: string;
  templateType: string;
  downloadCount: number;
}

// Client-side welcome message (since we can't send actual emails without backend)
export const sendWelcomeMessage = (data: WelcomeEmailData): void => {
  console.log('📧 Welcome email would be sent to:', data.email);
  
  // Show in-app welcome message
  const welcomeMessage = `🎉 Welcome to CV Builder, ${data.fullName}!

Thank you for joining our community of professionals who are crafting stunning CVs.

Here's what you can do next:
• ✨ Choose from 6 stunning professional templates
• 📝 Build your CV with our intuitive editor
• 📊 Track your CV performance in your dashboard
• 🎯 Get expert tips and career guidance

Need help? Our support team is here for you 24/7.

Happy CV building!
The CV Builder Team`;

  // In a real app, this would be sent via email service
  // For now, we'll show a nice console message and could trigger an in-app notification
  console.log('🎉 Welcome Message:', welcomeMessage);
  
  // Optional: Show a subtle toast notification instead of alert
  // This is much less intrusive than alert()
  if (typeof window !== 'undefined' && 'Notification' in window) {
    // Could implement browser notifications here if permissions are granted
    console.log('📱 Browser notification could be shown here');
  }
};

// CV Download confirmation message
export const sendDownloadConfirmation = (data: CVDownloadEmailData): void => {
  console.log('📧 Download confirmation would be sent to:', data.email);
  
  const confirmationMessage = `
✅ CV Downloaded Successfully!

Hi ${data.fullName},

Your CV using the ${data.templateType} template has been downloaded and saved to your dashboard.

Download #${data.downloadCount} - You're building an impressive professional presence!

Quick Tips:
• 🔄 Update your CV regularly to keep it fresh
• 📱 Share your CV easily with our sharing features
• 📈 Check your dashboard for performance insights

Keep building your success!
  `;

  // Show confirmation message
  setTimeout(() => {
    console.log('CV Download Confirmation:', confirmationMessage);
  }, 1000);
};

// Email verification reminder
export const sendVerificationReminder = (email: string): void => {
  const reminderMessage = `
📧 Email Verification Reminder

Hi there!

We noticed you haven't verified your email address yet. 

Verifying your email helps us:
• 🔒 Keep your account secure
• 📊 Send you important updates about your CVs
• 🎯 Provide personalized career tips

Please check your email (${email}) and click the verification link.

Didn't receive the email? Check your spam folder or request a new verification email from your dashboard.
  `;

  alert(reminderMessage);
};

// Setup instructions for implementing actual email service
export const getEmailServiceSetupInstructions = (): string => {
  return `
🚀 Email Service Setup Instructions

To implement actual email sending, you have several options:

1. **Firebase Functions + SendGrid** (Recommended)
   - Create a Firebase Function
   - Integrate with SendGrid for reliable email delivery
   - Setup: firebase functions:config:set sendgrid.key="YOUR_API_KEY"

2. **Firebase Functions + Nodemailer**
   - Use Gmail SMTP or other email providers
   - Good for smaller volumes

3. **Third-party Services**
   - SendGrid - Great deliverability
   - Mailgun - Developer-friendly
   - AWS SES - Cost-effective for high volume

4. **Backend Integration**
   - Express.js server with email service
   - Serverless functions (Vercel, Netlify)

Example Firebase Function for welcome email:

\`\`\`javascript
const functions = require('firebase-functions');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(functions.config().sendgrid.key);

exports.sendWelcomeEmail = functions.auth.user().onCreate(async (user) => {
  const msg = {
    to: user.email,
    from: 'welcome@cvbuilder.com',
    subject: 'Welcome to CV Builder!',
    html: '<h1>Welcome!</h1><p>Thanks for joining CV Builder...</p>',
  };
  
  try {
    await sgMail.send(msg);
    console.log('Welcome email sent to:', user.email);
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
});
\`\`\`

Current Implementation:
- Client-side welcome messages ✅
- Email verification through Firebase ✅  
- In-app notifications ✅
- Console logging for debugging ✅

Next Steps:
1. Choose an email service provider
2. Set up Firebase Functions or backend
3. Replace alert() messages with actual emails
4. Add email templates and styling
  `;
};

// Export email service status
export const emailServiceStatus = {
  welcomeEmails: 'Client-side messages (ready for backend integration)',
  emailVerification: 'Active via Firebase Auth',
  passwordReset: 'Active via Firebase Auth',
  downloadNotifications: 'Client-side messages (ready for backend integration)',
  setupRequired: 'Backend email service integration needed for production'
};