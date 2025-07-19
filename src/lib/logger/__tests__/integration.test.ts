import { describe, test, expect } from '@jest/globals';
import { errorToLogMeta, createErrorLogMeta } from '../utils';
import type { LogMeta } from '../../../types/logger';

describe('Logger Integration', () => {
  test('should export errorToLogMeta utility', () => {
    const testError = new Error('Test error');
    const result = errorToLogMeta(testError);

    expect(result).toHaveProperty('error');
    expect(result.error).toHaveProperty('message', 'Test error');
    expect(result.error).toHaveProperty('name', 'Error');
  });

  test('should handle complex error scenarios', () => {
    // Test with custom error properties
    const customError = new Error('API Error') as Error & Record<string, unknown>;
    customError.code = 'ERR_API_TIMEOUT';
    customError.statusCode = 500;
    customError.retryable = true;
    customError.traceId = 'should-be-filtered'; // This should be filtered out

    const result = errorToLogMeta(customError);

    expect(result.error).toHaveProperty('message', 'API Error');
    expect(result.error).toHaveProperty('name', 'Error');
    expect(result.error).toHaveProperty('code', 'ERR_API_TIMEOUT');
    expect(result.error).toHaveProperty('statusCode', 500);
    expect(result.error).toHaveProperty('retryable', true);
    expect(result.error).not.toHaveProperty('traceId'); // Should be filtered
  });

  test('should merge error with additional metadata correctly', () => {
    const error = new Error('Database connection failed');
    const metadata: LogMeta = {
      requestId: 'req_123',
      component: 'database',
      operation: 'connect',
      timestamp: '2024-01-15T10:30:00Z',
    };

    const result = createErrorLogMeta(error, metadata);

    expect(result).toMatchObject({
      requestId: 'req_123',
      component: 'database',
      operation: 'connect',
      timestamp: '2024-01-15T10:30:00Z',
      error: {
        message: 'Database connection failed',
        name: 'Error',
      },
    });
  });

  test('should handle edge cases gracefully', () => {
    // Test with circular reference (should not throw)
    const circularObj: any = { prop: 'value' };
    circularObj.self = circularObj;

    expect(() => {
      const result = errorToLogMeta(circularObj);
      expect(result).toHaveProperty('error');
    }).not.toThrow();

    // Test with very large objects
    const largeObj = {
      data: Array.from({ length: 1000 }, (_, i) => ({ index: i, value: `item-${i}` })),
    };

    expect(() => {
      const result = errorToLogMeta(largeObj);
      expect(result).toHaveProperty('error');
    }).not.toThrow();
  });

  test('should maintain type safety with LogMeta', () => {
    const logMeta: LogMeta = {
      traceId: 'trace-123',
      spanId: 'span-456',
      timestamp: new Date().toISOString(),
      requestId: 'req-789',
      component: 'test',
      category: 'integration',
      customData: {
        nested: {
          value: 'test',
        },
      },
      tags: ['test', 'integration', 'logger'],
    };

    // Should compile without errors and contain all expected properties
    expect(logMeta.traceId).toBe('trace-123');
    expect(logMeta.customData).toEqual({ nested: { value: 'test' } });
    expect(Array.isArray(logMeta.tags)).toBe(true);
  });
});
