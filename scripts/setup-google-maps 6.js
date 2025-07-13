#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n=== Google Maps API Setup ===\n');

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setupGoogleMaps() {
  console.log('This script will help you set up Google Maps for your Vasquez Law Firm website.\n');
  
  console.log('To get a Google Maps API key:');
  console.log('1. Go to https://console.cloud.google.com/');
  console.log('2. Create a new project or select an existing one');
  console.log('3. Enable the Maps JavaScript API');
  console.log('4. Create credentials (API Key)');
  console.log('5. (Optional) Restrict the API key to your domain for security\n');

  const apiKey = await question('Enter your Google Maps API key (or press Enter to skip): ');
  
  if (!apiKey || apiKey.trim() === '') {
    console.log('\nSkipping Google Maps setup. Maps will show fallback content.');
    rl.close();
    return;
  }

  // Update environment files
  const envFiles = ['.env.local', '.env'];
  
  for (const envFile of envFiles) {
    const envPath = path.join(process.cwd(), envFile);
    
    try {
      let content = '';
      
      if (fs.existsSync(envPath)) {
        content = fs.readFileSync(envPath, 'utf8');
        
        // Check if key already exists
        const keyRegex = /^NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=.*/m;
        
        if (keyRegex.test(content)) {
          // Update existing key
          content = content.replace(keyRegex, `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=${apiKey.trim()}`);
          console.log(`✓ Updated Google Maps API key in ${envFile}`);
        } else {
          // Add new key
          content += `\n# Google Maps API\nNEXT_PUBLIC_GOOGLE_MAPS_API_KEY=${apiKey.trim()}\n`;
          console.log(`✓ Added Google Maps API key to ${envFile}`);
        }
      } else {
        // Create new file with key
        content = `# Google Maps API\nNEXT_PUBLIC_GOOGLE_MAPS_API_KEY=${apiKey.trim()}\n`;
        console.log(`✓ Created ${envFile} with Google Maps API key`);
      }
      
      fs.writeFileSync(envPath, content);
    } catch (error) {
      console.error(`✗ Error updating ${envFile}:`, error.message);
    }
  }
  
  console.log('\n✓ Google Maps setup complete!');
  console.log('\nNext steps:');
  console.log('1. Restart your development server for changes to take effect');
  console.log('2. Maps should now display on contact and location pages');
  console.log('\nIf you encounter issues:');
  console.log('- Ensure the API key has Maps JavaScript API enabled');
  console.log('- Check browser console for any errors');
  console.log('- Verify API key restrictions (if any) allow your domain\n');
  
  rl.close();
}

setupGoogleMaps().catch(error => {
  console.error('Setup failed:', error);
  rl.close();
  process.exit(1);
});