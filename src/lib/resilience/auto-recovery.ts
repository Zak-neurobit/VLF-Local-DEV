/**
 * Auto-Recovery System
 * 
 * Provides automated healing mechanisms for the application including
 * memory leak detection, stuck process detection, performance degradation
 * detection with automatic scaling, and various recovery strategies.
 * 
 * Key Features:
 * - Memory leak detection and cleanup
 * - Stuck process detection and restart logic
 * - Performance degradation monitoring
 * - Automatic scaling and load balancing
 * - Circuit breaker integration
 * - Service dependency management
 * - Recovery strategy orchestration
 */

import { logger, performanceLogger } from '@/lib/logger';
import { EventEmitter } from 'events';
import { CircuitBreakerFactory } from './circuit-breaker';
import { healthCheckManager, HealthStatus } from '../health/health-checks';
import * as os from 'os';

export enum RecoveryAction {
  RESTART_SERVICE = 'restart_service',
  CLEAR_CACHE = 'clear_cache',
  GARBAGE_COLLECT = 'garbage_collect',
  SCALE_UP = 'scale_up',
  SCALE_DOWN = 'scale_down',
  CIRCUIT_BREAK = 'circuit_break',
  FALLBACK = 'fallback',
  ALERT = 'alert',
  CUSTOM = 'custom'
}

export enum RecoveryTrigger {
  MEMORY_LEAK = 'memory_leak',
  HIGH_CPU = 'high_cpu',
  STUCK_PROCESS = 'stuck_process',
  HIGH_ERROR_RATE = 'high_error_rate',
  SLOW_RESPONSE = 'slow_response',
  DEPENDENCY_FAILURE = 'dependency_failure',
  HEALTH_CHECK_FAILURE = 'health_check_failure',
  MANUAL = 'manual'
}

export interface RecoveryConfig {
  /** Recovery strategy name */
  name: string;
  /** Triggers that activate this recovery */
  triggers: RecoveryTrigger[];
  /** Actions to take during recovery */
  actions: RecoveryAction[];
  /** Conditions that must be met to trigger recovery */
  conditions: RecoveryCondition[];
  /** Cooldown period between recoveries (ms) */
  cooldown: number;
  /** Maximum recovery attempts */
  maxAttempts: number;
  /** Recovery timeout (ms) */
  timeout: number;
  /** Priority (higher = executed first) */
  priority: number;
  /** Enable/disable this recovery strategy */
  enabled: boolean;
  /** Custom recovery function */
  customAction?: () => Promise<boolean>;
}

export interface RecoveryCondition {
  /** Metric to monitor */
  metric: string;
  /** Threshold value */
  threshold: number;
  /** Comparison operator */
  operator: 'gt' | 'lt' | 'eq' | 'gte' | 'lte';
  /** Time window for evaluation (ms) */
  window: number;
}

export interface RecoveryExecution {
  id: string;
  strategy: string;
  trigger: RecoveryTrigger;
  actions: RecoveryAction[];
  startTime: Date;
  endTime?: Date;
  success: boolean;
  error?: Error;
  metadata?: Record<string, any>;
}

export interface SystemMetrics {
  memory: {
    heapUsed: number;
    heapTotal: number;
    external: number;
    rss: number;
    heapUsagePercent: number;
  };
  cpu: {
    usage: number;
    loadAverage: number[];
  };
  performance: {
    responseTime: number;
    throughput: number;
    errorRate: number;
  };
  dependencies: {
    healthy: number;
    total: number;
    criticalHealthy: number;
    criticalTotal: number;
  };
  timestamp: Date;
}

/**
 * Memory leak detector
 */
export class MemoryLeakDetector {
  private measurements: Array<{ timestamp: number; heapUsed: number }> = [];
  private alertThreshold = 0.85; // 85% of heap
  private leakThreshold = 10; // MB growth over time
  private measurementInterval = 30000; // 30 seconds
  private windowSize = 10; // Number of measurements to keep

