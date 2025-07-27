# Email Configuration Guide for Vasquez Law Firm Website

## Overview

The Vasquez Law Firm website uses email functionality for:

- Contact form submissions
- Case evaluation notifications
- Appointment confirmations and reminders
- Client notifications
- Newsletter subscriptions
- Password resets
- Urgent lead alerts

## Email Service Architecture

The website uses two email service implementations:

1. **Primary Service** (`/src/services/email/index.ts`) - Office 365 focused
2. **Enhanced Service** (`/src/services/email.service.ts`) - Generic SMTP with templates

Both services are configured to work with various email providers.

## Required Environment Variables

### Core Email Settings

```bash
# The "from" address for all emails
EMAIL_FROM=info@vasquezlawnc.com

# SMTP Configuration
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=info@vasquezlawnc.com
SMTP_PASSWORD=your-app-password
SMTP_SECURE=false  # true for port 465, false for 587

# Office 365 Specific (if using Office 365)
OFFICE365_EMAIL=info@vasquezlawnc.com
OFFICE365_PASSWORD=your-app-password
```

### Email Routing

```bash
# Where different types of emails are sent
CONTACT_EMAIL=leads@vasquezlawfirm.com      # Contact form submissions
ATTORNEY_EMAIL=attorneys@vasquezlawnc.com   # Case evaluations
URGENT_LEAD_EMAILS=attorney1@vasquezlawnc.com,attorney2@vasquezlawnc.com  # Urgent leads
```

### Development Settings

```bash
# For local development without sending real emails
MOCK_EMAIL=true   # Logs emails to console instead of sending
MOCK_SMS=true     # Logs SMS to console instead of sending
DISABLE_EMAIL_SERVICE=false  # Completely disables email service
```

## Email Provider Setup

### 1. Gmail Setup

1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" as the app
   - Copy the 16-character password

3. Configure environment variables:

```bash
EMAIL_FROM=your-email@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-16-character-app-password
SMTP_SECURE=false
```

### 2. Office 365 / Microsoft 365 Setup

1. Enable 2-Factor Authentication on your Microsoft account
2. Generate an App Password:
   - Go to https://account.microsoft.com/security
   - Click on "Advanced security options"
   - Under "App passwords", create a new password

3. Configure environment variables:

```bash
EMAIL_FROM=info@vasquezlawnc.com
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=info@vasquezlawnc.com
SMTP_PASSWORD=your-app-password
OFFICE365_EMAIL=info@vasquezlawnc.com
OFFICE365_PASSWORD=your-app-password
SMTP_SECURE=false
```

### 3. SendGrid Setup (Recommended for Production)

1. Create a SendGrid account at https://sendgrid.com
2. Generate an API Key:
   - Go to Settings > API Keys
   - Create a new API key with "Full Access"

3. Configure environment variables:

```bash
EMAIL_FROM=info@vasquezlawnc.com
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey  # Literally the word "apikey"
SMTP_PASSWORD=your-sendgrid-api-key
SMTP_SECURE=false
```

### 4. Mailgun Setup

1. Create a Mailgun account at https://mailgun.com
2. Verify your domain
3. Get SMTP credentials from Dashboard > Sending > Domain settings

4. Configure environment variables:

```bash
EMAIL_FROM=info@vasquezlawnc.com
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@your-domain.mailgun.org
SMTP_PASSWORD=your-mailgun-password
SMTP_SECURE=false
```

## Email Templates

The system includes pre-built templates for:

- **contact-form** - New contact form submissions
- **case-evaluation** - Case evaluation requests
- **appointment-confirmation** - Appointment booking confirmations
- **appointment-reminder** - Appointment reminders
- **newsletter-welcome** - Newsletter subscription welcome
- **client-notification** - Generic client notifications
- **attorney-notification** - Internal attorney notifications
- **urgent-lead-notification** - High-priority lead alerts
- **password-reset** - Password reset requests
- **case-update** - Case status updates
- **document-ready** - Document availability notifications
- **payment-receipt** - Payment confirmations
- **consultation-followup** - Post-consultation follow-ups

## Testing Email Configuration

### 1. Local Development Testing

```bash
# Set in .env.local
MOCK_EMAIL=true  # This will log emails to console instead of sending

# Run the development server
npm run dev

# Submit a contact form and check the console for email logs
```

### 2. Test Email Sending

Create a test script `test-email.js`:

```javascript
require('dotenv').config({ path: '.env.local' });
const { emailService } = require('./src/services/email.service');

async function testEmail() {
  try {
    const result = await emailService.sendEmail({
      to: 'test@example.com',
      subject: 'Test Email',
      template: 'client-notification',
      data: {
        name: 'Test User',
        email: 'test@example.com',
      },
    });

    console.log('Email sent:', result);
  } catch (error) {
    console.error('Email failed:', error);
  }
}

testEmail();
```

### 3. Production Testing

Use the website's contact form with a real email address to verify emails are being sent and received properly.

## Production Checklist

### DNS Configuration

1. **SPF Record**: Add to your DNS

   ```
   v=spf1 include:spf.protection.outlook.com -all  # For Office 365
   v=spf1 include:sendgrid.net -all  # For SendGrid
   ```

2. **DKIM**: Configure through your email provider's dashboard

3. **DMARC Record**: Add to your DNS
   ```
   v=DMARC1; p=quarantine; rua=mailto:dmarc@vasquezlawnc.com
   ```

### Security Best Practices

1. **Never commit real passwords** to version control
2. **Use app passwords** instead of account passwords
3. **Rotate passwords** regularly
4. **Monitor bounce rates** to maintain sender reputation
5. **Set up email authentication** (SPF, DKIM, DMARC)
6. **Use environment variables** for all sensitive data

### Monitoring

1. **Check email logs** regularly for failures
2. **Monitor delivery rates** through your provider's dashboard
3. **Set up alerts** for failed email sends
4. **Track bounce and complaint rates**

## Troubleshooting

### Common Issues

1. **"Authentication failed"**
   - Verify app password is correct
   - Check if 2FA is enabled on the email account
   - Ensure SMTP settings match provider requirements

2. **"Connection timeout"**
   - Check firewall settings
   - Verify SMTP host and port
   - Try different ports (587, 465, 25)

3. **"Emails not being received"**
   - Check spam folders
   - Verify SPF/DKIM records
   - Test with different recipient addresses

4. **"Rate limit exceeded"**
   - Implement email queuing
   - Reduce sending frequency
   - Upgrade email service plan

### Debug Mode

Enable detailed logging:

```javascript
// In your email service
const transporter = nodemailer.createTransport({
  // ... your config
  logger: true,
  debug: true,
});
```

## Email Service Comparison

| Provider   | Monthly Limit    | Cost              | Best For       |
| ---------- | ---------------- | ----------------- | -------------- |
| Gmail      | 500/day          | Free              | Development    |
| Office 365 | 10,000/day       | $6/month          | Small business |
| SendGrid   | 100/day free     | $15/month for 40k | Production     |
| Mailgun    | 5,000/month free | $35/month for 50k | High volume    |
| AWS SES    | Pay per email    | $0.10 per 1000    | Large scale    |

## Support

For email configuration issues:

1. Check this documentation first
2. Review error logs in the application
3. Verify DNS records are properly configured
4. Contact your email service provider's support

## Next Steps

1. Choose an email provider based on your needs
2. Set up the required environment variables
3. Test email sending in development
4. Configure DNS records for production
5. Monitor email delivery rates
