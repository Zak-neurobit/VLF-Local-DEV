import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { abTestEngine } from '@/lib/ab-testing/ab-test-engine';

// Force dynamic rendering since we need to access session
// GET /api/ab-testing/tests/[testId] - Get A/B test details and results
export async function GET(request: NextRequest, { params }: { params: { testId: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.role?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { testId } = params;
    const results = await abTestEngine.getTestResults(testId);

    return NextResponse.json({
      success: true,
      testId,
      results,
    });
  } catch (error) {
    console.error('Failed to get A/B test results:', error);
    return NextResponse.json({ error: 'Failed to get test results' }, { status: 500 });
  }
}

// PATCH /api/ab-testing/tests/[testId] - Update A/B test status
export async function PATCH(request: NextRequest, { params }: { params: { testId: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.role?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { testId } = params;
    const body = await request.json();
    const { action } = body;

    if (!['start', 'pause', 'complete'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action. Must be start, pause, or complete' },
        { status: 400 }
      );
    }

    switch (action) {
      case 'start':
        await abTestEngine.startTest(testId);
        break;
      case 'pause':
        await abTestEngine.pauseTest(testId);
        break;
      case 'complete':
        await abTestEngine.completeTest(testId);
        break;
    }

    return NextResponse.json({
      success: true,
      message: `A/B test ${action}ed successfully`,
    });
  } catch (error) {
    console.error('Failed to update A/B test:', error);
    return NextResponse.json({ error: 'Failed to update test' }, { status: 500 });
  }
}