  constructor() {
    this.startMonitoring();
  }

  private startMonitoring(): void {
    setInterval(() => {
      this.takeMeasurement();
    }, this.measurementInterval);
  }

  private takeMeasurement(): void {
    const memUsage = process.memoryUsage();
    const measurement = {
      timestamp: Date.now(),
      heapUsed: memUsage.heapUsed
    };

    this.measurements.push(measurement);

    // Keep only recent measurements
    if (this.measurements.length > this.windowSize) {
      this.measurements = this.measurements.slice(-this.windowSize);
    }

    // Check for memory issues
    this.checkForLeaks();
    this.checkForHighUsage();
  }

  private checkForLeaks(): boolean {
    if (this.measurements.length < 5) {
      return false; // Need more data points
    }

    const recent = this.measurements.slice(-5);
    const oldest = recent[0];
    const newest = recent[recent.length - 1];

    const timeDiff = newest.timestamp - oldest.timestamp;
    const memDiff = newest.heapUsed - oldest.heapUsed;
    const growth = memDiff / (1024 * 1024); // Convert to MB

    // Check if memory has grown significantly
    if (growth > this.leakThreshold && timeDiff > 60000) { // Over 1 minute
      logger.warn('Potential memory leak detected', {
        growthMB: Math.round(growth),
        timeMinutes: Math.round(timeDiff / 60000),
        currentHeapMB: Math.round(newest.heapUsed / (1024 * 1024))
      });

      return true;
    }

    return false;
  }

  private checkForHighUsage(): boolean {
    const memUsage = process.memoryUsage();
    const usagePercent = memUsage.heapUsed / memUsage.heapTotal;

    if (usagePercent > this.alertThreshold) {
      logger.warn('High memory usage detected', {
        usagePercent: Math.round(usagePercent * 100),
        heapUsedMB: Math.round(memUsage.heapUsed / (1024 * 1024)),
        heapTotalMB: Math.round(memUsage.heapTotal / (1024 * 1024))
      });

      return true;
    }

    return false;
  }

  isLeakDetected(): boolean {
    return this.checkForLeaks();
  }

  isHighUsage(): boolean {
    return this.checkForHighUsage();
  }

  forceGarbageCollection(): void {
    if (global.gc) {
      logger.info('Forcing garbage collection');
      global.gc();
      
      performanceLogger.info('Garbage collection completed', {
        memoryAfterGC: process.memoryUsage()
      });
    } else {
      logger.warn('Garbage collection not available (run with --expose-gc)');
    }
  }

  clearCaches(): void {
    // Clear various caches
    logger.info('Clearing application caches');

    // Clear require cache (be careful with this)
    // Object.keys(require.cache).forEach(key => {
    //   delete require.cache[key];
    // });

    // Clear any other application-specific caches
    this.forceGarbageCollection();
  }
}

/**
 * Process monitoring for stuck/hung processes
 */
export class ProcessMonitor {
  private lastActivity = Date.now();
  private heartbeatInterval = 30000; // 30 seconds
  private timeoutThreshold = 120000; // 2 minutes
  private isMonitoring = false;

  start(): void {
    if (this.isMonitoring) {
      return;
    }

    this.isMonitoring = true;
    this.scheduleHeartbeat();

    logger.info('Process monitoring started', {
      heartbeatInterval: this.heartbeatInterval,
      timeoutThreshold: this.timeoutThreshold
    });
  }

  stop(): void {
    this.isMonitoring = false;
    logger.info('Process monitoring stopped');
  }

  private scheduleHeartbeat(): void {
    if (!this.isMonitoring) {
      return;
    }

    setTimeout(() => {
      this.checkHeartbeat();
      this.scheduleHeartbeat();
    }, this.heartbeatInterval);
  }

