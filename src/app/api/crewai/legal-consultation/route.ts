import { NextRequest, NextResponse } from 'next/server';
import { getCrewCoordinator } from '@/lib/crewai/crew-coordinator';
import { LegalConsultationRequest } from '@/lib/crewai/agents/legal-consultation-agent';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const consultationRequest: LegalConsultationRequest = {
      userId: body.userId,
      language: body.language || 'en',
      caseType: body.caseType,
      description: body.description,
      urgency: body.urgency || 'medium',
      location: body.location,
    };

    // Validate required fields
    if (
      !consultationRequest.userId ||
      !consultationRequest.caseType ||
      !consultationRequest.description
    ) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, caseType, description' },
        { status: 400 }
      );
    }

    // Create task
    const taskId = await getCrewCoordinator().createLegalConsultationTask(
      consultationRequest.userId,
      consultationRequest,
      consultationRequest.urgency === 'high' ? 'high' : 'medium'
    );

    logger.info(`Created legal consultation task ${taskId} for user ${consultationRequest.userId}`);

    return NextResponse.json({
      taskId,
      status: 'created',
      message: 'Legal consultation analysis has been queued',
    });
  } catch (error) {
    logger.error('Legal consultation API error:', error);
    return NextResponse.json(
      { error: 'Failed to process legal consultation request' },
      { status: 500 }
    );
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

    return NextResponse.json({
      taskId: task.id,
      status: task.status,
      result: task.result,
      error: task.error,
      createdAt: task.createdAt,
      completedAt: task.completedAt,
    });
  } catch (error) {
    logger.error('Legal consultation status check error:', error);
    return NextResponse.json({ error: 'Failed to check task status' }, { status: 500 });
  }
}
