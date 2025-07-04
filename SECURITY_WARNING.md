# ⚠️ SECURITY WARNING: Webhook Secret Configuration

## Current Configuration

You're currently using the same value for both:

- **RETELL_API_KEY**: `2996bc9f-ca4e-422a-b64e-a09a3eaa9bc0`
- **RETELL_WEBHOOK_SECRET**: `2996bc9f-ca4e-422a-b64e-a09a3eaa9bc0`

## Why This Is Not Recommended

1. **Different Purposes**:

   - **API Key**: Used to authenticate YOUR requests TO Retell
   - **Webhook Secret**: Used to verify Retell's requests TO YOU

2. **Security Risks**:

   - If the API key is compromised, attackers can also forge webhooks
   - No separation of concerns
   - Makes key rotation more difficult

3. **Best Practice Violation**:
   - Industry standard is to use different secrets for different purposes
   - Reduces attack surface

## Recommended Action for Production

Before going to production, generate a separate webhook secret:

```bash
# Generate a unique webhook secret
node scripts/generate-webhook-secret.js
```

Then update your environment variables:

```env
RETELL_API_KEY=2996bc9f-ca4e-422a-b64e-a09a3eaa9bc0
RETELL_WEBHOOK_SECRET=<newly-generated-secret>
```

## For Development/Testing Only

If you're just testing or in development, using the same value is acceptable temporarily, but **MUST** be changed before production deployment.

## How to Update Later

1. Generate new secret: `openssl rand -hex 32`
2. Update in `.env.local` and Vercel environment variables
3. Update in Retell dashboard webhook configuration
4. Deploy the changes

---

**Remember**: Security is crucial for a law firm handling sensitive client data!
