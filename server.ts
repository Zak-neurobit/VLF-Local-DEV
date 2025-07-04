import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { getChatSocketServer } from './src/lib/socket/server';
import { logger } from './src/lib/logger';
import { setupQueueMonitoring } from './src/lib/queue/bull';
import { cronJobService } from './src/services/cron';

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);

// Create Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

async function startServer() {
  try {
    await app.prepare();

    // Create HTTP server
    const httpServer = createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url!, true);
        await handle(req, res, parsedUrl);
      } catch (err) {
        logger.error('Error occurred handling request:', err);
        res.statusCode = 500;
        res.end('internal server error');
      }
    });

    // Initialize WebSocket server
    if (process.env.ENABLE_WEBSOCKET !== 'false') {
      try {
        const chatServer = getChatSocketServer(httpServer);
        logger.info('WebSocket server initialized');

        // Log active connections periodically
        setInterval(() => {
          const activeConnections = chatServer.getActiveSessionsCount();
          if (activeConnections > 0) {
            logger.info(`Active WebSocket connections: ${activeConnections}`);
          }
        }, 30000); // Every 30 seconds
      } catch (error) {
        logger.error('Failed to initialize WebSocket server:', error);
      }
    }

    // Setup queue monitoring
    const getQueueHealth = setupQueueMonitoring();

    // Initialize cron jobs
    if (process.env.ENABLE_CRON !== 'false') {
      try {
        await cronJobService.initialize();
        logger.info('Cron jobs initialized');
      } catch (error) {
        logger.error('Failed to initialize cron jobs:', error);
      }
    }

    // Add health check endpoint
    httpServer.on('request', async (req, res) => {
      if (req.url === '/api/health/queues' && req.method === 'GET') {
        try {
          const health = await getQueueHealth();
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: 'ok', queues: health }));
        } catch (error) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: 'error', message: 'Failed to get queue health' }));
        }
      }
    });

    // Start server
    httpServer.listen(port, () => {
      console.log(`
  ▲ Vasquez Law Firm Server Ready
  ─────────────────────────────────
  
  Environment: ${process.env.NODE_ENV}
  URL:         http://${hostname}:${port}
  WebSocket:   ${process.env.ENABLE_WEBSOCKET !== 'false' ? 'Enabled' : 'Disabled'}
  Queues:      Enabled
  Cron Jobs:   ${process.env.ENABLE_CRON !== 'false' ? 'Enabled' : 'Disabled'}
  
  ─────────────────────────────────
      `);
    });

    // Graceful shutdown
    const gracefulShutdown = (signal: string) => {
      logger.info(`${signal} signal received: closing HTTP server`);

      // Stop cron jobs
      cronJobService.stop();

      httpServer.close(() => {
        logger.info('HTTP server closed');
        process.exit(0);
      });

      // Force exit after 10 seconds
      setTimeout(() => {
        logger.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
startServer();
