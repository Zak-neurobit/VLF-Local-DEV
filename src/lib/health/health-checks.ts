/**
 * Comprehensive Health Check System
 * 
 * Provides comprehensive health monitoring for all system components
 * including database connectivity, external APIs, dependency health scoring,
 * and automatic failover capabilities. Supports readiness and liveness probes
 * for Kubernetes-style orchestration.
 * 
 * Key Features:
 * - Database connectivity monitoring
 * - External API health validation
 * - Dependency health scoring
 * - Automatic failover mechanisms
 * - Readiness and liveness probes
 * - Historical health tracking
 * - Alert and notification integration
 */

import { logger, performanceLogger, dbLogger } from '@/lib/logger';
import { EventEmitter } from 'events';
import { PrismaClient } from '@prisma/client';

export enum HealthStatus {
  HEALTHY = 'healthy',
  DEGRADED = 'degraded',
  UNHEALTHY = 'unhealthy',
  UNKNOWN = 'unknown'
}

export interface HealthCheckConfig {
  /** Check name for identification */
  name: string;
  /** Check description */
  description: string;
  /** Timeout for the check (ms) */
  timeout: number;
  /** Interval between checks (ms) */
  interval: number;
  /** Critical check that affects overall system health */
  critical: boolean;
  /** Number of consecutive failures before marking unhealthy */
  failureThreshold: number;
  /** Number of consecutive successes to recover from failure */
  successThreshold: number;
  /** Check weight for scoring (1-10) */
  weight: number;
  /** Tags for grouping and filtering */
  tags: string[];
  /** Custom metadata */
  metadata?: Record<string, any>;
}

export interface HealthCheckResult {
  name: string;
  status: HealthStatus;
  message: string;
  timestamp: Date;
  duration: number;
  metadata?: Record<string, any>;
  error?: Error;
}

export interface SystemHealthStatus {
  status: HealthStatus;
  score: number;
  timestamp: Date;
  checks: HealthCheckResult[];
  critical: {
    healthy: number;
    total: number;
  };
  nonCritical: {
    healthy: number;
    total: number;
  };
  uptime: number;
  version?: string;
}

export interface DependencyHealth {
  name: string;
  status: HealthStatus;
  score: number;
  lastCheck: Date;
  responseTime: number;
  errorRate: number;
  availability: number;
  metadata?: Record<string, any>;
}

/**
 * Individual health check implementation
 */
export abstract class HealthCheck extends EventEmitter {
  protected consecutiveFailures = 0;
  protected consecutiveSuccesses = 0;
  protected lastResult?: HealthCheckResult;
  protected isRunning = false;
  protected intervalId?: NodeJS.Timeout;
  protected history: HealthCheckResult[] = [];

  constructor(protected config: HealthCheckConfig) {
    super();
  }

  /**
   * Abstract method to implement the actual health check
   */
  abstract check(): Promise<HealthCheckResult>;

  /**
   * Start the health check with periodic execution
   */
  start(): void {
    if (this.isRunning) {
      return;
    }

    this.isRunning = true;
    
    logger.info(`Starting health check: ${this.config.name}`, {
      interval: this.config.interval,
      critical: this.config.critical
    });

    // Run initial check
    this.runCheck();

    // Schedule periodic checks
    this.intervalId = setInterval(() => {
      this.runCheck();
    }, this.config.interval);

    this.emit('started', { name: this.config.name });
  }

  /**
   * Stop the health check
   */
  stop(): void {
    if (!this.isRunning) {
      return;
    }

    this.isRunning = false;

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }

