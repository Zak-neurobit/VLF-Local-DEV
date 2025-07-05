import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
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
  const services = [
    'Car, Truck & Motorcycle Accidents',
    'Slip, Trip & Fall Injuries',
    'Medical Malpractice',
    'Wrongful Death Claims',
    'Workplace Accidents',
    'Product Liability',
    'Pedestrian Accidents',
    'Bicycle Accidents',
    'Nursing Home Abuse',
  ];

  const faqs = [
    {
      question: 'How much does a personal injury lawyer cost in North Carolina?',
      answer: 'At Vasquez Law Firm, we work on a contingency fee basis - you pay nothing unless we win your case. No upfront costs, no hidden fees.',
    },
    {
      question: 'What is my personal injury case worth?',
      answer: 'Every case is unique. We use AI-powered case valuation combined with 60+ years of experience to maximize your compensation for medical bills, lost wages, pain and suffering.',
    },
    {
      question: 'How long do I have to file a personal injury claim in NC?',
      answer: 'North Carolina has a 3-year statute of limitations for most personal injury cases. However, it\'s crucial to contact us immediately to preserve evidence and protect your rights.',
    },
    {
      question: 'Do you handle personal injury cases throughout NC?',
      answer: 'Yes! With offices in Raleigh, Charlotte, Durham, and Smithfield, plus virtual consultations, we serve all 100 North Carolina counties.',
    },
    {
      question: 'What if the insurance company already made me an offer?',
      answer: 'Don\'t accept any offer before speaking with us. Insurance companies often offer far less than your case is worth. We fight for maximum compensation.',
    },
  ];

  return (
    <>
      <ModernPracticeAreaTemplate
        title="NC's Most Successful Personal Injury Law Firm"
        subtitle="We Fight, You Win - No Fee Unless We Recover"
        description="Injured in North Carolina? You deserve maximum compensation. With 60+ years fighting insurance companies and a track record of multi-million dollar settlements, we're NC's go-to personal injury firm."
        services={services}
        faqs={faqs}
        content={
          <div className="space-y-12">
            {/* Why Choose Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Why Choose Vasquez Law Firm for Personal Injury?</h2>
              <p className="text-lg mb-6">
                Our advantage: $100M+ recovered for clients, no fees unless we win, 24-hour response time, in-house medical experts, and AI-powered case valuation for maximum compensation.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Maximum Compensation</h3>
                  <p className="text-gray-300">We use cutting-edge AI technology combined with decades of experience to ensure you receive every dollar you deserve.</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">No Win, No Fee</h3>
                  <p className="text-gray-300">You pay absolutely nothing unless we win your case. No upfront costs, no hidden fees, no financial risk to you.</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">24/7 Availability</h3>
                  <p className="text-gray-300">Accidents don't wait for business hours. Neither do we. Call anytime for immediate assistance.</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Proven Results</h3>
                  <p className="text-gray-300">$100M+ recovered for clients. Multi-million dollar settlements. We have the track record that gets results.</p>
                </div>
              </div>
            </section>

            {/* Process Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Our Personal Injury Process</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">1.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Free Case Evaluation</h3>
                    <p className="text-gray-300">We review your case at no cost and explain your legal options clearly.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">2.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Investigation & Evidence</h3>
                    <p className="text-gray-300">Our team gathers evidence, interviews witnesses, and builds your strongest case.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">3.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Aggressive Negotiation</h3>
                    <p className="text-gray-300">We fight insurance companies to get you maximum compensation.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">4.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Trial Ready</h3>
                    <p className="text-gray-300">If needed, we're prepared to take your case to court and win.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Recent Results */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Recent Case Results</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                  <div className="text-4xl font-black text-primary mb-2">$2.5M</div>
                  <p className="text-gray-300">Car Accident Settlement</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                  <div className="text-4xl font-black text-primary mb-2">$1.8M</div>
                  <p className="text-gray-300">Medical Malpractice</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                  <div className="text-4xl font-black text-primary mb-2">$3.2M</div>
                  <p className="text-gray-300">Wrongful Death</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-4 text-center">*Past results do not guarantee future outcomes</p>
            </section>

            {/* NC Coverage Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Serving All 100 North Carolina Counties</h2>
              <p className="text-lg mb-8">
                From the mountains to the coast, we provide expert personal injury representation throughout North Carolina:
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