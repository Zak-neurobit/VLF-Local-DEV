#!/usr/bin/env tsx
/**
 * Client Intake System Test Suite
 * Comprehensive testing of AI-powered client intake and case assessment
 */

import {
  aiClientIntakeSystem,
  ClientIntakeRequest,
} from '../src/lib/crewai/ai-powered-client-intake';
import { logger } from '../src/lib/logger';

interface TestCase {
  name: string;
  request: ClientIntakeRequest;
  expectedPracticeArea: string;
  expectedJurisdiction: 'nationwide' | 'north_carolina';
  expectedViability?: string;
  expectedPriority?: string;
}

class ClientIntakeSystemTester {
  private testResults: Array<{
    testName: string;
    passed: boolean;
    details: string;
    assessment?: any;
    duration?: number;
  }> = [];

  async runAllTests(): Promise<void> {
    logger.info('🚀 Starting Client Intake System Tests');

    try {
      // Test 1: Immigration Case (Nationwide)
      await this.testImmigrationCase();

      // Test 2: Personal Injury Case (NC)
      await this.testPersonalInjuryCase();

      // Test 3: Workers Compensation Case (NC)
      await this.testWorkersCompCase();

      // Test 4: Family Law Case (NC)
      await this.testFamilyLawCase();

      // Test 5: Criminal Defense Case (NC)
      await this.testCriminalDefenseCase();

      // Test 6: Urgent Case Handling
      await this.testUrgentCaseHandling();

      // Test 7: Out-of-State Client Routing
      await this.testOutOfStateClientRouting();

      // Test 8: Multi-Language Support
      await this.testMultiLanguageSupport();

      // Test 9: Complex Case Assessment
      await this.testComplexCaseAssessment();

      // Test 10: Financial Viability Analysis
      await this.testFinancialViabilityAnalysis();

      // Test 11: Risk and Opportunity Assessment
      await this.testRiskOpportunityAssessment();

      // Test 12: Follow-up Strategy Generation
      await this.testFollowUpStrategyGeneration();

      // Generate comprehensive report
      this.generateTestReport();
    } catch (error) {
      logger.error('❌ Client intake test suite failed', { error });
      throw error;
    }
  }

  /**
   * Test 1: Immigration Case Assessment
   */
  private async testImmigrationCase(): Promise<void> {
    logger.info('🧪 Testing Immigration Case Assessment');

    const request: ClientIntakeRequest = {
      personalInfo: {
        firstName: 'Maria',
        lastName: 'Rodriguez',
        email: 'maria.rodriguez@email.com',
        phone: '(555) 123-4567',
        preferredLanguage: 'es',
        location: {
          city: 'Charlotte',
          state: 'North Carolina',
          zipCode: '28202',
        },
      },
      legalIssue: {
        primaryArea: 'immigration',
        description:
          'I need help applying for a green card through my US citizen spouse. We have been married for 2 years and I am currently on a visitor visa that expires soon.',
        urgency: 'within_weeks',
        hasDeadlines: true,
        deadlineDate: '2024-03-15',
      },
      priorLegalExperience: {
        hasAttorney: false,
        priorCases: false,
        priorDenials: false,
      },
      financialSituation: {
        employmentStatus: 'employed',
        monthlyIncome: '$3,000',
        hasInsurance: false,
        abilityToPay: 'payment_plan',
      },
      clientGoals: [
        'Get permanent residency',
        'Stay with my family in the US',
        'Avoid deportation',
      ],
      specificQuestions: [
        'How long does the green card process take?',
        'What documents do I need?',
        'Can I work while waiting?',
      ],
      source: 'website',
    };

    await this.executeTest('Immigration Case Assessment', request, {
      expectedPracticeArea: 'immigration',
      expectedJurisdiction: 'nationwide',
      expectedViability: ['strong', 'good', 'moderate'],
      expectedPriority: ['high', 'medium'],
    });
  }

