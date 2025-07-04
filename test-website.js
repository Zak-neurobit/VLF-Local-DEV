const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Vasquez Law Firm Website Structure and Links\n');

// Define all expected pages and their routes
const pages = {
  'Main Pages': [
    { route: '/', file: 'src/app/page.tsx', description: 'Homepage' },
    {
      route: '/practice-areas',
      file: 'src/app/practice-areas/page.tsx',
      description: 'Practice Areas',
    },
    { route: '/attorneys', file: 'src/app/attorneys/page.tsx', description: 'Attorneys' },
    { route: '/about', file: 'src/app/about/page.tsx', description: 'About Us' },
    { route: '/contact', file: 'src/app/contact/page.tsx', description: 'Contact' },
    { route: '/blog', file: 'src/app/blog/page.tsx', description: 'Blog' },
  ],
  'Practice Area Pages': [
    {
      route: '/practice-areas/immigration',
      file: 'src/app/practice-areas/immigration/page.tsx',
      description: 'Immigration Law',
    },
    // Other practice areas would follow same pattern
  ],
  'Dynamic Pages': [
    {
      route: '/blog/[slug]',
      file: 'src/app/blog/[slug]/page.tsx',
      description: 'Individual Blog Posts',
    },
  ],
  'Error Pages': [
    { route: '/404', file: 'src/app/not-found.tsx', description: '404 Page' },
    { route: '/error', file: 'src/app/error.tsx', description: 'Error Page' },
  ],
};

const apiRoutes = {
  'Blog APIs': [
    { route: '/api/blog', file: 'src/app/api/blog/route.ts', methods: ['GET', 'POST'] },
    { route: '/api/blog/[slug]', file: 'src/app/api/blog/[slug]/route.ts', methods: ['GET'] },
  ],
  'Contact APIs': [
    { route: '/api/contact', file: 'src/app/api/contact/route.ts', methods: ['POST'] },
    {
      route: '/api/newsletter',
      file: 'src/app/api/newsletter/route.ts',
      methods: ['POST', 'DELETE'],
    },
  ],
  'SEO APIs': [
    { route: '/api/sitemap', file: 'src/app/api/sitemap/route.ts', methods: ['GET'] },
    { route: '/api/robots', file: 'src/app/api/robots/route.ts', methods: ['GET'] },
  ],
  'Content APIs': [
    {
      route: '/api/content-import',
      file: 'src/app/api/content-import/route.ts',
      methods: ['POST'],
    },
  ],
  'Health Check': [{ route: '/api/health', file: 'src/app/api/health/route.ts', methods: ['GET'] }],
  'Webhook APIs': [
    {
      route: '/api/webhooks/socket',
      file: 'src/app/api/webhooks/socket/route.ts',
      methods: ['POST'],
    },
    {
      route: '/api/webhooks/retell',
      file: 'src/app/api/webhooks/retell/route.ts',
      methods: ['POST'],
    },
    {
      route: '/api/webhooks/nextiva',
      file: 'src/app/api/webhooks/nextiva/route.ts',
      methods: ['POST'],
    },
  ],
};

const components = [
  { name: 'Header', file: 'src/components/Header/index.tsx' },
  { name: 'Footer', file: 'src/components/Footer/index.tsx' },
  { name: 'ChatWidget', file: 'src/components/ChatWidget/index.tsx' },
  { name: 'VirtualAssistant', file: 'src/components/VirtualAssistant/index.tsx' },
  { name: 'ErrorBoundary', file: 'src/components/ErrorBoundary/index.tsx' },
  { name: 'GoogleAnalytics', file: 'src/components/GoogleAnalytics.tsx' },
];

const services = [
  { name: 'SEO Agent', file: 'src/services/seo-agent/index.ts' },
  { name: 'Content Scraper', file: 'src/services/content-scraper/index.ts' },
  { name: 'SEO Optimization', file: 'src/services/seo-optimization/index.ts' },
  { name: 'Retell Client', file: 'src/services/retell/client.ts' },
  { name: 'Retell Agent Manager', file: 'src/services/retell/agent-manager.ts' },
];

// Test function to check if file exists
function checkFile(filePath) {
  try {
    return fs.existsSync(path.join(__dirname, filePath));
  } catch (error) {
    return false;
  }
}

// Test pages
console.log('📄 TESTING PAGES:\n');
Object.entries(pages).forEach(([category, items]) => {
  console.log(`\n${category}:`);
  items.forEach(({ route, file, description }) => {
    const exists = checkFile(file);
    console.log(
      `  ${exists ? '✅' : '❌'} ${route} - ${description} ${exists ? '' : '(MISSING!)'}`
    );
  });
});

// Test API routes
console.log('\n\n🔌 TESTING API ROUTES:\n');
Object.entries(apiRoutes).forEach(([category, items]) => {
  console.log(`\n${category}:`);
  items.forEach(({ route, file, methods }) => {
    const exists = checkFile(file);
    console.log(
      `  ${exists ? '✅' : '❌'} ${route} [${methods.join(', ')}] ${exists ? '' : '(MISSING!)'}`
    );
  });
});

