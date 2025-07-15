# Twilio Removal Guide

This document outlines the changes made to remove Twilio from the project and the recommended replacements.

## Changes Made

### 1. Deleted Files

- `/src/services/twilio/` - Entire Twilio service directory
- `/src/app/api/webhooks/twilio/` - All Twilio webhook routes:
  - `/voice/route.ts`
  - `/sms/route.ts`
  - `/sms-status/route.ts`
  - `/call-status/route.ts`

### 2. Updated Dependencies

- Removed `twilio` package from package.json
- Removed `@types/twilio` package from package.json

### 3. Configuration Updates

- Removed `TWILIO` configuration from `/src/lib/env-config.ts`
- Updated all script files to remove Twilio references
- Updated Prisma schema:
  - Changed `twilioSid` to `externalId` in SmsLog and CallLog models
  - Updated PhoneProvider enum to replace TWILIO with GOHIGHLEVEL
  - Updated Contact source comments

### 4. Script Updates

- `scripts/deploy-all-agents.ts` - Removed Twilio webhook endpoint
- `scripts/setup-apis.js` - Replaced Twilio with Retell for voice
- `scripts/generate-env-vars.js` - Replaced Twilio env vars with Retell/GHL
- `scripts/validate-env.js` - Updated to show GHL handles SMS, Retell handles voice

## Functionality Replacement Guide

### Voice Calls

**Previously**: Handled by Twilio
**Now**: Use **Retell AI**

```typescript
// Voice agent setup now uses Retell
// See /src/services/retell/ for implementation
// Webhook: /api/webhooks/retell
```

### SMS Messaging

**Previously**: Handled by Twilio
**Now**: Use **GoHighLevel (GHL)**

```typescript
// SMS functionality now uses GoHighLevel
// See /src/services/gohighlevel/ for implementation
// Use ghlNotificationService.sendSMS() for sending SMS
```

### Key Functionality Mappings

| Twilio Function                           | Replacement                                        | Notes                                |
| ----------------------------------------- | -------------------------------------------------- | ------------------------------------ |
| `twilioService.sendSMS()`                 | `ghlNotificationService.sendSMS()`                 | Use GoHighLevel for SMS              |
| `twilioService.makeCall()`                | Retell API                                         | Voice calls handled by Retell agents |
| `twilioService.sendAppointmentReminder()` | `ghlNotificationService.sendAppointmentReminder()` | SMS reminders via GHL                |
| `twilioService.sendBulkSMS()`             | `ghlNotificationService.sendBulkSMS()`             | Bulk SMS via GHL                     |
| `twilioService.verifyPhoneNumber()`       | GHL or third-party service                         | Phone verification                   |
| Inbound SMS webhooks                      | GHL webhooks                                       | Configure in GoHighLevel             |
| Inbound call webhooks                     | Retell webhooks                                    | Configure in Retell dashboard        |

## Environment Variables

Remove these Twilio variables:

- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_PHONE_NUMBER`

Add/verify these replacements:

- `RETELL_API_KEY` - For voice calls
- `GHL_API_KEY` - For SMS and CRM
- `GHL_LOCATION_ID` - For SMS and CRM

## Database Migration

Run Prisma migration to update schema:

```bash
npx prisma migrate dev --name remove-twilio-fields
```

This will update:

- `twilioSid` → `externalId` in SmsLog and CallLog tables
- PhoneProvider enum values

## Testing

1. Test SMS sending via GoHighLevel
2. Test voice agents via Retell
3. Verify webhooks are properly configured
4. Check that phone number management works with new providers

## Notes

- All SMS functionality should now go through GoHighLevel
- All voice call functionality should now go through Retell
- The notification service (`/src/services/notifications/`) already uses GHL for SMS
- Phone number management supports multiple providers (Retell, GoHighLevel, Nextiva)
