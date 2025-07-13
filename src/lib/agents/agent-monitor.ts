import { logger } from '@/lib/logger';
import { EventEmitter } from 'events';
import { prisma } from '@/lib/prisma';

export interface AgentMetrics {
  agentName: string;
  timestamp: Date;
  requestCount: number;
  successCount: number;
  errorCount: number;
  averageResponseTime: number;
  cpuUsage: number;
  memoryUsage: number;
  activeConnections: number;
  queueSize: number;
}

export interface AgentHealthStatus {
  agentName: string;
  isHealthy: boolean;
  lastHealthCheck: Date;
  healthScore: number; // 0-100
  issues: string[];
  responseTime: number;
  consecutiveFailures: number;
}

export interface AutoScalingConfig {
  minInstances: number;
  maxInstances: number;
  targetCPU: number;
  scaleUpThreshold: number;
  scaleDownThreshold: number;
  cooldownPeriod: number; // in seconds
}

export interface LoadBalancingConfig {
  algorithm: 'round-robin' | 'weighted-round-robin' | 'least-connections' | 'response-time';
  healthCheckInterval: number;
  failoverEnabled: boolean;
  weights?: Record<string, number>;
}

export interface ErrorRecoveryConfig {
  maxRetries: number;
  retryDelay: number;
  circuitBreakerThreshold: number;
  recoveryTimeout: number;
}

export interface AgentInstance {
  id: string;
  agentName: string;
  status: 'active' | 'inactive' | 'failed' | 'scaling';
  weight: number;
  currentLoad: number;
  lastActivity: Date;
  healthStatus: AgentHealthStatus;
}

export class AgentMonitor extends EventEmitter {
  private static instance: AgentMonitor;
  private agents: Map<string, AgentInstance[]> = new Map();
  private metrics: Map<string, AgentMetrics[]> = new Map();
  private healthStatus: Map<string, AgentHealthStatus> = new Map();
  private autoScalingConfigs: Map<string, AutoScalingConfig> = new Map();
  private loadBalancingConfig: LoadBalancingConfig = {
    algorithm: 'weighted-round-robin',
    healthCheckInterval: 10000,
    failoverEnabled: true,
  };
  private errorRecoveryConfig: ErrorRecoveryConfig = {
    maxRetries: 3,
    retryDelay: 5000,
    circuitBreakerThreshold: 5,
    recoveryTimeout: 60000,
  };
  private circuitBreakers: Map<string, { failures: number; lastFailure: Date; isOpen: boolean }> =
    new Map();
  private monitoringEnabled: boolean = false;
  private monitoringInterval?: NodeJS.Timeout;

  private constructor() {
    super();
    this.setupEventListeners();
  }

  static getInstance(): AgentMonitor {
    if (!AgentMonitor.instance) {
      AgentMonitor.instance = new AgentMonitor();
    }
    return AgentMonitor.instance;
  }

  private setupEventListeners() {
    this.on('agent-health-changed', this.handleHealthChange.bind(this));
    this.on('agent-overloaded', this.handleOverload.bind(this));
    this.on('agent-failed', this.handleFailure.bind(this));
    this.on('scaling-needed', this.handleScalingEvent.bind(this));
  }

  // Real-time agent performance tracking
  async startMonitoring(config: {
    agents: string[];
    interval: number;
    metrics: string[];
  }): Promise<void> {
    this.monitoringEnabled = true;

    logger.info('Starting agent monitoring...', {
      agents: config.agents,
      interval: config.interval,
      metrics: config.metrics,
    });

    // Initialize agents
    for (const agentName of config.agents) {
      if (!this.agents.has(agentName)) {
        this.agents.set(agentName, []);
      }

      // Create initial instance
      const instance: AgentInstance = {
        id: `${agentName}-${Date.now()}`,
        agentName,
        status: 'active',
        weight: 1,
        currentLoad: 0,
        lastActivity: new Date(),
        healthStatus: {
          agentName,
          isHealthy: true,
          lastHealthCheck: new Date(),
          healthScore: 100,
          issues: [],
          responseTime: 0,
          consecutiveFailures: 0,
        },
      };

      this.agents.get(agentName)!.push(instance);
      this.healthStatus.set(agentName, instance.healthStatus);
    }

    // Start monitoring loop
    this.monitoringInterval = setInterval(async () => {
      await this.collectMetrics(config.agents);
      await this.performHealthChecks(config.agents);
      await this.checkScalingRequirements();
      await this.balanceLoad();
    }, config.interval);

    this.emit('monitoring-started', { agents: config.agents });
  }

