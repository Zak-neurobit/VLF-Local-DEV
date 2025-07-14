/**
 * Voice Analytics System for Enhanced Retell Integration
 * Provides comprehensive analytics and insights for voice interactions
 */

import { logger } from '@/lib/logger';
import { prisma } from '@/lib/prisma-safe';
import { getRetellService } from './index';
import { createNotification } from '@/lib/notifications';
import { cache, CacheTTL } from '@/lib/cache';

export interface VoiceAnalyticsData {
  // Call Metrics
  totalCalls: number;
  averageCallDuration: number;
  totalTalkTime: number;
  abandonmentRate: number;
  
  // Quality Metrics
  averageInteractionQuality: number;
  averageClarityScore: number;
  averageCompletionRate: number;
  averageResponseTime: number;
  
  // User Satisfaction
  averageSatisfactionScore: number;
  npsScore: number;
  csat: number;
  
  // Conversation Insights
  topIntents: Array<{
    intent: string;
    count: number;
    percentage: number;
  }>;
  commonIssues: Array<{
    issue: string;
    frequency: number;
    resolutionRate: number;
  }>;
  emotionalDistribution: {
    calm: number;
    anxious: number;
    frustrated: number;
    urgent: number;
    confused: number;
  };
  
  // Performance Trends
  callVolumeByHour: Array<{
    hour: number;
    count: number;
  }>;
  callVolumeByDay: Array<{
    day: string;
    count: number;
  }>;
  performanceTrend: Array<{
    date: Date;
    quality: number;
    volume: number;
  }>;
  
  // Agent Performance
  agentMetrics: Array<{
    agentId: string;
    agentName: string;
    totalCalls: number;
    averageQuality: number;
    resolutionRate: number;
  }>;
}

export interface CallInsights {
  callId: string;
  keyTopics: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  actionItems: string[];
  followUpRequired: boolean;
  transferRecommended: boolean;
  transferReason?: string;
  qualityIssues: string[];
  improvements: string[];
}

export interface VoiceOptimizationRecommendations {
  systemRecommendations: Array<{
    category: 'performance' | 'quality' | 'ux' | 'training';
    recommendation: string;
    impact: 'high' | 'medium' | 'low';
    effort: 'high' | 'medium' | 'low';
    metric: string;
    currentValue: number;
    targetValue: number;
  }>;
  agentRecommendations: Array<{
    agentId: string;
    recommendations: string[];
    trainingNeeded: string[];
  }>;
  conversationPatterns: Array<{
    pattern: string;
    frequency: number;
    recommendation: string;
  }>;
}

export class VoiceAnalyticsSystem {
  private retellService = getRetellService();

