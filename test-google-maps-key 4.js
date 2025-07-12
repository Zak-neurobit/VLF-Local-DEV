// Test Google Maps API key configuration
require('dotenv').config({ path: '.env.local' });

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

console.log('\n🗺️  Google Maps API Key Test\n');
console.log('API Key exists:', !!apiKey);
console.log('API Key valid:', apiKey && !apiKey.includes('your-google-maps-api-key'));
console.log('API Key value:', apiKey ? `${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 5)}` : 'Not set');

if (apiKey === 'AIzaSyDTNj8r07d5G-u7gcUxxw558TBQNSdL02U') {
  console.log('\n✅ Google Maps API key correctly configured!');
} else {
  console.log('\n❌ Google Maps API key not properly configured');
}

console.log('\nNote: Make sure to restart your Next.js development server after updating .env.local');