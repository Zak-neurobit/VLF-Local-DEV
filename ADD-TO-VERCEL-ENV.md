# Environment Variables to Add to Vercel

## Instructions
1. Go to https://vercel.com/[your-team]/vasquez-law-website/settings/environment-variables
2. Add each of these variables to Vercel
3. Make sure to add them for "Production", "Preview", and "Development" environments

## Required Environment Variables

### Database
- `DATABASE_URL` - Your PostgreSQL connection string

### GoHighLevel API
- `GHL_API_KEY` - Your GoHighLevel API key
- `GHL_LOCATION_ID` - Your GHL location ID
- `GHL_PIPELINE_ID` - Your GHL pipeline ID
- `GHL_HOT_LEAD_CAMPAIGN_ID` - Campaign ID for hot leads
- `GHL_WARM_LEAD_CAMPAIGN_ID` - Campaign ID for warm leads
- `GHL_HOT_LEADS_STAGE_ID` - Stage ID for hot leads
- `GHL_WARM_LEADS_STAGE_ID` - Stage ID for warm leads
- `GHL_COLD_LEADS_STAGE_ID` - Stage ID for cold leads
- `GHL_INVALID_LEADS_STAGE_ID` - Stage ID for invalid leads

### OpenAI
- `OPENAI_API_KEY` - Your OpenAI API key

### Other Services
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - Google Maps API key
- `TWILIO_ACCOUNT_SID` - Twilio account SID
- `TWILIO_AUTH_TOKEN` - Twilio auth token
- `TWILIO_PHONE_NUMBER` - Your Twilio phone number
- `SENDGRID_API_KEY` - SendGrid API key (if using)
- `SENTRY_DSN` - Sentry error tracking DSN

### Feature Flags
- `MOCK_REDIS=true` - Since we're using mock Redis for now
- `NEXT_PUBLIC_ENABLE_CHAT=true` - Enable chat feature
- `NEXT_PUBLIC_ENABLE_VOICE=true` - Enable voice feature

## After Adding Variables

1. Trigger a new deployment:
   ```bash
   vercel --prod
   ```

2. Or redeploy from Vercel dashboard:
   - Go to your project
   - Click on the latest deployment
   - Click "Redeploy"

## Verify Deployment

After redeploying with environment variables:

```bash
./verify-api-deployment.sh
```

This should fix the 500 errors on your API routes!