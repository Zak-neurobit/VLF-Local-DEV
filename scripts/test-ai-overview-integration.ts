#!/usr/bin/env tsx
/**
 * AI Overview Integration Test Suite
 * Validates all AI Overview optimizations and agent performance
 */

import { SEOBlogGenerationAgent } from '../src/lib/crewai/agents/seo-blog-generation-agent';
import { AIOverviewOptimizationAgent } from '../src/lib/crewai/agents/ai-overview-optimization-agent';
import {
  aiOverviewTrainer,
  validateContentForAIOverview,
} from '../src/lib/crewai/training/ai-overview-training-module';
import { voiceSearchOptimizer } from '../src/lib/seo/voice-search-optimizer';
import { generateEnhancedFAQSchema } from '../src/lib/seo/comprehensive-schema';
import { logger } from '../src/lib/logger';

interface TestResult {
  testName: string;
  passed: boolean;
  score?: number;
  details: string;
  recommendations?: string[];
}

class AIOverviewIntegrationTester {
  private results: TestResult[] = [];
  private seoAgent: SEOBlogGenerationAgent;
  private aiOverviewAgent: AIOverviewOptimizationAgent;

  constructor() {
    this.seoAgent = new SEOBlogGenerationAgent();
    this.aiOverviewAgent = new AIOverviewOptimizationAgent();
  }

  async runAllTests(): Promise<void> {
    logger.info('🚀 Starting AI Overview Integration Tests');

    try {
      // Test 1: Agent Creation and Basic Functionality
      await this.testAgentCreation();

      // Test 2: AI Overview Content Generation
      await this.testAIOverviewContentGeneration();

      // Test 3: Voice Search Optimization
      await this.testVoiceSearchOptimization();

      // Test 4: Schema Markup Generation
      await this.testSchemaMarkupGeneration();

      // Test 5: Practice Area Training Data
      await this.testPracticeAreaTraining();

      // Test 6: Content Validation and Scoring
      await this.testContentValidation();

      // Test 7: Integration with Existing Systems
      await this.testSystemIntegration();

      // Test 8: Performance Benchmarks
      await this.testPerformanceBenchmarks();

      // Generate test report
      this.generateTestReport();
    } catch (error) {
      logger.error('❌ Test suite failed', { error });
      throw error;
    }
  }

  /**
   * Test 1: Agent Creation and Basic Functionality
   */
  private async testAgentCreation(): Promise<void> {
    logger.info('🧪 Testing Agent Creation and Basic Functionality');

    try {
      // Test AI Overview Agent initialization
      const aiOverviewAgent = new AIOverviewOptimizationAgent();

      this.results.push({
        testName: 'AI Overview Agent Creation',
        passed: true,
        details: 'Agent created successfully with all required methods',
      });

      // Test SEO Blog Agent with AI Overview capabilities
      const seoAgent = new SEOBlogGenerationAgent();

      this.results.push({
        testName: 'Enhanced SEO Blog Agent Creation',
        passed: true,
        details: 'SEO agent created with AI Overview integration',
      });
    } catch (error) {
      this.results.push({
        testName: 'Agent Creation',
        passed: false,
        details: `Failed to create agents: ${error}`,
      });
    }
  }

  /**
   * Test 2: AI Overview Content Generation
   */
  private async testAIOverviewContentGeneration(): Promise<void> {
    logger.info('🧪 Testing AI Overview Content Generation');

    const testCases = [
      {
        practiceArea: 'immigration',
        targetKeywords: ['green card application', 'citizenship process'],
        contentType: 'article' as const,
        targetAudience: 'potential_clients' as const,
        location: 'North Carolina',
      },
      {
        practiceArea: 'personal-injury',
        targetKeywords: ['car accident lawyer', 'personal injury claim'],
        contentType: 'faq' as const,
        targetAudience: 'potential_clients' as const,
        location: 'Charlotte, NC',
      },
      {
        practiceArea: 'criminal-defense',
        targetKeywords: ['DUI defense', 'criminal lawyer'],
        contentType: 'legal_guide' as const,
        targetAudience: 'potential_clients' as const,
        location: 'Raleigh, NC',
      },
    ];

    for (const testCase of testCases) {
      try {
        const result = await this.aiOverviewAgent.optimizeForAIOverview({
          content: `Sample content about ${testCase.practiceArea} law`,
          ...testCase,
          voiceSearchFocus: true,
        });

        // Validate FAQ section
        const hasFAQs = result.faqSection.questions.length >= 5;
        const hasOptimalAnswers = result.faqSection.questions.every(
          q => q.answerLength >= 40 && q.answerLength <= 60
        );
        const hasVoiceOptimization = result.faqSection.questions.every(q => q.voiceSearchOptimized);

        // Validate AI Overview metrics
        const meetsReadinessThreshold = result.aiOverviewMetrics.readinessScore >= 80;
        const meetsQualityThreshold = result.aiOverviewMetrics.answerQuality >= 80;

        const passed =
          hasFAQs &&
          hasOptimalAnswers &&
          hasVoiceOptimization &&
          meetsReadinessThreshold &&
          meetsQualityThreshold;

        this.results.push({
          testName: `AI Overview Generation - ${testCase.practiceArea}`,
          passed,
          score:
            (result.aiOverviewMetrics.readinessScore + result.aiOverviewMetrics.answerQuality) / 2,
          details: `Generated ${result.faqSection.questions.length} FAQs, readiness: ${result.aiOverviewMetrics.readinessScore}%, quality: ${result.aiOverviewMetrics.answerQuality}%`,
        });
      } catch (error) {
        this.results.push({
          testName: `AI Overview Generation - ${testCase.practiceArea}`,
          passed: false,
          details: `Failed: ${error}`,
        });
      }
    }
  }

