import dynamic from 'next/dynamic';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, MapPin, Globe, Award, BookOpen } from 'lucide-react';
// Dynamic import for client-side only rendering
const ChatWidget = dynamic(() => import('@/components/ChatWidget').then(mod => mod.ChatWidget), {
  ssr: false,
});
// Dynamic import for client-side only rendering
const VoiceAssistant = dynamic(() => import('@/components/VirtualAssistant').then(mod => mod.VirtualAssistant), {
  ssr: false,
});

export const metadata: Metadata = {
  title: 'Jillian baucom - Vasquez Law Firm, PLLC',
  description:
    'Jillian Baucom, experienced immigration attorney in Raleigh, NC. Dedicated to helping clients navigate the immigration process smoothly. Contact us today!',
  openGraph: {
    title: 'Jillian baucom - Vasquez Law Firm, PLLC',
    description:
      'Jillian Baucom, experienced immigration attorney in Raleigh, NC. Dedicated to helping clients navigate the immigration process smoothly. Contact us today!',
    images: [{ url: 'https://www.vasquezlawnc.com/images/attorneys/jillian-baucom.jpg' }],
  },
};

export default function PagetsxPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-burgundy-900 to-burgundy-700 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Jillian Baucom</h1>
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
              {/* Attorney Photo */}
              <div className="flex flex-col md:flex-row gap-8 mb-12">
                <div className="md:w-1/3">
                  <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="/images/attorneys/jillian-baucom.jpg"
                      alt="Jillian Baucom, Attorney at Vasquez Law Firm"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      priority
                    />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h2 className="text-3xl font-bold text-burgundy-900 mb-4">Jillian Baucom</h2>
                  <p className="text-gray-700 text-lg">
                    Jillian Baucom brings extensive legal experience to every case. Licensed to
                    practice in North Carolina and Florida, she has successfully represented
                    hundreds of clients in immigration, personal injury, and criminal defense.
                  </p>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                    Experience & Expertise
                  </h3>
                  <p className="text-gray-700">
                    Jillian Baucom focuses on immigration, personal injury, and criminal defense,
                    providing dedicated representation to clients throughout North Carolina and
                    Florida.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                    Professional Memberships
                  </h3>
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
                  '@id': 'https://www.vasquezlawnc.com/attorneys/jillian-baucom-es/',
                  url: 'https://www.vasquezlawnc.com/attorneys/jillian-baucom-es/',
                  name: 'Jillian baucom - Vasquez Law Firm, PLLC',
                  isPartOf: { '@id': 'https://www.vasquezlawnc.com/#website' },
                  primaryImageOfPage: {
                    '@id': 'https://www.vasquezlawnc.com/attorneys/jillian-baucom-es/#primaryimage',
                  },
                  image: {
                    '@id': 'https://www.vasquezlawnc.com/attorneys/jillian-baucom-es/#primaryimage',
                  },
                  thumbnailUrl:
                    'https://vasquezlawnc.com/wp-content/uploads/2024/03/att-jillian-249x300.jpg',
                  datePublished: '2025-04-22T13:22:59+00:00',
                  dateModified: '2025-04-22T13:57:03+00:00',
                  description:
                    'Jillian Baucom, experienced immigration attorney in Raleigh, NC. Dedicated to helping clients navigate the immigration process smoothly. Contact us today!',
                  breadcrumb: {
                    '@id': 'https://www.vasquezlawnc.com/attorneys/jillian-baucom-es/#breadcrumb',
                  },
                  inLanguage: 'en-US',
                  potentialAction: [
                    {
                      '@type': 'ReadAction',
                      target: ['https://www.vasquezlawnc.com/attorneys/jillian-baucom-es/'],
                    },
                  ],
                },
                {
                  '@type': 'ImageObject',
                  inLanguage: 'en-US',
                  '@id': 'https://www.vasquezlawnc.com/attorneys/jillian-baucom-es/#primaryimage',
                  url: 'https://vasquezlawnc.com/wp-content/uploads/2024/03/att-jillian-249x300.jpg',
                  contentUrl:
                    'https://vasquezlawnc.com/wp-content/uploads/2024/03/att-jillian-249x300.jpg',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://www.vasquezlawnc.com/attorneys/jillian-baucom-es/#breadcrumb',
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
                      name: 'Attorneys',
                      item: 'https://www.vasquezlawnc.com/attorneys/',
                    },
                    { '@type': 'ListItem', position: 3, name: 'Jillian baucom' },
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
              '@type': 'Attorney',
              name: 'Jillian Baucom',
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
              url: 'https://vasquezlawnc.com/attorneys/jillian-baucom-es/index',
              sameAs: [],
              knowsLanguage: ['English', 'Spanish'],
              alumniOf: {
                '@type': 'CollegeOrUniversity',
                name: 'He holds degrees from East Carolina University and Campbell University School of Law. Beyond his legal work',
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
                  name: 'Attorneys',
                  item: 'https://vasquezlawnc.com/attorneys',
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: 'Jillian baucom es',
                  item: 'https://vasquezlawnc.com/attorneys/jillian-baucom-es',
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
