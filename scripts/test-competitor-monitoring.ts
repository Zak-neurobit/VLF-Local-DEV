#!/usr/bin/env tsx
/**
 * Competitor Monitoring System Test Suite
 * Tests real-time competitor tracking and response generation
 */

import { competitorMonitoringSystem } from '../src/lib/crewai/competitor-monitoring-system';
import { logger } from '../src/lib/logger';

interface TestScenario {
  name: string;
  competitor: any;
  activities: any[];
  expectedResponses: string[];
}

class CompetitorMonitoringTester {
  private testResults: Array<{
    scenarioName: string;
    passed: boolean;
    details: string;
    responses?: any[];
    duration?: number;
  }> = [];

  async runAllTests(): Promise<void> {
    logger.info('🚀 Starting Competitor Monitoring System Tests');

    try {
      // Test 1: Content Competition
      await this.testContentCompetition();

      // Test 2: Ranking Changes
      await this.testRankingChanges();

      // Test 3: Social Media Activity
      await this.testSocialMediaActivity();

      // Test 4: Review Competition
      await this.testReviewCompetition();

      // Test 5: Ad Campaign Detection
      await this.testAdCampaignDetection();

      // Test 6: Multi-Channel Competition
      await this.testMultiChannelCompetition();

      // Test 7: Urgent Response Scenarios
      await this.testUrgentResponseScenarios();

      // Test 8: Competitive Analysis Generation
      await this.testCompetitiveAnalysis();

      // Generate comprehensive report
      this.generateTestReport();
    } catch (error) {
      logger.error('❌ Competitor monitoring test suite failed', { error });
      throw error;
    }
  }

  /**
   * Test 1: Content Competition
   */
  private async testContentCompetition(): Promise<void> {
    logger.info('🧪 Testing Content Competition Detection');

    const scenario: TestScenario = {
      name: 'Content Competition',
      competitor: {
        id: 'comp-1',
        name: 'Legal Eagles Law Firm',
        website: 'https://legaleagles.com',
        practiceAreas: ['immigration', 'personal_injury'],
        locations: ['Charlotte', 'Raleigh'],
        trackingConfig: {
          enabled: true,
          frequency: 'hourly',
          priority: 'high',
          trackContent: true,
        },
      },
      activities: [
        {
          competitorId: 'comp-1',
          timestamp: new Date(),
          activityType: 'content',
          channel: 'blog',
          details: {
            title: 'New H1B Visa Rules 2024: What You Need to Know',
            url: 'https://legaleagles.com/blog/h1b-visa-rules-2024',
            description: 'Comprehensive guide covering the latest H1B visa regulation changes',
            keywords: ['H1B visa', '2024 immigration', 'work visa', 'USCIS rules'],
            engagement: 1250,
          },
          impact: 'high',
          requiresResponse: true,
        },
        {
          competitorId: 'comp-1',
          timestamp: new Date(),
          activityType: 'content',
          channel: 'video',
          details: {
            title: 'Green Card Through Marriage: Step-by-Step Process',
            url: 'https://youtube.com/watch?v=abc123',
            description: 'Video tutorial explaining the marriage-based green card process',
            keywords: ['green card', 'marriage', 'immigration', 'I-130'],
            engagement: 3500,
          },
          impact: 'high',
          requiresResponse: true,
        },
      ],
      expectedResponses: [
        'content', // Response type
        'immediate', // Urgency
      ],
    };

    await this.executeScenario(scenario);
  }

  /**
   * Test 2: Ranking Changes
   */
  private async testRankingChanges(): Promise<void> {
    logger.info('🧪 Testing Ranking Change Detection');

    const scenario: TestScenario = {
      name: 'Ranking Changes',
      competitor: {
        id: 'comp-2',
        name: 'Carolina Legal Associates',
        website: 'https://carolinalegal.com',
        practiceAreas: ['personal_injury', 'workers_compensation'],
        locations: ['Charlotte'],
        trackingConfig: {
          enabled: true,
          frequency: 'daily',
          priority: 'medium',
          trackRankings: true,
        },
      },
      activities: [
        {
          competitorId: 'comp-2',
          timestamp: new Date(),
          activityType: 'ranking',
          channel: 'search',
          details: {
            keywords: ['Charlotte personal injury lawyer'],
            position: 1,
            previousPosition: 3,
            url: 'https://carolinalegal.com/personal-injury',
          },
          impact: 'high',
          requiresResponse: true,
        },
        {
          competitorId: 'comp-2',
          timestamp: new Date(),
          activityType: 'ranking',
          channel: 'local',
          details: {
            keywords: ['workers comp attorney near me'],
            position: 2,
            previousPosition: 5,
            url: 'https://carolinalegal.com/workers-compensation',
          },
          impact: 'medium',
          requiresResponse: true,
        },
      ],
      expectedResponses: [
        'seo', // Response type
        'within_24h', // Urgency
      ],
    };

    await this.executeScenario(scenario);
  }

