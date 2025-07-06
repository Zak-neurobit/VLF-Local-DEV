import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'NC Traffic Ticket Lawyer | Speeding & Moving Violations Attorney',
  description:
    'Fight traffic tickets in North Carolina. Our attorneys handle speeding, reckless driving, license issues, and CDL violations. Save your license and insurance rates.',
  keywords: [
    'traffic ticket lawyer NC',
    'North Carolina speeding ticket attorney',
    'reckless driving lawyer NC',
    'CDL traffic violation attorney',
    'license restoration lawyer Charlotte',
    'traffic court attorney Raleigh',
    'moving violation lawyer NC',
    'speeding ticket defense',
    'abogado multas trafico NC',
    'North Carolina DMV attorney',
  ],
  openGraph: {
    title: 'NC Traffic Ticket & Moving Violations Lawyer',
    description:
      "Don't just pay that ticket! We fight traffic violations to protect your license, insurance rates, and driving record.",
    images: [
      {
        url: '/images/traffic-offenses-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'North Carolina Traffic Violations Attorney',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawfirm.com/practice-areas/criminal-defense/traffic-offenses',
    languages: {
      es: 'https://www.vasquezlawfirm.com/es/areas-de-practica/defensa-criminal/infracciones-trafico',
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

export default function TrafficOffensesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#001845] to-[#003875] text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              North Carolina Traffic Ticket Lawyer
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-[#FF6B6B] mb-6">
              YO PELEO POR TI™
            </p>
            <p className="text-xl mb-8 text-gray-100">
              Don&apos;t just pay that ticket! Traffic violations can cost you thousands in insurance
              increases, license points, and even jail time. We fight to dismiss or reduce charges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-block bg-[#FF6B6B] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#FF5252] transition-colors text-center"
              >
                Fight Your Ticket
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

      {/* Why Fight Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why You Should Never Just Pay a Traffic Ticket
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-4xl font-bold text-[#FF6B6B] mb-2">45%</p>
              <p className="text-gray-700">Average insurance increase</p>
              <p className="text-sm text-gray-500 mt-2">For just one speeding ticket</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-4xl font-bold text-[#FF6B6B] mb-2">$4,500</p>
              <p className="text-gray-700">3-year insurance cost</p>
              <p className="text-sm text-gray-500 mt-2">From a single violation</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-4xl font-bold text-[#FF6B6B] mb-2">12 points</p>
              <p className="text-gray-700">License suspension threshold</p>
              <p className="text-sm text-gray-500 mt-2">In 3 years - easier than you think</p>
            </div>
          </div>
        </div>
      </section>

      {/* NC Point System Alert */}
      <section className="py-16 bg-[#001845] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              ⚠️ North Carolina&apos;s Dual Point System Can Trap You
            </h2>
            <p className="text-xl mb-8">
              NC has TWO point systems - DMV points that suspend your license AND insurance points
              that skyrocket your rates. One ticket can impact both!
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">DMV Points</h3>
                <ul className="space-y-2 text-left">
                  <li>• Speeding over 55: 3 points</li>
                  <li>• Reckless driving: 4 points</li>
                  <li>• Passing stopped bus: 5 points</li>
                  <li>• 12 points = suspended license</li>
                </ul>
              </div>
              <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Insurance Points</h3>
                <ul className="space-y-2 text-left">
                  <li>• 10+ over limit: 1 point = 30% increase</li>
                  <li>• 10+ over 55mph: 2 points = 45% increase</li>
                  <li>• Reckless: 4 points = 80% increase</li>
                  <li>• Points last 3 years!</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Traffic Violations */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Traffic Violations We Handle
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#003875]">
              <h3 className="text-xl font-semibold mb-3">Speeding Tickets</h3>
              <p className="text-gray-700">
                All speeds including 15+ over, school zones, work zones, and interstate speeding.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#003875]">
              <h3 className="text-xl font-semibold mb-3">Reckless Driving</h3>
              <p className="text-gray-700">
                Criminal charge with jail potential. Often reduced from high speed or aggressive
                driving.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#003875]">
              <h3 className="text-xl font-semibold mb-3">License Issues</h3>
              <p className="text-gray-700">
                Driving while license revoked (DWLR), no operator&apos;s license, expired license.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#003875]">
              <h3 className="text-xl font-semibold mb-3">CDL Violations</h3>
              <p className="text-gray-700">
                Commercial drivers need special protection. Any violation threatens your livelihood.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#003875]">
              <h3 className="text-xl font-semibold mb-3">Equipment Violations</h3>
              <p className="text-gray-700">
                Window tint, exhaust, lights, registration, inspection violations.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#003875]">
              <h3 className="text-xl font-semibold mb-3">Moving Violations</h3>
              <p className="text-gray-700">
                Running red lights/stop signs, improper lane change, following too closely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Serious Traffic Offenses Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Serious Traffic Charges That Need Immediate Help
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">
                Criminal Traffic Offenses
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>
                    <strong>Hit and Run:</strong> Leaving accident scene - felony if injury/death
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>
                    <strong>Racing/Speed Competition:</strong> Misdemeanor with license revocation
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>
                    <strong>Fleeing to Elude:</strong> Running from police - felony charges possible
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>
                    <strong>Death by Vehicle:</strong> Fatal accidents with traffic violations
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">
                License Threatening Violations
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>
                    <strong>DWLR:</strong> Driving while license revoked - possible jail time
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>
                    <strong>School Bus Violations:</strong> Passing stopped bus - 5 DMV points
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>
                    <strong>Two 25+ MPH Tickets:</strong> Automatic revocation for 30 days
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B6B] mr-2">•</span>
                  <div>
                    <strong>PJC Violations:</strong> Using prayer for judgment unwisely
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 bg-red-50 p-6 rounded-lg border-l-4 border-red-400">
            <p className="text-lg font-semibold mb-2">🚨 Don&apos;t Wait - Court Dates Approach Fast</p>
            <p className="text-gray-700">
              Missing your court date results in automatic guilt and license suspension. Contact us
              immediately to protect your rights and driving privileges.
            </p>
          </div>
        </div>
      </section>

      {/* Defense Strategies Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How We Fight Your Traffic Tickets
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#001845]">Technical Defenses</h3>
              <p className="text-gray-700">
                Challenging radar/laser calibration, officer training, speed limit posting, and
                proper traffic control devices. One technical error can dismiss your case.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#001845]">Negotiated Reductions</h3>
              <p className="text-gray-700">
                Reducing moving violations to non-moving equipment violations, improper equipment,
                or lesser speeds that don&apos;t impact insurance.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#001845]">
                Prayer for Judgment (PJC)
              </h3>
              <p className="text-gray-700">
                Strategic use of NC&apos;s unique PJC to avoid points - but must be used carefully as you
                only get limited PJCs.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#001845]">Trial Defense</h3>
              <p className="text-gray-700">
                When necessary, we take cases to trial. Officer no-shows, evidence problems, and
                constitutional violations can win at trial.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#001845]">Driving School Options</h3>
              <p className="text-gray-700">
                Some jurisdictions allow driving school for dismissal. We know which courts offer
                this option and guide you through.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CDL Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            CDL Drivers Need Special Protection
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">
                Commercial Driver&apos;s License at Risk?
              </h3>
              <p className="text-gray-700 mb-4">
                CDL holders face harsher consequences for any traffic violation - even in personal
                vehicles. Your livelihood depends on keeping your CDL clean.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">CDL Disqualifications:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Two serious violations = 60-day CDL suspension</li>
                    <li>• Three violations = 120-day suspension</li>
                    <li>• Any DWI = 1-year disqualification</li>
                    <li>• Railroad crossing violations</li>
                    <li>• Using phone while driving CMV</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">We Protect CDLs By:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Fighting for complete dismissals</li>
                    <li>• Avoiding &quot;serious&quot; violation convictions</li>
                    <li>• Negotiating non-CDL impacting resolutions</li>
                    <li>• Preventing point accumulation</li>
                    <li>• Protecting your DOT record</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400">
              <p className="text-lg font-semibold mb-2">
                ⚠️ CDL Holders Can&apos;t Use PJC or Take Defensive Driving
              </p>
              <p className="text-gray-700">
                Federal law prohibits CDL masking. You need an attorney who understands CDL-specific
                defenses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Out-of-State Drivers Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Out-of-State Driver? We Can Help
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">
                Got a Ticket While Visiting NC?
              </h3>
              <p className="text-gray-700 mb-4">
                Don&apos;t ignore it! NC will report convictions to your home state, affecting your
                license and insurance there. We handle your case without you returning to NC.
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Interstate Compact Consequences:</h4>
                  <p className="text-gray-700">
                    Most states share traffic conviction information. A NC ticket can add points to
                    your home state license and raise insurance everywhere.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">We Handle Everything Remotely:</h4>
                  <ul className="space-y-2 text-gray-700 mt-2">
                    <li>✓ Appear in court for you</li>
                    <li>✓ No need to return to NC</li>
                    <li>✓ Handle all paperwork</li>
                    <li>✓ Communicate results promptly</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Comparison Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Attorney Fees vs. True Cost of Traffic Tickets
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">The Math Is Clear</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-3">Just Paying the Ticket:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Court costs: $200-300</li>
                    <li>• Insurance increase: $150/month</li>
                    <li>• 3-year total: $5,400+</li>
                    <li>• License points remain</li>
                    <li>• Criminal record (some violations)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Hiring an Attorney:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Attorney fee: $150-500</li>
                    <li>• Reduced court costs: $150-250</li>
                    <li>• No insurance increase: $0</li>
                    <li>• Total saved: $4,500+</li>
                    <li>• Clean driving record</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                <p className="text-lg font-semibold">
                  ✅ Hiring an attorney pays for itself many times over!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Traffic Ticket FAQs</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">
                Should I just pay my speeding ticket online?
              </h3>
              <p className="text-gray-700">
                No! Paying online is an admission of guilt. You&apos;ll get DMV points, insurance points,
                and the conviction stays on your record. Always consult an attorney first - we often
                get better results than you expect.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">
                What is a Prayer for Judgment Continued (PJC)?
              </h3>
              <p className="text-gray-700">
                A PJC is when the judge doesn&apos;t enter judgment, avoiding DMV points. You can
                use one PJC per household every 3 years for insurance purposes, and two PJCs every 5
                years for DMV points. Use them wisely - we help strategize.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">
                Do I have to appear in court for a traffic ticket?
              </h3>
              <p className="text-gray-700">
                In most cases, your attorney can appear for you. This saves you time off work and
                travel. Some serious charges may require your appearance, but we&apos;ll advise you
                upfront.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">
                Can you guarantee my ticket will be dismissed?
              </h3>
              <p className="text-gray-700">
                No attorney can guarantee outcomes, but we have excellent success rates. Even when
                dismissal isn&apos;t possible, we often negotiate reductions that save your license
                and insurance rates.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">How long do points stay on my record?</h3>
              <p className="text-gray-700">
                DMV points stay for 3 years from the conviction date. Insurance points also last 3
                years but are calculated differently. The conviction itself stays on your record
                longer, which is why fighting tickets is so important.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Office Locations */}
      <section className="py-16 bg-gradient-to-br from-[#001845] to-[#003875] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Don&apos;t Let a Traffic Ticket Ruin Your Record</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            The cost of just paying a ticket far exceeds attorney fees. Protect your license,
            insurance rates, and driving record. Let us fight for the best possible outcome.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/contact"
              className="inline-block bg-[#FF6B6B] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#FF5252] transition-colors"
            >
              Fight Your Ticket Now
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
              Fighting Traffic Tickets Across North Carolina
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
            serviceType: 'Criminal Defense Traffic Offenses Legal Services',
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
            url: 'https://www.vasquezlawfirm.com/practice-areas/criminal-defense/traffic-offenses/page',
            description:
              'Criminal Defense Traffic Offenses legal services in North Carolina. Free consultation. Se habla español.',
          }),
        }}
      />
    </div>
  );
}
