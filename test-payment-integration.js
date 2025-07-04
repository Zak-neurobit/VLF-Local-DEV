// Test script for payment integration
const axios = require('axios');

const baseUrl = 'http://localhost:3000';

async function testPayments() {
  console.log('🧪 Testing Payment Integration\n');

  // Test data
  const testPayment = {
    clientName: 'Test Client',
    clientEmail: 'test@example.com',
    amount: 1.0,
    description: 'Test payment',
    cardNumber: '4111111111111111', // Test card number
    expiryDate: '12/25',
    cvv: '123',
    zipCode: '12345',
  };

  // Test Authorize.Net
  console.log('1️⃣ Testing Authorize.Net...');
  try {
    const authResponse = await axios.post(`${baseUrl}/api/payment/authorize-net`, {
      ...testPayment,
      paymentMethod: {
        card_number: testPayment.cardNumber,
        exp_month: '12',
        exp_year: '25',
        cvv: testPayment.cvv,
        postal_code: testPayment.zipCode,
      },
    });

    if (authResponse.data.success) {
      console.log('✅ Authorize.Net test successful!');
      console.log(`   Transaction ID: ${authResponse.data.transactionId}`);
    } else {
      console.log('❌ Authorize.Net test failed:', authResponse.data.error);
    }
  } catch (error) {
    console.log('❌ Authorize.Net error:', error.response?.data || error.message);
  }

  console.log('\n2️⃣ Testing LawPay (Operating Account)...');
  try {
    const lawpayOpResponse = await axios.post(`${baseUrl}/api/payment/lawpay`, {
      ...testPayment,
      trustAccount: false,
      paymentMethod: {
        card_number: testPayment.cardNumber,
        exp_month: '12',
        exp_year: '25',
        cvv: testPayment.cvv,
        postal_code: testPayment.zipCode,
      },
    });

    if (lawpayOpResponse.data.success) {
      console.log('✅ LawPay Operating Account test successful!');
      console.log(`   Charge ID: ${lawpayOpResponse.data.chargeId}`);
    } else {
      console.log('❌ LawPay Operating Account test failed:', lawpayOpResponse.data.error);
    }
  } catch (error) {
    console.log('❌ LawPay Operating error:', error.response?.data || error.message);
  }

  console.log('\n3️⃣ Testing LawPay (Trust Account)...');
  try {
    const lawpayTrustResponse = await axios.post(`${baseUrl}/api/payment/lawpay`, {
      ...testPayment,
      trustAccount: true,
      paymentMethod: {
        card_number: testPayment.cardNumber,
        exp_month: '12',
        exp_year: '25',
        cvv: testPayment.cvv,
        postal_code: testPayment.zipCode,
      },
    });

    if (lawpayTrustResponse.data.success) {
      console.log('✅ LawPay Trust Account test successful!');
      console.log(`   Charge ID: ${lawpayTrustResponse.data.chargeId}`);
      console.log('   Trust accounting logged for compliance');
    } else {
      console.log('❌ LawPay Trust Account test failed:', lawpayTrustResponse.data.error);
    }
  } catch (error) {
    console.log('❌ LawPay Trust error:', error.response?.data || error.message);
  }

  console.log('\n📋 Test Summary:');
  console.log('- Authorize.Net endpoint: /api/payment/authorize-net');
  console.log('- LawPay endpoint: /api/payment/lawpay');
  console.log('- Payment form: /payment');
  console.log('\n⚠️  Note: These tests will fail without valid API credentials.');
  console.log('Set up your environment variables first!');
}

// Run tests
testPayments().catch(console.error);
