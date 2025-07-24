#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to recursively find all page.tsx files
function findPages(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      findPages(filePath, fileList);
    } else if (file === 'page.tsx') {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Get all pages
const appDir = path.join(__dirname, '..', 'src', 'app');
const allPages = findPages(appDir);

// Categorize pages
const englishPages = [];
const spanishPages = [];
const adminPages = [];
const apiPages = [];
const dynamicPages = [];

allPages.forEach(page => {
  const relativePath = page.replace(appDir, '').replace(/\\/g, '/');
  
  // Skip API routes and admin pages
  if (relativePath.includes('/api/')) {
    apiPages.push(relativePath);
  } else if (relativePath.includes('/admin/')) {
    adminPages.push(relativePath);
  } else if (relativePath.includes('[') && relativePath.includes(']')) {
    dynamicPages.push(relativePath);
  } else if (relativePath.includes('/es/') || 
             relativePath.includes('/cerca-de-mi/') || 
             relativePath.includes('/areas-de-practica/') ||
             relativePath.includes('/abogados/') ||
             relativePath.includes('/contacto/') ||
             relativePath.includes('/acerca-de/') ||
             relativePath.includes('/consulta-') ||
             relativePath.includes('/pago-seguro/') ||
             relativePath.includes('/evaluacion-ia/') ||
             relativePath.includes('/aviso-legal/') ||
             relativePath.includes('/politica-') ||
             relativePath.includes('/becas/') ||
             relativePath.includes('/calculadoras/') ||
             relativePath.includes('/resultados-casos/') ||
             relativePath.includes('/resenas/') ||
             relativePath.includes('/test-') ||
             relativePath.includes('/gracias/') ||
             relativePath.includes('/cancelar-suscripcion/') ||
             relativePath.includes('/defensa-criminal/') ||
             relativePath.includes('/compensacion-laboral/') ||
             relativePath.includes('/derecho-familia/') ||
             relativePath.includes('/inmigracion/') ||
             relativePath.includes('/lesiones-personales/') ||
             relativePath.includes('/multas-de-transito/') ||
             relativePath.includes('/violaciones-de-transito/') ||
             relativePath.includes('/citas/') ||
             relativePath.includes('/agentes/')) {
    spanishPages.push(relativePath);
  } else {
    englishPages.push(relativePath);
  }
});

// Function to normalize path for comparison
function normalizePath(path) {
  return path
    .replace(/^\//, '')
    .replace(/\/page\.tsx$/, '')
    .replace(/\/$/, '');
}

// Map Spanish equivalents
const spanishToEnglishMap = {
  '/es/': '/',
  '/acerca-de/': '/about/',
  '/abogados/': '/attorneys/',
  '/areas-de-practica/': '/practice-areas/',
  '/contacto/': '/contact/',
  '/cerca-de-mi/': '/near-me/',
  '/consulta-gratis/': '/free-consultation/',
  '/consulta-gratuita/': '/free-consultation/',
  '/consulta-ia/': '/ai-consultation/',
  '/evaluacion-ia/': '/ai-evaluation/',
  '/pago-seguro/': '/secure-payment/',
  '/aviso-legal/': '/legal-disclaimer/',
  '/politica-cookies/': '/cookie-policy/',
  '/politica-privacidad/': '/privacy-policy/',
  '/becas/': '/scholarships/',
  '/calculadoras/': '/calculators/',
  '/resultados-casos/': '/case-results/',
  '/resenas/': '/reviews/',
  '/gracias/': '/thank-you/',
  '/cancelar-suscripcion/': '/unsubscribe/',
  '/defensa-criminal/': '/criminal-defense/',
  '/compensacion-laboral/': '/workers-compensation/',
  '/derecho-familia/': '/family-law/',
  '/inmigracion/': '/immigration/',
  '/lesiones-personales/': '/personal-injury/',
  '/multas-de-transito/': '/traffic-tickets/',
  '/violaciones-de-transito/': '/traffic-violations/',
  '/citas/': '/appointments/',
  '/agentes/': '/agents/',
  '/contacto-rapido/': '/quick-contact/',
};

// Find missing Spanish pages
const missingSpanishPages = [];
const existingMappings = [];

englishPages.forEach(englishPath => {
  const normalized = normalizePath(englishPath);
  
  // Skip certain pages that shouldn't have Spanish versions
  if (normalized.includes('portal') || 
      normalized.includes('dashboard') ||
      normalized.includes('auth') ||
      normalized.includes('debug') ||
      normalized.includes('test') ||
      normalized.includes('author') ||
      normalized.includes('category') ||
      normalized.includes('blog/legal-update-') ||
      normalized.includes('indexet_blog') ||
      normalized.includes('_downloads') ||
      normalized.includes('home') ||
      normalized === '') {
    return;
  }
  
  // Check if Spanish equivalent exists
  let hasSpanishVersion = false;
  let spanishEquivalent = null;
  
  // Direct /es/ mapping
  const esPath = `/es${englishPath}`;
  if (spanishPages.some(sp => sp === esPath)) {
    hasSpanishVersion = true;
    spanishEquivalent = esPath;
  }
  
  // Check other Spanish mappings
  Object.entries(spanishToEnglishMap).forEach(([spanish, english]) => {
    if (englishPath.includes(english)) {
      const mappedPath = englishPath.replace(english, spanish);
      if (spanishPages.some(sp => sp.includes(mappedPath))) {
        hasSpanishVersion = true;
        spanishEquivalent = mappedPath;
      }
    }
  });
  
  if (hasSpanishVersion) {
    existingMappings.push({
      english: englishPath,
      spanish: spanishEquivalent
    });
  } else {
    missingSpanishPages.push(englishPath);
  }
});

// Generate report
console.log('=== SPANISH PAGE ANALYSIS REPORT ===\n');
console.log(`Total pages found: ${allPages.length}`);
console.log(`English pages: ${englishPages.length}`);
console.log(`Spanish pages: ${spanishPages.length}`);
console.log(`Admin pages: ${adminPages.length}`);
console.log(`API pages: ${apiPages.length}`);
console.log(`Dynamic pages: ${dynamicPages.length}`);
console.log('\n');

console.log(`Pages with Spanish versions: ${existingMappings.length}`);
console.log(`Pages MISSING Spanish versions: ${missingSpanishPages.length}`);
console.log('\n');

// Group missing pages by category
const missingByCategory = {
  'practice-areas': [],
  'attorneys': [],
  'locations': [],
  'near-me': [],
  'blog': [],
  'general': [],
  'forms': [],
  'legal': [],
  'other': []
};

missingSpanishPages.forEach(page => {
  const normalized = normalizePath(page);
  
  if (normalized.includes('practice-areas')) {
    missingByCategory['practice-areas'].push(page);
  } else if (normalized.includes('attorneys')) {
    missingByCategory['attorneys'].push(page);
  } else if (normalized.includes('office-location') || normalized.includes('-nc') || normalized.includes('-fl')) {
    missingByCategory['locations'].push(page);
  } else if (normalized.includes('near-me')) {
    missingByCategory['near-me'].push(page);
  } else if (normalized.includes('blog')) {
    missingByCategory['blog'].push(page);
  } else if (normalized.includes('consultation') || normalized.includes('contact') || normalized.includes('appointment')) {
    missingByCategory['forms'].push(page);
  } else if (normalized.includes('legal') || normalized.includes('disclaimer') || normalized.includes('privacy') || normalized.includes('terms')) {
    missingByCategory['legal'].push(page);
  } else if (normalized.includes('about') || normalized.includes('faqs') || normalized.includes('reviews') || normalized.includes('case-results')) {
    missingByCategory['general'].push(page);
  } else {
    missingByCategory['other'].push(page);
  }
});

// Print missing pages by category
console.log('=== MISSING SPANISH PAGES BY CATEGORY ===\n');

Object.entries(missingByCategory).forEach(([category, pages]) => {
  if (pages.length > 0) {
    console.log(`\n${category.toUpperCase()} (${pages.length} pages):`);
    console.log('=' .repeat(50));
    pages.sort().forEach(page => {
      console.log(`  ${page}`);
    });
  }
});

// Write detailed report to file
const report = {
  summary: {
    totalPages: allPages.length,
    englishPages: englishPages.length,
    spanishPages: spanishPages.length,
    pagesWithSpanishVersions: existingMappings.length,
    pagesMissingSpanishVersions: missingSpanishPages.length
  },
  missingByCategory,
  missingPages: missingSpanishPages.sort(),
  existingMappings: existingMappings.sort((a, b) => a.english.localeCompare(b.english))
};

fs.writeFileSync(
  path.join(__dirname, '..', 'SPANISH_PAGES_REPORT.json'),
  JSON.stringify(report, null, 2)
);

console.log('\n\nDetailed report saved to: SPANISH_PAGES_REPORT.json');

// Priority pages to translate first
const priorityPages = [
  ...missingByCategory['practice-areas'],
  ...missingByCategory['attorneys'],
  ...missingByCategory['locations'],
  ...missingByCategory['general'],
  ...missingByCategory['forms'],
  ...missingByCategory['legal']
].slice(0, 20);

console.log('\n=== TOP 20 PRIORITY PAGES TO TRANSLATE ===\n');
priorityPages.forEach((page, index) => {
  console.log(`${index + 1}. ${page}`);
});