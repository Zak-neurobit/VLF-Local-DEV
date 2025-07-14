import { NextRequest, NextResponse } from 'next/server';
import { abTestEngine } from '@/lib/ab-testing/ab-test-engine';

// GET /api/ab-testing/content - Get variant content for A/B test
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const testId = searchParams.get('testId');
    const variantId = searchParams.get('variantId');

    if (!testId || !variantId) {
      return NextResponse.json(
        { error: 'testId and variantId are required' },
        { status: 400 }
      );
    }

    const content = await abTestEngine.getVariantContent(testId, variantId);

    if (!content) {
      return NextResponse.json(
        { error: 'Variant content not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      content,
      testId,
      variantId,
    });
  } catch (error) {
    console.error('Failed to get variant content:', error);
    return NextResponse.json(
      { error: 'Failed to get variant content' },
      { status: 500 }
    );
  }
}