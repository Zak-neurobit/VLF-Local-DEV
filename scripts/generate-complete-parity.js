const fs = require('fs');
const path = require('path');

// Get all pages in a directory recursively
function getAllPages(dir, baseDir = dir) {
  const pages = [];
  
  try {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Recursively get pages from subdirectory
        pages.push(...getAllPages(fullPath, baseDir));
      } else if (file === 'page.tsx') {
        // Extract relative path from base directory
        const relativePath = path.relative(baseDir, dir);
        pages.push(relativePath || '.');
      }
    }
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err.message);
  }
  
  return pages;
}

// Map Spanish service names to English
function mapSpanishToEnglish(spanishPath) {
  const serviceMap = {
    'abogado-espanol': 'spanish-speaking-lawyer',
    'abogado-español': 'spanish-speaking-lawyer',
    'abogado-que-habla-español': 'spanish-speaking-lawyer',
    'derecho-familiar': 'family-law',
    'compensacion-laboral': 'workers-compensation',
    'abogado-compensacion-laboral': 'workers-compensation-lawyer',
    'defensa-criminal': 'criminal-defense',
    'abogado-defensa-criminal': 'criminal-defense-lawyer',
    'lesiones-personales': 'personal-injury',
    'abogado-lesiones-personales': 'personal-injury-attorney',
    'accidentes-de-auto': 'car-accidents',
    'abogado-accidente-auto': 'car-accident-lawyer',
    'inmigracion': 'immigration',
    'abogado-inmigracion': 'immigration-lawyer',
    'bancarrota': 'bankruptcy',
    'dui': 'dui',
    'abogado-dui': 'dui-lawyer',
    'divorcio': 'divorce',
    'abogado-divorcio': 'divorce-lawyer',
    'divorce': 'divorce',
    'car-accidents': 'car-accidents',
    'criminal-defense': 'criminal-defense',
    'personal-injury': 'personal-injury',
    'workers-compensation': 'workers-compensation',
    'immigration': 'immigration',
    'spanish-speaking': 'spanish-speaking'
  };

  let englishPath = spanishPath;
  
  // Replace all known Spanish terms with English equivalents
  for (const [spanish, english] of Object.entries(serviceMap)) {
    const regex = new RegExp(spanish, 'g');
    englishPath = englishPath.replace(regex, english);
  }
  
  return englishPath;
}

