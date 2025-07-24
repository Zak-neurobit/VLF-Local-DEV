#!/usr/bin/env node

/**
 * Diagnostic script to check practice area pages
 * Run this after fixing node_modules to identify any issues
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 VLF Website Practice Area Pages Diagnostic\n');

// Pages reported as missing in the navigation
const reportedMissingPages = [
  '/practice-areas/immigration/green-cards',
  '/practice-areas/immigration/family-based-relative',
  '/practice-areas/immigration/employment-based-immigration',
  '/practice-areas/immigration/citizenship-naturalization',
  '/practice-areas/immigration/daca-deferred-action-childhood-arrivals',
  '/practice-areas/immigration/deportation-removal-defense',
  '/practice-areas/immigration/asylum-refugee-legal-help',
  '/practice-areas/immigration/vawa-u-visa-crime-victims',
  '/practice-areas/personal-injury/car-accidents',
  '/practice-areas/personal-injury/truck-accidents',
  '/practice-areas/personal-injury/motorcycle-accidents',
  '/practice-areas/personal-injury/pedestrian-accidents',
  '/practice-areas/personal-injury/premises-liability',
  '/practice-areas/personal-injury/drunk-driver-accidents',
  '/practice-areas/workers-compensation/construction-site-injuries',
  '/practice-areas/workers-compensation/repetitive-stress-carpal-tunnel',
  '/practice-areas/workers-compensation/third-party-injury-claims',
  '/practice-areas/criminal-defense/dwi-drunk-driving',
  '/practice-areas/criminal-defense/drug-crimes',
  '/practice-areas/criminal-defense/domestic-violence',
  '/practice-areas/criminal-defense/traffic-offenses',
  '/practice-areas/criminal-defense/expungement',
  '/practice-areas/family-law/divorce',
  '/practice-areas/family-law/child-custody',
  '/practice-areas/family-law/alimony-spousal-support',
  '/practice-areas/family-law/equitable-distribution-property-debt-division',
];

const baseDir = path.join(__dirname, '..', 'src', 'app');

console.log('Checking reported missing pages...\n');

let existingCount = 0;
let missingCount = 0;
const actuallyMissing = [];
const existingWithIssues = [];

reportedMissingPages.forEach(pagePath => {
  const fullPath = path.join(baseDir, pagePath, 'page.tsx');
  
  if (fs.existsSync(fullPath)) {
    existingCount++;
    console.log(`✅ EXISTS: ${pagePath}`);
    
    // Check if file has content
    const content = fs.readFileSync(fullPath, 'utf8');
    if (content.length < 100) {
      existingWithIssues.push({
        path: pagePath,
        issue: 'File is suspiciously small',
        size: content.length
      });
    }
    
    // Check for common errors
    if (content.includes('This page is under development')) {
      existingWithIssues.push({
        path: pagePath,
        issue: 'Page shows "under development" message'
      });
    }
    
    if (!content.includes('export default')) {
      existingWithIssues.push({
        path: pagePath,
        issue: 'Missing default export'
      });
    }
  } else {
    missingCount++;
    actuallyMissing.push(pagePath);
    console.log(`❌ MISSING: ${pagePath}`);
  }
});

console.log(`\n📊 Summary:`);
console.log(`- Existing pages: ${existingCount}`);
console.log(`- Missing pages: ${missingCount}`);

if (actuallyMissing.length > 0) {
  console.log(`\n❌ Actually missing pages:`);
  actuallyMissing.forEach(page => {
    console.log(`  - ${page}`);
  });
}

if (existingWithIssues.length > 0) {
  console.log(`\n⚠️  Pages with potential issues:`);
  existingWithIssues.forEach(issue => {
    console.log(`  - ${issue.path}: ${issue.issue}`);
  });
}

// Check for Spanish equivalents
console.log(`\n🌐 Checking Spanish equivalents...`);

const spanishMapping = {
  'green-cards': 'tarjetas-verdes',
  'family-based-relative': 'pariente-familiar',
  'employment-based-immigration': 'inmigracion-basada-en-el-empleo',
  'citizenship-naturalization': 'ciudadania',
  'daca-deferred-action-childhood-arrivals': 'daca-accion-diferida-llegadas-en-la-infancia',
  'deportation-removal-defense': 'deportacion-remocion-defensa',
  'asylum-refugee-legal-help': 'asilo',
  'vawa-u-visa-crime-victims': 'vawa-u-visa-crimen-victimas',
  'car-accidents': 'accidentes-de-auto',
  'truck-accidents': 'accidentes-de-camion',
  'motorcycle-accidents': 'accidentes-motocicleta',
  'pedestrian-accidents': 'accidentes-peatones',
  'premises-liability': 'responsabilidad-de-locales',
  'drunk-driver-accidents': 'accidentes-conductor-ebrio',
  'construction-site-injuries': 'lesiones-construccion',
  'repetitive-stress-carpal-tunnel': 'estres-repetitivo',
  'third-party-injury-claims': 'demandas-terceros',
  'dwi-drunk-driving': 'dui-dwi',
  'drug-crimes': 'crimenes-drogas',
  'domestic-violence': 'violencia-domestica',
  'traffic-offenses': 'infracciones-transito-criminal',
  'expungement': 'expuncion',
  'child-custody': 'custodia-infantil',
  'alimony-spousal-support': 'pension-alimenticia',
  'equitable-distribution-property-debt-division': 'division-propiedad'
};

let spanishExistsButEnglishMissing = 0;

Object.entries(spanishMapping).forEach(([english, spanish]) => {
  const englishPath = reportedMissingPages.find(p => p.includes(english));
  if (englishPath && actuallyMissing.includes(englishPath)) {
    // Check if Spanish version exists
    const spanishPath = englishPath.replace(english, spanish).replace('/practice-areas/', '/areas-de-practica/');
    const spanishFullPath = path.join(baseDir, spanishPath, 'page.tsx');
    
    if (fs.existsSync(spanishFullPath)) {
      spanishExistsButEnglishMissing++;
      console.log(`  🔄 Spanish exists but English missing: ${spanish} → ${english}`);
    }
  }
});

if (spanishExistsButEnglishMissing > 0) {
  console.log(`\n💡 ${spanishExistsButEnglishMissing} pages exist in Spanish but not in English`);
  console.log(`   These could be copied and translated to create the English versions.`);
}

// Test import of a sample page
console.log(`\n🧪 Testing page imports...`);

try {
  // Try to require a practice area page
  const testPagePath = path.join(baseDir, 'practice-areas', 'immigration', 'green-cards', 'page.tsx');
  if (fs.existsSync(testPagePath)) {
    console.log(`  ✅ Sample page file can be read`);
    const content = fs.readFileSync(testPagePath, 'utf8');
    
    // Check for common issues
    if (content.includes('ModernPracticeAreaTemplate')) {
      console.log(`  ✅ Uses ModernPracticeAreaTemplate`);
    }
    
    if (content.includes('export default')) {
      console.log(`  ✅ Has default export`);
    }
    
    if (content.includes('export const metadata')) {
      console.log(`  ✅ Has metadata export`);
    }
  }
} catch (error) {
  console.log(`  ❌ Error testing imports: ${error.message}`);
}

console.log(`\n📝 Next Steps:`);
console.log(`1. Fix node_modules and start the server`);
console.log(`2. Run 'npm run build' to check for build errors`);
console.log(`3. Visit the reported pages to see actual errors`);
console.log(`4. Check browser console for runtime errors`);
console.log(`5. Review the network tab for 404 responses`);

console.log(`\n✨ Done!`);