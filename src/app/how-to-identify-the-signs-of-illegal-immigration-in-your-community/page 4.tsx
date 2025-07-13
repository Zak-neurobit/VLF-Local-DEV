import { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'Page not found - Vasquez Law Firm, PLLC',
  description:
    'Expert immigration attorneys handling no results found. 60+ years experience. Free consultation in English/Spanish. Call 1-844-YO-PELEO.',
  openGraph: {
    title: 'Page not found - Vasquez Law Firm, PLLC',
    description:
      'Expert immigration attorneys handling no results found. 60+ years experience. Free consultation in English/Spanish. Call 1-844-YO-PELEO.',
    images: [{ url: '/images/og-default.jpg' }],
  },
};

export default function HowToIdentifyTheSignsOfIllegalImmigrationInYourCommunityPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-burgundy-900 to-burgundy-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">No Results Found</h1>
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
                  Page not found - Vasquez Law Firm, PLLC
                </h2>
                <div className="text-gray-700">
                  Our experienced attorneys provide comprehensive legal services for No Results
                  Found cases. With over 35 years of combined experience, we understand the
                  complexities of No Results Found law and fight tirelessly for our clients&apos;
                  rights.
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-burgundy-900 mb-4">
                  Page not found - Vasquez Law Firm, PLLC
                </h2>
                <div className="text-gray-700">
                  When you choose Vasquez Law Firm for your No Results Found case, you get: •
                  Bilingual attorneys who understand your needs • 24/7 availability for emergencies
                  • No fee unless we win (for applicable cases) • Personalized attention to your
                  case • Proven track record of success
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-burgundy-900 mb-4">
                  Page not found - Vasquez Law Firm, PLLC
                </h2>
                <div className="text-gray-700">
                  Get a free evaluation of your No Results Found case. During your consultation,
                  we&apos;ll: • Review your situation in detail • Explain your legal options •
                  Answer all your questions • Provide honest assessment • Discuss our fee structure
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-burgundy-900 mb-4">
                  Page not found - Vasquez Law Firm, PLLC
                </h2>
                <div className="text-gray-700">
                  Common questions about No Results Found cases in North Carolina and Florida. Our
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
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'How much does a No Results Found lawyer cost?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: "Vasquez Law Firm offers free consultations and works on contingency for many cases. This means you don't pay attorney fees unless we win your case. For other matters, we offer competitive rates and payment plans.",
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How long does a No Results Found case take?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: "Case timelines vary depending on complexity and specific circumstances. During your free consultation, we'll provide a realistic timeline based on your unique situation and our extensive experience handling similar cases.",
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Do you speak Spanish?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: "Yes! Vasquez Law Firm provides full bilingual services in English and Spanish. Our attorneys and staff can assist you in the language you're most comfortable with.",
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
              name: 'No Results Found',
              description:
                'Expert immigration attorneys handling no results found. 60+ years experience. Free consultation in English/Spanish. Call 1-844-YO-PELEO.',
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
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: { '@type': 'Service', name: 'Green Card Applications' },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: { '@type': 'Service', name: 'Citizenship & Naturalization' },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: { '@type': 'Service', name: 'Deportation Defense' },
                  },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Work Visas' } },
                  {
                    '@type': 'Offer',
                    itemOffered: { '@type': 'Service', name: 'Family Petitions' },
                  },
                ],
              },
              priceRange: 'Free Consultation',
              availableLanguage: ['English', 'Spanish'],
              url: 'https://vasquezlawnc.com/how-to-identify-the-signs-of-illegal-immigration-in-your-community/index',
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
                  name: 'How to identify the signs of illegal immigration in your community',
                  item: 'https://vasquezlawnc.com/how-to-identify-the-signs-of-illegal-immigration-in-your-community',
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
