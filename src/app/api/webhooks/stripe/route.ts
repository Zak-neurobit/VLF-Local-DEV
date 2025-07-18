import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { getPrismaClient } from '@/lib/prisma';
import { logger } from '@/lib/logger';
import { errorToLogMeta } from '@/lib/logger/utils';
import { PaymentStatus, PaymentGateway, PaymentMethod } from '@prisma/client';
import { emailQueue } from '@/lib/queue/bull';
import { withPaymentTracing } from '@/lib/telemetry/api-middleware';
import type { PaymentPlanMetadata } from '@/types/api';

export const dynamic = 'force-dynamic';

if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error('Stripe configuration missing');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Helper function to calculate next payment date
function calculateNextPaymentDate(
  currentDate: Date,
  installmentFrequency: 'monthly' | 'biweekly' = 'monthly'
): Date {
  const nextDate = new Date(currentDate);

  if (installmentFrequency === 'monthly') {
    nextDate.setMonth(nextDate.getMonth() + 1);
  } else if (installmentFrequency === 'biweekly') {
    nextDate.setDate(nextDate.getDate() + 14);
  }

  return nextDate;
}

// Helper function to determine if a payment plan should be marked as defaulted
function shouldMarkAsDefaulted(attemptCount: number, hasNextAttempt: boolean): boolean {
  // Mark as defaulted if:
  // 1. More than 3 attempts have been made AND
  // 2. There's no scheduled next attempt
  return attemptCount >= 3 && !hasNextAttempt;
}

// Helper function to update payment plan metadata safely
/*
async function updatePaymentPlanMetadata(
  prisma: ReturnType<typeof getPrismaClient>,
  planId: string,
  updates: Partial<PaymentPlanMetadata>
): Promise<void> {
  const plan = await prisma.paymentPlan.findUnique({
    where: { id: planId },
    select: { metadata: true },
  });

  if (plan) {
    await prisma.paymentPlan.update({
      where: { id: planId },
      data: {
        metadata: {
          ...(plan.metadata as object),
          ...updates,
        },
      },
    });
  }
}
*/

// Helper function to format currency
// function formatCurrency(amount: number): string {
//   return new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//   }).format(amount);
// }

