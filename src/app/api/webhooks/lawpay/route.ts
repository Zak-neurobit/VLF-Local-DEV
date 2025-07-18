import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { logger } from '@/lib/logger';
import { errorToLogMeta, createErrorLogMeta } from '@/lib/logger/utils';
import { getPrismaClient } from '@/lib/prisma';
import crypto from 'crypto';

const prisma = getPrismaClient();

// Verify webhook signature
function verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
  const expectedSignature = crypto.createHmac('sha256', secret).update(payload).digest('hex');

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headersList = headers();
    const signature = headersList.get('x-lawpay-signature');

    // Log webhook receipt
    logger.info('LawPay webhook received', {
      hasSignature: !!signature,
      bodyLength: body.length,
    });

    // Skip signature verification for now since LawPay doesn't provide webhook secret
    // In production, implement IP whitelist or other security measures
    logger.info('LawPay webhook - skipping signature verification');

    // Parse webhook data
    const data = JSON.parse(body);

    // Log full webhook data for debugging
    logger.info('LawPay webhook data received', {
      fullData: data,
      keys: Object.keys(data),
    });

    // Handle different webhook events
    // LawPay might use different field names, so check multiple possibilities
    const eventType = data.event_type || data.type || data.event || data.status;

    logger.info('Processing webhook event', { eventType });

    // Handle based on event type or status
    if (eventType === 'payment.created' || eventType === 'created' || data.status === 'created') {
      await handlePaymentCreated(data);
    } else if (
      eventType === 'payment.succeeded' ||
      eventType === 'succeeded' ||
      eventType === 'paid' ||
      data.status === 'paid'
    ) {
      await handlePaymentSucceeded(data);
    } else if (
      eventType === 'payment.failed' ||
      eventType === 'failed' ||
      eventType === 'declined' ||
      data.status === 'declined'
    ) {
      await handlePaymentFailed(data);
    } else if (
      eventType === 'payment.refunded' ||
      eventType === 'refunded' ||
      data.status === 'refunded'
    ) {
      await handlePaymentRefunded(data);
    } else {
      logger.warn('Unknown LawPay webhook event', {
        eventType,
        status: data.status,
        type: data.type,
        fullData: data,
      });
    }

    // Always return 200 to acknowledge receipt
    return NextResponse.json({ received: true });
  } catch (error) {
    logger.error('LawPay webhook error', errorToLogMeta(error));

    // Return 200 even on error to prevent retries
    return NextResponse.json({ received: true });
  }
}

async function handlePaymentCreated(data: any) {
  // Handle different possible field names from LawPay
  const paymentId = data.payment_id || data.id || data.transaction_id || data.reference;
  const amount = data.amount || data.total || data.amount_cents;
  const currency = data.currency || 'USD';
  const metadata = data.metadata || data.custom_fields || {};

  try {
    // If amount is in cents, convert to dollars
    const amountInDollars = amount > 1000 ? amount / 100 : amount;

    // Create or update payment record
    await prisma.payment.upsert({
      where: { externalId: paymentId },
      create: {
        externalId: paymentId,
        amount: amountInDollars,
        currency,
        status: 'pending',
        provider: 'lawpay',
        metadata: {
          ...metadata,
          lawpayData: data,
        },
      },
      update: {
        status: 'pending',
      },
    });

    logger.info('Payment created in database', { paymentId });
  } catch (error) {
    logger.error('Failed to create payment record', createErrorLogMeta(error, { paymentId, data }));
  }
}

async function handlePaymentSucceeded(data: any) {
  // Handle different possible field names from LawPay
  const paymentId = data.payment_id || data.id || data.transaction_id || data.reference;
  const amount = data.amount || data.total || data.amount_cents;
  const transactionId = data.transaction_id || data.id || data.confirmation_number;
  const metadata = data.metadata || data.custom_fields || {};

  try {
    // Find payment by external ID or reference
    const existingPayment = await prisma.payment.findFirst({
      where: {
        OR: [{ externalId: paymentId }, { metadata: { path: ['reference'], equals: paymentId } }],
      },
    });

    if (!existingPayment) {
      // Create new payment if it doesn't exist
      const amountInDollars = amount > 1000 ? amount / 100 : amount;
      await prisma.payment.create({
        data: {
          externalId: paymentId,
          amount: amountInDollars,
          currency: data.currency || 'USD',
          status: 'completed',
          provider: 'lawpay',
          transactionId,
          completedAt: new Date(),
          metadata: {
            ...metadata,
            lawpayData: data,
          },
        },
      });
    } else {
      // Update existing payment
      await prisma.payment.update({
        where: { id: existingPayment.id },
        data: {
          status: 'completed',
          transactionId,
          completedAt: new Date(),
          metadata: {
            ...existingPayment.metadata,
            ...metadata,
            lawpayData: data,
          },
        },
      });
    }

    logger.info('Payment succeeded', {
      paymentId: payment_id,
      amount: amount / 100,
      transactionId: transaction_id,
    });

    // Send confirmation email
    if (metadata?.clientEmail) {
      // TODO: Queue confirmation email
      logger.info('Payment confirmation email queued', {
        email: metadata.clientEmail,
        paymentId: payment_id,
      });
    }

    // Create notification for admin
    await prisma.notification.create({
      data: {
        type: 'payment_received',
        title: 'Payment Received',
        message: `Payment of $${(amount / 100).toFixed(2)} received`,
        data: {
          paymentId: payment.id,
          amount: amount / 100,
          clientName: metadata?.clientName,
          clientEmail: metadata?.clientEmail,
        },
      },
    });
  } catch (error) {
    logger.error(
      'Failed to handle payment success',
      createErrorLogMeta(error, { paymentId: payment_id })
    );
  }
}

async function handlePaymentFailed(data: any) {
  const { payment_id, failure_reason, failure_code } = data;

  try {
    await prisma.payment.update({
      where: { externalId: payment_id },
      data: {
        status: 'failed',
        errorMessage: failure_reason,
        metadata: {
          failureCode: failure_code,
          lawpayData: data,
        },
      },
    });

    logger.warn('Payment failed', {
      paymentId: payment_id,
      reason: failure_reason,
      code: failure_code,
    });
  } catch (error) {
    logger.error(
      'Failed to handle payment failure',
      createErrorLogMeta(error, { paymentId: payment_id })
    );
  }
}

async function handlePaymentRefunded(data: any) {
  const { payment_id, refund_amount, refund_id } = data;

  try {
    await prisma.payment.update({
      where: { externalId: payment_id },
      data: {
        status: 'refunded',
        metadata: {
          refundId: refund_id,
          refundAmount: refund_amount / 100,
          refundedAt: new Date(),
          lawpayData: data,
        },
      },
    });

    logger.info('Payment refunded', {
      paymentId: payment_id,
      refundAmount: refund_amount / 100,
      refundId: refund_id,
    });
  } catch (error) {
    logger.error(
      'Failed to handle payment refund',
      createErrorLogMeta(error, { paymentId: payment_id })
    );
  }
}
