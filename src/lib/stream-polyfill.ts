import { logger } from '@/lib/safe-logger';

/**
 * Polyfill for ReadableStream issues in some environments
 */

if (typeof window !== 'undefined' && typeof ReadableStreamDefaultController !== 'undefined') {
  // Store original methods
  const originalEnqueue = ReadableStreamDefaultController.prototype.enqueue;
  const originalClose = ReadableStreamDefaultController.prototype.close;
  const originalError = ReadableStreamDefaultController.prototype.error;

  // Override enqueue method
  ReadableStreamDefaultController.prototype.enqueue = function (chunk: any) {
    try {
      // More robust state checking
      const controller = this as any;
      
      // Check multiple conditions to ensure the controller is in a valid state
      if (
        controller._controlledReadableStream &&
        !controller._closeRequested &&
        controller._started !== false &&
        controller.desiredSize !== null && 
        controller.desiredSize >= 0
      ) {
        return originalEnqueue.call(this, chunk);
      } else {
        // Silently ignore if stream is not in a valid state
        if (process.env.NODE_ENV === 'development') {
          logger.warn('Stream enqueue attempted on invalid controller state', {
            closeRequested: controller._closeRequested,
            started: controller._started,
            desiredSize: controller.desiredSize
          });
        }
      }
    } catch (error) {
      // Silently catch and log errors in development only
      if (process.env.NODE_ENV === 'development') {
        logger.error('Stream enqueue error caught:', error);
      }
    }
  };

  // Override close method to be more defensive
  ReadableStreamDefaultController.prototype.close = function () {
    try {
      const controller = this as any;
      if (!controller._closeRequested && controller._controlledReadableStream) {
        return originalClose.call(this);
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        logger.error('Stream close error caught:', error);
      }
    }
  };

  // Override error method to be more defensive
  ReadableStreamDefaultController.prototype.error = function (e: any) {
    try {
      const controller = this as any;
      if (controller._controlledReadableStream && !controller._closeRequested) {
        return originalError.call(this, e);
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        logger.error('Stream error method error caught:', error);
      }
    }
  };
}
