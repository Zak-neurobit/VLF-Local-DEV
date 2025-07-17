#!/usr/bin/env ts-node

/**
 * Direct AI Chat System Test
 * Tests the AI chat functionality without requiring the server to be running
 */

import { enhancedChatService } from './src/lib/ai/enhanced-chat-service';
import { AgentOrchestrator } from './src/lib/agents/agent-orchestrator';
import { aiTranslationService } from './src/lib/ai/translation-service';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env.local') });

interface TestCase {
  name: string;
  message: string;
  language: 'en' | 'es';
  expectedIntent?: string;
}

async function testAIChatSystem() {
  console.log('🤖 AI Chat System Test\n');
  console.log('='.repeat(50));

  // Check if OpenAI API key is configured
  const hasOpenAI = !!process.env.OPENAI_API_KEY;
  console.log(`\n📋 Configuration Status:`);
  console.log(`- OpenAI API Key: ${hasOpenAI ? '✅ Configured' : '❌ Not configured'}`);
  console.log(`- Environment: ${process.env.NODE_ENV || 'development'}`);

  if (!hasOpenAI) {
    console.log('\n⚠️  Warning: OpenAI API key not configured. Some tests may fail.');
  }

  // Test cases
  const testCases: TestCase[] = [
    {
      name: 'Basic English Greeting',
      message: 'Hello, I need help with legal services',
      language: 'en',
      expectedIntent: 'general',
    },
    {
      name: 'Spanish Immigration Query',
      message: 'Hola, necesito ayuda con mi caso de inmigración',
      language: 'es',
      expectedIntent: 'immigration',
    },
    {
      name: 'Emergency Legal Situation',
      message: 'This is urgent! I was just arrested and need immediate help',
      language: 'en',
      expectedIntent: 'emergency',
    },
    {
      name: 'Consultation Request',
      message: 'I would like to schedule a free consultation',
      language: 'en',
      expectedIntent: 'consultation',
    },
    {
      name: 'Personal Injury Case',
      message: 'I was in a car accident last week and suffered injuries',
      language: 'en',
      expectedIntent: 'personal_injury',
    },
    {
      name: 'Workers Compensation',
      message: 'I got injured at work and need help with my claim',
      language: 'en',
      expectedIntent: 'workers_comp',
    },
    {
      name: 'Criminal Defense',
      message: 'I need a lawyer for my DUI case',
      language: 'en',
      expectedIntent: 'criminal_defense',
    },
    {
      name: 'Family Law Matter',
      message: 'I need help with divorce proceedings',
      language: 'en',
      expectedIntent: 'family_law',
    },
  ];

  console.log(`\n🧪 Running ${testCases.length} test cases...\n`);

  const results = [];

  for (const testCase of testCases) {
    console.log(`\n📝 Test: ${testCase.name}`);
    console.log(`Message: "${testCase.message}"`);
    console.log(`Language: ${testCase.language}`);

    try {
      const startTime = Date.now();

      // Create test context
      const context = {
        userId: 'test-user',
        sessionId: `test-${Date.now()}`,
        language: testCase.language,
        socketId: 'test-socket',
        history: [],
        conversationContext: [],
        metadata: {
          source: 'web_chat' as const,
        },
      };

      // Process message through enhanced chat service
      const response = await enhancedChatService.processMessage(testCase.message, context);
      const responseTime = Date.now() - startTime;

      // Display results
      console.log(`\n✅ Response received in ${responseTime}ms`);
      console.log(`Agent: ${response.agent}`);
      console.log(`Confidence: ${response.confidence}`);
      console.log(`Intent: ${response.intentAnalysis?.primary || 'none'}`);
      console.log(`Response preview: ${response.response.substring(0, 150)}...`);

      if (response.suggestions && response.suggestions.length > 0) {
        console.log(`Suggestions: ${response.suggestions.join(', ')}`);
      }

      // Validate intent detection
      if (testCase.expectedIntent && response.intentAnalysis) {
        const intentMatch = response.intentAnalysis.primary === testCase.expectedIntent;
        console.log(
          `Intent Detection: ${intentMatch ? '✅ Correct' : '❌ Incorrect'} (expected: ${testCase.expectedIntent}, got: ${response.intentAnalysis.primary})`
        );
      }

      results.push({
        testCase: testCase.name,
        success: true,
        responseTime,
        agent: response.agent,
        confidence: response.confidence,
        intent: response.intentAnalysis?.primary,
      });
    } catch (error) {
      console.log(`\n❌ Test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      results.push({
        testCase: testCase.name,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  // Test translation service
  console.log('\n\n🌐 Testing Translation Service...\n');

  try {
    const testText =
      'This is not legal advice and does not create an attorney-client relationship.';
    console.log(`Original text: "${testText}"`);

    const translated = await aiTranslationService.translateText(testText, 'es');
    console.log(`Spanish translation: "${translated}"`);

    const detectedLang = await aiTranslationService.detectLanguage('¿Cómo puedo obtener una visa?');
    console.log(`\nLanguage detection test: "¿Cómo puedo obtener una visa?" -> ${detectedLang}`);
  } catch (error) {
    console.log(
      `Translation test failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }

  // Test agent orchestrator
  console.log('\n\n🤖 Testing Agent Orchestrator...\n');

  try {
    const orchestrator = AgentOrchestrator.getInstance();
    const agentStatus = orchestrator.getAgentStatus();

    console.log('Available agents:');
    Object.entries(agentStatus).forEach(([agent, isOnline]) => {
      console.log(`- ${agent}: ${isOnline ? '✅ Online' : '❌ Offline'}`);
    });

    const metrics = orchestrator.getAllMetrics();
    console.log(`\nTotal agents: ${Object.keys(agentStatus).length}`);
    console.log(`Metrics available: ${Object.keys(metrics).length > 0 ? 'Yes' : 'No'}`);
  } catch (error) {
    console.log(
      `Agent orchestrator test failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }

  // Summary
  console.log('\n\n📊 Test Summary');
  console.log('='.repeat(50));

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`Total tests: ${results.length}`);
  console.log(
    `Successful: ${successful.length} (${Math.round((successful.length / results.length) * 100)}%)`
  );
  console.log(`Failed: ${failed.length}`);

  if (successful.length > 0) {
    const avgResponseTime =
      successful.filter(r => r.responseTime).reduce((sum, r) => sum + (r.responseTime || 0), 0) /
      successful.filter(r => r.responseTime).length;
    console.log(`Average response time: ${Math.round(avgResponseTime)}ms`);
  }

  console.log('\n✨ Test complete!');
}

// Run the test
testAIChatSystem().catch(error => {
  console.error('\n❌ Test execution failed:', error);
  process.exit(1);
});
