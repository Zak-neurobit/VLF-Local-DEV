#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

interface PagePair {
  path: string;
  hasEn: boolean;
  hasEs: boolean;
  type: 'static' | 'attorney' | 'practiceArea' | 'location' | 'blog' | 'special';
}

async function findAllPages(): Promise<PagePair[]> {
  const appDir = path.join(process.cwd(), 'src/app');
  const pages: Map<string, PagePair> = new Map();

  // Find all page.tsx files
  const allPageFiles = await glob('**/page.tsx', {
    cwd: appDir,
    ignore: ['**/api/**', '**/portal/**', '**/admin/**', '**/_*/**'],
  });

  for (const file of allPageFiles) {
    const relativePath = path.dirname(file);
    let normalizedPath = relativePath === '.' ? '/' : `/${relativePath}`;
    
    // Handle ES pages
    const isEs = normalizedPath.startsWith('/es/');
    const basePath = isEs 
      ? normalizedPath.replace('/es/', '/').replace('/es', '/')
      : normalizedPath;

    // Skip certain paths
    if (basePath.includes('indexet_blog') || 
        basePath.includes('[[...segments]]') ||
        basePath.includes('[') && basePath.includes(']')) {
      continue;
    }

    // Determine page type
    let type: PagePair['type'] = 'static';
    if (basePath.includes('/attorneys/')) type = 'attorney';
    else if (basePath.includes('/practice-areas/')) type = 'practiceArea';
    else if (basePath.includes('/locations/') || basePath.includes('/ubicaciones/')) type = 'location';
    else if (basePath.includes('/blog/')) type = 'blog';
    else if (basePath.includes('/near-me/')) type = 'special';

    // Get or create page entry
    if (!pages.has(basePath)) {
      pages.set(basePath, {
        path: basePath,
        hasEn: false,
        hasEs: false,
        type,
      });
    }

    const page = pages.get(basePath)!;
    if (isEs) {
      page.hasEs = true;
    } else {
      page.hasEn = true;
    }
  }

  return Array.from(pages.values());
}

// Path mapping for ES translations
const pathTranslations: Record<string, string> = {
  '/attorneys': '/abogados',
  '/practice-areas': '/areas-de-practica',
  '/contact': '/contacto',
  '/about': '/acerca-de',
  '/testimonials': '/testimonios',
  '/case-results': '/resultados-de-casos',
  '/resources': '/recursos',
  '/faq': '/preguntas-frecuentes',
  '/appointment': '/cita',
  '/media': '/medios',
  '/accessibility': '/accesibilidad',
  '/cookie-policy': '/politica-de-cookies',
  '/legal-disclaimer': '/aviso-legal',
  '/privacy-policy': '/politica-de-privacidad',
  '/terms': '/terminos',
  '/secure-payment': '/pago-seguro',
  '/quick-contact': '/contacto-rapido',
  '/free-consultation': '/consulta-gratis',
  '/calculators': '/calculadoras',
  '/ai-evaluation': '/evaluacion-ai',
  '/locations': '/ubicaciones',
};

// Practice area translations
const practiceAreaTranslations: Record<string, string> = {
  'immigration': 'inmigracion',
  'personal-injury': 'lesiones-personales',
  'workers-compensation': 'compensacion-laboral',
  'criminal-defense': 'defensa-criminal',
  'family-law': 'derecho-familiar',
  'traffic-violations': 'violaciones-de-trafico',
};

function getEsPath(enPath: string): string {
  // Direct mapping
  if (pathTranslations[enPath]) {
    return `/es${pathTranslations[enPath]}`;
  }

  // Handle attorneys
  if (enPath.startsWith('/attorneys/')) {
    return enPath.replace('/attorneys/', '/es/abogados/');
  }

  // Handle practice areas
  if (enPath.startsWith('/practice-areas/')) {
    let esPath = enPath.replace('/practice-areas/', '/es/areas-de-practica/');
    
    // Translate practice area names
    for (const [en, es] of Object.entries(practiceAreaTranslations)) {
      esPath = esPath.replace(`/${en}/`, `/${es}/`);
      esPath = esPath.replace(`/${en}`, `/${es}`);
    }
    
    return esPath;
  }

  // Handle locations
  if (enPath.startsWith('/locations/')) {
    return enPath.replace('/locations/', '/es/ubicaciones/');
  }

  // Default: just add /es prefix
  return `/es${enPath}`;
}

