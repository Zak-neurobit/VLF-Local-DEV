# Vercel Deployment Steps for Modern AI Website

## 1. Add Environment Variables in Vercel Dashboard

Go to: https://vercel.com/hodos-360/vasquez-law-website/settings/environment-variables

Add these variables for **Production**, **Preview**, and **Development**:

```
DATABASE_URL=postgresql://neondb_owner:npg_eCqcU6ELgvJ5@ep-old-mode-a4bj2csn-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
OPENAI_API_KEY=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
GHL_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6ImJkMDVZOVNsRjFFbXhKREI5aHZSIiwiY29tcGFueV9pZCI6InpFdkR3a0xBbzNCM1F4R3F3QUFkIiwidmVyc2lvbiI6MSwiaWF0IjoxNzExMDM1ODE0NDA3LCJzdWIiOiJ1c2VyX2lkIn0.hDnaMa6pU5dDUy9oq8DJfUJnWt54jd7rmUHAvbCUiGs
GHL_LOCATION_ID=bd05Y9SlF1EmxJDB9hvR
NEXTAUTH_URL=https://vasquez-law-website-hodos-360.vercel.app
NEXTAUTH_SECRET=your-32-character-secret-here
MOCK_REDIS=true
MOCK_EMAIL=false
MOCK_SMS=false
```

## 2. Generate NEXTAUTH_SECRET

Run this command locally to generate a secure secret:

```bash
openssl rand -base64 32
```

Or use: https://generate-secret.vercel.app/32

## 3. Force Redeploy

After adding environment variables:

1. Go to: https://vercel.com/hodos-360/vasquez-law-website
2. Click on the latest deployment
3. Click the three dots menu → "Redeploy"
4. Check "Use different commit" and select the latest commit (4b20b06)
5. Check "Redeploy with existing Build Cache cleared"
6. Click "Redeploy"

## 4. Verify Deployment

Once deployed, check these URLs:

1. **Deployment Marker**: https://vasquez-law-website-hodos-360.vercel.app/deployment-marker.json

   - Should show version: "2.0.0"

2. **Homepage**: https://vasquez-law-website-hodos-360.vercel.app

   - Should show William Vasquez prominently
   - 3D animations should be visible
   - AI chat button in bottom right

3. **Check Console**: Open browser DevTools
   - Should see "Modern AI Website Loaded" messages
   - No 404 errors on navigation

## 5. If Still Showing Old Site

1. **Clear Browser Cache**: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
2. **Check Domain Settings**: Ensure no old deployments are pinned
3. **Check Build Logs**: Look for any errors in Vercel dashboard

## Modern Website Features You Should See:

- ✨ William Vasquez featured with 3D animation on hero
- 🤖 AI Virtual Paralegal chat button (bottom right)
- 🎯 Interactive practice area cards with WebGL
- 📊 Real-time case evaluation calculator
- 🎖️ Veteran story timeline with parallax
- 🌐 Language toggle (EN/ES) in top right
- 🚀 Smooth animations throughout

## Support

If issues persist:

1. Check build logs in Vercel dashboard
2. Ensure all environment variables are set correctly
3. Try deploying from a different branch and back to main
