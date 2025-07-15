# 🚀 Vercel Deployment Guide for VLF Website

## Prerequisites

- GitHub account (or GitLab/Bitbucket)
- Vercel account (free at vercel.com)
- Production database URLs ready

## Step 1: Prepare Your Repository

### Push to GitHub

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: VLF Website with HODOS integration"

# Create new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/vasquez-law-website.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Via Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next (default)

### Option B: Via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

## Step 3: Configure Environment Variables

### In Vercel Dashboard:

1. Go to your project → Settings → Environment Variables
2. Add the following variables:

```env
# Database (use Vercel Postgres or external)
DATABASE_URL="postgresql://user:pass@host:5432/vlf_website?sslmode=require"

# NextAuth
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Redis (use Vercel KV or Upstash)
REDIS_URL="redis://default:password@host:port"

# HODOS Integration
HODOS_API_URL="https://your-hodos-api.com"
HODOS_API_KEY="your-hodos-api-key"

# Email (SendGrid recommended)
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT="587"
SMTP_USER="apikey"
SMTP_PASS="SG.your-sendgrid-api-key"

# Twilio
TWILIO_ACCOUNT_SID="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
TWILIO_AUTH_TOKEN="your-auth-token"
TWILIO_PHONE_NUMBER="+1234567890"

# OpenAI
OPENAI_API_KEY="sk-..."

# Stripe
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Sentry
SENTRY_DSN="https://...@sentry.io/..."

# Socket.IO
SOCKET_PORT="3002"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="....apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="..."
```

## Step 4: Set Up Databases

### Option 1: Vercel Postgres (Recommended)

1. In Vercel Dashboard → Storage → Create Database
2. Choose Postgres
3. Copy the connection string to DATABASE_URL

### Option 2: External PostgreSQL

- Supabase: supabase.com
- Neon: neon.tech
- Railway: railway.app

### Redis Setup

1. Vercel KV (easiest): Dashboard → Storage → Create → KV
2. Or use Upstash: upstash.com

## Step 5: Run Database Migrations

```bash
# After deployment, run migrations
vercel env pull .env.production.local
npx prisma migrate deploy
```

Or use Vercel's build command:

```json
{
  "buildCommand": "npx prisma generate && npx prisma migrate deploy && next build"
}
```

## Step 6: Configure Custom Domain

1. Dashboard → Settings → Domains
2. Add your domain: vasquezlawfirm.com
3. Update DNS records:
   ```
   A     @     76.76.21.21
   CNAME www   cname.vercel-dns.com
   ```

## Step 7: Post-Deployment Tasks

### 1. Test Critical Features

- [ ] Homepage loads
- [ ] Chat widget works
- [ ] Contact forms submit
- [ ] Blog posts display
- [ ] API health check: /api/health

### 2. Set Up Monitoring

```bash
# Vercel Analytics (automatic)
# Sentry error tracking (via SENTRY_DSN)
```

### 3. Configure Webhooks

Add these webhook URLs to external services:

- Twilio: `https://your-domain.com/api/webhooks/twilio`
- Stripe: `https://your-domain.com/api/webhooks/stripe`
- HODOS: `https://your-domain.com/api/webhooks/hodos`

## Troubleshooting

### Build Errors

```bash
# Check build logs
vercel logs

# Test build locally
npm run build
```

### Database Connection Issues

```bash
# Ensure SSL is required
?sslmode=require

# For Prisma
npx prisma generate
npx prisma db push
```

### Environment Variables Not Working

- Ensure no quotes in Vercel dashboard
- Redeploy after adding variables
- Check variable names match exactly

## Useful Commands

```bash
# View deployments
vercel ls

# View logs
vercel logs

# Rollback
vercel rollback

# Remove deployment
vercel rm [deployment-url]
```

## Performance Optimization

### Enable these in Vercel:

1. Edge Functions for API routes
2. Image Optimization
3. ISR (Incremental Static Regeneration)

### Add to next.config.js:

```javascript
module.exports = {
  images: {
    domains: ['your-image-domains.com'],
  },
  experimental: {
    runtime: 'edge',
  },
};
```

## Security Checklist

- [ ] All sensitive vars in environment variables
- [ ] HTTPS enforced (automatic on Vercel)
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] CORS properly configured

---

## Quick Deploy Script

```bash
#!/bin/bash
# Save as deploy.sh

echo "🚀 Deploying to Vercel..."

# Build locally first to catch errors
npm run build

if [ $? -eq 0 ]; then
  echo "✅ Build successful, deploying..."
  vercel --prod
else
  echo "❌ Build failed, fix errors before deploying"
  exit 1
fi
```

---

Ready to deploy! The entire process typically takes 5-10 minutes.
