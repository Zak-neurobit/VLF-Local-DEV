/**
 * @jest-environment node
 */
import { GET } from './route';

// Mock modules
jest.mock('@/lib/prisma', () => ({
  getPrismaClient: jest.fn(() => ({
    $queryRaw: jest.fn().mockResolvedValue([{ 1: 1 }]),
  })),
}));

jest.mock('ioredis', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    connect: jest.fn().mockResolvedValue(undefined),
    ping: jest.fn().mockResolvedValue('PONG'),
    quit: jest.fn().mockResolvedValue(undefined),
  })),
}));

describe('Health API Route', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = process.env;
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.clearAllMocks();
  });

  it('returns healthy status when all services are operational', async () => {
    process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';
    process.env.REDIS_HOST = 'redis.example.com'; // Not localhost
    process.env.REDIS_PORT = '6379';
    process.env.OPENAI_API_KEY = 'test-key';

    const request = { url: 'http://localhost:3000/api/health' } as any;
    const response = await GET(request);
    const data = await response.json();

    // Debug: log the response data
    if (response.status !== 200) {
      console.log('Health check failed:', data);
    }

    expect(response.status).toBe(200);
    expect(data.status).toBe('healthy');
    expect(data.services.api).toBe('operational');
    expect(data.services.database).toBe('operational');
    expect(data.services.redis).toBe('operational');
    expect(data.services.ai).toBe('operational');
    expect(data.errors).toHaveLength(0);
  });

  it('returns degraded status when services are not configured', async () => {
    delete process.env.DATABASE_URL;
    delete process.env.REDIS_HOST;
    delete process.env.OPENAI_API_KEY;

    const request = { url: 'http://localhost:3000/api/health' } as any;
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(503);
    expect(data.status).toBe('degraded');
    expect(data.services.database).toBe('not_configured');
    expect(data.services.redis).toBe('not_configured');
    expect(data.services.ai).toBe('error');
  });

  it('includes timestamp and version in response', async () => {
    const request = { url: 'http://localhost:3000/api/health' } as any;
    const response = await GET(request);
    const data = await response.json();

    expect(data.timestamp).toBeDefined();
    expect(new Date(data.timestamp).toISOString()).toBe(data.timestamp);
    expect(data.version).toBeDefined();
  });
});
