import { NextRequest, NextResponse } from 'next/server';
import { getCrewCoordinator } from '@/lib/crewai/crew-coordinator';
import { LegalConsultationRequest } from '@/lib/crewai/agents/legal-consultation-agent';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const initialConsultation: LegalConsultationRequest = {
      userId: body.userId,
      language: body.language || 'en',
      caseType: body.caseType,
      description: body.description,
      urgency: body.urgency || 'medium',
      location: body.location,
    };

    // Validate required fields
    if (
      !initialConsultation.userId ||
      !initialConsultation.caseType ||
      !initialConsultation.description
    ) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, caseType, description' },
        { status: 400 }
      );
    }

    // Create client intake workflow
    const taskId = await getCrewCoordinator().createClientIntakeWorkflow(
      initialConsultation.userId,
      initialConsultation
    );

    logger.info(`Created client intake workflow ${taskId} for user ${initialConsultation.userId}`);

    return NextResponse.json({
      taskId,
      status: 'created',
      message: 'Client intake workflow has been started',
      workflow: {
        steps: [
          'Legal consultation analysis',
          'Appointment scheduling optimization',
          'Follow-up recommendations',
        ],
      },
    });
  } catch (error) {
    logger.error('Client intake workflow API error:', error);
    return NextResponse.json({ error: 'Failed to start client intake workflow' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get('taskId');

    if (!taskId) {
      return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
    }

    const task = getCrewCoordinator().getTaskStatus(taskId);

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    // For multi-step workflows, provide detailed progress
    let progress = null;
    if (task.type === 'multi-step' && task.data) {
      const workflow = task.data as {
        steps: Array<{ agent: string; action: string; data: unknown }>;
        currentStep: number;
        results: unknown[];
      };
      progress = {
        totalSteps: workflow.steps.length,
        currentStep: workflow.currentStep,
        completedSteps: workflow.results.length,
        stepProgress: workflow.steps.map((step, index: number) => ({
          step: index + 1,
          agent: step.agent,
          action: step.action,
          status:
            index < workflow.currentStep
              ? 'completed'
              : index === workflow.currentStep
                ? 'in-progress'
                : 'pending',
        })),
      };
    }

    return NextResponse.json({
      taskId: task.id,
      status: task.status,
      result: task.result,
      progress,
      error: task.error,
      createdAt: task.createdAt,
      completedAt: task.completedAt,
    });
  } catch (error) {
    logger.error('Client intake workflow status check error:', error);
    return NextResponse.json({ error: 'Failed to check workflow status' }, { status: 500 });
  }
}
