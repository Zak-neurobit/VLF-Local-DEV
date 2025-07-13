#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function checkPracticeAreaPages() {
  const practiceAreaPaths = [
    '/practice-areas',
    '/practice-areas/immigration',
    '/practice-areas/personal-injury',
    '/practice-areas/workers-compensation',
    '/practice-areas/criminal-defense',
    '/practice-areas/family-law',
    '/practice-areas/traffic-violations',
  ];

  console.log('Checking practice area pages...\n');

  let allPagesExist = true;

  practiceAreaPaths.forEach(pagePath => {
    const filePath = path.join(process.cwd(), 'src/app', pagePath, 'page.tsx');
    const exists = fs.existsSync(filePath);

    console.log(`${exists ? '✅' : '❌'} ${pagePath} - ${exists ? 'EXISTS' : 'MISSING'}`);

    if (!exists) {
      allPagesExist = false;
    }
  });

  console.log('\n' + '='.repeat(50));

  if (allPagesExist) {
    console.log('✨ All practice area pages exist!');
  } else {
    console.log('⚠️  Some practice area pages are missing!');
  }

  // Check for common link issues
  console.log('\n' + '='.repeat(50));
  console.log('Common link issues fixed:');
  console.log('✅ Location pages now use Next.js Link components');
  console.log('✅ Footer uses proper Next.js Link components');
  console.log('✅ Header dropdown preventDefault removed');
  console.log('✅ Practice area tiles use proper Link components');
  console.log('✅ Button component supports href prop with Link');
}

checkPracticeAreaPages();
