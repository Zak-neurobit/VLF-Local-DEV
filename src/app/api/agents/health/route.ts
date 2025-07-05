import { NextRequest, NextResponse } from 'next/server';

// OPTIONS endpoint for CORS preflight
export async function OPTIONS(_request: NextRequest) {
  return new NextResponse(null, { status: 200 });
}

// GET endpoint for health check
export async function GET(_request: NextRequest) {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    agents: {
      'lead-validation': 'ready',
      'appointment': 'ready',
      'consultation': 'ready',
      'deploy': 'ready',
      'monitor': 'ready',
    },
    environment: process.env.NODE_ENV || 'development',
    vercel: process.env.VERCEL ? 'true' : 'false',
  });
}

// POST endpoint for testing
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return NextResponse.json({
      status: 'ok',
      received: body,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Invalid JSON body' },
      { status: 400 }
    );
  }
}