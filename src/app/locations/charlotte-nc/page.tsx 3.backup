import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Car, Users, Scale, FileText, Building, Shield, Award, Globe, Gavel } from 'lucide-react';
import GoogleMap from '@/components/GoogleMap';
import { getOfficeBySlug } from '@/data/locations';
import { StructuredData } from '@/components/SEO/StructuredData';

export const metadata: Metadata = {
  title: 'Charlotte NC Immigration & Personal Injury Lawyers | Vasquez Law Firm, PLLC',
  description:
    'Visit our Charlotte NC flagship law office for immigration, personal injury, workers comp & criminal defense. Free consultations. Serving Mecklenburg County. Call 704-358-0470.',
  keywords: 'Charlotte immigration lawyer, Charlotte personal injury attorney, Charlotte NC law office, Vasquez Law Firm Charlotte, abogados en Charlotte NC',
  openGraph: {
    title: 'Charlotte NC Office - Vasquez Law Firm | Flagship Location',
    description:
      'Experienced immigration & injury lawyers in Charlotte NC. Free consultations, bilingual services. Serving Charlotte metro area & all of Mecklenburg County.',
    images: [{ url: '/images/offices/charlotte-office.jpg' }],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Charlotte Immigration & Injury Lawyers | Vasquez Law Firm',
    description: 'Visit our Charlotte flagship office. Free consultations for immigration, personal injury, workers comp & criminal defense cases.',
    images: ['/images/offices/charlotte-office.jpg'],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/locations/charlotte-nc',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/charlotte-nc',
      'es-ES': 'https://www.vasquezlawnc.com/es/locations/charlotte-nc',
    },
  },
};

const charlotteOfficeSchema = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  '@id': 'https://www.vasquezlawnc.com/locations/charlotte-nc#legalservice',
  name: 'Vasquez Law Firm - Charlotte Flagship Office',
  image: 'https://www.vasquezlawnc.com/images/offices/charlotte-office.jpg',
  url: 'https://www.vasquezlawnc.com/locations/charlotte-nc',
  telephone: '+1-704-358-0470',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '5701 Executive Center Drive, Suite 103',
    addressLocality: 'Charlotte',
    addressRegion: 'NC',
    postalCode: '28212',
    addressCountry: 'US'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 35.2954,
    longitude: -80.7511
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:30',
      closes: '17:30'
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '13:00'
    }
  ],
  areaServed: [
    {
      '@type': 'City',
      name: 'Charlotte',
      '@id': 'https://en.wikipedia.org/wiki/Charlotte,_North_Carolina'
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Mecklenburg County'
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Union County'
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Cabarrus County'
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Gaston County'
    },
    {
      '@type': 'AdministrativeArea',
      name: 'York County, SC'
    }
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
          description: 'Green cards, visas, citizenship, deportation defense, asylum, DACA'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Personal Injury',
          description: 'Car accidents, truck accidents, slip & fall, medical malpractice, wrongful death'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Workers Compensation',
          description: 'Workplace injuries, disability claims, construction accidents'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Criminal Defense',
          description: 'DWI/DUI, drug charges, assault, theft, traffic violations'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Family Law',
          description: 'Divorce, child custody, support, domestic violence'
        }
      }
    ]
  },
  review: [
    {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5'
      },
      author: {
        '@type': 'Person',
        name: 'Carlos M.'
      },
      reviewBody: 'The best immigration lawyers in Charlotte! They helped my entire family get our green cards. Professional, caring, and truly dedicated.'
    },
    {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5'
      },
      author: {
        '@type': 'Person',
        name: 'Jennifer R.'
      },
      reviewBody: 'Outstanding personal injury representation. They fought hard for my case and got me the compensation I deserved after my accident.'
    }
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '234',
    bestRating: '5',
    worstRating: '1'
  },
  award: [
    {
      '@type': 'Award',
      name: 'Best Immigration Law Firm - Charlotte Business Journal'
    },
    {
      '@type': 'Award',
      name: 'Top 10 Personal Injury Attorneys in NC'
    }
  ],
  knowsLanguage: ['English', 'Spanish'],
  paymentAccepted: ['Cash', 'Check', 'Credit Card', 'Debit Card', 'PayPal', 'Zelle'],
  slogan: 'Fighting for Justice, Building Your Future'
};

