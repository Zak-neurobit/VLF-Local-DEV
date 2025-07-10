# GoHighLevel - Retell AI Integration

This document outlines the complete integration between GoHighLevel (GHL) and Retell AI for voice calls and SMS coordination.

## Environment Variables

### Core GoHighLevel Configuration

```bash
# API Access
GHL_API_KEY=your-ghl-api-key
GHL_LOCATION_ID=your-location-id
GHL_API_URL=https://rest.gohighlevel.com/v1
GHL_WEBHOOK_SECRET=your-webhook-secret

# Pipeline Configuration
GHL_PIPELINE_ID=your-main-pipeline-id
GHL_NEW_LEADS_STAGE_ID=your-stage-id
GHL_CALENDAR_ID=your-calendar-id

# User Assignment
GHL_SENIOR_USER_ID=senior-attorney-user-id
GHL_DEFAULT_USER_ID=default-user-id

# Phone Numbers
GHL_OUTBOUND_PHONE_NUMBER=+18449673536
GHL_SMS_PHONE_NUMBER=+18449673536
```

### Campaign IDs for Lead Management

```bash
# Base Campaigns
GHL_HOT_LEAD_CAMPAIGN_ID=campaign-id-for-hot-leads
GHL_WARM_LEAD_CAMPAIGN_ID=campaign-id-for-warm-leads
GHL_NEW_LEAD_CAMPAIGN_ID=campaign-id-for-new-leads
GHL_EMERGENCY_LEAD_CAMPAIGN_ID=campaign-id-for-emergency-leads

# Appointment Management
GHL_APPOINTMENT_REMINDER_CAMPAIGN_ID=campaign-id-for-appointment-reminders
GHL_APPOINTMENT_REQUEST_CAMPAIGN_ID=campaign-id-for-appointment-requests
GHL_APPOINTMENT_SCHEDULED_CAMPAIGN_ID=campaign-id-when-appointment-scheduled

# Communication Campaigns
GHL_AUTO_RESPONSE_CAMPAIGN_ID=campaign-id-for-auto-responses
GHL_CHAT_INQUIRY_CAMPAIGN_ID=campaign-id-for-chat-inquiries
GHL_CHAT_LEAD_CAMPAIGN_ID=campaign-id-for-chat-leads
GHL_CHAT_FOLLOWUP_CAMPAIGN_ID=campaign-id-for-chat-followups
```

### Voice Call Follow-up Campaigns

```bash
# Post-Call Actions
GHL_VOICEMAIL_FOLLOWUP_CAMPAIGN_ID=campaign-id-for-voicemail-followup
GHL_POST_CALL_SMS_CAMPAIGN_ID=campaign-id-for-post-call-sms
GHL_NO_ANSWER_FOLLOWUP_CAMPAIGN_ID=campaign-id-for-no-answer-followup
```

### Practice Area Specific Campaigns

```bash
# Immigration
GHL_IMMIGRATION_CHAT_CAMPAIGN_ID=campaign-id-for-immigration-chat
GHL_IMMIGRATION_LEAD_CAMPAIGN_ID=campaign-id-for-immigration-leads

# Personal Injury
GHL_PERSONAL_INJURY_CHAT_CAMPAIGN_ID=campaign-id-for-personal-injury-chat
GHL_PERSONAL_INJURY_LEAD_CAMPAIGN_ID=campaign-id-for-personal-injury-leads

# Criminal Defense
GHL_CRIMINAL_DEFENSE_CHAT_CAMPAIGN_ID=campaign-id-for-criminal-defense-chat
GHL_CRIMINAL_DEFENSE_LEAD_CAMPAIGN_ID=campaign-id-for-criminal-defense-leads

# Family Law
GHL_FAMILY_LAW_CHAT_CAMPAIGN_ID=campaign-id-for-family-law-chat
GHL_FAMILY_LAW_LEAD_CAMPAIGN_ID=campaign-id-for-family-law-leads

# Workers' Compensation
GHL_WORKERS_COMP_CHAT_CAMPAIGN_ID=campaign-id-for-workers-comp-chat
GHL_WORKERS_COMP_LEAD_CAMPAIGN_ID=campaign-id-for-workers-comp-leads
```

