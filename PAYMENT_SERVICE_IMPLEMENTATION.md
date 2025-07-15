# Payment Service Implementation

## Overview

Complete implementation of the payment service for Vasquez Law Firm with support for multiple payment gateways, trust accounting, and comprehensive payment management.

## Features Implemented

### 1. Multi-Gateway Payment Processing

- **Stripe**: Credit/debit cards and ACH payments
- **LawPay**: Legal-specific payment processor with trust account support
- **Authorize.Net**: Traditional credit card processing

### 2. Trust Account Management

- Separate trust and operating account handling
- IOLTA compliance for trust transactions
- Trust account balance tracking
- Transaction reconciliation

### 3. Payment Features

- Payment processing with validation
- Refund handling (full and partial)
- Payment plans and installments
- Payment history tracking
- Receipt generation and emailing

### 4. Database Models Added

#### Payment Model

```typescript
model Payment {
  id              String    @id @default(cuid())
  amount          Float
  currency        String    @default("USD")
  description     String
  gateway         PaymentGateway
  gatewayTransactionId String?
  gatewayChargeId String?
  gatewayReference String?
  authCode        String?
  accountType     AccountType @default(OPERATING)
  clientEmail     String
  clientName      String
  clientPhone     String?
  caseId          String?
  status          PaymentStatus
  failureReason   String?
  paymentMethod   PaymentMethod
  last4           String?
  processedAt     DateTime?
  refundedAt      DateTime?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  refunds         PaymentRefund[]
  metadata        Json      @default("{}")
}
```

#### Trust Ledger Model

```typescript
model TrustLedger {
  id              String    @id @default(cuid())
  transactionType TrustTransactionType
  amount          Float
  balance         Float
  clientName      String
  clientEmail     String
  caseId          String?
  paymentId       String?
  reference       String
  description     String
  recordedBy      String
  approvedBy      String?
  reconciled      Boolean   @default(false)
  reconciledAt    DateTime?
  metadata        Json      @default("{}")
  createdAt       DateTime  @default(now())
}
```

#### Payment Plan Model

```typescript
model PaymentPlan {
  id              String    @id @default(cuid())
  clientEmail     String
  clientName      String
  caseId          String?
  totalAmount     Float
  installments    Int
  monthlyAmount   Float
  startDate       DateTime
  nextPaymentDate DateTime?
  status          PaymentPlanStatus
  paidAmount      Float     @default(0)
  remainingAmount Float
  metadata        Json      @default("{}")
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}
```

## API Endpoints

### POST /api/payments

Process payments, create refunds, and manage payment plans.

#### Process Payment

```json
{
  "action": "process",
  "amount": 500.0,
  "currency": "USD",
  "description": "Legal consultation fee",
  "clientEmail": "client@example.com",
  "clientName": "John Doe",
  "clientPhone": "+1234567890",
  "caseId": "case_123",
  "paymentMethod": {
    "type": "card",
    "cardNumber": "4242424242424242",
    "expiryDate": "12/25",
    "cvv": "123"
  },
  "options": {
    "gateway": "stripe",
    "trustAccount": true
  }
}
```

#### Process Refund

```json
{
  "action": "refund",
  "paymentId": "pay_123",
  "amount": 250.0,
  "reason": "Partial service cancellation"
}
```

#### Create Payment Plan

```json
{
  "action": "create-plan",
  "clientEmail": "client@example.com",
  "clientName": "John Doe",
  "totalAmount": 2000.0,
  "installments": 4,
  "startDate": "2024-01-01T00:00:00Z",
  "caseId": "case_123"
}
```

### GET /api/payments

Retrieve payment information.

#### Get Payment History

```
GET /api/payments?action=history&clientEmail=client@example.com&limit=50
```

#### Get Trust Account Balance

```
GET /api/payments?action=trust-balance&clientEmail=client@example.com&caseId=case_123
```

#### Get Trust Transactions

