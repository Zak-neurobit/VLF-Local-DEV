import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { logger } from '@/lib/logger';
import { ghlService } from '@/services/gohighlevel';
import { getPrismaClient } from '@/lib/prisma';

// Webhook payload schema for SMS coordination
const SendSMSPayloadSchema = z.object({
  contactId: z.string(),
  message: z.string(),
  templateId: z.string().optional(),
  triggerType: z.enum(['post-call', 'appointment-reminder', 'follow-up', 'custom']).default('custom'),
  callId: z.string().optional(), // Retell call ID if this is post-call SMS
  metadata: z.record(z.any()).optional(),
});

// SMS templates based on trigger type
const SMS_TEMPLATES = {
  'post-call': {
    en: 'Thank you for speaking with Vasquez Law Firm today. We\'re here to help with your {{practiceArea}} case. If you have any questions, reply to this message or call 1-844-YO-PELEO.',
    es: 'Gracias por hablar con Vasquez Law Firm hoy. Estamos aquí para ayudarle con su caso de {{practiceArea}}. Si tiene preguntas, responda a este mensaje o llame al 1-844-YO-PELEO.',
  },
  'appointment-reminder': {
    en: 'Reminder: Your appointment with {{attorneyName}} is scheduled for {{date}} at {{time}}. Reply CONFIRM to confirm or call 1-844-YO-PELEO to reschedule.',
    es: 'Recordatorio: Su cita con {{attorneyName}} está programada para {{date}} a las {{time}}. Responda CONFIRMAR para confirmar o llame al 1-844-YO-PELEO para reprogramar.',
  },
  'follow-up': {
    en: 'Hi {{firstName}}, following up on our recent conversation about your {{practiceArea}} case. Do you have any questions or would you like to schedule a consultation? Reply or call 1-844-YO-PELEO.',
    es: 'Hola {{firstName}}, seguimiento a nuestra conversación reciente sobre su caso de {{practiceArea}}. ¿Tiene alguna pregunta o le gustaría programar una consulta? Responda o llame al 1-844-YO-PELEO.',
  },
};

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    logger.info('GHL send SMS webhook received', {
      contactId: body.contactId,
      triggerType: body.triggerType,
    });

    // Validate payload
    const payload = SendSMSPayloadSchema.parse(body);

    // Get contact information from GHL
    const contactResponse = await fetch(`${process.env.GHL_API_URL}/contacts/${payload.contactId}`, {
      headers: {
        'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!contactResponse.ok) {
      throw new Error('Contact not found in GoHighLevel');
    }

    const contact = await contactResponse.json();

    // Prepare message
    let message = payload.message;

    // Use template if no custom message provided
    if (!message && payload.templateId) {
      // Get template from GHL or use our predefined ones
      const template = SMS_TEMPLATES[payload.triggerType as keyof typeof SMS_TEMPLATES];
      const language = contact.customFields?.preferredLanguage || 'en';
      message = template?.[language as keyof typeof template] || template?.en || '';

      // Replace template variables
      const variables = {
        firstName: contact.firstName,
        lastName: contact.lastName,
        practiceArea: contact.customFields?.practiceArea || 'legal',
        attorneyName: contact.customFields?.assignedAttorney || 'our attorney',
        date: contact.customFields?.appointmentDate || 'TBD',
        time: contact.customFields?.appointmentTime || 'TBD',
        ...payload.metadata,
      };

      for (const [key, value] of Object.entries(variables)) {
        message = message.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
      }
    }

    if (!message) {
      throw new Error('No message content provided');
    }

    // If this is a post-call SMS, get call information
    let callData = null;
    if (payload.callId) {
      const prisma = getPrismaClient();
      const voiceCall = await prisma.voiceCall.findUnique({
        where: { retellCallId: payload.callId },
      });

      if (voiceCall) {
        callData = voiceCall;
        
        // Update call record with SMS sent status
        await prisma.voiceCall.update({
          where: { id: voiceCall.id },
          data: {
            metadata: {
              ...((voiceCall.metadata as object) || {}),
              smsSent: true,
              smsSentAt: new Date().toISOString(),
              smsType: payload.triggerType,
            },
          },
        });
      }
    }

    // Send SMS via GHL
    const smsResult = await ghlService.sendSMS({
      contactId: payload.contactId,
      message,
      templateId: payload.templateId,
    });

    // Log SMS in database
    const prisma = getPrismaClient();
    await prisma.smsLog.create({
      data: {
        ghlContactId: payload.contactId,
        ghlMessageId: smsResult.messageId,
        to: contact.phone,
        from: process.env.GHL_SMS_PHONE_NUMBER || '+18449673536',
        body: message,
        status: 'sent',
        direction: 'outbound',
        triggerType: payload.triggerType,
        relatedCallId: payload.callId,
        templateId: payload.templateId,
        metadata: {
          ...payload.metadata,
          templateId: payload.templateId,
          contactName: `${contact.firstName} ${contact.lastName}`,
        },
      },
    });

    // Update contact in GHL with SMS activity
    await ghlService.upsertContact({
      firstName: contact.firstName,
      lastName: contact.lastName,
      phone: contact.phone,
      email: contact.email,
      customFields: {
        ...contact.customFields,
        lastSMSDate: new Date().toISOString(),
        lastSMSType: payload.triggerType,
        smsOptIn: true,
      },
    });

    // Add note to contact
    await ghlService.addNote(
      payload.contactId,
      `SMS sent: ${payload.triggerType}. Message: "${message.substring(0, 100)}..."`
    );

    // If this is a follow-up SMS, create a task
    if (payload.triggerType === 'follow-up') {
      await ghlService.createTask({
        contactId: payload.contactId,
        title: 'Check SMS follow-up response',
        body: `Check if contact responded to follow-up SMS sent on ${new Date().toLocaleDateString()}`,
        dueDate: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48 hours from now
      });
    }

    logger.info('SMS sent successfully', {
      contactId: payload.contactId,
      messageId: smsResult.messageId,
      triggerType: payload.triggerType,
    });

    // Return success response
    return NextResponse.json({
      success: true,
      messageId: smsResult.messageId,
      message: 'SMS sent successfully',
    });

  } catch (error) {
    logger.error('Failed to send SMS from GHL:', error);
    
    // If it's a validation error, return 400
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid payload',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    // Return error response
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send SMS',
      },
      { status: 500 }
    );
  }
}

// Handle webhook signature verification
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}