const fs = require('fs').promises;
const path = require('path');

// Major cities in North Carolina and Florida for local SEO
const cities = {
  nc: [
    // Major Cities
    { name: 'Raleigh', slug: 'raleigh', county: 'Wake', population: 474069 },
    { name: 'Charlotte', slug: 'charlotte', county: 'Mecklenburg', population: 874579 },
    { name: 'Greensboro', slug: 'greensboro', county: 'Guilford', population: 299035 },
    { name: 'Durham', slug: 'durham', county: 'Durham', population: 283506 },
    { name: 'Winston-Salem', slug: 'winston-salem', county: 'Forsyth', population: 249545 },
    { name: 'Fayetteville', slug: 'fayetteville', county: 'Cumberland', population: 211657 },
    { name: 'Cary', slug: 'cary', county: 'Wake', population: 174721 },
    { name: 'Wilmington', slug: 'wilmington', county: 'New Hanover', population: 123744 },
    { name: 'High Point', slug: 'high-point', county: 'Guilford', population: 114059 },
    { name: 'Concord', slug: 'concord', county: 'Cabarrus', population: 96341 },
    { name: 'Gastonia', slug: 'gastonia', county: 'Gaston', population: 80411 },
    { name: 'Apex', slug: 'apex', county: 'Wake', population: 58780 },
    { name: 'Huntersville', slug: 'huntersville', county: 'Mecklenburg', population: 61376 },
    { name: 'Chapel Hill', slug: 'chapel-hill', county: 'Orange', population: 61960 },
    { name: 'Rocky Mount', slug: 'rocky-mount', county: 'Nash', population: 54341 },
    { name: 'Burlington', slug: 'burlington', county: 'Alamance', population: 57303 },
    { name: 'Kannapolis', slug: 'kannapolis', county: 'Cabarrus', population: 53114 },
    { name: 'Wilson', slug: 'wilson', county: 'Wilson', population: 49459 },
    { name: 'Hickory', slug: 'hickory', county: 'Catawba', population: 43490 },
    { name: 'Wake Forest', slug: 'wake-forest', county: 'Wake', population: 47601 },
    { name: 'Indian Trail', slug: 'indian-trail', county: 'Union', population: 40992 },
    { name: 'Mooresville', slug: 'mooresville', county: 'Iredell', population: 50193 },
    { name: 'Goldsboro', slug: 'goldsboro', county: 'Wayne', population: 33657 },
    { name: 'Monroe', slug: 'monroe', county: 'Union', population: 34562 },
    { name: 'Salisbury', slug: 'salisbury', county: 'Rowan', population: 35540 },
    { name: 'Holly Springs', slug: 'holly-springs', county: 'Wake', population: 41239 },
    { name: 'Matthews', slug: 'matthews', county: 'Mecklenburg', population: 32682 },
    { name: 'New Bern', slug: 'new-bern', county: 'Craven', population: 31291 },
    { name: 'Sanford', slug: 'sanford', county: 'Lee', population: 30261 },
    { name: 'Cornelius', slug: 'cornelius', county: 'Mecklenburg', population: 31412 },
    { name: 'Garner', slug: 'garner', county: 'Wake', population: 31159 },
    { name: 'Asheboro', slug: 'asheboro', county: 'Randolph', population: 27156 },
    { name: 'Smithfield', slug: 'smithfield', county: 'Johnston', population: 12697 },
    { name: 'Mint Hill', slug: 'mint-hill', county: 'Mecklenburg', population: 27258 },
    { name: 'Morrisville', slug: 'morrisville', county: 'Wake', population: 29630 },
    { name: 'Fuquay-Varina', slug: 'fuquay-varina', county: 'Wake', population: 34054 },
    { name: 'Clayton', slug: 'clayton', county: 'Johnston', population: 26307 },
    { name: 'Waxhaw', slug: 'waxhaw', county: 'Union', population: 20400 },
    { name: 'Asheville', slug: 'asheville', county: 'Buncombe', population: 94589 },
    { name: 'Pineville', slug: 'pineville', county: 'Mecklenburg', population: 10600 },
    { name: 'Knightdale', slug: 'knightdale', county: 'Wake', population: 19435 },
    { name: 'Mount Holly', slug: 'mount-holly', county: 'Gaston', population: 17703 },
    { name: 'Stallings', slug: 'stallings', county: 'Union', population: 16280 },
    { name: 'Belmont', slug: 'belmont', county: 'Gaston', population: 15310 },
    { name: 'Wendell', slug: 'wendell', county: 'Wake', population: 10070 },
    { name: 'Zebulon', slug: 'zebulon', county: 'Wake', population: 8500 },
    { name: 'Rolesville', slug: 'rolesville', county: 'Wake', population: 9475 },
    { name: 'Youngsville', slug: 'youngsville', county: 'Franklin', population: 2225 },
    { name: 'Spring Lake', slug: 'spring-lake', county: 'Cumberland', population: 11900 },
    { name: 'Hope Mills', slug: 'hope-mills', county: 'Cumberland', population: 17500 },
  ],
  fl: [
    // Florida Cities (Orlando area focus)
    { name: 'Orlando', slug: 'orlando', county: 'Orange', population: 307573 },
    { name: 'Kissimmee', slug: 'kissimmee', county: 'Osceola', population: 79226 },
    { name: 'Sanford', slug: 'sanford-fl', county: 'Seminole', population: 61051 },
    { name: 'Winter Park', slug: 'winter-park', county: 'Orange', population: 30764 },
    { name: 'Altamonte Springs', slug: 'altamonte-springs', county: 'Seminole', population: 46231 },
    { name: 'Oviedo', slug: 'oviedo', county: 'Seminole', population: 41062 },
    { name: 'Winter Garden', slug: 'winter-garden', county: 'Orange', population: 46964 },
    { name: 'Lake Mary', slug: 'lake-mary', county: 'Seminole', population: 17550 },
    { name: 'DeLand', slug: 'deland', county: 'Volusia', population: 37351 },
    { name: 'Apopka', slug: 'apopka', county: 'Orange', population: 54873 },
    { name: 'Casselberry', slug: 'casselberry', county: 'Seminole', population: 29534 },
    { name: 'Winter Springs', slug: 'winter-springs', county: 'Seminole', population: 38342 },
    { name: 'Longwood', slug: 'longwood', county: 'Seminole', population: 15087 },
    { name: 'Clermont', slug: 'clermont', county: 'Lake', population: 43021 },
    { name: 'St. Cloud', slug: 'st-cloud', county: 'Osceola', population: 58964 },
    { name: 'Ocoee', slug: 'ocoee', county: 'Orange', population: 47295 },
    { name: 'Maitland', slug: 'maitland', county: 'Orange', population: 19543 },
    { name: 'Mount Dora', slug: 'mount-dora', county: 'Lake', population: 16341 },
    { name: 'Deltona', slug: 'deltona', county: 'Volusia', population: 93692 },
    { name: 'Daytona Beach', slug: 'daytona-beach', county: 'Volusia', population: 72647 },
  ],
};

