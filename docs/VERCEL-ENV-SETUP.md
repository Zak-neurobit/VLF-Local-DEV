# Vercel Environment Variables Setup Guide

## Required Environment Variables

The following environment variables MUST be set in Vercel for the build to succeed:

### 1. NEXT_PUBLIC_APP_URL (Required)

- **Value**: `https://www.vasquezlawnc.com`
- **Description**: The public URL of your application
- **Used for**: SEO, canonical URLs, API callbacks

### 2. DATABASE_URL (Required)

- **Example**: `postgresql://user:password@host:5432/database`
- **Description**: PostgreSQL connection string
- **Recommended providers**: Vercel Postgres, Neon, Supabase

### 3. NEXTAUTH_URL (Required)

- **Value**: `https://www.vasquezlawnc.com`
- **Description**: NextAuth authentication URL

### 4. NEXTAUTH_SECRET (Required)

- **Generate with**: `openssl rand -base64 32`
- **Description**: Secret for JWT encryption

### 5. OPENAI_API_KEY (Required)

- **Format**: `sk-...`
- **Description**: OpenAI API key for AI features
- **Get from**: https://platform.openai.com/api-keys

## How to Set Environment Variables in Vercel

### Method 1: Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Navigate to **Settings** → **Environment Variables**
4. Click **Add New**
5. Enter the Key and Value
6. Select environments (Production, Preview, Development)
7. Click **Save**

### Method 2: Vercel CLI

```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Add environment variables
vercel env add NEXT_PUBLIC_APP_URL production
vercel env add DATABASE_URL production
vercel env add NEXTAUTH_URL production
vercel env add NEXTAUTH_SECRET production
vercel env add OPENAI_API_KEY production
```

### Method 3: Import from .env.local

```bash
# If you have a .env.local file with production values
vercel env pull .env.production
# Edit the file with production values
vercel env push .env.production
```

## Build Configuration

The project uses these build settings in `vercel.json`:

```json
{
  "installCommand": "npm install",
  "buildCommand": "npm run build",
  "framework": "nextjs",
  "functions": {
    "app/api/**.ts": {
      "maxDuration": 30
    }
  },
  "env": {
    "NODE_OPTIONS": "--max-old-space-size=8192"
  }
}
```

## After Setting Environment Variables

1. **Trigger a new deployment**:
   - Go to the Deployments tab
   - Click the three dots on the latest deployment
   - Select "Redeploy"

2. **Verify the build succeeds**:
   - Check the build logs
   - Ensure no environment validation errors
   - Confirm the deployment is successful

## Troubleshooting

### Build Still Failing?

1. Double-check all required variables are set
2. Ensure values don't have extra spaces or quotes
3. Verify the DATABASE_URL is accessible from Vercel's servers
4. Check that NEXTAUTH_SECRET is properly generated

### Environment Variable Not Working?

- Clear build cache: Settings → Git → Clear Build Cache
- Ensure variable names match exactly (case-sensitive)
- Check if the variable is available in the correct environment

## Security Notes

- Never commit actual environment variable values to Git
- Use different values for development and production
- Rotate secrets regularly
- Use Vercel's secret encryption for sensitive values
