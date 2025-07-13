/**
 * Dashboard Data Aggregation
 * Real-time performance health scoring and trend analysis for monitoring dashboards
 */

import { sliTracker, PercentileData, BusinessSLI, SLIViolation } from '../performance/sli-tracker';
import { alertSystem, Alert } from '../performance/alerts';

// Dashboard data interfaces
export interface PerformanceHealthScore {
  overall: number;
  apiLatency: number;
  databasePerformance: number;
  webVitals: number;
  businessMetrics: number;
  systemHealth: number;
  timestamp: Date;
}

export interface TrendData {
  timestamp: Date;
  value: number;
  target?: number;
}

export interface PerformanceTrend {
  metric: string;
  current: number;
  target: number;
  trend: 'improving' | 'stable' | 'degrading';
  changePercent: number;
  data: TrendData[];
}

export interface EndpointMetrics {
  endpoint: string;
  p50: number;
  p90: number;
  p95: number;
  p99: number;
  requestCount: number;
  errorRate: number;
  availability: number;
  status: 'healthy' | 'warning' | 'critical';
}

export interface RegressionDetection {
  metric: string;
  endpoint?: string;
  detected: boolean;
  severity: 'minor' | 'major' | 'critical';
  description: string;
  detectedAt: Date;
  baselineValue: number;
  currentValue: number;
  thresholdExceeded: number; // Percentage above baseline
}

export interface DashboardData {
  healthScore: PerformanceHealthScore;
  trends: PerformanceTrend[];
  endpoints: EndpointMetrics[];
  recentViolations: SLIViolation[];
  activeAlerts: Alert[];
  regressions: RegressionDetection[];
  businessMetrics: {
    leadCaptureRate: number;
    conversionRate: number;
    averageResponseTime: number;
    customerSatisfaction: number;
  };
  systemStatus: {
    uptime: number;
    memoryUsage: number;
    cpuUsage: number;
    diskUsage: number;
    activeConnections: number;
  };
  timestamp: Date;
}

class DashboardDataAggregator {
  private trendHistory: Map<string, TrendData[]> = new Map();
  private baselineMetrics: Map<string, number> = new Map();
  private lastHealthScore: PerformanceHealthScore | null = null;
  
  private readonly TREND_HISTORY_HOURS = 24;
  private readonly BASELINE_SAMPLE_HOURS = 168; // 1 week
  private readonly REGRESSION_THRESHOLD_PERCENT = 20; // 20% degradation triggers detection

  constructor() {
    this.startDataCollection();
  }

  /**
   * Get comprehensive dashboard data
   */
  public async getDashboardData(): Promise<DashboardData> {
    const [
      healthScore,
      trends,
      endpoints,
      recentViolations,
      activeAlerts,
      regressions,
      businessMetrics,
      systemStatus
    ] = await Promise.all([
      this.calculateHealthScore(),
      this.generateTrends(),
      this.aggregateEndpointMetrics(),
      this.getRecentViolations(),
      this.getActiveAlerts(),
      this.detectRegressions(),
      this.aggregateBusinessMetrics(),
      this.getSystemStatus(),
    ]);

    return {
      healthScore,
      trends,
      endpoints,
      recentViolations,
      activeAlerts,
      regressions,
      businessMetrics,
      systemStatus,
      timestamp: new Date(),
    };
  }

  /**
   * Calculate comprehensive performance health score
   */
  public async calculateHealthScore(): Promise<PerformanceHealthScore> {
    const weights = {
      apiLatency: 0.25,
      databasePerformance: 0.20,
      webVitals: 0.20,
      businessMetrics: 0.20,
      systemHealth: 0.15,
    };

    const apiLatencyScore = await this.calculateApiLatencyScore();
    const databaseScore = await this.calculateDatabaseScore();
    const webVitalsScore = await this.calculateWebVitalsScore();
    const businessScore = await this.calculateBusinessMetricsScore();
    const systemScore = await this.calculateSystemHealthScore();

    const overall = Math.round(
      apiLatencyScore * weights.apiLatency +
      databaseScore * weights.databasePerformance +
      webVitalsScore * weights.webVitals +
      businessScore * weights.businessMetrics +
      systemScore * weights.systemHealth
    );

    const healthScore: PerformanceHealthScore = {
      overall,
      apiLatency: apiLatencyScore,
      databasePerformance: databaseScore,
      webVitals: webVitalsScore,
      businessMetrics: businessScore,
      systemHealth: systemScore,
      timestamp: new Date(),
    };

    this.lastHealthScore = healthScore;
    return healthScore;
  }

