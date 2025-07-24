#!/usr/bin/env node

const http = require('http');
const https = require('https');

async function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https:') ? https : http;
    protocol.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function testLanguageSwitcher() {
  console.log('🌐 Testing Language Switcher Presence...\n');
  
  const baseUrl = 'http://localhost:3000';
  const pages = ['/', '/blog', '/contact'];
  
  for (const page of pages) {
    try {
      console.log(`Testing page: ${page}`);
      const html = await fetchPage(baseUrl + page);
      
      // Check for LanguageSwitcher patterns
      const hasLanguageSwitcher = 
        html.includes('LanguageSwitcher') ||
        html.includes('Switch to English') ||
        html.includes('Switch to Español') ||
        html.includes('button>EN</button>') ||
        html.includes('button>ES</button>') ||
        html.includes('>English<') ||
        html.includes('>Español<');
      
      if (hasLanguageSwitcher) {
        console.log(`✅ Language switcher found on ${page}\n`);
      } else {
        console.log(`❌ Language switcher NOT found on ${page}\n`);
        // Show a snippet of the HTML to debug
        const startIndex = html.indexOf('<header');
        const endIndex = html.indexOf('</header>') + 9;
        if (startIndex !== -1 && endIndex !== -1) {
          console.log('Header snippet:');
          console.log(html.substring(startIndex, Math.min(startIndex + 500, endIndex)));
          console.log('...\n');
        }
      }
    } catch (error) {
      console.log(`❌ Error fetching ${page}: ${error.message}\n`);
    }
  }
}

// Run the test
testLanguageSwitcher().catch(error => {
  console.error('Test failed:', error);
  process.exit(1);
});