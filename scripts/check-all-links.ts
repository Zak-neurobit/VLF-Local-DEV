#!/usr/bin/env tsx

import { promises as fs } from 'fs';
import path from 'path';
import { glob } from 'glob';

interface LinkCheck {
  sourceFile: string;
  link: string;
  type: 'internal' | 'external' | 'anchor';
  valid?: boolean;
  issue?: string;
}

async function extractLinks(filePath: string): Promise<string[]> {
  const content = await fs.readFile(filePath, 'utf-8');
  const links: string[] = [];

  // Match href attributes
  const hrefMatches = content.matchAll(/href=["']([^"']+)["']/g);
  for (const match of hrefMatches) {
    links.push(match[1]);
  }

  // Match Link component to attributes
  const toMatches = content.matchAll(/to=["']([^"']+)["']/g);
  for (const match of toMatches) {
    links.push(match[1]);
  }

  return links;
}

async function checkInternalLink(
  link: string,
  allPages: Set<string>
): Promise<{ valid: boolean; issue?: string }> {
  // Remove query strings and anchors
  const cleanLink = link.split('?')[0].split('#')[0];

  // Handle root path
  if (cleanLink === '/') {
    return { valid: allPages.has('/') || allPages.has('/page.tsx') };
  }

  // Check if page exists
  if (allPages.has(cleanLink)) {
    return { valid: true };
  }

  // Check with trailing slash
  if (allPages.has(cleanLink + '/')) {
    return { valid: true };
  }

  // Check without trailing slash
  if (cleanLink.endsWith('/') && allPages.has(cleanLink.slice(0, -1))) {
    return { valid: true };
  }

  // Special cases for known routes
  const specialRoutes = ['/api', '/admin', '/auth', '/_next'];
  if (specialRoutes.some(route => cleanLink.startsWith(route))) {
    return { valid: true };
  }

  return { valid: false, issue: 'Page not found' };
}

async function main() {
  console.log('🔍 Checking all links across the website...\n');

  // Get all pages
  const pageFiles = await glob('src/app/**/page.tsx', {
    ignore: ['**/node_modules/**'],
  });

  const allPages = new Set<string>();
  pageFiles.forEach(file => {
    let urlPath = file.replace('src/app', '').replace('/page.tsx', '');
    if (urlPath === '') urlPath = '/';
    allPages.add(urlPath);
  });

  console.log(`Found ${allPages.size} pages\n`);

  // Get all source files to check
  const sourceFiles = await glob('src/**/*.{ts,tsx,js,jsx}', {
    ignore: ['**/node_modules/**', '**/*.test.*', '**/*.spec.*'],
  });

  console.log(`Checking links in ${sourceFiles.length} source files...\n`);

  const issues: LinkCheck[] = [];
  let totalLinks = 0;
  let checkedFiles = 0;

  for (const file of sourceFiles) {
    const links = await extractLinks(file);
    if (links.length > 0) {
      checkedFiles++;

      for (const link of links) {
        totalLinks++;

        // Skip external links, variables, and dynamic links
        if (
          link.startsWith('http') ||
          link.startsWith('//') ||
          link.includes('${') ||
          link.includes('{') ||
          link === '#'
        ) {
          continue;
        }

        // Check internal links
        if (link.startsWith('/')) {
          const result = await checkInternalLink(link, allPages);
          if (!result.valid) {
            issues.push({
              sourceFile: file,
              link,
              type: 'internal',
              valid: false,
              issue: result.issue,
            });
          }
        }
      }

      if (checkedFiles % 100 === 0) {
        console.log(`   Checked ${checkedFiles} files...`);
      }
    }
  }

  console.log(`\n✅ Checked ${totalLinks} links in ${checkedFiles} files`);
  console.log(`❌ Found ${issues.length} broken links\n`);

  if (issues.length > 0) {
    // Group by issue type
    const byIssue = issues.reduce(
      (acc, issue) => {
        const key = issue.issue || 'Unknown';
        if (!acc[key]) acc[key] = [];
        acc[key].push(issue);
        return acc;
      },
      {} as Record<string, LinkCheck[]>
    );

    Object.entries(byIssue).forEach(([issueType, items]) => {
      console.log(`\n${issueType} (${items.length} links):`);

      // Group by link to avoid repetition
      const byLink = items.reduce(
        (acc, item) => {
          if (!acc[item.link]) acc[item.link] = [];
          acc[item.link].push(item.sourceFile);
          return acc;
        },
        {} as Record<string, string[]>
      );

      Object.entries(byLink)
        .slice(0, 10)
        .forEach(([link, files]) => {
          console.log(`   ${link}`);
          console.log(`      Found in: ${files[0]}`);
          if (files.length > 1) {
            console.log(`      And ${files.length - 1} other file(s)`);
          }
        });

      if (Object.keys(byLink).length > 10) {
        console.log(`   ... and ${Object.keys(byLink).length - 10} more`);
      }
    });

    // Save detailed report
    await fs.writeFile(
      'broken-links-report.json',
      JSON.stringify({ summary: { total: issues.length }, issues }, null, 2)
    );
    console.log('\n📄 Detailed report saved to: broken-links-report.json');
  }

  // Check for mixed language issues
  console.log('\n🌐 Checking for mixed language URL issues...');

  const spanishFiles = sourceFiles.filter(f => f.includes('/es/'));
  let mixedLanguageIssues = 0;

  for (const file of spanishFiles) {
    const content = await fs.readFile(file, 'utf-8');

    // Check for English URLs in Spanish files
    const englishUrls = [
      '/practice-areas/',
      '/immigration/',
      '/criminal-defense/',
      '/personal-injury/',
      '/workers-compensation/',
      '/family-law/',
      '/locations/',
      '/attorneys/',
      '/about/',
      '/contact/',
    ];

    for (const url of englishUrls) {
      if (content.includes(`"${url}`) || content.includes(`'${url}`)) {
        mixedLanguageIssues++;
        console.log(`   ⚠️  Spanish file contains English URL "${url}": ${file}`);
        break;
      }
    }
  }

  if (mixedLanguageIssues === 0) {
    console.log('   ✅ No mixed language URL issues found!');
  } else {
    console.log(`   ❌ Found ${mixedLanguageIssues} files with mixed language URLs`);
  }

  console.log('\n✨ Link check complete!');
}

main().catch(console.error);
