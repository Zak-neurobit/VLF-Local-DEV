/**
 * Automated Alert System
 * Monitors p99 >50ms violations and system health with multi-channel notifications
 */

import { sliTracker, SLIViolation, BusinessSLI } from './sli-tracker';

import { logger } from '@/lib/pino-logger';
// Alert severity levels
export type AlertSeverity = 'critical' | 'warning' | 'info';

// Alert channels
export type AlertChannel = 'email' | 'webhook' | 'slack' | 'sms';

interface AlertRule {
  id: string;
  name: string;
  description: string;
  condition: (context: AlertContext) => boolean;
  severity: AlertSeverity;
  channels: AlertChannel[];
  cooldownMs: number;
  enabled: boolean;
}

interface AlertContext {
  p99Violations: { endpoint: string; p99: number; threshold: number }[];
  recentViolations: SLIViolation[];
  businessSLIs: BusinessSLI[];
  systemMetrics: SystemMetrics;
  healthScore: number;
}

interface SystemMetrics {
  memoryUsagePercent: number;
  cpuUsagePercent: number;
  diskUsagePercent: number;
  errorRatePercent: number;
  activeConnections: number;
}

interface Alert {
  id: string;
  ruleId: string;
  severity: AlertSeverity;
  title: string;
  description: string;
  context: Record<string, any>;
  timestamp: Date;
  resolved?: Date;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
}

interface NotificationChannel {
  type: AlertChannel;
  send(alert: Alert): Promise<boolean>;
}

class AlertSystem {
  private rules: Map<string, AlertRule> = new Map();
  private channels: Map<AlertChannel, NotificationChannel> = new Map();
  private activeAlerts: Map<string, Alert> = new Map();
  private alertHistory: Alert[] = [];
  private lastAlertTime: Map<string, number> = new Map();
  
  constructor() {
    this.initializeDefaultRules();
    this.initializeChannels();
    this.startMonitoring();
  }

  private initializeDefaultRules(): void {
    // Critical p99 latency violations
    this.addRule({
      id: 'p99_critical_violation',
      name: 'P99 Latency Critical Violation',
      description: 'P99 latency exceeds 50ms threshold',
      condition: (context) => {
        return context.p99Violations.some(v => v.p99 > 50);
      },
      severity: 'critical',
      channels: ['email', 'webhook', 'slack'],
      cooldownMs: 300000, // 5 minutes
      enabled: true,
    });

    // P99 warning threshold
    this.addRule({
      id: 'p99_warning_violation',
      name: 'P99 Latency Warning',
      description: 'P99 latency approaching 50ms threshold',
      condition: (context) => {
        return context.p99Violations.some(v => v.p99 > 40 && v.p99 <= 50);
      },
      severity: 'warning',
      channels: ['webhook', 'slack'],
      cooldownMs: 900000, // 15 minutes
      enabled: true,
    });

    // Memory usage alerts
    this.addRule({
      id: 'memory_usage_critical',
      name: 'Memory Usage Critical',
      description: 'Memory usage exceeds 90%',
      condition: (context) => context.systemMetrics.memoryUsagePercent > 90,
      severity: 'critical',
      channels: ['email', 'webhook'],
      cooldownMs: 600000, // 10 minutes
      enabled: true,
    });

    this.addRule({
      id: 'memory_usage_warning',
      name: 'Memory Usage Warning',
      description: 'Memory usage exceeds 80%',
      condition: (context) => context.systemMetrics.memoryUsagePercent > 80,
      severity: 'warning',
      channels: ['webhook'],
      cooldownMs: 1800000, // 30 minutes
      enabled: true,
    });

    // Disk space alerts
    this.addRule({
      id: 'disk_usage_critical',
      name: 'Disk Usage Critical',
      description: 'Disk usage exceeds 95%',
      condition: (context) => context.systemMetrics.diskUsagePercent > 95,
      severity: 'critical',
      channels: ['email', 'webhook', 'sms'],
      cooldownMs: 300000, // 5 minutes
      enabled: true,
    });

    // Error rate alerts
    this.addRule({
      id: 'error_rate_critical',
      name: 'Error Rate Critical',
      description: 'Error rate exceeds 5%',
      condition: (context) => context.systemMetrics.errorRatePercent > 5,
      severity: 'critical',
      channels: ['email', 'webhook', 'slack'],
      cooldownMs: 300000, // 5 minutes
      enabled: true,
    });

    // Health score alerts
    this.addRule({
      id: 'health_score_critical',
      name: 'Health Score Critical',
      description: 'Overall health score below 70',
      condition: (context) => context.healthScore < 70,
      severity: 'critical',
      channels: ['email', 'webhook'],
      cooldownMs: 600000, // 10 minutes
      enabled: true,
    });

    // Business SLI violations
    this.addRule({
      id: 'business_sli_critical',
      name: 'Business SLI Critical',
      description: 'Critical business SLI violation detected',
      condition: (context) => {
        return context.businessSLIs.some(sli => sli.status === 'critical');
      },
      severity: 'critical',
      channels: ['email', 'webhook', 'slack'],
      cooldownMs: 600000, // 10 minutes
      enabled: true,
    });

    // Multiple endpoint violations
    this.addRule({
      id: 'multiple_endpoint_violations',
      name: 'Multiple Endpoint Violations',
      description: 'Multiple endpoints experiencing performance issues',
      condition: (context) => context.p99Violations.length >= 3,
      severity: 'critical',
      channels: ['email', 'webhook', 'slack'],
      cooldownMs: 300000, // 5 minutes
      enabled: true,
    });
  }

