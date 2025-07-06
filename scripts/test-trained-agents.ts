#!/usr/bin/env node

import { CrewCoordinator } from '../src/lib/crewai/enhanced-crew-coordinator';
import { logger } from '../src/lib/logger';

async function testTrainedAgents() {
  logger.info('Testing trained CrewAI agents...');
  
  try {
    const coordinator = CrewCoordinator.getInstance();
    
    // Test cases for each agent type
    const testCases = [
      {
        name: 'Family-based Immigration',
        query: 'I want to petition for my spouse who lives in Mexico. I am a US citizen.',
        context: {
          petitioner: 'John Smith',
          beneficiary: 'Maria Garcia',
          relationship: 'spouse',
          petitionerStatus: 'USC' as const,
          beneficiaryLocation: 'abroad' as const,
        }
      },
      {
        name: 'Business Immigration - H1B',
        query: 'We need to file an H-1B petition for a software engineer position.',
        context: {
          position: 'Software Engineer',
          degree: 'Bachelor in Computer Science',
          salary: '$85,000',
          jobDuties: 'Design and develop software applications',
          employerType: 'Technology company',
          capSubject: true,
        }
      },
      {
        name: 'Humanitarian - Asylum',
        query: 'I fled persecution in my country and need to apply for asylum.',
        context: {
          clientName: 'Test Client',
          countryOfOrigin: 'Venezuela',
          persecutionType: 'Political opinion',
          protectedGround: 'Political opinion',
          entryDate: '2024-01-15',
        }
      },
      {
        name: 'PERM Labor Certification',
        query: 'We want to start the PERM process for our employee.',
        context: {
          position: 'Data Analyst',
          requirements: 'Bachelor degree + 2 years experience',
          salary: '$75,000',
          location: 'Charlotte, NC',
          foreignNational: 'Current H-1B employee',
          recruitmentReady: false,
        }
      },
      {
        name: 'U Visa',
        query: 'I was a victim of assault and helped police. Can I get a U visa?',
        context: {
          clientName: 'Crime Victim',
          crimeType: 'Aggravated assault',
          harmSuffered: 'Physical injuries requiring hospitalization',
          lawEnforcementCooperation: 'Testified in criminal trial',
          certificationStatus: 'Ready to request',
        }
      }
    ];

    // Run tests
    for (const testCase of testCases) {
      logger.info(`\n🧪 Testing: ${testCase.name}`);
      logger.info(`Query: ${testCase.query}`);
      
      // Use executeTask instead of routeQuery
      const task = {
        type: 'legal_consultation' as const,
        data: {
          query: testCase.query,
          context: testCase.context
        },
        priority: 'high' as const,
        metadata: {
          source: 'test',
          testName: testCase.name
        }
      };
      const result = await coordinator.executeTask(task);
      
      logger.info('Response received:', {
        summary: result.summary?.substring(0, 100) + '...',
        recommendations: result.recommendations?.length || 0,
        requirements: result.requirements?.length || 0,
        hasTimeline: !!result.timeline,
        hasNextSteps: !!result.nextSteps,
      });
    }
    
    logger.info('\n✅ All agent tests completed!');
    
  } catch (error) {
    logger.error('Agent testing failed:', error);
    process.exit(1);
  }
}

// Run tests
testTrainedAgents().catch(error => {
  logger.error('Fatal error during testing:', error);
  process.exit(1);
});