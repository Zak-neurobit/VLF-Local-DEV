/**
 * Retry and Fallback Patterns Implementation
 * 
 * Provides intelligent retry logic with exponential backoff, jitter,
 * and sophisticated fallback mechanisms for handling transient failures.
 * Includes dead letter queue handling for operations that continuously fail.
 * 
 * Key Features:
 * - Multiple retry strategies (exponential, linear, fixed, custom)
 * - Jitter to prevent thundering herd
 * - Conditional retry based on error types
 * - Fallback cascading with priority
 * - Dead letter queue for failed operations
 * - Comprehensive metrics and monitoring
 */

import { logger, performanceLogger } from '@/lib/logger';
import { EventEmitter } from 'events';

export interface RetryConfig {
  /** Maximum number of retry attempts */
  maxAttempts: number;
  /** Initial delay between retries (ms) */
  initialDelay: number;
  /** Maximum delay between retries (ms) */
  maxDelay: number;
  /** Retry strategy to use */
  strategy: RetryStrategy;
  /** Enable jitter to prevent thundering herd */
  jitter: boolean;
  /** Factor for exponential backoff */
  backoffFactor: number;
  /** Custom delay function */
  customDelay?: (attempt: number) => number;
  /** Condition to determine if retry should happen */
  retryCondition?: (error: Error) => boolean;
  /** Operation timeout (ms) */
  timeout?: number;
  /** Custom name for logging */
  name?: string;
}

export enum RetryStrategy {
  EXPONENTIAL = 'exponential',
  LINEAR = 'linear',
  FIXED = 'fixed',
  CUSTOM = 'custom'
}

export interface RetryResult<T> {
  success: boolean;
  data?: T;
  error?: Error;
  attempts: number;
  totalDuration: number;
  fromFallback: boolean;
  fallbackUsed?: string;
}

export interface FallbackConfig<T> {
  /** Fallback function */
  handler: () => Promise<T>;
  /** Priority (higher number = higher priority) */
  priority: number;
  /** Name for identification */
  name: string;
  /** Condition to determine if fallback should be used */
  condition?: (error: Error) => boolean;
  /** Timeout for fallback execution */
  timeout?: number;
}

export interface DeadLetterQueueItem {
  id: string;
  operation: string;
  data: any;
  error: Error;
  attempts: number;
  createdAt: Date;
  lastAttemptAt: Date;
  metadata?: Record<string, any>;
}

export interface RetryMetrics {
  name: string;
  totalAttempts: number;
  successfulRetries: number;
  failedRetries: number;
  averageAttempts: number;
  averageDuration: number;
  fallbackUsage: Record<string, number>;
  errorTypes: Record<string, number>;
  lastSuccess?: Date;
  lastFailure?: Date;
}

/**
 * Retry handler with intelligent backoff and fallback support
 */
export class RetryHandler<T = any> extends EventEmitter {
  private metrics: RetryMetrics;
  private fallbacks: FallbackConfig<T>[] = [];
  private deadLetterQueue: DeadLetterQueueItem[] = [];

  constructor(private config: RetryConfig) {
    super();
    this.metrics = {
      name: config.name || 'unnamed',
      totalAttempts: 0,
      successfulRetries: 0,
      failedRetries: 0,
      averageAttempts: 0,
      averageDuration: 0,
      fallbackUsage: {},
      errorTypes: {}
    };
  }

