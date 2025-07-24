const fs = require('fs');
const path = require('path');

// Get all pages recursively
function getAllPages(dir) {
  const pages = [];
  
  function traverse(currentDir, relativePath = '') {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        traverse(fullPath, path.join(relativePath, item));
      } else if (item === 'page.tsx') {
        pages.push(relativePath || '.');
      }
    }
  }
  
  traverse(dir);
  return pages;
}

// Map English path to Spanish equivalent
function getSpanishEquivalent(englishPath) {
  // Remove nc/ prefix if present
  let normalized = englishPath.replace(/^nc\//, '');
  
  // Map English services to Spanish
  const serviceMap = {
    'spanish-speaking-lawyer': 'abogado-espanol',
    'family-law': 'derecho-familiar',
    'workers-compensation': 'compensacion-laboral',
    'criminal-defense': 'defensa-criminal',
    'personal-injury': 'lesiones-personales',
    'car-accidents': 'accidentes-de-auto',
    'immigration': 'inmigracion',
    'bankruptcy': 'bancarrota',
    'dui': 'dui',
    'divorce': 'divorcio'
  };
  
  // Replace English terms with Spanish
  for (const [english, spanish] of Object.entries(serviceMap)) {
    normalized = normalized.replace(new RegExp(english, 'g'), spanish);
  }
  
  // Handle near-me mappings
  if (englishPath.includes('-near-me')) {
    normalized = normalized.replace('-lawyer-near-me', '-cerca-de-mi');
    normalized = normalized.replace('-attorney-near-me', '-cerca-de-mi');
    normalized = normalized.replace('-near-me', '-cerca-de-mi');
    
    // More complex mappings for near-me
    normalized = normalized.replace('dui-cerca', 'abogado-dui-cerca');
    normalized = normalized.replace('divorce-cerca', 'abogado-divorcio-cerca');
    normalized = normalized.replace('immigration-cerca', 'abogado-inmigracion-cerca');
    normalized = normalized.replace('criminal-defense-cerca', 'abogado-defensa-criminal-cerca');
    normalized = normalized.replace('personal-injury-cerca', 'abogado-lesiones-personales-cerca');
    normalized = normalized.replace('car-accident-cerca', 'abogado-accidente-auto-cerca');
    normalized = normalized.replace('workers-compensation-cerca', 'abogado-compensacion-laboral-cerca');
    normalized = normalized.replace('spanish-speaking-cerca', 'abogado-que-habla-español-cerca');
  }
  
  return normalized;
}

// Clean up excess English pages
function cleanExcessEnglishPages() {
  console.log('Analyzing page parity...\n');
  
  // Get all pages
  const spanishUbicaciones = getAllPages(path.join(__dirname, '../src/app/es/ubicaciones'));
  const spanishCercaDeMi = getAllPages(path.join(__dirname, '../src/app/es/cerca-de-mi'));
  const englishLocations = getAllPages(path.join(__dirname, '../src/app/locations'));
  const englishNearMe = getAllPages(path.join(__dirname, '../src/app/near-me'));
  
  // Create sets for comparison
  const spanishUbicacionesSet = new Set(spanishUbicaciones);
  const spanishCercaDeMiSet = new Set(spanishCercaDeMi);
  
  let removedCount = 0;
  const toRemove = [];
  
  // Check English location pages
  console.log('Checking English location pages for Spanish equivalents...');
  for (const englishPath of englishLocations) {
    const spanishEquiv = getSpanishEquivalent(englishPath);
    
    // Check if Spanish equivalent exists
    let hasSpanishEquivalent = false;
    
    // Direct match
    if (spanishUbicacionesSet.has(spanishEquiv)) {
      hasSpanishEquivalent = true;
    }
    
    // Check without hyphenation differences
    const simplifiedSpanish = spanishEquiv.replace(/-/g, '');
    for (const sp of spanishUbicacionesSet) {
      if (sp.replace(/-/g, '') === simplifiedSpanish) {
        hasSpanishEquivalent = true;
        break;
      }
    }
    
    if (!hasSpanishEquivalent && !englishPath.includes('/immigration-lawyer') && !englishPath.includes('/personal-injury-attorney')) {
      const fullPath = path.join(__dirname, '../src/app/locations', englishPath, 'page.tsx');
      toRemove.push(fullPath);
      console.log(`❌ No Spanish equivalent for: /locations/${englishPath}`);
    }
  }
  
  // Check English near-me pages
  console.log('\nChecking English near-me pages for Spanish equivalents...');
  for (const englishPath of englishNearMe) {
    const spanishEquiv = getSpanishEquivalent(englishPath);
    
    let hasSpanishEquivalent = false;
    
    // Check various possible Spanish patterns
    const patterns = [
      spanishEquiv,
      spanishEquiv.replace('-lawyer-', '-'),
      spanishEquiv.replace('-attorney-', '-'),
      spanishEquiv.replace('spanish-speaking', 'abogado-que-habla-español')
    ];
    
    for (const pattern of patterns) {
      if (spanishCercaDeMiSet.has(pattern)) {
        hasSpanishEquivalent = true;
        break;
      }
    }
    
    if (!hasSpanishEquivalent && englishPath !== '.') {
      const fullPath = path.join(__dirname, '../src/app/near-me', englishPath, 'page.tsx');
      toRemove.push(fullPath);
      console.log(`❌ No Spanish equivalent for: /near-me/${englishPath}`);
    }
  }
  
  console.log(`\nFound ${toRemove.length} English pages without Spanish equivalents.`);
  
  if (toRemove.length > 0) {
    console.log('\nDo you want to remove these pages? (This action cannot be undone)');
    console.log('Run with --remove flag to delete these pages.');
    
    if (process.argv.includes('--remove')) {
      console.log('\nRemoving excess English pages...');
      for (const filePath of toRemove) {
        try {
          fs.unlinkSync(filePath);
          
          // Remove empty directories
          let dir = path.dirname(filePath);
          while (dir !== path.join(__dirname, '../src/app')) {
            try {
              const files = fs.readdirSync(dir);
              if (files.length === 0) {
                fs.rmdirSync(dir);
                console.log(`✅ Removed: ${path.relative(path.join(__dirname, '..'), filePath)}`);
              } else {
                break;
              }
            } catch (err) {
              break;
            }
            dir = path.dirname(dir);
          }
          
          removedCount++;
        } catch (err) {
          console.error(`Failed to remove ${filePath}:`, err.message);
        }
      }
      console.log(`\n✅ Removed ${removedCount} excess English pages.`);
    }
  } else {
    console.log('\n✅ No excess English pages found!');
  }
}

// Run the cleanup
cleanExcessEnglishPages();