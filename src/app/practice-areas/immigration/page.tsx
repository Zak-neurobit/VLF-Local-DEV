import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
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
  const services = [
    'Family-Based Immigration & Petitions',
    'Employment-Based Green Cards & Visas',
    'Deportation & Removal Defense',
    'Citizenship & Naturalization',
    'DACA, TPS & Humanitarian Relief',
    'Immigration Appeals & Waivers',
    'Adjustment of Status',
    'Asylum & Refugee Protection',
    'Investment Visas (EB-5)',
  ];

  const faqs = [
    {
      question: 'How much does an immigration lawyer cost in North Carolina?',
      answer: 'At Vasquez Law Firm, we offer free consultations and flexible payment options. We provide transparent, competitive pricing with payment plans available.',
    },
    {
      question: 'Do you handle immigration cases throughout NC?',
      answer: 'Yes! With offices in Raleigh, Charlotte, Durham, and Smithfield, plus virtual consultations, we serve all 100 North Carolina counties.',
    },
    {
      question: 'How quickly can I speak with an immigration attorney?',
      answer: 'We offer same-day consultations and 24/7 emergency availability. Call 1-844-YO-PELEO or use our AI chat for immediate assistance.',
    },
    {
      question: 'What types of immigration cases do you handle?',
      answer: 'We handle all immigration matters including green cards, visas, deportation defense, citizenship, asylum, DACA, and family petitions.',
    },
    {
      question: 'Do you speak Spanish?',
      answer: 'Yes! Our entire team is bilingual. We provide full legal services in both English and Spanish to better serve our community.',
    },
  ];

  return (
    <>
      <ModernPracticeAreaTemplate
        title="North Carolina's #1 Immigration Law Firm"
        subtitle="60+ Years of Excellence in Immigration Law"
        description="With 60+ years of combined experience, Vasquez Law Firm is North Carolina's most trusted immigration law firm. Our bilingual attorneys have successfully handled thousands of immigration cases across all 100 NC counties."
        services={services}
        faqs={faqs}
        content={
          <div className="space-y-12">
            {/* Why Choose Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Why Choose Vasquez Law Firm for Immigration Law?</h2>
              <p className="text-lg mb-6">
                We're NC's #1 choice for immigration law with a 98% success rate, 24/7 AI-powered case tracking, same-day consultations, fluent Spanish speakers, and former immigration officers on staff.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Comprehensive Services</h3>
                  <p className="text-gray-300">From family petitions to deportation defense, we handle every aspect of immigration law with expertise and compassion.</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Proven Track Record</h3>
                  <p className="text-gray-300">30,000+ successful cases and a 98% approval rate speak to our dedication and expertise in immigration law.</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">24/7 Support</h3>
                  <p className="text-gray-300">Our AI-powered case tracking and 24/7 availability ensure you're never alone in your immigration journey.</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Bilingual Excellence</h3>
                  <p className="text-gray-300">Full legal services in English and Spanish, ensuring clear communication throughout your case.</p>
                </div>
              </div>
            </section>

            {/* Process Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Our Immigration Process</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">1.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Free Consultation</h3>
                    <p className="text-gray-300">Meet with our attorneys to discuss your case and explore your immigration options.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">2.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Case Strategy</h3>
                    <p className="text-gray-300">We develop a personalized strategy tailored to your unique immigration needs.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">3.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Document Preparation</h3>
                    <p className="text-gray-300">Our team handles all paperwork and ensures accurate, complete submissions.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">4.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Case Management</h3>
                    <p className="text-gray-300">We guide you through every step, from filing to final approval.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* NC Coverage Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Serving All 100 North Carolina Counties</h2>
              <p className="text-lg mb-8">
                From the mountains to the coast, we provide expert immigration law representation throughout North Carolina:
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