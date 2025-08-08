/**
 * Retell SDK Connection Test
 * Tests all aspects of the Retell integration
 */

import { getRetellClient, createWebCall, getAgentId } from './client';
import { logger } from '@/lib/safe-logger';

export interface RetellConnectionTestResult {
  success: boolean;
  tests: {
    sdkInitialization: { passed: boolean; message: string };
    apiKey: { passed: boolean; message: string };
    agentConfiguration: { passed: boolean; message: string; agentId?: string };
    webCallCreation: { passed: boolean; message: string; callData?: any };
  };
  summary: string;
}

export async function testRetellConnection(): Promise<RetellConnectionTestResult> {
  const result: RetellConnectionTestResult = {
    success: false,
    tests: {
      sdkInitialization: { passed: false, message: '' },
      apiKey: { passed: false, message: '' },
      agentConfiguration: { passed: false, message: '' },
      webCallCreation: { passed: false, message: '' },
    },
    summary: '',
  };

  try {
    // Test 1: SDK Initialization
    logger.info('Testing Retell SDK initialization...');
    try {
      const client = getRetellClient();
      result.tests.sdkInitialization.passed = true;
      result.tests.sdkInitialization.message = '✅ SDK initialized successfully';
    } catch (error) {
      result.tests.sdkInitialization.message = `❌ SDK initialization failed: ${error}`;
      return result;
    }

    // Test 2: API Key Validation
    logger.info('Testing API key configuration...');
    const apiKey = process.env.RETELL_API_KEY;
    if (!apiKey) {
      result.tests.apiKey.message = '❌ RETELL_API_KEY not configured';
      return result;
    } else if (apiKey.length < 10) {
      result.tests.apiKey.message = '❌ RETELL_API_KEY appears invalid (too short)';
      return result;
    } else {
      result.tests.apiKey.passed = true;
      result.tests.apiKey.message = '✅ API key configured correctly';
    }

    // Test 3: Agent Configuration
    logger.info('Testing agent configuration...');
    try {
      const englishAgentId = getAgentId('en');
      const spanishAgentId = getAgentId('es');
      
      result.tests.agentConfiguration.passed = true;
      result.tests.agentConfiguration.agentId = englishAgentId;
      result.tests.agentConfiguration.message = 
        `✅ Agent IDs configured - EN: ${englishAgentId.substring(0, 20)}... ES: ${spanishAgentId.substring(0, 20)}...`;
    } catch (error) {
      result.tests.agentConfiguration.message = `❌ Agent configuration failed: ${error}`;
      return result;
    }

    // Test 4: Web Call Creation
    logger.info('Testing web call creation...');
    try {
      const testAgentId = getAgentId('en');
      const callData = await createWebCall({
        agentId: testAgentId,
        language: 'en',
        metadata: {
          test: true,
          timestamp: new Date().toISOString(),
        },
      });

      if (callData.access_token && callData.call_id) {
        result.tests.webCallCreation.passed = true;
        result.tests.webCallCreation.callData = {
          callId: callData.call_id,
          hasAccessToken: !!callData.access_token,
        };
        result.tests.webCallCreation.message = '✅ Web call creation successful';
      } else {
        result.tests.webCallCreation.message = '❌ Web call creation returned invalid data';
        return result;
      }
    } catch (error) {
      result.tests.webCallCreation.message = `❌ Web call creation failed: ${error}`;
      return result;
    }

    // All tests passed
    result.success = true;
    result.summary = '🎉 All Retell SDK tests passed! Voice chat is ready.';
    
    return result;
  } catch (error) {
    logger.error('Retell connection test failed:', error);
    result.summary = `❌ Connection test failed: ${error}`;
    return result;
  }
}

export async function validateRetellEnvironment(): Promise<{
  valid: boolean;
  issues: string[];
  recommendations: string[];
}> {
  const issues: string[] = [];
  const recommendations: string[] = [];

  // Check required environment variables
  if (!process.env.RETELL_API_KEY) {
    issues.push('RETELL_API_KEY is not set');
  }

  if (!process.env.RETELL_AGENT_ID && 
      !process.env.RETELL_AGENT_ENGLISH_INTAKE && 
      !process.env.RETELL_AGENT_SPANISH_INTAKE) {
    issues.push('No Retell agent IDs configured');
    recommendations.push('Set RETELL_AGENT_ID or specific language agent IDs');
  }

  // Check optional but recommended variables
  if (!process.env.RETELL_WEBHOOK_SECRET) {
    recommendations.push('Consider setting RETELL_WEBHOOK_SECRET for webhook security');
  }

  if (!process.env.RETELL_VOICE_ID) {
    recommendations.push('Consider setting RETELL_VOICE_ID for consistent voice selection');
  }

  return {
    valid: issues.length === 0,
    issues,
    recommendations,
  };
}