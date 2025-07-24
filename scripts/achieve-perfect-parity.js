const fs = require('fs');
const path = require('path');

// Get all page paths recursively
function getAllPagePaths(dir, baseDir = dir) {
  const pages = [];
  
  function traverse(currentDir) {
    try {
      const items = fs.readdirSync(currentDir);
      
      for (const item of items) {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          traverse(fullPath);
        } else if (item === 'page.tsx') {
          const relativePath = path.relative(baseDir, currentDir);
          pages.push(relativePath || '.');
        }
      }
    } catch (err) {
      console.error(`Error reading directory ${currentDir}:`, err.message);
    }
  }
  
  traverse(dir);
  return pages;
}

// Service mappings
const serviceMap = {
  'abogado-espanol': 'spanish-speaking-lawyer',
  'abogado-español': 'spanish-speaking-lawyer',
  'derecho-familiar': 'family-law',
  'compensacion-laboral': 'workers-compensation',
  'defensa-criminal': 'criminal-defense',
  'lesiones-personales': 'personal-injury',
  'accidentes-de-auto': 'car-accidents',
  'inmigracion': 'immigration',
  'bancarrota': 'bankruptcy',
  'dui': 'dui',
  'divorcio': 'divorce'
};

// Near-me specific mappings
const nearMeMap = {
  'abogado-dui': 'dui-lawyer',
  'abogado-accidente-auto': 'car-accident-lawyer',
  'abogado-defensa-criminal': 'criminal-defense-lawyer',
  'abogado-lesiones-personales': 'personal-injury-attorney',
  'abogado-compensacion-laboral': 'workers-compensation-lawyer',
  'abogado-divorcio': 'divorce-lawyer',
  'abogado-inmigracion': 'immigration-lawyer',
  'abogado-que-habla-español': 'spanish-speaking-lawyer',
  'car-accidents': 'car-accident-lawyer',
  'criminal-defense': 'criminal-defense-lawyer',
  'personal-injury': 'personal-injury-attorney',
  'workers-compensation': 'workers-compensation-lawyer',
  'divorce': 'divorce-lawyer',
  'immigration': 'immigration-lawyer',
  'spanish-speaking': 'spanish-speaking-lawyer'
};

// Cities that should be in NC
const ncCities = new Set([
  'asheville', 'burlington', 'cary', 'chapel-hill', 'charlotte', 'concord',
  'cornelius', 'davidson', 'durham', 'fayetteville', 'gastonia', 'greensboro',
  'hickory', 'high-point', 'huntersville', 'indian-trail', 'kannapolis',
  'matthews', 'mint-hill', 'monroe', 'mooresville', 'pineville', 'raleigh',
  'rocky-mount', 'sanford', 'smithfield', 'wilmington', 'wilson', 'winston-salem'
]);

// Create English page from Spanish path
function createEnglishPage(spanishPath, type) {
  let englishPath;
  let content;
  
  if (type === 'ubicaciones') {
    // Parse Spanish ubicaciones path
    const parts = spanishPath.split('/');
    
    if (parts.length === 1 && parts[0] !== '.') {
      // City-only page (e.g., winston-salem)
      const city = parts[0];
      const isNC = ncCities.has(city);
      englishPath = isNC ? `nc/${city}` : city;
    } else if (parts.length === 2) {
      // City-service page (e.g., charlotte-inmigracion)
      let [cityService] = parts;
      
      // Split city and service
      let city = '';
      let service = '';
      
      // Find service in the path
      for (const [spanish, english] of Object.entries(serviceMap)) {
        if (cityService.includes(spanish)) {
          const cityPart = cityService.substring(0, cityService.indexOf(spanish) - 1);
          city = cityPart;
          service = english;
          break;
        }
      }
      
      if (!service && cityService.includes('-')) {
        // Try splitting at last hyphen
        const lastHyphen = cityService.lastIndexOf('-');
        city = cityService.substring(0, lastHyphen);
        const serviceSpanish = cityService.substring(lastHyphen + 1);
        service = serviceMap[serviceSpanish] || serviceSpanish;
      }
      
      if (city && service) {
        const isNC = ncCities.has(city);
        englishPath = isNC ? `nc/${city}/${service}` : `${city}/${service}`;
      }
    }
    
    if (!englishPath) return null;
    
    const cityName = englishPath.split('/').pop().split('-').map(w => 
      w.charAt(0).toUpperCase() + w.slice(1)
    ).join(' ');
    
    content = generateLocationPageContent(cityName, englishPath);
    englishPath = `src/app/locations/${englishPath}/page.tsx`;
    
  } else if (type === 'cerca-de-mi') {
    // Parse cerca-de-mi path
    const dirName = spanishPath.replace('-cerca-de-mi', '');
    
    // Extract city and service type
    let city = '';
    let serviceType = '';
    
    // Look for known patterns
    for (const [spanish, english] of Object.entries(nearMeMap)) {
      if (dirName.includes(spanish)) {
        const parts = dirName.split('-' + spanish.split('-')[0]);
        city = parts[0];
        serviceType = english;
        break;
      }
    }
    
    if (!city || !serviceType) {
      // Fallback parsing
      const parts = dirName.split('-');
      if (parts.length >= 2) {
        city = parts[0];
        serviceType = parts.slice(1).join('-');
      }
    }
    
    if (city && serviceType) {
      englishPath = `${city}-${serviceType}-near-me`;
      content = generateNearMePageContent(city, serviceType);
      englishPath = `src/app/near-me/${englishPath}/page.tsx`;
    }
  }
  
  if (!englishPath) return null;
  
  // Create the page if it doesn't exist
  if (!fs.existsSync(englishPath)) {
    fs.mkdirSync(path.dirname(englishPath), { recursive: true });
    fs.writeFileSync(englishPath, content);
    return englishPath;
  }
  
  return null;
}

