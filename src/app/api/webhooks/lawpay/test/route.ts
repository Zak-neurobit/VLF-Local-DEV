import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { logger } from '@/lib/logger';
import { errorToLogMeta } from '@/lib/logger/utils';

// Test endpoint to log exactly what LawPay sends
export async function POST(request: NextRequest) {
  try {
    const headersList = headers();
    const body = await request.text();

    // Log all headers
    const allHeaders: Record<string, string> = {};
    headersList.forEach((value, key) => {
      allHeaders[key] = value;
    });

    // Try to parse as JSON
    let parsedBody;
    try {
      parsedBody = JSON.parse(body);
    } catch {
      parsedBody = body;
    }

    const logData = {
      timestamp: new Date().toISOString(),
      headers: allHeaders,
      body: parsedBody,
      rawBody: body,
      method: request.method,
      url: request.url,
    };

    // Log to console and logger
    console.log('\n=== LAWPAY WEBHOOK TEST ===');
    console.log(JSON.stringify(logData, null, 2));
    console.log('=========================\n');

    logger.info('LawPay webhook test received', logData);

    // Return the data so you can see it in LawPay's interface
    return NextResponse.json({
      received: true,
      timestamp: logData.timestamp,
      data: parsedBody,
    });
  } catch (error) {
    logger.error('LawPay webhook test error', errorToLogMeta(error));
    return NextResponse.json({
      received: true,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

// Also handle GET requests for testing
export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'LawPay webhook test endpoint is working',
    timestamp: new Date().toISOString(),
    instructions: 'Send a POST request to see what data is received',
  });
}