  /**
   * Test 3: Social Media Activity
   */
  private async testSocialMediaActivity(): Promise<void> {
    logger.info('🧪 Testing Social Media Activity Detection');

    const scenario: TestScenario = {
      name: 'Social Media Activity',
      competitor: {
        id: 'comp-3',
        name: 'Triangle Law Partners',
        website: 'https://trianglelaw.com',
        practiceAreas: ['family_law', 'criminal_defense'],
        locations: ['Raleigh', 'Durham'],
        socialMedia: {
          facebook: 'trianglelawpartners',
          instagram: 'trianglelaw',
          linkedin: 'triangle-law-partners',
        },
        trackingConfig: {
          enabled: true,
          frequency: 'daily',
          priority: 'medium',
          trackSocial: true,
        },
      },
      activities: [
        {
          competitorId: 'comp-3',
          timestamp: new Date(),
          activityType: 'social',
          channel: 'facebook',
          details: {
            title: 'Free Divorce Consultation Week',
            description: 'Offering free 30-minute consultations for divorce cases all week',
            engagement: 450,
            sentiment: 'positive',
          },
          impact: 'medium',
          requiresResponse: true,
        },
        {
          competitorId: 'comp-3',
          timestamp: new Date(),
          activityType: 'social',
          channel: 'instagram',
          details: {
            title: 'Client Success Story: DUI Dismissal',
            description: 'Celebrating another successful DUI case dismissal',
            engagement: 890,
            sentiment: 'positive',
          },
          impact: 'medium',
          requiresResponse: false,
        },
      ],
      expectedResponses: [
        'social', // Response type
        'within_week', // Urgency
      ],
    };

    await this.executeScenario(scenario);
  }

  /**
   * Test 4: Review Competition
   */
  private async testReviewCompetition(): Promise<void> {
    logger.info('🧪 Testing Review Competition Detection');

    const scenario: TestScenario = {
      name: 'Review Competition',
      competitor: {
        id: 'comp-4',
        name: 'Premier Immigration Law',
        website: 'https://premierimmigration.com',
        practiceAreas: ['immigration'],
        locations: ['Charlotte', 'Orlando'],
        trackingConfig: {
          enabled: true,
          frequency: 'daily',
          priority: 'high',
          trackReviews: true,
        },
      },
      activities: [
        {
          competitorId: 'comp-4',
          timestamp: new Date(),
          activityType: 'review',
          channel: 'google',
          details: {
            title: 'New 5-star review surge',
            description: 'Received 15 five-star reviews in the past week',
            sentiment: 'positive',
            engagement: 15,
          },
          impact: 'high',
          requiresResponse: true,
        },
        {
          competitorId: 'comp-4',
          timestamp: new Date(),
          activityType: 'review',
          channel: 'avvo',
          details: {
            title: 'Featured as Top Immigration Attorney',
            description: 'Awarded Avvo Top Attorney badge for 2024',
            sentiment: 'positive',
          },
          impact: 'medium',
          requiresResponse: true,
        },
      ],
      expectedResponses: [
        'pr', // Response type
        'within_24h', // Urgency
      ],
    };

    await this.executeScenario(scenario);
  }

  /**
   * Test 5: Ad Campaign Detection
   */
  private async testAdCampaignDetection(): Promise<void> {
    logger.info('🧪 Testing Ad Campaign Detection');

    const scenario: TestScenario = {
      name: 'Ad Campaign Detection',
      competitor: {
        id: 'comp-5',
        name: 'Queen City Legal',
        website: 'https://queencitylegal.com',
        practiceAreas: ['personal_injury', 'workers_compensation'],
        locations: ['Charlotte'],
        trackingConfig: {
          enabled: true,
          frequency: 'daily',
          priority: 'high',
          trackAds: true,
        },
      },
      activities: [
        {
          competitorId: 'comp-5',
          timestamp: new Date(),
          activityType: 'ad',
          channel: 'google_ads',
          details: {
            title: 'New PPC Campaign: Car Accident Claims',
            description: 'Aggressive bidding on car accident related keywords',
            keywords: ['car accident lawyer', 'auto injury attorney', 'accident claim'],
          },
          impact: 'high',
          requiresResponse: true,
        },
        {
          competitorId: 'comp-5',
          timestamp: new Date(),
          activityType: 'ad',
          channel: 'facebook_ads',
          details: {
            title: 'Retargeting Campaign Launch',
            description: 'Facebook retargeting campaign for personal injury leads',
          },
          impact: 'medium',
          requiresResponse: true,
        },
      ],
      expectedResponses: [
        'ad_campaign', // Response type
        'immediate', // Urgency
      ],
    };

    await this.executeScenario(scenario);
  }

