/**
 * Circuit Breaker Pattern Implementation
 * 
 * Provides fault tolerance and resilience for external service calls.
 * Implements the circuit breaker pattern with configurable thresholds,
 * automatic failure detection, timeout handling, and recovery.
 * 
 * Key Features:
 * - Three states: CLOSED, OPEN, HALF_OPEN
 * - Configurable failure thresholds and timeouts
 * - Exponential backoff for recovery attempts
 * - Comprehensive metrics and monitoring
 * - Integration with existing logging infrastructure
 */

import { logger, performanceLogger } from '@/lib/logger';
import { EventEmitter } from 'events';

export enum CircuitBreakerState {
  CLOSED = 'CLOSED',
  OPEN = 'OPEN',
  HALF_OPEN = 'HALF_OPEN'
}

export interface CircuitBreakerConfig {
  /** Failure threshold to trigger circuit opening */
  failureThreshold: number;
  /** Success threshold to close circuit from half-open */
  successThreshold: number;
  /** Timeout before attempting recovery (ms) */
  timeout: number;
  /** Monitor window for failure rate calculation (ms) */
  monitoringWindow: number;
  /** Maximum execution timeout for operations (ms) */
  executionTimeout: number;
  /** Custom name for logging and metrics */
  name: string;
  /** Fallback function when circuit is open */
  fallback?: () => Promise<any>;
}

export interface CircuitBreakerMetrics {
  state: CircuitBreakerState;
  failureCount: number;
  successCount: number;
  totalRequests: number;
  failureRate: number;
  averageResponseTime: number;
  lastFailureTime?: Date;
  lastSuccessTime?: Date;
  openedAt?: Date;
  stateChanges: number;
  timeInCurrentState: number;
}

export interface OperationResult<T> {
  success: boolean;
  data?: T;
  error?: Error;
  fromFallback: boolean;
  executionTime: number;
  circuitState: CircuitBreakerState;
}

export class CircuitBreaker extends EventEmitter {
  private state: CircuitBreakerState = CircuitBreakerState.CLOSED;
  private failureCount = 0;
  private successCount = 0;
  private totalRequests = 0;
  private responseTimes: number[] = [];
  private lastFailureTime?: Date;
  private lastSuccessTime?: Date;
  private openedAt?: Date;
  private stateChanges = 0;
  private stateChangeTime = Date.now();
  private recentRequests: Array<{ timestamp: number; success: boolean; responseTime: number }> = [];

  constructor(private config: CircuitBreakerConfig) {
    super();
    this.setupMonitoring();
    logger.info(`Circuit breaker initialized: ${config.name}`, {
      failureThreshold: config.failureThreshold,
      timeout: config.timeout,
      executionTimeout: config.executionTimeout
    });
  }

  /**
   * Execute operation with circuit breaker protection
   */
  async execute<T>(operation: () => Promise<T>): Promise<OperationResult<T>> {
    const startTime = Date.now();
    this.totalRequests++;
    
    // Check if circuit should allow the request
    if (this.state === CircuitBreakerState.OPEN) {
      if (this.shouldAttemptReset()) {
        this.setState(CircuitBreakerState.HALF_OPEN);
      } else {
        return this.handleOpenCircuit<T>(startTime);
      }
    }

    // Execute the operation with timeout
    try {
      const result = await this.executeWithTimeout(operation);
      const executionTime = Date.now() - startTime;
      
      return this.handleSuccess<T>(result, executionTime, startTime);
    } catch (error) {
      const executionTime = Date.now() - startTime;
      
      return this.handleFailure<T>(error as Error, executionTime, startTime);
    }
  }

