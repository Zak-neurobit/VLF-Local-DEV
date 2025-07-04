# Vercel Environment Variables for Vasquez Law Website

Add these environment variables to your Vercel project:

## Required Environment Variables

### Authentication

- **NEXTAUTH_SECRET**: `UDdLI3SjTktXe4vFlHV/N7fbTaToy1PPkPfSC1kyGcA=`
- **NEXTAUTH_URL**: `https://vasquez-law-website-quez2777-hodos-360.vercel.app`

### Database

- **DATABASE_URL**: `postgresql://neondb_owner:npg_eCqcU6ELgvJ5@ep-old-mode-a4bj2csn-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`

### Redis (Mock for now)

- **MOCK_REDIS**: `true`

### Optional (if using real services)

- **REDIS_URL**: Your Redis connection URL (if not using mock)
- **TWILIO_ACCOUNT_SID**: Your Twilio account SID
- **TWILIO_AUTH_TOKEN**: Your Twilio auth token
- **OPENAI_API_KEY**: Your OpenAI API key for AI features

## How to Add to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: `vasquez-law-website`
3. Go to Settings → Environment Variables
4. Add each variable with these settings:
   - Environment: ✅ Production, ✅ Preview, ✅ Development
5. Click Save

## Quick Copy Commands

```bash
# Using Vercel CLI
npx vercel env add NEXTAUTH_SECRET production
npx vercel env add NEXTAUTH_URL production
npx vercel env add DATABASE_URL production
npx vercel env add MOCK_REDIS production
```

## Verify Deployment

After adding variables:

1. Trigger a new deployment (push a commit or click "Redeploy")
2. Check build logs for any environment variable errors
3. Visit your site to ensure everything works

## Current Deployment URL

https://vasquez-law-website-quez2777-hodos-360.vercel.app
