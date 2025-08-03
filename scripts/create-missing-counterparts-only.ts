#!/usr/bin/env tsx

import { promises as fs } from 'fs';
import path from 'path';
import { glob } from 'glob';

interface MissingPage {
  originalPath: string;
  missingPath: string;
  isSpanishMissing: boolean;
}

async function getAllPages(): Promise<string[]> {
  const pageFiles = await glob('src/app/**/page.tsx', {
    ignore: ['**/node_modules/**', '**/api/**'],
  });

  return pageFiles.map(file => {
    let urlPath = file.replace('src/app', '').replace('/page.tsx', '');

    if (urlPath === '') urlPath = '/';
    return urlPath;
  });
}

function findMissingCounterparts(pages: string[]): MissingPage[] {
  const pageSet = new Set(pages);
  const missingPages: MissingPage[] = [];
  const checked = new Set<string>();

  for (const page of pages) {
    // Skip if already checked
    if (checked.has(page)) continue;

    if (page === '/') {
      // Root page special case
      checked.add('/');
      checked.add('/es');
      if (!pageSet.has('/es')) {
        missingPages.push({
          originalPath: '/',
          missingPath: '/es',
          isSpanishMissing: true,
        });
      }
    } else if (page === '/es') {
      // Already handled above
      continue;
    } else if (page.startsWith('/es/')) {
      // Spanish page - check for English counterpart
      const enPath = page.substring(3); // Remove /es prefix
      checked.add(page);
      checked.add(enPath);

      if (!pageSet.has(enPath)) {
        missingPages.push({
          originalPath: page,
          missingPath: enPath,
          isSpanishMissing: false,
        });
      }
    } else {
      // English page - check for Spanish counterpart
      const esPath = `/es${page}`;
      checked.add(page);
      checked.add(esPath);

      if (!pageSet.has(esPath)) {
        missingPages.push({
          originalPath: page,
          missingPath: esPath,
          isSpanishMissing: true,
        });
      }
    }
  }

  return missingPages;
}

async function createMissingPage(
  missingPath: string,
  originalPath: string,
  isSpanish: boolean
): Promise<void> {
  const fullPath = path.join(process.cwd(), 'src/app', missingPath, 'page.tsx');

  // Create directory
  await fs.mkdir(path.dirname(fullPath), { recursive: true });

  // Try to read the original page to clone content
  let content = '';
  try {
    const originalFullPath = path.join(process.cwd(), 'src/app', originalPath, 'page.tsx');
    content = await fs.readFile(originalFullPath, 'utf-8');

    // Simple translation adjustments
    if (isSpanish) {
      // Translate to Spanish
      content = content
        .replace(/Immigration/g, 'Inmigración')
        .replace(/Personal Injury/g, 'Lesiones Personales')
        .replace(/Criminal Defense/g, 'Defensa Criminal')
        .replace(/Workers Compensation/g, 'Compensación Laboral')
        .replace(/Family Law/g, 'Derecho Familiar')
        .replace(/Attorney/g, 'Abogado')
        .replace(/Lawyer/g, 'Abogado')
        .replace(/Contact/g, 'Contacto')
        .replace(/About/g, 'Acerca')
        .replace(/Blog/g, 'Blog')
        .replace(/Locations/g, 'Ubicaciones')
        .replace(/Practice Areas/g, 'Áreas de Práctica')
        .replace(/Testimonials/g, 'Testimonios');
    } else {
      // Translate to English
      content = content
        .replace(/Inmigración/g, 'Immigration')
        .replace(/Lesiones Personales/g, 'Personal Injury')
        .replace(/Defensa Criminal/g, 'Criminal Defense')
        .replace(/Compensación Laboral/g, 'Workers Compensation')
        .replace(/Derecho Familiar/g, 'Family Law')
        .replace(/Abogado/g, 'Attorney')
        .replace(/Contacto/g, 'Contact')
        .replace(/Acerca/g, 'About')
        .replace(/Ubicaciones/g, 'Locations')
        .replace(/Áreas de Práctica/g, 'Practice Areas')
        .replace(/Testimonios/g, 'Testimonials');
    }
  } catch (error) {
    // If can't read original, create a basic template
    const segments = missingPath.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1] || 'home';
    const title = lastSegment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    content = `import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '${title} | Vasquez Law Firm',
  description: '${isSpanish ? 'Servicios legales profesionales en Carolina del Norte y Florida' : 'Professional legal services in North Carolina and Florida'}',
};

export default function ${lastSegment
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join('')}Page() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          ${title}
        </h1>
        <div className="prose max-w-none">
          <p className="text-lg text-gray-700">
            ${
              isSpanish
                ? 'Bienvenido a Vasquez Law Firm. Estamos aquí para ayudarle con sus necesidades legales.'
                : 'Welcome to Vasquez Law Firm. We are here to help you with your legal needs.'
            }
          </p>
        </div>
      </div>
    </main>
  );
}`;
  }

  await fs.writeFile(fullPath, content);
}

