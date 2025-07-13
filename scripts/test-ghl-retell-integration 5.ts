#!/usr/bin/env ts-node

/**
 * Test script for GoHighLevel-Retell integration
 * Tests the complete flow from webhook trigger to SMS follow-up
 */

import { config } from 'dotenv';
import { ghlService } from '@/services/gohighlevel';
import { getRetellService } from '@/services/retell';
import { RetellAgentManager } from '@/services/retell/agent-manager-v2';
import { logger } from '@/lib/logger';

// Load environment variables
config();

interface TestContact {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  practiceArea: string;
  language: 'en' | 'es';
}

const TEST_CONTACTS: TestContact[] = [
  {
    firstName: 'John',
    lastName: 'Smith',
    phone: '+15551234567',
    email: 'john.smith@test.com',
    practiceArea: 'immigration',
    language: 'en',
  },
  {
    firstName: 'Maria',
    lastName: 'Garcia',
    phone: '+15551234568',
    email: 'maria.garcia@test.com',
    practiceArea: 'immigration',
    language: 'es',
  },
  {
    firstName: 'Bob',
    lastName: 'Johnson',
    phone: '+15551234569',
    email: 'bob.johnson@test.com',
    practiceArea: 'personal_injury',
    language: 'en',
  },
];

async function testGHLConnection(): Promise<boolean> {
  try {
    logger.info('Testing GoHighLevel connection...');
    const status = await ghlService.getServiceStatus();
    logger.info('GHL Status:', status);
    return status.status === 'connected';
  } catch (error) {
    logger.error('GHL connection test failed:', error);
    return false;
  }
}

async function testRetellConnection(): Promise<boolean> {
  try {
    logger.info('Testing Retell AI connection...');
    const retellService = getRetellService();
    const agents = await retellService.listAgents();
    logger.info(`Retell connection successful. Found ${agents.length} agents.`);
    return true;
  } catch (error) {
    logger.error('Retell connection test failed:', error);
    return false;
  }
}

async function testAgentInitialization(): Promise<boolean> {
  try {
    logger.info('Testing Retell agent initialization...');
    await RetellAgentManager.initialize();
    
    const immigrationAgent = await RetellAgentManager.getAgentForPracticeArea('immigration');
    const spanishAgent = await RetellAgentManager.getAgentForPracticeArea('immigration_es');
    const generalAgent = await RetellAgentManager.getAgentForPracticeArea('general');
    
    logger.info('Agents found:', {
      immigration: !!immigrationAgent,
      spanish: !!spanishAgent,
      general: !!generalAgent,
    });
    
    return !!(immigrationAgent && generalAgent);
  } catch (error) {
    logger.error('Agent initialization test failed:', error);
    return false;
  }
}

async function createTestContact(contact: TestContact): Promise<string | null> {
  try {
    logger.info(`Creating test contact: ${contact.firstName} ${contact.lastName}`);
    
    const ghlContact = await ghlService.upsertContact({
      firstName: contact.firstName,
      lastName: contact.lastName,
      phone: contact.phone,
      email: contact.email,
      tags: ['test-contact', contact.practiceArea],
      source: 'integration-test',
      customFields: {
        practiceArea: contact.practiceArea,
        preferredLanguage: contact.language,
        testContact: true,
      },
    });
    
    logger.info(`Test contact created with ID: ${ghlContact.id}`);
    return ghlContact.id;
  } catch (error) {
    logger.error('Failed to create test contact:', error);
    return null;
  }
}

