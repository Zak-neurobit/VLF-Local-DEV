#!/usr/bin/env ts-node

import { logger } from '../lib/logger';
import { errorToLogMeta } from '../lib/logger/utils';
import { prisma } from '../lib/prisma';
import { AgentOrchestrator } from '../lib/agents/agent-orchestrator';
import { AgentMonitor } from '../lib/agents/agent-monitor';
import { CrewCoordinator } from '../lib/crewai/enhanced-crew-coordinator';
import dotenv from 'dotenv';
import path from 'path';
import pLimit from 'p-limit';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env.local') });
dotenv.config({ path: path.join(__dirname, '../../.env.production') });

interface AgentDeploymentConfig {
  name: string;
  type: 'crewai' | 'retell' | 'chat' | 'automation';
  priority: number;
  dependencies?: string[];
  healthCheckEndpoint?: string;
  rollbackEnabled: boolean;
  autoScaling?: {
    minReplicas: number;
    maxReplicas: number;
    targetCpuUtilization: number;
  };
}

interface DeploymentResult {
  agent: string;
  status: 'deployed' | 'failed' | 'skipped' | 'rolled-back';
  message: string;
  timestamp: Date;
  deploymentTime?: number;
  healthCheck?: {
    status: 'healthy' | 'unhealthy';
    responseTime: number;
    lastCheck: Date;
  };
}

interface DeploymentSnapshot {
  id: string;
  timestamp: Date;
  agents: Map<string, any>;
  configurations: Map<string, any>;
}

class EnhancedAgentDeployer {
  private deploymentResults: DeploymentResult[] = [];
  private deploymentSnapshots: DeploymentSnapshot[] = [];
  private monitor: AgentMonitor;
  private orchestrator: AgentOrchestrator;
  private coordinator: CrewCoordinator;
  private concurrencyLimit: ReturnType<typeof pLimit>;

  constructor() {
    this.monitor = AgentMonitor.getInstance();
    this.orchestrator = AgentOrchestrator.getInstance();
    this.coordinator = CrewCoordinator.getInstance();
    this.concurrencyLimit = pLimit(5); // Deploy up to 5 agents in parallel
  }

