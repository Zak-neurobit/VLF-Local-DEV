# Deployment Instructions for Vercel

Since the automatic deployment isn't triggering, here are the steps to deploy manually:

## Option 1: Re-connect GitHub Integration (Recommended)

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Click on your project "vlf-website"
3. Go to "Settings" → "Git"
4. If GitHub is disconnected, click "Connect to GitHub"
5. Select the repository: `quez2777/VLF-Website`
6. Choose the `main` branch
7. Click "Save"

This will trigger an automatic deployment and future pushes will deploy automatically.

## Option 2: Import from GitHub

If the project isn't showing up:

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select "Import from GitHub"
4. Choose `quez2777/VLF-Website`
5. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build` (or leave as default)
   - Output Directory: Leave as default
   - Install Command: `npm install`

## Option 3: Deploy via Vercel CLI

1. Install Vercel CLI globally (if not installed):
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   cd "/Users/williamvasquez/Documents/VLF Website"
   vercel --prod
   ```

## Required Environment Variables

Before deployment, make sure to add these in Vercel project settings:

### Required:
- `DATABASE_URL` - Your PostgreSQL connection string
- `NEXTAUTH_SECRET` - Use: `QnJ386rd1BIjDuiik6ccHXD3OVtNxMBo/3F+IOJLu+M=`
- `NEXTAUTH_URL` - Your production URL (e.g., https://vlf-website.vercel.app)
- `GOOGLE_CLIENT_ID` - From Google Console
- `GOOGLE_CLIENT_SECRET` - From Google Console

### Optional (app will use mocks if not provided):
- Redis configuration
- Email SMTP settings
- API keys for various services

## Build Status

The code has been tested and builds successfully locally. The following fixes have been applied:
- ✅ Fixed all SSR "window is not defined" errors
- ✅ Fixed database/Redis initialization during build
- ✅ Added mock support for missing services
- ✅ Resolved dynamic export conflicts

## Latest Commit

The latest commit with all fixes is:
- Commit: `060a515`
- Message: "Fix SSR build errors and prepare for Vercel deployment"
- Branch: `main`

The build should complete successfully once the environment variables are configured.