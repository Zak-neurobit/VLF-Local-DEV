# 🚀 Deploy VLF + HODOS - Step by Step

## Option 1: Vercel + Railway (Fastest)

### Deploy VLF Website to Vercel

1. **Install Vercel CLI** (if not installed):

```bash
npm i -g vercel
```

2. **Deploy to Vercel**:

```bash
cd "/Users/williamvasquez/Documents/VLF Website/vasquez-law-website"
vercel
```

3. **Follow prompts**:

- Set up and deploy? **Yes**
- Which scope? **Your account**
- Link to existing project? **No**
- What's your project's name? **vasquez-law-website**
- In which directory is your code? **./.**
- Want to modify settings? **No**

4. **Set environment variables** in Vercel Dashboard:

- Go to: https://vercel.com/dashboard
- Select your project
- Go to Settings → Environment Variables
- Add these variables:

```
DATABASE_URL=your-postgres-url
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
HODOS_API_URL=https://your-hodos-url.up.railway.app
HODOS_API_KEY=your-secure-api-key
```

5. **Deploy to production**:

```bash
vercel --prod
```

### Deploy HODOS to Railway

1. **Install Railway CLI**:

```bash
brew install railway
```

2. **Deploy HODOS**:

```bash
cd /Users/williamvasquez/Documents/HODOS/HODOS
railway login
railway init
railway up
```

3. **Set environment variables** in Railway Dashboard:

- MONGODB_URI
- VLF_WEBSITE_URL
- JWT_SECRET

## Option 2: DigitalOcean (All-in-One)

1. **Prepare repositories**:

- Push VLF to GitHub
- Push HODOS to GitHub

2. **Create DigitalOcean App**:

- Go to: https://cloud.digitalocean.com/apps
- Click "Create App"
- Connect GitHub
- Select both repositories

3. **Configure**:

- Set environment variables
- Choose region
- Deploy!

## Option 3: Local Test First

```bash
# Test production build locally
cd "/Users/williamvasquez/Documents/VLF Website/vasquez-law-website"

# Create production env
cp .env.production.example .env.production.local

# Build
npm run build

# Start
NODE_ENV=production npm start
```

## Quick Vercel Deployment (One Command)

```bash
cd "/Users/williamvasquez/Documents/VLF Website/vasquez-law-website"
vercel --prod
```

Then add environment variables in Vercel dashboard.

## Post-Deployment

1. **Update DNS**:

- Point domain to Vercel
- Add CNAME for admin subdomain to Railway

2. **Test endpoints**:

```bash
# VLF Health
curl https://your-domain.vercel.app/api/health

# HODOS Integration
curl https://your-domain.vercel.app/api/hodos/health
```

3. **Monitor**:

- Check Vercel Analytics
- Monitor Railway logs
- Set up Sentry for errors

## Environment Variables Checklist

### VLF (Vercel)

- [ ] DATABASE_URL
- [ ] NEXTAUTH_URL
- [ ] NEXTAUTH_SECRET
- [ ] HODOS_API_URL
- [ ] HODOS_API_KEY
- [ ] REDIS_URL (optional)
- [ ] Email settings

### HODOS (Railway)

- [ ] MONGODB_URI
- [ ] REDIS_URL
- [ ] VLF_WEBSITE_URL
- [ ] VLF_API_KEY
- [ ] JWT_SECRET

## Ready? Deploy Now!

The fastest way:

```bash
cd "/Users/williamvasquez/Documents/VLF Website/vasquez-law-website"
vercel --prod
```

Your site will be live in minutes! 🎉