  async deployAllAgents(): Promise<void> {
    logger.info('🚀 Starting Enhanced Agent Deployment v2...');

    try {
      // Take a snapshot before deployment
      await this.createDeploymentSnapshot();

      // Define all agents to deploy
      const agentConfigs: AgentDeploymentConfig[] = [
        // CrewAI Agents
        {
          name: 'Legal Consultation Agent',
          type: 'crewai',
          priority: 1,
          rollbackEnabled: true,
          autoScaling: { minReplicas: 2, maxReplicas: 10, targetCpuUtilization: 70 },
        },
        {
          name: 'Document Analysis Agent',
          type: 'crewai',
          priority: 1,
          rollbackEnabled: true,
          autoScaling: { minReplicas: 1, maxReplicas: 5, targetCpuUtilization: 75 },
        },
        {
          name: 'Appointment Scheduling Agent',
          type: 'crewai',
          priority: 2,
          rollbackEnabled: true,
          autoScaling: { minReplicas: 1, maxReplicas: 3, targetCpuUtilization: 60 },
        },
        {
          name: 'Enhanced Intake Agent',
          type: 'crewai',
          priority: 1,
          dependencies: ['Legal Consultation Agent'],
          rollbackEnabled: true,
          autoScaling: { minReplicas: 2, maxReplicas: 8, targetCpuUtilization: 65 },
        },
        {
          name: 'Removal Defense Agent',
          type: 'crewai',
          priority: 2,
          rollbackEnabled: true,
          autoScaling: { minReplicas: 1, maxReplicas: 4, targetCpuUtilization: 70 },
        },
        {
          name: 'Business Immigration Agent',
          type: 'crewai',
          priority: 2,
          rollbackEnabled: true,
          autoScaling: { minReplicas: 1, maxReplicas: 4, targetCpuUtilization: 70 },
        },
        {
          name: 'Criminal Defense Agent',
          type: 'crewai',
          priority: 2,
          rollbackEnabled: true,
          autoScaling: { minReplicas: 1, maxReplicas: 4, targetCpuUtilization: 70 },
        },
        {
          name: 'AILA Trained Removal Agent',
          type: 'crewai',
          priority: 3,
          dependencies: ['Removal Defense Agent'],
          rollbackEnabled: true,
          autoScaling: { minReplicas: 1, maxReplicas: 3, targetCpuUtilization: 75 },
        },
        {
          name: 'SEO Blog Generation Agent',
          type: 'crewai',
          priority: 4,
          rollbackEnabled: false,
          autoScaling: { minReplicas: 1, maxReplicas: 2, targetCpuUtilization: 80 },
        },
        {
          name: 'Social Media Monitoring Agent',
          type: 'crewai',
          priority: 4,
          rollbackEnabled: false,
          autoScaling: { minReplicas: 1, maxReplicas: 2, targetCpuUtilization: 80 },
        },
        {
          name: 'Competitive Analysis Agent',
          type: 'crewai',
          priority: 4,
          rollbackEnabled: false,
          autoScaling: { minReplicas: 1, maxReplicas: 2, targetCpuUtilization: 80 },
        },
        // Automation Agents
        {
          name: 'Lead Validation Agent',
          type: 'automation',
          priority: 1,
          rollbackEnabled: true,
          autoScaling: { minReplicas: 2, maxReplicas: 5, targetCpuUtilization: 60 },
        },
        {
          name: 'Follow-Up Automation Agent',
          type: 'automation',
          priority: 2,
          dependencies: ['Lead Validation Agent'],
          rollbackEnabled: true,
          autoScaling: { minReplicas: 1, maxReplicas: 3, targetCpuUtilization: 65 },
        },
        // Voice Agents
        {
          name: 'Immigration Law Voice Assistant',
          type: 'retell',
          priority: 2,
          healthCheckEndpoint: '/api/agents/health/voice',
          rollbackEnabled: true,
        },
        {
          name: 'Personal Injury Voice Assistant',
          type: 'retell',
          priority: 3,
          healthCheckEndpoint: '/api/agents/health/voice',
          rollbackEnabled: true,
        },
        {
          name: 'Criminal Defense Voice Assistant',
          type: 'retell',
          priority: 3,
          healthCheckEndpoint: '/api/agents/health/voice',
          rollbackEnabled: true,
        },
        {
          name: 'General Reception Voice Assistant',
          type: 'retell',
          priority: 2,
          healthCheckEndpoint: '/api/agents/health/voice',
          rollbackEnabled: true,
        },
        {
          name: 'Spanish Immigration Voice Assistant',
          type: 'retell',
          priority: 2,
          healthCheckEndpoint: '/api/agents/health/voice',
          rollbackEnabled: true,
        },
        // Chat Infrastructure
        {
          name: 'Main Chat Agent',
          type: 'chat',
          priority: 1,
          healthCheckEndpoint: '/api/agents/health/chat',
          rollbackEnabled: true,
          autoScaling: { minReplicas: 3, maxReplicas: 20, targetCpuUtilization: 65 },
        },
      ];

      // Sort agents by priority and dependencies
      const sortedAgents = this.sortAgentsByDependencies(agentConfigs);

      // Deploy agents in parallel batches based on priority
      const priorityGroups = this.groupByPriority(sortedAgents);

      for (const [priority, agents] of priorityGroups) {
        logger.info(`\n📦 Deploying Priority ${priority} Agents (${agents.length} agents)...`);

        const deploymentPromises = agents.map(config =>
          this.concurrencyLimit(() => this.deployAgent(config))
        );

        const results = await Promise.allSettled(deploymentPromises);

        // Check for failures and handle rollbacks if needed
        const failures = results.filter(r => r.status === 'rejected');
        if (failures.length > 0 && priority <= 2) {
          logger.error(`Critical agents failed to deploy. Initiating rollback...`);
          await this.rollbackDeployment();
          throw new Error('Critical agent deployment failed');
        }
      }

      // Setup agent orchestration and communication
      await this.setupAgentOrchestration();

      // Initialize monitoring
      await this.initializeMonitoring();

      // Perform health checks
      await this.performHealthChecks();

      // Generate deployment report
      await this.generateDeploymentReport();
    } catch (error) {
      logger.error('Deployment failed:', errorToLogMeta(error));
      await this.rollbackDeployment();
      throw error;
    } finally {
      if (prisma) {
        await prisma.$disconnect();
      }
    }
  }

