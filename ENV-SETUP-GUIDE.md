# Environment Variable Setup Guide

This guide explains all environment variables used in the Vasquez Law Firm website and how to properly configure them.

## Quick Start

1. **Copy the example file:**

   ```bash
   cp .env.example .env.local
   ```

2. **Fill in required variables** (see Required Variables section below)

3. **Validate your setup:**
   ```bash
   npm run validate:env
   ```

## Environment Variable Categories

### 🔴 Required Variables (Build will fail without these)

#### Core Configuration

- `NEXT_PUBLIC_APP_URL` - The full URL where your app is hosted
  - Development: `http://localhost:3000`
  - Production: `https://yourdomain.com`

#### Database

- `DATABASE_URL` - PostgreSQL connection string
  - Format: `postgresql://user:password@host:5432/database`
  - Local example: `postgresql://postgres:password@localhost:5432/vasquez_law`
  - Production: Use Vercel Postgres, Neon, or Supabase

#### Authentication

- `NEXTAUTH_URL` - The URL for NextAuth.js callbacks
  - Should match `NEXT_PUBLIC_APP_URL`
- `NEXTAUTH_SECRET` - Secret key for JWT encryption (min 32 characters)
  - Generate with: `openssl rand -base64 32`

#### AI Services

- `OPENAI_API_KEY` - OpenAI API key for chatbot functionality
  - Get from: https://platform.openai.com/api-keys
  - Must start with `sk-`

### 🟡 Recommended Variables (Features will be limited without these)

#### Google Services

- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - For displaying office locations
  - Enable Maps JavaScript API in Google Cloud Console
- `GOOGLE_PLACES_API_KEY` - For fetching business reviews
- `GOOGLE_ANALYTICS_ID` - For tracking site analytics

#### Error Monitoring

- `SENTRY_DSN` - For error tracking and monitoring
  - Get from: https://sentry.io/

### 🟢 Optional Variables (Services will use mock mode if not provided)

#### GoHighLevel CRM Integration

- `GHL_API_KEY` - API key for GoHighLevel
- `GHL_LOCATION_ID` - Your GoHighLevel location ID
- `GHL_WEBHOOK_SECRET` - For webhook verification
- See `.env.example` for full list of GHL campaign IDs

#### Email Configuration

- `SMTP_HOST` - SMTP server hostname
- `SMTP_PORT` - SMTP server port (usually 587 for TLS)
- `SMTP_USER` - SMTP username
- `SMTP_PASSWORD` - SMTP password
- `EMAIL_FROM` - Default sender email address

#### Voice Services (Retell AI)

- `RETELL_API_KEY` - API key for voice agent
- `RETELL_WEBHOOK_SECRET` - Webhook verification secret

#### Payment Processing

- `STRIPE_SECRET_KEY` - Stripe API key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret
- `LAWPAY_PUBLIC_KEY` - LawPay public key
- `LAWPAY_SECRET_KEY` - LawPay secret key

#### Redis/Caching

- `REDIS_URL` - Redis connection URL
- `MOCK_REDIS` - Set to `true` to use in-memory cache

## Environment-Specific Settings

### Development

```env
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
MOCK_EMAIL=true
MOCK_SMS=true
MOCK_REDIS=true
```

### Production

```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://vasquezlawnc.com
MOCK_EMAIL=false
MOCK_SMS=false
MOCK_REDIS=false
```

## Validation

The build process automatically validates environment variables. You'll see:

### Success Output

```
✅ Environment Validation Successful!

📊 Service Configuration Status:
================================
✅ Database: Configured
✅ Authentication: Configured
✅ Openai: Configured
❌ Gohighlevel: Not configured
❌ Email: Not configured
✅ GoogleMaps: Configured
✅ Monitoring: Configured

⚠️  Optional services not configured: gohighlevel, email
   These services will operate in mock/fallback mode.

🚀 Build can proceed!
```

### Error Output

```
❌ Environment Variable Validation Failed:

🚫 Missing Required Variables:
  • DATABASE_URL: DATABASE_URL is required for database connection
  • NEXTAUTH_SECRET: NEXTAUTH_SECRET must be at least 32 characters long
  • OPENAI_API_KEY: OPENAI_API_KEY is required for AI features

📋 Quick Setup Instructions:
1. Copy .env.example to .env.local
2. Fill in the required values
3. See VERCEL-ENV-SETUP.md for production deployment
```

## Security Best Practices

1. **Never commit `.env.local` or `.env` files to git**
2. **Use different values for development and production**
3. **Rotate secrets regularly**
4. **Use strong, randomly generated secrets**
5. **Limit API key permissions to minimum required**

## Troubleshooting

### Build fails with "Environment validation failed"

- Check that all required variables are set
- Run `npm run validate:env` to see specific errors
- Ensure no typos in variable names
- Check that values meet validation requirements (e.g., URLs are valid)

### Services showing as "Not configured"

- This is normal for optional services
- Services will operate in mock/fallback mode
- To enable, add the required environment variables

### "Invalid Variables" errors

- Check the format of your values
- URLs must be valid (include http:// or https://)
- API keys must match expected format
- Passwords must meet minimum length requirements

## Getting API Keys

### OpenAI

1. Go to https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Copy the key (starts with `sk-`)
4. Add to `OPENAI_API_KEY`

### Google Maps

1. Go to https://console.cloud.google.com/
2. Create a new project or select existing
3. Enable "Maps JavaScript API"
4. Create credentials → API Key
5. Add to `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

### Sentry

1. Sign up at https://sentry.io/
2. Create a new project
3. Select "Next.js" as platform
4. Copy the DSN from project settings
5. Add to `SENTRY_DSN`

## Need Help?

- Check `.env.example` for all available variables
- Run `npm run validate:env` to debug issues
- See service-specific documentation in `/docs`
- Contact the development team for API access
