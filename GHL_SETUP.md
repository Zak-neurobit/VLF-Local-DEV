# GoHighLevel Integration Setup Guide

## 🚀 Quick Start

You now have a complete GoHighLevel integration ready to test! Follow these steps to get it working.

## 📋 Prerequisites

1. **GoHighLevel Account** - You need an active GHL account with API access
2. **Environment Variables** - Set up your GHL credentials
3. **Test Environment** - Use the test page to verify everything works

## 🔑 Step 1: Get Your GHL Credentials

### A. Get Your API Key

1. Log in to your GoHighLevel account
2. Go to **Settings** → **API & Webhooks**
3. Copy your **API Key**

### B. Get Your Location ID

1. In GHL, go to **Settings** → **Company**
2. Copy your **Location ID** from the URL or settings

### C. Set Up Environment Variables

Add these to your `.env.local` file:

```bash
# GoHighLevel Configuration
GHL_API_KEY=your-actual-api-key-here
GHL_LOCATION_ID=your-location-id-here
GHL_API_URL=https://rest.gohighlevel.com/v1
```

## 🧪 Step 2: Test the Integration

### Option A: Use the Test Page (Recommended)

1. Start your development server: `npm run dev`
2. Visit: `http://localhost:3000/test-ghl`
3. Update the test form with real data
4. Click **"Test GHL Connection"** first
5. Then try **"Test Direct Contact Creation"**
6. Finally test **"Test Full Contact Form"**

### Option B: Test with Postman/curl

#### Test Connection:

```bash
curl http://localhost:3000/api/ghl/test
```

#### Create Test Contact:

```bash
curl -X POST http://localhost:3000/api/ghl/test \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "test@example.com",
    "phone": "+1234567890",
    "practiceArea": "Immigration",
    "message": "Test message"
  }'
```

#### Test Full Contact Form:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "+1987654321",
    "caseType": "Personal Injury",
    "message": "I need legal help",
    "preferredContact": "email",
    "language": "en"
  }'
```

## ✅ Step 3: Verify in GoHighLevel

After running tests:

1. **Check Contacts**: Go to GHL → Contacts and look for your test contacts
2. **Verify Tags**: Make sure contacts have the right tags (e.g., "Website Lead", "Immigration Lead")
3. **Check Custom Fields**: Verify custom fields are populated correctly
4. **Review Activity**: Check the contact timeline for any activities

## 🔧 Step 4: Advanced Configuration

### A. Set Up Campaigns (Optional)

The integration supports automatic campaign assignment. Set these in your `.env.local`:

```bash
# Campaign IDs (get these from GHL Campaigns)
GHL_NEW_LEAD_CAMPAIGN_ID=your-campaign-id
GHL_IMMIGRATION_LEAD_CAMPAIGN_ID=your-campaign-id
GHL_PERSONAL_INJURY_LEAD_CAMPAIGN_ID=your-campaign-id
# ... add more as needed
```

### B. Set Up Pipelines (Optional)

```bash
# Pipeline Configuration
GHL_PIPELINE_ID=your-main-pipeline-id
GHL_NEW_LEAD_STAGE_ID=your-new-lead-stage-id
```

### C. Enable SMS/Calling (Optional)

```bash
# Communication Settings
GHL_PHONE_ENABLED=true
GHL_SMS_ENABLED=true
GHL_OUTBOUND_PHONE_NUMBER=+18449673536
```

## 📊 What Gets Created in GHL

When a contact form is submitted, the integration:

1. **Creates/Updates Contact** with:

   - Name, email, phone
   - Source: "Website Contact Form"
   - Automatic tags based on practice area
   - Custom fields with all form data

2. **Applies Smart Tags**:

   - "Website Lead" (always)
   - Practice area specific (e.g., "Immigration Lead")
   - "Spanish Speaker" (if language is Spanish)
   - "Urgent Lead" (if message contains urgency keywords)

3. **Sets Custom Fields**:
   - Practice area
   - Initial message
   - Preferred contact method
   - Location
   - Language
   - Lead source
   - Website user ID (for tracking)

## 🚨 Troubleshooting

### Common Issues:

#### 1. "GHL API not configured" Error

- Check that `GHL_API_KEY` and `GHL_LOCATION_ID` are set in `.env.local`
- Restart your development server after adding env vars

#### 2. "Unauthorized" Error (401)

- Verify your API key is correct
- Make sure your GHL account has API access enabled

#### 3. "Location not found" Error (404)

- Double-check your `GHL_LOCATION_ID`
- Ensure you're using the correct location for your account

#### 4. Contacts Not Appearing in GHL

- Check the "All Contacts" view in GHL
- Verify you're looking in the correct location
- Check if there are any filters applied

#### 5. Network/Timeout Errors

- Ensure your internet connection is stable
- GHL API might be temporarily unavailable (try again later)

### Debug Mode:

Set this in your `.env.local` for more detailed logging:

```bash
NODE_ENV=development
```

Check your server console for detailed error messages.

## 📞 API Endpoints Available

- `GET /api/ghl/test` - Test connection
- `POST /api/ghl/test` - Create test contact
- `POST /api/contact` - Full contact form (with GHL integration)
- `POST /api/ghl/send-sms` - Send SMS to contact
- `POST /api/ghl/trigger-call` - Trigger outbound call

## 🎯 Next Steps

1. **Test thoroughly** with the test page
2. **Verify contacts** appear correctly in GHL
3. **Set up campaigns** for automated follow-up
4. **Configure webhooks** for real-time updates
5. **Deploy to production** and update environment variables

## 🔐 Security Notes

- Never commit your actual API keys to git
- Use different API keys for development and production
- Regularly rotate your API keys
- Monitor API usage in GHL dashboard

## 🎉 You're All Set!

Your GoHighLevel integration is now ready. Every contact form submission will automatically create or update contacts in GHL with proper tagging and custom fields.

Need help? Check the server logs for detailed error messages or reach out for support.
