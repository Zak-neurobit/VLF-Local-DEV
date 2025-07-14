/**
 * Client Portal - Billing & Payments System
 * Handles invoicing, payment processing, and financial tracking
 */

import { logger } from '@/lib/logger';
import { prisma } from '@/lib/prisma-safe';
import { sendEmail } from '@/lib/email';
import { createNotification } from '@/lib/notifications';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export interface Invoice {
  id: string;
  caseId: string;
  clientId: string;
  invoiceNumber: string;
  
  // Billing Details
  billingPeriod: {
    start: Date;
    end: Date;
  };
  dueDate: Date;
  status: InvoiceStatus;
  
  // Line Items
  lineItems: Array<{
    id: string;
    description: string;
    category: 'legal_services' | 'expenses' | 'filing_fees' | 'other';
    quantity: number;
    rate: number;
    amount: number;
    date: Date;
    attorney?: string;
    isBillable: boolean;
  }>;
  
  // Financial Summary
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  paidAmount: number;
  balanceDue: number;
  
  // Payment Terms
  paymentTerms: string;
  lateFeePercentage: number;
  acceptedPaymentMethods: PaymentMethod[];
  
  // Timestamps
  issuedDate: Date;
  sentDate?: Date;
  viewedDate?: Date;
  paidDate?: Date;
  
  // Metadata
  notes?: string;
  internalNotes?: string;
  attachments?: string[];
}

export interface Payment {
  id: string;
  clientId: string;
  caseId?: string;
  invoiceId?: string;
  
  // Payment Details
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  
  // Transaction Info
  transactionId?: string;
  stripePaymentIntentId?: string;
  checkNumber?: string;
  
  // Processing
  processedDate?: Date;
  processingFee?: number;
  netAmount?: number;
  
  // Refund Info
  isRefunded: boolean;
  refundedAmount?: number;
  refundReason?: string;
  
  // Metadata
  description?: string;
  receiptUrl?: string;
  createdAt: Date;
}

export interface PaymentPlan {
  id: string;
  clientId: string;
  caseId: string;
  
  // Plan Details
  totalAmount: number;
  downPayment: number;
  remainingBalance: number;
  monthlyPayment: number;
  numberOfPayments: number;
  
  // Schedule
  startDate: Date;
  endDate: Date;
  nextPaymentDate: Date;
  paymentSchedule: Array<{
    dueDate: Date;
    amount: number;
    status: 'pending' | 'paid' | 'late' | 'waived';
    paidDate?: Date;
    paymentId?: string;
  }>;
  
  // Status
  status: 'active' | 'completed' | 'defaulted' | 'cancelled';
  completedPayments: number;
  missedPayments: number;
  
  // Terms
  lateFeeAmount: number;
  gracePeriodDays: number;
  autoPayEnabled: boolean;
  
  // Metadata
  agreementSignedDate?: Date;
  notes?: string;
}

export interface TrustAccount {
  id: string;
  clientId: string;
  caseId: string;
  
  // Account Details
  accountNumber: string;
  currentBalance: number;
  availableBalance: number;
  heldAmount: number;
  
  // Transactions
  transactions: Array<{
    id: string;
    date: Date;
    type: 'deposit' | 'withdrawal' | 'transfer' | 'hold' | 'release';
    amount: number;
    balance: number;
    description: string;
    reference?: string;
    approvedBy?: string;
  }>;
  
  // Metadata
  openedDate: Date;
  lastActivityDate: Date;
  status: 'active' | 'closed';
}

export type InvoiceStatus = 
  | 'draft' 
  | 'sent' 
  | 'viewed' 
  | 'partially_paid' 
  | 'paid' 
  | 'overdue' 
  | 'cancelled';

export type PaymentStatus = 
  | 'pending' 
  | 'processing' 
  | 'succeeded' 
  | 'failed' 
  | 'cancelled' 
  | 'refunded';

