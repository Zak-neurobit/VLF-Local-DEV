# Complete Vercel Environment Variables Setup Plan

## 📋 Overview

This guide provides step-by-step instructions for configuring all environment variables in Vercel to enable full functionality of the Vasquez Law Firm website.

## 🎯 Priority Levels

### Priority 1: Critical (Required for Basic Operation)

#### Core Configuration
```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://vlf-website-hodos-360.vercel.app
NEXTAUTH_URL=https://vlf-website-hodos-360.vercel.app
NEXTAUTH_SECRET=I+AXj2bBuatxT1fTIerq5v1Re04Umrk0Kn6nbLQrT5c=
```

#### Database (Choose One Option)

**Option A: Vercel Postgres (Recommended)**
1. In Vercel Dashboard, go to Storage tab
2. Click "Create Database" → Select "Postgres"
3. Name it "vasquez-law-db"
4. Vercel automatically adds DATABASE_URL

**Option B: Supabase**
1. Create account at supabase.com
2. Create new project
3. Go to Settings → Database
4. Copy connection string
```env
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

**Option C: Neon**
1. Create account at neon.tech
2. Create new project
3. Copy connection string from dashboard
```env
DATABASE_URL=postgresql://[USER]:[PASSWORD]@[HOST]/[DATABASE]?sslmode=require
```

### Priority 2: Important Features

#### OpenAI (AI Chat)
1. Go to platform.openai.com
2. Create API key in API Keys section
3. Add to Vercel:
```env
OPENAI_API_KEY=sk-...your-key...
```

#### Google Services
1. Go to console.cloud.google.com
2. Create new project or select existing
3. Enable APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
4. Create API key with restrictions
5. Add to Vercel:
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIza...your-key...
GOOGLE_PLACES_API_KEY=AIza...your-key...
```

#### Sentry (Error Tracking)
1. Create account at sentry.io
2. Create new project (Next.js)
3. Copy DSN from project settings
```env
SENTRY_DSN=https://...@sentry.io/...
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
SENTRY_AUTH_TOKEN=...your-token...
```

### Priority 3: Enhanced Features

#### Redis Cache (Choose One)

**Option A: Upstash (Recommended)**
1. Create account at upstash.com
2. Create Redis database
3. Copy credentials:
```env
REDIS_URL=redis://default:...@...-redis.upstash.io:6379
UPSTASH_REDIS_REST_URL=https://...-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=...your-token...
```

**Option B: Redis Cloud**
```env
REDIS_URL=redis://default:password@redis-12345.c1.us-east-1-2.ec2.cloud.redislabs.com:12345
```

#### Email Configuration

**Option A: SendGrid**
```env
SENDGRID_API_KEY=SG....
SENDGRID_FROM_EMAIL=info@vasquezlawnc.com
SENDGRID_FROM_NAME=Vasquez Law Firm
```

**Option B: SMTP (Office 365/Gmail)**
```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@vasquezlawnc.com
SMTP_PASSWORD=your-password
SMTP_FROM=info@vasquezlawnc.com
```

#### SMS (Twilio)
1. Create account at twilio.com
2. Get phone number
3. Copy credentials:
```env
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1234567890
TWILIO_MESSAGING_SERVICE_SID=MG...
```

### Priority 4: Advanced Integrations

#### GoHighLevel CRM
```env
GHL_API_KEY=your-api-key
GHL_LOCATION_ID=your-location-id
GHL_CALENDAR_ID=your-calendar-id
GHL_PIPELINE_ID=your-pipeline-id
GHL_LEAD_STAGE_ID=your-stage-id
GHL_CONSULTATION_STAGE_ID=your-stage-id
GHL_CLIENT_STAGE_ID=your-stage-id
GHL_CHAT_INQUIRY_CAMPAIGN_ID=your-campaign-id
GHL_WEBHOOK_SECRET=a7d6b4794adf5e0603ad1f90e7f20bc844ca542cc918efde154cc41accee1216
```

#### Retell AI (Voice Agents)
```env
RETELL_API_KEY=your-api-key
RETELL_AGENT_ID_GENERAL=your-agent-id
RETELL_AGENT_ID_IMMIGRATION=your-agent-id
RETELL_AGENT_ID_PERSONAL_INJURY=your-agent-id
RETELL_AGENT_ID_CRIMINAL_DEFENSE=your-agent-id
RETELL_AGENT_ID_WORKERS_COMP=your-agent-id
RETELL_AGENT_ID_INTAKE_SPECIALIST=your-agent-id
RETELL_MAIN_NUMBER=+1234567890
RETELL_WEBHOOK_SECRET=479de02f66e8208f2cc9a6f0c1ac3451a5166dac701d10773f19427c98fc92ea
```

#### Payment Processing

**Stripe**
```env
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_4ef8a6e38a4415f5ba78dcc9e3e64ff66536e0d00324da6a2297db4bea92f186
```

**LawPay**
```env
LAWPAY_API_KEY=your-api-key
LAWPAY_PUBLIC_KEY=your-public-key
LAWPAY_WEBHOOK_SECRET=b71c82280872416832c562c2863fef9514586414a4fb55eb
```

## 🚀 Deployment Steps

### 1. Add Variables to Vercel
1. Go to: https://vercel.com/hodos-360/vlf-website/settings/environment-variables
2. Click "Add New"
3. Enter key and value
4. Select all environments (Production, Preview, Development)
5. Click "Save"

### 2. Trigger Redeployment
```bash
# After adding all variables
npm run deploy:trigger
```

### 3. Verify Deployment
1. Check build logs in Vercel
2. Visit site and test features
3. Check browser console for errors

## 🧪 Testing Configuration

### Test Database Connection
```bash
npm run test:db
```

### Test All APIs
```bash
npm run test:apis
```

### Check Environment Status
```bash
npm run check:env
```

## 🔍 Troubleshooting

### Common Issues

1. **"Database connection failed"**
   - Verify DATABASE_URL is correct
   - Check if database allows connections from Vercel IPs
   - Try USE_MOCK_DATABASE=true temporarily

2. **"OpenAI API error"**
   - Verify API key is active
   - Check OpenAI usage limits
   - Ensure key has proper permissions

3. **"Email not sending"**
   - Verify SMTP credentials
   - Check firewall/security settings
   - Try USE_MOCK_EMAIL=true for testing

4. **"Maps not displaying"**
   - Verify Google API key
   - Check API restrictions
   - Ensure Maps API is enabled

## 📊 Progressive Enhancement Strategy

### Phase 1: Basic Site (Day 1)
- Core variables
- Database
- Authentication

### Phase 2: AI & Maps (Day 2)
- OpenAI
- Google Maps
- Sentry

### Phase 3: Communication (Week 1)
- Email
- SMS
- Basic CRM

### Phase 4: Advanced (Week 2)
- Voice agents
- Payment processing
- Full CRM integration

## 🔒 Security Best Practices

1. **Never commit secrets to Git**
2. **Use different values for production/development**
3. **Rotate secrets regularly**
4. **Limit API key permissions**
5. **Monitor usage and alerts**

## 📝 Next Steps

After configuring environment variables:

1. Deploy the application
2. Run integration tests
3. Configure custom domain
4. Set up monitoring
5. Enable advanced features gradually

For questions or issues, consult the documentation or contact support.