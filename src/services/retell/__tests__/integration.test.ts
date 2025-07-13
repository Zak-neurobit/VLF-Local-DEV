import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { getRetellService } from '../index';
import { callRouter } from '../call-router';
import { statusManager } from '../status-manager';
import { recordingManager } from '../recording-manager';
import { retellErrorHandler } from '../error-handler';
import { securityManager } from '../security-manager';
import { ghlService } from '@/services/gohighlevel';
import type { GHLContact } from '@/services/gohighlevel/types';

// Mock external dependencies
jest.mock('@/lib/logger', () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('@/lib/prisma', () => ({
  getPrismaClient: jest.fn(() => ({
    voiceCall: {
      create: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
    callRouting: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
    callRecording: {
      upsert: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
    callStatusHistory: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
    errorLog: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
    securityEvent: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
    task: {
      create: jest.fn(),
    },
    user: {
      findFirst: jest.fn(() => ({ id: 'admin-user-id', role: 'ADMIN' })),
    },
  })),
}));

jest.mock('@/services/gohighlevel', () => ({
  ghlService: {
    findContactByPhone: jest.fn(),
    updateContact: jest.fn(),
    addNote: jest.fn(),
    createTask: jest.fn(),
    triggerCampaign: jest.fn(),
    syncCallRecording: jest.fn(),
    updateContactCallOutcome: jest.fn(),
  },
}));

// Type the mocked functions
const mockedGhlService = ghlService as jest.Mocked<typeof ghlService>;

// Mock environment variables
const originalEnv = process.env;
beforeEach(() => {
  process.env = {
    ...originalEnv,
    RETELL_API_KEY: '2996bc9f-ca4e-422a-b64e-a09a3eaa9bc0',
    RETELL_WEBHOOK_SECRET: '2996bc9f-ca4e-422a-b64e-a09a3eaa9bc0',
    GHL_OUTBOUND_PHONE_NUMBER: '+18449673536',
    GHL_SMS_PHONE_NUMBER: '+18449673536',
    NEXT_PUBLIC_APP_URL: 'https://test.vasquezlawnc.com',
  };

  // Clear mocks
  jest.clearAllMocks();
});

afterEach(() => {
  process.env = originalEnv;
});

describe('Retell-GHL Integration Tests', () => {
  describe('Basic Service Integration', () => {
    it('should create Retell service with correct configuration', () => {
      const service = getRetellService();
      expect(service).toBeDefined();
    });

    it('should validate environment variables', () => {
      expect(process.env.RETELL_API_KEY).toBe('2996bc9f-ca4e-422a-b64e-a09a3eaa9bc0');
      expect(process.env.GHL_OUTBOUND_PHONE_NUMBER).toBe('+18449673536');
    });
  });

  describe('Call Routing', () => {
    it('should route call with correct practice area', async () => {
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
      } as GHLContact);

      const routingOptions = {
        phoneNumber: '+15551234567',
        practiceArea: 'immigration',
        language: 'es' as const,
        sourceType: 'website' as const,
      };

      // Mock the actual call creation since we can't test real API calls
      const mockCreateCall = (jest.fn() as jest.MockedFunction<() => Promise<{call_id: string; agent_id: string}>>).mockResolvedValue({
        call_id: 'test-call-123',
        agent_id: 'immigration-es-agent',
      });

      // Mock Retell service
      jest.doMock('../index', () => ({
        getRetellService: () => ({
          createPhoneCall: mockCreateCall,
        } as any),
      }));

      const routeDecision = await callRouter.routeCall(routingOptions);

      expect(routeDecision).toMatchObject({
        practiceArea: 'immigration',
        language: 'es',
        priority: expect.any(Number),
      });
    });

    it('should fallback to general agent when specific agent unavailable', async () => {
      const routingOptions = {
        phoneNumber: '+15551234567',
        practiceArea: 'unknown_practice_area',
        language: 'en' as const,
        sourceType: 'website' as const,
      };

      const routeDecision = await callRouter.routeCall(routingOptions);

      expect(routeDecision.practiceArea).toBe('general');
    });

    it('should handle existing client with higher priority', async () => {
      mockedGhlService.findContactByPhone.mockResolvedValue({
        id: 'existing-client-123',
        firstName: 'Jane',
        lastName: 'Smith',
        phone: '+15551234567',
        customFields: {
          clientStatus: 'active',
          practiceArea: 'personal_injury',
        },
      } as GHLContact);

      const routingOptions = {
        phoneNumber: '+15551234567',
        sourceType: 'existing_client' as const,
      };

      const routeDecision = await callRouter.routeCall(routingOptions);

      expect(routeDecision.priority).toBeGreaterThan(1);
      expect(routeDecision.callbackRequired).toBe(true);
    });
  });

  describe('Status Management', () => {
    it('should update call status correctly', async () => {
      const callId = 'test-call-123';

      await statusManager.updateCallStatus(callId, 'connected', {
        timestamp: new Date(),
        agent_id: 'test-agent',
      });

      const currentStatus = statusManager.getCurrentStatus(callId);
      expect(currentStatus?.status).toBe('connected');
      expect(currentStatus?.callId).toBe(callId);
    });

    it('should trigger appropriate follow-up actions on call end', async () => {
      const callId = 'test-call-123';

      // Mock database call record
      jest.doMock('@/lib/prisma', () => ({
        getPrismaClient: () => ({
          voiceCall: {
            findFirst: (jest.fn() as jest.MockedFunction<(args: any) => Promise<{retellCallId: string; ghlContactId: string; phoneNumber: string} | null>>).mockResolvedValue({
              retellCallId: callId,
              ghlContactId: 'contact-123',
              phoneNumber: '+15551234567',
            }),
            updateMany: jest.fn() as jest.MockedFunction<(args: any) => Promise<any>>,
          },
        } as any),
      }));

      await statusManager.updateCallStatus(callId, 'ended', {
        duration: 120000, // 2 minutes
        reason: 'completed',
      });

      // Should trigger post-call processing
      expect(mockedGhlService.triggerCampaign).toHaveBeenCalled();
    });

    it('should handle call failures appropriately', async () => {
      const callId = 'failed-call-123';

      await statusManager.updateCallStatus(callId, 'failed', {
        reason: 'Network error',
      });

      expect(mockedGhlService.createTask).toHaveBeenCalledWith(
        expect.objectContaining({
          title: expect.stringContaining('Call Failed'),
        })
      );
    });
  });

  describe('Recording and Transcription', () => {
    it('should process recording with transcript analysis', async () => {
      const callId = 'recording-test-123';
      const mockTranscript =
        'Hello, I need help with my immigration case. I am very satisfied with the service.';

      // Mock Retell service responses
      const mockRetellService = {
        getCallRecording: (jest.fn() as jest.MockedFunction<(callId: string) => Promise<{recording_url: string}>>).mockResolvedValue({
          recording_url: 'https://recordings.retellai.com/test-recording.mp3',
        }),
        getCallTranscript: (jest.fn() as jest.MockedFunction<(callId: string) => Promise<string>>).mockResolvedValue(mockTranscript),
        getCall: (jest.fn() as jest.MockedFunction<(callId: string) => Promise<{call_id: string; duration_ms: number; metadata: {ghlContactId: string}}>>).mockResolvedValue({
          call_id: callId,
          duration_ms: 120000,
          metadata: {
            ghlContactId: 'contact-123',
          },
        }),
      };

      jest.doMock('../index', () => ({
        getRetellService: () => mockRetellService,
      }));

      await recordingManager.processRecording(callId);

      expect(mockRetellService.getCallRecording).toHaveBeenCalledWith(callId);
      expect(mockRetellService.getCallTranscript).toHaveBeenCalledWith(callId);
      expect(mockedGhlService.syncCallRecording).toHaveBeenCalled();
      expect(mockedGhlService.updateContactCallOutcome).toHaveBeenCalled();
    });

    it('should detect positive sentiment from transcript', async () => {
      const transcript = 'Thank you so much! This service is excellent and very helpful.';

      // Test sentiment analysis (we'd need to expose the private method or test through public interface)
      const callId = 'sentiment-test-123';

      const mockRetellService = {
        getCallRecording: (jest.fn() as jest.MockedFunction<(callId: string) => Promise<{recording_url: string}>>).mockResolvedValue({
          recording_url: 'https://recordings.retellai.com/test.mp3',
        }),
        getCallTranscript: (jest.fn() as jest.MockedFunction<(callId: string) => Promise<string>>).mockResolvedValue(transcript),
        getCall: (jest.fn() as jest.MockedFunction<(callId: string) => Promise<{call_id: string; duration_ms: number; metadata: {ghlContactId: string}}>>).mockResolvedValue({
          call_id: callId,
          duration_ms: 120000,
          metadata: { ghlContactId: 'contact-123' },
        }),
      };

      jest.doMock('../index', () => ({
        getRetellService: () => mockRetellService,
      }));

      await recordingManager.processRecording(callId);

      // Verify positive sentiment was detected and appropriate tags were added
      expect(mockedGhlService.updateContact).toHaveBeenCalledWith(
        'contact-123',
        expect.objectContaining({
          tags: expect.arrayContaining(['call-positive']),
        })
      );
    });
  });

  describe('Error Handling', () => {
    it('should handle authentication errors', async () => {
      const authError = {
        response: { status: 401, data: { message: 'Invalid API key' } },
        message: 'Authentication failed',
      };

      const result = await retellErrorHandler.handleError(authError, {
        operation: 'create_call',
        callId: 'test-call-123',
      });

      expect(result.type).toBe('AUTHENTICATION');
      expect(result.recoverable).toBe(false);
    });

    it('should handle rate limit errors with retry', async () => {
      const rateLimitError = {
        response: {
          status: 429,
          headers: { 'retry-after': '60' },
          data: { message: 'Rate limit exceeded' },
        },
        message: 'Too many requests',
      };

      const result = await retellErrorHandler.handleError(rateLimitError, {
        operation: 'create_call',
      });

      expect(result.type).toBe('RATE_LIMIT');
      expect(result.recoverable).toBe(true);
      expect(result.retryAfter).toBe(60);
    });

    it('should create admin tasks for critical errors', async () => {
      const criticalError = {
        response: { status: 402, data: { message: 'Insufficient balance' } },
        message: 'Payment required',
      };

      await retellErrorHandler.handleError(criticalError, {
        operation: 'create_call',
      });

      expect(mockedGhlService.createTask).toHaveBeenCalledWith(
        expect.objectContaining({
          title: expect.stringContaining('Retell Account Balance'),
        })
      );
    });
  });

  describe('Security', () => {
    it('should verify webhook signatures correctly', () => {
      const payload = JSON.stringify({ test: 'data' });
      const secret = '2996bc9f-ca4e-422a-b64e-a09a3eaa9bc0';

      // Create valid signature
      const crypto = require('crypto');
      const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex');

      const isValid = securityManager.verifyWebhookSignature(payload, signature);
      expect(isValid).toBe(true);
    });

    it('should reject invalid webhook signatures', () => {
      const payload = JSON.stringify({ test: 'data' });
      const invalidSignature = 'invalid-signature';

      const isValid = securityManager.verifyWebhookSignature(payload, invalidSignature);
      expect(isValid).toBe(false);
    });

    it('should validate phone numbers', () => {
      // Valid phone number
      const validPhone = '+15551234567';
      const validResult = securityManager.validatePhoneNumber(validPhone);
      expect(validResult.isValid).toBe(true);
      expect(validResult.riskLevel).toBe('low');

      // Invalid phone number
      const invalidPhone = '123';
      const invalidResult = securityManager.validatePhoneNumber(invalidPhone);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.shouldBlock).toBe(true);

      // Suspicious phone number
      const suspiciousPhone = '0000000000';
      const suspiciousResult = securityManager.validatePhoneNumber(suspiciousPhone);
      expect(suspiciousResult.isValid).toBe(false);
      expect(suspiciousResult.riskLevel).toBe('high');
    });

    it('should enforce rate limits', async () => {
      const identifier = 'test-user';

      // First call should succeed
      const firstResult = await securityManager.checkRateLimit(identifier, 'minute');
      expect(firstResult.isLimited).toBe(false);
      expect(firstResult.remainingCalls).toBeGreaterThan(0);

      // Simulate multiple calls to trigger rate limit
      for (let i = 0; i < 15; i++) {
        await securityManager.checkRateLimit(identifier, 'minute');
      }

      // Should now be rate limited
      const limitedResult = await securityManager.checkRateLimit(identifier, 'minute');
      expect(limitedResult.isLimited).toBe(true);
      expect(limitedResult.remainingCalls).toBe(0);
    });

    it('should sanitize metadata', () => {
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

      const sanitized = securityManager.sanitizeMetadata(unsafeMetadata);

      expect(sanitized.name).toBe('John Doe');
      expect(sanitized.note).toBe('Safe content'); // Script tags removed
      expect(sanitized.password).toBeUndefined(); // Sensitive key filtered
      expect(sanitized.email).toBe('john@example.com');
      expect(sanitized.nested.safe).toBe('value');
      expect(sanitized.nested.secret).toBeUndefined(); // Nested sensitive key filtered
    });
  });

  describe('End-to-End Workflow', () => {
    it('should complete full call workflow from trigger to recording', async () => {
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
      } as GHLContact);

      // Step 1: Route and create call
      const routingOptions = {
        phoneNumber,
        practiceArea: 'immigration',
        language: 'en' as const,
        sourceType: 'website' as const,
      };

      const { callId } = await callRouter.createRoutedCall(routingOptions);
      expect(callId).toBeDefined();

      // Step 2: Simulate call progression
      await statusManager.updateCallStatus(callId, 'queued');
      await statusManager.updateCallStatus(callId, 'ringing');
      await statusManager.updateCallStatus(callId, 'connected');

      // Step 3: Simulate call end
      await statusManager.updateCallStatus(callId, 'ended', {
        duration: 180000, // 3 minutes
        reason: 'completed',
      });

      // Step 4: Process recording
      const mockRetellService = {
        getCallRecording: (jest.fn() as jest.MockedFunction<(callId: string) => Promise<{recording_url: string}>>).mockResolvedValue({
          recording_url: 'https://recordings.retellai.com/test.mp3',
        }),
        getCallTranscript: (jest
          .fn() as jest.MockedFunction<(callId: string) => Promise<string>>)
          .mockResolvedValue(
            'Hello, I need help with my immigration case. The service was very helpful.'
          ),
        getCall: (jest.fn() as jest.MockedFunction<(callId: string) => Promise<{call_id: string; duration_ms: number; metadata: {ghlContactId: string}}>>).mockResolvedValue({
          call_id: callId,
          duration_ms: 180000,
          metadata: { ghlContactId: contactId },
        }),
      };

      jest.doMock('../index', () => ({
        getRetellService: () => mockRetellService,
      }));

      await recordingManager.processRecording(callId);

      // Verify workflow completion
      expect(mockedGhlService.updateContact).toHaveBeenCalled();
      expect(mockedGhlService.addNote).toHaveBeenCalled();
      expect(mockedGhlService.syncCallRecording).toHaveBeenCalled();
    });

    it('should handle call failure and trigger recovery', async () => {
      const phoneNumber = '+15551234567';
      const contactId = 'contact-123';

      // Mock GHL contact
      mockedGhlService.findContactByPhone.mockResolvedValue({
        id: contactId,
        firstName: '',
        lastName: '',
        phone: phoneNumber,
      } as GHLContact);

      // Create call
      const { callId } = await callRouter.createRoutedCall({
        phoneNumber,
        sourceType: 'website',
      });

      // Simulate call failure
      const callError = new Error('Network timeout');
      await retellErrorHandler.handleError(callError, {
        operation: 'create_call',
        callId,
        contactId,
      });

      await statusManager.updateCallStatus(callId, 'failed', {
        reason: 'Network timeout',
      });

      // Verify failure handling
      expect(mockedGhlService.createTask).toHaveBeenCalledWith(
        expect.objectContaining({
          contactId,
          title: expect.stringContaining('Call Failed'),
        })
      );
    });
  });

  describe('Integration Health Checks', () => {
    it('should validate all required environment variables', () => {
      const requiredVars = [
        'RETELL_API_KEY',
        'RETELL_WEBHOOK_SECRET',
        'GHL_OUTBOUND_PHONE_NUMBER',
        'GHL_SMS_PHONE_NUMBER',
      ];

      requiredVars.forEach(varName => {
        expect(process.env[varName]).toBeDefined();
        expect(process.env[varName]).not.toBe('');
      });
    });

    it('should verify service configurations', () => {
      const securityConfig = securityManager.getConfig();
      expect(securityConfig.rateLimits).toBeDefined();
      expect(securityConfig.allowedOrigins).toContain('https://test.vasquezlawnc.com');
    });

    it('should test webhook endpoint security', () => {
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
        const result = await securityManager.validateAPIRequest(
          test.apiKey || process.env.RETELL_API_KEY!,
          test.origin,
          test.userAgent
        );

        if (test.expected === 'high') {
          expect(result.shouldBlock).toBe(true);
        } else {
          expect(result.riskLevel).toBe(test.expected);
        }
      });
    });
  });
});

