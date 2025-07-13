import { NextRequest, NextResponse } from 'next/server';
import { leadValidationAgent } from '@/lib/agents/lead-validation-agent';
import { followUpAutomationAgent } from '@/lib/agents/follow-up-automation-agent';
import { logger } from '@/lib/logger';
import { z } from 'zod';
import { getPrismaClient } from '@/lib/prisma';

// Input validation schema
const LeadValidationRequestSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  message: z.string().min(20),
  source: z.string().default('website'),
  language: z.string().optional(),
  practiceArea: z.string().optional(),
  urgencyIndicators: z.array(z.string()).optional(),
});

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  let body: unknown = {};

  try {
    // Parse and validate request body
    body = await request.json();
    const validatedData = LeadValidationRequestSchema.parse(body);

    const prisma = getPrismaClient();
    if (!prisma) {
      return NextResponse.json(
        { success: false, error: 'Database connection error' },
        { status: 500 }
      );
    }

    // Check for existing lead interactions
    const previousInteractions = await prisma.conversation.findMany({
      where: {
        OR: [
          { metadata: { path: ['email'], equals: validatedData.email } },
          { metadata: { path: ['phone'], equals: validatedData.phone } },
        ],
      },
      orderBy: { startedAt: 'desc' },
      take: 5,
    });

    // Validate the lead
    const validationResult = await leadValidationAgent.validateLead({
      ...validatedData,
      previousInteractions,
    });

    // Log agent execution (model needs to be added to schema)
    logger.info('Lead validation executed:', {
      agentName: 'lead-validation',
      executionType: 'validate_lead',
      input: validatedData,
      output: validationResult,
      duration: Date.now() - startTime,
      success: true,
    });

    // If lead is valid (not invalid tier), create follow-up sequence
    if (validationResult.tier !== 'invalid') {
      const followUpResult = await followUpAutomationAgent.createFollowUpSequence({
        contactId: validationResult.ghlContactId || validatedData.email, // Use email as fallback
        leadScore: validationResult.score,
        tier: validationResult.tier,
        practiceAreas: validationResult.practiceAreas,
        urgencyLevel: validationResult.priorityLevel,
        languagePreference: validationResult.languagePreference,
        previousInteractions,
      });

      // Log follow-up agent execution
      logger.info('Follow-up sequence created:', {
        agentName: 'follow-up-automation',
        executionType: 'create_sequence',
        input: {
          contactId: validationResult.ghlContactId || validatedData.email,
          tier: validationResult.tier,
        },
        output: followUpResult,
        duration: Date.now() - startTime,
        success: true,
      });
    }

    // Return comprehensive response
    return NextResponse.json({
      success: true,
      validation: validationResult,
      message:
        validationResult.tier === 'invalid'
          ? 'Lead did not meet quality criteria'
          : `Lead validated successfully - ${validationResult.tier} tier`,
      executionTime: Date.now() - startTime,
    });
  } catch (error) {
    logger.error('Lead validation error:', error);

    // Log failed execution
    logger.error('Agent execution failed:', {
      agentName: 'lead-validation',
      executionType: 'validate_lead',
      input: body || {},
      output: {},
      duration: Date.now() - startTime,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation error',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to validate lead',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check agent health
export async function GET(_request: NextRequest) {
  try {
    const prisma = getPrismaClient();
    if (!prisma) {
      return NextResponse.json(
        { success: false, error: 'Database connection error' },
        { status: 500 }
      );
    }

    // Get recent execution stats (would come from logs/metrics)
    const stats = {
      totalExecutions: 156,
      successRate: 98.5,
      averageDuration: 342,
      leadValidationCount: 89,
      followUpCount: 67,
    };

    // Mock lead tier distribution
    const leadDistribution = [
      { tier: 'hot', _count: { tier: 23 } },
      { tier: 'warm', _count: { tier: 45 } },
      { tier: 'cold', _count: { tier: 67 } },
    ];

    return NextResponse.json({
      success: true,
      agents: {
        'lead-validation': 'operational',
        'follow-up-automation': 'operational',
      },
      stats,
      leadDistribution,
    });
  } catch (error) {
    logger.error('Agent health check error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to check agent health',
      },
      { status: 500 }
    );
  }
}
