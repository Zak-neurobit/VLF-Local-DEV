import { PrismaClient } from '@prisma/client';

// Use console logging in edge runtime
const dbLogger = {
  query: (query: string, params?: unknown[], duration?: number) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DB Query] ${duration}ms - ${query.substring(0, 100)}...`);
    }
  },
  error: (operation: string, error: unknown) => {
    console.error(`[DB Error] ${operation}:`, error);
  },
  transaction: (id: string, status: string) => {
    console.log(`[DB Transaction] ${id}: ${status}`);
  },
};

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | null;
  // eslint-disable-next-line no-var
  var prismaConnectionChecked: boolean;
}

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
    create: async (args: { data: Record<string, unknown> }) => ({ id: 'mock-' + Date.now(), ...args.data }),
  };

  session = {
    findUnique: async () => null,
    create: async (args: { data: Record<string, unknown> }) => ({ id: 'mock-' + Date.now(), ...args.data }),
    delete: async () => ({ id: 'deleted' }),
  };

  async $connect() {
    console.log('[MockPrisma] Connect called (no-op)');
  }

  async $disconnect() {
    console.log('[MockPrisma] Disconnect called (no-op)');
  }

  async $transaction(fn: (client: MockPrismaClient) => Promise<unknown>) {
    return fn(this);
  }

  $on() {
    // No-op for mock
  }
}

const prismaClientSingleton = () => {
  // Check if DATABASE_URL is available
  if (!process.env.DATABASE_URL) {
    console.warn(
      'DATABASE_URL not found, using mock Prisma client. Current DATABASE_URL:',
      process.env.DATABASE_URL
    );
    return new MockPrismaClient() as unknown as PrismaClient;
  }

  // Check if it's a local database URL that might not be available
  const dbUrl = process.env.DATABASE_URL;
  if (dbUrl.includes('localhost') || dbUrl.includes('127.0.0.1')) {
    console.warn('Local database URL detected, using mock Prisma client for safety');
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
      dbLogger.query(e.query, e.params.split(','), e.duration);
    });

    // Log errors
    prisma.$on('error', e => {
      dbLogger.error(e.message, e);
    });

    // Log warnings
    prisma.$on('warn', e => {
      console.warn('Prisma warning:', e.message);
    });

    return prisma;
  } catch (error) {
    console.error('Failed to create Prisma client:', error);
    return new MockPrismaClient() as unknown as PrismaClient;
  }
};

export const prisma = global.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

// Helper to ensure prisma is available with better error handling
export function getPrismaClient(): PrismaClient {
  if (!prisma) {
    console.warn('Prisma client not available, returning mock client');
    return new MockPrismaClient() as unknown as PrismaClient;
  }
  return prisma;
}

// Check if database is actually connected
export async function isDatabaseConnected(): Promise<boolean> {
  if (global.prismaConnectionChecked !== undefined) {
    return global.prismaConnectionChecked;
  }

  try {
    if (!process.env.DATABASE_URL) {
      global.prismaConnectionChecked = false;
      return false;
    }

    // Skip connection check for local databases
    const dbUrl = process.env.DATABASE_URL;
    if (dbUrl.includes('localhost') || dbUrl.includes('127.0.0.1')) {
      global.prismaConnectionChecked = false;
      return false;
    }

    // Try a simple query to check connection
    const client = getPrismaClient();
    if (client instanceof MockPrismaClient) {
      global.prismaConnectionChecked = false;
      return false;
    }

    await client.$queryRaw`SELECT 1`;
    global.prismaConnectionChecked = true;
    return true;
  } catch (error) {
    console.warn('Database connection check failed:', error);
    global.prismaConnectionChecked = false;
    return false;
  }
}

// Transaction helper with logging and fallback
export async function withTransaction<T>(fn: (tx: PrismaClient) => Promise<T>): Promise<T> {
  const client = getPrismaClient();

  const transactionId = `tx_${Date.now()}`;

  dbLogger.transaction(transactionId, 'start');

  try {
    if (client instanceof MockPrismaClient) {
      // For mock client, just run the function directly
      const result = await fn(client as unknown as PrismaClient);
      dbLogger.transaction(transactionId, 'commit (mock)');
      return result;
    }

    const result = await client.$transaction(async tx => {
      return await fn(tx as PrismaClient);
    });

    dbLogger.transaction(transactionId, 'commit');
    return result;
  } catch (error) {
    dbLogger.transaction(transactionId, 'rollback');
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
      console.warn(`[${operationName}] Database not connected, returning fallback`);
      return fallback;
    }
    return await operation();
  } catch (error) {
    console.error(`[${operationName}] Failed:`, error);
    return fallback;
  }
}
