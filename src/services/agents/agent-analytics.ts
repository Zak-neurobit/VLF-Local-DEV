import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';
import { errorToLogMeta, createErrorLogMeta } from '@/lib/logger/utils';
import { cache } from '@/lib/cache';

export interface AgentMetrics {
  agentId: string;
  agentName: string;
  totalInteractions: number;
  successfulInteractions: number;
  failedInteractions: number;
  averageResponseTime: number;
  satisfactionScore: number;
  languageBreakdown: Record<string, number>;
  topIntents: Array<{ intent: string; count: number }>;
  hourlyActivity: Record<number, number>;
  conversionRate: number;
  escalationRate: number;
}

export interface AgentPerformance {
  timestamp: Date;
  activeAgents: number;
  totalSessions: number;
  averageSessionDuration: number;
  peakConcurrentSessions: number;
  systemHealth: 'excellent' | 'good' | 'degraded' | 'critical';
  alerts: Array<{
    level: 'info' | 'warning' | 'error';
    message: string;
    timestamp: Date;
  }>;
}

export class AgentAnalyticsService {
  private static instance: AgentAnalyticsService;
  private metricsCache = new Map<string, AgentMetrics>();
  private performanceHistory: AgentPerformance[] = [];

  static getInstance(): AgentAnalyticsService {
    if (!this.instance) {
      this.instance = new AgentAnalyticsService();
    }
    return this.instance;
  }

  async trackInteraction(data: {
    agentId: string;
    agentName: string;
    sessionId: string;
    userId?: string;
    intent: string;
    language: string;
    responseTime: number;
    success: boolean;
    satisfaction?: number;
    escalated?: boolean;
    metadata?: Record<string, unknown>;
  }): Promise<void> {
    try {
      // Store in database
      if (!prisma) {
        logger.error('Prisma client not available');
        return;
      }
      await prisma.agentInteraction.create({
        data: {
          agentId: data.agentId,
          agentName: data.agentName,
          agentType: 'general',
          sessionId: data.sessionId,
          userId: data.userId,
          intent: data.intent,
          language: data.language,
          responseTime: data.responseTime,
          success: data.success,
          satisfaction: data.satisfaction,
          escalated: data.escalated || false,
          metadata: (data.metadata || {}) as Prisma.JsonObject,
        },
      });

      // Update real-time metrics
      this.updateMetrics(data);

      // Trigger alerts if needed
      await this.checkAlerts(data);
    } catch (error) {
      logger.error('Error tracking agent interaction:', errorToLogMeta(error));
    }
  }

  private updateMetrics(data: {
    agentId: string;
    agentName: string;
    success: boolean;
    responseTime: number;
    satisfaction?: number;
    language: string;
    intent: string;
    escalated?: boolean;
  }): void {
    const metrics =
      this.metricsCache.get(data.agentId) || this.initializeMetrics(data.agentId, data.agentName);

    metrics.totalInteractions++;
    if (data.success) metrics.successfulInteractions++;
    else metrics.failedInteractions++;

    // Update average response time
    metrics.averageResponseTime =
      (metrics.averageResponseTime * (metrics.totalInteractions - 1) + data.responseTime) /
      metrics.totalInteractions;

    // Update language breakdown
    metrics.languageBreakdown[data.language] = (metrics.languageBreakdown[data.language] || 0) + 1;

    // Update top intents
    const intentIndex = metrics.topIntents.findIndex(i => i.intent === data.intent);
    if (intentIndex >= 0) {
      metrics.topIntents[intentIndex].count++;
    } else {
      metrics.topIntents.push({ intent: data.intent, count: 1 });
    }
    metrics.topIntents.sort((a, b) => b.count - a.count);
    metrics.topIntents = metrics.topIntents.slice(0, 10); // Keep top 10

    // Update hourly activity
    const hour = new Date().getHours();
    metrics.hourlyActivity[hour] = (metrics.hourlyActivity[hour] || 0) + 1;

    // Update satisfaction score
    if (data.satisfaction) {
      const totalWithSatisfaction = metrics.totalInteractions - (metrics.failedInteractions || 0);
      metrics.satisfactionScore =
        (metrics.satisfactionScore * (totalWithSatisfaction - 1) + data.satisfaction) /
        totalWithSatisfaction;
    }

    // Update rates
    metrics.conversionRate = metrics.successfulInteractions / metrics.totalInteractions;
    if (data.escalated) {
      const escalatedCount = metrics.topIntents.find(i => i.intent === 'escalation')?.count || 0;
      metrics.escalationRate = escalatedCount / metrics.totalInteractions;
    }

    this.metricsCache.set(data.agentId, metrics);
  }

  private initializeMetrics(agentId: string, agentName: string): AgentMetrics {
    return {
      agentId,
      agentName,
      totalInteractions: 0,
      successfulInteractions: 0,
      failedInteractions: 0,
      averageResponseTime: 0,
      satisfactionScore: 0,
      languageBreakdown: {},
      topIntents: [],
      hourlyActivity: {},
      conversionRate: 0,
      escalationRate: 0,
    };
  }