  /**
   * Execute operation with retry logic
   */
  async execute(operation: () => Promise<T>): Promise<RetryResult<T>> {
    const startTime = Date.now();
    let lastError: Error;
    let attempt = 0;

    // Track operation start
    this.emit('operationStart', {
      name: this.metrics.name,
      timestamp: new Date()
    });

    for (attempt = 1; attempt <= this.config.maxAttempts; attempt++) {
      try {
        this.metrics.totalAttempts++;

        logger.debug(`Executing operation attempt ${attempt}/${this.config.maxAttempts}`, {
          name: this.metrics.name,
          attempt
        });

        // Execute with timeout if configured
        const result = this.config.timeout 
          ? await this.executeWithTimeout(operation, this.config.timeout)
          : await operation();

        const duration = Date.now() - startTime;

        // Success - update metrics
        if (attempt > 1) {
          this.metrics.successfulRetries++;
          logger.info(`Operation succeeded after ${attempt} attempts`, {
            name: this.metrics.name,
            attempt,
            duration
          });
        }

        this.updateSuccessMetrics(attempt, duration);

        this.emit('operationSuccess', {
          name: this.metrics.name,
          attempt,
          duration,
          timestamp: new Date()
        });

        return {
          success: true,
          data: result,
          attempts: attempt,
          totalDuration: duration,
          fromFallback: false
        };

      } catch (error) {
        lastError = error as Error;
        
        this.updateErrorMetrics(lastError);

        logger.warn(`Operation attempt ${attempt} failed`, {
          name: this.metrics.name,
          attempt,
          error: lastError.message,
          willRetry: attempt < this.config.maxAttempts && this.shouldRetry(lastError)
        });

        this.emit('operationAttemptFailed', {
          name: this.metrics.name,
          attempt,
          error: lastError,
          timestamp: new Date()
        });

        // Check if we should retry
        if (attempt >= this.config.maxAttempts || !this.shouldRetry(lastError)) {
          break;
        }

        // Calculate delay for next attempt
        const delay = this.calculateDelay(attempt);
        
        logger.debug(`Waiting ${delay}ms before retry attempt ${attempt + 1}`, {
          name: this.metrics.name,
          delay
        });

        await this.sleep(delay);
      }
    }

    // All retries failed - try fallbacks
    const duration = Date.now() - startTime;
    this.metrics.failedRetries++;
    this.updateFailureMetrics(attempt, duration);

    logger.error(`Operation failed after ${attempt} attempts`, {
      name: this.metrics.name,
      attempts: attempt,
      duration,
      error: lastError!.message
    });

    this.emit('operationFailed', {
      name: this.metrics.name,
      attempts: attempt,
      duration,
      error: lastError!,
      timestamp: new Date()
    });

    // Try fallbacks
    const fallbackResult = await this.tryFallbacks(lastError!);
    if (fallbackResult.success) {
      return {
        ...fallbackResult,
        attempts: attempt,
        totalDuration: duration
      };
    }

    // Add to dead letter queue if all fallbacks failed
    await this.addToDeadLetterQueue(operation.toString(), {}, lastError!, attempt);

    return {
      success: false,
      error: lastError!,
      attempts: attempt,
      totalDuration: duration,
      fromFallback: false
    };
  }

