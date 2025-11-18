import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message, inquiryType, urgency } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, email, and message are required' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Invalid email address format' 
      });
    }

    // Generate ticket ID
    const ticketId = `QCV-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Send email to admin (mbaforfoghang@gmail.com)
    const adminEmailResult = await resend.emails.send({
      from: 'noreply@quickcv.app', // You'll need to set up domain verification in Resend
      to: ['mbaforfoghang@gmail.com'],
      subject: `[QuickCV Contact] ${subject || 'New Contact Form Submission'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e5e9; border-radius: 8px;">
          <header style="background: #2563eb; color: white; padding: 20px; border-radius: 8px 8px 0 0; margin: -20px -20px 20px -20px;">
            <h1 style="margin: 0; font-size: 24px;">QuickCV Contact Form</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Ticket ID: ${ticketId}</p>
          </header>
          
          <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="margin: 0 0 10px 0; color: #1e293b; font-size: 18px;">Contact Details</h2>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 5px 0;"><strong>Inquiry Type:</strong> ${inquiryType || 'General'}</p>
            <p style="margin: 5px 0;"><strong>Urgency:</strong> ${urgency || 'Medium'}</p>
            <p style="margin: 5px 0;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <div style="background: white; padding: 15px; border: 1px solid #e1e5e9; border-radius: 8px;">
            <h3 style="margin: 0 0 10px 0; color: #1e293b;">Message</h3>
            <p style="margin: 0; line-height: 1.6; color: #374151;">${message}</p>
          </div>
          
          <footer style="margin-top: 20px; text-align: center; color: #6b7280; font-size: 12px;">
            <p>This email was sent from the QuickCV contact form.</p>
            <p>Reply directly to this email to respond to ${name}.</p>
          </footer>
        </div>
      `,
      replyTo: email, // Allow direct replies to the sender
    });

    // Send confirmation email to user
    const userConfirmationResult = await resend.emails.send({
      from: 'noreply@quickcv.app',
      to: [email],
      subject: `Thank you for contacting QuickCV - Ticket #${ticketId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e5e9; border-radius: 8px;">
          <header style="background: #2563eb; color: white; padding: 20px; border-radius: 8px 8px 0 0; margin: -20px -20px 20px -20px;">
            <h1 style="margin: 0; font-size: 24px;">Thank You for Contacting Us!</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">We've received your message</p>
          </header>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #2563eb;">
            <h2 style="margin: 0 0 10px 0; color: #1e293b; font-size: 18px;">Hi ${name}!</h2>
            <p style="margin: 0; line-height: 1.6; color: #374151;">
              Thank you for reaching out to QuickCV. We've received your message and will respond as soon as possible.
            </p>
          </div>
          
          <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="margin: 0 0 10px 0; color: #1e293b;">Your Support Ticket</h3>
            <p style="margin: 5px 0;"><strong>Ticket ID:</strong> ${ticketId}</p>
            <p style="margin: 5px 0;"><strong>Inquiry Type:</strong> ${inquiryType || 'General'}</p>
            <p style="margin: 5px 0;"><strong>Priority:</strong> ${urgency || 'Medium'}</p>
            <p style="margin: 5px 0;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <div style="background: white; padding: 15px; border: 1px solid #e1e5e9; border-radius: 8px; margin-bottom: 20px;">
            <h4 style="margin: 0 0 10px 0; color: #1e293b;">Expected Response Time</h4>
            <p style="margin: 0; color: #374151;">
              ${urgency === 'high' ? '• High Priority: Within 30 minutes' : 
                urgency === 'medium' ? '• Medium Priority: Within 2 hours' : 
                '• Low Priority: Within 24 hours'}
            </p>
          </div>
          
          <div style="text-align: center; margin: 20px 0;">
            <a href="mailto:mbaforfoghang@gmail.com" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
              Reply to this Email
            </a>
          </div>
          
          <footer style="margin-top: 20px; text-align: center; color: #6b7280; font-size: 12px;">
            <p>This is an automated confirmation. Please do not reply to this email.</p>
            <p>For urgent matters, contact us directly at <a href="mailto:mbaforfoghang@gmail.com">mbaforfoghang@gmail.com</a></p>
            <p>© 2025 QuickCV. All rights reserved.</p>
          </footer>
        </div>
      `,
    });

    console.log('Admin email sent:', adminEmailResult.data?.id);
    console.log('User confirmation sent:', userConfirmationResult.data?.id);

    return res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully! We\'ll get back to you soon.',
      ticketId,
      adminEmailId: adminEmailResult.data?.id,
      confirmationEmailId: userConfirmationResult.data?.id,
    });

  } catch (error) {
    console.error('Email sending error:', error);
    
    return res.status(500).json({
      success: false,
      error: 'Failed to send email. Please try again later or contact us directly.',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
}