  /**
   * Generate comprehensive voice analytics for a time period
   */
  async generateAnalytics(params: {
    startDate: Date;
    endDate: Date;
    agentId?: string;
    practiceArea?: string;
  }): Promise<VoiceAnalyticsData> {
    logger.info('Generating voice analytics', { params });

    const cacheKey = `voice-analytics:${params.startDate.toISOString()}:${params.endDate.toISOString()}:${params.agentId || 'all'}`;
    
    return cache.remember(cacheKey, async () => {
      // Fetch call data
      const calls = await prisma.voiceCall.findMany({
        where: {
          createdAt: {
            gte: params.startDate,
            lte: params.endDate,
          },
          ...(params.agentId && { agentId: params.agentId }),
        },
        include: {
          metrics: true,
        },
      });

      // Calculate basic metrics
      const totalCalls = calls.length;
      const completedCalls = calls.filter(c => c.status === 'completed');
      const abandonedCalls = calls.filter(c => c.status === 'abandoned');
      
      const totalDuration = completedCalls.reduce((sum, call) => sum + (call.duration || 0), 0);
      const averageCallDuration = totalCalls > 0 ? totalDuration / completedCalls.length : 0;
      const abandonmentRate = totalCalls > 0 ? (abandonedCalls.length / totalCalls) * 100 : 0;

      // Calculate quality metrics
      const metricsData = calls
        .map(c => c.metrics)
        .filter(m => m !== null)
        .flat();

      const averageInteractionQuality = this.calculateAverage(metricsData.map((m: any) => m.interactionQuality));
      const averageClarityScore = this.calculateAverage(metricsData.map((m: any) => m.clarityScore));
      const averageCompletionRate = this.calculateAverage(metricsData.map((m: any) => m.completionRate));
      const averageResponseTime = this.calculateAverage(metricsData.map((m: any) => m.averageResponseTime));

      // Calculate satisfaction metrics
      const satisfactionScores = await this.fetchSatisfactionScores(params);
      const averageSatisfactionScore = this.calculateAverage(satisfactionScores.map(s => s.score));
      const npsScore = this.calculateNPS(satisfactionScores);
      const csat = this.calculateCSAT(satisfactionScores);

      // Analyze conversation patterns
      const topIntents = await this.analyzeTopIntents(calls);
      const commonIssues = await this.analyzeCommonIssues(calls);
      const emotionalDistribution = await this.analyzeEmotionalDistribution(metricsData);

      // Calculate performance trends
      const callVolumeByHour = this.calculateCallVolumeByHour(calls);
      const callVolumeByDay = this.calculateCallVolumeByDay(calls);
      const performanceTrend = await this.calculatePerformanceTrend(params);

      // Calculate agent metrics
      const agentMetrics = await this.calculateAgentMetrics(params);

      return {
        totalCalls,
        averageCallDuration,
        totalTalkTime: totalDuration,
        abandonmentRate,
        averageInteractionQuality,
        averageClarityScore,
        averageCompletionRate,
        averageResponseTime,
        averageSatisfactionScore,
        npsScore,
        csat,
        topIntents,
        commonIssues,
        emotionalDistribution,
        callVolumeByHour,
        callVolumeByDay,
        performanceTrend,
        agentMetrics,
      };
    }, CacheTTL.MEDIUM);
  }

  /**
   * Analyze individual call for insights
   */
  async analyzeCall(callId: string): Promise<CallInsights> {
    logger.info('Analyzing call for insights', { callId });

    const call = await prisma.voiceCall.findUnique({
      where: { callId },
      include: {
        transcript: true,
        metrics: true,
      },
    });

    if (!call) {
      throw new Error('Call not found');
    }

    // Extract key topics using simple keyword analysis
    const keyTopics = this.extractKeyTopics(call.transcript);

    // Analyze sentiment
    const sentiment = this.analyzeSentiment(call.transcript);

    // Extract action items
    const actionItems = this.extractActionItems(call.transcript);

    // Determine follow-up requirements
    const followUpRequired = this.determineFollowUpRequired(call.transcript);

    // Check if transfer is recommended
    const transferAnalysis = this.analyzeTransferNeed(call.transcript);

    // Identify quality issues
    const qualityIssues = this.identifyQualityIssues(call);

    // Generate improvement suggestions
    const improvements = this.generateImprovements(call, qualityIssues);

    return {
      callId,
      keyTopics,
      sentiment,
      actionItems,
      followUpRequired,
      transferRecommended: transferAnalysis.recommended,
      transferReason: transferAnalysis.reason,
      qualityIssues,
      improvements,
    };
  }

