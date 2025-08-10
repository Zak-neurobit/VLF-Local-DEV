// Test script to identify the crash cause
const puppeteer = require('puppeteer');

async function testVoiceAssistant() {
  console.log('🔍 Testing Voice Assistant for errors...\n');
  
  let browser;
  try {
    // Launch browser
    browser = await puppeteer.launch({
      headless: false, // Show browser to see what happens
      devtools: true, // Open devtools automatically
    });
    
    const page = await browser.newPage();
    
    // Listen for console messages
    page.on('console', msg => {
      const type = msg.type();
      const text = msg.text();
      
      if (type === 'error') {
        console.error('❌ Browser Error:', text);
      } else if (text.includes('Error') || text.includes('error')) {
        console.warn('⚠️  Error-related log:', text);
      } else if (text.includes('Retell') || text.includes('voice')) {
        console.log('📞 Voice-related log:', text);
      }
    });
    
    // Listen for page errors
    page.on('error', error => {
      console.error('❌ Page crashed:', error);
    });
    
    // Listen for uncaught exceptions
    page.on('pageerror', error => {
      console.error('❌ Uncaught exception:', error);
    });
    
    // Navigate to the site
    console.log('📱 Opening site...');
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle0' });
    
    // Wait for chat widget to load
    await page.waitForTimeout(3000);
    
    // Try to open chat widget
    console.log('💬 Opening chat widget...');
    const chatButton = await page.$('[class*="MessageCircle"]');
    if (chatButton) {
      await chatButton.click();
      await page.waitForTimeout(2000);
    }
    
    // Try to click phone button
    console.log('📞 Clicking phone button...');
    const phoneButton = await page.$('[class*="Phone"]');
    if (phoneButton) {
      await phoneButton.click();
      console.log('✅ Phone button clicked, watching for errors...');
      
      // Wait and watch for errors
      await page.waitForTimeout(10000);
    }
    
    console.log('\n📊 Test complete. Check the browser window and console output above.');
    
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    // Don't close browser immediately so we can see what happened
    console.log('\nKeeping browser open for inspection. Press Ctrl+C to exit.');
  }
}

// Check if puppeteer is installed
try {
  require.resolve('puppeteer');
  testVoiceAssistant();
} catch (e) {
  console.log('Puppeteer not installed. Install with: npm install --save-dev puppeteer');
}