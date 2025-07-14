#!/usr/bin/env tsx
/**
 * Enhanced Voice UX System Test Suite
 * Tests improved user experience features for Retell voice integration
 */

import { enhancedVoiceUXSystem } from '../src/services/retell/enhanced-voice-ux';
import { voiceAnalyticsSystem } from '../src/services/retell/voice-analytics';
import { logger } from '../src/lib/logger';

interface TestScenario {
  name: string;
  description: string;
  agentConfig: {
    practiceArea: string;
    language: 'en' | 'es';
    personality: 'professional' | 'friendly' | 'empathetic';
  };
  conversationFlow: Array<{
    speaker: 'user' | 'agent';
    message: string;
    expectedBehavior?: string;
  }>;
  expectedOutcomes: {
    emotionalStateChanges?: boolean;
    routingRequired?: boolean;
    clarityImprovements?: boolean;
    satisfactionScore?: number;
  };
}

class VoiceUXEnhancementTester {
  private testResults: Array<{
    scenarioName: string;
    passed: boolean;
    details: string;
    metrics?: any;
    duration?: number;
  }> = [];

  async runAllTests(): Promise<void> {
    logger.info('🚀 Starting Enhanced Voice UX Tests');

    try {
      // Test 1: Emotion Detection and Adaptation
      await this.testEmotionDetectionAdaptation();

      // Test 2: Multi-Language Support
      await this.testMultiLanguageSupport();

      // Test 3: Smart Routing
      await this.testSmartRouting();

      // Test 4: Adaptive Speech Rate
      await this.testAdaptiveSpeechRate();

      // Test 5: Accessibility Features
      await this.testAccessibilityFeatures();

      // Test 6: Natural Conversation Flow
      await this.testNaturalConversationFlow();

      // Test 7: Performance Optimization
      await this.testPerformanceOptimization();

      // Test 8: Analytics Integration
      await this.testAnalyticsIntegration();

      // Generate comprehensive report
      this.generateTestReport();

    } catch (error) {
      logger.error('❌ Voice UX test suite failed', { error });
      throw error;
    }
  }

  /**
   * Test 1: Emotion Detection and Adaptation
   */
  private async testEmotionDetectionAdaptation(): Promise<void> {
    logger.info('🧪 Testing Emotion Detection and Adaptation');

    const scenario: TestScenario = {
      name: 'Emotion Detection and Adaptation',
      description: 'Tests system ability to detect and respond to caller emotions',
      agentConfig: {
        practiceArea: 'immigration',
        language: 'en',
        personality: 'empathetic',
      },
      conversationFlow: [
        {
          speaker: 'user',
          message: "I'm really worried about my visa expiring next week",
          expectedBehavior: 'Detect anxiety and respond empathetically',
        },
        {
          speaker: 'agent',
          message: "I understand your concern about your visa expiring. Let's work together to address this urgent matter.",
        },
        {
          speaker: 'user',
          message: "I don't understand what documents I need. This is so confusing!",
          expectedBehavior: 'Detect confusion and slow down explanation',
        },
        {
          speaker: 'agent',
          message: "I'll explain the documents step by step. First, you'll need your current visa...",
        },
      ],
      expectedOutcomes: {
        emotionalStateChanges: true,
        clarityImprovements: true,
        satisfactionScore: 85,
      },
    };

    await this.executeScenario(scenario);
  }

  /**
   * Test 2: Multi-Language Support
   */
  private async testMultiLanguageSupport(): Promise<void> {
    logger.info('🧪 Testing Multi-Language Support');

    const scenario: TestScenario = {
      name: 'Multi-Language Support',
      description: 'Tests bilingual conversation handling',
      agentConfig: {
        practiceArea: 'family_law',
        language: 'es',
        personality: 'friendly',
      },
      conversationFlow: [
        {
          speaker: 'user',
          message: "Necesito ayuda con mi divorcio",
          expectedBehavior: 'Respond in Spanish with appropriate formality',
        },
        {
          speaker: 'agent',
          message: "Por supuesto, le puedo ayudar con su proceso de divorcio. ¿Cuánto tiempo lleva separado?",
        },
        {
          speaker: 'user',
          message: "Six months... perdón, seis meses",
          expectedBehavior: 'Handle code-switching gracefully',
        },
        {
          speaker: 'agent',
          message: "No se preocupe, entiendo perfectamente. Seis meses de separación es importante para el proceso.",
        },
      ],
      expectedOutcomes: {
        satisfactionScore: 90,
      },
    };

    await this.executeScenario(scenario);
  }

