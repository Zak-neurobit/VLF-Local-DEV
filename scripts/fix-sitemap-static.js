#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🔧 Fixing sitemap files for static export...');

// Find all sitemap route files
const sitemapFiles = glob.sync('src/app/**/*sitemap*/route.ts', {
  cwd: process.cwd(),
  absolute: true,
});

// Also include the rss.xml and hreflang-sitemap.xml files
sitemapFiles.push(
  ...glob.sync('src/app/**/rss.xml/route.ts', {
    cwd: process.cwd(),
    absolute: true,
  }),
  ...glob.sync('src/app/**/hreflang-sitemap.xml/route.ts', {
    cwd: process.cwd(),
    absolute: true,
  })
);

console.log(`Found ${sitemapFiles.length} sitemap files to fix`);

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.vasquezlawnc.com';

sitemapFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Check if file uses headers()
  if (content.includes('headers()') || content.includes('headers }')) {
    console.log(`Fixing ${path.relative(process.cwd(), file)}`);

    // Remove headers import
    content = content.replace(/import\s*{\s*headers\s*}\s*from\s*['"]next\/headers['"];?\n?/g, '');

    // Remove headers usage and replace with static base URL
    content = content.replace(/const headersList = await headers\(\);?\n/g, '');
    content = content.replace(
      /const host = headersList\.get\(['"]host['"]\)\s*\|\|\s*['"][^'"]+['"];?\n/g,
      ''
    );
    content = content.replace(
      /const protocol = process\.env\.NODE_ENV === ['"]production['"] \? ['"]https['"] : ['"]http['"];?\n/g,
      ''
    );
    content = content.replace(/const baseUrl = [`'"][^`'"]*[`'"];?\n/g, '');

    // Add static baseUrl after other imports
    const lastImportMatch = content.match(/(import[^;]+;?\n)(?!import)/);
    if (lastImportMatch) {
      const insertPosition = lastImportMatch.index + lastImportMatch[0].length;

      // Check if dynamic export already exists
      if (!content.includes("export const dynamic = 'force-static'")) {
        content =
          content.slice(0, insertPosition) +
          "\nexport const dynamic = 'force-static';\n" +
          content.slice(insertPosition);
      }

      // Add baseUrl constant
      const dynamicExportMatch = content.match(/export const dynamic = 'force-static';?\n/);
      if (dynamicExportMatch) {
        const baseUrlPosition = dynamicExportMatch.index + dynamicExportMatch[0].length;
        content =
          content.slice(0, baseUrlPosition) +
          `\nconst baseUrl = '${baseUrl}';\n` +
          content.slice(baseUrlPosition);
      }
    }

    fs.writeFileSync(file, content);
    console.log(`✅ Fixed ${path.basename(file)}`);
  }
});

console.log('✅ All sitemap files fixed for static export');
