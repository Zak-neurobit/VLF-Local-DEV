#!/usr/bin/env node

const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

console.log('\n🧪 Testing API Configurations...\n');

const tests = {
  Database: () => !!process.env.DATABASE_URL,
  OpenAI: () => !!process.env.OPENAI_API_KEY,
  'Retell AI': () => !!process.env.RETELL_API_KEY,
  'GoHighLevel API': () => !!process.env.GHL_API_KEY,
  'GoHighLevel Location': () => !!process.env.GHL_LOCATION_ID,
  'NextAuth URL': () => !!process.env.NEXTAUTH_URL,
  'NextAuth Secret': () => !!process.env.NEXTAUTH_SECRET,
};

let allPassed = true;

Object.entries(tests).forEach(([name, test]) => {
  const passed = test();
  console.log(`${passed ? '✅' : '❌'} ${name}`);
  if (!passed) allPassed = false;
});

console.log(
  '\n' + (allPassed ? '✅ All required APIs configured!' : '❌ Some APIs need configuration')
);

if (!allPassed) {
  console.log('\nRun: npm run setup:apis for detailed setup instructions');
}
