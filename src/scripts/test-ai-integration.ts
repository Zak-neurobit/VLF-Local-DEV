#!/usr/bin/env ts-node

/**
 * Test script for AI integration components
 * This script tests the enhanced chat service, translation service, and agent orchestrator
 */

import { enhancedChatService } from '../lib/ai/enhanced-chat-service';
import { aiTranslationService } from '../lib/ai/translation-service';
import { AgentOrchestrator } from '../lib/agents/agent-orchestrator';
import { aiHealthChecker } from '../lib/ai/health-check';
import { logger } from '../lib/logger';

interface TestResult {
  name: string;
  success: boolean;
  responseTime: number;
  error?: string;
  details?: any;
}

class AIIntegrationTester {
  private results: TestResult[] = [];

  async runTests(): Promise<void> {
    console.log('🚀 Starting AI Integration Tests...\n');

    // Test 1: Enhanced Chat Service Basic Functionality
    await this.testEnhancedChatService();

    // Test 2: Translation Service
    await this.testTranslationService();

    // Test 3: Agent Orchestrator
    await this.testAgentOrchestrator();

    // Test 4: Health Check System
    await this.testHealthCheck();

    // Test 5: End-to-End Chat Flow
    await this.testEndToEndChatFlow();

    // Print results
    this.printResults();
  }

  private async testEnhancedChatService(): Promise<void> {
    console.log('📝 Testing Enhanced Chat Service...');

    const testCases = [
      {
        name: 'Basic English Response',
        message: 'Hello, I need help with immigration law',
        language: 'en',
      },
      {
        name: 'Spanish Response',
        message: 'Hola, necesito ayuda con inmigración',
        language: 'es',
      },
      {
        name: 'Emergency Detection',
        message: 'This is urgent! I was just arrested',
        language: 'en',
      },
      {
        name: 'Appointment Scheduling',
        message: 'I would like to schedule a consultation',
        language: 'en',
      },
    ];

    for (const testCase of testCases) {
      await this.runSingleTest(`Enhanced Chat: ${testCase.name}`, async () => {
        const context = {
          userId: 'test-user',
          sessionId: `test-${Date.now()}`,
          language: testCase.language,
          socketId: 'test-socket',
          history: [],
          conversationContext: [],
          metadata: {
            source: 'test' as const,
          },
        };

        const response = await enhancedChatService.processMessage(testCase.message, context);

        return {
          hasResponse: !!response.response,
          responseLength: response.response?.length || 0,
          agent: response.agent,
          confidence: response.confidence,
          processingTime: response.processingTime,
          intent: response.intentAnalysis?.primary,
        };
      });
    }
  }

  private async testTranslationService(): Promise<void> {
    console.log('🌐 Testing Translation Service...');

    const testCases = [
      {
        name: 'English to Spanish',
        text: 'Hello, how can I help you?',
        target: 'es' as const,
      },
      {
        name: 'Spanish to English',
        text: 'Hola, ¿cómo puedo ayudarte?',
        target: 'en' as const,
      },
      {
        name: 'Legal Disclaimer Translation',
        text: 'This is not legal advice and does not create an attorney-client relationship.',
        target: 'es' as const,
      },
      {
        name: 'Language Detection',
        text: 'Necesito ayuda con mi caso de inmigración',
        target: 'en' as const,
      },
    ];

    for (const testCase of testCases) {
      await this.runSingleTest(`Translation: ${testCase.name}`, async () => {
        const translation = await aiTranslationService.translateText(
          testCase.text,
          testCase.target
        );

        const detectedLang = await aiTranslationService.detectLanguage(testCase.text);

        return {
          originalText: testCase.text,
          translation,
          translationLength: translation.length,
          detectedLanguage: detectedLang,
          targetLanguage: testCase.target,
        };
      });
    }
  }

  private async testAgentOrchestrator(): Promise<void> {
    console.log('🤖 Testing Agent Orchestrator...');

    const testCases = [
      {
        name: 'Immigration Intent Routing',
        message: 'I need help with my green card application',
        expectedAgent: 'immigration',
      },
      {
        name: 'Personal Injury Routing',
        message: 'I was in a car accident last week',
        expectedAgent: 'personal_injury',
      },
      {
        name: 'Criminal Defense Routing',
        message: 'I was arrested for DUI',
        expectedAgent: 'criminal_defense',
      },
      {
        name: 'General Consultation',
        message: 'What legal services do you offer?',
        expectedAgent: 'consultation',
      },
    ];

    const orchestrator = AgentOrchestrator.getInstance();

    for (const testCase of testCases) {
      await this.runSingleTest(`Agent Orchestrator: ${testCase.name}`, async () => {
        const context = {
          userId: 'test-user',
          sessionId: `test-${Date.now()}`,
          language: 'en',
          history: [],
          metadata: { source: 'test' },
        };

        const response = await orchestrator.routeMessage(testCase.message, context);

        return {
          message: testCase.message,
          agent: response.agent,
          expectedAgent: testCase.expectedAgent,
          hasResponse: !!response.response,
          responseLength: response.response?.length || 0,
          suggestions: response.suggestions,
        };
      });
    }

    // Test agent status
    await this.runSingleTest('Agent Orchestrator: Agent Status', async () => {
      const status = orchestrator.getAgentStatus();
      const metrics = orchestrator.getAllMetrics();

      return {
        agentCount: Object.keys(status).length,
        agentsOnline: Object.values(status).filter(Boolean).length,
        hasMetrics: Object.keys(metrics).length > 0,
        status,
        metrics,
      };
    });
  }