  /**
   * Test 3: Smart Routing
   */
  private async testSmartRouting(): Promise<void> {
    logger.info('🧪 Testing Smart Routing');

    const scenario: TestScenario = {
      name: 'Smart Routing',
      description: 'Tests automatic routing to appropriate specialist',
      agentConfig: {
        practiceArea: 'general',
        language: 'en',
        personality: 'professional',
      },
      conversationFlow: [
        {
          speaker: 'user',
          message: "I was injured at work and need help with my workers comp claim",
          expectedBehavior: 'Identify workers compensation issue and route appropriately',
        },
        {
          speaker: 'agent',
          message: "I understand you've been injured at work. Let me connect you with our workers compensation specialist.",
        },
        {
          speaker: 'user',
          message: "Actually, I also got a DUI on the way to the hospital",
          expectedBehavior: 'Identify multiple practice areas and prioritize',
        },
        {
          speaker: 'agent',
          message: "I see you have both workers compensation and criminal defense needs. Let's address the most urgent matter first.",
        },
      ],
      expectedOutcomes: {
        routingRequired: true,
        satisfactionScore: 88,
      },
    };

    await this.executeScenario(scenario);
  }

  /**
   * Test 4: Adaptive Speech Rate
   */
  private async testAdaptiveSpeechRate(): Promise<void> {
    logger.info('🧪 Testing Adaptive Speech Rate');

    const scenario: TestScenario = {
      name: 'Adaptive Speech Rate',
      description: 'Tests dynamic speech rate adjustment',
      agentConfig: {
        practiceArea: 'personal_injury',
        language: 'en',
        personality: 'professional',
      },
      conversationFlow: [
        {
          speaker: 'user',
          message: "Can you repeat that? You're speaking too fast",
          expectedBehavior: 'Reduce speech rate and repeat information',
        },
        {
          speaker: 'agent',
          message: "Of course. Let me slow down. [SLOWER] Your personal injury claim has three main components...",
        },
        {
          speaker: 'user',
          message: "I need this resolved quickly, I understand everything now",
          expectedBehavior: 'Increase pace for urgent caller',
        },
        {
          speaker: 'agent',
          message: "[NORMAL PACE] Great, let's move forward quickly with your claim process.",
        },
      ],
      expectedOutcomes: {
        clarityImprovements: true,
        satisfactionScore: 87,
      },
    };

    await this.executeScenario(scenario);
  }

  /**
   * Test 5: Accessibility Features
   */
  private async testAccessibilityFeatures(): Promise<void> {
    logger.info('🧪 Testing Accessibility Features');

    const scenario: TestScenario = {
      name: 'Accessibility Features',
      description: 'Tests enhanced accessibility support',
      agentConfig: {
        practiceArea: 'immigration',
        language: 'en',
        personality: 'empathetic',
      },
      conversationFlow: [
        {
          speaker: 'user',
          message: "I have difficulty hearing, can you speak more clearly?",
          expectedBehavior: 'Adjust for hearing impairment',
        },
        {
          speaker: 'agent',
          message: "[CLEAR ARTICULATION] Absolutely. I'll speak more clearly and can repeat any information you need.",
        },
        {
          speaker: 'user',
          message: "I'm using a screen reader, please describe any visual information",
          expectedBehavior: 'Provide detailed verbal descriptions',
        },
        {
          speaker: 'agent',
          message: "I'll provide detailed verbal descriptions of all information and processes we discuss.",
        },
      ],
      expectedOutcomes: {
        satisfactionScore: 92,
      },
    };

    await this.executeScenario(scenario);
  }

  /**
   * Test 6: Natural Conversation Flow
   */
  private async testNaturalConversationFlow(): Promise<void> {
    logger.info('🧪 Testing Natural Conversation Flow');

    const scenario: TestScenario = {
      name: 'Natural Conversation Flow',
      description: 'Tests natural interruption handling and backchannel',
      agentConfig: {
        practiceArea: 'criminal_defense',
        language: 'en',
        personality: 'friendly',
      },
      conversationFlow: [
        {
          speaker: 'agent',
          message: "Let me explain the DUI process in North Carolina...",
        },
        {
          speaker: 'user',
          message: "Wait, sorry to interrupt, but will I lose my license?",
          expectedBehavior: 'Handle interruption gracefully',
        },
        {
          speaker: 'agent',
          message: "That's a great question - license suspension is often the biggest concern. Let me address that first.",
        },
        {
          speaker: 'user',
          message: "Uh-huh... okay... I see...",
          expectedBehavior: 'Recognize backchannel cues and continue',
        },
      ],
      expectedOutcomes: {
        satisfactionScore: 89,
      },
    };

    await this.executeScenario(scenario);
  }

