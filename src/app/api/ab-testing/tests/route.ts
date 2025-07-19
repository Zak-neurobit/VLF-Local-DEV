import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { abTestEngine } from '@/lib/ab-testing/ab-test-engine';
import { z } from 'zod';

// GET /api/ab-testing/tests - Get all A/B tests (admin only)
export async function GET(_request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.role?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const tests = await abTestEngine.getAllTests();

    return NextResponse.json({
      success: true,
      tests,
    });
  } catch (error) {
    console.error('Failed to get A/B tests:', error);
    return NextResponse.json({ error: 'Failed to get tests' }, { status: 500 });
  }
}

// POST /api/ab-testing/tests - Create new A/B test (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.role?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const testId = await abTestEngine.createTest(body);

    return NextResponse.json({
      success: true,
      testId,
      message: 'A/B test created successfully',
    });
  } catch (error) {
    console.error('Failed to create A/B test:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Invalid test configuration',
          details: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Failed to create test' }, { status: 500 });
  }
}
