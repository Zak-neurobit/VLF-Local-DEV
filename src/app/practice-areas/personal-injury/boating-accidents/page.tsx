import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'NC Boating Accident Lawyer | Watercraft Injury Attorney | Vasquez Law Firm',
  description:
    'Injured in a boating or watercraft accident in North Carolina? Our experienced maritime attorneys fight for victims on NC lakes and coastal waters. Se habla español.',
  keywords: [
    'boating accident lawyer NC',
    'North Carolina watercraft accident attorney',
    'boat crash lawyer Lake Norman',
    'Jordan Lake boating accident attorney',
    'NC maritime injury lawyer',
    'jet ski accident lawyer North Carolina',
    'abogado accidente barco',
    'Outer Banks boating accident attorney',
    'NC boat accident compensation',
    'watercraft injury claim North Carolina',
  ],
  openGraph: {
    title: 'NC Boating Accident Lawyer | Watercraft Injury Attorney',
    description:
      'Fighting for boating accident victims on North Carolina waters. We overcome contributory negligence defenses and maritime law complexities. Free consultation.',
    images: [
      {
        url: '/images/boating-accident-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'North Carolina Boating Accident Attorney',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawfirm.com/practice-areas/personal-injury/boating-accidents',
    languages: {
      es: 'https://www.vasquezlawfirm.com/es/areas-de-practica/lesiones-personales/accidentes-navegacion',
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

export default function BoatingAccidentsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#001845] to-[#003875] text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              North Carolina Boating Accident Lawyer
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-[#FF6B6B] mb-6">
              YO PELEO POR TI™
            </p>
            <p className="text-xl mb-8 text-gray-100">
              Injured on NC waters? From Lake Norman to the Outer Banks, we fight for boating
              accident victims and navigate complex maritime laws to secure your compensation.
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
            North Carolina Boating Accident Statistics
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-4xl font-bold text-[#FF6B6B] mb-2">150+</p>
              <p className="text-gray-700">Boating accidents annually in NC</p>
              <p className="text-sm text-gray-500 mt-2">Source: NC Wildlife Resources 2023</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-4xl font-bold text-[#FF6B6B] mb-2">20-30</p>
              <p className="text-gray-700">Boating fatalities per year</p>
              <p className="text-sm text-gray-500 mt-2">80% not wearing life jackets</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-4xl font-bold text-[#FF6B6B] mb-2">$3M+</p>
              <p className="text-gray-700">Annual property damage from boat accidents</p>
              <p className="text-sm text-gray-500 mt-2">Not including injuries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular NC Waterways Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            We Handle Accidents on All NC Waters
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#003875]">
              <h3 className="text-xl font-semibold mb-3">Lake Norman</h3>
              <p className="text-gray-700">
                NC&apos;s largest lake with heavy boat traffic, jet ski accidents, and collision risks.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#003875]">
              <h3 className="text-xl font-semibold mb-3">Jordan Lake</h3>
              <p className="text-gray-700">
                Popular recreation spot near Raleigh with frequent holiday weekend accidents.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#003875]">
              <h3 className="text-xl font-semibold mb-3">Outer Banks</h3>
              <p className="text-gray-700">
                Coastal waters, inlets, and sounds with unique maritime hazards.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#003875]">
              <h3 className="text-xl font-semibold mb-3">Lake Gaston</h3>
              <p className="text-gray-700">
                Interstate waterway with Virginia, complex jurisdiction issues.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#003875]">
              <h3 className="text-xl font-semibold mb-3">High Rock Lake</h3>
              <p className="text-gray-700">
                Second largest lake with numerous coves and collision points.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#003875]">
              <h3 className="text-xl font-semibold mb-3">Coastal Rivers</h3>
              <p className="text-gray-700">
                Cape Fear, Neuse, and other rivers with commercial and recreational traffic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NC Contributory Negligence Warning */}
      <section className="py-16 bg-[#001845] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              ⚠️ Critical: North Carolina&apos;s Contributory Negligence Law Applies to Boating
            </h2>
            <p className="text-xl mb-6">
              North Carolina is one of only 4 states with pure contributory negligence. If
              you&apos;re found even 1% at fault, you could receive NOTHING.
            </p>
            <p className="text-lg mb-8">
              Insurance companies will claim you weren&apos;t wearing a life jacket, were standing
              in the boat, or failed to keep proper lookout. We know maritime law and how to prove
              the other operator was 100% at fault.
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
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Common Causes of NC Boating Accidents
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#FF6B6B]">
              <h3 className="text-xl font-semibold mb-3">Operator Inexperience</h3>
              <p className="text-gray-700">
                Untrained operators who don&apos;t understand navigation rules, right-of-way, or safe
                operation.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#FF6B6B]">
              <h3 className="text-xl font-semibold mb-3">Alcohol/Drug Impairment</h3>
              <p className="text-gray-700">
                BUI (Boating Under Influence) is illegal in NC with same .08 BAC limit as DWI.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#FF6B6B]">
              <h3 className="text-xl font-semibold mb-3">Excessive Speed</h3>
              <p className="text-gray-700">
                Operating too fast for conditions, in no-wake zones, or near other vessels.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#FF6B6B]">
              <h3 className="text-xl font-semibold mb-3">Equipment Failure</h3>
              <p className="text-gray-700">
                Poor maintenance, defective parts, or inadequate safety equipment.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#FF6B6B]">
              <h3 className="text-xl font-semibold mb-3">Weather Conditions</h3>
              <p className="text-gray-700">
                Operating in storms, high winds, or poor visibility without proper precautions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#FF6B6B]">
              <h3 className="text-xl font-semibold mb-3">Wake/Wave Accidents</h3>
              <p className="text-gray-700">
                Large wakes causing smaller boats to capsize or throwing passengers overboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Common Injuries Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Common Boating Accident Injuries
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Life-Threatening Injuries</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>
                    <strong>Drowning/Near-Drowning:</strong> Brain damage from oxygen deprivation,
                    even if rescued
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>
                    <strong>Propeller Injuries:</strong> Severe lacerations, amputations, and death
                    from prop strikes
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>
                    <strong>Head/Spinal Injuries:</strong> From impacts with boats, docks, or water
                    at high speed
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>
                    <strong>Hypothermia:</strong> Cold water exposure leading to organ failure
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Other Serious Injuries</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>Broken bones from collision impacts</div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>Carbon monoxide poisoning from exhaust</div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>Burns from boat fires or explosions</div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>Whiplash and soft tissue injuries</div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>PTSD and fear of water</div>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
            <p className="text-lg font-semibold mb-2">⚠️ Water Magnifies Injury Risk</p>
            <p className="text-gray-700">
              Unlike car accidents, boating accidents often involve drowning risk, making even minor
              collisions potentially fatal. Cold water, distance from shore, and delayed rescue
              compound injuries.
            </p>
          </div>
        </div>
      </section>

      {/* NC Boating Laws Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            North Carolina Boating Laws & Requirements
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">Operator Requirements</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Born after 1988? Must have boating safety certificate</li>
                <li>✓ No one under 14 can operate personal watercraft</li>
                <li>✓ BUI illegal - same penalties as DWI</li>
                <li>✓ Must maintain safe speed and proper lookout</li>
                <li>✓ Required to render aid in accidents</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">
                Safety Equipment Required
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Life jackets for every person aboard</li>
                <li>✓ Fire extinguisher on motorboats</li>
                <li>✓ Sound signaling devices (horn/whistle)</li>
                <li>✓ Navigation lights for night operation</li>
                <li>✓ Throwable flotation device (16ft+ boats)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Compensation Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Compensation for NC Boating Accident Victims
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">Economic Damages</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Emergency rescue and medical costs</li>
                <li>✓ Hospitalization and surgery</li>
                <li>✓ Rehabilitation and therapy</li>
                <li>✓ Lost wages and earning capacity</li>
                <li>✓ Boat repair or replacement</li>
                <li>✓ Search and rescue expenses</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">Non-Economic Damages</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Pain and suffering</li>
                <li>✓ Emotional trauma and PTSD</li>
                <li>✓ Loss of enjoyment of water activities</li>
                <li>✓ Permanent disability or disfigurement</li>
                <li>✓ Loss of consortium</li>
                <li>✓ Wrongful death damages</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 bg-[#FFF8E1] p-6 rounded-lg border-l-4 border-[#FFB74D]">
            <p className="text-lg font-semibold mb-2">⏰ NC Statute of Limitations: 3 Years</p>
            <p className="text-gray-700">
              You have 3 years from the date of your boating accident to file a personal injury
              lawsuit. Maritime law can be complex - contact us immediately to preserve evidence and
              protect your rights.
            </p>
          </div>
        </div>
      </section>

      {/* Why Boating Cases Are Unique */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Boating Accident Cases Are Complex
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#001845]">Multiple Laws Apply</h3>
              <p className="text-gray-700">
                Boating accidents involve state law, federal maritime law, and Coast Guard
                regulations. We navigate all applicable laws to maximize your recovery.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#001845]">
                Evidence Disappears Quickly
              </h3>
              <p className="text-gray-700">
                Unlike car accidents, there are no skid marks on water. Boats are moved, repaired,
                or sold. We act fast to preserve crucial evidence.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#001845]">
                Insurance Coverage Issues
              </h3>
              <p className="text-gray-700">
                Boat insurance differs from auto insurance. Many boaters are underinsured or
                uninsured. We explore all coverage sources including homeowner&apos;s policies.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#001845]">
                Jurisdiction Complexities
              </h3>
              <p className="text-gray-700">
                Accidents on interstate waters or involving federal waters add jurisdictional
                challenges. We handle cases in both state and federal courts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Company Tactics */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How Insurance Companies Try to Deny Boating Claims
          </h2>
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-red-800 mb-4">
              ⚠️ Warning: Common Insurance Tactics
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <div>
                  <strong>Life Jacket Arguments:</strong> Claiming lack of PFD use contributed to
                  injuries
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <div>
                  <strong>&quot;Assumption of Risk&quot;:</strong> Arguing you accepted danger by being on a
                  boat
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <div>
                  <strong>Weather Blame:</strong> Claiming conditions were too dangerous to boat
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <div>
                  <strong>Operator Error:</strong> Blaming all passengers for operator&apos;s mistakes
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <div>
                  <strong>Coverage Denials:</strong> Claiming policy exclusions or lapsed coverage
                </div>
              </li>
            </ul>
          </div>
          <div className="text-center">
            <p className="text-xl mb-6">Don&apos;t navigate complex maritime law alone.</p>
            <Link
              href="/contact"
              className="inline-block bg-[#FF6B6B] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#FF5252] transition-colors"
            >
              Get an Experienced Maritime Lawyer
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            NC Boating Accident FAQs
          </h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">
                Do I need boat insurance in North Carolina?
              </h3>
              <p className="text-gray-700">
                NC doesn&apos;t require boat insurance, but marinas may require it. Many boaters are
                uninsured, making it crucial to have uninsured boater coverage. We&apos;ll explore all
                available insurance.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">
                What if I wasn&apos;t wearing a life jacket?
              </h3>
              <p className="text-gray-700">
                While NC requires life jackets on board, adults aren&apos;t required to wear them.
                Not wearing a PFD doesn&apos;t bar your claim if the other operator&apos;s negligence
                caused the accident.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Can I sue for a jet ski accident?</h3>
              <p className="text-gray-700">
                Yes. Personal watercraft (jet ski) accidents follow the same laws as boat accidents.
                These cases often involve serious injuries due to high speeds and lack of
                protection.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">What if the boat operator was drunk?</h3>
              <p className="text-gray-700">
                BUI (Boating Under Influence) is illegal in NC with the same .08 BAC limit as DWI. A
                drunk operator strengthens your case and may allow punitive damages.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">
                Who investigates boating accidents in NC?
              </h3>
              <p className="text-gray-700">
                NC Wildlife Resources Commission investigates most boating accidents. The Coast
                Guard may investigate on federal waters. We work with investigators and conduct our
                own investigation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Office Locations */}
      <section className="py-16 bg-gradient-to-br from-[#001845] to-[#003875] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Don&apos;t Let Your Boating Accident Case Sink</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Maritime law is complex and insurance companies use it against victims. We have the
            experience to navigate these waters and fight for maximum compensation.
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
              Serving Boating Accident Victims Across North Carolina
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
            serviceType: 'Personal Injury Boating Accidents Legal Services',
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
            url: 'https://www.vasquezlawfirm.com/practice-areas/personal-injury/boating-accidents/page',
            description:
              'Personal Injury Boating Accidents legal services in North Carolina. Free consultation. Se habla español.',
          }),
        }}
      />
    </div>
  );
}
