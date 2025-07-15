#!/usr/bin/env ts-node

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

async function fixPracticeAreaLinks() {
  try {
    // Find all location page files
    const locationFiles = await glob('src/app/locations/**/*.tsx', {
      cwd: process.cwd(),
      absolute: false,
    });

    console.log(`Found ${locationFiles.length} location files to check...`);

    let filesFixed = 0;

    for (const file of locationFiles) {
      const filePath = path.join(process.cwd(), file);
      let content = fs.readFileSync(filePath, 'utf-8');
      const originalContent = content;

      // Check if file uses regular <a> tags for practice area links
      if (content.includes('<a href="/practice-areas/')) {
        // Add Link import if not present
        if (
          !content.includes("import Link from 'next/link'") &&
          !content.includes('import { Link }')
        ) {
          // Find the last import statement
          const importMatch = content.match(/^import.*$/m);
          if (importMatch) {
            const lastImportIndex = content.lastIndexOf(importMatch[0]);
            content =
              content.slice(0, lastImportIndex + importMatch[0].length) +
              "\nimport Link from 'next/link';" +
              content.slice(lastImportIndex + importMatch[0].length);
          }
        }

        // Replace <a href="/practice-areas/..."> with <Link href="/practice-areas/...">
        content = content.replace(
          /<a\s+href="(\/practice-areas\/[^"]+)"\s+className="([^"]+)">/g,
          '<Link href="$1" className="$2">'
        );

        // Replace closing </a> tags that follow practice area links
        // This is a bit tricky, so we'll do it line by line
        const lines = content.split('\n');
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes('<Link href="/practice-areas/') && !lines[i].includes('</Link>')) {
            // Find the corresponding closing tag
            for (let j = i; j < Math.min(i + 5, lines.length); j++) {
              if (lines[j].includes('</a>')) {
                lines[j] = lines[j].replace('</a>', '</Link>');
                break;
              }
            }
          }
        }
        content = lines.join('\n');

        // Write the file if changes were made
        if (content !== originalContent) {
          fs.writeFileSync(filePath, content);
          console.log(`✅ Fixed: ${file}`);
          filesFixed++;
        }
      }
    }

    console.log(`\n✨ Fixed ${filesFixed} files with practice area links`);

    // Also check for any other components that might have this issue
    const componentFiles = await glob('src/components/**/*.tsx', {
      cwd: process.cwd(),
      absolute: false,
    });

    console.log(`\nChecking ${componentFiles.length} component files...`);

    for (const file of componentFiles) {
      const filePath = path.join(process.cwd(), file);
      let content = fs.readFileSync(filePath, 'utf-8');
      const originalContent = content;

      if (content.includes('<a href="/practice-areas/')) {
        console.log(`⚠️  Found <a> tags in component: ${file}`);
        // For components, we'll just report them, not auto-fix
        // as they might need more careful handling
      }
    }
  } catch (error) {
    console.error('Error fixing practice area links:', error);
    process.exit(1);
  }
}

// Run the script
fixPracticeAreaLinks();
