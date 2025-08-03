# 🚀 Netlify Quick Start Guide

## Prerequisites

- GitHub account
- Netlify account (Pro plan recommended for 6,562+ pages)
- Git installed locally

## Step 1: Prepare Project for Git

```bash
cd /Users/williamvasquez/Documents/VLF\ Website

# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Vasquez Law Firm website"
```

## Step 2: Create GitHub Repository

1. Go to: https://github.com/new
2. Name: `vasquez-law-website`
3. Set to **Private**
4. Don't initialize with README
5. Click "Create repository"

## Step 3: Push to GitHub

```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/vasquez-law-website.git
git branch -M main
git push -u origin main
```

## Step 4: Connect to Netlify

1. Go to: https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub"
4. Authorize Netlify
5. Select `vasquez-law-website` repository

## Step 5: Configure Build Settings

Set these exactly:

- **Base directory**: (leave empty)
- **Build command**: `npm run build:netlify`
- **Publish directory**: `out`

## Step 6: Add Environment Variables

Click "Show advanced" and add these variables:

### Minimum Required Variables

```bash
NODE_ENV=production
NODE_VERSION=22.11.0
NODE_OPTIONS=--max-old-space-size=65536
NEXT_PUBLIC_APP_URL=https://www.vasquezlawnc.com
DATABASE_URL=postgresql://neondb_owner:npg_eCqcU6ELgvJ5@ep-old-mode-a4bj2csn-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
DIRECT_URL=postgresql://neondb_owner:npg_eCqcU6ELgvJ5@ep-old-mode-a4bj2csn-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
NEXTAUTH_URL=https://www.vasquezlawnc.com
NEXTAUTH_SECRET=QnJ386rd1BIjDuiik6ccHXD3OVtNxMBo/3F+IOJLu+M=
SKIP_ENV_VALIDATION=true
NEXT_TELEMETRY_DISABLED=1
OPENAI_API_KEY=sk-build-key-for-testing-only
```

### GoHighLevel Variables (Required)

```bash
GHL_API_KEY=pit-074edd23-15bf-4ca0-a139-30d3f4d16fff
GHL_LOCATION_ID=bd05Y9SlF1EmxJDB9hvR
GHL_API_URL=https://services.leadconnectorhq.com
GHL_CALENDAR_ID=5z2WuUFQ6ni32e4LFJCS
GHL_PIPELINE_ID=VGLPZFfUMVkOdzqWyMjL
GHL_NEW_LEADS_STAGE_ID=487cb766-3d4d-4994-9c3a-034ce18dfb19
GHL_DEFAULT_USER_ID=NY0V55WaKEXS9fyqEMXo
GHL_PHONE_ENABLED=true
GHL_SMS_ENABLED=true
GHL_OUTBOUND_PHONE_NUMBER=+19843141001
```

### Email Variables (For forms)

```bash
EMAIL_FROM=Vasquez Law Firm <noreply@vasquezlawnc.com>
EMAIL_REPLY_TO=info@vasquezlawnc.com
```

### Payment Placeholders

```bash
LAWPAY_PUBLIC_KEY=pk_test_placeholder
LAWPAY_SECRET_KEY=sk_test_placeholder
```

## Step 7: Deploy Site

Click "Deploy site" and wait. The build will take 30-60 minutes for 6,562+ pages.

## Step 8: Add Custom Domain (After successful build)

1. Go to Domain Settings
2. Add domain: `vasquezlawnc.com`
3. Follow DNS instructions

## Step 9: Add Remaining Variables

After initial deployment succeeds, add remaining environment variables from `COMPLETE_ENV_VARS.env`:

1. Site Settings → Environment Variables
2. Add variables in batches
3. Trigger new deployment after adding

## 📊 Build Monitoring

Watch the build progress:

1. Go to Deploys tab
2. Click on current deploy
3. View build log

Expected build time: 30-60 minutes
Expected memory usage: 40-50GB

## ⚠️ Common Issues

### Build Timeout

- Contact Netlify support for extended timeout
- Or upgrade to Enterprise plan

### Memory Error

- Ensure NODE_OPTIONS is set to `--max-old-space-size=65536`
- Verify you're on Netlify Pro or higher

### Missing Variables

- Check build log for "undefined" errors
- Add missing variables from COMPLETE_ENV_VARS.env

## 🎉 Success Checklist

- [ ] GitHub repository created and pushed
- [ ] Netlify connected to GitHub
- [ ] All minimum variables added
- [ ] Build completes successfully
- [ ] Site accessible at Netlify URL
- [ ] Custom domain configured
- [ ] SSL certificate active

## 📞 Need Help?

- **Build Issues**: Check `/NETLIFY_DEPLOYMENT.md`
- **Variables**: See `/COMPLETE_ENV_VARS.env`
- **Full Guide**: Read `/NETLIFY_COMPLETE_SETUP.md`