### Retell AI Configuration

```bash
RETELL_API_KEY=2996bc9f-ca4e-422a-b64e-a09a3eaa9bc0
RETELL_WEBHOOK_SECRET=2996bc9f-ca4e-422a-b64e-a09a3eaa9bc0
```

## API Endpoints

### 1. Trigger Voice Call

**Endpoint:** `POST /api/ghl/trigger-call`

Receives webhooks from GHL campaigns to trigger Retell voice calls.

#### Request Body

```json
{
  "contactId": "ghl-contact-id",
  "contact": {
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1234567890",
    "email": "john@example.com",
    "tags": ["immigration", "consultation"],
    "customFields": {
      "practiceArea": "immigration",
      "urgency": "high"
    }
  },
  "campaignId": "ghl-campaign-id",
  "practiceArea": "immigration",
  "preferredLanguage": "en",
  "callType": "consultation",
  "metadata": {
    "source": "website-form",
    "utm_source": "google"
  }
}
```

#### Response

```json
{
  "success": true,
  "callId": "retell-call-id",
  "agentId": "retell-agent-id",
  "message": "Call initiated successfully"
}
```

### 2. Send SMS

**Endpoint:** `POST /api/ghl/send-sms`

Coordinates SMS sending through GHL with various trigger types.

#### Request Body

```json
{
  "contactId": "ghl-contact-id",
  "message": "Custom message text",
  "templateId": "optional-template-id",
  "triggerType": "post-call",
  "callId": "retell-call-id",
  "metadata": {
    "appointmentDate": "2024-01-15",
    "attorneyName": "William Vasquez"
  }
}
```

#### Response

```json
{
  "success": true,
  "messageId": "ghl-message-id",
  "message": "SMS sent successfully"
}
```

## Integration Flow

### 1. Voice Call Initiation

1. **Trigger:** GHL campaign triggers webhook to `/api/ghl/trigger-call`
2. **Agent Selection:** System selects appropriate Retell agent based on:
   - Practice area
   - Language preference
   - Call type
3. **Call Creation:** Retell call is initiated with metadata
4. **Database Logging:** Call record created in `VoiceCall` table
5. **GHL Update:** Contact updated with call information

### 2. Call Completion & Follow-up

1. **Call Ends:** Retell webhook notifies of call completion
2. **Analysis:** Call transcript and outcome processed
3. **GHL Update:** Contact updated with:
   - Call duration
   - Outcome (connected/voicemail/no answer)
   - Sentiment analysis
   - Summary
4. **Follow-up Actions:**
   - Post-call SMS if connected
   - Voicemail follow-up campaign if voicemail
   - Task creation for attorney review
   - Appointment scheduling if requested

### 3. SMS Coordination

1. **Trigger Types:**

   - `post-call`: Sent after successful call connection
   - `appointment-reminder`: Sent before scheduled appointments
   - `follow-up`: Ongoing nurture sequences
   - `custom`: Manual or campaign-triggered messages

2. **Template Variables:**

   - `{{firstName}}`, `{{lastName}}`
   - `{{practiceArea}}`
   - `{{attorneyName}}`
   - `{{appointmentDate}}`, `{{appointmentTime}}`

3. **Language Support:**
   - English and Spanish templates
   - Automatic language detection from contact preferences

## Database Schema

### VoiceCall Model

