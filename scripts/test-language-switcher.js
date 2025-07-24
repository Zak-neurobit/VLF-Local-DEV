#!/usr/bin/env node

const { chromium } = require('playwright');

async function testLanguageSwitcher() {
  console.log('🌐 Testing Language Switcher...\n');
  
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
      
      // Find and click the language switcher
      let languageButton;
      if (testCase.switchTo === 'es') {
        // Look for ES button - handle both "ES" and " ES" (with space)
        languageButton = await page.locator('button').filter({ hasText: /^\s*ES\s*$/ }).first();
      } else {
        // Look for EN button - handle both "EN" and " EN" (with space)
        languageButton = await page.locator('button').filter({ hasText: /^\s*EN\s*$/ }).first();
      }
      
      if (await languageButton.isVisible()) {
        // Get current URL before click
        const beforeUrl = page.url();
        
        await languageButton.click();
        
        // Wait for navigation or timeout after 5 seconds
        try {
          await page.waitForURL(url => url !== beforeUrl, { timeout: 5000 });
        } catch (e) {
          // Navigation might not happen if URL is the same
        }
        
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
        console.log(`❌ Failed: ${testCase.name} - Language switcher not found\n`);
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