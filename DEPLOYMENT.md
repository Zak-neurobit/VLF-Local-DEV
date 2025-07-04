# Vasquez Law Firm Website - Deployment Guide

## 🚀 Quick Deploy to Vercel

### Prerequisites

1. Vercel account
2. PostgreSQL database (Supabase, Neon, or PlanetScale recommended)
3. Redis instance (Upstash recommended)
4. API keys for services

### Step 1: Database Setup

1. Create a PostgreSQL database
2. Run the Prisma migrations:

```bash
npx prisma migrate deploy
```

### Step 2: Redis Setup

1. Create Redis instance at [Upstash](https://upstash.com)
2. Get connection credentials

### Step 3: API Keys Required

| Service            | Purpose                         | Get it from                      |
| ------------------ | ------------------------------- | -------------------------------- |
| OpenAI API         | Content generation, AI features | https://platform.openai.com      |
| Retell AI          | Voice agents                    | https://retellai.com             |
| Nextiva            | Phone system integration        | Contact Nextiva support          |
| Google APIs        | YouTube scraping, Analytics     | https://console.cloud.google.com |
| Facebook/Instagram | Social media monitoring         | https://developers.facebook.com  |
| Twilio             | SMS notifications               | https://www.twilio.com           |
| SERP API           | SEO research                    | https://serpapi.com              |

### Step 4: Deploy to Vercel

#### Option A: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-repo/vasquez-law-website&env=DATABASE_URL,OPENAI_API_KEY,NEXTAUTH_SECRET&envDescription=Required%20environment%20variables&envLink=https://github.com/your-repo/vasquez-law-website/blob/main/.env.example)

#### Option B: Manual Deploy

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables:

```bash
# Required Environment Variables
DATABASE_URL=
NEXTAUTH_SECRET=
NEXT_PUBLIC_BASE_URL=https://vasquezlawnc.com

# AI Services
OPENAI_API_KEY=
RETELL_API_KEY=

# Redis
REDIS_HOST=
REDIS_PORT=
REDIS_PASSWORD=

# Add all other variables from .env.example
```

4. Deploy!

### Step 5: Post-Deployment

1. **Run database seed** (optional):

```bash
npm run prisma:seed
```

2. **Import existing content**:

```bash
curl -X POST https://your-domain.vercel.app/api/content-import \
  -H "Content-Type: application/json" \
  -d '{"action": "import-all"}'
```

3. **Start SEO Agent**:

- The SEO agent will automatically start with the application
- Monitor logs for content generation activity

4. **Configure DNS**:

- Point your domain to Vercel
- Add SSL certificate (automatic with Vercel)

## 📊 Production Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Redis connected
- [ ] API keys validated
- [ ] DNS configured
- [ ] SSL certificate active
- [ ] SEO agent running
- [ ] Content imported
- [ ] Analytics configured
- [ ] Error tracking (Sentry) configured
- [ ] Webhook URLs updated in external services
- [ ] Email service configured
- [ ] Backup strategy in place

## 🔧 Monitoring & Maintenance

### Health Checks

- `/api/health` - System health
- `/api/health/db` - Database connection
- `/api/health/redis` - Redis connection
- `/api/health/ai` - AI services status

### Logs

- Vercel Functions logs
- Sentry for errors
- Google Analytics for traffic
- Custom logging in database

### Performance

- Core Web Vitals monitoring
- Lighthouse CI in deployment pipeline
- Real User Monitoring (RUM)

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Failed**

   - Check DATABASE_URL format
   - Verify IP whitelist in database settings
   - Test connection with `npx prisma db pull`

2. **AI Features Not Working**

   - Verify API keys are correct
   - Check rate limits
   - Monitor usage in provider dashboards

3. **SEO Agent Not Generating Content**

   - Check Redis connection
   - Verify cron jobs are running
   - Check error logs

4. **Social Media Scraping Failed**
   - Refresh access tokens
   - Check API rate limits
   - Verify webhook URLs

## 📈 Scaling

### When to Scale

- Response time > 3 seconds
- Error rate > 1%
- Queue backlog > 100 items

### Scaling Options

1. **Vercel**: Upgrade to Pro/Enterprise
2. **Database**: Connection pooling, read replicas
3. **Redis**: Increase memory, enable persistence
4. **CDN**: Enable Vercel Edge Network

## 🔐 Security

1. **API Routes**: All protected with authentication
2. **Environment Variables**: Never commit to git
3. **Database**: SSL connections only
4. **File Uploads**: Virus scanning enabled
5. **Rate Limiting**: Implemented on all endpoints

## 📞 Support

- **Technical Issues**: Create GitHub issue
- **Urgent Problems**: Contact development team
- **Feature Requests**: Submit via GitHub discussions

## 🎉 Launch Checklist

- [ ] All pages load correctly
- [ ] Forms submit successfully
- [ ] AI chat widget functional
- [ ] Blog posts displaying
- [ ] SEO meta tags present
- [ ] Sitemap accessible
- [ ] Analytics tracking
- [ ] Mobile responsive
- [ ] Page speed > 90
- [ ] Accessibility compliant
