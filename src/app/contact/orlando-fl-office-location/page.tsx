import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Mail, MapPin, Calendar, Navigation, Users, Scale, FileText } from 'lucide-react';
import GoogleMap from '@/components/GoogleMap';
import { getOfficeBySlug } from '@/data/locations';

export const metadata: Metadata = {
  title: 'Orlando, FL Office Location - Vasquez Law Firm, PLLC',
  description:
    'Find the best route to our Orlando, FL office. Get accurate maps and directions to visit our workers’ comp lawyers. Contact us for assistance today!',
  openGraph: {
    title: 'Orlando, FL Office Location - Vasquez Law Firm, PLLC',
    description:
      'Find the best route to our Orlando, FL office. Get accurate maps and directions to visit our workers’ comp lawyers. Contact us for assistance today!',
    images: [{ url: '/images/og-default.jpg' }],
  },
};

export default function OrlandoFlOfficeLocationPage() {
  const office = getOfficeBySlug('orlando-fl-office-location');

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-burgundy-900 to-burgundy-700 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Map & Directions – Orlando</h1>
            <p className="text-xl mb-8">Serving Orlando and Surrounding Areas</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="bg-gold-500 text-burgundy-900 px-8 py-3 rounded-md font-semibold hover:bg-gold-600 transition-colors"
              >
                Schedule Consultation
              </Link>
              <a
                href="tel:+1-407-530-5397"
                className="border-2 border-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-burgundy-900 transition-colors"
              >
                Call +1-407-530-5397
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Office Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Office Details */}
            <div>
              <h2 className="text-3xl font-bold text-burgundy-900 mb-8">Orlando Office Location</h2>

              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-semibold text-burgundy-800 mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-burgundy-700 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Orlando Office</p>
                      <p className="text-gray-600">Orlando, FL 32801</p>
                    </div>
                  </div>
                  <a
                    href="tel:+1-407-530-5397"
                    className="flex items-center text-gray-700 hover:text-burgundy-700"
                  >
                    <Phone className="w-5 h-5 mr-3 flex-shrink-0" />
                    <span>+1-407-530-5397</span>
                  </a>
                  <a
                    href="mailto:leads@vasquezlawfirm.com"
                    className="flex items-center text-gray-700 hover:text-burgundy-700"
                  >
                    <Mail className="w-5 h-5 mr-3 flex-shrink-0" />
                    <span>leads@vasquezlawfirm.com</span>
                  </a>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-semibold text-burgundy-800 mb-4">Office Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Saturday - Sunday</span>
                    <span className="font-medium">By Appointment</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  24/7 Emergency Legal Services Available
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <a
                  href="https://maps.google.com/?q=Orlando Office+Orlando+FL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-burgundy-700 text-white py-3 rounded-md hover:bg-burgundy-800 transition-colors"
                >
                  <Navigation className="w-5 h-5 mr-2" />
                  Get Directions
                </a>
                <Link
                  href="/contact"
                  className="flex items-center justify-center bg-gold-500 text-burgundy-900 py-3 rounded-md hover:bg-gold-600 transition-colors"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Appointment
                </Link>
              </div>
            </div>

            {/* Practice Areas */}
            <div>
              <h2 className="text-3xl font-bold text-burgundy-900 mb-8">
                Legal Services in Orlando
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-burgundy-800 mb-3">Immigration Law</h3>
                  <p className="text-gray-700 mb-3">
                    Comprehensive immigration services including green cards, citizenship,
                    deportation defense, and visa applications.
                  </p>
                  <Link
                    href="/practice-areas/immigration"
                    className="text-burgundy-700 hover:text-burgundy-900 font-medium"
                  >
                    Learn More →
                  </Link>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-burgundy-800 mb-3">Personal Injury</h3>
                  <p className="text-gray-700 mb-3">
                    Fighting for maximum compensation in car accidents, slip and fall, and other
                    injury cases. No fee unless we win.
                  </p>
                  <Link
                    href="/practice-areas/personal-injury"
                    className="text-burgundy-700 hover:text-burgundy-900 font-medium"
                  >
                    Learn More →
                  </Link>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-burgundy-800 mb-3">Criminal Defense</h3>
                  <p className="text-gray-700 mb-3">
                    Aggressive defense for DUI/DWI, drug charges, assault, and other criminal
                    matters. 24/7 availability.
                  </p>
                  <Link
                    href="/practice-areas/criminal-defense"
                    className="text-burgundy-700 hover:text-burgundy-900 font-medium"
                  >
                    Learn More →
                  </Link>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-burgundy-800 mb-3">Family Law</h3>
                  <p className="text-gray-700 mb-3">
                    Compassionate representation in divorce, child custody, alimony, and other
                    family matters.
                  </p>
                  <Link
                    href="/practice-areas/family-law"
                    className="text-burgundy-700 hover:text-burgundy-900 font-medium"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-burgundy-900 text-center mb-12">
            Find Our Orlando Office
          </h2>
          {office && (
            <div className="max-w-4xl mx-auto">
              <GoogleMap
                address={office.fullAddress}
                lat={office.lat}
                lng={office.lng}
                zoom={16}
                height="450px"
                officeName={office.name}
                phone={office.phone}
                hours={office.hours}
                showDirectionsButton={true}
                className="shadow-lg"
              />
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-burgundy-900 text-center mb-12">
            Why Choose Vasquez Law Firm in Orlando?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-burgundy-700 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-burgundy-800 mb-2">Bilingual Services</h3>
              <p className="text-gray-700">
                Full legal services in English and Spanish to better serve our diverse community.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-burgundy-700 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Scale className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-burgundy-800 mb-2">60+ Years Experience</h3>
              <p className="text-gray-700">
                Proven track record of success in thousands of cases throughout North Carolina.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-burgundy-700 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-burgundy-800 mb-2">Free Consultation</h3>
              <p className="text-gray-700">
                No-obligation case evaluation to discuss your legal options and rights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebPage',
                  '@id': 'https://www.vasquezlawnc.com/contact/orlando-fl-office-location/',
                  url: 'https://www.vasquezlawnc.com/contact/orlando-fl-office-location/',
                  name: 'Orlando, FL Office Location - Vasquez Law Firm, PLLC',
                  isPartOf: { '@id': 'https://www.vasquezlawnc.com/#website' },
                  datePublished: '2024-09-13T14:33:10+00:00',
                  dateModified: '2025-03-18T18:17:09+00:00',
                  description:
                    'Find the best route to our Orlando, FL office. Get accurate maps and directions to visit our workers’ comp lawyers. Contact us for assistance today!',
                  breadcrumb: {
                    '@id':
                      'https://www.vasquezlawnc.com/contact/orlando-fl-office-location/#breadcrumb',
                  },
                  inLanguage: 'en-US',
                  potentialAction: [
                    {
                      '@type': 'ReadAction',
                      target: ['https://www.vasquezlawnc.com/contact/orlando-fl-office-location/'],
                    },
                  ],
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id':
                    'https://www.vasquezlawnc.com/contact/orlando-fl-office-location/#breadcrumb',
                  itemListElement: [
                    {
                      '@type': 'ListItem',
                      position: 1,
                      name: 'Home',
                      item: 'https://www.vasquezlawnc.com/',
                    },
                    {
                      '@type': 'ListItem',
                      position: 2,
                      name: 'Contact',
                      item: 'https://www.vasquezlawnc.com/contact/',
                    },
                    { '@type': 'ListItem', position: 3, name: 'Orlando, FL Office Location' },
                  ],
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://www.vasquezlawnc.com/#website',
                  url: 'https://www.vasquezlawnc.com/',
                  name: 'Vasquez Law Firm, PLLC',
                  description: 'Raleigh, NC Immigration Attorney',
                  potentialAction: [
                    {
                      '@type': 'SearchAction',
                      target: {
                        '@type': 'EntryPoint',
                        urlTemplate: 'https://www.vasquezlawnc.com/?s={search_term_string}',
                      },
                      'query-input': {
                        '@type': 'PropertyValueSpecification',
                        valueRequired: true,
                        valueName: 'search_term_string',
                      },
                    },
                  ],
                  inLanguage: 'en-US',
                },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'LegalService',
              '@id': 'https://vasquezlawnc.com/#organization',
              name: 'Vasquez Law Firm, PLLC',
              alternateName: 'Vasquez Law',
              url: 'https://vasquezlawnc.com',
              logo: 'https://vasquezlawnc.com/images/logo.png',
              sameAs: [
                'https://www.facebook.com/vasquezlawfirm',
                'https://twitter.com/vasquezlawfirm',
                'https://www.linkedin.com/company/vasquez-law-firm',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+1-844-967-3536',
                contactType: 'customer service',
                availableLanguage: ['English', 'Spanish'],
              },
            },
            {
              '@context': 'https://schema.org',
              '@type': 'LegalService',
              name: 'Vasquez Law Firm - Orlando',
              image: '',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Orlando Office',
                addressLocality: 'Orlando',
                addressRegion: 'FL',
                postalCode: '32801',
              },
              geo: { '@type': 'GeoCoordinates', latitude: '28.538336', longitude: '-81.379234' },
              telephone: '+1-407-530-5397',
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '09:00',
                  closes: '17:00',
                },
              ],
              priceRange: 'Free Consultation',
              availableLanguage: ['English', 'Spanish'],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://vasquezlawnc.com',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Contact',
                  item: 'https://vasquezlawnc.com/contact',
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: 'Orlando fl office location',
                  item: 'https://vasquezlawnc.com/contact/orlando-fl-office-location',
                },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'LegalService',
              name: 'Vasquez Law Firm',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                reviewCount: '127',
                bestRating: '5',
              },
            },
          ]),
        }}
      />
    </div>
  );
}
