# 🚀 Deploy Now!

## Quick Deploy Command

Run this in your terminal:

```bash
cd "/Users/williamvasquez/Documents/VLF Website/vasquez-law-website"
npx vercel --prod
```

## What Will Happen:

1. **Vercel CLI will start**
2. **You'll be asked to log in** (if first time)
   - It will open your browser
   - Log in with GitHub/GitLab/Email
3. **Project Setup Questions:**

   - Set up and deploy? → **Y**
   - Which scope? → **Select your account**
   - Link to existing project? → **N**
   - Project name? → **vasquez-law-website** (or press Enter)
   - Directory? → **./** (press Enter)
   - Override settings? → **N**

4. **Deployment will begin**

   - Building... (2-3 minutes)
   - Uploading...
   - Finalizing...

5. **Success!**
   - You'll get URLs:
   - Preview: https://vasquez-law-website-xxx.vercel.app
   - Production: https://vasquez-law-website.vercel.app

## After Deployment:

1. **Visit your live site**
2. **Test navigation and pages**
3. **Add environment variables in Vercel Dashboard**
   - Go to: https://vercel.com/dashboard
   - Click your project
   - Settings → Environment Variables
   - Add DATABASE_URL from Supabase/Neon

## Need a Free Database?

### Supabase (Easiest):

1. Visit: https://supabase.com
2. Sign up (free)
3. Create New Project
4. Go to Settings → Database
5. Copy connection string
6. Add to Vercel as DATABASE_URL

Your site is ready to deploy! Just run the command above. 🎉
