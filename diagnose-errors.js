#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Diagnosing 404 and 500 errors on VLF Website\n');

// 1. Check for missing pages referenced in navigation
console.log('1. Checking navigation links vs actual pages...\n');

const navLinks = [
  // Main navigation links
  '/practice-areas',
  '/attorneys',
  '/locations',
  '/contact',
  '/blog',
  '/faq',

  // Practice area subpages
  '/practice-areas/immigration',
  '/practice-areas/immigration/green-cards',
  '/practice-areas/immigration/family-based-relative',
  '/practice-areas/immigration/employment-based-immigration',
  '/practice-areas/immigration/citizenship-naturalization',
  '/practice-areas/immigration/daca-deferred-action-childhood-arrivals',
  '/practice-areas/immigration/deportation-removal-defense',
  '/practice-areas/immigration/asylum-refugee-legal-help',
  '/practice-areas/immigration/vawa-u-visa-crime-victims',

  '/practice-areas/personal-injury',
  '/practice-areas/personal-injury/car-accidents',
  '/practice-areas/personal-injury/truck-accidents',
  '/practice-areas/personal-injury/motorcycle-accidents',
  '/practice-areas/personal-injury/pedestrian-accidents',
  '/practice-areas/personal-injury/premises-liability',
  '/practice-areas/personal-injury/drunk-driver-accidents',

  '/practice-areas/workers-compensation',
  '/practice-areas/workers-compensation/construction-site-injuries',
  '/practice-areas/workers-compensation/repetitive-stress-carpal-tunnel',
  '/practice-areas/workers-compensation/third-party-injury-claims',

  '/practice-areas/criminal-defense',
  '/practice-areas/criminal-defense/dui-dwi',
  '/practice-areas/criminal-defense/drug-crimes',
  '/practice-areas/criminal-defense/assault-battery',
  '/practice-areas/criminal-defense/domestic-violence',

  '/practice-areas/family-law',
  '/practice-areas/family-law/divorce',
  '/practice-areas/family-law/child-custody',
  '/practice-areas/family-law/property-division',
  '/practice-areas/family-law/alimony-spousal-support',

  '/practice-areas/traffic-violations',
];

const missingPages = [];
const existingPages = [];

navLinks.forEach(link => {
  const pagePath = path.join(__dirname, 'src/app', link, 'page.tsx');
  const altPagePath = path.join(__dirname, 'src/app', link, 'page.ts');

  if (fs.existsSync(pagePath) || fs.existsSync(altPagePath)) {
    existingPages.push(link);
  } else {
    missingPages.push(link);
  }
});

if (missingPages.length > 0) {
  console.log('❌ Missing pages (will cause 404 errors):');
  missingPages.forEach(page => console.log(`   - ${page}`));
  console.log('');
} else {
  console.log('✅ All navigation links have corresponding pages\n');
}

// 2. Check for API routes that might fail
console.log('2. Checking API routes for potential 500 errors...\n');

const apiDir = path.join(__dirname, 'src/app/api');
const problematicApis = [];

function checkApiRoute(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];

  // Check for database dependencies without proper error handling
  if (content.includes('getPrismaClient()') || content.includes('prisma.')) {
    if (!content.includes('try') || !content.includes('catch')) {
      issues.push('Database operations without try-catch');
    }
  }

  // Check for missing environment variables
  const envVarMatches = content.match(/process\.env\.(\w+)/g);
  if (envVarMatches) {
    envVarMatches.forEach(match => {
      const varName = match.replace('process.env.', '');
      if (
        !content.includes(`process.env.${varName} ||`) &&
        !content.includes(`if (!process.env.${varName})`)
      ) {
        issues.push(`Unchecked env var: ${varName}`);
      }
    });
  }

  if (issues.length > 0) {
    problematicApis.push({
      file: filePath.replace(__dirname, '.'),
      issues,
    });
  }
}

function walkApiDir(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walkApiDir(fullPath);
    } else if (file === 'route.ts' || file === 'route.tsx') {
      checkApiRoute(fullPath);
    }
  });
}

walkApiDir(apiDir);

if (problematicApis.length > 0) {
  console.log('⚠️  API routes with potential issues:');
  problematicApis.forEach(api => {
    console.log(`\n   ${api.file}:`);
    api.issues.forEach(issue => console.log(`     - ${issue}`));
  });
  console.log('');
} else {
  console.log('✅ All API routes appear to have proper error handling\n');
}

// 3. Check for middleware issues
console.log('3. Checking middleware configuration...\n');

const middlewarePath = path.join(__dirname, 'src/middleware.ts');
if (fs.existsSync(middlewarePath)) {
  const middlewareContent = fs.readFileSync(middlewarePath, 'utf8');

  // Check for proper locale handling
  if (middlewareContent.includes('locale')) {
    console.log('✅ Locale handling found in middleware');
  }

  // Check for authentication handling
  if (middlewareContent.includes('getToken') || middlewareContent.includes('auth')) {
    console.log('✅ Authentication handling found in middleware');
  }

  // Check for proper error handling
  if (!middlewareContent.includes('try') || !middlewareContent.includes('catch')) {
    console.log('⚠️  Middleware might need better error handling');
  }
} else {
  console.log('❌ No middleware.ts file found');
}

console.log('\n4. Common causes of errors:\n');
console.log('   404 Errors:');
console.log('   - Missing page files in app directory');
console.log('   - Incorrect link paths in navigation');
console.log('   - Middleware redirecting incorrectly');
console.log('   - Catch-all route returning 404 too aggressively\n');

console.log('   500 Errors:');
console.log('   - Database connection failures (missing DATABASE_URL)');
console.log('   - Missing environment variables');
console.log('   - Unhandled promises in API routes');
console.log('   - Import errors or missing dependencies\n');

// 5. Check environment configuration
console.log('5. Checking environment configuration...\n');

const envExample = path.join(__dirname, '.env.example');
const envLocal = path.join(__dirname, '.env.local');
const env = path.join(__dirname, '.env');

if (fs.existsSync(envExample)) {
  const requiredVars = fs
    .readFileSync(envExample, 'utf8')
    .split('\n')
    .filter(line => line && !line.startsWith('#'))
    .map(line => line.split('=')[0]);

  console.log(`📋 Required environment variables (${requiredVars.length} total):`);
  console.log('   Key variables: DATABASE_URL, NEXTAUTH_SECRET, OPENAI_API_KEY\n');
}

// Summary
console.log('📊 Summary:\n');
console.log(`   - Total navigation links checked: ${navLinks.length}`);
console.log(`   - Missing pages: ${missingPages.length}`);
console.log(`   - Problematic API routes: ${problematicApis.length}`);

if (missingPages.length === 0 && problematicApis.length === 0) {
  console.log('\n✅ No major issues found!');
} else {
  console.log('\n⚠️  Issues found that need attention');
}

console.log('\n💡 Recommendations:');
console.log('   1. Create missing page files for 404 errors');
console.log('   2. Add proper error handling to API routes');
console.log('   3. Ensure all environment variables are set');
console.log('   4. Test with a proper database connection');
console.log('   5. Check browser console for client-side errors\n');
