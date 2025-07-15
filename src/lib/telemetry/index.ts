import { apiLogger, performanceLogger } from '@/lib/pino-logger';

/**
 * Telemetry System Index
 * Central exports for comprehensive performance monitoring
 */

// Re-export middleware
export * from './api-middleware';

// Placeholder for telemetry functions that were referenced
export const trackWebVitals = (metric: { name: string; value: number; id: string; delta: number }) => {
  performanceLogger.info({ metric }, 'Web vitals tracked');
};

export const vlfTelemetry = {
  getTraceContext: () => {
    return {
      traceId: 'placeholder-trace-id',
      spanId: 'placeholder-span-id',
    };
  },
};

// SLI Tracker placeholder
export const sliTracker = {
  recordApiCall: (endpoint: string, duration: number, status: number) => {
    performanceLogger.info(
      {
        endpoint,
        duration,
        status,
        p99: duration > 50,
      },
      'API call tracked'
    );
  },
  recordDatabaseQuery: (query: string, duration: number) => {
    performanceLogger.info(
      {
        query,
        duration,
        p99: duration > 50,
      },
      'Database query tracked'
    );
  },
  recordBusinessProcess: (process: string, duration: number, success: boolean) => {
    performanceLogger.info(
      {
        process,
        duration,
        success,
        p99: duration > 50,
      },
      'Business process tracked'
    );
  },
};
