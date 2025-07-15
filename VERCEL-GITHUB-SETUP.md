# Vercel GitHub Integration Setup Guide

## Quick Setup

1. **Run the setup script:**

   ```bash
   ./link-vercel-to-github.sh
   ```

2. **Connect via Vercel Dashboard:**
   - Go to: https://vercel.com/dashboard
   - Find your project (vlf-website)
   - Navigate to: Settings → Git
   - Click "Connect Git Repository"
   - Select GitHub and authorize
   - Choose repository: `quez2777/VLF-Website`
   - Set production branch: `main`

## Alternative: Direct Import

Use this link to import directly:

```
https://vercel.com/import/git?s=https://github.com/quez2777/VLF-Website
```

## Environment Variables

After connecting, add these environment variables in Vercel:

### Required Variables

```
# Database
DATABASE_URL=your_database_url
DIRECT_URL=your_direct_database_url

# Authentication
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your_nextauth_secret

# AI Services
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
RETELL_API_KEY=2996bc9f-ca4e-422a-b64e-a09a3eaa9bc0
RETELL_WEBHOOK_SECRET=7efcae7a2520bb26dd53cea9b3305a5f835fc5d793c0f531ec9766a98b0b1c9a

# GoHighLevel
GHL_API_KEY=your_ghl_key
GHL_LOCATION_ID=your_location_id
GHL_CALENDAR_ID=your_calendar_id

# Twilio
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_twilio_number

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Email
EMAIL_FROM=noreply@vasquezlawnc.com
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your_email
EMAIL_SERVER_PASSWORD=your_app_password
```

## Automatic Deployments

Once connected, Vercel will automatically:

- Deploy when you push to `main` branch
- Create preview deployments for pull requests
- Run build checks before deploying

## Manual Deployment

If needed, deploy manually:

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Verify Connection

1. Make a test commit:

   ```bash
   echo "# Test" >> README.md
   git add README.md
   git commit -m "test: Vercel deployment"
   git push origin main
   ```

2. Check Vercel dashboard for automatic deployment

## Troubleshooting

### If deployment fails:

1. Check build logs in Vercel dashboard
2. Ensure all environment variables are set
3. Verify Node.js version compatibility
4. Check for TypeScript errors: `npm run type-check`

### Common Issues:

- **Missing environment variables**: Add all required vars in Vercel dashboard
- **Build timeout**: Increase memory in vercel.json
- **Database connection**: Ensure DATABASE_URL is correct for production

## Support

- Vercel Documentation: https://vercel.com/docs
- Next.js on Vercel: https://vercel.com/docs/frameworks/nextjs
- GitHub Integration: https://vercel.com/docs/git
