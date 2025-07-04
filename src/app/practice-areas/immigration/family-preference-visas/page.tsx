import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { Phone, MapPin, ArrowRight, Users, Heart, Calendar, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Family Preference Visas Immigration Lawyers NC & FL | Vasquez Law Firm',
  description:
    'Expert family preference visa attorneys in Raleigh, Charlotte, Smithfield & Orlando. Help with F1, F2A, F2B, F3, F4 family immigration cases. Reunite with relatives in the US.',
  keywords: [
    'family preference visa',
    'F1 visa',
    'F2A visa',
    'F2B visa',
    'F3 visa',
    'F4 visa',
    'family immigration',
    'visa bulletin',
    'priority date',
    'immigration lawyer',
    'Raleigh NC',
    'Charlotte NC',
    'Orlando FL',
  ],
  openGraph: {
    title: 'Family Preference Visas Immigration Lawyers | Vasquez Law Firm',
    description:
      'Expert family preference visa attorneys helping families reunite through the immigration preference system.',
    type: 'website',
    images: [
      {
        url: '/images/family-preference-visa-lawyers.jpg',
        width: 1200,
        height: 630,
        alt: 'Family Preference Visas Immigration Lawyers',
      },
    ],
  },
};

export default function FamilyPreferenceVisasPage() {
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
            <Link href="/practice-areas/immigration" className="text-burgundy-700 hover:underline">
              Immigration
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-600">Family Preference Visas</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-burgundy-700 to-burgundy-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Family Preference Visas</h1>
            <p className="text-xl md:text-2xl mb-8 text-gold-400 font-semibold">
              YO PELEO POR TI™ - I FIGHT FOR YOU
            </p>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Reunite with your extended family members through the family preference visa system.
              Our experienced immigration attorneys help navigate the complex priority date system
              and lengthy wait times.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-gold-500 text-burgundy-900 font-bold rounded-full hover:bg-gold-400 transition-colors"
              >
                Free Family Consultation
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

      {/* Visa Bulletin Section */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-orange-100 border-l-4 border-orange-500 p-6 mb-8">
              <div className="flex items-center mb-4">
                <Calendar className="w-8 h-8 text-orange-600 mr-3" />
                <h2 className="text-2xl font-bold text-orange-800">
                  Understanding Priority Dates & Wait Times
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-orange-800 mb-2">
                    How Priority Dates Work:
                  </h3>
                  <ul className="text-orange-700 space-y-1">
                    <li>✓ Filed I-130 petition establishes priority date</li>
                    <li>✓ Monthly visa bulletin shows current dates</li>
                    <li>✓ Wait for your priority date to become current</li>
                    <li>✓ Then apply for green card or immigrant visa</li>
                    <li>✓ Country of birth affects wait times</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-orange-800 mb-2">
                    Current Approximate Wait Times:
                  </h3>
                  <ul className="text-orange-700 space-y-1">
                    <li>• F1 (unmarried children): 7-22+ years</li>
                    <li>• F2A (spouses/children of LPRs): 2-3 years</li>
                    <li>• F2B (unmarried children 21+): 7-14+ years</li>
                    <li>• F3 (married children): 8-22+ years</li>
                    <li>• F4 (siblings): 13-23+ years</li>
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
                  Family Preference Categories Explained
                </h2>
                <p className="text-gray-700 mb-6">
                  Family preference visas allow U.S. citizens and permanent residents to sponsor
                  certain family members for immigration. Unlike immediate relatives, these
                  categories have annual numerical limits and require waiting for priority dates to
                  become current.
                </p>

                <div className="grid gap-6 mb-8">
                  <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                    <div className="flex items-start space-x-4">
                      <Users className="w-8 h-8 text-blue-600 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold text-blue-800 mb-2">
                          F1: Unmarried Sons & Daughters of U.S. Citizens
                        </h3>
                        <p className="text-blue-700 mb-3">
                          For unmarried children of U.S. citizens who are 21 years of age or older.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-bold text-blue-800 mb-2">Who Qualifies:</h4>
                            <ul className="text-blue-700 text-sm space-y-1">
                              <li>• Unmarried child of U.S. citizen</li>
                              <li>• 21 years of age or older</li>
                              <li>• Biological, adopted, or step-child</li>
                              <li>• Never been married</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-bold text-blue-800 mb-2">Important Notes:</h4>
                            <ul className="text-blue-700 text-sm space-y-1">
                              <li>• Marriage disqualifies beneficiary</li>
                              <li>• Can convert from immediate relative status</li>
                              <li>• Longer wait times from certain countries</li>
                              <li>• Priority date retention may apply</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                    <div className="flex items-start space-x-4">
                      <Heart className="w-8 h-8 text-green-600 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold text-green-800 mb-2">
                          F2A: Spouses & Unmarried Children of Permanent Residents
                        </h3>
                        <p className="text-green-700 mb-3">
                          For spouses and unmarried children (under 21) of lawful permanent
                          residents.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-bold text-green-800 mb-2">F2A Beneficiaries:</h4>
                            <ul className="text-green-700 text-sm space-y-1">
                              <li>• Spouse of permanent resident</li>
                              <li>• Unmarried child under 21 of LPR</li>
                              <li>• Step-children (marriage before age 18)</li>
                              <li>• Adopted children (certain requirements)</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-bold text-green-800 mb-2">
                              Processing Advantages:
                            </h4>
                            <ul className="text-green-700 text-sm space-y-1">
                              <li>• Often current or shorter wait times</li>
                              <li>• Can upgrade if petitioner naturalizes</li>
                              <li>• Child Status Protection Act may apply</li>
                              <li>• May be able to adjust status in U.S.</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                    <div className="flex items-start space-x-4">
                      <FileText className="w-8 h-8 text-purple-600 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold text-purple-800 mb-2">
                          F2B: Unmarried Children 21+ of Permanent Residents
                        </h3>
                        <p className="text-purple-700 mb-3">
                          For unmarried sons and daughters (21 or older) of lawful permanent
                          residents.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-bold text-purple-800 mb-2">Conversion from F2A:</h4>
                            <ul className="text-purple-700 text-sm space-y-1">
                              <li>• Child ages out from F2A category</li>
                              <li>• CSPA may protect some children</li>
                              <li>• Automatic conversion maintains priority date</li>
                              <li>• Significantly longer wait times</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-bold text-purple-800 mb-2">
                              Strategic Considerations:
                            </h4>
                            <ul className="text-purple-700 text-sm space-y-1">
                              <li>• Monitor petitioner's naturalization eligibility</li>
                              <li>• Consider derivative benefits for children</li>
                              <li>• Plan for extended separation periods</li>
                              <li>• Maintain contact and documentation</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
                    <div className="flex items-start space-x-4">
                      <Users className="w-8 h-8 text-yellow-600 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold text-yellow-800 mb-2">
                          F3: Married Sons & Daughters of U.S. Citizens
                        </h3>
                        <p className="text-yellow-700 mb-3">
                          For married children of U.S. citizens, including their spouses and
                          unmarried children.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-bold text-yellow-800 mb-2">
                              Principal Beneficiary:
                            </h4>
                            <ul className="text-yellow-700 text-sm space-y-1">
                              <li>• Married child of U.S. citizen</li>
                              <li>• Any age (21 or older typically)</li>
                              <li>• Biological, adopted, or step-child</li>
                              <li>• Currently married status required</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-bold text-yellow-800 mb-2">
                              Derivative Beneficiaries:
                            </h4>
                            <ul className="text-yellow-700 text-sm space-y-1">
                              <li>• Spouse of principal beneficiary</li>
                              <li>• Unmarried children under 21</li>
                              <li>• All immigrate together when current</li>
                              <li>• Family unity maintained through process</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                    <div className="flex items-start space-x-4">
                      <Heart className="w-8 h-8 text-red-600 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold text-red-800 mb-2">
                          F4: Brothers & Sisters of U.S. Citizens
                        </h3>
                        <p className="text-red-700 mb-3">
                          For brothers and sisters of U.S. citizens, including their spouses and
                          unmarried children.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-bold text-red-800 mb-2">
                              Relationship Requirements:
                            </h4>
                            <ul className="text-red-700 text-sm space-y-1">
                              <li>• U.S. citizen must be 21 or older</li>
                              <li>• Brother/sister of U.S. citizen</li>
                              <li>• Half-siblings qualify with one common parent</li>
                              <li>• Step-siblings (parents married before age 18)</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-bold text-red-800 mb-2">Longest Wait Times:</h4>
                            <ul className="text-red-700 text-sm space-y-1">
                              <li>• 13-24+ year wait times typical</li>
                              <li>• Consider filing early to establish priority date</li>
                              <li>• Include spouse and children in petition</li>
                              <li>• Monitor age-out protections for children</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  The Family Preference Process
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        File Form I-130 Petition
                      </h3>
                      <p className="text-gray-700">
                        U.S. citizen or permanent resident files I-130 to establish the qualifying
                        family relationship and create a priority date.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Wait for Priority Date
                      </h3>
                      <p className="text-gray-700">
                        Monitor monthly visa bulletin and wait for your priority date to become
                        current in your preference category.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        National Visa Center Processing
                      </h3>
                      <p className="text-gray-700">
                        Submit documents and complete affidavit of support processing through the
                        National Visa Center.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">Final Processing</h3>
                      <p className="text-gray-700">
                        Complete adjustment of status (if in U.S.) or consular processing (if
                        abroad) for permanent residence.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mt-8">
                  <h3 className="text-xl font-bold text-blue-800 mb-2">
                    Strategic Timing Considerations:
                  </h3>
                  <ul className="text-blue-700 space-y-2">
                    <li>• File I-130 as early as possible to establish priority date</li>
                    <li>
                      • Monitor petitioner's eligibility for naturalization (can upgrade category)
                    </li>
                    <li>• Consider derivative beneficiary age-out protection</li>
                    <li>• Maintain contact and update address with USCIS/NVC</li>
                    <li>• Plan for multi-year separation and maintain family relationships</li>
                  </ul>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Age-Out Protection & Special Considerations
                </h2>
                <p className="text-gray-700 mb-6">
                  The Child Status Protection Act (CSPA) provides important protections for children
                  who may age out during the long preference waiting periods.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-green-800 mb-3">
                      CSPA Protection for Preference Categories
                    </h3>
                    <ul className="text-green-700 space-y-2">
                      <li>• Age is locked when priority date becomes current</li>
                      <li>• Subtract processing time from actual age</li>
                      <li>• Must seek to acquire permanent residence within one year</li>
                      <li>• Applies to F2A aging out to F2B</li>
                      <li>• Protects derivative children in F3/F4 cases</li>
                    </ul>
                  </div>

                  <div className="bg-orange-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-orange-800 mb-3">
                      Priority Date Retention
                    </h3>
                    <ul className="text-orange-700 space-y-2">
                      <li>• Child may retain earlier priority date when aging out</li>
                      <li>• Automatic conversion between preference categories</li>
                      <li>• F1 to F3 when beneficiary marries</li>
                      <li>• F2A to F2B when child ages out</li>
                      <li>• Strategic marriage timing considerations</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Why Choose Vasquez Law Firm for Family Preference Cases?
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-burgundy-900 mb-4">
                      Long-Term Family Strategy
                    </h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Multi-generational immigration planning</li>
                      <li>• Priority date optimization strategies</li>
                      <li>• Family unity preservation throughout process</li>
                      <li>• Proactive case monitoring and updates</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-burgundy-900 mb-4">
                      Experienced Guidance
                    </h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Decades of family immigration experience</li>
                      <li>• Complex relationship documentation</li>
                      <li>• Age-out protection expertise</li>
                      <li>• Ongoing support throughout waiting periods</li>
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
                      Can I travel to the U.S. while waiting for my preference visa?
                    </h3>
                    <p className="text-gray-700">
                      Having a pending I-130 petition may affect your ability to obtain visitor
                      visas, as it shows immigrant intent. However, each case is evaluated
                      individually based on your specific circumstances.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      What happens if the petitioner dies while my case is pending?
                    </h3>
                    <p className="text-gray-700">
                      In many cases, the petition can be reinstated through humanitarian
                      reinstatement or if the beneficiary is eligible for other protections. Each
                      situation requires individual analysis.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      Should I file an I-130 even if the wait time is very long?
                    </h3>
                    <p className="text-gray-700">
                      Yes, filing early establishes your priority date. Immigration laws can change,
                      processing times can improve, and having an early priority date provides more
                      options for your family&apos;s future.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      Can my case be upgraded to a faster category?
                    </h3>
                    <p className="text-gray-700">
                      Yes, if the petitioner naturalizes, becomes a permanent resident, or if your
                      relationship status changes (like marriage or divorce), your case may move to
                      a different, potentially faster category.
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
              Start Your Family's Immigration Journey Today
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Don't let long wait times discourage you. The sooner you file, the sooner your family
              can be together. Our experienced family immigration attorneys are here to guide you
              through every step.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-burgundy-700 text-white font-bold rounded-full hover:bg-burgundy-800 transition-colors"
              >
                Start Family Petition Today
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
            serviceType: 'Immigration Family Preference Visas Legal Services',
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
            url: 'https://www.vasquezlawfirm.com/practice-areas/immigration/family-preference-visas/page',
            description:
              'Immigration Family Preference Visas legal services in North Carolina. Free consultation. Se habla español.',
          }),
        }}
      />
    </div>
  );
}