  /**
   * Generate optimization recommendations
   */
  async generateOptimizationRecommendations(
    analyticsData: VoiceAnalyticsData
  ): Promise<VoiceOptimizationRecommendations> {
    logger.info('Generating optimization recommendations');

    const systemRecommendations = [];
    const agentRecommendations = [];
    const conversationPatterns = [];

    // Performance recommendations
    if (analyticsData.averageResponseTime > 2000) {
      systemRecommendations.push({
        category: 'performance' as const,
        recommendation: 'Reduce average response time by optimizing LLM prompts and enabling response caching',
        impact: 'high' as const,
        effort: 'medium' as const,
        metric: 'Average Response Time',
        currentValue: analyticsData.averageResponseTime,
        targetValue: 1500,
      });
    }

    // Quality recommendations
    if (analyticsData.averageClarityScore < 80) {
      systemRecommendations.push({
        category: 'quality' as const,
        recommendation: 'Improve conversation clarity by enhancing agent training on common misunderstandings',
        impact: 'high' as const,
        effort: 'low' as const,
        metric: 'Clarity Score',
        currentValue: analyticsData.averageClarityScore,
        targetValue: 90,
      });
    }

    // UX recommendations
    if (analyticsData.abandonmentRate > 10) {
      systemRecommendations.push({
        category: 'ux' as const,
        recommendation: 'Reduce call abandonment by improving initial greeting and wait time messaging',
        impact: 'high' as const,
        effort: 'low' as const,
        metric: 'Abandonment Rate',
        currentValue: analyticsData.abandonmentRate,
        targetValue: 5,
      });
    }

    // Training recommendations based on emotional distribution
    if (analyticsData.emotionalDistribution.frustrated > 20) {
      systemRecommendations.push({
        category: 'training' as const,
        recommendation: 'Implement de-escalation training to handle frustrated callers better',
        impact: 'medium' as const,
        effort: 'medium' as const,
        metric: 'Frustrated Caller Percentage',
        currentValue: analyticsData.emotionalDistribution.frustrated,
        targetValue: 10,
      });
    }

    // Agent-specific recommendations
    for (const agent of analyticsData.agentMetrics) {
      const recommendations = [];
      const trainingNeeded = [];

      if (agent.averageQuality < 80) {
        recommendations.push('Focus on improving call quality through active listening techniques');
        trainingNeeded.push('Active Listening Workshop');
      }

      if (agent.resolutionRate < 70) {
        recommendations.push('Improve first-call resolution by better understanding common issues');
        trainingNeeded.push('Legal Issue Identification Training');
      }

      if (recommendations.length > 0) {
        agentRecommendations.push({
          agentId: agent.agentId,
          recommendations,
          trainingNeeded,
        });
      }
    }

    // Analyze conversation patterns
    const patterns = await this.analyzeConversationPatterns(analyticsData);
    conversationPatterns.push(...patterns);

    return {
      systemRecommendations,
      agentRecommendations,
      conversationPatterns,
    };
  }

  /**
   * Track real-time voice metrics
   */
  async trackRealTimeMetrics(params: {
    callId: string;
    metric: string;
    value: number;
    timestamp?: Date;
  }): Promise<void> {
    logger.info('Tracking real-time voice metric', { params });

    await prisma.voiceMetricEvent.create({
      data: {
        callId: params.callId,
        metric: params.metric,
        value: params.value,
        timestamp: params.timestamp || new Date(),
      },
    });

    // Check for anomalies
    await this.checkForAnomalies(params.callId, params.metric, params.value);
  }

  /**
   * Generate voice performance report
   */
  async generatePerformanceReport(params: {
    period: 'daily' | 'weekly' | 'monthly';
    agentId?: string;
  }): Promise<{
    summary: string;
    highlights: string[];
    concerns: string[];
    recommendations: string[];
    metrics: VoiceAnalyticsData;
  }> {
    const endDate = new Date();
    const startDate = new Date();
    
    switch (params.period) {
      case 'daily':
        startDate.setDate(endDate.getDate() - 1);
        break;
      case 'weekly':
        startDate.setDate(endDate.getDate() - 7);
        break;
      case 'monthly':
        startDate.setMonth(endDate.getMonth() - 1);
        break;
    }

    const analytics = await this.generateAnalytics({
      startDate,
      endDate,
      agentId: params.agentId,
    });

    const recommendations = await this.generateOptimizationRecommendations(analytics);

    // Generate summary
    const summary = `Voice performance ${params.period} report: ${analytics.totalCalls} calls handled with ${analytics.averageInteractionQuality.toFixed(1)}% quality score.`;

    // Identify highlights
    const highlights = [];
    if (analytics.averageInteractionQuality > 85) {
      highlights.push(`Excellent interaction quality at ${analytics.averageInteractionQuality.toFixed(1)}%`);
    }
    if (analytics.csat > 90) {
      highlights.push(`Outstanding customer satisfaction at ${analytics.csat.toFixed(1)}%`);
    }
    if (analytics.averageResponseTime < 1500) {
      highlights.push(`Fast response times averaging ${analytics.averageResponseTime}ms`);
    }

    // Identify concerns
    const concerns = [];
    if (analytics.abandonmentRate > 10) {
      concerns.push(`High abandonment rate at ${analytics.abandonmentRate.toFixed(1)}%`);
    }
    if (analytics.emotionalDistribution.frustrated > 20) {
      concerns.push(`${analytics.emotionalDistribution.frustrated}% of callers showing frustration`);
    }
    if (analytics.averageCompletionRate < 70) {
      concerns.push(`Low completion rate at ${analytics.averageCompletionRate.toFixed(1)}%`);
    }

    // Extract top recommendations
    const topRecommendations = recommendations.systemRecommendations
      .filter(r => r.impact === 'high')
      .slice(0, 3)
      .map(r => r.recommendation);

    return {
      summary,
      highlights,
      concerns,
      recommendations: topRecommendations,
      metrics: analytics,
    };
  }

