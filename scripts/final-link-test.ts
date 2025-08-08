import { promises as fs } from 'fs';
import path from 'path';
import { glob } from 'glob';

interface LinkTestResult {
  page: string;
  link: string;
  status: 'valid' | 'invalid' | 'external' | 'template' | 'anchor';
  error?: string;
}

async function isTemplateLiteral(link: string): Promise<boolean> {
  // Check if the link contains template literal syntax
  return link.includes('${') || link.includes('$2') || link.includes('\\/[^');
}

async function checkLinkExists(link: string): Promise<boolean> {
  // Skip external links
  if (
    link.startsWith('http://') ||
    link.startsWith('https://') ||
    link.startsWith('mailto:') ||
    link.startsWith('tel:')
  ) {
    return true;
  }

  // Skip anchors and query params for now
  const cleanLink = link.split('#')[0].split('?')[0];

  // Check special static files in public directory
  const staticFiles = [
    '/favicon.ico',
    '/apple-touch-icon.png',
    '/manifest.json',
    '/sitemap.xml',
    '/robots.txt',
    '/blog/rss.xml',
    '/hreflang-sitemap.xml',
  ];
  if (staticFiles.includes(cleanLink)) {
    if (cleanLink === '/sitemap.xml' || cleanLink === '/robots.txt') {
      // These are handled by Next.js metadata API
      return true;
    }
    const publicPath = path.join(process.cwd(), 'public', cleanLink);
    try {
      await fs.access(publicPath);
      return true;
    } catch {
      // Check if it has a route
      if (cleanLink === '/blog/rss.xml' || cleanLink === '/hreflang-sitemap.xml') {
        const routePath = path.join(process.cwd(), 'src/app', cleanLink, 'route.ts');
        try {
          await fs.access(routePath);
          return true;
        } catch {
          return false;
        }
      }
      return false;
    }
  }

  // Check icons
  if (cleanLink.startsWith('/icons/')) {
    const publicPath = path.join(process.cwd(), 'public', cleanLink);
    try {
      await fs.access(publicPath);
      return true;
    } catch {
      return false;
    }
  }

  // Check if it's an API route
  if (cleanLink.startsWith('/api/')) {
    const apiPath = path.join(process.cwd(), 'src/app', cleanLink, 'route.ts');
    try {
      await fs.access(apiPath);
      return true;
    } catch {
      return false;
    }
  }

  // Check if page exists
  const pagePath = path.join(process.cwd(), 'src/app', cleanLink, 'page.tsx');
  try {
    await fs.access(pagePath);
    return true;
  } catch {
    // Check if it's a known pattern
    const knownPatterns = [
      /^\/practice-areas\/(immigration|personal-injury|workers-compensation|criminal-defense|family-law|traffic-violations)$/,
      /^\/locations\/(smithfield|raleigh|charlotte|orlando)$/,
      /^\/attorneys\/[a-z-]+$/,
      /^\/blog\/[a-z0-9-]+$/,
      /^\/locations\/nc\/[a-z-]+$/,
      /^\/near-me\/[a-z-]+-near-me$/,
      /^\/es\/areas-de-practica\/[a-z-]+$/,
      /^\/es\/blog\/categoria\/[a-z-]+$/,
    ];

    return knownPatterns.some(pattern => pattern.test(cleanLink));
  }
}

async function extractLinksFromFile(filePath: string): Promise<string[]> {
  const content = await fs.readFile(filePath, 'utf-8');
  const links: string[] = [];

  // Extract href attributes (but not template literals)
  const hrefRegex = /href=["']([^"'$]+)["']/g;
  let match;
  while ((match = hrefRegex.exec(content)) !== null) {
    if (!match[1].includes('${')) {
      links.push(match[1]);
    }
  }

  // Extract Link component hrefs (but not template literals)
  const linkRegex = /<Link[^>]*href=["']([^"'$]+)["']/g;
  while ((match = linkRegex.exec(content)) !== null) {
    if (!match[1].includes('${')) {
      links.push(match[1]);
    }
  }

  return [...new Set(links)]; // Remove duplicates
}

async function testAllLinks() {
  console.log('🔍 Starting final comprehensive link test...\n');

  const results: LinkTestResult[] = [];
  const checkedLinks = new Set<string>();

  // Get all component files
  const componentFiles = await glob('src/**/*.{tsx,ts}', {
    ignore: ['**/node_modules/**', '**/.next/**', '**/tests/**', '**/*.test.*'],
  });

  // Extract and check links from each file
  for (const file of componentFiles) {
    const links = await extractLinksFromFile(file);

    for (const link of links) {
      const linkKey = `${file}:${link}`;
      if (checkedLinks.has(linkKey)) continue;
      checkedLinks.add(linkKey);

      if (await isTemplateLiteral(link)) {
        results.push({
          page: file,
          link,
          status: 'template',
        });
      } else if (link.startsWith('#') || link === '') {
        results.push({
          page: file,
          link,
          status: 'anchor',
        });
      } else {
        const isExternal =
          link.startsWith('http://') ||
          link.startsWith('https://') ||
          link.startsWith('mailto:') ||
          link.startsWith('tel:');

        if (isExternal) {
          results.push({
            page: file,
            link,
            status: 'external',
          });
        } else {
          const exists = await checkLinkExists(link);
          results.push({
            page: file,
            link,
            status: exists ? 'valid' : 'invalid',
            error: exists ? undefined : 'Page not found',
          });
        }
      }
    }
  }

  // Generate report
  const invalidLinks = results.filter(r => r.status === 'invalid');
  const validLinks = results.filter(r => r.status === 'valid');
  const externalLinks = results.filter(r => r.status === 'external');
  const templateLinks = results.filter(r => r.status === 'template');
  const anchorLinks = results.filter(r => r.status === 'anchor');

  console.log('📊 Final Link Test Results:');
  console.log(`✅ Valid internal links: ${validLinks.length}`);
  console.log(`🌐 External links: ${externalLinks.length}`);
  console.log(`📝 Template variables: ${templateLinks.length} (not actual links)`);
  console.log(`#️⃣ Anchor links: ${anchorLinks.length}`);
  console.log(`❌ Actually invalid links: ${invalidLinks.length}\n`);

  if (invalidLinks.length > 0) {
    console.log('❌ Actually Invalid Links That Need Fixing:\n');
    const groupedByLink: Record<string, string[]> = {};

    for (const result of invalidLinks) {
      if (!groupedByLink[result.link]) {
        groupedByLink[result.link] = [];
      }
      groupedByLink[result.link].push(result.page);
    }

    for (const [link, pages] of Object.entries(groupedByLink)) {
      console.log(`\n❌ Link: ${link}`);
      console.log('   Found in:');
      pages.forEach(page => {
        console.log(`   - ${page.replace(process.cwd() + '/', '')}`);
      });
    }
  } else {
    console.log('🎉 All links are valid! No broken links found.');
  }

  // Save detailed report
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      total: results.length,
      valid: validLinks.length,
      invalid: invalidLinks.length,
      external: externalLinks.length,
      template: templateLinks.length,
      anchor: anchorLinks.length,
    },
    invalidLinks: invalidLinks.map(r => ({
      link: r.link,
      foundIn: r.page.replace(process.cwd() + '/', ''),
      error: r.error,
    })),
  };

  await fs.writeFile('final-link-test-report.json', JSON.stringify(report, null, 2));

  console.log('\n📄 Detailed report saved to final-link-test-report.json');

  return invalidLinks.length === 0;
}

// Run the test
testAllLinks()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('Error:', error);
    process.exit(1);
  });
