import { NextRequest, NextResponse } from 'next/server';
import { getCrewCoordinator } from '@/lib/crewai/crew-coordinator';
import { DocumentAnalysisRequest } from '@/lib/crewai/agents/document-analysis-agent';
import { logger } from '@/lib/logger';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('document') as File;
    const userId = formData.get('userId') as string;
    const documentType = formData.get('documentType') as string;
    const analysisType = formData.get('analysisType') as string;
    const language = (formData.get('language') as string) || 'en';
    const urgency = (formData.get('urgency') as string) || 'medium';

    // Validate required fields
    if (!file || !userId || !documentType) {
      return NextResponse.json(
        { error: 'Missing required fields: document, userId, documentType' },
        { status: 400 }
      );
    }

    // Save uploaded file
    const uploadDir = path.join(process.cwd(), 'uploads', 'documents');
    await mkdir(uploadDir, { recursive: true });

    const filename = `${Date.now()}_${file.name}`;
    const filepath = path.join(uploadDir, filename);

    const bytes = await file.arrayBuffer();
    await writeFile(filepath, Buffer.from(bytes));

    const analysisRequest: DocumentAnalysisRequest = {
      documentPath: filepath,
      documentType: documentType as 'contract' | 'court-filing' | 'immigration-form' | 'medical-record' | 'insurance-claim' | 'other',
      analysisType: (analysisType as 'summary' | 'risk-assessment' | 'compliance-check' | 'key-extraction' | 'full-analysis') || 'full-analysis',
      language: language as 'en' | 'es',
      urgency: urgency as 'low' | 'medium' | 'high',
      clientId: userId,
    };

    // Create task
    const taskId = await getCrewCoordinator().createDocumentAnalysisTask(
      userId,
      analysisRequest,
      urgency === 'high' ? 'urgent' : 'medium'
    );

    logger.info(`Created document analysis task ${taskId} for user ${userId}, file: ${filename}`);

    return NextResponse.json({
      taskId,
      filename,
      status: 'created',
      message: 'Document analysis has been queued',
    });
  } catch (error) {
    logger.error('Document analysis API error:', error);
    return NextResponse.json(
      { error: 'Failed to process document analysis request' },
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
    logger.error('Document analysis status check error:', error);
    return NextResponse.json({ error: 'Failed to check task status' }, { status: 500 });
  }
}
