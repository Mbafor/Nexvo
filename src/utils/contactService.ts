// Contact Service for handling contact form submissions and notifications
// This service manages contact form submissions and integrates with email services

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  inquiryType: 'general' | 'support' | 'business' | 'bug' | 'feature';
  urgency: 'low' | 'medium' | 'high';
}

interface ContactSubmissionResult {
  success: boolean;
  message: string;
  ticketId?: string;
}

// Main contact message handler
export async function sendContactMessage(formData: ContactFormData): Promise<ContactSubmissionResult> {
  try {
    // Validate form data
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      throw new Error('Please fill in all required fields');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      throw new Error('Please enter a valid email address');
    }

    // Send to backend API
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to send message');
    }

    // Store in localStorage for backup/history (optional)
    const contactData = {
      ...formData,
      ticketId: result.ticketId,
      timestamp: new Date().toISOString(),
      status: 'sent',
      source: 'contact_form'
    };
    
    const existingContacts = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    existingContacts.push(contactData);
    localStorage.setItem('contactSubmissions', JSON.stringify(existingContacts));

    console.log('✅ Contact message sent successfully:', contactData);
    
    return {
      success: true,
      message: result.message || 'Thank you for your message! We\'ll get back to you soon.',
      ticketId: result.ticketId
    };

  } catch (error) {
    console.error('❌ Contact submission failed:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong. Please try again.'
    };
  }
}

// Note: Email sending is now handled by the /api/contact endpoint
// The API will send both confirmation emails to users and notifications to mbaforfoghang@gmail.com

// Get contact submissions (for admin dashboard)
export function getContactSubmissions(): any[] {
  try {
    return JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
  } catch (error) {
    console.error('❌ Failed to get contact submissions:', error);
    return [];
  }
}

// Get email queue (for production email service integration)
export function getEmailQueue(): any[] {
  try {
    return JSON.parse(localStorage.getItem('emailQueue') || '[]');
  } catch (error) {
    console.error('❌ Failed to get email queue:', error);
    return [];
  }
}

// Clear email queue (after processing)
export function clearEmailQueue(): void {
  try {
    localStorage.removeItem('emailQueue');
    console.log('✅ Email queue cleared');
  } catch (error) {
    console.error('❌ Failed to clear email queue:', error);
  }
}

// Production email service setup instructions
export function getEmailServiceSetup(): any {
  return {
    emailService: 'For production deployment',
    providers: {
      sendGrid: {
        setup: 'npm install @sendgrid/mail',
        apiKey: 'Set SENDGRID_API_KEY environment variable',
        templates: {
          contact_confirmation: 'Create template for user confirmations',
          admin_notification: 'Create template for admin notifications'
        }
      },
      awsSES: {
        setup: 'npm install aws-sdk',
        config: 'Configure AWS credentials and SES service',
        templates: 'Set up SES email templates'
      },
      nodemailer: {
        setup: 'npm install nodemailer',
        config: 'Configure SMTP settings',
        templates: 'Create HTML email templates'
      }
    },
    backend: {
      endpoint: '/api/contact',
      method: 'POST',
      authentication: 'Optional: Add rate limiting and CSRF protection',
      storage: 'Store submissions in database (MongoDB, PostgreSQL, etc.)'
    },
    security: {
      rateLimiting: 'Limit contact form submissions per IP',
      validation: 'Server-side validation and sanitization',
      spam: 'Implement CAPTCHA or honeypot fields'
    }
  };
}

// Utility: Format contact data for display
export function formatContactData(contactData: any): string {
  return `
Contact Form Submission
======================
Ticket ID: ${contactData.ticketId}
Name: ${contactData.name}
Email: ${contactData.email}
Type: ${contactData.inquiryType}
Priority: ${contactData.urgency}
Subject: ${contactData.subject || 'No subject'}
Message: ${contactData.message}
Timestamp: ${contactData.timestamp}
  `.trim();
}

// Test function to simulate contact submissions
export function testContactService(): void {
  const testData: ContactFormData = {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Contact Form',
    message: 'This is a test message to verify the contact service is working correctly.',
    inquiryType: 'general',
    urgency: 'medium'
  };

  sendContactMessage(testData)
    .then(result => {
      console.log('✅ Contact service test successful:', result);
    })
    .catch(error => {
      console.error('❌ Contact service test failed:', error);
    });
}