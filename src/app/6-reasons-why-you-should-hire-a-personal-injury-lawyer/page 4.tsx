import dynamic from 'next/dynamic';
import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Mail, MapPin, Globe, Award, BookOpen } from 'lucide-react';
// Dynamic import for client-side only rendering
const ChatWidget = dynamic(() => import('@/components/ChatWidget').then(mod => mod.ChatWidget), {
  ssr: false,
});
// Dynamic import for client-side only rendering
const VoiceAssistant = dynamic(
  () =>
    import('@/components/VirtualAssistant/VirtualAssistantWrapper').then(
      mod => mod.VirtualAssistantWrapper
    ),
  {
    ssr: false,
  }
);

export const metadata: Metadata = {
  title: '6 Reasons Why You Should Hire a Personal Injury Lawyer - Vasquez Law Firm, PLLC',
  description:
    "Meet [Name] - Experienced [practice area] attorney at Vasquez Law Firm. [Years] years fighting for clients' rights. Free consultation.",
  openGraph: {
    title: '6 Reasons Why You Should Hire a Personal Injury Lawyer - Vasquez Law Firm, PLLC',
    description:
      'If you are injured in an accident caused by someone else’s negligence, you may qualify to obtain compensation. You may think you can handle your personal injury case successfully on your own and that there are no benefits to working with an experienced lawyer. However, you should know that, while you do not have to hire an attorney, people with effective legal representation typically receive significantly higher settlements. The skilled lawyers at Vasquez Law Firm, PLLC will work diligently to help you maximize your payout. Personal injury attorneys help recover maximum compensation by using the following strategies. Investigating Accidents To get compensation, you will need evidence proving another party’s negligence to qualify for a personal injury claim. It often takes an in-depth investigation to find the right kinds of supporting evidence. Most people have never conducted a thorough investigation and do not know how to identify important evidence. Your legal team from Vasquez Law Firm, PLLC has investigated numerous accidents, so we will undertake this task for you. Assigning Fault Accurately More than one party shares the blame for causing many accidents. It is very important that you are not found to be at fault in NC accidents because of the state’s negligence laws. […]',
    images: [
      { url: 'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/blog_20240821160759.jpg' },
    ],
  },
};

