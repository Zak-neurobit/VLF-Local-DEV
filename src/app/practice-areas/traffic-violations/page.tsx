import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Best Traffic Ticket Lawyers in NC | Save Your License | Vasquez Law Firm',
  description: 'Expert traffic violation attorneys in North Carolina. Keep your license, avoid points, lower insurance. Speeding, reckless driving, CDL violations. Fast & affordable.',
  keywords: 'traffic lawyer NC, speeding ticket attorney North Carolina, traffic violation lawyer, CDL ticket attorney, license restoration NC, Raleigh traffic lawyer, Charlotte speeding ticket attorney, Durham traffic court, Greensboro CDL lawyer, Winston Salem license attorney',
  openGraph: {
    title: 'Best Traffic Ticket Lawyers in NC | Save Your License | Vasquez Law Firm',
    description: 'Expert traffic violation attorneys in North Carolina. Keep your license, avoid points, lower insurance. Speeding, reckless driving, CDL violations. Fast & affordable.',
    url: `https://www.vasquezlawfirm.com/practice-areas/traffic-violations`,
    siteName: 'Vasquez Law Firm, PLLC',
    images: [
      {
        url: '/images/practice-areas/traffic-violations-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Traffic Violations Services in North Carolina'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Traffic Ticket Lawyers in NC | Save Your License | Vasquez Law Firm',
    description: 'Expert traffic violation attorneys in North Carolina. Keep your license, avoid points, lower insurance. Speeding, reckless driving, CDL violations. Fast & affordable.',
    images: ['/images/practice-areas/traffic-violations-hero.jpg'],
  },
  alternates: {
    canonical: `https://www.vasquezlawfirm.com/practice-areas/traffic-violations`,
    languages: {
      'en-US': `https://www.vasquezlawfirm.com/practice-areas/traffic-violations`,
      'es-ES': `https://www.vasquezlawfirm.com/es/areas-de-practica/traffic-violations`
    }
  }
};

export default function TrafficViolationsPage() {
  const services = [
    'Speeding Ticket Defense',
    'Reckless Driving',
    'License Suspension/Restoration',
    'CDL Violation Defense',
    'DWI/DUI Related Tickets',
    'Hit & Run Defense',
    'Failure to Appear',
    'Moving Violations',
    'Insurance Point Prevention',
  ];

  const faqs = [
    {
      question: 'How much does a traffic violations lawyer cost in North Carolina?',
      answer: 'At Vasquez Law Firm, we offer free consultations and flexible payment options. We provide transparent, competitive pricing with payment plans available.',
    },
    {
      question: 'Do you handle traffic violations cases throughout NC?',
      answer: 'Yes! With offices in Raleigh, Charlotte, Durham, and Smithfield, plus virtual consultations, we serve all 100 North Carolina counties.',
    },
    {
      question: 'How quickly can I speak with a traffic violations attorney?',
      answer: 'We offer same-day consultations and 24/7 emergency availability. Call 1-844-YO-PELEO or use our AI chat for immediate assistance.',
    },
    {
      question: 'Should I just pay the ticket?',
      answer: 'Don\'t just pay! Paying a ticket is admitting guilt and can add points to your license, increase insurance rates, and even suspend your license.',
    },
    {
      question: 'Can you help with CDL violations?',
      answer: 'Absolutely! We specialize in CDL defense and understand the serious consequences commercial drivers face. We fight to protect your livelihood.',
    },
  ];

  return (
    <>
      <ModernPracticeAreaTemplate
        title="North Carolina\'s Go-To Traffic Ticket Lawyers - Keep Your License"
        subtitle="Traffic Violations Attorneys Serving All of North Carolina"
        description="Got a traffic ticket in North Carolina? Don\'t just pay it - fight it! With 60+ years of experience, we\'ve helped thousands keep their licenses and avoid insurance hikes."
        services={services}
        faqs={faqs}
        content={
          <div className="space-y-12">
            {/* Why Choose Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Why Choose Vasquez Law Firm for Traffic Violations?</h2>
              <p className="text-lg mb-6">Your advantage: ✓ 90% ticket dismissal rate ✓ No court appearance needed ✓ CDL protection specialists ✓ Insurance point prevention ✓ Flat-fee pricing</p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">90% Dismissal Rate</h3>
                  <p className="text-gray-300">Our proven track record speaks for itself. We know how to challenge tickets and get charges dismissed.</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">No Court Required</h3>
                  <p className="text-gray-300">In most cases, you don\\'t need to appear in court. We handle everything so you can focus on your life.</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">CDL Protection</h3>
                  <p className="text-gray-300">Commercial drivers face serious consequences. We specialize in protecting CDL holders and their livelihoods.</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Insurance Savings</h3>
                  <p className="text-gray-300">Avoid insurance rate increases and points on your license. We fight to keep your record clean.</p>
                </div>
              </div>
            </section>

            {/* Process Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Our Traffic Defense Process</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">1.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Free Ticket Review</h3>
                    <p className="text-gray-300">We analyze your ticket and explain your options for fighting the charges.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">2.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Evidence Investigation</h3>
                    <p className="text-gray-300">We examine radar calibration, officer training, and procedural compliance to build your defense.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">3.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Court Representation</h3>
                    <p className="text-gray-300">We represent you in court, negotiate with prosecutors, and fight for dismissal or reduction.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">4.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">License Protection</h3>
                    <p className="text-gray-300">We ensure your driving record stays clean and your insurance rates remain low.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* NC Coverage Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Serving All 100 North Carolina Counties</h2>
              <p className="text-lg mb-8">
                From the mountains to the coast, we provide expert traffic violations representation throughout North Carolina:
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
          </div>
        }
      />
      
      {/* Structured Data */}
      <Script
        id="traffic-violations-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Traffic Violations Law Services - Vasquez Law Firm',
            description: 'Expert traffic ticket defense in North Carolina including speeding tickets, reckless driving, license restoration, and CDL violations.',
            provider: {
              '@type': 'Attorney',
              name: 'Vasquez Law Firm, PLLC',
              url: 'https://www.vasquezlawfirm.com'
            },
            areaServed: {
              '@type': 'State',
              name: 'North Carolina'
            },
            serviceType: 'Traffic Violations Defense',
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
        id="traffic-violations-local-business"
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
