# Vasquez Law Firm - Complete API Setup Guide

This guide will walk you through setting up all required API keys and services for the Vasquez Law Firm website.

## Table of Contents

1. [Required APIs Overview](#required-apis-overview)
2. [Step-by-Step Setup](#step-by-step-setup)
3. [Testing Your Configuration](#testing-your-configuration)
4. [Troubleshooting](#troubleshooting)

## Required APIs Overview

### Critical APIs (Required for Basic Functionality)

- **OpenAI API** - Powers the chatbot and AI features
- **GoHighLevel (GHL)** - CRM integration for lead management
- **PostgreSQL Database** - Data storage
- **Redis** - Caching and session management

### Important APIs (Highly Recommended)

- **Retell AI** - Voice agent functionality (API key already provided)
- **Google Maps** - Location services
- **Email Services** - Client communications
- **Sentry** - Error tracking and monitoring

### Optional APIs (Enhanced Features)

- **Payment Processing** - Authorize.Net, LawPay, or Stripe
- **Google Services** - Analytics, Search, Places
- **Yelp API** - Business reviews

## Step-by-Step Setup

### 1. Database Setup (PostgreSQL)

```bash
# Install PostgreSQL if not already installed
# macOS:
brew install postgresql
brew services start postgresql

# Create database
createdb vasquez_law

# Update .env.local
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/vasquez_law
```

### 2. Redis Setup

```bash
# Install Redis
# macOS:
brew install redis
brew services start redis

# Update .env.local
REDIS_URL=redis://localhost:6379
MOCK_REDIS=false
```

### 3. OpenAI API Setup

1. Go to https://platform.openai.com/api-keys
2. Create a new API key
3. Add to .env.local:

```
OPENAI_API_KEY=sk-your-actual-api-key-here
```

### 4. GoHighLevel (GHL) Setup

1. Log into your GoHighLevel account
2. Go to Settings > API Keys
3. Generate a new API key
4. Get your Location ID from Settings > Business Profile
5. Find your Calendar ID, Pipeline ID, and User ID from respective sections

Add to .env.local:

```
GHL_API_KEY=your-ghl-api-key
GHL_LOCATION_ID=your-location-id
GHL_API_URL=https://rest.gohighlevel.com/v1
GHL_CALENDAR_ID=your-calendar-id
GHL_MAIN_PIPELINE_ID=your-pipeline-id
GHL_NEW_LEADS_STAGE_ID=your-stage-id
GHL_DEFAULT_USER_ID=your-user-id
```

### 5. Retell AI Setup (Voice Agents)

The API key is already provided:

```
RETELL_API_KEY=2996bc9f-ca4e-422a-b64e-a09a3eaa9bc0
RETELL_WEBHOOK_SECRET=2996bc9f-ca4e-422a-b64e-a09a3eaa9bc0
```

### 6. Email Configuration (Office 365)

1. Enable app passwords in your Office 365 account
2. Generate an app-specific password
3. Add to .env.local:

```
OFFICE365_EMAIL=info@vasquezlawnc.com
OFFICE365_PASSWORD=your-app-password
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=info@vasquezlawnc.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=info@vasquezlawnc.com
```

### 7. Google Services Setup

#### Google Maps API

1. Go to https://console.cloud.google.com/
2. Create a new project or select existing
3. Enable Maps JavaScript API
4. Create API key with restrictions
5. Add to .env.local:

```
GOOGLE_MAPS_API_KEY=your-maps-api-key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-maps-api-key
```

#### Google Analytics

1. Go to https://analytics.google.com/
2. Create a new property for vasquezlawfirm.com
3. Get your Measurement ID
4. Add to .env.local:

```
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

### 8. Payment Processing (Choose One)

#### Option A: LawPay (Recommended for Law Firms)

```
LAWPAY_PUBLIC_KEY=your-lawpay-public-key
LAWPAY_SECRET_KEY=your-lawpay-secret-key
LAWPAY_TRUST_ACCOUNT_ID=your-trust-account-id
LAWPAY_OPERATING_ACCOUNT_ID=your-operating-account-id
```

#### Option B: Stripe

```
STRIPE_SECRET_KEY=sk_live_your-stripe-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
```

### 9. Sentry Error Tracking

1. Sign up at https://sentry.io/
2. Create a new project (Next.js)
3. Get your DSN
4. Add to .env.local:

```
SENTRY_DSN=https://your-key@sentry.io/project-id
```

### 10. Authentication Setup

Generate a secure secret:

```bash
openssl rand -base64 32
```

Add to .env.local:

```
NEXTAUTH_URL=https://www.vasquezlawfirm.com
NEXTAUTH_SECRET=your-generated-secret
```

## Testing Your Configuration

Run this script to test all API connections:

```bash
npm run test:apis
```

Or test individually:

```bash
# Test database connection
npm run test:db

# Test Redis
npm run test:redis

# Test OpenAI
npm run test:openai

# Test GHL
npm run test:ghl

# Test email
npm run test:email
```

## Environment Variables Checklist

Copy this to your .env.local and fill in the values:

```env
# ===========================================
# CRITICAL - MUST HAVE FOR BASIC FUNCTIONALITY
# ===========================================
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://www.vasquezlawfirm.com

# Database (Required)
DATABASE_URL=postgresql://user:password@host:5432/vasquez_law

# Authentication (Required)
NEXTAUTH_URL=https://www.vasquezlawfirm.com
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32

# Redis (Required for production)
REDIS_URL=redis://your-redis-url:6379
MOCK_REDIS=false

# OpenAI (Required for chat)
OPENAI_API_KEY=sk-your-openai-api-key

# GoHighLevel (Required for CRM)
GHL_API_KEY=your-ghl-api-key
GHL_LOCATION_ID=your-location-id
GHL_API_URL=https://rest.gohighlevel.com/v1
GHL_CALENDAR_ID=your-calendar-id
GHL_MAIN_PIPELINE_ID=your-pipeline-id
GHL_NEW_LEADS_STAGE_ID=your-stage-id
GHL_DEFAULT_USER_ID=your-user-id

# ===========================================
# IMPORTANT - HIGHLY RECOMMENDED
# ===========================================

# Retell AI (Already provided)
RETELL_API_KEY=2996bc9f-ca4e-422a-b64e-a09a3eaa9bc0
RETELL_WEBHOOK_SECRET=2996bc9f-ca4e-422a-b64e-a09a3eaa9bc0

# Email
EMAIL_FROM=info@vasquezlawnc.com
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=info@vasquezlawnc.com
SMTP_PASSWORD=your-smtp-password

# Google Maps
GOOGLE_MAPS_API_KEY=your-maps-api-key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-maps-api-key

# Error Tracking
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id

# ===========================================
# OPTIONAL - ADD AS NEEDED
# ===========================================

# Payment Processing (Choose one)
LAWPAY_PUBLIC_KEY=
LAWPAY_SECRET_KEY=
# OR
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Google Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Additional Google Services
GOOGLE_SEARCH_API_KEY=
GOOGLE_SEARCH_ENGINE_ID=
GOOGLE_PLACES_API_KEY=

# Yelp Reviews
YELP_API_KEY=
```

## Troubleshooting

### Common Issues

1. **Database Connection Failed**

   - Ensure PostgreSQL is running
   - Check connection string format
   - Verify database exists

2. **Redis Connection Failed**

   - Ensure Redis is running
   - Check if port 6379 is available
   - Set MOCK_REDIS=true for development

3. **OpenAI API Errors**

   - Verify API key is valid
   - Check usage limits
   - Ensure key has proper permissions

4. **GHL Integration Issues**

   - Verify all IDs are correct
   - Check API key permissions
   - Ensure campaigns exist in GHL

5. **Email Not Sending**
   - Verify SMTP credentials
   - Check firewall/port settings
   - Enable less secure apps (if needed)

### Support

For API-specific issues:

- OpenAI: https://platform.openai.com/docs
- GoHighLevel: https://help.gohighlevel.com/
- Retell AI: https://docs.retellai.com/
- Google APIs: https://console.cloud.google.com/support

For website issues:

- Check logs: `npm run logs`
- View errors: Check Sentry dashboard
- Debug mode: Set `NODE_ENV=development`