  /**
   * Generate performance trends for various metrics
   */
  public generateTrends(): PerformanceTrend[] {
    const trends: PerformanceTrend[] = [];

    // API latency trends
    const apiTrendData = this.trendHistory.get('api_p99_latency') || [];
    if (apiTrendData.length >= 2) {
      trends.push(this.createTrend('API P99 Latency', apiTrendData, 50));
    }

    // Database performance trends
    const dbTrendData = this.trendHistory.get('db_p99_latency') || [];
    if (dbTrendData.length >= 2) {
      trends.push(this.createTrend('Database P99 Latency', dbTrendData, 25));
    }

    // Health score trends
    const healthTrendData = this.trendHistory.get('health_score') || [];
    if (healthTrendData.length >= 2) {
      trends.push(this.createTrend('Health Score', healthTrendData, 90));
    }

    // Lead capture time trends
    const leadTrendData = this.trendHistory.get('lead_capture_time') || [];
    if (leadTrendData.length >= 2) {
      trends.push(this.createTrend('Lead Capture Time', leadTrendData, 100));
    }

    return trends;
  }

  /**
   * Aggregate endpoint-specific metrics
   */
  public aggregateEndpointMetrics(): EndpointMetrics[] {
    const endpoints: EndpointMetrics[] = [];
    
    // This would typically iterate through known endpoints
    const knownEndpoints = [
      '/api/leads',
      '/api/appointments',
      '/api/consultations',
      '/api/payments',
      '/api/auth/login',
      '/api/contact',
    ];

    for (const endpoint of knownEndpoints) {
      const percentileData = sliTracker.getPercentileData(`api:${endpoint}`);
      if (percentileData) {
        const status = this.determineEndpointStatus(percentileData.p99);
        
        endpoints.push({
          endpoint,
          p50: Math.round(percentileData.p50),
          p90: Math.round(percentileData.p90),
          p95: Math.round(percentileData.p95),
          p99: Math.round(percentileData.p99),
          requestCount: percentileData.count,
          errorRate: 0, // Would calculate from error metrics
          availability: 99.9, // Would calculate from uptime metrics
          status,
        });
      }
    }

    return endpoints;
  }

  /**
   * Detect performance regressions
   */
  public detectRegressions(): RegressionDetection[] {
    const regressions: RegressionDetection[] = [];
    const now = new Date();

    // Check API endpoint regressions
    const apiEndpoints = ['/api/leads', '/api/appointments', '/api/consultations'];
    
    for (const endpoint of apiEndpoints) {
      const currentP99 = sliTracker.getP99Latency(`api:${endpoint}`);
      const baseline = this.baselineMetrics.get(`api:${endpoint}:p99`);
      
      if (currentP99 && baseline) {
        const regressionPercent = ((currentP99 - baseline) / baseline) * 100;
        
        if (regressionPercent > this.REGRESSION_THRESHOLD_PERCENT) {
          regressions.push({
            metric: 'p99_latency',
            endpoint,
            detected: true,
            severity: this.getRegressionSeverity(regressionPercent),
            description: `P99 latency for ${endpoint} increased by ${regressionPercent.toFixed(1)}%`,
            detectedAt: now,
            baselineValue: baseline,
            currentValue: currentP99,
            thresholdExceeded: regressionPercent,
          });
        }
      }
    }

    // Check business metric regressions
    const businessSLIs = sliTracker.getBusinessSLIs();
    for (const sli of businessSLIs) {
      if (sli.status === 'critical') {
        const regressionPercent = ((sli.value - sli.target) / sli.target) * 100;
        
        regressions.push({
          metric: sli.name,
          detected: true,
          severity: 'critical',
          description: `${sli.name} exceeded target by ${regressionPercent.toFixed(1)}%`,
          detectedAt: now,
          baselineValue: sli.target,
          currentValue: sli.value,
          thresholdExceeded: regressionPercent,
        });
      }
    }

    return regressions;
  }