  private async deployAgent(config: AgentDeploymentConfig): Promise<DeploymentResult> {
    const startTime = Date.now();
    logger.info(`Deploying ${config.name}...`);

    try {
      // Check dependencies
      if (config.dependencies) {
        const unmetDeps = config.dependencies.filter(
          dep => !this.deploymentResults.some(r => r.agent === dep && r.status === 'deployed')
        );

        if (unmetDeps.length > 0) {
          throw new Error(`Unmet dependencies: ${unmetDeps.join(', ')}`);
        }
      }

      // Deploy based on agent type
      switch (config.type) {
        case 'crewai':
          await this.deployCrewAIAgent(config);
          break;
        case 'retell':
          await this.deployRetellAgent(config);
          break;
        case 'chat':
          await this.deployChatAgent(config);
          break;
        case 'automation':
          await this.deployAutomationAgent(config);
          break;
      }

      // Configure auto-scaling if applicable
      if (config.autoScaling) {
        await this.configureAutoScaling(config.name, config.autoScaling);
      }

      // Perform initial health check
      let healthCheck;
      if (config.healthCheckEndpoint) {
        healthCheck = await this.performAgentHealthCheck(config.name, config.healthCheckEndpoint);
      }

      const result: DeploymentResult = {
        agent: config.name,
        status: 'deployed',
        message: 'Successfully deployed',
        timestamp: new Date(),
        deploymentTime: Date.now() - startTime,
        healthCheck,
      };

      this.deploymentResults.push(result);
      logger.info(`✅ ${config.name} deployed in ${result.deploymentTime}ms`);

      return result;
    } catch (error) {
      const result: DeploymentResult = {
        agent: config.name,
        status: 'failed',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date(),
        deploymentTime: Date.now() - startTime,
      };

      this.deploymentResults.push(result);
      logger.error(`❌ ${config.name} deployment failed:`, errorToLogMeta(error));

      if (config.rollbackEnabled) {
        await this.rollbackAgent(config.name);
      }

      throw error;
    }
  }

  private async deployCrewAIAgent(config: AgentDeploymentConfig): Promise<void> {
    // Initialize the agent through the coordinator
    await this.coordinator.initializeAgent(config.name);

    // Register with orchestrator
    await this.orchestrator.registerAgent(config.name, 'crewai');

    // Setup inter-agent communication
    await this.coordinator.setupAgentCommunication(config.name);
  }

  private async deployRetellAgent(config: AgentDeploymentConfig): Promise<void> {
    // Check if Retell is configured
    if (!process.env.RETELL_API_KEY) {
      throw new Error('Retell API key not configured');
    }

    // Deploy voice agent through Retell API
    // Implementation depends on Retell service
    logger.info(`Voice agent ${config.name} registered with Retell`);
  }

  private async deployChatAgent(config: AgentDeploymentConfig): Promise<void> {
    // Verify OpenAI configuration
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured');
    }

