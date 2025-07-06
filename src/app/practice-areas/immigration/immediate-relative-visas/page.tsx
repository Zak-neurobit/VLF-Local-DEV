import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { Phone, MapPin, ArrowRight, CheckCircle, Users, Heart, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Immediate Relative Visas Immigration Lawyers NC & FL | Vasquez Law Firm',
  description:
    'Expert immediate relative visa attorneys in Raleigh, Charlotte, Smithfield & Orlando. Help for spouses, parents, and children of U.S. citizens. No waiting period required.',
  keywords: [
    'immediate relative visa',
    'spouse visa',
    'parent visa',
    'child visa',
    'CR1 visa',
    'IR1 visa',
    'immigration lawyer',
    'Raleigh NC',
    'Charlotte NC',
    'Orlando FL',
    'family immigration',
  ],
  openGraph: {
    title: 'Immediate Relative Visas Immigration Lawyers | Vasquez Law Firm',
    description:
      'Expert immediate relative visa attorneys helping families reunite with no waiting periods.',
    type: 'website',
    images: [
      {
        url: '/images/immediate-relative-visa-lawyers.jpg',
        width: 1200,
        height: 630,
        alt: 'Immediate Relative Visa Immigration Lawyers',
      },
    ],
  },
};

export default function ImmediateRelativeVisasPage() {
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
            <span className="text-gray-600">Immediate Relative Visas</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-burgundy-700 to-burgundy-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Immediate Relative Visas</h1>
            <p className="text-xl md:text-2xl mb-8 text-gold-400 font-semibold">
              YO PELEO POR TI™ - I FIGHT FOR YOU
            </p>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Reunite with your closest family members through immediate relative visas. No waiting
              periods, no numerical limits - just expert legal guidance to bring your loved ones
              home safely.
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

      {/* Priority Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-green-100 border-l-4 border-green-500 p-6 mb-8">
              <div className="flex items-center mb-4">
                <Heart className="w-8 h-8 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-green-800">
                  Family Comes First - No Waiting Required
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-green-800 mb-2">
                    Immediate Relative Benefits:
                  </h3>
                  <ul className="text-green-700 space-y-1">
                    <li>✓ No waiting periods or quotas</li>
                    <li>✓ Unlimited number of visas per year</li>
                    <li>✓ Highest priority in immigration system</li>
                    <li>✓ Direct path to permanent residence</li>
                    <li>✓ Faster processing than other categories</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-green-800 mb-2">Who Qualifies:</h3>
                  <ul className="text-green-700 space-y-1">
                    <li>• Spouses of U.S. citizens</li>
                    <li>• Unmarried children under 21 of U.S. citizens</li>
                    <li>• Parents of U.S. citizens (if citizen is 21+)</li>
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
                  Understanding Immediate Relative Status
                </h2>
                <p className="text-gray-700 mb-6">
                  Immediate relatives are the closest family members of U.S. citizens and receive
                  the highest priority in the U.S. immigration system. Unlike other family-based
                  immigration categories, immediate relatives are not subject to numerical
                  limitations or waiting periods, meaning visas are always available.
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
                  <h3 className="text-xl font-bold text-blue-800 mb-2">
                    Key Advantages of Immediate Relative Status:
                  </h3>
                  <ul className="text-blue-700 space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-1" />
                      <span>
                        <strong>No Numerical Limits:</strong> Unlimited visas available each year
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-1" />
                      <span>
                        <strong>No Waiting Periods:</strong> Proceed immediately to visa processing
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-1" />
                      <span>
                        <strong>Highest Priority:</strong> Fastest processing in family immigration
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-1" />
                      <span>
                        <strong>Direct Path:</strong> Straight to permanent residence (green card)
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Types of Immediate Relative Visas
                </h2>
                <p className="text-gray-700 mb-6">
                  Each type of immediate relative visa has specific requirements and processes.
                  Understanding which category applies to your situation is essential for a
                  successful application.
                </p>

                <div className="grid gap-8 mb-8">
                  <div className="bg-pink-50 p-6 rounded-lg border-l-4 border-pink-500">
                    <div className="flex items-start space-x-4">
                      <Heart className="w-8 h-8 text-pink-600 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold text-pink-800 mb-2">
                          Spouse of U.S. Citizen (CR1/IR1)
                        </h3>
                        <p className="text-pink-700 mb-3">
                          For legally married spouses of U.S. citizens. CR1 for marriages under 2
                          years, IR1 for marriages over 2 years.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-bold text-pink-800 mb-2">Requirements:</h4>
                            <ul className="text-pink-700 text-sm space-y-1">
                              <li>• Valid marriage certificate</li>
                              <li>• Proof of U.S. citizenship</li>
                              <li>• Evidence of genuine marriage</li>
                              <li>• Financial support (Form I-864)</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-bold text-pink-800 mb-2">Common Evidence:</h4>
                            <ul className="text-pink-700 text-sm space-y-1">
                              <li>• Joint bank accounts</li>
                              <li>• Shared residence documents</li>
                              <li>• Photos together</li>
                              <li>• Communication records</li>
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
                          Child of U.S. Citizen (IR2)
                        </h3>
                        <p className="text-yellow-700 mb-3">
                          For unmarried children under 21 years old of U.S. citizens, including
                          biological, adopted, and step-children.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-bold text-yellow-800 mb-2">Eligibility:</h4>
                            <ul className="text-yellow-700 text-sm space-y-1">
                              <li>• Under 21 years old</li>
                              <li>• Unmarried</li>
                              <li>• Biological, adopted, or step-child</li>
                              <li>• Parent is U.S. citizen</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-bold text-yellow-800 mb-2">Required Documents:</h4>
                            <ul className="text-yellow-700 text-sm space-y-1">
                              <li>• Birth certificate showing parent-child relationship</li>
                              <li>• Parent&apos;s U.S. citizenship proof</li>
                              <li>• Child&apos;s passport and photos</li>
                              <li>• Adoption/legitimation docs if applicable</li>
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
                          Parent of U.S. Citizen (IR5)
                        </h3>
                        <p className="text-purple-700 mb-3">
                          For parents of U.S. citizens who are at least 21 years old. Both
                          biological and adoptive parents qualify.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-bold text-purple-800 mb-2">Requirements:</h4>
                            <ul className="text-purple-700 text-sm space-y-1">
                              <li>• U.S. citizen child must be 21+</li>
                              <li>• Birth certificate showing relationship</li>
                              <li>• Child&apos;s U.S. citizenship proof</li>
                              <li>• Parent&apos;s passport and documents</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-bold text-purple-800 mb-2">
                              Special Considerations:
                            </h4>
                            <ul className="text-purple-700 text-sm space-y-1">
                              <li>• Adoptive parents (adopted before age 16)</li>
                              <li>• Step-parents (marriage before child turned 18)</li>
                              <li>• Financial support requirements</li>
                              <li>• Medical examination required</li>
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
                  Age-Out Protection for Children
                </h2>
                <p className="text-gray-700 mb-6">
                  The Child Status Protection Act (CSPA) provides important protections for children
                  who may &quot;age out&quot; (turn 21) during the immigration process.
                </p>

                <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mb-8">
                  <h3 className="text-xl font-bold text-orange-800 mb-2">
                    CSPA Protection for Immediate Relatives:
                  </h3>
                  <ul className="text-orange-700 space-y-2">
                    <li>• Child&apos;s age is frozen on the date the I-130 petition is filed</li>
                    <li>• Processing delays don&apos;t count against the child</li>
                    <li>• Child remains eligible even if they turn 21 during processing</li>
                    <li>• Marriage before visa issuance still disqualifies the child</li>
                  </ul>
                  <p className="text-orange-700 mt-4 italic">
                    <strong>Important:</strong> File the I-130 petition as early as possible to
                    maximize CSPA protection.
                  </p>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  The Immediate Relative Visa Process
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
                        The U.S. citizen files an I-130 Immigrant Petition for Alien Relative to
                        establish the qualifying relationship.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Choice of Process
                      </h3>
                      <p className="text-gray-700">
                        If the beneficiary is in the U.S., they may adjust status. If abroad, they
                        proceed with consular processing.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Document Preparation
                      </h3>
                      <p className="text-gray-700">
                        Gather all required supporting documents, including relationship evidence,
                        financial support documents, and civil documents.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Medical Examination & Interview
                      </h3>
                      <p className="text-gray-700">
                        Complete required medical examination and attend immigration interview (at
                        USCIS office or U.S. consulate).
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-gold-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      5
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Green Card Approval
                      </h3>
                      <p className="text-gray-700">
                        Upon approval, receive immigrant visa or adjustment approval, followed by
                        permanent resident card.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Adjustment of Status vs. Consular Processing
                </h2>
                <p className="text-gray-700 mb-6">
                  Immediate relatives can choose between adjusting status in the U.S. or consular
                  processing abroad, depending on their circumstances.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-green-800 mb-3">
                      Adjustment of Status (in U.S.)
                    </h3>
                    <div className="mb-4">
                      <h4 className="font-bold text-green-700 mb-2">Advantages:</h4>
                      <ul className="text-green-700 text-sm space-y-1">
                        <li>• Remain in U.S. during processing</li>
                        <li>• No travel required</li>
                        <li>• Work authorization available</li>
                        <li>• Family stays together</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-green-700 mb-2">Requirements:</h4>
                      <ul className="text-green-700 text-sm space-y-1">
                        <li>• Lawful entry to U.S.</li>
                        <li>• Currently in valid status (or eligible exception)</li>
                        <li>• No disqualifying factors</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-blue-800 mb-3">
                      Consular Processing (abroad)
                    </h3>
                    <div className="mb-4">
                      <h4 className="font-bold text-blue-700 mb-2">Advantages:</h4>
                      <ul className="text-blue-700 text-sm space-y-1">
                        <li>• Often faster processing</li>
                        <li>• Available regardless of current status</li>
                        <li>• Less complex if abroad already</li>
                        <li>• Fresh start with clean record</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-700 mb-2">Considerations:</h4>
                      <ul className="text-blue-700 text-sm space-y-1">
                        <li>• Must leave U.S. for interview</li>
                        <li>• Possible unlawful presence issues</li>
                        <li>• Family separation during process</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Financial Support Requirements
                </h2>
                <p className="text-gray-700 mb-6">
                  All immediate relative cases require a financial sponsor to demonstrate that the
                  immigrant will not become a public charge.
                </p>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-6">
                  <h3 className="text-xl font-bold text-yellow-800 mb-2">
                    Form I-864 Affidavit of Support:
                  </h3>
                  <ul className="text-yellow-700 space-y-2">
                    <li>• Required for all immediate relative cases</li>
                    <li>• U.S. citizen petitioner is the primary sponsor</li>
                    <li>• Must meet 125% of Federal Poverty Guidelines</li>
                    <li>• Legally binding contract for support</li>
                    <li>• Joint sponsors available if income insufficient</li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-bold text-burgundy-900 mb-3">
                      Required Income Documentation:
                    </h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Most recent tax returns (3 years)</li>
                      <li>• W-2 forms</li>
                      <li>• Pay stubs</li>
                      <li>• Employment verification letter</li>
                      <li>• Bank statements</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-burgundy-900 mb-3">Asset Alternative:</h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Assets can supplement income</li>
                      <li>• Must be 5x the income shortage</li>
                      <li>• Must be easily convertible to cash</li>
                      <li>• Include property, savings, investments</li>
                      <li>• Require professional appraisals</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Common Challenges & Solutions
                </h2>
                <div className="space-y-6">
                  <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                    <h3 className="text-lg font-bold text-red-800 mb-2">
                      Relationship Documentation Issues
                    </h3>
                    <p className="text-red-700 mb-2">
                      Missing or inadequate proof of the qualifying relationship.
                    </p>
                    <p className="text-red-600 text-sm">
                      <strong>Solution:</strong> We help obtain alternative documents, DNA testing
                      if needed, and expert testimony to establish relationships.
                    </p>
                  </div>

                  <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                    <h3 className="text-lg font-bold text-red-800 mb-2">
                      Financial Support Shortfall
                    </h3>
                    <p className="text-red-700 mb-2">
                      Petitioner doesn&apos;t meet income requirements for sponsorship.
                    </p>
                    <p className="text-red-600 text-sm">
                      <strong>Solution:</strong> Identify joint sponsors, use assets, or explore
                      alternative support arrangements.
                    </p>
                  </div>

                  <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                    <h3 className="text-lg font-bold text-red-800 mb-2">
                      Previous Immigration Violations
                    </h3>
                    <p className="text-red-700 mb-2">
                      Beneficiary has unlawful presence or other immigration issues.
                    </p>
                    <p className="text-red-600 text-sm">
                      <strong>Solution:</strong> Assess waiver eligibility and prepare comprehensive
                      waiver applications when needed.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Why Choose Vasquez Law Firm for Immediate Relative Cases?
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-burgundy-900 mb-4">
                      Family-Focused Approach
                    </h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Understanding of family dynamics</li>
                      <li>• Compassionate representation</li>
                      <li>• Minimizing family separation</li>
                      <li>• Bilingual support for all family members</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-burgundy-900 mb-4">Proven Success</h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Thousands of successful family reunifications</li>
                      <li>• Expert handling of complex cases</li>
                      <li>• Strong track record with waivers</li>
                      <li>• Comprehensive case preparation</li>
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
                      How long does the immediate relative process take?
                    </h3>
                    <p className="text-gray-700">
                      Processing times vary by office and complexity. Adjustment of status typically
                      takes 8-24 months, while consular processing often takes 12-18 months.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      Can my spouse work while the case is pending?
                    </h3>
                    <p className="text-gray-700">
                      If adjusting status in the U.S., your spouse can apply for work authorization
                      (Form I-765) which is typically approved within 3-5 months.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      What if we have a conditional green card?
                    </h3>
                    <p className="text-gray-700">
                      Spouses married less than 2 years receive conditional green cards. You must
                      file Form I-751 to remove conditions before the 2-year anniversary.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      Can same-sex couples file immediate relative petitions?
                    </h3>
                    <p className="text-gray-700">
                      Yes. Since 2013, same-sex marriages are recognized for all federal immigration
                      purposes, including immediate relative petitions.
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
              Bring Your Family Home - No Waiting Required
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Immediate relatives deserve immediate attention. Our experienced family immigration
              attorneys are ready to reunite your family quickly and efficiently.
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
            serviceType: 'Immigration Immediate Relative Visas Legal Services',
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
            url: 'https://www.vasquezlawfirm.com/practice-areas/immigration/immediate-relative-visas/page',
            description:
              'Immigration Immediate Relative Visas legal services in North Carolina. Free consultation. Se habla español.',
          }),
        }}
      />
    </div>
  );
}
