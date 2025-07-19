#!/usr/bin/env node

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = '127.0.0.1';
const port = parseInt(process.env.PORT || '3000', 10);

console.log('Starting custom dev server...');

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl).catch(err => {
      console.error('Error handling request:', err);
      res.statusCode = 500;
      res.end('Internal server error');
    });
  });

  server.on('error', err => {
    console.error('Server error:', err);
    process.exit(1);
  });

  server.listen(port, hostname, () => {
    console.log(`
✅ Server is running!
🌐 URL: http://${hostname}:${port}
📁 Environment: ${dev ? 'development' : 'production'}

Press Ctrl+C to stop the server
    `);

    // Test the server is actually listening
    const testReq = require('http')
      .get(`http://${hostname}:${port}`, res => {
        console.log(`✅ Server is responding (status: ${res.statusCode})`);
      })
      .on('error', err => {
        console.error('⚠️  Server started but not responding:', err.message);
      });
  });
});
