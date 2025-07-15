import { NextRequest, NextResponse } from 'next/server';
import { withTracing } from '@/lib/telemetry/api-middleware';

async function handleGET(_req: NextRequest) {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    services: {
      api: 'operational',
      database: 'not_configured',
      redis: 'not_configured',
      ai: 'checking',
    },
    errors: [] as string[],
  };

  // Check database connection if configured
  if (
    process.env.DATABASE_URL &&
    process.env.DATABASE_URL !== 'postgresql://placeholder:placeholder@placeholder:5432/placeholder'
  ) {
    try {
      const { getPrismaClient } = await import('@/lib/prisma');
      try {
        const client = getPrismaClient();
        await client.$queryRaw`SELECT 1`;
        health.services.database = 'operational';
      } catch {
        health.services.database = 'not_configured';
      }
    } catch (error) {
      health.services.database = 'error';
      health.errors.push('Database connection failed');
      health.status = 'degraded';
    }
  }

  // Check Redis if configured and not mocked
  if (process.env.REDIS_HOST && process.env.MOCK_REDIS !== 'true') {
    try {
      const Redis = (await import('ioredis')).default;
      const redis = new Redis({
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || '6379'),
        password: process.env.REDIS_PASSWORD,
        lazyConnect: true,
      });

      await redis.connect();
      await redis.ping();
      await redis.quit();
      health.services.redis = 'operational';
    } catch (error) {
      health.services.redis = 'error';
      health.errors.push('Redis connection failed');
      health.status = 'degraded';
    }
  }

  // Check AI services
  if (!process.env.OPENAI_API_KEY) {
    health.services.ai = 'error';
    health.errors.push('OpenAI API key not configured');
    health.status = 'degraded';
  } else {
    health.services.ai = 'operational';
  }

  // Overall status
  if (health.errors.length > 2) {
    health.status = 'unhealthy';
  }

  const statusCode = health.status === 'healthy' ? 200 : health.status === 'degraded' ? 503 : 500;

  return NextResponse.json(health, { status: statusCode });
}

// Export with telemetry wrapper
export const GET = withTracing(handleGET, {
  spanName: 'health.check',
  attributes: { 'vlf.operation': 'health_check' },
});