  private initializeChannels(): void {
    // Email notification channel
    this.channels.set('email', {
      type: 'email',
      send: async (alert: Alert) => {
        try {
          // Integration with nodemailer or email service
          await this.sendEmailAlert(alert);
          return true;
        } catch (error) {
          logger.error('Failed to send email alert:', error);
          return false;
        }
      },
    });

    // Webhook notification channel
    this.channels.set('webhook', {
      type: 'webhook',
      send: async (alert: Alert) => {
        try {
          await this.sendWebhookAlert(alert);
          return true;
        } catch (error) {
          logger.error('Failed to send webhook alert:', error);
          return false;
        }
      },
    });

    // Slack notification channel
    this.channels.set('slack', {
      type: 'slack',
      send: async (alert: Alert) => {
        try {
          await this.sendSlackAlert(alert);
          return true;
        } catch (error) {
          logger.error('Failed to send Slack alert:', error);
          return false;
        }
      },
    });

    // SMS notification channel (for critical alerts)
    this.channels.set('sms', {
      type: 'sms',
      send: async (alert: Alert) => {
        try {
          await this.sendSMSAlert(alert);
          return true;
        } catch (error) {
          logger.error('Failed to send SMS alert:', error);
          return false;
        }
      },
    });
  }

  /**
   * Add a new alert rule
   */
  public addRule(rule: AlertRule): void {
    this.rules.set(rule.id, rule);
  }

  /**
   * Remove an alert rule
   */
  public removeRule(ruleId: string): void {
    this.rules.delete(ruleId);
  }

  /**
   * Enable/disable an alert rule
   */
  public toggleRule(ruleId: string, enabled: boolean): void {
    const rule = this.rules.get(ruleId);
    if (rule) {
      rule.enabled = enabled;
      this.rules.set(ruleId, rule);
    }
  }

  /**
   * Check all alert conditions and trigger alerts if necessary
   */
  public async checkAlerts(): Promise<void> {
    const context = await this.gatherAlertContext();
    
    for (const [ruleId, rule] of this.rules.entries()) {
      if (!rule.enabled) continue;

      // Check cooldown period
      const lastAlertTime = this.lastAlertTime.get(ruleId) || 0;
      if (Date.now() - lastAlertTime < rule.cooldownMs) continue;

      // Evaluate condition
      try {
        if (rule.condition(context)) {
          await this.triggerAlert(rule, context);
          this.lastAlertTime.set(ruleId, Date.now());
        }
      } catch (error) {
        logger.error(`Error evaluating alert rule ${ruleId}:`, error);
      }
    }
  }

  /**
   * Acknowledge an active alert
   */
  public acknowledgeAlert(alertId: string, acknowledgedBy: string): boolean {
    const alert = this.activeAlerts.get(alertId);
    if (alert && !alert.acknowledgedAt) {
      alert.acknowledgedBy = acknowledgedBy;
      alert.acknowledgedAt = new Date();
      this.activeAlerts.set(alertId, alert);
      return true;
    }
    return false;
  }

  /**
   * Resolve an active alert
   */
  public resolveAlert(alertId: string): boolean {
    const alert = this.activeAlerts.get(alertId);
    if (alert && !alert.resolved) {
      alert.resolved = new Date();
      this.activeAlerts.set(alertId, alert);
      
      // Move to history
      this.alertHistory.push(alert);
      this.activeAlerts.delete(alertId);
      
      return true;
    }
    return false;
  }

  /**
   * Get all active alerts
   */
  public getActiveAlerts(): Alert[] {
    return Array.from(this.activeAlerts.values());
  }

