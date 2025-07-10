# Vercel Environment Variables Configuration

This document lists all the environment variables that need to be configured in your Vercel project settings.

## Required Environment Variables

These variables MUST be set in Vercel for the application to function properly:

### Database

- **`DATABASE_URL`** - PostgreSQL connection string (e.g., `postgresql://user:password@host:5432/dbname`)

### Authentication

- **`NEXTAUTH_SECRET`** - Secret key for NextAuth.js (generate with `openssl rand -base64 32`)
- **`NEXTAUTH_URL`** - Your production URL (e.g., `https://your-domain.com`)
- **`GOOGLE_CLIENT_ID`** - Google OAuth client ID from Google Console
- **`GOOGLE_CLIENT_SECRET`** - Google OAuth client secret from Google Console

### Redis (Optional - app will use mock if not provided)

- **`REDIS_HOST`** - Redis server hostname
- **`REDIS_PORT`** - Redis server port (default: 6379)
- **`REDIS_PASSWORD`** - Redis server password (if required)

## Optional Environment Variables

These enhance functionality but the app will work without them:

### Email Service

- **`EMAIL_FROM`** - Default sender email address
- **`SMTP_HOST`** - SMTP server hostname
- **`SMTP_PORT`** - SMTP server port
- **`SMTP_USER`** - SMTP username
- **`SMTP_PASSWORD`** - SMTP password

### Payment Processing (Stripe)

- **`STRIPE_SECRET_KEY`** - Stripe secret key
- **`STRIPE_WEBHOOK_SECRET`** - Stripe webhook endpoint secret
- **`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`** - Stripe publishable key

### AI Services

- **`OPENAI_API_KEY`** - OpenAI API key
- **`ANTHROPIC_API_KEY`** - Anthropic Claude API key
- **`RETELL_API_KEY`** - Retell AI API key

### Voice Services (Twilio)

- **`TWILIO_ACCOUNT_SID`** - Twilio account SID
- **`TWILIO_AUTH_TOKEN`** - Twilio auth token
- **`TWILIO_PHONE_NUMBER`** - Twilio phone number

### Analytics

- **`NEXT_PUBLIC_GA_MEASUREMENT_ID`** - Google Analytics measurement ID
- **`NEXT_PUBLIC_POSTHOG_KEY`** - PostHog project API key
- **`NEXT_PUBLIC_POSTHOG_HOST`** - PostHog API host

### Error Tracking

- **`SENTRY_DSN`** - Sentry DSN for server-side error tracking
- **`NEXT_PUBLIC_SENTRY_DSN`** - Sentry DSN for client-side error tracking

### Maps

- **`NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`** - Google Maps API key

## How to Add Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Click on "Settings" tab
3. Navigate to "Environment Variables"
4. Add each variable with its value
5. Select the appropriate environments (Production, Preview, Development)
6. Click "Save"

## Important Notes

- Never commit actual secret values to the repository
- The `.env.production` file contains dummy values for build purposes only
- Vercel environment variables override the values in `.env.production`
- After adding/updating variables, redeploy your application
- Use strong, unique values for secret keys and passwords

## Generating Secure Values

### Generate NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

### Generate strong passwords

```bash
openssl rand -base64 24
```

## Testing Configuration

After setting up environment variables:

1. Trigger a new deployment in Vercel
2. Check the build logs for any errors
3. Test authentication, database connectivity, and other features
4. Monitor error logs in Vercel Functions tab
