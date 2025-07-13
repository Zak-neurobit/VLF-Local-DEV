import Link from 'next/link';
import { Metadata } from 'next';
import { ncCities } from '@/lib/seo/local-seo-generator';
export const metadata: Metadata = {
  title: 'North Carolina Locations | Vasquez Law Firm - Immigration & Personal Injury Attorneys',
  description:
    'Vasquez Law Firm serves all major cities in North Carolina. Find experienced immigration lawyers and personal injury attorneys near you. Free consultation. Se habla español.',
  keywords:
    'North Carolina lawyer, NC attorney, immigration lawyer North Carolina, personal injury attorney NC, abogado Carolina del Norte',
};
const regions = {
  Triangle: {
    description: 'Serving Raleigh, Durham, Chapel Hill and surrounding Wake County communities',
    cities: [
      { name: 'Raleigh', slug: 'raleigh' },
      { name: 'Durham', slug: 'durham' },
      { name: 'Chapel Hill', slug: 'chapel-hill' },
      { name: 'Cary', slug: 'cary' },
      { name: 'Apex', slug: 'apex' },
      { name: 'Holly Springs', slug: 'holly-springs' },
      { name: 'Morrisville', slug: 'morrisville' },
      { name: 'Wake Forest', slug: 'wake-forest' },
      { name: 'Garner', slug: 'garner' },
      { name: 'Fuquay-Varina', slug: 'fuquay-varina' },
      { name: 'Knightdale', slug: 'knightdale' },
      { name: 'Wendell', slug: 'wendell' },
      { name: 'Zebulon', slug: 'zebulon' },
      { name: 'Rolesville', slug: 'rolesville' },
      { name: 'Youngsville', slug: 'youngsville' },
      { name: 'Hillsborough', slug: 'hillsborough' },
      { name: 'Carrboro', slug: 'carrboro' },
    ],
  },
  'Charlotte Metro': {
    description:
      'Serving Charlotte, Mecklenburg County, and the greater Charlotte metropolitan area',
    cities: [
      { name: 'Charlotte', slug: 'charlotte' },
      { name: 'Huntersville', slug: 'huntersville' },
      { name: 'Cornelius', slug: 'cornelius' },
      { name: 'Matthews', slug: 'matthews' },
      { name: 'Mint Hill', slug: 'mint-hill' },
      { name: 'Pineville', slug: 'pineville' },
      { name: 'Davidson', slug: 'davidson' },
      { name: 'Concord', slug: 'concord' },
      { name: 'Kannapolis', slug: 'kannapolis' },
      { name: 'Harrisburg', slug: 'harrisburg' },
      { name: 'Indian Trail', slug: 'indian-trail' },
      { name: 'Monroe', slug: 'monroe' },
      { name: 'Waxhaw', slug: 'waxhaw' },
      { name: 'Stallings', slug: 'stallings' },
      { name: 'Gastonia', slug: 'gastonia' },
      { name: 'Mount Holly', slug: 'mount-holly' },
      { name: 'Belmont', slug: 'belmont' },
      { name: 'Mooresville', slug: 'mooresville' },
    ],
  },
  'Eastern NC': {
    description: 'Serving Smithfield, Johnston County, and Eastern North Carolina communities',
    cities: [
      { name: 'Smithfield', slug: 'smithfield' },
      { name: 'Clayton', slug: 'clayton' },
      { name: 'Selma', slug: 'selma' },
      { name: 'Benson', slug: 'benson' },
      { name: 'Four Oaks', slug: 'four-oaks' },
      { name: 'Pine Level', slug: 'pine-level' },
      { name: 'Princeton', slug: 'princeton' },
      { name: 'Wilson', slug: 'wilson' },
      { name: 'Rocky Mount', slug: 'rocky-mount' },
      { name: 'Goldsboro', slug: 'goldsboro' },
      { name: 'Kinston', slug: 'kinston' },
      { name: 'Greenville', slug: 'greenville' },
      { name: 'New Bern', slug: 'new-bern' },
      { name: 'Jacksonville', slug: 'jacksonville' },
      { name: 'Wilmington', slug: 'wilmington' },
      { name: 'Elizabeth City', slug: 'elizabeth-city' },
    ],
  },
  Triad: {
    description: 'Serving Greensboro, Winston-Salem, High Point and the Piedmont Triad',
    cities: [
      { name: 'Greensboro', slug: 'greensboro' },
      { name: 'Winston-Salem', slug: 'winston-salem' },
      { name: 'High Point', slug: 'high-point' },
      { name: 'Burlington', slug: 'burlington' },
      { name: 'Kernersville', slug: 'kernersville' },
      { name: 'Asheboro', slug: 'asheboro' },
      { name: 'Lexington', slug: 'lexington' },
      { name: 'Thomasville', slug: 'thomasville' },
    ],
  },
  'Central NC': {
    description: 'Serving Fayetteville, Sanford, and Central North Carolina',
    cities: [
      { name: 'Fayetteville', slug: 'fayetteville' },
      { name: 'Spring Lake', slug: 'spring-lake' },
      { name: 'Hope Mills', slug: 'hope-mills' },
      { name: 'Fort Liberty', slug: 'fort-liberty' },
      { name: 'Sanford', slug: 'sanford' },
      { name: 'Southern Pines', slug: 'southern-pines' },
      { name: 'Pinehurst', slug: 'pinehurst' },
      { name: 'Aberdeen', slug: 'aberdeen' },
      { name: 'Salisbury', slug: 'salisbury' },
      { name: 'Albemarle', slug: 'albemarle' },
    ],
  },
  'Western NC': {
    description: 'Serving Asheville, Hickory, and Western North Carolina',
    cities: [
      { name: 'Asheville', slug: 'asheville' },
      { name: 'Hickory', slug: 'hickory' },
      { name: 'Morganton', slug: 'morganton' },
      { name: 'Boone', slug: 'boone' },
      { name: 'Hendersonville', slug: 'hendersonville' },
      { name: 'Shelby', slug: 'shelby' },
      { name: 'Statesville', slug: 'statesville' },
      { name: 'Newton', slug: 'newton' },
      { name: 'Lenoir', slug: 'lenoir' },
    ],
  },
  'Northern NC': {
    description: 'Serving communities near the Virginia border',
    cities: [
      { name: 'Roxboro', slug: 'roxboro' },
      { name: 'Henderson', slug: 'henderson' },
      { name: 'Oxford', slug: 'oxford' },
      { name: 'Louisburg', slug: 'louisburg' },
      { name: 'Warrenton', slug: 'warrenton' },
      { name: 'Mount Airy', slug: 'mount-airy' },
    ],
  },
  'Southern NC': {
    description: 'Serving communities near the South Carolina border',
    cities: [
      { name: 'Lumberton', slug: 'lumberton' },
      { name: 'Laurinburg', slug: 'laurinburg' },
    ],
  },
};
export default function NCLocationsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#6B1F2E] to-[#8B2635] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">North Carolina Office Locations</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Serving all 100 counties with experienced immigration, criminal defense, and personal
            injury attorneys
          </p>
        </div>
      </section>
      {/* Featured Cities with Practice Areas */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-8">
            Primary Service Areas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(ncCities)
              .slice(0, 10)
              .map(([slug, city]) => (
                <div
                  key={slug}
                  className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-[#C9974D]"
                >
                  <h3 className="text-xl font-bold text-[#6B1F2E] mb-2">{city.city}</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {city.county} County • Pop. {city.population}
                  </p>
                  <div className="text-sm text-gray-700 mb-4">
                    <p className="font-semibold">Courts Served:</p>
                    <p className="text-xs">{city.courtInfo.superior}</p>
                  </div>
                  <Link
                    href={`/locations/nc/${slug}`}
                    className="inline-block w-full text-center px-4 py-2 bg-[#6B1F2E] text-white font-semibold rounded hover:bg-[#8B2635] transition-colors mb-3"
                  >
                    View {city.city} Office
                  </Link>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-gray-700">Practice Areas:</p>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      <Link
                        href={`/locations/nc/${slug}/immigration-lawyer`}
                        className="text-[#C9974D] hover:underline"
                      >
                        • Immigration Law
                      </Link>
                      <Link
                        href={`/locations/nc/${slug}/personal-injury-attorney`}
                        className="text-[#C9974D] hover:underline"
                      >
                        • Personal Injury
                      </Link>
                      <Link
                        href={`/locations/nc/${slug}/criminal-defense-attorney`}
                        className="text-[#C9974D] hover:underline"
                      >
                        • Criminal Defense
                      </Link>
                      <Link
                        href={`/locations/nc/${slug}/workers-compensation-lawyer`}
                        className="text-[#C9974D] hover:underline"
                      >
                        • Workers Comp
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
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
                    href={`/locations/nc/${city.slug}`}
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
          <h2 className="text-3xl font-bold mb-6">Get Legal Help Anywhere in North Carolina</h2>
          <p className="text-xl mb-8">
            No matter where you are in NC, we&apos;re here to help with your legal needs
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
}
