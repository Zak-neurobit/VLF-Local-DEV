import { NextRequest, NextResponse } from 'next/server';
import { twilioService } from '@/services/twilio';
import { logger } from '@/lib/logger';
import twilio from 'twilio';

// Twilio webhook validation
const validateTwilioRequest = (request: NextRequest, params: Record<string, string>): boolean => {
  const twilioSignature = request.headers.get('x-twilio-signature') || '';
  const authToken = process.env.TWILIO_AUTH_TOKEN || '';
  const url = request.url;

  if (!authToken || !twilioSignature) {
    return false;
  }

  return twilio.validateRequest(authToken, twilioSignature, url, params);
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const data: Record<string, string> = {};

    // Convert FormData to object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    // Validate Twilio signature if in production
    if (process.env.NODE_ENV === 'production') {
      if (!validateTwilioRequest(request, data)) {
        logger.warn('Invalid Twilio webhook signature');
        return new NextResponse('Unauthorized', { status: 401 });
      }
    }

    logger.info('Twilio SMS webhook received', {
      from: data.From,
      to: data.To,
      messageSid: data.MessageSid,
    });

    // Process the incoming SMS
    const response = await twilioService.handleIncomingSMS({
      From: data.From,
      To: data.To,
      Body: data.Body,
      MessageSid: data.MessageSid,
      NumMedia: data.NumMedia,
      MediaUrl0: data.MediaUrl0,
    });

    // Return TwiML response
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>${response}</Message>
</Response>`;

    return new NextResponse(twiml, {
      status: 200,
      headers: {
        'Content-Type': 'text/xml',
      },
    });
  } catch (error) {
    logger.error('Twilio SMS webhook error:', error);

    // Return error TwiML
    const errorTwiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>Sorry, we're experiencing technical difficulties. Please call 1-844-YO-PELEO for assistance.</Message>
</Response>`;

    return new NextResponse(errorTwiml, {
      status: 200,
      headers: {
        'Content-Type': 'text/xml',
      },
    });
  }
}