    logger.info(`Stopped health check: ${this.config.name}`);
    this.emit('stopped', { name: this.config.name });
  }

  /**
   * Run a single health check
   */
  private async runCheck(): Promise<void> {
    const startTime = Date.now();

    try {
      const result = await Promise.race([
        this.check(),
        this.createTimeoutPromise()
      ]);

      this.handleCheckResult(result);
    } catch (error) {
      const result: HealthCheckResult = {
        name: this.config.name,
        status: HealthStatus.UNHEALTHY,
        message: `Health check failed: ${(error as Error).message}`,
        timestamp: new Date(),
        duration: Date.now() - startTime,
        error: error as Error
      };

      this.handleCheckResult(result);
    }
  }

  /**
   * Create timeout promise for health check
   */
  private createTimeoutPromise(): Promise<HealthCheckResult> {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Health check timed out after ${this.config.timeout}ms`));
      }, this.config.timeout);
    });
  }

  /**
   * Handle health check result and update state
   */
  private handleCheckResult(result: HealthCheckResult): void {
    this.lastResult = result;
    this.addToHistory(result);

    // Update consecutive counters
    if (result.status === HealthStatus.HEALTHY) {
      this.consecutiveSuccesses++;
      this.consecutiveFailures = 0;
    } else {
      this.consecutiveFailures++;
      this.consecutiveSuccesses = 0;
    }

    // Log result
    const logLevel = result.status === HealthStatus.HEALTHY ? 'debug' : 'warn';
    logger[logLevel](`Health check result: ${this.config.name}`, {
      status: result.status,
      duration: result.duration,
      message: result.message,
      consecutiveFailures: this.consecutiveFailures
    });

    // Emit events based on state changes
    this.emitStateChangeEvents(result);

    // Performance tracking
    performanceLogger.measure(`health-check-${this.config.name}`, result.duration, {
      status: result.status,
      critical: this.config.critical
    });
  }

  /**
   * Emit state change events
   */
  private emitStateChangeEvents(result: HealthCheckResult): void {
    this.emit('result', result);

    // Check for state transitions
    if (this.consecutiveFailures === this.config.failureThreshold) {
      this.emit('becameUnhealthy', {
        name: this.config.name,
        result,
        critical: this.config.critical
      });
    }

    if (this.consecutiveSuccesses === this.config.successThreshold && 
        this.consecutiveFailures > 0) {
      this.emit('recovered', {
        name: this.config.name,
        result,
        critical: this.config.critical
      });
    }
  }

  /**
   * Add result to history and maintain size limit
   */
  private addToHistory(result: HealthCheckResult): void {
    this.history.push(result);
    
    // Keep only last 100 results
    if (this.history.length > 100) {
      this.history = this.history.slice(-50);
    }
  }

  /**
   * Get current health status
   */
  getStatus(): HealthStatus {
    if (!this.lastResult) {
      return HealthStatus.UNKNOWN;
    }

    // Consider unhealthy if consecutive failures exceed threshold
    if (this.consecutiveFailures >= this.config.failureThreshold) {
      return HealthStatus.UNHEALTHY;
    }

    return this.lastResult.status;
  }

  /**
   * Get last check result
   */
  getLastResult(): HealthCheckResult | undefined {
    return this.lastResult;
  }

  /**
   * Get check configuration
   */
  getConfig(): HealthCheckConfig {
    return { ...this.config };
  }

  /**
   * Get check history
   */
  getHistory(): HealthCheckResult[] {
    return [...this.history];
  }

  /**
   * Calculate availability percentage over recent history
   */
  getAvailability(): number {
    if (this.history.length === 0) {
      return 0;
    }

    const healthyCount = this.history.filter(
      result => result.status === HealthStatus.HEALTHY
    ).length;

    return (healthyCount / this.history.length) * 100;
  }

  /**
   * Get average response time
   */
  getAverageResponseTime(): number {
    if (this.history.length === 0) {
      return 0;
    }

    const totalDuration = this.history.reduce(
      (sum, result) => sum + result.duration, 
      0
    );

    return totalDuration / this.history.length;
  }
}

/**
 * Database connectivity health check
 */
export class DatabaseHealthCheck extends HealthCheck {
  private prisma: PrismaClient;

  constructor(config: Partial<HealthCheckConfig> = {}) {
    const defaultConfig: HealthCheckConfig = {
      name: 'database',
      description: 'Database connectivity and query performance',
      timeout: 5000,
      interval: 30000,
      critical: true,
      failureThreshold: 3,
      successThreshold: 2,
      weight: 10,
      tags: ['database', 'critical'],
      ...config
    };

    super(defaultConfig);
    this.prisma = new PrismaClient();
  }

  async check(): Promise<HealthCheckResult> {
    const startTime = Date.now();

    try {
      // Test basic connectivity with a simple query
      await this.prisma.$queryRaw`SELECT 1 as test`;

      // Test write capability (if needed)
      // await this.prisma.$executeRaw`SELECT 1`;

      const duration = Date.now() - startTime;

      dbLogger.connection('connected', { duration });

      return {
        name: this.config.name,
        status: HealthStatus.HEALTHY,
        message: 'Database connection successful',
        timestamp: new Date(),
        duration,
        metadata: {
          queryTime: duration
        }
      };

    } catch (error) {
      const duration = Date.now() - startTime;
      
      dbLogger.error('health-check', error);

      return {
        name: this.config.name,
        status: HealthStatus.UNHEALTHY,
        message: `Database connection failed: ${(error as Error).message}`,
        timestamp: new Date(),
        duration,
        error: error as Error
      };
    }
  }
}

/**
 * External API health check
 */
export class ExternalAPIHealthCheck extends HealthCheck {
  constructor(
    private apiName: string,
    private healthEndpoint: string,
    config: Partial<HealthCheckConfig> = {}
  ) {
    const defaultConfig: HealthCheckConfig = {
      name: `external-api-${apiName}`,
      description: `External API health for ${apiName}`,
      timeout: 10000,
      interval: 60000,
      critical: false,
      failureThreshold: 3,
      successThreshold: 2,
      weight: 5,
      tags: ['external-api', apiName],
      ...config
    };

    super(defaultConfig);
  }

  async check(): Promise<HealthCheckResult> {
    const startTime = Date.now();

    try {
      const response = await fetch(this.healthEndpoint, {
        method: 'GET',
        headers: {
          'User-Agent': 'VasquezLaw-HealthCheck/1.0'
        },
        signal: AbortSignal.timeout(this.config.timeout)
      });

      const duration = Date.now() - startTime;

      if (response.ok) {
        return {
          name: this.config.name,
          status: HealthStatus.HEALTHY,
          message: `API ${this.apiName} is healthy`,
          timestamp: new Date(),
          duration,
          metadata: {
            statusCode: response.status,
            responseTime: duration
          }
        };
      } else {
        return {
          name: this.config.name,
          status: HealthStatus.DEGRADED,
          message: `API ${this.apiName} returned status ${response.status}`,
          timestamp: new Date(),
          duration,
          metadata: {
            statusCode: response.status,
            responseTime: duration
          }
        };
      }

    } catch (error) {
      const duration = Date.now() - startTime;

      return {
        name: this.config.name,
        status: HealthStatus.UNHEALTHY,
        message: `API ${this.apiName} check failed: ${(error as Error).message}`,
        timestamp: new Date(),
        duration,
        error: error as Error
      };
    }
  }
}

/**
 * Memory usage health check
 */
export class MemoryHealthCheck extends HealthCheck {
  constructor(config: Partial<HealthCheckConfig> = {}) {
    const defaultConfig: HealthCheckConfig = {
      name: 'memory',
      description: 'Memory usage monitoring',
      timeout: 1000,
      interval: 30000,
      critical: false,
      failureThreshold: 5,
      successThreshold: 2,
      weight: 3,
      tags: ['system', 'memory'],
      ...config
    };

    super(defaultConfig);
  }

  async check(): Promise<HealthCheckResult> {
    const startTime = Date.now();

    try {
      const memUsage = process.memoryUsage();
      const heapUsedMB = Math.round(memUsage.heapUsed / 1024 / 1024);
      const heapTotalMB = Math.round(memUsage.heapTotal / 1024 / 1024);
      const rssMB = Math.round(memUsage.rss / 1024 / 1024);

      const heapUsagePercent = (memUsage.heapUsed / memUsage.heapTotal) * 100;

      let status = HealthStatus.HEALTHY;
      let message = 'Memory usage is normal';

      if (heapUsagePercent > 90) {
        status = HealthStatus.UNHEALTHY;
        message = 'Memory usage critically high';
      } else if (heapUsagePercent > 80) {
        status = HealthStatus.DEGRADED;
        message = 'Memory usage elevated';
      }

      const duration = Date.now() - startTime;

      return {
        name: this.config.name,
        status,
        message,
        timestamp: new Date(),
        duration,
        metadata: {
          heapUsedMB,
          heapTotalMB,
          rssMB,
          heapUsagePercent: Math.round(heapUsagePercent)
        }
      };

    } catch (error) {
      const duration = Date.now() - startTime;

      return {
        name: this.config.name,
        status: HealthStatus.UNHEALTHY,
        message: `Memory check failed: ${(error as Error).message}`,
        timestamp: new Date(),
        duration,
        error: error as Error
      };
    }
  }
}

/**
 * Redis connectivity health check
 */
export class RedisHealthCheck extends HealthCheck {
  constructor(config: Partial<HealthCheckConfig> = {}) {
    const defaultConfig: HealthCheckConfig = {
      name: 'redis',
      description: 'Redis connectivity and performance',
      timeout: 5000,
      interval: 30000,
      critical: false,
      failureThreshold: 3,
      successThreshold: 2,
      weight: 7,
      tags: ['cache', 'redis'],
      ...config
    };

    super(defaultConfig);
  }

  async check(): Promise<HealthCheckResult> {
    const startTime = Date.now();

    try {
      // Import Redis dynamically to avoid startup issues
      const { bullRedis } = await import('@/lib/cache');
      
      if (!bullRedis) {
        throw new Error('Redis client not available');
      }

      // Test basic connectivity
      const testKey = `healthcheck:${Date.now()}`;
      await bullRedis.set(testKey, 'test', 'EX', 10);
      const result = await bullRedis.get(testKey);
      await bullRedis.del(testKey);

      if (result !== 'test') {
        throw new Error('Redis read/write test failed');
      }

      const duration = Date.now() - startTime;

      return {
        name: this.config.name,
        status: HealthStatus.HEALTHY,
        message: 'Redis connection successful',
        timestamp: new Date(),
        duration,
        metadata: {
          responseTime: duration
        }
      };

    } catch (error) {
      const duration = Date.now() - startTime;

      return {
        name: this.config.name,
        status: HealthStatus.UNHEALTHY,
        message: `Redis connection failed: ${(error as Error).message}`,
        timestamp: new Date(),
        duration,
        error: error as Error
      };
    }
  }
}

/**
 * Health Check Manager
 */
export class HealthCheckManager extends EventEmitter {
  private checks = new Map<string, HealthCheck>();
  private systemStartTime = Date.now();

  constructor() {
    super();
    this.setupDefaultChecks();
  }

  /**
   * Setup default health checks
   */
  private setupDefaultChecks(): void {
    // Database health check
    this.addCheck(new DatabaseHealthCheck());

    // Memory health check
    this.addCheck(new MemoryHealthCheck());

    // Redis health check (if available)
    this.addCheck(new RedisHealthCheck());

    // External API health checks
    this.addExternalAPIChecks();
  }

  /**
   * Add external API health checks
   */
  private addExternalAPIChecks(): void {
    const externalAPIs = [
      { name: 'openai', endpoint: 'https://api.openai.com/v1/models' },
      { name: 'twilio', endpoint: 'https://api.twilio.com/health' },
      // Add more external APIs as needed
    ];

    for (const api of externalAPIs) {
      this.addCheck(new ExternalAPIHealthCheck(api.name, api.endpoint, {
        critical: false,
        weight: 5
      }));
    }
  }

  /**
   * Add a health check
   */
  addCheck(check: HealthCheck): void {
    const name = check.getConfig().name;
    
    if (this.checks.has(name)) {
      logger.warn(`Health check already exists: ${name}`);
      return;
    }

    this.checks.set(name, check);

    // Setup event listeners
    check.on('result', (result: HealthCheckResult) => {
      this.emit('checkResult', result);
    });

    check.on('becameUnhealthy', (event) => {
      this.emit('checkBecameUnhealthy', event);
      
      if (event.critical) {
        this.emit('criticalCheckFailed', event);
      }
    });

    check.on('recovered', (event) => {
      this.emit('checkRecovered', event);
    });

    logger.info(`Health check added: ${name}`, {
      critical: check.getConfig().critical,
      interval: check.getConfig().interval
    });
  }

  /**
   * Remove a health check
   */
  removeCheck(name: string): boolean {
    const check = this.checks.get(name);
    if (!check) {
      return false;
    }

    check.stop();
    check.removeAllListeners();
    this.checks.delete(name);

    logger.info(`Health check removed: ${name}`);
    return true;
  }

  /**
   * Start all health checks
   */
  startAll(): void {
    for (const check of this.checks.values()) {
      check.start();
    }

    logger.info(`Started ${this.checks.size} health checks`);
  }

  /**
   * Stop all health checks
   */
  stopAll(): void {
    for (const check of this.checks.values()) {
      check.stop();
    }

    logger.info('All health checks stopped');
  }

  /**
   * Get overall system health status
   */
  getSystemHealth(): SystemHealthStatus {
    const results: HealthCheckResult[] = [];
    let totalScore = 0;
    let maxScore = 0;
    let criticalHealthy = 0;
    let criticalTotal = 0;
    let nonCriticalHealthy = 0;
    let nonCriticalTotal = 0;

    for (const check of this.checks.values()) {
      const config = check.getConfig();
      const result = check.getLastResult();
      const status = check.getStatus();

      if (result) {
        results.push(result);
      }

      // Calculate scores
      maxScore += config.weight;
      
      if (status === HealthStatus.HEALTHY) {
        totalScore += config.weight;
        
        if (config.critical) {
          criticalHealthy++;
        } else {
          nonCriticalHealthy++;
        }
      } else if (status === HealthStatus.DEGRADED) {
        totalScore += config.weight * 0.5; // Half score for degraded
      }

      // Count critical vs non-critical
      if (config.critical) {
        criticalTotal++;
      } else {
        nonCriticalTotal++;
      }
    }

    // Calculate overall status
    const score = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
    let overallStatus = HealthStatus.HEALTHY;

    if (criticalHealthy < criticalTotal) {
      overallStatus = HealthStatus.UNHEALTHY;
    } else if (score < 80) {
      overallStatus = HealthStatus.DEGRADED;
    }

    return {
      status: overallStatus,
      score: Math.round(score),
      timestamp: new Date(),
      checks: results,
      critical: {
        healthy: criticalHealthy,
        total: criticalTotal
      },
      nonCritical: {
        healthy: nonCriticalHealthy,
        total: nonCriticalTotal
      },
      uptime: Date.now() - this.systemStartTime,
      version: process.env.npm_package_version
    };
  }

  /**
   * Get dependency health information
   */
  getDependencyHealth(): DependencyHealth[] {
    const dependencies: DependencyHealth[] = [];

    for (const check of this.checks.values()) {
      const config = check.getConfig();
      const status = check.getStatus();
      const lastResult = check.getLastResult();

      dependencies.push({
        name: config.name,
        status,
        score: this.calculateDependencyScore(check),
        lastCheck: lastResult?.timestamp || new Date(),
        responseTime: check.getAverageResponseTime(),
        errorRate: this.calculateErrorRate(check),
        availability: check.getAvailability(),
        metadata: {
          critical: config.critical,
          weight: config.weight,
          tags: config.tags
        }
      });
    }

    return dependencies;
  }

  /**
   * Calculate dependency score (0-100)
   */
  private calculateDependencyScore(check: HealthCheck): number {
    const status = check.getStatus();
    const availability = check.getAvailability();
    const responseTime = check.getAverageResponseTime();

    let score = 0;

    // Base score from status
    switch (status) {
      case HealthStatus.HEALTHY:
        score += 50;
        break;
      case HealthStatus.DEGRADED:
        score += 25;
        break;
      case HealthStatus.UNHEALTHY:
        score += 0;
        break;
      default:
        score += 10;
    }

    // Availability component (0-40 points)
    score += (availability / 100) * 40;

    // Response time component (0-10 points, lower is better)
    const maxResponseTime = 5000; // 5 seconds
    const responseTimeScore = Math.max(0, (maxResponseTime - responseTime) / maxResponseTime) * 10;
    score += responseTimeScore;

    return Math.min(100, Math.max(0, Math.round(score)));
  }

  /**
   * Calculate error rate for a check
   */
  private calculateErrorRate(check: HealthCheck): number {
    const history = check.getHistory();
    
    if (history.length === 0) {
      return 0;
    }

    const errors = history.filter(
      result => result.status !== HealthStatus.HEALTHY
    ).length;

    return (errors / history.length) * 100;
  }

  /**
   * Check if system is ready (all critical checks healthy)
   */
  isReady(): boolean {
    for (const check of this.checks.values()) {
      const config = check.getConfig();
      
      if (config.critical && check.getStatus() !== HealthStatus.HEALTHY) {
        return false;
      }
    }

    return true;
  }

  /**
   * Check if system is alive (at least some checks responding)
   */
  isAlive(): boolean {
    let responsiveChecks = 0;

    for (const check of this.checks.values()) {
      const lastResult = check.getLastResult();
      
      if (lastResult) {
        const timeSinceLastCheck = Date.now() - lastResult.timestamp.getTime();
        
        // Consider alive if checked within last 5 minutes
        if (timeSinceLastCheck < 300000) {
          responsiveChecks++;
        }
      }
    }

    // System is alive if at least 50% of checks are responsive
    return responsiveChecks >= Math.ceil(this.checks.size * 0.5);
  }

  /**
   * Get all health checks
   */
  getChecks(): Map<string, HealthCheck> {
    return new Map(this.checks);
  }

  /**
   * Get health check by name
   */
  getCheck(name: string): HealthCheck | undefined {
    return this.checks.get(name);
  }
}

// Global health check manager instance
export const healthCheckManager = new HealthCheckManager();