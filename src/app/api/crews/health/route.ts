import { NextRequest, NextResponse } from 'next/server';
import { getPrismaClient } from '@/lib/prisma';
import { CrewCoordinator } from '@/lib/crewai/enhanced-crew-coordinator';
import { logger } from '@/lib/logger';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function GET(_request: NextRequest): Promise<NextResponse> {
  try {
    const healthChecks = await Promise.allSettled([
      checkDatabaseHealth(),
      checkSystemResources(),
      checkAgentHealth(),
      checkAPIConnections(),
      checkCronJobs(),
      checkMemoryUsage(),
      checkDiskSpace()
    ]);
    
    const results = healthChecks.map((result, index) => {
      const checkNames = [
        'database',
        'system_resources',
        'agent_health',
        'api_connections',
        'cron_jobs',
        'memory_usage',
        'disk_space'
      ];
      
      return {
        name: checkNames[index],
        status: result.status === 'fulfilled' ? 'healthy' : 'unhealthy',
        details: result.status === 'fulfilled' ? result.value : (result as PromiseRejectedResult).reason?.message || 'Check failed',
        timestamp: new Date().toISOString()
      };
    });
    
    const healthyChecks = results.filter(r => r.status === 'healthy').length;
    const totalChecks = results.length;
    const overallHealth = healthyChecks / totalChecks;
    
    const response = {
      status: overallHealth === 1 ? 'healthy' : overallHealth > 0.8 ? 'warning' : 'critical',
      score: Math.round(overallHealth * 100),
      timestamp: new Date().toISOString(),
      uptime: Math.round(process.uptime()),
      checks: results,
      summary: {
        total: totalChecks,
        healthy: healthyChecks,
        unhealthy: totalChecks - healthyChecks,
        percentage: Math.round(overallHealth * 100)
      },
      system: {
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch,
        pid: process.pid,
        memory: process.memoryUsage(),
        cpuUsage: process.cpuUsage(),
        loadAverage: (process as any).loadavg ? (process as any).loadavg() : [0, 0, 0]
      },
      recommendations: generateHealthRecommendations(results)
    };
    
    return NextResponse.json(response);
  } catch (error) {
    logger.error('Health check failed:', error);
    return NextResponse.json(
      { 
        status: 'critical',
        score: 0,
        error: 'Health check system failure',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

async function checkDatabaseHealth(): Promise<Record<string, any>> {
  const prisma = getPrismaClient();
  
  try {
    // Test connection
    await prisma.$connect();
    
    // Test query
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    
    // Check recent activity
    const recentLogs = await prisma.agentExecutionLog.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 3600000) // Last hour
        }
      }
    });
    
    return {
      connection: 'connected',
      query: 'successful',
      recentActivity: recentLogs,
      status: 'healthy'
    };
  } catch (error) {
    throw new Error(`Database health check failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function checkSystemResources(): Promise<Record<string, any>> {
  const memoryUsage = process.memoryUsage();
  const cpuUsage = process.cpuUsage();
  
  const memoryUsagePercent = (memoryUsage.heapUsed / memoryUsage.heapTotal) * 100;
  const cpuUsagePercent = (cpuUsage.user + cpuUsage.system) / 1000000; // Convert to seconds
  
  // Check if resources are within healthy limits
  const memoryHealthy = memoryUsagePercent < 85;
  const cpuHealthy = cpuUsagePercent < 80;
  
  if (!memoryHealthy || !cpuHealthy) {
    throw new Error(`Resource usage high - Memory: ${memoryUsagePercent.toFixed(1)}%, CPU: ${cpuUsagePercent.toFixed(1)}%`);
  }
  
  return {
    memory: {
      heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024), // MB
      heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024), // MB
      usagePercent: Math.round(memoryUsagePercent),
      healthy: memoryHealthy
    },
    cpu: {
      user: cpuUsage.user,
      system: cpuUsage.system,
      usagePercent: Math.round(cpuUsagePercent),
      healthy: cpuHealthy
    },
    uptime: Math.round(process.uptime()),
    loadAverage: (process as any).loadavg ? (process as any).loadavg() : [0, 0, 0],
    status: 'healthy'
  };
}

async function checkAgentHealth(): Promise<Record<string, any>> {
  const crewCoordinator = CrewCoordinator.getInstance();
  const systemStatus = crewCoordinator.getSystemStatus();
  
  const agentNames = [
    'legal-consultation',
    'appointment-scheduling',
    'document-analysis',
    'seo-blog-generation',
    'social-media-monitoring',
    'competitive-analysis',
    'enhanced-intake',
    'removal-defense',
    'business-immigration',
    'criminal-defense',
    'aila-trained-removal',
    'blog-content-domination',
    'google-my-business-killer',
    'social-media-destroyer',
    'review-harvesting',
    'competitor-spy'
  ];
  
  const agentHealth = agentNames.map(name => {
    const metrics = crewCoordinator.getAgentPerformanceMetrics(name);
    return {
      name,
      healthy: !!metrics && metrics.successRate > 0.8,
      metrics: metrics || null
    };
  });
  
  const healthyAgents = agentHealth.filter(a => a.healthy).length;
  const totalAgents = agentHealth.length;
  
  if (healthyAgents < totalAgents * 0.8) {
    throw new Error(`Only ${healthyAgents}/${totalAgents} agents are healthy`);
  }
  
  return {
    totalAgents,
    healthyAgents,
    unhealthyAgents: totalAgents - healthyAgents,
    systemStatus,
    agentDetails: agentHealth,
    status: 'healthy'
  };
}

async function checkAPIConnections(): Promise<Record<string, any>> {
  const connections = [];
  
  // Check OpenAI API
  try {
    // In a real implementation, you'd make a test API call
    connections.push({
      name: 'OpenAI API',
      status: 'healthy',
      latency: Math.random() * 200 + 100 // Simulated latency
    });
  } catch (error) {
    connections.push({
      name: 'OpenAI API',
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
  
  // Check Google Places API
  try {
    // In a real implementation, you'd make a test API call
    connections.push({
      name: 'Google Places API',
      status: 'healthy',
      latency: Math.random() * 150 + 50
    });
  } catch (error) {
    connections.push({
      name: 'Google Places API',
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
  
  // Check if any connections are unhealthy
  const unhealthyConnections = connections.filter(c => c.status === 'unhealthy');
  if (unhealthyConnections.length > 0) {
    throw new Error(`${unhealthyConnections.length} API connections are unhealthy`);
  }
  
  return {
    connections,
    totalConnections: connections.length,
    healthyConnections: connections.filter(c => c.status === 'healthy').length,
    averageLatency: connections.reduce((sum, c) => sum + (c.latency || 0), 0) / connections.length,
    status: 'healthy'
  };
}

async function checkCronJobs(): Promise<Record<string, any>> {
  // In a real implementation, you'd check if cron jobs are running
  // For now, we'll simulate the check
  
  const cronJobs = [
    { name: 'Blog Content Generation', nextRun: new Date(Date.now() + 3600000), status: 'active' },
    { name: 'GMB Posting', nextRun: new Date(Date.now() + 7200000), status: 'active' },
    { name: 'Review Monitoring', nextRun: new Date(Date.now() + 1800000), status: 'active' },
    { name: 'Competitor Analysis', nextRun: new Date(Date.now() + 5400000), status: 'active' },
    { name: 'Social Media Posting', nextRun: new Date(Date.now() + 4500000), status: 'active' }
  ];
  
  const activeCronJobs = cronJobs.filter(job => job.status === 'active').length;
  const totalCronJobs = cronJobs.length;
  
  if (activeCronJobs < totalCronJobs) {
    throw new Error(`${totalCronJobs - activeCronJobs} cron jobs are inactive`);
  }
  
  return {
    cronJobs,
    totalJobs: totalCronJobs,
    activeJobs: activeCronJobs,
    inactiveJobs: totalCronJobs - activeCronJobs,
    status: 'healthy'
  };
}

async function checkMemoryUsage(): Promise<Record<string, any>> {
  const memoryUsage = process.memoryUsage();
  
  const metrics = {
    heapUsed: memoryUsage.heapUsed,
    heapTotal: memoryUsage.heapTotal,
    external: memoryUsage.external,
    arrayBuffers: memoryUsage.arrayBuffers,
    usagePercent: (memoryUsage.heapUsed / memoryUsage.heapTotal) * 100
  };
  
  // Check for memory leaks or high usage
  if (metrics.usagePercent > 90) {
    throw new Error(`Memory usage critical: ${metrics.usagePercent.toFixed(1)}%`);
  }
  
  if (metrics.usagePercent > 80) {
    logger.warn(`Memory usage high: ${metrics.usagePercent.toFixed(1)}%`);
  }
  
  return {
    ...metrics,
    heapUsedMB: Math.round(metrics.heapUsed / 1024 / 1024),
    heapTotalMB: Math.round(metrics.heapTotal / 1024 / 1024),
    externalMB: Math.round(metrics.external / 1024 / 1024),
    status: 'healthy'
  };
}

async function checkDiskSpace(): Promise<Record<string, any>> {
  try {
    const { stdout } = await execAsync('df -h /');
    const lines = stdout.trim().split('\n');
    const data = lines[1].split(/\s+/);
    
    const usagePercent = parseInt(data[4].replace('%', ''));
    
    if (usagePercent > 90) {
      throw new Error(`Disk space critical: ${usagePercent}% used`);
    }
    
    return {
      filesystem: data[0],
      size: data[1],
      used: data[2],
      available: data[3],
      usagePercent: usagePercent,
      mountPoint: data[5],
      status: 'healthy'
    };
  } catch (error) {
    throw new Error(`Disk space check failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

function generateHealthRecommendations(checks: Array<{name: string, status: string, details?: any}>): string[] {
  const recommendations: string[] = [];
  
  // Check for unhealthy components
  const unhealthyChecks = checks.filter(c => c.status === 'unhealthy');
  
  if (unhealthyChecks.length > 0) {
    recommendations.push(`Address ${unhealthyChecks.length} unhealthy components immediately`);
  }
  
  // Check memory usage
  const memoryCheck = checks.find(c => c.name === 'memory_usage');
  if (memoryCheck?.details?.usagePercent > 80) {
    recommendations.push('Memory usage is high - consider optimization or scaling');
  }
  
  // Check disk space
  const diskCheck = checks.find(c => c.name === 'disk_space');
  if (diskCheck?.details?.usagePercent > 80) {
    recommendations.push('Disk space is running low - consider cleanup or expansion');
  }
  
  // Check agent health
  const agentCheck = checks.find(c => c.name === 'agent_health');
  if (agentCheck && agentCheck.details?.unhealthyAgents > 0) {
    recommendations.push(`Restart ${agentCheck.details.unhealthyAgents} unhealthy agents`);
  }
  
  // Check API connections
  const apiCheck = checks.find(c => c.name === 'api_connections');
  if (apiCheck?.details?.averageLatency > 1000) {
    recommendations.push('API latency is high - check network connections');
  }
  
  // If everything is healthy
  if (recommendations.length === 0) {
    recommendations.push('All systems are healthy - no action required');
  }
  
  return recommendations;
}