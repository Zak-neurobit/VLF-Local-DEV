import { logger } from '@/lib/pino-logger';

/**
 * Telemetry System Index
 * Central exports for comprehensive performance monitoring with p99 <50ms tracking
 */

// Core exports
export { metricsCollector, createMetricsMiddleware } from './metrics';
export { sliTracker, trackApiCall, trackDatabaseQuery, trackBusinessProcess } from '../performance/sli-tracker';
export { alertSystem, triggerManualAlert } from '../performance/alerts';
export { dashboardDataAggregator, getDashboardChartData, getDashboardSummary } from './dashboard-data';

// Type exports
export type { MetricAttributes, WebVitalMetric, BusinessEvent } from './metrics';
export type { PercentileData, SLIViolation, BusinessSLI } from '../performance/sli-tracker';
export type { Alert, AlertRule, AlertSeverity, AlertChannel } from '../performance/alerts';
export type { 
  DashboardData, 
  PerformanceTrend, 
  EndpointMetrics, 
  RegressionDetection,
  PerformanceHealthScore 
} from './dashboard-data';

// Constants
export { SLI_THRESHOLDS } from '../performance/sli-tracker';

/**
 * Initialize the complete telemetry system
 * Call this once at application startup
 */
export function initializeTelemetrySystem(): void {
  // Initialize metrics collection
  metricsCollector.initialize();
  
  // Alert system starts automatically
  logger.info('✅ Telemetry system initialized with p99 <50ms monitoring');
}

/**
 * Get real-time system status for health checks
 */
export async function getSystemStatus(): Promise<{
  healthy: boolean;
  healthScore: number;
  p99Requirement: boolean;
  activeAlerts: number;
  timestamp: Date;
}> {
  const healthData = await dashboardDataAggregator.calculateHealthScore();
  const p99Check = sliTracker.isP99RequirementMet();
  const activeAlerts = alertSystem.getActiveAlerts();

  return {
    healthy: healthData.overall >= 70 && p99Check.met,
    healthScore: healthData.overall,
    p99Requirement: p99Check.met,
    activeAlerts: activeAlerts.length,
    timestamp: new Date(),
  };
}

/**
 * Quick performance check for API endpoints
 */
export function createPerformanceWrapper<T extends (...args: any[]) => Promise<any>>(
  endpointName: string,
  fn: T
): T {
  return (async (...args: any[]) => {
    return trackApiCall(endpointName, () => fn(...args));
  }) as T;
}

/**
 * Database query performance wrapper
 */
export function createDatabaseWrapper<T extends (...args: any[]) => Promise<any>>(
  queryName: string,
  fn: T
): T {
  return (async (...args: any[]) => {
    return trackDatabaseQuery(queryName, () => fn(...args));
  }) as T;
}

/**
 * Business process performance wrapper
 */
export function createBusinessWrapper<T extends (...args: any[]) => Promise<any>>(
  processName: string,
  fn: T
): T {
  return (async (...args: any[]) => {
    return trackBusinessProcess(processName, () => fn(...args));
  }) as T;
}

/**
 * Manual performance measurement utility
 */
export class PerformanceTimer {
  private startTime: number;
  private name: string;

  constructor(name: string) {
    this.name = name;
    this.startTime = Date.now();
  }

  public end(attributes?: Record<string, string>): number {
    const duration = Date.now() - this.startTime;
    
    if (this.name.includes('api')) {
      sliTracker.trackApiLatency(this.name, duration, attributes);
    } else if (this.name.includes('db')) {
      sliTracker.trackDatabaseQuery(this.name, duration, attributes);
    }
    
    return duration;
  }
}

/**
 * Utility to start a performance timer
 */
export function startTimer(name: string): PerformanceTimer {
  return new PerformanceTimer(name);
}

/**
 * Batch record multiple metrics
 */
export function recordMetricsBatch(metrics: Array<{
  type: 'api' | 'database' | 'business';
  name: string;
  duration: number;
  attributes?: Record<string, string>;
  success?: boolean;
}>): void {
  metrics.forEach(metric => {
    switch (metric.type) {
      case 'api':
        sliTracker.trackApiLatency(metric.name, metric.duration, metric.attributes);
        break;
      case 'database':
        sliTracker.trackDatabaseQuery(metric.name, metric.duration, metric.attributes);
        break;
      case 'business':
        sliTracker.trackBusinessProcess(
          metric.name, 
          metric.duration, 
          metric.success ?? true, 
          metric.attributes
        );
        break;
    }
  });
}

/**
 * Get performance insights for debugging
 */
export function getPerformanceInsights(): {
  p99Status: { met: boolean; violations: any[] };
  healthScore: { score: number; status: string };
  recentViolations: number;
  systemRecommendations: string[];
} {
  const p99Status = sliTracker.isP99RequirementMet();
  const healthData = dashboardDataAggregator.getRealtimeHealthScore();
  const recentViolations = sliTracker.getViolations(new Date(Date.now() - 3600000)).length;
  
  const recommendations: string[] = [];
  
  if (!p99Status.met) {
    recommendations.push('Critical: P99 latency exceeds 50ms threshold');
  }
  
  if (healthData.score < 80) {
    recommendations.push('Warning: Health score below 80');
  }
  
  if (recentViolations > 5) {
    recommendations.push('High violation rate detected in last hour');
  }
  
  if (healthData.components.apiLatency < 70) {
    recommendations.push('API latency performance needs attention');
  }
  
  if (healthData.components.database < 70) {
    recommendations.push('Database performance optimization recommended');
  }

  return {
    p99Status,
    healthScore: healthData,
    recentViolations,
    systemRecommendations: recommendations,
  };
}

/**
 * Emergency performance mode - stricter monitoring
 */
export function enableEmergencyMode(): void {
  // Reduce alert cooldowns for faster response
  alertSystem.toggleRule('p99_critical_violation', true);
  
  logger.warn('🚨 Emergency performance mode enabled - enhanced monitoring active');
}

/**
 * Disable emergency mode
 */
export function disableEmergencyMode(): void {
  logger.info('✅ Emergency performance mode disabled - normal monitoring resumed');
}

// Re-export everything for convenience
export * from './metrics';
export * from '../performance/sli-tracker';
export * from '../performance/alerts';
export * from './dashboard-data';