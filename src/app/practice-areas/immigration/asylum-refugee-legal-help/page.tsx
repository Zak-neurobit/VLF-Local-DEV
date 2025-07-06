import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { Shield, Users, Clock, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Asylum & Refugee Lawyers NC | Protection from Persecution | Vasquez Law Firm - YO PELEO™',
  description:
    'Expert asylum and refugee attorneys in NC. Protection from persecution, asylum applications, refugee status, withholding of removal. Free consultation. Call 1-844-YO-PELEO',
  openGraph: {
    title:
      'Asylum & Refugee Lawyers NC | Protection from Persecution | Vasquez Law Firm - YO PELEO™',
    description:
      'Expert asylum and refugee attorneys in NC. Protection from persecution, asylum applications, refugee status, withholding of removal. Free consultation. Call 1-844-YO-PELEO',
  },
};

export default function AsylumRefugeePage() {
  const protectionTypes = [
    {
      title: 'Asylum',
      description:
        'Protection for those already in the U.S. who fear persecution in their home country',
      requirements: 'Must apply within 1 year of arrival (with exceptions)',
      icon: <Shield className="w-6 h-6" />,
    },
    {
      title: 'Refugee Status',
      description: 'Protection for those outside the U.S. seeking admission due to persecution',
      requirements: 'Must be referred by UNHCR or U.S. Embassy',
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: 'Withholding of Removal',
      description:
        'Protection from deportation to country where life or freedom would be threatened',
      requirements: 'Higher standard than asylum, no time limit to apply',
      icon: <Heart className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#6B1F2E] to-[#8B2635] text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Asylum & Refugee Legal Help</h1>
            <p className="text-xl mb-4">Protection from Persecution & Violence</p>
            <p className="text-[#C9974D] text-lg font-semibold mb-8">
              YO PELEO POR TI™ - I FIGHT FOR YOUR SAFETY
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="bg-[#C9974D] text-[#6B1F2E] px-8 py-3 rounded-md font-semibold hover:bg-[#D4A574] transition-colors"
              >
                Free Asylum Consultation
              </Link>
              <a
                href="tel:+1-844-967-3536"
                className="border-2 border-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-[#6B1F2E] transition-colors"
              >
                Call 1-844-YO-PELEO
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Urgent Notice */}
      <section className="py-12 bg-orange-50 border-l-4 border-orange-500">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-orange-700 mb-2">One-Year Asylum Deadline</h3>
                <p className="text-gray-700 mb-4">
                  You must file for asylum within one year of your arrival in the United States
                  (with limited exceptions). Missing this deadline can bar you from asylum
                  protection. Don&apos;t wait - contact us immediately.
                </p>
                <a
                  href="tel:+1-844-967-3536"
                  className="bg-orange-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-orange-700 transition-colors"
                >
                  Call Urgently: 1-844-YO-PELEO
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-[#6B1F2E] mb-6">
              Compassionate Asylum & Refugee Representation
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              If you have fled your home country due to persecution or have a well-founded fear of
              persecution, you may qualify for asylum or refugee protection in the United States. At
              Vasquez Law Firm, we understand the trauma and urgency of your situation and provide
              compassionate, experienced representation.
            </p>
            <p className="text-gray-600">
              Our asylum attorneys have successfully helped hundreds of individuals and families
              secure protection from persecution based on race, religion, nationality, political
              opinion, or membership in a particular social group.
            </p>
          </div>
        </div>
      </section>

      {/* Protection Types */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">
            Types of Protection We Handle
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {protectionTypes.map((type, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#6B1F2E] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    {type.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#6B1F2E] mb-3">{type.title}</h3>
                  <p className="text-gray-600 mb-4">{type.description}</p>
                  <p className="text-sm text-[#C9974D] font-semibold">{type.requirements}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Statistics */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">
            Asylum Success Stories
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white border border-gray-200 p-6 rounded-lg">
              <div className="text-3xl font-bold text-[#C9974D] mb-2">300+</div>
              <p className="text-gray-700">Asylum Cases Won</p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-lg">
              <div className="text-3xl font-bold text-[#C9974D] mb-2">90%</div>
              <p className="text-gray-700">Success Rate</p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-lg">
              <div className="text-3xl font-bold text-[#C9974D] mb-2">40+</div>
              <p className="text-gray-700">Countries Represented</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-[#6B1F2E] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Seeking Safety from Persecution?</h2>
            <p className="text-xl mb-8">
              Time is critical for asylum cases. Contact our experienced asylum attorneys for
              immediate help.
            </p>
            <div className="border-t border-[#C9974D] pt-6">
              <p className="text-[#C9974D] font-semibold mb-4">
                YO PELEO POR TI™ - I FIGHT FOR YOUR SAFETY
              </p>
              <Link
                href="/contact"
                className="bg-[#C9974D] text-[#6B1F2E] px-8 py-3 rounded-md font-semibold hover:bg-[#D4A574] transition-colors"
              >
                Schedule Urgent Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Data for SEO */}
      <Script
        id="practice-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Immigration Asylum Refugee Legal Help Legal Services',
            provider: {
              '@type': 'LegalService',
              name: 'Vasquez Law Firm, PLLC',
              url: 'https://www.vasquezlawfirm.com',
              telephone: '+1-919-537-8722',
              priceRange: '$$',
            },
            areaServed: {
              '@type': 'State',
              name: 'North Carolina',
            },
            url: 'https://www.vasquezlawfirm.com/practice-areas/immigration/asylum-refugee-legal-help/page',
            description:
              'Immigration Asylum Refugee Legal Help legal services in North Carolina. Free consultation. Se habla español.',
          }),
        }}
      />
    </div>
  );
}