export default function SixReasonsWhyYouShouldHireAPersonalInjuryLawyerPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-burgundy-900 to-burgundy-700 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              6 Reasons Why You Should Hire a Personal Injury Lawyer - Vasquez Law Firm, PLLC
            </h1>
            <p className="text-xl mb-8">Experienced Attorney at Vasquez Law Firm</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="bg-gold-500 text-burgundy-900 px-8 py-3 rounded-md font-semibold hover:bg-gold-600 transition-colors"
              >
                Schedule Consultation
              </Link>
              <Link
                href="tel:+18449673536"
                className="border-2 border-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-burgundy-900 transition-colors"
              >
                Call 1-844-YO-PELEO
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Attorney Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="prose prose-lg max-w-none">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-burgundy-900 mb-4">
                    6 Reasons Why You Should Hire a Personal Injury Lawyer - Vasquez Law Firm, PLLC
                  </h2>
                  <p className="text-gray-700">
                    Our attorney brings extensive legal experience to every case. Licensed to
                    practice in North Carolina and Florida, they has successfully represented
                    hundreds of clients in immigration, personal injury, and criminal defense.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-burgundy-900 mb-4">
                    6 Reasons Why You Should Hire a Personal Injury Lawyer - Vasquez Law Firm, PLLC
                  </h2>
                  <p className="text-gray-700">
                    Our attorney focuses on immigration, personal injury, and criminal defense,
                    providing dedicated representation to clients throughout North Carolina and
                    Florida.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-burgundy-900 mb-4">
                    6 Reasons Why You Should Hire a Personal Injury Lawyer - Vasquez Law Firm, PLLC
                  </h2>
                  <p className="text-gray-700">
                    Active member of American Immigration Lawyers Association (AILA), North Carolina
                    Bar Association, staying current with the latest legal developments to better
                    serve our clients.
                  </p>
                </div>
              </div>

              {/* Practice Areas */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-burgundy-900 mb-6">Practice Areas</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link
                    href="/practice-areas/immigration"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Globe className="w-8 h-8 text-burgundy-700 mr-3" />
                    <span className="font-medium">Immigration Law</span>
                  </Link>
                  <Link
                    href="/practice-areas/personal-injury"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Award className="w-8 h-8 text-burgundy-700 mr-3" />
                    <span className="font-medium">Personal Injury</span>
                  </Link>
                  <Link
                    href="/practice-areas/criminal-defense"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <BookOpen className="w-8 h-8 text-burgundy-700 mr-3" />
                    <span className="font-medium">Criminal Defense</span>
                  </Link>
                  <Link
                    href="/practice-areas/family-law"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Phone className="w-8 h-8 text-burgundy-700 mr-3" />
                    <span className="font-medium">Family Law</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-gray-50 p-6 rounded-lg sticky top-4">
                <h3 className="text-xl font-bold text-burgundy-900 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <a
                    href="tel:+18449673536"
                    className="flex items-start text-gray-700 hover:text-burgundy-700"
                  >
                    <Phone className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
                    <span>1-844-YO-PELEO</span>
                  </a>
                  <a
                    href="mailto:leads@vasquezlawfirm.com"
                    className="flex items-start text-gray-700 hover:text-burgundy-700"
                  >
                    <Mail className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
                    <span>leads@vasquezlawfirm.com</span>
                  </a>
                  <div className="flex items-start text-gray-700">
                    <MapPin className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
                    <span>
                      6801 Glenwood Ave
                      <br />
                      Raleigh, NC 27612
                    </span>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="block w-full bg-burgundy-700 text-white text-center py-3 rounded-md mt-6 hover:bg-burgundy-800 transition-colors"
                >
                  Schedule Free Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI-Enhanced Features */}
      <ChatWidget userId="attorney-page" language="en" />
      <VoiceAssistant language="en" />

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
                    'https://www.vasquezlawnc.com/6-reasons-why-you-should-hire-a-personal-injury-lawyer/',
                  url: 'https://www.vasquezlawnc.com/6-reasons-why-you-should-hire-a-personal-injury-lawyer/',
                  name: '6 Reasons Why You Should Hire a Personal Injury Lawyer - Vasquez Law Firm, PLLC',
                  isPartOf: { '@id': 'https://www.vasquezlawnc.com/#website' },
                  primaryImageOfPage: {
                    '@id':
                      'https://www.vasquezlawnc.com/6-reasons-why-you-should-hire-a-personal-injury-lawyer/#primaryimage',
                  },
                  image: {
                    '@id':
                      'https://www.vasquezlawnc.com/6-reasons-why-you-should-hire-a-personal-injury-lawyer/#primaryimage',
                  },
                  thumbnailUrl:
                    'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/blog_20240821160759.jpg',
                  datePublished: '2024-09-18T16:06:06+00:00',
                  author: {
                    '@id':
                      'https://www.vasquezlawnc.com/#/schema/person/2fa7514bdc81d9bc9644faadb9c7084f',
                  },
                  breadcrumb: {
                    '@id':
                      'https://www.vasquezlawnc.com/6-reasons-why-you-should-hire-a-personal-injury-lawyer/#breadcrumb',
                  },
                  inLanguage: 'en-US',
                  potentialAction: [
                    {
                      '@type': 'ReadAction',
                      target: [
                        'https://www.vasquezlawnc.com/6-reasons-why-you-should-hire-a-personal-injury-lawyer/',
                      ],
                    },
                  ],
                },
                {
                  '@type': 'ImageObject',
                  inLanguage: 'en-US',
                  '@id':
                    'https://www.vasquezlawnc.com/6-reasons-why-you-should-hire-a-personal-injury-lawyer/#primaryimage',
                  url: 'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/blog_20240821160759.jpg',
                  contentUrl:
                    'https://www.vasquezlawnc.com/wp-content/uploads/2024/09/blog_20240821160759.jpg',
                  width: 440,
                  height: 330,
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id':
                    'https://www.vasquezlawnc.com/6-reasons-why-you-should-hire-a-personal-injury-lawyer/#breadcrumb',
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
                      name: '6 Reasons Why You Should Hire a Personal Injury Lawyer',
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
              '@type': 'Attorney',
              name: '',
              image: '',
              jobTitle: 'Attorney',
              worksFor: {
                '@type': 'LegalService',
                name: 'Vasquez Law Firm, PLLC',
                url: 'https://vasquezlawnc.com',
              },
              address: {
                '@type': 'PostalAddress',
                streetAddress: '6801 Glenwood Ave',
                addressLocality: 'Raleigh',
                addressRegion: 'NC',
                postalCode: '27612',
              },
              telephone: '+1-844-967-3536',
              email: 'leads@vasquezlawfirm.com',
              url: 'https://vasquezlawnc.com/6-reasons-why-you-should-hire-a-personal-injury-lawyer/index',
              sameAs: [],
              knowsLanguage: ['English', 'Spanish'],
              alumniOf: {
                '@type': 'CollegeOrUniversity',
                name: 'NY. He served in the U.S. Air Force from 2000-2007. He is a veteran of Operation Enduring Freedom and received the Joint Service Achievement Medal for his work as a Spanish linguist for the Defense Intelligence Agency in 2005. William graduated from Campbell University in 2007 with a degree in computer science. He earned his J.D. in 2011 from the North Carolina Central University School of Law. His practice areas include immigration law and criminal defense cases. He is licensed and in good standing with the State Bar of North Carolina and a member of the American Immigration Lawyer Association (AILA.) He is a proud member of the Charlotte community and provides compassionate counsel for all his clients.</p>\n<h3>Education:</h3>\n<p><strong>North Carolina Central University</strong></p>\n<p>J.D. | Juris Doctorate</p>\n<p>2007 – 2011</p>\n<p><strong>Campbell University</strong></p>\n<p>B.S.</p>\n<h5>2007</h5>\n<h3>Bar Admissions:</h3>\n<p>North Carolina — Admitted in 2011</p>\n<p>4th',
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
                  name: '6 reasons why you should hire a personal injury lawyer',
                  item: 'https://vasquezlawnc.com/6-reasons-why-you-should-hire-a-personal-injury-lawyer',
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
