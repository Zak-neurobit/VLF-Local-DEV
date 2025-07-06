import { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'Who Pays if Workers Die From Workplace Accidents? - Vasquez Law Firm, PLLC',
  description:
    'Injured? Our [specific injury] lawyers fight for maximum compensation. No fee unless we win. Free case evaluation. Call 1-844-YO-PELEO.',
  openGraph: {
    title: 'Who Pays if Workers Die From Workplace Accidents? - Vasquez Law Firm, PLLC',
    description:
      'A tragic accident claimed the life of an amphibious excavator operator in the Cape Fear River in August. The North Carolina Department of Labor’s Occupational Safety and Health Division is investigating this accident because it happened on federally-owned property. As the investigation into this death is ongoing, the cause of the accident has not yet been established. If a fatal workplace incident takes the life of your family member, are you eligible to receive compensation through a workers’ comp claim? Who is responsible for paying you? The compassionate lawyers at Vasquez Law Firm, PLLC can answer those questions during your free consultation, so call us today. What Does North Carolina’s Workers’ Comp Cover? Most employers in North Carolina are required by law to purchase workers’ compensation insurance. These policies pay specific benefits to workers who become ill or injured on the job, including: Medical expenses A portion of lost wages Temporary or permanent disability benefits If an employee dies because of a work-related injury or illness, eligible survivors can receive workers’ comp death benefits. When workers or their families accept workers’ comp benefits, they usually enter a tacit agreement not to pursue personal injury or wrongful death claims against the employer. However, depending on the circumstances, you […]',
    images: [
      { url: 'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/blog_20240917171743.jpg' },
    ],
  },
};

export default function WhoPaysIfWorkersDieFromWorkplaceAccidentsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-burgundy-900 to-burgundy-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Who Pays if Workers Die From Workplace Accidents? - Vasquez Law Firm, PLLC
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
                  '@id':
                    'https://www.vasquezlawnc.com/who-pays-if-workers-die-from-workplace-accidents/',
                  url: 'https://www.vasquezlawnc.com/who-pays-if-workers-die-from-workplace-accidents/',
                  name: 'Who Pays if Workers Die From Workplace Accidents? - Vasquez Law Firm, PLLC',
                  isPartOf: { '@id': 'https://www.vasquezlawnc.com/#website' },
                  primaryImageOfPage: {
                    '@id':
                      'https://www.vasquezlawnc.com/who-pays-if-workers-die-from-workplace-accidents/#primaryimage',
                  },
                  image: {
                    '@id':
                      'https://www.vasquezlawnc.com/who-pays-if-workers-die-from-workplace-accidents/#primaryimage',
                  },
                  thumbnailUrl:
                    'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/blog_20240917171743.jpg',
                  datePublished: '2024-09-17T15:51:10+00:00',
                  dateModified: '2024-09-18T16:10:26+00:00',
                  author: {
                    '@id':
                      'https://www.vasquezlawnc.com/#/schema/person/2fa7514bdc81d9bc9644faadb9c7084f',
                  },
                  breadcrumb: {
                    '@id':
                      'https://www.vasquezlawnc.com/who-pays-if-workers-die-from-workplace-accidents/#breadcrumb',
                  },
                  inLanguage: 'en-US',
                  potentialAction: [
                    {
                      '@type': 'ReadAction',
                      target: [
                        'https://www.vasquezlawnc.com/who-pays-if-workers-die-from-workplace-accidents/',
                      ],
                    },
                  ],
                },
                {
                  '@type': 'ImageObject',
                  inLanguage: 'en-US',
                  '@id':
                    'https://www.vasquezlawnc.com/who-pays-if-workers-die-from-workplace-accidents/#primaryimage',
                  url: 'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/blog_20240917171743.jpg',
                  contentUrl:
                    'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/blog_20240917171743.jpg',
                  width: 440,
                  height: 330,
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id':
                    'https://www.vasquezlawnc.com/who-pays-if-workers-die-from-workplace-accidents/#breadcrumb',
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
                      name: 'Who Pays if Workers Die From Workplace Accidents?',
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
                {
                  '@type': 'Person',
                  '@id':
                    'https://www.vasquezlawnc.com/#/schema/person/2fa7514bdc81d9bc9644faadb9c7084f',
                  name: 'wvasquez@vasquezlawfirm.com',
                  image: {
                    '@type': 'ImageObject',
                    inLanguage: 'en-US',
                    '@id': 'https://www.vasquezlawnc.com/#/schema/person/image/',
                    url: 'https://secure.gravatar.com/avatar/3ffe54679303fa3618cce95dfbfbfb41e698dfeba8e2eeae67ca5cfd8c1ecdbc?s=96&d=mm&r=g',
                    contentUrl:
                      'https://secure.gravatar.com/avatar/3ffe54679303fa3618cce95dfbfbfb41e698dfeba8e2eeae67ca5cfd8c1ecdbc?s=96&d=mm&r=g',
                    caption: 'wvasquez@vasquezlawfirm.com',
                  },
                  url: 'https://www.vasquezlawnc.com/author/wvasquezvasquezlawfirm-com/',
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
                  name: 'Who pays if workers die from workplace accidents',
                  item: 'https://vasquezlawnc.com/who-pays-if-workers-die-from-workplace-accidents',
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
