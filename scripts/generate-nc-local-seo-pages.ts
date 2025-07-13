#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface NCLocation {
  city: string;
  slug: string;
  county: string;
  population: string;
  zipCodes: string[];
  nearbyAreas: string[];
  courtAddress?: string;
}

const ncLocations: NCLocation[] = [
  {
    city: 'Raleigh',
    slug: 'raleigh',
    county: 'Wake County',
    population: '500,000+',
    zipCodes: ['27601', '27603', '27605', '27607', '27609', '27612', '27615', '27616'],
    nearbyAreas: ['Cary', 'Apex', 'Garner', 'Knightdale', 'Wake Forest'],
    courtAddress: '316 Fayetteville St, Raleigh, NC 27601',
  },
  {
    city: 'Charlotte',
    slug: 'charlotte',
    county: 'Mecklenburg County',
    population: '900,000+',
    zipCodes: ['28202', '28203', '28204', '28205', '28207', '28208', '28209', '28210'],
    nearbyAreas: ['Concord', 'Gastonia', 'Rock Hill', 'Matthews', 'Huntersville'],
    courtAddress: '832 E 4th St, Charlotte, NC 28202',
  },
  {
    city: 'Durham',
    slug: 'durham',
    county: 'Durham County',
    population: '300,000+',
    zipCodes: ['27701', '27703', '27704', '27705', '27707', '27709', '27712', '27713'],
    nearbyAreas: ['Chapel Hill', 'Morrisville', 'Research Triangle Park', 'Hillsborough'],
    courtAddress: '510 S Dillard St, Durham, NC 27701',
  },
  {
    city: 'Greensboro',
    slug: 'greensboro',
    county: 'Guilford County',
    population: '300,000+',
    zipCodes: ['27401', '27403', '27405', '27406', '27407', '27408', '27409', '27410'],
    nearbyAreas: ['High Point', 'Burlington', 'Jamestown', 'Summerfield'],
    courtAddress: '201 S Eugene St, Greensboro, NC 27401',
  },
  {
    city: 'Winston-Salem',
    slug: 'winston-salem',
    county: 'Forsyth County',
    population: '250,000+',
    zipCodes: ['27101', '27103', '27104', '27105', '27106', '27107', '27109', '27110'],
    nearbyAreas: ['Kernersville', 'Clemmons', 'Lewisville', 'Walkertown'],
    courtAddress: '200 N Main St, Winston-Salem, NC 27101',
  },
];

const practiceAreas = [
  {
    slug: 'immigration-lawyer',
    title: 'Immigration Lawyer',
    spanish: 'Abogado de Inmigración',
    keywords: ['immigration attorney', 'visa lawyer', 'deportation defense', 'green card lawyer'],
  },
  {
    slug: 'personal-injury-attorney',
    title: 'Personal Injury Attorney',
    spanish: 'Abogado de Lesiones Personales',
    keywords: [
      'accident lawyer',
      'injury attorney',
      'car accident lawyer',
      'slip and fall attorney',
    ],
  },
  {
    slug: 'workers-compensation-lawyer',
    title: "Workers' Compensation Lawyer",
    spanish: 'Abogado de Compensación Laboral',
    keywords: ['work injury lawyer', 'workers comp attorney', 'workplace accident lawyer'],
  },
  {
    slug: 'criminal-defense-attorney',
    title: 'Criminal Defense Attorney',
    spanish: 'Abogado de Defensa Criminal',
    keywords: ['criminal lawyer', 'DWI attorney', 'drug crime lawyer', 'assault defense attorney'],
  },
  {
    slug: 'car-accident-lawyer',
    title: 'Car Accident Lawyer',
    spanish: 'Abogado de Accidentes de Auto',
    keywords: ['auto accident attorney', 'vehicle accident lawyer', 'crash attorney'],
  },
];

