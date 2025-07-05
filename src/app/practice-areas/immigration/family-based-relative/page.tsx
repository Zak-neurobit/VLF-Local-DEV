'use client';

import {
  Phone,
  Mail,
  MapPin,
  Heart,
  Users,
  Clock,
  FileText,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';

export default function FamilyBasedImmigrationPage() {
  const familyCategories = [
    {
      title: 'Immediate Relatives',
      description: 'Spouses, unmarried children under 21, and parents of U.S. citizens',
      waitTime: 'No waiting period',
      icon: 'Heart',
      priority: 'Highest Priority',
    },
    {
      title: 'First Preference (F1)',
      description: 'Unmarried adult children of U.S. citizens',
      waitTime: 'Several years',
      icon: 'Users',
      priority: 'First Preference',
    },
    {
      title: 'Second Preference (F2)',
      description: 'Spouses and children of green card holders',
      waitTime: '2-3 years',
      icon: 'Users',
      priority: 'Second Preference',
    },
    {
      title: 'Third & Fourth Preference',
      description: 'Married children and siblings of U.S. citizens',
      waitTime: '10+ years',
      icon: 'Users',
      priority: 'Lower Priority',
    },
  ];

  const processSteps = [
    {
      step: '1',
      title: 'Determine Eligibility',
      description: 'We assess your relationship and eligibility for family-based immigration',
    },
    {
      step: '2',
      title: 'File I-130 Petition',
      description: 'We prepare and submit the Petition for Alien Relative with USCIS',
    },
    {
      step: '3',
      title: 'Wait for Priority Date',
      description: 'Monitor visa bulletin for when your priority date becomes current',
    },
    {
      step: '4',
      title: 'File I-485 or Consular Processing',
      description: 'Apply for green card either in the U.S. or at consulate abroad',
    },
    {
      step: '5',
      title: 'Interview & Approval',
      description: 'Attend interview and receive permanent residence approval',
    },
  ];

  const faqs = [
    {
      question: 'How long does family-based immigration take?',
      answer:
        'Processing times vary by relationship and country of birth. Immediate relatives have no waiting period, while other categories can take several years. We track processing times and keep you updated.',
    },
    {
      question: 'Can I work while my family petition is pending?',
      answer:
        'If you&apos;re in the U.S. and eligible to adjust status, you can apply for employment authorization (EAD) after filing Form I-485. Work authorization is typically approved within 90 days.',
    },
    {
      question: 'What if my family member is undocumented?',
      answer:
        'Undocumented relatives may still be eligible for family-based immigration, but may need waivers for unlawful presence. We evaluate each case and advise on the best strategy.',
    },
    {
      question: 'Can same-sex spouses petition for their partners?',
      answer:
        'Yes, since 2013, same-sex marriages are recognized for immigration purposes. We help same-sex couples navigate the family-based immigration process.',
    },
    {
      question: 'What documents are needed for family petitions?',
      answer:
        "You'll need proof of relationship (marriage/birth certificates), proof of U.S. citizenship or permanent residence, and supporting evidence. We provide a complete document checklist.",
    },
  ];

  const renderIcon = (iconName: string) => {
    const icons: Record<string, JSX.Element> = {
      Users: <Users className="w-6 h-6" />,
      Heart: <Heart className="w-6 h-6" />,
      Clock: <Clock className="w-6 h-6" />,
      FileText: <FileText className="w-6 h-6" />,
      CheckCircle: <CheckCircle className="w-6 h-6" />,
      AlertCircle: <AlertCircle className="w-6 h-6" />,
    };
    return icons[iconName] || null;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#6B1F2E] to-[#8B2635] text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Family-Based Immigration Lawyers
            </h1>
            <p className="text-xl mb-4">Reuniting Families Through Expert Legal Guidance</p>
            <p className="text-[#C9974D] text-lg font-semibold mb-8">
              YO PELEO POR TI™ - I FIGHT TO REUNITE FAMILIES
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="bg-[#C9974D] text-[#6B1F2E] px-8 py-3 rounded-md font-semibold hover:bg-[#D4A574] transition-colors"
              >
                Free Family Immigration Consultation
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
            <h2 className="text-3xl font-bold text-[#6B1F2E] mb-6">Bringing Families Together</h2>
            <p className="text-lg text-gray-700 mb-6">
              Family separation is one of the most heartbreaking consequences of immigration
              challenges. At Vasquez Law Firm, we understand the urgency of reuniting families and
              work tirelessly to help U.S. citizens and permanent residents bring their loved ones
              to the United States.
            </p>
            <p className="text-gray-600">
              Our experienced family immigration attorneys have successfully reunited thousands of
              families through the family-based immigration process. We handle everything from
              immediate relative petitions to complex preference category cases, ensuring your
              family&apos;s future together in America.
            </p>
          </div>
        </div>
      </section>

      {/* Family Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">
            Family-Based Immigration Categories
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {familyCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#6B1F2E] text-white rounded-full flex items-center justify-center flex-shrink-0">
                    {renderIcon(category.icon)}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-[#6B1F2E] mb-2">{category.title}</h3>
                    <p className="text-gray-600 mb-3">{category.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm bg-[#C9974D] text-white px-3 py-1 rounded-full">
                        {category.priority}
                      </span>
                      <span className="text-sm text-gray-500">Wait Time: {category.waitTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">
            Our Family Immigration Process
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {processSteps.map((process, index) => (
                <div
                  key={index}
                  className="flex items-start gap-6 p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-[#C9974D] text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {process.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#6B1F2E] mb-2">{process.title}</h3>
                    <p className="text-gray-700">{process.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Offered */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">
            Our Family Immigration Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-[#6B1F2E] text-white rounded-full flex items-center justify-center mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#6B1F2E] mb-3">I-130 Petitions</h3>
              <p className="text-gray-600">
                Petition for Alien Relative preparation and filing for all family relationships
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-[#6B1F2E] text-white rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#6B1F2E] mb-3">Spouse Visas</h3>
              <p className="text-gray-600">
                CR-1, IR-1, and K-3 visas for foreign spouses of U.S. citizens and residents
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-[#6B1F2E] text-white rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#6B1F2E] mb-3">Child Immigration</h3>
              <p className="text-gray-600">
                IR-2, CR-2, and F1/F2 categories for children of all ages
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-[#6B1F2E] text-white rounded-full flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#6B1F2E] mb-3">Parent Immigration</h3>
              <p className="text-gray-600">
                IR-5 immediate relative category for parents of U.S. citizens
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-[#6B1F2E] text-white rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#6B1F2E] mb-3">Adjustment of Status</h3>
              <p className="text-gray-600">
                Green card applications for family members already in the United States
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-[#6B1F2E] text-white rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#6B1F2E] mb-3">Waivers & Appeals</h3>
              <p className="text-gray-600">
                Inadmissibility waivers and appeals for denied family petitions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">
            Family Reunification Success
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white border border-gray-200 p-6 rounded-lg">
              <div className="text-3xl font-bold text-[#C9974D] mb-2">5,000+</div>
              <p className="text-gray-700">Families Reunited</p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-lg">
              <div className="text-3xl font-bold text-[#C9974D] mb-2">96%</div>
              <p className="text-gray-700">Approval Rate</p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-lg">
              <div className="text-3xl font-bold text-[#C9974D] mb-2">6-12</div>
              <p className="text-gray-700">Months Average Processing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency Alert */}
      <section className="py-12 bg-red-50 border-l-4 border-red-500">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-700 mb-2">
                  Don't Wait - File Your Family Petition Today
                </h3>
                <p className="text-gray-700 mb-4">
                  Processing times continue to increase. The sooner you file your family petition,
                  the sooner your loved ones can join you. Priority dates matter - every day counts.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="tel:+1-844-967-3536"
                    className="bg-red-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-700 transition-colors"
                  >
                    Call Now: 1-844-YO-PELEO
                  </a>
                  <span className="text-gray-600 flex items-center">
                    Free consultation available
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">
            Family Immigration FAQs
          </h2>
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
            <h2 className="text-3xl font-bold mb-6">Ready to Reunite Your Family?</h2>
            <p className="text-xl mb-8">
              Don't let distance keep your family apart. Contact our family immigration attorneys
              today to start the process.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3" />
                <div>
                  <p className="font-semibold">Call Now</p>
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
                  <span className="text-[#C9974D]">Raleigh • Charlotte • Smithfield • Orlando</span>
                </div>
              </div>
            </div>
            <div className="border-t border-[#C9974D] pt-6">
              <p className="text-[#C9974D] font-semibold mb-4">
                YO PELEO POR TI™ - I FIGHT TO REUNITE FAMILIES
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
    </div>
  );
}
