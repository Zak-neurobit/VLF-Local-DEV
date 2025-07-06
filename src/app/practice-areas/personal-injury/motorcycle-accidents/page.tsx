import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'NC Motorcycle Accident Lawyer | Vasquez Law Firm, PLLC',
  description:
    'Injured in a motorcycle accident in North Carolina? Our experienced attorneys fight contributory negligence defenses. Free consultation. Se habla español.',
  keywords: [
    'motorcycle accident lawyer NC',
    'North Carolina motorcycle crash attorney',
    'motorcycle injury lawyer Raleigh',
    'Charlotte motorcycle accident attorney',
    'NC motorcycle accident compensation',
    'motorcycle crash lawyer near me',
    'abogado accidente motocicleta',
    'North Carolina biker injury lawyer',
    'motorcycle accident contributory negligence',
    'NC motorcycle accident statistics',
  ],
  openGraph: {
    title: 'NC Motorcycle Accident Lawyer | Vasquez Law Firm, PLLC',
    description:
      'Fighting for motorcycle accident victims across North Carolina. We overcome contributory negligence defenses. Free consultation.',
    images: [
      {
        url: '/images/motorcycle-accident-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'North Carolina Motorcycle Accident Attorney',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawfirm.com/practice-areas/personal-injury/motorcycle-accidents',
    languages: {
      es: 'https://www.vasquezlawfirm.com/es/areas-de-practica/lesiones-personales/accidentes-motocicleta',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function MotorcycleAccidentsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#001845] to-[#003875] text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              North Carolina Motorcycle Accident Lawyer
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-[#FF6B6B] mb-6">
              YO PELEO POR TI™
            </p>
            <p className="text-xl mb-8 text-gray-100">
              Fighting for bikers injured on NC roads. We know how to overcome the state&apos;s
              harsh contributory negligence law and get you the compensation you deserve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-block bg-[#FF6B6B] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#FF5252] transition-colors text-center"
              >
                Free Case Evaluation
              </Link>
              <a
                href="tel:919-537-8722"
                className="inline-block bg-white text-[#001845] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors text-center"
              >
                Call Now: (919) 537-8722
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* NC Statistics Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            North Carolina Motorcycle Accident Statistics
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-4xl font-bold text-[#FF6B6B] mb-2">3,300+</p>
              <p className="text-gray-700">Motorcycle crashes in NC annually</p>
              <p className="text-sm text-gray-500 mt-2">Source: NCDOT 2023</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-4xl font-bold text-[#FF6B6B] mb-2">180+</p>
              <p className="text-gray-700">Motorcycle fatalities per year in NC</p>
              <p className="text-sm text-gray-500 mt-2">5% of all traffic deaths</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-4xl font-bold text-[#FF6B6B] mb-2">75%</p>
              <p className="text-gray-700">Of motorcycle accidents result in injury</p>
              <p className="text-sm text-gray-500 mt-2">Compared to 20% for cars</p>
            </div>
          </div>
        </div>
      </section>

      {/* NC Contributory Negligence Warning */}
      <section className="py-16 bg-[#001845] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              ⚠️ Critical: North Carolina&apos;s Contributory Negligence Law
            </h2>
            <p className="text-xl mb-6">
              North Carolina is one of only 4 states with pure contributory negligence. If
              you\&apos;re found even 1% at fault, you could receive NOTHING.
            </p>
            <p className="text-lg mb-8">
              Insurance companies exploit this law to deny motorcycle accident claims. They&apos;ll argue
              you were speeding, lane splitting, or not wearing proper gear. We know how to fight
              these tactics and prove the other driver was 100% at fault.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-[#FF6B6B] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#FF5252] transition-colors"
            >
              Protect Your Rights Now
            </Link>
          </div>
        </div>
      </section>

      {/* Common Causes Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Common Causes of NC Motorcycle Accidents
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#FF6B6B]">
              <h3 className="text-xl font-semibold mb-3">Left-Turn Crashes</h3>
              <p className="text-gray-700">
                42% of fatal motorcycle accidents involve cars turning left in front of bikers who
                have the right of way.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#FF6B6B]">
              <h3 className="text-xl font-semibold mb-3">Lane Change Collisions</h3>
              <p className="text-gray-700">
                Drivers failing to check blind spots before changing lanes on I-40, I-85, or I-77.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#FF6B6B]">
              <h3 className="text-xl font-semibold mb-3">Rear-End Accidents</h3>
              <p className="text-gray-700">
                Distracted drivers failing to notice stopped motorcycles in traffic.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#FF6B6B]">
              <h3 className="text-xl font-semibold mb-3">Head-On Collisions</h3>
              <p className="text-gray-700">
                Often fatal crashes on rural NC highways when cars cross the center line.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#FF6B6B]">
              <h3 className="text-xl font-semibold mb-3">Road Hazards</h3>
              <p className="text-gray-700">
                Potholes, debris, and poor road maintenance on NC roads and highways.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#FF6B6B]">
              <h3 className="text-xl font-semibold mb-3">Drunk Drivers</h3>
              <p className="text-gray-700">
                Impaired drivers who fail to see motorcycles, especially at night.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Common Injuries Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Common Motorcycle Accident Injuries
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Severe Injuries</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>
                    <strong>Traumatic Brain Injuries (TBI):</strong> Even with helmets, riders can
                    suffer life-changing brain injuries
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>
                    <strong>Spinal Cord Injuries:</strong> Paralysis, loss of sensation, chronic
                    pain
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>
                    <strong>Road Rash:</strong> Severe skin abrasions requiring skin grafts and
                    causing permanent scarring
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>
                    <strong>Limb Loss:</strong> Traumatic or surgical amputation
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Other Common Injuries</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>Broken bones and fractures (legs, arms, ribs, pelvis)</div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>Internal organ damage and internal bleeding</div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>Facial injuries and dental damage</div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>PTSD and emotional trauma</div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>Neck and back injuries</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Compensation Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Compensation for NC Motorcycle Accident Victims
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">Economic Damages</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ All medical expenses (emergency, surgery, rehabilitation)</li>
                <li>✓ Future medical care and therapy</li>
                <li>✓ Lost wages and income</li>
                <li>✓ Loss of earning capacity</li>
                <li>✓ Motorcycle repair or replacement</li>
                <li>✓ Adaptive equipment costs</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">Non-Economic Damages</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Pain and suffering</li>
                <li>✓ Emotional distress and PTSD</li>
                <li>✓ Loss of enjoyment of life</li>
                <li>✓ Permanent disability or disfigurement</li>
                <li>✓ Loss of consortium (for spouses)</li>
                <li>✓ Punitive damages (in cases of gross negligence)</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 bg-[#FFF8E1] p-6 rounded-lg border-l-4 border-[#FFB74D]">
            <p className="text-lg font-semibold mb-2">⏰ NC Statute of Limitations: 3 Years</p>
            <p className="text-gray-700">
              You have 3 years from the date of your motorcycle accident to file a personal injury
              lawsuit in North Carolina. Don&apos;t wait - evidence disappears and witnesses forget.
              Contact us immediately.
            </p>
          </div>
        </div>
      </section>

      {/* Why Motorcycle Cases Are Unique */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Motorcycle Accident Cases Are Unique
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#001845]">
                Bias Against Motorcyclists
              </h3>
              <p className="text-gray-700">
                Insurance companies and juries often have unfair biases against bikers, assuming
                they\&apos;re reckless or at fault. We combat these stereotypes with facts and
                evidence.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#001845]">
                Severe Injuries = Higher Stakes
              </h3>
              <p className="text-gray-700">
                Motorcycle accidents cause more severe injuries than car crashes. The medical costs
                and long-term care needs require aggressive legal representation to secure adequate
                compensation.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#001845]">
                Complex Accident Reconstruction
              </h3>
              <p className="text-gray-700">
                We work with accident reconstruction experts who understand motorcycle dynamics,
                stopping distances, and visibility issues unique to bikes.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#001845]">
                NC&apos;s Contributory Negligence Trap
              </h3>
              <p className="text-gray-700">
                Insurance companies will claim you were speeding, not wearing proper gear, or lane
                splitting. We know how to defeat these arguments and prove the other driver&apos;s
                fault.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Company Tactics */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How Insurance Companies Try to Deny Motorcycle Claims
          </h2>
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-red-800 mb-4">
              ⚠️ Warning: Common Insurance Tactics
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <div>
                  <strong>Blaming Your Speed:</strong> &quot;The motorcyclist must have been speeding&quot; -
                  even without evidence
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <div>
                  <strong>Gear Arguments:</strong> Claiming inadequate protective gear contributed
                  to injuries
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <div>
                  <strong>Lane Position:</strong> Arguing you were in the wrong part of the lane or
                  lane splitting
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <div>
                  <strong>Quick Settlement Offers:</strong> Lowball offers before you know the full
                  extent of injuries
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <div>
                  <strong>Recorded Statements:</strong> Trying to get you to admit partial fault on
                  a recorded line
                </div>
              </li>
            </ul>
          </div>
          <div className="text-center">
            <p className="text-xl mb-6">Don&apos;t let insurance companies take advantage of you.</p>
            <Link
              href="/contact"
              className="inline-block bg-[#FF6B6B] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#FF5252] transition-colors"
            >
              Get a Fighter on Your Side
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            NC Motorcycle Accident FAQs
          </h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">
                Do I need to wear a helmet in North Carolina?
              </h3>
              <p className="text-gray-700">
                Yes, North Carolina law requires all motorcyclists and passengers to wear
                DOT-approved helmets. Not wearing a helmet can impact your injury claim, but
                doesn\&apos;t bar recovery if the other driver was at fault for the accident itself.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">
                What if I was lane splitting when the accident happened?
              </h3>
              <p className="text-gray-700">
                Lane splitting is not explicitly legal in NC. Insurance companies will use this
                against you. However, we can still win your case if the other driver&apos;s actions
                (like an illegal lane change) caused the crash.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">
                The police report says I was partially at fault. Is my case over?
              </h3>
              <p className="text-gray-700">
                No! Police reports are not the final word. Officers often don&apos;t understand
                motorcycle dynamics. We can challenge the report with expert testimony and evidence
                to prove the other driver was 100% at fault.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">
                How long will my motorcycle accident case take?
              </h3>
              <p className="text-gray-700">
                Every case is different. Simple cases with clear fault may settle in 6-12 months.
                Complex cases with severe injuries or disputed liability may take 18-24 months or
                longer. We&apos;ll fight for as long as it takes to get you fair compensation.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">
                What if the driver who hit me doesn\&apos;t have insurance?
              </h3>
              <p className="text-gray-700">
                Your uninsured/underinsured motorist (UM/UIM) coverage can help. NC law requires
                minimum UM/UIM coverage. We&apos;ll explore all available insurance policies to maximize
                your recovery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Office Locations */}
      <section className="py-16 bg-gradient-to-br from-[#001845] to-[#003875] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Get the Legal Fighter You Need After a Motorcycle Accident
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Don&apos;t let insurance companies blame you for your motorcycle accident. We know NC law and
            how to overcome contributory negligence defenses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/contact"
              className="inline-block bg-[#FF6B6B] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#FF5252] transition-colors"
            >
              Start Your Free Case Review
            </Link>
            <a
              href="tel:919-537-8722"
              className="inline-block bg-white text-[#001845] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Call Now: (919) 537-8722
            </a>
          </div>

          <div className="border-t border-white/20 pt-8">
            <h3 className="text-2xl font-semibold mb-6">
              Serving Motorcycle Accident Victims Across North Carolina
            </h3>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <h4 className="font-semibold mb-2">Raleigh Office</h4>
                <p className="text-sm text-gray-200">6110 Creedmoor Rd.</p>
                <p className="text-sm text-gray-200">Raleigh, NC 27612</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Charlotte Office</h4>
                <p className="text-sm text-gray-200">309 W Bland St.</p>
                <p className="text-sm text-gray-200">Charlotte, NC 28203</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Smithfield Office</h4>
                <p className="text-sm text-gray-200">503 N 3rd St.</p>
                <p className="text-sm text-gray-200">Smithfield, NC 27577</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Orlando Office</h4>
                <p className="text-sm text-gray-200">5401 S Kirkman Rd #310</p>
                <p className="text-sm text-gray-200">Orlando, FL 32819</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Data for SEO */}
      <Script
        id="practice-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Personal Injury Motorcycle Accidents Legal Services',
            provider: {
              '@type': 'LegalService',
              name: 'Vasquez Law Firm, PLLC',
              url: 'https://www.vasquezlawfirm.com',
              telephone: '+1-919-537-8722',
              priceRange: '$$',
            },
            areaServed: {
              '@type': 'State',
              name: 'North Carolina',
            },
            url: 'https://www.vasquezlawfirm.com/practice-areas/personal-injury/motorcycle-accidents/page',
            description:
              'Personal Injury Motorcycle Accidents legal services in North Carolina. Free consultation. Se habla español.',
          }),
        }}
      />
    </div>
  );
}
