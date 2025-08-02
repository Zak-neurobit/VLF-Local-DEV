#!/usr/bin/env node
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Testing Next.js build with enhanced logging...');
console.log('Build started at:', new Date().toISOString());

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Open log file
const logFile = path.join(logsDir, `build-test-${Date.now()}.log`);
const logStream = fs.createWriteStream(logFile);

console.log(`📝 Logging to: ${logFile}`);

// Environment variables for debugging
const env = {
  ...process.env,
  NODE_OPTIONS: '--max-old-space-size=8192',
  NEXT_TELEMETRY_DISABLED: '1',
  DEBUG: 'next:*',
  VERBOSE: '1',
  // Use test config if available
  NEXT_CONFIG_FILE: fs.existsSync('next.config.build-test.js')
    ? 'next.config.build-test.js'
    : undefined,
};

// Start the build process
const buildProcess = spawn('npx', ['next', 'build'], {
  env,
  shell: true,
});

let lastOutput = Date.now();
const TIMEOUT = 120000; // 2 minutes

// Monitor for timeout
const timeoutCheck = setInterval(() => {
  const timeSinceLastOutput = Date.now() - lastOutput;
  if (timeSinceLastOutput > TIMEOUT) {
    console.error('❌ Build appears to be hanging (no output for 2 minutes)');
    console.error('Last output was', Math.floor(timeSinceLastOutput / 1000), 'seconds ago');
    buildProcess.kill('SIGTERM');
    clearInterval(timeoutCheck);
  }
}, 10000);

// Handle stdout
buildProcess.stdout.on('data', data => {
  lastOutput = Date.now();
  const output = data.toString();
  process.stdout.write(output);
  logStream.write(output);

  // Look for specific phases
  if (output.includes('Collecting page data')) {
    console.log('\n⏳ Phase: Collecting page data...');
  } else if (output.includes('Generating static pages')) {
    console.log('\n⏳ Phase: Generating static pages...');
  } else if (output.includes('Finalizing page optimization')) {
    console.log('\n⏳ Phase: Finalizing page optimization...');
  }
});

// Handle stderr
buildProcess.stderr.on('data', data => {
  lastOutput = Date.now();
  const output = data.toString();
  process.stderr.write(output);
  logStream.write(`ERROR: ${output}`);
});

// Handle exit
buildProcess.on('exit', (code, signal) => {
  clearInterval(timeoutCheck);
  logStream.end();

  console.log('\n' + '='.repeat(50));
  console.log('Build ended at:', new Date().toISOString());

  if (signal) {
    console.error(`❌ Build was killed with signal: ${signal}`);
  } else if (code === 0) {
    console.log('✅ Build completed successfully!');
  } else {
    console.error(`❌ Build failed with exit code: ${code}`);
  }

  console.log(`\n📋 Full log available at: ${logFile}`);

  // Analyze .next directory if it exists
  const nextDir = path.join(__dirname, '..', '.next');
  if (fs.existsSync(nextDir)) {
    console.log('\n📊 Build output analysis:');
    const pagesDir = path.join(nextDir, 'server', 'pages');
    if (fs.existsSync(pagesDir)) {
      const countFiles = dir => {
        let count = 0;
        const files = fs.readdirSync(dir, { withFileTypes: true });
        for (const file of files) {
          if (file.isDirectory()) {
            count += countFiles(path.join(dir, file.name));
          } else if (file.name.endsWith('.html') || file.name.endsWith('.json')) {
            count++;
          }
        }
        return count;
      };
      console.log(`  - Static pages generated: ${countFiles(pagesDir)}`);
    }
  }

  process.exit(code || 0);
});

// Handle errors
buildProcess.on('error', error => {
  console.error('❌ Failed to start build process:', error);
  logStream.end();
  clearInterval(timeoutCheck);
  process.exit(1);
});
