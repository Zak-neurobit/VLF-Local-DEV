import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Top Criminal Defense Attorneys in NC | Former Prosecutors | Vasquez Law Firm',
  description: 'Aggressive criminal defense lawyers in North Carolina with 60+ years experience. Former prosecutors on your side. 24/7 availability. DWI, drugs, assault, federal crimes.',
  keywords: 'criminal defense lawyer NC, criminal attorney North Carolina, DWI lawyer NC, drug crime attorney, assault defense lawyer, Raleigh criminal lawyer, Charlotte DWI attorney, Durham criminal defense, Greensboro drug lawyer, Winston Salem assault attorney',
  openGraph: {
    title: 'Top Criminal Defense Attorneys in NC | Former Prosecutors | Vasquez Law Firm',
    description: 'Aggressive criminal defense lawyers in North Carolina with 60+ years experience. Former prosecutors on your side. 24/7 availability. DWI, drugs, assault, federal crimes.',
    url: `https://www.vasquezlawfirm.com/practice-areas/criminal-defense`,
    siteName: 'Vasquez Law Firm, PLLC',
    images: [
      {
        url: '/images/practice-areas/criminal-defense-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Criminal Defense Services in North Carolina'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top Criminal Defense Attorneys in NC | Former Prosecutors | Vasquez Law Firm',
    description: 'Aggressive criminal defense lawyers in North Carolina with 60+ years experience. Former prosecutors on your side. 24/7 availability. DWI, drugs, assault, federal crimes.',
    images: ['/images/practice-areas/criminal-defense-hero.jpg'],
  },
  alternates: {
    canonical: `https://www.vasquezlawfirm.com/practice-areas/criminal-defense`,
    languages: {
      'en-US': `https://www.vasquezlawfirm.com/practice-areas/criminal-defense`,
      'es-ES': `https://www.vasquezlawfirm.com/es/areas-de-practica/criminal-defense`
    }
  }
};

export default function CriminalDefensePage() {
  return (
    <>
      <ModernPracticeAreaTemplate
        title="NC\'s Most Aggressive Criminal Defense Team - Your Freedom Matters"
        subtitle="Criminal Defense Attorneys Serving All of North Carolina"
        description="Facing criminal charges in North Carolina? Your future is on the line. With 60+ years of combined experience and former prosecutors on our team, we know how to protect your freedom."
        content={
          <div className="space-y-12">
            {/* Why Choose Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Why Choose Vasquez Law Firm for Criminal Defense?</h2>
              <p className="text-lg mb-6">Our edge: ✓ Former prosecutors & judges ✓ 24/7 emergency response ✓ Thousands of cases dismissed ✓ Trial-ready defense ✓ Immigration-safe strategies</p>
              
              {/* Services Grid */}
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">DWI/DUI Defense</h3>
                  <p className="text-gray-300">Aggressive defense against drunk driving charges with proven strategies to protect your license and freedom.</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Drug Crime Defense</h3>
                  <p className="text-gray-300">Expert defense for all drug charges from possession to trafficking with focus on dismissals and alternatives.</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Assault & Violent Crimes</h3>
                  <p className="text-gray-300">Strategic defense for assault, battery, and violent crime charges with emphasis on self-defense and mitigation.</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Domestic Violence</h3>
                  <p className="text-gray-300">Sensitive handling of domestic violence cases with focus on protecting your rights and reputation.</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Federal Crimes</h3>
                  <p className="text-gray-300">Experienced federal criminal defense for complex cases in federal court with former federal prosecutors.</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">White Collar Crimes</h3>
                  <p className="text-gray-300">Sophisticated defense for fraud, embezzlement, and financial crimes with focus on negotiation and mitigation.</p>
                </div>
              </div>
            </section>

            {/* NC Coverage Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Serving All 100 North Carolina Counties</h2>
              <p className="text-lg mb-8">
                From the mountains to the coast, we provide expert criminal defense representation throughout North Carolina:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-primary mb-2">Triangle Area</h3>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• Raleigh</li>
                    <li>• Durham</li>
                    <li>• Chapel Hill</li>
                    <li>• Cary</li>
                  </ul>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-primary mb-2">Charlotte Metro</h3>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• Charlotte</li>
                    <li>• Concord</li>
                    <li>• Gastonia</li>
                    <li>• Rock Hill</li>
                  </ul>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-primary mb-2">Triad Area</h3>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• Greensboro</li>
                    <li>• Winston-Salem</li>
                    <li>• High Point</li>
                    <li>• Burlington</li>
                  </ul>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-primary mb-2">Eastern NC</h3>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• Wilmington</li>
                    <li>• Jacksonville</li>
                    <li>• Greenville</li>
                    <li>• New Bern</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-primary to-primary-300 rounded-lg p-8 text-center">
              <h2 className="text-3xl font-bold mb-4 text-black">Arrested? Time is critical. Call 1-844-YO-PELEO now for 24/7 emergency defense.</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <a href="tel:18449673536" className="bg-black text-primary px-8 py-3 rounded-md hover:bg-gray-900 transition-colors font-semibold text-lg">
                  Call Now: 1-844-YO-PELEO
                </a>
                <button className="bg-white text-black px-8 py-3 rounded-md hover:bg-gray-100 transition-colors font-semibold text-lg">
                  Start Live Chat
                </button>
              </div>
            </section>

            {/* FAQ Section for SEO */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="font-semibold text-xl mb-2 text-primary">How much does a criminal defense lawyer cost in North Carolina?</h3>
                  <p className="text-gray-300">At Vasquez Law Firm, we offer free consultations and flexible payment options. We provide transparent, competitive pricing with payment plans available.</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="font-semibold text-xl mb-2 text-primary">Do you handle criminal defense cases throughout NC?</h3>
                  <p className="text-gray-300">Yes! With offices in Raleigh, Charlotte, Durham, and Smithfield, plus virtual consultations, we serve all 100 North Carolina counties.</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="font-semibold text-xl mb-2 text-primary">How quickly can I speak with a criminal defense attorney?</h3>
                  <p className="text-gray-300">We offer same-day consultations and 24/7 emergency availability. Call 1-844-YO-PELEO or use our AI chat for immediate assistance.</p>
                </div>
              </div>
            </section>
          </div>
        }
      />
      
      {/* Structured Data */}
      <Script
        id="criminal-defense-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Criminal Defense Law Services - Vasquez Law Firm',
            description: 'Aggressive criminal defense legal services in North Carolina including DWI/DUI, drug crimes, assault, and federal crimes defense.',
            provider: {
              '@type': 'Attorney',
              name: 'Vasquez Law Firm, PLLC',
              url: 'https://www.vasquezlawfirm.com'
            },
            areaServed: {
              '@type': 'State',
              name: 'North Carolina'
            },
            serviceType: 'Criminal Defense Law',
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
        id="criminal-defense-local-business"
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