  /**
   * Get alert history
   */
  public getAlertHistory(limit = 100): Alert[] {
    return this.alertHistory.slice(-limit);
  }

  /**
   * Get alert statistics
   */
  public getAlertStats(hours = 24): {
    totalAlerts: number;
    criticalAlerts: number;
    warningAlerts: number;
    averageResolutionTime: number;
    topAlertRules: { ruleId: string; count: number }[];
  } {
    const since = new Date(Date.now() - hours * 60 * 60 * 1000);
    const recentAlerts = this.alertHistory.filter(a => a.timestamp >= since);
    
    const ruleCount = new Map<string, number>();
    let totalResolutionTime = 0;
    let resolvedCount = 0;

    for (const alert of recentAlerts) {
      ruleCount.set(alert.ruleId, (ruleCount.get(alert.ruleId) || 0) + 1);
      
      if (alert.resolved) {
        totalResolutionTime += alert.resolved.getTime() - alert.timestamp.getTime();
        resolvedCount++;
      }
    }

    const topAlertRules = Array.from(ruleCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([ruleId, count]) => ({ ruleId, count }));

    return {
      totalAlerts: recentAlerts.length,
      criticalAlerts: recentAlerts.filter(a => a.severity === 'critical').length,
      warningAlerts: recentAlerts.filter(a => a.severity === 'warning').length,
      averageResolutionTime: resolvedCount > 0 ? totalResolutionTime / resolvedCount : 0,
      topAlertRules,
    };
  }

  // Private methods

  private async gatherAlertContext(): Promise<AlertContext> {
    const p99Check = sliTracker.isP99RequirementMet();
    const recentViolations = sliTracker.getViolations(new Date(Date.now() - 300000)); // Last 5 minutes
    const businessSLIs = sliTracker.getBusinessSLIs();
    const healthScore = sliTracker.getHealthScore();
    
    // Gather system metrics (would integrate with actual system monitoring)
    const systemMetrics = await this.gatherSystemMetrics();

    return {
      p99Violations: p99Check.violations,
      recentViolations,
      businessSLIs,
      systemMetrics,
      healthScore,
    };
  }

  private async gatherSystemMetrics(): Promise<SystemMetrics> {
    // In a real implementation, this would gather actual system metrics
    // For now, return mock data or integrate with system monitoring tools
    
    let memoryUsagePercent = 0;
    let cpuUsagePercent = 0;
    
    if (typeof process !== 'undefined' && process.memoryUsage) {
      const memUsage = process.memoryUsage();
      // Rough estimate - would need more sophisticated calculation
      memoryUsagePercent = (memUsage.heapUsed / memUsage.heapTotal) * 100;
    }

    return {
      memoryUsagePercent,
      cpuUsagePercent,
      diskUsagePercent: 0, // Would need disk monitoring
      errorRatePercent: 0, // Would calculate from error metrics
      activeConnections: 0, // Would get from connection pool
    };
  }

  private async triggerAlert(rule: AlertRule, context: AlertContext): Promise<void> {
    const alert: Alert = {
      id: `${rule.id}_${Date.now()}`,
      ruleId: rule.id,
      severity: rule.severity,
      title: rule.name,
      description: this.buildAlertDescription(rule, context),
      context: this.buildAlertContext(rule, context),
      timestamp: new Date(),
    };

    // Add to active alerts
    this.activeAlerts.set(alert.id, alert);

    // Send notifications
    await this.sendNotifications(alert, rule.channels);

    logger.info(`Alert triggered: ${alert.title} (${alert.severity})`);
  }

  private buildAlertDescription(rule: AlertRule, context: AlertContext): string {
    let description = rule.description;

    if (rule.id === 'p99_critical_violation') {
      const violations = context.p99Violations.filter(v => v.p99 > 50);
      description += `. Affected endpoints: ${violations.map(v => `${v.endpoint} (${v.p99.toFixed(1)}ms)`).join(', ')}`;
    } else if (rule.id === 'multiple_endpoint_violations') {
      description += `. ${context.p99Violations.length} endpoints affected`;
    } else if (rule.id === 'health_score_critical') {
      description += `. Current score: ${context.healthScore}`;
    }

    return description;
  }

  private buildAlertContext(rule: AlertRule, context: AlertContext): Record<string, any> {
    return {
      ruleId: rule.id,
      healthScore: context.healthScore,
      p99ViolationCount: context.p99Violations.length,
      recentViolationCount: context.recentViolations.length,
      systemMetrics: context.systemMetrics,
      timestamp: new Date().toISOString(),
    };
  }

