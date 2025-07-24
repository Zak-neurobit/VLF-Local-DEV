#!/usr/bin/env node

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOST || '127.0.0.1';
const port = parseInt(process.env.PORT || '3000', 10);

console.log('Starting custom dev server...');

// Add proper directory configuration
const dir = path.resolve(process.cwd());
const app = next({ dev, hostname, port, dir });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error handling request:', err);
      res.statusCode = 500;
      res.end('Internal server error');
    }
  });

  server.on('error', err => {
    console.error('Server error:', err);
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${port} is already in use. Please try a different port.`);
    }
    process.exit(1);
  });

  server.listen(port, hostname, () => {
    console.log(`
✅ Server is running!
🌐 URL: http://${hostname}:${port}
📁 Environment: ${dev ? 'development' : 'production'}
📂 Directory: ${dir}

Press Ctrl+C to stop the server
    `);

    // Delayed server test to avoid interfering with startup
    setTimeout(() => {
      require('http')
        .get(`http://${hostname}:${port}`, res => {
          console.log(`✅ Server is responding (status: ${res.statusCode})`);
        })
        .on('error', err => {
          console.error('⚠️  Server started but not responding:', err.message);
        });
    }, 1000);
  });

  // Graceful shutdown handling
  const shutdown = () => {
    console.log('\n\nShutting down server...');
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
    
    // Force exit after 10 seconds
    setTimeout(() => {
      console.error('Forced shutdown after timeout');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}).catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
