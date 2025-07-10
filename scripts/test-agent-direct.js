#!/usr/bin/env node

const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

console.log('Testing Agent Orchestrator directly...\n');

// Test OpenAI key
console.log('OpenAI API Key configured:', !!process.env.OPENAI_API_KEY);

// Try to load the agent directly
try {
  // Set up module alias
  require('module-alias/register');
  
  console.log('\nAttempting to load LegalConsultationAgent...');
  const { LegalConsultationAgent } = require('../src/lib/crewai/agents/legal-consultation-agent');
  
  console.log('✅ LegalConsultationAgent loaded successfully');
  
  const agent = new LegalConsultationAgent();
  console.log('✅ Agent instance created');
  
  // Test the agent
  console.log('\nTesting agent analyze method...');
  agent.analyze({
    userId: 'test-user',
    language: 'en',
    caseType: 'immigration',
    description: 'I need help with my visa application',
    urgency: 'medium',
    location: 'Charlotte, NC'
  }).then(response => {
    console.log('✅ Agent response:', JSON.stringify(response, null, 2));
  }).catch(error => {
    console.error('❌ Agent error:', error.message);
  });
  
} catch (error) {
  console.error('❌ Failed to load agent:', error.message);
  console.error('Stack:', error.stack);
}