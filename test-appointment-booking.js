#!/usr/bin/env node

const API_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

async function testAppointmentBooking() {
  console.log('🧪 Testing Appointment Booking Integration\n');

  try {
    // Test 1: Check API health and configuration
    console.log('1️⃣ Testing API configuration...');
    const healthResponse = await fetch(`${API_URL}/api/appointment/test-booking`);
    const healthData = await healthResponse.json();

    console.log('✅ GHL Status:', healthData.ghlStatus?.status || 'Not configured');
    console.log('✅ Available Slots:', healthData.availableSlots?.count || 0);
    console.log('✅ Configuration:', healthData.configuration);
    console.log('');

    // Test 2: Test appointment intent parsing
    console.log('2️⃣ Testing intent parsing...');
    console.log('English intents:', healthData.intentParsing?.results.en);
    console.log('Spanish intents:', healthData.intentParsing?.results.es);
    console.log('');

    // Test 3: Test chat integration
    console.log('3️⃣ Testing chat with appointment request...');
    const chatResponse = await fetch(`${API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'I need to schedule an appointment for immigration consultation',
        locale: 'en',
        sessionId: 'test-session-' + Date.now(),
      }),
    });

    const chatData = await chatResponse.json();
    console.log('✅ Chat Response:', chatData.response);
    console.log('✅ Agent:', chatData.agent);
    console.log('');

    // Test 4: Test conversation flow
    console.log('4️⃣ Testing appointment conversation flow...');

    // Step 1: Initial request
    let conversationResponse = await fetch(`${API_URL}/api/appointment/test-booking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'test-conversation',
        message: 'I need an appointment',
        language: 'en',
        sessionData: {
          userId: 'test-user',
          bookingFlow: {},
        },
      }),
    });

    let conversationData = await conversationResponse.json();
    console.log('Step 1 - Initial:', conversationData.conversationResult?.response);
    console.log('Next step:', conversationData.conversationResult?.nextStep);

    // Step 2: Provide name
    if (conversationData.conversationResult?.nextStep === 'firstName') {
      conversationResponse = await fetch(`${API_URL}/api/appointment/test-booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'test-conversation',
          message: 'John',
          language: 'en',
          sessionData: {
            userId: 'test-user',
            bookingFlow: {
              firstName: 'John',
            },
          },
        }),
      });

      conversationData = await conversationResponse.json();
      console.log('\nStep 2 - Name:', conversationData.conversationResult?.response);
    }

    console.log('\n✅ All tests completed!');
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test
testAppointmentBooking();
