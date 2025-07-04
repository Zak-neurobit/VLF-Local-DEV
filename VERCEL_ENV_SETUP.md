# Vercel Environment Variables Setup Guide

This guide will help you configure the necessary environment variables in Vercel for the Vasquez Law Firm website.

## Required Environment Variables

### 1. Database Configuration

```
DATABASE_URL = "your-postgres-connection-string"
```

- Get this from Vercel Postgres or your PostgreSQL provider
- Format: `postgresql://username:password@host:port/database`

### 2. Authentication

```
NEXTAUTH_SECRET = "generate-a-secure-32-character-string"
NEXTAUTH_URL = "https://your-domain.vercel.app"
```

- Generate secret: `openssl rand -base64 32`
- Update URL to your actual domain

### 3. AI Services (Required for full functionality)

```
OPENAI_API_KEY = "sk-..."
```

- Get from: https://platform.openai.com/api-keys

### 4. GoHighLevel Integration (CRM)

```
GHL_API_KEY = "your-api-key"
GHL_LOCATION_ID = "your-location-id"
GHL_CALENDAR_ID = "your-calendar-id"
GHL_MAIN_PIPELINE_ID = "your-pipeline-id"
GHL_NEW_LEADS_STAGE_ID = "your-stage-id"
GHL_DEFAULT_USER_ID = "your-user-id"
```

- Get from your GoHighLevel account settings

### 5. SMS & Voice Campaigns (GoHighLevel)

```
GHL_APPOINTMENT_REMINDER_CAMPAIGN_ID = "your-campaign-id"
GHL_CASE_UPDATE_CAMPAIGN_ID = "your-campaign-id"
GHL_WELCOME_CAMPAIGN_ID = "your-campaign-id"
GHL_GENERAL_NOTIFICATION_CAMPAIGN_ID = "your-campaign-id"
GHL_AUTO_RESPONSE_CAMPAIGN_ID = "your-campaign-id"
GHL_PHONE_ENABLED = "true"
```

- SMS and calls are now handled through GoHighLevel campaigns
- Set up campaigns in your GoHighLevel account

### 6. Voice Agent (Retell AI)

```
RETELL_API_KEY = "your-api-key"
RETELL_WEBHOOK_SECRET = "your-webhook-secret"
```

- Get from: https://www.retellai.com

### 7. Email Configuration

```
SMTP_HOST = "smtp.office365.com"
SMTP_PORT = "587"
SMTP_USER = "your-email@vasquezlawnc.com"
SMTP_PASSWORD = "your-password"
EMAIL_FROM = "noreply@vasquezlawnc.com"
```

### 8. Analytics (Optional)

```
NEXT_PUBLIC_GOOGLE_ANALYTICS = "G-..."
NEXT_PUBLIC_GOOGLE_VERIFICATION = "verification-code"
SENTRY_DSN = "your-sentry-dsn"
```

## How to Add in Vercel

1. Go to your Vercel project dashboard
2. Click on "Settings" tab
3. Navigate to "Environment Variables"
4. Add each variable:
   - Key: Variable name (e.g., `DATABASE_URL`)
   - Value: Your actual value
   - Environment: Select all (Production, Preview, Development)
5. Click "Save" for each variable

## Priority Order

1. **Critical (Site won't function properly):**

   - DATABASE_URL
   - NEXTAUTH_SECRET
   - NEXTAUTH_URL

2. **Important (Key features won't work):**

   - OPENAI_API_KEY (for AI chat)
   - SMTP\_\* variables (for contact forms)

3. **Nice to have (Enhanced features):**
   - GHL\_\* campaign variables (SMS/voice campaigns)
   - RETELL\_\* variables (AI voice agent)
   - Analytics variables

## Testing

After adding variables:

1. Trigger a new deployment (push any change or click "Redeploy")
2. Check the deployment logs for any errors
3. Test key features:
   - Contact form submission
   - AI chat widget
   - Navigation between pages

## Security Notes

- Never commit these values to Git
- Use strong, unique passwords
- Rotate secrets regularly
- Enable 2FA on all service accounts
