/**
 * Retell SDK Test Script
 * Tests all Retell voice call functionality
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:3000';
const RETELL_API_KEY = process.env.RETELL_API_KEY || '';

async function testRetellConnection() {
  console.log('\n🔍 Testing Retell Connection...');
  try {
    const response = await axios.get(`${BASE_URL}/api/retell/test-connection`);
    console.log('✅ Connection test passed:', {
      status: response.data.overallStatus,
      environment: response.data.environment,
      connectionTest: response.data.connectionTest
    });
    return true;
  } catch (error) {
    console.error('❌ Connection test failed:', error.response?.data || error.message);
    return false;
  }
}

async function testCreateCall(language = 'en') {
  console.log(`\n📞 Testing Call Creation (${language})...`);
  try {
    const response = await axios.post(`${BASE_URL}/api/retell/create-call`, {
      language
    });
    console.log('✅ Call created successfully:', {
      callId: response.data.callId,
      hasAccessToken: !!response.data.accessToken,
      hasWebCallLink: !!response.data.webCallLink
    });
    return response.data;
  } catch (error) {
    console.error('❌ Call creation failed:', error.response?.data || error.message);
    return null;
  }
}

async function testWebhookEndpoint() {
  console.log('\n🔔 Testing Webhook Endpoint...');
  try {
    const response = await axios.get(`${BASE_URL}/api/webhooks/retell`);
    console.log('✅ Webhook endpoint is accessible:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Webhook endpoint test failed:', error.response?.data || error.message);
    return false;
  }
}

async function testDirectRetellAPI() {
  console.log('\n🔗 Testing Direct Retell API Connection...');
  try {
    // Test listing agents directly from Retell API
    const response = await axios.get('https://api.retellai.com/v2/list-agents', {
      headers: {
        'Authorization': `Bearer ${RETELL_API_KEY}`
      }
    });
    console.log('✅ Direct Retell API works. Found agents:', response.data.length || 0);
    
    // Show agent details
    if (response.data && response.data.length > 0) {
      response.data.forEach(agent => {
        console.log(`  - ${agent.agent_name || 'Unnamed'} (${agent.agent_id})`);
      });
    }
    return true;
  } catch (error) {
    console.error('❌ Direct Retell API failed:', error.response?.data || error.message);
    return false;
  }
}

async function testVoiceAnalytics() {
  console.log('\n📊 Testing Voice Analytics Endpoint...');
  try {
    const response = await axios.get(`${BASE_URL}/api/voice/analytics`);
    console.log('✅ Voice analytics endpoint accessible:', response.data);
    return true;
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('⚠️ Voice analytics requires authentication (expected)');
      return true;
    }
    console.error('❌ Voice analytics test failed:', error.response?.data || error.message);
    return false;
  }
}

async function runAllTests() {
  console.log('='.repeat(50));
  console.log('🎯 RETELL SDK COMPREHENSIVE TEST');
  console.log('='.repeat(50));
  
  const results = {
    connection: await testRetellConnection(),
    directAPI: await testDirectRetellAPI(),
    createCallEN: await testCreateCall('en'),
    createCallES: await testCreateCall('es'),
    webhook: await testWebhookEndpoint(),
    analytics: await testVoiceAnalytics()
  };
  
  console.log('\n' + '='.repeat(50));
  console.log('📋 TEST SUMMARY');
  console.log('='.repeat(50));
  
  Object.entries(results).forEach(([test, passed]) => {
    console.log(`${passed ? '✅' : '❌'} ${test}: ${passed ? 'PASSED' : 'FAILED'}`);
  });
  
  const totalTests = Object.keys(results).length;
  const passedTests = Object.values(results).filter(r => r).length;
  
  console.log('\n' + '-'.repeat(50));
  console.log(`Total: ${passedTests}/${totalTests} tests passed`);
  
  if (passedTests === totalTests) {
    console.log('🎉 All tests passed! Retell SDK is working correctly.');
  } else {
    console.log('⚠️ Some tests failed. Please check the configuration.');
  }
  
  // If calls were created, show how to test them
  if (results.createCallEN) {
    console.log('\n💡 To test the voice call in your browser:');
    console.log('1. Visit http://localhost:3000/debug-voice');
    console.log('2. Click "Start Voice Call"');
    console.log('3. Allow microphone access when prompted');
    console.log('4. Start speaking to interact with the AI agent');
  }
}

// Run tests
runAllTests().catch(console.error);