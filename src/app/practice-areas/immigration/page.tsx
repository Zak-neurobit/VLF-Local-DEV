import { Metadata } from 'next';
import { PracticeAreaTemplate } from '@/components/templates/PracticeAreaTemplate';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Best Immigration Lawyer in North Carolina | 60+ Years Experience | Vasquez Law Firm',
  description: 'Top-rated immigration attorneys in NC with 60+ years combined experience. Free consultation. Green cards, visas, deportation defense, citizenship. Se habla español. Available 24/7.',
  keywords: 'immigration lawyer NC, immigration attorney North Carolina, green card lawyer, deportation defense attorney, citizenship lawyer NC, Raleigh immigration lawyer, Charlotte immigration attorney, Durham immigration law firm, Greensboro visa lawyer, Winston Salem deportation defense',
  openGraph: {
    title: 'Best Immigration Lawyer in North Carolina | 60+ Years Experience | Vasquez Law Firm',
    description: 'Top-rated immigration attorneys in NC with 60+ years combined experience. Free consultation. Green cards, visas, deportation defense, citizenship. Se habla español. Available 24/7.',
    url: `https://www.vasquezlawfirm.com/practice-areas/immigration`,
    siteName: 'Vasquez Law Firm, PLLC',
    images: [
      {
        url: '/images/practice-areas/immigration-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Immigration Law Services in North Carolina'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Immigration Lawyer in North Carolina | 60+ Years Experience | Vasquez Law Firm',
    description: 'Top-rated immigration attorneys in NC with 60+ years combined experience. Free consultation. Green cards, visas, deportation defense, citizenship. Se habla español. Available 24/7.',
    images: ['/images/practice-areas/immigration-hero.jpg'],
  },
  alternates: {
    canonical: `https://www.vasquezlawfirm.com/practice-areas/immigration`,
    languages: {
      'en-US': `https://www.vasquezlawfirm.com/practice-areas/immigration`,
      'es-ES': `https://www.vasquezlawfirm.com/es/areas-de-practica/immigration`
    }
  }
};

export default function ImmigrationLawPage() {
  return (
    <>
      <PracticeAreaTemplate
        title="North Carolina\'s #1 Immigration Law Firm - 60+ Years of Excellence"
        subtitle="Immigration Law Attorneys Serving All of North Carolina"
        description="With 60+ years of combined experience, Vasquez Law Firm is North Carolina\'s most trusted immigration law firm. Our bilingual attorneys have successfully handled thousands of immigration cases across all 100 NC counties."
        content={
          <div className="space-y-12">
            {/* Why Choose Section */}
            <section className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-6 text-[#6B1F2E]">Why Choose Vasquez Law Firm for Immigration Law?</h2>
              <p className="text-lg text-gray-700 mb-6">Why we\'re NC\'s #1 choice: ✓ 98% success rate ✓ 24/7 AI-powered case tracking ✓ Same-day consultations ✓ Fluent Spanish speakers ✓ Former immigration officers on staff</p>
              
              {/* Services Grid */}
              <div className="grid md:grid-cols-2 gap-4 mt-8">
                
                <div className="flex items-start">
                  <span className="text-[#C9974D] mr-2">✓</span>
                  <span className="text-gray-700">Family-Based Immigration & Petitions</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#C9974D] mr-2">✓</span>
                  <span className="text-gray-700">Employment-Based Green Cards & Visas</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#C9974D] mr-2">✓</span>
                  <span className="text-gray-700">Deportation & Removal Defense</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#C9974D] mr-2">✓</span>
                  <span className="text-gray-700">Citizenship & Naturalization</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#C9974D] mr-2">✓</span>
                  <span className="text-gray-700">DACA, TPS & Humanitarian Relief</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#C9974D] mr-2">✓</span>
                  <span className="text-gray-700">Immigration Appeals & Waivers</span>
                </div>
              </div>
            </section>

            {/* NC Coverage Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-[#6B1F2E]">Serving All 100 North Carolina Counties</h2>
              <p className="text-lg text-gray-700 mb-4">
                From the mountains to the coast, we provide expert immigration law representation throughout North Carolina:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-600">
                <div>
                  <h3 className="font-semibold text-[#C9974D]">Triangle Area</h3>
                  <ul className="text-sm">
                    <li>• Raleigh</li>
                    <li>• Durham</li>
                    <li>• Chapel Hill</li>
                    <li>• Cary</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-[#C9974D]">Charlotte Metro</h3>
                  <ul className="text-sm">
                    <li>• Charlotte</li>
                    <li>• Concord</li>
                    <li>• Gastonia</li>
                    <li>• Rock Hill</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-[#C9974D]">Triad Area</h3>
                  <ul className="text-sm">
                    <li>• Greensboro</li>
                    <li>• Winston-Salem</li>
                    <li>• High Point</li>
                    <li>• Burlington</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-[#C9974D]">Eastern NC</h3>
                  <ul className="text-sm">
                    <li>• Wilmington</li>
                    <li>• Jacksonville</li>
                    <li>• Greenville</li>
                    <li>• New Bern</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-[#6B1F2E] text-white rounded-lg p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Get your FREE immigration consultation today. Call 1-844-YO-PELEO or chat with our AI assistant 24/7.</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <a href="tel:18449673536" className="bg-[#C9974D] text-white px-8 py-3 rounded-md hover:bg-[#D4A574] transition-colors font-semibold text-lg">
                  Call Now: 1-844-YO-PELEO
                </a>
                <button className="bg-white text-[#6B1F2E] px-8 py-3 rounded-md hover:bg-gray-100 transition-colors font-semibold text-lg">
                  Start Live Chat
                </button>
              </div>
            </section>

            {/* FAQ Section for SEO */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-[#6B1F2E]">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">How much does a immigration law lawyer cost in North Carolina?</h3>
                  <p className="text-gray-700">At Vasquez Law Firm, we offer free consultations and flexible payment options. We provide transparent, competitive pricing with payment plans available.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Do you handle immigration law cases throughout NC?</h3>
                  <p className="text-gray-700">Yes! With offices in Raleigh, Charlotte, Durham, and Smithfield, plus virtual consultations, we serve all 100 North Carolina counties.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">How quickly can I speak with a immigration law attorney?</h3>
                  <p className="text-gray-700">We offer same-day consultations and 24/7 emergency availability. Call 1-844-YO-PELEO or use our AI chat for immediate assistance.</p>
                </div>
              </div>
            </section>
          </div>
        }
      />
      
      {/* Structured Data */}
      <Script
        id="immigration-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Immigration Law Services - Vasquez Law Firm',
            description: 'Comprehensive immigration legal services in North Carolina including green cards, visas, deportation defense, and citizenship applications.',
            provider: {
              '@type': 'Attorney',
              name: 'Vasquez Law Firm, PLLC',
              url: 'https://www.vasquezlawfirm.com'
            },
            areaServed: {
              '@type': 'State',
              name: 'North Carolina'
            },
            serviceType: 'Immigration Law',
            offers: {
              '@type': 'Offer',
              name: 'Free Consultation',
              price: '0',
              priceCurrency: 'USD'
            }
          })
        }}
      />
      
      {/* Local Business Structured Data */}
      <Script
        id="immigration-local-business"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Attorney',
            name: 'Vasquez Law Firm, PLLC',
            image: 'https://www.vasquezlawfirm.com/images/vasquez-law-firm-logo.png',
            url: 'https://www.vasquezlawfirm.com',
            telephone: '+1-844-967-3536',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '333 Fayetteville Street, Suite 810',
              addressLocality: 'Raleigh',
              addressRegion: 'NC',
              postalCode: '27601',
              addressCountry: 'US'
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 35.7796,
              longitude: -78.6382
            },
            openingHoursSpecification: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              opens: '08:00',
              closes: '18:00'
            },
            sameAs: [
              'https://www.facebook.com/vasquezlawfirm',
              'https://twitter.com/vasquezlawfirm',
              'https://www.linkedin.com/company/vasquez-law-firm',
              'https://www.youtube.com/vasquezlawfirm'
            ],
            priceRange: '$$'
          })
        }}
      />
    </>
  );
}