  /**
   * Get real-time health scoring with weighted components
   */
  public getRealtimeHealthScore(): {
    score: number;
    components: Record<string, number>;
    status: 'healthy' | 'warning' | 'critical';
  } {
    const score = this.lastHealthScore?.overall || 0;
    const components = {
      apiLatency: this.lastHealthScore?.apiLatency || 0,
      database: this.lastHealthScore?.databasePerformance || 0,
      webVitals: this.lastHealthScore?.webVitals || 0,
      business: this.lastHealthScore?.businessMetrics || 0,
      system: this.lastHealthScore?.systemHealth || 0,
    };

    let status: 'healthy' | 'warning' | 'critical';
    if (score >= 90) status = 'healthy';
    else if (score >= 70) status = 'warning';
    else status = 'critical';

    return { score, components, status };
  }

  // Private methods

  private async calculateApiLatencyScore(): Promise<number> {
    const p99Check = sliTracker.isP99RequirementMet();
    
    if (p99Check.met) {
      // Calculate score based on how close we are to the threshold
      const avgP99 = p99Check.violations.length === 0 ? 25 : 
        p99Check.violations.reduce((sum, v) => sum + v.p99, 0) / p99Check.violations.length;
      
      // Score from 0-100 based on latency (50ms = 0, 0ms = 100)
      return Math.max(0, Math.min(100, 100 - (avgP99 / 50) * 100));
    }
    
    // Penalty for violations
    const violationPenalty = Math.min(80, p99Check.violations.length * 20);
    return Math.max(0, 100 - violationPenalty);
  }

  private async calculateDatabaseScore(): Promise<number> {
    // Would analyze database query performance
    // For now, return a score based on known patterns
    return 85;
  }

  private async calculateWebVitalsScore(): Promise<number> {
    const businessSLIs = sliTracker.getBusinessSLIs();
    const webVitalsSLIs = businessSLIs.filter(sli => sli.name.startsWith('web_vitals_'));
    
    if (webVitalsSLIs.length === 0) return 100;
    
    const scores = webVitalsSLIs.map(sli => {
      if (sli.status === 'good') return 100;
      if (sli.status === 'warning') return 70;
      return 30;
    });
    
    return scores.reduce((sum, score) => sum + score, 0) / scores.length;
  }

  private async calculateBusinessMetricsScore(): Promise<number> {
    const businessSLIs = sliTracker.getBusinessSLIs();
    const businessMetricsSLIs = businessSLIs.filter(sli => 
      !sli.name.startsWith('web_vitals_') && !sli.name.includes('latency')
    );
    
    if (businessMetricsSLIs.length === 0) return 100;
    
    const scores = businessMetricsSLIs.map(sli => {
      if (sli.status === 'good') return 100;
      if (sli.status === 'warning') return 70;
      return 30;
    });
    
    return scores.reduce((sum, score) => sum + score, 0) / scores.length;
  }

  private async calculateSystemHealthScore(): Promise<number> {
    // Would integrate with system monitoring
    // For now, return a baseline score
    return 90;
  }

  private createTrend(name: string, data: TrendData[], target: number): PerformanceTrend {
    const recent = data.slice(-2);
    const current = recent[recent.length - 1]?.value || 0;
    const previous = recent[recent.length - 2]?.value || current;
    
    const changePercent = previous !== 0 ? ((current - previous) / previous) * 100 : 0;
    
    let trend: 'improving' | 'stable' | 'degrading';
    if (Math.abs(changePercent) < 5) trend = 'stable';
    else if (changePercent < 0) trend = 'improving';
    else trend = 'degrading';

    return {
      metric: name,
      current,
      target,
      trend,
      changePercent,
      data: data.slice(-24), // Last 24 data points
    };
  }

  private determineEndpointStatus(p99: number): 'healthy' | 'warning' | 'critical' {
    if (p99 <= 30) return 'healthy';
    if (p99 <= 50) return 'warning';
    return 'critical';
  }

  private getRecentViolations(): SLIViolation[] {
    return sliTracker.getViolations(new Date(Date.now() - 3600000)); // Last hour
  }

  private getActiveAlerts(): Alert[] {
    return alertSystem.getActiveAlerts();
  }

  private async aggregateBusinessMetrics() {
    // Would aggregate from actual business metrics
    return {
      leadCaptureRate: 95.2,
      conversionRate: 12.8,
      averageResponseTime: 32,
      customerSatisfaction: 4.7,
    };
  }