  /**
   * Test 2: Personal Injury Case Assessment
   */
  private async testPersonalInjuryCase(): Promise<void> {
    logger.info('🧪 Testing Personal Injury Case Assessment');

    const request: ClientIntakeRequest = {
      personalInfo: {
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@email.com',
        phone: '(919) 555-0123',
        preferredLanguage: 'en',
        location: {
          city: 'Raleigh',
          state: 'North Carolina',
          zipCode: '27601',
        },
      },
      legalIssue: {
        primaryArea: 'personal_injury',
        description:
          'I was hit by a drunk driver last month while stopped at a red light. I suffered a broken arm and whiplash. The other driver was arrested for DUI. I have medical bills of $15,000 so far and cannot work.',
        urgency: 'within_days',
        estimatedValue: '$50,000',
        hasDeadlines: false,
      },
      priorLegalExperience: {
        hasAttorney: false,
        priorCases: false,
        priorDenials: false,
      },
      financialSituation: {
        employmentStatus: 'employed',
        monthlyIncome: '$4,500',
        hasInsurance: true,
        insuranceType: 'Auto and Health Insurance',
        abilityToPay: 'payment_plan',
      },
      clientGoals: [
        'Get compensation for medical bills',
        'Recover lost wages',
        'Make sure the other driver is held accountable',
      ],
      specificQuestions: [
        'How much is my case worth?',
        'How long will this take?',
        'Do I need to go to court?',
      ],
      source: 'referral',
      referralSource: 'Friend recommendation',
    };

    await this.executeTest('Personal Injury Case Assessment', request, {
      expectedPracticeArea: 'personal_injury',
      expectedJurisdiction: 'north_carolina',
      expectedViability: ['strong', 'good'],
      expectedPriority: ['high', 'medium'],
    });
  }

  /**
   * Test 3: Workers Compensation Case Assessment
   */
  private async testWorkersCompCase(): Promise<void> {
    logger.info('🧪 Testing Workers Compensation Case Assessment');

    const request: ClientIntakeRequest = {
      personalInfo: {
        firstName: 'David',
        lastName: 'Johnson',
        email: 'david.johnson@email.com',
        phone: '(704) 555-0789',
        preferredLanguage: 'en',
        location: {
          city: 'Charlotte',
          state: 'North Carolina',
          zipCode: '28205',
        },
      },
      legalIssue: {
        primaryArea: 'workers_compensation',
        description:
          'I injured my back lifting heavy boxes at work three weeks ago. I reported it immediately to my supervisor and went to the company doctor. Now they are saying it is not work-related and denying my workers comp claim. I cannot return to work yet.',
        urgency: 'within_days',
        hasDeadlines: true,
        deadlineDate: '2024-02-28',
      },
      priorLegalExperience: {
        hasAttorney: false,
        priorCases: false,
        priorDenials: true,
      },
      financialSituation: {
        employmentStatus: 'unemployed',
        monthlyIncome: '$0',
        hasInsurance: true,
        insuranceType: 'Workers Compensation Insurance',
        abilityToPay: 'limited_budget',
      },
      clientGoals: [
        'Get my workers comp claim approved',
        'Get medical treatment covered',
        'Receive wage replacement benefits',
      ],
      specificQuestions: [
        'What can I do if my claim was denied?',
        'How much will I receive in benefits?',
        'Can they force me back to work?',
      ],
      source: 'search',
    };

    await this.executeTest('Workers Compensation Case Assessment', request, {
      expectedPracticeArea: 'workers_compensation',
      expectedJurisdiction: 'north_carolina',
      expectedViability: ['good', 'moderate'],
      expectedPriority: ['high', 'urgent'],
    });
  }