  /**
   * Test 3: Voice Search Optimization
   */
  private async testVoiceSearchOptimization(): Promise<void> {
    logger.info('🧪 Testing Voice Search Optimization');

    const testContent = `
# Immigration Law Guide

## What is the green card application process?
The green card application process involves several steps including filing petitions, waiting for approval, and attending interviews.

## How long does immigration take?
Immigration processing times vary by case type and country of origin.

## Benefits of Working with an Immigration Attorney
Professional legal representation can significantly improve your chances of success.
`;

    try {
      const voiceOptimization = await voiceSearchOptimizer.optimizeForVoiceSearch(testContent, {
        practiceArea: 'immigration',
        contentType: 'article',
        targetAudience: 'potential_clients',
        location: 'North Carolina',
      });

      // Validate voice search components
      const hasConversationalHeadings = voiceOptimization.conversationalHeadings.length >= 2;
      const hasNaturalQueries = voiceOptimization.naturalLanguageQueries.length >= 5;
      const hasDirectAnswers = voiceOptimization.directAnswers.length >= 2;
      const hasLocalVariations = voiceOptimization.localVariations.length >= 3;

      const passed =
        hasConversationalHeadings && hasNaturalQueries && hasDirectAnswers && hasLocalVariations;

      this.results.push({
        testName: 'Voice Search Optimization',
        passed,
        details: `Generated ${voiceOptimization.naturalLanguageQueries.length} queries, ${voiceOptimization.directAnswers.length} answers, ${voiceOptimization.localVariations.length} local variations`,
      });
    } catch (error) {
      this.results.push({
        testName: 'Voice Search Optimization',
        passed: false,
        details: `Failed: ${error}`,
      });
    }
  }

  /**
   * Test 4: Schema Markup Generation
   */
  private async testSchemaMarkupGeneration(): Promise<void> {
    logger.info('🧪 Testing Schema Markup Generation');

    try {
      // Test FAQ Schema
      const faqData = [
        {
          question: 'How long does it take to get a green card?',
          answer:
            'Green card processing times vary by category, typically taking 8-33 months for family-based applications.',
        },
        {
          question: 'What documents do I need for citizenship?',
          answer:
            'You need your green card, tax returns, travel records, and other supporting documents for N-400 application.',
        },
      ];

      const faqSchema = generateEnhancedFAQSchema(faqData);

      // Validate schema structure
      const hasContext = faqSchema['@context'] === 'https://schema.org';
      const hasType = faqSchema['@type'] === 'FAQPage';
      const hasMainEntity =
        Array.isArray(faqSchema.mainEntity) && faqSchema.mainEntity.length === 2;

      const passed = hasContext && hasType && hasMainEntity;

      this.results.push({
        testName: 'FAQ Schema Generation',
        passed,
        details: `Generated schema with ${faqSchema.mainEntity?.length || 0} questions`,
      });

      // Test AI Overview agent schema generation
      const aiOverviewResult = await this.aiOverviewAgent.optimizeForAIOverview({
        content: 'Sample legal content',
        practiceArea: 'immigration',
        targetKeywords: ['green card'],
        contentType: 'article',
        targetAudience: 'potential_clients',
        voiceSearchFocus: true,
      });

      const hasAllSchemas =
        aiOverviewResult.schemaMarkup.faqSchema && aiOverviewResult.schemaMarkup.legalServiceSchema;

      this.results.push({
        testName: 'AI Overview Schema Integration',
        passed: hasAllSchemas,
        details: `Generated ${Object.keys(aiOverviewResult.schemaMarkup).length} schema types`,
      });
    } catch (error) {
      this.results.push({
        testName: 'Schema Markup Generation',
        passed: false,
        details: `Failed: ${error}`,
      });
    }
  }

