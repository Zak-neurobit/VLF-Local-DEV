import { paymentLogger } from '@/lib/pino-logger';

/**
 * Telemetry Usage Examples
 * Demonstrates how to use the comprehensive performance monitoring system
 */

import {
  initializeTelemetrySystem,
  createPerformanceWrapper,
  createDatabaseWrapper,
  createBusinessWrapper,
  startTimer,
  recordMetricsBatch,
  getSystemStatus,
  getPerformanceInsights,
  metricsCollector,
  sliTracker,
  alertSystem,
  dashboardDataAggregator,
} from './index';

/**
 * EXAMPLE 1: Basic System Initialization
 * Call this once at application startup
 */
export function initializeExample(): void {
  // Initialize the telemetry system
  initializeTelemetrySystem();
  
  paymentLogger.info('Telemetry system ready for p99 <50ms monitoring');
}

/**
 * EXAMPLE 2: API Endpoint Monitoring
 * Wrap your API functions for automatic performance tracking
 */

// Original API function
async function originalLeadCaptureAPI(leadData: any): Promise<any> {
  // Simulate API processing
  await new Promise(resolve => setTimeout(resolve, 25));
  return { success: true, leadId: '123' };
}

// Wrapped with performance monitoring
const leadCaptureAPI = createPerformanceWrapper(
  '/api/leads',
  originalLeadCaptureAPI
);

// Usage - automatically tracks p99 latency
export async function exampleAPIUsage(): Promise<void> {
  try {
    const result = await leadCaptureAPI({ name: 'John Doe', email: 'john@example.com' });
    paymentLogger.info('Lead captured:', result);
  } catch (error) {
    paymentLogger.error('Lead capture failed:', error);
  }
}

/**
 * EXAMPLE 3: Database Query Monitoring
 * Wrap database queries for performance tracking
 */

// Original database query
async function originalUserQuery(userId: string): Promise<any> {
  // Simulate database query
  await new Promise(resolve => setTimeout(resolve, 15));
  return { id: userId, name: 'User Name' };
}

// Wrapped with performance monitoring
const getUserQuery = createDatabaseWrapper(
  'get_user_by_id',
  originalUserQuery
);

export async function exampleDatabaseUsage(): Promise<void> {
  const user = await getUserQuery('user123');
  paymentLogger.info('User retrieved:', user);
}

/**
 * EXAMPLE 4: Business Process Monitoring
 * Track business-critical processes like payments and appointments
 */

// Original payment processing
async function originalPaymentProcessing(amount: number, method: string): Promise<any> {
  // Simulate payment processing
  await new Promise(resolve => setTimeout(resolve, 45));
  return { success: true, transactionId: 'tx123' };
}

// Wrapped with business process monitoring
const processPayment = createBusinessWrapper(
  'payment_processing',
  originalPaymentProcessing
);

export async function exampleBusinessProcessUsage(): Promise<void> {
  try {
    const result = await processPayment(299.99, 'credit_card');
    paymentLogger.info('Payment processed:', result);
  } catch (error) {
    paymentLogger.error('Payment failed:', error);
  }
}

/**
 * EXAMPLE 5: Manual Performance Timing
 * For custom operations that need specific timing
 */
export async function exampleManualTiming(): Promise<void> {
  const timer = startTimer('custom_operation');
  
  try {
    // Your custom operation
    await new Promise(resolve => setTimeout(resolve, 30));
    
    // End timing and record
    const duration = timer.end({
      operation_type: 'data_processing',
      complexity: 'medium',
    });
    
    paymentLogger.info(`Custom operation took ${duration}ms`);
  } catch (error) {
    timer.end({ error: 'true', error_type: error instanceof Error ? error.constructor.name : 'unknown' });
    throw error;
  }
}

/**
 * EXAMPLE 6: Batch Metrics Recording
 * Record multiple metrics at once for efficiency
 */
