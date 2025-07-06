import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { Phone, MapPin, ArrowRight, Briefcase, Globe, Award, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Employment-Based Immigration Lawyers NC & FL | Vasquez Law Firm',
  description:
    'Expert employment-based immigration attorneys in Raleigh, Charlotte, Smithfield & Orlando. Help with PERM, H-1B, L-1, EB-1, EB-2, EB-3, TN visas. Work authorization and green cards.',
  keywords: [
    'employment immigration',
    'PERM labor certification',
    'H-1B visa',
    'L-1 visa',
    'EB-1',
    'EB-2',
    'EB-3',
    'TN visa',
    'work visa',
    'immigration lawyer',
    'Raleigh NC',
    'Charlotte NC',
    'Orlando FL',
  ],
  openGraph: {
    title: 'Employment-Based Immigration Lawyers | Vasquez Law Firm',
    description:
      'Expert employment-based immigration attorneys helping businesses and workers navigate complex visa and green card processes.',
    type: 'website',
    images: [
      {
        url: '/images/employment-immigration-lawyers.jpg',
        width: 1200,
        height: 630,
        alt: 'Employment-Based Immigration Lawyers',
      },
    ],
  },
};

export default function EmploymentBasedImmigrationPage() {
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
            <span className="text-gray-600">Employment-Based Immigration</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-burgundy-700 to-burgundy-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Employment-Based Immigration</h1>
            <p className="text-xl md:text-2xl mb-8 text-gold-400 font-semibold">
              YO PELEO POR TI™ - I FIGHT FOR YOU
            </p>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Navigate the complex world of employment-based immigration with experienced attorneys.
              From temporary work visas to permanent residence, we help businesses and workers
              achieve their American dream.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-gold-500 text-burgundy-900 font-bold rounded-full hover:bg-gold-400 transition-colors"
              >
                Free Business Consultation
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

      {/* Business Focus Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-blue-100 border-l-4 border-blue-500 p-6 mb-8">
              <div className="flex items-center mb-4">
                <Briefcase className="w-8 h-8 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-blue-800">
                  Comprehensive Business Immigration Solutions
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-blue-800 mb-2">For Employers:</h3>
                  <ul className="text-blue-700 space-y-1">
                    <li>✓ Talent acquisition strategies</li>
                    <li>✓ Compliance and I-9 management</li>
                    <li>✓ PERM labor certification</li>
                    <li>✓ Corporate immigration policies</li>
                    <li>✓ Merger & acquisition support</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-blue-800 mb-2">For Workers:</h3>
                  <ul className="text-blue-700 space-y-1">
                    <li>• Work authorization applications</li>
                    <li>• Career advancement visas</li>
                    <li>• Permanent residence pathways</li>
                    <li>• Family inclusion strategies</li>
                    <li>• Status change guidance</li>
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
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">Temporary Work Visas</h2>
                <p className="text-gray-700 mb-6">
                  Temporary work visas allow foreign nationals to work in the United States for
                  specific periods and purposes. Each visa category has unique requirements,
                  benefits, and limitations.
                </p>

                <div className="grid gap-6 mb-8">
                  <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                    <div className="flex items-start space-x-4">
                      <Globe className="w-8 h-8 text-green-600 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold text-green-800 mb-2">
                          H-1B Specialty Occupation Visa
                        </h3>
                        <p className="text-green-700 mb-3">
                          For professionals in specialty occupations requiring theoretical and
                          practical application of highly specialized knowledge.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-bold text-green-800 mb-2">Common Occupations:</h4>
                            <ul className="text-green-700 text-sm space-y-1">
                              <li>• Software engineers & developers</li>
                              <li>• Engineers & architects</li>
                              <li>• Physicians & healthcare professionals</li>
                              <li>• Financial analysts</li>
                              <li>• Research scientists</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-bold text-green-800 mb-2">Key Benefits:</h4>
                            <ul className="text-green-700 text-sm space-y-1">
                              <li>• 3-year initial period, renewable to 6 years</li>
                              <li>• Dual intent (can pursue green card)</li>
                              <li>• H-4 visas for spouse and children</li>
                              <li>• Potential work authorization for spouse</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                    <div className="flex items-start space-x-4">
                      <Award className="w-8 h-8 text-purple-600 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold text-purple-800 mb-2">
                          L-1 Intracompany Transfer Visa
                        </h3>
                        <p className="text-purple-700 mb-3">
                          For executives, managers, and specialized knowledge employees transferring
                          within multinational companies.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-bold text-purple-800 mb-2">
                              L-1A (Executives/Managers):
                            </h4>
                            <ul className="text-purple-700 text-sm space-y-1">
                              <li>• 3-year initial period</li>
                              <li>• Maximum 7 years total</li>
                              <li>• New office petitions (1 year initially)</li>
                              <li>• Fast track to EB-1C green card</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-bold text-purple-800 mb-2">
                              L-1B (Specialized Knowledge):
                            </h4>
                            <ul className="text-purple-700 text-sm space-y-1">
                              <li>• 3-year initial period</li>
                              <li>• Maximum 5 years total</li>
                              <li>• Proprietary knowledge/processes</li>
                              <li>• Advanced expertise requirement</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
                    <div className="flex items-start space-x-4">
                      <FileText className="w-8 h-8 text-yellow-600 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold text-yellow-800 mb-2">
                          TN Visa (NAFTA/USMCA)
                        </h3>
                        <p className="text-yellow-700 mb-3">
                          For Canadian and Mexican citizens in specific professional occupations
                          under the USMCA trade agreement.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-bold text-yellow-800 mb-2">
                              Eligible Professions:
                            </h4>
                            <ul className="text-yellow-700 text-sm space-y-1">
                              <li>• Accountants & auditors</li>
                              <li>• Engineers (various specialties)</li>
                              <li>• Computer systems analysts</li>
                              <li>• Management consultants</li>
                              <li>• Lawyers (LL.B./J.D. required)</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-bold text-yellow-800 mb-2">Advantages:</h4>
                            <ul className="text-yellow-700 text-sm space-y-1">
                              <li>• No annual cap or lottery</li>
                              <li>• Renewable indefinitely</li>
                              <li>• Fast processing at border</li>
                              <li>• Lower costs than H-1B</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
                    <h3 className="text-xl font-bold text-orange-800 mb-3">
                      Other Temporary Work Visas
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-bold text-orange-700 mb-2">E-1/E-2 Treaty Visas</h4>
                        <ul className="text-orange-600 text-sm space-y-1">
                          <li>• Treaty traders (E-1)</li>
                          <li>• Treaty investors (E-2)</li>
                          <li>• Substantial investment required</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-orange-700 mb-2">
                          O-1 Extraordinary Ability
                        </h4>
                        <ul className="text-orange-600 text-sm space-y-1">
                          <li>• Arts, sciences, business</li>
                          <li>• Sustained national/international acclaim</li>
                          <li>• No annual cap</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-orange-700 mb-2">P Visas</h4>
                        <ul className="text-orange-600 text-sm space-y-1">
                          <li>• Athletes (P-1)</li>
                          <li>• Artists/entertainers (P-1/P-3)</li>
                          <li>• Cultural exchange programs</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Permanent Residence Through Employment
                </h2>
                <p className="text-gray-700 mb-6">
                  Employment-based green cards provide a pathway to permanent residence for foreign
                  workers with valuable skills, allowing them to live and work permanently in the
                  United States.
                </p>

                <div className="space-y-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-blue-800 mb-3">
                      EB-1: Priority Workers (No Labor Certification Required)
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-bold text-blue-700 mb-2">
                          EB-1A: Extraordinary Ability
                        </h4>
                        <ul className="text-blue-600 text-sm space-y-1">
                          <li>• Self-petitioned</li>
                          <li>• National/international recognition</li>
                          <li>• Evidence of sustained acclaim</li>
                          <li>• No job offer required</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-700 mb-2">
                          EB-1B: Outstanding Researchers
                        </h4>
                        <ul className="text-blue-600 text-sm space-y-1">
                          <li>• 3+ years research experience</li>
                          <li>• International recognition</li>
                          <li>• Job offer from university/research institution</li>
                          <li>• Permanent research position</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-700 mb-2">
                          EB-1C: Multinational Executives
                        </h4>
                        <ul className="text-blue-600 text-sm space-y-1">
                          <li>• 1 year management abroad</li>
                          <li>• Related U.S. company</li>
                          <li>• Executive/managerial role</li>
                          <li>• Often follows L-1A visa</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-green-800 mb-3">
                      EB-2: Advanced Degree Professionals
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-bold text-green-700 mb-2">
                          Standard EB-2 (with PERM):
                        </h4>
                        <ul className="text-green-600 text-sm space-y-1">
                          <li>• Advanced degree (Master&apos;s+) or Bachelor&apos;s + 5 years experience</li>
                          <li>• PERM labor certification required</li>
                          <li>• Job offer and employer sponsorship</li>
                          <li>• Prevailing wage determination</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-green-700 mb-2">
                          EB-2 National Interest Waiver:
                        </h4>
                        <ul className="text-green-600 text-sm space-y-1">
                          <li>• Self-petitioned (no employer required)</li>
                          <li>• Work benefits U.S. national interest</li>
                          <li>• Skip PERM labor certification</li>
                          <li>• Advanced degree or exceptional ability</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-yellow-800 mb-3">
                      EB-3: Skilled Workers and Professionals
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-bold text-yellow-700 mb-2">Professionals</h4>
                        <ul className="text-yellow-600 text-sm space-y-1">
                          <li>• Bachelor&apos;s degree required</li>
                          <li>• Job requires degree</li>
                          <li>• PERM certification</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-yellow-700 mb-2">Skilled Workers</h4>
                        <ul className="text-yellow-600 text-sm space-y-1">
                          <li>• 2+ years experience/training</li>
                          <li>• Non-temporary position</li>
                          <li>• Labor shortage position</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-yellow-700 mb-2">Other Workers</h4>
                        <ul className="text-yellow-600 text-sm space-y-1">
                          <li>• Less than 2 years experience</li>
                          <li>• Non-temporary, non-seasonal</li>
                          <li>• Limited annual availability</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Why Choose Vasquez Law Firm for Employment Immigration?
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-burgundy-900 mb-4">
                      Business-Focused Solutions
                    </h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Strategic workforce planning</li>
                      <li>• Compliance program development</li>
                      <li>• Cost-effective visa strategies</li>
                      <li>• Rapid case processing</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-burgundy-900 mb-4">
                      Proven Track Record
                    </h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Thousands of successful cases</li>
                      <li>• Complex PERM certifications</li>
                      <li>• High approval rates across all categories</li>
                      <li>• Multilingual support team</li>
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
                      How long does the PERM process take?
                    </h3>
                    <p className="text-gray-700">
                      The PERM process typically takes 12-18 months total, including recruitment
                      (3-6 months) and DOL processing (6-12 months). Premium processing is not
                      available for PERM.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      Can I change employers while my green card is pending?
                    </h3>
                    <p className="text-gray-700">
                      Yes, after your I-140 is approved and your I-485 has been pending for 180+
                      days, you can change to a similar job with AC21 portability. We help ensure
                      proper compliance with these rules.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      What happens if my H-1B expires before getting a green card?
                    </h3>
                    <p className="text-gray-700">
                      If you have an approved I-140 or pending I-485, you may be eligible for H-1B
                      extensions beyond the 6-year limit in 1-year or 3-year increments while
                      waiting for your priority date.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      Do I need a job offer for all employment-based green cards?
                    </h3>
                    <p className="text-gray-700">
                      No. EB-1A (extraordinary ability) and EB-2 National Interest Waiver cases can
                      be self-petitioned without a job offer. All other categories require employer
                      sponsorship.
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
              Ready to Build Your U.S. Career?
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Whether you&apos;re an employer seeking top talent or a worker pursuing the American
              dream, our employment immigration attorneys are here to guide you through every step.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-burgundy-700 text-white font-bold rounded-full hover:bg-burgundy-800 transition-colors"
              >
                Start Your Case Today
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
            serviceType: 'Immigration Employment Based Immigration Legal Services',
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
            url: 'https://www.vasquezlawfirm.com/practice-areas/immigration/employment-based-immigration/page',
            description:
              'Immigration Employment Based Immigration legal services in North Carolina. Free consultation. Se habla español.',
          }),
        }}
      />
    </div>
  );
}