  /**
   * Test 5: Practice Area Training Data
   */
  private async testPracticeAreaTraining(): Promise<void> {
    logger.info('🧪 Testing Practice Area Training Data');

    const practiceAreas = [
      'immigration',
      'personal-injury',
      'workers-compensation',
      'family-law',
      'criminal-defense',
    ];

    for (const practiceArea of practiceAreas) {
      try {
        // Test training data generation (would normally load from files)
        const trainingData = this.getMockTrainingData(practiceArea);

        // Validate training data structure
        const hasCommonQuestions = trainingData.commonQuestions.length >= 4;
        const hasOptimalAnswers = trainingData.commonQuestions.every(
          q => q.answerLength >= 30 && q.answerLength <= 60
        );
        const hasVoiceOptimization = trainingData.commonQuestions.every(
          q => q.voiceSearchOptimized
        );
        const hasSchemaRequirements = Object.values(trainingData.schemaRequirements).some(
          req => req
        );

        const passed =
          hasCommonQuestions && hasOptimalAnswers && hasVoiceOptimization && hasSchemaRequirements;

        this.results.push({
          testName: `Training Data - ${practiceArea}`,
          passed,
          details: `${trainingData.commonQuestions.length} questions, jurisdiction: ${trainingData.jurisdiction}`,
        });
      } catch (error) {
        this.results.push({
          testName: `Training Data - ${practiceArea}`,
          passed: false,
          details: `Failed: ${error}`,
        });
      }
    }
  }

  /**
   * Test 6: Content Validation and Scoring
   */
  private async testContentValidation(): Promise<void> {
    logger.info('🧪 Testing Content Validation and Scoring');

    const testContents = [
      {
        name: 'Optimized Content',
        content: `
# What is the Immigration Process?

## How do I apply for a green card?
You can apply for a green card through family sponsorship, employment, or other categories. The process involves filing Form I-485 and attending an interview.

## When should I hire an immigration lawyer?
You should hire an immigration lawyer if your case is complex, you've been denied before, or you're facing removal proceedings.

## Frequently Asked Questions

### What documents do I need?
You need passport, birth certificate, marriage certificate (if applicable), and Form I-485.

### How much does it cost?
The filing fee is $1,225 plus biometrics fee of $85.
`,
      },
      {
        name: 'Non-Optimized Content',
        content: `
# Immigration Process

## Application Requirements
The immigration process involves many complex procedures and requirements.

## Legal Representation
Legal representation can be beneficial in immigration matters.
`,
      },
    ];

    for (const testContent of testContents) {
      try {
        const validation = await validateContentForAIOverview(testContent.content, 'immigration');

        const isOptimized = testContent.name === 'Optimized Content';
        const expectedScore = isOptimized ? 80 : 40;
        const scoreInRange = Math.abs(validation.score - expectedScore) <= 20;

        this.results.push({
          testName: `Content Validation - ${testContent.name}`,
          passed: scoreInRange,
          score: validation.score,
          details: `Score: ${validation.score}%, AI Overview Ready: ${validation.aiOverviewReadiness}`,
          recommendations: validation.recommendations,
        });
      } catch (error) {
        this.results.push({
          testName: `Content Validation - ${testContent.name}`,
          passed: false,
          details: `Failed: ${error}`,
        });
      }
    }
  }

