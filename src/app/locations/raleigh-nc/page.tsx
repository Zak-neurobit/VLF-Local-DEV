import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Car, Users, Scale, FileText, Building } from 'lucide-react';
import GoogleMap from '@/components/GoogleMap';
import { getOfficeBySlug } from '@/data/locations';
import { StructuredData } from '@/components/SEO/StructuredData';

export const metadata: Metadata = {
  title: 'Raleigh NC Immigration & Injury Lawyers | Vasquez Law Firm Office',
  description:
    'Visit our Raleigh NC law office for immigration, personal injury, workers comp & criminal defense. Free consultations. Open M-F 8:30-5:30. Call 919-755-9425.',
  keywords:
    'Raleigh immigration lawyer, Raleigh personal injury attorney, Raleigh NC law office, Vasquez Law Firm Raleigh',
  openGraph: {
    title: 'Raleigh NC Office - Vasquez Law Firm',
    description:
      'Experienced immigration & injury lawyers in Raleigh NC. Free consultations available. Serving Wake County and surrounding areas.',
    images: [{ url: '/images/offices/raleigh-office.jpg' }],
    type: 'website',
    locale: 'en_US',
  },
};

const raleighOfficeSchema = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  '@id': 'https://www.vasquezlawnc.com/locations/raleigh-nc#legalservice',
  name: 'Vasquez Law Firm - Raleigh Office',
  image: 'https://www.vasquezlawnc.com/images/offices/raleigh-office.jpg',
  url: 'https://www.vasquezlawnc.com/locations/raleigh-nc',
  telephone: '+1-919-755-9425',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '4426 Louisburg Road',
    addressLocality: 'Raleigh',
    addressRegion: 'NC',
    postalCode: '27616',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 35.8486,
    longitude: -78.5755,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:30',
      closes: '17:30',
    },
  ],
  areaServed: [
    {
      '@type': 'City',
      name: 'Raleigh',
      '@id': 'https://en.wikipedia.org/wiki/Raleigh,_North_Carolina',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Wake County',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Durham County',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Johnston County',
    },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Legal Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Immigration Law',
          description: 'Green cards, visas, citizenship, deportation defense',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Personal Injury',
          description: 'Car accidents, slip & fall, medical malpractice',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Workers Compensation',
          description: 'Workplace injuries, disability claims',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Criminal Defense',
          description: 'DWI, drug charges, assault, theft',
        },
      },
    ],
  },
  review: [
    {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
      author: {
        '@type': 'Person',
        name: 'Maria G.',
      },
      reviewBody:
        'Excellent immigration lawyers. They helped me get my green card after years of waiting.',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '127',
    bestRating: '5',
    worstRating: '1',
  },
};

