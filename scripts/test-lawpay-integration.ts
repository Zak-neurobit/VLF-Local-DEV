#!/usr/bin/env node

import { logger } from '../src/lib/logger';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const baseUrl = 'http://localhost:3000';

interface PaymentTestCase {
  name: string;
  amount: number;
  trustAccount: boolean;
  expectedResult: 'success' | 'failure';
}

const testCases: PaymentTestCase[] = [
  {
    name: 'Small Operating Account Payment',
    amount: 10.0,
    trustAccount: false,
    expectedResult: 'success',
  },
  {
    name: 'Large Trust Account Payment',
    amount: 5000.0,
    trustAccount: true,
    expectedResult: 'success',
  },
  {
    name: 'Test Card Payment',
    amount: 100.0,
    trustAccount: false,
    expectedResult: 'success',
  },
];

async function testLawPayIntegration() {
  console.log('🧪 LawPay Integration Test (Test Environment)');
  console.log('='.repeat(50));

  // Check configuration
  console.log('\n📋 Configuration Check:');
  console.log(`Public Key: ${process.env.LAWPAY_PUBLIC_KEY ? '✅ Set' : '❌ Missing'}`);
  console.log(`Secret Key: ${process.env.LAWPAY_SECRET_KEY ? '✅ Set' : '❌ Missing'}`);
  console.log(`Webhook Secret: ${process.env.LAWPAY_WEBHOOK_SECRET ? '✅ Set' : '❌ Missing'}`);

  // Test payment session creation
  console.log('\n🔧 Testing Payment Session Creation:');

  for (const testCase of testCases) {
    console.log(`\n📝 ${testCase.name}:`);

    try {
      const response = await fetch(`${baseUrl}/api/payment/lawpay-webhook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: testCase.amount,
          description: `Test Payment - ${testCase.name}`,
          clientEmail: 'test@example.com',
          clientName: 'Test Client',
          clientPhone: '919-555-0123',
          invoiceNumber: `TEST-${Date.now()}`,
          trustAccount: testCase.trustAccount,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.log(`❌ Failed: ${response.status} - ${error}`);
        continue;
      }

      const data = await response.json();
      console.log(`✅ Payment session created`);
      console.log(`   Payment ID: ${data.paymentId}`);
      console.log(`   Amount: $${data.amount}`);
      console.log(`   Checkout URL: ${data.checkoutUrl?.substring(0, 50)}...`);

      // Test payment status check
      const statusResponse = await fetch(
        `${baseUrl}/api/payment/lawpay-webhook?paymentId=${data.paymentId}`
      );

      if (statusResponse.ok) {
        const status = await statusResponse.json();
        console.log(`   Status: ${status.status}`);
      }
    } catch (error) {
      console.log(`❌ Error: ${error}`);
    }
  }

  // Test webhook endpoint
  console.log('\n🔔 Testing Webhook Handler:');

  const webhookPayload = {
    event_type: 'payment.succeeded',
    payment_id: 'test_payment_123',
    amount: 10000, // cents
    transaction_id: 'txn_test_123',
    metadata: {
      clientEmail: 'test@example.com',
      clientName: 'Test Client',
    },
  };

  try {
    const webhookResponse = await fetch(`${baseUrl}/api/webhooks/lawpay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-lawpay-signature': 'test-signature', // In production, this would be verified
      },
      body: JSON.stringify(webhookPayload),
    });

    if (webhookResponse.ok) {
      console.log('✅ Webhook handler working');
    } else {
      console.log(`❌ Webhook handler error: ${webhookResponse.status}`);
    }
  } catch (error) {
    console.log(`❌ Webhook test error: ${error}`);
  }

  // Display test card information
  console.log('\n💳 LawPay Test Cards:');
  console.log('For testing in LawPay test environment, use these cards:');
  console.log('');
  console.log('✅ Successful Payment:');
  console.log('   Card: 4111 1111 1111 1111');
  console.log('   Exp: Any future date');
  console.log('   CVV: Any 3 digits');
  console.log('');
  console.log('❌ Declined Payment:');
  console.log('   Card: 4000 0000 0000 0002');
  console.log('   Exp: Any future date');
  console.log('   CVV: Any 3 digits');

  console.log('\n' + '='.repeat(50));
  console.log('📱 To test the full flow:');
  console.log(`1. Visit: ${baseUrl}/payment/example`);
  console.log('2. Enter an amount and click "Pay with LawPay"');
  console.log('3. Use test cards above on LawPay checkout page');
  console.log('4. Check webhook logs for payment confirmation');
  console.log('='.repeat(50));
}

// Run the test
testLawPayIntegration().catch(error => {
  console.error('Test error:', error);
  process.exit(1);
});
