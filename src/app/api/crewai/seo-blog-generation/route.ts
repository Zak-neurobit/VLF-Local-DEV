import { NextRequest, NextResponse } from 'next/server';
import { getCrewCoordinator } from '@/lib/crewai/crew-coordinator';
import { SEOBlogGenerationRequest } from '@/lib/crewai/agents/seo-blog-generation-agent';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const seoBlogRequest: SEOBlogGenerationRequest = {
      practiceArea: body.practiceArea,
      targetKeywords: body.targetKeywords || [],
      contentType: body.contentType || 'blog_post',
      targetAudience: body.targetAudience || 'potential_clients',
      tone: body.tone || 'professional',
      wordCount: body.wordCount || 1500,
      language: body.language || 'en',
      location: body.location,
      urgency: body.urgency || 'medium',
      includeCallToAction: body.includeCallToAction !== false,
      competitorAnalysis: body.competitorAnalysis || false,
      trendingTopics: body.trendingTopics || [],
      existingContent: body.existingContent,
    };

    // Validate required fields
    if (!seoBlogRequest.practiceArea || !seoBlogRequest.targetKeywords.length) {
      return NextResponse.json(
        { error: 'Missing required fields: practiceArea, targetKeywords' },
        { status: 400 }
      );
    }

    // Create SEO blog generation task
    const taskId = await getCrewCoordinator().createSEOBlogGenerationTask(
      body.userId || 'system',
      seoBlogRequest,
      seoBlogRequest.urgency === 'high' ? 'high' : 'medium'
    );

    logger.info(
      `Created SEO blog generation task ${taskId} for ${seoBlogRequest.practiceArea} with keywords: ${seoBlogRequest.targetKeywords.join(', ')}`
    );

    return NextResponse.json({
      taskId,
      status: 'created',
      message: 'SEO blog generation has been queued',
      blog: {
        practiceArea: seoBlogRequest.practiceArea,
        contentType: seoBlogRequest.contentType,
        targetKeywords: seoBlogRequest.targetKeywords,
        wordCount: seoBlogRequest.wordCount,
        tone: seoBlogRequest.tone,
        targetAudience: seoBlogRequest.targetAudience,
      },
    });
  } catch (error) {
    logger.error('SEO blog generation API error:', errorToLogMeta(error));
    return NextResponse.json({ error: 'Failed to start SEO blog generation' }, { status: 500 });
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

    if (action === 'keyword-suggestions') {
      const practiceArea = searchParams.get('practiceArea');
      const location = searchParams.get('location');

      // Mock keyword suggestions - in production would use SEO tools
      const suggestions = [
        `${practiceArea} lawyer ${location}`,
        `${practiceArea} attorney ${location}`,
        `best ${practiceArea} law firm ${location}`,
        `${practiceArea} legal advice`,
        `${practiceArea} consultation`,
      ].filter(Boolean);

      return NextResponse.json({
        keywords: suggestions,
        practiceArea,
        location,
      });
    }

    if (action === 'content-ideas') {
      const practiceArea = searchParams.get('practiceArea');

      // Mock content ideas - in production would analyze trends
      const contentIdeas = [
        `Ultimate Guide to ${practiceArea}`,
        `Common ${practiceArea} Mistakes to Avoid`,
        `How to Choose the Right ${practiceArea} Lawyer`,
        `${practiceArea} Process: Step-by-Step Guide`,
        `Recent ${practiceArea} Law Changes`,
      ].filter(Boolean);

      return NextResponse.json({
        contentIdeas,
        practiceArea,
        generatedAt: new Date().toISOString(),
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
    logger.error('SEO blog generation status check error:', errorToLogMeta(error));
    return NextResponse.json({ error: 'Failed to check task status' }, { status: 500 });
  }
}