  private async checkAlerts(data: {
    agentId: string;
    responseTime: number;
    success: boolean;
    escalated?: boolean;
  }): Promise<void> {
    const alerts: Array<{ level: 'info' | 'warning' | 'error'; message: string }> = [];

    // Check response time
    if (data.responseTime > 5000) {
      alerts.push({
        level: 'warning',
        message: `Slow response time for ${data.agentId}: ${data.responseTime}ms`,
      });
    }

    // Check failure rate
    const metrics = this.metricsCache.get(data.agentId);
    if (metrics && metrics.failedInteractions > 0) {
      const failureRate = metrics.failedInteractions / metrics.totalInteractions;
      if (failureRate > 0.1) {
        alerts.push({
          level: 'error',
          message: `High failure rate for ${data.agentId}: ${(failureRate * 100).toFixed(1)}%`,
        });
      }
    }

    // Store alerts
    for (const alert of alerts) {
      logger.warn(`Agent Alert: ${alert.message}`);
      // Could send to monitoring service or notification system
    }
  }

  async getAgentMetrics(agentId?: string): Promise<AgentMetrics[]> {
    if (agentId) {
      const metrics = this.metricsCache.get(agentId);
      return metrics ? [metrics] : [];
    }
    return Array.from(this.metricsCache.values());
  }

  async getSystemPerformance(): Promise<AgentPerformance> {
    const now = new Date();
    const activeAgents = this.metricsCache.size;

    // Calculate current performance
    if (!prisma) {
      return {
        timestamp: now,
        activeAgents: 0,
        totalSessions: 0,
        averageSessionDuration: 0,
        peakConcurrentSessions: 0,
        systemHealth: 'degraded',
        alerts: [],
      };
    }

    const recentInteractions =
      (await prisma.agentInteraction.findMany({
        where: {
          createdAt: {
            gte: new Date(now.getTime() - 3600000), // Last hour
          },
        },
      })) ?? [];

    const sessionDurations = recentInteractions.map(i => i.responseTime ?? 0);
    const averageSessionDuration =
      sessionDurations.length > 0
        ? sessionDurations.reduce((a, b) => a + b, 0) / sessionDurations.length
        : 0;

    // Determine system health
    let systemHealth: 'excellent' | 'good' | 'degraded' | 'critical' = 'excellent';
    if (averageSessionDuration > 3000) systemHealth = 'good';
    if (averageSessionDuration > 5000) systemHealth = 'degraded';
    if (averageSessionDuration > 10000) systemHealth = 'critical';

    const performance: AgentPerformance = {
      timestamp: now,
      activeAgents,
      totalSessions: recentInteractions.length,
      averageSessionDuration,
      peakConcurrentSessions: 0, // Would need to track this separately
      systemHealth,
      alerts: [],
    };

    // Store in history
    this.performanceHistory.push(performance);
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift(); // Keep last 100 entries
    }

    return performance;
  }

  async generateInsights(): Promise<{
    topPerformingAgents: Array<{ agentName: string; score: number }>;
    improvementAreas: string[];
    recommendations: string[];
    trends: {
      interactionVolume: 'increasing' | 'stable' | 'decreasing';
      satisfactionTrend: 'improving' | 'stable' | 'declining';
      responseTimeTrend: 'improving' | 'stable' | 'degrading';
    };
  }> {
    const allMetrics = await this.getAgentMetrics();

    // Calculate top performing agents
    const topPerformingAgents = allMetrics
      .map(m => ({
        agentName: m.agentName,
        score:
          m.conversionRate * 0.4 + (m.satisfactionScore / 5) * 0.3 + (1 - m.escalationRate) * 0.3,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    // Identify improvement areas
    const improvementAreas: string[] = [];
    allMetrics.forEach(m => {
      if (m.averageResponseTime > 3000) {
        improvementAreas.push(`${m.agentName}: Slow response times`);
      }
      if (m.escalationRate > 0.15) {
        improvementAreas.push(`${m.agentName}: High escalation rate`);
      }
      if (m.satisfactionScore < 3.5) {
        improvementAreas.push(`${m.agentName}: Low satisfaction scores`);
      }
    });

    // Generate recommendations
    const recommendations: string[] = [];
    if (improvementAreas.some(area => area.includes('Slow response'))) {
      recommendations.push(
        'Consider optimizing agent response algorithms or increasing compute resources'
      );
    }
    if (improvementAreas.some(area => area.includes('High escalation'))) {
      recommendations.push('Review and expand agent training data for better autonomous handling');
    }
    if (improvementAreas.some(area => area.includes('Low satisfaction'))) {
      recommendations.push('Analyze conversation logs to identify common pain points');
    }

    // Analyze trends (simplified for now)
    const trends = {
      interactionVolume: 'stable' as const,
      satisfactionTrend: 'improving' as const,
      responseTimeTrend: 'stable' as const,
    };

    return {
      topPerformingAgents,
      improvementAreas,
      recommendations,
      trends,
    };
  }

  async exportAnalytics(startDate: Date, endDate: Date): Promise<Buffer> {
    if (!prisma) {
      return Buffer.from('[]');
    }

    const interactions = await prisma.agentInteraction.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Convert to CSV or JSON format
    const data = interactions.map(i => ({
      timestamp: i.createdAt,
      agent: i.agentName,
      intent: i.intent,
      language: i.language,
      responseTime: i.responseTime,
      success: i.success,
      satisfaction: i.satisfaction,
      escalated: i.escalated,
    }));

    return Buffer.from(JSON.stringify(data, null, 2));
  }
}

export const agentAnalytics = AgentAnalyticsService.getInstance();
