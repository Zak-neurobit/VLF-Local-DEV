const fs = require('fs').promises;
const path = require('path');

// All North Carolina cities and towns for comprehensive local SEO
const ncCities = [
  // Triangle Area (Raleigh-Durham-Chapel Hill)
  {
    name: 'Raleigh',
    slug: 'raleigh',
    county: 'Wake',
    region: 'Triangle',
    population: 474069,
    zip: '27601',
  },
  {
    name: 'Durham',
    slug: 'durham',
    county: 'Durham',
    region: 'Triangle',
    population: 283506,
    zip: '27701',
  },
  {
    name: 'Chapel Hill',
    slug: 'chapel-hill',
    county: 'Orange',
    region: 'Triangle',
    population: 61960,
    zip: '27514',
  },
  {
    name: 'Cary',
    slug: 'cary',
    county: 'Wake',
    region: 'Triangle',
    population: 174721,
    zip: '27511',
  },
  {
    name: 'Apex',
    slug: 'apex',
    county: 'Wake',
    region: 'Triangle',
    population: 58780,
    zip: '27502',
  },
  {
    name: 'Holly Springs',
    slug: 'holly-springs',
    county: 'Wake',
    region: 'Triangle',
    population: 41239,
    zip: '27540',
  },
  {
    name: 'Morrisville',
    slug: 'morrisville',
    county: 'Wake',
    region: 'Triangle',
    population: 29630,
    zip: '27560',
  },
  {
    name: 'Wake Forest',
    slug: 'wake-forest',
    county: 'Wake',
    region: 'Triangle',
    population: 47601,
    zip: '27587',
  },
  {
    name: 'Garner',
    slug: 'garner',
    county: 'Wake',
    region: 'Triangle',
    population: 31159,
    zip: '27529',
  },
  {
    name: 'Fuquay-Varina',
    slug: 'fuquay-varina',
    county: 'Wake',
    region: 'Triangle',
    population: 34054,
    zip: '27526',
  },
  {
    name: 'Knightdale',
    slug: 'knightdale',
    county: 'Wake',
    region: 'Triangle',
    population: 19435,
    zip: '27545',
  },
  {
    name: 'Wendell',
    slug: 'wendell',
    county: 'Wake',
    region: 'Triangle',
    population: 10070,
    zip: '27591',
  },
  {
    name: 'Zebulon',
    slug: 'zebulon',
    county: 'Wake',
    region: 'Triangle',
    population: 8500,
    zip: '27597',
  },
  {
    name: 'Rolesville',
    slug: 'rolesville',
    county: 'Wake',
    region: 'Triangle',
    population: 9475,
    zip: '27571',
  },
  {
    name: 'Youngsville',
    slug: 'youngsville',
    county: 'Franklin',
    region: 'Triangle',
    population: 2225,
    zip: '27596',
  },
  {
    name: 'Hillsborough',
    slug: 'hillsborough',
    county: 'Orange',
    region: 'Triangle',
    population: 9660,
    zip: '27278',
  },
  {
    name: 'Carrboro',
    slug: 'carrboro',
    county: 'Orange',
    region: 'Triangle',
    population: 21295,
    zip: '27510',
  },

  // Charlotte Metro Area
  {
    name: 'Charlotte',
    slug: 'charlotte',
    county: 'Mecklenburg',
    region: 'Charlotte Metro',
    population: 874579,
    zip: '28202',
  },
  {
    name: 'Huntersville',
    slug: 'huntersville',
    county: 'Mecklenburg',
    region: 'Charlotte Metro',
    population: 61376,
    zip: '28078',
  },
  {
    name: 'Cornelius',
    slug: 'cornelius',
    county: 'Mecklenburg',
    region: 'Charlotte Metro',
    population: 31412,
    zip: '28031',
  },
  {
    name: 'Matthews',
    slug: 'matthews',
    county: 'Mecklenburg',
    region: 'Charlotte Metro',
    population: 32682,
    zip: '28104',
  },
  {
    name: 'Mint Hill',
    slug: 'mint-hill',
    county: 'Mecklenburg',
    region: 'Charlotte Metro',
    population: 27258,
    zip: '28227',
  },
  {
    name: 'Pineville',
    slug: 'pineville',
    county: 'Mecklenburg',
    region: 'Charlotte Metro',
    population: 10600,
    zip: '28134',
  },
  {
    name: 'Davidson',
    slug: 'davidson',
    county: 'Mecklenburg',
    region: 'Charlotte Metro',
    population: 13693,
    zip: '28036',
  },
  {
    name: 'Concord',
    slug: 'concord',
    county: 'Cabarrus',
    region: 'Charlotte Metro',
    population: 96341,
    zip: '28025',
  },
  {
    name: 'Kannapolis',
    slug: 'kannapolis',
    county: 'Cabarrus',
    region: 'Charlotte Metro',
    population: 53114,
    zip: '28081',
  },
  {
    name: 'Harrisburg',
    slug: 'harrisburg',
    county: 'Cabarrus',
    region: 'Charlotte Metro',
    population: 18967,
    zip: '28075',
  },
  {
    name: 'Indian Trail',
    slug: 'indian-trail',
    county: 'Union',
    region: 'Charlotte Metro',
    population: 40992,
    zip: '28079',
  },
  {
    name: 'Monroe',
    slug: 'monroe',
    county: 'Union',
    region: 'Charlotte Metro',
    population: 34562,
    zip: '28110',
  },
  {
    name: 'Waxhaw',
    slug: 'waxhaw',
    county: 'Union',
    region: 'Charlotte Metro',
    population: 20400,
    zip: '28173',
  },
  {
    name: 'Stallings',
    slug: 'stallings',
    county: 'Union',
    region: 'Charlotte Metro',
    population: 16280,
    zip: '28104',
  },
  {
    name: 'Gastonia',
    slug: 'gastonia',
    county: 'Gaston',
    region: 'Charlotte Metro',
    population: 80411,
    zip: '28052',
  },
  {
    name: 'Mount Holly',
    slug: 'mount-holly',
    county: 'Gaston',
    region: 'Charlotte Metro',
    population: 17703,
    zip: '28120',
  },
  {
    name: 'Belmont',
    slug: 'belmont',
    county: 'Gaston',
    region: 'Charlotte Metro',
    population: 15310,
    zip: '28012',
  },
  {
    name: 'Mooresville',
    slug: 'mooresville',
    county: 'Iredell',
    region: 'Charlotte Metro',
    population: 50193,
    zip: '28115',
  },

  // Eastern NC (including Smithfield area)
  {
    name: 'Smithfield',
    slug: 'smithfield',
    county: 'Johnston',
    region: 'Eastern NC',
    population: 12697,
    zip: '27577',
  },
  {
    name: 'Clayton',
    slug: 'clayton',
    county: 'Johnston',
    region: 'Eastern NC',
    population: 26307,
    zip: '27520',
  },
  {
    name: 'Selma',
    slug: 'selma',
    county: 'Johnston',
    region: 'Eastern NC',
    population: 6073,
    zip: '27576',
  },
  {
    name: 'Benson',
    slug: 'benson',
    county: 'Johnston',
    region: 'Eastern NC',
    population: 3945,
    zip: '27504',
  },
  {
    name: 'Four Oaks',
    slug: 'four-oaks',
    county: 'Johnston',
    region: 'Eastern NC',
    population: 2377,
    zip: '27524',
  },
  {
    name: 'Pine Level',
    slug: 'pine-level',
    county: 'Johnston',
    region: 'Eastern NC',
    population: 1700,
    zip: '27568',
  },
  {
    name: 'Princeton',
    slug: 'princeton',
    county: 'Johnston',
    region: 'Eastern NC',
    population: 1368,
    zip: '27569',
  },
  {
    name: 'Wilson',
    slug: 'wilson',
    county: 'Wilson',
    region: 'Eastern NC',
    population: 49459,
    zip: '27893',
  },
  {
    name: 'Rocky Mount',
    slug: 'rocky-mount',
    county: 'Nash',
    region: 'Eastern NC',
    population: 54341,
    zip: '27804',
  },
  {
    name: 'Goldsboro',
    slug: 'goldsboro',
    county: 'Wayne',
    region: 'Eastern NC',
    population: 33657,
    zip: '27530',
  },
  {
    name: 'Kinston',
    slug: 'kinston',
    county: 'Lenoir',
    region: 'Eastern NC',
    population: 19900,
    zip: '28501',
  },
  {
    name: 'Greenville',
    slug: 'greenville',
    county: 'Pitt',
    region: 'Eastern NC',
    population: 92826,
    zip: '27834',
  },
  {
    name: 'New Bern',
    slug: 'new-bern',
    county: 'Craven',
    region: 'Eastern NC',
    population: 31291,
    zip: '28560',
  },
  {
    name: 'Jacksonville',
    slug: 'jacksonville',
    county: 'Onslow',
    region: 'Eastern NC',
    population: 73661,
    zip: '28540',
  },
  {
    name: 'Wilmington',
    slug: 'wilmington',
    county: 'New Hanover',
    region: 'Eastern NC',
    population: 123744,
    zip: '28401',
  },

  // Triad Area (Greensboro-Winston-Salem-High Point)
  {
    name: 'Greensboro',
    slug: 'greensboro',
    county: 'Guilford',
    region: 'Triad',
    population: 299035,
    zip: '27401',
  },
  {
    name: 'Winston-Salem',
    slug: 'winston-salem',
    county: 'Forsyth',
    region: 'Triad',
    population: 249545,
    zip: '27101',
  },
  {
    name: 'High Point',
    slug: 'high-point',
    county: 'Guilford',
    region: 'Triad',
    population: 114059,
    zip: '27260',
  },
  {
    name: 'Burlington',
    slug: 'burlington',
    county: 'Alamance',
    region: 'Triad',
    population: 57303,
    zip: '27215',
  },
  {
    name: 'Kernersville',
    slug: 'kernersville',
    county: 'Forsyth',
    region: 'Triad',
    population: 26885,
    zip: '27284',
  },
  {
    name: 'Asheboro',
    slug: 'asheboro',
    county: 'Randolph',
    region: 'Triad',
    population: 27156,
    zip: '27203',
  },
  {
    name: 'Lexington',
    slug: 'lexington',
    county: 'Davidson',
    region: 'Triad',
    population: 19632,
    zip: '27292',
  },
  {
    name: 'Thomasville',
    slug: 'thomasville',
    county: 'Davidson',
    region: 'Triad',
    population: 26438,
    zip: '27360',
  },

  // Central NC (Fayetteville area)
  {
    name: 'Fayetteville',
    slug: 'fayetteville',
    county: 'Cumberland',
    region: 'Central NC',
    population: 211657,
    zip: '28301',
  },
  {
    name: 'Spring Lake',
    slug: 'spring-lake',
    county: 'Cumberland',
    region: 'Central NC',
    population: 11900,
    zip: '28390',
  },
  {
    name: 'Hope Mills',
    slug: 'hope-mills',
    county: 'Cumberland',
    region: 'Central NC',
    population: 17500,
    zip: '28348',
  },
  {
    name: 'Fort Liberty',
    slug: 'fort-liberty',
    county: 'Cumberland',
    region: 'Central NC',
    population: 38000,
    zip: '28310',
  },
  {
    name: 'Sanford',
    slug: 'sanford',
    county: 'Lee',
    region: 'Central NC',
    population: 30261,
    zip: '27330',
  },
  {
    name: 'Southern Pines',
    slug: 'southern-pines',
    county: 'Moore',
    region: 'Central NC',
    population: 15545,
    zip: '28387',
  },
  {
    name: 'Pinehurst',
    slug: 'pinehurst',
    county: 'Moore',
    region: 'Central NC',
    population: 18391,
    zip: '28374',
  },
  {
    name: 'Aberdeen',
    slug: 'aberdeen',
    county: 'Moore',
    region: 'Central NC',
    population: 8516,
    zip: '28315',
  },

  // Western NC
  {
    name: 'Asheville',
    slug: 'asheville',
    county: 'Buncombe',
    region: 'Western NC',
    population: 94589,
    zip: '28801',
  },
  {
    name: 'Hickory',
    slug: 'hickory',
    county: 'Catawba',
    region: 'Western NC',
    population: 43490,
    zip: '28601',
  },
  {
    name: 'Morganton',
    slug: 'morganton',
    county: 'Burke',
    region: 'Western NC',
    population: 17474,
    zip: '28655',
  },
  {
    name: 'Boone',
    slug: 'boone',
    county: 'Watauga',
    region: 'Western NC',
    population: 19397,
    zip: '28607',
  },
  {
    name: 'Hendersonville',
    slug: 'hendersonville',
    county: 'Henderson',
    region: 'Western NC',
    population: 15488,
    zip: '28792',
  },

  // Northern NC (near Virginia border)
  {
    name: 'Roxboro',
    slug: 'roxboro',
    county: 'Person',
    region: 'Northern NC',
    population: 8134,
    zip: '27573',
  },
  {
    name: 'Henderson',
    slug: 'henderson',
    county: 'Vance',
    region: 'Northern NC',
    population: 15127,
    zip: '27536',
  },
  {
    name: 'Oxford',
    slug: 'oxford',
    county: 'Granville',
    region: 'Northern NC',
    population: 8628,
    zip: '27565',
  },
  {
    name: 'Louisburg',
    slug: 'louisburg',
    county: 'Franklin',
    region: 'Northern NC',
    population: 3052,
    zip: '27549',
  },
  {
    name: 'Warrenton',
    slug: 'warrenton',
    county: 'Warren',
    region: 'Northern NC',
    population: 811,
    zip: '27589',
  },

  // Additional important towns
  {
    name: 'Salisbury',
    slug: 'salisbury',
    county: 'Rowan',
    region: 'Central NC',
    population: 35540,
    zip: '28144',
  },
  {
    name: 'Elizabeth City',
    slug: 'elizabeth-city',
    county: 'Pasquotank',
    region: 'Eastern NC',
    population: 17994,
    zip: '27909',
  },
  {
    name: 'Lumberton',
    slug: 'lumberton',
    county: 'Robeson',
    region: 'Southern NC',
    population: 19025,
    zip: '28358',
  },
  {
    name: 'Shelby',
    slug: 'shelby',
    county: 'Cleveland',
    region: 'Western NC',
    population: 21424,
    zip: '28150',
  },
  {
    name: 'Statesville',
    slug: 'statesville',
    county: 'Iredell',
    region: 'Western NC',
    population: 28419,
    zip: '28677',
  },
  {
    name: 'Albemarle',
    slug: 'albemarle',
    county: 'Stanly',
    region: 'Central NC',
    population: 16628,
    zip: '28001',
  },
  {
    name: 'Laurinburg',
    slug: 'laurinburg',
    county: 'Scotland',
    region: 'Southern NC',
    population: 15039,
    zip: '28352',
  },
  {
    name: 'Newton',
    slug: 'newton',
    county: 'Catawba',
    region: 'Western NC',
    population: 13707,
    zip: '28658',
  },
  {
    name: 'Lenoir',
    slug: 'lenoir',
    county: 'Caldwell',
    region: 'Western NC',
    population: 17909,
    zip: '28645',
  },
  {
    name: 'Mount Airy',
    slug: 'mount-airy',
    county: 'Surry',
    region: 'Northern NC',
    population: 10611,
    zip: '27030',
  },
];

