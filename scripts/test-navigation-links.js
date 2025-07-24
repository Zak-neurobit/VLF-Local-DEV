const http = require('http');

console.log(`
🔗 Testing Navigation Links
━━━━━━━━━━━━━━━━━━━━━━━━━━━

This will test clicking through navigation links...
`);

// Test navigation by following redirects
async function testNavigation(fromUrl, toUrl, description) {
  return new Promise((resolve) => {
    // First, get the page
    http.get(`http://localhost:3000${fromUrl}`, (res1) => {
      let data1 = '';
      res1.on('data', chunk => data1 += chunk);
      res1.on('end', () => {
        // Check if the link exists in the HTML
        const linkExists = data1.includes(`href="${toUrl}"`);
        
        // Then try to navigate to the target
        http.get(`http://localhost:3000${toUrl}`, (res2) => {
          let data2 = '';
          res2.on('data', chunk => data2 += chunk);
          res2.on('end', () => {
            resolve({
              description,
              from: fromUrl,
              to: toUrl,
              linkExists,
              targetStatus: res2.statusCode,
              targetLoads: res2.statusCode === 200,
              hasContent: data2.length > 1000
            });
          });
        }).on('error', (err) => {
          resolve({
            description,
            from: fromUrl,
            to: toUrl,
            linkExists,
            error: err.message
          });
        });
      });
    }).on('error', (err) => {
      resolve({
        description,
        from: fromUrl,
        to: toUrl,
        error: err.message
      });
    });
  });
}

async function runTests() {
  const navigationTests = [
    { from: '/', to: '/practice-areas', desc: 'Home → Practice Areas' },
    { from: '/', to: '/attorneys', desc: 'Home → Attorneys' },
    { from: '/', to: '/locations', desc: 'Home → Locations' },
    { from: '/', to: '/contact', desc: 'Home → Contact' },
    { from: '/practice-areas', to: '/practice-areas/immigration', desc: 'Practice Areas → Immigration' },
    { from: '/practice-areas', to: '/', desc: 'Practice Areas → Home' },
    { from: '/attorneys', to: '/attorneys/william-vasquez', desc: 'Attorneys → William Vasquez' },
    { from: '/', to: '/es', desc: 'English → Spanish' },
    { from: '/es', to: '/', desc: 'Spanish → English' },
  ];

  console.log('Testing navigation links...\n');

  for (const test of navigationTests) {
    const result = await testNavigation(test.from, test.to, test.desc);
    
    const linkStatus = result.linkExists ? '✅' : '❌';
    const navStatus = result.targetLoads ? '✅' : '❌';
    const contentStatus = result.hasContent ? '✅' : '⚠️';
    
    console.log(`${result.description}`);
    console.log(`  Link exists: ${linkStatus} | Navigates: ${navStatus} | Has content: ${contentStatus}`);
    
    if (result.error) {
      console.log(`  ❌ Error: ${result.error}`);
    } else if (!result.targetLoads) {
      console.log(`  ❌ Target returned status: ${result.targetStatus}`);
    }
    console.log('');
  }

  // Test client-side navigation
  console.log('\n📱 Client-Side Navigation Test');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('\nTo test client-side navigation:');
  console.log('1. Open http://localhost:3000 in your browser');
  console.log('2. Open DevTools Console (F12)');
  console.log('3. Try clicking navigation links');
  console.log('4. Check for any console errors');
  console.log('\nCommon issues:');
  console.log('- Hydration errors (React/Next.js mismatch)');
  console.log('- JavaScript errors preventing navigation');
  console.log('- Missing route handlers');
  console.log('- Client-side routing conflicts');
}

runTests().catch(console.error);