async function handlePOST(request: NextRequest) {
  // Validate required environment variables
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    logger.error('Missing required Stripe environment variables');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  try {
    const body = await request.text();
    const signature = headers().get('stripe-signature');

    if (!signature) {
      logger.error('No stripe-signature header found');
      return NextResponse.json({ error: 'No signature provided' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      logger.error('Stripe webhook signature verification failed', errorToLogMeta(err));
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const prisma = getPrismaClient();

    logger.info('Stripe webhook received', {
      type: event.type,
      id: event.id,
    });

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const paymentId = paymentIntent.metadata.paymentId;

        if (paymentId) {
          await prisma.payment.update({
            where: { id: paymentId },
            data: {
              status: PaymentStatus.SUCCEEDED,
              processedAt: new Date(),
              gatewayTransactionId: paymentIntent.id,
              gatewayChargeId: paymentIntent.latest_charge as string,
            },
          });

          logger.info('Payment marked as succeeded', { paymentId });
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const paymentId = paymentIntent.metadata.paymentId;

        if (paymentId) {
          await prisma.payment.update({
            where: { id: paymentId },
            data: {
              status: PaymentStatus.FAILED,
              failureReason: paymentIntent.last_payment_error?.message || 'Payment failed',
            },
          });

          logger.error('Payment marked as failed', {
            paymentId,
            error: paymentIntent.last_payment_error?.message,
          });

          // Send failure notification
          await emailQueue.add('payment-failed', {
            to: paymentIntent.metadata.clientEmail,
            subject: 'Payment Failed - Vasquez Law Firm',
            template: 'payment-failed',
            data: {
              clientName: paymentIntent.metadata.clientName,
              amount: paymentIntent.amount / 100,
              reason: paymentIntent.last_payment_error?.message || 'Payment processing failed',
            },
          });
        }
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;

        const payment = await prisma.payment.findFirst({
          where: { gatewayChargeId: charge.id },
        });

        if (payment) {
          const refundAmount = charge.amount_refunded / 100;
          const isFullRefund = charge.amount === charge.amount_refunded;

          await prisma.payment.update({
            where: { id: payment.id },
            data: {
              status: isFullRefund ? PaymentStatus.REFUNDED : PaymentStatus.PARTIALLY_REFUNDED,
              refundedAt: new Date(),
            },
          });

          logger.info('Payment refund processed', {
            paymentId: payment.id,
            refundAmount,
            isFullRefund,
          });
        }
        break;
      }

      case 'charge.dispute.created': {
        const dispute = event.data.object as Stripe.Dispute;

        const payment = await prisma.payment.findFirst({
          where: { gatewayChargeId: dispute.charge as string },
        });

        if (payment) {
          logger.warn('Payment dispute created', {
            paymentId: payment.id,
            disputeId: dispute.id,
            amount: dispute.amount / 100,
            reason: dispute.reason,
          });

          // Notify legal team about dispute
          await emailQueue.add('payment-dispute', {
            to: process.env.LEGAL_TEAM_EMAIL || 'legal@vasquezlawnc.com',
            subject: 'Payment Dispute Alert - Immediate Action Required',
            template: 'payment-dispute',
            data: {
              paymentId: payment.id,
              clientName: payment.clientName,
              clientEmail: payment.clientEmail,
              amount: dispute.amount / 100,
              reason: dispute.reason,
              disputeId: dispute.id,
              respondBy: dispute.evidence_details?.due_by
                ? new Date(dispute.evidence_details.due_by * 1000).toLocaleDateString()
                : 'Unknown',
            },
          });
        }
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        // Handle subscription events for payment plans
        const subscription = event.data.object as Stripe.Subscription;

        logger.info('Subscription event', {
          type: event.type,
          subscriptionId: subscription.id,
          status: subscription.status,
        });

        // Update payment plan status based on subscription
        if (subscription.metadata?.paymentPlanId) {
          const planId = subscription.metadata.paymentPlanId;

          // Map Stripe subscription status to our PaymentPlanStatus
          let planStatus: 'ACTIVE' | 'PAUSED' | 'CANCELLED' | 'COMPLETED' | 'DEFAULTED' = 'ACTIVE';

          switch (subscription.status) {
            case 'active':
              planStatus = 'ACTIVE';
              break;
            case 'paused':
              planStatus = 'PAUSED';
              break;
            case 'canceled':
              planStatus = 'CANCELLED';
              break;
            case 'incomplete':
            case 'incomplete_expired':
            case 'past_due':
            case 'unpaid':
              planStatus = 'DEFAULTED';
              break;
          }

          await prisma.paymentPlan.update({
            where: { id: planId },
            data: {
              status: planStatus,
              updatedAt: new Date(),
            },
          });

          logger.info('Payment plan status updated', {
            planId,
            status: planStatus,
            subscriptionStatus: subscription.status,
          });
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;

        if (invoice.metadata?.paymentPlanId) {
          const planId = invoice.metadata.paymentPlanId;
          const amountPaid = invoice.amount_paid / 100;

          // Process payment plan installment
          logger.info('Payment plan installment succeeded', {
            planId,
            amount: amountPaid,
            invoiceId: invoice.id,
          });

          // Update payment plan with successful installment
          const paymentPlan = await prisma.paymentPlan.findUnique({
            where: { id: planId },
          });

          if (paymentPlan) {
            const newPaidAmount = paymentPlan.paidAmount + amountPaid;
            const newRemainingAmount = Math.max(0, paymentPlan.totalAmount - newPaidAmount);
            const isCompleted = newRemainingAmount <= 0.01; // Account for floating point precision

            // Calculate next payment date
            const nextPaymentDate = isCompleted
              ? null
              : calculateNextPaymentDate(paymentPlan.nextPaymentDate || new Date());

            await prisma.paymentPlan.update({
              where: { id: planId },
              data: {
                paidAmount: newPaidAmount,
                remainingAmount: newRemainingAmount,
                status: isCompleted ? 'COMPLETED' : 'ACTIVE',
                nextPaymentDate: nextPaymentDate,
                updatedAt: new Date(),
              },
            });

            // Create a payment record for this installment
            await prisma.payment.create({
              data: {
                clientEmail: paymentPlan.clientEmail,
                clientName: paymentPlan.clientName,
                caseId: paymentPlan.caseId,
                amount: amountPaid,
                currency: 'USD',
                description: `Payment plan installment #${Math.ceil((paymentPlan.paidAmount + amountPaid) / paymentPlan.monthlyAmount)}`,
                paymentMethod: PaymentMethod.CARD,
                status: PaymentStatus.SUCCEEDED,
                processedAt: new Date(),
                gateway: PaymentGateway.STRIPE,
                gatewayTransactionId: invoice.payment_intent as string,
                gatewayChargeId: invoice.charge as string,
                metadata: {
                  type: 'installment',
                  paymentPlanId: planId,
                  invoiceId: invoice.id,
                  installmentNumber: Math.ceil(paymentPlan.paidAmount / paymentPlan.monthlyAmount),
                },
              },
            });

            // Send success notification
            await emailQueue.add('payment-plan-installment-success', {
              to: paymentPlan.clientEmail,
              subject: 'Payment Plan Installment Received - Vasquez Law Firm',
              template: 'payment-plan-installment-success',
              data: {
                clientName: paymentPlan.clientName,
                amount: amountPaid,
                paidAmount: newPaidAmount,
                remainingAmount: newRemainingAmount,
                nextPaymentDate: nextPaymentDate?.toLocaleDateString(),
                isCompleted,
              },
            });

            logger.info('Payment plan updated successfully', {
              planId,
              paidAmount: newPaidAmount,
              remainingAmount: newRemainingAmount,
              isCompleted,
            });
          }
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;

        if (invoice.metadata?.paymentPlanId) {
          const planId = invoice.metadata.paymentPlanId;
          const amountDue = invoice.amount_due / 100;

          logger.error('Payment plan installment failed', {
            planId,
            amount: amountDue,
            invoiceId: invoice.id,
            attemptCount: invoice.attempt_count,
          });

          // Handle failed payment plan installment
          const paymentPlan = await prisma.paymentPlan.findUnique({
            where: { id: planId },
          });

          if (paymentPlan) {
            // Check if this is the final attempt or if we should mark as defaulted
            const isDefaulted = shouldMarkAsDefaulted(
              invoice.attempt_count,
              !!invoice.next_payment_attempt
            );

            await prisma.paymentPlan.update({
              where: { id: planId },
              data: {
                status: isDefaulted ? 'DEFAULTED' : paymentPlan.status,
                metadata: {
                  ...(paymentPlan.metadata as Record<string, unknown>),
                  lastFailedAttempt: new Date().toISOString(),
                  failedAttempts: (paymentPlan.metadata as PaymentPlanMetadata)?.failedAttempts
                    ? ((paymentPlan.metadata as PaymentPlanMetadata)?.failedAttempts || 0) + 1
                    : 1,
                },
                updatedAt: new Date(),
              },
            });

            // Create a failed payment record
            await prisma.payment.create({
              data: {
                clientEmail: paymentPlan.clientEmail,
                clientName: paymentPlan.clientName,
                caseId: paymentPlan.caseId,
                amount: amountDue,
                currency: 'USD',
                description: `Failed payment plan installment attempt #${invoice.attempt_count}`,
                paymentMethod: PaymentMethod.CARD,
                status: PaymentStatus.FAILED,
                failureReason: invoice.last_finalization_error?.message || 'Payment failed',
                gateway: PaymentGateway.STRIPE,
                gatewayTransactionId: (invoice.payment_intent as string) || invoice.id,
                metadata: {
                  type: 'installment',
                  paymentPlanId: planId,
                  invoiceId: invoice.id,
                  attemptCount: invoice.attempt_count,
                },
              },
            });

            // Send notification to client
            await emailQueue.add('payment-plan-failed', {
              to: invoice.customer_email!,
              subject: 'Payment Plan Installment Failed - Action Required',
              template: 'payment-plan-failed',
              data: {
                clientName: paymentPlan.clientName,
                planId,
                amount: amountDue,
                nextAttempt: invoice.next_payment_attempt
                  ? new Date(invoice.next_payment_attempt * 1000).toLocaleDateString()
                  : null,
                isDefaulted,
                remainingAmount: paymentPlan.remainingAmount,
                supportEmail: 'billing@vasquezlawnc.com',
                supportPhone: '(980) 237-4000',
              },
            });

            // If defaulted, notify legal team
            if (isDefaulted) {
              await emailQueue.add('payment-plan-defaulted', {
                to: process.env.LEGAL_TEAM_EMAIL || 'legal@vasquezlawnc.com',
                subject: 'Payment Plan Defaulted - Requires Review',
                template: 'payment-plan-defaulted',
                data: {
                  planId,
                  clientName: paymentPlan.clientName,
                  clientEmail: paymentPlan.clientEmail,
                  caseId: paymentPlan.caseId,
                  totalAmount: paymentPlan.totalAmount,
                  paidAmount: paymentPlan.paidAmount,
                  remainingAmount: paymentPlan.remainingAmount,
                  failedAmount: amountDue,
                },
              });
            }
          }
        }
        break;
      }

      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        logger.info('Checkout session completed', {
          sessionId: session.id,
          paymentStatus: session.payment_status,
          customerEmail: session.customer_email,
        });

        // Handle successful checkout session
        if (session.metadata?.paymentId) {
          await prisma.payment.update({
            where: { id: session.metadata.paymentId },
            data: {
              status: PaymentStatus.SUCCEEDED,
              processedAt: new Date(),
            },
          });
        }
        break;
      }

      case 'customer.subscription.deleted': {
        // Handle subscription cancellation
        const subscription = event.data.object as Stripe.Subscription;

        if (subscription.metadata?.paymentPlanId) {
          const planId = subscription.metadata.paymentPlanId;

          await prisma.paymentPlan.update({
            where: { id: planId },
            data: {
              status: 'CANCELLED',
              metadata: {
                ...(((await prisma.paymentPlan.findUnique({ where: { id: planId } }))
                  ?.metadata as Record<string, unknown>) || {}),
                cancelledAt: new Date().toISOString(),
                cancellationReason: subscription.cancellation_details?.reason || 'User cancelled',
              },
              updatedAt: new Date(),
            },
          });

          logger.info('Payment plan cancelled via subscription deletion', {
            planId,
            subscriptionId: subscription.id,
            reason: subscription.cancellation_details?.reason,
          });

          // Send cancellation confirmation
          await emailQueue.add('payment-plan-cancelled', {
            to: subscription.metadata.clientEmail || '',
            subject: 'Payment Plan Cancelled - Vasquez Law Firm',
            template: 'payment-plan-cancelled',
            data: {
              clientName: subscription.metadata.clientName || '',
              planId,
              paidAmount: subscription.metadata.paidAmount || 0,
              remainingAmount: subscription.metadata.remainingAmount || 0,
            },
          });
        }
        break;
      }

      case 'invoice.upcoming': {
        // Send reminder for upcoming payment
        const invoice = event.data.object as Stripe.Invoice;

        if (invoice.metadata?.paymentPlanId) {
          const planId = invoice.metadata.paymentPlanId;
          const amountDue = invoice.amount_due / 100;
          const dueDate = new Date(invoice.period_end * 1000);

          logger.info('Upcoming payment plan installment', {
            planId,
            amount: amountDue,
            dueDate: dueDate.toISOString(),
          });

          // Send reminder 3 days before due date
          const reminderDate = new Date(dueDate);
          reminderDate.setDate(reminderDate.getDate() - 3);

          if (new Date() >= reminderDate) {
            await emailQueue.add('payment-plan-reminder', {
              to: invoice.customer_email!,
              subject: 'Upcoming Payment Reminder - Vasquez Law Firm',
              template: 'payment-plan-reminder',
              data: {
                clientName: invoice.metadata.clientName || '',
                amount: amountDue,
                dueDate: dueDate.toLocaleDateString(),
                planId,
              },
            });
          }
        }
        break;
      }

      case 'customer.subscription.paused':
      case 'customer.subscription.resumed': {
        // Handle payment plan pause/resume
        const subscription = event.data.object as Stripe.Subscription;
        const isPaused = event.type === 'customer.subscription.paused';

        if (subscription.metadata?.paymentPlanId) {
          const planId = subscription.metadata.paymentPlanId;

          await prisma.paymentPlan.update({
            where: { id: planId },
            data: {
              status: isPaused ? 'PAUSED' : 'ACTIVE',
              metadata: JSON.parse(
                JSON.stringify({
                  ...(((await prisma.paymentPlan.findUnique({ where: { id: planId } }))
                    ?.metadata as Record<string, unknown>) || {}),
                  [isPaused ? 'pausedAt' : 'resumedAt']: new Date().toISOString(),
                })
              ),
              updatedAt: new Date(),
            },
          });

          logger.info(`Payment plan ${isPaused ? 'paused' : 'resumed'}`, {
            planId,
            subscriptionId: subscription.id,
          });

          // Send notification
          await emailQueue.add(`payment-plan-${isPaused ? 'paused' : 'resumed'}`, {
            to: subscription.metadata.clientEmail || '',
            subject: `Payment Plan ${isPaused ? 'Paused' : 'Resumed'} - Vasquez Law Firm`,
            template: `payment-plan-${isPaused ? 'paused' : 'resumed'}`,
            data: {
              clientName: subscription.metadata.clientName || '',
              planId,
              nextPaymentDate: subscription.current_period_end
                ? new Date(subscription.current_period_end * 1000).toLocaleDateString()
                : null,
            },
          });
        }
        break;
      }

      default:
        logger.info('Unhandled webhook event type', { type: event.type });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    logger.error('Stripe webhook error', errorToLogMeta(error));
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

// Export with telemetry wrapper
export const POST = withPaymentTracing(handlePOST);

// Note: Next.js 13+ App Router handles raw body parsing automatically
