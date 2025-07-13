const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
// Socket server will be initialized inline for local testing

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);

// Create Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  // Create HTTP server
  const httpServer = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  // Initialize WebSocket server
  if (process.env.ENABLE_WEBSOCKET !== 'false') {
    try {
      // Initialize Socket.IO inline for local testing
      const { Server } = require('socket.io');
      const io = new Server(httpServer, {
        cors: {
          origin: process.env.NEXTAUTH_URL || 'http://localhost:3000',
          credentials: true,
        },
      });

      // Basic socket handling
      io.on('connection', socket => {
        console.log('Client connected:', socket.id);

        socket.on('disconnect', () => {
          console.log('Client disconnected:', socket.id);
        });

        // Handle chat messages
        socket.on('chat:message', data => {
          socket.broadcast.emit('chat:message', data);
        });
      });

      global.io = io;
      console.log('✅ WebSocket server initialized');

      // Log active connections periodically
      setInterval(() => {
        const activeConnections = chatServer.getActiveSessionsCount();
        if (activeConnections > 0) {
          console.log(`Active WebSocket connections: ${activeConnections}`);
        }
      }, 30000); // Every 30 seconds
    } catch (error) {
      console.error('Failed to initialize WebSocket server:', error);
    }
  }

  // Start server
  httpServer.listen(port, () => {
    console.log(`
  ▲ Vasquez Law Firm Server Ready
  ─────────────────────────────────
  
  Environment: ${process.env.NODE_ENV}
  URL:         http://${hostname}:${port}
  WebSocket:   ${process.env.ENABLE_WEBSOCKET !== 'false' ? 'Enabled' : 'Disabled'}
  
  ─────────────────────────────────
    `);
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    httpServer.close(() => {
      console.log('HTTP server closed');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    httpServer.close(() => {
      console.log('HTTP server closed');
      process.exit(0);
    });
  });
});
