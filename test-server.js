const http = require('http');

console.log('Testing server connection...');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'GET',
  timeout: 5000
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log('Server is responding!');
  process.exit(0);
});

req.on('error', (e) => {
  console.error(`Cannot connect: ${e.message}`);
  process.exit(1);
});

req.end();