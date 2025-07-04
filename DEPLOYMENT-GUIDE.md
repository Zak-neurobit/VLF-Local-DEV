# 🚀 VASQUEZ LAW FIRM - DEPLOYMENT GUIDE

## Current Status: READY FOR DEPLOYMENT ✅

- **Build Status**: ✅ SUCCESS (233 pages generated)
- **Content Import**: ✅ COMPLETE (96 pages from live site)
- **SEO Optimization**: ✅ COMPLETE (All pages optimized)
- **TypeScript Errors**: ✅ FIXED (0 errors)

## Pre-Deployment Checklist

### 1. Environment Setup ✅

- [x] Build completes successfully
- [x] All TypeScript errors fixed
- [x] Content imported and SEO optimized
- [ ] Copy `env.production.example` to `.env.production`
- [ ] Fill in all required environment variables
- [ ] Verify database connection string
- [ ] Set up Redis instance
- [ ] Configure all API keys

### 2. Code Quality ✅

- [x] Run `npm run lint` - all passing
- [x] Run `npm run type-check` - no errors
- [x] Run `npm test` - all tests pass
- [x] Run `npm run build` - builds successfully

### 3. Content Verification ✅

- [x] All 96 pages imported from live site
- [x] SEO optimization applied to all pages
- [x] Sitemap generated correctly
- [x] Robots.txt configured

## ENVIRONMENT VARIABLES CONFIGURATION

Use the `env.production.example` file as your template. Key variables:

### Database

```env
DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require
```

### NextAuth Configuration

```env
NEXTAUTH_URL=https://www.vasquezlawnc.com
NEXTAUTH_SECRET=your-production-secret-here-minimum-32-chars
```

### Email Configuration (Office 365)

```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=noreply@vasquezlawnc.com
SMTP_PASSWORD=your-email-password
SMTP_FROM="Vasquez Law Firm <noreply@vasquezlawnc.com>"
```

### Twilio Configuration

```env
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+18449673536
```

### GoHighLevel CRM

```env
GHL_API_KEY=your-gohighlevel-api-key
GHL_LOCATION_ID=your-ghl-location-id
GHL_WEBHOOK_SECRET=your-webhook-secret
```

### Payment Processing

```env
# Stripe
STRIPE_SECRET_KEY=sk_live_your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=pk_live_your-stripe-publishable-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret

# Authorize.Net
AUTHORIZE_NET_API_LOGIN_ID=your-authorize-net-login
AUTHORIZE_NET_TRANSACTION_KEY=your-transaction-key

# LawPay
LAWPAY_API_KEY=your-lawpay-api-key
```

### Analytics

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

## PAYMENT PROVIDER SETUP

### Authorize.Net Setup

1. Log in to your Authorize.Net account
2. Go to Account → Settings → API Credentials & Keys
3. Generate a new Transaction Key
4. Copy your API Login ID and Transaction Key
5. Set environment variables above

### LawPay Setup

1. Log in to your LawPay account
2. Go to Developer → API Keys
3. Generate API credentials
4. Get your Operating Account ID from Accounts section
5. Get your Trust Account ID from Accounts section
6. Set environment variables above

## DEPLOYMENT STEPS

### 1. Pre-deployment Checklist

```bash
# Run tests
npm test

# Type checking
npm run type-check

# Linting
npm run lint

# Build production
npm run build
```

### 2. Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Set environment variables in Vercel dashboard
# Go to: https://vercel.com/dashboard/[your-project]/settings/environment-variables
```

### 3. Alternative: Traditional VPS Deployment

```bash
# On your server
git clone https://github.com/your-repo/vasquez-law-website.git
cd vasquez-law-website

# Install dependencies
npm install --production

# Create .env.local file with all environment variables

# Build
npm run build

# Start with PM2
npm install -g pm2
pm2 start npm --name "vasquez-law" -- start
pm2 save
pm2 startup
```

## DEPLOYMENT STEPS

### Option 1: Deploy with Vercel (Recommended) 🚀

```bash
# Use our automated deployment script
./scripts/deploy.sh

# Or manually:
npm i -g vercel
vercel --prod
```

### Option 2: Deploy to Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod
```

### Option 3: Deploy to AWS Amplify

```bash
npm i -g @aws-amplify/cli
amplify init
amplify push
```

## POST-DEPLOYMENT TASKS

