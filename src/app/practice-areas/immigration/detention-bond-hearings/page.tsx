import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { Phone, MapPin, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Immigration Detention & Bond Hearing Lawyers NC & FL | Vasquez Law Firm',
  description:
    'Expert immigration detention and bond hearing attorneys in Raleigh, Charlotte, Smithfield & Orlando. Get immediate help for detained family members. 24/7 emergency assistance.',
  keywords: [
    'immigration detention',
    'bond hearing',
    'immigration court',
    'detained immigrant',
    'removal proceedings',
    'ICE detention',
    'Raleigh NC',
    'Charlotte NC',
    'Orlando FL',
  ],
  openGraph: {
    title: 'Immigration Detention & Bond Hearing Lawyers | Vasquez Law Firm',
    description:
      'Expert immigration detention and bond hearing attorneys providing immediate help for detained family members.',
    type: 'website',
    images: [
      {
        url: '/images/immigration-detention-bond-lawyers.jpg',
        width: 1200,
        height: 630,
        alt: 'Immigration Detention and Bond Hearing Lawyers',
      },
    ],
  },
};

export default function DetentionBondHearingsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Emergency Banner */}
      <div className="bg-red-600 text-white py-2">
        <div className="container mx-auto px-4 text-center">
          <p className="font-bold">🚨 EMERGENCY DETENTION HELP - CALL 1-844-YO-PELEO NOW 🚨</p>
        </div>
      </div>

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
            <span className="text-gray-600">Detention & Bond Hearings</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-burgundy-700 to-burgundy-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Immigration Detention & Bond Hearing Lawyers
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gold-400 font-semibold">
              YO PELEO POR TI™ - I FIGHT FOR YOU
            </p>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              When your loved one is detained by ICE, every moment counts. Our experienced
              immigration attorneys provide immediate assistance for detention cases and bond
              hearings throughout North Carolina and Florida.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-gold-500 text-burgundy-900 font-bold rounded-full hover:bg-gold-400 transition-colors"
              >
                Emergency Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="tel:1-844-967-3536"
                className="inline-flex items-center px-8 py-4 bg-white text-burgundy-900 font-bold rounded-full hover:bg-gray-100 transition-colors"
              >
                <Phone className="mr-2 w-5 h-5" />
                CALL NOW: 1-844-YO-PELEO
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Immediate Action Section */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-100 border-l-4 border-red-500 p-6 mb-8">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600 mr-3" />
                <h2 className="text-2xl font-bold text-red-800">
                  Your Family Member Has Been Detained - Act Fast!
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-red-800 mb-2">What to Do RIGHT NOW:</h3>
                  <ul className="text-red-700 space-y-1">
                    <li>✓ Call our emergency hotline immediately</li>
                    <li>✓ Gather any immigration documents</li>
                    <li>✓ Do NOT sign anything without a lawyer</li>
                    <li>✓ Write down the detention facility name</li>
                    <li>✓ Get the alien registration number (A-number)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-800 mb-2">Time Is Critical Because:</h3>
                  <ul className="text-red-700 space-y-1">
                    <li>• Bond hearings must be requested quickly</li>
                    <li>• Evidence gathering takes time</li>
                    <li>• Court calendars fill up fast</li>
                    <li>• Detention conditions are harsh</li>
                    <li>• Family separation causes trauma</li>
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
                  Understanding Immigration Detention
                </h2>
                <p className="text-gray-700 mb-6">
                  Immigration detention occurs when ICE (Immigration and Customs Enforcement)
                  arrests and holds non-citizens who they believe may have violated immigration
                  laws. Detention can happen during routine check-ins, traffic stops, at work, or
                  even at home.
                </p>

                <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                  Common Reasons for ICE Detention:
                </h3>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-bold text-burgundy-900 mb-3">
                      Immigration Violations
                    </h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Overstaying a visa</li>
                      <li>• Unauthorized entry</li>
                      <li>• Violation of status terms</li>
                      <li>• Failed asylum case</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-bold text-burgundy-900 mb-3">Criminal Issues</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Criminal convictions</li>
                      <li>• Pending criminal charges</li>
                      <li>• Prior deportation orders</li>
                      <li>• Outstanding warrants</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Immigration Bond Hearings
                </h2>
                <p className="text-gray-700 mb-6">
                  A bond hearing is a court proceeding where an immigration judge decides whether a
                  detained person can be released from custody while their immigration case is
                  pending. Not everyone is eligible for bond, but many people can be released if
                  they meet certain requirements.
                </p>

                <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
                  <h3 className="text-xl font-bold text-green-800 mb-2">
                    Who May Be Eligible for Bond:
                  </h3>
                  <ul className="text-green-700 space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                      <span>People with no serious criminal history</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                      <span>First-time immigration violators</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                      <span>People with strong family ties in the U.S.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                      <span>Those who pose no flight risk</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                      <span>Asylum seekers who passed credible fear</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
                  <h3 className="text-xl font-bold text-red-800 mb-2">
                    Mandatory Detention (No Bond Available):
                  </h3>
                  <ul className="text-red-700 space-y-2">
                    <li>• Certain aggravated felony convictions</li>
                    <li>• Drug trafficking offenses</li>
                    <li>• Crimes involving moral turpitude</li>
                    <li>• Crimes of violence</li>
                    <li>• Multiple criminal convictions</li>
                    <li>• Prior deportation and illegal re-entry</li>
                  </ul>
                  <p className="text-red-700 mt-4 italic">
                    Note: Even in mandatory detention cases, there may be legal challenges
                    available. Contact us immediately for case-specific advice.
                  </p>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  The Bond Hearing Process
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Emergency Consultation
                      </h3>
                      <p className="text-gray-700">
                        We immediately assess the case, determine bond eligibility, and begin
                        gathering evidence for the hearing.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Bond Motion Filing
                      </h3>
                      <p className="text-gray-700">
                        We file a formal bond motion with the immigration court and request the
                        earliest possible hearing date.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-909 mb-2">
                        Evidence Preparation
                      </h3>
                      <p className="text-gray-700">
                        Gather supporting documents: family ties, employment history, community
                        connections, and character references.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">Bond Hearing</h3>
                      <p className="text-gray-700">
                        Present compelling evidence to the judge showing why detention is
                        unnecessary and the person should be released.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-gold-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      5
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Bond Payment & Release
                      </h3>
                      <p className="text-gray-700">
                        If bond is granted, we help coordinate payment and ensure proper release
                        procedures are followed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Factors That Influence Bond Decisions
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-green-700 mb-4">Positive Factors</h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• U.S. citizen or permanent resident family members</li>
                      <li>• Stable employment history</li>
                      <li>• Property ownership or long-term residence</li>
                      <li>• Community involvement and support</li>
                      <li>• No criminal history</li>
                      <li>• Pending immigration applications</li>
                      <li>• Strong ties preventing flight risk</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-red-700 mb-4">Negative Factors</h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Prior immigration violations</li>
                      <li>• Criminal convictions</li>
                      <li>• Previous failure to appear in court</li>
                      <li>• Lack of family ties in the U.S.</li>
                      <li>• Flight risk indicators</li>
                      <li>• Public safety concerns</li>
                      <li>• Prior deportation orders</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">Typical Bond Amounts</h2>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
                  <p className="text-blue-800 mb-4">
                    Immigration bond amounts vary widely based on case factors, but here are typical
                    ranges:
                  </p>
                  <ul className="text-blue-700 space-y-2">
                    <li>
                      • <strong>Minimum bond:</strong> $1,500 (set by statute)
                    </li>
                    <li>
                      • <strong>First-time immigration violations:</strong> $5,000 - $10,000
                    </li>
                    <li>
                      • <strong>Prior immigration violations:</strong> $10,000 - $25,000
                    </li>
                    <li>
                      • <strong>Criminal history cases:</strong> $15,000 - $50,000+
                    </li>
                    <li>
                      • <strong>Complex cases:</strong> $25,000 - $100,000+
                    </li>
                  </ul>
                  <p className="text-blue-700 mt-4 italic">
                    Remember: Bond money is refundable when the immigration case concludes,
                    regardless of the outcome.
                  </p>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Why Choose Vasquez Law Firm for Detention Cases?
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-burgundy-900 mb-4">Immediate Response</h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• 24/7 emergency hotline</li>
                      <li>• Same-day detention facility visits</li>
                      <li>• Rapid bond hearing requests</li>
                      <li>• Emergency document gathering</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-burgundy-900 mb-4">Proven Results</h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• High bond success rate</li>
                      <li>• Experienced immigration court advocates</li>
                      <li>• Strong relationships with judges</li>
                      <li>• Complex case expertise</li>
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
                      How long does a bond hearing take?
                    </h3>
                    <p className="text-gray-700">
                      Bond hearings typically last 30-60 minutes, but we can often get hearings
                      scheduled within 1-2 weeks of filing the motion.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      Can I visit my family member in detention?
                    </h3>
                    <p className="text-gray-700">
                      Yes, most facilities allow visits, but rules vary by location. We help
                      families navigate visitation procedures and can arrange legal visits
                      immediately.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      What if the judge denies bond?
                    </h3>
                    <p className="text-gray-700">
                      We can appeal bond denials to the Board of Immigration Appeals or file renewed
                      bond motions if circumstances change.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-burgundy-900 mb-2">
                      How do I pay an immigration bond?
                    </h3>
                    <p className="text-gray-700">
                      Immigration bonds must be paid to ICE, not the court. We guide families
                      through the payment process and help ensure proper release procedures.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency CTA Section */}
      <section className="bg-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Don't Wait - Your Family Member Needs Help NOW
            </h2>
            <p className="text-xl mb-8">
              Every hour in detention is an hour too long. Our immigration attorneys are standing by
              to help you get your loved one released.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1-844-967-3536"
                className="inline-flex items-center px-8 py-4 bg-white text-red-600 font-bold rounded-full hover:bg-gray-100 transition-colors text-lg"
              >
                <Phone className="mr-2 w-6 h-6" />
                EMERGENCY: 1-844-YO-PELEO
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-yellow-400 text-red-600 font-bold rounded-full hover:bg-yellow-300 transition-colors text-lg"
              >
                Get Immediate Help
                <ArrowRight className="ml-2 w-6 h-6" />
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <MapPin className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-sm font-medium">Raleigh, NC</p>
                <p className="text-xs">(919) 246-8831</p>
              </div>
              <div>
                <MapPin className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-sm font-medium">Charlotte, NC</p>
                <p className="text-xs">(704) 266-2998</p>
              </div>
              <div>
                <MapPin className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-sm font-medium">Smithfield, NC</p>
                <p className="text-xs">(919) 209-8788</p>
              </div>
              <div>
                <MapPin className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-sm font-medium">Orlando, FL</p>
                <p className="text-xs">(407) 647-1900</p>
              </div>
            </div>

            <p className="mt-6 text-sm">
              Available 24/7 for detention emergencies • Hablamos Español • Over 35 years of
              immigration experience
            </p>
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
            serviceType: 'Immigration Detention Bond Hearings Legal Services',
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
            url: 'https://www.vasquezlawfirm.com/practice-areas/immigration/detention-bond-hearings/page',
            description:
              'Immigration Detention Bond Hearings legal services in North Carolina. Free consultation. Se habla español.',
          }),
        }}
      />
    </div>
  );
}