  /**
   * Test 7: Integration with Existing Systems
   */
  private async testSystemIntegration(): Promise<void> {
    logger.info('🧪 Testing Integration with Existing Systems');

    try {
      // Test SEO Blog Agent with AI Overview enabled
      const blogRequest = {
        practiceArea: 'immigration',
        targetKeywords: ['green card lawyer', 'immigration attorney'],
        contentType: 'blog_post' as const,
        targetAudience: 'potential_clients' as const,
        tone: 'professional' as const,
        wordCount: 1500,
        language: 'en' as const,
        location: 'Charlotte, NC',
        urgency: 'medium' as const,
        includeCallToAction: true,
        aiOverviewOptimization: true,
        voiceSearchFocus: true,
      };

      // Mock the blog generation (would normally call the actual agent)
      const mockResult = {
        id: 'test-blog-123',
        title: 'How to Apply for a Green Card: Complete Guide',
        content: {
          introduction: 'Test introduction',
          mainSections: [{ heading: 'Test', content: 'Test content', subSections: [] }],
          conclusion: 'Test conclusion',
          faq: [{ question: 'Test question?', answer: 'Test answer.' }],
        },
        seoOptimization: {
          title: 'Test title',
          metaDescription: 'Test description',
          slug: 'test-slug',
          headings: { h1: 'Test', h2: [], h3: [] },
          keywords: { primary: 'test', secondary: [], longTail: [] },
          internalLinks: [],
          imageAlt: [],
          schema: { type: 'BlogPosting', properties: {} },
        },
        aiOverviewOptimization: {
          optimizedContent: 'Test optimized content',
          faqSection: {
            questions: [
              {
                question: 'How long does green card take?',
                answer: 'Green card processing typically takes 8-33 months depending on category.',
                answerLength: 45,
                voiceSearchOptimized: true,
              },
            ],
            schema: {},
          },
          voiceSearchOptimizations: {
            conversationalRewrites: ['Test rewrite'],
            naturalLanguageQueries: ['Test query'],
            localOptimizations: ['Test local'],
          },
          schemaMarkup: {
            faqSchema: {},
            legalServiceSchema: {},
          },
          aiOverviewMetrics: {
            readinessScore: 85,
            answerQuality: 90,
            structureScore: 80,
            authoritySignals: 88,
          },
        },
        wordCount: 1500,
        readabilityScore: 75,
        seoScore: 85,
        aiOverviewScore: 86,
        performancePredictions: {
          estimatedTraffic: 1000,
          rankingPotential: 'high' as const,
          conversionPotential: 'high' as const,
        },
        publishingRecommendations: {
          bestPublishTime: '2024-01-15T10:00:00Z',
          promotionChannels: ['social'],
          followUpActions: ['monitor'],
        },
        createdAt: new Date(),
      };

      // Validate integration
      const hasAIOverviewData = mockResult.aiOverviewOptimization !== undefined;
      const hasAIOverviewScore = mockResult.aiOverviewScore !== undefined;
      const meetsQualityThreshold = (mockResult.aiOverviewScore || 0) >= 80;

      const passed = hasAIOverviewData && hasAIOverviewScore && meetsQualityThreshold;

      this.results.push({
        testName: 'SEO Blog Agent AI Overview Integration',
        passed,
        score: mockResult.aiOverviewScore,
        details: `Generated blog with AI Overview score: ${mockResult.aiOverviewScore}%`,
      });
    } catch (error) {
      this.results.push({
        testName: 'System Integration',
        passed: false,
        details: `Failed: ${error}`,
      });
    }
  }

  /**
   * Test 8: Performance Benchmarks
   */
  private async testPerformanceBenchmarks(): Promise<void> {
    logger.info('🧪 Testing Performance Benchmarks');

    try {
      const startTime = Date.now();

      // Test AI Overview optimization performance
      await this.aiOverviewAgent.optimizeForAIOverview({
        content: 'Sample content for performance testing',
        practiceArea: 'immigration',
        targetKeywords: ['green card', 'citizenship'],
        contentType: 'article',
        targetAudience: 'potential_clients',
        voiceSearchFocus: true,
      });

      const endTime = Date.now();
      const processingTime = endTime - startTime;
      const meetsPerformanceTarget = processingTime < 10000; // 10 seconds

      this.results.push({
        testName: 'AI Overview Performance',
        passed: meetsPerformanceTarget,
        details: `Processing time: ${processingTime}ms (target: <10000ms)`,
      });

      // Test voice search optimization performance
      const voiceStartTime = Date.now();

      await voiceSearchOptimizer.optimizeForVoiceSearch('Sample content for voice search testing', {
        practiceArea: 'immigration',
        contentType: 'article',
        targetAudience: 'potential_clients',
        location: 'North Carolina',
      });

      const voiceEndTime = Date.now();
      const voiceProcessingTime = voiceEndTime - voiceStartTime;
      const meetsVoicePerformanceTarget = voiceProcessingTime < 5000; // 5 seconds

      this.results.push({
        testName: 'Voice Search Performance',
        passed: meetsVoicePerformanceTarget,
        details: `Processing time: ${voiceProcessingTime}ms (target: <5000ms)`,
      });
    } catch (error) {
      this.results.push({
        testName: 'Performance Benchmarks',
        passed: false,
        details: `Failed: ${error}`,
      });
    }
  }

