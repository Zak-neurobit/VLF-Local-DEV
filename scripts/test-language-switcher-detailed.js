#!/usr/bin/env node

const { chromium } = require('playwright');

async function testLanguageSwitcher() {
  console.log('🌐 Testing Language Switcher with Console Logs...\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Listen to console messages
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('❌ Console Error:', msg.text());
    }
  });
  
  // Listen to page errors
  page.on('pageerror', err => {
    console.log('❌ Page Error:', err.message);
  });
  
  const baseUrl = 'http://localhost:3000';
  
  try {
    console.log('1. Testing Homepage → Spanish');
    await page.goto(baseUrl);
    await page.waitForLoadState('networkidle');
    
    // Check if language switcher exists
    const esButtons = await page.locator('button').filter({ hasText: /^\s*ES\s*$/ }).all();
    console.log(`   Found ${esButtons.length} ES buttons`);
    
    if (esButtons.length > 0) {
      // Check if button is disabled
      const isDisabled = await esButtons[0].isDisabled();
      console.log(`   Button disabled: ${isDisabled}`);
      
      // Get button parent to check for any click handlers
      const buttonHTML = await esButtons[0].evaluate(el => el.outerHTML);
      console.log(`   Button HTML: ${buttonHTML}`);
      
      // Click the button
      console.log('   Clicking ES button...');
      await esButtons[0].click();
      
      // Wait a bit
      await page.waitForTimeout(2000);
      
      const newUrl = page.url();
      console.log(`   After click URL: ${newUrl}`);
      
      // Check if hasSpanishVersion is working
      const hasSpanish = await page.evaluate(() => {
        // Try to access the function if it's exposed
        return window.hasSpanishVersion ? window.hasSpanishVersion(window.location.pathname) : 'function not exposed';
      });
      console.log(`   hasSpanishVersion result: ${hasSpanish}`);
    }
    
    console.log('\n2. Testing Blog → Spanish');
    await page.goto(`${baseUrl}/blog`);
    await page.waitForLoadState('networkidle');
    
    const blogEsButtons = await page.locator('button').filter({ hasText: /^\s*ES\s*$/ }).all();
    console.log(`   Found ${blogEsButtons.length} ES buttons`);
    
    if (blogEsButtons.length > 0) {
      console.log('   Clicking ES button...');
      await blogEsButtons[0].click();
      await page.waitForTimeout(2000);
      
      const newUrl = page.url();
      console.log(`   After click URL: ${newUrl}`);
    }
    
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
  
  await browser.close();
}

// Run the test
testLanguageSwitcher().catch(error => {
  console.error('Test failed:', error);
  process.exit(1);
});