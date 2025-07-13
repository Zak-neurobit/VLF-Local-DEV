const fs = require('fs');
const path = require('path');

// Pages that are timing out during static generation
const problematicPages = [
  'src/app/7-proven-strategies-that-immigration-lawyers-use-to-win-complex-cases/page.tsx',
  'src/app/api/blog/rss/route.ts',
];

console.log('Fixing static generation timeouts...\n');

problematicPages.forEach(file => {
  const filePath = path.join(process.cwd(), file);

  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Check if it's a route handler
    if (file.includes('/api/') && file.endsWith('route.ts')) {
      // Add dynamic export to API routes
      if (!content.includes('export const dynamic')) {
        console.log(`Adding dynamic export to: ${file}`);

        // Add after imports
        const lines = content.split('\n');
        let importEndIndex = 0;

        for (let i = 0; i < lines.length; i++) {
          if (lines[i].startsWith('import') || lines[i].trim() === '') {
            importEndIndex = i + 1;
          } else {
            break;
          }
        }

        lines.splice(importEndIndex, 0, '', "export const dynamic = 'force-dynamic';");
        content = lines.join('\n');

        fs.writeFileSync(filePath, content);
      }
    } else if (file.endsWith('page.tsx')) {
      // Add dynamic export to pages
      if (!content.includes('export const dynamic')) {
        console.log(`Adding dynamic export to: ${file}`);

        // Add after metadata export
        const metadataMatch = content.match(/export const metadata.*?};/s);
        if (metadataMatch) {
          const insertPosition = metadataMatch.index + metadataMatch[0].length;
          content =
            content.slice(0, insertPosition) +
            "\n\nexport const dynamic = 'force-dynamic';\n" +
            content.slice(insertPosition);
        } else {
          // Add at the beginning after imports
          const lines = content.split('\n');
          let importEndIndex = 0;

          for (let i = 0; i < lines.length; i++) {
            if (lines[i].startsWith('import') || lines[i].trim() === '') {
              importEndIndex = i + 1;
            } else {
              break;
            }
          }

          lines.splice(importEndIndex, 0, '', "export const dynamic = 'force-dynamic';");
          content = lines.join('\n');
        }

        fs.writeFileSync(filePath, content);
      }
    }
  }
});

// Also add to all blog pages that might be problematic
const glob = require('glob');
const blogPages = glob.sync('src/app/**/indexet_blog/page.tsx', {
  cwd: process.cwd(),
});

blogPages.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('export const dynamic')) {
    console.log(`Adding dynamic export to blog page: ${file}`);

    const metadataMatch = content.match(/export const metadata.*?};/s);
    if (metadataMatch) {
      const insertPosition = metadataMatch.index + metadataMatch[0].length;
      content =
        content.slice(0, insertPosition) +
        "\n\nexport const dynamic = 'force-dynamic';\n" +
        content.slice(insertPosition);
    }

    fs.writeFileSync(filePath, content);
  }
});

console.log('\n✅ Fixed static generation timeouts');
