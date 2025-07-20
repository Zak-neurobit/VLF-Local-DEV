import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import * as twilio from 'twilio';

// Force dynamic rendering since we need to access headers and request data
export const dynamic = 'force-dynamic';

// Twilio webhook validation
const validateTwilioRequest = (request: NextRequest, body: string): boolean => {
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const signature = request.headers.get('x-twilio-signature');
  const url = request.url;

  if (!authToken || !signature) {
    return false;
  }

  // Parse body to get params for validation
  const params = new URLSearchParams(body);
  const paramsObject: Record<string, string> = {};
  params.forEach((value, key) => {
    paramsObject[key] = value;
  });

  return twilio.validateRequest(authToken, signature, url, paramsObject);
};

// POST /api/twilio/voice - Handle Twilio voice webhooks
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();

    // Validate Twilio request in production
    if (process.env.NODE_ENV === 'production') {
      if (!validateTwilioRequest(request, body)) {
        logger.warn('Invalid Twilio webhook signature');
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    // Parse form data
    const formData = new URLSearchParams(body);
    const callSid = formData.get('CallSid');
    const from = formData.get('From');
    const to = formData.get('To');
    const callStatus = formData.get('CallStatus');

    logger.info('Twilio voice webhook received', {
      callSid,
      from,
      to,
      callStatus,
    });

    // Create TwiML response
    const twiml = new twilio.twiml.VoiceResponse();

    // Add voice response logic here
    twiml.say(
      {
        voice: 'alice',
        language: 'en-US',
      },
      'Thank you for calling Vasquez Law Firm. We will connect you with an agent shortly.'
    );

    // Return TwiML response
    return new NextResponse(twiml.toString(), {
      status: 200,
      headers: {
        'Content-Type': 'text/xml',
      },
    });
  } catch (error) {
    logger.error('Twilio voice webhook error:', error);

    // Return error TwiML
    const errorTwiml = new twilio.twiml.VoiceResponse();
    errorTwiml.say(
      'We apologize, but we are experiencing technical difficulties. Please try again later.'
    );

    return new NextResponse(errorTwiml.toString(), {
      status: 200,
      headers: {
        'Content-Type': 'text/xml',
      },
    });
  }
}

// GET /api/twilio/voice - Status endpoint
export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'ok',
    service: 'twilio-voice',
    configured: !!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN),
  });
}