export default function CharlotteLocationPage() {
  const office = getOfficeBySlug('charlotte-nc-office-location');

  return (
    <>
      <StructuredData data={charlotteOfficeSchema} />
      
      <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
        {/* Hero Section - EPIC Flagship Design */}
        <section className="relative bg-gradient-to-br from-brand-charcoal via-brand-crimson to-brand-charcoal text-white py-24 overflow-hidden">
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-[url('/images/charlotte-skyline.jpg')] bg-cover bg-center opacity-20" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto text-center">
              <div className="inline-flex items-center bg-gold-500/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
                <Award className="w-5 h-5 mr-2 text-gold-400" />
                <span className="text-gold-400 font-semibold">Flagship Office</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Charlotte Immigration & Injury Law Firm
              </h1>
              <p className="text-xl md:text-3xl mb-8 text-gold-200 font-light">
                Serving Queen City & The Carolinas Since 1993
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Link
                  href="/contact"
                  className="bg-gradient-to-r from-gold-400 to-gold-500 text-brand-charcoal px-10 py-5 rounded-full font-bold text-lg hover:from-gold-500 hover:to-gold-600 transform hover:scale-105 transition-all shadow-2xl"
                >
                  Schedule Free Consultation
                </Link>
                <a
                  href="tel:704-358-0470"
                  className="border-2 border-gold-400 text-gold-400 px-10 py-5 rounded-full font-bold text-lg hover:bg-gold-400 hover:text-brand-charcoal transition-all backdrop-blur-sm"
                >
                  <Phone className="inline-block w-5 h-5 mr-2" />
                  (704) 358-0470
                </a>
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-gold-200">
                <span className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  30+ Years Experience
                </span>
                <span className="flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  Se Habla Español
                </span>
                <span className="flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Top Rated Firm
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Office Info Grid - Enhanced Design */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Contact Information */}
              <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
                <h2 className="text-4xl font-bold text-brand-charcoal mb-10 flex items-center">
                  <Building className="w-10 h-10 mr-4 text-brand-crimson" />
                  Charlotte Flagship Office
                </h2>
                
                <div className="space-y-8">
                  <div className="flex items-start group">
                    <MapPin className="w-7 h-7 text-brand-crimson mt-1 mr-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <h3 className="font-bold text-xl mb-3">Office Location</h3>
                      <p className="text-gray-600 text-lg">
                        5701 Executive Center Drive, Suite 103<br />
                        Charlotte, NC 28212
                      </p>
                      <a 
                        href="https://maps.google.com/?q=5701+Executive+Center+Drive+Suite+103+Charlotte+NC+28212"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-crimson hover:text-brand-gold mt-3 inline-flex items-center font-semibold text-lg group"
                      >
                        Get Directions 
                        <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <Phone className="w-7 h-7 text-brand-crimson mt-1 mr-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <h3 className="font-bold text-xl mb-3">Contact Numbers</h3>
                      <p className="text-gray-600 text-lg">
                        Main: <a href="tel:704-358-0470" className="text-brand-crimson hover:text-brand-gold font-semibold">(704) 358-0470</a><br />
                        Toll-Free: <a href="tel:844-967-3536" className="text-brand-crimson hover:text-brand-gold font-semibold">1-844-YO-PELEO</a><br />
                        Fax: (704) 358-0471<br />
                        <span className="text-sm text-brand-gold mt-2 inline-block">24/7 Emergency Line Available</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <Clock className="w-7 h-7 text-brand-crimson mt-1 mr-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <h3 className="font-bold text-xl mb-3">Business Hours</h3>
                      <div className="text-gray-600 text-lg">
                        <p><strong>Monday - Friday:</strong> 8:30 AM - 5:30 PM</p>
                        <p><strong>Saturday:</strong> 9:00 AM - 1:00 PM</p>
                        <p><strong>Sunday:</strong> By Appointment Only</p>
                        <p className="mt-3 text-sm bg-gold-50 p-3 rounded-lg text-brand-charcoal">
                          <strong>Walk-ins Welcome!</strong> No appointment needed for initial consultations.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <Mail className="w-7 h-7 text-brand-crimson mt-1 mr-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <h3 className="font-bold text-xl mb-3">Email Contact</h3>
                      <a 
                        href="mailto:charlotte@vasquezlawnc.com" 
                        className="text-brand-crimson hover:text-brand-gold text-lg font-medium"
                      >
                        charlotte@vasquezlawnc.com
                      </a>
                      <p className="text-gray-600 mt-2">Response within 24 hours</p>
                    </div>
                  </div>
                </div>

                {/* Quick Actions - Enhanced */}
                <div className="mt-10 pt-10 border-t border-gray-200">
                  <h3 className="font-bold text-xl mb-6">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Link
                      href="/contact"
                      className="bg-gradient-to-r from-brand-crimson to-brand-crimson-dark text-white text-center py-4 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all font-semibold"
                    >
                      Book Consultation
                    </Link>
                    <Link
                      href="/payment"
                      className="bg-gradient-to-r from-brand-gold to-brand-gold-dark text-brand-charcoal text-center py-4 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all font-semibold"
                    >
                      Make Payment
                    </Link>
                  </div>
                </div>
              </div>

              {/* Practice Areas & Features */}
              <div className="space-y-8">
                {/* Practice Areas - Enhanced */}
                <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
                  <h2 className="text-4xl font-bold text-brand-charcoal mb-8 flex items-center">
                    <Scale className="w-10 h-10 mr-4 text-brand-crimson" />
                    Practice Areas
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: 'Immigration Law', icon: '🌎', hot: true },
                      { name: 'Personal Injury', icon: '🚗', hot: true },
                      { name: 'Workers Compensation', icon: '👷' },
                      { name: 'Criminal Defense', icon: '⚖️' },
                      { name: 'Family Law', icon: '👨‍👩‍👧‍👦' },
                      { name: 'Traffic Violations', icon: '🚦' }
                    ].map((area) => (
                      <Link
                        key={area.name}
                        href={`/practice-areas/${area.name.toLowerCase().replace(' ', '-')}`}
                        className={`${
                          area.hot 
                            ? 'bg-gradient-to-r from-brand-crimson to-brand-crimson-dark text-white' 
                            : 'bg-gray-50 hover:bg-brand-crimson hover:text-white text-gray-700'
                        } px-5 py-4 rounded-xl transition-all text-center font-semibold flex items-center justify-center group`}
                      >
                        <span className="text-2xl mr-2 group-hover:scale-110 transition-transform">{area.icon}</span>
                        {area.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Our Charlotte Team */}
                <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
                  <h2 className="text-4xl font-bold text-brand-charcoal mb-8 flex items-center">
                    <Users className="w-10 h-10 mr-4 text-brand-crimson" />
                    Our Charlotte Legal Team
                  </h2>
                  <div className="space-y-4">
                    <Link
                      href="/attorneys/william-vasquez"
                      className="block p-5 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-brand-crimson hover:to-brand-crimson-dark hover:text-white rounded-xl transition-all group"
                    >
                      <h3 className="font-bold text-xl text-brand-charcoal group-hover:text-white">William Vasquez</h3>
                      <p className="text-gray-600 group-hover:text-gold-200">Managing Partner & Lead Immigration Attorney</p>
                      <p className="text-sm text-brand-crimson group-hover:text-gold-400 mt-2">30+ Years Experience • Board Certified</p>
                    </Link>
                    <Link
                      href="/attorneys/mark-kelsey"
                      className="block p-5 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-brand-crimson hover:to-brand-crimson-dark hover:text-white rounded-xl transition-all group"
                    >
                      <h3 className="font-bold text-xl text-brand-charcoal group-hover:text-white">Mark Kelsey</h3>
                      <p className="text-gray-600 group-hover:text-gold-200">Senior Personal Injury Attorney</p>
                      <p className="text-sm text-brand-crimson group-hover:text-gold-400 mt-2">$50M+ in Settlements • Trial Expert</p>
                    </Link>
                    <Link
                      href="/attorneys/roselyn-torrellas"
                      className="block p-5 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-brand-crimson hover:to-brand-crimson-dark hover:text-white rounded-xl transition-all group"
                    >
                      <h3 className="font-bold text-xl text-brand-charcoal group-hover:text-white">Roselyn Torrellas</h3>
                      <p className="text-gray-600 group-hover:text-gold-200">Criminal Defense & Family Law</p>
                      <p className="text-sm text-brand-crimson group-hover:text-gold-400 mt-2">Fluent in Spanish • Former Prosecutor</p>
                    </Link>
                  </div>
                </div>

                {/* Office Features */}
                <div className="bg-gradient-to-r from-brand-charcoal to-brand-charcoal-light rounded-3xl shadow-2xl p-10 text-white">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <Shield className="w-8 h-8 mr-3 text-gold-400" />
                    Why Choose Our Charlotte Office
                  </h3>
                  <ul className="space-y-3 text-gray-100">
                    <li className="flex items-start">
                      <span className="text-gold-400 mr-3 text-xl">✓</span>
                      <span>Largest law office in Charlotte metro area</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold-400 mr-3 text-xl">✓</span>
                      <span>Walk-in consultations welcome</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold-400 mr-3 text-xl">✓</span>
                      <span>On-site interpreters for 5+ languages</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold-400 mr-3 text-xl">✓</span>
                      <span>Same-day document preparation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold-400 mr-3 text-xl">✓</span>
                      <span>Direct access to senior attorneys</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Map Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-brand-charcoal mb-4">
                Visit Our Charlotte Flagship Office
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Conveniently located in Executive Center with easy access from I-85, I-77, and I-485
              </p>
            </div>
            
            {/* Google Map */}
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                <GoogleMap 
                  address="5701 Executive Center Drive, Suite 103, Charlotte, NC 28212"
                  lat={35.2271}
                  lng={-80.8431}
                  officeName="Vasquez Law Firm - Charlotte Flagship Office"
                  phone="(704) 533-7000"
                  hours="Mon-Fri: 8:00 AM - 5:00 PM"
                  height="600px"
                />
              </div>
              
              {/* Parking & Transportation Info */}
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform">
                  <h3 className="font-bold text-2xl mb-5 flex items-center text-brand-charcoal">
                    <Car className="w-8 h-8 mr-3 text-brand-crimson" />
                    Parking & Access
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-brand-gold mr-2">•</span>
                      <span>Free parking garage with 500+ spaces</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-gold mr-2">•</span>
                      <span>Valet parking available (complimentary)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-gold mr-2">•</span>
                      <span>Handicap accessible entrance & elevators</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-gold mr-2">•</span>
                      <span>EV charging stations available</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-gold mr-2">•</span>
                      <span>Covered drop-off area</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform">
                  <h3 className="font-bold text-2xl mb-5 flex items-center text-brand-charcoal">
                    <FileText className="w-8 h-8 mr-3 text-brand-crimson" />
                    What to Bring
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-brand-gold mr-2">•</span>
                      <span>Government-issued photo ID</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-gold mr-2">•</span>
                      <span>All relevant legal documents</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-gold mr-2">•</span>
                      <span>Insurance information (if applicable)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-gold mr-2">•</span>
                      <span>List of questions for your attorney</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-gold mr-2">•</span>
                      <span>Payment method or insurance card</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform">
                  <h3 className="font-bold text-2xl mb-5 flex items-center text-brand-charcoal">
                    <Globe className="w-8 h-8 mr-3 text-brand-crimson" />
                    Languages & Services
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-brand-gold mr-2">•</span>
                      <span>Spanish, English, Portuguese</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-gold mr-2">•</span>
                      <span>Mandarin & Vietnamese interpreters</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-gold mr-2">•</span>
                      <span>Document translation services</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-gold mr-2">•</span>
                      <span>Notary public on-site</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-gold mr-2">•</span>
                      <span>Video conferencing available</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Areas We Serve - Charlotte Metro */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-brand-charcoal mb-4">
                  Proudly Serving Charlotte Metro & Beyond
                </h2>
                <p className="text-xl text-gray-600">
                  From Uptown to the suburbs, we&apos;re here for all of Greater Charlotte
                </p>
              </div>
              
              {/* Charlotte Neighborhoods */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-brand-charcoal mb-6 text-center">Charlotte Neighborhoods</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[
                    'Uptown Charlotte', 'South End', 'NoDa', 'Plaza Midwood',
                    'Dilworth', 'Myers Park', 'Elizabeth', 'Ballantyne',
                    'University City', 'Steele Creek', 'Montford', 'Cotswold'
                  ].map((area) => (
                    <div 
                      key={area}
                      className="bg-gradient-to-r from-gray-50 to-gray-100 px-5 py-3 rounded-xl text-center font-medium text-gray-700 hover:from-brand-crimson hover:to-brand-crimson-dark hover:text-white transition-all cursor-pointer"
                    >
                      {area}
                    </div>
                  ))}
                </div>
              </div>

              {/* Surrounding Cities */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-brand-charcoal mb-6 text-center">Surrounding Cities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[
                    'Matthews', 'Mint Hill', 'Pineville', 'Indian Trail',
                    'Huntersville', 'Cornelius', 'Davidson', 'Mooresville',
                    'Gastonia', 'Concord', 'Monroe', 'Rock Hill, SC',
                    'Fort Mill, SC', 'Tega Cay, SC', 'Belmont', 'Mount Holly'
                  ].map((city) => (
                    <div 
                      key={city}
                      className="bg-white border-2 border-gray-200 px-5 py-3 rounded-xl text-center font-medium text-gray-700 hover:border-brand-crimson hover:text-brand-crimson transition-all cursor-pointer"
                    >
                      {city}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-brand-gold/10 to-brand-crimson/10 rounded-3xl p-8 text-center">
                <p className="text-lg text-gray-700 font-medium">
                  Can&apos;t make it to our Charlotte office? No problem! We offer:
                </p>
                <div className="flex flex-wrap justify-center gap-4 mt-6">
                  <div className="bg-white px-6 py-3 rounded-full shadow-md">
                    <span className="text-brand-crimson font-semibold">Virtual Consultations</span>
                  </div>
                  <div className="bg-white px-6 py-3 rounded-full shadow-md">
                    <span className="text-brand-crimson font-semibold">Home & Hospital Visits</span>
                  </div>
                  <div className="bg-white px-6 py-3 rounded-full shadow-md">
                    <span className="text-brand-crimson font-semibold">Weekend Appointments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center text-brand-charcoal mb-12">
                What Our Charlotte Clients Say
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-gold-500 text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    &quot;Mr. Vasquez and his team helped me through the most difficult time of my life. Their Charlotte office is amazing - professional, caring, and they really fight for you!&quot;
                  </p>
                  <p className="font-semibold text-brand-charcoal">Maria G.</p>
                  <p className="text-sm text-gray-500">Immigration Case</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-gold-500 text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    &quot;After my accident, they handled everything. Got me the medical care I needed and a settlement that exceeded my expectations. Highly recommend!&quot;
                  </p>
                  <p className="font-semibold text-brand-charcoal">James T.</p>
                  <p className="text-sm text-gray-500">Personal Injury</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-gold-500 text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    &quot;The best decision I made was walking into their Charlotte office. They saved my career and my family&apos;s future. Forever grateful!&quot;
                  </p>
                  <p className="font-semibold text-brand-charcoal">Robert M.</p>
                  <p className="text-sm text-gray-500">Criminal Defense</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Epic CTA Section */}
        <section className="relative bg-gradient-to-br from-brand-crimson via-brand-charcoal to-brand-crimson text-white py-24 overflow-hidden">
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-gold-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500/20 rounded-full blur-3xl"></div>
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              Your Justice Can&apos;t Wait
            </h2>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gold-200">
              Charlotte&apos;s premier law firm is ready to fight for you. Don&apos;t face your legal challenges alone.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/contact"
                className="bg-gradient-to-r from-gold-400 to-gold-500 text-brand-charcoal px-12 py-6 rounded-full font-bold text-xl hover:from-gold-500 hover:to-gold-600 transform hover:scale-110 transition-all shadow-2xl"
              >
                Start Your Free Consultation
              </Link>
              <a
                href="tel:704-358-0470"
                className="border-3 border-white bg-white/10 backdrop-blur-sm px-12 py-6 rounded-full font-bold text-xl hover:bg-white hover:text-brand-crimson transition-all"
              >
                <Phone className="inline-block w-6 h-6 mr-3" />
                Call (704) 358-0470
              </a>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-8 text-gold-200 text-lg">
              <span className="flex items-center">
                <Gavel className="w-6 h-6 mr-2" />
                No Win, No Fee
              </span>
              <span className="flex items-center">
                <Globe className="w-6 h-6 mr-2" />
                Se Habla Español
              </span>
              <span className="flex items-center">
                <Clock className="w-6 h-6 mr-2" />
                24/7 Availability
              </span>
              <span className="flex items-center">
                <Shield className="w-6 h-6 mr-2" />
                30+ Years Fighting
              </span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}