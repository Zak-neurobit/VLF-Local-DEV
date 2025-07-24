const fs = require('fs');
const path = require('path');

// Recursively count all page.tsx files in a directory
function countPages(dir, pagePaths = []) {
  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        countPages(fullPath, pagePaths);
      } else if (item === 'page.tsx') {
        pagePaths.push(fullPath);
      }
    }
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err.message);
  }
  
  return pagePaths;
}

// Get page details for reporting
function getPageDetails(pagePath, baseDir) {
  const relativePath = path.relative(baseDir, pagePath);
  const parts = relativePath.split(path.sep);
  parts.pop(); // Remove 'page.tsx'
  
  return parts.join('/') || 'root';
}

// Generate comprehensive parity report
function generateParityReport() {
  console.log('=== VASQUEZ LAW FIRM WEBSITE - FINAL PARITY REPORT ===\n');
  console.log('Generated on:', new Date().toISOString());
  console.log('=' + '='.repeat(50) + '\n');
  
  // Count all pages
  const spanishDir = path.join(__dirname, '../src/app/es');
  const englishDir = path.join(__dirname, '../src/app');
  
  // Spanish pages
  const spanishPages = countPages(spanishDir);
  const spanishUbicaciones = spanishPages.filter(p => p.includes('/ubicaciones/'));
  const spanishCercaDeMi = spanishPages.filter(p => p.includes('/cerca-de-mi/'));
  const spanishOther = spanishPages.filter(p => !p.includes('/ubicaciones/') && !p.includes('/cerca-de-mi/'));
  
  // English pages (excluding /es directory)
  const allEnglishPages = countPages(englishDir);
  const englishPages = allEnglishPages.filter(p => !p.includes('/es/'));
  const englishLocations = englishPages.filter(p => p.includes('/locations/'));
  const englishNearMe = englishPages.filter(p => p.includes('/near-me/'));
  const englishOther = englishPages.filter(p => !p.includes('/locations/') && !p.includes('/near-me/'));
  
  // Display counts
  console.log('SPANISH PAGES TOTAL:', spanishPages.length);
  console.log('├── Ubicaciones:', spanishUbicaciones.length);
  console.log('├── Cerca de Mi:', spanishCercaDeMi.length);
  console.log('└── Other Pages:', spanishOther.length);
  
  console.log('\nENGLISH PAGES TOTAL:', englishPages.length);
  console.log('├── Locations:', englishLocations.length);
  console.log('├── Near Me:', englishNearMe.length);
  console.log('└── Other Pages:', englishOther.length);
  
  console.log('\n' + '='.repeat(50));
  console.log('PARITY ANALYSIS:');
  console.log('='.repeat(50));
  
  const totalDiff = Math.abs(spanishPages.length - englishPages.length);
  const ubicacionesLocationsDiff = Math.abs(spanishUbicaciones.length - englishLocations.length);
  const cercaDeMiNearMeDiff = Math.abs(spanishCercaDeMi.length - englishNearMe.length);
  
  console.log(`\nTotal Page Difference: ${totalDiff}`);
  console.log(`├── Ubicaciones vs Locations: ${ubicacionesLocationsDiff}`);
  console.log(`└── Cerca de Mi vs Near Me: ${cercaDeMiNearMeDiff}`);
  
  if (totalDiff === 0) {
    console.log('\n✅ PERFECT PARITY ACHIEVED!');
    console.log('Every Spanish page has an English counterpart.');
  } else {
    console.log(`\n⚠️  Parity Gap: ${totalDiff} pages`);
    
    // List missing translations
    if (spanishPages.length > englishPages.length) {
      console.log('\nMissing English translations for:');
      
      // Check which Spanish pages don't have English equivalents
      const spanishPaths = spanishPages.map(p => getPageDetails(p, spanishDir));
      const englishPaths = new Set(englishPages.map(p => getPageDetails(p, englishDir)));
      
      let missingCount = 0;
      spanishPaths.forEach(sp => {
        // Convert Spanish path to expected English path
        const expectedEnglish = sp
          .replace('ubicaciones', 'locations')
          .replace('cerca-de-mi', 'near-me')
          .replace('abogado-espanol', 'spanish-speaking-lawyer')
          .replace('derecho-familiar', 'family-law')
          .replace('compensacion-laboral', 'workers-compensation')
          .replace('defensa-criminal', 'criminal-defense')
          .replace('lesiones-personales', 'personal-injury')
          .replace('accidentes-de-auto', 'car-accidents')
          .replace('inmigracion', 'immigration')
          .replace('bancarrota', 'bankruptcy');
        
        if (!englishPaths.has(expectedEnglish) && missingCount < 20) {
          console.log(`  - ${sp} → ${expectedEnglish}`);
          missingCount++;
        }
      });
      
      if (missingCount >= 20) {
        console.log(`  ... and ${spanishPaths.length - englishPaths.size - 20} more`);
      }
    }
  }
  
  // Write detailed report to file
  const report = {
    generatedAt: new Date().toISOString(),
    spanish: {
      total: spanishPages.length,
      ubicaciones: spanishUbicaciones.length,
      cercaDeMi: spanishCercaDeMi.length,
      other: spanishOther.length,
      pages: spanishPages.map(p => getPageDetails(p, spanishDir)).sort()
    },
    english: {
      total: englishPages.length,
      locations: englishLocations.length,
      nearMe: englishNearMe.length,
      other: englishOther.length,
      pages: englishPages.map(p => getPageDetails(p, englishDir)).sort()
    },
    parity: {
      achieved: totalDiff === 0,
      difference: totalDiff,
      ubicacionesLocationsDiff,
      cercaDeMiNearMeDiff
    }
  };
  
  fs.writeFileSync(
    path.join(__dirname, '../PARITY_REPORT.json'),
    JSON.stringify(report, null, 2)
  );
  
  console.log('\n📊 Detailed report saved to: PARITY_REPORT.json');
  
  // Summary recommendations
  console.log('\n' + '='.repeat(50));
  console.log('RECOMMENDATIONS:');
  console.log('='.repeat(50));
  
  if (totalDiff === 0) {
    console.log('✅ No action needed - perfect parity maintained!');
  } else {
    console.log('To achieve perfect parity:');
    if (ubicacionesLocationsDiff > 0) {
      console.log(`1. Create ${ubicacionesLocationsDiff} more ${spanishUbicaciones.length > englishLocations.length ? 'English location' : 'Spanish ubicaciones'} pages`);
    }
    if (cercaDeMiNearMeDiff > 0) {
      console.log(`2. Create ${cercaDeMiNearMeDiff} more ${spanishCercaDeMi.length > englishNearMe.length ? 'English near-me' : 'Spanish cerca-de-mi'} pages`);
    }
    console.log('3. Run the generate-complete-parity.js script again');
  }
}

// Execute
generateParityReport();