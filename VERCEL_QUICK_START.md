# Vercel Quick Start - Minimal Environment Variables

## 🚀 Copy-Paste Configuration for Immediate Deployment

Add these environment variables in Vercel Dashboard:
https://vercel.com/hodos-360/vlf-website/settings/environment-variables

### Step 1: Core Variables (Required)
```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://vlf-website-hodos-360.vercel.app
NEXTAUTH_URL=https://vlf-website-hodos-360.vercel.app
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
```

### Step 2: Database ✅ READY TO USE

Add your Neon database URL:
```env
DATABASE_URL=postgresql://neondb_owner:npg_eCqcU6ELgvJ5@ep-old-mode-a4bj2csn-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
```

**Important**: Mark as "Sensitive" in Vercel dashboard to hide the password.

### Step 3: Enable Basic Features
```env
# AI Chat (get from platform.openai.com)
OPENAI_API_KEY=sk-...

# Google Maps (get from console.cloud.google.com)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIza...

# Error Tracking (get from sentry.io)
SENTRY_DSN=https://...@sentry.io/...
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
```

### Step 4: Deploy
```bash
git add -A
git commit -m "chore: Configure environment variables"
git push origin main
```

## 🎯 That's It!

Your site should now be functional with:
- ✅ Basic website working
- ✅ Database connected (or mocked)
- ✅ Authentication ready
- ✅ AI chat (if OpenAI key added)
- ✅ Maps display (if Google key added)

## 📝 Next Steps

Once basic deployment works, gradually add:
1. Email configuration (SMTP settings)
2. SMS configuration (Twilio)
3. Payment processing (Stripe/LawPay)
4. CRM integration (GoHighLevel)
5. Voice agents (Retell)

See VERCEL_ENV_SETUP_PLAN.md for complete configuration.