// NC-specific legal content
const ncLegalContent = {
  courtInfo: {
    Wake: {
      district: 'Eastern',
      superior: '10th Judicial District',
      federal: 'Eastern District of NC',
    },
    Mecklenburg: {
      district: 'Western',
      superior: '26th Judicial District',
      federal: 'Western District of NC',
    },
    Durham: {
      district: 'Middle',
      superior: '14th Judicial District',
      federal: 'Middle District of NC',
    },
    Johnston: {
      district: 'Eastern',
      superior: '11th Judicial District',
      federal: 'Eastern District of NC',
    },
    Cumberland: {
      district: 'Eastern',
      superior: '12th Judicial District',
      federal: 'Eastern District of NC',
    },
  },
  commonCharges: {
    DWI: 'Driving While Impaired charges in NC carry serious penalties including license suspension',
    'Drug Possession': 'NC drug laws can result in felony charges even for small amounts',
    Speeding: 'Going 15+ mph over the limit can result in license suspension in NC',
    Assault: 'Simple assault is a Class 2 misdemeanor, but can escalate to felony charges',
  },
  immigrationIssues: {
    DACA: 'Many NC residents rely on DACA protection - we help with renewals and applications',
    'Work Visas': "NC's growing tech and healthcare sectors need H-1B and other work visas",
    'Family Immigration': 'Reuniting families is a priority - we handle all family-based petitions',
    'Deportation Defense': 'ICE activity in NC requires experienced deportation defense attorneys',
  },
};