// Practice areas for city pages
const practiceAreas = [
  { name: 'Immigration Law', slug: 'immigration', icon: '🌎' },
  { name: 'Personal Injury', slug: 'personal-injury', icon: '🚗' },
  { name: 'Criminal Defense', slug: 'criminal-defense', icon: '⚖️' },
  { name: 'Workers Compensation', slug: 'workers-compensation', icon: '👷' },
  { name: 'Family Law', slug: 'family-law', icon: '👨‍👩‍👧‍👦' },
  { name: 'Traffic Violations', slug: 'traffic-violations', icon: '🚦' },
];

async function generateCityPage(city, state) {
  const stateUpper = state.toUpperCase();
  const stateFull = state === 'nc' ? 'North Carolina' : 'Florida';

  const pageContent = `import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { localBusinessSchema, breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: \`${city.name} ${stateUpper} Lawyers - Immigration, Personal Injury & Criminal Defense\`,
  description: \`Experienced ${city.name} attorneys serving ${city.county} County. Immigration, personal injury, criminal defense, family law. Free consultation. Se habla español.\`,
  keywords: \`${city.name} lawyer, ${city.name} attorney, ${city.name} immigration lawyer, ${city.name} personal injury attorney, ${city.name} criminal defense lawyer\`,
  openGraph: {
    title: \`${city.name} ${stateUpper} Lawyers - Vasquez Law Firm\`,
    description: \`Trusted legal representation in ${city.name}, ${stateFull}. Call 1-844-YO-PELEO for a free consultation.\`,
    images: ['/og-${city.slug}.jpg'],
  },
};

const localSchema = localBusinessSchema({
  name: '${city.name}',
  address: '${city.name}',
  city: '${city.name}',
  state: '${stateUpper}',
  phone: '1-844-967-3536'
});

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: 'https://www.vasquezlawnc.com' },
  { name: 'Locations', url: 'https://www.vasquezlawnc.com/locations' },
  { name: '${stateFull}', url: \`https://www.vasquezlawnc.com/locations/${state}\` },
  { name: '${city.name}', url: \`https://www.vasquezlawnc.com/locations/${state}/${city.slug}\` }
]);

export default function ${city.name.replace(/[\s-]/g, '')}Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#6B1F2E] to-[#8B2635] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                ${city.name}, ${stateUpper} Attorneys
              </h1>
              <p className="text-xl mb-8 max-w-3xl mx-auto">
                Trusted legal representation serving ${city.name} and ${city.county} County. 
                Immigration, personal injury, criminal defense, and more.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-[#C9974D] hover:bg-[#D4A574] text-white font-bold rounded-lg transition-all"
                >
                  Get Free Consultation
                </Link>
                <a
                  href="tel:1-844-967-3536"
                  className="px-8 py-4 bg-white text-[#6B1F2E] font-bold rounded-lg hover:bg-gray-100 transition-all"
                >
                  Call 1-844-YO-PELEO
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Local Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-[#6B1F2E] mb-6">
                  Legal Services in ${city.name}, ${stateUpper}
                </h2>
                <p className="text-gray-700 mb-6">
                  Vasquez Law Firm has been proudly serving the ${city.name} community and surrounding 
                  areas in ${city.county} County. Our experienced attorneys understand the unique legal 
                  needs of ${city.name} residents and provide personalized solutions in both English and Spanish.
                </p>
                <p className="text-gray-700 mb-6">
                  Whether you're dealing with immigration issues, recovering from an accident, facing 
                  criminal charges, or navigating family matters, our ${city.name} legal team is here to help. 
                  We offer free consultations and flexible payment plans to ensure everyone has access to 
                  quality legal representation.
                </p>
                
                {/* Local Stats */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="font-bold text-[#6B1F2E] mb-4">Serving ${city.name} Since 2015</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-3xl font-bold text-[#C9974D]">${Math.floor(city.population / 1000)}K+</p>
                      <p className="text-sm text-gray-600">Population Served</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-[#C9974D]">1,000+</p>
                      <p className="text-sm text-gray-600">Cases Handled</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-[#6B1F2E] mb-6">
                  Practice Areas in ${city.name}
                </h3>
                <div className="space-y-4">
                  ${practiceAreas
                    .map(
                      area => `
                  <Link
                    href="/practice-areas/${area.slug}"
                    className="block bg-white border-2 border-[#C9974D] rounded-lg p-4 hover:bg-[#C9974D] hover:text-white transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">${area.icon}</span>
                        <span className="font-semibold">${area.name}</span>
                      </div>
                      <svg className="w-5 h-5 text-[#C9974D] group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>`
                    )
                    .join('')}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us in City */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">
              Why ${city.name} Residents Choose Vasquez Law Firm
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-[#C9974D] text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🏛️</span>
                </div>
                <h3 className="font-bold text-xl mb-2">Local Experience</h3>
                <p className="text-gray-600">Deep understanding of ${city.county} County courts and local legal procedures</p>
              </div>
              <div className="text-center">
                <div className="bg-[#C9974D] text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🗣️</span>
                </div>
                <h3 className="font-bold text-xl mb-2">Bilingual Services</h3>
                <p className="text-gray-600">Full legal services in English and Spanish for ${city.name}'s diverse community</p>
              </div>
              <div className="text-center">
                <div className="bg-[#C9974D] text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📍</span>
                </div>
                <h3 className="font-bold text-xl mb-2">Convenient Access</h3>
                <p className="text-gray-600">Easy to reach from anywhere in ${city.name} and ${city.county} County</p>
              </div>
            </div>
          </div>
        </section>

        {/* Local FAQ */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">
              Common Legal Questions in ${city.name}
            </h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold text-[#6B1F2E] mb-2">
                  Do you have an office in ${city.name}?
                </h3>
                <p className="text-gray-700">
                  While our main offices are in Raleigh, Charlotte, Smithfield, and Orlando, we regularly 
                  serve clients throughout ${city.name} and ${city.county} County. We offer virtual consultations 
                  and can meet clients at convenient locations.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold text-[#6B1F2E] mb-2">
                  How much do attorneys in ${city.name} charge?
                </h3>
                <p className="text-gray-700">
                  We offer free consultations and work on contingency for personal injury cases (no fee unless we win). 
                  For other matters, we provide transparent flat fees and payment plans to make legal services 
                  affordable for ${city.name} residents.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold text-[#6B1F2E] mb-2">
                  What courts do you handle cases in?
                </h3>
                <p className="text-gray-700">
                  We represent clients in all ${city.county} County courts, including district and superior courts. 
                  We also handle federal cases in the ${state === 'nc' ? 'Eastern, Middle, and Western' : 'Middle'} 
                  District of ${stateFull}.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#6B1F2E] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Get Legal Help in ${city.name} Today
            </h2>
            <p className="text-xl mb-8">
              Don't wait to protect your rights. Contact Vasquez Law Firm for experienced 
              legal representation in ${city.name} and throughout ${city.county} County.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-[#C9974D] hover:bg-[#D4A574] text-white font-bold rounded-lg transition-all"
              >
                Schedule Free Consultation
              </Link>
              <a
                href="tel:1-844-967-3536"
                className="px-8 py-4 bg-white text-[#6B1F2E] font-bold rounded-lg hover:bg-gray-100 transition-all"
              >
                Call Now: 1-844-YO-PELEO
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}`;

  return pageContent;
}

async function generateAllCityPages() {
  console.log('🚀 Generating city-specific landing pages for SEO...\n');

  let totalGenerated = 0;

  // Generate NC cities
  console.log('📍 Generating North Carolina city pages...');
  for (const city of cities.nc) {
    const pageContent = await generateCityPage(city, 'nc');
    const dirPath = path.join(process.cwd(), 'src', 'app', 'locations', 'nc', city.slug);
    await fs.mkdir(dirPath, { recursive: true });
    await fs.writeFile(path.join(dirPath, 'page.tsx'), pageContent);
    totalGenerated++;

    if (totalGenerated % 10 === 0) {
      console.log(`  ✅ Generated ${totalGenerated} city pages...`);
    }
  }

  // Generate FL cities
  console.log('\n📍 Generating Florida city pages...');
  for (const city of cities.fl) {
    const pageContent = await generateCityPage(city, 'fl');
    const dirPath = path.join(process.cwd(), 'src', 'app', 'locations', 'fl', city.slug);
    await fs.mkdir(dirPath, { recursive: true });
    await fs.writeFile(path.join(dirPath, 'page.tsx'), pageContent);
    totalGenerated++;
  }

  // Create state index pages
  await createStateIndexPage('nc', 'North Carolina');
  await createStateIndexPage('fl', 'Florida');

  console.log(`\n✨ Successfully generated ${totalGenerated} city landing pages!`);
  console.log('📊 Summary:');
  console.log(`  - North Carolina: ${cities.nc.length} cities`);
  console.log(`  - Florida: ${cities.fl.length} cities`);
  console.log('\n🎯 These pages will help achieve DA 80 through:');
  console.log('  - Local SEO targeting');
  console.log('  - Location-specific keywords');
  console.log('  - Schema markup for each city');
  console.log('  - Internal linking structure');
}

async function createStateIndexPage(stateCode, stateName) {
  const stateCities = cities[stateCode];
  const pageContent = `import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '${stateName} Locations - Vasquez Law Firm',
  description: 'Vasquez Law Firm serves clients throughout ${stateName}. Find experienced attorneys near you.',
};

export default function ${stateName.replace(/\s/g, '')}LocationsPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-[#6B1F2E] mb-8 text-center">
          ${stateName} Office Locations
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          ${stateCities
            .map(
              city => `
          <Link
            href="/locations/${stateCode}/${city.slug}"
            className="bg-white border border-gray-200 rounded-lg p-4 hover:border-[#C9974D] hover:shadow-lg transition-all"
          >
            <h3 className="font-semibold text-[#6B1F2E]">${city.name}</h3>
            <p className="text-sm text-gray-600">${city.county} County</p>
          </Link>`
            )
            .join('')}
        </div>
      </div>
    </div>
  );
}`;

  const dirPath = path.join(process.cwd(), 'src', 'app', 'locations', stateCode);
  await fs.mkdir(dirPath, { recursive: true });
  await fs.writeFile(path.join(dirPath, 'page.tsx'), pageContent);
}

// Run the generator
generateAllCityPages().catch(console.error);
