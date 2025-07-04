import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Charlotte Immigration Lawyers | Personal Injury Attorneys - Vasquez Law Firm',
  description:
    'Charlotte NC immigration lawyers and personal injury attorneys. Serving Mecklenburg County with deportation defense, green cards, work visas & accident claims. Free consultation.',
};

export default function CharlottePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-burgundy-700 to-burgundy-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Charlotte Immigration & Personal Injury Lawyers
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gold-400 font-semibold">
              Serving Charlotte, Mecklenburg County & Surrounding Areas
            </p>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Expert legal representation for immigration, personal injury, workers' compensation,
              and criminal defense cases
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
            {/* Office Photo */}
            <div className="mb-12">
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/images/offices/charlotte-office.jpg"
                  alt="Charlotte office exterior - Vasquez Law Firm, PLLC"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-4">
                  Trusted Charlotte Legal Team
                </h2>
                <p className="mb-4">
                  Vasquez Law Firm's Charlotte office provides comprehensive legal services to
                  individuals and families throughout Mecklenburg County and the greater Charlotte
                  metropolitan area. Our experienced attorneys combine deep knowledge of North
                  Carolina law with a commitment to personalized client service.
                </p>
                <p className="mb-4">
                  Located in the heart of Charlotte's business district, our office is easily
                  accessible from all parts of the Queen City, including Uptown, South End, NoDa,
                  Plaza Midwood, Myers Park, and surrounding communities like Matthews, Mint Hill,
                  Pineville, and Huntersville.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                  Charlotte Practice Areas
                </h3>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-bold text-burgundy-700 mb-2">Immigration Law</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Green Cards & Permanent Residency</li>
                      <li>• Deportation Defense</li>
                      <li>• Work Visas (H-1B, L-1, E-2)</li>
                      <li>• Family-Based Immigration</li>
                      <li>• Citizenship & Naturalization</li>
                      <li>• DACA Applications</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-burgundy-700 mb-2">Personal Injury</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Car Accidents on I-77, I-85, I-485</li>
                      <li>• Truck Accidents</li>
                      <li>• Motorcycle Accidents</li>
                      <li>• Pedestrian Injuries</li>
                      <li>• Slip and Fall Cases</li>
                      <li>• Wrongful Death Claims</li>
                    </ul>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-burgundy-700 mb-2">Workers' Compensation</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Workplace Injuries</li>
                      <li>• Construction Accidents</li>
                      <li>• Repetitive Stress Injuries</li>
                      <li>• Denied Claims Appeals</li>
                      <li>• Disability Benefits</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-burgundy-700 mb-2">Criminal Defense</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• DWI/DUI Defense</li>
                      <li>• Drug Charges</li>
                      <li>• Domestic Violence</li>
                      <li>• Traffic Violations</li>
                      <li>• Expungements</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                  Why Choose Our Charlotte Office?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-gold-500 mr-2">✓</span>
                    <span>
                      <strong>Local Experience:</strong> Deep understanding of Charlotte courts and
                      legal procedures
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold-500 mr-2">✓</span>
                    <span>
                      <strong>Bilingual Services:</strong> Fluent Spanish-speaking attorneys and
                      staff
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold-500 mr-2">✓</span>
                    <span>
                      <strong>Community Focused:</strong> Active in Charlotte's Hispanic and
                      immigrant communities
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold-500 mr-2">✓</span>
                    <span>
                      <strong>Proven Results:</strong> Thousands of successful cases throughout
                      Mecklenburg County
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold-500 mr-2">✓</span>
                    <span>
                      <strong>24/7 Availability:</strong> Emergency legal help when you need it most
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                  Serving All of Greater Charlotte
                </h3>
                <p className="mb-4">
                  Our Charlotte office proudly serves clients throughout the region, including:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <ul className="space-y-1 text-gray-700">
                    <li>• Uptown Charlotte</li>
                    <li>• South End</li>
                    <li>• NoDa</li>
                    <li>• Plaza Midwood</li>
                    <li>• Myers Park</li>
                  </ul>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Matthews</li>
                    <li>• Mint Hill</li>
                    <li>• Pineville</li>
                    <li>• Huntersville</li>
                    <li>• Cornelius</li>
                  </ul>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Davidson</li>
                    <li>• Mooresville</li>
                    <li>• Indian Trail</li>
                    <li>• Monroe</li>
                    <li>• Gastonia</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Info Card */}
            <div className="bg-gray-50 rounded-lg p-8 mt-12">
              <h2 className="text-2xl font-bold text-burgundy-700 mb-6">
                Contact Our Charlotte Office
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-gold-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Charlotte Office</p>
                      <p className="text-gray-600">5701 Executive Center Dr, Suite 103</p>
                      <p className="text-gray-600">Charlotte, NC 28212</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-gold-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Phone</p>
                      <a
                        href="tel:1-844-967-3536"
                        className="text-burgundy-700 hover:text-burgundy-600"
                      >
                        1-844-YO-PELEO (967-3536)
                      </a>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-gold-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <a
                        href="mailto:info@vasquezlawfirm.com"
                        className="text-burgundy-700 hover:text-burgundy-600"
                      >
                        info@vasquezlawfirm.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-gold-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Office Hours</p>
                      <p className="text-gray-600">Mon-Fri: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Sat: By Appointment</p>
                      <p className="text-gray-600">Sun: Emergency Services Available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-12 text-center">
              <h3 className="text-2xl font-bold text-burgundy-700 mb-4">
                Ready to Fight for Your Rights?
              </h3>
              <p className="text-gray-600 mb-8">
                Contact our Charlotte office today for a free consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-burgundy-700 text-white font-bold rounded-full hover:bg-burgundy-600 transition-colors"
                >
                  Schedule Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <a
                  href="tel:1-844-967-3536"
                  className="inline-flex items-center px-8 py-4 border-2 border-burgundy-700 text-burgundy-700 font-bold rounded-full hover:bg-burgundy-50 transition-colors"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Data for SEO */}
      <Script
        id="location-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Vasquez Law Firm - Charlotte',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Charlotte',
              addressRegion: 'NC',
              addressCountry: 'US',
            },
            telephone: '+1-919-537-8722',
            url: 'https://www.vasquezlawfirm.com/locations/charlotte/page',
            priceRange: '$$',
            openingHoursSpecification: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              opens: '09:00',
              closes: '18:00',
            },
          }),
        }}
      />
    </div>
  );
}
