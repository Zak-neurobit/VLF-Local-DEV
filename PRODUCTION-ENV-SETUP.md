# Production Environment Variables Setup Guide

This guide walks you through setting up all required environment variables for the Vasquez Law Firm website production deployment.

## Required Services & API Keys

### 1. Database (PostgreSQL)

- **Provider Options**: Supabase, Neon, Railway, or AWS RDS
- **Required**: `DATABASE_URL`
- **Format**: `postgresql://user:password@host:5432/database?sslmode=require`

### 2. Authentication (NextAuth)

- **Generate Secret**: Run `openssl rand -base64 32`
- **Required**:
  - `NEXTAUTH_URL`: Your production domain (https://www.vasquezlawnc.com)
  - `NEXTAUTH_SECRET`: Generated secret (minimum 32 characters)

### 3. Email Service (Office 365)

- **Required Credentials**:
  - `SMTP_HOST`: smtp.office365.com
  - `SMTP_PORT`: 587
  - `SMTP_USER`: Your Office 365 email
  - `SMTP_PASSWORD`: App-specific password
  - `SMTP_FROM`: Display name and email

### 4. Twilio (SMS & Voice)

- **Sign up**: https://www.twilio.com
- **Required**:
  - `TWILIO_ACCOUNT_SID`: From Twilio Console
  - `TWILIO_AUTH_TOKEN`: From Twilio Console
  - `TWILIO_PHONE_NUMBER`: Your Twilio phone number

### 5. GoHighLevel CRM

- **Required**:
  - `GHL_API_KEY`: From GHL Settings > API
  - `GHL_LOCATION_ID`: Your location ID
  - `GHL_WEBHOOK_SECRET`: Generate a secure webhook secret
  - Campaign IDs for each practice area and language

### 6. Retell AI (Voice Agents)

- **Sign up**: https://retell.ai
- **Required**:
  - `RETELL_API_KEY`: From Retell Dashboard
  - `RETELL_WEBHOOK_SECRET`: For webhook verification

### 7. Redis (Caching)

- **Provider Options**: Upstash, Redis Cloud, or AWS ElastiCache
- **Required**: `REDIS_URL`
- **Format**: `redis://default:password@host:port`

### 8. Payment Processing

#### Stripe

- **Dashboard**: https://dashboard.stripe.com
- **Required**:
  - `STRIPE_SECRET_KEY`: Live secret key
  - `STRIPE_WEBHOOK_SECRET`: Webhook endpoint secret

#### Authorize.Net

- **Required**:
  - `AUTHORIZE_NET_API_LOGIN_ID`
  - `AUTHORIZE_NET_TRANSACTION_KEY`

#### LawPay

- **Required**: `LAWPAY_API_KEY`

### 9. Analytics

- **Google Analytics**:
  - `NEXT_PUBLIC_GA_MEASUREMENT_ID`: From GA4 property
- **Google Tag Manager**:
  - `NEXT_PUBLIC_GTM_ID`: From GTM container

### 10. Google APIs

- **Console**: https://console.cloud.google.com
- **Required APIs**:
  - Maps JavaScript API: `GOOGLE_MAPS_API_KEY`
  - My Business API: `GOOGLE_MY_BUSINESS_API_KEY`

### 11. Error Tracking (Sentry)

- **Sign up**: https://sentry.io
- **Required**:
  - `SENTRY_DSN`: From project settings
  - `SENTRY_AUTH_TOKEN`: For source maps

### 12. AI Services

- **OpenAI**: `OPENAI_API_KEY`
- **Anthropic**: `ANTHROPIC_API_KEY`

### 13. Social Media APIs

- **Facebook**: Page Access Token
- **Twitter**: API Key & Secret
- **LinkedIn**: Access Token
- **Instagram**: Access Token

### 14. Legal Data APIs

- **Federal Register**: Public API (no key needed)
- **CourtListener**: API key from https://www.courtlistener.com

## Environment File Setup

1. Copy the example file:

```bash
cp .env.production.example .env.production
```

2. Fill in all required values in `.env.production`

3. Validate environment variables:

```bash
npm run validate-env
```

## Security Checklist

- [ ] All secrets are unique and secure
- [ ] Database has SSL enabled
- [ ] CORS origins are properly configured
- [ ] Rate limiting is enabled
- [ ] Webhook secrets are set for all services
- [ ] Email domains are verified
- [ ] Payment providers are in production mode

## Deployment Platforms

### Vercel (Recommended)

1. Install Vercel CLI: `npm i -g vercel`
2. Link project: `vercel link`
3. Add environment variables: `vercel env add`
4. Deploy: `vercel --prod`

### Other Options

- AWS Amplify
- Netlify
- Railway
- Render

## Post-Deployment Tasks

1. **Verify DNS Settings**

   - A record pointing to deployment
   - CNAME for www subdomain
   - MX records for email

2. **SSL Certificate**

   - Should be auto-provisioned by hosting platform
   - Verify HTTPS is working

3. **Database Migrations**

   ```bash
   npx prisma migrate deploy
   ```

4. **Webhook Configuration**

   - GoHighLevel: Add webhook URL in settings
   - Twilio: Configure webhook endpoints
   - Stripe: Add webhook endpoint

5. **Monitoring Setup**
   - Enable Sentry error tracking
   - Set up uptime monitoring
   - Configure alerting

## Testing Production

1. **Core Functionality**

   - [ ] Homepage loads
   - [ ] Navigation works
   - [ ] Forms submit successfully
   - [ ] Chat widget appears
   - [ ] Phone numbers are clickable

2. **SEO & Analytics**

   - [ ] Google Analytics tracking
   - [ ] Sitemap accessible
   - [ ] Meta tags present
   - [ ] Structured data valid

3. **Integrations**
   - [ ] Email sending works
   - [ ] SMS notifications send
   - [ ] Payment processing works
   - [ ] CRM integration active

## Support

For deployment support:

- Documentation: [Link to internal docs]
- Email: tech@vasquezlawnc.com
- Emergency: [Contact number]