```
GET /api/payments?action=trust-transactions&clientEmail=client@example.com&startDate=2024-01-01&endDate=2024-12-31
```

## Payment Gateway Configuration

### Environment Variables Required

#### Stripe

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

#### LawPay

```env
LAWPAY_PUBLIC_KEY=pk_...
LAWPAY_SECRET_KEY=sk_...
LAWPAY_TRUST_ACCOUNT_ID=acct_trust_...
LAWPAY_OPERATING_ACCOUNT_ID=acct_operating_...
```

#### Authorize.Net

```env
AUTHORIZENET_LOGIN_ID=your_login_id
AUTHORIZENET_TRANSACTION_KEY=your_transaction_key
```

## Gateway Selection Logic

1. **Trust Account Transactions**: Always use LawPay for compliance
2. **Legal Services**: Use LawPay for attorney-client privilege protection
3. **General Payments**: Use Stripe if available, fallback to Authorize.Net

## Trust Account Compliance

### Features

- Separate trust and operating account tracking
- Running balance calculations
- Transaction reconciliation tracking
- Compliance reporting
- Audit trail maintenance

### Trust Transaction Types

- `DEPOSIT`: Client payments into trust
- `WITHDRAWAL`: Payments from trust to operating
- `TRANSFER_IN`: Transfers into trust account
- `TRANSFER_OUT`: Transfers out of trust account
- `FEE`: Fee deductions
- `INTEREST`: Interest earned
- `ADJUSTMENT`: Manual adjustments

## Security Features

### Data Protection

- Credit card data not stored (tokenized by gateways)
- PCI compliance through gateway providers
- Secure webhook handling with signature verification
- Input validation and sanitization

### Access Control

- Payment processing: Public (with validation)
- Refunds: Admin/Attorney only
- Trust account access: Authorized users only
- Audit logging for all transactions

## Error Handling

### Payment Failures

- Detailed error messages
- Failed payment notifications
- Retry mechanisms for temporary failures
- Comprehensive logging

### Webhook Processing

- Signature verification
- Idempotency handling
- Error recovery
- Event replay capability

## React Payment Form Component

Located at `/src/components/PaymentForm.tsx`

### Features

- Card and ACH payment support
- Trust account selection
- Real-time validation
- Responsive design
- Security notices
- Success/error handling

### Usage

```jsx
import { PaymentForm } from '@/components/PaymentForm';

<PaymentForm
  caseId="case_123"
  defaultAmount={500.0}
  defaultDescription="Legal services"
  onSuccess={paymentId => console.log('Payment successful:', paymentId)}
  onError={error => console.error('Payment failed:', error)}
/>;
```

## Testing

### Test Cards (Stripe)

- Success: `4242424242424242`
- Decline: `4000000000000002`
- Insufficient Funds: `4000000000009995`

### Test Environment

All gateways support sandbox/test modes for development.

## Monitoring and Logging

### Payment Events Logged

- Payment attempts and results
- Refund processing
- Trust account transactions
- Gateway responses
- Error conditions

### Webhooks Monitoring

- Stripe webhook events
- Payment status updates
- Dispute notifications
- Subscription events

## Deployment Considerations

### Database Migration

```bash
npx prisma migrate deploy
```

### Environment Setup

1. Configure gateway credentials
2. Set up webhook endpoints
3. Configure email templates
4. Test payment flows

### Production Checklist

- [ ] Switch to production gateway URLs
- [ ] Configure production API keys
- [ ] Set up webhook endpoints
- [ ] Test payment processing
- [ ] Verify trust account handling
- [ ] Configure monitoring and alerts

## Support and Maintenance

### Regular Tasks

- Trust account reconciliation
- Payment gateway fee analysis
- Failed payment follow-up
- Security updates

### Monitoring

- Payment success rates
- Gateway performance
- Trust account balances
- Compliance reporting

This implementation provides a comprehensive payment processing system suitable for a law firm with proper trust accounting, compliance features, and professional payment handling capabilities.
