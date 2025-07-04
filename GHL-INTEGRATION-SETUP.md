# 🚀 GoHighLevel (GHL) Integration Setup Guide

## Overview

Your website is already built to integrate with GoHighLevel for:

- ✅ Automatic lead capture from all forms
- ✅ SMS automation and campaigns
- ✅ Funnel/pipeline management
- ✅ Appointment reminders
- ✅ Lead scoring and prioritization

## Step 1: Get Your GHL API Credentials

1. **Login to GoHighLevel**: https://app.gohighlevel.com
2. **Go to**: Settings → Business Profile → API Keys
3. **Create New API Key**:
   - Name: "Vasquez Law Website"
   - Permissions: Full Access
   - Copy the API key (you won't see it again!)
4. **Get Location ID**:
   - Settings → Business Profile
   - Copy your Location ID

## Step 2: Add GHL Credentials to Vercel

Go to: https://vercel.com/hodos-360/vasquez-law-website/settings/environment-variables

Add these variables:

```
GHL_API_KEY
[Your API key from step 1]
✓ Production ✓ Preview ✓ Development

GHL_LOCATION_ID
[Your Location ID from step 1]
✓ Production ✓ Preview ✓ Development

GHL_API_URL
https://rest.gohighlevel.com/v1
✓ Production ✓ Preview ✓ Development
```

## Step 3: Set Up GHL Campaigns

Create these campaigns in GHL for automatic nurturing:

### Required Campaigns:

1. **Generic Welcome Campaign** (for all new leads)

   ```
   Name: Website Lead Welcome
   Trigger: Tag "website-lead"
   Actions:
   - Immediate SMS: "Thanks for contacting Vasquez Law..."
   - Email after 5 min
   - Follow-up SMS after 1 day
   ```

2. **Practice Area Campaigns** (create for each):

   - Immigration Nurture (English)
   - Immigration Nurture (Spanish)
   - Personal Injury Nurture (English)
   - Personal Injury Nurture (Spanish)
   - Criminal Defense Nurture (English)
   - Criminal Defense Nurture (Spanish)
   - Family Law Nurture (English)
   - Family Law Nurture (Spanish)
   - Workers Comp Nurture (English)
   - Workers Comp Nurture (Spanish)

3. **Urgent Lead Campaign**

   ```
   Name: Urgent Lead Response
   Trigger: Tag "urgency-immediate"
   Actions:
   - Immediate SMS to lead
   - SMS notification to attorney
   - Create high-priority task
   ```

4. **Appointment Reminder Campaign**
   ```
   Name: Appointment Reminders
   Trigger: Custom field "appointmentDate"
   Actions:
   - 24hr before: SMS reminder
   - 2hr before: Final SMS reminder
   ```

## Step 4: Add Campaign IDs to Vercel

After creating campaigns, add their IDs:

```
GHL_GENERIC_NURTURE_CAMPAIGN_ID
[Campaign ID]

GHL_IMMIGRATION_NURTURE_EN
[Campaign ID]

GHL_IMMIGRATION_NURTURE_ES
[Campaign ID]

GHL_PERSONAL_INJURY_NURTURE_EN
[Campaign ID]

GHL_PERSONAL_INJURY_NURTURE_ES
[Campaign ID]

GHL_APPOINTMENT_REMINDER_CAMPAIGN_ID
[Campaign ID]

GHL_PHONE_LEAD_CAMPAIGN_ID
[Campaign ID]

GHL_AUTO_RESPONSE_CAMPAIGN_ID
[Campaign ID]
```

## Step 5: Set Up Lead Pipeline

1. **Create Pipeline**: "Website Leads"
2. **Add Stages**:

   - New Lead (auto-assigned)
   - Contacted
   - Qualified
   - Appointment Scheduled
   - Retained
   - Lost

3. **Add to Vercel**:

   ```
   GHL_LEAD_PIPELINE_ID
   [Pipeline ID]

   GHL_NEW_LEAD_STAGE_ID
   [New Lead stage ID]
   ```

## Step 6: Configure Webhooks

1. **In GHL**: Settings → Webhooks
2. **Add Webhook**:
   ```
   URL: https://vasquez-law-website-mv8nbz1eo-hodos-360.vercel.app/api/webhooks/ghl
   Events:
   - Contact Created
   - Contact Updated
   - Inbound Message
   - Campaign Completed
   ```

## Step 7: Set Up SMS Keywords

Configure auto-responses for these keywords:

- **STOP**: Opt-out confirmation
- **START**: Opt-in confirmation
- **CONFIRM**: Appointment confirmation
- **HELP**: Send help menu

## Step 8: Test the Integration

### Test Form Submission:

1. Go to: https://vasquez-law-website-mv8nbz1eo-hodos-360.vercel.app/contact
2. Submit a test lead
3. Check GHL for:
   - New contact created
   - Tags applied correctly
   - Campaign triggered
   - Opportunity created

### Test SMS:

1. Find test contact in GHL
2. Send manual SMS
3. Reply with keyword
4. Verify auto-response

## What Happens When a Lead Submits:

1. **Form Submitted** → Lead captured in database
2. **Contact Created** in GHL with tags:

   - `website-lead`
   - `practice-area-[type]`
   - `language-[en/es]`
   - `urgency-[level]`
   - `source-website-form`

3. **Campaign Triggered** based on:

   - Practice area
   - Language preference
   - Urgency level

4. **Opportunity Created** in pipeline

5. **If Urgent**:
   - SMS sent to attorneys
   - Email notification sent
   - High-priority task created

## Lead Flow Examples:

### Immigration Lead (Spanish, Urgent):

```
Form → GHL Contact → Tags: [website-lead, practice-area-immigration, language-es, urgency-immediate]
→ Triggers: Immigration Spanish Campaign + Urgent Response
→ SMS to lead (Spanish) + SMS to attorney + Create opportunity
```

### Personal Injury Lead (English):

```
Form → GHL Contact → Tags: [website-lead, practice-area-personalInjury, language-en]
→ Triggers: Personal Injury English Campaign
→ Nurture sequence starts + Create opportunity
```

## Monitoring & Analytics:

### In GHL Dashboard:

- Contacts: See all website leads
- Conversations: Track SMS/email threads
- Opportunities: Monitor pipeline
- Campaigns: View automation performance

### Website Analytics API:

```
GET /api/leads/capture?startDate=2024-01-01&endDate=2024-12-31
Authorization: Bearer [your-token]
```

## Troubleshooting:

### "Lead not appearing in GHL"

- Check API key is correct
- Verify Location ID matches
- Look for errors in Vercel logs

### "Campaign not triggering"

- Verify campaign ID in env vars
- Check campaign is active in GHL
- Ensure tags match trigger conditions

### "SMS not sending"

- Check GHL phone number is configured
- Verify SMS credits available
- Test number not on DNC list

## Best Practices:

1. **Response Time**: Set campaigns to respond within 5 minutes
2. **Language Match**: Always use same language as lead
3. **Follow-up**: 3-touch minimum (immediate, 1hr, 1 day)
4. **Tracking**: Use UTM parameters for source tracking
5. **Testing**: Test each form monthly

## Cost Optimization:

- SMS: $0.015 per segment (160 chars)
- Email: Included in GHL plan
- Phone: Use Twilio for better rates
- Campaigns: Batch similar leads

---

**Support**:

- GHL Support: support@gohighlevel.com
- API Docs: https://highlevel.stoplight.io/docs/integrations/

**Next Step**: Add GHL API credentials to Vercel and redeploy!
