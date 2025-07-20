import { PrismaClient } from '@prisma/client';
import { dbLogger } from './pino-logger';

// Database logging helpers
const dbLog = {
  query: (query: string, params?: unknown[], duration?: number) => {
    if (process.env.NODE_ENV === 'development') {
      dbLogger.debug({ query: query.substring(0, 100), duration }, 'Database query');
    }
  },
  error: (operation: string, error: unknown) => {
    dbLogger.error({ operation, error }, 'Database error');
  },
  transaction: (id: string, status: string) => {
    dbLogger.info({ transactionId: id, status }, 'Database transaction');
  },
};

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | null;
  prismaConnectionChecked: boolean | undefined;
};

// Mock Prisma client for when database is unavailable
class MockPrismaClient {
  user = {
    findUnique: async () => null,
    findFirst: async () => null,
    findMany: async () => [],
    create: async (args: { data: Record<string, unknown> }) => ({
      id: 'mock-' + Date.now(),
      ...args.data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    update: async (args: { where: { id: string }; data: Record<string, unknown> }) => ({
      id: args.where.id || 'mock',
      ...args.data,
      updatedAt: new Date(),
    }),
    delete: async () => ({ id: 'deleted' }),
    count: async () => 0,
  };

  userActivity = {
    create: async (args: { data: Record<string, unknown> }) => ({
      id: 'mock-' + Date.now(),
      ...args.data,
      createdAt: new Date(),
    }),
  };

  account = {
    findUnique: async () => null,
    create: async (args: { data: Record<string, unknown> }) => ({
      id: 'mock-' + Date.now(),
      ...args.data,
    }),
  };

  session = {
    findUnique: async () => null,
    create: async (args: { data: Record<string, unknown> }) => ({
      id: 'mock-' + Date.now(),
      ...args.data,
    }),
    delete: async () => ({ id: 'deleted' }),
  };

  async $connect() {
    dbLogger.debug('MockPrisma connect called (no-op)');
  }

  async $disconnect() {
    dbLogger.debug('MockPrisma disconnect called (no-op)');
  }

  conversation = {
    findUnique: async () => null,
    findMany: async () => [],
    create: async (args: { data: Record<string, unknown> }) => ({
      id: 'mock-' + Date.now(),
      ...args.data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  };

  message = {
    create: async (args: { data: Record<string, unknown> }) => ({
      id: 'mock-' + Date.now(),
      ...args.data,
      createdAt: new Date(),
    }),
    findMany: async () => [],
  };

  callAnalysis = {
    create: async (args: { data: Record<string, unknown> }) => ({
      id: 'mock-' + Date.now(),
      ...args.data,
      createdAt: new Date(),
    }),
  };

  blogPost = {
    findMany: async () => [],
    findUnique: async () => null,
    findFirst: async () => null,
    create: async (args: { data: Record<string, unknown> }) => ({
      id: 'mock-' + Date.now(),
      ...args.data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  };

  async $transaction(fn: (client: MockPrismaClient) => Promise<unknown>) {
    return fn(this);
  }

  $on() {
    // No-op for mock
  }

  $queryRaw = async () => [];
}

const prismaClientSingleton = () => {
  // Check if DATABASE_URL is available
  if (!process.env.DATABASE_URL) {
    dbLogger.warn(
      { databaseUrl: process.env.DATABASE_URL },
      'DATABASE_URL not found, using mock Prisma client'
    );
    return new MockPrismaClient() as unknown as PrismaClient;
  }

  // Check if it's a local database URL that might not be available
  const dbUrl = process.env.DATABASE_URL;
  if (dbUrl.includes('localhost') || dbUrl.includes('127.0.0.1')) {
    dbLogger.warn('Local database URL detected, using mock Prisma client for safety');
    return new MockPrismaClient() as unknown as PrismaClient;
  }

  try {
    const prisma = new PrismaClient({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit: 'event',
          level: 'warn',
        },
      ],
    });

    // Log queries
    prisma.$on('query', e => {
      dbLog.query(e.query, e.params.split(','), e.duration);
    });

    // Log errors
    prisma.$on('error', e => {
      dbLog.error(e.message, e);
    });

    // Log warnings
    prisma.$on('warn', e => {
      dbLogger.warn({ message: e.message }, 'Prisma warning');
    });

    return prisma;
  } catch (error) {
    dbLogger.error({ error }, 'Failed to create Prisma client');
    return new MockPrismaClient() as unknown as PrismaClient;
  }
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Helper to ensure prisma is available with better error handling
export function getPrismaClient(): PrismaClient {
  if (!prisma) {
    dbLogger.warn('Prisma client not available, returning mock client');
    return new MockPrismaClient() as unknown as PrismaClient;
  }
  return prisma;
}

// Check if database is actually connected
export async function isDatabaseConnected(): Promise<boolean> {
  if (globalForPrisma.prismaConnectionChecked !== undefined) {
    return globalForPrisma.prismaConnectionChecked;
  }

  try {
    if (!process.env.DATABASE_URL) {
      globalForPrisma.prismaConnectionChecked = false;
      return false;
    }

    // Skip connection check for local databases
    const dbUrl = process.env.DATABASE_URL;
    if (dbUrl.includes('localhost') || dbUrl.includes('127.0.0.1')) {
      globalForPrisma.prismaConnectionChecked = false;
      return false;
    }

    // Try a simple query to check connection
    const client = getPrismaClient();
    if (client instanceof MockPrismaClient) {
      globalForPrisma.prismaConnectionChecked = false;
      return false;
    }

    await client.$queryRaw`SELECT 1`;
    globalForPrisma.prismaConnectionChecked = true;
    return true;
  } catch (error) {
    dbLogger.warn({ error }, 'Database connection check failed');
    globalForPrisma.prismaConnectionChecked = false;
    return false;
  }
}

// Transaction helper with logging and fallback
export async function withTransaction<T>(fn: (tx: PrismaClient) => Promise<T>): Promise<T> {
  const client = getPrismaClient();

  const transactionId = `tx_${Date.now()}`;

  dbLog.transaction(transactionId, 'start');

  try {
    if (client instanceof MockPrismaClient) {
      // For mock client, just run the function directly
      const result = await fn(client as unknown as PrismaClient);
      dbLog.transaction(transactionId, 'commit (mock)');
      return result;
    }

    const result = await client.$transaction(async tx => {
      return await fn(tx as PrismaClient);
    });

    dbLog.transaction(transactionId, 'commit');
    return result;
  } catch (error) {
    dbLog.transaction(transactionId, 'rollback');
    throw error;
  }
}

// Safe database operation wrapper
export async function safeDbOperation<T>(
  operation: () => Promise<T>,
  fallback: T,
  operationName: string = 'database operation'
): Promise<T> {
  try {
    const isConnected = await isDatabaseConnected();
    if (!isConnected) {
      dbLogger.warn({ operationName }, 'Database not connected, returning fallback');
      return fallback;
    }
    return await operation();
  } catch (error) {
    dbLogger.error({ operationName, error }, 'Database operation failed');
    return fallback;
  }
}