describe('Performance Tests', () => {
  it('should handle concurrent call requests', async () => {
    const concurrentCalls = 5;
    const promises = [];

    for (let i = 0; i < concurrentCalls; i++) {
      promises.push(
        callRouter.createRoutedCall({
          phoneNumber: `+155512345${i}${i}`,
          sourceType: 'website',
        })
      );
    }

    const results = await Promise.allSettled(promises);
    const successful = results.filter(result => result.status === 'fulfilled');

    expect(successful.length).toBeGreaterThan(0);
  });

  it('should process recordings efficiently', async () => {
    const recordingPromises = [];

    for (let i = 0; i < 3; i++) {
      // Mock different call scenarios
      const mockRetellService = {
        getCallRecording: (jest.fn() as jest.MockedFunction<(callId: string) => Promise<{recording_url: string}>>).mockResolvedValue({
          recording_url: `https://recordings.retellai.com/test-${i}.mp3`,
        }),
        getCallTranscript: (jest
          .fn() as jest.MockedFunction<(callId: string) => Promise<string>>)
          .mockResolvedValue(`Test transcript ${i} with various content for analysis.`),
        getCall: (jest.fn() as jest.MockedFunction<(callId: string) => Promise<{call_id: string; duration_ms: number; metadata: {ghlContactId: string}}>>).mockResolvedValue({
          call_id: `test-call-${i}`,
          duration_ms: 120000,
          metadata: { ghlContactId: `contact-${i}` },
        }),
      };

      jest.doMock('../index', () => ({
        getRetellService: () => mockRetellService,
      }));

      recordingPromises.push(recordingManager.processRecording(`test-call-${i}`));
    }

    const start = Date.now();
    await Promise.allSettled(recordingPromises);
    const duration = Date.now() - start;

    // Should process recordings reasonably quickly
    expect(duration).toBeLessThan(5000); // 5 seconds
  });
});