export function exampleBatchMetrics(): void {
  recordMetricsBatch([
    {
      type: 'api',
      name: '/api/consultations',
      duration: 42,
      attributes: { method: 'POST', status: '200' },
    },
    {
      type: 'database',
      name: 'create_appointment',
      duration: 18,
      attributes: { table: 'appointments', operation: 'INSERT' },
    },
    {
      type: 'business',
      name: 'lead_capture',
      duration: 67,
      success: true,
      attributes: { source: 'contact_form', quality: 'high' },
    },
  ]);
}

/**
 * EXAMPLE 7: Real-time System Monitoring
 * Check system health and p99 compliance
 */
export async function exampleSystemMonitoring(): Promise<void> {
  // Get current system status
  const status = await getSystemStatus();
  
  paymentLogger.info('System Status:', {
    healthy: status.healthy,
    healthScore: status.healthScore,
    p99RequirementMet: status.p99Requirement,
    activeAlerts: status.activeAlerts,
  });
  
  // Get performance insights
  const insights = getPerformanceInsights();
  
  paymentLogger.info('Performance Insights:', {
    p99Violations: insights.p99Status.violations.length,
    healthScore: insights.healthScore.score,
    recommendations: insights.systemRecommendations,
  });
  
  // Get dashboard data
  const dashboardData = await dashboardDataAggregator.getDashboardData();
  
  paymentLogger.info('Dashboard Summary:', {
    overallHealth: dashboardData.healthScore.overall,
    activeAlerts: dashboardData.activeAlerts.length,
    recentViolations: dashboardData.recentViolations.length,
    regressions: dashboardData.regressions.length,
  });
}

/**
 * EXAMPLE 8: Alert Management
 * Handle alerts and violations
 */
export function exampleAlertManagement(): void {
  // Get active alerts
  const activeAlerts = alertSystem.getActiveAlerts();
  paymentLogger.info(`Active alerts: ${activeAlerts.length}`);
  
  // Acknowledge an alert
  if (activeAlerts.length > 0) {
    const alertId = activeAlerts[0].id;
    alertSystem.acknowledgeAlert(alertId, 'system-admin');
    paymentLogger.info(`Alert ${alertId} acknowledged`);
  }
  
  // Get alert statistics
  const stats = alertSystem.getAlertStats(24); // Last 24 hours
  paymentLogger.info('Alert Statistics:', {
    totalAlerts: stats.totalAlerts,
    criticalAlerts: stats.criticalAlerts,
    averageResolutionTime: stats.averageResolutionTime,
    topRules: stats.topAlertRules,
  });
}

/**
 * EXAMPLE 9: Custom Business Metrics
 * Track business-specific events
 */
export function exampleBusinessMetrics(): void {
  // Record form submission
  metricsCollector.recordFormSubmission('contact_form', true);
  
  // Record conversion
  metricsCollector.recordConversion('consultation_booking', 299.99);
  
  // Record lead capture
  metricsCollector.recordLeadCapture('google_ads', 'high');
  
  // Record appointment
  metricsCollector.recordAppointment('initial_consultation', true);
  
  // Record consultation
  metricsCollector.recordConsultation('immigration_law', 1800); // 30 minutes
}

/**
 * EXAMPLE 10: Performance Regression Detection
 * Monitor for performance degradation
 */
export async function exampleRegressionDetection(): Promise<void> {
  const dashboardData = await dashboardDataAggregator.getDashboardData();
  
  if (dashboardData.regressions.length > 0) {
    paymentLogger.info('Performance Regressions Detected:');
    
    dashboardData.regressions.forEach(regression => {
      paymentLogger.info(`- ${regression.metric}: ${regression.description}`);
      paymentLogger.info(`  Baseline: ${regression.baselineValue}ms`);
      paymentLogger.info(`  Current: ${regression.currentValue}ms`);
      paymentLogger.info(`  Degradation: ${regression.thresholdExceeded.toFixed(1)}%`);
      paymentLogger.info(`  Severity: ${regression.severity}`);
    });
  } else {
    paymentLogger.info('No performance regressions detected');
  }
}

