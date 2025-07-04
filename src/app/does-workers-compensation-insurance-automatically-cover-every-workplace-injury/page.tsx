import { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = {
  title:
    'Does Workers’ Compensation Insurance Automatically Cover Every Workplace Injury? - Vasquez Law Firm, PLLC',
  description:
    'Injured? Our [specific injury] lawyers fight for maximum compensation. No fee unless we win. Free case evaluation. Call 1-844-YO-PELEO.',
  openGraph: {
    title:
      'Does Workers’ Compensation Insurance Automatically Cover Every Workplace Injury? - Vasquez Law Firm, PLLC',
    description:
      'People usually spend at least eight hours a day, five days a week at work. With so much time on the clock, work injuries are bound to happen. While some of these injuries may be so minor that they do not justify taking any kind of legal action, others can be serious enough that they put someone out of work permanently. North Carolina requires most businesses to have workers’ compensation insurance, but that does not necessarily mean your employer has workers’ compensation insurance or, if it does, that the insurance will cover your injury. To learn what kind of injuries workers’ compensation is meant to cover, read on and then contact a North Carolina workers’ compensation insurance attorney for more information. Which Employers Need to Have Workers’ Compensation in North Carolina? North Carolina law requires businesses with three or more employees to have either workers’ compensation insurance or to qualify as a self-insured employer. However, certain employees are exempt from workers’ compensation coverage, including: “Casual” employees (people who can come and go from a job site at will) Most contract workers (although many contract workers could still be classified as employees in the case of a workplace injury) Domestic employees Agricultural […]',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/shutterstock_1303104493-min.jpg',
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
              Does Workers’ Compensation Insurance Automatically Cover Every Workplace Injury? -
              Vasquez Law Firm, PLLC
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
                    'https://www.vasquezlawnc.com/does-workers-compensation-insurance-automatically-cover-every-workplace-injury/',
                  url: 'https://www.vasquezlawnc.com/does-workers-compensation-insurance-automatically-cover-every-workplace-injury/',
                  name: 'Does Workers’ Compensation Insurance Automatically Cover Every Workplace Injury? - Vasquez Law Firm, PLLC',
                  isPartOf: { '@id': 'https://www.vasquezlawnc.com/#website' },
                  primaryImageOfPage: {
                    '@id':
                      'https://www.vasquezlawnc.com/does-workers-compensation-insurance-automatically-cover-every-workplace-injury/#primaryimage',
                  },
                  image: {
                    '@id':
                      'https://www.vasquezlawnc.com/does-workers-compensation-insurance-automatically-cover-every-workplace-injury/#primaryimage',
                  },
                  thumbnailUrl:
                    'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/shutterstock_1303104493-min.jpg',
                  datePublished: '2023-02-15T16:36:30+00:00',
                  dateModified: '2024-09-18T16:36:55+00:00',
                  author: {
                    '@id':
                      'https://www.vasquezlawnc.com/#/schema/person/2fa7514bdc81d9bc9644faadb9c7084f',
                  },
                  breadcrumb: {
                    '@id':
                      'https://www.vasquezlawnc.com/does-workers-compensation-insurance-automatically-cover-every-workplace-injury/#breadcrumb',
                  },
                  inLanguage: 'en-US',
                  potentialAction: [
                    {
                      '@type': 'ReadAction',
                      target: [
                        'https://www.vasquezlawnc.com/does-workers-compensation-insurance-automatically-cover-every-workplace-injury/',
                      ],
                    },
                  ],
                },
                {
                  '@type': 'ImageObject',
                  inLanguage: 'en-US',
                  '@id':
                    'https://www.vasquezlawnc.com/does-workers-compensation-insurance-automatically-cover-every-workplace-injury/#primaryimage',
                  url: 'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/shutterstock_1303104493-min.jpg',
                  contentUrl:
                    'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/shutterstock_1303104493-min.jpg',
                  width: 500,
                  height: 334,
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id':
                    'https://www.vasquezlawnc.com/does-workers-compensation-insurance-automatically-cover-every-workplace-injury/#breadcrumb',
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
                      name: 'Does Workers’ Compensation Insurance Automatically Cover Every Workplace Injury?',
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
                  name: 'Does workers compensation insurance automatically cover every workplace injury',
                  item: 'https://vasquezlawnc.com/does-workers-compensation-insurance-automatically-cover-every-workplace-injury',
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