async function testVoiceCallTrigger(contactId: string, contact: TestContact): Promise<boolean> {
  try {
    logger.info(`Testing voice call trigger for contact: ${contactId}`);
    
    // Simulate the API call that would be made by GHL webhook
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/ghl/trigger-call`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contactId,
        contact: {
          firstName: contact.firstName,
          lastName: contact.lastName,
          phone: contact.phone,
          email: contact.email,
          tags: ['test-contact', contact.practiceArea],
          customFields: {
            practiceArea: contact.practiceArea,
            preferredLanguage: contact.language,
          },
        },
        practiceArea: contact.practiceArea,
        callType: 'consultation',
        preferredLanguage: contact.language,
        metadata: { test: true },
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      logger.error('Voice call trigger failed:', errorText);
      return false;
    }
    
    const result = await response.json();
    logger.info('Voice call triggered successfully:', result);
    return result.success;
  } catch (error) {
    logger.error('Voice call trigger test failed:', error);
    return false;
  }
}

async function testSMSSending(contactId: string): Promise<boolean> {
  try {
    logger.info(`Testing SMS sending for contact: ${contactId}`);
    
    // Simulate the API call for post-call SMS
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/ghl/send-sms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contactId,
        message: 'This is a test SMS from the Vasquez Law Firm integration test.',
        triggerType: 'follow-up',
        metadata: { test: true },
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      logger.error('SMS sending failed:', errorText);
      return false;
    }
    
    const result = await response.json();
    logger.info('SMS sent successfully:', result);
    return result.success;
  } catch (error) {
    logger.error('SMS sending test failed:', error);
    return false;
  }
}

async function testCallOutcomeUpdate(contactId: string): Promise<boolean> {
  try {
    logger.info(`Testing call outcome update for contact: ${contactId}`);
    
    await ghlService.updateContactCallOutcome(contactId, {
      callId: 'test-call-' + Date.now(),
      duration: 180, // 3 minutes
      outcome: 'connected',
      summary: 'Test call completed successfully. Client interested in immigration services.',
      sentiment: 'positive',
      nextSteps: 'Schedule consultation with attorney',
      appointmentScheduled: false,
    });
    
    logger.info('Call outcome updated successfully');
    return true;
  } catch (error) {
    logger.error('Call outcome update test failed:', error);
    return false;
  }
}

async function cleanupTestContacts(): Promise<void> {
  try {
    logger.info('Cleaning up test contacts...');
    
    // Search for test contacts
    const testContacts = await ghlService.searchContacts('test-contact', {
      tags: ['test-contact'],
      limit: 50,
    });
    
    logger.info(`Found ${testContacts.contacts?.length || 0} test contacts to clean up`);
    
    // Note: We won't actually delete contacts in this test
    // In a real cleanup, you would delete them here
    
  } catch (error) {
    logger.error('Test contact cleanup failed:', error);
  }
}

async function runIntegrationTests(): Promise<void> {
  logger.info('🚀 Starting GoHighLevel-Retell Integration Tests');
  
  const results = {
    ghlConnection: false,
    retellConnection: false,
    agentInitialization: false,
    contactCreation: 0,
    voiceCallTriggers: 0,
    smsTests: 0,
    callOutcomeUpdates: 0,
  };
  
  try {
    // Test 1: Service connections
    results.ghlConnection = await testGHLConnection();
    results.retellConnection = await testRetellConnection();
    
    // Test 2: Agent initialization
    results.agentInitialization = await testAgentInitialization();
    
    // Test 3: Contact and call flow tests
    for (const contact of TEST_CONTACTS) {
      const contactId = await createTestContact(contact);
      
      if (contactId) {
        results.contactCreation++;
        
        // Test voice call trigger (but don't actually make calls in test)
        const callTriggered = await testVoiceCallTrigger(contactId, contact);
        if (callTriggered) results.voiceCallTriggers++;
        
        // Test SMS sending
        const smsSuccessful = await testSMSSending(contactId);
        if (smsSuccessful) results.smsTests++;
        
        // Test call outcome update
        const outcomeUpdated = await testCallOutcomeUpdate(contactId);
        if (outcomeUpdated) results.callOutcomeUpdates++;
        
        // Small delay between contacts
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
  } catch (error) {
    logger.error('Integration test suite failed:', error);
  } finally {
    // Cleanup
    await cleanupTestContacts();
  }
  
  // Report results
  logger.info('🏁 Integration Test Results:', results);
  
  const totalTests = 2 + 1 + (TEST_CONTACTS.length * 4); // connections + agents + (contacts * tests per contact)
  const passedTests = 
    (results.ghlConnection ? 1 : 0) +
    (results.retellConnection ? 1 : 0) +
    (results.agentInitialization ? 1 : 0) +
    results.contactCreation +
    results.voiceCallTriggers +
    results.smsTests +
    results.callOutcomeUpdates;
  
  logger.info(`✅ Test Summary: ${passedTests}/${totalTests} tests passed`);
  
  if (passedTests === totalTests) {
    logger.info('🎉 All integration tests passed! The GoHighLevel-Retell integration is working correctly.');
  } else {
    logger.warn('⚠️  Some tests failed. Please check the logs and configuration.');
  }
}

// Run the tests if this script is executed directly
if (require.main === module) {
  runIntegrationTests()
    .then(() => {
      logger.info('Integration tests completed');
      process.exit(0);
    })
    .catch((error) => {
      logger.error('Integration tests failed:', error);
      process.exit(1);
    });
}

export { runIntegrationTests };