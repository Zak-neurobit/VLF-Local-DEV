const http = require('http');

console.log('🧪 Testing all pages for errors...\n');

const pages = [
  // Main pages
  { path: '/', name: 'Home' },
  { path: '/scholarship', name: 'Scholarship' },
  { path: '/practice-areas', name: 'Practice Areas' },
  { path: '/about', name: 'About' },
  { path: '/contact', name: 'Contact' },
  { path: '/locations', name: 'Locations' },
  { path: '/attorneys', name: 'Attorneys' },
  { path: '/faq', name: 'FAQ' },
  
  // Attorney subpages
  { path: '/attorneys/william-vasquez', name: 'Attorney: William Vasquez' },
  { path: '/attorneys/adrianna-ingram', name: 'Attorney: Adrianna Ingram' },
  { path: '/attorneys/christopher-afanador', name: 'Attorney: Christopher Afanador' },
  { path: '/attorneys/jillian-baucom', name: 'Attorney: Jillian Baucom' },
  { path: '/attorneys/judith-parkes', name: 'Attorney: Judith Parkes' },
  { path: '/attorneys/kelly-vega', name: 'Attorney: Kelly Vega' },
  { path: '/attorneys/mark-kelsey', name: 'Attorney: Mark Kelsey' },
  { path: '/attorneys/rebecca-sommer', name: 'Attorney: Rebecca Sommer' },
  { path: '/attorneys/roselyn-torrellas', name: 'Attorney: Roselyn Torrellas' },
  
  // Location subpages
  { path: '/locations/charlotte', name: 'Location: Charlotte' },
  { path: '/locations/charlotte-nc', name: 'Location: Charlotte NC' },
  { path: '/locations/durham', name: 'Location: Durham' },
  { path: '/locations/nc', name: 'Location: NC' },
  { path: '/locations/orlando', name: 'Location: Orlando' },
  { path: '/locations/raleigh', name: 'Location: Raleigh' },
  { path: '/locations/raleigh-nc', name: 'Location: Raleigh NC' },
  { path: '/locations/smithfield', name: 'Location: Smithfield' },
  { path: '/locations/winston-salem', name: 'Location: Winston-Salem' },
  
  // Practice area subpages
  { path: '/practice-areas/immigration', name: 'Practice: Immigration' },
  { path: '/practice-areas/inmigracion', name: 'Practice: Inmigración' },
  { path: '/practice-areas/personal-injury', name: 'Practice: Personal Injury' },
  { path: '/practice-areas/lesiones-personales', name: 'Practice: Lesiones Personales' },
  { path: '/practice-areas/criminal-defense', name: 'Practice: Criminal Defense' },
  { path: '/practice-areas/defensa-criminal', name: 'Practice: Defensa Criminal' },
  { path: '/practice-areas/family-law', name: 'Practice: Family Law' },
  { path: '/practice-areas/derecho-familiar', name: 'Practice: Derecho Familiar' },
  { path: '/practice-areas/workers-compensation', name: 'Practice: Workers Compensation' },
  { path: '/practice-areas/compensacion-laboral', name: 'Practice: Compensación Laboral' },
  { path: '/practice-areas/traffic-violations', name: 'Practice: Traffic Violations' }
];

const PORT = 3002;
const failedPages = [];
const successPages = [];

async function testPage(page) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: PORT,
      path: page.path,
      method: 'GET',
      timeout: 10000
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const success = res.statusCode === 200 && !data.includes('Error:') && !data.includes('BAILOUT_TO_CLIENT_SIDE_RENDERING');
        
        if (success) {
          console.log(`✅ ${page.name} (${page.path}) - OK`);
          successPages.push(page);
        } else {
          console.log(`❌ ${page.name} (${page.path}) - Status: ${res.statusCode}`);
          if (data.includes('Error:')) {
            console.log(`   Error found in response`);
          }
          failedPages.push({ ...page, statusCode: res.statusCode });
        }
        resolve();
      });
    });

    req.on('error', (error) => {
      console.log(`❌ ${page.name} (${page.path}) - Connection error: ${error.message}`);
      failedPages.push({ ...page, error: error.message });
      resolve();
    });

    req.on('timeout', () => {
      console.log(`❌ ${page.name} (${page.path}) - Timeout`);
      failedPages.push({ ...page, error: 'Timeout' });
      req.destroy();
      resolve();
    });

    req.end();
  });
}

async function testAllPages() {
  console.log(`Testing ${pages.length} pages on port ${PORT}...\n`);
  console.log('Make sure the dev server is running on port', PORT, '\n');
  
  // Test pages in batches to avoid overwhelming the server
  const batchSize = 5;
  for (let i = 0; i < pages.length; i += batchSize) {
    const batch = pages.slice(i, i + batchSize);
    await Promise.all(batch.map(testPage));
    
    // Small delay between batches
    if (i + batchSize < pages.length) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  
  console.log('\n=== Test Results ===');
  console.log(`✅ Successful: ${successPages.length}/${pages.length} pages`);
  console.log(`❌ Failed: ${failedPages.length}/${pages.length} pages`);
  
  if (failedPages.length > 0) {
    console.log('\nFailed pages:');
    failedPages.forEach(page => {
      console.log(`  - ${page.name} (${page.path})`);
      if (page.error) console.log(`    Error: ${page.error}`);
      if (page.statusCode) console.log(`    Status: ${page.statusCode}`);
    });
  }
}

testAllPages();