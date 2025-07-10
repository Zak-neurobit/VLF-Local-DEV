'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.appointmentReminderService = exports.AppointmentReminderService = void 0;
const prisma_1 = require('../../lib/prisma');
const gohighlevel_1 = require('../../services/gohighlevel');
const email_1 = require('../../services/email');
const logger_1 = require('../../lib/logger');
const date_fns_1 = require('date-fns');
class AppointmentReminderService {
  // Send reminders for appointments
  async sendUpcomingReminders() {
    try {
      // Get appointments for tomorrow
      const tomorrow = (0, date_fns_1.addDays)(new Date(), 1);
      const appointments = await this.getAppointmentsForDate(tomorrow);
      logger_1.logger.info(`Found ${appointments.length} appointments for reminder`);
      for (const appointment of appointments) {
        await this.sendReminder(appointment);
      }
      // Get appointments for 1 week out
      const nextWeek = (0, date_fns_1.addDays)(new Date(), 7);
      const weeklyAppointments = await this.getAppointmentsForDate(nextWeek);
      for (const appointment of weeklyAppointments) {
        await this.sendWeeklyReminder(appointment);
      }
    } catch (error) {
      logger_1.logger.error('Failed to send appointment reminders:', error);
    }
  }
  // Get appointments for a specific date
  async getAppointmentsForDate(date) {
    return prisma_1.prisma.appointment.findMany({
      where: {
        date: {
          gte: (0, date_fns_1.startOfDay)(date),
          lte: (0, date_fns_1.endOfDay)(date),
        },
        status: 'scheduled',
        reminderSent: false,
      },
      include: {
        client: true,
        attorney: true,
      },
    });
  }
  // Send 24-hour reminder
  async sendReminder(appointment) {
    try {
      const client = appointment.client;
      // Send SMS via GHL if phone number available
      if (client.phoneNumber && !client.smsOptOut) {
        await gohighlevel_1.ghlService.sendAppointmentReminder({
          id: appointment.id,
          clientPhone: client.phoneNumber,
          clientName: `${client.firstName} ${client.lastName}`,
          date: appointment.date,
          time: appointment.time,
          attorneyName: `${appointment.attorney.firstName} ${appointment.attorney.lastName}`,
          type: appointment.type,
          location: appointment.location,
        });
      }
      // Send email reminder
      if (client.email) {
        await email_1.emailService.sendEmail({
          to: client.email,
          subject: 'Appointment Reminder - Vasquez Law Firm',
          template: 'appointment-reminder',
          data: {
            clientName: `${client.firstName} ${client.lastName}`,
            appointmentDate: appointment.date,
            appointmentTime: appointment.time,
            attorneyName: `${appointment.attorney.firstName} ${appointment.attorney.lastName}`,
            appointmentType: appointment.type,
            location: appointment.location || 'Phone consultation',
            notes: appointment.notes,
          },
        });
      }
      // Mark reminder as sent
      await prisma_1.prisma.appointment.update({
        where: { id: appointment.id },
        data: {
          reminderSent: true,
          reminderSentAt: new Date(),
        },
      });
      logger_1.logger.info('Appointment reminder sent', {
        appointmentId: appointment.id,
        clientId: client.id,
      });
    } catch (error) {
      logger_1.logger.error('Failed to send appointment reminder:', error);
    }
  }
  // Send 1-week reminder
  async sendWeeklyReminder(appointment) {
    try {
      const client = appointment.client;
      // Only send email for weekly reminders
      if (client.email) {
        await email_1.emailService.sendEmail({
          to: client.email,
          subject: 'Upcoming Appointment - Vasquez Law Firm',
          template: 'appointment-reminder-weekly',
          data: {
            clientName: `${client.firstName} ${client.lastName}`,
            appointmentDate: appointment.date,
            appointmentTime: appointment.time,
            attorneyName: `${appointment.attorney.firstName} ${appointment.attorney.lastName}`,
            appointmentType: appointment.type,
            documentsNeeded: this.getRequiredDocuments(appointment.type),
          },
        });
      }
    } catch (error) {
      logger_1.logger.error('Failed to send weekly reminder:', error);
    }
  }
  // Handle appointment confirmation
  async handleConfirmation(phoneNumber, appointmentId) {
    try {
      const appointment = await prisma_1.prisma.appointment.findUnique({
        where: { id: appointmentId },
        include: { client: true },
      });
      if (!appointment) {
        return 'Appointment not found.';
      }
      // Verify phone number matches
      if (appointment.client.phoneNumber !== phoneNumber) {
        return 'Phone number does not match appointment.';
      }
      // Update appointment status
      await prisma_1.prisma.appointment.update({
        where: { id: appointmentId },
        data: {
          confirmed: true,
          confirmedAt: new Date(),
        },
      });
      return 'Thank you! Your appointment has been confirmed. We look forward to seeing you.';
    } catch (error) {
      logger_1.logger.error('Failed to confirm appointment:', error);
      return 'Sorry, we could not confirm your appointment. Please call our office.';
    }
  }
  // Handle appointment cancellation
  async handleCancellation(phoneNumber, appointmentId) {
    try {
      const appointment = await prisma_1.prisma.appointment.findUnique({
        where: { id: appointmentId },
        include: { client: true, attorney: true },
      });
      if (!appointment) {
        return 'Appointment not found.';
      }
      // Verify phone number matches
      if (appointment.client.phoneNumber !== phoneNumber) {
        return 'Phone number does not match appointment.';
      }
      // Update appointment status
      await prisma_1.prisma.appointment.update({
        where: { id: appointmentId },
        data: {
          status: 'cancelled',
          cancelledAt: new Date(),
          cancelReason: 'Client requested via SMS',
        },
      });
      // Notify attorney via GHL
      if (appointment.attorney.phoneNumber) {
        await gohighlevel_1.ghlService.sendSMSByPhone(
          appointment.attorney.phoneNumber,
          `Appointment cancelled: ${appointment.client.firstName} ${appointment.client.lastName} on ${appointment.date} at ${appointment.time}`,
          ['attorney-notification', 'appointment-cancelled']
        );
      }
      return 'Your appointment has been cancelled. Please call 1-844-YO-PELEO to reschedule.';
    } catch (error) {
      logger_1.logger.error('Failed to cancel appointment:', error);
      return 'Sorry, we could not cancel your appointment. Please call our office.';
    }
  }
  // Get required documents based on appointment type
  getRequiredDocuments(appointmentType) {
    const documentMap = {
      'immigration-consultation': [
        'Passport',
        'Current visa (if applicable)',
        'I-94 arrival record',
        'Any immigration notices',
      ],
      'personal-injury-consultation': [
        'Police report',
        'Medical records',
        'Insurance information',
        'Photos of injuries/damage',
      ],
      'criminal-defense-consultation': [
        'Court documents',
        'Police report',
        'Bail paperwork',
        'Any notices received',
      ],
      'family-law-consultation': [
        'Marriage certificate',
        'Financial documents',
        'Custody agreements (if applicable)',
        'Property deeds',
      ],
    };
    return documentMap[appointmentType] || ['Government-issued ID'];
  }
  // Send follow-up after appointment
  async sendFollowUpSurvey(appointmentId) {
    try {
      const appointment = await prisma_1.prisma.appointment.findUnique({
        where: { id: appointmentId },
        include: { client: true },
      });
      if (!appointment || appointment.status !== 'completed') {
        return;
      }
      const client = appointment.client;
      // Send SMS survey via GHL
      if (client.phoneNumber && !client.smsOptOut) {
        // Trigger survey campaign
        const surveyCampaignId = process.env.GHL_SURVEY_CAMPAIGN_ID;
        if (surveyCampaignId) {
          await gohighlevel_1.ghlService.addToCampaignByPhone(
            client.phoneNumber,
            surveyCampaignId,
            {
              firstName: client.firstName,
              lastName: client.lastName,
              tags: ['appointment-survey', 'follow-up'],
              customFields: {
                appointmentId: appointment.id,
                appointmentDate: appointment.date.toISOString(),
              },
            }
          );
        } else {
          // Fallback to direct SMS
          await gohighlevel_1.ghlService.sendSMSByPhone(
            client.phoneNumber,
            `Thank you for visiting Vasquez Law Firm! How was your experience? Reply with a rating 1-5 (5 being excellent).`,
            ['survey-request']
          );
        }
      }
      // Send email survey
      if (client.email) {
        await email_1.emailService.sendEmail({
          to: client.email,
          subject: 'How was your appointment?',
          template: 'appointment-survey',
          data: {
            clientName: `${client.firstName} ${client.lastName}`,
            appointmentDate: appointment.date,
            surveyLink: `${process.env.NEXT_PUBLIC_APP_URL}/survey/${appointment.id}`,
          },
        });
      }
    } catch (error) {
      logger_1.logger.error('Failed to send follow-up survey:', error);
    }
  }
}
exports.AppointmentReminderService = AppointmentReminderService;
exports.appointmentReminderService = new AppointmentReminderService();