```prisma
model VoiceCall {
  id              String    @id @default(cuid())
  retellCallId    String    @unique
  ghlContactId    String?
  ghlCampaignId   String?
  phoneNumber     String
  agentId         String
  direction       CallDirection
  status          VoiceCallStatus
  practiceArea    String?
  language        String    @default("en")
  duration        Int?      // in seconds
  recordingUrl    String?
  transcript      String?   @db.Text
  summary         String?   @db.Text
  sentiment       String?   // positive, neutral, negative
  outcome         String?   // connected, voicemail, no_answer, busy, failed
  appointmentScheduled Boolean @default(false)
  metadata        Json      @default("{}")
  startedAt       DateTime  @default(now())
  endedAt         DateTime?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}
```

### SmsLog Model

```prisma
model SmsLog {
  id              String    @id @default(cuid())
  ghlContactId    String?
  ghlMessageId    String?   @unique
  contactId       String?
  to              String
  from            String
  body            String    @db.Text
  status          SmsStatus
  direction       SmsDirection
  triggerType     String?   // post-call, appointment-reminder, follow-up, custom
  relatedCallId   String?   // Link to VoiceCall if SMS was triggered by call
  templateId      String?
  errorMessage    String?
  sentAt          DateTime?
  deliveredAt     DateTime?
  metadata        Json      @default("{}")
  createdAt       DateTime  @default(now())
}
```

## GoHighLevel Service Methods

### Voice Call Integration

```typescript
// Trigger voice call
await ghlService.triggerVoiceCall({
  contactId: 'ghl-contact-id',
  practiceArea: 'immigration',
  callType: 'consultation',
  preferredLanguage: 'en',
});

// Update contact with call outcome
await ghlService.updateContactCallOutcome(contactId, {
  callId: 'retell-call-id',
  duration: 300,
  outcome: 'connected',
  summary: 'Client interested in family reunification case',
  sentiment: 'positive',
  appointmentScheduled: true,
});

// Send post-call SMS
await ghlService.sendPostCallSMS({
  contactId: 'ghl-contact-id',
  callId: 'retell-call-id',
  message: 'Custom thank you message',
});
```

### Campaign Management

```typescript
// Create voice call campaign for multiple contacts
await ghlService.createVoiceCallCampaign(['contact1', 'contact2'], {
  practiceArea: 'immigration',
  callType: 'follow-up',
  campaignName: 'Monthly Immigration Check-in',
});

// Get call analytics for contact
const analytics = await ghlService.getContactCallAnalytics('contact-id');
```

## Webhook Configuration

### GoHighLevel Webhooks

Configure these webhooks in your GHL account:

1. **Contact Created/Updated:** `https://yourdomain.com/api/webhooks/ghl`
2. **Campaign Triggers:** Point to `/api/ghl/trigger-call`
3. **SMS Responses:** Handled by existing GHL webhook

### Retell AI Webhooks

Configure Retell webhook URL: `https://yourdomain.com/api/webhooks/retell`

Events handled:

- `call_started`
- `call_ended`
- `call_analyzed`
- `transcript_ready`

## Error Handling

### Call Failures

- Failed calls are logged with error details
- Automatic retry logic for temporary failures
- Fallback to alternative contact methods
- Staff notifications for critical failures

### SMS Failures

- Delivery status tracking
- Opt-out compliance
- Error logging and alerting
- Fallback to email notifications

## Monitoring & Analytics

### Call Metrics

- Total calls initiated
- Connection rates by practice area
- Average call duration
- Sentiment analysis trends
- Appointment conversion rates

### SMS Metrics

- Delivery rates
- Response rates
- Opt-out tracking
- Template performance

### Integration Health

- API uptime monitoring
- Webhook delivery monitoring
- Error rate tracking
- Response time metrics

## Testing

### Development Environment

1. Set `MOCK_GHL=true` for API simulation
2. Use test phone numbers for call testing
3. SMS testing with demo campaigns

### Production Deployment

1. Configure all environment variables
2. Set up webhook endpoints
3. Test with small contact subset
4. Monitor logs and metrics
5. Scale up gradually

## Security Considerations

- API key rotation
- Webhook signature verification
- PII data protection
- Call recording compliance
- Attorney-client privilege protection
