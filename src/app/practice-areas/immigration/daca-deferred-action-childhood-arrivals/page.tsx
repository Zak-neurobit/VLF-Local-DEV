import { Metadata } from 'next';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  Shield,
  Clock,
  FileText,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';

export const metadata: Metadata = {
  title:
    'DACA Lawyers North Carolina | Deferred Action Childhood Arrivals | Vasquez Law Firm - YO PELEO™',
  description:
    'Expert DACA attorneys in NC. Help with initial applications, renewals, work permits for Dreamers. Experienced representation. Free consultation. Call 1-844-YO-PELEO',
  openGraph: {
    title:
      'DACA Lawyers North Carolina | Deferred Action Childhood Arrivals | Vasquez Law Firm - YO PELEO™',
    description:
      'Expert DACA attorneys in NC. Help with initial applications, renewals, work permits for Dreamers. Experienced representation. Free consultation. Call 1-844-YO-PELEO',
  },
};

export default function DacaPage() {
  const dacaRequirements = [
    {
      title: 'Age Requirement',
      description:
        'Under 31 years old as of June 15, 2012, and at least 15 years old when applying',
      icon: <Clock className="w-6 h-6" />,
    },
    {
      title: 'Arrival in U.S.',
      description: 'Came to the U.S. before your 16th birthday and before June 15, 2007',
      icon: <Shield className="w-6 h-6" />,
    },
    {
      title: 'Continuous Residence',
      description: 'Continuously resided in the U.S. since June 15, 2007',
      icon: <CheckCircle className="w-6 h-6" />,
    },
    {
      title: 'Education/Military',
      description: 'In school, graduated, obtained GED, or honorably discharged veteran',
      icon: <GraduationCap className="w-6 h-6" />,
    },
  ];

  const services = [
    {
      title: 'Initial DACA Applications',
      description: 'Complete assistance with first-time DACA applications and work permits',
      icon: <FileText className="w-6 h-6" />,
    },
    {
      title: 'DACA Renewals',
      description: 'Timely renewal applications to maintain protection and work authorization',
      icon: <Clock className="w-6 h-6" />,
    },
    {
      title: 'Work Permit Assistance',
      description: 'Employment Authorization Document (EAD) applications and renewals',
      icon: <CheckCircle className="w-6 h-6" />,
    },
    {
      title: 'Travel Authorization',
      description: 'Advance parole applications for emergency travel abroad',
      icon: <Shield className="w-6 h-6" />,
    },
  ];

  const faqs = [
    {
      question: 'How long does DACA protection last?',
      answer:
        "DACA protection is granted for 2 years and can be renewed. It's important to apply for renewal 120-150 days before expiration.",
    },
    {
      question: 'Can I travel outside the U.S. with DACA?',
      answer:
        'Only with advance parole approval for educational, employment, or humanitarian purposes. Traveling without advance parole terminates DACA status.',
    },
    {
      question: 'What happens if my DACA expires?',
      answer:
        "You lose work authorization and protection from deportation. It's crucial to renew on time. We can help with late renewals in certain circumstances.",
    },
    {
      question: 'Can DACA recipients apply for green cards?',
      answer:
        "DACA doesn't directly lead to a green card, but recipients may qualify through other means like family sponsorship or certain employment categories.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#6B1F2E] to-[#8B2635] text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              DACA Lawyers - Deferred Action for Childhood Arrivals
            </h1>
            <p className="text-xl mb-4">Protecting Dreamers and Their Future</p>
            <p className="text-[#C9974D] text-lg font-semibold mb-8">
              YO PELEO POR TI™ - I FIGHT FOR DREAMERS
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="bg-[#C9974D] text-[#6B1F2E] px-8 py-3 rounded-md font-semibold hover:bg-[#D4A574] transition-colors"
              >
                Free DACA Consultation
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
      <section className="py-12 bg-blue-50 border-l-4 border-blue-500">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-700 mb-2">
                  DACA Renewal Deadline Approaching?
                </h3>
                <p className="text-gray-700 mb-4">
                  Don&apos;t wait until the last minute. DACA renewals should be filed 120-150 days
                  before expiration. Missing the deadline means losing work authorization and
                  protection from deportation.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="tel:+1-844-967-3536"
                    className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Call for Urgent Help: 1-844-YO-PELEO
                  </a>
                  <span className="text-gray-600 flex items-center">
                    Same-day appointments available
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
              Experienced DACA Attorneys Fighting for Dreamers
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              DACA (Deferred Action for Childhood Arrivals) provides protection from deportation and
              work authorization for young immigrants who came to the U.S. as children. At Vasquez
              Law Firm, we have extensive experience helping Dreamers navigate the DACA process and
              protect their future in America.
            </p>
            <p className="text-gray-600">
              Our DACA attorneys understand the unique challenges faced by young immigrants and work
              tirelessly to ensure your applications are complete, accurate, and submitted on time.
              We&apos;ve helped thousands of Dreamers obtain and maintain their DACA status.
            </p>
          </div>
        </div>
      </section>

      {/* DACA Requirements */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">
            DACA Eligibility Requirements
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {dacaRequirements.map((requirement, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#6B1F2E] text-white rounded-full flex items-center justify-center flex-shrink-0">
                    {requirement.icon}
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
              Must also pass background check and not have certain criminal convictions.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-[#C9974D] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#D4A574] transition-colors"
            >
              Check Your DACA Eligibility
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">Our DACA Services</h2>
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
            DACA Success Stories
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white border border-gray-200 p-6 rounded-lg">
              <div className="text-3xl font-bold text-[#C9974D] mb-2">3,000+</div>
              <p className="text-gray-700">DACA Applications Approved</p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-lg">
              <div className="text-3xl font-bold text-[#C9974D] mb-2">99%</div>
              <p className="text-gray-700">Approval Rate</p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-lg">
              <div className="text-3xl font-bold text-[#C9974D] mb-2">100%</div>
              <p className="text-gray-700">On-Time Renewals</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">DACA FAQs</h2>
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
            <h2 className="text-3xl font-bold mb-6">Protect Your Dreams with DACA</h2>
            <p className="text-xl mb-8">
              Don&apos;t risk your future. Contact our experienced DACA attorneys for professional legal
              assistance.
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
                YO PELEO POR TI™ - I FIGHT FOR DREAMERS
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
            name: 'Vasquez Law Firm DACA Attorneys',
            description:
              'Expert DACA lawyers providing comprehensive Deferred Action for Childhood Arrivals services',
            url: 'https://vasquezlawnc.com/practice-areas/immigration/daca-deferred-action-childhood-arrivals',
            telephone: '+1-844-967-3536',
            areaServed: ['North Carolina', 'Raleigh', 'Charlotte', 'Durham', 'Smithfield'],
            serviceType: [
              'DACA',
              'Deferred Action for Childhood Arrivals',
              'Dreamer Protection',
              'Work Permits',
              'Immigration Law',
            ],
          }),
        }}
      />
    </div>
  );
}