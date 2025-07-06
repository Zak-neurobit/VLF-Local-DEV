import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { Phone, Shield, Heart, Users, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'VAWA & U-Visa Lawyers NC | Crime Victims Immigration | Vasquez Law Firm - YO PELEO™',
  description:
    'Expert VAWA and U-Visa attorneys in NC. Protection for crime victims, domestic violence survivors, trafficking victims. Confidential help. Call 1-844-YO-PELEO',
  openGraph: {
    title: 'VAWA & U-Visa Lawyers NC | Crime Victims Immigration | Vasquez Law Firm - YO PELEO™',
    description:
      'Expert VAWA and U-Visa attorneys in NC. Protection for crime victims, domestic violence survivors, trafficking victims. Confidential help. Call 1-844-YO-PELEO',
  },
};

export default function VawaUVisaPage() {
  const protectionTypes = [
    {
      title: 'VAWA Self-Petition',
      description:
        'Protection for spouses, children, and parents of abusive U.S. citizens or permanent residents',
      requirements: 'Evidence of abuse and qualifying relationship',
      icon: <Heart className="w-6 h-6" />,
    },
    {
      title: 'U-Visa',
      description: 'Protection for victims of qualifying crimes who assist law enforcement',
      requirements: 'Crime certification from law enforcement required',
      icon: <Shield className="w-6 h-6" />,
    },
    {
      title: 'T-Visa',
      description: 'Protection for victims of human trafficking',
      requirements: 'Must be victim of severe trafficking and assist prosecution',
      icon: <Users className="w-6 h-6" />,
    },
  ];

  const qualifyingCrimes = [
    'Domestic Violence',
    'Sexual Assault',
    'Human Trafficking',
    'Kidnapping',
    'Murder',
    'Felonious Assault',
    'Rape',
    'Incest',
    'Torture',
    'Perjury',
    'Witness Tampering',
    'Obstruction of Justice',
    'Peonage',
    'Blackmail',
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#6B1F2E] to-[#8B2635] text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">VAWA & U-Visa Lawyers</h1>
            <p className="text-xl mb-4">Protection for Crime Victims & Survivors</p>
            <p className="text-[#C9974D] text-lg font-semibold mb-8">
              YO PELEO POR TI™ - I FIGHT FOR SURVIVORS
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="bg-[#C9974D] text-[#6B1F2E] px-8 py-3 rounded-md font-semibold hover:bg-[#D4A574] transition-colors"
              >
                Confidential Consultation
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

      {/* Confidentiality Notice */}
      <section className="py-12 bg-purple-50 border-l-4 border-purple-500">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-700 mb-2">
                  Your Safety & Privacy Are Our Priority
                </h3>
                <p className="text-gray-700 mb-4">
                  All consultations are completely confidential. We understand the sensitive nature
                  of domestic violence and crime victim cases. Your abuser or the perpetrator will
                  not be contacted or notified of your legal consultation.
                </p>
                <a
                  href="tel:+1-844-967-3536"
                  className="bg-purple-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-purple-700 transition-colors"
                >
                  Safe & Confidential Call: 1-844-YO-PELEO
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
              Compassionate Legal Help for Crime Victims
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              If you are a victim of domestic violence, sexual assault, human trafficking, or other
              serious crimes, you may qualify for special immigration protection through VAWA,
              U-Visa, or T-Visa programs. These programs recognize that crime victims should not
              fear deportation when seeking help or cooperating with law enforcement.
            </p>
            <p className="text-gray-600">
              At Vasquez Law Firm, we provide sensitive, confidential representation for survivors
              of violence and crime. Our experienced attorneys understand the trauma you&apos;ve
              experienced and work to secure your safety and legal status in the United States.
            </p>
          </div>
        </div>
      </section>

      {/* Protection Types */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">
            Immigration Protection for Victims
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

      {/* Qualifying Crimes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">
            Qualifying Crimes for U-Visa
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-4">
              {qualifyingCrimes.map((crime, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg text-center">
                  <span className="font-semibold text-gray-700">{crime}</span>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">
                This is not a complete list. Contact us to discuss your specific situation.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-[#C9974D] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#D4A574] transition-colors"
              >
                Discuss Your Case Confidentially
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Success Statistics */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">
            Helping Survivors Rebuild
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white border border-gray-200 p-6 rounded-lg">
              <div className="text-3xl font-bold text-[#C9974D] mb-2">250+</div>
              <p className="text-gray-700">VAWA Cases Approved</p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-lg">
              <div className="text-3xl font-bold text-[#C9974D] mb-2">150+</div>
              <p className="text-gray-700">U-Visas Granted</p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-lg">
              <div className="text-3xl font-bold text-[#C9974D] mb-2">100%</div>
              <p className="text-gray-700">Confidential Service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-[#6B1F2E] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">You Are Not Alone - We Can Help</h2>
            <p className="text-xl mb-8">
              If you are a victim of crime or domestic violence, you have rights and options.
              Contact us for confidential legal help.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3" />
                <div>
                  <p className="font-semibold">Confidential Line</p>
                  <a
                    href="tel:+1-844-967-3536"
                    className="text-[#C9974D] hover:underline text-lg font-bold"
                  >
                    1-844-YO-PELEO
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <Lock className="w-5 h-5 mr-3" />
                <div>
                  <p className="font-semibold">Safe & Private</p>
                  <span className="text-[#C9974D]">Your safety is our priority</span>
                </div>
              </div>
            </div>
            <div className="border-t border-[#C9974D] pt-6">
              <p className="text-[#C9974D] font-semibold mb-4">
                YO PELEO POR TI™ - I FIGHT FOR SURVIVORS
              </p>
              <Link
                href="/contact"
                className="bg-[#C9974D] text-[#6B1F2E] px-8 py-3 rounded-md font-semibold hover:bg-[#D4A574] transition-colors"
              >
                Schedule Confidential Consultation
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
            serviceType: 'Immigration Vawa U Visa Crime Victims Legal Services',
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
            url: 'https://www.vasquezlawfirm.com/practice-areas/immigration/vawa-u-visa-crime-victims/page',
            description:
              'Immigration Vawa U Visa Crime Victims legal services in North Carolina. Free consultation. Se habla español.',
          }),
        }}
      />
    </div>
  );
}