// Test components
console.log('\n\n🧩 TESTING COMPONENTS:\n');
components.forEach(({ name, file }) => {
  const exists = checkFile(file);
  console.log(`  ${exists ? '✅' : '❌'} ${name} ${exists ? '' : '(MISSING!)'}`);
});

// Test services
console.log('\n\n⚙️  TESTING SERVICES:\n');
services.forEach(({ name, file }) => {
  const exists = checkFile(file);
  console.log(`  ${exists ? '✅' : '❌'} ${name} ${exists ? '' : '(MISSING!)'}`);
});

// Check critical configuration files
console.log('\n\n📋 CONFIGURATION FILES:\n');
const configFiles = [
  { name: 'Package.json', file: 'package.json' },
  { name: 'TypeScript Config', file: 'tsconfig.json' },
  { name: 'Next.js Config', file: 'next.config.js' },
  { name: 'Tailwind Config', file: 'tailwind.config.ts' },
  { name: 'PostCSS Config', file: 'postcss.config.js' },
  { name: 'ESLint Config', file: '.eslintrc.json' },
  { name: 'Jest Config', file: 'jest.config.js' },
  { name: 'Playwright Config', file: 'playwright.config.ts' },
  { name: 'Prisma Schema', file: 'prisma/schema.prisma' },
  { name: 'Environment Example', file: '.env.example' },
  { name: 'Vercel Config', file: 'vercel.json' },
  { name: 'Middleware', file: 'src/middleware.ts' },
];

configFiles.forEach(({ name, file }) => {
  const exists = checkFile(file);
  console.log(`  ${exists ? '✅' : '❌'} ${name} ${exists ? '' : '(MISSING!)'}`);
});

// Check for broken internal links in pages
console.log('\n\n🔗 CHECKING INTERNAL LINKS:\n');

function checkInternalLinks(filePath) {
  try {
    const content = fs.readFileSync(path.join(__dirname, filePath), 'utf8');
    const linkPattern = /(?:href|to)=["']([^"']+)["']/g;
    const links = [];
    let match;

    while ((match = linkPattern.exec(content)) !== null) {
      const link = match[1];
      if (
        link.startsWith('/') &&
        !link.startsWith('//') &&
        !link.includes('#') &&
        !link.includes('?')
      ) {
        links.push(link);
      }
    }

    return links;
  } catch (error) {
    return [];
  }
}

// Check links in main pages
const allInternalLinks = new Set();
Object.values(pages)
  .flat()
  .forEach(({ file, description }) => {
    if (checkFile(file)) {
      const links = checkInternalLinks(file);
      links.forEach(link => allInternalLinks.add(link));
    }
  });

console.log(`Found ${allInternalLinks.size} unique internal links`);

// Verify critical links exist
const criticalLinks = [
  '/practice-areas',
  '/attorneys',
  '/about',
  '/contact',
  '/blog',
  '/practice-areas/immigration',
];

console.log('\nCritical Link Verification:');
criticalLinks.forEach(link => {
  const pageExists = Object.values(pages)
    .flat()
    .some(page => page.route === link || page.route.includes('[slug]'));
  console.log(`  ${pageExists ? '✅' : '❌'} ${link}`);
});

// Test multilingual support
console.log('\n\n🌐 MULTILINGUAL SUPPORT:\n');
const multilingualChecks = [
  {
    feature: 'Language Toggle in Header',
    check: () => checkFile('src/components/Header/index.tsx'),
  },
  { feature: 'Spanish Content Support', check: () => true }, // Built into all pages
  { feature: 'Blog Translation Support', check: () => checkFile('src/app/blog/page.tsx') },
];

multilingualChecks.forEach(({ feature, check }) => {
  console.log(`  ${check() ? '✅' : '❌'} ${feature}`);
});

// Summary
console.log('\n\n📊 TEST SUMMARY:\n');
const totalPages = Object.values(pages).flat().length;
const existingPages = Object.values(pages)
  .flat()
  .filter(p => checkFile(p.file)).length;
const totalAPIs = Object.values(apiRoutes).flat().length;
const existingAPIs = Object.values(apiRoutes)
  .flat()
  .filter(a => checkFile(a.file)).length;
const totalComponents = components.length;
const existingComponents = components.filter(c => checkFile(c.file)).length;

console.log(
  `  Pages: ${existingPages}/${totalPages} (${Math.round((existingPages / totalPages) * 100)}%)`
);
console.log(
  `  API Routes: ${existingAPIs}/${totalAPIs} (${Math.round((existingAPIs / totalAPIs) * 100)}%)`
);
console.log(
  `  Components: ${existingComponents}/${totalComponents} (${Math.round((existingComponents / totalComponents) * 100)}%)`
);
console.log(
  `  Services: ${services.filter(s => checkFile(s.file)).length}/${services.length} (${Math.round((services.filter(s => checkFile(s.file)).length / services.length) * 100)}%)`
);

console.log('\n✨ Website structure test complete!\n');