function generatePageTemplate(path: string, isEs: boolean, type: PagePair['type']): string {
  const pageName = path.split('/').pop() || 'home';
  const title = pageName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  if (type === 'static') {
    return `import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';

export const metadata: Metadata = {
  title: '${isEs ? title + ' | Vasquez Law Firm' : title + ' | Vasquez Law Firm'}',
  description: '${isEs ? 'Página en español para ' + title : 'Page content for ' + title}',
};

export default function ${pageName.replace(/-/g, '')}Page() {
  componentLogger.info('${pageName}Page.render', {});

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">${isEs ? title : title}</h1>
        <p className="text-lg text-gray-600">
          ${isEs ? 'Esta página está en desarrollo.' : 'This page is under development.'}
        </p>
      </div>
    </div>
  );
}
`;
  }

  // For other types, generate appropriate templates
  return `// TODO: Implement ${type} page template for ${path}
export default function Page() {
  return <div>Coming soon...</div>;
}
`;
}

async function generateMissingPages() {
  console.log('🔍 Analyzing page structure...\n');
  
  const pages = await findAllPages();
  const missingTranslations = pages.filter(p => !p.hasEn || !p.hasEs);
  
  console.log(`📊 Total unique paths: ${pages.length}`);
  console.log(`❌ Missing translations: ${missingTranslations.length}\n`);

  // Critical pages that must have translations
  const criticalPaths = [
    '/faq',
    '/cookie-policy',
    '/legal-disclaimer',
    '/privacy-policy',
    '/terms',
    '/accessibility',
    '/appointment',
    '/secure-payment',
    '/calculators',
  ];

  const criticalMissing = missingTranslations.filter(p => 
    criticalPaths.includes(p.path)
  );

  if (criticalMissing.length > 0) {
    console.log('🚨 Critical pages missing translations:');
    criticalMissing.forEach(page => {
      console.log(`   ${page.path} - Missing: ${!page.hasEn ? 'EN' : ''} ${!page.hasEs ? 'ES' : ''}`);
    });
    console.log('');
  }

  // Generate missing page files
  console.log('📝 Generating missing page files...\n');
  
  let generatedCount = 0;
  const appDir = path.join(process.cwd(), 'src/app');

  for (const page of missingTranslations) {
    if (!page.hasEn) {
      const enPath = path.join(appDir, page.path.slice(1), 'page.tsx');
      const enDir = path.dirname(enPath);
      
      if (!fs.existsSync(enDir)) {
        fs.mkdirSync(enDir, { recursive: true });
      }
      
      if (!fs.existsSync(enPath)) {
        fs.writeFileSync(enPath, generatePageTemplate(page.path, false, page.type));
        console.log(`✅ Generated EN: ${page.path}`);
        generatedCount++;
      }
    }

    if (!page.hasEs) {
      const esPath = getEsPath(page.path);
      const esFilePath = path.join(appDir, esPath.slice(1), 'page.tsx');
      const esDir = path.dirname(esFilePath);
      
      if (!fs.existsSync(esDir)) {
        fs.mkdirSync(esDir, { recursive: true });
      }
      
      if (!fs.existsSync(esFilePath)) {
        fs.writeFileSync(esFilePath, generatePageTemplate(esPath, true, page.type));
        console.log(`✅ Generated ES: ${esPath}`);
        generatedCount++;
      }
    }
  }

  console.log(`\n✨ Generated ${generatedCount} missing page files`);

  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    totalPaths: pages.length,
    missingTranslations: missingTranslations.length,
    criticalMissing: criticalMissing.map(p => ({
      path: p.path,
      missingEn: !p.hasEn,
      missingEs: !p.hasEs,
    })),
    generatedFiles: generatedCount,
    allMissing: missingTranslations.map(p => ({
      path: p.path,
      type: p.type,
      hasEn: p.hasEn,
      hasEs: p.hasEs,
    })),
  };

  fs.writeFileSync(
    path.join(process.cwd(), 'translation-parity-report.json'),
    JSON.stringify(report, null, 2)
  );

  console.log('\n📄 Report saved to translation-parity-report.json');
}

// Run the script
generateMissingPages().catch(console.error);