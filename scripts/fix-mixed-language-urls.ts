#!/usr/bin/env tsx

import { promises as fs } from 'fs';
import { glob } from 'glob';

const urlMappings: Record<string, string> = {
  '/practice-areas/': '/areas-de-practica/',
  '/immigration/': '/inmigracion/',
  '/criminal-defense/': '/defensa-criminal/',
  '/personal-injury/': '/lesiones-personales/',
  '/workers-compensation/': '/compensacion-laboral/',
  '/family-law/': '/derecho-familiar/',
  '/locations/': '/ubicaciones/',
  '/attorneys/': '/abogados/',
  '/about/': '/acerca-de/',
  '/contact/': '/contacto/',
  '/near-me/': '/cerca-de-mi/',
  '/traffic-violations/': '/infracciones-transito/',
};

async function fixMixedLanguageUrls() {
  console.log('🔧 Fixing mixed language URLs in Spanish files...\n');

  // Get all Spanish files
  const spanishFiles = await glob('src/app/es/**/*.{ts,tsx}', {
    ignore: ['**/node_modules/**'],
  });

  console.log(`Found ${spanishFiles.length} Spanish files to check\n`);

  let filesFixed = 0;
  let totalReplacements = 0;

  for (const file of spanishFiles) {
    let content = await fs.readFile(file, 'utf-8');
    let originalContent = content;
    let fileReplacements = 0;

    // Replace each English URL pattern with Spanish equivalent
    for (const [english, spanish] of Object.entries(urlMappings)) {
      // Replace in href, to, and string literals
      const patterns = [
        new RegExp(`href=["']${english}`, 'g'),
        new RegExp(`to=["']${english}`, 'g'),
        new RegExp(`["']${english}`, 'g'),
      ];

      for (const pattern of patterns) {
        const matches = content.match(pattern);
        if (matches) {
          content = content.replace(pattern, match => {
            return match.replace(english, spanish);
          });
          fileReplacements += matches.length;
        }
      }
    }

    if (content !== originalContent) {
      await fs.writeFile(file, content);
      filesFixed++;
      totalReplacements += fileReplacements;

      if (filesFixed % 10 === 0) {
        console.log(`   Fixed ${filesFixed} files...`);
      }
    }
  }

  console.log(`\n✅ Fixed ${totalReplacements} URLs in ${filesFixed} files`);

  // Verify the fixes
  console.log('\n🔍 Verifying fixes...');

  let remainingIssues = 0;
  for (const file of spanishFiles) {
    const content = await fs.readFile(file, 'utf-8');

    for (const englishUrl of Object.keys(urlMappings)) {
      if (content.includes(`"${englishUrl}`) || content.includes(`'${englishUrl}`)) {
        console.log(`   ⚠️  Still contains "${englishUrl}": ${file}`);
        remainingIssues++;
      }
    }
  }

  if (remainingIssues === 0) {
    console.log('   ✅ All mixed language URLs have been fixed!');
  } else {
    console.log(`   ❌ ${remainingIssues} issues remain`);
  }

  console.log('\n✨ Mixed language URL fix complete!');
}

fixMixedLanguageUrls().catch(console.error);