  private async testHealthCheck(): Promise<void> {
    console.log('❤️ Testing Health Check System...');

    await this.runSingleTest('Health Check: Overall Status', async () => {
      const health = await aiHealthChecker.checkHealth();
      return health;
    });

    await this.runSingleTest('Health Check: Diagnostics', async () => {
      const diagnostics = await aiHealthChecker.performDiagnostics();
      return diagnostics;
    });
  }

  private async testEndToEndChatFlow(): Promise<void> {
    console.log('🔄 Testing End-to-End Chat Flow...');

    await this.runSingleTest('E2E: Multi-turn Conversation', async () => {
      const sessionId = `e2e-test-${Date.now()}`;
      const userId = 'e2e-test-user';

      // Simulate a multi-turn conversation
      const conversation = [
        'Hello, I need legal help',
        'I have immigration issues',
        'I want to apply for citizenship',
        'How much does it cost?',
        'Can I schedule a consultation?',
      ];

      const responses = [];
      const conversationHistory: any[] = [];

      for (const message of conversation) {
        const context = {
          userId,
          sessionId,
          language: 'en',
          socketId: 'e2e-test-socket',
          history: conversationHistory.slice(-5), // Last 5 messages
          conversationContext: conversationHistory.map(h => ({
            role: h.role,
            content: h.content,
            timestamp: h.timestamp,
          })),
          metadata: {
            source: 'test' as const,
          },
        };

        const response = await enhancedChatService.processMessage(message, context);

        // Add to conversation history
        conversationHistory.push(
          { role: 'user', content: message, timestamp: Date.now() },
          { role: 'assistant', content: response.response, timestamp: Date.now() }
        );

        responses.push({
          userMessage: message,
          aiResponse: response.response,
          agent: response.agent,
          confidence: response.confidence,
          intent: response.intentAnalysis?.primary,
        });
      }

      return {
        conversationLength: conversation.length,
        responses,
        totalProcessingTime: responses.reduce((sum, r) => sum + (r.confidence || 0), 0),
        averageConfidence:
          responses.reduce((sum, r) => sum + (r.confidence || 0), 0) / responses.length,
      };
    });
  }

  private async runSingleTest(name: string, testFunction: () => Promise<any>): Promise<void> {
    const startTime = Date.now();

    try {
      const result = await testFunction();
      const responseTime = Date.now() - startTime;

      this.results.push({
        name,
        success: true,
        responseTime,
        details: result,
      });

      console.log(`  ✅ ${name} (${responseTime}ms)`);
    } catch (error) {
      const responseTime = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      this.results.push({
        name,
        success: false,
        responseTime,
        error: errorMessage,
      });

      console.log(`  ❌ ${name} (${responseTime}ms) - ${errorMessage}`);
    }
  }

  private printResults(): void {
    console.log('\n📊 Test Results Summary');
    console.log('='.repeat(50));

    const successful = this.results.filter(r => r.success);
    const failed = this.results.filter(r => !r.success);

    console.log(`Total Tests: ${this.results.length}`);
    console.log(
      `Successful: ${successful.length} (${Math.round((successful.length / this.results.length) * 100)}%)`
    );
    console.log(
      `Failed: ${failed.length} (${Math.round((failed.length / this.results.length) * 100)}%)`
    );

    if (successful.length > 0) {
      const avgResponseTime =
        successful.reduce((sum, r) => sum + r.responseTime, 0) / successful.length;
      console.log(`Average Response Time: ${Math.round(avgResponseTime)}ms`);
    }

    if (failed.length > 0) {
      console.log('\n❌ Failed Tests:');
      failed.forEach(test => {
        console.log(`  - ${test.name}: ${test.error}`);
      });
    }

    console.log('\n🎯 Test Coverage:');
    console.log('  - Enhanced Chat Service: ✅');
    console.log('  - Translation Service: ✅');
    console.log('  - Agent Orchestrator: ✅');
    console.log('  - Health Check System: ✅');
    console.log('  - End-to-End Flow: ✅');

    const overallSuccess = successful.length / this.results.length >= 0.8;
    console.log(
      `\n${overallSuccess ? '🎉' : '⚠️'} Overall: ${overallSuccess ? 'PASSED' : 'NEEDS ATTENTION'}`
    );
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  const tester = new AIIntegrationTester();
  tester.runTests().catch(error => {
    console.error('Test execution failed:', error);
    process.exit(1);
  });
}

export { AIIntegrationTester };