  /**
   * Test 4: Family Law Case Assessment
   */
  private async testFamilyLawCase(): Promise<void> {
    logger.info('🧪 Testing Family Law Case Assessment');

    const request: ClientIntakeRequest = {
      personalInfo: {
        firstName: 'Sarah',
        lastName: 'Williams',
        email: 'sarah.williams@email.com',
        phone: '(910) 555-0456',
        preferredLanguage: 'en',
        location: {
          city: 'Goldsboro',
          state: 'North Carolina',
          zipCode: '27530',
        },
      },
      legalIssue: {
        primaryArea: 'family_law',
        description:
          'My husband and I have been separated for 8 months and I want to file for divorce. We have two children (ages 6 and 9) and disagree on custody arrangements. We also own a house together and have retirement accounts. He has been difficult to work with.',
        urgency: 'within_months',
        hasDeadlines: false,
      },
      priorLegalExperience: {
        hasAttorney: false,
        priorCases: false,
        priorDenials: false,
      },
      financialSituation: {
        employmentStatus: 'employed',
        monthlyIncome: '$3,500',
        hasInsurance: true,
        insuranceType: 'Health Insurance',
        abilityToPay: 'payment_plan',
      },
      clientGoals: [
        'Get primary custody of my children',
        'Keep the family home',
        'Get fair division of assets',
        'Minimize conflict with ex-husband',
      ],
      specificQuestions: [
        'How long do I need to be separated before filing for divorce?',
        'What are my chances of getting primary custody?',
        'How will assets be divided?',
      ],
      source: 'website',
    };

    await this.executeTest('Family Law Case Assessment', request, {
      expectedPracticeArea: 'family_law',
      expectedJurisdiction: 'north_carolina',
      expectedViability: ['good', 'moderate'],
      expectedPriority: ['medium', 'low'],
    });
  }

  /**
   * Test 5: Criminal Defense Case Assessment
   */
  private async testCriminalDefenseCase(): Promise<void> {
    logger.info('🧪 Testing Criminal Defense Case Assessment');

    const request: ClientIntakeRequest = {
      personalInfo: {
        firstName: 'Michael',
        lastName: 'Brown',
        email: 'michael.brown@email.com',
        phone: '(919) 555-0321',
        preferredLanguage: 'en',
        location: {
          city: 'Raleigh',
          state: 'North Carolina',
          zipCode: '27610',
        },
      },
      legalIssue: {
        primaryArea: 'criminal_defense',
        description:
          'I was arrested for DUI last weekend after a traffic stop. This is my first offense and I blew a 0.10 on the breathalyzer. I have a court date next month and I am worried about losing my job and my license. I need help understanding my options.',
        urgency: 'within_days',
        hasDeadlines: true,
        deadlineDate: '2024-03-10',
      },
      priorLegalExperience: {
        hasAttorney: false,
        priorCases: false,
        priorDenials: false,
        priorConvictions: false,
      },
      financialSituation: {
        employmentStatus: 'employed',
        monthlyIncome: '$5,000',
        hasInsurance: false,
        abilityToPay: 'full_payment',
      },
      clientGoals: [
        'Avoid jail time',
        'Keep my drivers license',
        'Minimize impact on my job',
        'Get the best possible outcome',
      ],
      specificQuestions: [
        'What are the penalties for first-time DUI in NC?',
        'Can I get the charges reduced?',
        'How long will this stay on my record?',
      ],
      source: 'search',
    };

    await this.executeTest('Criminal Defense Case Assessment', request, {
      expectedPracticeArea: 'criminal_defense',
      expectedJurisdiction: 'north_carolina',
      expectedViability: ['good', 'moderate'],
      expectedPriority: ['urgent', 'high'],
    });
  }

  /**
   * Test 6: Urgent Case Handling
   */
  private async testUrgentCaseHandling(): Promise<void> {
    logger.info('🧪 Testing Urgent Case Handling');

    const request: ClientIntakeRequest = {
      personalInfo: {
        firstName: 'Emergency',
        lastName: 'Client',
        email: 'emergency@email.com',
        phone: '(919) 555-9999',
        preferredLanguage: 'en',
        location: {
          city: 'Durham',
          state: 'North Carolina',
          zipCode: '27701',
        },
      },
      legalIssue: {
        primaryArea: 'immigration',
        description:
          'ICE agents came to my house this morning looking for me. My friend told me to call a lawyer immediately. I have been in the US for 10 years and have two US citizen children. I need help right now.',
        urgency: 'immediate',
        hasDeadlines: true,
        deadlineDate: '2024-01-20', // Tomorrow
      },
      priorLegalExperience: {
        hasAttorney: false,
        priorCases: false,
        priorDenials: false,
      },
      financialSituation: {
        employmentStatus: 'employed',
        hasInsurance: false,
        abilityToPay: 'limited_budget',
      },
      clientGoals: ['Avoid deportation', 'Stay with my children', 'Get legal status'],
      specificQuestions: [
        'What should I do if ICE comes back?',
        'Can I get protection because of my children?',
      ],
      source: 'referral',
    };

    await this.executeTest('Urgent Case Handling', request, {
      expectedPracticeArea: 'immigration',
      expectedJurisdiction: 'nationwide',
      expectedViability: ['moderate', 'weak', 'good'],
      expectedPriority: ['urgent'],
    });
  }

