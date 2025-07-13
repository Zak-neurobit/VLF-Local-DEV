import { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'Media - Vasquez Law Firm, PLLC',
  description: '',
  openGraph: {
    title: 'Media - Vasquez Law Firm, PLLC',
    description: '',
    images: [{ url: 'https://i.ytimg.com/vi/R9QzOQ72bJw/mqdefault.jpg' }],
  },
};

export default function MediaInfoPage() {
  const videos = [
    {
      id: 'R9QzOQ72bJw',
      title: 'Vasquez Law Firm 1-844-YO-PELEO Consulta Gratis',
      description:
        'Learn about our free consultation services and how we can help with your legal needs.',
    },
    {
      id: '_fDlhDLXqo8',
      title: 'Despierta Raleigh - Cancelación de Deportación',
      description:
        'William Vasquez discusses cancellation of deportation cases on Despierta Raleigh.',
    },
    {
      id: '-ZsirkqFd6g',
      title: 'Despierta Raleigh - Accidente Automovilístico',
      description: 'Important information about auto accident cases and your legal rights.',
    },
    {
      id: 'KxQlYxI789U',
      title: 'Despierta Raleigh - Accidentes En El Trabajo',
      description: 'Understanding workplace accidents and workers compensation claims.',
    },
    {
      id: 'Fu_VcC277AY',
      title: 'Special Immigrant Juvenile Status (SIJS)',
      description: 'Learn about SIJS and how it can help young immigrants.',
    },
    {
      id: 'KMzMzXclZe8',
      title: 'Como Protegerse de Inmigración',
      description: 'Tips and strategies to protect yourself from immigration enforcement.',
    },
    {
      id: 'dbAfNulIvQo',
      title: 'INMIGRACIÓN AL DÍA - Defensa de Deportación',
      description: 'Attorney Vasquez discusses deportation defense strategies.',
    },
    {
      id: 'rWzk--2194s',
      title: 'Acción Diferida DACA',
      description: 'Understanding DACA and Deferred Action for Childhood Arrivals.',
    },
    {
      id: 'No6YfFOGrds',
      title: 'La Visa U - Víctimas de Crimen',
      description: 'Information about U Visas for crime victims.',
    },
    {
      id: 'wu-5Cdq9BQU',
      title: 'La Famosa Ley de 10 Años de Inmigración',
      description: 'Explaining the 10-year immigration law and cancellation of removal.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-burgundy-900 to-burgundy-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Media & Video Gallery</h1>
            <p className="text-xl">
              Watch our attorneys discuss important legal topics and learn about your rights
            </p>
          </div>
        </div>
      </section>

      {/* Media Features */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-burgundy-900 mb-8 text-center">Featured In</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-bold text-burgundy-700 mb-2">Despierta Raleigh</h3>
                  <p className="text-gray-600">
                    Regular legal segments on immigration and personal injury law
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-bold text-burgundy-700 mb-2">Inmigración Al Día</h3>
                  <p className="text-gray-600">Weekly immigration law updates and Q&A sessions</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-bold text-burgundy-700 mb-2">Community Events</h3>
                  <p className="text-gray-600">Speaking engagements and educational seminars</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Gallery */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-burgundy-900 mb-8 text-center">Video Gallery</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map(video => (
                <div key={video.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="relative" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-burgundy-900 mb-2">{video.title}</h3>
                    <p className="text-gray-600 text-sm">{video.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Press & Media Inquiries */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-burgundy-900 mb-4">Press & Media Inquiries</h2>
            <p className="text-lg text-gray-700 mb-8">
              For media inquiries, interviews, or speaking engagements, please contact our office.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:media@vasquezlawnc.com"
                className="bg-burgundy-700 text-white px-8 py-3 rounded-md hover:bg-burgundy-800 transition-colors"
              >
                Email Media Team
              </a>
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
                  '@id': 'https://www.vasquezlawnc.com/media-info/',
                  url: 'https://www.vasquezlawnc.com/media-info/',
                  name: 'Media - Vasquez Law Firm, PLLC',
                  isPartOf: { '@id': 'https://www.vasquezlawnc.com/#website' },
                  primaryImageOfPage: {
                    '@id': 'https://www.vasquezlawnc.com/media-info/#primaryimage',
                  },
                  image: { '@id': 'https://www.vasquezlawnc.com/media-info/#primaryimage' },
                  thumbnailUrl: 'https://i.ytimg.com/vi/R9QzOQ72bJw/mqdefault.jpg',
                  datePublished: '2024-02-16T15:39:02+00:00',
                  dateModified: '2024-09-13T16:23:07+00:00',
                  breadcrumb: { '@id': 'https://www.vasquezlawnc.com/media-info/#breadcrumb' },
                  inLanguage: 'en-US',
                  potentialAction: [
                    { '@type': 'ReadAction', target: ['https://www.vasquezlawnc.com/media-info/'] },
                  ],
                },
                {
                  '@type': 'ImageObject',
                  inLanguage: 'en-US',
                  '@id': 'https://www.vasquezlawnc.com/media-info/#primaryimage',
                  url: 'https://i.ytimg.com/vi/R9QzOQ72bJw/mqdefault.jpg',
                  contentUrl: 'https://i.ytimg.com/vi/R9QzOQ72bJw/mqdefault.jpg',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://www.vasquezlawnc.com/media-info/#breadcrumb',
                  itemListElement: [
                    {
                      '@type': 'ListItem',
                      position: 1,
                      name: 'Home',
                      item: 'https://www.vasquezlawnc.com/',
                    },
                    { '@type': 'ListItem', position: 2, name: 'Media' },
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
                  name: 'Media info',
                  item: 'https://vasquezlawnc.com/media-info',
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
