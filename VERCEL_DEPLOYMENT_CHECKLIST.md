# Vercel Deployment Checklist

## Pre-Deployment Checklist

### 1. Repository Setup
- [ ] Code is pushed to GitHub/GitLab/Bitbucket
- [ ] `.env.local` is in `.gitignore` (never commit secrets!)
- [ ] `CLAUDE.md` files are committed (project instructions)

### 2. Vercel Account
- [ ] Created Vercel account at https://vercel.com
- [ ] Connected GitHub/GitLab/Bitbucket account

## Deployment Steps

### Step 1: Import Project
- [ ] Click "Add New Project" in Vercel dashboard
- [ ] Select your repository
- [ ] Framework Preset: **Next.js** (auto-detected)
- [ ] Root Directory: `.` (leave as is)
- [ ] Build Settings: (leave defaults)
  - Build Command: `npm run build` or `next build`
  - Output Directory: `.next`
  - Install Command: `npm install`

### Step 2: Configure Environment Variables

#### Minimal Setup (Copy & Paste)
- [ ] Click "Environment Variables" section
- [ ] Add these variables ONE BY ONE:

```
NODE_ENV = production
NEXT_PUBLIC_APP_URL = [Will update after deployment]
NEXTAUTH_URL = [Will update after deployment]
NEXTAUTH_SECRET = [Generate with: openssl rand -base64 32]
DATABASE_URL = [Your database connection string]
MOCK_REDIS = true
MOCK_EMAIL = true
MOCK_SMS = true
SKIP_ENV_VALIDATION = true
```

- [ ] For each variable:
  - [ ] Enter Key
  - [ ] Enter Value
  - [ ] Select: ✅ Production ✅ Preview ✅ Development
  - [ ] Click "Save"

### Step 3: Database Setup (Choose One)

#### Option A: Vercel Postgres
- [ ] Go to Storage tab in Vercel
- [ ] Click "Create Database"
- [ ] Select "Postgres"
- [ ] Choose region closest to you
- [ ] Click "Create"
- [ ] DATABASE_URL is automatically added ✅

#### Option B: Supabase (Free)
- [ ] Sign up at https://supabase.com
- [ ] Create new project
- [ ] Settings → Database → Connection string
- [ ] Copy "Transaction" mode URL
- [ ] Add to Vercel as DATABASE_URL

#### Option C: Neon (Free)
- [ ] Sign up at https://neon.tech
- [ ] Create database
- [ ] Copy connection string
- [ ] Add to Vercel as DATABASE_URL

### Step 4: Deploy
- [ ] Click "Deploy" button
- [ ] Wait for deployment (3-5 minutes)
- [ ] Check build logs for errors

### Step 5: Post-Deployment
- [ ] Copy your deployment URL (e.g., `vasquez-law-abc123.vercel.app`)
- [ ] Update these environment variables with your actual URL:
  - [ ] NEXT_PUBLIC_APP_URL
  - [ ] NEXTAUTH_URL
- [ ] Redeploy by going to Deployments → ⋮ → Redeploy

## Verification Checklist

### Basic Functionality
- [ ] Homepage loads without errors
- [ ] Navigation menu works
- [ ] Footer displays correctly
- [ ] Contact form appears (may not send with mocks)
- [ ] No console errors in browser

### Check Deployment Logs
- [ ] Go to Functions tab
- [ ] Check for any runtime errors
- [ ] Verify API routes are working

### Domain Setup (Optional)
- [ ] Go to Settings → Domains
- [ ] Add custom domain
- [ ] Update DNS records
- [ ] Update environment variables with new domain

## Progressive Enhancement

### Phase 1: AI Features
- [ ] Get OpenAI API key from https://platform.openai.com
- [ ] Add OPENAI_API_KEY to Vercel
- [ ] Test AI chat functionality

### Phase 2: Maps
- [ ] Get Google Maps API key
- [ ] Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
- [ ] Verify maps display on contact page

### Phase 3: Real Services
- [ ] Set up Redis (Upstash recommended)
- [ ] Configure email service
- [ ] Add Sentry for error tracking
- [ ] Set MOCK_* variables to false

## Troubleshooting Guide

### Build Failures
```
Error: Missing required environment variables
```
**Solution**: Ensure all Phase 1 variables are added

### Database Connection Failed
```
Error: Can't reach database server
```
**Solution**: 
- Check DATABASE_URL format
- Ensure it includes `?sslmode=require` for production
- Verify database is accessible from Vercel's IPs

### 500 Errors on API Routes
```
Error: Internal Server Error
```
**Solution**:
- Check Functions logs in Vercel
- Ensure NEXTAUTH_SECRET is set
- Verify DATABASE_URL is correct

### Styles Not Loading
```
Error: Styles appear broken
```
**Solution**:
- Clear browser cache
- Check build logs for CSS errors
- Ensure Tailwind CSS is building properly

## Quick Commands

### Generate Secrets
```bash
# NextAuth Secret
openssl rand -base64 32

# General 32-character secret
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Check current environment
node scripts/check-env.js

# Generate all secrets
node scripts/generate-env-secrets.js
```

### Vercel CLI (Optional)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from command line
vercel

# Set environment variable
vercel env add VARIABLE_NAME

# Pull environment variables
vercel env pull .env.local
```

## Success Criteria

### Minimum Viable Deployment
- [x] Site loads without errors
- [x] All pages are accessible
- [x] No build warnings
- [x] Database connected
- [x] Authentication working

### Full Feature Deployment
- [ ] AI chat responding
- [ ] Maps displaying
- [ ] Forms sending emails
- [ ] Analytics tracking
- [ ] Error monitoring active

## Next Steps

1. **Monitor**: Check Vercel dashboard for errors
2. **Optimize**: Review Web Vitals scores
3. **Scale**: Upgrade plans as needed
4. **Secure**: Remove SKIP_ENV_VALIDATION when ready

---

**Remember**: Start with the minimum setup, verify it works, then progressively add features. This approach ensures a working deployment at each stage.