  /**
   * Test 7: Out-of-State Client Routing
   */
  private async testOutOfStateClientRouting(): Promise<void> {
    logger.info('🧪 Testing Out-of-State Client Routing');

    const request: ClientIntakeRequest = {
      personalInfo: {
        firstName: 'OutOfState',
        lastName: 'Client',
        email: 'outofstate@email.com',
        phone: '(404) 555-0000',
        preferredLanguage: 'en',
        location: {
          city: 'Atlanta',
          state: 'Georgia',
          zipCode: '30301',
        },
      },
      legalIssue: {
        primaryArea: 'personal_injury',
        description:
          'I was injured in a car accident in Georgia and the insurance company is not being fair. I heard good things about your firm and want to see if you can help.',
        urgency: 'within_weeks',
        hasDeadlines: false,
      },
      priorLegalExperience: {
        hasAttorney: false,
        priorCases: false,
        priorDenials: false,
      },
      financialSituation: {
        employmentStatus: 'employed',
        hasInsurance: true,
        abilityToPay: 'payment_plan',
      },
      clientGoals: ['Get fair settlement', 'Resolve quickly'],
      specificQuestions: ['Can you handle cases in Georgia?'],
      source: 'referral',
    };

    await this.executeTest('Out-of-State Client Routing', request, {
      expectedPracticeArea: 'immigration', // Should route to immigration or referral
      expectedJurisdiction: 'nationwide',
      expectedViability: ['needs_evaluation'],
      expectedPriority: ['medium', 'low'],
    });
  }

  /**
   * Test 8: Multi-Language Support
   */
  private async testMultiLanguageSupport(): Promise<void> {
    logger.info('🧪 Testing Multi-Language Support');

    const request: ClientIntakeRequest = {
      personalInfo: {
        firstName: 'Carmen',
        lastName: 'Lopez',
        email: 'carmen.lopez@email.com',
        phone: '(704) 555-7777',
        preferredLanguage: 'es',
        location: {
          city: 'Charlotte',
          state: 'North Carolina',
          zipCode: '28269',
        },
      },
      legalIssue: {
        primaryArea: 'family_law',
        description:
          'Mi esposo me está amenazando y necesito una orden de protección. También quiero el divorcio y la custodia de mis hijos. Tengo miedo y necesito ayuda inmediatamente.',
        urgency: 'immediate',
        hasDeadlines: true,
      },
      priorLegalExperience: {
        hasAttorney: false,
        priorCases: false,
        priorDenials: false,
      },
      financialSituation: {
        employmentStatus: 'unemployed',
        hasInsurance: false,
        abilityToPay: 'seeking_pro_bono',
      },
      clientGoals: [
        'Obtener orden de protección',
        'Divorciarme',
        'Conseguir custodia de mis hijos',
      ],
      specificQuestions: [
        '¿Pueden ayudarme en español?',
        '¿Qué debo hacer si mi esposo viene a buscarme?',
      ],
      source: 'walk_in',
    };

    await this.executeTest('Multi-Language Support', request, {
      expectedPracticeArea: 'family_law',
      expectedJurisdiction: 'north_carolina',
      expectedViability: ['moderate', 'good'],
      expectedPriority: ['urgent'],
    });
  }