  /**
   * Execute operation with timeout protection
   */
  private async executeWithTimeout<T>(operation: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error(`Operation timed out after ${this.config.executionTimeout}ms`));
      }, this.config.executionTimeout);

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
   * Handle successful operation execution
   */
  private handleSuccess<T>(result: T, executionTime: number, startTime: number): OperationResult<T> {
    this.recordSuccess(executionTime);
    
    // If we were in HALF_OPEN and got enough successes, close the circuit
    if (this.state === CircuitBreakerState.HALF_OPEN && 
        this.successCount >= this.config.successThreshold) {
      this.setState(CircuitBreakerState.CLOSED);
      this.resetCounters();
    }

    performanceLogger.measure(`circuit-breaker-${this.config.name}`, executionTime, {
      state: this.state,
      success: true
    });

    return {
      success: true,
      data: result,
      fromFallback: false,
      executionTime,
      circuitState: this.state
    };
  }

  /**
   * Handle failed operation execution
   */
  private handleFailure<T>(error: Error, executionTime: number, startTime: number): OperationResult<T> {
    this.recordFailure(executionTime);

    // Check if we should open the circuit
    if (this.state === CircuitBreakerState.CLOSED || this.state === CircuitBreakerState.HALF_OPEN) {
      if (this.shouldOpenCircuit()) {
        this.setState(CircuitBreakerState.OPEN);
        this.openedAt = new Date();
      }
    }

    logger.error(`Circuit breaker operation failed: ${this.config.name}`, error, {
      state: this.state,
      failureCount: this.failureCount,
      executionTime
    });

    performanceLogger.measure(`circuit-breaker-${this.config.name}`, executionTime, {
      state: this.state,
      success: false,
      error: error.message
    });

    // Try fallback if available and circuit is open
    if (this.state === CircuitBreakerState.OPEN && this.config.fallback) {
      return this.executeFallback<T>(startTime);
    }

    return {
      success: false,
      error,
      fromFallback: false,
      executionTime,
      circuitState: this.state
    };
  }

  /**
   * Handle circuit open state
   */
  private handleOpenCircuit<T>(startTime: number): OperationResult<T> {
    const executionTime = Date.now() - startTime;
    
    logger.warn(`Circuit breaker is open: ${this.config.name}`, {
      state: this.state,
      failureCount: this.failureCount,
      lastFailureTime: this.lastFailureTime
    });

    if (this.config.fallback) {
      return this.executeFallback<T>(startTime);
    }

    return {
      success: false,
      error: new Error(`Circuit breaker is open for ${this.config.name}`),
      fromFallback: false,
      executionTime,
      circuitState: this.state
    };
  }

  /**
   * Execute fallback function
   */
  private async executeFallback<T>(startTime: number): Promise<OperationResult<T>> {
    try {
      const result = await this.config.fallback!();
      const executionTime = Date.now() - startTime;

      logger.info(`Fallback executed successfully: ${this.config.name}`, {
        executionTime
      });

      return {
        success: true,
        data: result,
        fromFallback: true,
        executionTime,
        circuitState: this.state
      };
    } catch (fallbackError) {
      const executionTime = Date.now() - startTime;
      
      logger.error(`Fallback failed: ${this.config.name}`, fallbackError as Error);

      return {
        success: false,
        error: fallbackError as Error,
        fromFallback: true,
        executionTime,
        circuitState: this.state
      };
    }
  }

  /**
   * Record successful operation
   */
  private recordSuccess(responseTime: number): void {
    this.successCount++;
    this.lastSuccessTime = new Date();
    this.recordRequest(true, responseTime);
    
    // Reset failure count on success when closed
    if (this.state === CircuitBreakerState.CLOSED) {
      this.failureCount = 0;
    }
  }

  /**
   * Record failed operation
   */
  private recordFailure(responseTime: number): void {
    this.failureCount++;
    this.lastFailureTime = new Date();
    this.recordRequest(false, responseTime);
  }

  /**
   * Record request metrics
   */
  private recordRequest(success: boolean, responseTime: number): void {
    const now = Date.now();
    
    this.recentRequests.push({
      timestamp: now,
      success,
      responseTime
    });

    this.responseTimes.push(responseTime);
    
    // Keep only recent requests within monitoring window
    this.cleanupOldRequests();
    
    // Limit response times array size
    if (this.responseTimes.length > 1000) {
      this.responseTimes = this.responseTimes.slice(-500);
    }
  }

  /**
   * Check if circuit should be opened
   */
  private shouldOpenCircuit(): boolean {
    if (this.failureCount < this.config.failureThreshold) {
      return false;
    }

    // Calculate failure rate within monitoring window
    const recentFailures = this.recentRequests.filter(req => !req.success).length;
    const totalRecent = this.recentRequests.length;
    
    if (totalRecent === 0) return false;
    
    const failureRate = recentFailures / totalRecent;
    
    // Open if failure rate is above threshold (e.g., 50%)
    return failureRate >= 0.5;
  }

  /**
   * Check if we should attempt to reset the circuit
   */
  private shouldAttemptReset(): boolean {
    if (!this.openedAt) return false;
    
    const timeSinceOpened = Date.now() - this.openedAt.getTime();
    return timeSinceOpened >= this.config.timeout;
  }

  /**
   * Set circuit breaker state and emit events
   */
  private setState(newState: CircuitBreakerState): void {
    const oldState = this.state;
    this.state = newState;
    this.stateChanges++;
    this.stateChangeTime = Date.now();

    logger.info(`Circuit breaker state changed: ${this.config.name}`, {
      from: oldState,
      to: newState,
      failureCount: this.failureCount,
      successCount: this.successCount
    });

    this.emit('stateChange', {
      name: this.config.name,
      from: oldState,
      to: newState,
      timestamp: new Date(),
      metrics: this.getMetrics()
    });

    // Reset success count when transitioning to HALF_OPEN
    if (newState === CircuitBreakerState.HALF_OPEN) {
      this.successCount = 0;
    }
  }

  /**
   * Reset counters
   */
  private resetCounters(): void {
    this.failureCount = 0;
    this.successCount = 0;
    this.openedAt = undefined;
  }

  /**
   * Clean up old requests outside monitoring window
   */
  private cleanupOldRequests(): void {
    const cutoff = Date.now() - this.config.monitoringWindow;
    this.recentRequests = this.recentRequests.filter(req => req.timestamp > cutoff);
  }

  /**
   * Setup monitoring and health checks
   */
  private setupMonitoring(): void {
    // Periodic cleanup and health check
    setInterval(() => {
      this.cleanupOldRequests();
      this.emitHealthCheck();
    }, 30000); // Every 30 seconds

    // Log metrics periodically
    setInterval(() => {
      const metrics = this.getMetrics();
      performanceLogger.info(`Circuit breaker metrics: ${this.config.name}`, metrics);
    }, 60000); // Every minute
  }

  /**
   * Emit health check event
   */
  private emitHealthCheck(): void {
    const metrics = this.getMetrics();
    
    this.emit('healthCheck', {
      name: this.config.name,
      metrics,
      isHealthy: this.isHealthy(),
      timestamp: new Date()
    });
  }

  /**
   * Check if circuit breaker is healthy
   */
  private isHealthy(): boolean {
    const metrics = this.getMetrics();
    
    // Consider unhealthy if:
    // - Circuit is open for too long
    // - High failure rate
    // - No recent activity
    
    if (this.state === CircuitBreakerState.OPEN) {
      const timeOpen = Date.now() - this.stateChangeTime;
      if (timeOpen > this.config.timeout * 3) {
        return false; // Open too long
      }
    }

    if (metrics.failureRate > 0.8 && metrics.totalRequests > 5) {
      return false; // Too many failures
    }

    return true;
  }

  /**
   * Get current metrics
   */
  getMetrics(): CircuitBreakerMetrics {
    const totalRecent = this.recentRequests.length;
    const failureRate = totalRecent > 0 
      ? this.recentRequests.filter(req => !req.success).length / totalRecent 
      : 0;

    const averageResponseTime = this.responseTimes.length > 0
      ? this.responseTimes.reduce((sum, time) => sum + time, 0) / this.responseTimes.length
      : 0;

    return {
      state: this.state,
      failureCount: this.failureCount,
      successCount: this.successCount,
      totalRequests: this.totalRequests,
      failureRate,
      averageResponseTime,
      lastFailureTime: this.lastFailureTime,
      lastSuccessTime: this.lastSuccessTime,
      openedAt: this.openedAt,
      stateChanges: this.stateChanges,
      timeInCurrentState: Date.now() - this.stateChangeTime
    };
  }

  /**
   * Force circuit state (for testing/manual intervention)
   */
  forceState(state: CircuitBreakerState): void {
    logger.warn(`Forcing circuit breaker state: ${this.config.name}`, {
      from: this.state,
      to: state
    });
    
    this.setState(state);
    
    if (state === CircuitBreakerState.CLOSED) {
      this.resetCounters();
    }
  }

  /**
   * Reset circuit breaker to initial state
   */
  reset(): void {
    logger.info(`Resetting circuit breaker: ${this.config.name}`);
    
    this.setState(CircuitBreakerState.CLOSED);
    this.resetCounters();
    this.recentRequests = [];
    this.responseTimes = [];
  }

  /**
   * Get current state
   */
  getState(): CircuitBreakerState {
    return this.state;
  }

  /**
   * Check if circuit is currently allowing requests
   */
  isAllowingRequests(): boolean {
    return this.state === CircuitBreakerState.CLOSED || 
           this.state === CircuitBreakerState.HALF_OPEN;
  }
}

