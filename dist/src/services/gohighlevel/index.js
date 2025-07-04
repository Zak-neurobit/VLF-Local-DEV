'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ghlService = exports.GoHighLevelService = void 0;
const zod_1 = require('zod');
const logger_1 = require('@/lib/logger');
const prisma_1 = require('@/lib/prisma');
// GHL API schemas
const ContactSchema = zod_1.z.object({
  firstName: zod_1.z.string(),
  lastName: zod_1.z.string(),
  email: zod_1.z.string().email().optional(),
  phone: zod_1.z.string(),
  tags: zod_1.z.array(zod_1.z.string()).optional(),
  source: zod_1.z.string().optional(),
  customFields: zod_1.z.record(zod_1.z.any()).optional(),
});
const CampaignTriggerSchema = zod_1.z.object({
  contactId: zod_1.z.string(),
  campaignId: zod_1.z.string(),
});
const SMSSchema = zod_1.z.object({
  contactId: zod_1.z.string(),
  message: zod_1.z.string(),
  templateId: zod_1.z.string().optional(),
});
class GoHighLevelService {
  constructor() {
    this.config = {
      apiKey: process.env.GHL_API_KEY || '',
      locationId: process.env.GHL_LOCATION_ID || '',
      baseUrl: process.env.GHL_API_URL || 'https://rest.gohighlevel.com/v1',
    };
    this.headers = {
      Authorization: `Bearer ${this.config.apiKey}`,
      'Content-Type': 'application/json',
    };
    if (!this.config.apiKey) {
      logger_1.logger.warn('GoHighLevel API key not configured');
    }
  }
  // Create or update contact
  async upsertContact(data) {
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
      logger_1.logger.error('Failed to upsert GHL contact:', error);
      throw error;
    }
  }
  // Create new contact
  async createContact(data) {
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
      logger_1.logger.info('GHL contact created', { contactId: contact.id });
      return contact;
    } catch (error) {
      logger_1.logger.error('Failed to create GHL contact:', error);
      throw error;
    }
  }
  // Update existing contact
  async updateContact(contactId, data) {
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
      logger_1.logger.info('GHL contact updated', { contactId: contact.id });
      return contact;
    } catch (error) {
      logger_1.logger.error('Failed to update GHL contact:', error);
      throw error;
    }
  }
  // Find contact by phone
  async findContactByPhone(phone) {
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
      logger_1.logger.error('Failed to find GHL contact:', error);
      return null;
    }
  }
  // Send SMS
  async sendSMS(options) {
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
      logger_1.logger.info('SMS sent via GHL', {
        contactId: validated.contactId,
        messageId: result.messageId,
      });
      return result;
    } catch (error) {
      logger_1.logger.error('Failed to send SMS via GHL:', error);
      throw error;
    }
  }
  // Send SMS by phone number (creates contact if needed)
  async sendSMSByPhone(phone, message, tags) {
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
      logger_1.logger.error('Failed to send SMS by phone:', error);
      throw error;
    }
  }
  // Trigger campaign
  async triggerCampaign(options) {
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
      logger_1.logger.info('Campaign triggered', {
        contactId: validated.contactId,
        campaignId: validated.campaignId,
      });
      return await response.json();
    } catch (error) {
      logger_1.logger.error('Failed to trigger GHL campaign:', error);
      throw error;
    }
  }
  // Add contact to campaign by phone
  async addToCampaignByPhone(phone, campaignId, contactData) {
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
      logger_1.logger.error('Failed to add contact to campaign:', error);
      throw error;
    }
  }
  // Send appointment reminder
  async sendAppointmentReminder(appointment) {
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
      // Update appointment record
      await prisma_1.prisma.appointment.update({
        where: { id: appointment.id },
        data: {
          reminderSent: true,
          reminderSentAt: new Date(),
          metadata: {
            ghlContactId: contact.id,
          },
        },
      });
      return contact;
    } catch (error) {
      logger_1.logger.error('Failed to send appointment reminder via GHL:', error);
      throw error;
    }
  }
  // Handle incoming webhook
  async handleWebhook(event) {
    try {
      logger_1.logger.info('GHL webhook received', { type: event.type });
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
          logger_1.logger.warn('Unknown GHL webhook type', { type: event.type });
      }
    } catch (error) {
      logger_1.logger.error('Failed to handle GHL webhook:', error);
      throw error;
    }
  }
  // Handle inbound message
  async handleInboundMessage(event) {
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
      logger_1.logger.error('Failed to handle inbound message:', error);
    }
  }
  // Process inbound message
  async processInboundMessage(message, contactId) {
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
        await prisma_1.prisma.appointment.update({
          where: { id: appointmentId },
          data: {
            confirmed: true,
            confirmedAt: new Date(),
          },
        });
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
  async handleCampaignCompleted(event) {
    try {
      const { contactId, campaignId, campaignName } = event;
      logger_1.logger.info('Campaign completed', {
        contactId,
        campaignId,
        campaignName,
      });
      // Update contact tags
      await this.updateContact(contactId, {
        tags: [`completed-${campaignId}`],
      });
    } catch (error) {
      logger_1.logger.error('Failed to handle campaign completion:', error);
    }
  }
  // Get contact
  async getContact(contactId) {
    try {
      const response = await fetch(`${this.config.baseUrl}/contacts/${contactId}`, {
        headers: this.headers,
      });
      if (!response.ok) {
        throw new Error(`GHL API error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      logger_1.logger.error('Failed to get GHL contact:', error);
      return null;
    }
  }
  // Sync contact to database
  async syncContactToDatabase(ghlContact) {
    try {
      await prisma_1.prisma.contact.upsert({
        where: { ghlId: ghlContact.id },
        create: {
          ghlId: ghlContact.id,
          firstName: ghlContact.firstName || 'Unknown',
          lastName: ghlContact.lastName || 'Contact',
          email: ghlContact.email,
          phone: ghlContact.phone,
          tags: ghlContact.tags || [],
          source: ghlContact.source || 'GHL',
          smsOptOut: ghlContact.customFields?.smsOptOut || false,
          metadata: {
            customFields: ghlContact.customFields,
            ghlData: ghlContact,
          },
        },
        update: {
          firstName: ghlContact.firstName || 'Unknown',
          lastName: ghlContact.lastName || 'Contact',
          email: ghlContact.email,
          phone: ghlContact.phone,
          tags: ghlContact.tags || [],
          smsOptOut: ghlContact.customFields?.smsOptOut || false,
          metadata: {
            customFields: ghlContact.customFields,
            ghlData: ghlContact,
            updatedAt: new Date().toISOString(),
          },
        },
      });
    } catch (error) {
      logger_1.logger.error('Failed to sync contact to database:', error);
    }
  }
  // Log SMS
  async logSMS(data) {
    try {
      // Get contact phone number
      const contact = await this.getContact(data.contactId);
      if (!contact) return;
      await prisma_1.prisma.smsLog.create({
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
    } catch (error) {
      logger_1.logger.error('Failed to log SMS:', error);
    }
  }
  // Format appointment reminder
  formatAppointmentReminder(appointment) {
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
  async sendBulkSMS(recipients, campaignId) {
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
      logger_1.logger.warn('Some bulk SMS failed', { errors });
    }
    return { results, errors };
  }
  // Get campaigns
  async getCampaigns() {
    try {
      const response = await fetch(`${this.config.baseUrl}/campaigns`, {
        headers: this.headers,
      });
      if (!response.ok) {
        throw new Error(`GHL API error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      logger_1.logger.error('Failed to get GHL campaigns:', error);
      throw error;
    }
  }
  // Create opportunity
  async createOpportunity(data) {
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
      logger_1.logger.info('GHL opportunity created', { opportunityId: opportunity.id });
      return opportunity;
    } catch (error) {
      logger_1.logger.error('Failed to create GHL opportunity:', error);
      throw error;
    }
  }
}
exports.GoHighLevelService = GoHighLevelService;
// Export singleton instance
exports.ghlService = new GoHighLevelService();
