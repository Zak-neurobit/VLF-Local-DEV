# Netlify Environment Variables

Copy and paste these into your Netlify dashboard under Site Settings > Environment Variables.

## Essential Variables (Required)

```bash
# Core Configuration
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://www.vasquezlawnc.com
SKIP_ENV_VALIDATION=true
NEXT_TELEMETRY_DISABLED=1

# Database
DATABASE_URL=postgresql://neondb_owner:npg_eCqcU6ELgvJ5@ep-old-mode-a4bj2csn-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
DIRECT_URL=postgresql://neondb_owner:npg_eCqcU6ELgvJ5@ep-old-mode-a4bj2csn-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require

# NextAuth
NEXTAUTH_URL=https://www.vasquezlawnc.com
NEXTAUTH_SECRET=QnJ386rd1BIjDuiik6ccHXD3OVtNxMBo/3F+IOJLu+M=

# OpenAI (temporary build key)
OPENAI_API_KEY=sk-build-key-for-testing-only
```

## GoHighLevel Integration

```bash
GHL_API_KEY=pit-074edd23-15bf-4ca0-a139-30d3f4d16fff
GHL_LOCATION_ID=bd05Y9SlF1EmxJDB9hvR
GHL_CALENDAR_ID=5z2WuUFQ6ni32e4LFJCS
GHL_MAIN_PIPELINE_ID=VGLPZFfUMVkOdzqWyMjL
GHL_NEW_LEADS_STAGE_ID=487cb766-3d4d-4994-9c3a-034ce18dfb19
GHL_DEFAULT_USER_ID=NY0V55WaKEXS9fyqEMXo
GHL_API_URL=https://services.leadconnectorhq.com
GHL_PHONE_ENABLED=true
GHL_SMS_ENABLED=true
GHL_OUTBOUND_PHONE_NUMBER=+19843141001
```

## Analytics (Add when available)

```bash
# Google Analytics
NEXT_PUBLIC_GA_ID=

# Google Tag Manager
NEXT_PUBLIC_GTM_ID=

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
```

## Email Configuration (Optional for now)

```bash
# SMTP Settings
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=noreply@vasquezlawnc.com
SMTP_PASSWORD=
EMAIL_FROM=Vasquez Law Firm <noreply@vasquezlawnc.com>
EMAIL_REPLY_TO=info@vasquezlawnc.com

# Alternative Email Services
RESEND_API_KEY=
SENDGRID_API_KEY=
```

## Payment Processing (Add when ready)

```bash
# LawPay
LAWPAY_PUBLIC_KEY=pk_test_placeholder
LAWPAY_SECRET_KEY=sk_test_placeholder
LAWPAY_TRUST_ACCOUNT_ID=
LAWPAY_OPERATING_ACCOUNT_ID=

# Stripe (if using)
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

## Voice Services (Add when ready)

```bash
# Twilio
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=

# Retell AI
RETELL_API_KEY=
```

## Error Tracking (Add when ready)

```bash
SENTRY_DSN=
SENTRY_AUTH_TOKEN=
```

## Social Media APIs (Add when ready)

```bash
FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=
INSTAGRAM_ACCESS_TOKEN=
TWITTER_API_KEY=
TWITTER_API_SECRET=
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=
```

## SEO Tools (Add when ready)

```bash
MOZ_API_KEY=
ADSY_API_KEY=
AP_NEWS_API_KEY=
```

## Redis (Not needed for static site)

```bash
# These are only needed if using server-side features
# REDIS_URL=
# REDIS_HOST=
# REDIS_PORT=
# REDIS_PASSWORD=
```

## How to Add in Netlify

1. Go to https://app.netlify.com
2. Select your site
3. Go to Site Settings > Environment Variables
4. Click "Add a variable"
5. Choose "Add a single variable" or "Import from a .env file"
6. Add each variable with its key and value
7. Save changes

## Important Notes

- Environment variables starting with `NEXT_PUBLIC_` are exposed to the browser
- All other variables are server-side only (but since this is a static site, they're only used during build)
- Some variables like Redis are not needed for static export
- Add payment and voice service keys only when those features are ready
- The database is only accessed during build time for static generation

## Build Settings in Netlify

Make sure these are set:

- Build command: `npm run build:netlify`
- Publish directory: `out`
- Node version: 22.11.0 (set in Environment Variables as `NODE_VERSION`)
