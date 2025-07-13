import fs from 'fs';
import path from 'path';

// NC Cities data
const ncCities = [
  {
    name: 'Charlotte',
    slug: 'charlotte',
    population: '897,720',
    county: 'Mecklenburg',
    courts: ['Mecklenburg County Courthouse', 'Immigration Court Charlotte'],
  },
  {
    name: 'Raleigh',
    slug: 'raleigh',
    population: '474,069',
    county: 'Wake',
    courts: ['Wake County Courthouse', 'U.S. District Court Eastern District'],
  },
  {
    name: 'Durham',
    slug: 'durham',
    population: '283,506',
    county: 'Durham',
    courts: ['Durham County Courthouse'],
  },
  {
    name: 'Greensboro',
    slug: 'greensboro',
    population: '299,035',
    county: 'Guilford',
    courts: ['Guilford County Courthouse'],
  },
  {
    name: 'Winston-Salem',
    slug: 'winston-salem',
    population: '249,545',
    county: 'Forsyth',
    courts: ['Forsyth County Hall of Justice'],
  },
  {
    name: 'Smithfield',
    slug: 'smithfield',
    population: '12,697',
    county: 'Johnston',
    courts: ['Johnston County Courthouse'],
  },
  {
    name: 'Clayton',
    slug: 'clayton',
    population: '26,307',
    county: 'Johnston',
    courts: ['Johnston County Courthouse'],
  },
  {
    name: 'Garner',
    slug: 'garner',
    population: '31,159',
    county: 'Wake',
    courts: ['Wake County Courthouse'],
  },
  {
    name: 'Cary',
    slug: 'cary',
    population: '174,721',
    county: 'Wake',
    courts: ['Wake County Courthouse'],
  },
  {
    name: 'Apex',
    slug: 'apex',
    population: '58,780',
    county: 'Wake',
    courts: ['Wake County Courthouse'],
  },
];

const practiceAreas = [
  { name: 'Immigration Lawyer', slug: 'immigration-lawyer' },
  { name: 'Personal Injury Attorney', slug: 'personal-injury-attorney' },
  { name: 'Workers Compensation Lawyer', slug: 'workers-compensation-lawyer' },
  { name: 'Criminal Defense Attorney', slug: 'criminal-defense-attorney' },
  { name: 'Car Accident Lawyer', slug: 'car-accident-lawyer' },
];

// Template for location + practice area page
const generatePageContent = (city: any, practiceArea: any) => {
  return `import { Metadata } from 'next';
import LocationPageTemplate from '@/components/locations/LocationPageTemplate';
import { localSEOGenerator } from '@/lib/seo/local-seo-generator';

const cityData = ${JSON.stringify(city, null, 2)};
const practiceArea = '${practiceArea.name}';

export async function generateMetadata(): Promise<Metadata> {
  return localSEOGenerator.generateLocationMetadata(
    cityData.name,
    'NC',
    practiceArea
  );
}

export default function ${city.name.replace(/[^a-zA-Z]/g, '')}${practiceArea.name.replace(/[^a-zA-Z]/g, '')}Page() {
  return (
    <LocationPageTemplate
      city={cityData.name}
      state="NC"
      practiceArea={practiceArea}
      population={cityData.population}
      county={cityData.county}
      courts={cityData.courts}
    />
  );
}`;
};

// Generate all pages
async function generatePages() {
  const baseDir = path.join(process.cwd(), 'src/app/locations/nc');

  for (const city of ncCities) {
    const cityDir = path.join(baseDir, city.slug);

    // Create city directory
    if (!fs.existsSync(cityDir)) {
      fs.mkdirSync(cityDir, { recursive: true });
    }

    // Create main city page
    const cityPageContent = `import { Metadata } from 'next';
import LocationPageTemplate from '@/components/locations/LocationPageTemplate';

export const metadata: Metadata = {
  title: 'Vasquez Law Firm - ${city.name}, NC | Immigration & Personal Injury Attorneys',
  description: 'Top-rated law firm in ${city.name}, NC. Experienced immigration lawyers and personal injury attorneys serving ${city.county} County. Free consultation. Se habla español.',
};

export default function ${city.name.replace(/[^a-zA-Z]/g, '')}Page() {
  return (
    <LocationPageTemplate
      city="${city.name}"
      state="NC"
      population="${city.population}"
      county="${city.county}"
      courts={${JSON.stringify(city.courts)}}
    />
  );
}`;

    fs.writeFileSync(path.join(cityDir, 'page.tsx'), cityPageContent);

    // Create practice area pages
    for (const practiceArea of practiceAreas) {
      const practiceDir = path.join(cityDir, practiceArea.slug);

      if (!fs.existsSync(practiceDir)) {
        fs.mkdirSync(practiceDir, { recursive: true });
      }

      const pageContent = generatePageContent(city, practiceArea);
      fs.writeFileSync(path.join(practiceDir, 'page.tsx'), pageContent);
    }
  }

  console.log('✅ Generated location pages for all NC cities and practice areas!');
}

// Run the generator
generatePages().catch(console.error);