export default function RaleighLocationPage() {
  const office = getOfficeBySlug('raleigh-nc-office-location');

  return (
    <>
      <StructuredData data={raleighOfficeSchema} />

      <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-brand-charcoal via-brand-crimson to-brand-charcoal text-white py-20">
          <div className="absolute inset-0 bg-black/20" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Raleigh Immigration & Injury Law Office
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gold-200">
                Serving Wake County & The Triangle Since 1993
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="bg-gradient-to-r from-gold-400 to-gold-500 text-brand-charcoal px-8 py-4 rounded-full font-bold text-lg hover:from-gold-500 hover:to-gold-600 transform hover:scale-105 transition-all shadow-xl"
                >
                  Schedule Free Consultation
                </Link>
                <a
                  href="tel:919-755-9425"
                  className="border-2 border-gold-400 text-gold-400 px-8 py-4 rounded-full font-bold text-lg hover:bg-gold-400 hover:text-brand-charcoal transition-all"
                >
                  <Phone className="inline-block w-5 h-5 mr-2" />
                  (919) 755-9425
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Office Info Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Contact Information */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-brand-charcoal mb-8 flex items-center">
                  <Building className="w-8 h-8 mr-3 text-brand-crimson" />
                  Raleigh Office Information
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-brand-crimson mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Office Address</h3>
                      <p className="text-gray-600">
                        4426 Louisburg Road
                        <br />
                        Raleigh, NC 27616
                      </p>
                      <a
                        href="https://maps.google.com/?q=4426+Louisburg+Road+Raleigh+NC+27616"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-crimson hover:text-brand-gold mt-2 inline-block font-medium"
                      >
                        Get Directions →
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="w-6 h-6 text-brand-crimson mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Phone Numbers</h3>
                      <p className="text-gray-600">
                        Main:{' '}
                        <a
                          href="tel:919-755-9425"
                          className="text-brand-crimson hover:text-brand-gold font-medium"
                        >
                          (919) 755-9425
                        </a>
                        <br />
                        Toll-Free:{' '}
                        <a
                          href="tel:844-967-3536"
                          className="text-brand-crimson hover:text-brand-gold font-medium"
                        >
                          1-844-YO-PELEO
                        </a>
                        <br />
                        Fax: (919) 755-9426
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="w-6 h-6 text-brand-crimson mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Office Hours</h3>
                      <div className="text-gray-600">
                        <p>
                          <strong>Monday - Friday:</strong> 8:30 AM - 5:30 PM
                        </p>
                        <p>
                          <strong>Saturday:</strong> By Appointment Only
                        </p>
                        <p>
                          <strong>Sunday:</strong> Closed
                        </p>
                        <p className="mt-2 text-sm">*24/7 Emergency Line Available*</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="w-6 h-6 text-brand-crimson mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Email</h3>
                      <a
                        href="mailto:raleigh@vasquezlawnc.com"
                        className="text-brand-crimson hover:text-brand-gold"
                      >
                        raleigh@vasquezlawnc.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Link
                      href="/contact"
                      className="bg-brand-crimson text-white text-center py-3 px-4 rounded-lg hover:bg-brand-crimson-dark transition-colors font-medium"
                    >
                      Book Consultation
                    </Link>
                    <Link
                      href="/payment"
                      className="bg-brand-gold text-brand-charcoal text-center py-3 px-4 rounded-lg hover:bg-brand-gold-dark transition-colors font-medium"
                    >
                      Make Payment
                    </Link>
                  </div>
                </div>
              </div>

              {/* Practice Areas & Attorneys */}
              <div className="space-y-8">
                {/* Practice Areas */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-3xl font-bold text-brand-charcoal mb-6 flex items-center">
                    <Scale className="w-8 h-8 mr-3 text-brand-crimson" />
                    Practice Areas
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      'Immigration Law',
                      'Personal Injury',
                      'Workers Compensation',
                      'Criminal Defense',
                      'Family Law',
                      'Traffic Violations',
                    ].map(area => (
                      <Link
                        key={area}
                        href={`/practice-areas/${area.toLowerCase().replace(' ', '-')}`}
                        className="bg-gray-50 hover:bg-brand-crimson hover:text-white text-gray-700 px-4 py-3 rounded-lg transition-all text-center font-medium"
                      >
                        {area}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Attorneys */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-3xl font-bold text-brand-charcoal mb-6 flex items-center">
                    <Users className="w-8 h-8 mr-3 text-brand-crimson" />
                    Our Raleigh Attorneys
                  </h2>
                  <div className="space-y-4">
                    <Link
                      href="/attorneys/william-vasquez"
                      className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <h3 className="font-semibold text-lg text-brand-charcoal">William Vasquez</h3>
                      <p className="text-gray-600">Managing Partner</p>
                      <p className="text-sm text-brand-crimson mt-1">30+ Years Experience</p>
                    </Link>
                    <Link
                      href="/attorneys/adrianna-ingram"
                      className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <h3 className="font-semibold text-lg text-brand-charcoal">Adrianna Ingram</h3>
                      <p className="text-gray-600">Immigration Attorney</p>
                      <p className="text-sm text-brand-crimson mt-1">Fluent in Spanish</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-brand-charcoal mb-12">
              Find Our Raleigh Office
            </h2>

            {/* Google Map */}
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <GoogleMap
                  address="4426 Louisburg Road, Raleigh, NC 27616"
                  lat={35.8438}
                  lng={-78.7206}
                  officeName="Vasquez Law Firm - Raleigh Office"
                  phone="(919) 533-7000"
                  hours="Mon-Fri: 8:30 AM - 5:30 PM"
                  height="500px"
                />
              </div>

              {/* Parking & Accessibility Info */}
              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="font-semibold text-xl mb-4 flex items-center">
                    <Car className="w-6 h-6 mr-2 text-brand-crimson" />
                    Parking Information
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Free parking available on-site</li>
                    <li>• Handicap accessible parking spaces</li>
                    <li>• Street parking also available</li>
                    <li>• Covered parking for rainy days</li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="font-semibold text-xl mb-4 flex items-center">
                    <FileText className="w-6 h-6 mr-2 text-brand-crimson" />
                    What to Bring
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Photo ID (driver&apos;s license or passport)</li>
                    <li>• Any legal documents related to your case</li>
                    <li>• List of questions or concerns</li>
                    <li>• Payment method (if applicable)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Areas We Serve */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-brand-charcoal mb-8">
                Serving Raleigh & Surrounding Areas
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  'Raleigh',
                  'Cary',
                  'Apex',
                  'Holly Springs',
                  'Morrisville',
                  'Wake Forest',
                  'Garner',
                  'Knightdale',
                  'Fuquay-Varina',
                  'Clayton',
                  'Durham',
                  'Chapel Hill',
                ].map(city => (
                  <div
                    key={city}
                    className="bg-gray-50 px-4 py-3 rounded-lg text-gray-700 font-medium"
                  >
                    {city}
                  </div>
                ))}
              </div>
              <p className="mt-8 text-gray-600">
                Can&apos;t make it to our office? We offer virtual consultations and can come to you
                for serious injury cases.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-brand-crimson to-brand-charcoal text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Discuss Your Case?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Our Raleigh attorneys are ready to fight for you. Schedule your free consultation
              today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="bg-brand-gold text-brand-charcoal px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-gold-dark transform hover:scale-105 transition-all"
              >
                Book Free Consultation
              </Link>
              <a
                href="tel:919-755-9425"
                className="border-2 border-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-brand-crimson transition-all"
              >
                Call Now: (919) 755-9425
              </a>
            </div>
            <p className="mt-6 text-gold-200">
              Se Habla Español • Free Parking • Evening Appointments Available
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