  private async getSystemStatus() {
    // Would integrate with system monitoring
    return {
      uptime: 99.98,
      memoryUsage: 67.3,
      cpuUsage: 23.1,
      diskUsage: 45.2,
      activeConnections: 127,
    };
  }

  private getRegressionSeverity(percent: number): 'minor' | 'major' | 'critical' {
    if (percent < 30) return 'minor';
    if (percent < 50) return 'major';
    return 'critical';
  }

  private startDataCollection(): void {
    // Collect trend data every minute
    setInterval(() => {
      this.collectTrendData();
    }, 60000);

    // Update baselines every hour
    setInterval(() => {
      this.updateBaselines();
    }, 3600000);
  }

  private collectTrendData(): void {
    const now = new Date();
    
    // Collect API latency data
    const apiP99 = sliTracker.getP99Latency('api:/api/leads');
    if (apiP99) {
      this.addTrendData('api_p99_latency', { timestamp: now, value: apiP99, target: 50 });
    }

    // Collect health score data
    if (this.lastHealthScore) {
      this.addTrendData('health_score', { 
        timestamp: now, 
        value: this.lastHealthScore.overall, 
        target: 90 
      });
    }

    // Cleanup old data
    this.cleanupTrendData();
  }

  private addTrendData(metric: string, data: TrendData): void {
    if (!this.trendHistory.has(metric)) {
      this.trendHistory.set(metric, []);
    }
    
    const history = this.trendHistory.get(metric)!;
    history.push(data);
    
    // Keep only last 24 hours
    const cutoff = new Date(Date.now() - this.TREND_HISTORY_HOURS * 60 * 60 * 1000);
    this.trendHistory.set(metric, history.filter(d => d.timestamp >= cutoff));
  }

  private cleanupTrendData(): void {
    const cutoff = new Date(Date.now() - this.TREND_HISTORY_HOURS * 60 * 60 * 1000);
    
    for (const [metric, data] of this.trendHistory.entries()) {
      const filtered = data.filter(d => d.timestamp >= cutoff);
      this.trendHistory.set(metric, filtered);
    }
  }

  private updateBaselines(): void {
    // Update baseline metrics for regression detection
    const endpoints = ['/api/leads', '/api/appointments', '/api/consultations'];
    
    for (const endpoint of endpoints) {
      const p99 = sliTracker.getP99Latency(`api:${endpoint}`);
      if (p99) {
        this.baselineMetrics.set(`api:${endpoint}:p99`, p99);
      }
    }
  }
}

// Singleton instance
export const dashboardDataAggregator = new DashboardDataAggregator();

// Convenience functions for dashboard integration

/**
 * Get dashboard data formatted for charts
 */
export async function getDashboardChartData(): Promise<{
  latencyChart: Array<{ time: string; p50: number; p95: number; p99: number }>;
  healthScoreChart: Array<{ time: string; score: number; target: number }>;
  endpointChart: Array<{ endpoint: string; p99: number; status: string }>;
}> {
  const data = await dashboardDataAggregator.getDashboardData();
  
  const latencyTrend = data.trends.find(t => t.metric === 'API P99 Latency');
  const healthTrend = data.trends.find(t => t.metric === 'Health Score');
  
  return {
    latencyChart: latencyTrend?.data.map(d => ({
      time: d.timestamp.toISOString(),
      p50: d.value * 0.6, // Estimated p50
      p95: d.value * 0.9, // Estimated p95
      p99: d.value,
    })) || [],
    
    healthScoreChart: healthTrend?.data.map(d => ({
      time: d.timestamp.toISOString(),
      score: d.value,
      target: d.target || 90,
    })) || [],
    
    endpointChart: data.endpoints.map(e => ({
      endpoint: e.endpoint,
      p99: e.p99,
      status: e.status,
    })),
  };
}

/**
 * Get summary metrics for dashboard widgets
 */
export async function getDashboardSummary(): Promise<{
  healthScore: number;
  p99Violations: number;
  activeAlerts: number;
  regressions: number;
  uptime: number;
}> {
  const data = await dashboardDataAggregator.getDashboardData();
  
  return {
    healthScore: data.healthScore.overall,
    p99Violations: data.recentViolations.filter(v => v.metric.includes('p99')).length,
    activeAlerts: data.activeAlerts.length,
    regressions: data.regressions.length,
    uptime: data.systemStatus.uptime,
  };
}

// Export types are already defined above