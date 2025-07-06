import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { Phone, MapPin, ArrowRight, CheckCircle, Shield, Heart, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'T Visa Immigration Attorneys NC & FL | Human Trafficking Victims | Vasquez Law',
  description:
    'Expert T visa attorneys helping human trafficking victims in Raleigh, Charlotte, Smithfield & Orlando. Confidential consultation for trafficking survivors seeking legal status.',
  keywords: [
    'T visa',
    'human trafficking',
    'trafficking victims',
    'immigration attorney',
    'trafficking survivor',
    'Raleigh NC',
    'Charlotte NC',
    'Orlando FL',
    'victim of crime',
  ],
  openGraph: {
    title: 'T Visa Immigration Attorneys - Human Trafficking Victims | Vasquez Law',
    description:
      'Compassionate legal representation for human trafficking survivors seeking T visa protection.',
    type: 'website',
    images: [
      {
        url: '/images/t-visa-trafficking-attorneys.jpg',
        width: 1200,
        height: 630,
        alt: 'T Visa Immigration Attorneys for Human Trafficking Victims',
      },
    ],
  },
};

export default function TVisa() {
  return (
    <div className="min-h-screen bg-white">
      {/* Confidential Help Banner */}
      <div className="bg-purple-600 text-white py-2">
        <div className="container mx-auto px-4 text-center">
          <p className="font-bold">
            🔒 CONFIDENTIAL HELP FOR TRAFFICKING VICTIMS - CALL 1-844-YO-PELEO 🔒
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="text-sm">
            <Link href="/" className="text-burgundy-700 hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/practice-areas" className="text-burgundy-700 hover:underline">
              Practice Areas
            </Link>
            <span className="mx-2">/</span>
            <Link href="/practice-areas/immigration" className="text-burgundy-700 hover:underline">
              Immigration
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-600">T Visa</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-burgundy-700 to-burgundy-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">T Visa Immigration Attorneys</h1>
            <p className="text-xl md:text-2xl mb-8 text-gold-400 font-semibold">
              YO PELEO POR TI™ - I FIGHT FOR YOU
            </p>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Compassionate legal representation for survivors of human trafficking. We understand
              your trauma and provide confidential, supportive guidance through the T visa process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-gold-500 text-burgundy-900 font-bold rounded-full hover:bg-gold-400 transition-colors"
              >
                Confidential Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="tel:1-844-967-3536"
                className="inline-flex items-center px-8 py-4 bg-white text-burgundy-900 font-bold rounded-full hover:bg-gray-100 transition-colors"
              >
                <Phone className="mr-2 w-5 h-5" />
                1-844-YO-PELEO
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Support Section */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-purple-100 border-l-4 border-purple-500 p-6 mb-8">
              <div className="flex items-center mb-4">
                <Shield className="w-8 h-8 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold text-purple-800">
                  Your Safety & Privacy Are Our Priority
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-purple-800 mb-2">You Are Safe Here:</h3>
                  <ul className="text-purple-700 space-y-1">
                    <li>✓ Complete confidentiality guaranteed</li>
                    <li>✓ Trauma-informed legal representation</li>
                    <li>✓ Safe office environment</li>
                    <li>✓ Bilingual support available</li>
                    <li>✓ No judgment, only support</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-purple-800 mb-2">We Understand:</h3>
                  <ul className="text-purple-700 space-y-1">
                    <li>• The trauma you&apos;ve experienced</li>
                    <li>• Your fear and uncertainty</li>
                    <li>• The courage it takes to seek help</li>
                    <li>• Your need for protection</li>
                    <li>• Your desire to rebuild your life</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">What Is a T Visa?</h2>
                <p className="text-gray-700 mb-6">
                  The T visa is a special immigration status for victims of severe forms of human
                  trafficking who are physically present in the United States due to trafficking.
                  This humanitarian visa recognizes that trafficking victims should be protected,
                  not punished, and provides a pathway to legal status and eventual permanent
                  residence.
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
                  <h3 className="text-xl font-bold text-blue-800 mb-2">T Visa Benefits:</h3>
                  <ul className="text-blue-700 space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-1" />
                      <span>Legal status for up to 4 years</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-1" />
                      <span>Work authorization</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-1" />
                      <span>Protection from removal/deportation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-1" />
                      <span>Access to certain federal benefits</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-1" />
                      <span>Pathway to permanent residence (green card)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-1" />
                      <span>Ability to include certain family members</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Understanding Human Trafficking
                </h2>
                <p className="text-gray-700 mb-6">
                  Human trafficking involves the use of force, fraud, or coercion to obtain some
                  type of labor or commercial sex act. Trafficking can happen to anyone, regardless
                  of age, gender, nationality, or background.
                </p>

                <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                  Types of Human Trafficking:
                </h3>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-bold text-burgundy-900 mb-3">Labor Trafficking</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Forced labor in agriculture</li>
                      <li>• Domestic servitude</li>
                      <li>• Construction work</li>
                      <li>• Factory or warehouse work</li>
                      <li>• Restaurant/hospitality work</li>
                      <li>• Debt bondage</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-bold text-burgundy-900 mb-3">Sex Trafficking</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Commercial sexual exploitation</li>
                      <li>• Forced prostitution</li>
                      <li>• Escort services</li>
                      <li>• Massage parlors</li>
                      <li>• Online exploitation</li>
                      <li>• Pornography production</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
                  <h3 className="text-xl font-bold text-red-800 mb-2">
                    Common Trafficking Methods:
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-bold text-red-700 mb-2">Force</h4>
                      <ul className="text-red-600 text-sm space-y-1">
                        <li>• Physical violence</li>
                        <li>• Sexual assault</li>
                        <li>• Physical restraint</li>
                        <li>• Confinement</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-red-700 mb-2">Fraud</h4>
                      <ul className="text-red-600 text-sm space-y-1">
                        <li>• False promises</li>
                        <li>• Fake job offers</li>
                        <li>• Document fraud</li>
                        <li>• Lying about conditions</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-red-700 mb-2">Coercion</h4>
                      <ul className="text-red-600 text-sm space-y-1">
                        <li>• Threats of harm</li>
                        <li>• Deportation threats</li>
                        <li>• Debt manipulation</li>
                        <li>• Isolation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  T Visa Eligibility Requirements
                </h2>
                <p className="text-gray-700 mb-6">
                  To qualify for a T visa, you must meet specific requirements established by
                  federal law. Our attorneys will carefully evaluate your situation to determine
                  eligibility.
                </p>

                <div className="space-y-6">
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-green-800 mb-3">
                      1. Victim of Severe Trafficking
                    </h3>
                    <p className="text-green-700">
                      You must be or have been a victim of severe forms of trafficking in persons,
                      including both sex trafficking and labor trafficking.
                    </p>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-green-800 mb-3">2. Physical Presence</h3>
                    <p className="text-green-700">
                      You must be physically present in the United States on account of trafficking.
                      This includes situations where you were brought to the U.S. for trafficking or
                      trafficked after arriving.
                    </p>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-green-800 mb-3">
                      3. Cooperation with Law Enforcement
                    </h3>
                    <p className="text-green-700">
                      You must comply with reasonable requests from law enforcement to assist in the
                      investigation or prosecution of trafficking (unless under 18 or unable due to
                      trauma).
                    </p>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-green-800 mb-3">4. Extreme Hardship</h3>
                    <p className="text-green-700">
                      You would suffer extreme hardship involving unusual and severe harm if removed
                      from the United States.
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mt-8">
                  <h3 className="text-xl font-bold text-yellow-800 mb-2">
                    Special Considerations:
                  </h3>
                  <ul className="text-yellow-700 space-y-2">
                    <li>• Minor victims (under 18) have modified requirements</li>
                    <li>• Victims too traumatized to cooperate may qualify</li>
                    <li>• Family members may be included in the application</li>
                    <li>• Past cooperation with law enforcement may qualify</li>
                  </ul>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  The T Visa Application Process
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Safe Consultation
                      </h3>
                      <p className="text-gray-700">
                        We provide a confidential, trauma-informed consultation to understand your
                        situation and assess T visa eligibility.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Evidence Gathering
                      </h3>
                      <p className="text-gray-700">
                        Carefully collect evidence of trafficking, including documentation, witness
                        statements, and expert testimony when needed.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Law Enforcement Coordination
                      </h3>
                      <p className="text-gray-700">
                        Work with law enforcement agencies to obtain necessary cooperation
                        documentation while protecting your safety.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-burgundy-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Application Filing
                      </h3>
                      <p className="text-gray-700">
                        Prepare and file Form I-914 with comprehensive supporting documentation to
                        USCIS.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-gold-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      5
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-burgundy-900 mb-2">
                        Status & Protection
                      </h3>
                      <p className="text-gray-700">
                        Upon approval, receive T visa status, work authorization, and protection
                        from removal.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Family Members & Derivative T Visas
                </h2>
                <p className="text-gray-700 mb-6">
                  T visa holders can include certain family members in their application or petition
                  for them later. Family protection is an important aspect of T visa relief.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <Users className="w-8 h-8 text-blue-600 mb-4" />
                    <h3 className="text-lg font-bold text-blue-800 mb-3">If You&apos;re Under 21</h3>
                    <ul className="text-blue-700 space-y-1">
                      <li>• Spouse</li>
                      <li>• Children</li>
                      <li>• Parents</li>
                      <li>• Unmarried siblings under 18</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg">
                    <Users className="w-8 h-8 text-blue-600 mb-4" />
                    <h3 className="text-lg font-bold text-blue-800 mb-3">If You&apos;re 21 or Older</h3>
                    <ul className="text-blue-700 space-y-1">
                      <li>• Spouse</li>
                      <li>• Unmarried children under 21</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-purple-50 border-l-4 border-purple-500 p-6 mt-6">
                  <h3 className="text-xl font-bold text-purple-800 mb-2">
                    Special Family Protections:
                  </h3>
                  <ul className="text-purple-700 space-y-2">
                    <li>• Family members may also be trafficking victims</li>
                    <li>• Protection available even if family is overseas</li>
                    <li>• No income requirements for family petitions</li>
                    <li>• Family members get same benefits as principal applicant</li>
                  </ul>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Path to Permanent Residence
                </h2>
                <p className="text-gray-700 mb-6">
                  T visa holders can apply for permanent residence (green card) after three years of
                  continuous physical presence in the United States, or earlier in certain
                  circumstances.
                </p>

                <div className="bg-green-50 border-l-4 border-green-500 p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-2">
                    Green Card Eligibility Requirements:
                  </h3>
                  <ul className="text-green-700 space-y-2">
                    <li>• 3 years of continuous physical presence (may be reduced)</li>
                    <li>• Good moral character</li>
                    <li>• Compliance with reasonable law enforcement requests</li>
                    <li>• Would suffer extreme hardship if removed</li>
                  </ul>
                  <p className="text-green-700 mt-4">
                    <strong>Note:</strong> The 3-year requirement may be reduced if law enforcement
                    certifies the investigation/prosecution is complete, you were under 18 when
                    trafficking occurred, or exceptional circumstances exist.
                  </p>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Why Choose Vasquez Law Firm for T Visa Cases?
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <Heart className="w-8 h-8 text-burgundy-700 mb-4" />
                    <h3 className="text-xl font-bold text-burgundy-900 mb-4">
                      Compassionate Representation
                    </h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Trauma-informed approach</li>
                      <li>• Cultural sensitivity</li>
                      <li>• Patient, understanding attorneys</li>
                      <li>• Safe, confidential environment</li>
                    </ul>
                  </div>

                  <div>
                    <Shield className="w-8 h-8 text-burgundy-700 mb-4" />
                    <h3 className="text-xl font-bold text-burgundy-900 mb-4">Proven Expertise</h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Specialized trafficking victim experience</li>
                      <li>• Strong law enforcement relationships</li>
                      <li>• Comprehensive case preparation</li>
                      <li>• High approval success rate</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                  Resources for Trafficking Survivors
                </h2>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
                  <h3 className="text-xl font-bold text-blue-800 mb-4">Crisis Resources:</h3>
                  <ul className="text-blue-700 space-y-2">
                    <li>
                      • <strong>National Human Trafficking Hotline:</strong> 1-888-373-7888
                    </li>
                    <li>
                      • <strong>Crisis Text Line:</strong> Text 233733
                    </li>
                    <li>
                      • <strong>National Domestic Violence Hotline:</strong> 1-800-799-7233
                    </li>
                    <li>
                      • <strong>National Sexual Assault Hotline:</strong> 1-800-656-4673
                    </li>
                  </ul>
                  <p className="text-blue-700 mt-4 italic">
                    These resources provide immediate crisis support and can connect you with local
                    services and legal assistance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Confidential CTA Section */}
      <section className="bg-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              You Deserve Protection and Justice
            </h2>
            <p className="text-xl mb-8">
              Your safety and privacy are our priority. Contact us for confidential legal
              consultation about your T visa options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1-844-967-3536"
                className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-bold rounded-full hover:bg-gray-100 transition-colors text-lg"
              >
                <Phone className="mr-2 w-6 h-6" />
                CONFIDENTIAL: 1-844-YO-PELEO
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-yellow-400 text-purple-600 font-bold rounded-full hover:bg-yellow-300 transition-colors text-lg"
              >
                Safe Consultation
                <ArrowRight className="ml-2 w-6 h-6" />
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <MapPin className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-sm font-medium">Raleigh, NC</p>
                <p className="text-xs">(919) 246-8831</p>
              </div>
              <div>
                <MapPin className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-sm font-medium">Charlotte, NC</p>
                <p className="text-xs">(704) 266-2998</p>
              </div>
              <div>
                <MapPin className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-sm font-medium">Smithfield, NC</p>
                <p className="text-xs">(919) 209-8788</p>
              </div>
              <div>
                <MapPin className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-sm font-medium">Orlando, FL</p>
                <p className="text-xs">(407) 647-1900</p>
              </div>
            </div>

            <p className="mt-6 text-sm">
              Complete confidentiality • Trauma-informed representation • Hablamos Español • Over 35
              years of immigration experience
            </p>
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
            serviceType: 'Immigration T Visa Legal Services',
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
            url: 'https://www.vasquezlawfirm.com/practice-areas/immigration/t-visa/page',
            description:
              'Immigration T Visa legal services in North Carolina. Free consultation. Se habla español.',
          }),
        }}
      />
    </div>
  );
}
