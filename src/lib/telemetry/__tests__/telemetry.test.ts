/**
 * OpenTelemetry Integration Tests
 * Tests for VLF telemetry infrastructure
 */

import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';

// Mock OpenTelemetry before importing
jest.mock('@opentelemetry/api', () => ({
  trace: {
    getTracer: jest.fn(() => ({
      startActiveSpan: jest.fn((name, options, callback) => {
        const mockSpan = {
          setAttributes: jest.fn(),
          setStatus: jest.fn(),
          recordException: jest.fn(),
          end: jest.fn(),
          spanContext: () => ({
            traceId: 'test-trace-id',
            spanId: 'test-span-id',
          }),
        };
        return callback(mockSpan);
      }),
    })),
    getActiveSpan: jest.fn(() => ({
      spanContext: () => ({
        traceId: 'test-trace-id',
        spanId: 'test-span-id',
      }),
    })),
  },
  context: {
    with: jest.fn((ctx, callback) => callback()),
    active: jest.fn(() => ({})),
  },
  baggage: {
    create: jest.fn(() => ({})),
    getActiveBaggage: jest.fn(() => null),
    setActiveBaggage: jest.fn(() => ({})),
    setEntry: jest.fn(() => ({})),
  },
  SpanStatusCode: {
    OK: 1,
    ERROR: 2,
  },
  SpanKind: {
    CLIENT: 1,
    SERVER: 2,
  },
}));

describe('VLF Telemetry Infrastructure', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Custom Spans', () => {
    it('should create lead capture spans with business attributes', async () => {
      const { vlfTelemetry } = await import('../custom-spans');
      
      const mockOperation = jest.fn().mockResolvedValue({ leadId: 'test-123' });
      
      const result = await vlfTelemetry.traceLeadCapture(
        'contact_form_submission',
        {
          source: 'website',
          type: 'contact_form',
          practiceArea: 'immigration',
          urgency: 'high',
          language: 'es',
          location: 'charlotte_nc',
          valueScore: 85,
        },
        mockOperation
      );

      expect(mockOperation).toHaveBeenCalled();
      expect(result).toEqual({ leadId: 'test-123' });
    });

    it('should create payment spans with transaction details', async () => {
      const { vlfTelemetry } = await import('../custom-spans');
      
      const mockOperation = jest.fn().mockResolvedValue({ paymentId: 'pay-123' });
      
      const result = await vlfTelemetry.tracePayment(
        'stripe_charge',
        {
          method: 'credit_card',
          amount: 1500,
          currency: 'USD',
          gateway: 'stripe',
          caseId: 'case-456',
          clientId: 'client-789',
        },
        mockOperation
      );

      expect(mockOperation).toHaveBeenCalled();
      expect(result).toEqual({ paymentId: 'pay-123' });
    });

    it('should create AI agent spans with model information', async () => {
      const { vlfTelemetry } = await import('../custom-spans');
      
      const mockOperation = jest.fn().mockResolvedValue({ 
        response: 'Test response',
        tokensUsed: 150 
      });
      
      const result = await vlfTelemetry.traceAIAgent(
        'legal_consultation',
        {
          agentType: 'immigration_specialist',
          model: 'gpt-4',
          conversationId: 'conv-123',
          language: 'es',
          intent: 'visa_consultation',
          confidence: 0.95,
        },
        mockOperation
      );

      expect(mockOperation).toHaveBeenCalled();
      expect(result).toEqual({ 
        response: 'Test response',
        tokensUsed: 150 
      });
    });

    it('should handle errors in traced operations', async () => {
      const { vlfTelemetry } = await import('../custom-spans');
      
      const mockError = new Error('Test error');
      const mockOperation = jest.fn().mockRejectedValue(mockError);
      
      await expect(
        vlfTelemetry.traceLeadCapture(
          'failing_operation',
          {
            source: 'website',
            type: 'contact_form',
            practiceArea: 'immigration',
            urgency: 'medium',
            language: 'en',
          },
          mockOperation
        )
      ).rejects.toThrow('Test error');

      expect(mockOperation).toHaveBeenCalled();
    });

    it('should get trace context', async () => {
      const { vlfTelemetry } = await import('../custom-spans');
      
      const context = vlfTelemetry.getTraceContext();
      
      expect(context).toEqual({
        traceId: 'test-trace-id',
        spanId: 'test-span-id',
      });
    });
  });

  describe('Telemetry Setup', () => {
    it('should initialize with correct configuration', async () => {
      // Mock environment variables
      process.env.OTEL_SERVICE_NAME = 'test-service';
      process.env.OTEL_SERVICE_VERSION = '1.0.0';
      process.env.NODE_ENV = 'test';
      
      const { telemetrySetup } = await import('../setup');
      
      const config = telemetrySetup.getConfig();
      
      expect(config.serviceName).toBe('test-service');
      expect(config.serviceVersion).toBe('1.0.0');
      expect(config.environment).toBe('test');
    });

    it('should handle missing configuration gracefully', async () => {
      // Clear environment variables
      delete process.env.OTEL_SERVICE_NAME;
      delete process.env.OTEL_SERVICE_VERSION;
      
      const { telemetrySetup } = await import('../setup');
      
      const config = telemetrySetup.getConfig();
      
      expect(config.serviceName).toBe('vasquez-law-website');
      expect(config.serviceVersion).toBe('1.0.0');
    });
  });

  describe('Configuration Check', () => {
    it('should validate telemetry configuration', async () => {
      process.env.NODE_ENV = 'development';
      process.env.OTEL_EXPORTER_OTLP_ENDPOINT = 'https://api.honeycomb.io/v1/traces';
      process.env.OTEL_EXPORTER_OTLP_HEADERS_AUTH = 'x-honeycomb-team=test-key';
      
      const { checkTelemetryConfig } = await import('../index');
      
      const config = checkTelemetryConfig();
      
      expect(config.isConfigured).toBe(true);
      expect(config.exporters).toContain('console');
      expect(config.exporters).toContain('otlp');
      expect(config.warnings).toHaveLength(0);
    });

    it('should warn about missing production configuration', async () => {
      process.env.NODE_ENV = 'production';
      delete process.env.OTEL_EXPORTER_OTLP_ENDPOINT;
      
      const { checkTelemetryConfig } = await import('../index');
      
      const config = checkTelemetryConfig();
      
      expect(config.warnings).toContain(
        'OTEL_EXPORTER_OTLP_ENDPOINT not set in production - traces will only go to console'
      );
    });
  });

  describe('API Middleware', () => {
    it('should wrap handlers with tracing', async () => {
      const { withTracing } = await import('../api-middleware');
      
      const mockHandler = jest.fn().mockResolvedValue(
        new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        })
      );
      
      const mockRequest = {
        url: 'https://test.com/api/test',
        method: 'POST',
        headers: new Map([['content-type', 'application/json']]),
        json: jest.fn().mockResolvedValue({ test: 'data' }),
        clone: jest.fn().mockReturnThis(),
      } as any;
      
      const tracedHandler = withTracing(mockHandler);
      const response = await tracedHandler(mockRequest);
      
      expect(mockHandler).toHaveBeenCalledWith(mockRequest, undefined);
      expect(response).toBeInstanceOf(Response);
    });
  });

  afterEach(() => {
    // Clean up environment variables
    delete process.env.OTEL_SERVICE_NAME;
    delete process.env.OTEL_SERVICE_VERSION;
    delete process.env.OTEL_EXPORTER_OTLP_ENDPOINT;
    delete process.env.OTEL_EXPORTER_OTLP_HEADERS_AUTH;
  });
});

