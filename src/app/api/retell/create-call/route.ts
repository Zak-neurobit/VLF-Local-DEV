import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/safe-logger';

export async function POST(req: NextRequest) {
  try {
    const { language, agentId } = await req.json();
    
    // Create call via Retell API
    const response = await fetch('https://api.retellai.com/v2/create-web-call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RETELL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_id: agentId || process.env.RETELL_AGENT_ID,
        metadata: {
          language,
          source: 'website',
          timestamp: new Date().toISOString(),
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      logger.error('Retell API error:', { error, status: response.status });
      throw new Error(`Retell API error: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json({
      accessToken: data.access_token,
      callId: data.call_id,
    });
  } catch (error) {
    logger.error('Failed to create Retell call:', error);
    return NextResponse.json(
      { error: 'Failed to create voice call' },
      { status: 500 }
    );
  }
}