async function main() {
  console.log('🎯 Creating Missing Counterparts for 1:1 Parity\n');

  // Get all current pages
  const allPages = await getAllPages();
  const enPages = allPages.filter(p => !p.startsWith('/es'));
  const esPages = allPages.filter(p => p.startsWith('/es'));

  console.log('📊 Current State:');
  console.log(`   English pages: ${enPages.length}`);
  console.log(`   Spanish pages: ${esPages.length}`);
  console.log(`   Total pages: ${allPages.length}`);
  console.log(`   Difference: ${Math.abs(enPages.length - esPages.length)}\n`);

  // Find missing counterparts
  const missingPages = findMissingCounterparts(allPages);

  if (missingPages.length === 0) {
    console.log('✅ Perfect parity already achieved!');
    return;
  }

  console.log(`❌ Found ${missingPages.length} missing counterparts\n`);

  // Show what will be created
  const missingSpanish = missingPages.filter(m => m.isSpanishMissing);
  const missingEnglish = missingPages.filter(m => !m.isSpanishMissing);

  if (missingSpanish.length > 0) {
    console.log(`📝 Will create ${missingSpanish.length} Spanish pages:`);
    missingSpanish.slice(0, 5).forEach(m => {
      console.log(`   ${m.originalPath} → ${m.missingPath}`);
    });
    if (missingSpanish.length > 5) {
      console.log(`   ... and ${missingSpanish.length - 5} more\n`);
    } else {
      console.log();
    }
  }

  if (missingEnglish.length > 0) {
    console.log(`📝 Will create ${missingEnglish.length} English pages:`);
    missingEnglish.slice(0, 5).forEach(m => {
      console.log(`   ${m.originalPath} → ${m.missingPath}`);
    });
    if (missingEnglish.length > 5) {
      console.log(`   ... and ${missingEnglish.length - 5} more\n`);
    } else {
      console.log();
    }
  }

  // Create missing pages
  console.log('🔧 Creating missing pages...\n');

  let created = 0;
  for (const missing of missingPages) {
    try {
      await createMissingPage(missing.missingPath, missing.originalPath, missing.isSpanishMissing);
      created++;

      if (created % 50 === 0) {
        console.log(`   Progress: ${created}/${missingPages.length} pages created`);
      }
    } catch (error) {
      console.error(`   Error creating ${missing.missingPath}:`, error);
    }
  }

  console.log(`\n✅ Created ${created} pages`);

  // Verify final state
  const newPages = await getAllPages();
  const newEnPages = newPages.filter(p => !p.startsWith('/es'));
  const newEsPages = newPages.filter(p => p.startsWith('/es'));

  console.log('\n📊 Final State:');
  console.log(`   English pages: ${newEnPages.length}`);
  console.log(`   Spanish pages: ${newEsPages.length}`);
  console.log(`   Total pages: ${newPages.length}`);

  if (newEnPages.length === newEsPages.length) {
    console.log('\n🎉 PERFECT 1:1 PARITY ACHIEVED!');
    console.log(`   Each language has exactly ${newEnPages.length} pages`);
  } else {
    console.log(`\n⚠️  Still ${Math.abs(newEnPages.length - newEsPages.length)} page difference`);
  }
}

main().catch(console.error);
