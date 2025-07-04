import { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = {
  title:
    'Will North Carolina Legalize Marijuana for Medical or Recreational Use - Vasquez Law Firm, PLLC',
  description: '',
  openGraph: {
    title:
      'Will North Carolina Legalize Marijuana for Medical or Recreational Use - Vasquez Law Firm, PLLC',
    description:
      'Marijuana has been used for centuries by people around the world. Even though it has been found to be less harmful than legal substances such as alcohol and tobacco, and it also has a variety of medical benefits, it has been classified as an illegal controlled substance. Because of this, many people have been charged with drug crimes related to the possession or distribution of marijuana. However, attitudes surrounding marijuana use have been changing, and in many parts of the United States, it has been legalized for medical and recreational purposes. In the future, North Carolina could follow the example of other states and approve the drug for legal use in the state. New Marijuana Laws Introduced by North Carolina Lawmakers Several bills have recently been introduced in the North Carolina state legislature that could legalize marijuana possession and use by adults. House Bill 626 would allow people over the age of 21 to possess up to two ounces of marijuana, 15 grams of concentrated cannabis, products containing up to 2,000 milligrams of THC, or six cannabis plants. It would also allow for the sale and on-site consumption of marijuana at licensed businesses, and it would provide automatic expungement of criminal records for those who were […]',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/shutterstock_1161207328-min.jpg',
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
              Will North Carolina Legalize Marijuana for Medical or Recreational Use - Vasquez Law
              Firm, PLLC
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
                    'https://www.vasquezlawnc.com/will-north-carolina-legalize-marijuana-for-medical-or-recreational-use/',
                  url: 'https://www.vasquezlawnc.com/will-north-carolina-legalize-marijuana-for-medical-or-recreational-use/',
                  name: 'Will North Carolina Legalize Marijuana for Medical or Recreational Use - Vasquez Law Firm, PLLC',
                  isPartOf: { '@id': 'https://www.vasquezlawnc.com/#website' },
                  primaryImageOfPage: {
                    '@id':
                      'https://www.vasquezlawnc.com/will-north-carolina-legalize-marijuana-for-medical-or-recreational-use/#primaryimage',
                  },
                  image: {
                    '@id':
                      'https://www.vasquezlawnc.com/will-north-carolina-legalize-marijuana-for-medical-or-recreational-use/#primaryimage',
                  },
                  thumbnailUrl:
                    'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/shutterstock_1161207328-min.jpg',
                  datePublished: '2023-06-09T16:25:30+00:00',
                  dateModified: '2024-09-18T16:25:50+00:00',
                  author: {
                    '@id':
                      'https://www.vasquezlawnc.com/#/schema/person/2fa7514bdc81d9bc9644faadb9c7084f',
                  },
                  breadcrumb: {
                    '@id':
                      'https://www.vasquezlawnc.com/will-north-carolina-legalize-marijuana-for-medical-or-recreational-use/#breadcrumb',
                  },
                  inLanguage: 'en-US',
                  potentialAction: [
                    {
                      '@type': 'ReadAction',
                      target: [
                        'https://www.vasquezlawnc.com/will-north-carolina-legalize-marijuana-for-medical-or-recreational-use/',
                      ],
                    },
                  ],
                },
                {
                  '@type': 'ImageObject',
                  inLanguage: 'en-US',
                  '@id':
                    'https://www.vasquezlawnc.com/will-north-carolina-legalize-marijuana-for-medical-or-recreational-use/#primaryimage',
                  url: 'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/shutterstock_1161207328-min.jpg',
                  contentUrl:
                    'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/shutterstock_1161207328-min.jpg',
                  width: 500,
                  height: 334,
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id':
                    'https://www.vasquezlawnc.com/will-north-carolina-legalize-marijuana-for-medical-or-recreational-use/#breadcrumb',
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
                      name: 'Will North Carolina Legalize Marijuana for Medical or Recreational Use',
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
                  name: 'Will north carolina legalize marijuana for medical or recreational use',
                  item: 'https://vasquezlawnc.com/will-north-carolina-legalize-marijuana-for-medical-or-recreational-use',
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
