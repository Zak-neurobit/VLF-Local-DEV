import { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'Types of Damages in a Motorcycle Accident Injury Claim - Vasquez Law Firm, PLLC',
  description:
    'Injured? Our [specific injury] lawyers fight for maximum compensation. No fee unless we win. Free case evaluation. Call 1-844-YO-PELEO.',
  openGraph: {
    title: 'Types of Damages in a Motorcycle Accident Injury Claim - Vasquez Law Firm, PLLC',
    description:
      'Motorcycle accidents can have a devastating effect on someone’s life due to the severity of their injuries. The medical expenses, loss of income, and emotional trauma caused by an accident can quickly add up, leaving the victim with substantial financial burdens. If the accident was caused by someone else’s negligence or intentional actions, the victim might be eligible to pursue a personal injury claim and seek compensation for their damages. In North Carolina, a victim can recover several types of damages in a motorcycle accident injury claim. These damages fall into two broad categories: compensatory and punitive damages. Compensatory Damages Compensatory damages are intended to repay the victim for the losses caused by the motorcycle accident. These damages can be categorized into various subsections, such as: Economic Damages – The economic impact of the accident is expressed in quantifiable financial losses, such as medical costs, lost wages, diminished career opportunities, and motorcycle repairs or replacement. Non-Economic Damages – Non-monetary damage, such as psychological pain, emotional anguish, and the inability to enjoy life at its fullest capacity, can all be the results of a motorcycle accident. Such non-economic losses are known as non-economic damages. Punitive Damages Punitive damages are designed to punish […]',
    images: [{ url: '../wp-content/uploads/2024/09/shutterstock_2074316275-min.jpg' }],
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
              Types of Damages in a Motorcycle Accident Injury Claim - Vasquez Law Firm, PLLC
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
                    'https://www.vasquezlawnc.com/types-of-damages-in-a-motorcycle-accident-injury-claim/',
                  url: 'https://www.vasquezlawnc.com/types-of-damages-in-a-motorcycle-accident-injury-claim/',
                  name: 'Types of Damages in a Motorcycle Accident Injury Claim - Vasquez Law Firm, PLLC',
                  isPartOf: { '@id': 'https://www.vasquezlawnc.com/#website' },
                  primaryImageOfPage: {
                    '@id':
                      'https://www.vasquezlawnc.com/types-of-damages-in-a-motorcycle-accident-injury-claim/#primaryimage',
                  },
                  image: {
                    '@id':
                      'https://www.vasquezlawnc.com/types-of-damages-in-a-motorcycle-accident-injury-claim/#primaryimage',
                  },
                  thumbnailUrl: '../wp-content/uploads/2024/09/shutterstock_2074316275-min.jpg',
                  datePublished: '2023-03-31T16:32:55+00:00',
                  dateModified: '2024-09-18T16:33:17+00:00',
                  author: {
                    '@id':
                      'https://www.vasquezlawnc.com/#/schema/person/2fa7514bdc81d9bc9644faadb9c7084f',
                  },
                  breadcrumb: {
                    '@id':
                      'https://www.vasquezlawnc.com/types-of-damages-in-a-motorcycle-accident-injury-claim/#breadcrumb',
                  },
                  inLanguage: 'en-US',
                  potentialAction: [
                    {
                      '@type': 'ReadAction',
                      target: [
                        'https://www.vasquezlawnc.com/types-of-damages-in-a-motorcycle-accident-injury-claim/',
                      ],
                    },
                  ],
                },
                {
                  '@type': 'ImageObject',
                  inLanguage: 'en-US',
                  '@id':
                    'https://www.vasquezlawnc.com/types-of-damages-in-a-motorcycle-accident-injury-claim/#primaryimage',
                  url: '../wp-content/uploads/2024/09/shutterstock_2074316275-min.jpg',
                  contentUrl: '../wp-content/uploads/2024/09/shutterstock_2074316275-min.jpg',
                  width: 500,
                  height: 313,
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id':
                    'https://www.vasquezlawnc.com/types-of-damages-in-a-motorcycle-accident-injury-claim/#breadcrumb',
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
                      name: 'Types of Damages in a Motorcycle Accident Injury Claim',
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
                  name: 'Types of damages in a motorcycle accident injury claim',
                  item: 'https://vasquezlawnc.com/types-of-damages-in-a-motorcycle-accident-injury-claim',
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