  /**
   * Test 9: Complex Case Assessment
   */
  private async testComplexCaseAssessment(): Promise<void> {
    logger.info('🧪 Testing Complex Case Assessment');

    const request: ClientIntakeRequest = {
      personalInfo: {
        firstName: 'Complex',
        lastName: 'Case',
        email: 'complex@email.com',
        phone: '(919) 555-1111',
        preferredLanguage: 'en',
        location: {
          city: 'Raleigh',
          state: 'North Carolina',
          zipCode: '27605',
        },
      },
      legalIssue: {
        primaryArea: 'unknown',
        description:
          'I have multiple legal issues. I was injured at work but also involved in a car accident on the way to the hospital. Now I am facing DUI charges because I took pain medication before driving. My wife is also filing for divorce and my immigration status is in question because of the criminal charges.',
        urgency: 'immediate',
        hasDeadlines: true,
        deadlineDate: '2024-02-15',
      },
      priorLegalExperience: {
        hasAttorney: true,
        priorAttorneyName: 'Previous Attorney',
        priorCases: true,
        priorDenials: true,
        priorConvictions: false,
      },
      financialSituation: {
        employmentStatus: 'unemployed',
        hasInsurance: true,
        abilityToPay: 'limited_budget',
      },
      clientGoals: [
        'Handle criminal charges',
        'Get workers comp benefits',
        'Resolve car accident claim',
        'Protect immigration status',
        'Deal with divorce proceedings',
      ],
      specificQuestions: [
        'How do all these cases affect each other?',
        'Which issue should I handle first?',
        'Can one lawyer handle everything?',
      ],
      source: 'referral',
    };

    await this.executeTest('Complex Case Assessment', request, {
      expectedPracticeArea: ['criminal_defense', 'immigration', 'personal_injury'], // Could route to any
      expectedJurisdiction: ['north_carolina', 'nationwide'],
      expectedViability: ['moderate', 'complex', 'challenging'],
      expectedPriority: ['urgent'],
    });
  }

  /**
   * Test 10: Financial Viability Analysis
   */
  private async testFinancialViabilityAnalysis(): Promise<void> {
    logger.info('🧪 Testing Financial Viability Analysis');

    const request: ClientIntakeRequest = {
      personalInfo: {
        firstName: 'High',
        lastName: 'Value',
        email: 'highvalue@email.com',
        phone: '(919) 555-2222',
        preferredLanguage: 'en',
        location: {
          city: 'Cary',
          state: 'North Carolina',
          zipCode: '27511',
        },
      },
      legalIssue: {
        primaryArea: 'personal_injury',
        description:
          "I was severely injured in a truck accident that was clearly the other driver's fault. I have over $200,000 in medical bills, lost my $150,000/year job, and will need ongoing care. The trucking company has insurance and assets.",
        urgency: 'within_weeks',
        estimatedValue: '$1,000,000+',
        hasDeadlines: false,
      },
      priorLegalExperience: {
        hasAttorney: false,
        priorCases: false,
        priorDenials: false,
      },
      financialSituation: {
        employmentStatus: 'unemployed',
        monthlyIncome: '$0',
        hasInsurance: true,
        insuranceType: 'Health and Auto Insurance',
        abilityToPay: 'full_payment',
      },
      clientGoals: [
        'Get maximum compensation',
        'Ensure long-term care is covered',
        'Hold trucking company accountable',
      ],
      specificQuestions: [
        'What is my case worth?',
        'Do I need to pay attorney fees upfront?',
        'How long will this take?',
      ],
      source: 'advertisement',
    };

    await this.executeTest('Financial Viability Analysis', request, {
      expectedPracticeArea: 'personal_injury',
      expectedJurisdiction: 'north_carolina',
      expectedViability: ['strong', 'good'],
      expectedPriority: ['high', 'medium'],
    });
  }

  /**
   * Test 11: Risk and Opportunity Assessment
   */
  private async testRiskOpportunityAssessment(): Promise<void> {
    logger.info('🧪 Testing Risk and Opportunity Assessment');

    const request: ClientIntakeRequest = {
      personalInfo: {
        firstName: 'Risky',
        lastName: 'Opportunity',
        email: 'risky@email.com',
        phone: '(704) 555-3333',
        preferredLanguage: 'en',
        location: {
          city: 'Charlotte',
          state: 'North Carolina',
          zipCode: '28204',
        },
      },
      legalIssue: {
        primaryArea: 'immigration',
        description:
          'I have been in the US illegally for 15 years but my US citizen daughter just turned 21. I also have a DUI from 5 years ago and was denied a visitor visa twice in the past. My daughter wants to petition for me but I am scared about the risks.',
        urgency: 'within_months',
        hasDeadlines: false,
      },
      priorLegalExperience: {
        hasAttorney: false,
        priorCases: true,
        priorDenials: true,
        priorConvictions: true,
      },
      financialSituation: {
        employmentStatus: 'employed',
        monthlyIncome: '$2,500',
        hasInsurance: false,
        abilityToPay: 'payment_plan',
      },
      clientGoals: ['Get legal status', 'Stay with my family', 'Avoid deportation'],
      specificQuestions: [
        'What are the risks of applying?',
        'Could I be deported if I apply?',
        'Is there any other option?',
      ],
      source: 'referral',
    };

    await this.executeTest('Risk and Opportunity Assessment', request, {
      expectedPracticeArea: 'immigration',
      expectedJurisdiction: 'nationwide',
      expectedViability: ['moderate', 'weak', 'challenging'],
      expectedPriority: ['medium', 'low'],
    });
  }

