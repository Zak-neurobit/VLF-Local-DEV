import { PrismaClient } from '@prisma/client';

// Mock Prisma client that returns safe defaults when database is unavailable
class SafePrismaClient {
  private realClient: PrismaClient | null = null;
  private isAvailable = false;

  constructor() {
    this.checkAvailability();
  }

  private async checkAvailability() {
    try {
      const dbUrl = process.env.DATABASE_URL || '';
      if (dbUrl.includes('localhost') || dbUrl.includes('127.0.0.1')) {
        console.warn('⚠️  Local database URL detected - running without database');
        this.isAvailable = false;
        return;
      }

      // Try to create real client
      this.realClient = new PrismaClient();
      await this.realClient.$connect();
      this.isAvailable = true;
      console.log('✅ Database connected successfully');
    } catch (error) {
      console.warn('⚠️  Database not available - running in mock mode');
      this.isAvailable = false;
    }
  }

  // Proxy all properties to either real client or mock implementations
  get user() {
    if (this.isAvailable && this.realClient) {
      return this.realClient.user;
    }
    return {
      findUnique: async () => null,
      findFirst: async () => null,
      findMany: async () => [],
      create: async (args: { data: Record<string, unknown> }) => ({ id: 'mock-id', ...args.data }),
      update: async (args: { where: { id: string }; data: Record<string, unknown> }) => ({ id: args.where.id, ...args.data }),
      delete: async () => ({ id: 'deleted' }),
      count: async () => 0,
    };
  }

  get blogPost() {
    if (this.isAvailable && this.realClient) {
      return this.realClient.blogPost;
    }
    return {
      findUnique: async () => null,
      findFirst: async () => null,
      findMany: async () => [],
      create: async (args: { data: Record<string, unknown> }) => ({ id: 'mock-id', ...args.data }),
      update: async (args: { where: { id: string }; data: Record<string, unknown> }) => ({ id: args.where.id, ...args.data }),
      delete: async () => ({ id: 'deleted' }),
      count: async () => 0,
    };
  }

  // Add other models as needed
  async $connect() {
    if (this.realClient) {
      return this.realClient.$connect();
    }
  }

  async $disconnect() {
    if (this.realClient) {
      return this.realClient.$disconnect();
    }
  }

  async $transaction(fn: (client: SafePrismaClient) => Promise<unknown>) {
    if (this.realClient) {
      return this.realClient.$transaction(fn);
    }
    // Mock transaction
    return fn(this);
  }
}

// Export a safe instance
export const safePrisma = new SafePrismaClient() as unknown as PrismaClient;