// Create an English page based on Spanish page
function createEnglishPage(spanishPath, type) {
  let englishPath;
  
  if (type === 'ubicaciones') {
    // Convert ubicaciones path to locations path
    englishPath = mapSpanishToEnglish(spanishPath);
    
    // Determine if it's NC or FL based on city
    const parts = englishPath.split('/');
    const city = parts[0];
    
    const flCities = ['orlando', 'kissimmee', 'winter-park', 'oviedo'];
    const isFL = flCities.includes(city);
    
    if (!isFL && parts.length > 0) {
      // Add nc/ prefix for NC cities
      englishPath = 'nc/' + englishPath;
    }
    
    englishPath = path.join('src/app/locations', englishPath, 'page.tsx');
  } else if (type === 'cerca-de-mi') {
    // Convert cerca-de-mi path to near-me path
    const cleanedPath = spanishPath.replace('-cerca-de-mi', '');
    englishPath = mapSpanishToEnglish(cleanedPath);
    
    // Ensure it ends with -near-me
    if (!englishPath.endsWith('-near-me')) {
      englishPath += '-near-me';
    }
    
    englishPath = path.join('src/app/near-me', englishPath, 'page.tsx');
  }
  
  // Skip if already exists
  if (fs.existsSync(englishPath)) {
    return false;
  }
  
  // Create directory
  fs.mkdirSync(path.dirname(englishPath), { recursive: true });
  
  // Generate content
  const pathParts = path.dirname(englishPath).split(path.sep);
  const pageName = pathParts[pathParts.length - 1];
  const cityAndService = pageName.split('-');
  
  let city = '';
  let service = '';
  
  if (type === 'ubicaciones') {
    // For locations, extract city and service
    const locationParts = spanishPath.split('/');
    city = locationParts[0];
    service = locationParts[1] || '';
  } else {
    // For near-me, parse from the directory name
    const nearMeParts = pageName.replace('-near-me', '').split('-');
    
    // Common patterns: city-service-type-near-me
    if (nearMeParts.includes('lawyer') || nearMeParts.includes('attorney')) {
      const typeIndex = nearMeParts.findIndex(p => p === 'lawyer' || p === 'attorney');
      city = nearMeParts.slice(0, typeIndex - 1).join(' ');
      service = nearMeParts.slice(typeIndex - 1).join(' ');
    } else {
      city = nearMeParts[0];
      service = nearMeParts.slice(1).join(' ');
    }
  }
  
  const cityTitle = city.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const serviceTitle = service.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  const content = `import { Metadata } from 'next';

export const metadata: Metadata = {
  title: \`${serviceTitle} ${type === 'cerca-de-mi' ? 'Near Me in ' : 'in '}${cityTitle} | Vasquez Law Firm\`,
  description: \`${type === 'cerca-de-mi' ? 'Find the best ' : 'Expert '}${serviceTitle.toLowerCase()} ${type === 'cerca-de-mi' ? 'near you ' : ''}in ${cityTitle}. Experienced legal representation.\`,
};

export default function ${cityTitle.replace(/\s/g, '')}${serviceTitle.replace(/\s/g, '')}Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">${serviceTitle} ${type === 'cerca-de-mi' ? 'Near Me in ' : 'in '}${cityTitle}</h1>
      <p className="text-lg mb-6">
        ${type === 'cerca-de-mi' 
          ? `Looking for a ${serviceTitle.toLowerCase()} near you in ${cityTitle}? Vasquez Law Firm provides experienced legal representation right in your neighborhood.`
          : `Welcome to Vasquez Law Firm's ${cityTitle} office. We provide expert ${serviceTitle.toLowerCase()} services to the local community.`
        }
      </p>
      <div className="space-y-4">
        <section>
          <h2 className="text-2xl font-semibold mb-3">${type === 'cerca-de-mi' ? 'Local Legal Services' : 'Our Services'}</h2>
          <p>${type === 'cerca-de-mi' 
            ? 'We understand the importance of having a lawyer who knows your community and local laws.'
            : `We offer comprehensive ${serviceTitle.toLowerCase()} services tailored to your needs.`
          }</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3">Why Choose Us</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Local expertise in ${cityTitle}</li>
            <li>Experienced ${serviceTitle.toLowerCase()}</li>
            <li>Personalized attention to your case</li>
            <li>Convenient location ${type === 'cerca-de-mi' ? 'near you' : ''}</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3">Contact Us Today</h2>
          <p>Don't wait - reach out to our ${cityTitle} office for immediate assistance.</p>
        </section>
      </div>
    </div>
  );
}
`;
  
  fs.writeFileSync(englishPath, content);
  return true;
}

// Main execution
async function generateCompleteParityPages() {
  console.log('Starting complete parity page generation...\n');
  
  // Get all Spanish pages
  const ubicacionesDir = path.join(__dirname, '../src/app/es/ubicaciones');
  const cercaDeMiDir = path.join(__dirname, '../src/app/es/cerca-de-mi');
  
  const ubicacionesPages = getAllPages(ubicacionesDir);
  const cercaDeMiPages = getAllPages(cercaDeMiDir);
  
  console.log(`Found ${ubicacionesPages.length} Spanish ubicaciones pages`);
  console.log(`Found ${cercaDeMiPages.length} Spanish cerca-de-mi pages\n`);
  
  let createdLocations = 0;
  let createdNearMe = 0;
  
  // Process ubicaciones pages
  console.log('Creating English location pages...');
  for (const page of ubicacionesPages) {
    if (createEnglishPage(page, 'ubicaciones')) {
      createdLocations++;
      console.log(`✅ Created: /locations/${page}`);
    }
  }
  
  // Process cerca-de-mi pages
  console.log('\nCreating English near-me pages...');
  for (const page of cercaDeMiPages) {
    if (createEnglishPage(page, 'cerca-de-mi')) {
      createdNearMe++;
      console.log(`✅ Created: /near-me/${page}`);
    }
  }
  
  // Count total pages
  const englishLocationPages = getAllPages(path.join(__dirname, '../src/app/locations'));
  const englishNearMePages = getAllPages(path.join(__dirname, '../src/app/near-me'));
  const spanishPages = ubicacionesPages.length + cercaDeMiPages.length;
  const englishPages = englishLocationPages.length + englishNearMePages.length;
  
  console.log('\n=== FINAL SUMMARY ===');
  console.log(`Spanish pages total: ${spanishPages}`);
  console.log(`- Ubicaciones: ${ubicacionesPages.length}`);
  console.log(`- Cerca de mi: ${cercaDeMiPages.length}`);
  console.log(`\nEnglish pages total: ${englishPages}`);
  console.log(`- Locations: ${englishLocationPages.length}`);
  console.log(`- Near me: ${englishNearMePages.length}`);
  console.log(`\nCreated in this run:`);
  console.log(`- New location pages: ${createdLocations}`);
  console.log(`- New near-me pages: ${createdNearMe}`);
  console.log(`- Total new pages: ${createdLocations + createdNearMe}`);
  
  if (spanishPages === englishPages) {
    console.log('\n✅ PERFECT PARITY ACHIEVED! Each Spanish page has an English counterpart.');
  } else {
    console.log(`\n⚠️  Parity difference: ${Math.abs(spanishPages - englishPages)} pages`);
  }
}

// Run the script
generateCompleteParityPages();