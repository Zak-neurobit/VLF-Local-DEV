import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { Phone, MapPin, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Smithfield Office - Vasquez Law Firm, PLLC - Vasquez Law Firm, PLLC',
  description: '',
};

export default function SmithfieldPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-burgundy-700 to-burgundy-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Smithfield Office - Vasquez Law Firm, PLLC
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gold-400 font-semibold">
              YO PELEO POR TI™ - I FIGHT FOR YOU
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
                  src="/images/offices/smithfield-office.jpg"
                  alt="Smithfield office exterior - Vasquez Law Firm, PLLC"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-4">Smithfield Office</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-start mb-4">
                    <MapPin className="w-6 h-6 text-burgundy-700 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Address:</p>
                      <p>
                        702 S Brightleaf Blvd Suite B<br />
                        Smithfield, NC 27577
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start mb-4">
                    <Phone className="w-6 h-6 text-burgundy-700 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Phone:</p>
                      <p>
                        <a href="tel:(919) 209-8788" className="text-burgundy-700 hover:underline">
                          (919) 209-8788
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="w-6 h-6 text-burgundy-700 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Office Hours:</p>
                      <p>Mon-Fri: 9:00 AM - 5:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                  Services Available at This Location
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Immigration Law</li>
                  <li>Personal Injury</li>
                  <li>Workers&apos; Compensation</li>
                  <li>Criminal Defense</li>
                  <li>Family Law</li>
                </ul>
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
        id="location-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Vasquez Law Firm - Smithfield',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Smithfield',
              addressRegion: 'NC',
              addressCountry: 'US',
            },
            telephone: '+1-919-537-8722',
            url: 'https://www.vasquezlawfirm.com/locations/smithfield/page',
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
