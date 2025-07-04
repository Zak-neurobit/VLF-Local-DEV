import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'William G. Vasquez - Founding Partner | Immigration & Personal Injury Attorney',
  description:
    'William Vasquez is the founding partner of Vasquez Law Firm, PLLC. With over 20 years of experience in immigration law, personal injury, and criminal defense serving NC & FL.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-burgundy-700 to-burgundy-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">William G. Vasquez</h1>
            <p className="text-xl md:text-2xl mb-8 text-gold-400 font-semibold">
              Founding Partner - Fighting for Your Rights Since 2003
            </p>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              &ldquo;YO PELEO POR TI™&rdquo; - Over 20 years defending immigrants and injury victims
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
            {/* Attorney Photo */}
            <div className="flex flex-col md:flex-row gap-8 mb-12">
              <div className="md:w-1/3">
                <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/images/attorneys/william-vasquez.jpg"
                    alt="William Vasquez, Attorney at Vasquez Law Firm"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                  />
                </div>
              </div>
              <div className="md:w-2/3">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-4">
                  Founding Partner & Lead Attorney
                </h2>
                <p className="text-gray-700 text-lg mb-4">
                  William G. Vasquez is the founding partner of Vasquez Law Firm, PLLC, and a
                  passionate advocate for immigrant rights and injury victims throughout North
                  Carolina and Florida. With over two decades of legal experience, he has built a
                  reputation as a fierce litigator who truly fights for his clients.
                </p>
                <p className="text-gray-700 text-lg mb-4">
                  Born in El Salvador and raised in the United States, William understands firsthand
                  the immigrant experience and the challenges faced by those seeking a better life
                  in America. As a U.S. Air Force veteran, he brings military discipline and
                  strategic thinking to every case.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="font-bold text-burgundy-700 mb-2">Languages</h4>
                    <p className="text-gray-600">English, Spanish (Native)</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-burgundy-700 mb-2">Experience</h4>
                    <p className="text-gray-600">20+ Years</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-burgundy-900 mb-4">Education</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-gold-500 mr-2">•</span>
                      <div>
                        <p className="font-semibold">J.D., Law</p>
                        <p className="text-gray-600">
                          North Carolina Central University School of Law, 2003
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold-500 mr-2">•</span>
                      <div>
                        <p className="font-semibold">B.A., Political Science</p>
                        <p className="text-gray-600">
                          University of North Carolina at Chapel Hill, 2000
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-burgundy-900 mb-4">Bar Admissions</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="text-gold-500 mr-2">•</span>
                      <span>North Carolina State Bar</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-gold-500 mr-2">•</span>
                      <span>Florida State Bar</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-gold-500 mr-2">•</span>
                      <span>U.S. District Court, Eastern District of NC</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-gold-500 mr-2">•</span>
                      <span>U.S. District Court, Middle District of NC</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-burgundy-900 mb-4">Practice Areas</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-burgundy-700 mb-3">Immigration Law</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Deportation Defense</li>
                      <li>• Family-Based Immigration</li>
                      <li>• Business Immigration</li>
                      <li>• Citizenship & Naturalization</li>
                      <li>• DACA Applications</li>
                      <li>• Asylum & Refugee Cases</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-burgundy-700 mb-3">Personal Injury & More</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Car & Truck Accidents</li>
                      <li>• Workers&apos; Compensation</li>
                      <li>• Wrongful Death</li>
                      <li>• Criminal Defense</li>
                      <li>• DWI/DUI Defense</li>
                      <li>• Family Law</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-burgundy-900 mb-4">Notable Achievements</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-gold-500 mr-2 flex-shrink-0 mt-1">✓</span>
                      <span>Successfully defended thousands of clients facing deportation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold-500 mr-2 flex-shrink-0 mt-1">✓</span>
                      <span>Recovered millions of dollars for injury victims</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold-500 mr-2 flex-shrink-0 mt-1">✓</span>
                      <span>Featured legal analyst on Despierta Raleigh and Spanish media</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold-500 mr-2 flex-shrink-0 mt-1">✓</span>
                      <span>
                        Active member of the American Immigration Lawyers Association (AILA)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold-500 mr-2 flex-shrink-0 mt-1">✓</span>
                      <span>
                        U.S. Air Force veteran - bringing military discipline to legal practice
                      </span>
                    </li>
                  </ul>
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Contact our experienced attorneys today for a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-burgundy-700 text-white font-bold rounded-full hover:bg-burgundy-800 transition-colors"
              >
                Schedule Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="tel:1-844-967-3536"
                className="inline-flex items-center px-8 py-4 bg-gold-500 text-burgundy-900 font-bold rounded-full hover:bg-gold-400 transition-colors"
              >
                <Phone className="mr-2 w-5 h-5" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Data for SEO */}
      <Script
        id="attorney-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'William Vasquez',
            jobTitle: 'Attorney',
            image: 'https://www.vasquezlawfirm.com/images/attorneys/william-vasquez.jpg',
            worksFor: {
              '@type': 'LegalService',
              name: 'Vasquez Law Firm, PLLC',
              url: 'https://www.vasquezlawfirm.com',
              telephone: '+1-919-537-8722',
              priceRange: '$$',
            },
            url: 'https://www.vasquezlawfirm.com/attorneys/william-vasquez/page',
            sameAs: [
              'https://www.linkedin.com/company/vasquez-law-firm',
              'https://www.facebook.com/vasquezlawfirm',
            ],
          }),
        }}
      />
    </div>
  );
}
