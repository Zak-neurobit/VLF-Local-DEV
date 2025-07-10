'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const globals_1 = require('@jest/globals');
const index_1 = require('../index');
const call_router_1 = require('../call-router');
const status_manager_1 = require('../status-manager');
const recording_manager_1 = require('../recording-manager');
const error_handler_1 = require('../error-handler');
const security_manager_1 = require('../security-manager');
const gohighlevel_1 = require('@/services/gohighlevel');
// Mock external dependencies
globals_1.jest.mock('@/lib/logger', () => ({
  logger: {
    info: globals_1.jest.fn(),
    warn: globals_1.jest.fn(),
    error: globals_1.jest.fn(),
  },
}));
globals_1.jest.mock('@/lib/prisma', () => ({
  getPrismaClient: globals_1.jest.fn(() => ({
    voiceCall: {
      create: globals_1.jest.fn(),
      update: globals_1.jest.fn(),
      updateMany: globals_1.jest.fn(),
      findFirst: globals_1.jest.fn(),
      findUnique: globals_1.jest.fn(),
      findMany: globals_1.jest.fn(),
    },
    callRouting: {
      create: globals_1.jest.fn(),
      findMany: globals_1.jest.fn(),
    },
    callRecording: {
      upsert: globals_1.jest.fn(),
      findUnique: globals_1.jest.fn(),
      findMany: globals_1.jest.fn(),
    },
    callStatusHistory: {
      create: globals_1.jest.fn(),
      findMany: globals_1.jest.fn(),
    },
    errorLog: {
      create: globals_1.jest.fn(),
      findMany: globals_1.jest.fn(),
    },
    securityEvent: {
      create: globals_1.jest.fn(),
      findMany: globals_1.jest.fn(),
    },
    task: {
      create: globals_1.jest.fn(),
    },
    user: {
      findFirst: globals_1.jest.fn(() => ({ id: 'admin-user-id', role: 'ADMIN' })),
    },
  })),
}));
globals_1.jest.mock('@/services/gohighlevel', () => ({
  ghlService: {
    findContactByPhone: globals_1.jest.fn(),
    updateContact: globals_1.jest.fn(),
    addNote: globals_1.jest.fn(),
    createTask: globals_1.jest.fn(),
    triggerCampaign: globals_1.jest.fn(),
    syncCallRecording: globals_1.jest.fn(),
    updateContactCallOutcome: globals_1.jest.fn(),
  },
}));
// Type the mocked functions
const mockedGhlService = gohighlevel_1.ghlService;
// Mock environment variables
const originalEnv = process.env;
(0, globals_1.beforeEach)(() => {
  process.env = {
    ...originalEnv,
    RETELL_API_KEY: '2996bc9f-ca4e-422a-b64e-a09a3eaa9bc0',
    RETELL_WEBHOOK_SECRET: '2996bc9f-ca4e-422a-b64e-a09a3eaa9bc0',
    GHL_OUTBOUND_PHONE_NUMBER: '+18449673536',
    GHL_SMS_PHONE_NUMBER: '+18449673536',
    NEXT_PUBLIC_APP_URL: 'https://test.vasquezlawnc.com',
  };
  // Clear mocks
  globals_1.jest.clearAllMocks();
});
(0, globals_1.afterEach)(() => {
  process.env = originalEnv;
});
(0, globals_1.describe)('Retell-GHL Integration Tests', () => {
  (0, globals_1.describe)('Basic Service Integration', () => {
    (0, globals_1.it)('should create Retell service with correct configuration', () => {
      const service = (0, index_1.getRetellService)();
      (0, globals_1.expect)(service).toBeDefined();
    });
    (0, globals_1.it)('should validate environment variables', () => {
      (0, globals_1.expect)(process.env.RETELL_API_KEY).toBe(
        '2996bc9f-ca4e-422a-b64e-a09a3eaa9bc0'
      );
      (0, globals_1.expect)(process.env.GHL_OUTBOUND_PHONE_NUMBER).toBe('+18449673536');
    });
  });
  (0, globals_1.describe)('Call Routing', () => {
    (0, globals_1.it)('should route call with correct practice area', async () => {
      // Mock GHL contact lookup
      mockedGhlService.findContactByPhone.mockResolvedValue({
        id: 'contact-123',
        firstName: 'John',
        lastName: 'Doe',
        phone: '+15551234567',
        customFields: {
          practiceArea: 'immigration',
          preferredLanguage: 'es',
        },
      });
      const routingOptions = {
        phoneNumber: '+15551234567',
        practiceArea: 'immigration',
        language: 'es',
        sourceType: 'website',
      };
      // Mock the actual call creation since we can't test real API calls
      const mockCreateCall = globals_1.jest.fn().mockResolvedValue({
        call_id: 'test-call-123',
        agent_id: 'immigration-es-agent',
      });
      // Mock Retell service
      globals_1.jest.doMock('../index', () => ({
        getRetellService: () => ({
          createPhoneCall: mockCreateCall,
        }),
      }));
      const routeDecision = await call_router_1.callRouter.routeCall(routingOptions);
      (0, globals_1.expect)(routeDecision).toMatchObject({
        practiceArea: 'immigration',
        language: 'es',
        priority: globals_1.expect.any(Number),
      });
    });
    (0, globals_1.it)(
      'should fallback to general agent when specific agent unavailable',
      async () => {
        const routingOptions = {
          phoneNumber: '+15551234567',
          practiceArea: 'unknown_practice_area',
          language: 'en',
          sourceType: 'website',
        };
        const routeDecision = await call_router_1.callRouter.routeCall(routingOptions);
        (0, globals_1.expect)(routeDecision.practiceArea).toBe('general');
      }
    );
    (0, globals_1.it)('should handle existing client with higher priority', async () => {
      mockedGhlService.findContactByPhone.mockResolvedValue({
        id: 'existing-client-123',
        firstName: 'Jane',
        lastName: 'Smith',
        phone: '+15551234567',
        customFields: {
          clientStatus: 'active',
          practiceArea: 'personal_injury',
        },
      });
      const routingOptions = {
        phoneNumber: '+15551234567',
        sourceType: 'existing_client',
      };
      const routeDecision = await call_router_1.callRouter.routeCall(routingOptions);
      (0, globals_1.expect)(routeDecision.priority).toBeGreaterThan(1);
      (0, globals_1.expect)(routeDecision.callbackRequired).toBe(true);
    });
  });
  (0, globals_1.describe)('Status Management', () => {
    (0, globals_1.it)('should update call status correctly', async () => {
      const callId = 'test-call-123';
      await status_manager_1.statusManager.updateCallStatus(callId, 'connected', {
        timestamp: new Date(),
        agent_id: 'test-agent',
      });
      const currentStatus = status_manager_1.statusManager.getCurrentStatus(callId);
      (0, globals_1.expect)(currentStatus?.status).toBe('connected');
      (0, globals_1.expect)(currentStatus?.callId).toBe(callId);
    });
    (0, globals_1.it)('should trigger appropriate follow-up actions on call end', async () => {
      const callId = 'test-call-123';
      // Mock database call record
      globals_1.jest.doMock('@/lib/prisma', () => ({
        getPrismaClient: () => ({
          voiceCall: {
            findFirst: globals_1.jest.fn().mockResolvedValue({
              retellCallId: callId,
              ghlContactId: 'contact-123',
              phoneNumber: '+15551234567',
            }),
            updateMany: globals_1.jest.fn(),
          },
        }),
      }));
      await status_manager_1.statusManager.updateCallStatus(callId, 'ended', {
        duration: 120000, // 2 minutes
        reason: 'completed',
      });
      // Should trigger post-call processing
      (0, globals_1.expect)(mockedGhlService.triggerCampaign).toHaveBeenCalled();
    });
    (0, globals_1.it)('should handle call failures appropriately', async () => {
      const callId = 'failed-call-123';
      await status_manager_1.statusManager.updateCallStatus(callId, 'failed', {
        reason: 'Network error',
      });
      (0, globals_1.expect)(mockedGhlService.createTask).toHaveBeenCalledWith(
        globals_1.expect.objectContaining({
          title: globals_1.expect.stringContaining('Call Failed'),
        })
      );
    });
  });
  (0, globals_1.describe)('Recording and Transcription', () => {
    (0, globals_1.it)('should process recording with transcript analysis', async () => {
      const callId = 'recording-test-123';
      const mockTranscript =
        'Hello, I need help with my immigration case. I am very satisfied with the service.';
      // Mock Retell service responses
      const mockRetellService = {
        getCallRecording: globals_1.jest.fn().mockResolvedValue({
          recording_url: 'https://recordings.retellai.com/test-recording.mp3',
        }),
        getCallTranscript: globals_1.jest.fn().mockResolvedValue(mockTranscript),
        getCall: globals_1.jest.fn().mockResolvedValue({
          call_id: callId,
          duration_ms: 120000,
          metadata: {
            ghlContactId: 'contact-123',
          },
        }),
      };
      globals_1.jest.doMock('../index', () => ({
        getRetellService: () => mockRetellService,
      }));
      await recording_manager_1.recordingManager.processRecording(callId);
      (0, globals_1.expect)(mockRetellService.getCallRecording).toHaveBeenCalledWith(callId);
      (0, globals_1.expect)(mockRetellService.getCallTranscript).toHaveBeenCalledWith(callId);
      (0, globals_1.expect)(mockedGhlService.syncCallRecording).toHaveBeenCalled();
      (0, globals_1.expect)(mockedGhlService.updateContactCallOutcome).toHaveBeenCalled();
    });
    (0, globals_1.it)('should detect positive sentiment from transcript', async () => {
      const transcript = 'Thank you so much! This service is excellent and very helpful.';
      // Test sentiment analysis (we'd need to expose the private method or test through public interface)
      const callId = 'sentiment-test-123';
      const mockRetellService = {
        getCallRecording: globals_1.jest.fn().mockResolvedValue({
          recording_url: 'https://recordings.retellai.com/test.mp3',
        }),
        getCallTranscript: globals_1.jest.fn().mockResolvedValue(transcript),
        getCall: globals_1.jest.fn().mockResolvedValue({
          call_id: callId,
          duration_ms: 120000,
          metadata: { ghlContactId: 'contact-123' },
        }),
      };
      globals_1.jest.doMock('../index', () => ({
        getRetellService: () => mockRetellService,
      }));
      await recording_manager_1.recordingManager.processRecording(callId);
      // Verify positive sentiment was detected and appropriate tags were added
      (0, globals_1.expect)(mockedGhlService.updateContact).toHaveBeenCalledWith(
        'contact-123',
        globals_1.expect.objectContaining({
          tags: globals_1.expect.arrayContaining(['call-positive']),
        })
      );
    });
  });
  (0, globals_1.describe)('Error Handling', () => {
    (0, globals_1.it)('should handle authentication errors', async () => {
      const authError = {
        response: { status: 401, data: { message: 'Invalid API key' } },
        message: 'Authentication failed',
      };
      const result = await error_handler_1.retellErrorHandler.handleError(authError, {
        operation: 'create_call',
        callId: 'test-call-123',
      });
      (0, globals_1.expect)(result.type).toBe('AUTHENTICATION');
      (0, globals_1.expect)(result.recoverable).toBe(false);
    });
    (0, globals_1.it)('should handle rate limit errors with retry', async () => {
      const rateLimitError = {
        response: {
          status: 429,
          headers: { 'retry-after': '60' },
          data: { message: 'Rate limit exceeded' },
        },
        message: 'Too many requests',
      };
      const result = await error_handler_1.retellErrorHandler.handleError(rateLimitError, {
        operation: 'create_call',
      });
      (0, globals_1.expect)(result.type).toBe('RATE_LIMIT');
      (0, globals_1.expect)(result.recoverable).toBe(true);
      (0, globals_1.expect)(result.retryAfter).toBe(60);
    });
    (0, globals_1.it)('should create admin tasks for critical errors', async () => {
      const criticalError = {
        response: { status: 402, data: { message: 'Insufficient balance' } },
        message: 'Payment required',
      };
      await error_handler_1.retellErrorHandler.handleError(criticalError, {
        operation: 'create_call',
      });
      (0, globals_1.expect)(mockedGhlService.createTask).toHaveBeenCalledWith(
        globals_1.expect.objectContaining({
          title: globals_1.expect.stringContaining('Retell Account Balance'),
        })
      );
    });
  });
  (0, globals_1.describe)('Security', () => {
    (0, globals_1.it)('should verify webhook signatures correctly', () => {
      const payload = JSON.stringify({ test: 'data' });
      const secret = '2996bc9f-ca4e-422a-b64e-a09a3eaa9bc0';
      // Create valid signature
      const crypto = require('crypto');
      const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex');
      const isValid = security_manager_1.securityManager.verifyWebhookSignature(payload, signature);
      (0, globals_1.expect)(isValid).toBe(true);
    });
    (0, globals_1.it)('should reject invalid webhook signatures', () => {
      const payload = JSON.stringify({ test: 'data' });
      const invalidSignature = 'invalid-signature';
      const isValid = security_manager_1.securityManager.verifyWebhookSignature(
        payload,
        invalidSignature
      );
      (0, globals_1.expect)(isValid).toBe(false);
    });
    (0, globals_1.it)('should validate phone numbers', () => {
      // Valid phone number
      const validPhone = '+15551234567';
      const validResult = security_manager_1.securityManager.validatePhoneNumber(validPhone);
      (0, globals_1.expect)(validResult.isValid).toBe(true);
      (0, globals_1.expect)(validResult.riskLevel).toBe('low');
      // Invalid phone number
      const invalidPhone = '123';
      const invalidResult = security_manager_1.securityManager.validatePhoneNumber(invalidPhone);
      (0, globals_1.expect)(invalidResult.isValid).toBe(false);
      (0, globals_1.expect)(invalidResult.shouldBlock).toBe(true);
      // Suspicious phone number
      const suspiciousPhone = '0000000000';
      const suspiciousResult =
        security_manager_1.securityManager.validatePhoneNumber(suspiciousPhone);
      (0, globals_1.expect)(suspiciousResult.isValid).toBe(false);
      (0, globals_1.expect)(suspiciousResult.riskLevel).toBe('high');
    });
    (0, globals_1.it)('should enforce rate limits', async () => {
      const identifier = 'test-user';
      // First call should succeed
      const firstResult = await security_manager_1.securityManager.checkRateLimit(
        identifier,
        'minute'
      );
      (0, globals_1.expect)(firstResult.isLimited).toBe(false);
      (0, globals_1.expect)(firstResult.remainingCalls).toBeGreaterThan(0);
      // Simulate multiple calls to trigger rate limit
      for (let i = 0; i < 15; i++) {
        await security_manager_1.securityManager.checkRateLimit(identifier, 'minute');
      }
      // Should now be rate limited
      const limitedResult = await security_manager_1.securityManager.checkRateLimit(
        identifier,
        'minute'
      );
      (0, globals_1.expect)(limitedResult.isLimited).toBe(true);
      (0, globals_1.expect)(limitedResult.remainingCalls).toBe(0);
    });
    (0, globals_1.it)('should sanitize metadata', () => {
      const unsafeMetadata = {
        name: 'John Doe',
        note: '<script>alert("xss")</script>Safe content',
        password: 'secret123', // Should be filtered out
        email: 'john@example.com',
        nested: {
          safe: 'value',
          secret: 'hidden', // Should be filtered out
        },
      };
      const sanitized = security_manager_1.securityManager.sanitizeMetadata(unsafeMetadata);
      (0, globals_1.expect)(sanitized.name).toBe('John Doe');
      (0, globals_1.expect)(sanitized.note).toBe('Safe content'); // Script tags removed
      (0, globals_1.expect)(sanitized.password).toBeUndefined(); // Sensitive key filtered
      (0, globals_1.expect)(sanitized.email).toBe('john@example.com');
      (0, globals_1.expect)(sanitized.nested.safe).toBe('value');
      (0, globals_1.expect)(sanitized.nested.secret).toBeUndefined(); // Nested sensitive key filtered
    });
  });
  (0, globals_1.describe)('End-to-End Workflow', () => {
    (0, globals_1.it)('should complete full call workflow from trigger to recording', async () => {
      const phoneNumber = '+15551234567';
      const contactId = 'contact-123';
      // Mock GHL contact
      mockedGhlService.findContactByPhone.mockResolvedValue({
        id: contactId,
        firstName: 'John',
        lastName: 'Doe',
        phone: phoneNumber,
        customFields: {
          practiceArea: 'immigration',
          preferredLanguage: 'en',
        },
      });
      // Step 1: Route and create call
      const routingOptions = {
        phoneNumber,
        practiceArea: 'immigration',
        language: 'en',
        sourceType: 'website',
      };
      const { callId } = await call_router_1.callRouter.createRoutedCall(routingOptions);
      (0, globals_1.expect)(callId).toBeDefined();
      // Step 2: Simulate call progression
      await status_manager_1.statusManager.updateCallStatus(callId, 'queued');
      await status_manager_1.statusManager.updateCallStatus(callId, 'ringing');
      await status_manager_1.statusManager.updateCallStatus(callId, 'connected');
      // Step 3: Simulate call end
      await status_manager_1.statusManager.updateCallStatus(callId, 'ended', {
        duration: 180000, // 3 minutes
        reason: 'completed',
      });
      // Step 4: Process recording
      const mockRetellService = {
        getCallRecording: globals_1.jest.fn().mockResolvedValue({
          recording_url: 'https://recordings.retellai.com/test.mp3',
        }),
        getCallTranscript: globals_1.jest
          .fn()
          .mockResolvedValue(
            'Hello, I need help with my immigration case. The service was very helpful.'
          ),
        getCall: globals_1.jest.fn().mockResolvedValue({
          call_id: callId,
          duration_ms: 180000,
          metadata: { ghlContactId: contactId },
        }),
      };
      globals_1.jest.doMock('../index', () => ({
        getRetellService: () => mockRetellService,
      }));
      await recording_manager_1.recordingManager.processRecording(callId);
      // Verify workflow completion
      (0, globals_1.expect)(mockedGhlService.updateContact).toHaveBeenCalled();
      (0, globals_1.expect)(mockedGhlService.addNote).toHaveBeenCalled();
      (0, globals_1.expect)(mockedGhlService.syncCallRecording).toHaveBeenCalled();
    });
    (0, globals_1.it)('should handle call failure and trigger recovery', async () => {
      const phoneNumber = '+15551234567';
      const contactId = 'contact-123';
      // Mock GHL contact
      mockedGhlService.findContactByPhone.mockResolvedValue({
        id: contactId,
        firstName: '',
        lastName: '',
        phone: phoneNumber,
      });
      // Create call
      const { callId } = await call_router_1.callRouter.createRoutedCall({
        phoneNumber,
        sourceType: 'website',
      });
      // Simulate call failure
      const callError = new Error('Network timeout');
      await error_handler_1.retellErrorHandler.handleError(callError, {
        operation: 'create_call',
        callId,
        contactId,
      });
      await status_manager_1.statusManager.updateCallStatus(callId, 'failed', {
        reason: 'Network timeout',
      });
      // Verify failure handling
      (0, globals_1.expect)(mockedGhlService.createTask).toHaveBeenCalledWith(
        globals_1.expect.objectContaining({
          contactId,
          title: globals_1.expect.stringContaining('Call Failed'),
        })
      );
    });
  });
  (0, globals_1.describe)('Integration Health Checks', () => {
    (0, globals_1.it)('should validate all required environment variables', () => {
      const requiredVars = [
        'RETELL_API_KEY',
        'RETELL_WEBHOOK_SECRET',
        'GHL_OUTBOUND_PHONE_NUMBER',
        'GHL_SMS_PHONE_NUMBER',
      ];
      requiredVars.forEach(varName => {
        (0, globals_1.expect)(process.env[varName]).toBeDefined();
        (0, globals_1.expect)(process.env[varName]).not.toBe('');
      });
    });
    (0, globals_1.it)('should verify service configurations', () => {
      const securityConfig = security_manager_1.securityManager.getConfig();
      (0, globals_1.expect)(securityConfig.rateLimits).toBeDefined();
      (0, globals_1.expect)(securityConfig.allowedOrigins).toContain(
        'https://test.vasquezlawnc.com'
      );
    });
    (0, globals_1.it)('should test webhook endpoint security', () => {
      // Test various security scenarios
      const validationTests = [
        {
          origin: 'https://malicious-site.com',
          expected: 'medium', // Should be flagged as suspicious
        },
        {
          userAgent: 'curl/7.68.0',
          expected: 'medium', // Should be flagged as suspicious
        },
        {
          apiKey: 'invalid-key',
          expected: 'high', // Should be blocked
        },
      ];
      validationTests.forEach(async test => {
        const result = await security_manager_1.securityManager.validateAPIRequest(
          test.apiKey || process.env.RETELL_API_KEY,
          test.origin,
          test.userAgent
        );
        if (test.expected === 'high') {
          (0, globals_1.expect)(result.shouldBlock).toBe(true);
        } else {
          (0, globals_1.expect)(result.riskLevel).toBe(test.expected);
        }
      });
    });
  });
});
(0, globals_1.describe)('Performance Tests', () => {
  (0, globals_1.it)('should handle concurrent call requests', async () => {
    const concurrentCalls = 5;
    const promises = [];
    for (let i = 0; i < concurrentCalls; i++) {
      promises.push(
        call_router_1.callRouter.createRoutedCall({
          phoneNumber: `+155512345${i}${i}`,
          sourceType: 'website',
        })
      );
    }
    const results = await Promise.allSettled(promises);
    const successful = results.filter(result => result.status === 'fulfilled');
    (0, globals_1.expect)(successful.length).toBeGreaterThan(0);
  });
  (0, globals_1.it)('should process recordings efficiently', async () => {
    const recordingPromises = [];
    for (let i = 0; i < 3; i++) {
      // Mock different call scenarios
      const mockRetellService = {
        getCallRecording: globals_1.jest.fn().mockResolvedValue({
          recording_url: `https://recordings.retellai.com/test-${i}.mp3`,
        }),
        getCallTranscript: globals_1.jest
          .fn()
          .mockResolvedValue(`Test transcript ${i} with various content for analysis.`),
        getCall: globals_1.jest.fn().mockResolvedValue({
          call_id: `test-call-${i}`,
          duration_ms: 120000,
          metadata: { ghlContactId: `contact-${i}` },
        }),
      };
      globals_1.jest.doMock('../index', () => ({
        getRetellService: () => mockRetellService,
      }));
      recordingPromises.push(
        recording_manager_1.recordingManager.processRecording(`test-call-${i}`)
      );
    }
    const start = Date.now();
    await Promise.allSettled(recordingPromises);
    const duration = Date.now() - start;
    // Should process recordings reasonably quickly
    (0, globals_1.expect)(duration).toBeLessThan(5000); // 5 seconds
  });
});