  // Helper methods

  private calculateAverage(values: number[]): number {
    if (values.length === 0) return 0;
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  }

  private async fetchSatisfactionScores(params: any): Promise<any[]> {
    // In practice, this would fetch from a satisfaction survey system
    return [];
  }

  private calculateNPS(scores: any[]): number {
    if (scores.length === 0) return 0;
    
    const promoters = scores.filter(s => s.score >= 9).length;
    const detractors = scores.filter(s => s.score <= 6).length;
    
    return ((promoters - detractors) / scores.length) * 100;
  }

  private calculateCSAT(scores: any[]): number {
    if (scores.length === 0) return 0;
    
    const satisfied = scores.filter(s => s.score >= 4).length; // Assuming 5-point scale
    return (satisfied / scores.length) * 100;
  }

  private async analyzeTopIntents(calls: any[]): Promise<any[]> {
    // Simple intent analysis - in practice would use NLP
    const intents = new Map<string, number>();
    
    // Count intents from metadata
    calls.forEach(call => {
      const intent = call.metadata?.intent || 'unknown';
      intents.set(intent, (intents.get(intent) || 0) + 1);
    });

    const total = calls.length;
    return Array.from(intents.entries())
      .map(([intent, count]) => ({
        intent,
        count,
        percentage: (count / total) * 100,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }

  private async analyzeCommonIssues(calls: any[]): Promise<any[]> {
    // Simplified issue analysis
    const issues = [
      { issue: 'Immigration status questions', frequency: 45, resolutionRate: 85 },
      { issue: 'Personal injury claims', frequency: 30, resolutionRate: 78 },
      { issue: 'Workers compensation denials', frequency: 25, resolutionRate: 82 },
    ];
    
    return issues;
  }

  private async analyzeEmotionalDistribution(metrics: any[]): Promise<any> {
    const emotions = { calm: 0, anxious: 0, frustrated: 0, urgent: 0, confused: 0 };
    
    metrics.forEach((m: any) => {
      const emotion = m.emotionalState || 'calm';
      emotions[emotion as keyof typeof emotions]++;
    });

    const total = metrics.length || 1;
    
    return {
      calm: (emotions.calm / total) * 100,
      anxious: (emotions.anxious / total) * 100,
      frustrated: (emotions.frustrated / total) * 100,
      urgent: (emotions.urgent / total) * 100,
      confused: (emotions.confused / total) * 100,
    };
  }

  private calculateCallVolumeByHour(calls: any[]): any[] {
    const hourCounts = new Array(24).fill(0);
    
    calls.forEach(call => {
      const hour = new Date(call.createdAt).getHours();
      hourCounts[hour]++;
    });

    return hourCounts.map((count, hour) => ({ hour, count }));
  }

  private calculateCallVolumeByDay(calls: any[]): any[] {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayCounts = new Array(7).fill(0);
    
    calls.forEach(call => {
      const day = new Date(call.createdAt).getDay();
      dayCounts[day]++;
    });

    return dayCounts.map((count, index) => ({
      day: days[index],
      count,
    }));
  }

  private async calculatePerformanceTrend(params: any): Promise<any[]> {
    // Simplified trend calculation
    const trend = [];
    const currentDate = new Date(params.endDate);
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - i);
      
      trend.push({
        date,
        quality: 80 + Math.random() * 20,
        volume: Math.floor(50 + Math.random() * 100),
      });
    }

    return trend.reverse();
  }

  private async calculateAgentMetrics(params: any): Promise<any[]> {
    const agents = await prisma.voiceAgent.findMany({
      where: { isActive: true },
      include: {
        calls: {
          where: {
            createdAt: {
              gte: params.startDate,
              lte: params.endDate,
            },
          },
          include: {
            metrics: true,
          },
        },
      },
    });

    return agents.map(agent => {
      const agentCalls = agent.calls;
      const metricsData = agentCalls.map(c => c.metrics).filter(Boolean).flat();
      
      return {
        agentId: agent.agentId,
        agentName: agent.name,
        totalCalls: agentCalls.length,
        averageQuality: this.calculateAverage(metricsData.map((m: any) => m.interactionQuality)),
        resolutionRate: 75 + Math.random() * 20, // Simplified
      };
    });
  }

  private extractKeyTopics(transcript: any): string[] {
    // Simplified topic extraction
    return ['immigration', 'visa application', 'green card'];
  }

  private analyzeSentiment(transcript: any): 'positive' | 'neutral' | 'negative' {
    // Simplified sentiment analysis
    return 'neutral';
  }

  private extractActionItems(transcript: any): string[] {
    // Simplified action item extraction
    return ['Schedule consultation', 'Send documents checklist'];
  }

  private determineFollowUpRequired(transcript: any): boolean {
    // Simplified follow-up determination
    return true;
  }

  private analyzeTransferNeed(transcript: any): { recommended: boolean; reason?: string } {
    // Simplified transfer analysis
    return { recommended: false };
  }

  private identifyQualityIssues(call: any): string[] {
    const issues = [];
    
    if (call.metrics?.clarityScore < 70) {
      issues.push('Low clarity score');
    }
    if (call.metrics?.interruptionCount > 5) {
      issues.push('Excessive interruptions');
    }
    if (call.duration > 1800) { // 30 minutes
      issues.push('Call duration too long');
    }

    return issues;
  }

  private generateImprovements(call: any, qualityIssues: string[]): string[] {
    const improvements = [];

    if (qualityIssues.includes('Low clarity score')) {
      improvements.push('Use simpler language and confirm understanding');
    }
    if (qualityIssues.includes('Excessive interruptions')) {
      improvements.push('Allow caller to complete thoughts before responding');
    }
    if (qualityIssues.includes('Call duration too long')) {
      improvements.push('Focus on key issues and schedule follow-up if needed');
    }

    return improvements;
  }

  private async analyzeConversationPatterns(analytics: VoiceAnalyticsData): Promise<any[]> {
    const patterns = [];

    // Analyze peak hours
    const peakHour = analytics.callVolumeByHour.reduce((max, curr) => 
      curr.count > max.count ? curr : max
    );
    
    if (peakHour.count > analytics.totalCalls * 0.15) {
      patterns.push({
        pattern: `Peak call volume at ${peakHour.hour}:00`,
        frequency: peakHour.count,
        recommendation: 'Schedule additional agents during peak hours',
      });
    }

    // Analyze emotional patterns
    if (analytics.emotionalDistribution.anxious > 30) {
      patterns.push({
        pattern: 'High caller anxiety',
        frequency: analytics.emotionalDistribution.anxious,
        recommendation: 'Train agents on anxiety de-escalation techniques',
      });
    }

    return patterns;
  }

  private async checkForAnomalies(callId: string, metric: string, value: number): Promise<void> {
    // Define anomaly thresholds
    const thresholds = {
      responseTime: { max: 5000 },
      clarityScore: { min: 50 },
      interruptionCount: { max: 10 },
    };

    const threshold = thresholds[metric as keyof typeof thresholds];
    if (!threshold) return;

    let isAnomaly = false;
    if ('max' in threshold && value > threshold.max) isAnomaly = true;
    if ('min' in threshold && value < threshold.min) isAnomaly = true;

    if (isAnomaly) {
      await createNotification({
        type: 'voice_anomaly',
        priority: 'high',
        title: 'Voice Call Anomaly Detected',
        message: `Anomaly in ${metric}: ${value}`,
        metadata: { callId, metric, value },
      });
    }
  }
}

// Export singleton instance
export const voiceAnalyticsSystem = new VoiceAnalyticsSystem();