import { NextRequest, NextResponse } from 'next/server';
import { getCrewCoordinator } from '@/lib/crewai/crew-coordinator';
import { SocialMediaMonitoringRequest } from '@/lib/crewai/agents/social-media-monitoring-agent';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const socialMediaRequest: SocialMediaMonitoringRequest = {
      practiceAreas: body.practiceAreas || [],
      platforms: body.platforms || ['twitter', 'linkedin', 'facebook'],
      keywords: body.keywords || [],
      location: body.location,
      timeframe: body.timeframe || 'last7days',
      language: body.language || 'en',
      sentimentFilter: body.sentimentFilter || 'all',
      engagementThreshold: body.engagementThreshold || 10,
    };

    // Validate required fields
    if (!socialMediaRequest.practiceAreas.length || !socialMediaRequest.platforms.length) {
      return NextResponse.json(
        { error: 'Missing required fields: practiceAreas, platforms' },
        { status: 400 }
      );
    }

    // Create social media monitoring task
    const taskId = await getCrewCoordinator().createSocialMediaMonitoringTask(
      body.userId || 'system',
      socialMediaRequest,
      body.urgent ? 'urgent' : 'medium'
    );

    logger.info(
      `Created social media monitoring task ${taskId} for practice areas: ${socialMediaRequest.practiceAreas.join(', ')}`
    );

    return NextResponse.json({
      taskId,
      status: 'created',
      message: 'Social media monitoring has been queued',
      monitoring: {
        practiceAreas: socialMediaRequest.practiceAreas,
        platforms: socialMediaRequest.platforms,
        timeframe: socialMediaRequest.timeframe,
        keywords: socialMediaRequest.keywords,
      },
    });
  } catch (error) {
    logger.error('Social media monitoring API error:', errorToLogMeta(error));
    return NextResponse.json({ error: 'Failed to start social media monitoring' }, { status: 500 });
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

    if (action === 'trending-topics') {
      // Get recent social media monitoring results
      // This would typically fetch from database
      return NextResponse.json({
        trendingTopics: [
          {
            topic: 'Immigration Policy Updates',
            engagement: 1250,
            sentiment: 'mixed',
            platforms: ['twitter', 'linkedin'],
            relevance: 'high',
          },
          {
            topic: 'Personal Injury Claims Process',
            engagement: 850,
            sentiment: 'positive',
            platforms: ['facebook', 'reddit'],
            relevance: 'medium',
          },
        ],
        lastUpdated: new Date().toISOString(),
      });
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
    logger.error('Social media monitoring status check error:', errorToLogMeta(error));
    return NextResponse.json({ error: 'Failed to check task status' }, { status: 500 });
  }
}
