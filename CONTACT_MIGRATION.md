# Contact Form Migration Guide

## Current Setup: Web3Forms

The contact form currently uses Web3Forms, a third-party service that handles form submissions and sends emails to your inbox.

### Advantages
- ✅ No backend code required
- ✅ Free up to 250 submissions/month
- ✅ Reliable email delivery
- ✅ Spam protection included
- ✅ Easy to set up (5 minutes)

### Setup Instructions

1. **Create a Web3Forms account**
   - Visit [web3forms.com](https://web3forms.com)
   - Sign up for a free account
   - Create a new form and get your Access Key

2. **Configure environment variable**
   ```bash
   # Create .env file from example
   cp .env.example .env
   
   # Edit .env and add your key
   VITE_WEB3FORMS_KEY=your_actual_access_key_here
   ```

3. **Test the form**
   - Run `npm run dev`
   - Navigate to the contact page
   - Submit a test message
   - Check your email inbox

---

## Future Migration: Custom Backend

When you're ready to migrate to a custom backend (for more control, analytics, or CRM integration), follow these steps:

### Step 1: Choose Your Stack

**Option A: Serverless Functions** (Recommended)
- Vercel Functions
- Netlify Functions
- Cloudflare Workers

**Option B: Traditional Backend**
- Node.js + Express
- Python + Flask/FastAPI
- Any backend framework

### Step 2: Set Up Email Service

Choose an email service provider:
- **Resend** (Recommended - modern, developer-friendly)
- **SendGrid** (Popular, generous free tier)
- **Mailgun** (Reliable, good for high volume)
- **Amazon SES** (Cheapest for high volume)

### Step 3: Implement the Backend

The prepared backend code is in `api/contact.js` (currently commented out).

**Example using Vercel + Resend:**

```javascript
// api/contact.js
import { Resend } from 'resend';

const resend = new Resend(process.env.EMAIL_SERVICE_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, company, subject, message } = req.body;

  try {
    // Send email to yourself
    await resend.emails.send({
      from: 'contact@borealytics.com',
      to: 'info@borealytics.com',
      subject: `[Contact Form] ${subject || 'New Message'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    // Optional: Send auto-reply to user
    await resend.emails.send({
      from: 'contact@borealytics.com',
      to: email,
      subject: 'Thank you for contacting Borealytics',
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for reaching out! We've received your message and will get back to you soon.</p>
        <p>Best regards,<br>The Borealytics Team</p>
      `
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}
```

### Step 4: Update Environment Variables

```bash
# .env
VITE_USE_CUSTOM_BACKEND=true
EMAIL_SERVICE_API_KEY=re_your_resend_api_key
```

### Step 5: Activate Custom Backend

In `src/contact-service.js`, uncomment the `CustomBackendService` class (lines are already prepared).

### Step 6: Test

1. Test locally with your backend
2. Verify emails are sent correctly
3. Test auto-reply functionality
4. Check error handling

### Step 7: Deploy

1. Deploy your backend (Vercel/Netlify will auto-deploy functions)
2. Set environment variables in your hosting platform
3. Test in production
4. Monitor for any issues

---

## Migration Checklist

- [ ] Choose email service provider
- [ ] Create account and get API key
- [ ] Implement backend endpoint
- [ ] Test email sending locally
- [ ] Test auto-reply (optional)
- [ ] Set up environment variables
- [ ] Uncomment CustomBackendService in contact-service.js
- [ ] Update VITE_USE_CUSTOM_BACKEND=true
- [ ] Test thoroughly
- [ ] Deploy to production
- [ ] Monitor submissions
- [ ] (Optional) Set up database for storing submissions
- [ ] (Optional) Create admin dashboard
- [ ] (Optional) Integrate with CRM

---

## Estimated Time

- **Web3Forms Setup**: 5 minutes
- **Custom Backend Migration**: 1-2 hours
- **With Database + Dashboard**: 4-8 hours

---

## Cost Comparison

| Solution | Free Tier | Paid Plans |
|----------|-----------|------------|
| Web3Forms | 250/month | $9/month for 1000 |
| Resend | 100/day | $20/month for 50k |
| SendGrid | 100/day | $15/month for 50k |
| Custom (Vercel) | Generous | Pay as you go |

---

## Support

If you need help with migration, refer to:
- Web3Forms docs: https://docs.web3forms.com
- Resend docs: https://resend.com/docs
- Vercel Functions: https://vercel.com/docs/functions
