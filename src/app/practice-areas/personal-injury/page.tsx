import { Metadata } from 'next';
import { PracticeAreaTemplate } from '@/components/templates/PracticeAreaTemplate';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Top Personal Injury Lawyers in NC | No Fee Unless We Win | Vasquez Law Firm',
  description: 'North Carolina\'s premier personal injury attorneys with 60+ years experience. Maximum compensation for accidents. Free consultation. No upfront fees. Available 24/7.',
  keywords: 'personal injury lawyer NC, accident attorney North Carolina, car accident lawyer, slip and fall attorney, wrongful death lawyer NC, Raleigh personal injury lawyer, Charlotte accident attorney, Durham injury law firm, Greensboro car accident lawyer, Winston Salem wrongful death attorney',
  openGraph: {
    title: 'Top Personal Injury Lawyers in NC | No Fee Unless We Win | Vasquez Law Firm',
    description: 'North Carolina\'s premier personal injury attorneys with 60+ years experience. Maximum compensation for accidents. Free consultation. No upfront fees. Available 24/7.',
    url: `https://www.vasquezlawfirm.com/practice-areas/personal-injury`,
    siteName: 'Vasquez Law Firm, PLLC',
    images: [
      {
        url: '/images/practice-areas/personal-injury-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Personal Injury Services in North Carolina'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top Personal Injury Lawyers in NC | No Fee Unless We Win | Vasquez Law Firm',
    description: 'North Carolina\'s premier personal injury attorneys with 60+ years experience. Maximum compensation for accidents. Free consultation. No upfront fees. Available 24/7.',
    images: ['/images/practice-areas/personal-injury-hero.jpg'],
  },
  alternates: {
    canonical: `https://www.vasquezlawfirm.com/practice-areas/personal-injury`,
    languages: {
      'en-US': `https://www.vasquezlawfirm.com/practice-areas/personal-injury`,
      'es-ES': `https://www.vasquezlawfirm.com/es/areas-de-practica/personal-injury`
    }
  }
};

export default function PersonalInjuryPage() {
  return (
    <>
      <PracticeAreaTemplate
        title="NC\'s Most Successful Personal Injury Law Firm - We Fight, You Win"
        subtitle="Personal Injury Attorneys Serving All of North Carolina"
        description="Injured in North Carolina? You deserve maximum compensation. With 60+ years fighting insurance companies and a track record of multi-million dollar settlements, we\'re NC\'s go-to personal injury firm."
        content={
          <div className="space-y-12">
            {/* Why Choose Section */}
            <section className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-6 text-[#6B1F2E]">Why Choose Vasquez Law Firm for Personal Injury?</h2>
              <p className="text-lg text-gray-700 mb-6">Our advantage: ✓ $100M+ recovered for clients ✓ No fees unless we win ✓ 24-hour response time ✓ In-house medical experts ✓ AI-powered case valuation for maximum compensation</p>
              
              {/* Services Grid */}
              <div className="grid md:grid-cols-2 gap-4 mt-8">
                
                <div className="flex items-start">
                  <span className="text-[#C9974D] mr-2">✓</span>
                  <span className="text-gray-700">Car, Truck & Motorcycle Accidents</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#C9974D] mr-2">✓</span>
                  <span className="text-gray-700">Slip, Trip & Fall Injuries</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#C9974D] mr-2">✓</span>
                  <span className="text-gray-700">Medical Malpractice</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#C9974D] mr-2">✓</span>
                  <span className="text-gray-700">Wrongful Death Claims</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#C9974D] mr-2">✓</span>
                  <span className="text-gray-700">Workplace Accidents</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#C9974D] mr-2">✓</span>
                  <span className="text-gray-700">Product Liability</span>
                </div>
              </div>
            </section>

            {/* NC Coverage Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-[#6B1F2E]">Serving All 100 North Carolina Counties</h2>
              <p className="text-lg text-gray-700 mb-4">
                From the mountains to the coast, we provide expert personal injury representation throughout North Carolina:
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
              <h2 className="text-3xl font-bold mb-4">Injured? Get your FREE case evaluation now. Call 1-844-YO-PELEO - We fight, you heal.</h2>
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
                  <h3 className="font-semibold text-lg mb-2">How much does a personal injury lawyer cost in North Carolina?</h3>
                  <p className="text-gray-700">At Vasquez Law Firm, we offer free consultations and flexible payment options. We work on contingency - no fee unless we win.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Do you handle personal injury cases throughout NC?</h3>
                  <p className="text-gray-700">Yes! With offices in Raleigh, Charlotte, Durham, and Smithfield, plus virtual consultations, we serve all 100 North Carolina counties.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">How quickly can I speak with a personal injury attorney?</h3>
                  <p className="text-gray-700">We offer same-day consultations and 24/7 emergency availability. Call 1-844-YO-PELEO or use our AI chat for immediate assistance.</p>
                </div>
              </div>
            </section>
          </div>
        }
      />
      
      {/* Structured Data */}
      <Script
        id="personal-injury-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Personal Injury Law Services - Vasquez Law Firm',
            description: 'Expert personal injury legal services in North Carolina including car accidents, slip and fall, medical malpractice, and wrongful death claims.',
            provider: {
              '@type': 'Attorney',
              name: 'Vasquez Law Firm, PLLC',
              url: 'https://www.vasquezlawfirm.com'
            },
            areaServed: {
              '@type': 'State',
              name: 'North Carolina'
            },
            serviceType: 'Personal Injury Law',
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
        id="personal-injury-local-business"
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