  async stopMonitoring(): Promise<void> {
    this.monitoringEnabled = false;

    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = undefined;
    }

    logger.info('Agent monitoring stopped');
    this.emit('monitoring-stopped');
  }

  private async collectMetrics(agents: string[]): Promise<void> {
    for (const agentName of agents) {
      const instances = this.agents.get(agentName) || [];

      for (const instance of instances) {
        const metrics = await this.gatherInstanceMetrics(instance);

        // Store metrics
        if (!this.metrics.has(agentName)) {
          this.metrics.set(agentName, []);
        }

        this.metrics.get(agentName)!.push(metrics);

        // Keep only last 1000 metrics per agent
        const agentMetrics = this.metrics.get(agentName)!;
        if (agentMetrics.length > 1000) {
          agentMetrics.splice(0, agentMetrics.length - 1000);
        }

        // Update instance load
        instance.currentLoad = this.calculateInstanceLoad(metrics);
        instance.lastActivity = new Date();
      }
    }
  }

  private async gatherInstanceMetrics(instance: AgentInstance): Promise<AgentMetrics> {
    // Simulate metrics collection (in production, this would gather real metrics)
    const baseMetrics = {
      agentName: instance.agentName,
      timestamp: new Date(),
      requestCount: Math.floor(Math.random() * 100) + 50,
      successCount: Math.floor(Math.random() * 95) + 45,
      errorCount: Math.floor(Math.random() * 5),
      averageResponseTime: Math.floor(Math.random() * 1000) + 200,
      cpuUsage: Math.floor(Math.random() * 80) + 10,
      memoryUsage: Math.floor(Math.random() * 70) + 20,
      activeConnections: Math.floor(Math.random() * 50) + 10,
      queueSize: Math.floor(Math.random() * 20),
    };

    // Emit metrics event
    this.emit('metrics-collected', { instance: instance.id, metrics: baseMetrics });

    return baseMetrics;
  }

  private calculateInstanceLoad(metrics: AgentMetrics): number {
    // Calculate load based on multiple factors
    const cpuWeight = 0.4;
    const memoryWeight = 0.3;
    const responseTimeWeight = 0.2;
    const errorWeight = 0.1;

    const cpuLoad = metrics.cpuUsage / 100;
    const memoryLoad = metrics.memoryUsage / 100;
    const responseTimeLoad = Math.min(metrics.averageResponseTime / 5000, 1); // 5s max
    const errorLoad = metrics.errorCount / Math.max(metrics.requestCount, 1);

    return (
      cpuLoad * cpuWeight +
      memoryLoad * memoryWeight +
      responseTimeLoad * responseTimeWeight +
      errorLoad * errorWeight
    );
  }

  private async performHealthChecks(agents: string[]): Promise<void> {
    for (const agentName of agents) {
      const instances = this.agents.get(agentName) || [];

      for (const instance of instances) {
        const healthStatus = await this.checkInstanceHealth(instance);
        instance.healthStatus = healthStatus;
        this.healthStatus.set(agentName, healthStatus);

        if (!healthStatus.isHealthy) {
          this.emit('agent-health-changed', {
            agentName,
            instanceId: instance.id,
            status: healthStatus,
          });
        }
      }
    }
  }

  async checkAgentHealth(agentName: string): Promise<boolean> {
    const status = this.healthStatus.get(agentName);
    if (!status) return false;

    return status.isHealthy;
  }

  private async checkInstanceHealth(instance: AgentInstance): Promise<AgentHealthStatus> {
    const startTime = Date.now();

    try {
      // Simulate health check (in production, this would be an actual health check)
      const isHealthy = Math.random() > 0.05; // 95% health rate
      const responseTime = Date.now() - startTime;

      const healthStatus: AgentHealthStatus = {
        agentName: instance.agentName,
        isHealthy,
        lastHealthCheck: new Date(),
        healthScore: isHealthy ? 100 : Math.floor(Math.random() * 50),
        issues: isHealthy ? [] : ['Simulated health check failure'],
        responseTime,
        consecutiveFailures: isHealthy ? 0 : (instance.healthStatus.consecutiveFailures || 0) + 1,
      };

      // Update circuit breaker
      this.updateCircuitBreaker(instance.agentName, !isHealthy);

      return healthStatus;
    } catch (error) {
      logger.error(`Health check failed for ${instance.agentName}:`, error);

      return {
        agentName: instance.agentName,
        isHealthy: false,
        lastHealthCheck: new Date(),
        healthScore: 0,
        issues: [error instanceof Error ? error.message : 'Unknown error'],
        responseTime: Date.now() - startTime,
        consecutiveFailures: (instance.healthStatus.consecutiveFailures || 0) + 1,
      };
    }
  }

  private updateCircuitBreaker(agentName: string, hasFailed: boolean): void {
    let breaker = this.circuitBreakers.get(agentName);

    if (!breaker) {
      breaker = { failures: 0, lastFailure: new Date(), isOpen: false };
      this.circuitBreakers.set(agentName, breaker);
    }

    if (hasFailed) {
      breaker.failures++;
      breaker.lastFailure = new Date();

      if (breaker.failures >= this.errorRecoveryConfig.circuitBreakerThreshold) {
        breaker.isOpen = true;
        this.emit('circuit-breaker-opened', { agentName, failures: breaker.failures });
      }
    } else {
      // Reset on successful health check
      breaker.failures = 0;
      if (breaker.isOpen) {
        breaker.isOpen = false;
        this.emit('circuit-breaker-closed', { agentName });
      }
    }
  }

  // Auto-scaling configuration
  async configureAutoScaling(agentName: string, config: AutoScalingConfig): Promise<void> {
    this.autoScalingConfigs.set(agentName, config);
    logger.info(`Auto-scaling configured for ${agentName}:`, config);
    this.emit('auto-scaling-configured', { agentName, config });
  }

  private async checkScalingRequirements(): Promise<void> {
    for (const [agentName, config] of this.autoScalingConfigs) {
      const instances = this.agents.get(agentName) || [];
      const activeInstances = instances.filter(i => i.status === 'active');

      if (activeInstances.length === 0) continue;

      const avgCpuUsage = this.calculateAverageCPU(agentName);
      const avgLoad =
        activeInstances.reduce((sum, i) => sum + i.currentLoad, 0) / activeInstances.length;

      // Scale up if needed
      if (avgCpuUsage > config.scaleUpThreshold && activeInstances.length < config.maxInstances) {
        await this.scaleUp(agentName);
      }

      // Scale down if needed
      if (avgCpuUsage < config.scaleDownThreshold && activeInstances.length > config.minInstances) {
        await this.scaleDown(agentName);
      }
    }
  }

  private async scaleUp(agentName: string): Promise<void> {
    const instances = this.agents.get(agentName) || [];
    const newInstance: AgentInstance = {
      id: `${agentName}-${Date.now()}`,
      agentName,
      status: 'scaling',
      weight: 1,
      currentLoad: 0,
      lastActivity: new Date(),
      healthStatus: {
        agentName,
        isHealthy: true,
        lastHealthCheck: new Date(),
        healthScore: 100,
        issues: [],
        responseTime: 0,
        consecutiveFailures: 0,
      },
    };

    instances.push(newInstance);

    // Simulate scaling process
    setTimeout(() => {
      newInstance.status = 'active';
      this.emit('agent-scaled-up', { agentName, instanceId: newInstance.id });
    }, 5000);

    logger.info(`Scaling up ${agentName} - new instance: ${newInstance.id}`);
  }

  private async scaleDown(agentName: string): Promise<void> {
    const instances = this.agents.get(agentName) || [];
    const activeInstances = instances.filter(i => i.status === 'active');

    if (activeInstances.length <= 1) return;

    // Remove instance with lowest load
    const instanceToRemove = activeInstances.reduce((min, instance) =>
      instance.currentLoad < min.currentLoad ? instance : min
    );

    instanceToRemove.status = 'inactive';

    setTimeout(() => {
      const index = instances.indexOf(instanceToRemove);
      if (index > -1) {
        instances.splice(index, 1);
      }
      this.emit('agent-scaled-down', { agentName, instanceId: instanceToRemove.id });
    }, 10000);

    logger.info(`Scaling down ${agentName} - removing instance: ${instanceToRemove.id}`);
  }

  private calculateAverageCPU(agentName: string): number {
    const recentMetrics = this.metrics.get(agentName)?.slice(-10) || [];
    if (recentMetrics.length === 0) return 0;

    return recentMetrics.reduce((sum, m) => sum + m.cpuUsage, 0) / recentMetrics.length;
  }

  // Load balancing
  async enableLoadBalancing(config: LoadBalancingConfig): Promise<void> {
    this.loadBalancingConfig = config;
    logger.info('Load balancing enabled:', config);
    this.emit('load-balancing-enabled', config);
  }

  private async balanceLoad(): Promise<void> {
    for (const [agentName, instances] of this.agents) {
      const activeInstances = instances.filter(
        i => i.status === 'active' && i.healthStatus.isHealthy
      );

      if (activeInstances.length <= 1) continue;

      // Update weights based on performance
      this.updateInstanceWeights(activeInstances);
    }
  }

  private updateInstanceWeights(instances: AgentInstance[]): void {
    const totalLoad = instances.reduce((sum, i) => sum + i.currentLoad, 0);

    if (totalLoad === 0) return;

    instances.forEach(instance => {
      // Higher weight for lower load (inverse relationship)
      instance.weight = Math.max(0.1, 1 - instance.currentLoad / totalLoad);
    });
  }

  // Error detection and recovery
  async configureErrorRecovery(config: ErrorRecoveryConfig): Promise<void> {
    this.errorRecoveryConfig = config;
    logger.info('Error recovery configured:', config);
    this.emit('error-recovery-configured', config);
  }

  private async handleHealthChange(event: any): Promise<void> {
    const { agentName, instanceId, status } = event;

    if (!status.isHealthy) {
      logger.warn(`Agent ${agentName} (${instanceId}) is unhealthy:`, status.issues);

      // Attempt recovery
      await this.attemptRecovery(agentName, instanceId);
    }
  }

  private async handleOverload(event: any): Promise<void> {
    const { agentName, instanceId, load } = event;
    logger.warn(`Agent ${agentName} (${instanceId}) is overloaded: ${load}`);

    // Trigger scaling if configured
    if (this.autoScalingConfigs.has(agentName)) {
      this.emit('scaling-needed', { agentName, reason: 'overload' });
    }
  }

  private async handleFailure(event: any): Promise<void> {
    const { agentName, instanceId, error } = event;
    logger.error(`Agent ${agentName} (${instanceId}) failed:`, error);

    // Mark instance as failed
    const instances = this.agents.get(agentName) || [];
    const failedInstance = instances.find(i => i.id === instanceId);

    if (failedInstance) {
      failedInstance.status = 'failed';

      // Attempt recovery
      await this.attemptRecovery(agentName, instanceId);
    }
  }

  private async handleScalingEvent(event: any): Promise<void> {
    const { agentName, reason } = event;
    logger.info(`Scaling event triggered for ${agentName}: ${reason}`);

    // Trigger appropriate scaling action
    if (reason === 'overload') {
      await this.scaleUp(agentName);
    }
  }

  private async attemptRecovery(agentName: string, instanceId: string): Promise<void> {
    const instances = this.agents.get(agentName) || [];
    const instance = instances.find(i => i.id === instanceId);

    if (!instance) return;

    logger.info(`Attempting recovery for ${agentName} (${instanceId})`);

    // Simulate recovery process
    setTimeout(() => {
      instance.status = 'active';
      instance.healthStatus.isHealthy = true;
      instance.healthStatus.consecutiveFailures = 0;
      instance.healthStatus.issues = [];

      this.emit('agent-recovered', { agentName, instanceId });
      logger.info(`Agent ${agentName} (${instanceId}) recovered successfully`);
    }, this.errorRecoveryConfig.recoveryTimeout);
  }

  // Public API methods
  async stopMonitoringAgent(agentName: string): Promise<void> {
    const instances = this.agents.get(agentName) || [];
    instances.forEach(instance => {
      instance.status = 'inactive';
    });

    this.agents.delete(agentName);
    this.metrics.delete(agentName);
    this.healthStatus.delete(agentName);
    this.autoScalingConfigs.delete(agentName);
    this.circuitBreakers.delete(agentName);

    logger.info(`Stopped monitoring agent: ${agentName}`);
    this.emit('agent-monitoring-stopped', { agentName });
  }

  async getAgentMetrics(agentName: string): Promise<AgentMetrics[]> {
    return this.metrics.get(agentName) || [];
  }

  async getAgentHealthStatus(agentName: string): Promise<AgentHealthStatus | null> {
    return this.healthStatus.get(agentName) || null;
  }

  async getAgentInstances(agentName: string): Promise<AgentInstance[]> {
    return this.agents.get(agentName) || [];
  }

  async getAllAgentStatuses(): Promise<Record<string, AgentHealthStatus | null>> {
    const statuses: Record<string, AgentHealthStatus | null> = {};

    for (const [agentName, status] of this.healthStatus) {
      statuses[agentName] = status;
    }

    return statuses;
  }

  async getSystemMetrics(): Promise<{
    totalAgents: number;
    activeInstances: number;
    healthyAgents: number;
    overallHealth: number;
    averageResponseTime: number;
    totalRequests: number;
    totalErrors: number;
  }> {
    const allInstances = Array.from(this.agents.values()).flat();
    const activeInstances = allInstances.filter(i => i.status === 'active');
    const healthyAgents = Array.from(this.healthStatus.values()).filter(s => s.isHealthy);

    const recentMetrics = Array.from(this.metrics.values())
      .flat()
      .filter(m => Date.now() - m.timestamp.getTime() < 300000); // Last 5 minutes

    return {
      totalAgents: this.agents.size,
      activeInstances: activeInstances.length,
      healthyAgents: healthyAgents.length,
      overallHealth: this.agents.size > 0 ? (healthyAgents.length / this.agents.size) * 100 : 0,
      averageResponseTime:
        recentMetrics.length > 0
          ? recentMetrics.reduce((sum, m) => sum + m.averageResponseTime, 0) / recentMetrics.length
          : 0,
      totalRequests: recentMetrics.reduce((sum, m) => sum + m.requestCount, 0),
      totalErrors: recentMetrics.reduce((sum, m) => sum + m.errorCount, 0),
    };
  }

  // Performance monitoring
  async enablePerformanceTracking(config: {
    metricsInterval: number;
    alertThresholds: {
      responseTime: number;
      errorRate: number;
      memoryUsage: number;
    };
  }): Promise<void> {
    logger.info('Performance tracking enabled:', config);

    // Start performance monitoring
    setInterval(async () => {
      const metrics = await this.getSystemMetrics();

      // Check thresholds and emit alerts
      if (metrics.averageResponseTime > config.alertThresholds.responseTime) {
        this.emit('performance-alert', {
          type: 'high-response-time',
          value: metrics.averageResponseTime,
          threshold: config.alertThresholds.responseTime,
        });
      }

      if (metrics.totalRequests > 0) {
        const errorRate = metrics.totalErrors / metrics.totalRequests;
        if (errorRate > config.alertThresholds.errorRate) {
          this.emit('performance-alert', {
            type: 'high-error-rate',
            value: errorRate,
            threshold: config.alertThresholds.errorRate,
          });
        }
      }
    }, config.metricsInterval * 1000);

    this.emit('performance-tracking-enabled', config);
  }
}
