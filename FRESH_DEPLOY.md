# Fresh Vercel Deployment Guide

Starting fresh is often the best approach. Here's how:

## Step 1: Create New Vercel Project

1. Go to: **https://vercel.com/new**
2. Click **"Import Git Repository"**
3. Select **`quez2777/VLF-Website`**
4. Configure:
   - Project Name: `vasquez-law-website` (or your preference)
   - Framework Preset: **Next.js** (should auto-detect)
   - Root Directory: **`.`** (leave as default)
   - Build Settings: (leave as default, it will use our vercel.json)

## Step 2: Add Environment Variables BEFORE Deploying

Click "Environment Variables" and add these:

```bash
# REQUIRED - Copy exactly as shown:
DATABASE_URL=postgresql://neondb_owner:npg_eCqcU6ELgvJ5@ep-old-mode-a4bj2csn-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
NEXTAUTH_SECRET=QnJ386rd1BIjDuiik6ccHXD3OVtNxMBo/3F+IOJLu+M=
NEXTAUTH_URL=https://[your-project-name].vercel.app
MOCK_REDIS=true
MOCK_EMAIL=true
MOCK_SMS=true
NODE_ENV=production

# OPTIONAL but recommended:
OPENAI_API_KEY=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
GHL_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6ImJkMDVZOVNsRjFFbXhKREI5aHZSIiwiY29tcGFueV9pZCI6InpFdkR3a0xBbzNCM1F4R3F3QUFkIiwidmVyc2lvbiI6MSwiaWF0IjoxNzExMDM1ODE0NDA3LCJzdWIiOiJ1c2VyX2lkIn0.hDnaMa6pU5dDUy9oq8DJfUJnWt54jd7rmUHAvbCUiGs
GHL_LOCATION_ID=bd05Y9SlF1EmxJDB9hvR
```

**Note**: Update `NEXTAUTH_URL` with your actual Vercel URL after creation

## Step 3: Deploy

Click **"Deploy"** - it should work now!

## Why Start Fresh?

1. ✅ Clean Git integration
2. ✅ No old failed deployments
3. ✅ Proper environment setup from start
4. ✅ Latest Vercel features

## After Deployment:

1. Update `NEXTAUTH_URL` to match your new URL
2. Add custom domain if needed
3. Set up Google OAuth redirect URLs

## Alternative: Clone and Deploy Locally

If you prefer more control:

```bash
# 1. Clone fresh
git clone https://github.com/quez2777/VLF-Website.git vasquez-law-fresh
cd vasquez-law-fresh

# 2. Install Vercel CLI
npm i -g vercel

# 3. Login
vercel login

# 4. Deploy
vercel --prod
```

When prompted, create a new project and add the environment variables.

## Success Indicators:

- ✅ Database connected (we tested it)
- ✅ Build errors fixed
- ✅ Environment variables set
- ✅ Fresh project = fresh start

The build WILL succeed!
