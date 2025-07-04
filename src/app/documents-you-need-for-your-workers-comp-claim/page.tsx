import { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'Documents You Need For Your Workers’ Comp Claim - Vasquez Law Firm, PLLC',
  description:
    'Hurt at work? Get the [specific benefit] you deserve. We fight insurance companies. No upfront costs. Free case review.',
  openGraph: {
    title: 'Documents You Need For Your Workers’ Comp Claim - Vasquez Law Firm, PLLC',
    description:
      'Workplace injuries happen in any and all career fields. Whether you are a construction worker or a secretary in an office, you might suffer an injury while on the job. No matter what field in which you are injured, you will be entitled to workers’ compensation– however, making a claim is not always as easy as it seems or should be. If you are injured at your workplace, you need to be prepared and organized in order to claim the full amount which you are owed in order to treat your injuries and make a full recovery!  At Vasquez Law Firm, PLLC, we have worked diligently over the years to ensure that workers’ rights are protected and our clients are able to overcome frustrating barriers to accessing the full amount of compensation that they are owed. We understand that preparation through accurate documentation is key when it comes to legal procedures.  We have compiled this blog to help those who are going through the process of claiming workers’ comp know the documents they should have on hand, particularly if they are concerned that their employer or insurance company might try to cheat them out of their full damages. Read on […]',
    images: [{ url: '../wp-content/uploads/2024/09/blog-vasquez-aug2024.webp' }],
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
              Documents You Need For Your Workers’ Comp Claim - Vasquez Law Firm, PLLC
            </h1>
            <p className="text-xl"></p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-burgundy-900 mb-4">
                  Documents You Need For Your Workers’ Comp Claim - Vasquez Law Firm, PLLC
                </h2>
                <div className="text-gray-700">
                  Our experienced attorneys provide comprehensive legal services for workersComp
                  cases. With over 35 years of combined experience, we understand the complexities
                  of workersComp law and fight tirelessly for our clients&apos; rights.
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-burgundy-900 mb-4">
                  Documents You Need For Your Workers’ Comp Claim - Vasquez Law Firm, PLLC
                </h2>
                <div className="text-gray-700">
                  When you choose Vasquez Law Firm for your workersComp case, you get: • Bilingual
                  attorneys who understand your needs • 24/7 availability for emergencies • No fee
                  unless we win (for applicable cases) • Personalized attention to your case •
                  Proven track record of success
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-burgundy-900 mb-4">
                  Documents You Need For Your Workers’ Comp Claim - Vasquez Law Firm, PLLC
                </h2>
                <div className="text-gray-700">
                  Get a free evaluation of your workersComp case. During your consultation,
                  we&apos;ll: • Review your situation in detail • Explain your legal options •
                  Answer all your questions • Provide honest assessment • Discuss our fee structure
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-burgundy-900 mb-4">
                  Documents You Need For Your Workers’ Comp Claim - Vasquez Law Firm, PLLC
                </h2>
                <div className="text-gray-700">
                  Common questions about workersComp cases in North Carolina and Florida. Our
                  attorneys are here to provide clear answers and guide you through the legal
                  process.
                </div>
              </div>
            </div>

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
                    'https://www.vasquezlawnc.com/documents-you-need-for-your-workers-comp-claim/',
                  url: 'https://www.vasquezlawnc.com/documents-you-need-for-your-workers-comp-claim/',
                  name: 'Documents You Need For Your Workers’ Comp Claim - Vasquez Law Firm, PLLC',
                  isPartOf: { '@id': 'https://www.vasquezlawnc.com/#website' },
                  primaryImageOfPage: {
                    '@id':
                      'https://www.vasquezlawnc.com/documents-you-need-for-your-workers-comp-claim/#primaryimage',
                  },
                  image: {
                    '@id':
                      'https://www.vasquezlawnc.com/documents-you-need-for-your-workers-comp-claim/#primaryimage',
                  },
                  thumbnailUrl: '../wp-content/uploads/2024/09/blog-vasquez-aug2024.webp',
                  datePublished: '2024-09-09T19:48:46+00:00',
                  author: {
                    '@id':
                      'https://www.vasquezlawnc.com/#/schema/person/2fa7514bdc81d9bc9644faadb9c7084f',
                  },
                  breadcrumb: {
                    '@id':
                      'https://www.vasquezlawnc.com/documents-you-need-for-your-workers-comp-claim/#breadcrumb',
                  },
                  inLanguage: 'en-US',
                  potentialAction: [
                    {
                      '@type': 'ReadAction',
                      target: [
                        'https://www.vasquezlawnc.com/documents-you-need-for-your-workers-comp-claim/',
                      ],
                    },
                  ],
                },
                {
                  '@type': 'ImageObject',
                  inLanguage: 'en-US',
                  '@id':
                    'https://www.vasquezlawnc.com/documents-you-need-for-your-workers-comp-claim/#primaryimage',
                  url: '../wp-content/uploads/2024/09/blog-vasquez-aug2024.webp',
                  contentUrl: '../wp-content/uploads/2024/09/blog-vasquez-aug2024.webp',
                  width: 1200,
                  height: 400,
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id':
                    'https://www.vasquezlawnc.com/documents-you-need-for-your-workers-comp-claim/#breadcrumb',
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
                      name: 'Documents You Need For Your Workers’ Comp Claim',
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
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'How much does a workersComp lawyer cost?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Vasquez Law Firm offers free consultations and works on contingency for many cases. This means you don&apos;t pay attorney fees unless we win your case. For other matters, we offer competitive rates and payment plans.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How long does a workersComp case take?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Case timelines vary depending on complexity and specific circumstances. During your free consultation, we&apos;ll provide a realistic timeline based on your unique situation and our extensive experience handling similar cases.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Do you speak Spanish?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes! Vasquez Law Firm provides full bilingual services in English and Spanish. Our attorneys and staff can assist you in the language you&apos;re most comfortable with.',
                  },
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
              '@type': 'LegalService',
              name: '',
              description:
                'Hurt at work? Get the [specific benefit] you deserve. We fight insurance companies. No upfront costs. Free case review.',
              provider: {
                '@type': 'LegalService',
                name: 'Vasquez Law Firm, PLLC',
                url: 'https://vasquezlawnc.com',
              },
              areaServed: [
                { '@type': 'State', name: 'North Carolina' },
                { '@type': 'State', name: 'Florida' },
              ],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Legal Services',
                itemListElement: [],
              },
              priceRange: 'Free Consultation',
              availableLanguage: ['English', 'Spanish'],
              url: 'https://vasquezlawnc.com/documents-you-need-for-your-workers-comp-claim/index',
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
                  name: 'Documents you need for your workers comp claim',
                  item: 'https://vasquezlawnc.com/documents-you-need-for-your-workers-comp-claim',
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