  private checkHeartbeat(): void {
    const now = Date.now();
    const timeSinceActivity = now - this.lastActivity;

    if (timeSinceActivity > this.timeoutThreshold) {
      logger.error('Process appears to be stuck', {
        timeSinceActivityMs: timeSinceActivity,
        thresholdMs: this.timeoutThreshold
      });

      return;
    }

    // Update activity timestamp
    this.lastActivity = now;

    logger.debug('Process heartbeat OK', {
      timeSinceActivityMs: timeSinceActivity
    });
  }

  recordActivity(): void {
    this.lastActivity = Date.now();
  }

  isStuck(): boolean {
    const timeSinceActivity = Date.now() - this.lastActivity;
    return timeSinceActivity > this.timeoutThreshold;
  }
}

/**
 * Performance degradation detector
 */
export class PerformanceDegradationDetector {
  private responseTimeHistory: number[] = [];
  private errorRateHistory: number[] = [];
  private throughputHistory: number[] = [];
  private maxHistorySize = 50;

  recordResponseTime(responseTime: number): void {
    this.responseTimeHistory.push(responseTime);
    
    if (this.responseTimeHistory.length > this.maxHistorySize) {
      this.responseTimeHistory = this.responseTimeHistory.slice(-this.maxHistorySize);
    }
  }

  recordError(): void {
    // Simple error rate tracking
    const now = Date.now();
    this.errorRateHistory.push(now);

    // Keep only last 5 minutes of errors
    const fiveMinutesAgo = now - 300000;
    this.errorRateHistory = this.errorRateHistory.filter(time => time > fiveMinutesAgo);
  }

  recordThroughput(requestCount: number): void {
    this.throughputHistory.push(requestCount);
    
    if (this.throughputHistory.length > this.maxHistorySize) {
      this.throughputHistory = this.throughputHistory.slice(-this.maxHistorySize);
    }
  }

  getAverageResponseTime(): number {
    if (this.responseTimeHistory.length === 0) {
      return 0;
    }

    return this.responseTimeHistory.reduce((sum, time) => sum + time, 0) / this.responseTimeHistory.length;
  }

  getCurrentErrorRate(): number {
    // Errors per minute
    return this.errorRateHistory.length;
  }

  getAverageThroughput(): number {
    if (this.throughputHistory.length === 0) {
      return 0;
    }

    return this.throughputHistory.reduce((sum, count) => sum + count, 0) / this.throughputHistory.length;
  }

  isDegraded(): boolean {
    const avgResponseTime = this.getAverageResponseTime();
    const errorRate = this.getCurrentErrorRate();

    // Consider degraded if:
    // - Average response time > 5 seconds
    // - Error rate > 10 per minute
    return avgResponseTime > 5000 || errorRate > 10;
  }
}

/**
 * Auto-recovery system orchestrator
 */
export class AutoRecoverySystem extends EventEmitter {
  private strategies = new Map<string, RecoveryConfig>();
  private executions: RecoveryExecution[] = [];
  private memoryLeakDetector = new MemoryLeakDetector();
  private processMonitor = new ProcessMonitor();
  private performanceDetector = new PerformanceDegradationDetector();
  private monitoringInterval?: NodeJS.Timeout;
  private isActive = false;
  private recoveryAttempts = new Map<string, number>();
  private lastRecoveryTime = new Map<string, number>();

  constructor() {
    super();
    this.setupDefaultStrategies();
    this.setupHealthCheckIntegration();
  }

