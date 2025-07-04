import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import {
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  FileText,
  Scale,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Inadmissibility Waivers Immigration Lawyers NC & FL | Vasquez Law Firm',
  description:
    'Expert inadmissibility waiver attorneys in Raleigh, Charlotte, Smithfield & Orlando. Overcome immigration bars with I-601, I-601A, and other waiver applications. Free consultation.',
  keywords: [
    'inadmissibility waiver',
    'I-601 waiver',
    'I-601A waiver',
    'immigration waiver',
    'hardship waiver',
    'criminal waiver',
    'immigration lawyer',
    'Raleigh NC',
    'Charlotte NC',
    'Orlando FL',
  ],
  openGraph: {
    title: 'Inadmissibility Waivers Immigration Lawyers | Vasquez Law Firm',
    description:
      'Expert inadmissibility waiver attorneys helping overcome immigration bars and obstacles.',
    type: 'website',
    images: [
      {
        url: '/images/inadmissibility-waiver-lawyers.jpg',
        width: 1200,
        height: 630,
        alt: 'Inadmissibility Waiver Immigration Lawyers',
      },
    ],
  },
};

export default function InadmissibilityWaiversPage() {
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
            <span className="text-gray-600">Inadmissibility Waivers</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-burgundy-700 to-burgundy-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Inadmissibility Waivers</h1>
            <p className="text-xl md:text-2xl mb-8 text-gold-400 font-semibold">
              YO PELEO POR TI™ - I FIGHT FOR YOU
            </p>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Don't let immigration bars prevent you from being with your family. Our experienced
              waiver attorneys help overcome inadmissibility issues and reunite families through
              successful waiver applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-gold-500 text-burgundy-900 font-bold rounded-full hover:bg-gold-400 transition-colors"
              >
                Free Waiver Consultation
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

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  What Are Inadmissibility Waivers?
                </h2>
                <p className="text-gray-700 mb-6">
                  Inadmissibility waivers are legal tools that allow individuals who would otherwise
                  be barred from entering or remaining in the United States to overcome these
                  immigration obstacles. When someone is deemed "inadmissible" under U.S.
                  immigration law, a waiver may provide forgiveness for specific violations and
                  allow them to proceed with their immigration case.
                </p>

                <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
                  <div className="flex items-center mb-4">
                    <AlertTriangle className="w-8 h-8 text-red-600 mr-3" />
                    <h3 className="text-xl font-bold text-red-800">
                      Common Inadmissibility Issues
                    </h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="text-red-700 space-y-2">
                      <li>• Unlawful presence (3 and 10-year bars)</li>
                      <li>• Criminal convictions</li>
                      <li>• Immigration fraud or misrepresentation</li>
                      <li>• Health-related inadmissibility</li>
                      <li>• Public charge concerns</li>
                    </ul>
                    <ul className="text-red-700 space-y-2">
                      <li>• Prior removal orders</li>
                      <li>• Document fraud</li>
                      <li>• Security-related issues</li>
                      <li>• Illegal entry or smuggling</li>
                      <li>• Multiple immigration violations</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Types of Immigration Waivers
                </h2>
                <p className="text-gray-700 mb-6">
                  Different types of waivers address specific inadmissibility grounds. Understanding
                  which waiver applies to your situation is crucial for a successful application.
                </p>

                <div className="grid gap-6 mb-8">
                  <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                    <div className="flex items-start space-x-4">
                      <FileText className="w-8 h-8 text-blue-600 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold text-blue-800 mb-2">
                          I-601 Waiver (Application for Waiver of Grounds of Inadmissibility)
                        </h3>
                        <p className="text-blue-700 mb-3">
                          The most common waiver for overcoming various inadmissibility grounds,
                          including unlawful presence, criminal issues, fraud, and health-related
                          inadmissibility.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-bold text-blue-800 mb-2">Covers:</h4>
                            <ul className="text-blue-700 text-sm space-y-1">
                              <li>• 3 and 10-year unlawful presence bars</li>
                              <li>• Criminal inadmissibility</li>
                              <li>• Fraud/misrepresentation</li>
                              <li>• Health-related inadmissibility</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-bold text-blue-800 mb-2">Standard:</h4>
                            <ul className="text-blue-700 text-sm space-y-1">
                              <li>• Extreme hardship to U.S. citizen or LPR spouse/parent</li>
                              <li>• Some grounds require additional criteria</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                    <div className="flex items-start space-x-4">
                      <Scale className="w-8 h-8 text-green-600 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold text-green-800 mb-2">
                          I-601A Waiver (Provisional Unlawful Presence Waiver)
                        </h3>
                        <p className="text-green-700 mb-3">
                          Allows eligible individuals to apply for a waiver of unlawful presence
                          while in the U.S., reducing family separation time during consular
                          processing.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-bold text-green-800 mb-2">Benefits:</h4>
                            <ul className="text-green-700 text-sm space-y-1">
                              <li>• Stay in U.S. during waiver processing</li>
                              <li>• Reduced separation time</li>
                              <li>• Only for unlawful presence bars</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-bold text-green-800 mb-2">Eligibility:</h4>
                            <ul className="text-green-700 text-sm space-y-1">
                              <li>• Immediate relative of U.S. citizen</li>
                              <li>• No other inadmissibility issues</li>
                              <li>• Interview scheduled abroad</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                    <div className="flex items-start space-x-4">
                      <CheckCircle className="w-8 h-8 text-purple-600 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold text-purple-800 mb-2">
                          I-212 Waiver (Application for Permission to Reapply for Admission)
                        </h3>
                        <p className="text-purple-700 mb-3">
                          Required for individuals who were previously removed or departed under a
                          removal order and want to return to the U.S.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-bold text-purple-800 mb-2">Required For:</h4>
                            <ul className="text-purple-700 text-sm space-y-1">
                              <li>• Previous removal/deportation</li>
                              <li>• Voluntary departure violations</li>
                              <li>• Expedited removal</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-bold text-purple-800 mb-2">Standard:</h4>
                            <ul className="text-purple-700 text-sm space-y-1">
                              <li>• Favorable exercise of discretion</li>
                              <li>• Positive factors outweigh negative</li>
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
                  Understanding Extreme Hardship
                </h2>
                <p className="text-gray-700 mb-6">
                  Most waivers require proof that denial would cause "extreme hardship" to a
                  qualifying U.S. citizen or permanent resident relative. This standard is higher
                  than typical hardship and requires careful documentation.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-green-800 mb-3">
                      Factors Supporting Extreme Hardship
                    </h3>
                    <ul className="text-green-700 space-y-2">
                      <li>• Serious medical conditions requiring ongoing care</li>
                      <li>• Elderly relatives needing caregiving</li>
                      <li>• Children with special needs</li>
                      <li>• Significant financial obligations in the U.S.</li>
                      <li>• Language barriers and cultural adaptation issues</li>
                      <li>• Lack of family or support system abroad</li>
                      <li>• Educational disruption for children</li>
                      <li>• Loss of business or professional opportunities</li>
                      <li>• Country conditions (safety, economy, healthcare)</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-gray-800 mb-3">Common Misconceptions</h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Economic hardship alone is usually insufficient</li>
                      <li>• Normal consequences of immigration don't qualify</li>
                      <li>• Family separation by itself isn&apos;t extreme hardship</li>
                      <li>• Hardship must be to the qualifying relative, not the applicant</li>
                      <li>
                        • Must show hardship if relative moves abroad AND if they stay in U.S.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
                  <h3 className="text-xl font-bold text-yellow-800 mb-2">
                    Qualifying Relatives for Hardship Analysis:
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-bold text-yellow-700 mb-2">I-601 Waivers:</h4>
                      <ul className="text-yellow-700 space-y-1">
                        <li>• U.S. citizen spouse</li>
                        <li>• U.S. citizen parent</li>
                        <li>• Permanent resident spouse</li>
                        <li>• Permanent resident parent</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-yellow-700 mb-2">I-601A Waivers:</h4>
                      <ul className="text-yellow-700 space-y-1">
                        <li>• U.S. citizen spouse</li>
                        <li>• U.S. citizen parent</li>
                        <li>• (Permanent residents not included)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  The Waiver Application Process
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Comprehensive Case Assessment
                      </h3>
                      <p className="text-gray-700">
                        We thoroughly review your immigration history, inadmissibility grounds, and
                        family circumstances to determine waiver eligibility and strategy.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Evidence Collection & Documentation
                      </h3>
                      <p className="text-gray-700">
                        Gather comprehensive evidence of extreme hardship, including medical
                        records, financial documents, country condition evidence, and expert
                        testimony.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Legal Brief Preparation
                      </h3>
                      <p className="text-gray-700">
                        Craft detailed legal arguments explaining why the waiver should be granted,
                        addressing all relevant factors and applicable law.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-909 mb-2">
                        Application Filing & Follow-up
                      </h3>
                      <p className="text-gray-700">
                        Submit the complete waiver package to USCIS and monitor case progress,
                        responding to any requests for additional evidence.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-gold-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      5
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Approval & Next Steps
                      </h3>
                      <p className="text-gray-700">
                        Upon approval, coordinate next steps in the immigration process, whether
                        consular processing, adjustment of status, or re-entry to the U.S.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Common Waiver Challenges
                </h2>
                <div className="space-y-6">
                  <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                    <h3 className="text-lg font-bold text-red-800 mb-2">
                      Insufficient Hardship Evidence
                    </h3>
                    <p className="text-red-700">
                      Many waiver denials result from inadequate documentation of extreme hardship.
                      We ensure comprehensive evidence collection and presentation.
                    </p>
                  </div>

                  <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                    <h3 className="text-lg font-bold text-red-800 mb-2">
                      Multiple Inadmissibility Grounds
                    </h3>
                    <p className="text-red-700">
                      Complex cases with multiple barriers require strategic planning and may need
                      multiple waivers or different legal approaches.
                    </p>
                  </div>

                  <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                    <h3 className="text-lg font-bold text-red-800 mb-2">
                      Timing and Procedural Issues
                    </h3>
                    <p className="text-red-700">
                      Waiver applications have strict timing requirements and procedural rules that
                      must be followed precisely to avoid denial.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Why Choose Vasquez Law Firm for Waiver Cases?
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-burgundy-900 mb-4">
                      Proven Success Record
                    </h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• High waiver approval rates</li>
                      <li>• Experience with complex cases</li>
                      <li>• Thorough case preparation</li>
                      <li>• Strategic legal arguments</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-burgundy-900 mb-4">
                      Comprehensive Approach
                    </h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Detailed hardship analysis</li>
                      <li>• Expert witness coordination</li>
                      <li>• Medical and psychological evaluations</li>
                      <li>• Country condition research</li>
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
                      How long do waiver applications take?
                    </h3>
                    <p className="text-gray-700">
                      Processing times vary by waiver type and complexity. I-601A waivers typically
                      take 6-12 months, while I-601 waivers can take 12-24 months or longer.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      Can I apply for multiple waivers simultaneously?
                    </h3>
                    <p className="text-gray-700">
                      In some cases, yes. However, each waiver addresses specific inadmissibility
                      grounds, and the strategy depends on your individual circumstances.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      What happens if my waiver is denied?
                    </h3>
                    <p className="text-gray-700">
                      Depending on the waiver type and circumstances, options may include appealing
                      the decision, refiling with additional evidence, or pursuing alternative
                      immigration strategies.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      Do I need a waiver if I have a criminal conviction?
                    </h3>
                    <p className="text-gray-700">
                      It depends on the specific conviction and immigration context. Some
                      convictions require waivers, while others may be addressed through different
                      legal strategies.
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
              Don't Let Immigration Bars Separate Your Family
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Our experienced waiver attorneys have helped hundreds of families overcome
              inadmissibility issues. Let us evaluate your case and explore your options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-burgundy-700 text-white font-bold rounded-full hover:bg-burgundy-800 transition-colors"
              >
                Free Waiver Assessment
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
            serviceType: 'Immigration Inadmissibility Waivers Legal Services',
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
            url: 'https://www.vasquezlawfirm.com/practice-areas/immigration/inadmissibility-waivers/page',
            description:
              'Immigration Inadmissibility Waivers legal services in North Carolina. Free consultation. Se habla español.',
          }),
        }}
      />
    </div>
  );
}