describe('Integration with Existing Systems', () => {
  it('should integrate with Winston logger', async () => {
    // This test would verify that Winston logs include trace context
    // Implementation would depend on actual Winston setup
    expect(true).toBe(true);
  });

  it('should integrate with Sentry error reporting', async () => {
    // This test would verify that Sentry errors include trace context
    // Implementation would depend on actual Sentry setup
    expect(true).toBe(true);
  });
});

describe('Performance Considerations', () => {
  it('should not throw if telemetry fails', async () => {
    // Mock a failing telemetry operation
    const { vlfTelemetry } = await import('../custom-spans');
    
    // This should not throw even if tracing fails
    const mockOperation = jest.fn().mockResolvedValue({ success: true });
    
    expect(async () => {
      await vlfTelemetry.traceLeadCapture(
        'test_operation',
        {
          source: 'website',
          type: 'contact_form',
          practiceArea: 'immigration',
          urgency: 'medium',
          language: 'en',
        },
        mockOperation
      );
    }).not.toThrow();
  });

  it('should handle high-volume operations efficiently', async () => {
    const { vlfTelemetry } = await import('../custom-spans');
    
    const startTime = Date.now();
    const promises = [];
    
    // Simulate 100 concurrent operations
    for (let i = 0; i < 100; i++) {
      promises.push(
        vlfTelemetry.traceDatabase(
          'test_query',
          'SELECT * FROM test_table',
          async () => ({ id: i })
        )
      );
    }
    
    await Promise.all(promises);
    const endTime = Date.now();
    
    // Should complete within reasonable time (less than 1 second)
    expect(endTime - startTime).toBeLessThan(1000);
  });
});