import { NextRequest, NextResponse } from 'next/server';
import { getCrewCoordinator } from '@/lib/crewai/crew-coordinator';
import { CompetitorAnalysisRequest } from '@/lib/crewai/agents/competitive-analysis-agent';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const competitiveAnalysisRequest: CompetitorAnalysisRequest = {
      practiceArea: body.practiceArea,
      location: body.location,
      analysisType: body.analysisType || 'comprehensive',
      competitors: body.competitors,
      language: body.language || 'en',
      depth: body.depth || 'detailed',
    };

    // Validate required fields
    if (!competitiveAnalysisRequest.practiceArea || !competitiveAnalysisRequest.location) {
      return NextResponse.json(
        { error: 'Missing required fields: practiceArea, location' },
        { status: 400 }
      );
    }

    // Create competitive analysis task
    const taskId = await getCrewCoordinator().createCompetitiveAnalysisTask(
      body.userId || 'system',
      competitiveAnalysisRequest,
      body.urgent ? 'urgent' : 'medium'
    );

    logger.info(
      `Created competitive analysis task ${taskId} for ${competitiveAnalysisRequest.practiceArea} in ${competitiveAnalysisRequest.location}`
    );

    return NextResponse.json({
      taskId,
      status: 'created',
      message: 'Competitive analysis has been queued',
      analysis: {
        practiceArea: competitiveAnalysisRequest.practiceArea,
        location: competitiveAnalysisRequest.location,
        analysisType: competitiveAnalysisRequest.analysisType,
        depth: competitiveAnalysisRequest.depth,
      },
    });
  } catch (error) {
    logger.error('Competitive analysis API error:', error);
    return NextResponse.json({ error: 'Failed to start competitive analysis' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get('taskId');
    const action = searchParams.get('action');

    if (action === 'queue-status') {
      const queueStatus = getCrewCoordinator().getQueueStatus();
      return NextResponse.json(queueStatus);
    }

    if (!taskId) {
      return NextResponse.json({ error: 'Task ID is required for status check' }, { status: 400 });
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
    logger.error('Competitive analysis status check error:', error);
    return NextResponse.json({ error: 'Failed to check task status' }, { status: 500 });
  }
}
