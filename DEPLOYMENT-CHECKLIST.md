# Vasquez Law Firm - Production Deployment Checklist

## Pre-Deployment Checklist

### 🔐 Environment & Security

- [ ] Copy `.env.example` to `.env` and fill in all production values
- [ ] Generate secure `NEXTAUTH_SECRET` with `openssl rand -base64 32`
- [ ] Set up database connection string for production PostgreSQL
- [ ] Configure Redis connection for production
- [ ] Set all API keys (OpenAI, Twilio, Stripe, etc.)
- [ ] Enable HTTPS and SSL certificates
- [ ] Configure CORS and security headers

### 📊 Database Setup

- [ ] Run database migrations: `npm run prisma:migrate:prod`
- [ ] Seed initial data if needed: `npm run prisma:seed`
- [ ] Backup database before deployment
- [ ] Test database connections

### 🎨 Assets & Content

- [x] Favicon and app icons configured
- [x] Open Graph images set up
- [x] Manifest.json for PWA
- [x] Robots.txt configured
- [x] All images optimized
- [x] Content reviewed and proofread

### 📈 SEO & Analytics

- [ ] Google Analytics ID configured
- [ ] Google Tag Manager set up
- [ ] Google Search Console verification
- [ ] Sitemap generation working
- [ ] Meta tags on all pages
- [ ] Schema.org markup implemented

### ✅ Testing

- [ ] Run all tests: `npm test`
- [ ] E2E tests pass: `npm run test:e2e`
- [ ] Build succeeds: `npm run build`
- [ ] No TypeScript errors: `npm run type-check`
- [ ] No linting errors: `npm run lint`
- [ ] Contact form tested
- [ ] Payment processing tested
- [ ] AI chat functionality tested

### 🚀 Performance

- [ ] Lighthouse score > 90
- [ ] Images using Next.js Image component
- [ ] Code splitting implemented
- [ ] Caching strategies configured
- [ ] CDN setup for static assets

### 📱 Responsive Design

- [x] Mobile responsive (tested on devices)
- [x] Tablet responsive
- [x] Desktop optimized
- [x] Cross-browser tested (Chrome, Firefox, Safari, Edge)

### 🌐 Integrations

- [ ] Email SMTP configured and tested
- [ ] Twilio phone/SMS working
- [ ] Payment gateway connected
- [ ] GoHighLevel CRM integrated
- [ ] AI services (OpenAI/Retell) configured

### 📝 Legal & Compliance

- [ ] Privacy Policy page created
- [ ] Terms of Service page created
- [ ] Cookie consent implemented
- [ ] GDPR compliance checked
- [ ] Accessibility (WCAG 2.1 AA) tested

## Deployment Steps

### 1. Vercel Deployment (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

### 2. Environment Variables in Vercel

1. Go to Vercel Dashboard > Project Settings > Environment Variables
2. Add all variables from `.env.example`
3. Set appropriate values for production

### 3. Domain Configuration

1. Add custom domain in Vercel settings
2. Configure DNS records:
   - A record: @ → 76.76.21.21
   - CNAME: www → cname.vercel-dns.com
3. Enable automatic HTTPS

### 4. Post-Deployment Verification

- [ ] Website loads on production domain
- [ ] HTTPS working correctly
- [ ] Contact form submissions working
- [ ] AI chat functional
- [ ] Payment processing operational
- [ ] Analytics tracking pageviews
- [ ] Error tracking (Sentry) connected
- [ ] All pages loading without errors

### 5. Monitoring Setup

- [ ] Uptime monitoring configured
- [ ] Error alerts set up in Sentry
- [ ] Performance monitoring active
- [ ] Security headers verified
- [ ] SSL certificate auto-renewal confirmed

## Production Environment Variables Required

```env
# Critical - Must be set
NODE_ENV=production
NEXT_PUBLIC_BASE_URL=https://vasquezlawnc.com
DATABASE_URL=<production-postgres-url>
NEXTAUTH_SECRET=<generated-secret>

# Email
SMTP_HOST=<smtp-server>
SMTP_PORT=587
SMTP_USER=<email>
SMTP_PASSWORD=<password>

# APIs
OPENAI_API_KEY=<key>
TWILIO_ACCOUNT_SID=<sid>
TWILIO_AUTH_TOKEN=<token>

# Analytics
NEXT_PUBLIC_GA_ID=<google-analytics-id>
SENTRY_DSN=<sentry-dsn>
```

## Emergency Rollback Plan

1. Revert to previous deployment in Vercel
2. Restore database from backup if needed
3. Clear CDN cache
4. Notify team of rollback

## Support Contacts

- Technical Issues: [Your DevOps Contact]
- Domain/DNS: [Domain Provider Support]
- Hosting: Vercel Support
- Database: [Database Provider Support]

---

**Last Updated**: ${new Date().toISOString()}
**Ready for Deployment**: ✅ (After all checklist items are completed)
