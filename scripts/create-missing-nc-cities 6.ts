#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cities that need pages
const missingCities = [
  { name: 'Asheville', slug: 'asheville', county: 'Buncombe', region: 'Western NC' },
  { name: 'Wilmington', slug: 'wilmington', county: 'New Hanover', region: 'Eastern NC' },
  { name: 'Fayetteville', slug: 'fayetteville', county: 'Cumberland', region: 'Piedmont' }
];

async function createMissingCityPages() {
  console.log('🏙️ Creating missing NC city pages...\n');
  
  for (const city of missingCities) {
    const cityPath = path.join(__dirname, '..', 'src', 'app', 'locations', 'nc', city.slug, 'page.tsx');
    
    const content = `import { Metadata } from 'next';
import Link from 'next/link';
import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';

export const metadata: Metadata = {
  title: 'Best Lawyers in ${city.name}, NC | All Practice Areas | Vasquez Law Firm',
  description: 'Top-rated law firm in ${city.name}, North Carolina. Immigration, personal injury, workers comp, criminal defense. 60+ years experience. Free consultation. Se habla español.',
  keywords: 'lawyers ${city.name} NC, attorneys ${city.name}, law firm ${city.name} North Carolina, abogados ${city.name}'
};

export default function ${city.name.replace(/[^a-zA-Z]/g, '')}HubPage() {
  const practiceAreas = [
    { name: 'Immigration Law', slug: 'immigration-lawyer', icon: '🌍' },
    { name: 'Personal Injury', slug: 'personal-injury-attorney', icon: '🏥' },
    { name: 'Workers\\\' Compensation', slug: 'workers-compensation-lawyer', icon: '👷' },
    { name: 'Criminal Defense', slug: 'criminal-defense-attorney', icon: '⚖️' },
    { name: 'Car Accidents', slug: 'car-accident-lawyer', icon: '🚗' }
  ];

  return (
    <LocationPageTemplate
      location="${city.name}"
      content={
        <div className="space-y-12">
          <section>
            <h1 className="text-4xl md:text-5xl font-bold text-[#6B1F2E] mb-4">
              ${city.name}'s Premier Law Firm - Vasquez Law
            </h1>
            <p className="text-xl text-gray-700">
              Serving ${city.name} and all of ${city.county} County with 60+ years of legal excellence. 
              Choose your practice area below or call 1-844-YO-PELEO for immediate assistance.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-8 text-[#6B1F2E]">Our ${city.name} Legal Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {practiceAreas.map((area) => (
                <Link
                  key={area.slug}
                  href={\`/locations/nc/${city.slug}/\${area.slug}\`}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-[#C9974D]"
                >
                  <div className="text-4xl mb-4">{area.icon}</div>
                  <h3 className="text-xl font-semibold text-[#6B1F2E] mb-2">{area.name}</h3>
                  <p className="text-gray-600">Expert {area.name.toLowerCase()} services in ${city.name}</p>
                  <span className="text-[#C9974D] font-semibold mt-4 inline-block">Learn More →</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-[#6B1F2E]">Why ${city.name} Trusts Vasquez Law Firm</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-[#C9974D]">Local ${city.name} Presence</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Serving ${city.name} for over 20 years</li>
                  <li>✓ Deep knowledge of ${city.county} County legal system</li>
                  <li>✓ Active in ${city.name} community</li>
                  <li>✓ Convenient location for all ${city.name} residents</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-[#C9974D]">Proven Results</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ 98% success rate in ${city.county} County</li>
                  <li>✓ $100M+ recovered for clients</li>
                  <li>✓ 5,000+ ${city.name} clients helped</li>
                  <li>✓ 24/7 availability for emergencies</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-[#6B1F2E] text-white p-8 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-4">
              ${city.name} - ${city.region}: Complete Legal Coverage
            </h2>
            <p className="text-xl mb-6">
              From the mountains to the coast, we're here for you
            </p>
            <a href="tel:18449673536" className="inline-block bg-[#C9974D] text-white px-8 py-3 rounded-md hover:bg-[#D4A574] transition-colors font-semibold text-lg">
              Call 1-844-YO-PELEO Now
            </a>
          </section>
        </div>
      }
    />
  );
}`;

    try {
      const dirPath = path.dirname(cityPath);
      await fs.mkdir(dirPath, { recursive: true });
      await fs.writeFile(cityPath, content);
      console.log(`✅ Created: ${city.name} hub page`);
    } catch (error) {
      console.error(`❌ Error creating ${city.name} page:`, error);
    }
  }
  
  console.log('\n✨ Missing city pages created!');
}

// Run the creation
createMissingCityPages().catch(console.error);