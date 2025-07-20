import { NextRequest, NextResponse } from 'next/server';
import { abTestEngine } from '@/lib/ab-testing/ab-test-engine';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// GET /api/ab-testing/config - Get A/B testing configuration
export async function GET(_request: NextRequest) {
  try {
    // Return current A/B testing configuration
    const config = await abTestEngine.getActiveTests();

    return NextResponse.json({
      success: true,
      config,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Failed to get A/B testing config:', error);
    return NextResponse.json({ error: 'Failed to get A/B testing configuration' }, { status: 500 });
  }
}
