/**
 * Global error handler for the application
 * Catches and handles various types of errors gracefully
 */

import { logger } from '@/lib/logger';
import * as Sentry from '@sentry/nextjs';

interface ErrorContext {
  source?: string;
  userId?: string;
  url?: string;
  userAgent?: string;
  [key: string]: any;
}

class GlobalErrorHandler {
  private initialized = false;
  private errorQueue: Array<{ error: Error; context: ErrorContext }> = [];
  private readonly MAX_QUEUE_SIZE = 50;

  initialize() {
    if (this.initialized || typeof window === 'undefined') return;
    this.initialized = true;

    // Handle unhandled errors
    window.addEventListener('error', event => {
      this.handleError(event.error || new Error(event.message), {
        source: 'window.error',
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      });
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', event => {
      const error = event.reason instanceof Error ? event.reason : new Error(String(event.reason));

      this.handleError(error, {
        source: 'unhandledrejection',
        promise: event.promise,
      });

      // Prevent default browser handling
      event.preventDefault();
    });

    // Process any queued errors
    this.processErrorQueue();
  }

  handleError(error: Error, context: ErrorContext = {}) {
    // Skip certain known non-critical errors
    if (this.shouldIgnoreError(error)) {
      return;
    }

    // Add common context
    const enrichedContext: ErrorContext = {
      ...context,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      timestamp: new Date().toISOString(),
    };

    // Log the error
    logger.error('Global error caught', {
      error: {
        message: error.message,
        stack: error.stack,
        name: error.name,
      },
      context: enrichedContext,
    });

    // Send to Sentry
    Sentry.captureException(error, {
      extra: enrichedContext,
      tags: {
        source: context.source || 'unknown',
      },
    });

    // Queue error for potential batch processing
    this.queueError(error, enrichedContext);
  }

  private shouldIgnoreError(error: Error): boolean {
    const message = error.message.toLowerCase();

    // Ignore known non-critical errors
    const ignoredPatterns = [
      'resizeobserver loop limit exceeded',
      'resizeobserver loop completed with undelivered notifications',
      'non-error promise rejection captured',
      'network request failed',
      'load failed',
      'the operation is insecure',
      'permission denied',
      'quota exceeded',
      // Vercel Analytics errors (non-critical)
      '_log',
      'vercel-analytics',
    ];

    return ignoredPatterns.some(pattern => message.includes(pattern));
  }

  private queueError(error: Error, context: ErrorContext) {
    if (this.errorQueue.length >= this.MAX_QUEUE_SIZE) {
      this.errorQueue.shift(); // Remove oldest error
    }

    this.errorQueue.push({ error, context });
  }

  private processErrorQueue() {
    // Process any errors that need special handling
    // This could include batching similar errors, sending reports, etc.
    setInterval(() => {
      if (this.errorQueue.length > 0) {
        // Group similar errors
        const errorGroups = this.groupSimilarErrors();

        // Log grouped errors
        errorGroups.forEach((group, key) => {
          if (group.length > 5) {
            logger.warn(`Repeated error detected: ${key} (${group.length} occurrences)`);
          }
        });

        // Clear processed errors
        this.errorQueue = [];
      }
    }, 60000); // Process every minute
  }

  private groupSimilarErrors() {
    const groups = new Map<string, Array<{ error: Error; context: ErrorContext }>>();

    this.errorQueue.forEach(item => {
      const key = `${item.error.name}:${item.error.message}`;
      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key)!.push(item);
    });

    return groups;
  }

  // Get error statistics
  getErrorStats() {
    const groups = this.groupSimilarErrors();
    const stats = Array.from(groups.entries()).map(([key, items]) => ({
      error: key,
      count: items.length,
      lastOccurred: items[items.length - 1].context.timestamp,
    }));

    return stats.sort((a, b) => b.count - a.count);
  }
}

// Export singleton instance
export const globalErrorHandler = new GlobalErrorHandler();

// Initialize on client side
if (typeof window !== 'undefined') {
  globalErrorHandler.initialize();
}
