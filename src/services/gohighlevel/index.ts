import { z } from 'zod';
import { logger } from '@/lib/logger';
import { getPrismaClient } from '@/lib/prisma';
import { APISafetyWrapper } from '@/lib/api-safety';

// GHL API schemas
const ContactSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email().optional(),
  phone: z.string(),
  tags: z.array(z.string()).optional(),
  source: z.string().optional(),
  customFields: z.record(z.any()).optional(),
});

const CampaignTriggerSchema = z.object({
  contactId: z.string(),
  campaignId: z.string(),
});

const SMSSchema = z.object({
  contactId: z.string(),
  message: z.string(),
  templateId: z.string().optional(),
});

interface GHLConfig {
  apiKey: string;
  locationId: string;
  baseUrl: string;
}

export class GoHighLevelService {
  private config: GHLConfig;
  private headers: Record<string, string>;
  private apiWrapper: APISafetyWrapper;

  constructor() {
    this.config = {
      apiKey: process.env.GHL_API_KEY || '',
      locationId: process.env.GHL_LOCATION_ID || '',
      baseUrl: process.env.GHL_API_URL || 'https://rest.gohighlevel.com/v1',
    };

    this.apiWrapper = new APISafetyWrapper({
      key: this.config.apiKey,
      serviceName: 'GoHighLevel',
      required: false,
    });

    this.headers = {
      Authorization: `Bearer ${this.config.apiKey}`,
      'Content-Type': 'application/json',
    };

    if (!this.apiWrapper.isAvailable()) {
      logger.warn('GoHighLevel API key not configured');
    }
  }

  // Create or update contact
  async upsertContact(data: z.infer<typeof ContactSchema>) {
    if (!this.apiWrapper.isAvailable()) {
      return this.getMockContactResponse(data);
    }

    try {
      const validated = ContactSchema.parse(data);

      // Check if contact exists
      const existingContact = await this.findContactByPhone(validated.phone);

      if (existingContact) {
        // Update existing contact
        return await this.updateContact(existingContact.id, validated);
      } else {
        // Create new contact
        return await this.createContact(validated);
      }
    } catch (error) {
      logger.error('Failed to upsert GHL contact:', error);
      throw error;
    }
  }