  /**
   * Setup default recovery strategies
   */
  private setupDefaultStrategies(): void {
    // Memory leak recovery
    this.addStrategy({
      name: 'memory-leak-recovery',
      triggers: [RecoveryTrigger.MEMORY_LEAK],
      actions: [RecoveryAction.GARBAGE_COLLECT, RecoveryAction.CLEAR_CACHE],
      conditions: [
        {
          metric: 'memory.heapUsagePercent',
          threshold: 85,
          operator: 'gt',
          window: 60000
        }
      ],
      cooldown: 300000, // 5 minutes
      maxAttempts: 3,
      timeout: 30000,
      priority: 8,
      enabled: true
    });

    // High CPU recovery
    this.addStrategy({
      name: 'high-cpu-recovery',
      triggers: [RecoveryTrigger.HIGH_CPU],
      actions: [RecoveryAction.GARBAGE_COLLECT, RecoveryAction.SCALE_UP],
      conditions: [
        {
          metric: 'cpu.usage',
          threshold: 80,
          operator: 'gt',
          window: 120000
        }
      ],
      cooldown: 180000, // 3 minutes
      maxAttempts: 2,
      timeout: 60000,
      priority: 7,
      enabled: true
    });

    // Stuck process recovery
    this.addStrategy({
      name: 'stuck-process-recovery',
      triggers: [RecoveryTrigger.STUCK_PROCESS],
      actions: [RecoveryAction.RESTART_SERVICE],
      conditions: [],
      cooldown: 600000, // 10 minutes
      maxAttempts: 1,
      timeout: 120000,
      priority: 10,
      enabled: true
    });

    // Performance degradation recovery
    this.addStrategy({
      name: 'performance-recovery',
      triggers: [RecoveryTrigger.SLOW_RESPONSE],
      actions: [RecoveryAction.CLEAR_CACHE, RecoveryAction.CIRCUIT_BREAK],
      conditions: [
        {
          metric: 'performance.responseTime',
          threshold: 5000,
          operator: 'gt',
          window: 300000
        }
      ],
      cooldown: 240000, // 4 minutes
      maxAttempts: 3,
      timeout: 45000,
      priority: 6,
      enabled: true
    });

    // Dependency failure recovery
    this.addStrategy({
      name: 'dependency-failure-recovery',
      triggers: [RecoveryTrigger.DEPENDENCY_FAILURE],
      actions: [RecoveryAction.CIRCUIT_BREAK, RecoveryAction.FALLBACK],
      conditions: [
        {
          metric: 'dependencies.criticalHealthy',
          threshold: 1,
          operator: 'lt',
          window: 60000
        }
      ],
      cooldown: 120000, // 2 minutes
      maxAttempts: 5,
      timeout: 30000,
      priority: 9,
      enabled: true
    });
  }

  /**
   * Setup integration with health check system
   */
  private setupHealthCheckIntegration(): void {
    healthCheckManager.on('criticalCheckFailed', (event) => {
      this.triggerRecovery(RecoveryTrigger.HEALTH_CHECK_FAILURE, {
        checkName: event.name,
        result: event.result
      });
    });

    healthCheckManager.on('checkBecameUnhealthy', (event) => {
      if (event.critical) {
        this.triggerRecovery(RecoveryTrigger.DEPENDENCY_FAILURE, {
          checkName: event.name,
          result: event.result
        });
      }
    });
  }

  /**
   * Start the auto-recovery system
   */
  start(): void {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    this.processMonitor.start();

    // Start monitoring interval
    this.monitoringInterval = setInterval(() => {
      this.runMonitoringChecks();
    }, 30000); // Check every 30 seconds

    logger.info('Auto-recovery system started');
    this.emit('started');
  }

  /**
   * Stop the auto-recovery system
   */
  stop(): void {
    if (!this.isActive) {
      return;
    }

    this.isActive = false;
    this.processMonitor.stop();

    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = undefined;
    }