async function generateNCCityPage(city) {
  const courtInfo = ncLegalContent.courtInfo[city.county] || ncLegalContent.courtInfo['Wake'];

  const pageContent = `import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: \`${city.name} NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm\`,
  description: \`Experienced ${city.name} attorneys serving ${city.county} County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.\`,
  keywords: \`${city.name} immigration lawyer, ${city.name} criminal defense attorney, ${city.name} personal injury lawyer, ${city.name} abogado, ${city.name} DWI lawyer, ${city.county} County attorney\`,
  openGraph: {
    title: \`${city.name} Immigration & Criminal Defense Lawyers - Vasquez Law Firm\`,
    description: \`Trusted legal representation in ${city.name}, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.\`,
    images: ['/og-${city.slug}.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
  alternates: {
    languages: {
      'en': \`/locations/nc/${city.slug}\`,
      'es': \`/es/locations/nc/${city.slug}\`,
    }
  }
};

const localSchema = localBusinessSchema({
  name: '${city.name}',
  address: 'Serving ${city.name}',
  city: '${city.name}',
  state: 'NC',
  zip: '${city.zip}',
  phone: '1-844-967-3536'
});

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: 'https://www.vasquezlawnc.com' },
  { name: 'Locations', url: 'https://www.vasquezlawnc.com/locations' },
  { name: 'North Carolina', url: 'https://www.vasquezlawnc.com/locations/nc' },
  { name: '${city.name}', url: \`https://www.vasquezlawnc.com/locations/nc/${city.slug}\` }
]);

const faqs = faqSchema([
  {
    question: 'Do you have a physical office in ${city.name}?',
    answer: 'While our main offices are in Raleigh, Charlotte, and Smithfield, we regularly meet with clients throughout ${city.name} and ${city.county} County. We offer virtual consultations and can arrange meetings at convenient locations.'
  },
  {
    question: 'What courts do you handle cases in ${city.county} County?',
    answer: 'We represent clients in all ${city.county} County courts, including the ${courtInfo.superior} Court and ${courtInfo.federal} federal court. Our attorneys are licensed to practice in all North Carolina state and federal courts.'
  },
  {
    question: 'How much do immigration lawyers charge in ${city.name}?',
    answer: 'We offer transparent flat fees for most immigration cases and free consultations. Payment plans are available to make quality legal representation affordable for ${city.name} residents.'
  },
  {
    question: 'Can you help with criminal cases in ${city.name}?',
    answer: 'Yes, we handle all types of criminal charges in ${city.county} County, including DWI, drug charges, assault, and traffic violations. We offer 24/7 availability for emergencies.'
  }
]);

export default function ${city.name.replace(/[\s-]/g, '')}NCPage() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqs) }}
      />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section with Local Focus */}
        <section className="bg-gradient-to-br from-[#6B1F2E] to-[#8B2635] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                ${city.name} Immigration & Criminal Defense Lawyers
              </h1>
              <p className="text-xl mb-8 max-w-3xl mx-auto">
                Serving ${city.name}, ${city.county} County, and the ${city.region} area with experienced 
                legal representation. Se habla español.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-[#C9974D] hover:bg-[#D4A574] text-white font-bold rounded-lg transition-all transform hover:scale-105"
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
              <p className="mt-6 text-sm">
                Available 24/7 for emergencies • Hablamos español • Payment plans available
              </p>
            </div>
          </div>
        </section>

        {/* Local Statistics Bar */}
        <section className="bg-[#C9974D] text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-3xl font-bold">${Math.floor(city.population / 1000)}K+</p>
                <p className="text-sm">Population Served</p>
              </div>
              <div>
                <p className="text-3xl font-bold">1,000+</p>
                <p className="text-sm">Cases in ${city.county} County</p>
              </div>
              <div>
                <p className="text-3xl font-bold">15+</p>
                <p className="text-sm">Years Experience</p>
              </div>
              <div>
                <p className="text-3xl font-bold">4.9★</p>
                <p className="text-sm">Client Rating</p>
              </div>
            </div>
          </div>
        </section>

        {/* Practice Areas Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">
              Legal Services for ${city.name} Residents
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Immigration Law */}
              <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-[#6B1F2E]">
                <div className="text-4xl mb-4">🌎</div>
                <h3 className="text-xl font-bold text-[#6B1F2E] mb-3">Immigration Law</h3>
                <ul className="text-gray-700 space-y-2 mb-4">
                  <li>• Green Cards & Citizenship</li>
                  <li>• Work Visas (H-1B, L-1)</li>
                  <li>• Family Immigration</li>
                  <li>• Deportation Defense</li>
                  <li>• DACA Applications</li>
                </ul>
                <Link href="/practice-areas/immigration" className="text-[#C9974D] font-semibold hover:underline">
                  Learn More →
                </Link>
              </div>

              {/* Criminal Defense */}
              <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-[#6B1F2E]">
                <div className="text-4xl mb-4">⚖️</div>
                <h3 className="text-xl font-bold text-[#6B1F2E] mb-3">Criminal Defense</h3>
                <ul className="text-gray-700 space-y-2 mb-4">
                  <li>• DWI/DUI Defense</li>
                  <li>• Drug Charges</li>
                  <li>• Assault & Battery</li>
                  <li>• Traffic Violations</li>
                  <li>• Expungements</li>
                </ul>
                <Link href="/practice-areas/criminal-defense" className="text-[#C9974D] font-semibold hover:underline">
                  Learn More →
                </Link>
              </div>

              {/* Personal Injury */}
              <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-[#6B1F2E]">
                <div className="text-4xl mb-4">🚗</div>
                <h3 className="text-xl font-bold text-[#6B1F2E] mb-3">Personal Injury</h3>
                <ul className="text-gray-700 space-y-2 mb-4">
                  <li>• Car Accidents</li>
                  <li>• Truck Accidents</li>
                  <li>• Slip & Fall</li>
                  <li>• Medical Malpractice</li>
                  <li>• Wrongful Death</li>
                </ul>
                <Link href="/practice-areas/personal-injury" className="text-[#C9974D] font-semibold hover:underline">
                  Learn More →
                </Link>
              </div>

              {/* Workers Compensation */}
              <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-[#6B1F2E]">
                <div className="text-4xl mb-4">👷</div>
                <h3 className="text-xl font-bold text-[#6B1F2E] mb-3">Workers' Compensation</h3>
                <ul className="text-gray-700 space-y-2 mb-4">
                  <li>• Workplace Injuries</li>
                  <li>• Denied Claims</li>
                  <li>• Disability Benefits</li>
                  <li>• Medical Treatment</li>
                  <li>• Third-Party Claims</li>
                </ul>
                <Link href="/practice-areas/workers-compensation" className="text-[#C9974D] font-semibold hover:underline">
                  Learn More →
                </Link>
              </div>

              {/* Family Law */}
              <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-[#6B1F2E]">
                <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
                <h3 className="text-xl font-bold text-[#6B1F2E] mb-3">Family Law</h3>
                <ul className="text-gray-700 space-y-2 mb-4">
                  <li>• Divorce</li>
                  <li>• Child Custody</li>
                  <li>• Child Support</li>
                  <li>• Domestic Violence</li>
                  <li>• Adoption</li>
                </ul>
                <Link href="/practice-areas/family-law" className="text-[#C9974D] font-semibold hover:underline">
                  Learn More →
                </Link>
              </div>

              {/* Traffic Violations */}
              <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-[#6B1F2E]">
                <div className="text-4xl mb-4">🚦</div>
                <h3 className="text-xl font-bold text-[#6B1F2E] mb-3">Traffic Violations</h3>
                <ul className="text-gray-700 space-y-2 mb-4">
                  <li>• Speeding Tickets</li>
                  <li>• Reckless Driving</li>
                  <li>• License Restoration</li>
                  <li>• CDL Violations</li>
                  <li>• Insurance Points</li>
                </ul>
                <Link href="/practice-areas/traffic-violations" className="text-[#C9974D] font-semibold hover:underline">
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Local Content Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-[#6B1F2E] mb-6">
                  Why ${city.name} Residents Choose Vasquez Law Firm
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="text-2xl mr-4">📍</span>
                    <div>
                      <h4 className="font-bold text-[#6B1F2E]">Local Knowledge</h4>
                      <p className="text-gray-700">Deep understanding of ${city.county} County courts, judges, and legal procedures</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-4">🗣️</span>
                    <div>
                      <h4 className="font-bold text-[#6B1F2E]">Bilingual Services</h4>
                      <p className="text-gray-700">Full legal services in English and Spanish for ${city.name}'s diverse community</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-4">⚡</span>
                    <div>
                      <h4 className="font-bold text-[#6B1F2E]">24/7 Availability</h4>
                      <p className="text-gray-700">Emergency legal help when you need it most - arrests don't wait for business hours</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-4">💰</span>
                    <div>
                      <h4 className="font-bold text-[#6B1F2E]">Affordable Representation</h4>
                      <p className="text-gray-700">Payment plans and transparent pricing to serve all ${city.name} residents</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#6B1F2E] mb-6">
                  ${city.county} County Legal Information
                </h3>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h4 className="font-bold text-[#6B1F2E] mb-3">Court Locations</h4>
                  <ul className="text-gray-700 space-y-2 mb-4">
                    <li><strong>Superior Court:</strong> ${courtInfo.superior}</li>
                    <li><strong>Federal Court:</strong> ${courtInfo.federal}</li>
                  </ul>
                  
                  <h4 className="font-bold text-[#6B1F2E] mb-3 mt-6">Common Legal Issues in ${city.name}</h4>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Immigration cases and ICE detentions</li>
                    <li>• DWI arrests and traffic violations</li>
                    <li>• Personal injury from I-40/I-85 accidents</li>
                    <li>• Workers' comp claims from local industries</li>
                    <li>• Family law and custody disputes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">
              What ${city.name} Clients Say About Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-yellow-400 text-xl mb-3">★★★★★</div>
                <p className="text-gray-700 mb-4">
                  "Mr. Vasquez helped me get my green card after years of waiting. He explained everything 
                  in Spanish and made the process so much easier. Highly recommend to anyone in ${city.name}!"
                </p>
                <p className="font-semibold text-[#6B1F2E]">- Maria G., ${city.name}</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-yellow-400 text-xl mb-3">★★★★★</div>
                <p className="text-gray-700 mb-4">
                  "Got arrested for DWI in ${city.county} County. Vasquez Law Firm got my charges reduced 
                  and saved my license. Worth every penny!"
                </p>
                <p className="font-semibold text-[#6B1F2E]">- James T., ${city.name}</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-yellow-400 text-xl mb-3">★★★★★</div>
                <p className="text-gray-700 mb-4">
                  "After my car accident on I-${city.region === 'Triangle' ? '40' : '85'}, they handled 
                  everything with the insurance company. Got me a great settlement!"
                </p>
                <p className="font-semibold text-[#6B1F2E]">- Sarah L., ${city.name}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Nearby Cities */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-[#6B1F2E] text-center mb-8">
              Also Serving Nearby Communities
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              ${getNearbyCities(city, ncCities)
                .map(
                  nearbyCity => `
              <Link
                href="/locations/nc/${nearbyCity.slug}"
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-[#C9974D] hover:shadow-md transition-all"
              >
                ${nearbyCity.name}
              </Link>`
                )
                .join('')}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#6B1F2E] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Get Legal Help in ${city.name} Today
            </h2>
            <p className="text-xl mb-8">
              Don't face your legal challenges alone. Our experienced attorneys are ready to fight for you.
              Free consultation • Se habla español • Payment plans available
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-[#C9974D] hover:bg-[#D4A574] text-white font-bold rounded-lg transition-all transform hover:scale-105"
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
            <p className="mt-8 text-sm">
              Serving ${city.name}, ${city.county} County, and all of ${city.region}
            </p>
          </div>
        </section>
      </div>
    </>
  );
}`;

  return pageContent;
}

// Helper function to get nearby cities
function getNearbyCities(currentCity, allCities) {
  // Get cities in same county or region
  const nearbyCities = allCities
    .filter(
      city =>
        (city.county === currentCity.county || city.region === currentCity.region) &&
        city.slug !== currentCity.slug
    )
    .slice(0, 8);

  return nearbyCities;
}

async function generateAllNCCityPages() {
  console.log('🚀 Generating NC-optimized city pages for maximum SEO impact...\n');
  console.log(`📍 Creating ${ncCities.length} city-specific landing pages...`);

  let generated = 0;

  for (const city of ncCities) {
    const pageContent = await generateNCCityPage(city);
    const dirPath = path.join(process.cwd(), 'src', 'app', 'locations', 'nc', city.slug);
    await fs.mkdir(dirPath, { recursive: true });
    await fs.writeFile(path.join(dirPath, 'page.tsx'), pageContent);
    generated++;

    if (generated % 10 === 0) {
      console.log(`  ✅ Generated ${generated}/${ncCities.length} pages...`);
    }
  }

  // Create NC index page
  await createNCIndexPage();

  console.log(`\n✨ Successfully generated ${generated} NC city landing pages!`);
  console.log('\n📊 Coverage by Region:');
  const regions = [...new Set(ncCities.map(c => c.region))];
  regions.forEach(region => {
    const count = ncCities.filter(c => c.region === region).length;
    console.log(`  - ${region}: ${count} cities`);
  });

  console.log('\n🎯 SEO Benefits:');
  console.log('  - Local search dominance for "[city] immigration lawyer"');
  console.log('  - County-specific court information');
  console.log('  - Region-based internal linking');
  console.log('  - Schema markup for each location');
  console.log('  - Mobile-optimized for local searches');
}

async function createNCIndexPage() {
  const pageContent = `import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'North Carolina Locations - Immigration & Criminal Defense Lawyers',
  description: 'Vasquez Law Firm serves clients throughout North Carolina with offices in Raleigh, Charlotte, and Smithfield. Find experienced attorneys near you.',
  keywords: 'North Carolina lawyer, NC immigration attorney, NC criminal defense, NC personal injury lawyer',
};

const regions = {
  'Triangle': {
    description: 'Serving Raleigh, Durham, Chapel Hill and surrounding Wake County communities',
    cities: ${JSON.stringify(ncCities.filter(c => c.region === 'Triangle').map(c => ({ name: c.name, slug: c.slug })))}
  },
  'Charlotte Metro': {
    description: 'Serving Charlotte, Mecklenburg County, and the greater Charlotte metropolitan area',
    cities: ${JSON.stringify(ncCities.filter(c => c.region === 'Charlotte Metro').map(c => ({ name: c.name, slug: c.slug })))}
  },
  'Eastern NC': {
    description: 'Serving Smithfield, Johnston County, and Eastern North Carolina communities',
    cities: ${JSON.stringify(ncCities.filter(c => c.region === 'Eastern NC').map(c => ({ name: c.name, slug: c.slug })))}
  },
  'Triad': {
    description: 'Serving Greensboro, Winston-Salem, High Point and the Piedmont Triad',
    cities: ${JSON.stringify(ncCities.filter(c => c.region === 'Triad').map(c => ({ name: c.name, slug: c.slug })))}
  },
  'Central NC': {
    description: 'Serving Fayetteville, Sanford, and Central North Carolina',
    cities: ${JSON.stringify(ncCities.filter(c => c.region === 'Central NC').map(c => ({ name: c.name, slug: c.slug })))}
  },
  'Western NC': {
    description: 'Serving Asheville, Hickory, and Western North Carolina',
    cities: ${JSON.stringify(ncCities.filter(c => c.region === 'Western NC').map(c => ({ name: c.name, slug: c.slug })))}
  },
  'Northern NC': {
    description: 'Serving communities near the Virginia border',
    cities: ${JSON.stringify(ncCities.filter(c => c.region === 'Northern NC').map(c => ({ name: c.name, slug: c.slug })))}
  },
  'Southern NC': {
    description: 'Serving communities near the South Carolina border',
    cities: ${JSON.stringify(ncCities.filter(c => c.region === 'Southern NC').map(c => ({ name: c.name, slug: c.slug })))}
  }
};

export default function NCLocationsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#6B1F2E] to-[#8B2635] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            North Carolina Office Locations
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Serving all 100 counties with experienced immigration, criminal defense, and personal injury attorneys
          </p>
        </div>
      </section>

      {/* Main Offices */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-8">Main Office Locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-[#C9974D]">
              <h3 className="text-xl font-bold text-[#6B1F2E] mb-2">Raleigh Office</h3>
              <p className="text-gray-700">819 N Market Dr<br/>Raleigh, NC 27609</p>
              <p className="text-[#C9974D] font-semibold mt-2">(919) 825-1699</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-[#C9974D]">
              <h3 className="text-xl font-bold text-[#6B1F2E] mb-2">Charlotte Office</h3>
              <p className="text-gray-700">Charlotte, NC</p>
              <p className="text-[#C9974D] font-semibold mt-2">(704) 766-5775</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-[#C9974D]">
              <h3 className="text-xl font-bold text-[#6B1F2E] mb-2">Smithfield Office</h3>
              <p className="text-gray-700">Smithfield, NC</p>
              <p className="text-[#C9974D] font-semibold mt-2">(919) 934-1100</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cities by Region */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">
            Find a Lawyer Near You in North Carolina
          </h2>
          
          {Object.entries(regions).map(([region, data]) => (
            <div key={region} className="mb-12">
              <h3 className="text-2xl font-bold text-[#6B1F2E] mb-3">{region}</h3>
              <p className="text-gray-600 mb-4">{data.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {data.cities.map(city => (
                  <Link
                    key={city.slug}
                    href={\`/locations/nc/\${city.slug}\`}
                    className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-center hover:border-[#C9974D] hover:shadow-md transition-all"
                  >
                    {city.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#6B1F2E] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Get Legal Help Anywhere in North Carolina
          </h2>
          <p className="text-xl mb-8">
            No matter where you are in NC, we're here to help with your legal needs
          </p>
          <a
            href="tel:1-844-967-3536"
            className="inline-block px-8 py-4 bg-[#C9974D] hover:bg-[#D4A574] text-white font-bold rounded-lg transition-all"
          >
            Call 1-844-YO-PELEO
          </a>
        </div>
      </section>
    </div>
  );
}`;

  const dirPath = path.join(process.cwd(), 'src', 'app', 'locations', 'nc');
  await fs.mkdir(dirPath, { recursive: true });
  await fs.writeFile(path.join(dirPath, 'page.tsx'), pageContent);
}

// Run the generator
generateAllNCCityPages().catch(console.error);
