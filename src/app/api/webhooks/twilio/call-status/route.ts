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

    logger.info('Call status webhook received', {
      callSid: data.CallSid,
      status: data.CallStatus,
      to: data.To,
      from: data.From,
      duration: data.CallDuration,
    });

    // Update call status in database
    await twilioService.updateCallStatus({
      CallSid: data.CallSid,
      CallStatus: data.CallStatus,
      CallDuration: data.CallDuration,
      RecordingUrl: data.RecordingUrl,
      ErrorCode: data.ErrorCode,
      ErrorMessage: data.ErrorMessage,
    });

    // Handle failed calls
    if (
      data.CallStatus === 'failed' ||
      data.CallStatus === 'no-answer' ||
      data.CallStatus === 'busy'
    ) {
      logger.error('Call failed', {
        callSid: data.CallSid,
        to: data.To,
        status: data.CallStatus,
        errorCode: data.ErrorCode,
        errorMessage: data.ErrorMessage,
      });

      // TODO: Implement retry logic or notification to staff
    }

    return new NextResponse('OK', { status: 200 });
  } catch (error) {
    logger.error('Call status webhook error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
