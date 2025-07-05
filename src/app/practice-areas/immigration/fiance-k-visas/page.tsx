import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Mail, MapPin, Heart, Users, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Fiancé K-Visa Lawyers NC | K-1 Visa Attorneys | Vasquez Law Firm - YO PELEO™',
  description:
    'Expert fiancé K-visa attorneys in NC. K-1 visa applications, bringing foreign fiancé to U.S., marriage-based immigration. Free consultation. Call 1-844-YO-PELEO',
  openGraph: {
    title: 'Fiancé K-Visa Lawyers NC | K-1 Visa Attorneys | Vasquez Law Firm - YO PELEO™',
    description:
      'Expert fiancé K-visa attorneys in NC. K-1 visa applications, bringing foreign fiancé to U.S., marriage-based immigration. Free consultation. Call 1-844-YO-PELEO',
  },
};

export default function FianceKVisaPage() {
  const kVisaTypes = [
    {
      visa: 'K-1',
      title: 'Fiancé Visa',
      description: 'For foreign fiancés of U.S. citizens to enter U.S. for marriage',
      duration: '90 days to marry',
      icon: <Heart className="w-6 h-6" />,
    },
    {
      visa: 'K-2',
      title: 'Fiancé Children',
      description: 'For unmarried children under 21 of K-1 visa holders',
      duration: 'Same as K-1 holder',
      icon: <Users className="w-6 h-6" />,
    },
    {
      visa: 'K-3',
      title: 'Spouse Visa',
      description: 'For spouses of U.S. citizens waiting for immigrant visa',
      duration: '2 years renewable',
      icon: <CheckCircle className="w-6 h-6" />,
    },
  ];

  const process = [
    {
      step: '1',
      title: 'File I-129F Petition',
      description: 'U.S. citizen files petition for foreign fiancé with USCIS',
      timeframe: '8-12 months',
    },
    {
      step: '2',
      title: 'NVC Processing',
      description: 'National Visa Center reviews and forwards case to embassy',
      timeframe: '2-4 weeks',
    },
    {
      step: '3',
      title: 'Embassy Interview',
      description: 'Fiancé attends visa interview at U.S. embassy/consulate',
      timeframe: '2-8 weeks',
    },
    {
      step: '4',
      title: 'Travel to U.S.',
      description: 'Enter U.S. and marry within 90 days of arrival',
      timeframe: '90 days to marry',
    },
    {
      step: '5',
      title: 'Adjust Status',
      description: 'Apply for green card after marriage (I-485)',
      timeframe: '8-14 months',
    },
  ];

  const requirements = [
    'Both parties must be legally free to marry',
    'Must have met in person within 2 years',
    'U.S. citizen must meet income requirements',
    'Criminal background checks required',
    'Medical examination required',
    'Evidence of genuine relationship',
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#6B1F2E] to-[#8B2635] text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Fiancé K-Visa Lawyers</h1>
            <p className="text-xl mb-4">Bringing Love Across Borders</p>
            <p className="text-[#C9974D] text-lg font-semibold mb-8">
              YO PELEO POR TI™ - I FIGHT FOR LOVE
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="bg-[#C9974D] text-[#6B1F2E] px-8 py-3 rounded-md font-semibold hover:bg-[#D4A574] transition-colors"
              >
                Free K-Visa Consultation
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

      {/* Introduction */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-[#6B1F2E] mb-6">Expert Fiancé Visa Attorneys</h2>
            <p className="text-lg text-gray-700 mb-6">
              Love knows no borders, but immigration law can be complex. If you&apos;re a U.S.
              citizen engaged to a foreign national, a K-1 fiancé visa allows your partner to enter
              the United States for marriage. At Vasquez Law Firm, we help couples navigate the
              fiancé visa process and start their lives together in America.
            </p>
            <p className="text-gray-600">
              Our experienced K-visa attorneys have successfully helped hundreds of couples reunite
              through the fiancé visa process. We understand the urgency of love and work
              efficiently to minimize processing delays and maximize your chances of approval.
            </p>
          </div>
        </div>
      </section>

      {/* K-Visa Types */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">Types of K-Visas</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {kVisaTypes.map((visa, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#6B1F2E] text-white rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-lg">{visa.visa}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#6B1F2E] mb-3">{visa.title}</h3>
                  <p className="text-gray-600 mb-4">{visa.description}</p>
                  <span className="text-sm bg-[#C9974D] text-white px-3 py-1 rounded-full">
                    {visa.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">
            K-1 Visa Process Timeline
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {process.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-6 p-6 border border-gray-200 rounded-lg"
                >
                  <div className="w-12 h-12 bg-[#C9974D] text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {step.step}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-[#6B1F2E] mb-2">{step.title}</h3>
                    <p className="text-gray-700 mb-2">{step.description}</p>
                    <span className="text-sm text-[#C9974D] font-semibold">
                      Estimated Time: {step.timeframe}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">
                Total estimated process time: 12-18 months from petition to green card
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">
            K-1 Visa Requirements
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {requirements.map((requirement, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#C9974D] flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{requirement}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Statistics */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">
            Love Stories We've Made Possible
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white border border-gray-200 p-6 rounded-lg">
              <div className="text-3xl font-bold text-[#C9974D] mb-2">400+</div>
              <p className="text-gray-700">K-1 Visas Approved</p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-lg">
              <div className="text-3xl font-bold text-[#C9974D] mb-2">95%</div>
              <p className="text-gray-700">Approval Rate</p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-lg">
              <div className="text-3xl font-bold text-[#C9974D] mb-2">50+</div>
              <p className="text-gray-700">Countries Represented</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-[#6B1F2E] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey Together?</h2>
            <p className="text-xl mb-8">
              Don't let distance keep you apart. Contact our fiancé visa attorneys to begin the
              process of bringing your love to America.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3" />
                <div>
                  <p className="font-semibold">Call Now</p>
                  <a
                    href="tel:+1-844-967-3536"
                    className="text-[#C9974D] hover:underline text-lg font-bold"
                  >
                    1-844-YO-PELEO
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3" />
                <div>
                  <p className="font-semibold">Email Us</p>
                  <a href="mailto:leads@vasquezlawfirm.com" className="text-[#C9974D] hover:underline">
                    leads@vasquezlawfirm.com
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3" />
                <div>
                  <p className="font-semibold">Visit Our Offices</p>
                  <span className="text-[#C9974D]">Raleigh • Charlotte • Smithfield • Orlando</span>
                </div>
              </div>
            </div>
            <div className="border-t border-[#C9974D] pt-6">
              <p className="text-[#C9974D] font-semibold mb-4">
                YO PELEO POR TI™ - I FIGHT FOR LOVE
              </p>
              <Link
                href="/contact"
                className="bg-[#C9974D] text-[#6B1F2E] px-8 py-3 rounded-md font-semibold hover:bg-[#D4A574] transition-colors"
              >
                Schedule Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Vasquez Law Firm Fiancé K-Visa Attorneys',
            description:
              'Expert fiancé K-visa lawyers helping couples bring foreign fiancés to the United States',
            url: 'https://vasquezlawnc.com/practice-areas/immigration/fiance-k-visas',
            telephone: '+1-844-967-3536',
            areaServed: ['North Carolina', 'Raleigh', 'Charlotte', 'Durham', 'Smithfield'],
            serviceType: ['K-1 Visa', 'Fiancé Visa', 'K-2 Visa', 'K-3 Visa', 'Immigration Law'],
          }),
        }}
      />
    </div>
  );
}
