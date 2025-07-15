# 🔐 Vercel Environment Variables - Step by Step Setup

## Step 1: Access Environment Variables Settings

### Via Vercel Dashboard:

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on your project (after importing from GitHub)
3. Click on **"Settings"** tab at the top
4. Click on **"Environment Variables"** in the left sidebar

### Via CLI (Alternative):

```bash
vercel env add DATABASE_URL production
```

## Step 2: Get Your Database URLs

### Option A: Use Vercel Postgres (Easiest)

1. In your Vercel project dashboard
2. Go to **"Storage"** tab
3. Click **"Create Database"**
4. Select **"Postgres"**
5. Choose a name (e.g., "vlf-database")
6. Click **"Create"**
7. Vercel automatically adds these env vars:
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL` (use this for DATABASE_URL)
   - `POSTGRES_URL_NON_POOLING`
   - `POSTGRES_USER`
   - `POSTGRES_HOST`
   - `POSTGRES_PASSWORD`
   - `POSTGRES_DATABASE`

### Option B: External Database (Supabase Example)

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings → Database
4. Copy the connection string
5. It looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

## Step 3: Add Each Environment Variable

### In Vercel Dashboard, for each variable:

1. **DATABASE_URL**

   - Key: `DATABASE_URL`
   - Value: Your PostgreSQL connection string
   - Environment: ✅ Production, ✅ Preview, ✅ Development
   - Click **"Save"**

2. **NextAuth Secret** (REQUIRED)

   - First, generate a secret:

   ```bash
   openssl rand -base64 32
   ```

   - Key: `NEXTAUTH_SECRET`
   - Value: The generated string (e.g., `k4P9Xn2rL8mQ1wZ5vT7yB3jH6fA0dS9g`)
   - Environment: ✅ Production, ✅ Preview, ✅ Development
   - Click **"Save"**

3. **NextAuth URL**

   - Key: `NEXTAUTH_URL`
   - Value:
     - Production: `https://your-domain.com` or `https://your-project.vercel.app`
     - Preview: Leave empty (Vercel auto-configures)
   - Environment: ✅ Production only
   - Click **"Save"**

4. **Redis (Vercel KV)**
   - Go to **"Storage"** → **"Create Database"** → **"KV"**
   - Vercel automatically adds:
     - `KV_URL`
     - `KV_REST_API_URL`
     - `KV_REST_API_TOKEN`
     - `KV_REST_API_READ_ONLY_TOKEN`
   - Add this mapping:
     - Key: `REDIS_URL`
     - Value: Click "Copy" next to `KV_URL` and paste
     - Environment: ✅ Production, ✅ Preview, ✅ Development

## Step 4: External Service Variables

### SendGrid (Email)

1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Go to Settings → API Keys
3. Create API Key with "Full Access"
4. Add to Vercel:
   ```
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_USER=apikey
   SMTP_PASS=SG.xxxxxxxxxxxxxxxxxxxxx (your API key)
   ```

### Twilio (Voice/SMS)

1. Sign up at [twilio.com](https://twilio.com)
2. From Console Dashboard, copy:
   - Account SID
   - Auth Token
   - Buy a phone number
3. Add to Vercel:
   ```
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   TWILIO_PHONE_NUMBER=+1234567890
   ```

### OpenAI (AI Features)

1. Go to [platform.openai.com](https://platform.openai.com)
2. API Keys → Create new secret key
3. Add to Vercel:
   ```
   OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

## Step 5: HODOS Integration Variables

```
HODOS_API_URL=http://localhost:3001 (for now, update when HODOS is deployed)
HODOS_API_KEY=your-secure-api-key-here
HODOS_WEBSOCKET_URL=ws://localhost:3001
```

## Step 6: Optional but Recommended

### Sentry (Error Tracking)

1. Sign up at [sentry.io](https://sentry.io)
2. Create new project → Next.js
3. Copy DSN from project settings
4. Add to Vercel:
   ```
   SENTRY_DSN=https://xxxxx@xxxx.ingest.sentry.io/xxxxx
   SENTRY_ORG=your-org
   SENTRY_PROJECT=vlf-website
   ```

### Google OAuth (Optional)

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create new project or select existing
3. APIs & Services → Credentials → Create OAuth 2.0 Client ID
4. Add authorized redirect URIs:
   - `https://your-domain.com/api/auth/callback/google`
   - `https://your-project.vercel.app/api/auth/callback/google`
5. Add to Vercel:
   ```
   GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxx
   ```

## Step 7: Verify and Redeploy

### Check All Variables:

Your Environment Variables page should show:

- ✅ DATABASE_URL
- ✅ NEXTAUTH_SECRET
- ✅ NEXTAUTH_URL
- ✅ REDIS_URL or KV_URL
- ✅ SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
- ✅ TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER
- ✅ OPENAI_API_KEY
- ✅ HODOS_API_URL, HODOS_API_KEY

### Trigger Redeploy:

1. After adding all variables
2. Go to **"Deployments"** tab
3. Click the three dots on latest deployment
4. Click **"Redeploy"**
5. Choose **"Use existing Build Cache"** → **"Redeploy"**

## Step 8: Test Your Configuration

### Via Browser:

```
https://your-project.vercel.app/api/health
```

### Via Terminal:

```bash
curl https://your-project.vercel.app/api/health
```

## 🚨 Common Issues & Solutions

### "Missing required environment variable"

- Make sure variable is added for Production environment
- Check spelling matches exactly
- Redeploy after adding

### "Database connection failed"

- For Vercel Postgres: Use `POSTGRES_PRISMA_URL` not `POSTGRES_URL`
- Add `?sslmode=require` to external database URLs
- Check if database allows connections from Vercel IPs

### "NextAuth error"

- NEXTAUTH_SECRET must be at least 32 characters
- NEXTAUTH_URL should not have trailing slash
- For preview deployments, leave NEXTAUTH_URL empty

### "Redis connection failed"

- Use `KV_URL` value for `REDIS_URL`
- Or use mock Redis for testing: `MOCK_REDIS=true`

## 📋 Quick Checklist

- [ ] Database URL configured and tested
- [ ] NextAuth secret generated (32+ chars)
- [ ] NextAuth URL set (no trailing slash)
- [ ] Redis/KV configured
- [ ] Email service configured
- [ ] All required services have API keys
- [ ] Redeployed after adding variables
- [ ] Health check endpoint responds

## 🔒 Security Tips

1. **Never commit .env files** to Git
2. **Use different values** for development/production
3. **Rotate secrets regularly**
4. **Limit access** to production variables
5. **Use Vercel's encryption** (automatic)

---

Need help? Check deployment logs:

```bash
vercel logs --prod
```
