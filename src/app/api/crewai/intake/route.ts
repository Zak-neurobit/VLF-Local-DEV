import { NextRequest, NextResponse } from 'next/server';
import { getCrewCoordinator } from '@/lib/crewai/crew-coordinator';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { clientInput, isEmergency, language = 'en', userId = 'anonymous' } = body;

    if (!clientInput) {
      return NextResponse.json({ error: 'Client input is required' }, { status: 400 });
    }

    // Create intake task using CrewCoordinator
    const coordinator = getCrewCoordinator();
    const taskId = await coordinator.createLegalConsultationTask(
      userId,
      {
        userId,
        language: language as 'en' | 'es',
        caseType: 'General Legal Consultation',
        description: clientInput,
        urgency: isEmergency ? 'high' : 'medium',
        location: 'virtual',
      },
      isEmergency ? 'urgent' : 'medium'
    );

    // Wait a moment for initial processing
    await new Promise(resolve => setTimeout(resolve, 100));

    // Get task status
    const taskStatus = coordinator.getTaskStatus(taskId);

    return NextResponse.json({
      success: true,
      taskId,
      status: taskStatus?.status || 'queued',
      message: isEmergency
        ? 'Emergency intake received. Processing immediately.'
        : 'Intake received. Processing your request.',
      estimatedWait: isEmergency ? '< 5 minutes' : '5-15 minutes',
    });
  } catch (error) {
    logger.error('Intake API error:', error);
    return NextResponse.json({ error: 'Failed to process intake' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const taskId = searchParams.get('taskId');

    if (!taskId) {
      // Return queue status
      const coordinator = getCrewCoordinator();
      const queueStatus = coordinator.getQueueStatus();
      return NextResponse.json({
        success: true,
        queueStatus,
      });
    }

    // Get specific task status
    const coordinator = getCrewCoordinator();
    const task = coordinator.getTaskStatus(taskId);

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      task: {
        id: task.id,
        type: task.type,
        status: task.status,
        priority: task.priority,
        createdAt: task.createdAt,
        completedAt: task.completedAt,
        result: task.result,
        error: task.error,
      },
    });
  } catch (error) {
    logger.error('Intake status API error:', error);
    return NextResponse.json({ error: 'Failed to get status' }, { status: 500 });
  }
}