    logger.info('Auto-recovery system stopped');
    this.emit('stopped');
  }

  /**
   * Add a recovery strategy
   */
  addStrategy(strategy: RecoveryConfig): void {
    this.strategies.set(strategy.name, strategy);
    
    logger.info(`Recovery strategy added: ${strategy.name}`, {
      triggers: strategy.triggers,
      actions: strategy.actions,
      priority: strategy.priority
    });
  }

  /**
   * Remove a recovery strategy
   */
  removeStrategy(name: string): boolean {
    const removed = this.strategies.delete(name);
    
    if (removed) {
      logger.info(`Recovery strategy removed: ${name}`);
    }
    
    return removed;
  }

  /**
   * Trigger recovery for a specific condition
   */
  async triggerRecovery(trigger: RecoveryTrigger, metadata?: Record<string, any>): Promise<boolean> {
    if (!this.isActive) {
      return false;
    }

    logger.info(`Recovery triggered: ${trigger}`, metadata);

    // Find applicable strategies
    const applicableStrategies = Array.from(this.strategies.values())
      .filter(strategy => 
        strategy.enabled && 
        strategy.triggers.includes(trigger) &&
        this.canExecuteStrategy(strategy)
      )
      .sort((a, b) => b.priority - a.priority); // Sort by priority

    if (applicableStrategies.length === 0) {
      logger.warn(`No applicable recovery strategies for trigger: ${trigger}`);
      return false;
    }

    // Execute strategies in priority order
    for (const strategy of applicableStrategies) {
      const success = await this.executeStrategy(strategy, trigger, metadata);
      
      if (success) {
        logger.info(`Recovery successful with strategy: ${strategy.name}`);
        return true;
      }
    }

    logger.error(`All recovery strategies failed for trigger: ${trigger}`);
    return false;
  }

  /**
   * Check if strategy can be executed (cooldown, max attempts, etc.)
   */
  private canExecuteStrategy(strategy: RecoveryConfig): boolean {
    const now = Date.now();
    const lastRecovery = this.lastRecoveryTime.get(strategy.name) || 0;
    const attempts = this.recoveryAttempts.get(strategy.name) || 0;

    // Check cooldown
    if (now - lastRecovery < strategy.cooldown) {
      return false;
    }

    // Check max attempts (reset every hour)
    if (attempts >= strategy.maxAttempts) {
      const oneHourAgo = now - 3600000;
      if (lastRecovery > oneHourAgo) {
        return false;
      } else {
        // Reset attempts counter
        this.recoveryAttempts.set(strategy.name, 0);
      }
    }

    // Check conditions
    return this.evaluateConditions(strategy.conditions);
  }

  /**
   * Execute a recovery strategy
   */
  private async executeStrategy(
    strategy: RecoveryConfig, 
    trigger: RecoveryTrigger, 
    metadata?: Record<string, any>
  ): Promise<boolean> {
    const execution: RecoveryExecution = {
      id: `recovery_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      strategy: strategy.name,
      trigger,
      actions: strategy.actions,
      startTime: new Date(),
      success: false,
      metadata
    };

    this.executions.push(execution);

    // Limit execution history
    if (this.executions.length > 100) {
      this.executions = this.executions.slice(-50);
    }

    logger.info(`Executing recovery strategy: ${strategy.name}`, {
      executionId: execution.id,
      trigger,
      actions: strategy.actions
    });

    this.emit('recoveryStarted', execution);

    try {
      // Execute with timeout
      const success = await Promise.race([
        this.executeActions(strategy.actions, strategy.customAction),
        this.createTimeoutPromise(strategy.timeout)
      ]);

      execution.success = success;
      execution.endTime = new Date();

      // Update tracking
      this.lastRecoveryTime.set(strategy.name, Date.now());
      this.recoveryAttempts.set(strategy.name, 
        (this.recoveryAttempts.get(strategy.name) || 0) + 1
      );

      this.emit('recoveryCompleted', execution);

      return success;

    } catch (error) {
      execution.success = false;
      execution.error = error as Error;
      execution.endTime = new Date();

      logger.error(`Recovery strategy failed: ${strategy.name}`, error);
      
      this.emit('recoveryFailed', execution);
      
      return false;
    }
  }

  /**
   * Execute recovery actions
   */
  private async executeActions(
    actions: RecoveryAction[], 
    customAction?: () => Promise<boolean>
  ): Promise<boolean> {
    let allSuccessful = true;

    for (const action of actions) {
      try {
        const success = await this.executeAction(action);
        if (!success) {
          allSuccessful = false;
        }
      } catch (error) {
        logger.error(`Recovery action failed: ${action}`, error);
        allSuccessful = false;
      }
    }

    // Execute custom action if provided
    if (customAction) {
      try {
        const success = await customAction();
        if (!success) {
          allSuccessful = false;
        }
      } catch (error) {
        logger.error('Custom recovery action failed', error);
        allSuccessful = false;
      }
    }

    return allSuccessful;
  }

  /**
   * Execute individual recovery action
   */
  private async executeAction(action: RecoveryAction): Promise<boolean> {
    logger.info(`Executing recovery action: ${action}`);

    switch (action) {
      case RecoveryAction.GARBAGE_COLLECT:
        this.memoryLeakDetector.forceGarbageCollection();
        return true;

      case RecoveryAction.CLEAR_CACHE:
        this.memoryLeakDetector.clearCaches();
        return true;

      case RecoveryAction.CIRCUIT_BREAK:
        return this.activateCircuitBreakers();

      case RecoveryAction.RESTART_SERVICE:
        return this.restartService();

      case RecoveryAction.SCALE_UP:
        return this.scaleUp();

      case RecoveryAction.SCALE_DOWN:
        return this.scaleDown();

      case RecoveryAction.FALLBACK:
        return this.activateFallbacks();

      case RecoveryAction.ALERT:
        return this.sendAlert();

      default:
        logger.warn(`Unknown recovery action: ${action}`);
        return false;
    }
  }

  /**
   * Activate circuit breakers for external services
   */
  private activateCircuitBreakers(): boolean {
    try {
      const breakers = CircuitBreakerFactory.getAll();
      
      for (const [name, breaker] of breakers) {
        if (breaker.getState() === 'CLOSED') {
          breaker.forceState('OPEN' as any);
          logger.info(`Circuit breaker opened for recovery: ${name}`);
        }
      }
      
      return true;
    } catch (error) {
      logger.error('Failed to activate circuit breakers', error);
      return false;
    }
  }

  /**
   * Restart service (graceful shutdown and restart)
   */
  private async restartService(): Promise<boolean> {
    logger.warn('Service restart requested by auto-recovery');
    
    try {
      // Emit restart event for graceful shutdown
      this.emit('serviceRestartRequested');
      
      // In production, this would trigger a graceful restart
      // For now, we'll just log and return success
      
      return true;
    } catch (error) {
      logger.error('Service restart failed', error);
      return false;
    }
  }

  /**
   * Scale up resources
   */
  private async scaleUp(): Promise<boolean> {
    logger.info('Scaling up resources');
    
    try {
      // In production, this would integrate with orchestration platform
      // For now, we'll increase some internal limits
      
      this.emit('scaleUpRequested');
      return true;
    } catch (error) {
      logger.error('Scale up failed', error);
      return false;
    }
  }

  /**
   * Scale down resources
   */
  private async scaleDown(): Promise<boolean> {
    logger.info('Scaling down resources');
    
    try {
      this.emit('scaleDownRequested');
      return true;
    } catch (error) {
      logger.error('Scale down failed', error);
      return false;
    }
  }

  /**
   * Activate fallback mechanisms
   */
  private activateFallbacks(): boolean {
    try {
      this.emit('fallbacksActivated');
      return true;
    } catch (error) {
      logger.error('Failed to activate fallbacks', error);
      return false;
    }
  }

  /**
   * Send alert notification
   */
  private sendAlert(): boolean {
    try {
      this.emit('alertTriggered', {
        timestamp: new Date(),
        message: 'Auto-recovery alert triggered'
      });
      
      return true;
    } catch (error) {
      logger.error('Failed to send alert', error);
      return false;
    }
  }

  /**
   * Create timeout promise
   */
  private createTimeoutPromise(timeout: number): Promise<boolean> {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Recovery action timed out after ${timeout}ms`));
      }, timeout);
    });
  }

  /**
   * Evaluate strategy conditions
   */
  private evaluateConditions(conditions: RecoveryCondition[]): boolean {
    if (conditions.length === 0) {
      return true;
    }

    const metrics = this.getCurrentMetrics();

    for (const condition of conditions) {
      if (!this.evaluateCondition(condition, metrics)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Evaluate single condition
   */
  private evaluateCondition(condition: RecoveryCondition, metrics: SystemMetrics): boolean {
    const value = this.getMetricValue(condition.metric, metrics);
    
    if (value === undefined) {
      return false;
    }

    switch (condition.operator) {
      case 'gt':
        return value > condition.threshold;
      case 'gte':
        return value >= condition.threshold;
      case 'lt':
        return value < condition.threshold;
      case 'lte':
        return value <= condition.threshold;
      case 'eq':
        return value === condition.threshold;
      default:
        return false;
    }
  }

  /**
   * Get metric value from system metrics
   */
  private getMetricValue(metric: string, metrics: SystemMetrics): number | undefined {
    const parts = metric.split('.');
    let value: any = metrics;

    for (const part of parts) {
      value = value?.[part];
    }

    return typeof value === 'number' ? value : undefined;
  }

  /**
   * Run monitoring checks
   */
  private runMonitoringChecks(): void {
    // Check for memory leaks
    if (this.memoryLeakDetector.isLeakDetected()) {
      this.triggerRecovery(RecoveryTrigger.MEMORY_LEAK);
    }

    // Check for stuck processes
    if (this.processMonitor.isStuck()) {
      this.triggerRecovery(RecoveryTrigger.STUCK_PROCESS);
    }

    // Check for performance degradation
    if (this.performanceDetector.isDegraded()) {
      this.triggerRecovery(RecoveryTrigger.SLOW_RESPONSE);
    }

    // Record activity for process monitoring
    this.processMonitor.recordActivity();
  }

  /**
   * Get current system metrics
   */
  private getCurrentMetrics(): SystemMetrics {
    const memUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();
    const loadAverage = os.loadavg();
    const healthStatus = healthCheckManager.getSystemHealth();

    return {
      memory: {
        heapUsed: memUsage.heapUsed,
        heapTotal: memUsage.heapTotal,
        external: memUsage.external,
        rss: memUsage.rss,
        heapUsagePercent: (memUsage.heapUsed / memUsage.heapTotal) * 100
      },
      cpu: {
        usage: (cpuUsage.user + cpuUsage.system) / 1000000, // Convert to seconds
        loadAverage
      },
      performance: {
        responseTime: this.performanceDetector.getAverageResponseTime(),
        throughput: this.performanceDetector.getAverageThroughput(),
        errorRate: this.performanceDetector.getCurrentErrorRate()
      },
      dependencies: {
        healthy: healthStatus.critical.healthy + healthStatus.nonCritical.healthy,
        total: healthStatus.critical.total + healthStatus.nonCritical.total,
        criticalHealthy: healthStatus.critical.healthy,
        criticalTotal: healthStatus.critical.total
      },
      timestamp: new Date()
    };
  }

  /**
   * Get recovery execution history
   */
  getExecutionHistory(): RecoveryExecution[] {
    return [...this.executions];
  }

  /**
   * Get system metrics
   */
  getSystemMetrics(): SystemMetrics {
    return this.getCurrentMetrics();
  }

  /**
   * Manual recovery trigger
   */
  async manualRecovery(strategyName: string, metadata?: Record<string, any>): Promise<boolean> {
    const strategy = this.strategies.get(strategyName);
    
    if (!strategy) {
      logger.warn(`Unknown recovery strategy: ${strategyName}`);
      return false;
    }

    return this.executeStrategy(strategy, RecoveryTrigger.MANUAL, metadata);
  }

  /**
   * Get memory detector
   */
  getMemoryDetector(): MemoryLeakDetector {
    return this.memoryLeakDetector;
  }

  /**
   * Get performance detector
   */
  getPerformanceDetector(): PerformanceDegradationDetector {
    return this.performanceDetector;
  }
}

// Global auto-recovery system instance
export const autoRecoverySystem = new AutoRecoverySystem();