#!/usr/bin/env node

const http = require('http');
const https = require('https');

console.log(`
🔍 Diagnosing Vasquez Law Firm Loading Issues
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

async function checkEndpoint(url, description) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    let statusCode = null;
    let headers = {};
    let responseData = '';
    
    http.get(url, { timeout: 10000 }, (res) => {
      statusCode = res.statusCode;
      headers = res.headers;
      
      res.on('data', chunk => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        const duration = Date.now() - startTime;
        resolve({
          url,
          description,
          statusCode,
          headers,
          responseSize: responseData.length,
          duration,
          hasContent: responseData.length > 0,
          contentPreview: responseData.slice(0, 200)
        });
      });
    }).on('error', (err) => {
      resolve({
        url,
        description,
        error: err.message,
        duration: Date.now() - startTime
      });
    });
  });
}

async function runDiagnostics() {
  // Check basic connectivity
  console.log('1️⃣ Checking Server Connectivity...\n');
  
  const basicChecks = [
    { url: 'http://localhost:3000/', desc: 'Homepage' },
    { url: 'http://localhost:3000/_next/static/chunks/webpack.js', desc: 'Webpack chunk' },
    { url: 'http://localhost:3000/api/health/db', desc: 'Database health' },
    { url: 'http://localhost:3000/favicon.ico', desc: 'Favicon' }
  ];
  
  for (const check of basicChecks) {
    const result = await checkEndpoint(check.url, check.desc);
    
    if (result.error) {
      console.log(`❌ ${check.desc}: ${result.error}`);
    } else {
      console.log(`${result.statusCode === 200 ? '✅' : '❌'} ${check.desc}: Status ${result.statusCode} | Size: ${result.responseSize} bytes | Time: ${result.duration}ms`);
      
      if (result.statusCode !== 200) {
        console.log(`   Headers: ${JSON.stringify(result.headers)}`);
      }
    }
  }
  
  // Check static assets
  console.log('\n2️⃣ Checking Static Assets...\n');
  
  const homepage = await checkEndpoint('http://localhost:3000/', 'Homepage HTML');
  if (homepage.statusCode === 200) {
    // Extract static asset URLs from HTML
    const cssMatch = homepage.contentPreview.match(/href="(\/_next\/static\/css\/[^"]+)"/);
    const jsMatch = homepage.contentPreview.match(/src="(\/_next\/static\/chunks\/[^"]+)"/);
    
    if (cssMatch) {
      const cssResult = await checkEndpoint(`http://localhost:3000${cssMatch[1]}`, 'Main CSS');
      console.log(`${cssResult.statusCode === 200 ? '✅' : '❌'} CSS Loading: ${cssResult.statusCode}`);
    } else {
      console.log('⚠️  No CSS link found in HTML');
    }
    
    if (jsMatch) {
      const jsResult = await checkEndpoint(`http://localhost:3000${jsMatch[1]}`, 'Main JS');
      console.log(`${jsResult.statusCode === 200 ? '✅' : '❌'} JS Loading: ${jsResult.statusCode}`);
    } else {
      console.log('⚠️  No JS script found in HTML');
    }
  }
  
  // Check content structure
  console.log('\n3️⃣ Checking Content Structure...\n');
  
  if (homepage.statusCode === 200 && homepage.hasContent) {
    const checks = [
      { pattern: '<html', name: 'HTML tag' },
      { pattern: '<head', name: 'Head tag' },
      { pattern: '<body', name: 'Body tag' },
      { pattern: 'Vasquez Law Firm', name: 'Site title' },
      { pattern: '_next/static', name: 'Next.js static assets' },
      { pattern: 'charset="utf-8"', name: 'UTF-8 charset' }
    ];
    
    for (const check of checks) {
      const found = homepage.contentPreview.includes(check.pattern);
      console.log(`${found ? '✅' : '❌'} ${check.name}: ${found ? 'Found' : 'Missing'}`);
    }
  }
  
  // Check for common issues
  console.log('\n4️⃣ Common Issues Check...\n');
  
  // Check if running on correct port
  const portCheck = await checkEndpoint('http://localhost:3001/', 'Wrong port check');
  if (portCheck.error && portCheck.error.includes('ECONNREFUSED')) {
    console.log('✅ Server is running on correct port 3000');
  } else {
    console.log('⚠️  Server might be running on multiple ports');
  }
  
  // Summary and recommendations
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📋 Diagnosis Summary\n');
  
  if (homepage.statusCode === 200) {
    console.log('✅ Server is responding');
    console.log('✅ Homepage is loading');
    
    console.log('\n🔧 Possible Issues:');
    console.log('1. CSS/JS files not loading properly');
    console.log('2. Hydration errors preventing React from mounting');
    console.log('3. Browser cache issues');
    console.log('4. Console errors in browser');
    
    console.log('\n💡 Try these solutions:');
    console.log('1. Open Chrome DevTools (F12) and check Console for errors');
    console.log('2. Hard refresh the page (Cmd+Shift+R on Mac)');
    console.log('3. Clear browser cache');
    console.log('4. Try incognito/private mode');
    console.log('5. Check if any browser extensions are blocking resources');
  } else {
    console.log('❌ Server is not responding properly');
    console.log('\n💡 Try:');
    console.log('1. Restart the server: npm run dev');
    console.log('2. Check if port 3000 is blocked');
    console.log('3. Check terminal for error messages');
  }
  
  console.log('\n🌐 Direct Links to Test:');
  console.log('• Homepage: http://localhost:3000');
  console.log('• API Health: http://localhost:3000/api/health/db');
  console.log('• Static Test: http://localhost:3000/favicon.ico');
}

runDiagnostics().catch(console.error);