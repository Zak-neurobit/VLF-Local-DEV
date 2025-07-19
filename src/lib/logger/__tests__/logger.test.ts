import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import { errorToLogMeta, createErrorLogMeta } from '../utils';
import type { LogMeta } from '../../../types/logger';

describe('Logger Utils', () => {
  describe('errorToLogMeta', () => {
    test('should handle Error objects correctly', () => {
      const error = new Error('Test error');
      error.stack = 'Error: Test error\n    at test';

      const result = errorToLogMeta(error);

      expect(result).toMatchObject({
        error: {
          message: 'Test error',
          name: 'Error',
          stack: 'Error: Test error\n    at test',
        },
      });
    });

    test('should handle string errors', () => {
      const result = errorToLogMeta('Simple error message');

      expect(result).toEqual({
        error: {
          message: 'Simple error message',
          type: 'string',
        },
      });
    });

    test('should handle object errors', () => {
      const errorObj = { code: 'ERR001', details: 'Something went wrong' };
      const result = errorToLogMeta(errorObj);

      expect(result).toEqual({
        error: {
          message: String(errorObj),
          type: 'object',
          details: errorObj,
        },
      });
    });

    test('should handle null/undefined errors', () => {
      const nullResult = errorToLogMeta(null);
      const undefinedResult = errorToLogMeta(undefined);

      expect(nullResult).toEqual({
        error: {
          message: 'null',
          type: 'object',
          value: null,
        },
      });

      expect(undefinedResult).toEqual({
        error: {
          message: 'undefined',
          type: 'undefined',
          value: undefined,
        },
      });
    });

    test('should filter out LogMeta reserved properties from custom error props', () => {
      const customError = new Error('Test') as Error & Record<string, unknown>;
      customError.traceId = 'should-be-filtered';
      customError.customProp = 'should-be-included';
      customError.code = 'ERR001';

      const result = errorToLogMeta(customError);

      expect(result.error).toHaveProperty('customProp', 'should-be-included');
      expect(result.error).toHaveProperty('code', 'ERR001');
      expect(result.error).not.toHaveProperty('traceId');
    });
  });

  describe('createErrorLogMeta', () => {
    test('should merge error and additional metadata', () => {
      const error = new Error('Test error');
      const additionalMeta: LogMeta = {
        requestId: 'req_123',
        component: 'test-component',
      };

      const result = createErrorLogMeta(error, additionalMeta);

      expect(result).toMatchObject({
        requestId: 'req_123',
        component: 'test-component',
        error: {
          message: 'Test error',
          name: 'Error',
        },
      });
    });

    test('should work without additional metadata', () => {
      const error = new Error('Test error');
      const result = createErrorLogMeta(error);

      expect(result).toMatchObject({
        error: {
          message: 'Test error',
          name: 'Error',
        },
      });
    });
  });
});

describe('Logger Type Safety', () => {
  test('LogMeta interface should accept standard log properties', () => {
    const validLogMeta: LogMeta = {
      traceId: 'trace_123',
      spanId: 'span_456',
      timestamp: '2024-01-15T10:30:00Z',
      requestId: 'req_789',
      component: 'api',
      category: 'error',
      customField: 'custom value',
      nestedData: {
        level: 'critical',
        details: ['item1', 'item2'],
      },
    };

    expect(validLogMeta).toBeDefined();
    expect(validLogMeta.traceId).toBe('trace_123');
    expect(validLogMeta.customField).toBe('custom value');
  });
});
