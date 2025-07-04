import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    logger.info('SMS status webhook received', {
      messageSid: data.MessageSid,
      status: data.MessageStatus,
      to: data.To,
    });

    // TODO: Add smsLog model to Prisma schema
    // For now, just log the status update
    logger.info('SMS status update', {
      messageSid: data.MessageSid,
      status: data.MessageStatus,
      errorCode: data.ErrorCode,
      errorMessage: data.ErrorMessage,
    });

    // Handle failed messages
    if (data.MessageStatus === 'failed' || data.MessageStatus === 'undelivered') {
      logger.error('SMS delivery failed', {
        messageSid: data.MessageSid,
        to: data.To,
        errorCode: data.ErrorCode,
        errorMessage: data.ErrorMessage,
      });

      // TODO: Implement retry logic or notification to staff
    }

    return new NextResponse('OK', { status: 200 });
  } catch (error) {
    logger.error('SMS status webhook error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
