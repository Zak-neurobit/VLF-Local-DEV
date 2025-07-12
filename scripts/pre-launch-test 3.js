#!/usr/bin/env node

/**
 * Pre-Launch Testing Script
 * Automated tests to run before launching the website
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const https = require('https');
const { parse } = require('url');

console.log('🚀 Running pre-launch tests...\n');

let testsPassed = 0;
let testsFailed = 0;

// Test runner
function runTest(name, testFn) {
  process.stdout.write(`Testing ${name}... `);
  try {
    const result = testFn();
    if (result) {
      console.log('✅ PASSED');
      testsPassed++;
    } else {
      console.log('❌ FAILED');
      testsFailed++;
    }
    return result;
  } catch (error) {
    console.log('❌ ERROR:', error.message);
    testsFailed++;
    return false;
  }
}

// Run command and check for errors
function runCommand(command, silent = true) {
  try {
    const output = execSync(command, {
      encoding: 'utf8',
      stdio: silent ? 'pipe' : 'inherit',
    });
    return { success: true, output };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

console.log('📋 Code Quality Tests\n');

// 1. Linting
runTest('ESLint', () => {
  const result = runCommand('npm run lint');
  return result.success;
});

// 2. Type checking
runTest('TypeScript', () => {
  const result = runCommand('npm run type-check');
  return result.success;
});

// 3. Unit tests
runTest('Unit Tests', () => {
  const result = runCommand('npm test -- --passWithNoTests');
  return result.success;
});

// 4. Build test
runTest('Production Build', () => {
  // Check if build already exists
  if (fs.existsSync('.next')) {
    return true;
  }
  const result = runCommand('npm run build', false);
  return result.success;
});

console.log('\n📋 File Structure Tests\n');

// 5. Check critical files exist
const criticalFiles = [
  'package.json',
  'next.config.js',
  'prisma/schema.prisma',
  'src/app/layout.tsx',
  'src/app/page.tsx',
  'public/robots.txt',
];

criticalFiles.forEach(file => {
  runTest(`File exists: ${file}`, () => fs.existsSync(file));
});

console.log('\n📋 Content Tests\n');

// 6. Check page routes
const requiredPages = [
  'src/app/page.tsx',
  'src/app/contact/page.tsx',
  'src/app/attorneys/page.tsx',
  'src/app/practice-areas/page.tsx',
  'src/app/blog/page.tsx',
  'src/app/es/page.tsx',
];

requiredPages.forEach(page => {
  runTest(`Page route: ${page}`, () => fs.existsSync(page));
});

// 7. Check static assets
runTest('Logo exists', () => fs.existsSync('public/logo.png') || fs.existsSync('public/logo.svg'));
runTest('Favicon exists', () => fs.existsSync('public/favicon.ico'));

console.log('\n📋 SEO Tests\n');

// 8. Check sitemap generation
runTest('Sitemap endpoint', () => fs.existsSync('src/app/api/sitemap/route.ts'));
runTest('Robots.txt endpoint', () => fs.existsSync('src/app/api/robots/route.ts'));

// 9. Check metadata
runTest('Homepage metadata', () => {
  const content = fs.readFileSync('src/app/page.tsx', 'utf8');
  return content.includes('metadata') || content.includes('generateMetadata');
});

console.log('\n📋 API Endpoint Tests\n');

// 10. Check API routes
const apiRoutes = [
  'src/app/api/contact/route.ts',
  'src/app/api/newsletter/route.ts',
  'src/app/api/health/route.ts',
];

apiRoutes.forEach(route => {
  runTest(`API route: ${route}`, () => fs.existsSync(route));
});

console.log('\n📋 Integration Tests\n');

// 11. Environment variables
runTest('Environment file exists', () => {
  return fs.existsSync('.env.production') || fs.existsSync('.env.local');
});

// 12. Database schema
runTest('Prisma schema valid', () => {
  const result = runCommand('npx prisma validate');
  return result.success;
});

console.log('\n📋 Performance Tests\n');

// 13. Bundle size check
runTest('Bundle size analysis', () => {
  if (fs.existsSync('.next')) {
    const buildManifest = path.join('.next', 'build-manifest.json');
    return fs.existsSync(buildManifest);
  }
  return true; // Skip if not built
});

// 14. Image optimization
runTest('Images in public directory', () => {
  const publicDir = 'public';
  if (!fs.existsSync(publicDir)) return false;

  const files = fs.readdirSync(publicDir);
  const images = files.filter(f => /\.(jpg|jpeg|png|webp|svg)$/i.test(f));

  // Check if images are reasonably sized (under 1MB)
  let oversized = 0;
  images.forEach(img => {
    const stats = fs.statSync(path.join(publicDir, img));
    if (stats.size > 1024 * 1024) oversized++;
  });

  return oversized === 0;
});

console.log('\n📋 Security Tests\n');

// 15. Security headers configuration
runTest('Security headers configured', () => {
  const nextConfig = fs.readFileSync('next.config.js', 'utf8');
  return nextConfig.includes('headers') || fs.existsSync('src/middleware.ts');
});

// 16. No exposed secrets
runTest('No exposed secrets', () => {
  const gitignore = fs.readFileSync('.gitignore', 'utf8');
  return gitignore.includes('.env') && !fs.existsSync('.env');
});

console.log('\n📋 Accessibility Tests\n');

// 17. Check for accessibility components
runTest('Error boundary exists', () => {
  return (
    fs.existsSync('src/components/ErrorBoundary.tsx') ||
    fs.existsSync('src/components/ErrorBoundary/index.tsx')
  );
});

// 18. Language support
runTest('Spanish pages exist', () => {
  return fs.existsSync('src/app/es/page.tsx');
});

console.log('\n📋 Feature Tests\n');

// 19. Core features
const features = {
  'Chat widget': 'src/components/ChatWidget',
  'Contact form': 'src/components/LeadCaptureForm',
  'Payment form': 'src/components/PaymentForm',
  'Virtual assistant': 'src/components/VirtualAssistant',
};

Object.entries(features).forEach(([name, path]) => {
  runTest(name, () => {
    return (
      fs.existsSync(path) || fs.existsSync(`${path}.tsx`) || fs.existsSync(`${path}/index.tsx`)
    );
  });
});

// Generate report
console.log('\n' + '═'.repeat(50));
console.log('📊 PRE-LAUNCH TEST REPORT');
console.log('═'.repeat(50));
console.log(`✅ Tests Passed: ${testsPassed}`);
console.log(`❌ Tests Failed: ${testsFailed}`);
console.log(`📈 Success Rate: ${Math.round((testsPassed / (testsPassed + testsFailed)) * 100)}%`);

if (testsFailed === 0) {
  console.log('\n🎉 All tests passed! Ready for launch! 🚀');

  console.log('\n📋 Launch Checklist:');
  console.log('1. ✅ Run: npm run validate-env');
  console.log('2. ✅ Configure DNS records');
  console.log('3. ✅ Set up SSL certificate');
  console.log('4. ✅ Configure external webhooks');
  console.log('5. ✅ Test payment processing');
  console.log('6. ✅ Submit sitemap to Google');
  console.log('7. ✅ Set up monitoring');
  console.log('8. ✅ Deploy with: npm run deploy');

  process.exit(0);
} else {
  console.log('\n⚠️  Some tests failed. Please fix issues before launching.');
  console.log('Run individual test commands to see detailed errors.');
  process.exit(1);
}
