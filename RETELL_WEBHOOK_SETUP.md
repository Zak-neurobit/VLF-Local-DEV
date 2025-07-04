# Retell Webhook Secret Setup Guide

## Why You Need It

The webhook secret is crucial for verifying that incoming webhook requests are legitimate and coming from Retell AI, not from potential attackers.

## How to Generate and Set Up

### Option 1: Generate a Strong Secret (Recommended)

Run this command to generate a secure random secret:

```bash
openssl rand -hex 32
```

Example output: `a7f3d2b8c9e1f4a6b5c8d7e2f1a4b7c9d2e5f8a1b4c7d0e3f6a9b2c5d8e1f4a7`

### Option 2: Use a Password Generator

Use any secure password generator to create a 32+ character string with letters, numbers, and symbols.

### Option 3: Simple Generation in Node.js

```javascript
const crypto = require('crypto');
console.log(crypto.randomBytes(32).toString('hex'));
```

## Setting Up in Retell Dashboard

1. **Log into Retell AI Dashboard**

   - Go to https://dashboard.retellai.com
   - Use your API key: `2996bc9f-ca4e-422a-b64e-a09a3eaa9bc0`

2. **Navigate to Webhook Settings**

   - Go to Settings → Webhooks
   - Or look for "Webhook Configuration"

3. **Configure Your Webhook**

   - **Webhook URL**: `https://your-domain.com/api/webhooks/retell`
   - **Webhook Secret**: Paste your generated secret
   - **Events to Subscribe**:
     - ✅ call_started
     - ✅ call_ended
     - ✅ call_analyzed
     - ✅ transcript_ready
     - ✅ recording_ready

4. **Save the Configuration**

## Setting Up in Your Application

### 1. Add to Environment Variables

**.env.local** (for development):

```env
RETELL_WEBHOOK_SECRET=your-generated-secret-here
```

**Vercel Dashboard** (for production):

1. Go to your Vercel project settings
2. Navigate to Environment Variables
3. Add:
   - Name: `RETELL_WEBHOOK_SECRET`
   - Value: `your-generated-secret`
   - Environment: Production (and Preview if needed)

### 2. Verify It's Working

The webhook handler already has verification code in place:

```typescript
// In src/app/api/webhooks/retell/route.ts
if (process.env.RETELL_WEBHOOK_SECRET) {
  const service = getRetellService();
  const isValid = service.verifyWebhook(signature, rawBody, process.env.RETELL_WEBHOOK_SECRET);

  if (!isValid) {
    logger.warn('Invalid Retell webhook signature');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }
}
```

## Testing Your Webhook

### 1. Test Endpoint Accessibility

```bash
curl https://your-domain.com/api/webhooks/retell
```

Should return:

```json
{
  "status": "ok",
  "webhook": "retell",
  "configured": true
}
```

### 2. Test with Retell Dashboard

Most webhook providers have a "Test Webhook" button that sends a sample payload.

### 3. Make a Test Call

Once configured, make a test call to one of your Retell numbers and check:

- Webhook logs in your application
- Retell dashboard for delivery status
- Your database for call records

## Security Best Practices

1. **Never commit the secret to git**

   - Add `.env.local` to `.gitignore`
   - Use environment variables only

2. **Rotate regularly**

   - Change the secret every 90 days
   - Update both Retell dashboard and your env vars

3. **Monitor failed attempts**

   - Log invalid signature attempts
   - Set up alerts for multiple failures

4. **Use HTTPS only**
   - Webhooks should only be sent over HTTPS
   - Reject any HTTP requests

## Troubleshooting

### Webhook Not Receiving Events

1. Check webhook URL is publicly accessible
2. Verify secret matches in both places
3. Check Retell dashboard for webhook errors
4. Look at your application logs

### Signature Verification Failing

1. Ensure secret is exactly the same (no extra spaces)
2. Check you're using the raw request body
3. Verify the signature header name is correct
4. Make sure the secret is loaded from env vars

### Missing Events

1. Verify you've subscribed to the events in Retell
2. Check your webhook endpoint returns 200 OK
3. Look for any timeout issues (respond quickly)

## Example Secret (DO NOT USE IN PRODUCTION)

```
Development only: dev_secret_a7f3d2b8c9e1f4a6b5c8d7e2f1a4b7c9
Production: [Generate your own unique secret]
```
