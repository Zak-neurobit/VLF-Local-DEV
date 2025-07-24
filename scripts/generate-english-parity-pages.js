const fs = require('fs');
const path = require('path');

// Service name mappings from Spanish to English
const serviceMap = {
  'abogado-espanol': 'spanish-speaking-lawyer',
  'derecho-familiar': 'family-law',
  'compensacion-laboral': 'workers-compensation', 
  'defensa-criminal': 'criminal-defense',
  'lesiones-personales': 'personal-injury',
  'accidentes-de-auto': 'car-accidents',
  'inmigracion': 'immigration',
  'bancarrota': 'bankruptcy',
  'dui': 'dui'
};

// City configuration - which cities are NC vs FL
const ncCities = new Set([
  'smithfield', 'monroe', 'hickory', 'mooresville', 'durham', 'high-point',
  'chapel-hill', 'gastonia', 'davidson', 'rocky-mount', 'wilmington', 'sanford',
  'huntersville', 'greensboro', 'burlington', 'wilson', 'pineville', 'concord',
  'indian-trail', 'cary', 'cornelius', 'fayetteville', 'charlotte', 'matthews',
  'winston-salem', 'kannapolis', 'raleigh', 'mint-hill', 'asheville', 'apex',
  'clayton', 'garner'
]);

const flCities = new Set([
  'orlando', 'kissimmee', 'winter-park', 'oviedo'
]);

// Get all Spanish ubicaciones pages
function getSpanishUbicacionesPages() {
  const ubicacionesDir = path.join(__dirname, '../src/app/es/ubicaciones');
  const pages = [];
  
  const dirs = fs.readdirSync(ubicacionesDir);
  dirs.forEach(dir => {
    const pagePath = path.join(ubicacionesDir, dir, 'page.tsx');
    if (fs.existsSync(pagePath)) {
      // Parse city and service from directory name
      const parts = dir.split('-');
      let city = '';
      let service = '';
      
      // Find where service starts (looking for known service keywords)
      let serviceStartIndex = -1;
      for (let i = 0; i < parts.length; i++) {
        const remaining = parts.slice(i).join('-');
        if (Object.keys(serviceMap).some(s => remaining.startsWith(s))) {
          serviceStartIndex = i;
          break;
        }
      }
      
      if (serviceStartIndex > 0) {
        city = parts.slice(0, serviceStartIndex).join('-');
        service = parts.slice(serviceStartIndex).join('-');
      } else {
        // Special case for city-only pages like winston-salem
        city = dir;
        service = '';
      }
      
      pages.push({ city, service, dir });
    }
  });
  
  return pages;
}

// Get all Spanish cerca-de-mi pages
function getSpanishCercaDeMiPages() {
  const cercaDeMiDir = path.join(__dirname, '../src/app/es/cerca-de-mi');
  const pages = [];
  
  const dirs = fs.readdirSync(cercaDeMiDir);
  dirs.forEach(dir => {
    const pagePath = path.join(cercaDeMiDir, dir, 'page.tsx');
    if (fs.existsSync(pagePath)) {
      // Remove -cerca-de-mi suffix
      const cleanedDir = dir.replace('-cerca-de-mi', '');
      const parts = cleanedDir.split('-');
      
      // Extract city and service
      let city = '';
      let service = '';
      
      // Try to find Spanish service keywords
      const spanishServiceKeywords = [
        'abogado-dui', 'abogado-accidente-auto', 'abogado-defensa-criminal',
        'abogado-lesiones-personales', 'abogado-compensacion-laboral',
        'abogado-divorcio', 'abogado-inmigracion', 'abogado-que-habla-español',
        'car-accidents', 'dui', 'criminal-defense', 'personal-injury',
        'workers-compensation', 'divorce', 'immigration', 'spanish-speaking'
      ];
      
      let serviceStartIndex = -1;
      for (let i = 0; i < parts.length; i++) {
        const remaining = parts.slice(i).join('-');
        if (spanishServiceKeywords.some(s => remaining.includes(s))) {
          serviceStartIndex = i;
          break;
        }
      }
      
      if (serviceStartIndex > 0) {
        city = parts.slice(0, serviceStartIndex).join('-');
        service = parts.slice(serviceStartIndex).join('-');
      }
      
      pages.push({ city, service, dir });
    }
  });
  
  return pages;
}

