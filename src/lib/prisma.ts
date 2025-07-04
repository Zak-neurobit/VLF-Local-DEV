import { PrismaClient } from '@prisma/client';

// Use console logging in edge runtime
const dbLogger = {
  query: (query: string, params?: any[], duration?: number) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DB Query] ${duration}ms - ${query.substring(0, 100)}...`);
    }
  },
  error: (operation: string, error: any) => {
    console.error(`[DB Error] ${operation}:`, error);
  },
  transaction: (id: string, status: string) => {
    console.log(`[DB Transaction] ${id}: ${status}`);
  },
};

declare global {
  var prisma: PrismaClient | null;
}

const prismaClientSingleton = () => {
  // Check if DATABASE_URL is available
  if (!process.env.DATABASE_URL) {
    console.warn('DATABASE_URL not found, returning mock Prisma client for build');
    return null;
  }

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
};

export const prisma = global.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

// Helper to ensure prisma is available
export function getPrismaClient(): PrismaClient {
  if (!prisma) {
    throw new Error('Database connection not available. Please ensure DATABASE_URL is set.');
  }
  return prisma;
}

// Transaction helper with logging
export async function withTransaction<T>(fn: (tx: PrismaClient) => Promise<T>): Promise<T> {
  const client = getPrismaClient();

  const transactionId = `tx_${Date.now()}`;

  dbLogger.transaction(transactionId, 'start');

  try {
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
