import { logger } from '@/lib/pino-logger';

/**
 * Next.js Instrumentation Hook for OpenTelemetry
 * This file is automatically loaded by Next.js before any other code
 */

export async function register() {
  // Only instrument on the server side
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    try {
      logger.info('[Instrumentation] Initializing OpenTelemetry...');
      
      // Import and initialize telemetry setup
      const { telemetrySetup } = await import('./setup');
      
      if (!telemetrySetup.isInitialized()) {
        telemetrySetup.initialize();
        logger.info('[Instrumentation] OpenTelemetry initialized successfully');
      } else {
        logger.info('[Instrumentation] OpenTelemetry already initialized');
      }

      // Import business telemetry utilities
      const { vlfTelemetry } = await import('./custom-spans');
      
      // Set up global error handling with trace correlation
      process.on('uncaughtException', (error) => {
        const traceContext = vlfTelemetry.getTraceContext();
        logger.error('[Instrumentation] Uncaught Exception:', {
          error: error.message,
          stack: error.stack,
          traceId: traceContext?.traceId,
          spanId: traceContext?.spanId,
        });
      });

      process.on('unhandledRejection', (reason, promise) => {
        const traceContext = vlfTelemetry.getTraceContext();
        logger.error('[Instrumentation] Unhandled Rejection:', {
          reason: reason instanceof Error ? reason.message : String(reason),
          traceId: traceContext?.traceId,
          spanId: traceContext?.spanId,
        });
      });

    } catch (error) {
      logger.error('[Instrumentation] Failed to initialize OpenTelemetry:', error);
      // Don't throw - allow application to continue without tracing
    }
  }
}

export async function onRequestError(
  err: Error,
  request: {
    path: string;
    method: string;
    headers: Record<string, string | string[]>;
  }
) {
  try {
    const { vlfTelemetry } = await import('./custom-spans');
    const traceContext = vlfTelemetry.getTraceContext();
    
    logger.error('[Instrumentation] Request Error:', {
      error: err.message,
      stack: err.stack,
      path: request.path,
      method: request.method,
      traceId: traceContext?.traceId,
      spanId: traceContext?.spanId,
    });
  } catch (importError) {
    logger.error('[Instrumentation] Failed to log request error:', importError);
  }
}