/**
 * EXAMPLE 11: Dashboard Data for UI Components
 * Get formatted data for dashboard visualization
 */
export async function exampleDashboardData(): Promise<void> {
  const dashboardData = await dashboardDataAggregator.getDashboardData();
  
  // Health score widget data
  const healthWidget = {
    score: dashboardData.healthScore.overall,
    components: {
      'API Latency': dashboardData.healthScore.apiLatency,
      'Database': dashboardData.healthScore.databasePerformance,
      'Web Vitals': dashboardData.healthScore.webVitals,
      'Business': dashboardData.healthScore.businessMetrics,
      'System': dashboardData.healthScore.systemHealth,
    },
  };
  
  // Endpoint performance table data
  const endpointsTable = dashboardData.endpoints.map(endpoint => ({
    name: endpoint.endpoint,
    p99: `${endpoint.p99}ms`,
    requests: endpoint.requestCount,
    status: endpoint.status,
    availability: `${endpoint.availability}%`,
  }));
  
  // Trends chart data
  const trendsChart = dashboardData.trends.map(trend => ({
    metric: trend.metric,
    current: trend.current,
    target: trend.target,
    trend: trend.trend,
    change: `${trend.changePercent > 0 ? '+' : ''}${trend.changePercent.toFixed(1)}%`,
  }));
  
  paymentLogger.info('Dashboard Data:', {
    healthWidget,
    endpointsTable,
    trendsChart,
  });
}

/**
 * EXAMPLE 12: Emergency Performance Mode
 * Handle performance emergencies
 */
export async function exampleEmergencyMode(): Promise<void> {
  const status = await getSystemStatus();
  
  // Check if we need emergency mode
  if (!status.p99Requirement || status.healthScore < 70) {
    paymentLogger.info('🚨 Performance emergency detected!');
    
    // Enable emergency monitoring
    import('./index').then(({ enableEmergencyMode }) => {
      enableEmergencyMode();
    });
    
    // Get immediate insights
    const insights = getPerformanceInsights();
    paymentLogger.info('Emergency recommendations:', insights.systemRecommendations);
  } else {
    paymentLogger.info('✅ System performance is healthy');
  }
}

/**
 * EXAMPLE 13: Integration with Existing Performance Monitor
 * Enhance existing monitoring with new telemetry
 */
export function exampleLegacyIntegration(): void {
  // Import existing performance monitor
  import('../monitoring/performance').then(({ performanceMonitor }) => {
    // Start a measurement
    performanceMonitor.start('legacy_operation', { 
      type: 'data_processing',
      priority: 'high' 
    });
    
    // Simulate operation
    setTimeout(() => {
      const duration = performanceMonitor.end('legacy_operation');
      
      if (duration) {
        // Also track in new telemetry system
        sliTracker.trackApiLatency('legacy_operation', duration, {
          source: 'legacy_monitor',
          type: 'data_processing',
        });
      }
    }, 50);
  });
}

/**
 * Complete usage example function
 * Demonstrates the full system capabilities
 */
export async function runCompleteExample(): Promise<void> {
  paymentLogger.info('🚀 Starting comprehensive telemetry example...');
  
  // Initialize system
  initializeExample();
  
  // Run various examples
  await exampleAPIUsage();
  await exampleDatabaseUsage();
  await exampleBusinessProcessUsage();
  await exampleManualTiming();
  
  exampleBatchMetrics();
  exampleBusinessMetrics();
  
  // Wait a bit for metrics to be processed
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Check system status
  await exampleSystemMonitoring();
  exampleAlertManagement();
  await exampleRegressionDetection();
  await exampleDashboardData();
  await exampleEmergencyMode();
  
  paymentLogger.info('✅ Telemetry example completed - p99 <50ms monitoring active!');
}

// Export for testing and demonstration
export default {
  initializeExample,
  exampleAPIUsage,
  exampleDatabaseUsage,
  exampleBusinessProcessUsage,
  exampleSystemMonitoring,
  runCompleteExample,
};