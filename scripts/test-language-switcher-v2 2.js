#!/usr/bin/env node

const { chromium } = require('playwright');

async function testLanguageSwitcher() {
  console.log('🌐 Testing Language Switcher v2...\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const baseUrl = 'http://localhost:3000';
  const testCases = [
    {
      name: 'Homepage to Spanish',
      startUrl: '/',
      expectedAfterSwitch: '/es',
      switchTo: 'es'
    },
    {
      name: 'Spanish Homepage to English',
      startUrl: '/es',
      expectedAfterSwitch: '/',
      switchTo: 'en'
    },
    {
      name: 'Blog page to Spanish',
      startUrl: '/blog',
      expectedAfterSwitch: '/es/blog',
      switchTo: 'es'
    },
    {
      name: 'Spanish Blog to English',
      startUrl: '/es/blog',
      expectedAfterSwitch: '/blog',
      switchTo: 'en'
    },
    {
      name: 'Contact page to Spanish',
      startUrl: '/contact',
      expectedAfterSwitch: '/es/contacto',
      switchTo: 'es'
    }
  ];
  
  let passed = 0;
  let failed = 0;
  
  for (const testCase of testCases) {
    try {
      console.log(`Testing: ${testCase.name}`);
      
      // Navigate to start URL
      await page.goto(`${baseUrl}${testCase.startUrl}`);
      await page.waitForLoadState('networkidle');
      
      // Find language switcher link - look for links with the language code
      let languageLink;
      if (testCase.switchTo === 'es') {
        // Look for link containing "ES" text
        languageLink = await page.locator('a:has-text("ES")').first();
      } else {
        // Look for link containing "EN" text
        languageLink = await page.locator('a:has-text("EN")').first();
      }
      
      if (await languageLink.isVisible()) {
        // Click the link
        await languageLink.click();
        
        // Wait for navigation
        await page.waitForLoadState('networkidle');
        
        // Check if URL changed correctly
        const currentUrl = new URL(page.url());
        const actualPath = currentUrl.pathname;
        
        if (actualPath === testCase.expectedAfterSwitch) {
          console.log(`✅ Passed: ${testCase.name}`);
          console.log(`   URL changed from ${testCase.startUrl} to ${actualPath}\n`);
          passed++;
        } else {
          console.log(`❌ Failed: ${testCase.name}`);
          console.log(`   Expected: ${testCase.expectedAfterSwitch}`);
          console.log(`   Actual: ${actualPath}\n`);
          failed++;
        }
      } else {
        console.log(`❌ Failed: ${testCase.name} - Language switcher not found`);
        
        // Debug: Log all links on the page
        const allLinks = await page.locator('a').all();
        console.log(`   Found ${allLinks.length} total links on page`);
        
        // Log first few link texts for debugging
        for (let i = 0; i < Math.min(5, allLinks.length); i++) {
          const text = await allLinks[i].textContent();
          console.log(`   Link ${i}: "${text}"`);
        }
        console.log('\n');
        
        failed++;
      }
      
    } catch (error) {
      console.log(`❌ Error in ${testCase.name}: ${error.message}\n`);
      failed++;
    }
  }
  
  console.log('\n📊 Test Summary:');
  console.log(`   Passed: ${passed}`);
  console.log(`   Failed: ${failed}`);
  console.log(`   Total: ${testCases.length}`);
  
  await browser.close();
  
  process.exit(failed > 0 ? 1 : 0);
}

// Run the tests
testLanguageSwitcher().catch(error => {
  console.error('Test failed:', error);
  process.exit(1);
});