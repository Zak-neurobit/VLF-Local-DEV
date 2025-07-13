import fs from 'fs';
import path from 'path';
import { NC_CITIES, generateCityMetadata, generateCityPageContent, getNearbyOffice } from '../src/lib/seo/city-page-generator';

const LOCATIONS_DIR = path.join(process.cwd(), 'src/app/locations/nc');

// Template for city page
const cityPageTemplate = (city: typeof NC_CITIES[0]) => {
  const nearbyOffice = getNearbyOffice(city.name);
  const content = generateCityPageContent({
    city: city.name,
    slug: city.slug,
    county: city.county,
    population: city.population,
    nearbyOffice,
    phoneNumber: '1-844-967-3536'
  });
  
  return `import { Metadata } from 'next';
import { CityPageTemplate } from '@/components/templates/CityPageTemplate';
import { generateCityMetadata } from '@/lib/seo/city-page-generator';

const cityData = {
  name: '${city.name}',
  slug: '${city.slug}',
  county: '${city.county}',
  population: ${city.population}
};

export const metadata: Metadata = generateCityMetadata({
  city: cityData.name,
  slug: cityData.slug,
  county: cityData.county,
  population: cityData.population,
  nearbyOffice: '${nearbyOffice}',
  phoneNumber: '1-844-967-3536'
});

export default function ${city.name.replace(/[\s-]/g, '')}Page() {
  const content = ${JSON.stringify(content, null, 2)};
  
  return (
    <CityPageTemplate
      city={cityData}
      nearbyOffice="${nearbyOffice}"
      content={content}
    />
  );
}`;
};

// Generate pages
async function generateCityPages() {
  console.log('🚀 Generating city pages...\n');
  
  for (const city of NC_CITIES) {
    const cityDir = path.join(LOCATIONS_DIR, city.slug);
    const pageFile = path.join(cityDir, 'page.tsx');
    
    // Check if directory exists
    if (!fs.existsSync(cityDir)) {
      fs.mkdirSync(cityDir, { recursive: true });
      console.log(`✅ Created directory: ${city.slug}`);
    }
    
    // Check if page already exists
    if (fs.existsSync(pageFile)) {
      console.log(`⏭️  Skipping ${city.name} - page already exists`);
      continue;
    }
    
    // Generate and write the page
    const pageContent = cityPageTemplate(city);
    fs.writeFileSync(pageFile, pageContent);
    console.log(`✅ Generated page for ${city.name}`);
    
    // Also generate sub-pages for each practice area
    const practiceAreas = [
      { name: 'Immigration Lawyer', slug: 'immigration-lawyer' },
      { name: 'Personal Injury Attorney', slug: 'personal-injury-attorney' },
      { name: 'Workers Compensation Lawyer', slug: 'workers-compensation-lawyer' },
      { name: 'Criminal Defense Attorney', slug: 'criminal-defense-attorney' },
      { name: 'Car Accident Lawyer', slug: 'car-accident-lawyer' }
    ];
    
    for (const area of practiceAreas) {
      const areaFile = path.join(cityDir, area.slug, 'page.tsx');
      const areaDir = path.join(cityDir, area.slug);
      
      if (!fs.existsSync(areaDir)) {
        fs.mkdirSync(areaDir, { recursive: true });
      }
      
      if (fs.existsSync(areaFile)) {
        continue;
      }
      
      const areaPageContent = generatePracticeAreaPageForCity(city, area);
      fs.writeFileSync(areaFile, areaPageContent);
      console.log(`  ✅ Generated ${area.name} page for ${city.name}`);
    }
  }
  
  console.log('\n✨ City page generation complete!');
  console.log(`Generated ${NC_CITIES.length} city pages with 5 practice area sub-pages each.`);
  console.log(`Total pages created: ${NC_CITIES.length * 6}`);
}

function generatePracticeAreaPageForCity(city: typeof NC_CITIES[0], area: { name: string; slug: string }) {
  return `import { Metadata } from 'next';
import { LocationServicePageTemplate } from '@/components/templates/LocationServicePageTemplate';

export const metadata: Metadata = {
  title: '${city.name} ${area.name} | #1 Rated | Vasquez Law Firm',
  description: 'Top-rated ${area.name.toLowerCase()} in ${city.name}, NC. Free consultation. 24/7 availability. Se habla español. Call 1-844-YO-PELEO.',
  keywords: '${city.name} ${area.name.toLowerCase()}, ${area.slug} ${city.name}, ${city.name} ${area.slug.replace(/-/g, ' ')}'
};

export default function ${city.name.replace(/[\s-]/g, '')}${area.name.replace(/[\s]/g, '')}Page() {
  return (
    <LocationServicePageTemplate
      city="${city.name}"
      county="${city.county}"
      service="${area.name}"
      slug="${area.slug}"
    />
  );
}`;
}

// Run the generator
generateCityPages().catch(console.error);