  // Create new contact
  private async createContact(data: Record<string, unknown>) {
    try {
      const response = await fetch(`${this.config.baseUrl}/contacts/`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          ...data,
          locationId: this.config.locationId,
        }),
      });

      if (!response.ok) {
        throw new Error(`GHL API error: ${response.statusText}`);
      }

      const contact = await response.json();

      // Sync with local database
      await this.syncContactToDatabase(contact);

      logger.info('GHL contact created', { contactId: contact.id });
      return contact;
    } catch (error) {
      logger.error('Failed to create GHL contact:', error);
      throw error;
    }
  }

  // Update existing contact
  private async updateContact(contactId: string, data: Record<string, unknown>) {
    try {
      const response = await fetch(`${this.config.baseUrl}/contacts/${contactId}`, {
        method: 'PUT',
        headers: this.headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`GHL API error: ${response.statusText}`);
      }

      const contact = await response.json();

      // Sync with local database
      await this.syncContactToDatabase(contact);

      logger.info('GHL contact updated', { contactId: contact.id });
      return contact;
    } catch (error) {
      logger.error('Failed to update GHL contact:', error);
      throw error;
    }
  }

  // Find contact by phone
  async findContactByPhone(phone: string) {
    try {
      const response = await fetch(
        `${this.config.baseUrl}/contacts/lookup?phone=${encodeURIComponent(phone)}`,
        { headers: this.headers }
      );

      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`GHL API error: ${response.statusText}`);
      }

      const contacts = await response.json();
      return contacts.contacts?.[0] || null;
    } catch (error) {
      logger.error('Failed to find GHL contact:', error);
      return null;
    }
  }

  // Send SMS
  async sendSMS(options: z.infer<typeof SMSSchema>) {
    if (!this.apiWrapper.isAvailable()) {
      return this.getMockSMSResponse();
    }

    try {
      const validated = SMSSchema.parse(options);

      const response = await fetch(`${this.config.baseUrl}/conversations/messages`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          type: 'SMS',
          contactId: validated.contactId,
          message: validated.message,
          userId: this.config.locationId,
        }),
      });

      if (!response.ok) {
        throw new Error(`GHL API error: ${response.statusText}`);
      }

      const result = await response.json();

      // Log SMS in database
      await this.logSMS({
        contactId: validated.contactId,
        message: validated.message,
        direction: 'outbound',
        status: 'sent',
        ghlMessageId: result.messageId,
      });

      logger.info('SMS sent via GHL', {
        contactId: validated.contactId,
        messageId: result.messageId,
      });

      return result;
    } catch (error) {
      logger.error('Failed to send SMS via GHL:', error);
      throw error;
    }
  }

  // Send SMS by phone number (creates contact if needed)
  async sendSMSByPhone(phone: string, message: string, tags?: string[]) {
    try {
      // Find or create contact
      let contact = await this.findContactByPhone(phone);

      if (!contact) {
        contact = await this.createContact({
          phone,
          firstName: 'Unknown',
          lastName: 'Contact',
          tags: tags || ['sms-recipient'],
          source: 'Website SMS',
        });
      }

      // Send SMS
      return await this.sendSMS({
        contactId: contact.id,
        message,
      });
    } catch (error) {
      logger.error('Failed to send SMS by phone:', error);
      throw error;
    }
  }

  // Trigger campaign
  async triggerCampaign(options: z.infer<typeof CampaignTriggerSchema>) {
    if (!this.apiWrapper.isAvailable()) {
      return this.getMockCampaignResponse();
    }

    try {
      const validated = CampaignTriggerSchema.parse(options);

      const response = await fetch(
        `${this.config.baseUrl}/contacts/${validated.contactId}/campaigns/${validated.campaignId}`,
        {
          method: 'POST',
          headers: this.headers,
        }
      );

      if (!response.ok) {
        throw new Error(`GHL API error: ${response.statusText}`);
      }

      logger.info('Campaign triggered', {
        contactId: validated.contactId,
        campaignId: validated.campaignId,
      });

      return await response.json();
    } catch (error) {
      logger.error('Failed to trigger GHL campaign:', error);
      throw error;
    }
  }

  // Add contact to campaign by phone
  async addToCampaignByPhone(
    phone: string,
    campaignId: string,
    contactData?: {
      firstName?: string;
      lastName?: string;
      email?: string;
      tags?: string[];
      source?: string;
      customFields?: Record<string, any>;
    }
  ) {
    try {
      // Find or create contact
      let contact = await this.findContactByPhone(phone);

      if (!contact) {
        contact = await this.createContact({
          phone,
          firstName: contactData?.firstName || 'Unknown',
          lastName: contactData?.lastName || 'Contact',
          email: contactData?.email,
          tags: contactData?.tags || ['campaign-recipient'],
          source: contactData?.source || 'Website',
          customFields: contactData?.customFields,
        });
      }

      // Trigger campaign
      return await this.triggerCampaign({
        contactId: contact.id,
        campaignId,
      });
    } catch (error) {
      logger.error('Failed to add contact to campaign:', error);
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
  }) {
    try {
      // Find or create contact
      const [firstName, ...lastNameParts] = appointment.clientName.split(' ');
      const lastName = lastNameParts.join(' ') || 'Client';

      const contact = await this.upsertContact({
        phone: appointment.clientPhone,
        firstName,
        lastName,
        tags: ['appointment-reminder', 'client'],
        customFields: {
          appointmentId: appointment.id,
          appointmentDate: appointment.date.toISOString(),
          appointmentTime: appointment.time,
          appointmentType: appointment.type,
          attorneyName: appointment.attorneyName,
        },
      });

      // Use appointment reminder campaign
      const campaignId = process.env.GHL_APPOINTMENT_REMINDER_CAMPAIGN_ID;

      if (campaignId) {
        // Trigger campaign
        await this.triggerCampaign({
          contactId: contact.id,
          campaignId,
        });
      } else {
        // Fallback to direct SMS
        const message = this.formatAppointmentReminder(appointment);
        await this.sendSMS({
          contactId: contact.id,
          message,
        });
      }

      // Fetch current appointment data
      const currentAppointment = await getPrismaClient().appointment.findUnique({
        where: { id: appointment.id },
      });

      // Update appointment record with metadata
      if (currentAppointment) {
        await getPrismaClient().appointment.update({
          where: { id: appointment.id },
          data: {
            metadata: {
              ...((currentAppointment.metadata as object) || {}),
              reminderSent: true,
              reminderSentAt: new Date().toISOString(),
              ghlContactId: contact.id,
            },
          },
        });
      }

      return contact;
    } catch (error) {
      logger.error('Failed to send appointment reminder via GHL:', error);
      throw error;
    }
  }

  // Handle incoming webhook
  async handleWebhook(event: any) {
    try {
      logger.info('GHL webhook received', { type: event.type });

      switch (event.type) {
        case 'ContactCreate':
        case 'ContactUpdate':
          await this.syncContactToDatabase(event.contact);
          break;

        case 'InboundMessage':
          await this.handleInboundMessage(event);
          break;

        case 'CampaignCompleted':
          await this.handleCampaignCompleted(event);
          break;

        default:
          logger.warn('Unknown GHL webhook type', { type: event.type });
      }
    } catch (error) {
      logger.error('Failed to handle GHL webhook:', error);
      throw error;
    }
  }

  // Handle inbound message
  private async handleInboundMessage(event: any) {
    try {
      const { contactId, message, phone } = event;

      // Log inbound message
      await this.logSMS({
        contactId,
        message,
        direction: 'inbound',
        status: 'received',
        ghlMessageId: event.messageId,
      });

      // Process keywords
      const response = await this.processInboundMessage(message, contactId);

      if (response) {
        await this.sendSMS({
          contactId,
          message: response,
        });
      }
    } catch (error) {
      logger.error('Failed to handle inbound message:', error);
    }
  }

  // Process inbound message
  private async processInboundMessage(message: string, contactId: string): Promise<string | null> {
    const normalized = message.trim().toUpperCase();

    // Handle opt-out
    if (['STOP', 'UNSUBSCRIBE', 'CANCEL'].includes(normalized)) {
      await this.updateContact(contactId, {
        tags: ['opted-out'],
        customFields: {
          smsOptOut: true,
          optOutDate: new Date().toISOString(),
        },
      });
      return 'You have been unsubscribed from Vasquez Law Firm SMS updates. Reply START to resubscribe.';
    }

    // Handle opt-in
    if (['START', 'SUBSCRIBE', 'YES'].includes(normalized)) {
      await this.updateContact(contactId, {
        tags: ['opted-in'],
        customFields: {
          smsOptOut: false,
          optInDate: new Date().toISOString(),
        },
      });
      return 'Welcome! You are now subscribed to Vasquez Law Firm SMS updates. Reply STOP to unsubscribe.';
    }

    // Handle appointment confirmation
    if (normalized === 'CONFIRM') {
      // Check if contact has pending appointment
      const contact = await this.getContact(contactId);
      const appointmentId = contact?.customFields?.appointmentId;

      if (appointmentId) {
        const appointment = await getPrismaClient().appointment.findUnique({
          where: { id: appointmentId },
        });

        if (appointment) {
          await getPrismaClient().appointment.update({
            where: { id: appointmentId },
            data: {
              status: 'confirmed',
              metadata: {
                ...((appointment.metadata as object) || {}),
                confirmed: true,
                confirmedAt: new Date().toISOString(),
              },
            },
          });
        }
        return 'Thank you! Your appointment has been confirmed. We look forward to seeing you.';
      }
    }

    // Default: Trigger auto-response campaign
    const autoResponseCampaignId = process.env.GHL_AUTO_RESPONSE_CAMPAIGN_ID;
    if (autoResponseCampaignId) {
      await this.triggerCampaign({
        contactId,
        campaignId: autoResponseCampaignId,
      });
      return null; // Campaign will handle response
    }

    return 'Thank you for contacting Vasquez Law Firm. For immediate assistance, please call 1-844-YO-PELEO.';
  }

  // Handle campaign completed
  private async handleCampaignCompleted(event: any) {
    try {
      const { contactId, campaignId, campaignName } = event;

      logger.info('Campaign completed', {
        contactId,
        campaignId,
        campaignName,
      });

      // Update contact tags
      await this.updateContact(contactId, {
        tags: [`completed-${campaignId}`],
      });
    } catch (error) {
      logger.error('Failed to handle campaign completion:', error);
    }
  }

  // Get contact
  private async getContact(contactId: string) {
    try {
      const response = await fetch(`${this.config.baseUrl}/contacts/${contactId}`, {
        headers: this.headers,
      });

      if (!response.ok) {
        throw new Error(`GHL API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      logger.error('Failed to get GHL contact:', error);
      return null;
    }
  }

  // Sync contact to database
  private async syncContactToDatabase(ghlContact: any) {
    try {
      // TODO: Implement contact sync when contact model is added to schema
      // For now, we'll use the User model for contact-like functionality
      logger.info('Contact sync placeholder', { ghlContactId: ghlContact?.id || 'unknown' });

      // You could sync to User model if appropriate:
      /*
      await getPrismaClient().user.upsert({
        where: { email: ghlContact.email },
        create: {
          email: ghlContact.email,
          name: `${ghlContact.firstName || ''} ${ghlContact.lastName || ''}`.trim() || 'Unknown',
          phone: ghlContact.phone,
          metadata: {
            ghlId: ghlContact.id,
            customFields: ghlContact.customFields,
            ghlData: ghlContact,
          },
        },
        update: {
          name: `${ghlContact.firstName || ''} ${ghlContact.lastName || ''}`.trim() || 'Unknown',
          phone: ghlContact.phone,
          metadata: {
            ghlId: ghlContact.id,
            customFields: ghlContact.customFields,
            ghlData: ghlContact,
            updatedAt: new Date().toISOString(),
          },
        },
      });
      */
    } catch (error) {
      logger.error('Failed to sync contact to database:', error);
    }
  }

  // Log SMS
  private async logSMS(data: {
    contactId: string;
    message: string;
    direction: 'inbound' | 'outbound';
    status: string;
    ghlMessageId?: string;
  }) {
    try {
      // TODO: Implement SMS logging when smsLog model is added to schema
      logger.info('SMS log placeholder', {
        contactId: data.contactId,
        direction: data.direction,
        status: data.status,
        messageId: data.ghlMessageId,
      });

      /* Future implementation:
      // Get contact phone number
      const contact = await this.getContact(data.contactId);
      if (!contact) return;

      await getPrismaClient().smsLog.create({
        data: {
          ghlContactId: data.contactId,
          ghlMessageId: data.ghlMessageId,
          to: data.direction === 'outbound' ? contact.phone : this.config.locationId,
          from: data.direction === 'inbound' ? contact.phone : this.config.locationId,
          body: data.message.substring(0, 1000), // Truncate for storage
          status: data.status,
          direction: data.direction,
          metadata: {
            contactName: `${contact.firstName} ${contact.lastName}`,
          },
        },
      });
      */
    } catch (error) {
      logger.error('Failed to log SMS:', error);
    }
  }

  // Format appointment reminder
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

    message += '\n\nReply CONFIRM to confirm or call 1-844-YO-PELEO to reschedule.';

    return message;
  }

  // Bulk SMS via campaign
  async sendBulkSMS(
    recipients: Array<{ phone: string; firstName?: string; lastName?: string }>,
    campaignId: string
  ) {
    const results = [];
    const errors = [];

    for (const recipient of recipients) {
      try {
        const result = await this.addToCampaignByPhone(recipient.phone, campaignId, {
          firstName: recipient.firstName,
          lastName: recipient.lastName,
          tags: ['bulk-sms'],
          source: 'Bulk Campaign',
        });
        results.push(result);
      } catch (error) {
        errors.push({ recipient, error });
      }
    }

    if (errors.length > 0) {
      logger.warn('Some bulk SMS failed', { errors });
    }

    return { results, errors };
  }

  // Get campaigns
  async getCampaigns() {
    if (!this.apiWrapper.isAvailable()) {
      return { campaigns: [] };
    }

    try {
      const response = await fetch(`${this.config.baseUrl}/campaigns`, {
        headers: this.headers,
      });

      if (!response.ok) {
        throw new Error(`GHL API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      logger.error('Failed to get GHL campaigns:', error);
      throw error;
    }
  }

  // Create opportunity
  async createOpportunity(data: {
    contactId: string;
    name: string;
    pipelineId: string;
    stageId: string;
    value?: number;
    customFields?: Record<string, any>;
  }) {
    if (!this.apiWrapper.isAvailable()) {
      return this.getMockOpportunityResponse(data);
    }

    try {
      const response = await fetch(`${this.config.baseUrl}/opportunities/`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          ...data,
          locationId: this.config.locationId,
        }),
      });

      if (!response.ok) {
        throw new Error(`GHL API error: ${response.statusText}`);
      }

      const opportunity = await response.json();

      logger.info('GHL opportunity created', { opportunityId: opportunity.id });
      return opportunity;
    } catch (error) {
      logger.error('Failed to create GHL opportunity:', error);
      throw error;
    }
  }

  // Schedule meeting/appointment
  async scheduleMeeting(data: {
    contactId: string;
    title: string;
    startTime: Date;
    endTime: Date;
    calendarId: string;
    appointmentStatus?: 'new' | 'confirmed' | 'cancelled' | 'showed' | 'noshow';
    notes?: string;
    meetingLocation?: string;
    assignedUserId?: string;
  }) {
    if (!this.apiWrapper.isAvailable()) {
      return this.getMockAppointmentResponse(data);
    }

    try {
      const response = await fetch(`${this.config.baseUrl}/calendars/events`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          contactId: data.contactId,
          title: data.title,
          calendarId: data.calendarId,
          startTime: data.startTime.toISOString(),
          endTime: data.endTime.toISOString(),
          appointmentStatus: data.appointmentStatus || 'new',
          notes: data.notes,
          meetingLocation: data.meetingLocation,
          assignedUserId: data.assignedUserId || this.config.locationId,
          locationId: this.config.locationId,
        }),
      });

      if (!response.ok) {
        throw new Error(`GHL API error: ${response.statusText}`);
      }

      const appointment = await response.json();

      logger.info('GHL appointment scheduled', {
        appointmentId: appointment.id,
        contactId: data.contactId,
      });

      return appointment;
    } catch (error) {
      logger.error('Failed to schedule GHL appointment:', error);
      throw error;
    }
  }

  // Get available appointment slots
  async getAvailableSlots(data: {
    calendarId: string;
    startDate: Date;
    endDate: Date;
    timezone?: string;
  }) {
    try {
      const params = new URLSearchParams({
        calendarId: data.calendarId,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
        timezone: data.timezone || 'America/New_York',
      });

      const response = await fetch(`${this.config.baseUrl}/calendars/free-slots?${params}`, {
        headers: this.headers,
      });

      if (!response.ok) {
        throw new Error(`GHL API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      logger.error('Failed to get available slots:', error);
      throw error;
    }
  }

  // Update appointment
  async updateAppointment(
    appointmentId: string,
    data: {
      title?: string;
      startTime?: Date;
      endTime?: Date;
      appointmentStatus?: 'new' | 'confirmed' | 'cancelled' | 'showed' | 'noshow';
      notes?: string;
      meetingLocation?: string;
    }
  ) {
    try {
      const updateData: any = {};

      if (data.title) updateData.title = data.title;
      if (data.startTime) updateData.startTime = data.startTime.toISOString();
      if (data.endTime) updateData.endTime = data.endTime.toISOString();
      if (data.appointmentStatus) updateData.appointmentStatus = data.appointmentStatus;
      if (data.notes) updateData.notes = data.notes;
      if (data.meetingLocation) updateData.meetingLocation = data.meetingLocation;

      const response = await fetch(`${this.config.baseUrl}/calendars/events/${appointmentId}`, {
        method: 'PUT',
        headers: this.headers,
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error(`GHL API error: ${response.statusText}`);
      }

      const appointment = await response.json();

      logger.info('GHL appointment updated', { appointmentId });

      return appointment;
    } catch (error) {
      logger.error('Failed to update GHL appointment:', error);
      throw error;
    }
  }

  // Cancel appointment
  async cancelAppointment(appointmentId: string, reason?: string) {
    try {
      return await this.updateAppointment(appointmentId, {
        appointmentStatus: 'cancelled',
        notes: reason ? `Cancelled: ${reason}` : 'Appointment cancelled',
      });
    } catch (error) {
      logger.error('Failed to cancel GHL appointment:', error);
      throw error;
    }
  }

  // Make outbound call (via campaign)
  async makeCall(data: { contactId: string; campaignId: string; phoneNumber?: string }) {
    try {
      // GoHighLevel handles calls through campaigns
      const result = await this.triggerCampaign({
        contactId: data.contactId,
        campaignId: data.campaignId,
      });

      logger.info('Call campaign triggered', {
        contactId: data.contactId,
        campaignId: data.campaignId,
      });

      return result;
    } catch (error) {
      logger.error('Failed to trigger call campaign:', error);
      throw error;
    }
  }

  // Create task
  async createTask(data: {
    contactId: string;
    title: string;
    body: string;
    dueDate: Date;
    assignedTo?: string;
    completed?: boolean;
  }) {
    try {
      const response = await fetch(`${this.config.baseUrl}/contacts/${data.contactId}/tasks`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          title: data.title,
          body: data.body,
          dueDate: data.dueDate.toISOString(),
          assignedTo: data.assignedTo || this.config.locationId,
          completed: data.completed || false,
        }),
      });

      if (!response.ok) {
        throw new Error(`GHL API error: ${response.statusText}`);
      }

      const task = await response.json();

      logger.info('GHL task created', {
        taskId: task.id,
        contactId: data.contactId,
      });

      return task;
    } catch (error) {
      logger.error('Failed to create GHL task:', error);
      throw error;
    }
  }

  // Add note to contact
  async addNote(contactId: string, note: string) {
    try {
      const response = await fetch(`${this.config.baseUrl}/contacts/${contactId}/notes`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          body: note,
        }),
      });

      if (!response.ok) {
        throw new Error(`GHL API error: ${response.statusText}`);
      }

      const result = await response.json();

      logger.info('Note added to contact', { contactId });

      return result;
    } catch (error) {
      logger.error('Failed to add note:', error);
      throw error;
    }
  }

  // Get contact activities
  async getContactActivities(contactId: string) {
    try {
      const response = await fetch(`${this.config.baseUrl}/contacts/${contactId}/activities`, {
        headers: this.headers,
      });

      if (!response.ok) {
        throw new Error(`GHL API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      logger.error('Failed to get contact activities:', error);
      throw error;
    }
  }

  // Get pipelines
  async getPipelines() {
    if (!this.apiWrapper.isAvailable()) {
      return { pipelines: [] };
    }

    try {
      const response = await fetch(`${this.config.baseUrl}/pipelines`, {
        headers: this.headers,
      });

      if (!response.ok) {
        throw new Error(`GHL API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      logger.error('Failed to get GHL pipelines:', error);
      throw error;
    }
  }

  // Move opportunity to different stage
  async moveOpportunityStage(opportunityId: string, stageId: string) {
    try {
      const response = await fetch(`${this.config.baseUrl}/opportunities/${opportunityId}`, {
        method: 'PUT',
        headers: this.headers,
        body: JSON.stringify({
          stageId,
        }),
      });

      if (!response.ok) {
        throw new Error(`GHL API error: ${response.statusText}`);
      }

      const opportunity = await response.json();

      logger.info('Opportunity stage updated', {
        opportunityId,
        stageId,
      });

      return opportunity;
    } catch (error) {
      logger.error('Failed to move opportunity stage:', error);
      throw error;
    }
  }

  // Get contact by email
  async findContactByEmail(email: string) {
    try {
      const response = await fetch(
        `${this.config.baseUrl}/contacts/lookup?email=${encodeURIComponent(email)}`,
        { headers: this.headers }
      );

      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`GHL API error: ${response.statusText}`);
      }

      const contacts = await response.json();
      return contacts.contacts?.[0] || null;
    } catch (error) {
      logger.error('Failed to find GHL contact by email:', error);
      return null;
    }
  }

  // Batch update contacts
  async batchUpdateContacts(
    updates: Array<{
      contactId: string;
      data: Record<string, any>;
    }>
  ) {
    const results = [];
    const errors = [];

    for (const update of updates) {
      try {
        const result = await this.updateContact(update.contactId, update.data);
        results.push(result);
      } catch (error) {
        errors.push({ contactId: update.contactId, error });
      }
    }

    if (errors.length > 0) {
      logger.warn('Some contact updates failed', { errors });
    }

    return { results, errors };
  }

  // Search contacts
  async searchContacts(
    query: string,
    filters?: {
      tags?: string[];
      customField?: { key: string; value: any };
      limit?: number;
    }
  ) {
    try {
      const params = new URLSearchParams({
        query,
        locationId: this.config.locationId,
      });

      if (filters?.limit) {
        params.append('limit', filters.limit.toString());
      }

      const response = await fetch(`${this.config.baseUrl}/contacts/search?${params}`, {
        headers: this.headers,
      });

      if (!response.ok) {
        throw new Error(`GHL API error: ${response.statusText}`);
      }

      const results = await response.json();

      // Filter by tags if specified
      if (filters?.tags && filters.tags.length > 0) {
        results.contacts = results.contacts.filter((contact: any) =>
          filters.tags!.some(tag => contact.tags?.includes(tag))
        );
      }

      // Filter by custom field if specified
      if (filters?.customField) {
        results.contacts = results.contacts.filter(
          (contact: any) =>
            contact.customFields?.[filters.customField!.key] === filters.customField!.value
        );
      }

      return results;
    } catch (error) {
      logger.error('Failed to search contacts:', error);
      throw error;
    }
  }

  // Get or create contact by phone or email
  async getOrCreateContact(data: {
    phone?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    tags?: string[];
    source?: string;
    customFields?: Record<string, any>;
  }) {
    try {
      // Try to find existing contact
      let contact = null;

      if (data.phone) {
        contact = await this.findContactByPhone(data.phone);
      }

      if (!contact && data.email) {
        contact = await this.findContactByEmail(data.email);
      }

      // If contact exists, update it
      if (contact) {
        return await this.updateContact(contact.id, {
          ...data,
          tags: [...(contact.tags || []), ...(data.tags || [])],
          customFields: {
            ...contact.customFields,
            ...data.customFields,
          },
        });
      }

      // Create new contact
      return await this.createContact({
        firstName: data.firstName || 'Unknown',
        lastName: data.lastName || 'Contact',
        phone: data.phone || '',
        email: data.email,
        tags: data.tags || [],
        source: data.source || 'api',
        customFields: data.customFields || {},
        locationId: this.config.locationId,
      });
    } catch (error) {
      logger.error('Failed to get or create contact:', error);
      throw error;
    }
  }

  // Get calendars
  async getCalendars() {
    if (!this.apiWrapper.isAvailable()) {
      return { calendars: [] };
    }

    try {
      const response = await fetch(`${this.config.baseUrl}/calendars`, {
        headers: this.headers,
      });

      if (!response.ok) {
        throw new Error(`GHL API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      logger.error('Failed to get calendars:', error);
      throw error;
    }
  }

  // Get custom fields
  async getCustomFields() {
    try {
      const response = await fetch(
        `${this.config.baseUrl}/locations/${this.config.locationId}/customFields`,
        {
          headers: this.headers,
        }
      );

      if (!response.ok) {
        throw new Error(`GHL API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      logger.error('Failed to get custom fields:', error);
      throw error;
    }
  }

  // Get location settings
  async getLocationSettings() {
    try {
      const response = await fetch(`${this.config.baseUrl}/locations/${this.config.locationId}`, {
        headers: this.headers,
      });

      if (!response.ok) {
        throw new Error(`GHL API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      logger.error('Failed to get location settings:', error);
      throw error;
    }
  }

  // Validate webhook signature
  validateWebhookSignature(payload: string, signature: string): boolean {
    try {
      const crypto = require('crypto');
      const webhookSecret = process.env.GHL_WEBHOOK_SECRET || '';

      if (!webhookSecret) {
        logger.warn('GHL webhook secret not configured');
        return false;
      }

      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(payload)
        .digest('hex');

      return signature === expectedSignature;
    } catch (error) {
      logger.error('Failed to validate webhook signature:', error);
      return false;
    }
  }

  // Helper method to check if service is configured
  isConfigured(): boolean {
    return this.apiWrapper.isAvailable() && !!this.config.locationId && !!this.config.baseUrl;
  }

  // Get service status
  async getServiceStatus() {
    try {
      if (!this.isConfigured()) {
        return {
          status: 'not_configured',
          message: 'GoHighLevel API key or location ID not configured',
        };
      }

      // Try a simple API call to verify connectivity
      const response = await fetch(`${this.config.baseUrl}/locations/${this.config.locationId}`, {
        headers: this.headers,
      });

      if (response.ok) {
        return {
          status: 'connected',
          message: 'GoHighLevel service is connected and operational',
        };
      } else {
        return {
          status: 'error',
          message: `GoHighLevel API error: ${response.statusText}`,
        };
      }
    } catch (error) {
      return {
        status: 'error',
        message: `Connection error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }

  // Mock responses for when API is not configured
  private getMockContactResponse(data: any) {
    logger.info('Using mock GoHighLevel contact response');
    return {
      id: 'mock-contact-' + Date.now(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      tags: data.tags || [],
      source: data.source || 'website',
      dateCreated: new Date().toISOString(),
      dateUpdated: new Date().toISOString(),
    };
  }

  private getMockCampaignResponse() {
    logger.info('Using mock GoHighLevel campaign response');
    return {
      success: true,
      campaignId: 'mock-campaign-' + Date.now(),
      message: 'Campaign trigger simulated (API not configured)',
    };
  }

  private getMockSMSResponse() {
    logger.info('Using mock GoHighLevel SMS response');
    return {
      success: true,
      messageId: 'mock-sms-' + Date.now(),
      status: 'sent',
      message: 'SMS simulated (API not configured)',
    };
  }

  private getMockAppointmentResponse(data: any) {
    logger.info('Using mock GoHighLevel appointment response');
    return {
      id: 'mock-appointment-' + Date.now(),
      contactId: data.contactId,
      title: data.title,
      startTime: data.startTime,
      endTime: data.endTime,
      status: data.appointmentStatus || 'new',
      location: data.meetingLocation || 'TBD',
    };
  }

  private getMockOpportunityResponse(data: any) {
    logger.info('Using mock GoHighLevel opportunity response');
    return {
      id: 'mock-opportunity-' + Date.now(),
      contactId: data.contactId,
      name: data.name,
      pipelineId: data.pipelineId,
      stageId: data.stageId,
      value: data.value || 0,
      status: 'open',
    };
  }
}

// Export singleton instance
export const ghlService = new GoHighLevelService();
