import { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'Can I Sue Someone if Their Dog Bites Me? - Vasquez Law Firm, PLLC',
  description: '',
  openGraph: {
    title: 'Can I Sue Someone if Their Dog Bites Me? - Vasquez Law Firm, PLLC',
    description:
      'Although most dogs are beloved family pets that never harm anyone, dog bites remain a serious problem in North Carolina. Dog attacks can happen in the blink of an eye, making it difficult to react and know what to do once the attack is over. If you or someone you love has been seriously hurt by a dog, it is important to understand that you may be able to take legal action against the dog’s owner to recover damages for your suffering and medical expenses. Furthermore, taking quick action is often necessary to protect others from the dangerous dog in the future. Read more to learn about dog bites and dangerous dog laws in North Carolina. Dog Bite Injuries Dogs may be man’s best friend, but they are also animals that can act in unpredictable ways. In a matter of just a few seconds, a dog can cause serious injuries, especially to small children. Common dog bite injuries include, but are not limited to: Lacerations to hands, arms, face, and neck Disfiguring cosmetic damage, including scarring Nerve damage Torn ligaments Serious bleeding Infections Broken or fractured bones What is a Dangerous Dog? Every state defines “dangerous dog” a little differently, but in […]',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/shutterstock_1265981812-min.jpg',
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
              Can I Sue Someone if Their Dog Bites Me? - Vasquez Law Firm, PLLC
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
                  '@id': 'https://www.vasquezlawnc.com/can-i-sue-someone-if-their-dog-bites-me/',
                  url: 'https://www.vasquezlawnc.com/can-i-sue-someone-if-their-dog-bites-me/',
                  name: 'Can I Sue Someone if Their Dog Bites Me? - Vasquez Law Firm, PLLC',
                  isPartOf: { '@id': 'https://www.vasquezlawnc.com/#website' },
                  primaryImageOfPage: {
                    '@id':
                      'https://www.vasquezlawnc.com/can-i-sue-someone-if-their-dog-bites-me/#primaryimage',
                  },
                  image: {
                    '@id':
                      'https://www.vasquezlawnc.com/can-i-sue-someone-if-their-dog-bites-me/#primaryimage',
                  },
                  thumbnailUrl:
                    'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/shutterstock_1265981812-min.jpg',
                  datePublished: '2023-02-24T16:35:20+00:00',
                  dateModified: '2024-09-18T16:35:37+00:00',
                  author: {
                    '@id':
                      'https://www.vasquezlawnc.com/#/schema/person/2fa7514bdc81d9bc9644faadb9c7084f',
                  },
                  breadcrumb: {
                    '@id':
                      'https://www.vasquezlawnc.com/can-i-sue-someone-if-their-dog-bites-me/#breadcrumb',
                  },
                  inLanguage: 'en-US',
                  potentialAction: [
                    {
                      '@type': 'ReadAction',
                      target: [
                        'https://www.vasquezlawnc.com/can-i-sue-someone-if-their-dog-bites-me/',
                      ],
                    },
                  ],
                },
                {
                  '@type': 'ImageObject',
                  inLanguage: 'en-US',
                  '@id':
                    'https://www.vasquezlawnc.com/can-i-sue-someone-if-their-dog-bites-me/#primaryimage',
                  url: 'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/shutterstock_1265981812-min.jpg',
                  contentUrl:
                    'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/shutterstock_1265981812-min.jpg',
                  width: 500,
                  height: 334,
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id':
                    'https://www.vasquezlawnc.com/can-i-sue-someone-if-their-dog-bites-me/#breadcrumb',
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
                      name: 'Can I Sue Someone if Their Dog Bites Me?',
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
                  name: 'Can i sue someone if their dog bites me',
                  item: 'https://vasquezlawnc.com/can-i-sue-someone-if-their-dog-bites-me',
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
