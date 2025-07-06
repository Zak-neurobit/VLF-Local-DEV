'use client';

import {
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Clock,
  FileText,
  Users,
  Shield,
  Star,
  Heart,
} from 'lucide-react';
import Link from 'next/link';

export default function CitizenshipNaturalizationPage() {
  const citizenshipRequirements = [
    {
      title: 'Age Requirement',
      description: 'Must be at least 18 years old when filing Form N-400',
      icon: 'Users',
    },
    {
      title: 'Permanent Residence',
      description:
        'Must be a lawful permanent resident for at least 5 years (or 3 years if married to U.S. citizen)',
      icon: 'Shield',
    },
    {
      title: 'Physical Presence',
      description:
        'Must have been physically present in the U.S. for at least 30 months in the past 5 years',
      icon: 'Clock',
    },
    {
      title: 'English & Civics',
      description:
        'Must demonstrate basic English ability and knowledge of U.S. history and civics',
      icon: 'FileText',
    },
  ];

  const naturalizationProcess = [
    {
      step: '1',
      title: 'Case Evaluation',
      description:
        'We review your eligibility and immigration history to ensure you meet all requirements',
    },
    {
      step: '2',
      title: 'Form N-400 Preparation',
      description:
        'We complete and file your citizenship application with supporting documentation',
    },
    {
      step: '3',
      title: 'Test Preparation',
      description:
        'We provide study materials and practice sessions for the English and civics tests',
    },
    {
      step: '4',
      title: 'Interview Representation',
      description: 'We accompany you to your USCIS interview and advocate on your behalf',
    },
    {
      step: '5',
      title: 'Oath Ceremony',
      description: 'We help you prepare for and attend your naturalization ceremony',
    },
  ];

  const faqs = [
    {
      question: 'How long does the naturalization process take?',
      answer:
        'The current processing time for Form N-400 is approximately 8-14 months from filing to oath ceremony. Processing times vary by USCIS office location.',
    },
    {
      question: 'What happens if I fail the English or civics test?',
      answer:
        'You will have a second opportunity to take the portion of the test you didn\'t pass. We provide additional preparation to help ensure success on your retake.',
    },
    {
      question: 'Can I travel while my citizenship application is pending?',
      answer:
        'Yes, as a permanent resident you can travel, but extended absences may affect your application. We advise on travel considerations during the process.',
    },
    {
      question: 'What documents do I need for my citizenship application?',
      answer:
        "You'll need your green card, tax returns, travel records, marriage/divorce certificates (if applicable), and other supporting documents. We provide a complete checklist.",
    },
    {
      question: 'Can I apply for citizenship if I have a criminal record?',
      answer:
        'It depends on the nature and timing of your criminal history. We carefully review your background and advise on the best strategy for your case.',
    },
  ];

  const renderIcon = (iconName: string) => {
    const icons: Record<string, JSX.Element> = {
      Users: <Users className="w-6 h-6" />,
      Shield: <Shield className="w-6 h-6" />,
      Clock: <Clock className="w-6 h-6" />,
      FileText: <FileText className="w-6 h-6" />,
      Heart: <Heart className="w-6 h-6" />,
      CheckCircle: <CheckCircle className="w-6 h-6" />,
      Star: <Star className="w-6 h-6" />,
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
              Citizenship & Naturalization Lawyers
            </h1>
            <p className="text-xl mb-4">Become a U.S. Citizen with Expert Legal Guidance</p>
            <p className="text-[#C9974D] text-lg font-semibold mb-8">
              YO PELEO POR TI™ - I FIGHT FOR YOUR AMERICAN DREAM
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="bg-[#C9974D] text-[#6B1F2E] px-8 py-3 rounded-md font-semibold hover:bg-[#D4A574] transition-colors"
              >
                Free Citizenship Consultation
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
              Achieve Your Dream of U.S. Citizenship
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Becoming a U.S. citizen is one of the most important milestones in your immigration
              journey. At Vasquez Law Firm, our experienced citizenship attorneys guide you through
              every step of the naturalization process, from determining eligibility to celebrating
              at your oath ceremony.
            </p>
            <p className="text-gray-600">
              With over 35 years of combined experience, we have successfully helped thousands of
              permanent residents become proud U.S. citizens. Our comprehensive approach includes
              thorough application preparation, test coaching, and dedicated representation
              throughout the entire process.
            </p>
          </div>
        </div>
      </section>

      {/* Citizenship Requirements */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">
            Basic Requirements for U.S. Citizenship
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {citizenshipRequirements.map((requirement, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#6B1F2E] text-white rounded-full flex items-center justify-center flex-shrink-0">
                    {renderIcon(requirement.icon)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#6B1F2E] mb-3">{requirement.title}</h3>
                    <p className="text-gray-600">{requirement.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Requirements may vary based on your specific situation. Military personnel, spouses of
              U.S. citizens, and others may have different requirements.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-[#C9974D] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#D4A574] transition-colors"
            >
              Check Your Eligibility
            </Link>
          </div>
        </div>
      </section>

      {/* Naturalization Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">
            Our Naturalization Process
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {naturalizationProcess.map((process, index) => (
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
            Our Citizenship Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-[#6B1F2E] text-white rounded-full flex items-center justify-center mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#6B1F2E] mb-3">Form N-400 Preparation</h3>
              <p className="text-gray-600">
                Complete assistance with citizenship application, supporting documents, and filing
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-[#6B1F2E] text-white rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#6B1F2E] mb-3">Test Preparation</h3>
              <p className="text-gray-600">
                English and civics test study materials, practice sessions, and coaching
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-[#6B1F2E] text-white rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#6B1F2E] mb-3">Interview Representation</h3>
              <p className="text-gray-600">
                Attorney accompaniment to USCIS interviews for support and advocacy
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-[#6B1F2E] text-white rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#6B1F2E] mb-3">Criminal Issues</h3>
              <p className="text-gray-600">
                Handling citizenship applications with criminal history or other complications
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-[#6B1F2E] text-white rounded-full flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#6B1F2E] mb-3">Expedited Processing</h3>
              <p className="text-gray-600">
                Assistance with emergency naturalization for military deployment or other urgent
                situations
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-[#6B1F2E] text-white rounded-full flex items-center justify-center mb-4">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#6B1F2E] mb-3">Citizenship for Children</h3>
              <p className="text-gray-600">
                Derivative citizenship, Certificate of Citizenship applications for minors
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">
            Citizenship Success Stories
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white border border-gray-200 p-6 rounded-lg">
              <div className="text-3xl font-bold text-[#C9974D] mb-2">2,500+</div>
              <p className="text-gray-700">Citizens Sworn In</p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-lg">
              <div className="text-3xl font-bold text-[#C9974D] mb-2">98%</div>
              <p className="text-gray-700">Approval Rate</p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-lg">
              <div className="text-3xl font-bold text-[#C9974D] mb-2">100%</div>
              <p className="text-gray-700">Test Pass Rate with Our Prep</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">Citizenship FAQs</h2>
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
            <h2 className="text-3xl font-bold mb-6">Ready to Become a U.S. Citizen?</h2>
            <p className="text-xl mb-8">
              Take the next step toward citizenship with experienced legal guidance. Contact us
              today for a free consultation.
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
                YO PELEO POR TI™ - I FIGHT FOR YOUR AMERICAN DREAM
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
