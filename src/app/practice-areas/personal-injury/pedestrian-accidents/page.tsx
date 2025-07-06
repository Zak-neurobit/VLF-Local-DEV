import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'NC Pedestrian Accident Lawyer | Vasquez Law Firm, PLLC',
  description:
    'Hit by a car while walking in North Carolina? Our experienced pedestrian accident attorneys fight for maximum compensation despite contributory negligence laws. Se habla español.',
  keywords: [
    'pedestrian accident lawyer NC',
    'North Carolina pedestrian injury attorney',
    'hit by car while walking lawyer',
    'Charlotte pedestrian accident attorney',
    'Raleigh crosswalk accident lawyer',
    'NC pedestrian accident compensation',
    'abogado accidente peatón',
    'North Carolina pedestrian injury claim',
    'pedestrian hit by car attorney',
    'NC pedestrian accident statistics',
  ],
  openGraph: {
    title: 'NC Pedestrian Accident Lawyer | Vasquez Law Firm, PLLC',
    description:
      'Fighting for pedestrians injured by negligent drivers in North Carolina. We overcome contributory negligence defenses. Free consultation.',
    images: [
      {
        url: '/images/pedestrian-accident-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'North Carolina Pedestrian Accident Attorney',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawfirm.com/practice-areas/personal-injury/pedestrian-accidents',
    languages: {
      es: 'https://www.vasquezlawfirm.com/es/areas-de-practica/lesiones-personales/accidentes-peaton',
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

export default function PedestrianAccidentsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#001845] to-[#003875] text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              North Carolina Pedestrian Accident Lawyer
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-[#FF6B6B] mb-6">
              YO PELEO POR TI™
            </p>
            <p className="text-xl mb-8 text-gray-100">
              Hit by a car while walking? We fight for pedestrians injured on NC roads and overcome
              the state&apos;s harsh contributory negligence law to get you justice.
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
            North Carolina Pedestrian Accident Statistics
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-4xl font-bold text-[#FF6B6B] mb-2">200+</p>
              <p className="text-gray-700">Pedestrian deaths annually in NC</p>
              <p className="text-sm text-gray-500 mt-2">Source: NCDOT 2023</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-4xl font-bold text-[#FF6B6B] mb-2">2,500+</p>
              <p className="text-gray-700">Pedestrians injured by vehicles each year</p>
              <p className="text-sm text-gray-500 mt-2">Rising 15% since 2020</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-4xl font-bold text-[#FF6B6B] mb-2">75%</p>
              <p className="text-gray-700">Of fatalities occur outside crosswalks</p>
              <p className="text-sm text-gray-500 mt-2">But drivers still have duties</p>
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
              Insurance companies will claim you were jaywalking, distracted, or not visible. Even
              if you were in a crosswalk, they&apos;ll argue you didn&apos;t look both ways. We know how
              to prove the driver was 100% at fault and defeat these tactics.
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
            Common Causes of NC Pedestrian Accidents
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#FF6B6B]">
              <h3 className="text-xl font-semibold mb-3">Failure to Yield at Crosswalks</h3>
              <p className="text-gray-700">
                Drivers ignoring pedestrians&apos; right-of-way at marked crosswalks, especially when
                turning.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#FF6B6B]">
              <h3 className="text-xl font-semibold mb-3">Distracted Driving</h3>
              <p className="text-gray-700">
                Texting, phone calls, or other distractions causing drivers to miss pedestrians in
                their path.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#FF6B6B]">
              <h3 className="text-xl font-semibold mb-3">Backing Up Accidents</h3>
              <p className="text-gray-700">
                Drivers reversing in parking lots, driveways, or streets without checking for
                pedestrians.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#FF6B6B]">
              <h3 className="text-xl font-semibold mb-3">Speeding in Residential Areas</h3>
              <p className="text-gray-700">
                Excessive speed in neighborhoods, school zones, and areas with heavy foot traffic.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#FF6B6B]">
              <h3 className="text-xl font-semibold mb-3">Drunk or Impaired Driving</h3>
              <p className="text-gray-700">
                Alcohol or drug impairment causing drivers to swerve onto sidewalks or miss seeing
                pedestrians.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#FF6B6B]">
              <h3 className="text-xl font-semibold mb-3">Poor Visibility Conditions</h3>
              <p className="text-gray-700">
                Dawn, dusk, or nighttime accidents where drivers fail to see pedestrians despite
                duty to be cautious.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Common Injuries Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Common Pedestrian Accident Injuries
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Catastrophic Injuries</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>
                    <strong>Traumatic Brain Injuries (TBI):</strong> From impact with vehicle or
                    ground, causing permanent cognitive damage
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>
                    <strong>Spinal Cord Injuries:</strong> Paralysis, loss of mobility, lifetime
                    care needs
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>
                    <strong>Multiple Fractures:</strong> Pelvis, legs, ribs, and arms often broken
                    in pedestrian impacts
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>
                    <strong>Internal Organ Damage:</strong> Life-threatening injuries requiring
                    emergency surgery
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Other Serious Injuries</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>Hip and knee injuries requiring replacement surgery</div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>Facial trauma and dental injuries</div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>Road rash and severe lacerations</div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>PTSD and anxiety about crossing streets</div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>Soft tissue damage and chronic pain</div>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400">
            <p className="text-lg font-semibold mb-2">⚠️ Pedestrian Injuries Are Often Severe</p>
            <p className="text-gray-700">
              Without any protection, pedestrians suffer catastrophic injuries even at low speeds. A
              car traveling just 20 mph can cause fatal injuries to a pedestrian.
            </p>
          </div>
        </div>
      </section>

      {/* NC Pedestrian Rights Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Your Rights as a Pedestrian in North Carolina
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">In Crosswalks</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Right-of-way in marked crosswalks when crossing with signal</li>
                <li>✓ Drivers must yield even if turning</li>
                <li>✓ Vehicles must stop, not just slow down</li>
                <li>✓ Both directions of traffic must yield</li>
                <li>✓ Protected in unmarked crosswalks at intersections</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">Outside Crosswalks</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Drivers still have duty of care</li>
                <li>✓ Must exercise reasonable caution</li>
                <li>✓ Cannot intentionally harm pedestrians</li>
                <li>✓ Must be watchful in residential areas</li>
                <li>✓ Special care near schools and parks</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Compensation Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Compensation for NC Pedestrian Accident Victims
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">Economic Damages</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Emergency medical treatment</li>
                <li>✓ Surgery and hospitalization costs</li>
                <li>✓ Physical therapy and rehabilitation</li>
                <li>✓ Lost wages and future income</li>
                <li>✓ Medical equipment (wheelchairs, crutches)</li>
                <li>✓ Home modifications for disabilities</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">Non-Economic Damages</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Pain and suffering</li>
                <li>✓ Emotional trauma and PTSD</li>
                <li>✓ Loss of enjoyment of life</li>
                <li>✓ Permanent disability</li>
                <li>✓ Scarring and disfigurement</li>
                <li>✓ Loss of consortium</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 bg-[#FFF8E1] p-6 rounded-lg border-l-4 border-[#FFB74D]">
            <p className="text-lg font-semibold mb-2">⏰ NC Statute of Limitations: 3 Years</p>
            <p className="text-gray-700">
              You have 3 years from the date of your pedestrian accident to file a personal injury
              lawsuit in North Carolina. However, evidence disappears quickly - surveillance footage
              is often deleted within days. Contact us immediately.
            </p>
          </div>
        </div>
      </section>

      {/* Why Pedestrian Cases Are Unique */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Pedestrian Accident Cases Are Unique
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#001845]">
                Severe Injuries Without Protection
              </h3>
              <p className="text-gray-700">
                Unlike drivers with airbags and seatbelts, pedestrians have no protection. Even
                low-speed impacts cause catastrophic injuries requiring extensive medical treatment
                and long-term care.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#001845]">
                Complex Visibility Arguments
              </h3>
              <p className="text-gray-700">
                Insurance companies claim pedestrians &quot;came out of nowhere&quot; or weren&apos;t visible.
                We use accident reconstruction experts to prove drivers should have seen and avoided
                pedestrians.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#001845]">
                Contributory Negligence Challenges
              </h3>
              <p className="text-gray-700">
                In NC, any fault bars recovery. Insurance companies exploit this by claiming
                jaywalking, distraction, or dark clothing. We fight these tactics with evidence and
                expert testimony.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#001845]">Time-Sensitive Evidence</h3>
              <p className="text-gray-700">
                Surveillance footage, skid marks, and witness memories fade fast. We immediately
                secure evidence before it\&apos;s lost, giving you the strongest possible case.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Company Tactics */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How Insurance Companies Try to Deny Pedestrian Claims
          </h2>
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-red-800 mb-4">
              ⚠️ Warning: Common Insurance Tactics
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <div>
                  <strong>Jaywalking Claims:</strong> Arguing you crossed outside a crosswalk, even
                  when drivers still have duties
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <div>
                  <strong>Visibility Arguments:</strong> Claiming dark clothing or poor lighting
                  absolves driver responsibility
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <div>
                  <strong>Distraction Allegations:</strong> Saying you were on your phone or not
                  paying attention
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <div>
                  <strong>Signal Violations:</strong> Claiming you crossed against the light, even
                  without proof
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <div>
                  <strong>Quick Settlements:</strong> Offering lowball amounts before you know your
                  injury extent
                </div>
              </li>
            </ul>
          </div>
          <div className="text-center">
            <p className="text-xl mb-6">
              Don&apos;t let insurance companies blame you for being hit by a car.
            </p>
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
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            NC Pedestrian Accident FAQs
          </h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">
                What if I was hit outside of a crosswalk?
              </h3>
              <p className="text-gray-700">
                While pedestrians have the right-of-way in crosswalks, drivers still have a duty to
                exercise reasonable care everywhere. We can still win your case by proving the
                driver was negligent, speeding, distracted, or impaired.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">
                Can I get compensation if I was partially at fault?
              </h3>
              <p className="text-gray-700">
                Unfortunately, North Carolina&apos;s contributory negligence law bars recovery if
                you\&apos;re even 1% at fault. However, insurance companies often exaggerate
                pedestrian fault. We fight to prove the driver was 100% responsible.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">What if the driver fled the scene?</h3>
              <p className="text-gray-700">
                Hit-and-run pedestrian accidents are unfortunately common. Your uninsured motorist
                coverage may apply. We&apos;ll also work with police to identify the driver and explore
                all available insurance coverage.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">
                How long will my pedestrian accident case take?
              </h3>
              <p className="text-gray-700">
                Timeline depends on injury severity and liability disputes. Clear fault cases may
                settle in 6-12 months. Cases with serious injuries or disputed fault may take 18-24
                months. We fight for full compensation, not quick settlements.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">What evidence do I need for my case?</h3>
              <p className="text-gray-700">
                Photos of the scene, witness information, surveillance footage, police reports, and
                medical records are crucial. Don&apos;t worry if you couldn\&apos;t gather evidence due to
                injuries - we&apos;ll investigate and obtain everything needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Office Locations */}
      <section className="py-16 bg-gradient-to-br from-[#001845] to-[#003875] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Get Justice After Your Pedestrian Accident</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Don&apos;t let insurance companies blame you for a driver&apos;s negligence. We know how to
            overcome NC&apos;s contributory negligence law and get you the compensation you deserve.
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
              Serving Pedestrian Accident Victims Across North Carolina
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
            serviceType: 'Personal Injury Pedestrian Accidents Legal Services',
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
            url: 'https://www.vasquezlawfirm.com/practice-areas/personal-injury/pedestrian-accidents/page',
            description:
              'Personal Injury Pedestrian Accidents legal services in North Carolina. Free consultation. Se habla español.',
          }),
        }}
      />
    </div>
  );
}