  /**
   * Execute operation with timeout
   */
  private async executeWithTimeout<T>(
    operation: () => Promise<T>, 
    timeout: number
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error(`Operation timed out after ${timeout}ms`));
      }, timeout);

      operation()
        .then(result => {
          clearTimeout(timeoutId);
          resolve(result);
        })
        .catch(error => {
          clearTimeout(timeoutId);
          reject(error);
        });
    });
  }

  /**
   * Calculate delay for next retry attempt
   */
  private calculateDelay(attempt: number): number {
    let delay: number;

    switch (this.config.strategy) {
      case RetryStrategy.EXPONENTIAL:
        delay = Math.min(
          this.config.initialDelay * Math.pow(this.config.backoffFactor, attempt - 1),
          this.config.maxDelay
        );
        break;

      case RetryStrategy.LINEAR:
        delay = Math.min(
          this.config.initialDelay * attempt,
          this.config.maxDelay
        );
        break;

      case RetryStrategy.FIXED:
        delay = this.config.initialDelay;
        break;

      case RetryStrategy.CUSTOM:
        if (!this.config.customDelay) {
          throw new Error('Custom delay function not provided');
        }
        delay = this.config.customDelay(attempt);
        break;

      default:
        delay = this.config.initialDelay;
    }

    // Add jitter if enabled
    if (this.config.jitter) {
      const jitterRange = delay * 0.1; // 10% jitter
      const jitter = (Math.random() - 0.5) * 2 * jitterRange;
      delay = Math.max(0, delay + jitter);
    }

    return Math.floor(delay);
  }

  /**
   * Check if retry should be attempted
   */
  private shouldRetry(error: Error): boolean {
    if (this.config.retryCondition) {
      return this.config.retryCondition(error);
    }

    // Default retry conditions
    const retryableErrors = [
      'ECONNRESET',
      'ENOTFOUND',
      'ECONNREFUSED',
      'ETIMEDOUT',
      'ECONNABORTED',
      'NETWORK_ERROR',
      'TIMEOUT_ERROR'
    ];

    const isRetryableError = retryableErrors.some(errorType => 
      error.message.includes(errorType) || 
      error.name.includes(errorType) ||
      (error as any).code === errorType
    );

    // Don't retry on authentication or authorization errors
    const nonRetryableErrors = [
      'UNAUTHORIZED',
      'FORBIDDEN',
      'AUTHENTICATION_ERROR',
      'INVALID_TOKEN',
      'ACCESS_DENIED'
    ];

    const isNonRetryableError = nonRetryableErrors.some(errorType =>
      error.message.includes(errorType) ||
      error.name.includes(errorType) ||
      (error as any).code === errorType
    );

    return isRetryableError && !isNonRetryableError;
  }

  /**
   * Try all available fallbacks in priority order
   */
  private async tryFallbacks(error: Error): Promise<RetryResult<T>> {
    if (this.fallbacks.length === 0) {
      return { success: false, error, attempts: 0, totalDuration: 0, fromFallback: false };
    }

    // Sort fallbacks by priority (highest first)
    const sortedFallbacks = [...this.fallbacks].sort((a, b) => b.priority - a.priority);

    for (const fallback of sortedFallbacks) {
      // Check if fallback condition is met
      if (fallback.condition && !fallback.condition(error)) {
        continue;
      }

      try {
        logger.info(`Attempting fallback: ${fallback.name}`, {
          name: this.metrics.name,
          fallback: fallback.name
        });

        const startTime = Date.now();

        const result = fallback.timeout
          ? await this.executeWithTimeout(fallback.handler, fallback.timeout)
          : await fallback.handler();

        const duration = Date.now() - startTime;

        // Update fallback usage metrics
        this.metrics.fallbackUsage[fallback.name] = 
          (this.metrics.fallbackUsage[fallback.name] || 0) + 1;

        logger.info(`Fallback succeeded: ${fallback.name}`, {
          name: this.metrics.name,
          fallback: fallback.name,
          duration
        });

        this.emit('fallbackSuccess', {
          name: this.metrics.name,
          fallback: fallback.name,
          duration,
          timestamp: new Date()
        });

        return {
          success: true,
          data: result,
          attempts: 0,
          totalDuration: duration,
          fromFallback: true,
          fallbackUsed: fallback.name
        };

      } catch (fallbackError) {
        logger.warn(`Fallback failed: ${fallback.name}`, {
          name: this.metrics.name,
          fallback: fallback.name,
          error: (fallbackError as Error).message
        });

        this.emit('fallbackFailed', {
          name: this.metrics.name,
          fallback: fallback.name,
          error: fallbackError,
          timestamp: new Date()
        });

        // Continue to next fallback
        continue;
      }
    }

    return { success: false, error, attempts: 0, totalDuration: 0, fromFallback: false };
  }

  /**
   * Add fallback handler
   */
  addFallback(fallback: FallbackConfig<T>): void {
    this.fallbacks.push(fallback);
    
    // Sort by priority
    this.fallbacks.sort((a, b) => b.priority - a.priority);

    logger.info(`Fallback added: ${fallback.name}`, {
      name: this.metrics.name,
      fallback: fallback.name,
      priority: fallback.priority
    });
  }

  /**
   * Remove fallback handler
   */
  removeFallback(name: string): boolean {
    const index = this.fallbacks.findIndex(f => f.name === name);
    if (index >= 0) {
      this.fallbacks.splice(index, 1);
      logger.info(`Fallback removed: ${name}`, {
        name: this.metrics.name
      });
      return true;
    }
    return false;
  }

  /**
   * Add item to dead letter queue
   */
  private async addToDeadLetterQueue(
    operation: string,
    data: any,
    error: Error,
    attempts: number
  ): Promise<void> {
    const item: DeadLetterQueueItem = {
      id: `dlq_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      operation,
      data,
      error,
      attempts,
      createdAt: new Date(),
      lastAttemptAt: new Date(),
      metadata: {
        retryConfig: this.config,
        operationName: this.metrics.name
      }
    };

    this.deadLetterQueue.push(item);

    // Limit queue size
    if (this.deadLetterQueue.length > 1000) {
      this.deadLetterQueue = this.deadLetterQueue.slice(-500);
    }

    logger.error(`Operation added to dead letter queue`, {
      name: this.metrics.name,
      dlqId: item.id,
      attempts,
      error: error.message
    });

    this.emit('deadLetterQueueAdd', {
      name: this.metrics.name,
      item,
      timestamp: new Date()
    });
  }

  /**
   * Get dead letter queue items
   */
  getDeadLetterQueue(): DeadLetterQueueItem[] {
    return [...this.deadLetterQueue];
  }

  /**
   * Clear dead letter queue
   */
  clearDeadLetterQueue(): void {
    const count = this.deadLetterQueue.length;
    this.deadLetterQueue = [];
    
    logger.info(`Dead letter queue cleared: ${count} items removed`, {
      name: this.metrics.name
    });
  }

  /**
   * Retry failed operation from dead letter queue
   */
  async retryFromDeadLetterQueue(itemId: string): Promise<boolean> {
    const itemIndex = this.deadLetterQueue.findIndex(item => item.id === itemId);
    if (itemIndex === -1) {
      return false;
    }

    const item = this.deadLetterQueue[itemIndex];
    
    try {
      // Create a new operation function (this is simplified - in practice you'd need
      // to reconstruct the original operation)
      const operation = () => Promise.resolve(item.data);
      
      const result = await this.execute(operation);
      
      if (result.success) {
        // Remove from dead letter queue
        this.deadLetterQueue.splice(itemIndex, 1);
        
        logger.info(`Dead letter queue item successfully retried`, {
          name: this.metrics.name,
          dlqId: itemId
        });
        
        return true;
      }
    } catch (error) {
      logger.error(`Failed to retry dead letter queue item`, {
        name: this.metrics.name,
        dlqId: itemId,
        error: (error as Error).message
      });
    }

    return false;
  }

  /**
   * Update success metrics
   */
  private updateSuccessMetrics(attempts: number, duration: number): void {
    this.metrics.lastSuccess = new Date();
    this.updateAverageMetrics(attempts, duration);
    
    performanceLogger.measure(`retry-handler-${this.metrics.name}`, duration, {
      attempts,
      success: true
    });
  }

  /**
   * Update failure metrics
   */
  private updateFailureMetrics(attempts: number, duration: number): void {
    this.metrics.lastFailure = new Date();
    this.updateAverageMetrics(attempts, duration);
    
    performanceLogger.measure(`retry-handler-${this.metrics.name}`, duration, {
      attempts,
      success: false
    });
  }

  /**
   * Update error type metrics
   */
  private updateErrorMetrics(error: Error): void {
    const errorType = error.name || 'UnknownError';
    this.metrics.errorTypes[errorType] = (this.metrics.errorTypes[errorType] || 0) + 1;
  }

  /**
   * Update average metrics
   */
  private updateAverageMetrics(attempts: number, duration: number): void {
    const totalOperations = this.metrics.successfulRetries + this.metrics.failedRetries;
    
    if (totalOperations === 1) {
      this.metrics.averageAttempts = attempts;
      this.metrics.averageDuration = duration;
    } else {
      this.metrics.averageAttempts = 
        (this.metrics.averageAttempts * (totalOperations - 1) + attempts) / totalOperations;
      this.metrics.averageDuration = 
        (this.metrics.averageDuration * (totalOperations - 1) + duration) / totalOperations;
    }
  }

  /**
   * Sleep for specified duration
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get current metrics
   */
  getMetrics(): RetryMetrics {
    return { ...this.metrics };
  }

  /**
   * Reset metrics
   */
  resetMetrics(): void {
    this.metrics = {
      name: this.config.name || 'unnamed',
      totalAttempts: 0,
      successfulRetries: 0,
      failedRetries: 0,
      averageAttempts: 0,
      averageDuration: 0,
      fallbackUsage: {},
      errorTypes: {}
    };
  }
}

/**
 * Retry Factory for creating and managing retry handlers
 */
export class RetryFactory {
  private static handlers = new Map<string, RetryHandler>();

  /**
   * Create or get existing retry handler
   */
  static create<T = any>(name: string, config?: Partial<RetryConfig>): RetryHandler<T> {
    if (this.handlers.has(name)) {
      return this.handlers.get(name)! as RetryHandler<T>;
    }

    const defaultConfig: RetryConfig = {
      maxAttempts: 3,
      initialDelay: 1000,
      maxDelay: 30000,
      strategy: RetryStrategy.EXPONENTIAL,
      jitter: true,
      backoffFactor: 2,
      name
    };

    const finalConfig = { ...defaultConfig, ...config };
    const handler = new RetryHandler<T>(finalConfig);
    
    this.handlers.set(name, handler as RetryHandler);
    
    return handler;
  }

  /**
   * Get all retry handlers
   */
  static getAll(): Map<string, RetryHandler> {
    return new Map(this.handlers);
  }

  /**
   * Get retry handler by name
   */
  static get<T = any>(name: string): RetryHandler<T> | undefined {
    return this.handlers.get(name) as RetryHandler<T>;
  }

  /**
   * Remove retry handler
   */
  static remove(name: string): boolean {
    return this.handlers.delete(name);
  }

  /**
   * Get metrics for all handlers
   */
  static getAllMetrics(): Record<string, RetryMetrics> {
    const metrics: Record<string, RetryMetrics> = {};
    
    for (const [name, handler] of this.handlers) {
      metrics[name] = handler.getMetrics();
    }
    
    return metrics;
  }
}

/**
 * Utility function for quick retry execution
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  config: Partial<RetryConfig> & { name: string }
): Promise<T> {
  const handler = RetryFactory.create<T>(config.name, config);
  const result = await handler.execute(operation);
  
  if (!result.success) {
    throw result.error;
  }
  
  return result.data!;
}

/**
 * Decorator for automatic retry protection
 */
export function withRetryDecorator(config: Partial<RetryConfig> & { name: string }) {
  return function <T extends (...args: any[]) => Promise<any>>(
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<T>
  ) {
    const originalMethod = descriptor.value!;
    const handler = RetryFactory.create(config.name, config);

    descriptor.value = async function (...args: any[]) {
      const result = await handler.execute(() => originalMethod.apply(this, args));
      
      if (!result.success) {
        throw result.error;
      }
      
      return result.data;
    } as T;

    return descriptor;
  };
}