  /**
   * Test 12: Follow-up Strategy Generation
   */
  private async testFollowUpStrategyGeneration(): Promise<void> {
    logger.info('🧪 Testing Follow-up Strategy Generation');

    const request: ClientIntakeRequest = {
      personalInfo: {
        firstName: 'Standard',
        lastName: 'Case',
        email: 'standard@email.com',
        phone: '(910) 555-4444',
        preferredLanguage: 'en',
        location: {
          city: 'Smithfield',
          state: 'North Carolina',
          zipCode: '27577',
        },
      },
      legalIssue: {
        primaryArea: 'workers_compensation',
        description:
          'I hurt my shoulder at work about a month ago. I filed a workers comp claim and it was approved. I am getting medical treatment but I want to make sure I am getting all the benefits I deserve and that my rights are protected.',
        urgency: 'planning',
        hasDeadlines: false,
      },
      priorLegalExperience: {
        hasAttorney: false,
        priorCases: false,
        priorDenials: false,
      },
      financialSituation: {
        employmentStatus: 'employed',
        monthlyIncome: '$3,200',
        hasInsurance: true,
        insuranceType: 'Workers Compensation',
        abilityToPay: 'payment_plan',
      },
      clientGoals: [
        'Ensure I get all benefits I deserve',
        'Protect my rights',
        'Get back to work safely',
      ],
      specificQuestions: [
        'Am I getting the right amount of benefits?',
        'What if my injury gets worse?',
        'Do I need a lawyer even though my claim was approved?',
      ],
      source: 'website',
    };

    await this.executeTest('Follow-up Strategy Generation', request, {
      expectedPracticeArea: 'workers_compensation',
      expectedJurisdiction: 'north_carolina',
      expectedViability: ['good', 'moderate'],
      expectedPriority: ['low', 'medium'],
    });
  }

