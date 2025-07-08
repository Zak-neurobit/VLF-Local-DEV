import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { logger } from '@/lib/logger';
import { ghlService } from '@/services/gohighlevel';
import { callRouter } from '@/services/retell/call-router';
import { statusManager } from '@/services/retell/status-manager';
import { retellErrorHandler } from '@/services/retell/error-handler';

// Webhook payload schema from GoHighLevel
const TriggerCallPayloadSchema = z.object({
  contactId: z.string(),
  contact: z.object({
    firstName: z.string(),
    lastName: z.string(),
    phone: z.string(),
    email: z.string().email().optional(),
    tags: z.array(z.string()).optional(),
    customFields: z.record(z.any()).optional(),
  }),
  campaignId: z.string().optional(),
  practiceArea: z.string().optional(),
  preferredLanguage: z.enum(['en', 'es']).default('en'),
  callType: z.enum(['consultation', 'follow-up', 'appointment-reminder', 'general']).default('general'),
  metadata: z.record(z.any()).optional(),
});

interface TriggerCallPayload {
  contactId: string;
  contact: {
    firstName: string;
    lastName: string;
    phone: string;
    email?: string;
    tags?: string[];
    customFields?: Record<string, unknown>;
  };
  campaignId?: string;
  practiceArea?: string;
  preferredLanguage?: 'en' | 'es';
  callType?: 'consultation' | 'follow-up' | 'appointment-reminder' | 'general';
  metadata?: Record<string, unknown>;
}

export async function POST(_request: NextRequest) {
  let body: TriggerCallPayload | undefined;
  try {
    // Parse request body
    body = await _request.json();
    
    logger.info('GHL trigger call webhook received', {
      contactId: body?.contactId,
      campaignId: body?.campaignId,
    });

    // Validate payload
    const payload = TriggerCallPayloadSchema.parse(body);

    // Use enhanced call routing
    const routingOptions = {
      phoneNumber: payload.contact.phone,
      practiceArea: payload.practiceArea,
      language: payload.preferredLanguage,
      sourceType: 'referral' as const, // Using referral for GHL campaigns
      metadata: {
        ghlContactId: payload.contactId,
        ghlCampaignId: payload.campaignId,
        contactName: `${payload.contact.firstName} ${payload.contact.lastName}`,
        contactEmail: payload.contact.email,
        callType: payload.callType,
        tags: payload.contact.tags,
        customFields: payload.contact.customFields,
        ...payload.metadata,
      },
    };

    // Create routed call
    const { callId, routeDecision } = await callRouter.createRoutedCall(routingOptions);

    // Update call status
    await statusManager.updateCallStatus(callId, 'queued', {
      ghlContactId: payload.contactId,
      ghlCampaignId: payload.campaignId,
      routeDecision,
    });

    // Update GHL contact with call information
    await ghlService.upsertContact({
      firstName: payload.contact.firstName,
      lastName: payload.contact.lastName,
      phone: payload.contact.phone,
      email: payload.contact.email,
      customFields: {
        ...payload.contact.customFields,
        lastCallId: callId,
        lastCallDate: new Date().toISOString(),
        lastCallType: payload.callType,
        lastCallAgent: routeDecision.agentId,
        lastCallPriority: routeDecision.priority,
        lastCallPracticeArea: routeDecision.practiceArea,
      },
    });

    // Add note to GHL contact
    await ghlService.addNote(
      payload.contactId,
      `Outbound call initiated via Retell AI. Call ID: ${callId}, Type: ${payload.callType}, Agent: ${routeDecision.agentName}, Priority: ${routeDecision.priority}, Practice Area: ${routeDecision.practiceArea}`
    );

    // Create a task for follow-up if needed
    if (payload.callType === 'consultation' || routeDecision.callbackRequired) {
      await ghlService.createTask({
        contactId: payload.contactId,
        title: routeDecision.callbackRequired ? 'Priority follow-up required' : 'Follow up on consultation call',
        body: `Follow up on ${payload.callType} call made on ${new Date().toLocaleDateString()}. ${routeDecision.specialInstructions || 'Review call transcript and schedule appointment if needed.'}`,
        dueDate: new Date(Date.now() + (routeDecision.callbackRequired ? 2 : 24) * 60 * 60 * 1000),
      });
    }

    logger.info('Enhanced Retell call created successfully', {
      callId,
      contactId: payload.contactId,
      agentId: routeDecision.agentId,
      agentName: routeDecision.agentName,
      practiceArea: routeDecision.practiceArea,
      priority: routeDecision.priority,
    });

    // Return success response
    return NextResponse.json({
      success: true,
      callId,
      agentId: routeDecision.agentId,
      agentName: routeDecision.agentName,
      practiceArea: routeDecision.practiceArea,
      priority: routeDecision.priority,
      language: routeDecision.language,
      callbackRequired: routeDecision.callbackRequired,
      message: 'Call initiated successfully with enhanced routing',
    });

  } catch (error) {
    // Use enhanced error handler
    await retellErrorHandler.handleError(error, {
      operation: 'trigger_call',
      contactId: body?.contactId,
      metadata: { campaignId: body?.campaignId, callType: body?.callType },
    });
    
    logger.error('Failed to trigger Retell call from GHL:', error);
    
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
        error: error instanceof Error ? error.message : 'Failed to trigger call',
      },
      { status: 500 }
    );
  }
}

// Handle webhook signature verification
export async function OPTIONS(_request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}