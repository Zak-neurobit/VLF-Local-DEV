const http = require('http');

const server = http.createServer((req, res) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>Basic server is working!</h1>');
});

server.on('error', err => {
  console.error('Server error:', err);
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Server is listening on http://127.0.0.1:3000');
  console.log('Also try http://localhost:3000');
});

// Keep the process alive
process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  server.close(() => {
    process.exit(0);
  });
});