  private async sendNotifications(alert: Alert, channels: AlertChannel[]): Promise<void> {
    const promises = channels.map(async (channelType) => {
      const channel = this.channels.get(channelType);
      if (channel) {
        try {
          await channel.send(alert);
        } catch (error) {
          logger.error(`Failed to send alert via ${channelType}:`, error);
        }
      }
    });

    await Promise.allSettled(promises);
  }

  // Notification implementations

  private async sendEmailAlert(alert: Alert): Promise<void> {
    // Integrate with nodemailer or email service
    const emailConfig = {
      to: process.env.ALERT_EMAIL_RECIPIENTS?.split(',') || ['admin@vasquezlaw.com'],
      subject: `🚨 ${alert.severity.toUpperCase()}: ${alert.title}`,
      html: this.buildEmailHTML(alert),
    };

    // Would send email here
    logger.info('Email alert:', emailConfig);
  }

  private async sendWebhookAlert(alert: Alert): Promise<void> {
    const webhookUrl = process.env.ALERT_WEBHOOK_URL;
    if (!webhookUrl) return;

    const payload = {
      alert_id: alert.id,
      severity: alert.severity,
      title: alert.title,
      description: alert.description,
      timestamp: alert.timestamp.toISOString(),
      context: alert.context,
    };

    // Would send HTTP POST request here
    logger.info('Webhook alert:', payload);
  }

  private async sendSlackAlert(alert: Alert): Promise<void> {
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (!slackWebhookUrl) return;

    const color = {
      critical: '#FF0000',
      warning: '#FFA500',
      info: '#0000FF',
    }[alert.severity];

    const payload = {
      username: 'VLF Performance Monitor',
      icon_emoji: ':warning:',
      attachments: [{
        color,
        title: alert.title,
        text: alert.description,
        fields: [
          {
            title: 'Severity',
            value: alert.severity.toUpperCase(),
            short: true,
          },
          {
            title: 'Time',
            value: alert.timestamp.toISOString(),
            short: true,
          },
        ],
        footer: 'VLF Performance Monitor',
        ts: Math.floor(alert.timestamp.getTime() / 1000),
      }],
    };

    // Would send to Slack webhook here
    logger.info('Slack alert:', payload);
  }

  private async sendSMSAlert(alert: Alert): Promise<void> {
    const smsNumbers = process.env.ALERT_SMS_NUMBERS?.split(',') || [];
    if (smsNumbers.length === 0) return;

    const message = `VLF ALERT: ${alert.severity.toUpperCase()} - ${alert.title}. ${alert.description}`;

    // Would integrate with Twilio or SMS service here
    logger.info('SMS alert:', { numbers: smsNumbers, message });
  }

  private buildEmailHTML(alert: Alert): string {
    return `
      <html>
        <body style="font-family: Arial, sans-serif; margin: 20px;">
          <div style="background-color: ${alert.severity === 'critical' ? '#ffebee' : '#fff3e0'}; padding: 20px; border-radius: 5px;">
            <h2 style="color: ${alert.severity === 'critical' ? '#c62828' : '#f57c00'}; margin-top: 0;">
              🚨 ${alert.severity.toUpperCase()} ALERT
            </h2>
            <h3>${alert.title}</h3>
            <p><strong>Description:</strong> ${alert.description}</p>
            <p><strong>Time:</strong> ${alert.timestamp.toISOString()}</p>
            <p><strong>Alert ID:</strong> ${alert.id}</p>
            
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 3px; margin-top: 20px;">
              <h4>Context:</h4>
              <pre>${JSON.stringify(alert.context, null, 2)}</pre>
            </div>
            
            <p style="margin-top: 20px; color: #666;">
              This alert was generated by the VLF Performance Monitoring System.
            </p>
          </div>
        </body>
      </html>
    `;
  }

  private startMonitoring(): void {
    // Check alerts every 30 seconds
    setInterval(async () => {
      await this.checkAlerts();
    }, 30000);
  }
}

// Singleton instance
export const alertSystem = new AlertSystem();

// Convenience functions
export function triggerManualAlert(
  title: string,
  description: string,
  severity: AlertSeverity = 'warning',
  channels: AlertChannel[] = ['webhook']
): void {
  const rule: AlertRule = {
    id: `manual_${Date.now()}`,
    name: title,
    description,
    condition: () => true,
    severity,
    channels,
    cooldownMs: 0,
    enabled: true,
  };

  alertSystem.addRule(rule);
}

// Export types
export type { Alert, AlertRule, AlertContext, SystemMetrics };