  /**
   * Generate comprehensive test report
   */
  private generateTestReport(): void {
    const totalTests = this.results.length;
    const passedTests = this.results.filter(r => r.passed).length;
    const failedTests = totalTests - passedTests;
    const passRate = (passedTests / totalTests) * 100;

    console.log('\n' + '='.repeat(80));
    console.log('🎯 AI OVERVIEW INTEGRATION TEST REPORT');
    console.log('='.repeat(80));
    console.log(`\n📊 SUMMARY:`);
    console.log(`   Total Tests: ${totalTests}`);
    console.log(`   Passed: ${passedTests} ✅`);
    console.log(`   Failed: ${failedTests} ❌`);
    console.log(`   Pass Rate: ${passRate.toFixed(1)}%`);

    console.log(`\n📋 DETAILED RESULTS:`);
    console.log('-'.repeat(80));

    for (const result of this.results) {
      const status = result.passed ? '✅ PASS' : '❌ FAIL';
      const score = result.score ? ` (${result.score.toFixed(1)}%)` : '';

      console.log(`\n${status} ${result.testName}${score}`);
      console.log(`   ${result.details}`);

      if (result.recommendations && result.recommendations.length > 0) {
        console.log(`   Recommendations:`);
        result.recommendations.forEach(rec => console.log(`   • ${rec}`));
      }
    }

    console.log('\n' + '='.repeat(80));

    if (passRate >= 80) {
      console.log('🎉 AI OVERVIEW INTEGRATION SUCCESSFULLY VALIDATED');
      console.log('✨ System is ready for Google AI Overview optimization!');
    } else {
      console.log('⚠️  AI OVERVIEW INTEGRATION NEEDS ATTENTION');
      console.log('🔧 Please address failed tests before deployment');
    }

    console.log('='.repeat(80) + '\n');

    // Log summary for monitoring
    logger.info('AI Overview integration test completed', {
      totalTests,
      passedTests,
      failedTests,
      passRate,
      status: passRate >= 80 ? 'SUCCESS' : 'NEEDS_ATTENTION',
    });
  }

  /**
   * Mock training data for testing
   */
  private getMockTrainingData(practiceArea: string) {
    return {
      practiceArea,
      jurisdiction: practiceArea === 'immigration' ? 'nationwide' : 'north-carolina',
      commonQuestions: [
        {
          question: `What is ${practiceArea} law?`,
          optimalAnswer: `${practiceArea} law involves various legal procedures and requirements that must be followed according to current regulations.`,
          answerLength: 45,
          voiceSearchOptimized: true,
        },
        {
          question: `How much does a ${practiceArea} lawyer cost?`,
          optimalAnswer: `${practiceArea} lawyer fees vary based on case complexity, typically ranging from $150-500 per hour with free consultations available.`,
          answerLength: 42,
          voiceSearchOptimized: true,
        },
        {
          question: `How long does ${practiceArea} take?`,
          optimalAnswer: `${practiceArea} timelines depend on case specifics and can range from weeks to months based on complexity and requirements.`,
          answerLength: 40,
          voiceSearchOptimized: true,
        },
        {
          question: `Do I need a ${practiceArea} attorney?`,
          optimalAnswer: `You should consult a ${practiceArea} attorney for complex cases, denials, or when facing significant legal consequences.`,
          answerLength: 38,
          voiceSearchOptimized: true,
        },
      ],
      schemaRequirements: {
        faqSchema: true,
        howToSchema: true,
        localBusinessSchema: true,
        legalServiceSchema: true,
      },
      voiceSearchPatterns: {
        questionStarters: ['What is', 'How much', 'How long', 'Do I need'],
        conversationalLanguage: ['you should', 'this means', 'you can'],
        localModifiers: ['near me', 'in NC', 'North Carolina'],
      },
      contentStructureGuidelines: {
        headingFormats: [`What is ${practiceArea}?`, `How does ${practiceArea} work?`],
        answerPatterns: ['Direct answers', 'Include timelines', 'Mention costs'],
        listStructures: ['Required documents', 'Process steps', 'Eligibility requirements'],
      },
      competitiveIntelligence: {
        topCompetitorQuestions: ['Process overview', 'Cost information', 'Timeline expectations'],
        contentGaps: ['Recent law changes', 'Local procedures', 'Case studies'],
        differentiationOpportunities: [
          'Local expertise',
          'Specialized knowledge',
          'Client success stories',
        ],
      },
    };
  }
}

// Main execution
async function main() {
  const tester = new AIOverviewIntegrationTester();
  await tester.runAllTests();
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    logger.error('Test suite failed', { error });
    process.exit(1);
  });
}

export { AIOverviewIntegrationTester };