  /**
   * Execute individual test
   */
  private async executeTest(
    testName: string,
    request: ClientIntakeRequest,
    expectations: {
      expectedPracticeArea: string | string[];
      expectedJurisdiction: 'nationwide' | 'north_carolina' | ('nationwide' | 'north_carolina')[];
      expectedViability?: string | string[];
      expectedPriority?: string | string[];
    }
  ): Promise<void> {
    const startTime = Date.now();

    try {
      const assessment = await aiClientIntakeSystem.processClientIntake(request);
      const duration = Date.now() - startTime;

      // Validate results
      const practiceAreaMatch = Array.isArray(expectations.expectedPracticeArea)
        ? expectations.expectedPracticeArea.includes(assessment.practiceArea)
        : assessment.practiceArea === expectations.expectedPracticeArea;

      const jurisdictionMatch = Array.isArray(expectations.expectedJurisdiction)
        ? expectations.expectedJurisdiction.includes(assessment.jurisdiction)
        : assessment.jurisdiction === expectations.expectedJurisdiction;

      const viabilityMatch =
        !expectations.expectedViability ||
        (Array.isArray(expectations.expectedViability)
          ? expectations.expectedViability.includes(assessment.caseAnalysis.viability)
          : assessment.caseAnalysis.viability === expectations.expectedViability);

      const priorityMatch =
        !expectations.expectedPriority ||
        (Array.isArray(expectations.expectedPriority)
          ? expectations.expectedPriority.includes(assessment.followUpStrategy.priority)
          : assessment.followUpStrategy.priority === expectations.expectedPriority);

      const passed = practiceAreaMatch && jurisdictionMatch && viabilityMatch && priorityMatch;

      // Additional validations
      const hasRecommendations = assessment.recommendations.immediate_actions.length > 0;
      const hasTimeline = assessment.recommendations.timeline.length > 0;
      const hasCostAnalysis = !!assessment.costAnalysis.estimatedCosts.total_estimated;
      const hasFollowUpStrategy = !!assessment.followUpStrategy.priority;

      const additionalChecks =
        hasRecommendations && hasTimeline && hasCostAnalysis && hasFollowUpStrategy;

      this.testResults.push({
        testName,
        passed: passed && additionalChecks,
        duration,
        details:
          `Practice Area: ${assessment.practiceArea} (expected: ${expectations.expectedPracticeArea}), ` +
          `Jurisdiction: ${assessment.jurisdiction} (expected: ${expectations.expectedJurisdiction}), ` +
          `Viability: ${assessment.caseAnalysis.viability}, ` +
          `Priority: ${assessment.followUpStrategy.priority}, ` +
          `Confidence: ${assessment.confidence}%, ` +
          `Agent: ${assessment.agentUsed}, ` +
          `Duration: ${duration}ms`,
        assessment,
      });

      if (passed && additionalChecks) {
        logger.info(`✅ ${testName} passed`, {
          practiceArea: assessment.practiceArea,
          jurisdiction: assessment.jurisdiction,
          viability: assessment.caseAnalysis.viability,
          priority: assessment.followUpStrategy.priority,
          duration,
        });
      } else {
        logger.warn(`❌ ${testName} failed validation`, {
          practiceAreaMatch,
          jurisdictionMatch,
          viabilityMatch,
          priorityMatch,
          additionalChecks,
        });
      }
    } catch (error) {
      const duration = Date.now() - startTime;

      this.testResults.push({
        testName,
        passed: false,
        duration,
        details: `Error: ${error}`,
      });

      logger.error(`❌ ${testName} failed with error`, { error, duration });
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
    console.log('🎯 CLIENT INTAKE SYSTEM TEST REPORT');
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

      console.log(`\n${status} ${result.testName}${duration}`);
      console.log(`   ${result.details}`);
    }

    console.log('\n📈 PRACTICE AREA DISTRIBUTION:');
    const practiceAreas = this.testResults
      .filter(r => r.passed && r.assessment)
      .reduce((acc: Record<string, number>, r) => {
        const area = r.assessment.practiceArea;
        acc[area] = (acc[area] || 0) + 1;
        return acc;
      }, {});

    Object.entries(practiceAreas).forEach(([area, count]) => {
      console.log(`   ${area}: ${count} cases`);
    });

    console.log('\n⚡ PERFORMANCE METRICS:');
    const durations = this.testResults.map(r => r.duration || 0).filter(d => d > 0);
    const minDuration = Math.min(...durations);
    const maxDuration = Math.max(...durations);
    const medianDuration = durations.sort((a, b) => a - b)[Math.floor(durations.length / 2)];

    console.log(`   Fastest: ${minDuration}ms`);
    console.log(`   Slowest: ${maxDuration}ms`);
    console.log(`   Median: ${medianDuration}ms`);

    console.log('\n' + '='.repeat(80));

    if (passRate >= 90) {
      console.log('🎉 CLIENT INTAKE SYSTEM PERFORMING EXCELLENTLY');
      console.log('✨ All systems operational and ready for production!');
    } else if (passRate >= 80) {
      console.log('✅ CLIENT INTAKE SYSTEM PERFORMING WELL');
      console.log('🔧 Minor improvements may be beneficial');
    } else {
      console.log('⚠️  CLIENT INTAKE SYSTEM NEEDS ATTENTION');
      console.log('🔧 Please address failed tests before deployment');
    }

    console.log('='.repeat(80) + '\n');

    // Log summary for monitoring
    logger.info('Client intake system test completed', {
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
  const tester = new ClientIntakeSystemTester();
  await tester.runAllTests();
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    logger.error('Client intake test suite failed', { error });
    process.exit(1);
  });
}

export { ClientIntakeSystemTester };