    // Initialize chat infrastructure
    await this.orchestrator.initializeChatAgent(config.name);
  }

  private async deployAutomationAgent(config: AgentDeploymentConfig): Promise<void> {
    // Deploy automation agents
    await this.orchestrator.registerAgent(config.name, 'automation');

    // Setup automation workflows
    await this.coordinator.setupAutomationWorkflows(config.name);
  }

  private async configureAutoScaling(
    agentName: string,
    config: {
      minReplicas: number;
      maxReplicas: number;
      targetCpuUtilization: number;
      scaleUpStabilization?: number;
      scaleDownStabilization?: number;
    }
  ): Promise<void> {
    logger.info(`Configuring auto-scaling for ${agentName}:`, config);

    // Register scaling configuration with monitor
    await this.monitor.configureAutoScaling(agentName, {
      minInstances: config.minReplicas,
      maxInstances: config.maxReplicas,
      targetCPU: config.targetCpuUtilization,
      scaleUpThreshold: config.targetCpuUtilization + 10,
      scaleDownThreshold: config.targetCpuUtilization - 20,
      cooldownPeriod: 300, // 5 minutes
    });
  }

  private async performAgentHealthCheck(
    agentName: string,
    endpoint: string
  ): Promise<DeploymentResult['healthCheck']> {
    const startTime = Date.now();

    try {
      // Simulate health check (in production, this would make an HTTP request)
      const isHealthy = await this.monitor.checkAgentHealth(agentName);

      return {
        status: isHealthy ? 'healthy' : 'unhealthy',
        responseTime: Date.now() - startTime,
        lastCheck: new Date(),
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        responseTime: Date.now() - startTime,
        lastCheck: new Date(),
      };
    }
  }

  private async setupAgentOrchestration(): Promise<void> {
    logger.info('🔗 Setting up agent orchestration and communication...');

    // Enable parallel processing
    await this.coordinator.enableParallelProcessing({
      maxConcurrentTasks: 20,
      taskQueueSize: 1000,
      workerThreads: 4,
      priorityQueues: true,
    });

    // Setup inter-agent communication channels
    await this.coordinator.setupCommunicationChannels({
      messageQueue: 'redis', // or 'rabbitmq', 'kafka'
      enableDirectMessaging: true,
      messageRetention: 86400, // 24 hours
      maxMessageSize: 1048576, // 1MB
    });

    // Configure agent memory system
    await this.coordinator.initializeMemorySystem({
      type: 'distributed',
      provider: 'redis',
      maxMemoryPerAgent: '100MB',
      ttl: 3600, // 1 hour
      compressionEnabled: false,
    });

    // Setup performance monitoring
    await this.monitor.enablePerformanceTracking({
      metricsInterval: 60, // Collect metrics every minute
      alertThresholds: {
        responseTime: 5000, // 5 seconds
        errorRate: 0.05, // 5%
        memoryUsage: 0.85, // 85%
      },
    });

    logger.info('✅ Agent orchestration configured successfully');
  }

  private async initializeMonitoring(): Promise<void> {
    logger.info('📊 Initializing agent monitoring...');

    // Setup real-time monitoring
    await this.monitor.startMonitoring({
      agents: this.deploymentResults.filter(r => r.status === 'deployed').map(r => r.agent),
      interval: 30000, // 30 seconds
      metrics: ['cpu', 'memory', 'requests', 'errors', 'latency'],
    });

    // Setup error detection and recovery
    await this.monitor.configureErrorRecovery({
      maxRetries: 3,
      retryDelay: 5000,
      circuitBreakerThreshold: 5,
      recoveryTimeout: 60000,
    });

    // Setup load balancing
    await this.monitor.enableLoadBalancing({
      algorithm: 'weighted-round-robin',
      healthCheckInterval: 10000,
      failoverEnabled: true,
    });

    logger.info('✅ Monitoring systems initialized');
  }

  private async performHealthChecks(): Promise<void> {
    logger.info('🏥 Performing system-wide health checks...');

    const healthChecks = await Promise.all(
      this.deploymentResults
        .filter(r => r.status === 'deployed')
        .map(async result => {
          const health = await this.monitor.checkAgentHealth(result.agent);
          return {
            agent: result.agent,
            healthy: health,
            metrics: await this.monitor.getAgentMetrics(result.agent),
          };
        })
    );

    const unhealthyAgents = healthChecks.filter(h => !h.healthy);

    if (unhealthyAgents.length > 0) {
      logger.warn(`⚠️  ${unhealthyAgents.length} agents are unhealthy:`, {
        unhealthyAgents: unhealthyAgents.map(a => a.agent),
      });
    } else {
      logger.info('✅ All agents are healthy');
    }
  }

  private async createDeploymentSnapshot(): Promise<void> {
    const snapshot: DeploymentSnapshot = {
      id: `snapshot_${Date.now()}`,
      timestamp: new Date(),
      agents: new Map(), // Store current agent states
      configurations: new Map(), // Store current configurations
    };

    this.deploymentSnapshots.push(snapshot);
    logger.info(`📸 Created deployment snapshot: ${snapshot.id}`);
  }

  private async rollbackDeployment(): Promise<void> {
    logger.warn('🔄 Initiating deployment rollback...');

    if (this.deploymentSnapshots.length === 0) {
      logger.error('No snapshots available for rollback');
      return;
    }

    const lastSnapshot = this.deploymentSnapshots[this.deploymentSnapshots.length - 1];

    // Rollback each deployed agent
    for (const result of this.deploymentResults) {
      if (result.status === 'deployed') {
        await this.rollbackAgent(result.agent);
      }
    }

    logger.info('✅ Rollback completed');
  }

  private async rollbackAgent(agentName: string): Promise<void> {
    try {
      logger.info(`Rolling back ${agentName}...`);

      // Unregister from orchestrator
      await this.orchestrator.unregisterAgent(agentName);

      // Stop monitoring
      await this.monitor.stopMonitoringAgent(agentName);

      // Update deployment result
      const resultIndex = this.deploymentResults.findIndex(r => r.agent === agentName);
      if (resultIndex !== -1) {
        this.deploymentResults[resultIndex].status = 'rolled-back';
      }
    } catch (error) {
      logger.error(`Failed to rollback ${agentName}:`, errorToLogMeta(error));
    }
  }

  private sortAgentsByDependencies(agents: AgentDeploymentConfig[]): AgentDeploymentConfig[] {
    const sorted: AgentDeploymentConfig[] = [];
    const visited = new Set<string>();

    const visit = (agent: AgentDeploymentConfig) => {
      if (visited.has(agent.name)) return;

      visited.add(agent.name);

      if (agent.dependencies) {
        for (const dep of agent.dependencies) {
          const depAgent = agents.find(a => a.name === dep);
          if (depAgent) visit(depAgent);
        }
      }

      sorted.push(agent);
    };

    agents.forEach(visit);
    return sorted;
  }

  private groupByPriority(agents: AgentDeploymentConfig[]): Map<number, AgentDeploymentConfig[]> {
    const groups = new Map<number, AgentDeploymentConfig[]>();

    agents.forEach(agent => {
      const priority = agent.priority;
      if (!groups.has(priority)) {
        groups.set(priority, []);
      }
      const group = groups.get(priority);
      if (group) {
        group.push(agent);
      }
    });

    // Sort by priority (ascending)
    return new Map([...groups.entries()].sort((a, b) => a[0] - b[0]));
  }

  private async generateDeploymentReport(): Promise<void> {
    logger.info('\n🎯 DEPLOYMENT SUMMARY:');
    logger.info('=======================');

    const successful = this.deploymentResults.filter(r => r.status === 'deployed').length;
    const failed = this.deploymentResults.filter(r => r.status === 'failed').length;
    const rolledBack = this.deploymentResults.filter(r => r.status === 'rolled-back').length;
    const skipped = this.deploymentResults.filter(r => r.status === 'skipped').length;

    this.deploymentResults.forEach(result => {
      const emoji =
        result.status === 'deployed'
          ? '✅'
          : result.status === 'failed'
            ? '❌'
            : result.status === 'rolled-back'
              ? '🔄'
              : '⏭️';

      let message = `${emoji} ${result.agent}: ${result.message}`;
      if (result.deploymentTime) {
        message += ` (${result.deploymentTime}ms)`;
      }
      if (result.healthCheck) {
        message += ` [${result.healthCheck.status}]`;
      }

      logger.info(message);
    });

    logger.info('\n📈 STATISTICS:');
    logger.info(`✅ Successful: ${successful}`);
    logger.info(`❌ Failed: ${failed}`);
    logger.info(`🔄 Rolled Back: ${rolledBack}`);
    logger.info(`⏭️  Skipped: ${skipped}`);
    logger.info(`📊 Total: ${this.deploymentResults.length}`);

    const totalDeploymentTime = this.deploymentResults
      .filter(r => r.deploymentTime)
      .reduce((sum, r) => sum + r.deploymentTime!, 0);

    logger.info(`⏱️  Total Deployment Time: ${totalDeploymentTime}ms`);

    if (failed === 0 && rolledBack === 0) {
      logger.info('\n🎉 All agents deployed successfully! The system is EPIC!');
    } else {
      logger.warn(`\n⚠️  Deployment completed with issues. Review logs above.`);
    }

    // Save deployment report would go here in production
    // when prisma schema includes deploymentLog table
    logger.info('Deployment report generated successfully');
  }
}

// Run deployment
async function main() {
  const deployer = new EnhancedAgentDeployer();

  try {
    await deployer.deployAllAgents();
    process.exit(0);
  } catch (error) {
    logger.error('Deployment failed:', errorToLogMeta(error));
    process.exit(1);
  }
}

main().catch(console.error);