// Create English location page
function createEnglishLocationPage(city, service, isNC = true) {
  const englishService = serviceMap[service] || service;
  let targetPath;
  
  if (!service) {
    // City-only page
    targetPath = isNC 
      ? path.join(__dirname, `../src/app/locations/nc/${city}/page.tsx`)
      : path.join(__dirname, `../src/app/locations/${city}/page.tsx`);
  } else {
    // City + service page
    targetPath = isNC
      ? path.join(__dirname, `../src/app/locations/nc/${city}/${englishService}/page.tsx`)
      : path.join(__dirname, `../src/app/locations/${city}/${englishService}/page.tsx`);
  }
  
  // Skip if already exists
  if (fs.existsSync(targetPath)) {
    return false;
  }
  
  // Create directory
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  
  // Generate content
  const cityTitle = city.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const serviceTitle = englishService ? englishService.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : '';
  
  const content = `import { Metadata } from 'next';

export const metadata: Metadata = {
  title: \`${serviceTitle ? serviceTitle + ' - ' : ''}${cityTitle} | Vasquez Law Firm\`,
  description: \`${serviceTitle ? serviceTitle + ' services' : 'Legal services'} in ${cityTitle}. Experienced attorneys serving the local community.\`,
};

export default function ${cityTitle.replace(/\s/g, '')}${serviceTitle.replace(/\s/g, '')}Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">${serviceTitle || 'Legal Services'} in ${cityTitle}</h1>
      <p className="text-lg mb-6">
        Welcome to Vasquez Law Firm's ${cityTitle} ${serviceTitle ? serviceTitle.toLowerCase() : 'office'}. 
        We provide comprehensive legal services to the local community.
      </p>
      <div className="space-y-4">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Our Services</h2>
          <p>We offer expert legal representation in ${serviceTitle ? serviceTitle.toLowerCase() : 'various practice areas'}.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
          <p>Get in touch with our ${cityTitle} office today for a consultation.</p>
        </section>
      </div>
    </div>
  );
}
`;
  
  fs.writeFileSync(targetPath, content);
  return true;
}

// Create English near-me page
function createEnglishNearMePage(city, service) {
  // Map Spanish service patterns to English
  const nearMeServiceMap = {
    'abogado-dui': 'dui-lawyer',
    'abogado-accidente-auto': 'car-accident-lawyer',
    'abogado-defensa-criminal': 'criminal-defense-lawyer',
    'abogado-lesiones-personales': 'personal-injury-attorney',
    'abogado-compensacion-laboral': 'workers-compensation-lawyer',
    'abogado-divorcio': 'divorce-lawyer',
    'abogado-inmigracion': 'immigration-lawyer',
    'abogado-que-habla-español': 'spanish-speaking-lawyer',
    'car-accidents': 'car-accident-lawyer',
    'dui': 'dui-lawyer',
    'criminal-defense': 'criminal-defense-lawyer',
    'personal-injury': 'personal-injury-attorney',
    'workers-compensation': 'workers-compensation-lawyer',
    'divorce': 'divorce-lawyer',
    'immigration': 'immigration-lawyer',
    'spanish-speaking': 'spanish-speaking-lawyer'
  };
  
  let englishService = service;
  for (const [spanish, english] of Object.entries(nearMeServiceMap)) {
    if (service.includes(spanish)) {
      englishService = english;
      break;
    }
  }
  
  const targetPath = path.join(__dirname, `../src/app/near-me/${city}-${englishService}-near-me/page.tsx`);
  
  // Skip if already exists
  if (fs.existsSync(targetPath)) {
    return false;
  }
  
  // Create directory
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  
  // Generate content
  const cityTitle = city.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const serviceTitle = englishService.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  const content = `import { Metadata } from 'next';

export const metadata: Metadata = {
  title: \`${serviceTitle} Near Me in ${cityTitle} | Vasquez Law Firm\`,
  description: \`Find the best ${serviceTitle.toLowerCase()} near you in ${cityTitle}. Local legal representation when you need it most.\`,
};

export default function ${cityTitle.replace(/\s/g, '')}${serviceTitle.replace(/\s/g, '')}NearMePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">${serviceTitle} Near Me in ${cityTitle}</h1>
      <p className="text-lg mb-6">
        Looking for a ${serviceTitle.toLowerCase()} near you in ${cityTitle}? 
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
            <li>Local expertise in ${cityTitle}</li>
            <li>Experienced ${serviceTitle.toLowerCase()}s</li>
            <li>Personalized attention to your case</li>
            <li>Convenient location near you</li>
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
  
  fs.writeFileSync(targetPath, content);
  return true;
}

// Main execution
function generateAllEnglishPages() {
  console.log('Starting English page generation for parity...\n');
  
  let createdLocations = 0;
  let createdNearMe = 0;
  
  // Process ubicaciones → locations
  console.log('Processing Spanish ubicaciones pages...');
  const ubicacionesPages = getSpanishUbicacionesPages();
  
  ubicacionesPages.forEach(({ city, service }) => {
    const isNC = ncCities.has(city);
    const created = createEnglishLocationPage(city, service, isNC);
    if (created) {
      createdLocations++;
      console.log(`✅ Created: /locations/${isNC ? 'nc/' : ''}${city}${service ? '/' + (serviceMap[service] || service) : ''}`);
    }
  });
  
  // Process cerca-de-mi → near-me
  console.log('\nProcessing Spanish cerca-de-mi pages...');
  const cercaDeMiPages = getSpanishCercaDeMiPages();
  
  cercaDeMiPages.forEach(({ city, service }) => {
    const created = createEnglishNearMePage(city, service);
    if (created) {
      createdNearMe++;
      console.log(`✅ Created: /near-me/${city}-${service}-near-me`);
    }
  });
  
  console.log('\n=== SUMMARY ===');
  console.log(`Created ${createdLocations} new location pages`);
  console.log(`Created ${createdNearMe} new near-me pages`);
  console.log(`Total new pages: ${createdLocations + createdNearMe}`);
}

// Run the script
generateAllEnglishPages();