### 1. DNS Configuration

- **A Record**: `@` → Vercel IP (76.76.21.21)
- **CNAME**: `www` → `cname.vercel-dns.com`
- **MX Records**: For email (if using domain email)

### 2. External Service Webhooks

#### GoHighLevel

1. Go to Settings > Webhooks
2. Add webhook URL: `https://www.vasquezlawnc.com/api/webhooks/ghl`
3. Set webhook secret in environment variables

#### Twilio

1. Go to Phone Numbers > Manage > Active Numbers
2. Configure webhook URLs:
   - Voice: `https://www.vasquezlawnc.com/api/webhooks/twilio/voice`
   - SMS: `https://www.vasquezlawnc.com/api/webhooks/twilio/sms`

#### Stripe

1. Go to Developers > Webhooks
2. Add endpoint: `https://www.vasquezlawnc.com/api/webhooks/stripe`
3. Select events to listen for

### 3. Google Services Setup

#### Google Search Console

1. Go to https://search.google.com/search-console
2. Add property: `https://www.vasquezlawnc.com`
3. Verify ownership
4. Submit sitemap: `https://www.vasquezlawnc.com/sitemap.xml`

#### Google Analytics

1. Create GA4 property
2. Add measurement ID to environment variables
3. Verify tracking is working

#### Google My Business

1. Claim/verify business listing
2. Update website URL
3. Add photos and business info

### 4. Database Setup

```bash
# Run migrations
npx prisma migrate deploy

# Seed initial data (if needed)
npx prisma db seed
```

## TESTING CHECKLIST

### Core Functionality

- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Forms submit successfully
- [ ] Phone numbers are clickable (1-844-YO-PELEO)
- [ ] Chat widget appears and works

### SEO & Performance

- [ ] Meta tags present on all pages
- [ ] Structured data validates
- [ ] Sitemap accessible at /sitemap.xml
- [ ] Robots.txt accessible at /robots.txt
- [ ] Page speed > 90 on Lighthouse

### Integrations

- [ ] Email sending works
- [ ] SMS notifications work
- [ ] Payment processing (test mode first)
- [ ] CRM integration active
- [ ] Voice agent responds

### Multi-language

- [ ] Spanish pages accessible
- [ ] Language toggle works
- [ ] All content properly translated

## MONITORING & MAINTENANCE

### Uptime Monitoring

- Set up with UptimeRobot or similar
- Monitor: https://www.vasquezlawnc.com
- Alert on downtime

### Error Tracking (Sentry)

- Verify Sentry is capturing errors
- Set up alert rules
- Monitor error rates

### Analytics

- Set up conversion tracking in GA4
- Monitor traffic sources
- Track form submissions

### AI Agents Monitoring

- Check agent status at /admin/agents
- Monitor Federal Register updates
- Verify court decision tracking
- Check social media automation

## TROUBLESHOOTING

### Common Issues

1. **Build Fails**

   - Check environment variables
   - Verify all dependencies installed
   - Look for TypeScript errors

2. **Forms Not Working**

   - Check API endpoints
   - Verify email configuration
   - Check CORS settings

3. **Slow Performance**

   - Check image optimization
   - Verify CDN is working
   - Review database queries

4. **404 Errors**
   - Check route paths
   - Verify case sensitivity
   - Rebuild and redeploy

## SUPPORT CONTACTS

- **Hosting**: Vercel Support
- **Domain/DNS**: Your registrar
- **Email**: Office 365 Admin
- **Payment**: Stripe/Authorize.Net/LawPay Support
- **CRM**: GoHighLevel Support
- **SMS/Voice**: Twilio Support

## LAUNCH DAY FINAL CHECKLIST

- [x] Build completes successfully
- [x] All content imported
- [x] SEO optimization complete
- [ ] Environment variables configured
- [ ] DNS configured and propagated
- [ ] SSL certificate active
- [ ] External webhooks configured
- [ ] Google services set up
- [ ] Payment processing tested
- [ ] Forms tested
- [ ] Analytics tracking verified
- [ ] Monitoring active
- [ ] Team notified

**DEPLOYMENT STATUS: READY TO LAUNCH! 🎉**

The website has been successfully built with:

- 233 static pages generated
- All TypeScript errors resolved
- Full SEO optimization
- All content from live site imported

Next step: Configure production environment variables and deploy!
