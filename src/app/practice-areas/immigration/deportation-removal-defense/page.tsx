import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Mail, MapPin, Shield, AlertTriangle, FileText, Scale, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Deportation & Removal Defense Lawyers NC & FL | Vasquez Law Firm',
  description:
    'Expert deportation defense attorneys in Raleigh, Charlotte, Smithfield & Orlando. Aggressive defense against removal proceedings, cancellation of removal, asylum, bond hearings. 24/7 emergency help.',
  keywords: [
    'deportation defense',
    'removal proceedings',
    'immigration court',
    'cancellation of removal',
    'asylum',
    'bond hearing',
    'ICE detention',
    'immigration lawyer',
    'Raleigh NC',
    'Charlotte NC',
    'Orlando FL',
  ],
  openGraph: {
    title: 'Deportation & Removal Defense Lawyers | Vasquez Law Firm',
    description:
      'Expert deportation defense attorneys providing aggressive representation against removal proceedings.',
    type: 'website',
    images: [
      {
        url: '/images/deportation-defense-lawyers.jpg',
        width: 1200,
        height: 630,
        alt: 'Deportation and Removal Defense Lawyers',
      },
    ],
  },
};

export default function DeportationRemovalDefensePage() {
  const defenseStrategies = [
    {
      title: 'Cancellation of Removal',
      description:
        'For permanent residents and non-permanent residents with qualifying years of residence',
      icon: <Shield className="w-6 h-6" />,
    },
    {
      title: 'Asylum Claims',
      description: 'Protection for those facing persecution in their home countries',
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: 'Adjustment of Status',
      description: 'Apply for green card through family or employment sponsorship',
      icon: <FileText className="w-6 h-6" />,
    },
    {
      title: 'Waivers & Relief',
      description: 'Various forms of relief including 212(h) waivers and prosecutorial discretion',
      icon: <Scale className="w-6 h-6" />,
    },
  ];

  const services = [
    {
      title: 'Emergency Detention Response',
      description: 'Immediate assistance for ICE detention and bond hearings',
      icon: <AlertTriangle className="w-6 h-6" />,
    },
    {
      title: 'Immigration Court Defense',
      description: 'Aggressive representation in removal proceedings',
      icon: <Scale className="w-6 h-6" />,
    },
    {
      title: 'Appeals & Motions',
      description: 'Board of Immigration Appeals and federal court appeals',
      icon: <FileText className="w-6 h-6" />,
    },
    {
      title: 'Bond Hearings',
      description: 'Fighting for release from immigration detention',
      icon: <Shield className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#6B1F2E] to-[#8B2635] text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Deportation & Removal Defense Lawyers
            </h1>
            <p className="text-xl mb-4">Aggressive Defense Against Immigration Removal</p>
            <p className="text-[#C9974D] text-lg font-semibold mb-8">
              YO PELEO POR TI™ - I FIGHT TO KEEP YOU HOME
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+1-844-967-3536"
                className="bg-red-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-red-700 transition-colors"
              >
                EMERGENCY: Call 1-844-YO-PELEO
              </a>
              <Link
                href="/contact"
                className="bg-[#C9974D] text-[#6B1F2E] px-8 py-3 rounded-md font-semibold hover:bg-[#D4A574] transition-colors"
              >
                Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Alert */}
      <section className="py-12 bg-red-50 border-l-4 border-red-500">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-700 mb-2">
                  Facing Deportation? Time is Critical!
                </h3>
                <p className="text-gray-700 mb-4">
                  If you or a loved one has been detained by ICE or received a Notice to Appear in
                  immigration court, every moment counts. Don&apos;t face this alone - experienced legal
                  representation can make the difference between staying in the U.S. and being
                  separated from your family.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="tel:+1-844-967-3536"
                    className="bg-red-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-700 transition-colors"
                  >
                    Call Emergency Line: 1-844-YO-PELEO
                  </a>
                  <span className="text-gray-600 flex items-center">
                    Available 24/7 for emergencies
                  </span>
                </div>
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
              Experienced Deportation Defense Attorneys
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Deportation proceedings are among the most serious legal matters you can face. The
              stakes couldn&apos;t be higher - your ability to remain in the United States with your
              family, your job, and your life. At Vasquez Law Firm, our experienced deportation
              defense attorneys fight aggressively to protect your rights and keep you in America.
            </p>
            <p className="text-gray-600">
              We have successfully defended thousands of clients in immigration court, securing
              relief from removal and helping families stay together. Our comprehensive approach
              includes exploring every possible defense strategy and fighting tirelessly for the
              best possible outcome.
            </p>
          </div>
        </div>
      </section>

      {/* Defense Strategies */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">
            Defense Strategies We Use
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {defenseStrategies.map((strategy, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#6B1F2E] text-white rounded-full flex items-center justify-center flex-shrink-0">
                    {strategy.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#6B1F2E] mb-3">{strategy.title}</h3>
                    <p className="text-gray-600">{strategy.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">
            Our Removal Defense Services
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#C9974D] text-white rounded-full flex items-center justify-center flex-shrink-0">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#6B1F2E] mb-3">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">
            Deportation Defense Results
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white border border-gray-200 p-6 rounded-lg">
              <div className="text-3xl font-bold text-[#C9974D] mb-2">500+</div>
              <p className="text-gray-700">Deportation Cases Won</p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-lg">
              <div className="text-3xl font-bold text-[#C9974D] mb-2">85%</div>
              <p className="text-gray-700">Success Rate</p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-lg">
              <div className="text-3xl font-bold text-[#C9974D] mb-2">24/7</div>
              <p className="text-gray-700">Emergency Response</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-[#6B1F2E] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Don&apos;t Face Deportation Alone</h2>
            <p className="text-xl mb-8">
              Your freedom and family depend on having experienced legal representation. Contact us
              immediately for aggressive deportation defense.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3" />
                <div>
                  <p className="font-semibold">Emergency Line</p>
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
                YO PELEO POR TI™ - I FIGHT TO KEEP YOU HOME
              </p>
              <Link
                href="/contact"
                className="bg-[#C9974D] text-[#6B1F2E] px-8 py-3 rounded-md font-semibold hover:bg-[#D4A574] transition-colors"
              >
                Schedule Emergency Consultation
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
            name: 'Vasquez Law Firm Deportation Defense Attorneys',
            description:
              'Expert deportation defense lawyers providing aggressive representation in removal proceedings',
            url: 'https://vasquezlawnc.com/practice-areas/immigration/deportation-removal-defense',
            telephone: '+1-844-967-3536',
            areaServed: ['North Carolina', 'Raleigh', 'Charlotte', 'Durham', 'Smithfield'],
            serviceType: [
              'Deportation Defense',
              'Removal Proceedings',
              'Immigration Court',
              'Bond Hearings',
              'Immigration Law',
            ],
          }),
        }}
      />
    </div>
  );
}