export type PaymentMethod = 
  | 'credit_card' 
  | 'ach' 
  | 'check' 
  | 'wire' 
  | 'cash' 
  | 'trust_account';

export class ClientPortalBillingPayments {
  /**
   * Create invoice for a case
   */
  async createInvoice(params: {
    caseId: string;
    clientId: string;
    lineItems: Invoice['lineItems'];
    dueDate?: Date;
    notes?: string;
    sendImmediately?: boolean;
  }): Promise<Invoice> {
    logger.info('Creating invoice', { caseId: params.caseId, clientId: params.clientId });

    try {
      // Generate invoice number
      const invoiceNumber = await this.generateInvoiceNumber();

      // Calculate totals
      const subtotal = params.lineItems.reduce((sum, item) => sum + item.amount, 0);
      const taxRate = await this.getApplicableTaxRate(params.clientId);
      const taxAmount = subtotal * taxRate;
      const totalAmount = subtotal + taxAmount;

      // Default due date is 30 days
      const dueDate = params.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

      // Create invoice
      const invoice = await prisma.invoice.create({
        data: {
          caseId: params.caseId,
          clientId: params.clientId,
          invoiceNumber,
          billingPeriod: JSON.stringify({
            start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            end: new Date(),
          }),
          dueDate,
          status: 'draft',
          lineItems: JSON.stringify(params.lineItems),
          subtotal,
          taxRate,
          taxAmount,
          discountAmount: 0,
          totalAmount,
          paidAmount: 0,
          balanceDue: totalAmount,
          paymentTerms: 'Net 30',
          lateFeePercentage: 1.5,
          acceptedPaymentMethods: ['credit_card', 'ach', 'check'],
          issuedDate: new Date(),
          notes: params.notes,
        },
      });

      // Send immediately if requested
      if (params.sendImmediately) {
        await this.sendInvoice(invoice.id);
      }

      return this.mapToInvoice(invoice);
    } catch (error) {
      logger.error('Failed to create invoice', { error, params });
      throw error;
    }
  }