/**
 * Circuit Breaker Factory
 */
export class CircuitBreakerFactory {
  private static breakers = new Map<string, CircuitBreaker>();

  /**
   * Create or get existing circuit breaker
   */
  static create(name: string, config?: Partial<CircuitBreakerConfig>): CircuitBreaker {
    if (this.breakers.has(name)) {
      return this.breakers.get(name)!;
    }

    const defaultConfig: CircuitBreakerConfig = {
      failureThreshold: 5,
      successThreshold: 3,
      timeout: 60000, // 1 minute
      monitoringWindow: 300000, // 5 minutes
      executionTimeout: 30000, // 30 seconds
      name
    };

    const finalConfig = { ...defaultConfig, ...config };
    const breaker = new CircuitBreaker(finalConfig);
    
    this.breakers.set(name, breaker);
    
    return breaker;
  }

  /**
   * Get all circuit breakers
   */
  static getAll(): Map<string, CircuitBreaker> {
    return new Map(this.breakers);
  }

  /**
   * Get circuit breaker by name
   */
  static get(name: string): CircuitBreaker | undefined {
    return this.breakers.get(name);
  }

  /**
   * Remove circuit breaker
   */
  static remove(name: string): boolean {
    return this.breakers.delete(name);
  }

  /**
   * Get health status of all circuit breakers
   */
  static getHealthStatus(): Record<string, any> {
    const status: Record<string, any> = {};
    
    for (const [name, breaker] of this.breakers) {
      status[name] = {
        ...breaker.getMetrics(),
        isHealthy: breaker.isHealthy(),
        isAllowingRequests: breaker.isAllowingRequests()
      };
    }
    
    return status;
  }

  /**
   * Reset all circuit breakers
   */
  static resetAll(): void {
    for (const breaker of this.breakers.values()) {
      breaker.reset();
    }
    
    logger.info('All circuit breakers reset');
  }
}

/**
 * Decorator for automatic circuit breaker protection
 */
export function withCircuitBreaker(
  name: string, 
  config?: Partial<CircuitBreakerConfig>
) {
  return function <T extends (...args: any[]) => Promise<any>>(
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<T>
  ) {
    const originalMethod = descriptor.value!;
    const breaker = CircuitBreakerFactory.create(name, config);

    descriptor.value = async function (...args: any[]) {
      const result = await breaker.execute(() => originalMethod.apply(this, args));
      
      if (!result.success) {
        throw result.error;
      }
      
      return result.data;
    } as T;

    return descriptor;
  };
}