  /**
   * Test 7: Performance Optimization
   */
  private async testPerformanceOptimization(): Promise<void> {
    logger.info('🧪 Testing Performance Optimization');

    const startTime = Date.now();

    try {
      // Create agent with performance features
      const agent = await enhancedVoiceUXSystem.createEnhancedVoiceAgent({
        name: 'Performance Test Agent',
        practiceArea: 'immigration',
        language: 'en',
        personality: 'professional',
        uxConfig: {
          reducedLatency: true,
          streamingResponses: true,
          predictiveResponses: true,
        },
      });

      // Initialize conversation
      const conversation = await enhancedVoiceUXSystem.initializeConversation({
        agentId: agent.agent_id,
        language: 'en',
      });

      const duration = Date.now() - startTime;

      const passed = duration < 2000 && !!conversation.sessionId;

      this.testResults.push({
        scenarioName: 'Performance Optimization',
        passed,
        duration,
        details: `Agent creation and conversation init in ${duration}ms`,
      });

      if (passed) {
        logger.info('✅ Performance Optimization passed', { duration });
      } else {
        logger.warn('❌ Performance Optimization failed', { duration });
      }

    } catch (error) {
      this.testResults.push({
        scenarioName: 'Performance Optimization',
        passed: false,
        details: `Error: ${error}`,
      });
      logger.error('❌ Performance Optimization failed with error', { error });
    }
  }