  /**
   * Test 6: Multi-Channel Competition
   */
  private async testMultiChannelCompetition(): Promise<void> {
    logger.info('🧪 Testing Multi-Channel Competition');

    const scenario: TestScenario = {
      name: 'Multi-Channel Competition',
      competitor: {
        id: 'comp-6',
        name: 'Statewide Legal Solutions',
        website: 'https://statewidelegalnc.com',
        practiceAreas: ['immigration', 'family_law', 'criminal_defense'],
        locations: ['Charlotte', 'Raleigh', 'Greensboro'],
        trackingConfig: {
          enabled: true,
          frequency: 'hourly',
          priority: 'high',
          trackContent: true,
          trackRankings: true,
          trackSocial: true,
          trackAds: true,
          trackReviews: true,
        },
      },
      activities: [
        {
          competitorId: 'comp-6',
          timestamp: new Date(),
          activityType: 'content',
          channel: 'blog',
          details: {
            title: 'Ultimate Guide to NC Immigration Law',
            url: 'https://statewidelegalnc.com/ultimate-immigration-guide',
            keywords: ['NC immigration', 'immigration lawyer', 'visa attorney'],
            engagement: 5000,
          },
          impact: 'high',
          requiresResponse: true,
        },
        {
          competitorId: 'comp-6',
          timestamp: new Date(),
          activityType: 'social',
          channel: 'youtube',
          details: {
            title: 'Weekly Legal Q&A Live Stream',
            description: 'Live streaming legal advice sessions every Thursday',
            engagement: 2500,
          },
          impact: 'high',
          requiresResponse: true,
        },
        {
          competitorId: 'comp-6',
          timestamp: new Date(),
          activityType: 'website_update',
          channel: 'website',
          details: {
            title: 'Launched AI Chat Assistant',
            description: '24/7 AI-powered legal chat assistant on their website',
          },
          impact: 'high',
          requiresResponse: true,
        },
      ],
      expectedResponses: [
        'content', // Primary response type
        'immediate', // Urgency
      ],
    };

    await this.executeScenario(scenario);
  }

  /**
   * Test 7: Urgent Response Scenarios
   */
  private async testUrgentResponseScenarios(): Promise<void> {
    logger.info('🧪 Testing Urgent Response Scenarios');

    const scenario: TestScenario = {
      name: 'Urgent Response Scenarios',
      competitor: {
        id: 'comp-7',
        name: 'Emergency Legal Services',
        website: 'https://emergencylegalservices.com',
        practiceAreas: ['criminal_defense', 'immigration'],
        locations: ['Charlotte'],
        trackingConfig: {
          enabled: true,
          frequency: 'hourly',
          priority: 'high',
          trackContent: true,
        },
      },
      activities: [
        {
          competitorId: 'comp-7',
          timestamp: new Date(),
          activityType: 'content',
          channel: 'press_release',
          details: {
            title: 'Major Immigration Policy Victory',
            description: 'Won landmark case affecting thousands of immigrants',
            url: 'https://pr.com/emergency-legal-victory',
          },
          impact: 'high',
          requiresResponse: true,
        },
        {
          competitorId: 'comp-7',
          timestamp: new Date(),
          activityType: 'website_update',
          channel: 'website',
          details: {
            title: 'Free Emergency Consultation Offer',
            description: 'Offering free consultations for next 48 hours only',
          },
          impact: 'high',
          requiresResponse: true,
        },
      ],
      expectedResponses: [
        'pr', // Response type
        'immediate', // Urgency
      ],
    };

    await this.executeScenario(scenario);
  }

  /**
   * Test 8: Competitive Analysis Generation
   */
  private async testCompetitiveAnalysis(): Promise<void> {
    logger.info('🧪 Testing Competitive Analysis Generation');

    const startTime = Date.now();

    try {
      // Register multiple competitors for analysis
      const competitors = ['comp-1', 'comp-2', 'comp-3', 'comp-4', 'comp-5'];

      const analysis = await competitorMonitoringSystem.generateCompetitiveAnalysis(
        'monthly',
        competitors
      );

      const duration = Date.now() - startTime;

      const passed = !!(
        analysis &&
        analysis.competitors.length > 0 &&
        analysis.marketTrends.length > 0 &&
        analysis.recommendations.length > 0 &&
        analysis.actionItems.length > 0
      );

      this.testResults.push({
        scenarioName: 'Competitive Analysis Generation',
        passed,
        duration,
        details:
          `Generated analysis for ${analysis.competitors.length} competitors, ` +
          `identified ${analysis.marketTrends.length} trends, ` +
          `${analysis.recommendations.length} recommendations, ` +
          `${analysis.actionItems.length} action items`,
      });

      if (passed) {
        logger.info('✅ Competitive Analysis Generation passed', {
          competitorCount: analysis.competitors.length,
          trendCount: analysis.marketTrends.length,
          duration,
        });
      } else {
        logger.warn('❌ Competitive Analysis Generation failed');
      }
    } catch (error) {
      this.testResults.push({
        scenarioName: 'Competitive Analysis Generation',
        passed: false,
        details: `Error: ${error}`,
      });
      logger.error('❌ Competitive Analysis Generation failed with error', { error });
    }
  }

