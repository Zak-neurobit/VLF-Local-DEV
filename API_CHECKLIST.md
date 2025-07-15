# API Configuration Checklist

Use this checklist to ensure all APIs are properly configured for the Vasquez Law Firm website.

## 🔴 Critical APIs (Required)

### ✅ Database (PostgreSQL)

- [ ] PostgreSQL installed locally or cloud instance ready
- [ ] Database created: `vasquez_law`
- [ ] `DATABASE_URL` configured in `.env.local`
- [ ] Run `npm run setup:db` to initialize schema
- [ ] Test with: `npm run test:db`

### ✅ Authentication

- [ ] `NEXTAUTH_URL` set to your domain
- [ ] `NEXTAUTH_SECRET` generated (use `openssl rand -base64 32`)
- [ ] Test login functionality works

### ✅ OpenAI API

- [ ] Account created at https://platform.openai.com
- [ ] API key generated
- [ ] `OPENAI_API_KEY` added to `.env.local`
- [ ] Billing enabled with usage limits set
- [ ] Test with: `npm run test:openai`

### ✅ GoHighLevel (CRM)

- [ ] GHL account active
- [ ] API key generated in Settings > API Keys
- [ ] All required IDs collected:
  - [ ] `GHL_API_KEY`
  - [ ] `GHL_LOCATION_ID`
  - [ ] `GHL_CALENDAR_ID`
  - [ ] `GHL_MAIN_PIPELINE_ID`
  - [ ] `GHL_NEW_LEADS_STAGE_ID`
  - [ ] `GHL_DEFAULT_USER_ID`
- [ ] Campaigns created for automation:
  - [ ] New Lead Campaign
  - [ ] Chat Inquiry Campaign
  - [ ] Urgent Inquiry Campaign
  - [ ] Practice Area Campaigns (Immigration, PI, etc.)
- [ ] Test with: `npm run test:ghl`

## 🟡 Important APIs (Recommended)

### ✅ Redis (Caching)

- [ ] Redis installed or cloud instance (Redis Cloud, Upstash)
- [ ] `REDIS_URL` configured
- [ ] OR set `MOCK_REDIS=true` for development
- [ ] Test with: `npm run test:redis`

### ✅ Retell AI (Voice Agents)

- [ ] API key already provided: `2996bc9f-ca4e-422a-b64e-a09a3eaa9bc0`
- [ ] Webhook endpoints configured
- [ ] Voice agents created in Retell dashboard
- [ ] Phone numbers linked (via GHL)

### ✅ Email (SMTP)

- [ ] SMTP credentials obtained
- [ ] For Office 365:
  - [ ] App password generated
  - [ ] Less secure apps enabled (if needed)
- [ ] All email variables configured:
  - [ ] `EMAIL_FROM`
  - [ ] `SMTP_HOST`
  - [ ] `SMTP_PORT`
  - [ ] `SMTP_USER`
  - [ ] `SMTP_PASSWORD`
- [ ] Test with: `npm run test:email`

### ✅ Google Maps

- [ ] Google Cloud Console project created
- [ ] Maps JavaScript API enabled
- [ ] API key generated with restrictions
- [ ] `GOOGLE_MAPS_API_KEY` configured
- [ ] `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` configured
- [ ] Billing enabled
- [ ] Test with: `npm run test:apis`

### ✅ Error Tracking (Sentry)

- [ ] Sentry account created
- [ ] Next.js project created
- [ ] DSN obtained
- [ ] `SENTRY_DSN` configured
- [ ] Source maps configured for production

## 🟢 Optional APIs

### ✅ Payment Processing

Choose one:

#### Option A: LawPay

- [ ] LawPay account approved
- [ ] API credentials obtained
- [ ] Trust and operating accounts configured
- [ ] Test mode credentials for development

#### Option B: Stripe

- [ ] Stripe account created
- [ ] API keys obtained
- [ ] Webhook endpoint configured
- [ ] Test mode for development

### ✅ Google Analytics

- [ ] GA4 property created
- [ ] Measurement ID obtained
- [ ] `GOOGLE_ANALYTICS_ID` configured
- [ ] Tracking code verified

### ✅ Additional Services

- [ ] Google Search Console verified
- [ ] Google My Business claimed
- [ ] Yelp Business account (if using reviews)
- [ ] Social media APIs (if integrating)

## 🚀 Quick Setup Commands

1. **Initial Setup**:

   ```bash
   # Interactive setup wizard
   npm run setup:apis
   ```

2. **Test All APIs**:

   ```bash
   # Test all configured APIs
   npm run test:apis
   ```

3. **Test Individual APIs**:
   ```bash
   npm run test:db      # Database
   npm run test:redis   # Redis
   npm run test:openai  # OpenAI
   npm run test:ghl     # GoHighLevel
   npm run test:email   # Email
   ```

## 📝 Environment Variables Template

Copy this to your `.env.local`:

```env
# Core
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://www.vasquezlawfirm.com

# Database
DATABASE_URL=postgresql://user:pass@host:5432/vasquez_law

# Auth
NEXTAUTH_URL=https://www.vasquezlawfirm.com
NEXTAUTH_SECRET=your-generated-secret

# OpenAI
OPENAI_API_KEY=sk-your-key

# GoHighLevel
GHL_API_KEY=your-key
GHL_LOCATION_ID=your-id
GHL_CALENDAR_ID=your-id
GHL_MAIN_PIPELINE_ID=your-id
GHL_NEW_LEADS_STAGE_ID=your-id
GHL_DEFAULT_USER_ID=your-id

# Redis
REDIS_URL=redis://localhost:6379
MOCK_REDIS=false

# Retell AI
RETELL_API_KEY=2996bc9f-ca4e-422a-b64e-a09a3eaa9bc0
RETELL_WEBHOOK_SECRET=2996bc9f-ca4e-422a-b64e-a09a3eaa9bc0

# Email
EMAIL_FROM=info@vasquezlawnc.com
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=info@vasquezlawnc.com
SMTP_PASSWORD=your-password

# Google Maps
GOOGLE_MAPS_API_KEY=your-key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-key

# Sentry
SENTRY_DSN=https://your-dsn@sentry.io/id
```

## ✨ Verification

Once all APIs are configured:

1. Run `npm run test:apis` - All tests should pass
2. Start dev server: `npm run dev`
3. Test each feature:
   - [ ] Chat widget works
   - [ ] Contact forms submit
   - [ ] Maps display correctly
   - [ ] Voice agents connect
   - [ ] Emails send
   - [ ] Errors tracked in Sentry

## 🆘 Need Help?

- Check `API_SETUP_GUIDE.md` for detailed instructions
- Run `npm run setup:apis` for interactive setup
- Check logs: `tail -f logs/error.log`
- Contact support for each service
