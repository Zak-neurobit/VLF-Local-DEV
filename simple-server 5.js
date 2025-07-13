const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <html>
      <body>
        <h1>Simple Test Server Working!</h1>
        <p>Time: ${new Date().toISOString()}</p>
        <p>If you see this, your browser can access localhost.</p>
        <p>Next.js is running on: <a href="http://localhost:3003">http://localhost:3003</a></p>
      </body>
    </html>
  `);
});

server.listen(8080, () => {
  console.log('Simple test server running on http://localhost:8080');
});
