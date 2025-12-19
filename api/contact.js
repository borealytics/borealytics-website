/**
 * Custom Backend Contact Form Handler
 * 
 * This is a prepared template for when you're ready to migrate from Web3Forms
 * to your own backend. Currently commented out and ready to use.
 * 
 * SETUP INSTRUCTIONS:
 * 1. Choose an email service (Resend, SendGrid, Mailgun, etc.)
 * 2. Install the SDK: npm install resend (or your chosen service)
 * 3. Set environment variables (see .env.example)
 * 4. Uncomment this code
 * 5. Update src/contact-service.js to use CustomBackendService
 * 6. Test thoroughly before deploying
 * 
 * This example uses Resend, but you can adapt it for any email service.
 */

/*
// Uncomment when ready to use
import { Resend } from 'resend';

const resend = new Resend(process.env.EMAIL_SERVICE_API_KEY);

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  // Extract form data
  const { name, email, phone, company, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Name, email, and message are required' 
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid email address' 
    });
  }

  try {
    // Send notification email to yourself
    await resend.emails.send({
      from: 'contact@borealytics.com', // Must be verified domain
      to: 'info@borealytics.com',
      subject: `[Borealytics Contact] ${subject || 'New Message'}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1b3c59; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #1b3c59; }
            .value { margin-top: 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              ${phone ? `
                <div class="field">
                  <div class="label">Phone:</div>
                  <div class="value">${phone}</div>
                </div>
              ` : ''}
              ${company ? `
                <div class="field">
                  <div class="label">Company:</div>
                  <div class="value">${company}</div>
                </div>
              ` : ''}
              <div class="field">
                <div class="label">Subject:</div>
                <div class="value">${subject || 'Not specified'}</div>
              </div>
              <div class="field">
                <div class="label">Message:</div>
                <div class="value">${message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    });

    // Optional: Send auto-reply to the user
    await resend.emails.send({
      from: 'contact@borealytics.com',
      to: email,
      subject: 'Thank you for contacting Borealytics',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1b3c59; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Thank You for Contacting Us</h2>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>Thank you for reaching out to Borealytics! We've received your message and will get back to you as soon as possible.</p>
              <p>Here's a copy of what you sent:</p>
              <blockquote style="border-left: 4px solid #1bbfbf; padding-left: 15px; margin: 20px 0;">
                ${message.replace(/\n/g, '<br>')}
              </blockquote>
              <p>Best regards,<br>
              The Borealytics Team</p>
            </div>
          </div>
        </body>
        </html>
      `
    });

    // Optional: Save to database
    // await db.contacts.create({
    //   name,
    //   email,
    //   phone,
    //   company,
    //   subject,
    //   message,
    //   createdAt: new Date()
    // });

    // Success response
    return res.status(200).json({ 
      success: true,
      message: 'Message sent successfully'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    // Don't expose internal errors to client
    return res.status(500).json({ 
      success: false,
      message: 'Failed to send message. Please try again later.'
    });
  }
}
*/

// Placeholder export for now
export default function handler(req, res) {
    res.status(503).json({
        success: false,
        message: 'Custom backend not yet configured. Please use Web3Forms.'
    });
}
