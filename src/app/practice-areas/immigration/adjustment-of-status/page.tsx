import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { Phone, MapPin, ArrowRight, CheckCircle, Scale, Users, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Adjustment of Status Lawyers in NC & FL | Vasquez Law Firm, PLLC',
  description:
    'Expert adjustment of status attorneys in Raleigh, Charlotte, Smithfield, and Orlando. Navigate the green card application process with experienced immigration lawyers. Free consultation.',
  keywords: [
    'adjustment of status',
    'green card application',
    'immigration lawyer',
    'Raleigh NC',
    'Charlotte NC',
    'Orlando FL',
    'change status to permanent resident',
  ],
  openGraph: {
    title: 'Adjustment of Status Lawyers | Vasquez Law Firm, PLLC',
    description:
      'Expert adjustment of status attorneys helping clients obtain green cards. Free consultation available.',
    type: 'website',
    images: [
      {
        url: '/images/adjustment-of-status-lawyers.jpg',
        width: 1200,
        height: 630,
        alt: 'Adjustment of Status Immigration Lawyers',
      },
    ],
  },
};

export default function AdjustmentOfStatusPage() {
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
            <span className="text-gray-600">Adjustment of Status</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-burgundy-700 to-burgundy-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Adjustment of Status Lawyers</h1>
            <p className="text-xl md:text-2xl mb-8 text-gold-400 font-semibold">
              YO PELEO POR TI™ - I FIGHT FOR YOU
            </p>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Navigate the complex adjustment of status process with experienced immigration
              attorneys. We help you change from temporary to permanent resident status in the
              United States.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-gold-500 text-burgundy-900 font-bold rounded-full hover:bg-gold-400 transition-colors"
              >
                Free Consultation
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
                  What Is Adjustment of Status?
                </h2>
                <p className="text-gray-700 mb-6">
                  Adjustment of status is the process that allows certain individuals already in the
                  United States to apply for lawful permanent resident status (green card) without
                  having to return to their home country to complete visa processing. This process
                  can save months of separation from family and allows you to remain in the U.S.
                  while your application is processed.
                </p>

                <div className="bg-gold-50 border-l-4 border-gold-500 p-6 mb-8">
                  <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                    Why Choose Adjustment of Status?
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-gold-600 mr-2 mt-1" />
                      <span>Remain in the U.S. during processing</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-gold-600 mr-2 mt-1" />
                      <span>Avoid consular processing delays</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-gold-600 mr-2 mt-1" />
                      <span>Stay with family throughout the process</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-gold-600 mr-2 mt-1" />
                      <span>Continue working with employment authorization</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Who Is Eligible for Adjustment of Status?
                </h2>
                <p className="text-gray-700 mb-6">
                  Not everyone can adjust status within the United States. Eligibility depends on
                  several factors including how you entered the country, your current status, and
                  the basis for your green card application.
                </p>

                <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                  Common Eligibility Categories:
                </h3>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-lg shadow-md border">
                    <Users className="w-8 h-8 text-burgundy-700 mb-4" />
                    <h4 className="text-xl font-bold text-burgundy-900 mb-2">Family-Based</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Immediate relatives of U.S. citizens</li>
                      <li>• Family preference categories</li>
                      <li>• Marriage to U.S. citizen or resident</li>
                    </ul>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md border">
                    <FileText className="w-8 h-8 text-burgundy-700 mb-4" />
                    <h4 className="text-xl font-bold text-burgundy-900 mb-2">Employment-Based</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• EB-1, EB-2, EB-3 categories</li>
                      <li>• PERM labor certification</li>
                      <li>• National Interest Waiver</li>
                    </ul>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md border">
                    <Scale className="w-8 h-8 text-burgundy-700 mb-4" />
                    <h4 className="text-xl font-bold text-burgundy-900 mb-2">Humanitarian</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Asylum grantees (after 1 year)</li>
                      <li>• VAWA self-petitioners</li>
                      <li>• U visa holders</li>
                    </ul>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md border">
                    <CheckCircle className="w-8 h-8 text-burgundy-700 mb-4" />
                    <h4 className="text-xl font-bold text-burgundy-900 mb-2">Special Categories</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Diversity lottery winners</li>
                      <li>• Registry cases</li>
                      <li>• Cuban Adjustment Act</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  The Adjustment of Status Process
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Eligibility Assessment
                      </h3>
                      <p className="text-gray-700">
                        We review your immigration history, current status, and potential grounds
                        for adjustment to determine eligibility.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Document Preparation
                      </h3>
                      <p className="text-gray-700">
                        Gather required documents including Form I-485, medical examination,
                        financial support evidence, and supporting materials.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Filing and Biometrics
                      </h3>
                      <p className="text-gray-700">
                        Submit the complete application package and attend biometrics appointment
                        for background check processing.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Interview Preparation
                      </h3>
                      <p className="text-gray-700">
                        Prepare for the adjustment of status interview with comprehensive coaching
                        and documentation review.
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
                        Receive your permanent resident card and begin your new life as a lawful
                        permanent resident of the United States.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Common Challenges in Adjustment Cases
                </h2>
                <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
                  <h3 className="text-xl font-bold text-red-800 mb-2">Potential Issues:</h3>
                  <ul className="text-red-700 space-y-2">
                    <li>• Unlawful presence issues</li>
                    <li>• Prior immigration violations</li>
                    <li>• Criminal history concerns</li>
                    <li>• Insufficient financial support</li>
                    <li>• Medical inadmissibility</li>
                    <li>• Documentation gaps</li>
                  </ul>
                </div>

                <p className="text-gray-700">
                  These challenges don't necessarily disqualify you from adjustment of status, but
                  they require experienced legal navigation. Our attorneys have successfully handled
                  complex cases involving waivers, appeals, and other remedies.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Why Choose Vasquez Law Firm for Adjustment of Status?
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-burgundy-900 mb-4">
                      Experience & Success
                    </h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Over 35 years combined experience</li>
                      <li>• Thousands of successful adjustments</li>
                      <li>• Complex case specialization</li>
                      <li>• Multilingual legal team</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-burgundy-900 mb-4">
                      Comprehensive Support
                    </h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Detailed case assessment</li>
                      <li>• Document preparation assistance</li>
                      <li>• Interview preparation coaching</li>
                      <li>• Ongoing case monitoring</li>
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
                      How long does adjustment of status take?
                    </h3>
                    <p className="text-gray-700">
                      Processing times vary by USCIS office and case complexity, typically ranging
                      from 8-24 months. Family-based cases often process faster than
                      employment-based cases.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      Can I travel while my adjustment case is pending?
                    </h3>
                    <p className="text-gray-700">
                      Yes, but only with advance parole authorization. Traveling without advance
                      parole can abandon your adjustment application.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      What if my adjustment application is denied?
                    </h3>
                    <p className="text-gray-700">
                      If denied, you may be placed in removal proceedings, but you can renew your
                      adjustment application before an immigration judge. We provide representation
                      throughout this process.
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
              Ready to Start Your Adjustment of Status Case?
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Don't navigate the complex adjustment process alone. Our experienced immigration
              attorneys are here to guide you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-burgundy-700 text-white font-bold rounded-full hover:bg-burgundy-800 transition-colors"
              >
                Schedule Free Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="tel:1-844-967-3536"
                className="inline-flex items-center px-8 py-4 bg-gold-500 text-burgundy-900 font-bold rounded-full hover:bg-gold-400 transition-colors"
              >
                <Phone className="mr-2 w-5 h-5" />
                Call Now: 1-844-YO-PELEO
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
            serviceType: 'Immigration Adjustment Of Status Legal Services',
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
            url: 'https://www.vasquezlawfirm.com/practice-areas/immigration/adjustment-of-status/page',
            description:
              'Immigration Adjustment Of Status legal services in North Carolina. Free consultation. Se habla español.',
          }),
        }}
      />
    </div>
  );
}
