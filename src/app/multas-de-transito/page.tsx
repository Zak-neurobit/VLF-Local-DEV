import { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'Multas de Tránsito - Vasquez Law Firm, PLLC',
  description:
    'En Vasquez Law Firm, sabemos que recibir una multa de tránsito puede generar preocupación y dudas sobre sus derechos y opciones legales. Muchas personas piensan que la única solución es pagar la multa y seguir adelante, pero hacerlo sin conocer las consecuencias puede afectar su licencia, historial de manejo y hasta sus finanzas a largo plazo.',
  openGraph: {
    title: 'Multas de Tránsito - Vasquez Law Firm, PLLC',
    description:
      'En Vasquez Law Firm, sabemos que recibir una multa de tránsito puede generar preocupación y dudas sobre sus derechos y opciones legales. Muchas personas piensan que la única solución es pagar la multa y seguir adelante, pero hacerlo sin conocer las consecuencias puede afectar su licencia, historial de manejo y hasta sus finanzas a largo plazo.',
    images: [{ url: '/images/og-default.jpg' }],
  },
};

export default function MultasDeTransitoPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-burgundy-900 to-burgundy-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Multas de Tránsito - Vasquez Law Firm, PLLC
            </h1>
            <p className="text-xl"></p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none"></div>

            {/* Internal Links */}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-burgundy-900 mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-700 mb-8">
              Contact us today for a free consultation with our experienced attorneys.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="bg-burgundy-700 text-white px-8 py-3 rounded-md hover:bg-burgundy-800 transition-colors"
              >
                Schedule Consultation
              </Link>
              <a
                href="tel:+18449673536"
                className="bg-gold-500 text-burgundy-900 px-8 py-3 rounded-md hover:bg-gold-600 transition-colors"
              >
                Call 1-844-YO-PELEO
              </a>
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
                  '@id': 'https://www.vasquezlawnc.com/multas-de-transito/',
                  url: 'https://www.vasquezlawnc.com/multas-de-transito/',
                  name: 'Multas de Tránsito - Vasquez Law Firm, PLLC',
                  isPartOf: { '@id': 'https://www.vasquezlawnc.com/#website' },
                  datePublished: '2025-02-15T06:38:33+00:00',
                  dateModified: '2025-02-18T08:18:36+00:00',
                  description:
                    'En Vasquez Law Firm, sabemos que recibir una multa de tránsito puede generar preocupación y dudas sobre sus derechos y opciones legales. Muchas personas piensan que la única solución es pagar la multa y seguir adelante, pero hacerlo sin conocer las consecuencias puede afectar su licencia, historial de manejo y hasta sus finanzas a largo plazo.',
                  breadcrumb: {
                    '@id': 'https://www.vasquezlawnc.com/multas-de-transito/#breadcrumb',
                  },
                  inLanguage: 'en-US',
                  potentialAction: [
                    {
                      '@type': 'ReadAction',
                      target: ['https://www.vasquezlawnc.com/multas-de-transito/'],
                    },
                  ],
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://www.vasquezlawnc.com/multas-de-transito/#breadcrumb',
                  itemListElement: [
                    {
                      '@type': 'ListItem',
                      position: 1,
                      name: 'Home',
                      item: 'https://www.vasquezlawnc.com/',
                    },
                    { '@type': 'ListItem', position: 2, name: 'Multas de Tránsito' },
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
                  name: 'Multas de transito',
                  item: 'https://vasquezlawnc.com/multas-de-transito',
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
