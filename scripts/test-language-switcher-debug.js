#!/usr/bin/env node

const { chromium } = require('playwright');

async function testLanguageSwitcher() {
  console.log('🌐 Testing Language Switcher Debug...\n');
  
  const browser = await chromium.launch({ 
    headless: false,  // Show browser
    slowMo: 1000      // Slow down actions
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const baseUrl = 'http://localhost:3000';
  
  try {
    console.log('1. Going to homepage...');
    await page.goto(baseUrl);
    await page.waitForLoadState('networkidle');
    
    console.log('2. Looking for language switcher buttons...');
    
    // Debug: Log all button text
    const buttons = await page.locator('button').all();
    console.log(`Found ${buttons.length} buttons on page`);
    
    for (let i = 0; i < buttons.length; i++) {
      const text = await buttons[i].textContent();
      console.log(`  Button ${i}: "${text}"`);
    }
    
    // Try to find ES button
    const esButton = await page.locator('button:has-text("ES")').first();
    if (await esButton.isVisible()) {
      console.log('\n3. Found ES button, clicking it...');
      await esButton.click();
      
      // Wait a bit
      await page.waitForTimeout(2000);
      
      const newUrl = page.url();
      console.log(`4. After click, URL is: ${newUrl}`);
    } else {
      console.log('ES button not found!');
    }
    
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
  
  console.log('\nPress Ctrl+C to close browser...');
  await page.waitForTimeout(30000);
  
  await browser.close();
}

// Run the test
testLanguageSwitcher().catch(error => {
  console.error('Test failed:', error);
  process.exit(1);
});