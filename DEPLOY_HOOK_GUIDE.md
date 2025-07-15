# How to Create a Vercel Deploy Hook

## Steps to Create Deploy Hook:

1. **Go to your Vercel project**

   - https://vercel.com/dashboard
   - Click on `vasquez-law-website`

2. **Navigate to Settings**

   - Click "Settings" tab at the top

3. **Find Git section**

   - Scroll down or click "Git" in the left sidebar

4. **Create Deploy Hook**

   - Scroll to "Deploy Hooks" section
   - Click "Create Hook"
   - Name it: "Manual Deploy Trigger" (or any name)
   - Branch: `main`
   - Click "Create Hook"

5. **Copy the webhook URL**

   - It will look like: `https://api.vercel.com/v1/integrations/deploy/prj_xxxxx/xxxxx`

6. **Trigger deployment**

   - Option A: Use curl in terminal:

   ```bash
   curl -X POST "YOUR_WEBHOOK_URL_HERE"
   ```

   - Option B: Open the URL in browser
   - Option C: Use any HTTP client

## Quick Terminal Command

Once you have the webhook URL, run this in terminal:

```bash
# Replace with your actual webhook URL
curl -X POST https://api.vercel.com/v1/integrations/deploy/prj_xxxxx/xxxxx
```

## What This Does

- Forces Vercel to pull latest code from GitHub
- Triggers a new build immediately
- Deploys the hero section fix

## Alternative: Fix Git Connection

If deploy hooks don't work, the Git connection might be broken:

1. Go to Settings → Git
2. Look for "Connected Git Repository"
3. If it shows "Disconnected" or wrong repo:
   - Click "Disconnect"
   - Click "Connect Git Repository"
   - Choose GitHub
   - Select `quez2777/VLF-Website`
   - Choose `main` branch
   - Save

This should restore automatic deployments!