async function generateLocalSEOPages() {
  console.log('🌟 Generating NC Local SEO Pages for Search Dominance...\n');

  for (const location of ncLocations) {
    for (const area of practiceAreas) {
      const pagePath = path.join(
        __dirname,
        '..',
        'src',
        'app',
        'locations',
        'nc',
        location.slug,
        area.slug,
        'page.tsx'
      );

      const content = `import { Metadata } from 'next';
import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Best ${area.title} in ${location.city}, NC | 60+ Years Experience | Free Consultation',
  description: 'Top-rated ${area.title.toLowerCase()} serving ${location.city} and ${location.county}. 60+ years combined experience. Available 24/7. Free consultation. Se habla español. Call 1-844-YO-PELEO.',
  keywords: '${area.title} ${location.city} NC, ${area.keywords.map(k => `${k} ${location.city}`).join(', ')}, ${location.nearbyAreas.map(a => `${area.title} near ${a}`).join(', ')}',
  openGraph: {
    title: '#1 ${area.title} in ${location.city}, North Carolina | Vasquez Law Firm',
    description: 'Leading ${area.title.toLowerCase()} in ${location.city}. Serving all of ${location.county} with 60+ years experience. Free consultation. No fees unless we win (PI/WC cases).',
    url: \`https://www.vasquezlawfirm.com/locations/nc/${location.slug}/${area.slug}\`,
    images: [{
      url: '/images/locations/${location.slug}-office.jpg',
      width: 1200,
      height: 630,
      alt: 'Vasquez Law Firm ${location.city} Office'
    }]
  },
  alternates: {
    canonical: \`https://www.vasquezlawfirm.com/locations/nc/${location.slug}/${area.slug}\`,
    languages: {
      'en-US': \`https://www.vasquezlawfirm.com/locations/nc/${location.slug}/${area.slug}\`,
      'es-ES': \`https://www.vasquezlawfirm.com/es/ubicaciones/nc/${location.slug}/${area.slug}\`
    }
  }
};

export default function ${location.city.replace(/[^a-zA-Z]/g, '')}${area.title.replace(/[^a-zA-Z]/g, '')}Page() {
  return (
    <>
      <LocationPageTemplate
        location="${location.city}"
        practiceArea="${area.title}"
        content={
          <div className="space-y-12">
            {/* Hero Section */}
            <section>
              <h1 className="text-4xl md:text-5xl font-bold text-[#6B1F2E] mb-4">
                ${location.city}'s Top ${area.title} - 60+ Years Winning Cases
              </h1>
              <p className="text-xl text-gray-700">
                When you need the best ${area.title.toLowerCase()} in ${location.city}, ${location.county}, North Carolina, 
                Vasquez Law Firm delivers results. With over 60 years of combined experience and thousands of successful cases, 
                we're the law firm ${location.city} residents trust most.
              </p>
            </section>

            {/* Local Expertise */}
            <section className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-6 text-[#6B1F2E]">
                Why ${location.city} Chooses Vasquez Law Firm
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-xl mb-3 text-[#C9974D]">Local ${location.city} Expertise</h3>
                  <ul className="space-y-2">
                    <li>✓ Deep knowledge of ${location.county} courts and judges</li>
                    <li>✓ Relationships with local law enforcement and prosecutors</li>
                    <li>✓ Understanding of ${location.city} community values</li>
                    <li>✓ Convenient location serving all ${location.zipCodes.length} ${location.city} zip codes</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-3 text-[#C9974D]">Serving All Nearby Areas</h3>
                  <ul className="space-y-2">
                    ${location.nearbyAreas.map(area => `<li>✓ ${area}</li>`).join('\n                    ')}
                  </ul>
                </div>
              </div>
            </section>

            {/* Service Areas */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-[#6B1F2E]">
                ${area.title} Services in ${location.city}
              </h2>
              <p className="text-lg mb-4">
                Our ${location.city} ${area.title.toLowerCase()}s handle all types of cases throughout ${location.county}:
              </p>
              <div className="bg-[#6B1F2E] text-white p-8 rounded-lg">
                <p className="text-lg mb-4">Serving all ${location.city} zip codes:</p>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  ${location.zipCodes.map(zip => `<span className="text-[#C9974D]">${zip}</span>`).join('\n                  ')}
                </div>
              </div>
            </section>

            {/* Local Stats */}
            <section className="bg-[#C9974D]/10 p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-6 text-[#6B1F2E]">
                ${location.city} Success Stories
              </h2>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold text-[#C9974D]">98%</div>
                  <div className="text-gray-700">Success Rate in ${location.county}</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[#C9974D]">5,000+</div>
                  <div className="text-gray-700">${location.city} Clients Helped</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[#C9974D]">24/7</div>
                  <div className="text-gray-700">Available for ${location.city} Emergencies</div>
                </div>
              </div>
            </section>

            {/* Court Information */}
            ${
              location.courtAddress
                ? `
            <section>
              <h2 className="text-3xl font-bold mb-6 text-[#6B1F2E]">
                ${location.county} Court Information
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="font-semibold mb-2">Main Courthouse:</p>
                <p className="text-gray-700">${location.courtAddress}</p>
                <p className="mt-4 text-gray-600">
                  Our ${area.title.toLowerCase()}s regularly appear in ${location.county} courts and know the local procedures inside and out.
                </p>
              </div>
            </section>
            `
                : ''
            }

            {/* CTA Section */}
            <section className="bg-[#6B1F2E] text-white p-8 rounded-lg text-center">
              <h2 className="text-3xl font-bold mb-4">
                Need a ${area.title} in ${location.city}? Get Help Now!
              </h2>
              <p className="text-xl mb-6">
                Free consultation • Se habla español • No fees unless we win (PI/WC)
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:18449673536" className="bg-[#C9974D] text-white px-8 py-3 rounded-md hover:bg-[#D4A574] transition-colors font-semibold text-lg">
                  Call 1-844-YO-PELEO
                </a>
                <button className="bg-white text-[#6B1F2E] px-8 py-3 rounded-md hover:bg-gray-100 transition-colors font-semibold text-lg">
                  Start Live Chat
                </button>
              </div>
            </section>
          </div>
        }
      />

      {/* Local Business Schema */}
      <Script
        id="${location.slug}-${area.slug}-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Attorney',
            name: \`Vasquez Law Firm - ${location.city} ${area.title}\`,
            description: \`Leading ${area.title.toLowerCase()} serving ${location.city} and ${location.county}, North Carolina\`,
            url: \`https://www.vasquezlawfirm.com/locations/nc/${location.slug}/${area.slug}\`,
            telephone: '+1-844-967-3536',
            address: {
              '@type': 'PostalAddress',
              addressLocality: '${location.city}',
              addressRegion: 'NC',
              addressCountry: 'US'
            },
            areaServed: [
              {
                '@type': 'City',
                name: '${location.city}'
              },
              ${location.nearbyAreas
                .map(
                  area => `{
                '@type': 'City',
                name: '${area}'
              }`
                )
                .join(',\n              ')}
            ],
            priceRange: '$$'
          })
        }}
      />

      {/* FAQ Schema for Local SEO */}
      <Script
        id="${location.slug}-${area.slug}-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: \`How much does a ${area.title.toLowerCase()} cost in ${location.city}, NC?\`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: \`At Vasquez Law Firm, we offer free consultations for all ${location.city} residents. ${area.slug.includes('injury') || area.slug.includes('compensation') ? 'We work on contingency - no fees unless we win your case.' : 'We provide transparent pricing and flexible payment plans.'}\`
                }
              },
              {
                '@type': 'Question',
                name: \`What areas near ${location.city} do you serve?\`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: \`We serve all of ${location.county} including ${location.city}, ${location.nearbyAreas.join(', ')}, and surrounding areas. With 60+ years of experience, we're the trusted choice throughout the region.\`
                }
              },
              {
                '@type': 'Question',
                name: \`Do you speak Spanish in your ${location.city} office?\`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! Vasquez Law Firm offers fully bilingual services. Hablamos español y estamos aquí para ayudar a la comunidad hispana de ${location.city}.'
                }
              }
            ]
          })
        }}
      />
    </>
  );
}
`;

      try {
        const dirPath = path.dirname(pagePath);
        await fs.mkdir(dirPath, { recursive: true });
        await fs.writeFile(pagePath, content);
        console.log(`✅ Generated: ${location.city} ${area.title} page`);
      } catch (error) {
        console.error(`❌ Error generating ${location.city} ${area.title} page:`, error);
      }
    }
  }

  // Generate location hub pages
  for (const location of ncLocations) {
    const hubPath = path.join(
      __dirname,
      '..',
      'src',
      'app',
      'locations',
      'nc',
      location.slug,
      'page.tsx'
    );
    const hubContent = `import { Metadata } from 'next';
import Link from 'next/link';
import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';

export const metadata: Metadata = {
  title: 'Best Lawyers in ${location.city}, NC | All Practice Areas | Vasquez Law Firm',
  description: 'Top-rated law firm in ${location.city}, North Carolina. Immigration, personal injury, workers comp, criminal defense. 60+ years experience. Free consultation. Se habla español.',
  keywords: 'lawyers ${location.city} NC, attorneys ${location.city}, law firm ${location.city} North Carolina, abogados ${location.city}'
};

export default function ${location.city.replace(/[^a-zA-Z]/g, '')}HubPage() {
  const practiceAreas = [
    { name: 'Immigration Law', slug: 'immigration-lawyer', icon: '🌍' },
    { name: 'Personal Injury', slug: 'personal-injury-attorney', icon: '🏥' },
    { name: 'Workers\\' Compensation', slug: 'workers-compensation-lawyer', icon: '👷' },
    { name: 'Criminal Defense', slug: 'criminal-defense-attorney', icon: '⚖️' },
    { name: 'Car Accidents', slug: 'car-accident-lawyer', icon: '🚗' }
  ];

  return (
    <LocationPageTemplate
      location="${location.city}"
      content={
        <div className="space-y-12">
          <section>
            <h1 className="text-4xl md:text-5xl font-bold text-[#6B1F2E] mb-4">
              ${location.city}'s Premier Law Firm - Vasquez Law
            </h1>
            <p className="text-xl text-gray-700">
              Serving ${location.city} and all of ${location.county} with 60+ years of legal excellence. 
              Choose your practice area below or call 1-844-YO-PELEO for immediate assistance.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-8 text-[#6B1F2E]">Our ${location.city} Legal Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {practiceAreas.map((area) => (
                <Link
                  key={area.slug}
                  href={\`/locations/nc/${location.slug}/\${area.slug}\`}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-[#C9974D]"
                >
                  <div className="text-4xl mb-4">{area.icon}</div>
                  <h3 className="text-xl font-semibold text-[#6B1F2E] mb-2">{area.name}</h3>
                  <p className="text-gray-600">Expert {area.name.toLowerCase()} services in ${location.city}</p>
                  <span className="text-[#C9974D] font-semibold mt-4 inline-block">Learn More →</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-[#6B1F2E]">Why ${location.city} Trusts Vasquez Law Firm</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-[#C9974D]">Local ${location.city} Presence</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Serving ${location.city} for over 20 years</li>
                  <li>✓ Deep knowledge of ${location.county} legal system</li>
                  <li>✓ Active in ${location.city} community</li>
                  <li>✓ Convenient location for all ${location.city} residents</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-[#C9974D]">Proven Results</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ 98% success rate in ${location.county}</li>
                  <li>✓ $100M+ recovered for clients</li>
                  <li>✓ 5,000+ ${location.city} clients helped</li>
                  <li>✓ 24/7 availability for emergencies</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      }
    />
  );
}`;

    try {
      await fs.writeFile(hubPath, hubContent);
      console.log(`✅ Generated: ${location.city} hub page`);
    } catch (error) {
      console.error(`❌ Error generating ${location.city} hub page:`, error);
    }
  }

  console.log('\n🎯 Local SEO dominance pages generated for all major NC cities!');
}

// Run the generator
generateLocalSEOPages().catch(console.error);