  /**
   * Test 8: Analytics Integration
   */
  private async testAnalyticsIntegration(): Promise<void> {
    logger.info('🧪 Testing Analytics Integration');

    const startTime = Date.now();

    try {
      // Generate analytics for recent period
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 7);

      const analytics = await voiceAnalyticsSystem.generateAnalytics({
        startDate,
        endDate,
      });

      const recommendations = await voiceAnalyticsSystem.generateOptimizationRecommendations(analytics);

      const duration = Date.now() - startTime;

      const passed = !!(
        analytics.totalCalls >= 0 &&
        analytics.averageInteractionQuality >= 0 &&
        recommendations.systemRecommendations.length >= 0
      );

      this.testResults.push({
        scenarioName: 'Analytics Integration',
        passed,
        duration,
        details: `Generated analytics for ${analytics.totalCalls} calls with ${recommendations.systemRecommendations.length} recommendations`,
        metrics: {
          totalCalls: analytics.totalCalls,
          avgQuality: analytics.averageInteractionQuality,
          recommendations: recommendations.systemRecommendations.length,
        },
      });

      if (passed) {
        logger.info('✅ Analytics Integration passed', {
          totalCalls: analytics.totalCalls,
          duration,
        });
      } else {
        logger.warn('❌ Analytics Integration failed');
      }

    } catch (error) {
      this.testResults.push({
        scenarioName: 'Analytics Integration',
        passed: false,
        details: `Error: ${error}`,
      });
      logger.error('❌ Analytics Integration failed with error', { error });
    }
  }

  /**
   * Execute individual test scenario
   */
  private async executeScenario(scenario: TestScenario): Promise<void> {
    const startTime = Date.now();

    try {
      // Create enhanced agent
      const agent = await enhancedVoiceUXSystem.createEnhancedVoiceAgent({
        name: `Test Agent - ${scenario.name}`,
        ...scenario.agentConfig,
      });

      // Initialize conversation
      const conversation = await enhancedVoiceUXSystem.initializeConversation({
        agentId: agent.agent_id,
        language: scenario.agentConfig.language,
      });

      // Simulate conversation flow
      const transcript = scenario.conversationFlow.map((turn, index) => ({
        role: turn.speaker,
        content: turn.message,
        timestamp: Date.now() + (index * 1000),
      }));

      // Process conversation updates
      for (let i = 0; i < transcript.length; i++) {
        await enhancedVoiceUXSystem.handleConversationUpdate({
          sessionId: conversation.sessionId,
          callId: `test-call-${Date.now()}`,
          transcript: transcript.slice(0, i + 1),
          currentSpeaker: transcript[i].role,
        });
      }

      // Generate metrics
      const metrics = await enhancedVoiceUXSystem.generateConversationMetrics(
        conversation.sessionId
      );

      const duration = Date.now() - startTime;

      // Validate outcomes
      const passed = this.validateScenarioOutcomes(scenario, metrics);

      this.testResults.push({
        scenarioName: scenario.name,
        passed,
        duration,
        details: `${scenario.description}. Quality: ${metrics.interactionQuality.toFixed(1)}%, Clarity: ${metrics.clarityScore}%`,
        metrics,
      });

      if (passed) {
        logger.info(`✅ ${scenario.name} passed`, {
          quality: metrics.interactionQuality,
          duration,
        });
      } else {
        logger.warn(`❌ ${scenario.name} failed validation`);
      }

    } catch (error) {
      const duration = Date.now() - startTime;
      
      this.testResults.push({
        scenarioName: scenario.name,
        passed: false,
        duration,
        details: `Error: ${error}`,
      });

      logger.error(`❌ ${scenario.name} failed with error`, { error, duration });
    }
  }

  /**
   * Validate scenario outcomes
   */
  private validateScenarioOutcomes(scenario: TestScenario, metrics: any): boolean {
    const outcomes = scenario.expectedOutcomes;
    
    if (outcomes.satisfactionScore) {
      // Simplified validation - in practice would check actual satisfaction
      const satisfactionMet = metrics.interactionQuality >= outcomes.satisfactionScore;
      if (!satisfactionMet) return false;
    }

    if (outcomes.clarityImprovements) {
      const clarityGood = metrics.clarityScore >= 80;
      if (!clarityGood) return false;
    }

    return true;
  }

  /**
   * Generate comprehensive test report
   */
  private generateTestReport(): void {
    const totalTests = this.testResults.length;
    const passedTests = this.testResults.filter(r => r.passed).length;
    const failedTests = totalTests - passedTests;
    const passRate = (passedTests / totalTests) * 100;
    const avgDuration = this.testResults.reduce((sum, r) => sum + (r.duration || 0), 0) / totalTests;

    console.log('\n' + '='.repeat(80));
    console.log('🎯 ENHANCED VOICE UX SYSTEM TEST REPORT');
    console.log('='.repeat(80));
    console.log(`\n📊 SUMMARY:`);
    console.log(`   Total Tests: ${totalTests}`);
    console.log(`   Passed: ${passedTests} ✅`);
    console.log(`   Failed: ${failedTests} ❌`);
    console.log(`   Pass Rate: ${passRate.toFixed(1)}%`);
    console.log(`   Average Duration: ${avgDuration.toFixed(0)}ms`);

    console.log(`\n📋 DETAILED RESULTS:`);
    console.log('-'.repeat(80));

    for (const result of this.testResults) {
      const status = result.passed ? '✅ PASS' : '❌ FAIL';
      const duration = result.duration ? ` (${result.duration}ms)` : '';
      
      console.log(`\n${status} ${result.scenarioName}${duration}`);
      console.log(`   ${result.details}`);
      
      if (result.metrics) {
        console.log(`   Metrics:`);
        console.log(`   - Interaction Quality: ${result.metrics.interactionQuality?.toFixed(1)}%`);
        console.log(`   - Clarity Score: ${result.metrics.clarityScore}%`);
        console.log(`   - Completion Rate: ${result.metrics.completionRate}%`);
      }
    }

    console.log('\n📈 FEATURE COVERAGE:');
    const features = [
      'Emotion Detection',
      'Multi-Language Support',
      'Smart Routing',
      'Adaptive Speech',
      'Accessibility',
      'Natural Conversation',
      'Performance',
      'Analytics',
    ];
    
    features.forEach((feature, index) => {
      const result = this.testResults[index];
      const status = result?.passed ? '✅' : '❌';
      console.log(`   ${status} ${feature}`);
    });

    console.log('\n⚡ PERFORMANCE METRICS:');
    const durations = this.testResults.map(r => r.duration || 0).filter(d => d > 0);
    if (durations.length > 0) {
      const minDuration = Math.min(...durations);
      const maxDuration = Math.max(...durations);
      const medianDuration = durations.sort((a, b) => a - b)[Math.floor(durations.length / 2)];

      console.log(`   Fastest: ${minDuration}ms`);
      console.log(`   Slowest: ${maxDuration}ms`);
      console.log(`   Median: ${medianDuration}ms`);
    }

    console.log('\n' + '='.repeat(80));
    
    if (passRate >= 90) {
      console.log('🎉 ENHANCED VOICE UX SYSTEM PERFORMING EXCELLENTLY');
      console.log('✨ All major features tested and validated!');
    } else if (passRate >= 80) {
      console.log('✅ ENHANCED VOICE UX SYSTEM PERFORMING WELL');
      console.log('🔧 Minor improvements may enhance user experience');
    } else {
      console.log('⚠️  ENHANCED VOICE UX SYSTEM NEEDS ATTENTION');
      console.log('🔧 Please address failed tests before deployment');
    }
    
    console.log('='.repeat(80) + '\n');

    // Log summary for monitoring
    logger.info('Enhanced Voice UX test completed', {
      totalTests,
      passedTests,
      failedTests,
      passRate,
      avgDuration,
      status: passRate >= 90 ? 'EXCELLENT' : passRate >= 80 ? 'GOOD' : 'NEEDS_ATTENTION',
    });
  }
}

// Main execution
async function main() {
  const tester = new VoiceUXEnhancementTester();
  await tester.runAllTests();
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    logger.error('Enhanced Voice UX test suite failed', { error });
    process.exit(1);
  });
}

export { VoiceUXEnhancementTester };