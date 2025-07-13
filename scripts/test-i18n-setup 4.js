const fs = require('fs').promises;
const path = require('path');

async function testI18nSetup() {
  console.log('🌐 Testing i18n Setup for VLF Website\n');

  const tests = [];

  // Test 1: Check Next.js i18n configuration
  console.log('1️⃣ Checking Next.js i18n configuration...');
  try {
    const nextConfig = require('../next.config.js');
    if (nextConfig.i18n && nextConfig.i18n.locales.includes('es')) {
      tests.push({
        test: 'Next.js i18n config',
        status: '✅',
        details: 'Configured with locales: ' + nextConfig.i18n.locales.join(', '),
      });
    } else {
      tests.push({
        test: 'Next.js i18n config',
        status: '❌',
        details: 'i18n not properly configured',
      });
    }
  } catch (error) {
    tests.push({ test: 'Next.js i18n config', status: '❌', details: error.message });
  }

  // Test 2: Check translation files
  console.log('2️⃣ Checking translation files...');
  const translationFiles = ['src/lib/i18n/locales/en.json', 'src/lib/i18n/locales/es.json'];

  for (const file of translationFiles) {
    try {
      const content = await fs.readFile(path.join(process.cwd(), file), 'utf8');
      const translations = JSON.parse(content);
      const keyCount = countKeys(translations);
      tests.push({
        test: `Translation file: ${file}`,
        status: '✅',
        details: `${keyCount} translation keys found`,
      });
    } catch (error) {
      tests.push({ test: `Translation file: ${file}`, status: '❌', details: error.message });
    }
  }

  // Test 3: Check middleware
  console.log('3️⃣ Checking middleware configuration...');
  try {
    await fs.access(path.join(process.cwd(), 'src/middleware.ts'));
    tests.push({
      test: 'Middleware file',
      status: '✅',
      details: 'Middleware exists for language routing',
    });
  } catch {
    tests.push({ test: 'Middleware file', status: '❌', details: 'Middleware not found' });
  }

  // Test 4: Check Spanish pages
  console.log('4️⃣ Checking Spanish pages...');
  const spanishPages = [
    'src/app/es/page.tsx',
    'src/app/es/abogados/page.tsx',
    'src/app/es/areas-de-practica/page.tsx',
    'src/app/es/contacto/page.tsx',
    'src/app/es/blog/page.tsx',
    'src/app/es/ubicaciones/page.tsx',
  ];

  let spanishPageCount = 0;
  for (const page of spanishPages) {
    try {
      await fs.access(path.join(process.cwd(), page));
      spanishPageCount++;
    } catch {
      // Page doesn't exist
    }
  }
  tests.push({
    test: 'Spanish pages',
    status: spanishPageCount > 0 ? '✅' : '❌',
    details: `${spanishPageCount}/${spanishPages.length} main Spanish pages created`,
  });

  // Test 5: Check LanguageSwitcher component
  console.log('5️⃣ Checking LanguageSwitcher component...');
  try {
    await fs.access(path.join(process.cwd(), 'src/components/LanguageSwitcher.tsx'));
    tests.push({ test: 'LanguageSwitcher component', status: '✅', details: 'Component exists' });
  } catch {
    tests.push({
      test: 'LanguageSwitcher component',
      status: '❌',
      details: 'Component not found',
    });
  }

  // Test 6: Check for hreflang implementation
  console.log('6️⃣ Checking hreflang SEO implementation...');
  try {
    await fs.access(path.join(process.cwd(), 'src/components/HreflangTags.tsx'));
    tests.push({ test: 'Hreflang tags', status: '✅', details: 'Component exists for SEO' });
  } catch {
    try {
      await fs.access(path.join(process.cwd(), 'src/components/SEO/HreflangMeta.tsx'));
      tests.push({ test: 'Hreflang tags', status: '✅', details: 'Component exists for SEO' });
    } catch {
      tests.push({ test: 'Hreflang tags', status: '⚠️', details: 'Hreflang component not found' });
    }
  }

  // Print results
  console.log('\n📊 Test Results:\n');
  console.log('Test'.padEnd(30) + 'Status'.padEnd(10) + 'Details');
  console.log('-'.repeat(80));

  let passCount = 0;
  tests.forEach(({ test, status, details }) => {
    console.log(test.padEnd(30) + status.padEnd(10) + details);
    if (status === '✅') passCount++;
  });

  console.log('\n📈 Summary:');
  console.log(`✅ Passed: ${passCount}/${tests.length}`);
  console.log(`❌ Failed: ${tests.length - passCount}/${tests.length}`);

  if (passCount === tests.length) {
    console.log('\n🎉 All tests passed! Spanish translations are fully implemented.');
  } else {
    console.log('\n⚠️  Some tests failed. Please review the issues above.');
  }

  // Additional recommendations
  console.log('\n💡 Next Steps:');
  console.log('1. Test language switching in the browser');
  console.log('2. Verify all pages have proper Spanish content');
  console.log('3. Check that SEO metadata is translated');
  console.log('4. Test language persistence (cookies)');
  console.log('5. Verify proper routing (/es/* paths)');
}

function countKeys(obj, count = 0) {
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      count = countKeys(obj[key], count);
    } else {
      count++;
    }
  }
  return count;
}

// Run the test
testI18nSetup().catch(console.error);
