import fs from 'fs';
import path from 'path';
import { 
  CHARLOTTE_NEIGHBORHOODS, 
  RALEIGH_NEIGHBORHOODS, 
  DURHAM_NEIGHBORHOODS 
} from '../src/lib/seo/neighborhood-page-generator';

const LOCATIONS_DIR = path.join(process.cwd(), 'src/app/locations/nc');

// Template for neighborhood page
const neighborhoodPageTemplate = (neighborhood: any, city: string, citySlug: string) => {
  const componentName = `${neighborhood.name.replace(/[\s-]/g, '')}${city.replace(/[\s-]/g, '')}Page`;
  
  return `import { Metadata } from 'next';
import { NeighborhoodPageTemplate } from '@/components/templates/NeighborhoodPageTemplate';
import { generateNeighborhoodMetadata, generateNeighborhoodPageContent } from '@/lib/seo/neighborhood-page-generator';

const neighborhoodData = {
  neighborhood: '${neighborhood.name}',
  slug: '${neighborhood.slug}',
  city: '${city}',
  citySlug: '${citySlug}',
  zipCodes: ${JSON.stringify(neighborhood.zipCodes)}
};

export const metadata: Metadata = generateNeighborhoodMetadata(neighborhoodData);

export default function ${componentName}() {
  const content = generateNeighborhoodPageContent(neighborhoodData);
  
  return (
    <NeighborhoodPageTemplate
      neighborhood={neighborhoodData}
      content={content}
    />
  );
}`;
};

// Generate pages for all neighborhoods
async function generateNeighborhoodPages() {
  console.log('🏘️  Generating neighborhood pages...\n');
  
  const cities = [
    { name: 'Charlotte', slug: 'charlotte', neighborhoods: CHARLOTTE_NEIGHBORHOODS },
    { name: 'Raleigh', slug: 'raleigh', neighborhoods: RALEIGH_NEIGHBORHOODS },
    { name: 'Durham', slug: 'durham', neighborhoods: DURHAM_NEIGHBORHOODS }
  ];
  
  let totalCreated = 0;
  
  for (const city of cities) {
    console.log(`\n📍 Processing ${city.name} neighborhoods...`);
    
    const cityDir = path.join(LOCATIONS_DIR, city.slug);
    const neighborhoodsDir = path.join(cityDir, 'neighborhoods');
    
    // Create neighborhoods directory if it doesn't exist
    if (!fs.existsSync(neighborhoodsDir)) {
      fs.mkdirSync(neighborhoodsDir, { recursive: true });
      console.log(`✅ Created neighborhoods directory for ${city.name}`);
    }
    
    for (const neighborhood of city.neighborhoods) {
      const neighborhoodDir = path.join(neighborhoodsDir, neighborhood.slug);
      const pageFile = path.join(neighborhoodDir, 'page.tsx');
      
      // Create neighborhood directory
      if (!fs.existsSync(neighborhoodDir)) {
        fs.mkdirSync(neighborhoodDir, { recursive: true });
      }
      
      // Check if page already exists
      if (fs.existsSync(pageFile)) {
        console.log(`⏭️  Skipping ${neighborhood.name} - page already exists`);
        continue;
      }
      
      // Generate and write the page
      const pageContent = neighborhoodPageTemplate(neighborhood, city.name, city.slug);
      fs.writeFileSync(pageFile, pageContent);
      console.log(`✅ Generated page for ${neighborhood.name}, ${city.name}`);
      totalCreated++;
    }
  }
  
  // Create neighborhood hub pages for each city
  for (const city of cities) {
    const hubFile = path.join(LOCATIONS_DIR, city.slug, 'neighborhoods', 'page.tsx');
    
    if (!fs.existsSync(hubFile)) {
      const hubContent = generateNeighborhoodHubPage(city);
      fs.writeFileSync(hubFile, hubContent);
      console.log(`\n✅ Generated neighborhood hub page for ${city.name}`);
    }
  }
  
  console.log(`\n✨ Neighborhood page generation complete!`);
  console.log(`Total pages created: ${totalCreated}`);
  console.log(`- Charlotte: ${CHARLOTTE_NEIGHBORHOODS.length} neighborhoods`);
  console.log(`- Raleigh: ${RALEIGH_NEIGHBORHOODS.length} neighborhoods`);
  console.log(`- Durham: ${DURHAM_NEIGHBORHOODS.length} neighborhoods`);
}

function generateNeighborhoodHubPage(city: { name: string; slug: string; neighborhoods: any[] }) {
  return `import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: '${city.name} Neighborhood Lawyers | All Areas Served | Vasquez Law Firm',
  description: 'Vasquez Law Firm serves all ${city.name} neighborhoods with immigration, personal injury, criminal defense, and workers comp legal services. Find your neighborhood.',
  keywords: '${city.name} neighborhood lawyer, ${city.name} area attorney, lawyers by neighborhood ${city.name}'
};

export default function ${city.name}NeighborhoodsPage() {
  const neighborhoods = ${JSON.stringify(city.neighborhoods, null, 2)};
  
  return (
    <div className="min-h-screen bg-black">
      <section className="py-20 bg-gradient-to-br from-primary/20 via-black to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
              ${city.name} Neighborhood Legal Services
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Vasquez Law Firm proudly serves every neighborhood in ${city.name}. 
              Find expert legal help in your area.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Select Your ${city.name} Neighborhood
            </h2>
            
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {neighborhoods.map((neighborhood) => (
                <Link
                  key={neighborhood.slug}
                  href={\`/locations/nc/${city.slug}/neighborhoods/\${neighborhood.slug}\`}
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-primary/50 transition-all group"
                >
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-primary transition-colors">
                        {neighborhood.name}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">
                        ZIP: {neighborhood.zipCodes.join(', ')}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-gray-300 mb-6">
                Can't find your neighborhood? We serve all of ${city.name} and surrounding areas.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-primary text-black font-bold rounded-lg hover:bg-primary-300 transition-all"
              >
                Contact Us for Help
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}`;
}

// Run the generator
generateNeighborhoodPages().catch(console.error);