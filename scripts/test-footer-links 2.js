const http = require('http');

console.log(`
🔗 Testing Footer & Additional Navigation Links
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

// Simple fetch function
function fetchPage(path) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: 'GET',
      timeout: 5000
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          statusText: res.statusMessage,
          content: data,
          headers: res.headers
        });
      });
    });

    req.on('error', (err) => {
      resolve({ status: 0, error: err.message });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({ status: 0, error: 'Request timeout' });
    });

    req.end();
  });
}

async function testLink(path, description) {
  const start = Date.now();
  const result = await fetchPage(path);
  const duration = Date.now() - start;
  
  const status = result.status;
  const statusSymbol = status === 200 ? '✅' : '❌';
  const statusColor = status === 200 ? '\x1b[32m' : '\x1b[31m';
  
  console.log(`${statusSymbol} ${description.padEnd(40)} ${path.padEnd(50)} ${statusColor}${status}\x1b[0m \x1b[36m${duration}ms\x1b[0m`);
  
  if (result.error) {
    console.log(`   └─ Error: ${result.error}`);
  }
  
  return { path, status, error: result.error };
}

async function runTests() {
  const links = [
    // Office Location Pages
    { path: '/locations/smithfield', desc: 'Smithfield Office' },
    { path: '/locations/charlotte', desc: 'Charlotte Office' },
    { path: '/locations/raleigh', desc: 'Raleigh Office' },
    { path: '/locations/orlando', desc: 'Orlando Office' },
    
    // Resource Pages
    { path: '/resources', desc: 'Resources Center' },
    { path: '/resources/immigration-guides', desc: 'Immigration Guides' },
    { path: '/resources/legal-calculators', desc: 'Legal Calculators' },
    { path: '/resources/forms', desc: 'Legal Forms' },
    
    // Blog Categories
    { path: '/blog/immigration', desc: 'Immigration Blog' },
    { path: '/blog/personal-injury', desc: 'Personal Injury Blog' },
    { path: '/blog/news', desc: 'News & Updates' },
    
    // Client Portal
    { path: '/client-portal', desc: 'Client Portal Login' },
    { path: '/client-portal/dashboard', desc: 'Client Dashboard' },
    
    // Additional Footer Links
    { path: '/careers', desc: 'Careers' },
    { path: '/community', desc: 'Community Involvement' },
    { path: '/media', desc: 'Media & Press' },
    { path: '/awards', desc: 'Awards & Recognition' },
    
    // Legal Resources
    { path: '/legal-disclaimer', desc: 'Legal Disclaimer' },
    { path: '/accessibility', desc: 'Accessibility Statement' },
    { path: '/cookie-policy', desc: 'Cookie Policy' },
    
    // Contact Forms
    { path: '/schedule-consultation', desc: 'Schedule Consultation' },
    { path: '/request-callback', desc: 'Request Callback' },
    
    // API Endpoints (should be protected)
    { path: '/api/health', desc: 'API Health Check' },
    { path: '/api', desc: 'API Root' },
  ];

  console.log('Testing additional navigation and footer links...\n');
  
  const results = {
    passed: 0,
    failed: 0,
    errors: []
  };

  for (const link of links) {
    const result = await testLink(link.path, link.desc);
    if (result.status === 200) {
      results.passed++;
    } else {
      results.failed++;
      results.errors.push(result);
    }
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`\x1b[1mSummary:\x1b[0m`);
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`📊 Total: ${links.length}`);
  console.log(`🎯 Success Rate: ${((results.passed / links.length) * 100).toFixed(1)}%`);

  if (results.errors.length > 0) {
    console.log(`\n\x1b[1m\x1b[31mBroken Links:\x1b[0m`);
    results.errors.forEach(err => {
      console.log(`  • ${err.path} (${err.status || 'Error'})`);
    });
  }
}

runTests().catch(console.error);