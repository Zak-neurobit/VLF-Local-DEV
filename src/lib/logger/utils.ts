import type { LogMeta } from '@/types/logger';

/**
 * Safely converts an unknown error to a LogMeta object
 * @param error - The error to convert (unknown type)
 * @returns A LogMeta object with error details
 */
export function errorToLogMeta(error: unknown): LogMeta {
  if (error instanceof Error) {
    return {
      error: {
        message: error.message,
        name: error.name,
        stack: error.stack,
        // Include any custom error properties
        ...(error as Error & Record<string, unknown>),
      },
    };
  }

  if (typeof error === 'string') {
    return {
      error: {
        message: error,
        type: 'string',
      },
    };
  }

  if (error && typeof error === 'object') {
    return {
      error: {
        message: String(error),
        type: 'object',
        details: error,
      },
    };
  }

  // Fallback for any other type
  return {
    error: {
      message: String(error),
      type: typeof error,
      value: error,
    },
  };
}

/**
 * Creates a LogMeta object with error and additional metadata
 * @param error - The error to include
 * @param additionalMeta - Additional metadata to merge
 * @returns A LogMeta object
 */
export function createErrorLogMeta(error: unknown, additionalMeta?: LogMeta): LogMeta {
  return {
    ...additionalMeta,
    ...errorToLogMeta(error),
  };
}
