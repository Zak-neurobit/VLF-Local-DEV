#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });

// Import the orchestrator
const { AgentOrchestrator } = require('../dist/lib/agents/agent-orchestrator');

async function testOrchestrator() {
  console.log('Testing Agent Orchestrator...\n');
  
  try {
    // Get orchestrator instance
    console.log('1. Getting orchestrator instance...');
    const orchestrator = AgentOrchestrator.getInstance();
    console.log('✅ Orchestrator instance created\n');
    
    // Check agent status
    console.log('2. Checking agent status...');
    const status = orchestrator.getAgentStatus();
    console.log('Agent Status:', status);
    console.log('✅ Agent status retrieved\n');
    
    // Test routing a message
    console.log('3. Testing message routing...');
    const testContext = {
      userId: 'test-user',
      sessionId: 'test-session',
      language: 'en',
      history: []
    };
    
    try {
      const response = await orchestrator.routeMessage('I need help with immigration', testContext);
      console.log('Response:', JSON.stringify(response, null, 2));
      console.log('✅ Message routed successfully\n');
    } catch (routeError) {
      console.error('❌ Route error:', routeError.message);
      console.error('Stack:', routeError.stack);
    }
    
    // Get metrics
    console.log('4. Getting metrics...');
    const metrics = orchestrator.getAllMetrics();
    console.log('Metrics:', JSON.stringify(metrics, null, 2));
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

// Run the test
testOrchestrator().then(() => {
  console.log('\n✅ All tests completed');
  process.exit(0);
}).catch(error => {
  console.error('\n❌ Test failed:', error);
  process.exit(1);
});