import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import express from 'express';
import { Queue } from 'bullmq';
import { logger } from '@/lib/safe-logger';

// Import your queue configurations
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

// Define your queues
const queues = [
  'blog-generation',
  'content-syndication',
  'seo-analysis',
  'social-media-posting',
  'email-campaigns',
  'lead-processing',
  'agent-tasks'
];

export async function startBullDashboard(port: number = 3001) {
  try {
    const app = express();
    const serverAdapter = new ExpressAdapter();
    
    // Create BullMQ queues
    const bullQueues = queues.map(queueName => 
      new Queue(queueName, {
        connection: {
          host: new URL(REDIS_URL).hostname,
          port: parseInt(new URL(REDIS_URL).port) || 6379,
          password: new URL(REDIS_URL).password || undefined,
        }
      })
    );

    // Create Bull Board
    const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
      queues: bullQueues.map(q => new BullMQAdapter(q)),
      serverAdapter: serverAdapter,
    });

    serverAdapter.setBasePath('/admin/queues');
    app.use('/admin/queues', serverAdapter.getRouter());

    // Health check endpoint
    app.get('/health', (req, res) => {
      res.json({ status: 'ok', queues: queues.length });
    });

    // Start server
    app.listen(port, () => {
      logger.info(`🚀 Bull Dashboard running on http://localhost:${port}/admin/queues`);
    });

    return { app, addQueue, removeQueue, setQueues, replaceQueues };
  } catch (error) {
    logger.error('Failed to start Bull Dashboard:', error);
    throw error;
  }
}