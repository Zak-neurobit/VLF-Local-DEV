import { promises as fs } from 'fs';
import path from 'path';
import { glob } from 'glob';

interface LinkTestResult {
  page: string;
  link: string;
  status: 'valid' | 'invalid' | 'external';
  error?: string;
}

async function getAllPages(): Promise<string[]> {
  const pages: string[] = [];

  // Get all page.tsx files
  const pageFiles = await glob('src/app/**/page.tsx', {
    ignore: ['**/node_modules/**', '**/.next/**'],
  });

  // Convert file paths to URL paths
  for (const file of pageFiles) {
    const urlPath = file
      .replace('src/app', '')
      .replace('/page.tsx', '')
      .replace(/\/index$/, '');

    pages.push(urlPath || '/');
  }

  return pages;
}

async function extractLinksFromFile(filePath: string): Promise<string[]> {
  const content = await fs.readFile(filePath, 'utf-8');
  const links: string[] = [];

  // Extract href attributes
  const hrefRegex = /href=["']([^"']+)["']/g;
  let match;
  while ((match = hrefRegex.exec(content)) !== null) {
    links.push(match[1]);
  }

  // Extract Link component hrefs
  const linkRegex = /<Link[^>]*href=["']([^"']+)["']/g;
  while ((match = linkRegex.exec(content)) !== null) {
    links.push(match[1]);
  }

  // Extract dynamic hrefs
  const dynamicHrefRegex = /href=\{[`"']([^`"']+)[`"']\}/g;
  while ((match = dynamicHrefRegex.exec(content)) !== null) {
    links.push(match[1]);
  }

  return [...new Set(links)]; // Remove duplicates
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
    // Check if it's a redirect or special case
    const specialPaths = [
      '/practice-areas/immigration',
      '/practice-areas/personal-injury',
      '/practice-areas/workers-compensation',
      '/practice-areas/criminal-defense',
      '/practice-areas/family-law',
      '/practice-areas/traffic-violations',
    ];

    return specialPaths.includes(cleanLink);
  }
}

async function testAllLinks() {
  console.log('🔍 Starting comprehensive link test...\n');

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
      } else if (link.startsWith('#') || link === '') {
        // Skip anchors and empty links
        continue;
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

  // Generate report
  const invalidLinks = results.filter(r => r.status === 'invalid');
  const validLinks = results.filter(r => r.status === 'valid');
  const externalLinks = results.filter(r => r.status === 'external');

  console.log('📊 Link Test Results:');
  console.log(`✅ Valid internal links: ${validLinks.length}`);
  console.log(`🌐 External links: ${externalLinks.length}`);
  console.log(`❌ Invalid links: ${invalidLinks.length}\n`);

  if (invalidLinks.length > 0) {
    console.log('❌ Invalid Links Found:\n');
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
  }

  // Save detailed report
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      total: results.length,
      valid: validLinks.length,
      invalid: invalidLinks.length,
      external: externalLinks.length,
    },
    invalidLinks: invalidLinks.map(r => ({
      link: r.link,
      foundIn: r.page.replace(process.cwd() + '/', ''),
      error: r.error,
    })),
    allLinks: results.map(r => ({
      link: r.link,
      status: r.status,
      foundIn: r.page.replace(process.cwd() + '/', ''),
    })),
  };

  await fs.writeFile('link-test-report.json', JSON.stringify(report, null, 2));

  console.log('\n📄 Detailed report saved to link-test-report.json');

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
