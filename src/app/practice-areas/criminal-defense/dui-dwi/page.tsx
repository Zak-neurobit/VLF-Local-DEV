import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { Phone, MapPin, ArrowRight, Car, Timer, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'DUI DWI Defense Lawyers NC & FL | Drunk Driving Attorney | Vasquez Law Firm',
  description:
    'Expert DUI DWI defense attorneys in Raleigh, Charlotte, Smithfield & Orlando. Aggressive defense for drunk driving, license restoration, DMV hearings.',
  keywords:
    'DUI lawyer, DWI attorney, drunk driving defense, license restoration, DMV hearing, breathalyzer, field sobriety, criminal defense, Raleigh NC, Charlotte NC, Orlando FL',
  openGraph: {
    title: 'DUI DWI Defense Lawyers | Drunk Driving Attorney | Vasquez Law Firm',
    description: 'Expert DUI DWI defense attorneys fighting to protect your license and freedom.',
    type: 'website',
    images: [
      {
        url: '/images/dui-dwi-defense-lawyers.jpg',
        width: 1200,
        height: 630,
        alt: 'DUI DWI Defense Lawyers',
      },
    ],
  },
};

export default function DuiDwiPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="text-sm">
            <Link href="/" className="text-burgundy-700 hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/practice-areas" className="text-burgundy-700 hover:underline">
              Practice Areas
            </Link>
            <span className="mx-2">/</span>
            <Link
              href="/practice-areas/criminal-defense"
              className="text-burgundy-700 hover:underline"
            >
              Criminal Defense
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-600">DUI/DWI Defense</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-burgundy-700 to-burgundy-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">DUI/DWI Defense Lawyers</h1>
            <p className="text-xl md:text-2xl mb-8 text-gold-400 font-semibold">
              YO PELEO POR TI™ - I FIGHT FOR YOU
            </p>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Arrested for DUI or DWI? Your license, freedom, and future are at risk. Our
              experienced DUI defense attorneys know how to challenge evidence, protect your rights,
              and fight for the best possible outcome in your case.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-gold-500 text-burgundy-900 font-bold rounded-full hover:bg-gold-400 transition-colors"
              >
                Free DUI Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="tel:1-844-967-3536"
                className="inline-flex items-center px-8 py-4 bg-white text-burgundy-900 font-bold rounded-full hover:bg-gray-100 transition-colors"
              >
                <Phone className="mr-2 w-5 h-5" />
                1-844-YO-PELEO
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Critical Timeline Section */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-orange-100 border-l-4 border-orange-500 p-6 mb-8">
              <div className="flex items-center mb-4">
                <Timer className="w-8 h-8 text-orange-600 mr-3" />
                <h2 className="text-2xl font-bold text-orange-800">
                  Critical DUI/DWI Deadlines - Act Now!
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-orange-800 mb-2">
                    License Suspension Timeline:
                  </h3>
                  <ul className="text-orange-700 space-y-1">
                    <li>
                      ✓ <strong>10 days</strong> to request DMV hearing (NC)
                    </li>
                    <li>
                      ✓ <strong>10 days</strong> to request hearing (FL)
                    </li>
                    <li>
                      ✓ <strong>30 days</strong> automatic suspension begins
                    </li>
                    <li>✓ Limited driving privileges available</li>
                    <li>✓ Ignition interlock may be required</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-orange-800 mb-2">
                    Immediate Actions Required:
                  </h3>
                  <ul className="text-orange-700 space-y-1">
                    <li>• Request DMV/DHSMV hearing NOW</li>
                    <li>• Preserve all evidence</li>
                    <li>• Document the traffic stop</li>
                    <li>• List potential witnesses</li>
                    <li>• Hire experienced DUI attorney</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Understanding DUI/DWI Laws in NC and FL
                </h2>
                <p className="text-gray-700 mb-6">
                  DUI (Driving Under the Influence) and DWI (Driving While Impaired) are serious
                  criminal charges that can dramatically impact your life. Both North Carolina and
                  Florida have strict laws and harsh penalties for impaired driving.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-blue-800 mb-3">North Carolina DWI</h3>
                    <ul className="text-blue-700 space-y-2">
                      <li>• BAC limit: 0.08% (0.04% commercial)</li>
                      <li>• Zero tolerance under 21: Any BAC</li>
                      <li>• Implied consent law</li>
                      <li>• Mandatory license revocation</li>
                      <li>• 5 levels of DWI severity</li>
                      <li>• Aggravating factors increase penalties</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-green-800 mb-3">Florida DUI</h3>
                    <ul className="text-green-700 space-y-2">
                      <li>• BAC limit: 0.08% (0.04% commercial)</li>
                      <li>• Enhanced penalties: 0.15% BAC</li>
                      <li>• Zero tolerance under 21: 0.02% BAC</li>
                      <li>• Administrative suspension</li>
                      <li>• Mandatory DUI school</li>
                      <li>• 10-year lookback period</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  DUI/DWI Penalties You Face
                </h2>
                <p className="text-gray-700 mb-6">
                  The consequences of a DUI conviction extend far beyond fines and possible jail
                  time:
                </p>

                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-red-500">
                    <h3 className="text-xl font-bold text-red-800 mb-3">First Offense DUI/DWI</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-bold text-red-700 mb-2">Criminal Penalties:</h4>
                        <ul className="text-gray-700 space-y-1">
                          <li>• Up to 60 days jail (NC)</li>
                          <li>• Up to 6 months jail (FL)</li>
                          <li>• Fines $200-$4,000</li>
                          <li>• Community service</li>
                          <li>• Probation supervision</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-red-700 mb-2">License Consequences:</h4>
                        <ul className="text-gray-700 space-y-1">
                          <li>• 1 year revocation (NC)</li>
                          <li>• 6-12 months suspension (FL)</li>
                          <li>• Limited driving privileges</li>
                          <li>• Ignition interlock device</li>
                          <li>• SR-22 insurance required</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-orange-500">
                    <h3 className="text-xl font-bold text-orange-800 mb-3">
                      Second Offense DUI/DWI
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-bold text-orange-700 mb-2">Enhanced Penalties:</h4>
                        <ul className="text-gray-700 space-y-1">
                          <li>• Mandatory jail time</li>
                          <li>• 4 year revocation (NC)</li>
                          <li>• 5 year suspension (FL)</li>
                          <li>• Vehicle immobilization</li>
                          <li>• Mandatory treatment</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-orange-700 mb-2">Long-term Impact:</h4>
                        <ul className="text-gray-700 space-y-1">
                          <li>• Felony charges possible</li>
                          <li>• Employment difficulties</li>
                          <li>• Professional license issues</li>
                          <li>• Immigration consequences</li>
                          <li>• Permanent record</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-purple-500">
                    <h3 className="text-xl font-bold text-purple-800 mb-3">Aggravating Factors</h3>
                    <p className="text-gray-700 mb-2">
                      These factors significantly increase penalties:
                    </p>
                    <ul className="text-gray-700 space-y-1">
                      <li>• BAC of 0.15% or higher</li>
                      <li>• Accident causing injury or property damage</li>
                      <li>• Child passenger under 18</li>
                      <li>• Driving on suspended license</li>
                      <li>• Speeding to elude arrest</li>
                      <li>• Prior DUI convictions</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  How We Challenge DUI/DWI Evidence
                </h2>
                <p className="text-gray-700 mb-6">
                  DUI cases rely heavily on technical evidence that can be challenged. Our attorneys
                  know how to identify weaknesses and fight the charges:
                </p>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Traffic Stop Validity
                      </h3>
                      <p className="text-gray-700">
                        Police must have reasonable suspicion to stop your vehicle. We examine
                        dashcam footage, police reports, and witness statements to challenge illegal
                        stops.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Field Sobriety Tests
                      </h3>
                      <p className="text-gray-700">
                        Standardized tests are often improperly administered. Medical conditions,
                        footwear, road conditions, and nervousness can all affect performance.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Breathalyzer Accuracy
                      </h3>
                      <p className="text-gray-700">
                        Breath test machines require proper calibration and maintenance. We obtain
                        maintenance records and challenge results affected by medical conditions or
                        improper procedures.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Blood Test Issues
                      </h3>
                      <p className="text-gray-700">
                        Chain of custody, storage conditions, lab procedures, and fermentation can
                        all affect blood test reliability. We scrutinize every aspect of blood
                        evidence.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      5
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Constitutional Violations
                      </h3>
                      <p className="text-gray-700">
                        Miranda rights, illegal searches, and due process violations can lead to
                        evidence suppression and case dismissal.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  License Restoration & DMV Hearings
                </h2>
                <p className="text-gray-700 mb-6">
                  Your driver&apos;s license is crucial for work and daily life. We fight to protect
                  your driving privileges:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white border-2 border-burgundy-200 p-6 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <FileText className="w-6 h-6 text-burgundy-700 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold text-burgundy-900 mb-3">
                          Administrative Hearings
                        </h3>
                        <ul className="text-gray-700 space-y-1">
                          <li>• Challenge license suspension</li>
                          <li>• Request limited driving privileges</li>
                          <li>• Work/school driving permits</li>
                          <li>• Ignition interlock alternatives</li>
                          <li>• Hardship license applications</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border-2 border-burgundy-200 p-6 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Car className="w-6 h-6 text-burgundy-700 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold text-burgundy-900 mb-3">
                          Restoration Process
                        </h3>
                        <ul className="text-gray-700 space-y-1">
                          <li>• DUI school completion</li>
                          <li>• Substance abuse evaluation</li>
                          <li>• Treatment compliance</li>
                          <li>• SR-22 insurance filing</li>
                          <li>• Reinstatement requirements</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Why Choose Vasquez Law Firm for DUI Defense?
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-burgundy-900 mb-4">
                      Technical Expertise
                    </h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Certified in field sobriety testing</li>
                      <li>• Breathalyzer operation knowledge</li>
                      <li>• Blood test analysis experience</li>
                      <li>• DMV hearing specialists</li>
                      <li>• Trial-tested attorneys</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-burgundy-900 mb-4">
                      Comprehensive Defense
                    </h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• 24/7 emergency consultation</li>
                      <li>• Aggressive evidence challenges</li>
                      <li>• License protection strategies</li>
                      <li>• Alternative sentencing options</li>
                      <li>• Post-conviction relief</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      Should I refuse the breathalyzer test?
                    </h3>
                    <p className="text-gray-700">
                      Refusal has serious consequences including automatic license suspension and
                      can be used against you in court. However, every situation is unique. Call us
                      immediately for guidance on your specific case.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      Can I get a DUI if I wasn&apos;t driving?
                    </h3>
                    <p className="text-gray-700">
                      Yes. Being in &quot;actual physical control&quot; of a vehicle while impaired can lead
                      to DUI charges, even if the car wasn&apos;t moving. This includes sitting in
                      the driver&apos;s seat with keys accessible.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      Will I lose my job over a DUI?
                    </h3>
                    <p className="text-gray-700">
                      It depends on your profession and employer policies. CDL holders, healthcare
                      workers, and those requiring security clearances face heightened risks. We
                      work to minimize employment impacts.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      Can DUI charges be reduced or dismissed?
                    </h3>
                    <p className="text-gray-700">
                      Yes. Through careful examination of evidence, procedural errors, and
                      negotiations, charges can often be reduced to reckless driving or dismissed
                      entirely. Every case requires thorough investigation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-burgundy-900 mb-4">
              Arrested for DUI? Time is Critical
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              You have only 10 days to protect your license. Don&apos;t face DUI charges alone - the
              consequences are too severe. Our experienced DUI attorneys know how to challenge
              evidence and protect your rights. Call now for immediate help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-burgundy-700 text-white font-bold rounded-full hover:bg-burgundy-800 transition-colors"
              >
                Get 24/7 DUI Help Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="tel:1-844-967-3536"
                className="inline-flex items-center px-8 py-4 bg-gold-500 text-burgundy-900 font-bold rounded-full hover:bg-gold-400 transition-colors"
              >
                <Phone className="mr-2 w-5 h-5" />
                Call: 1-844-YO-PELEO
              </a>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <MapPin className="w-6 h-6 text-burgundy-700 mx-auto mb-2" />
                <p className="text-sm font-medium">Raleigh, NC</p>
                <p className="text-xs text-gray-600">(919) 246-8831</p>
              </div>
              <div>
                <MapPin className="w-6 h-6 text-burgundy-700 mx-auto mb-2" />
                <p className="text-sm font-medium">Charlotte, NC</p>
                <p className="text-xs text-gray-600">(704) 266-2998</p>
              </div>
              <div>
                <MapPin className="w-6 h-6 text-burgundy-700 mx-auto mb-2" />
                <p className="text-sm font-medium">Smithfield, NC</p>
                <p className="text-xs text-gray-600">(919) 209-8788</p>
              </div>
              <div>
                <MapPin className="w-6 h-6 text-burgundy-700 mx-auto mb-2" />
                <p className="text-sm font-medium">Orlando, FL</p>
                <p className="text-xs text-gray-600">(407) 647-1900</p>
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
            serviceType: 'Criminal Defense Dui Dwi Legal Services',
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
            url: 'https://www.vasquezlawfirm.com/practice-areas/criminal-defense/dui-dwi/page',
            description:
              'Criminal Defense Dui Dwi legal services in North Carolina. Free consultation. Se habla español.',
          }),
        }}
      />
    </div>
  );
}
