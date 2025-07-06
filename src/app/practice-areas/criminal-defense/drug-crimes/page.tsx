import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { Phone, MapPin, ArrowRight, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Drug Crime Defense Lawyers NC & FL | Possession & Trafficking | Vasquez Law Firm',
  description:
    'Expert drug crime defense attorneys in Raleigh, Charlotte, Smithfield & Orlando. Possession, trafficking, manufacturing, distribution charges. Aggressive defense.',
  keywords:
    'drug crime lawyer, drug possession attorney, drug trafficking defense, controlled substance, narcotics attorney, marijuana lawyer, Raleigh NC, Charlotte NC, Orlando FL',
  openGraph: {
    title: 'Drug Crime Defense Lawyers | Possession & Trafficking | Vasquez Law Firm',
    description:
      'Expert drug crime defense attorneys fighting possession, trafficking, and distribution charges.',
    type: 'website',
    images: [
      {
        url: '/images/drug-crime-defense-lawyers.jpg',
        width: 1200,
        height: 630,
        alt: 'Drug Crime Defense Lawyers',
      },
    ],
  },
};

export default function DrugCrimesPage() {
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
            <span className="text-gray-600">Drug Crimes</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-burgundy-700 to-burgundy-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Drug Crime Defense Lawyers</h1>
            <p className="text-xl md:text-2xl mb-8 text-gold-400 font-semibold">
              YO PELEO POR TI™ - I FIGHT FOR YOU
            </p>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Drug charges can destroy your future with harsh mandatory sentences and lifelong
              consequences. Our experienced drug crime attorneys fight aggressively to protect your
              freedom, challenge evidence, and seek alternatives to conviction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-gold-500 text-burgundy-900 font-bold rounded-full hover:bg-gold-400 transition-colors"
              >
                Free Drug Defense Consultation
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

      {/* Urgent Warning Section */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-100 border-l-4 border-red-500 p-6 mb-8">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600 mr-3" />
                <h2 className="text-2xl font-bold text-red-800">
                  Drug Charges = Mandatory Prison Time
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-red-800 mb-2">Mandatory Minimums:</h3>
                  <ul className="text-red-700 space-y-1">
                    <li>✓ Trafficking: 25 months to life</li>
                    <li>✓ Sale near schools: Enhanced penalties</li>
                    <li>✓ Federal charges: 5-40 year minimums</li>
                    <li>✓ Prior convictions: Doubled sentences</li>
                    <li>✓ No parole in federal system</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-800 mb-2">Collateral Consequences:</h3>
                  <ul className="text-red-700 space-y-1">
                    <li>• Loss of federal student aid</li>
                    <li>• Professional license revocation</li>
                    <li>• Immigration deportation</li>
                    <li>• Public housing ban</li>
                    <li>• Employment barriers for life</li>
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
                  Drug Crime Classifications and Penalties
                </h2>
                <p className="text-gray-700 mb-6">
                  Drug charges vary dramatically based on the type of substance, amount, and alleged
                  activity. Understanding these distinctions is crucial for mounting an effective
                  defense.
                </p>

                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-green-500">
                    <h3 className="text-xl font-bold text-green-800 mb-3">Simple Possession</h3>
                    <p className="text-gray-700 mb-3">
                      <strong>Misdemeanor to Low-Level Felony</strong>
                    </p>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Personal use amounts only</li>
                      <li>• First offense: Possible diversion</li>
                      <li>• Marijuana: Decriminalized in some areas</li>
                      <li>• Hard drugs: Felony charges likely</li>
                      <li>• Drug court eligibility possible</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-yellow-500">
                    <h3 className="text-xl font-bold text-yellow-800 mb-3">
                      Possession with Intent to Distribute
                    </h3>
                    <p className="text-gray-700 mb-3">
                      <strong>Felony - Significant Prison Time</strong>
                    </p>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Based on quantity and packaging</li>
                      <li>• Presence of scales, baggies, cash</li>
                      <li>• Text messages about sales</li>
                      <li>• Multiple cell phones</li>
                      <li>• Prior sales convictions enhance</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-orange-500">
                    <h3 className="text-xl font-bold text-orange-800 mb-3">Drug Trafficking</h3>
                    <p className="text-gray-700 mb-3">
                      <strong>Mandatory Minimum Sentences</strong>
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-bold text-orange-700 mb-1">Cocaine/Crack:</h4>
                        <ul className="text-gray-700 text-sm space-y-1">
                          <li>• 28-200g: 25 months minimum</li>
                          <li>• 200-400g: 70 months minimum</li>
                          <li>• 400g+: 175 months minimum</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-orange-700 mb-1">Heroin/Fentanyl:</h4>
                        <ul className="text-gray-700 text-sm space-y-1">
                          <li>• 4-14g: 70 months minimum</li>
                          <li>• 14-28g: 90 months minimum</li>
                          <li>• 28g+: 225 months minimum</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-red-500">
                    <h3 className="text-xl font-bold text-red-800 mb-3">
                      Manufacturing/Cultivation
                    </h3>
                    <p className="text-gray-700 mb-3">
                      <strong>Serious Felony Charges</strong>
                    </p>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Meth labs: Extreme sentences</li>
                      <li>• Marijuana grow operations</li>
                      <li>• Prescription pill mills</li>
                      <li>• Chemical precursor possession</li>
                      <li>• Environmental crimes added</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-purple-500">
                    <h3 className="text-xl font-bold text-purple-800 mb-3">Federal Drug Crimes</h3>
                    <p className="text-gray-700 mb-3">
                      <strong>Most Severe Consequences</strong>
                    </p>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Interstate trafficking</li>
                      <li>• Large quantities</li>
                      <li>• Conspiracy charges</li>
                      <li>• RICO violations</li>
                      <li>• Money laundering</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Drug Schedules and Classifications
                </h2>
                <p className="text-gray-700 mb-6">
                  Both federal and state laws classify drugs into schedules based on potential for
                  abuse and medical use:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white border-2 border-burgundy-200 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-burgundy-900 mb-3">Schedule I & II</h3>
                    <p className="text-gray-700 mb-2 font-semibold">Most Serious Charges</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Heroin, LSD, Ecstasy</li>
                      <li>• Cocaine, Methamphetamine</li>
                      <li>• Fentanyl, Oxycodone</li>
                      <li>• Highest penalties</li>
                      <li>• Mandatory minimums apply</li>
                    </ul>
                  </div>

                  <div className="bg-white border-2 border-burgundy-200 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-burgundy-900 mb-3">Schedule III-V</h3>
                    <p className="text-gray-700 mb-2 font-semibold">Lesser but Still Serious</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Anabolic steroids</li>
                      <li>• Ketamine, Codeine</li>
                      <li>• Xanax, Valium</li>
                      <li>• Lower penalties</li>
                      <li>• Diversion possible</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mt-6">
                  <h3 className="text-xl font-bold text-blue-800 mb-2">Marijuana Status</h3>
                  <p className="text-blue-700">
                    Despite changing state laws, marijuana remains a Schedule I federal controlled
                    substance. State decriminalization doesn&apos;t protect against federal charges
                    or immigration consequences.
                  </p>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Powerful Drug Crime Defense Strategies
                </h2>
                <p className="text-gray-700 mb-6">
                  Drug cases often involve complex constitutional issues and scientific evidence.
                  Our defense strategies include:
                </p>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Fourth Amendment Violations
                      </h3>
                      <p className="text-gray-700">
                        Illegal searches and seizures are common in drug cases. We challenge traffic
                        stops, home searches, and warrantless arrests to suppress evidence.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Lack of Knowledge/Possession
                      </h3>
                      <p className="text-gray-700">
                        Proving you didn&apos;t know about the drugs or had no control over them.
                        Challenging constructive possession in vehicles and homes.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Lab Testing Errors
                      </h3>
                      <p className="text-gray-700">
                        Crime lab mistakes, contamination, and false positives. We demand
                        independent testing and challenge chain of custody.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Entrapment Defense
                      </h3>
                      <p className="text-gray-700">
                        When law enforcement induces someone to commit a crime they wouldn&apos;t
                        otherwise commit. Common in undercover operations.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      5
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Confidential Informant Issues
                      </h3>
                      <p className="text-gray-700">
                        Challenging reliability of informants, uncovering deals for testimony, and
                        exposing motivations to lie.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Alternative Sentencing & Treatment Options
                </h2>
                <p className="text-gray-700 mb-6">
                  Not every drug case must end in prison. We fight for alternatives that address
                  underlying issues:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-green-800 mb-3">Drug Court Programs</h3>
                    <ul className="text-green-700 space-y-2">
                      <li>• Intensive supervision</li>
                      <li>• Treatment instead of incarceration</li>
                      <li>• Regular drug testing</li>
                      <li>• Counseling and support</li>
                      <li>• Charges dismissed upon completion</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-blue-800 mb-3">
                      First Offender Programs
                    </h3>
                    <ul className="text-blue-700 space-y-2">
                      <li>• Deferred prosecution</li>
                      <li>• Community service</li>
                      <li>• Drug education classes</li>
                      <li>• Clean record if completed</li>
                      <li>• Avoid conviction consequences</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Federal vs. State Drug Charges
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">State Charges</h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Local law enforcement arrests</li>
                      <li>• State court proceedings</li>
                      <li>• Possibility of parole</li>
                      <li>• Drug court options</li>
                      <li>• More flexibility in sentencing</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Federal Charges</h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• DEA, FBI, ATF investigations</li>
                      <li>• Mandatory minimum sentences</li>
                      <li>• No parole in federal system</li>
                      <li>• Harsher sentencing guidelines</li>
                      <li>• Limited judge discretion</li>
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
                      Can police search my car if they smell marijuana?
                    </h3>
                    <p className="text-gray-700">
                      In many jurisdictions, the odor of marijuana alone can provide probable cause
                      for a vehicle search. However, we can still challenge the validity of the stop
                      and the officer&apos;s claimed observations.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      What if the drugs weren&apos;t mine?
                    </h3>
                    <p className="text-gray-700">
                      Constructive possession charges require proving you knew about the drugs and
                      had control over them. We fight these cases by showing lack of knowledge or
                      control, especially in shared spaces.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      Will I face federal charges?
                    </h3>
                    <p className="text-gray-700">
                      Federal charges typically involve large quantities, crossing state lines, or
                      federal property. Most drug cases stay in state court unless federal agencies
                      were involved in the investigation.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      Can I get drug charges expunged?
                    </h3>
                    <p className="text-gray-700">
                      Expungement eligibility varies by state and charge type. Many first-time
                      offenses can be expunged after completing probation. We structure plea deals
                      with future expungement in mind.
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
              Fight Drug Charges with Experienced Defense
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Drug convictions carry mandatory sentences and lifelong consequences. Don&apos;t face these
              charges alone. Our experienced drug crime attorneys know how to challenge evidence,
              negotiate alternatives, and protect your future. Contact us immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-burgundy-700 text-white font-bold rounded-full hover:bg-burgundy-800 transition-colors"
              >
                Get Aggressive Drug Defense
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
            serviceType: 'Criminal Defense Drug Crimes Legal Services',
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
            url: 'https://www.vasquezlawfirm.com/practice-areas/criminal-defense/drug-crimes/page',
            description:
              'Criminal Defense Drug Crimes legal services in North Carolina. Free consultation. Se habla español.',
          }),
        }}
      />
    </div>
  );
}
