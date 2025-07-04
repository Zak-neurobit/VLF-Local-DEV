import { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = {
  title:
    'What Are the Requirements for Adjustment of Status for Immigrants? - Vasquez Law Firm, PLLC',
  description: '',
  openGraph: {
    title:
      'What Are the Requirements for Adjustment of Status for Immigrants? - Vasquez Law Firm, PLLC',
    description:
      'Immigrants who live in the United States include those who have lawful permanent resident status and those who have only received authorization to stay in the country temporarily. While permanent residents will be able to continue living in the U.S. without fear of deportation, other immigrants may be in the country on temporary work visas or visitor visas. These immigrants may wish to become permanent residents, and to do so, they may apply for adjustment of status. By understanding the requirements that must be met to become a lawful permanent resident, an immigrant can make sure they will be able to complete this process successfully. Who Is Eligible for Adjustment of Status? In order to adjust their status, an immigrant must be eligible to apply for a Green Card. There are several eligibility categories, including: Family-based Green Cards: Immediate relatives (spouses, parents, and unmarried children under 21 years old) of U.S. citizens can apply for adjustment of status immediately after their immigrant petition has been approved. Immediate relatives of Green Card holders or other family members of U.S. citizens may have to wait until a family preference visa becomes available based on their relationship with the petitioner. Employment-based Green Cards: Immigrants who receive sponsorship from an employer may be […]',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/shutterstock_1575922960-1.jpg',
      },
    ],
  },
};

export default function PagetsxPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-burgundy-900 to-burgundy-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              What Are the Requirements for Adjustment of Status for Immigrants? - Vasquez Law Firm,
              PLLC
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
                    'https://www.vasquezlawnc.com/what-are-the-requirements-for-adjustment-of-status-for-immigrants/',
                  url: 'https://www.vasquezlawnc.com/what-are-the-requirements-for-adjustment-of-status-for-immigrants/',
                  name: 'What Are the Requirements for Adjustment of Status for Immigrants? - Vasquez Law Firm, PLLC',
                  isPartOf: { '@id': 'https://www.vasquezlawnc.com/#website' },
                  primaryImageOfPage: {
                    '@id':
                      'https://www.vasquezlawnc.com/what-are-the-requirements-for-adjustment-of-status-for-immigrants/#primaryimage',
                  },
                  image: {
                    '@id':
                      'https://www.vasquezlawnc.com/what-are-the-requirements-for-adjustment-of-status-for-immigrants/#primaryimage',
                  },
                  thumbnailUrl:
                    'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/shutterstock_1575922960-1.jpg',
                  datePublished: '2023-08-22T16:22:05+00:00',
                  dateModified: '2024-09-18T16:22:25+00:00',
                  author: {
                    '@id':
                      'https://www.vasquezlawnc.com/#/schema/person/2fa7514bdc81d9bc9644faadb9c7084f',
                  },
                  breadcrumb: {
                    '@id':
                      'https://www.vasquezlawnc.com/what-are-the-requirements-for-adjustment-of-status-for-immigrants/#breadcrumb',
                  },
                  inLanguage: 'en-US',
                  potentialAction: [
                    {
                      '@type': 'ReadAction',
                      target: [
                        'https://www.vasquezlawnc.com/what-are-the-requirements-for-adjustment-of-status-for-immigrants/',
                      ],
                    },
                  ],
                },
                {
                  '@type': 'ImageObject',
                  inLanguage: 'en-US',
                  '@id':
                    'https://www.vasquezlawnc.com/what-are-the-requirements-for-adjustment-of-status-for-immigrants/#primaryimage',
                  url: 'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/shutterstock_1575922960-1.jpg',
                  contentUrl:
                    'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/shutterstock_1575922960-1.jpg',
                  width: 500,
                  height: 334,
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id':
                    'https://www.vasquezlawnc.com/what-are-the-requirements-for-adjustment-of-status-for-immigrants/#breadcrumb',
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
                      name: 'What Are the Requirements for Adjustment of Status for Immigrants?',
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
                  name: 'What are the requirements for adjustment of status for immigrants',
                  item: 'https://vasquezlawnc.com/what-are-the-requirements-for-adjustment-of-status-for-immigrants',
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
