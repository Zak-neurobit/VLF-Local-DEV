import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { Phone, Mail, MapPin, Shield, Clock, CheckCircle, TrendingUp, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Car Accident Lawyers North Carolina | Auto Accident Attorneys - Vasquez Law Firm',
  description:
    'Top car accident attorneys in NC. Maximum compensation for auto accident victims. Free consultation. No fee unless we win. Call 1-844-YO-PELEO today!',
  openGraph: {
    title: 'Car Accident Lawyers North Carolina | Auto Accident Attorneys - Vasquez Law Firm',
    description:
      'Top car accident attorneys in NC. Maximum compensation for auto accident victims. Free consultation. No fee unless we win. Call 1-844-YO-PELEO today!',
    images: [{ url: '../wp-content/uploads/2024/04/charlotte-nc-car-accident-lawyers.jpg' }],
  },
};

export default function CarAccidentsPage() {
  const accidentTypes = [
    {
      title: 'Rear-End Collisions',
      description:
        'Most common type of car accident, often resulting in whiplash and back injuries',
      icon: '🚗💥',
    },
    {
      title: 'Head-On Collisions',
      description: 'Severe accidents often resulting in catastrophic injuries or fatalities',
      icon: '⚡',
    },
    {
      title: 'Side-Impact Crashes',
      description: 'T-bone accidents at intersections causing serious injuries to passengers',
      icon: '🔄',
    },
    {
      title: 'Multi-Vehicle Pileups',
      description: 'Complex accidents involving multiple vehicles, often on highways',
      icon: '🚙🚗🚕',
    },
    {
      title: 'Hit and Run Accidents',
      description: 'When the at-fault driver flees the scene, complicating insurance claims',
      icon: '🏃‍♂️',
    },
    {
      title: 'Rollover Accidents',
      description: 'Dangerous accidents often involving SUVs and trucks on highways',
      icon: '🔄',
    },
  ];

  const commonInjuries = [
    'Whiplash and neck injuries',
    'Back and spinal cord injuries',
    'Traumatic brain injuries (TBI)',
    'Broken bones and fractures',
    'Internal organ damage',
    'Cuts, bruises, and scarring',
    'Psychological trauma and PTSD',
  ];

  const faqs = [
    {
      question: 'What should I do immediately after a car accident?',
      answer:
        'First, ensure your safety and call 911 if anyone is injured. Document the scene with photos, exchange insurance information, get witness contact details, and seek medical attention even if you feel fine. Contact our office as soon as possible to protect your rights.',
    },
    {
      question: 'How much is my car accident case worth?',
      answer:
        'Case value depends on factors like injury severity, medical costs, lost wages, pain and suffering, and fault percentage. We offer free case evaluations to estimate your potential compensation based on similar cases in North Carolina.',
    },
    {
      question: 'What if the other driver doesn\'t have insurance?',
      answer:
        'North Carolina requires minimum insurance, but some drivers are uninsured. Your own uninsured motorist coverage may apply, or we can explore other options like suing the at-fault driver directly.',
    },
    {
      question: 'How long do car accident cases take to settle?',
      answer:
        'Most cases settle within 6-18 months, but complex cases involving severe injuries may take longer. We focus on getting you maximum compensation rather than a quick settlement that undervalues your case.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#6B1F2E] to-[#8B2635] text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Car Accident Lawyers North Carolina
            </h1>
            <p className="text-xl mb-4">Maximum Compensation for Auto Accident Victims</p>
            <p className="text-[#C9974D] text-lg font-semibold mb-8">
              YO PELEO POR TI™ - I FIGHT FOR YOU
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="bg-[#C9974D] text-[#6B1F2E] px-8 py-3 rounded-md font-semibold hover:bg-[#D4A574] transition-colors"
              >
                Free Car Accident Consultation
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
              Been in a Car Accident? We&apos;re Here to Help
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Car accidents happen in an instant but can change your life forever. If you\&apos;ve been
              injured in an auto accident in North Carolina, you need experienced legal
              representation to ensure you receive the compensation you deserve for your injuries,
              lost wages, and pain and suffering.
            </p>
            <p className="text-gray-600">
              At Vasquez Law Firm, we understand the physical, emotional, and financial toll that
              car accidents take on victims and their families. Our skilled car accident attorneys
              have recovered millions of dollars for our clients and are ready to fight for your
              rights.
            </p>
          </div>
        </div>
      </section>

      {/* Types of Car Accidents */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">
            Types of Car Accidents We Handle
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {accidentTypes.map((type, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-3xl mb-4">{type.icon}</div>
                <h3 className="text-xl font-bold text-[#6B1F2E] mb-3">{type.title}</h3>
                <p className="text-gray-600">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Injuries */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">
              Common Car Accident Injuries
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-[#6B1F2E] mb-4">Injuries We Handle:</h3>
                <ul className="space-y-3">
                  {commonInjuries.map((injury, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{injury}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#6B1F2E] text-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">⚠️ Important Reminder</h3>
                <p className="text-sm mb-4">
                  Even if you feel fine after an accident, some injuries like whiplash or
                  concussions may not show symptoms immediately. It&apos;s crucial to seek medical
                  attention right away.
                </p>
                <p className="text-sm">
                  Delaying medical treatment can harm both your health and your legal case, as
                  insurance companies may argue your injuries weren&apos;t serious.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">
            Why Choose Our Car Accident Lawyers?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#6B1F2E] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-[#6B1F2E] mb-2">Proven Results</h3>
              <p className="text-gray-700">
                Millions recovered for car accident victims in North Carolina
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#6B1F2E] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-[#6B1F2E] mb-2">No Fee Unless We Win</h3>
              <p className="text-gray-700">
                Contingency fee - you pay nothing unless we recover compensation
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#6B1F2E] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-[#6B1F2E] mb-2">Free Consultation</h3>
              <p className="text-gray-700">Immediate case evaluation with no obligation</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#6B1F2E] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-[#6B1F2E] mb-2">Bilingual Support</h3>
              <p className="text-gray-700">Full legal services in English and Spanish</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">Car Accident FAQs</h2>
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
            <h2 className="text-3xl font-bold mb-6">
              Don&apos;t Let Insurance Companies Take Advantage
            </h2>
            <p className="text-xl mb-8">
              Insurance companies have teams of lawyers working to minimize your claim. Level the
              playing field with experienced car accident attorneys on your side.
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
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3" />
                <div>
                  <p className="font-semibold">Visit Our Offices</p>
                  <span className="text-[#C9974D]">Raleigh • Charlotte • Smithfield</span>
                </div>
              </div>
            </div>
            <Link
              href="/contact"
              className="bg-[#C9974D] text-[#6B1F2E] px-8 py-3 rounded-md font-semibold hover:bg-[#D4A574] transition-colors"
            >
              Get Your Free Car Accident Consultation
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
            <Link href="/practice-areas/personal-injury" className="text-[#6B1F2E] hover:underline">
              Personal Injury
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-600">Car Accidents</span>
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
            serviceType: 'Personal Injury Car Auto Accidents Legal Services',
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
            url: 'https://www.vasquezlawfirm.com/practice-areas/personal-injury/car-auto-accidents/page',
            description:
              'Personal Injury Car Auto Accidents legal services in North Carolina. Free consultation. Se habla español.',
          }),
        }}
      />
    </div>
  );
}
