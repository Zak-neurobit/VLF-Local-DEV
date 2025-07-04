import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, FileText, Mail, MapPin, Navigation, Phone, Scale, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Abogados de Inmigración con Condenas Penales en Raleigh, NC - Vasquez Law Firm, PLLC',
  description:
    'Vasquez Law Firm in [City], [State] - Immigration, personal injury, criminal defense & family law. Local attorneys who understand your needs. Walk-ins welcome.',
  openGraph: {
    title: 'Abogados de Inmigración con Condenas Penales en Raleigh, NC - Vasquez Law Firm, PLLC',
    description:
      'Abogados en Charlotte y Smithfield para Inmigrantes que Enfrentan Cargos Criminales Las leyes que se refieren a asuntos de inmigración en los Estados Unidos son increíblemente complejas. Los ciudadanos extranjeros que vienen de otros países a los EE. UU. a menudo desconocen cómo varios factores podrían afectar su capacidad para permanecer en los Estados Unidos legalmente. Estos mismos factores podrían incluso afectar su estado migratorio en general. Para muchos inmigrantes potenciales, un problema común es ser acusado o condenado por un delito. Aquellos que se encuentran aquí legalmente, así como los inmigrantes indocumentados, con frecuencia no consideran que ser condenados por muchos tipos de cargos criminales podría hacer que los funcionarios de inmigración inicien procedimientos de expulsión y deportación. En Vasquez Law Firm, PLLC, nuestros abogados expertos tienen una vasta experiencia tanto en asuntos de inmigración como en defensa criminal. Con más de 35 años de experiencia legal combinada, tenemos el conocimiento, las habilidades y los recursos para ayudar a los no ciudadanos en toda la región a proteger sus mejores intereses, sus derechos y su estatus migratorio en los Estados Unidos. Cómo el procesamiento penal podría afectar el estado migratorio Como ciudadano no estadounidense, si lo declaran culpable de […]',
    images: [
      {
        url: '../../../../wp-content/uploads/2024/04/meckelenburg-county-criminal-convictions-for-immigrants-lawyers-1.jpg',
      },
    ],
  },
};

