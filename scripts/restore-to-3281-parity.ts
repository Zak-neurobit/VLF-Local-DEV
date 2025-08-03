#!/usr/bin/env tsx

import { promises as fs } from 'fs';
import path from 'path';
import { glob } from 'glob';
import { execSync } from 'child_process';

interface RestorationPlan {
  totalNeeded: number;
  currentEnglish: number;
  currentSpanish: number;
  englishToCreate: number;
  spanishToCreate: number;
}

async function getCurrentPageCount() {
  const pageFiles = await glob('src/app/**/page.tsx', {
    ignore: ['**/node_modules/**', '**/api/**'],
  });

  const pages = pageFiles.map(file => {
    let urlPath = file.replace('src/app', '').replace('/page.tsx', '');
    if (urlPath === '') urlPath = '/';
    return urlPath;
  });

  const enPages = pages.filter(p => !p.startsWith('/es'));
  const esPages = pages.filter(p => p.startsWith('/es'));

  return {
    total: pages.length,
    english: enPages.length,
    spanish: esPages.length,
    pages,
  };
}

async function restoreFromGitHistory() {
  console.log('📜 Checking git history for deleted pages...\n');

  try {
    // Get list of deleted files from git
    const deletedFiles = execSync('git diff --name-only --diff-filter=D', { encoding: 'utf-8' })
      .split('\n')
      .filter(f => f.includes('src/app/') && f.endsWith('page.tsx'))
      .filter(f => !f.includes('/api/'));

    console.log(`Found ${deletedFiles.length} deleted page files in git history`);

    if (deletedFiles.length > 0) {
      console.log('\n🔄 Restoring deleted pages...');

      // Group by type
      const ubicaciones2 = deletedFiles.filter(f => f.includes('ubicaciones 2'));
      const testPages = deletedFiles.filter(f => f.includes('test'));
      const otherPages = deletedFiles.filter(
        f => !f.includes('ubicaciones 2') && !f.includes('test')
      );

      console.log(`   - ubicaciones 2 pages: ${ubicaciones2.length}`);
      console.log(`   - test pages: ${testPages.length}`);
      console.log(`   - other pages: ${otherPages.length}`);

      // Restore all deleted files
      for (const file of deletedFiles) {
        try {
          execSync(`git checkout HEAD -- "${file}"`, { stdio: 'pipe' });
        } catch (e) {
          // File might not exist in HEAD, try to find it in recent commits
          try {
            execSync(`git checkout HEAD~1 -- "${file}"`, { stdio: 'pipe' });
          } catch (e2) {
            console.log(`   Could not restore: ${file}`);
          }
        }
      }

      return deletedFiles.length;
    }

    return 0;
  } catch (error) {
    console.error('Error checking git history:', error);
    return 0;
  }
}

async function fixSpanishUrlsWithEnglish() {
  console.log('\n🔧 Fixing Spanish pages with English URLs...');

  const pageFiles = await glob('src/app/es/**/page.tsx', {
    ignore: ['**/node_modules/**', '**/api/**'],
  });

  let fixed = 0;

  for (const file of pageFiles) {
    const url = file.replace('src/app', '').replace('/page.tsx', '');

    // Check if URL contains English terms
    if (url.match(/(immigration|criminal|personal-injury|workers-compensation|family-law)/)) {
      const newUrl = url
        .replace('immigration', 'inmigracion')
        .replace('criminal-defense', 'defensa-criminal')
        .replace('personal-injury', 'lesiones-personales')
        .replace('workers-compensation', 'compensacion-laboral')
        .replace('family-law', 'derecho-familiar')
        .replace('attorney', 'abogado')
        .replace('lawyer', 'abogado')
        .replace('near-me', 'cerca-de-mi');

      if (newUrl !== url) {
        const oldPath = path.dirname(file);
        const newPath = path.join('src/app', newUrl);

        try {
          // Create new directory
          await fs.mkdir(newPath, { recursive: true });

          // Move the file
          await fs.rename(file, path.join(newPath, 'page.tsx'));

          // Try to remove old directory if empty
          try {
            await fs.rmdir(oldPath);
          } catch {
            // Directory not empty
          }

          fixed++;
          if (fixed % 50 === 0) {
            console.log(`   Fixed ${fixed} pages...`);
          }
        } catch (error) {
          console.error(`   Error fixing ${url}:`, error);
        }
      }
    }
  }

  console.log(`   Total fixed: ${fixed} pages`);
  return fixed;
}

