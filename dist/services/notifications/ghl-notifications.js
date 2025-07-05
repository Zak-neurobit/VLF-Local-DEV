"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ghlNotificationService = exports.GHLNotificationService = void 0;
const zod_1 = require("zod");
const prisma_1 = require("@/lib/prisma");
const logger_1 = require("@/lib/logger");
const gohighlevel_1 = require("@/services/gohighlevel");
// Schemas for validation
const SendSMSSchema = zod_1.z.object({
    to: zod_1.z.string().regex(/^\+?[1-9]\d{1,14}$/), // E.164 format
    body: zod_1.z.string().min(1).max(1600),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
});
const BulkSMSSchema = zod_1.z.object({
    recipients: zod_1.z.array(zod_1.z.string().regex(/^\+?[1-9]\d{1,14}$/)),
    body: zod_1.z.string().min(1).max(1600),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
});
class GHLNotificationService {
    constructor() {
        // Configure campaign IDs from environment
        this.campaignIds = {
            appointmentReminder: process.env.GHL_APPOINTMENT_REMINDER_CAMPAIGN_ID || '',
            caseUpdate: process.env.GHL_CASE_UPDATE_CAMPAIGN_ID || '',
            welcomeMessage: process.env.GHL_WELCOME_CAMPAIGN_ID || '',
            generalNotification: process.env.GHL_GENERAL_NOTIFICATION_CAMPAIGN_ID || '',
        };
    }
    // Send SMS via GoHighLevel
    async sendSMS(options) {
        try {
            const validated = SendSMSSchema.parse(options);
            // Send SMS through GoHighLevel
            const result = await gohighlevel_1.ghlService.sendSMSByPhone(validated.to, validated.body, validated.tags || ['automated-sms']);
            logger_1.logger.info('SMS sent via GoHighLevel', {
                to: validated.to,
                tags: validated.tags,
            });
            return {
                success: true,
                provider: 'gohighlevel',
                messageId: result.id,
                to: validated.to,
                body: validated.body,
            };
        }
        catch (error) {
            logger_1.logger.error('Failed to send SMS via GoHighLevel:', error);
            throw error;
        }
    }
    // Send bulk SMS
    async sendBulkSMS(options) {
        try {
            const validated = BulkSMSSchema.parse(options);
            const results = [];
            const errors = [];
            // Process in batches to avoid rate limiting
            const batchSize = 10;
            for (let i = 0; i < validated.recipients.length; i += batchSize) {
                const batch = validated.recipients.slice(i, i + batchSize);
                const promises = batch.map(async (to) => {
                    try {
                        const result = await this.sendSMS({
                            to,
                            body: validated.body,
                            tags: validated.tags,
                        });
                        results.push(result);
                    }
                    catch (error) {
                        errors.push({ recipient: to, error });
                    }
                });
                await Promise.all(promises);
                // Rate limit: wait 1 second between batches
                if (i + batchSize < validated.recipients.length) {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            }
            if (errors.length > 0) {
                logger_1.logger.warn('Some SMS messages failed to send', { errors });
            }
            return {
                sent: results.length,
                failed: errors.length,
                results,
                errors,
            };
        }
        catch (error) {
            logger_1.logger.error('Failed to send bulk SMS:', error);
            throw error;
        }
    }
    // Send appointment reminder using campaign
    async sendAppointmentReminder(appointment) {
        try {
            const formattedDate = new Date(appointment.date).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
            });
            // If we have a campaign ID, use it
            if (this.campaignIds.appointmentReminder) {
                await gohighlevel_1.ghlService.addToCampaignByPhone(appointment.clientPhone, this.campaignIds.appointmentReminder, {
                    firstName: appointment.clientName.split(' ')[0],
                    lastName: appointment.clientName.split(' ').slice(1).join(' '),
                    customFields: {
                        appointmentDate: formattedDate,
                        appointmentTime: appointment.time,
                        attorneyName: appointment.attorneyName,
                        appointmentType: appointment.type,
                        appointmentLocation: appointment.location || 'Phone Consultation',
                    },
                    tags: ['appointment-reminder', appointment.type],
                });
            }
            else {
                // Fallback to direct SMS
                const message = this.formatAppointmentReminder(appointment);
                await this.sendSMS({
                    to: appointment.clientPhone,
                    body: message,
                    tags: ['appointment-reminder', appointment.type],
                });
            }
            // Update appointment record
            await (0, prisma_1.getPrismaClient)().appointment.update({
                where: { id: appointment.id },
                data: {
                    metadata: {
                        reminderSent: true,
                        reminderSentAt: new Date().toISOString(),
                        reminderProvider: 'gohighlevel',
                    },
                },
            });
            logger_1.logger.info('Appointment reminder sent', {
                appointmentId: appointment.id,
                phone: appointment.clientPhone,
            });
        }
        catch (error) {
            logger_1.logger.error('Failed to send appointment reminder:', error);
            throw error;
        }
    }
    // Send case update
    async sendCaseUpdate(caseInfo) {
        try {
            // If we have a campaign ID, use it
            if (this.campaignIds.caseUpdate) {
                await gohighlevel_1.ghlService.addToCampaignByPhone(caseInfo.clientPhone, this.campaignIds.caseUpdate, {
                    firstName: caseInfo.clientName.split(' ')[0],
                    lastName: caseInfo.clientName.split(' ').slice(1).join(' '),
                    customFields: {
                        caseNumber: caseInfo.caseNumber,
                        updateType: caseInfo.updateType,
                        updateMessage: caseInfo.message,
                    },
                    tags: ['case-update', caseInfo.updateType.toLowerCase().replace(/\s+/g, '-')],
                });
            }
            else {
                // Fallback to direct SMS
                const body = `Hello ${caseInfo.clientName},

Case Update (${caseInfo.caseNumber}):
${caseInfo.updateType}

${caseInfo.message}

Questions? Call 1-844-YO-PELEO or visit vasquezlawnc.com

- Vasquez Law Firm`;
                await this.sendSMS({
                    to: caseInfo.clientPhone,
                    body,
                    tags: ['case-update', caseInfo.updateType.toLowerCase().replace(/\s+/g, '-')],
                });
            }
            logger_1.logger.info('Case update sent', {
                caseNumber: caseInfo.caseNumber,
                phone: caseInfo.clientPhone,
            });
        }
        catch (error) {
            logger_1.logger.error('Failed to send case update:', error);
            throw error;
        }
    }
    // Send welcome message to new contact
    async sendWelcomeMessage(contact) {
        try {
            if (this.campaignIds.welcomeMessage) {
                await gohighlevel_1.ghlService.addToCampaignByPhone(contact.phone, this.campaignIds.welcomeMessage, {
                    firstName: contact.name.split(' ')[0],
                    lastName: contact.name.split(' ').slice(1).join(' '),
                    email: contact.email,
                    source: contact.source || 'Website',
                    tags: ['welcome-message', 'new-contact'],
                });
            }
            else {
                // Fallback to direct SMS
                const message = `Welcome to Vasquez Law Firm, ${contact.name}!

Thank you for contacting us. We're here to help with your legal needs.

Our team will review your inquiry and contact you within 24 hours.

For immediate assistance:
📞 1-844-YO-PELEO
🌐 vasquezlawnc.com

Se habla español`;
                await this.sendSMS({
                    to: contact.phone,
                    body: message,
                    tags: ['welcome-message', 'new-contact'],
                });
            }
        }
        catch (error) {
            logger_1.logger.error('Failed to send welcome message:', error);
            throw error;
        }
    }
    // Format appointment reminder message
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
        }
        else {
            message += '\n\nThis is a phone consultation. We will call you at this number.';
        }
        message += '\n\nNeed to reschedule? Call 1-844-YO-PELEO';
        return message;
    }
    // Notify attorneys
    async notifyAttorneys(message, urgency = 'medium') {
        try {
            // Get all attorneys with phone numbers
            const attorneys = await (0, prisma_1.getPrismaClient)().user.findMany({
                where: {
                    role: 'ATTORNEY',
                    phone: { not: null },
                },
            });
            const phoneNumbers = attorneys.map(a => a.phone).filter((p) => p !== null);
            if (phoneNumbers.length > 0) {
                const prefix = urgency === 'high' ? '🚨 URGENT: ' : '';
                const tags = ['attorney-notification', `urgency-${urgency}`];
                await this.sendBulkSMS({
                    recipients: phoneNumbers,
                    body: prefix + message,
                    tags,
                });
            }
        }
        catch (error) {
            logger_1.logger.error('Failed to notify attorneys:', error);
        }
    }
    // Make outbound call via GoHighLevel
    async makeCall(options) {
        try {
            // GoHighLevel typically handles calls through campaigns
            if (options.campaignId) {
                await gohighlevel_1.ghlService.addToCampaignByPhone(options.to, options.campaignId, {
                    tags: options.tags || ['outbound-call'],
                });
                logger_1.logger.info('Call campaign triggered via GoHighLevel', {
                    to: options.to,
                    campaignId: options.campaignId,
                });
            }
            else {
                logger_1.logger.warn('No campaign ID provided for call - GoHighLevel requires campaign for calls');
                throw new Error('Campaign ID required for making calls via GoHighLevel');
            }
        }
        catch (error) {
            logger_1.logger.error('Failed to make call via GoHighLevel:', error);
            throw error;
        }
    }
}
exports.GHLNotificationService = GHLNotificationService;
// Export singleton instance
exports.ghlNotificationService = new GHLNotificationService();
