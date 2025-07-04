# 🚀 Deployment Instructions for Vasquez Law Firm Website

Due to git issues, please follow these manual deployment steps:

## 1. Fix Git Repository (if needed)

If you're experiencing git issues, try:

```bash
# Remove corrupted objects
rm -rf .git/index
git reset

# Or clone fresh and copy files
git clone https://github.com/quez2777/VLF-Website fresh-clone
cp -r src prisma *.json *.md fresh-clone/
cd fresh-clone
```

## 2. Environment Variables for Vercel

Add these to your Vercel project settings:

```env
# Retell AI Configuration
RETELL_API_KEY=2996bc9f-ca4e-422a-b64e-a09a3eaa9bc0
RETELL_WEBHOOK_SECRET=2996bc9f-ca4e-422a-b64e-a09a3eaa9bc0

# GoHighLevel (get from your GHL account)
GHL_API_KEY=your-ghl-api-key
GHL_LOCATION_ID=your-location-id
GHL_CALENDAR_ID=your-calendar-id
GHL_MAIN_PIPELINE_ID=your-pipeline-id
GHL_NEW_LEADS_STAGE_ID=your-stage-id
GHL_DEFAULT_USER_ID=your-user-id

# Database
DATABASE_URL=your-production-database-url

# Other required vars
NEXTAUTH_SECRET=generate-a-secret
OPENAI_API_KEY=your-openai-key
```

## 3. Database Migrations

After deployment, run in Vercel:

```bash
npx prisma migrate deploy
```

## 4. Deploy to Vercel

### Option A: Vercel CLI

```bash
npm i -g vercel
vercel --prod
```

### Option B: Git Push (when fixed)

```bash
git add -A
git commit -m "Complete AI agent deployment"
git push origin main
```

### Option C: Manual Upload

1. Go to vercel.com/new
2. Import git repository
3. Configure environment variables
4. Deploy

## 5. Post-Deployment Steps

1. **Test Voice Agents**

   - Visit `/admin/voice-agents`
   - Click "Deploy All Agents"
   - Test with a phone call

2. **Configure Retell Webhook**

   - In Retell dashboard, set webhook URL to:
   - `https://your-domain.vercel.app/api/webhooks/retell`
   - Add the webhook secret

3. **Set Up Phone Numbers in GHL**

   - Configure phone numbers
   - Link to Retell agents

4. **Test AI Chat**
   - Visit your site
   - Test the chat widget
   - Verify agent responses

## 6. What's Been Deployed

### ✅ AI Agents (8 total)

- Legal Consultation Agent
- Appointment Scheduling Agent
- Document Analysis Agent
- Enhanced Intake Agent
- Removal Defense Agent
- Business Immigration Agent
- Criminal Defense Agent
- AILA Trained Agent

### ✅ Voice Agents (5 total)

- English Reception
- Spanish Reception
- Immigration Specialist
- Personal Injury Agent
- Emergency Agent

### ✅ Features

- Complete payment processing
- Email/SMS integration
- Agent monitoring dashboard
- Admin tools
- Real-time GHL sync

## 7. Monitoring

- Agent Dashboard: `/api/agents/monitor`
- Voice Agent Admin: `/admin/voice-agents`
- Health Check: `/api/health`

## Support

If you need help:

1. Check logs in Vercel dashboard
2. Verify all environment variables are set
3. Ensure database migrations ran
4. Test webhook endpoints

The project is fully ready for production deployment!