async function createMissingCounterparts(targetCount: number) {
  const current = await getCurrentPageCount();

  const plan: RestorationPlan = {
    totalNeeded: targetCount,
    currentEnglish: current.english,
    currentSpanish: current.spanish,
    englishToCreate: targetCount - current.english,
    spanishToCreate: targetCount - current.spanish,
  };

  console.log('\n📊 Restoration Plan:');
  console.log(`   Target: ${targetCount} pages each language`);
  console.log(`   Current English: ${plan.currentEnglish}`);
  console.log(`   Current Spanish: ${plan.currentSpanish}`);
  console.log(
    `   Need to create: ${plan.englishToCreate} English, ${plan.spanishToCreate} Spanish\n`
  );

  // If Spanish has more pages, create English counterparts
  if (plan.englishToCreate > 0) {
    console.log('🔨 Creating missing English pages...');

    const spanishOnly = current.pages
      .filter(p => p.startsWith('/es'))
      .filter(p => {
        const enPath = p.substring(3);
        return !current.pages.includes(enPath === '' ? '/' : enPath);
      });

    console.log(`   Found ${spanishOnly.length} Spanish pages without English counterparts`);

    for (let i = 0; i < Math.min(spanishOnly.length, plan.englishToCreate); i++) {
      const esPath = spanishOnly[i];
      const enPath = esPath === '/es' ? '/' : esPath.substring(3);

      await createPageFromCounterpart(enPath, esPath, false);
    }
  }

  // If English has more pages, create Spanish counterparts
  if (plan.spanishToCreate > 0) {
    console.log('🔨 Creating missing Spanish pages...');

    const englishOnly = current.pages
      .filter(p => !p.startsWith('/es'))
      .filter(p => {
        const esPath = p === '/' ? '/es' : `/es${p}`;
        return !current.pages.includes(esPath);
      });

    console.log(`   Found ${englishOnly.length} English pages without Spanish counterparts`);

    for (let i = 0; i < Math.min(englishOnly.length, plan.spanishToCreate); i++) {
      const enPath = englishOnly[i];
      const esPath = enPath === '/' ? '/es' : `/es${enPath}`;

      await createPageFromCounterpart(esPath, enPath, true);
    }
  }
}

async function createPageFromCounterpart(newPath: string, sourcePath: string, isSpanish: boolean) {
  const fullNewPath = path.join(process.cwd(), 'src/app', newPath, 'page.tsx');
  const fullSourcePath = path.join(process.cwd(), 'src/app', sourcePath, 'page.tsx');

  try {
    // Create directory
    await fs.mkdir(path.dirname(fullNewPath), { recursive: true });

    // Try to copy and translate from source
    try {
      let content = await fs.readFile(fullSourcePath, 'utf-8');

      // Basic translations
      if (isSpanish) {
        content = content
          .replace(/Immigration/g, 'Inmigración')
          .replace(/Personal Injury/g, 'Lesiones Personales')
          .replace(/Criminal Defense/g, 'Defensa Criminal')
          .replace(/Workers Compensation/g, 'Compensación Laboral')
          .replace(/Family Law/g, 'Derecho Familiar')
          .replace(/Attorney/g, 'Abogado')
          .replace(/Lawyer/g, 'Abogado');
      } else {
        content = content
          .replace(/Inmigración/g, 'Immigration')
          .replace(/Lesiones Personales/g, 'Personal Injury')
          .replace(/Defensa Criminal/g, 'Criminal Defense')
          .replace(/Compensación Laboral/g, 'Workers Compensation')
          .replace(/Derecho Familiar/g, 'Family Law')
          .replace(/Abogado/g, 'Attorney');
      }

      await fs.writeFile(fullNewPath, content);
    } catch {
      // Create basic template if source doesn't exist
      const segments = newPath.split('/').filter(Boolean);
      const title =
        segments[segments.length - 1]
          ?.split('-')
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ') || 'Page';

      const content = `import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '${title} | Vasquez Law Firm',
  description: '${isSpanish ? 'Servicios legales profesionales' : 'Professional legal services'}',
};

export default function Page() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">${title}</h1>
      </div>
    </main>
  );
}`;

      await fs.writeFile(fullNewPath, content);
    }
  } catch (error) {
    console.error(`Error creating ${newPath}:`, error);
  }
}

async function main() {
  console.log('🎯 Restoring to 3,281 Pages Per Language\n');

  // Step 1: Get current state
  let current = await getCurrentPageCount();
  console.log('📊 Current State:');
  console.log(`   Total: ${current.total}`);
  console.log(`   English: ${current.english}`);
  console.log(`   Spanish: ${current.spanish}\n`);

  // Step 2: Restore deleted files from git
  const restored = await restoreFromGitHistory();
  if (restored > 0) {
    current = await getCurrentPageCount();
    console.log('\n📊 After restoration:');
    console.log(`   Total: ${current.total}`);
    console.log(`   English: ${current.english}`);
    console.log(`   Spanish: ${current.spanish}`);
  }

  // Step 3: Fix Spanish URLs
  await fixSpanishUrlsWithEnglish();

  // Step 4: Create missing pages to reach 3,281
  await createMissingCounterparts(3281);

  // Final count
  const final = await getCurrentPageCount();
  console.log('\n📊 Final State:');
  console.log(`   Total: ${final.total}`);
  console.log(`   English: ${final.english}`);
  console.log(`   Spanish: ${final.spanish}`);

  if (final.english === 3281 && final.spanish === 3281) {
    console.log('\n🎉 SUCCESS! Achieved 3,281 pages in each language!');
  } else {
    console.log('\n⚠️  Still need adjustment:');
    console.log(`   English needs: ${3281 - final.english} more pages`);
    console.log(`   Spanish needs: ${3281 - final.spanish} more pages`);
  }
}

main().catch(console.error);
