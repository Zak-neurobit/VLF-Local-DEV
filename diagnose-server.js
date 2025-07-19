const { createServer } = require('http');
const { spawn } = require('child_process');
const net = require('net');

console.log('Diagnosing server issues...\n');

// Test 1: Check if port 3000 is available
function checkPort(port) {
  return new Promise(resolve => {
    const server = net.createServer();
    server.once('error', err => {
      if (err.code === 'EADDRINUSE') {
        console.log(`❌ Port ${port} is already in use`);
        resolve(false);
      } else {
        console.log(`❌ Error checking port ${port}:`, err.message);
        resolve(false);
      }
    });
    server.once('listening', () => {
      server.close();
      console.log(`✅ Port ${port} is available`);
      resolve(true);
    });
    server.listen(port);
  });
}

// Test 2: Try to create a basic HTTP server
async function testBasicServer(port) {
  return new Promise(resolve => {
    const server = createServer((req, res) => {
      res.writeHead(200);
      res.end('Test server working');
    });

    server.on('error', err => {
      console.log(`❌ Basic server failed:`, err.message);
      resolve(false);
    });

    server.listen(port, '127.0.0.1', () => {
      console.log(`✅ Basic server started on port ${port}`);
      // Test connection
      const testReq = require('http').get(`http://127.0.0.1:${port}`, res => {
        console.log(`✅ Successfully connected to test server (status: ${res.statusCode})`);
        server.close();
        resolve(true);
      });
      testReq.on('error', err => {
        console.log(`❌ Failed to connect to test server:`, err.message);
        server.close();
        resolve(false);
      });
    });
  });
}

// Test 3: Check Next.js
async function testNextJs() {
  console.log('\nTesting Next.js...');

  // Check if Next.js can be imported
  try {
    const next = require('next');
    console.log('✅ Next.js module loaded successfully');

    // Try to create Next app
    const app = next({ dev: true });
    console.log('✅ Next.js app instance created');

    // Check if we can prepare the app
    console.log('Preparing Next.js app (this may take a moment)...');
    await app.prepare();
    console.log('✅ Next.js app prepared successfully');

    // Try to get request handler
    const handle = app.getRequestHandler();
    console.log('✅ Next.js request handler obtained');

    return true;
  } catch (err) {
    console.log('❌ Next.js error:', err.message);
    return false;
  }
}

// Run all tests
async function runDiagnostics() {
  console.log('Running server diagnostics...\n');

  // Test ports
  console.log('Testing port availability:');
  await checkPort(3000);
  await checkPort(3001);

  // Test basic server
  console.log('\nTesting basic HTTP server:');
  await testBasicServer(3002);

  // Test Next.js
  await testNextJs();

  console.log('\nDiagnostics complete.');
  process.exit(0);
}

runDiagnostics().catch(console.error);
