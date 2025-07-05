import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { logger } from '@/lib/logger';
import { prisma } from '@/lib/prisma';
import { AgentOrchestrator } from '@/lib/agents/agent-orchestrator';
import { CrewCoordinator } from '@/lib/crewai/crew-coordinator';
// Removed unused import - retellAgentManager

// Force dynamic rendering for real-time monitoring
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface AgentMetrics {
  name: string;
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  lastActive: Date | null;
  topIntents: Array<{ intent: string; count: number }>;
  performance?: {
    cpuUsage: number;
    memoryUsage: number;
    activeSessions: number;
    queueDepth: number;
  };
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Only admins can view monitoring data
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const timeRange = searchParams.get('range') || '24h';

    // Calculate date range
    const now = new Date();
    const startDate = new Date();

    switch (timeRange) {
      case '1h':
        startDate.setHours(now.getHours() - 1);
        break;
      case '24h':
        startDate.setDate(now.getDate() - 1);
        break;
      case '7d':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        break;
      default:
        startDate.setDate(now.getDate() - 1);
    }

    // Get agent status
    const orchestrator = AgentOrchestrator.getInstance();
    const agentStatus = orchestrator.getAgentStatus();

    // Get crew coordinator status
    const coordinator = CrewCoordinator.getInstance();
    const queueStatus = coordinator.getQueueStatus();

    // Query conversation metrics
    const conversations = await prisma!.conversation.findMany({
      where: {
        startedAt: {
          gte: startDate,
        },
        channel: 'chat',
      },
      include: {
        messages: {
          where: {
            role: 'assistant',
            metadata: {
              path: ['agent'],
              not: {
                equals: null,
              },
            },
          },
        },
      },
    });

    // Calculate agent metrics
    const agentMetrics: Record<string, AgentMetrics> = {};

    for (const conversation of conversations) {
      for (const message of conversation.messages) {
        const agent = (message.metadata as Record<string, unknown>)?.agent as string;
        if (!agent) continue;

        if (!agentMetrics[agent]) {
          agentMetrics[agent] = {
            name: agent,
            totalRequests: 0,
            successfulRequests: 0,
            failedRequests: 0,
            averageResponseTime: 0,
            lastActive: null,
            topIntents: [],
            performance: {
              cpuUsage: 0,
              memoryUsage: 0,
              activeSessions: 0,
              queueDepth: 0,
            },
          };
        }

        agentMetrics[agent].totalRequests++;

        if (!(message.metadata as Record<string, unknown>)?.error) {
          agentMetrics[agent].successfulRequests++;
        } else {
          agentMetrics[agent].failedRequests++;
        }

        if (!agentMetrics[agent].lastActive || message.createdAt > agentMetrics[agent].lastActive) {
          agentMetrics[agent].lastActive = message.createdAt;
        }
      }
    }

    // Get system health metrics
    const totalConversations = await prisma!.conversation.count({
      where: {
        startedAt: { gte: startDate },
      },
    });

    const activeConversations = await prisma!.conversation.count({
      where: {
        status: 'active',
        startedAt: { gte: startDate },
      },
    });

    const totalMessages = await prisma!.message.count({
      where: {
        createdAt: { gte: startDate },
      },
    });

    // Calculate response times (mock data for now)
    const responseMetrics = {
      average: 1250, // ms
      p50: 800,
      p95: 2500,
      p99: 4000,
    };

    return NextResponse.json({
      timestamp: new Date(),
      timeRange,
      agents: {
        status: agentStatus,
        metrics: Object.values(agentMetrics),
        totalActive: Object.values(agentStatus).filter(s => s).length,
        totalConfigured: Object.keys(agentStatus).length,
      },
      queue: {
        active: queueStatus.activeTasks,
        waiting: queueStatus.queueLength,
        completed: 0, // Not tracked in current implementation
        failed: 0, // Not tracked in current implementation
      },
      conversations: {
        total: totalConversations,
        active: activeConversations,
        averageLength: totalMessages / Math.max(totalConversations, 1),
      },
      performance: {
        responseTime: responseMetrics,
        uptime: '99.9%', // Mock for now
        errorRate: calculateErrorRate(agentMetrics),
      },
      alerts: generateAlerts(agentMetrics, queueStatus),
    });
  } catch (error) {
    logger.error('Error fetching monitoring data:', error);
    return NextResponse.json({ error: 'Failed to fetch monitoring data' }, { status: 500 });
  }
}

function calculateErrorRate(metrics: Record<string, AgentMetrics>): string {
  let totalRequests = 0;
  let totalFailed = 0;

  for (const agent of Object.values(metrics)) {
    totalRequests += agent.totalRequests;
    totalFailed += agent.failedRequests;
  }

  if (totalRequests === 0) return '0%';

  const errorRate = (totalFailed / totalRequests) * 100;
  return `${errorRate.toFixed(2)}%`;
}

function generateAlerts(
  metrics: Record<string, AgentMetrics>,
  queueStatus: {
    queueLength: number;
    activeTasks: number;
    tasksByType: Record<string, number>;
    tasksByPriority: Record<string, number>;
  }
): Array<{ level: 'info' | 'warning' | 'error'; message: string; timestamp: Date }> {
  const alerts = [];

  // Check for high error rates
  for (const [agentName, metric] of Object.entries(metrics)) {
    if (metric.totalRequests > 10) {
      const errorRate = (metric.failedRequests / metric.totalRequests) * 100;
      if (errorRate > 10) {
        alerts.push({
          level: 'warning' as const,
          message: `${agentName} agent has high error rate: ${errorRate.toFixed(1)}%`,
          timestamp: new Date(),
        });
      }
    }
  }

  // Check queue backlog
  if (queueStatus.queueLength > 50) {
    alerts.push({
      level: 'warning' as const,
      message: `High queue backlog: ${queueStatus.queueLength} tasks waiting`,
      timestamp: new Date(),
    });
  }

  // Check for inactive agents
  for (const [agentName, metric] of Object.entries(metrics)) {
    if (metric.lastActive) {
      const hoursSinceActive =
        (Date.now() - new Date(metric.lastActive).getTime()) / (1000 * 60 * 60);
      if (hoursSinceActive > 24) {
        alerts.push({
          level: 'info' as const,
          message: `${agentName} agent inactive for ${Math.round(hoursSinceActive)} hours`,
          timestamp: new Date(),
        });
      }
    }
  }

  return alerts;
}