export default function PagetsxPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-burgundy-900 to-burgundy-700 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Abogados de Inmigración con Condenas Penales en Raleigh, NC
            </h1>
            <p className="text-xl mb-8">Serving Raleigh and Surrounding Areas</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="bg-gold-500 text-burgundy-900 px-8 py-3 rounded-md font-semibold hover:bg-gold-600 transition-colors"
              >
                Schedule Consultation
              </Link>
              <a
                href="tel:+1-844-967-3536"
                className="border-2 border-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-burgundy-900 transition-colors"
              >
                Call +1-844-967-3536
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
              <h2 className="text-3xl font-bold text-burgundy-900 mb-8">Raleigh Office Location</h2>

              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-semibold text-burgundy-800 mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-burgundy-700 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">6801 Glenwood Ave</p>
                      <p className="text-gray-600">Raleigh, NC 27612</p>
                    </div>
                  </div>
                  <a
                    href="tel:+1-844-967-3536"
                    className="flex items-center text-gray-700 hover:text-burgundy-700"
                  >
                    <Phone className="w-5 h-5 mr-3 flex-shrink-0" />
                    <span>+1-844-967-3536</span>
                  </a>
                  <a
                    href="mailto:info@vasquezlawnc.com"
                    className="flex items-center text-gray-700 hover:text-burgundy-700"
                  >
                    <Mail className="w-5 h-5 mr-3 flex-shrink-0" />
                    <span>info@vasquezlawnc.com</span>
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
                  href="https://maps.google.com/?q=6801 Glenwood Ave+Raleigh+NC"
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
                Legal Services in Raleigh
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

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-burgundy-900 text-center mb-12">
            Why Choose Vasquez Law Firm in Raleigh?
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
                  '@id':
                    'https://www.vasquezlawnc.com/es/areas-de-practica/inmigracion/impacto-en-inmigracion-de-condenas-penales/',
                  url: 'https://www.vasquezlawnc.com/es/areas-de-practica/inmigracion/impacto-en-inmigracion-de-condenas-penales/',
                  name: 'Abogados de Inmigración con Condenas Penales en Raleigh, NC - Vasquez Law Firm, PLLC',
                  isPartOf: { '@id': 'https://www.vasquezlawnc.com/#website' },
                  primaryImageOfPage: {
                    '@id':
                      'https://www.vasquezlawnc.com/es/areas-de-practica/inmigracion/impacto-en-inmigracion-de-condenas-penales/#primaryimage',
                  },
                  image: {
                    '@id':
                      'https://www.vasquezlawnc.com/es/areas-de-practica/inmigracion/impacto-en-inmigracion-de-condenas-penales/#primaryimage',
                  },
                  thumbnailUrl:
                    '../../../../wp-content/uploads/2024/04/meckelenburg-county-criminal-convictions-for-immigrants-lawyers-1.jpg',
                  datePublished: '2024-04-05T18:46:50+00:00',
                  dateModified: '2024-04-05T18:47:03+00:00',
                  breadcrumb: {
                    '@id':
                      'https://www.vasquezlawnc.com/es/areas-de-practica/inmigracion/impacto-en-inmigracion-de-condenas-penales/#breadcrumb',
                  },
                  inLanguage: 'en-US',
                  potentialAction: [
                    {
                      '@type': 'ReadAction',
                      target: [
                        'https://www.vasquezlawnc.com/es/areas-de-practica/inmigracion/impacto-en-inmigracion-de-condenas-penales/',
                      ],
                    },
                  ],
                },
                {
                  '@type': 'ImageObject',
                  inLanguage: 'en-US',
                  '@id':
                    'https://www.vasquezlawnc.com/es/areas-de-practica/inmigracion/impacto-en-inmigracion-de-condenas-penales/#primaryimage',
                  url: '../../../../wp-content/uploads/2024/04/meckelenburg-county-criminal-convictions-for-immigrants-lawyers-1.jpg',
                  contentUrl:
                    '../../../../wp-content/uploads/2024/04/meckelenburg-county-criminal-convictions-for-immigrants-lawyers-1.jpg',
                  width: 1000,
                  height: 400,
                  caption:
                    'Condenas Penales del Condado de Mecklenburg para Abogados de Inmigración',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id':
                    'https://www.vasquezlawnc.com/es/areas-de-practica/inmigracion/impacto-en-inmigracion-de-condenas-penales/#breadcrumb',
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
                      name: 'Español',
                      item: 'https://www.vasquezlawnc.com/es/',
                    },
                    {
                      '@type': 'ListItem',
                      position: 3,
                      name: 'Abogados que prestan servicios en Raleigh, Charlotte y Smithfield, NC',
                      item: 'https://www.vasquezlawnc.com/es/areas-de-practica/',
                    },
                    {
                      '@type': 'ListItem',
                      position: 4,
                      name: 'Raleigh, NC Abogados de Inmigración',
                      item: 'https://www.vasquezlawnc.com/es/areas-de-practica/inmigracion/',
                    },
                    {
                      '@type': 'ListItem',
                      position: 5,
                      name: 'Abogados de Inmigración con Condenas Penales en Raleigh, NC',
                    },
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
                  name: 'Es',
                  item: 'https://vasquezlawnc.com/es',
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: 'Areas de practica',
                  item: 'https://vasquezlawnc.com/es/areas-de-practica',
                },
                {
                  '@type': 'ListItem',
                  position: 4,
                  name: 'Inmigracion',
                  item: 'https://vasquezlawnc.com/es/areas-de-practica/inmigracion',
                },
                {
                  '@type': 'ListItem',
                  position: 5,
                  name: 'Impacto en inmigracion de condenas penales',
                  item: 'https://vasquezlawnc.com/es/areas-de-practica/inmigracion/impacto-en-inmigracion-de-condenas-penales',
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
