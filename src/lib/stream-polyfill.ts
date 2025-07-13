import { logger } from '@/lib/pino-logger';

/**
 * Polyfill for ReadableStream issues in some environments
 */

if (typeof window !== 'undefined') {
  // Wrap the original enqueue method to prevent errors
  const originalEnqueue = window.ReadableStreamDefaultController?.prototype?.enqueue;

  if (originalEnqueue) {
    window.ReadableStreamDefaultController.prototype.enqueue = function (chunk: any) {
      try {
        // Check if the controller is in a valid state
        if (this.desiredSize !== null && this.desiredSize >= 0) {
          originalEnqueue.call(this, chunk);
        } else {
          logger.warn('Attempted to enqueue chunk to closed or errored stream');
        }
      } catch (error) {
        logger.error('Stream enqueue error caught:', error);
      }
    };
  }
}