  /**
   * Execute individual test scenario
   */
  private async executeScenario(scenario: TestScenario): Promise<void> {
    const startTime = Date.now();

    try {
      // Register competitor
      await competitorMonitoringSystem.registerCompetitor(scenario.competitor);

      // Process activities and collect responses
      const responses = [];
      for (const activity of scenario.activities) {
        // Simulate activity detection
        const response = await competitorMonitoringSystem['generateCompetitiveResponse'](activity);
        responses.push(response);
      }

      const duration = Date.now() - startTime;

      // Validate responses
      const hasExpectedTypes = responses.some(r =>
        scenario.expectedResponses.includes(r.responseType)
      );
      const hasExpectedUrgency = responses.some(r =>
        scenario.expectedResponses.includes(r.urgency)
      );
      const hasAutomatedActions = responses.some(
        r => r.automatedActions && Object.values(r.automatedActions).some(v => v)
      );

      const passed = hasExpectedTypes && hasExpectedUrgency && hasAutomatedActions;

      this.testResults.push({
        scenarioName: scenario.name,
        passed,
        duration,
        responses,
        details:
          `Processed ${scenario.activities.length} activities, ` +
          `generated ${responses.length} responses, ` +
          `response types: ${responses.map(r => r.responseType).join(', ')}, ` +
          `urgency levels: ${responses.map(r => r.urgency).join(', ')}`,
      });

      if (passed) {
        logger.info(`✅ ${scenario.name} passed`, {
          activityCount: scenario.activities.length,
          responseCount: responses.length,
          duration,
        });
      } else {
        logger.warn(`❌ ${scenario.name} failed validation`, {
          hasExpectedTypes,
          hasExpectedUrgency,
          hasAutomatedActions,
        });
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
   * Generate comprehensive test report
   */
  private generateTestReport(): void {
    const totalTests = this.testResults.length;
    const passedTests = this.testResults.filter(r => r.passed).length;
    const failedTests = totalTests - passedTests;
    const passRate = (passedTests / totalTests) * 100;
    const avgDuration =
      this.testResults.reduce((sum, r) => sum + (r.duration || 0), 0) / totalTests;

    console.log('\n' + '='.repeat(80));
    console.log('🎯 COMPETITOR MONITORING SYSTEM TEST REPORT');
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

      if (result.responses && result.responses.length > 0) {
        console.log(`   Generated Responses:`);
        result.responses.forEach((response, index) => {
          console.log(`   ${index + 1}. ${response.responseType} - ${response.urgency} priority`);
          if (response.suggestedActions) {
            console.log(`      Actions: ${response.suggestedActions.slice(0, 2).join(', ')}`);
          }
        });
      }
    }

    console.log('\n📈 RESPONSE TYPE DISTRIBUTION:');
    const responseTypes = this.testResults
      .flatMap(r => r.responses || [])
      .reduce((acc: Record<string, number>, response) => {
        acc[response.responseType] = (acc[response.responseType] || 0) + 1;
        return acc;
      }, {});

    Object.entries(responseTypes).forEach(([type, count]) => {
      console.log(`   ${type}: ${count} responses`);
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
      console.log('🎉 COMPETITOR MONITORING SYSTEM PERFORMING EXCELLENTLY');
      console.log('✨ Ready to outmaneuver the competition!');
    } else if (passRate >= 80) {
      console.log('✅ COMPETITOR MONITORING SYSTEM PERFORMING WELL');
      console.log('🔧 Minor improvements may enhance competitive edge');
    } else {
      console.log('⚠️  COMPETITOR MONITORING SYSTEM NEEDS ATTENTION');
      console.log('🔧 Please address failed tests before deployment');
    }

    console.log('='.repeat(80) + '\n');

    // Log summary for monitoring
    logger.info('Competitor monitoring test completed', {
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
  const tester = new CompetitorMonitoringTester();
  await tester.runAllTests();
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    logger.error('Competitor monitoring test suite failed', { error });
    process.exit(1);
  });
}

export { CompetitorMonitoringTester };