  /**
   * Send invoice to client
   */
  async sendInvoice(invoiceId: string): Promise<void> {
    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: { client: true },
    });

    if (!invoice) {
      throw new Error('Invoice not found');
    }

    if (!invoice.client.email) {
      throw new Error('Client email not found');
    }

    // Generate PDF (simplified - would use actual PDF generation)
    const pdfUrl = await this.generateInvoicePDF(invoice);

    // Send email
    await sendEmail({
      to: invoice.client.email,
      subject: `Invoice ${invoice.invoiceNumber} from Vasquez Law Firm`,
      template: 'invoice',
      data: {
        clientName: invoice.client.name,
        invoiceNumber: invoice.invoiceNumber,
        totalAmount: invoice.totalAmount,
        dueDate: invoice.dueDate,
        viewUrl: `${process.env.NEXT_PUBLIC_APP_URL}/portal/invoices/${invoice.id}`,
        pdfUrl,
      },
    });

    // Update invoice status
    await prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        status: 'sent',
        sentDate: new Date(),
      },
    });

    // Create notification
    await createNotification({
      type: 'invoice_sent',
      priority: 'low',
      title: 'Invoice Sent',
      message: `Invoice ${invoice.invoiceNumber} sent to ${invoice.client.name}`,
      metadata: {
        invoiceId,
        clientId: invoice.clientId,
      },
    });
  }

  /**
   * Process payment for invoice
   */
  async processPayment(params: {
    clientId: string;
    invoiceId?: string;
    caseId?: string;
    amount: number;
    paymentMethod: PaymentMethod;
    paymentMethodId?: string; // Stripe payment method ID
    checkNumber?: string;
  }): Promise<Payment> {
    logger.info('Processing payment', { 
      clientId: params.clientId, 
      amount: params.amount,
      method: params.paymentMethod 
    });

    try {
      let stripePaymentIntentId: string | undefined;
      let transactionId: string | undefined;
      let status: PaymentStatus = 'pending';
      let processedDate: Date | undefined;
      let processingFee = 0;

      // Process based on payment method
      if (params.paymentMethod === 'credit_card' && params.paymentMethodId) {
        // Process credit card payment via Stripe
        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(params.amount * 100), // Convert to cents
          currency: 'usd',
          payment_method: params.paymentMethodId,
          confirm: true,
          metadata: {
            clientId: params.clientId,
            invoiceId: params.invoiceId || '',
            caseId: params.caseId || '',
          },
        });

        stripePaymentIntentId = paymentIntent.id;
        transactionId = paymentIntent.id;
        status = paymentIntent.status === 'succeeded' ? 'succeeded' : 'failed';
        processedDate = new Date();
        processingFee = paymentIntent.amount * 0.029 + 30; // Stripe fees
      } else if (params.paymentMethod === 'ach') {
        // Process ACH payment
        // In practice, would integrate with ACH processor
        transactionId = `ACH-${Date.now()}`;
        status = 'processing'; // ACH takes time
      } else if (params.paymentMethod === 'check') {
        // Record check payment
        transactionId = params.checkNumber || `CHK-${Date.now()}`;
        status = 'pending'; // Needs manual processing
      }

      // Create payment record
      const payment = await prisma.payment.create({
        data: {
          clientId: params.clientId,
          caseId: params.caseId,
          invoiceId: params.invoiceId,
          amount: params.amount,
          currency: 'USD',
          paymentMethod: params.paymentMethod,
          status,
          transactionId,
          stripePaymentIntentId,
          checkNumber: params.checkNumber,
          processedDate,
          processingFee,
          netAmount: params.amount - processingFee,
          isRefunded: false,
          description: params.invoiceId 
            ? `Payment for Invoice ${params.invoiceId}`
            : 'Account payment',
          createdAt: new Date(),
        },
      });

      // Update invoice if payment succeeded
      if (params.invoiceId && status === 'succeeded') {
        await this.applyPaymentToInvoice(payment.id, params.invoiceId);
      }

      // Update payment plan if applicable
      if (params.caseId) {
        await this.updatePaymentPlanProgress(params.caseId, payment.id);
      }

      // Send confirmation
      await this.sendPaymentConfirmation(payment);

      return this.mapToPayment(payment);
    } catch (error) {
      logger.error('Failed to process payment', { error, params });
      throw error;
    }
  }

  /**
   * Create payment plan
   */
  async createPaymentPlan(params: {
    clientId: string;
    caseId: string;
    totalAmount: number;
    downPayment: number;
    numberOfPayments: number;
    startDate?: Date;
    autoPayEnabled?: boolean;
  }): Promise<PaymentPlan> {
    logger.info('Creating payment plan', { 
      clientId: params.clientId,
      totalAmount: params.totalAmount,
      payments: params.numberOfPayments 
    });

    try {
      const remainingBalance = params.totalAmount - params.downPayment;
      const monthlyPayment = remainingBalance / params.numberOfPayments;
      const startDate = params.startDate || new Date();

      // Generate payment schedule
      const paymentSchedule = [];
      for (let i = 0; i < params.numberOfPayments; i++) {
        const dueDate = new Date(startDate);
        dueDate.setMonth(dueDate.getMonth() + i + 1);
        
        paymentSchedule.push({
          dueDate,
          amount: monthlyPayment,
          status: 'pending' as const,
        });
      }

      const endDate = paymentSchedule[paymentSchedule.length - 1].dueDate;

      // Create payment plan
      const plan = await prisma.paymentPlan.create({
        data: {
          clientId: params.clientId,
          caseId: params.caseId,
          totalAmount: params.totalAmount,
          downPayment: params.downPayment,
          remainingBalance,
          monthlyPayment,
          numberOfPayments: params.numberOfPayments,
          startDate,
          endDate,
          nextPaymentDate: paymentSchedule[0].dueDate,
          paymentSchedule: JSON.stringify(paymentSchedule),
          status: 'active',
          completedPayments: 0,
          missedPayments: 0,
          lateFeeAmount: 25,
          gracePeriodDays: 5,
          autoPayEnabled: params.autoPayEnabled || false,
        },
      });

      // Process down payment if provided
      if (params.downPayment > 0) {
        await this.processPayment({
          clientId: params.clientId,
          caseId: params.caseId,
          amount: params.downPayment,
          paymentMethod: 'credit_card', // Default, should be specified
        });
      }

      // Send agreement for signature
      await this.sendPaymentPlanAgreement(plan);

      return this.mapToPaymentPlan(plan);
    } catch (error) {
      logger.error('Failed to create payment plan', { error, params });
      throw error;
    }
  }

  /**
   * Get client billing summary
   */
  async getClientBillingSummary(clientId: string): Promise<{
    totalBilled: number;
    totalPaid: number;
    outstandingBalance: number;
    overdueAmount: number;
    recentPayments: Payment[];
    activePaymentPlans: PaymentPlan[];
    upcomingPayments: Array<{
      date: Date;
      amount: number;
      description: string;
    }>;
  }> {
    // Get all invoices
    const invoices = await prisma.invoice.findMany({
      where: { clientId },
    });

    // Get recent payments
    const payments = await prisma.payment.findMany({
      where: { 
        clientId,
        createdAt: { gte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) }, // 90 days
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    // Get active payment plans
    const paymentPlans = await prisma.paymentPlan.findMany({
      where: { 
        clientId,
        status: 'active',
      },
    });

    // Calculate totals
    const totalBilled = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
    const totalPaid = invoices.reduce((sum, inv) => sum + inv.paidAmount, 0);
    const outstandingBalance = totalBilled - totalPaid;

    // Calculate overdue amount
    const now = new Date();
    const overdueAmount = invoices
      .filter(inv => inv.status === 'overdue' || 
        (inv.status !== 'paid' && new Date(inv.dueDate) < now))
      .reduce((sum, inv) => sum + inv.balanceDue, 0);

    // Get upcoming payments
    const upcomingPayments = [];
    
    // From payment plans
    for (const plan of paymentPlans) {
      const schedule = JSON.parse(plan.paymentSchedule as string);
      const nextPayment = schedule.find((p: any) => 
        p.status === 'pending' && new Date(p.dueDate) > now
      );
      
      if (nextPayment) {
        upcomingPayments.push({
          date: new Date(nextPayment.dueDate),
          amount: nextPayment.amount,
          description: `Payment plan installment`,
        });
      }
    }

    // Sort upcoming payments by date
    upcomingPayments.sort((a, b) => a.date.getTime() - b.date.getTime());

    return {
      totalBilled,
      totalPaid,
      outstandingBalance,
      overdueAmount,
      recentPayments: payments.map(p => this.mapToPayment(p)),
      activePaymentPlans: paymentPlans.map(p => this.mapToPaymentPlan(p)),
      upcomingPayments: upcomingPayments.slice(0, 5),
    };
  }

  /**
   * Process trust account transaction
   */
  async processTrustTransaction(params: {
    clientId: string;
    caseId: string;
    type: 'deposit' | 'withdrawal' | 'transfer';
    amount: number;
    description: string;
    reference?: string;
    approvedBy: string;
  }): Promise<void> {
    logger.info('Processing trust account transaction', { 
      clientId: params.clientId,
      type: params.type,
      amount: params.amount 
    });

    try {
      // Get or create trust account
      let trustAccount = await prisma.trustAccount.findFirst({
        where: {
          clientId: params.clientId,
          caseId: params.caseId,
          status: 'active',
        },
      });

      if (!trustAccount) {
        // Create new trust account
        const accountNumber = await this.generateTrustAccountNumber();
        trustAccount = await prisma.trustAccount.create({
          data: {
            clientId: params.clientId,
            caseId: params.caseId,
            accountNumber,
            currentBalance: 0,
            availableBalance: 0,
            heldAmount: 0,
            transactions: JSON.stringify([]),
            openedDate: new Date(),
            lastActivityDate: new Date(),
            status: 'active',
          },
        });
      }

      // Calculate new balance
      const transactions = JSON.parse(trustAccount.transactions as string) || [];
      const currentBalance = trustAccount.currentBalance;
      let newBalance = currentBalance;

      if (params.type === 'deposit') {
        newBalance += params.amount;
      } else if (params.type === 'withdrawal') {
        if (params.amount > trustAccount.availableBalance) {
          throw new Error('Insufficient funds in trust account');
        }
        newBalance -= params.amount;
      }

      // Add transaction
      transactions.push({
        id: `trust-txn-${Date.now()}`,
        date: new Date(),
        type: params.type,
        amount: params.amount,
        balance: newBalance,
        description: params.description,
        reference: params.reference,
        approvedBy: params.approvedBy,
      });

      // Update trust account
      await prisma.trustAccount.update({
        where: { id: trustAccount.id },
        data: {
          currentBalance: newBalance,
          availableBalance: newBalance - trustAccount.heldAmount,
          transactions: JSON.stringify(transactions),
          lastActivityDate: new Date(),
        },
      });

      // Create audit log
      await this.createTrustAccountAuditLog({
        accountId: trustAccount.id,
        action: params.type,
        amount: params.amount,
        performedBy: params.approvedBy,
        details: params.description,
      });

      // Send notification
      await createNotification({
        type: 'trust_account_activity',
        priority: 'medium',
        title: 'Trust Account Transaction',
        message: `${params.type} of $${params.amount} processed`,
        metadata: {
          clientId: params.clientId,
          caseId: params.caseId,
          transactionType: params.type,
          amount: params.amount,
        },
      });
    } catch (error) {
      logger.error('Failed to process trust transaction', { error, params });
      throw error;
    }
  }

  /**
   * Generate financial report
   */
  async generateFinancialReport(params: {
    clientId: string;
    caseId?: string;
    startDate: Date;
    endDate: Date;
    includeDetails?: boolean;
  }): Promise<{
    summary: {
      totalBilled: number;
      totalPaid: number;
      totalExpenses: number;
      netAmount: number;
    };
    invoices: Invoice[];
    payments: Payment[];
    trustActivity?: any[];
  }> {
    // Get invoices in date range
    const invoices = await prisma.invoice.findMany({
      where: {
        clientId: params.clientId,
        ...(params.caseId && { caseId: params.caseId }),
        issuedDate: {
          gte: params.startDate,
          lte: params.endDate,
        },
      },
      orderBy: { issuedDate: 'asc' },
    });

    // Get payments in date range
    const payments = await prisma.payment.findMany({
      where: {
        clientId: params.clientId,
        ...(params.caseId && { caseId: params.caseId }),
        createdAt: {
          gte: params.startDate,
          lte: params.endDate,
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    // Calculate summary
    const totalBilled = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
    const totalPaid = payments
      .filter(p => p.status === 'succeeded')
      .reduce((sum, p) => sum + p.amount, 0);
    
    // Calculate expenses from line items
    const totalExpenses = invoices.reduce((sum, inv) => {
      const lineItems = JSON.parse(inv.lineItems as string);
      return sum + lineItems
        .filter((item: any) => item.category === 'expenses' || item.category === 'filing_fees')
        .reduce((itemSum: number, item: any) => itemSum + item.amount, 0);
    }, 0);

    const report = {
      summary: {
        totalBilled,
        totalPaid,
        totalExpenses,
        netAmount: totalBilled - totalExpenses,
      },
      invoices: invoices.map(i => this.mapToInvoice(i)),
      payments: payments.map(p => this.mapToPayment(p)),
    };

    // Include trust account activity if requested
    if (params.includeDetails && params.caseId) {
      const trustAccount = await prisma.trustAccount.findFirst({
        where: {
          clientId: params.clientId,
          caseId: params.caseId,
        },
      });

      if (trustAccount) {
        const transactions = JSON.parse(trustAccount.transactions as string) || [];
        report.trustActivity = transactions.filter((t: any) => 
          new Date(t.date) >= params.startDate && 
          new Date(t.date) <= params.endDate
        );
      }
    }

    return report;
  }

  // Helper methods

  private async generateInvoiceNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const lastInvoice = await prisma.invoice.findFirst({
      where: {
        invoiceNumber: { startsWith: `INV-${year}-` },
      },
      orderBy: { createdAt: 'desc' },
    });

    let sequence = 1;
    if (lastInvoice) {
      const lastSequence = parseInt(lastInvoice.invoiceNumber.split('-')[2]);
      sequence = lastSequence + 1;
    }

    return `INV-${year}-${sequence.toString().padStart(5, '0')}`;
  }

  private async generateTrustAccountNumber(): Promise<string> {
    const random = Math.floor(Math.random() * 1000000);
    return `TRUST-${Date.now()}-${random}`;
  }

  private async getApplicableTaxRate(clientId: string): Promise<number> {
    // In practice, would determine based on client location
    // For now, use NC sales tax rate
    return 0.0475; // 4.75%
  }

  private async generateInvoicePDF(invoice: any): Promise<string> {
    // In practice, would generate actual PDF
    return `${process.env.NEXT_PUBLIC_APP_URL}/api/invoices/${invoice.id}/pdf`;
  }

  private async applyPaymentToInvoice(paymentId: string, invoiceId: string): Promise<void> {
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
    });

    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
    });

    if (!payment || !invoice) return;

    const newPaidAmount = invoice.paidAmount + payment.amount;
    const newBalanceDue = invoice.totalAmount - newPaidAmount;
    const newStatus = newBalanceDue <= 0 ? 'paid' : 'partially_paid';

    await prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        paidAmount: newPaidAmount,
        balanceDue: newBalanceDue,
        status: newStatus,
        paidDate: newStatus === 'paid' ? new Date() : undefined,
      },
    });
  }

  private async updatePaymentPlanProgress(caseId: string, paymentId: string): Promise<void> {
    const plan = await prisma.paymentPlan.findFirst({
      where: {
        caseId,
        status: 'active',
      },
    });

    if (!plan) return;

    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
    });

    if (!payment || payment.status !== 'succeeded') return;

    // Update payment schedule
    const schedule = JSON.parse(plan.paymentSchedule as string);
    const nextPending = schedule.find((p: any) => p.status === 'pending');
    
    if (nextPending) {
      nextPending.status = 'paid';
      nextPending.paidDate = new Date();
      nextPending.paymentId = paymentId;
    }

    // Update plan statistics
    const completedPayments = schedule.filter((p: any) => p.status === 'paid').length;
    const nextPayment = schedule.find((p: any) => p.status === 'pending');
    const status = completedPayments === plan.numberOfPayments ? 'completed' : 'active';

    await prisma.paymentPlan.update({
      where: { id: plan.id },
      data: {
        paymentSchedule: JSON.stringify(schedule),
        completedPayments,
        nextPaymentDate: nextPayment ? new Date(nextPayment.dueDate) : undefined,
        status,
      },
    });
  }

  private async sendPaymentConfirmation(payment: any): Promise<void> {
    const client = await prisma.user.findUnique({
      where: { id: payment.clientId },
    });

    if (!client?.email || payment.status !== 'succeeded') return;

    await sendEmail({
      to: client.email,
      subject: 'Payment Confirmation - Vasquez Law Firm',
      template: 'payment-confirmation',
      data: {
        clientName: client.name,
        amount: payment.amount,
        transactionId: payment.transactionId,
        date: payment.processedDate,
        receiptUrl: `${process.env.NEXT_PUBLIC_APP_URL}/portal/payments/${payment.id}`,
      },
    });
  }

  private async sendPaymentPlanAgreement(plan: any): Promise<void> {
    const client = await prisma.user.findUnique({
      where: { id: plan.clientId },
    });

    if (!client?.email) return;

    await sendEmail({
      to: client.email,
      subject: 'Payment Plan Agreement - Vasquez Law Firm',
      template: 'payment-plan-agreement',
      data: {
        clientName: client.name,
        totalAmount: plan.totalAmount,
        monthlyPayment: plan.monthlyPayment,
        numberOfPayments: plan.numberOfPayments,
        agreementUrl: `${process.env.NEXT_PUBLIC_APP_URL}/portal/payment-plans/${plan.id}`,
      },
    });
  }

  private async createTrustAccountAuditLog(params: any): Promise<void> {
    await prisma.auditLog.create({
      data: {
        entityType: 'trust_account',
        entityId: params.accountId,
        action: params.action,
        performedBy: params.performedBy,
        performedAt: new Date(),
        details: JSON.stringify({
          amount: params.amount,
          description: params.details,
        }),
      },
    });
  }

  // Mapping methods

  private mapToInvoice(data: any): Invoice {
    return {
      id: data.id,
      caseId: data.caseId,
      clientId: data.clientId,
      invoiceNumber: data.invoiceNumber,
      billingPeriod: JSON.parse(data.billingPeriod),
      dueDate: data.dueDate,
      status: data.status,
      lineItems: JSON.parse(data.lineItems),
      subtotal: data.subtotal,
      taxRate: data.taxRate,
      taxAmount: data.taxAmount,
      discountAmount: data.discountAmount,
      totalAmount: data.totalAmount,
      paidAmount: data.paidAmount,
      balanceDue: data.balanceDue,
      paymentTerms: data.paymentTerms,
      lateFeePercentage: data.lateFeePercentage,
      acceptedPaymentMethods: data.acceptedPaymentMethods,
      issuedDate: data.issuedDate,
      sentDate: data.sentDate,
      viewedDate: data.viewedDate,
      paidDate: data.paidDate,
      notes: data.notes,
      internalNotes: data.internalNotes,
      attachments: data.attachments || [],
    };
  }

  private mapToPayment(data: any): Payment {
    return {
      id: data.id,
      clientId: data.clientId,
      caseId: data.caseId,
      invoiceId: data.invoiceId,
      amount: data.amount,
      currency: data.currency,
      paymentMethod: data.paymentMethod,
      status: data.status,
      transactionId: data.transactionId,
      stripePaymentIntentId: data.stripePaymentIntentId,
      checkNumber: data.checkNumber,
      processedDate: data.processedDate,
      processingFee: data.processingFee,
      netAmount: data.netAmount,
      isRefunded: data.isRefunded,
      refundedAmount: data.refundedAmount,
      refundReason: data.refundReason,
      description: data.description,
      receiptUrl: data.receiptUrl,
      createdAt: data.createdAt,
    };
  }

  private mapToPaymentPlan(data: any): PaymentPlan {
    return {
      id: data.id,
      clientId: data.clientId,
      caseId: data.caseId,
      totalAmount: data.totalAmount,
      downPayment: data.downPayment,
      remainingBalance: data.remainingBalance,
      monthlyPayment: data.monthlyPayment,
      numberOfPayments: data.numberOfPayments,
      startDate: data.startDate,
      endDate: data.endDate,
      nextPaymentDate: data.nextPaymentDate,
      paymentSchedule: JSON.parse(data.paymentSchedule),
      status: data.status,
      completedPayments: data.completedPayments,
      missedPayments: data.missedPayments,
      lateFeeAmount: data.lateFeeAmount,
      gracePeriodDays: data.gracePeriodDays,
      autoPayEnabled: data.autoPayEnabled,
      agreementSignedDate: data.agreementSignedDate,
      notes: data.notes,
    };
  }
}

// Export singleton instance
export const clientPortalBillingPayments = new ClientPortalBillingPayments();