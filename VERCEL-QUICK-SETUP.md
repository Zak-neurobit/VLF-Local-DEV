# Vercel Quick Setup - Required Variables

## Set these in Vercel Dashboard NOW:

1. Go to: https://vercel.com/dashboard
2. Select your project
3. Click **Settings** → **Environment Variables**
4. Add these variables:

### Required Variables (Copy & Paste):

```
NEXT_PUBLIC_APP_URL = https://www.vasquezlawnc.com
DATABASE_URL = [Your PostgreSQL connection string]
NEXTAUTH_URL = https://www.vasquezlawnc.com
NEXTAUTH_SECRET = [Generate with: openssl rand -base64 32]
OPENAI_API_KEY = [Your OpenAI API key starting with sk-]
```

### Quick Commands to Generate Secrets:

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Example DATABASE_URL format:
# postgresql://user:password@host:5432/database
```

### After Adding Variables:

1. Click **Save** for each variable
2. Go to **Deployments** tab
3. Click the three dots on latest deployment
4. Select **Redeploy**

## Optional But Recommended:

- SENTRY_DSN (for error tracking)
- NEXT_PUBLIC_GOOGLE_MAPS_API_KEY (for maps)
- GHL_API_KEY & GHL_LOCATION_ID (for GoHighLevel)
