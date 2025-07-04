# Retell Webhook Configuration Options

Since you can't change the webhook secret on Retell's side, here are your options:

## Option 1: Skip Webhook Verification (Current Setup)

Set in your environment variables:

```env
RETELL_WEBHOOK_SECRET=skip
```

This will:

- Accept all webhooks from Retell without signature verification
- Log that verification is skipped
- Still process all webhook events normally

**Security Note**: This is less secure but acceptable if:

- Your webhook URL is not publicly known
- You're using HTTPS
- You validate the webhook data structure

## Option 2: Find Retell's Configured Secret

Check if Retell has already set a webhook secret by:

1. Looking in their dashboard for webhook settings
2. Checking their API documentation
3. Contacting their support

If you find it, set:

```env
RETELL_WEBHOOK_SECRET=their-configured-secret
```

## Option 3: IP Whitelisting (Additional Security)

If skipping verification, you can add IP whitelisting:

```typescript
// In src/app/api/webhooks/retell/route.ts
const RETELL_IPS = ['x.x.x.x', 'y.y.y.y']; // Get from Retell docs

const clientIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip');

if (!RETELL_IPS.includes(clientIp)) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
}
```

## Option 4: Use Alternative Verification

Some webhook providers use other methods:

- API key in headers
- Basic authentication
- Custom headers

Check if Retell supports any of these.

## Current Implementation

The webhook handler is now configured to:

1. Check if `RETELL_WEBHOOK_SECRET` is set and not 'skip'
2. If set, verify the signature
3. If set to 'skip' or not set, accept the webhook without verification
4. Log the verification status for monitoring

## Testing Your Webhook

Once deployed, test your webhook:

```bash
# Test if endpoint is accessible
curl https://your-domain.vercel.app/api/webhooks/retell

# Should return:
# {"status":"ok","webhook":"retell","configured":true}
```

Then make a test call through Retell to verify webhooks are being received and processed correctly.
