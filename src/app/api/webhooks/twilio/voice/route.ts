import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { twilioService } from '@/services/twilio';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    logger.info('Incoming call webhook received', {
      callSid: data.CallSid,
      from: data.From,
      to: data.To,
      direction: data.Direction,
    });

    // Handle the incoming call
    const twimlResponse = await twilioService.handleIncomingCall({
      From: data.From,
      To: data.To,
      CallSid: data.CallSid,
      Direction: data.Direction,
      CallerName: data.CallerName,
    });

    // Return TwiML response
    return new NextResponse(twimlResponse, {
      status: 200,
      headers: {
        'Content-Type': 'text/xml',
      },
    });
  } catch (error) {
    logger.error('Voice webhook error:', error);

    // Return error TwiML
    const errorTwiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice" language="en-US">
    We're sorry, we're experiencing technical difficulties. 
    Please call back later or visit vasquezlawnc.com.
  </Say>
</Response>`;

    return new NextResponse(errorTwiml, {
      status: 200,
      headers: {
        'Content-Type': 'text/xml',
      },
    });
  }
}
