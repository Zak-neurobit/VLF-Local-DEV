import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { Phone, Mail, Users, Scale, CheckCircle, AlertCircle, CreditCard } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Green Card Lawyers North Carolina | Permanent Residence - Vasquez Law Firm',
  description:
    'Expert green card attorneys in NC. Family-based, employment-based permanent residence. Marriage green cards, adjustment of status. Free consultation. Call 1-844-YO-PELEO',
  openGraph: {
    title: 'Green Card Lawyers North Carolina | Permanent Residence - Vasquez Law Firm',
    description:
      'Expert green card attorneys in NC. Family-based, employment-based permanent residence. Marriage green cards, adjustment of status. Free consultation. Call 1-844-YO-PELEO',
    images: [
      {
        url: '../wp-content/uploads/2024/04/charlotte-nc-immigration-attorneys.jpg',
      },
    ],
  },
};

export default function GreenCardsPage() {
  const greenCardTypes = [
    {
      title: 'Marriage-Based Green Cards',
      description: 'For spouses of U.S. citizens and permanent residents',
      icon: '💒',
      details: [
        'Immediate relative petitions (no waiting period for U.S. citizen spouses)',
        'Family preference category for permanent resident spouses',
        'K-3 visa options for faster processing',
        'Adjustment of status if already in the U.S.',
      ],
    },
    {
      title: 'Family-Based Green Cards',
      description: 'For parents, children, and siblings of U.S. citizens',
      icon: '👨‍👩‍👧‍👦',
      details: [
        'Immediate relatives: parents, spouses, unmarried children under 21',
        'Family preference categories with waiting periods',
        'Derivative benefits for family members',
        'Consular processing for applicants abroad',
      ],
    },
    {
      title: 'Employment-Based Green Cards',
      description: 'For workers with job offers or exceptional abilities',
      icon: '💼',
      details: [
        'EB-1: Priority workers, extraordinary ability',
        'EB-2: Advanced degree professionals, national interest waiver',
        'EB-3: Skilled workers, professionals, other workers',
        'PERM labor certification process',
      ],
    },
    {
      title: 'Humanitarian Green Cards',
      description: 'For asylum seekers, refugees, and crime victims',
      icon: '🛡️',
      details: [
        'Asylum-based adjustment of status',
        'Refugee adjustments after one year',
        'U-visa to green card transitions',
        'VAWA self-petitions for abuse survivors',
      ],
    },
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Initial Consultation',
      description: 'We evaluate your case and determine the best path to permanent residence',
    },
    {
      step: 2,
      title: 'Petition Filing',
      description: 'We prepare and file all necessary forms and supporting documentation',
    },
    {
      step: 3,
      title: 'Priority Date & Waiting',
      description: 'We monitor your priority date and keep you informed of progress',
    },
    {
      step: 4,
      title: 'Adjustment or Consular Processing',
      description: 'We guide you through the final step to obtain your green card',
    },
  ];

  const faqs = [
    {
      question: 'How long does it take to get a green card?',
      answer:
        'Processing times vary by category. Marriage-based cases for U.S. citizen spouses typically take 8-14 months. Family preference categories can take several years due to numerical limitations and country quotas.',
    },
    {
      question: 'Can I work while my green card application is pending?',
      answer:
        'If you\'re adjusting status from within the U.S., you can apply for work authorization (EAD) which typically allows you to work while your case is pending.',
    },
    {
      question: 'What happens if my green card application is denied?',
      answer:
        'Depending on your current status, you may face removal proceedings. We can help appeal the decision, file a motion to reopen, or explore alternative options.',
    },
    {
      question: 'Do I need to take an English test for a green card?',
      answer:
        "Generally no, but some categories may require basic English proficiency. Marriage-based applicants typically don\'t need to demonstrate English skills.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#6B1F2E] to-[#8B2635] text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Green Card Lawyers North Carolina
            </h1>
            <p className="text-xl mb-4">Expert Legal Help for Permanent Residence</p>
            <p className="text-[#C9974D] text-lg font-semibold mb-8">
              YO PELEO POR TI™ - I FIGHT FOR YOU
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="bg-[#C9974D] text-[#6B1F2E] px-8 py-3 rounded-md font-semibold hover:bg-[#D4A574] transition-colors"
              >
                Free Green Card Consultation
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
            <h2 className="text-3xl font-bold text-[#6B1F2E] mb-6">
              Achieve Your Dream of Permanent Residence
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              A green card provides you with permanent residence in the United States, opening doors
              to work opportunities, social benefits, and eventually U.S. citizenship. Our
              experienced immigration attorneys guide you through every step of the complex green
              card process.
            </p>
            <p className="text-gray-600">
              Whether you&apos;re seeking a green card through family, employment, or humanitarian
              protection, we have the knowledge and experience to help you succeed. We&apos;ve helped
              thousands of clients obtain permanent residence and build new lives in America.
            </p>
          </div>
        </div>
      </section>

      {/* Types of Green Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">
            Types of Green Cards We Handle
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {greenCardTypes.map((type, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-4">{type.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-[#6B1F2E]">{type.title}</h3>
                    <p className="text-gray-600">{type.description}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {type.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">
            Green Card Process Steps
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {processSteps.map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-12 h-12 bg-[#6B1F2E] text-white rounded-full flex items-center justify-center font-bold text-lg mr-6 flex-shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#6B1F2E] mb-2">{step.title}</h3>
                    <p className="text-gray-700">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">
            Why Choose Our Green Card Lawyers?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#6B1F2E] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-[#6B1F2E] mb-2">Green Card Expertise</h3>
              <p className="text-gray-700">
                Specialized experience in all types of green card applications
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#6B1F2E] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Scale className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-[#6B1F2E] mb-2">Proven Success</h3>
              <p className="text-gray-700">High approval rates and successful case outcomes</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#6B1F2E] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-[#6B1F2E] mb-2">Bilingual Support</h3>
              <p className="text-gray-700">Services in English and Spanish for your comfort</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#6B1F2E] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-[#6B1F2E] mb-2">Case Monitoring</h3>
              <p className="text-gray-700">We track your case and keep you informed every step</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">Green Card FAQs</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-[#6B1F2E] mb-3">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-[#6B1F2E] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Apply for Your Green Card?</h2>
            <p className="text-xl mb-8">
              Don&apos;t let complex immigration laws stand between you and permanent residence. Contact
              our experienced green card attorneys today.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3" />
                <div>
                  <p className="font-semibold">Call 24/7</p>
                  <a href="tel:+1-844-967-3536" className="text-[#C9974D] hover:underline">
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
            </div>
            <Link
              href="/contact"
              className="bg-[#C9974D] text-[#6B1F2E] px-8 py-3 rounded-md font-semibold hover:bg-[#D4A574] transition-colors"
            >
              Schedule Your Free Green Card Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      <section className="py-4 bg-gray-100">
        <div className="container mx-auto px-4">
          <nav className="text-sm">
            <Link href="/" className="text-[#6B1F2E] hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/practice-areas" className="text-[#6B1F2E] hover:underline">
              Practice Areas
            </Link>
            <span className="mx-2">/</span>
            <Link href="/practice-areas/immigration" className="text-[#6B1F2E] hover:underline">
              Immigration
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-600">Green Cards</span>
          </nav>
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
            serviceType: 'Immigration Green Cards Legal Services',
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
            url: 'https://www.vasquezlawfirm.com/practice-areas/immigration/green-cards/page',
            description:
              'Immigration Green Cards legal services in North Carolina. Free consultation. Se habla español.',
          }),
        }}
      />
    </div>
  );
}