// Generate location page content
function generateLocationPageContent(cityName, path) {
  const serviceName = path.includes('/') ? 
    path.split('/').pop().split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 
    '';
    
  return `import { Metadata } from 'next';

export const metadata: Metadata = {
  title: \`${serviceName ? serviceName + ' - ' : ''}${cityName} | Vasquez Law Firm\`,
  description: \`${serviceName || 'Legal services'} in ${cityName}. Experienced attorneys serving the local community.\`,
};

export default function ${cityName.replace(/\s/g, '')}${serviceName.replace(/\s/g, '')}Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">${serviceName || 'Legal Services'} in ${cityName}</h1>
      <p className="text-lg mb-6">
        Welcome to Vasquez Law Firm's ${cityName} ${serviceName ? 'office' : 'location'}. 
        We provide comprehensive legal services to the local community.
      </p>
      <div className="space-y-4">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Our Services</h2>
          <p>We offer expert legal representation in ${serviceName ? serviceName.toLowerCase() : 'various practice areas'}.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
          <p>Get in touch with our ${cityName} office today for a consultation.</p>
        </section>
      </div>
    </div>
  );
}
`;
}

// Generate near-me page content
function generateNearMePageContent(city, serviceType) {
  const cityName = city.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const serviceName = serviceType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  return `import { Metadata } from 'next';

export const metadata: Metadata = {
  title: \`${serviceName} Near Me in ${cityName} | Vasquez Law Firm\`,
  description: \`Find the best ${serviceName.toLowerCase()} near you in ${cityName}. Local legal representation when you need it most.\`,
};

export default function ${cityName.replace(/\s/g, '')}${serviceName.replace(/\s/g, '')}NearMePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">${serviceName} Near Me in ${cityName}</h1>
      <p className="text-lg mb-6">
        Looking for a ${serviceName.toLowerCase()} near you in ${cityName}? 
        Vasquez Law Firm provides experienced legal representation right in your neighborhood.
      </p>
      <div className="space-y-4">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Local Legal Services</h2>
          <p>We understand the importance of having a lawyer who knows your community and local laws.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3">Why Choose Us</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Local expertise in ${cityName}</li>
            <li>Experienced ${serviceName.toLowerCase()}s</li>
            <li>Personalized attention to your case</li>
            <li>Convenient location near you</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3">Contact Us Today</h2>
          <p>Don't wait - reach out to our ${cityName} office for immediate assistance.</p>
        </section>
      </div>
    </div>
  );
}
`;
}

// Main function
function achievePerfectParity() {
  console.log('=== ACHIEVING PERFECT 1:1 PARITY ===\n');
  
  // Get all Spanish pages
  const spanishUbicacionesDir = path.join(__dirname, '../src/app/es/ubicaciones');
  const spanishCercaDeMiDir = path.join(__dirname, '../src/app/es/cerca-de-mi');
  
  const spanishUbicaciones = getAllPagePaths(spanishUbicacionesDir);
  const spanishCercaDeMi = getAllPagePaths(spanishCercaDeMiDir);
  
  console.log(`Found ${spanishUbicaciones.length} Spanish ubicaciones pages`);
  console.log(`Found ${spanishCercaDeMi.length} Spanish cerca-de-mi pages\n`);
  
  let createdCount = 0;
  
  // Create English equivalents for ubicaciones
  console.log('Creating English location pages...');
  for (const spanishPath of spanishUbicaciones) {
    const created = createEnglishPage(spanishPath, 'ubicaciones');
    if (created) {
      createdCount++;
      console.log(`✅ Created: ${created}`);
    }
  }
  
  // Create English equivalents for cerca-de-mi
  console.log('\nCreating English near-me pages...');
  for (const spanishPath of spanishCercaDeMi) {
    const created = createEnglishPage(spanishPath, 'cerca-de-mi');
    if (created) {
      createdCount++;
      console.log(`✅ Created: ${created}`);
    }
  }
  
  console.log(`\n✅ Created ${createdCount} new English pages`);
  
  // Final count
  const englishLocations = getAllPagePaths(path.join(__dirname, '../src/app/locations'));
  const englishNearMe = getAllPagePaths(path.join(__dirname, '../src/app/near-me'));
  
  console.log('\n=== FINAL PARITY CHECK ===');
  console.log(`Spanish ubicaciones: ${spanishUbicaciones.length}`);
  console.log(`English locations: ${englishLocations.length}`);
  console.log(`Spanish cerca-de-mi: ${spanishCercaDeMi.length}`);
  console.log(`English near-me: ${englishNearMe.length}`);
  
  const totalSpanish = spanishUbicaciones.length + spanishCercaDeMi.length;
  const totalEnglish = englishLocations.length + englishNearMe.length;
  
  if (totalSpanish === totalEnglish) {
    console.log('\n✅ PERFECT PARITY ACHIEVED!');
  } else {
    console.log(`\n⚠️ Parity difference: ${Math.abs(totalSpanish - totalEnglish)} pages`);
  }
}

// Run
achievePerfectParity();