import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Best Workers\' Comp Lawyers in North Carolina | Get Benefits Fast | Vasquez Law',
  description: 'Expert NC workers\' compensation attorneys with 60+ years experience. Get your benefits approved fast. Free consultation. We handle denied claims. Se habla español.',
  keywords: 'workers comp lawyer NC, workers compensation attorney North Carolina, workplace injury lawyer, denied workers comp claims, work accident attorney NC, Raleigh workers comp lawyer, Charlotte workplace injury attorney, Durham workers compensation, Greensboro work accident lawyer, Winston Salem comp attorney',
  openGraph: {
    title: 'Best Workers\' Comp Lawyers in North Carolina | Get Benefits Fast | Vasquez Law',
    description: 'Expert NC workers\' compensation attorneys with 60+ years experience. Get your benefits approved fast. Free consultation. We handle denied claims. Se habla español.',
    url: `https://www.vasquezlawfirm.com/practice-areas/workers-compensation`,
    siteName: 'Vasquez Law Firm, PLLC',
    images: [
      {
        url: '/images/practice-areas/workers-compensation-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Workers\' Compensation Services in North Carolina'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Workers\' Comp Lawyers in North Carolina | Get Benefits Fast | Vasquez Law',
    description: 'Expert NC workers\' compensation attorneys with 60+ years experience. Get your benefits approved fast. Free consultation. We handle denied claims. Se habla español.',
    images: ['/images/practice-areas/workers-compensation-hero.jpg'],
  },
  alternates: {
    canonical: `https://www.vasquezlawfirm.com/practice-areas/workers-compensation`,
    languages: {
      'en-US': `https://www.vasquezlawfirm.com/practice-areas/workers-compensation`,
      'es-ES': `https://www.vasquezlawfirm.com/es/areas-de-practica/workers-compensation`
    }
  }
};

export default function WorkersCompensationPage() {
  const services = [
    'Workers\' Comp Claim Filing',
    'Denied Claim Appeals',
    'Disability Benefits',
    'Medical Treatment Authorization',
    'Lost Wage Recovery',
    'Third-Party Claims',
    'Construction Site Injuries',
    'Repetitive Stress Injuries',
    'Workplace Accident Investigation',
  ];

  const faqs = [
    {
      question: 'How much does a workers\' compensation lawyer cost in North Carolina?',
      answer: 'At Vasquez Law Firm, we offer free consultations and flexible payment options. We work on contingency - no fee unless we win.',
    },
    {
      question: 'Do you handle workers\' compensation cases throughout NC?',
      answer: 'Yes! With offices in Raleigh, Charlotte, Durham, and Smithfield, plus virtual consultations, we serve all 100 North Carolina counties.',
    },
    {
      question: 'How quickly can I speak with a workers\' compensation attorney?',
      answer: 'We offer same-day consultations and 24/7 emergency availability. Call 1-844-YO-PELEO or use our AI chat for immediate assistance.',
    },
    {
      question: 'What if my workers\' comp claim was denied?',
      answer: 'Don\'t give up! We have a 95% success rate in appealing denied claims. We know how to fight insurance companies and get you the benefits you deserve.',
    },
    {
      question: 'Can I be fired for filing a workers\' comp claim?',
      answer: 'No! It\'s illegal for employers to retaliate against you for filing a legitimate workers\' compensation claim. We protect your rights throughout the process.',
    },
  ];

  return (
    <>
      <ModernPracticeAreaTemplate
        title="North Carolina Workers\' Comp Experts - Get the Benefits You Deserve"
        subtitle="Workers\' Compensation Attorneys Serving All of North Carolina"
        description="Hurt at work in North Carolina? Don\'t let your employer or their insurance company deny your rightful benefits. With 60+ years of experience and thousands of successful claims, we know how to win."
        services={services}
        faqs={faqs}
        content={
          <div className="space-y-12">
            {/* Why Choose Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Why Choose Vasquez Law Firm for Workers\' Compensation?</h2>
              <p className="text-lg mb-6">Why injured workers choose us: ✓ 95% approval rate ✓ Expedited claim processing ✓ Maximum benefit calculation ✓ Direct insurance negotiation ✓ No upfront costs</p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Maximum Benefits</h3>
                  <p className="text-gray-300">We calculate and fight for every dollar you deserve - medical bills, lost wages, disability, and more.</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">95% Success Rate</h3>
                  <p className="text-gray-300">Our proven track record gets results. We know how to navigate NC workers\' comp laws to win your case.</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Fast Processing</h3>
                  <p className="text-gray-300">We expedite your claim to get benefits flowing quickly. No unnecessary delays or bureaucratic runarounds.</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">No Win, No Fee</h3>
                  <p className="text-gray-300">You pay nothing unless we win your case. No upfront costs, no hidden fees, no financial risk to you.</p>
                </div>
              </div>
            </section>

            {/* Process Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Our Workers\' Comp Process</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">1.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Free Case Review</h3>
                    <p className="text-gray-300">We evaluate your injury and explain your rights under NC workers\' comp law.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">2.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">File Your Claim</h3>
                    <p className="text-gray-300">We handle all paperwork and ensure your claim is filed correctly and on time.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">3.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Fight for Benefits</h3>
                    <p className="text-gray-300">We negotiate aggressively with insurance companies to maximize your compensation.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">4.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Get You Paid</h3>
                    <p className="text-gray-300">We ensure you receive all benefits owed - medical care, lost wages, and disability payments.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* NC Coverage Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Serving All 100 North Carolina Counties</h2>
              <p className="text-lg mb-8">
                From the mountains to the coast, we provide expert workers\' compensation representation throughout North Carolina:
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
        id="workers-compensation-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Workers\' Compensation Law Services - Vasquez Law Firm',
            description: 'Expert workers\' compensation legal services in North Carolina including workplace injury claims, denied benefits appeals, and disability benefits.',
            provider: {
              '@type': 'Attorney',
              name: 'Vasquez Law Firm, PLLC',
              url: 'https://www.vasquezlawfirm.com'
            },
            areaServed: {
              '@type': 'State',
              name: 'North Carolina'
            },
            serviceType: 'Workers\' Compensation Law',
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
        id="workers-compensation-local-business"
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
