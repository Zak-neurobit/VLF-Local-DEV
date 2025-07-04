import { z } from 'zod';
import { getPrismaClient } from '@/lib/prisma';
import { logger } from '@/lib/logger';

// Type imports only - won't cause runtime issues
import type { Twilio } from 'twilio';
import type { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message';
import type { CallInstance } from 'twilio/lib/rest/api/v2010/account/call';

// Schemas for validation
const SendSMSSchema = z.object({
  to: z.string().regex(/^\+?[1-9]\d{1,14}$/), // E.164 format
  body: z.string().min(1).max(1600),
  from: z.string().optional(),
  mediaUrl: z.array(z.string().url()).optional(),
  statusCallback: z.string().url().optional(),
});

const MakeCallSchema = z.object({
  to: z.string().regex(/^\+?[1-9]\d{1,14}$/),
  from: z.string().optional(),
  url: z.string().url(),
  method: z.enum(['GET', 'POST']).default('POST'),
  statusCallback: z.string().url().optional(),
  record: z.boolean().default(false),
  transcribe: z.boolean().default(false),
});

export class TwilioService {
  private client: Twilio | null = null;
  private defaultPhoneNumber: string;
  private webhookBaseUrl: string;
  private isConfigured: boolean = false;
  private twilioModule: any = null;

  constructor() {
    this.defaultPhoneNumber = process.env.TWILIO_PHONE_NUMBER || '';
    this.webhookBaseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Defer initialization
    this.initialize();
  }

  private async initialize() {
    try {
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;

      // Check if credentials are valid (not empty, not placeholder)
      const hasValidCredentials = !!(
        accountSid &&
        authToken &&
        accountSid !== '' &&
        authToken !== '' &&
        accountSid !== 'placeholder' &&
        authToken !== 'placeholder' &&
        accountSid.startsWith('AC') &&
        authToken.length > 10
      );

      if (!hasValidCredentials) {
        logger.warn('Twilio credentials not configured - service will operate in mock mode');
        return;
      }

      // Dynamically import Twilio only when needed
      this.twilioModule = await import('twilio');
      this.client = this.twilioModule.default(accountSid, authToken);
      this.isConfigured = true;
      logger.info('Twilio service initialized');
    } catch (error) {
      logger.warn('Failed to initialize Twilio:', error);
      this.client = null;
      this.isConfigured = false;
    }
  }

  // Ensure service is initialized before use
  private async ensureInitialized() {
    if (!this.isConfigured && !this.client) {
      await this.initialize();
    }
  }

  // Send SMS
  async sendSMS(options: z.infer<typeof SendSMSSchema>): Promise<MessageInstance | any> {
    try {
      await this.ensureInitialized();
      const validated = SendSMSSchema.parse(options);

      if (!this.client) {
        logger.warn('Twilio not configured - mocking SMS send', { to: validated.to });
        return {
          sid: 'mock-' + Date.now(),
          body: validated.body,
          to: validated.to,
          from: validated.from || this.defaultPhoneNumber,
          status: 'sent',
        };
      }

      const message = await this.client.messages.create({
        to: validated.to,
        from: validated.from || this.defaultPhoneNumber,
        body: validated.body,
        mediaUrl: validated.mediaUrl,
        statusCallback: validated.statusCallback,
      });

      // Log SMS in database
      await this.logSMS({
        sid: message.sid,
        to: message.to,
        from: message.from,
        body: message.body,
        status: message.status,
        direction: 'outbound',
      });

      logger.info('SMS sent successfully', {
        sid: message.sid,
        to: message.to,
      });

      return message;
    } catch (error) {
      logger.error('Failed to send SMS:', error);
      throw error;
    }
  }

  // Send bulk SMS
  async sendBulkSMS(recipients: string[], body: string): Promise<(MessageInstance | any)[]> {
    await this.ensureInitialized();

    if (!this.client) {
      logger.warn('Twilio not configured - mocking bulk SMS', { count: recipients.length });
      return recipients.map((to, i) => ({
        sid: 'mock-bulk-' + Date.now() + '-' + i,
        body,
        to,
        from: this.defaultPhoneNumber,
        status: 'sent',
      }));
    }

    const results: MessageInstance[] = [];
    const errors: Array<{ recipient: string; error: any }> = [];

    // Process in batches to avoid rate limiting
    const batchSize = 10;
    for (let i = 0; i < recipients.length; i += batchSize) {
      const batch = recipients.slice(i, i + batchSize);

      const promises = batch.map(async to => {
        try {
          const message = await this.sendSMS({ to, body });
          results.push(message);
        } catch (error) {
          errors.push({ recipient: to, error });
        }
      });

      await Promise.all(promises);

      // Rate limit: wait 1 second between batches
      if (i + batchSize < recipients.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    if (errors.length > 0) {
      logger.warn('Some SMS messages failed to send', { errors });
    }

    return results;
  }

  // Make outbound call
  async makeCall(options: z.infer<typeof MakeCallSchema>): Promise<CallInstance | any> {
    try {
      await this.ensureInitialized();
      const validated = MakeCallSchema.parse(options);

      if (!this.client) {
        logger.warn('Twilio not configured - mocking call', { to: validated.to });
        return {
          sid: 'mock-call-' + Date.now(),
          to: validated.to,
          from: validated.from || this.defaultPhoneNumber,
          status: 'completed',
        };
      }

      const call = await this.client.calls.create({
        to: validated.to,
        from: validated.from || this.defaultPhoneNumber,
        url: validated.url,
        method: validated.method,
        statusCallback:
          validated.statusCallback || `${this.webhookBaseUrl}/api/webhooks/twilio/call-status`,
        record: validated.record,
        // Note: transcribe option is not directly supported in call create
        // Transcription is handled via recording callback
      });

      // Log call in database
      await this.logCall({
        sid: call.sid,
        to: call.to,
        from: call.from,
        status: call.status,
        direction: 'outbound', // We're making an outbound call
        duration: undefined, // Duration not available yet for initiated calls
        recordingUrl: undefined, // Will be updated via webhook
      });

      logger.info('Call initiated successfully', {
        sid: call.sid,
        to: call.to,
      });

      return call;
    } catch (error) {
      logger.error('Failed to make call:', error);
      throw error;
    }
  }

  // Send appointment reminder
  async sendAppointmentReminder(appointment: {
    id: string;
    clientPhone: string;
    clientName: string;
    date: Date;
    time: string;
    attorneyName: string;
    type: string;
    location?: string;
  }): Promise<MessageInstance> {
    const message = this.formatAppointmentReminder(appointment);

    const sms = await this.sendSMS({
      to: appointment.clientPhone,
      body: message,
      statusCallback: `${this.webhookBaseUrl}/api/webhooks/twilio/sms-status`,
    });

    // Update appointment record with reminder info in metadata
    await getPrismaClient().appointment.update({
      where: { id: appointment.id },
      data: {
        metadata: {
          reminderSent: true,
          reminderSentAt: new Date().toISOString(),
          twilioMessageSid: sms.sid,
        },
      },
    });

    return sms;
  }

  // Send case update
  async sendCaseUpdate(caseInfo: {
    clientPhone: string;
    clientName: string;
    caseNumber: string;
    updateType: string;
    message: string;
  }): Promise<MessageInstance> {
    const body = `Hello ${caseInfo.clientName},

Case Update (${caseInfo.caseNumber}):
${caseInfo.updateType}

${caseInfo.message}

Questions? Call 1-844-YO-PELEO or reply STOP to unsubscribe.

- Vasquez Law Firm`;

    return this.sendSMS({
      to: caseInfo.clientPhone,
      body,
    });
  }

  // Handle incoming SMS
  async handleIncomingSMS(data: {
    From: string;
    To: string;
    Body: string;
    MessageSid: string;
    NumMedia?: string;
    MediaUrl0?: string;
  }): Promise<string> {
    try {
      // Log incoming message
      await this.logSMS({
        sid: data.MessageSid,
        to: data.To,
        from: data.From,
        body: data.Body,
        status: 'received',
        direction: 'inbound',
        mediaUrl: data.MediaUrl0,
      });

      // Process keywords
      const response = await this.processIncomingSMS(data.From, data.Body);

      return response;
    } catch (error) {
      logger.error('Failed to handle incoming SMS:', error);
      return 'Sorry, we encountered an error processing your message. Please call us at 1-844-YO-PELEO.';
    }
  }

  // Handle incoming call
  async handleIncomingCall(data: {
    From: string;
    To: string;
    CallSid: string;
    Direction: string;
    CallerName?: string;
  }): Promise<string> {
    try {
      // Log incoming call
      await this.logCall({
        sid: data.CallSid,
        to: data.To,
        from: data.From,
        status: 'active',
        direction: 'inbound',
      });

      // Return TwiML response for handling the call
      // This is a basic response - you can customize based on business hours, IVR menu, etc.
      const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice" language="en-US">
    Thank you for calling Vasquez Law Firm. 
    For English, press 1.
    Para español, oprima 2.
  </Say>
  <Gather numDigits="1" action="${this.webhookBaseUrl}/api/webhooks/twilio/ivr" method="POST">
    <Say voice="alice" language="en-US">
      Please make your selection now.
    </Say>
  </Gather>
  <Say voice="alice" language="en-US">
    We didn't receive your selection. Please call back or visit vasquezlawnc.com.
  </Say>
</Response>`;

      return twiml;
    } catch (error) {
      logger.error('Failed to handle incoming call:', error);

      // Return error TwiML
      return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice" language="en-US">
    We're sorry, we're experiencing technical difficulties. 
    Please call back later or visit vasquezlawnc.com.
  </Say>
</Response>`;
    }
  }

  // Process incoming SMS based on keywords
  private async processIncomingSMS(from: string, body: string): Promise<string> {
    const normalizedBody = body.trim().toUpperCase();

    // Handle opt-out
    if (['STOP', 'UNSUBSCRIBE', 'CANCEL'].includes(normalizedBody)) {
      await this.handleOptOut(from);
      return 'You have been unsubscribed from Vasquez Law Firm SMS updates. Reply START to resubscribe.';
    }

    // Handle opt-in
    if (['START', 'SUBSCRIBE', 'YES'].includes(normalizedBody)) {
      await this.handleOptIn(from);
      return 'Welcome back! You are now subscribed to Vasquez Law Firm SMS updates. Reply STOP to unsubscribe.';
    }

    // Handle appointment scheduling
    if (normalizedBody.includes('APPOINTMENT') || normalizedBody.includes('SCHEDULE')) {
      return 'To schedule an appointment, please call 1-844-YO-PELEO or visit www.vasquezlawnc.com/appointment';
    }

    // Handle case status inquiry
    if (normalizedBody.includes('STATUS') || normalizedBody.includes('CASE')) {
      return 'For case status updates, please log in to your client portal at www.vasquezlawnc.com/portal or call your attorney.';
    }

    // Handle emergency
    if (normalizedBody.includes('EMERGENCY') || normalizedBody.includes('URGENT')) {
      return 'For emergencies, please call 911. For urgent legal matters, call our emergency line at 1-844-YO-PELEO.';
    }

    // Default response
    return `Thank you for contacting Vasquez Law Firm. 

For immediate assistance:
- Call: 1-844-YO-PELEO
- Visit: www.vasquezlawnc.com
- Reply APPOINTMENT to schedule

Office hours: Mon-Fri 9AM-5PM ET`;
  }

  // Handle opt-out
  private async handleOptOut(phoneNumber: string) {
    try {
      // Normalize phone number to E.164 format if not already
      const normalizedPhone = phoneNumber.startsWith('+')
        ? phoneNumber
        : `+1${phoneNumber.replace(/\D/g, '')}`;

      const contact = await getPrismaClient().contact.upsert({
        where: { phone: normalizedPhone },
        update: {
          smsOptOut: true,
          smsOptOutDate: new Date(),
          smsOptIn: false,
          updatedAt: new Date(),
        },
        create: {
          phone: normalizedPhone,
          smsOptOut: true,
          smsOptOutDate: new Date(),
          smsOptIn: false,
          source: 'twilio',
        },
      });

      logger.info('Contact opted out of SMS', {
        phoneNumber: normalizedPhone,
        contactId: contact.id,
      });
    } catch (error) {
      logger.error('Failed to process opt-out:', error);
    }
  }

  // Handle opt-in
  private async handleOptIn(phoneNumber: string) {
    try {
      // Normalize phone number to E.164 format if not already
      const normalizedPhone = phoneNumber.startsWith('+')
        ? phoneNumber
        : `+1${phoneNumber.replace(/\D/g, '')}`;

      const contact = await getPrismaClient().contact.upsert({
        where: { phone: normalizedPhone },
        update: {
          smsOptIn: true,
          smsOptInDate: new Date(),
          smsOptOut: false,
          smsOptOutDate: null,
          updatedAt: new Date(),
        },
        create: {
          phone: normalizedPhone,
          smsOptIn: true,
          smsOptInDate: new Date(),
          smsOptOut: false,
          source: 'twilio',
        },
      });

      logger.info('Contact opted in to SMS', {
        phoneNumber: normalizedPhone,
        contactId: contact.id,
      });
    } catch (error) {
      logger.error('Failed to process opt-in:', error);
    }
  }

  // Log SMS in database
  private async logSMS(data: {
    sid: string;
    to: string;
    from: string;
    body: string;
    status: string;
    direction: 'inbound' | 'outbound';
    mediaUrl?: string;
  }) {
    try {
      const prisma = getPrismaClient();

      // Normalize phone numbers to E.164 format
      const normalizePhone = (phone: string) =>
        phone.startsWith('+') ? phone : `+1${phone.replace(/\D/g, '')}`;

      const normalizedTo = normalizePhone(data.to);
      const normalizedFrom = normalizePhone(data.from);

      // Determine which number is the contact's based on direction
      const contactPhone = data.direction === 'inbound' ? normalizedFrom : normalizedTo;

      // Try to find contact by phone number
      let contact = await prisma.contact.findUnique({
        where: { phone: contactPhone },
      });

      // Auto-create contact for inbound messages if not exists
      if (!contact && data.direction === 'inbound') {
        contact = await prisma.contact.create({
          data: {
            phone: contactPhone,
            source: 'twilio',
            smsOptIn: true, // Inbound message implies opt-in
            smsOptInDate: new Date(),
          },
        });
      }

      // Map status to SmsStatus enum
      let smsStatus:
        | 'queued'
        | 'sending'
        | 'sent'
        | 'failed'
        | 'delivered'
        | 'undelivered'
        | 'receiving'
        | 'received';

      if (data.direction === 'inbound') {
        smsStatus = data.status === 'received' ? 'received' : 'receiving';
      } else {
        switch (data.status) {
          case 'queued':
            smsStatus = 'queued';
            break;
          case 'sending':
            smsStatus = 'sending';
            break;
          case 'sent':
            smsStatus = 'sent';
            break;
          case 'delivered':
            smsStatus = 'delivered';
            break;
          case 'undelivered':
            smsStatus = 'undelivered';
            break;
          case 'failed':
            smsStatus = 'failed';
            break;
          default:
            smsStatus = 'sent';
        }
      }

      await prisma.smsLog.create({
        data: {
          twilioSid: data.sid,
          contactId: contact?.id,
          fromNumber: normalizedFrom,
          toNumber: normalizedTo,
          message: data.body.substring(0, 1000), // Truncate for storage
          status: smsStatus,
          direction: data.direction,
          metadata: data.mediaUrl ? { mediaUrl: data.mediaUrl } : {},
        },
      });

      logger.info('SMS logged successfully', {
        sid: data.sid,
        direction: data.direction,
        status: smsStatus,
        contactId: contact?.id,
      });
    } catch (error) {
      logger.error('Failed to log SMS:', error);
    }
  }

  // Log call in database
  private async logCall(data: {
    sid: string;
    to: string;
    from: string;
    status: string;
    direction: string;
    duration?: number;
    recordingUrl?: string;
  }) {
    try {
      const prisma = getPrismaClient();

      // Normalize phone numbers to E.164 format
      const normalizePhone = (phone: string) =>
        phone.startsWith('+') ? phone : `+1${phone.replace(/\D/g, '')}`;

      const normalizedTo = normalizePhone(data.to);
      const normalizedFrom = normalizePhone(data.from);

      // Determine which number is the contact's based on direction
      const contactPhone = data.direction === 'inbound' ? normalizedFrom : normalizedTo;

      // Try to find contact by phone number
      let contact = await prisma.contact.findUnique({
        where: { phone: contactPhone },
      });

      // Auto-create contact for inbound calls if not exists
      if (!contact && data.direction === 'inbound') {
        contact = await prisma.contact.create({
          data: {
            phone: contactPhone,
            source: 'twilio',
          },
        });
      }

      // Map status to CallStatus enum
      let callStatus: 'active' | 'completed' | 'failed' | 'missed';
      switch (data.status) {
        case 'active':
        case 'in-progress':
        case 'ringing':
        case 'queued':
          callStatus = 'active';
          break;
        case 'completed':
          callStatus = 'completed';
          break;
        case 'failed':
        case 'busy':
        case 'no-answer':
          callStatus = 'failed';
          break;
        case 'missed':
          callStatus = 'missed';
          break;
        default:
          callStatus = 'completed';
      }

      // Map direction to CallDirection enum
      const callDirection: 'inbound' | 'outbound' =
        data.direction === 'inbound' ? 'inbound' : 'outbound';

      await prisma.callLog.create({
        data: {
          twilioSid: data.sid,
          contactId: contact?.id,
          fromNumber: normalizedFrom,
          toNumber: normalizedTo,
          status: callStatus,
          direction: callDirection,
          duration: data.duration,
          recordingUrl: data.recordingUrl,
          startedAt: new Date(),
          endedAt:
            data.status === 'completed' && data.duration
              ? new Date(Date.now() + data.duration * 1000)
              : undefined,
          metadata: {},
        },
      });

      logger.info('Call logged successfully', {
        sid: data.sid,
        direction: callDirection,
        status: callStatus,
        contactId: contact?.id,
        duration: data.duration,
      });
    } catch (error) {
      logger.error('Failed to log call:', error);
    }
  }

  // Format appointment reminder message
  private formatAppointmentReminder(appointment: any): string {
    const date = new Date(appointment.date);
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });

    let message = `Hi ${appointment.clientName},

Reminder: You have a ${appointment.type} appointment with ${appointment.attorneyName} on ${formattedDate} at ${appointment.time}.`;

    if (appointment.location) {
      message += `\n\nLocation: ${appointment.location}`;
    } else {
      message += '\n\nThis is a phone consultation. We will call you at this number.';
    }

    message += '\n\nReply CONFIRM to confirm or CANCEL to reschedule.';

    return message;
  }

  // Verify phone number
  async verifyPhoneNumber(phoneNumber: string): Promise<{
    valid: boolean;
    carrier?: string;
    type?: string;
    countryCode?: string;
  }> {
    try {
      await this.ensureInitialized();

      if (!this.client) {
        logger.warn('Twilio not configured - mocking phone verification');
        return { valid: true, carrier: 'mock', type: 'mobile', countryCode: 'US' };
      }

      const lookup = await this.client.lookups.v1
        .phoneNumbers(phoneNumber)
        .fetch({ type: ['carrier'] });

      return {
        valid: true,
        carrier: (lookup.carrier as any)?.name || null,
        type: (lookup.carrier as any)?.type || null,
        countryCode: lookup.countryCode,
      };
    } catch (error) {
      logger.error('Phone verification failed:', error);
      return { valid: false };
    }
  }

  // Get message status
  async getMessageStatus(messageSid: string): Promise<MessageInstance | any> {
    try {
      await this.ensureInitialized();

      if (!this.client) {
        logger.warn('Twilio not configured - mocking message status');
        return {
          sid: messageSid,
          status: 'delivered',
        };
      }
      return await this.client.messages(messageSid).fetch();
    } catch (error) {
      logger.error('Failed to get message status:', error);
      throw error;
    }
  }

  // Get call status
  async getCallStatus(callSid: string): Promise<CallInstance | any> {
    try {
      await this.ensureInitialized();

      if (!this.client) {
        logger.warn('Twilio not configured - mocking call status');
        return {
          sid: callSid,
          status: 'completed',
        };
      }
      return await this.client.calls(callSid).fetch();
    } catch (error) {
      logger.error('Failed to get call status:', error);
      throw error;
    }
  }

  // Send notification to attorneys
  async notifyAttorneys(
    message: string,
    urgency: 'low' | 'medium' | 'high' = 'medium'
  ): Promise<void> {
    try {
      // Get all attorneys with SMS notifications enabled
      const attorneys = await getPrismaClient().user.findMany({
        where: {
          role: 'ATTORNEY',
          phone: { not: null },
          // TODO: Add notification preferences check when field is added
        },
      });

      const phoneNumbers = attorneys.map(a => a.phone).filter((p): p is string => p !== null);

      if (phoneNumbers.length > 0) {
        const prefix = urgency === 'high' ? '🚨 URGENT: ' : '';
        await this.sendBulkSMS(phoneNumbers, prefix + message);
      }
    } catch (error) {
      logger.error('Failed to notify attorneys:', error);
    }
  }

  // Update SMS status from webhook
  async updateSmsStatus(data: {
    MessageSid: string;
    MessageStatus: string;
    ErrorCode?: string;
    ErrorMessage?: string;
  }): Promise<void> {
    try {
      const prisma = getPrismaClient();

      // Map Twilio status to our SmsStatus enum
      let smsStatus:
        | 'queued'
        | 'sending'
        | 'sent'
        | 'failed'
        | 'delivered'
        | 'undelivered'
        | 'receiving'
        | 'received';
      switch (data.MessageStatus) {
        case 'queued':
          smsStatus = 'queued';
          break;
        case 'sending':
          smsStatus = 'sending';
          break;
        case 'sent':
          smsStatus = 'sent';
          break;
        case 'delivered':
          smsStatus = 'delivered';
          break;
        case 'undelivered':
          smsStatus = 'undelivered';
          break;
        case 'failed':
          smsStatus = 'failed';
          break;
        default:
          smsStatus = 'sent';
      }

      const updateData: any = {
        status: smsStatus,
      };

      if (data.ErrorCode || data.ErrorMessage) {
        updateData.errorMessage = `${data.ErrorCode || ''} ${data.ErrorMessage || ''}`.trim();
      }

      await prisma.smsLog.update({
        where: { twilioSid: data.MessageSid },
        data: updateData,
      });

      logger.info('SMS status updated', {
        sid: data.MessageSid,
        status: smsStatus,
        error: updateData.errorMessage,
      });
    } catch (error) {
      logger.error('Failed to update SMS status:', error);
    }
  }

  // Update call status from webhook
  async updateCallStatus(data: {
    CallSid: string;
    CallStatus: string;
    CallDuration?: string;
    RecordingUrl?: string;
    ErrorCode?: string;
    ErrorMessage?: string;
  }): Promise<void> {
    try {
      const prisma = getPrismaClient();

      // Map Twilio status to our CallStatus enum
      let callStatus: 'active' | 'completed' | 'failed' | 'missed';
      switch (data.CallStatus) {
        case 'active':
        case 'in-progress':
        case 'ringing':
        case 'queued':
          callStatus = 'active';
          break;
        case 'completed':
          callStatus = 'completed';
          break;
        case 'failed':
        case 'busy':
        case 'no-answer':
          callStatus = 'failed';
          break;
        case 'missed':
          callStatus = 'missed';
          break;
        default:
          callStatus = 'completed';
      }

      const updateData: any = {
        status: callStatus,
      };

      if (data.CallDuration) {
        updateData.duration = parseInt(data.CallDuration, 10);
        updateData.endedAt = new Date();
      }

      if (data.RecordingUrl) {
        updateData.recordingUrl = data.RecordingUrl;
      }

      if (data.ErrorCode || data.ErrorMessage) {
        updateData.errorMessage = `${data.ErrorCode || ''} ${data.ErrorMessage || ''}`.trim();
      }

      await prisma.callLog.update({
        where: { twilioSid: data.CallSid },
        data: updateData,
      });

      logger.info('Call status updated', {
        sid: data.CallSid,
        status: callStatus,
        duration: updateData.duration,
        error: updateData.errorMessage,
      });
    } catch (error) {
      logger.error('Failed to update call status:', error);
    }
  }
}

// Export singleton instance
export const twilioService = new TwilioService();
