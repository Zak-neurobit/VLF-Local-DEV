import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'NC Bicycle Accident Lawyer | Vasquez Law Firm, PLLC',
  description:
    'Injured while cycling in North Carolina? Our experienced bicycle accident attorneys fight for cyclists rights and overcome contributory negligence defenses. Se habla español.',
  keywords: [
    'bicycle accident lawyer NC',
    'North Carolina bike accident attorney',
    'cyclist injury lawyer Raleigh',
    'Charlotte bicycle accident attorney',
    'NC bike accident compensation',
    'cycling accident lawyer near me',
    'abogado accidente bicicleta',
    'North Carolina cyclist injury claim',
    'bike crash attorney NC',
    'NC bicycle accident statistics',
  ],
  openGraph: {
    title: 'NC Bicycle Accident Lawyer | Vasquez Law Firm, PLLC',
    description:
      'Fighting for cyclists injured by negligent drivers in North Carolina. We know how to overcome contributory negligence laws. Free consultation.',
    images: [
      {
        url: '/images/bicycle-accident-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'North Carolina Bicycle Accident Attorney',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawfirm.com/practice-areas/personal-injury/bicycle-accidents',
    languages: {
      es: 'https://www.vasquezlawfirm.com/es/areas-de-practica/lesiones-personales/accidentes-bicicleta',
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

export default function BicycleAccidentsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#001845] to-[#003875] text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              North Carolina Bicycle Accident Lawyer
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-[#FF6B6B] mb-6">
              YO PELEO POR TI™
            </p>
            <p className="text-xl mb-8 text-gray-100">
              Hit while cycling? We fight for cyclists&apos; rights on NC roads and overcome the
              state&apos;s harsh contributory negligence law to secure your compensation.
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
            North Carolina Bicycle Accident Statistics
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-4xl font-bold text-[#FF6B6B] mb-2">900+</p>
              <p className="text-gray-700">Bicycle accidents annually in NC</p>
              <p className="text-sm text-gray-500 mt-2">Source: NCDOT 2023</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-4xl font-bold text-[#FF6B6B] mb-2">20+</p>
              <p className="text-gray-700">Cyclist fatalities per year</p>
              <p className="text-sm text-gray-500 mt-2">Increasing each year</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-4xl font-bold text-[#FF6B6B] mb-2">60%</p>
              <p className="text-gray-700">Of accidents occur in urban areas</p>
              <p className="text-sm text-gray-500 mt-2">Charlotte, Raleigh, Durham</p>
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
              Insurance companies will claim you weren&apos;t wearing a helmet, didn&apos;t signal,
              or were riding outside the bike lane. We know cyclists have the same rights as
              vehicles and how to prove the driver was 100% at fault.
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

      {/* NC Bicycle Laws Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            North Carolina Bicycle Laws You Need to Know
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">Cyclists&apos; Rights</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Same rights and duties as motor vehicles</li>
                <li>✓ May use full lane when necessary for safety</li>
                <li>✓ Protected 4-foot passing distance by vehicles</li>
                <li>✓ Right to ride on all roads except interstates</li>
                <li>✓ May ride two abreast if not impeding traffic</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">Safety Requirements</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Helmet required for riders under 16</li>
                <li>✓ Front light and rear reflector at night</li>
                <li>✓ Must signal turns and stops</li>
                <li>✓ One hand must remain on handlebars</li>
                <li>✓ No more than number of seats on bike</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Common Causes Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Common Causes of NC Bicycle Accidents
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#FF6B6B]">
              <h3 className="text-xl font-semibold mb-3">Right Hook Collisions</h3>
              <p className="text-gray-700">
                Drivers turning right across bike lanes without checking for cyclists traveling
                straight.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#FF6B6B]">
              <h3 className="text-xl font-semibold mb-3">Dooring Accidents</h3>
              <p className="text-gray-700">
                Parked car occupants opening doors into bike lanes without looking for approaching
                cyclists.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#FF6B6B]">
              <h3 className="text-xl font-semibold mb-3">Left Cross Crashes</h3>
              <p className="text-gray-700">
                Vehicles turning left in front of oncoming cyclists who have the right of way.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#FF6B6B]">
              <h3 className="text-xl font-semibold mb-3">Unsafe Passing</h3>
              <p className="text-gray-700">
                Drivers passing too closely, violating NC&apos;s 4-foot minimum passing distance law.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#FF6B6B]">
              <h3 className="text-xl font-semibold mb-3">Rear-End Collisions</h3>
              <p className="text-gray-700">
                Distracted or impaired drivers striking cyclists from behind, often at high speed.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#FF6B6B]">
              <h3 className="text-xl font-semibold mb-3">Intersection Failures</h3>
              <p className="text-gray-700">
                Drivers failing to yield to cyclists at intersections, stop signs, or traffic
                signals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Common Injuries Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Common Bicycle Accident Injuries
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Severe Injuries</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>
                    <strong>Head and Brain Injuries:</strong> Concussions, TBI, skull fractures even
                    with helmet use
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>
                    <strong>Spinal Injuries:</strong> Herniated discs, fractures, paralysis from
                    high-impact crashes
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>
                    <strong>Broken Bones:</strong> Collarbones, wrists, arms, and legs commonly
                    fractured
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>
                    <strong>Internal Injuries:</strong> Organ damage from handlebar impacts or being
                    thrown
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Other Common Injuries</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>Road rash requiring skin grafts</div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>Facial and dental injuries</div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>Soft tissue damage and sprains</div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>Psychological trauma and PTSD</div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>Nerve damage and chronic pain</div>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400">
            <p className="text-lg font-semibold mb-2">⚠️ Cyclists Are Vulnerable</p>
            <p className="text-gray-700">
              With minimal protection, cyclists suffer severe injuries even in low-speed collisions.
              A car traveling just 20 mph can cause life-threatening injuries to a cyclist.
            </p>
          </div>
        </div>
      </section>

      {/* Compensation Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Compensation for NC Bicycle Accident Victims
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">Economic Damages</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Emergency room and hospital bills</li>
                <li>✓ Surgery and medical procedures</li>
                <li>✓ Physical therapy and rehabilitation</li>
                <li>✓ Lost wages and reduced earning capacity</li>
                <li>✓ Bicycle replacement or repair</li>
                <li>✓ Medical equipment and modifications</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">Non-Economic Damages</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Pain and suffering</li>
                <li>✓ Emotional distress and anxiety</li>
                <li>✓ Loss of enjoyment of cycling</li>
                <li>✓ Permanent disability or scarring</li>
                <li>✓ Loss of quality of life</li>
                <li>✓ Punitive damages for gross negligence</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 bg-[#FFF8E1] p-6 rounded-lg border-l-4 border-[#FFB74D]">
            <p className="text-lg font-semibold mb-2">⏰ NC Statute of Limitations: 3 Years</p>
            <p className="text-gray-700">
              You have 3 years from the date of your bicycle accident to file a personal injury
              lawsuit in North Carolina. However, evidence like skid marks and witness memories fade
              quickly. Contact us immediately to preserve your claim.
            </p>
          </div>
        </div>
      </section>

      {/* Why Bicycle Cases Are Unique */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Bicycle Accident Cases Are Unique
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#001845]">
                Driver Bias Against Cyclists
              </h3>
              <p className="text-gray-700">
                Many drivers and insurance adjusters wrongly believe cyclists don\&apos;t belong on roads.
                We educate juries about cyclists&apos; legal rights and combat these prejudices with
                facts and law.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#001845]">
                Complex Traffic Law Application
              </h3>
              <p className="text-gray-700">
                Bicycle accidents involve unique traffic laws like the 4-foot passing rule and bike
                lane regulations. We understand these laws and use them to prove driver negligence.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#001845]">
                Severe Injuries vs. Property Damage
              </h3>
              <p className="text-gray-700">
                While bike damage may be minimal, cyclist injuries are often catastrophic. Insurance
                companies try to minimize claims based on low property damage. We focus on your
                injuries, not the bike.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#001845]">
                Contributory Negligence Challenges
              </h3>
              <p className="text-gray-700">
                Insurance companies exploit NC&apos;s harsh law by claiming helmet non-use, improper
                lighting, or lane positioning. We prove these factors didn\&apos;t cause the accident
                and the driver was 100% at fault.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Company Tactics */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How Insurance Companies Try to Deny Bicycle Claims
          </h2>
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-red-800 mb-4">
              ⚠️ Warning: Common Insurance Tactics
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <div>
                  <strong>Helmet Arguments:</strong> Claiming lack of helmet use contributed to
                  injuries, even for leg fractures
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <div>
                  <strong>Visibility Claims:</strong> Arguing cyclists weren&apos;t visible despite
                  legal lighting and reflectors
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <div>
                  <strong>Lane Position:</strong> Saying cyclists were too far left or should have
                  been on sidewalk
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <div>
                  <strong>Speed Assumptions:</strong> Claiming cyclists were speeding without any
                  evidence
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <div>
                  <strong>Quick Settlements:</strong> Pressuring injured cyclists to accept lowball
                  offers
                </div>
              </li>
            </ul>
          </div>
          <div className="text-center">
            <p className="text-xl mb-6">
              Don&apos;t let insurance companies deny your rights as a cyclist.
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
            NC Bicycle Accident FAQs
          </h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">
                Do I have to wear a helmet in North Carolina?
              </h3>
              <p className="text-gray-700">
                NC law only requires helmets for riders under 16. However, not wearing a helmet as
                an adult doesn\&apos;t bar your claim if the driver&apos;s negligence caused the
                accident. We can still recover compensation for your injuries.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Can I ride my bike on the sidewalk?</h3>
              <p className="text-gray-700">
                NC state law allows sidewalk riding unless prohibited by local ordinance. Many
                cities like Charlotte and Raleigh restrict sidewalk riding in business districts.
                However, riding legally on the road gives you stronger legal protection.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">
                What if I wasn&apos;t in a bike lane when hit?
              </h3>
              <p className="text-gray-700">
                Cyclists aren\&apos;t required to use bike lanes in NC. You have the right to use the
                full travel lane when necessary for safety. We&apos;ll prove you were riding legally and
                the driver failed to share the road safely.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">
                How is fault determined in bicycle accidents?
              </h3>
              <p className="text-gray-700">
                We investigate skid marks, vehicle damage, witness statements, and traffic camera
                footage. Our accident reconstruction experts analyze cyclist visibility, speed, and
                positioning to prove the driver was 100% at fault.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">
                What if the driver claims they didn&apos;t see me?
              </h3>
              <p className="text-gray-700">
                &quot;I didn\&apos;t see the cyclist&quot; isn&apos;t a valid defense. Drivers have a duty to
                watch for all road users, including cyclists. We prove the driver failed to maintain
                proper lookout and violated their duty of care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Office Locations */}
      <section className="py-16 bg-gradient-to-br from-[#001845] to-[#003875] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Get Justice After Your Bicycle Accident</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Cyclists have rights on NC roads. Don&apos;t let insurance companies blame you for a
            driver&apos;s negligence. We&apos;ll fight to overcome contributory negligence and get you
            maximum compensation.
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
              Serving Bicycle Accident Victims Across North Carolina
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
            serviceType: 'Personal Injury Bicycle Accidents Legal Services',
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
            url: 'https://www.vasquezlawfirm.com/practice-areas/personal-injury/bicycle-accidents/page',
            description:
              'Personal Injury Bicycle Accidents legal services in North Carolina. Free consultation. Se habla español.',
          }),
        }}
      />
    </div>
  );
}
