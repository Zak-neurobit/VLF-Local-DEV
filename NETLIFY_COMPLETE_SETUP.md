# Complete Netlify Setup Guide for Vasquez Law Firm Website

## 📋 Table of Contents

1. [Git Repository Setup](#git-repository-setup)
2. [Netlify Project Connection](#netlify-project-connection)
3. [Environment Variables Setup](#environment-variables-setup)
4. [Build Configuration](#build-configuration)
5. [Domain Configuration](#domain-configuration)
6. [Post-Deployment Steps](#post-deployment-steps)

---

## 🔧 Git Repository Setup

### Step 1: Initialize Git Repository (if not already done)

```bash
cd /Users/williamvasquez/Documents/VLF\ Website

# Initialize git
git init

# Create .gitignore if it doesn't exist
cat > .gitignore << 'EOL'
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/
.nyc_output

# Next.js
.next/
out/
build/
dist/

# Production
*.production

# Misc
.DS_Store
*.pem
.idea
.vscode
*.swp
*.swo
*~

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
.pnpm-debug.log*

# Local env files
.env
.env*.local
.env.development
.env.test
.env.production

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# Logs
logs/
*.log

# Editor directories
.idea/
.vscode/
*.sublime-project
*.sublime-workspace

# OS files
.DS_Store
Thumbs.db

# Temporary files
*.tmp
*.temp
*.cache
.cache/

# Build artifacts
.turbo

# API backup (temporary)
api.backup/

# Netlify
.netlify/

# Database
prisma/migrations/dev/
EOL

# Add all files
git add .

# Commit
git commit -m "Initial commit: Vasquez Law Firm website with 6,562+ pages"
```

### Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository named `vasquez-law-website`
3. Make it private (recommended for law firm data)
4. Don't initialize with README (we already have files)

### Step 3: Push to GitHub

```bash
# Add remote origin
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/vasquez-law-website.git

# Push to main branch
git branch -M main
git push -u origin main
```

---

## 🚀 Netlify Project Connection

### Step 1: Connect to Git Provider

1. Log in to Netlify: https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" as your Git provider
4. Authorize Netlify to access your GitHub
5. Select the `vasquez-law-website` repository

### Step 2: Configure Build Settings

Set these build settings in Netlify:

```yaml
Base directory: (leave empty)
Build command: npm run build:netlify
Publish directory: out
Functions directory: netlify/functions
```

### Step 3: Set Node Version

Add to Environment Variables:

```
NODE_VERSION = 22.11.0
```

---

## 🔑 Environment Variables Setup

### Critical Variables (Required for Build)

Add these in Netlify Dashboard → Site Settings → Environment Variables:

```bash
# ========== CORE CONFIGURATION ==========
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://www.vasquezlawnc.com
SKIP_ENV_VALIDATION=true
NEXT_TELEMETRY_DISABLED=1
NEXTAUTH_URL=https://www.vasquezlawnc.com
NEXTAUTH_SECRET=QnJ386rd1BIjDuiik6ccHXD3OVtNxMBo/3F+IOJLu+M=

# ========== DATABASE (Required for build) ==========
DATABASE_URL=postgresql://neondb_owner:npg_eCqcU6ELgvJ5@ep-old-mode-a4bj2csn-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
DIRECT_URL=postgresql://neondb_owner:npg_eCqcU6ELgvJ5@ep-old-mode-a4bj2csn-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require

# ========== OPENAI (Temporary for build) ==========
OPENAI_API_KEY=sk-build-key-for-testing-only
OPENAI_MODEL=gpt-4

# ========== BUILD OPTIMIZATION ==========
NODE_OPTIONS=--max-old-space-size=65536
```

### GoHighLevel Integration (Required)

```bash
# ========== GHL CORE ==========
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

# ========== GHL CAMPAIGNS (Add actual IDs) ==========
GHL_APPOINTMENT_REMINDER_CAMPAIGN_ID=
GHL_CASE_UPDATE_CAMPAIGN_ID=
GHL_WELCOME_CAMPAIGN_ID=
GHL_AUTO_RESPONSE_CAMPAIGN_ID=
# ... (add all 60+ campaign IDs as needed)
```

### Analytics & Tracking (Add when ready)

```bash
# ========== GOOGLE SERVICES ==========
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSy...
GOOGLE_SEARCH_API_KEY=
GOOGLE_SEARCH_ENGINE_ID=

# ========== ERROR TRACKING ==========
SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
SENTRY_AUTH_TOKEN=
```

### AI & Voice Services (Add when ready)

```bash
# ========== RETELL AI ==========
RETELL_API_KEY=
RETELL_WEBHOOK_SECRET=
RETELL_AGENT_ENGLISH_INTAKE=
RETELL_AGENT_SPANISH_INTAKE=
# ... (add all agent IDs)

# ========== TWILIO ==========
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=

# ========== CREWAI ==========
CREWAI_LOG_LEVEL=INFO
CREWAI_MEMORY_ENABLED=true
CREWAI_MAX_ITERATIONS=10
# ... (add all CrewAI settings)
```

### Email Services (Add when ready)

```bash
# ========== EMAIL CONFIGURATION ==========
EMAIL_FROM=Vasquez Law Firm <noreply@vasquezlawnc.com>
EMAIL_REPLY_TO=info@vasquezlawnc.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=noreply@vasquezlawnc.com
SMTP_PASSWORD=

# Alternative services
SENDGRID_API_KEY=
RESEND_API_KEY=
```

### Payment Processing (Add when ready)

```bash
# ========== LAWPAY ==========
LAWPAY_PUBLIC_KEY=pk_live_...
LAWPAY_SECRET_KEY=sk_live_...
LAWPAY_TRUST_ACCOUNT_ID=
LAWPAY_OPERATING_ACCOUNT_ID=

# ========== AUTHORIZE.NET ==========
AUTHORIZENET_LOGIN_ID=
AUTHORIZENET_TRANSACTION_KEY=
```

### Social Media & SEO (Add when ready)

```bash
# ========== SOCIAL MEDIA ==========
FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=
INSTAGRAM_ACCESS_TOKEN=
TWITTER_API_KEY=
TWITTER_API_SECRET=
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=

# ========== SEO TOOLS ==========
MOZ_API_KEY=
ADSY_API_KEY=
AP_NEWS_API_KEY=
```

---

## 🏗️ Build Configuration

### Update netlify.toml

Ensure your `netlify.toml` has:

```toml
[build]
  command = "npm run build:netlify"
  publish = "out"

[build.environment]
  NODE_VERSION = "22.11.0"
  NODE_OPTIONS = "--max-old-space-size=65536"
  NEXT_TELEMETRY_DISABLED = "1"

[[plugins]]
  package = "@netlify/plugin-nextjs"

# Headers for security
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"

# Redirects
[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

---

## 🌐 Domain Configuration

### Step 1: Add Custom Domain

1. Go to Domain Settings in Netlify
2. Click "Add domain alias"
3. Enter: `vasquezlawnc.com`
4. Add both:
   - `vasquezlawnc.com`
   - `www.vasquezlawnc.com`

### Step 2: Configure DNS

Choose one option:

**Option A: Use Netlify DNS (Recommended)**

1. Change nameservers at your domain registrar to:
   ```
   dns1.p04.nsone.net
   dns2.p04.nsone.net
   dns3.p04.nsone.net
   dns4.p04.nsone.net
   ```

**Option B: Use existing DNS**

1. Add these records at your current DNS provider:
   ```
   A     @      75.2.60.5
   CNAME www    [your-site-name].netlify.app
   ```

### Step 3: Enable HTTPS

1. Once DNS is verified, go to Domain Settings → HTTPS
2. Click "Verify DNS configuration"
3. Click "Provision certificate"
4. Wait for SSL certificate (usually 5-15 minutes)

---

## 📋 Post-Deployment Steps

### 1. Verify Build

After first deployment:

- Check build logs for any errors
- Verify all 6,562+ pages are generated
- Test key pages in browser

### 2. Set up Build Hooks (Optional)

For triggering builds from external services:

1. Go to Site Settings → Build & Deploy → Build hooks
2. Create a new build hook
3. Use the webhook URL in your CMS/services

### 3. Enable Form Handling (If needed)

For contact forms:

1. Add `data-netlify="true"` to form tags
2. Add `data-netlify-honeypot="bot-field"` for spam protection
3. Forms will appear in Netlify dashboard

### 4. Set up Notifications

1. Go to Site Settings → Build & Deploy → Deploy notifications
2. Add email notifications for:
   - Deploy succeeded
   - Deploy failed
   - Deploy started

### 5. Monitor Performance

1. Enable Netlify Analytics (paid feature)
2. Or use Google Analytics with your GA ID
3. Monitor Core Web Vitals

---

## 🚨 Troubleshooting

### Build Failures

If build fails due to memory:

```bash
# Increase memory in netlify.toml
NODE_OPTIONS = "--max-old-space-size=65536"
```

### Missing Environment Variables

Check build logs for missing variables. Common issues:

- Database connection errors → Check DATABASE_URL
- API errors → Verify all API keys are set
- Build errors → Ensure NODE_VERSION is set

### Large Build Times

For 6,562+ pages, builds may take 30-60 minutes. This is normal.
Consider:

- Upgrading to Netlify Pro/Business for more resources
- Using Incremental Static Regeneration (ISR) in the future

---

## 📞 Support Contacts

- **Netlify Support**: https://www.netlify.com/support/
- **Netlify Community**: https://answers.netlify.com/
- **Emergency Support** (Pro/Business): Available in dashboard

---

## ✅ Checklist

Before going live:

- [ ] All environment variables set
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Build succeeds without errors
- [ ] All pages load correctly
- [ ] Forms working (if applicable)
- [ ] Analytics configured
- [ ] Error tracking set up
- [ ] Backup of all environment variables saved securely

---

## 🔐 Security Notes

1. **Never commit** `.env` files to Git
2. **Rotate** sensitive keys regularly
3. **Use different keys** for development/production
4. **Monitor** Netlify audit logs
5. **Enable** 2FA on Netlify and GitHub accounts

---

This completes the full setup. Once all environment variables are added and the site is connected to Git, Netlify will automatically build and deploy your site with all 6,562+ pages.
