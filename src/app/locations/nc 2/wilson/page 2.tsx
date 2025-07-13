import { Metadata } from 'next';
import Link from 'next/link';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '@/lib/schema';
export const metadata: Metadata = {
  title: `Wilson NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Wilson attorneys serving Wilson County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Wilson immigration lawyer, Wilson criminal defense attorney, Wilson personal injury lawyer, Wilson abogado, Wilson DWI lawyer, Wilson County attorney`,
  openGraph: {
    title: `Wilson Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Wilson, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-wilson.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
  alternates: {
    languages: {
      en: `/locations/nc/wilson`,
      es: `/es/locations/nc/wilson`,
    },
  },
};
const localSchema = localBusinessSchema({
  name: 'Wilson',
  address: 'Serving Wilson',
  city: 'Wilson',
  state: 'NC',
  zip: '27893',
  phone: '1-844-967-3536',
});
const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: 'https://www.vasquezlawnc.com' },
  { name: 'Locations', url: 'https://www.vasquezlawnc.com/locations' },
  { name: 'North Carolina', url: 'https://www.vasquezlawnc.com/locations/nc' },
  { name: 'Wilson', url: `https://www.vasquezlawnc.com/locations/nc/wilson` },
]);
const faqs = faqSchema([
  {
    question: 'Do you have a physical office in Wilson?',
    answer:
      'While our main offices are in Raleigh, Charlotte, and Smithfield, we regularly meet with clients throughout Wilson and Wilson County. We offer virtual consultations and can arrange meetings at convenient locations.',
  },
  {
    question: 'What courts do you handle cases in Wilson County?',
    answer:
      'We represent clients in all Wilson County courts, including the 10th Judicial District Court and Eastern District of NC federal court. Our attorneys are licensed to practice in all North Carolina state and federal courts.',
  },
  {
    question: 'How much do immigration lawyers charge in Wilson?',
    answer:
      'We offer transparent flat fees for most immigration cases and free consultations. Payment plans are available to make quality legal representation affordable for Wilson residents.',
  },
  {
    question: 'Can you help with criminal cases in Wilson?',
    answer:
      'Yes, we handle all types of criminal charges in Wilson County, including DWI, drug charges, assault, and traffic violations. We offer 24/7 availability for emergencies.',
  },
]);
export default function WilsonNCPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqs) }}
      />
      <div className="min-h-screen bg-white">
        {/* Hero Section with Local Focus */}
        <section className="bg-gradient-to-br from-[#6B1F2E] to-[#8B2635] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Wilson Immigration & Criminal Defense Lawyers
              </h1>
              <p className="text-xl mb-8 max-w-3xl mx-auto">
                Serving Wilson, Wilson County, and the Eastern NC area with experienced legal
                representation. Se habla español.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-[#C9974D] hover:bg-[#D4A574] text-white font-bold rounded-lg transition-all transform hover:scale-105"
                >
                  Get Free Consultation
                </Link>
                <a
                  href="tel:1-844-967-3536"
                  className="px-8 py-4 bg-white text-[#6B1F2E] font-bold rounded-lg hover:bg-gray-100 transition-all"
                >
                  Call 1-844-YO-PELEO
                </a>
              </div>
              <p className="mt-6 text-sm">
                Available 24/7 for emergencies • Hablamos español • Payment plans available
              </p>
            </div>
          </div>
        </section>
        {/* Local Statistics Bar */}
        <section className="bg-[#C9974D] text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-3xl font-bold">49K+</p>
                <p className="text-sm">Population Served</p>
              </div>
              <div>
                <p className="text-3xl font-bold">1,000+</p>
                <p className="text-sm">Cases in Wilson County</p>
              </div>
              <div>
                <p className="text-3xl font-bold">15+</p>
                <p className="text-sm">Years Experience</p>
              </div>
              <div>
                <p className="text-3xl font-bold">4.9★</p>
                <p className="text-sm">Client Rating</p>
              </div>
            </div>
          </div>
        </section>
        {/* Practice Areas Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">
              Legal Services for Wilson Residents
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Immigration Law */}
              <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-[#6B1F2E]">
                <div className="text-4xl mb-4">🌎</div>
                <h3 className="text-xl font-bold text-[#6B1F2E] mb-3">Immigration Law</h3>
                <ul className="text-gray-700 space-y-2 mb-4">
                  <li>• Green Cards & Citizenship</li>
                  <li>• Work Visas (H-1B, L-1)</li>
                  <li>• Family Immigration</li>
                  <li>• Deportation Defense</li>
                  <li>• DACA Applications</li>
                </ul>
                <Link
                  href="/practice-areas/immigration"
                  className="text-[#C9974D] font-semibold hover:underline"
                >
                  Learn More →
                </Link>
              </div>
              {/* Criminal Defense */}
              <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-[#6B1F2E]">
                <div className="text-4xl mb-4">⚖️</div>
                <h3 className="text-xl font-bold text-[#6B1F2E] mb-3">Criminal Defense</h3>
                <ul className="text-gray-700 space-y-2 mb-4">
                  <li>• DWI/DUI Defense</li>
                  <li>• Drug Charges</li>
                  <li>• Assault & Battery</li>
                  <li>• Traffic Violations</li>
                  <li>• Expungements</li>
                </ul>
                <Link
                  href="/practice-areas/criminal-defense"
                  className="text-[#C9974D] font-semibold hover:underline"
                >
                  Learn More →
                </Link>
              </div>
              {/* Personal Injury */}
              <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-[#6B1F2E]">
                <div className="text-4xl mb-4">🚗</div>
                <h3 className="text-xl font-bold text-[#6B1F2E] mb-3">Personal Injury</h3>
                <ul className="text-gray-700 space-y-2 mb-4">
                  <li>• Car Accidents</li>
                  <li>• Truck Accidents</li>
                  <li>• Slip & Fall</li>
                  <li>• Medical Malpractice</li>
                  <li>• Wrongful Death</li>
                </ul>
                <Link
                  href="/practice-areas/personal-injury"
                  className="text-[#C9974D] font-semibold hover:underline"
                >
                  Learn More →
                </Link>
              </div>
              {/* Workers Compensation */}
              <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-[#6B1F2E]">
                <div className="text-4xl mb-4">👷</div>
                <h3 className="text-xl font-bold text-[#6B1F2E] mb-3">
                  Workers&apos; Compensation
                </h3>
                <ul className="text-gray-700 space-y-2 mb-4">
                  <li>• Workplace Injuries</li>
                  <li>• Denied Claims</li>
                  <li>• Disability Benefits</li>
                  <li>• Medical Treatment</li>
                  <li>• Third-Party Claims</li>
                </ul>
                <Link
                  href="/practice-areas/workers-compensation"
                  className="text-[#C9974D] font-semibold hover:underline"
                >
                  Learn More →
                </Link>
              </div>
              {/* Family Law */}
              <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-[#6B1F2E]">
                <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
                <h3 className="text-xl font-bold text-[#6B1F2E] mb-3">Family Law</h3>
                <ul className="text-gray-700 space-y-2 mb-4">
                  <li>• Divorce</li>
                  <li>• Child Custody</li>
                  <li>• Child Support</li>
                  <li>• Domestic Violence</li>
                  <li>• Adoption</li>
                </ul>
                <Link
                  href="/practice-areas/family-law"
                  className="text-[#C9974D] font-semibold hover:underline"
                >
                  Learn More →
                </Link>
              </div>
              {/* Traffic Violations */}
              <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-[#6B1F2E]">
                <div className="text-4xl mb-4">🚦</div>
                <h3 className="text-xl font-bold text-[#6B1F2E] mb-3">Traffic Violations</h3>
                <ul className="text-gray-700 space-y-2 mb-4">
                  <li>• Speeding Tickets</li>
                  <li>• Reckless Driving</li>
                  <li>• License Restoration</li>
                  <li>• CDL Violations</li>
                  <li>• Insurance Points</li>
                </ul>
                <Link
                  href="/practice-areas/traffic-violations"
                  className="text-[#C9974D] font-semibold hover:underline"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* Local Content Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-[#6B1F2E] mb-6">
                  Why Wilson Residents Choose Vasquez Law Firm
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="text-2xl mr-4">📍</span>
                    <div>
                      <h4 className="font-bold text-[#6B1F2E]">Local Knowledge</h4>
                      <p className="text-gray-700">
                        Deep understanding of Wilson County courts, judges, and legal procedures
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-4">🗣️</span>
                    <div>
                      <h4 className="font-bold text-[#6B1F2E]">Bilingual Services</h4>
                      <p className="text-gray-700">
                        Full legal services in English and Spanish for Wilson&apos;s diverse
                        community
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-4">⚡</span>
                    <div>
                      <h4 className="font-bold text-[#6B1F2E]">24/7 Availability</h4>
                      <p className="text-gray-700">
                        Emergency legal help when you need it most - arrests don&apos;t wait for
                        business hours
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-4">💰</span>
                    <div>
                      <h4 className="font-bold text-[#6B1F2E]">Affordable Representation</h4>
                      <p className="text-gray-700">
                        Payment plans and transparent pricing to serve all Wilson residents
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#6B1F2E] mb-6">
                  Wilson County Legal Information
                </h3>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h4 className="font-bold text-[#6B1F2E] mb-3">Court Locations</h4>
                  <ul className="text-gray-700 space-y-2 mb-4">
                    <li>
                      <strong>Superior Court:</strong> 10th Judicial District
                    </li>
                    <li>
                      <strong>Federal Court:</strong> Eastern District of NC
                    </li>
                  </ul>
                  <h4 className="font-bold text-[#6B1F2E] mb-3 mt-6">
                    Common Legal Issues in Wilson
                  </h4>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Immigration cases and ICE detentions</li>
                    <li>• DWI arrests and traffic violations</li>
                    <li>• Personal injury from I-40/I-85 accidents</li>
                    <li>• Workers&apos; comp claims from local industries</li>
                    <li>• Family law and custody disputes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Testimonials */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#6B1F2E] text-center mb-12">
              What Wilson Clients Say About Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-yellow-400 text-xl mb-3">★★★★★</div>
                <p className="text-gray-700 mb-4">
                  &quot;Mr. Vasquez helped me get my green card after years of waiting. He explained
                  everything in Spanish and made the process so much easier. Highly recommend to
                  anyone in Wilson!&quot;
                </p>
                <p className="font-semibold text-[#6B1F2E]">- Maria G., Wilson</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-yellow-400 text-xl mb-3">★★★★★</div>
                <p className="text-gray-700 mb-4">
                  &quot;Got arrested for DWI in Wilson County. Vasquez Law Firm got my charges
                  reduced and saved my license. Worth every penny!&quot;
                </p>
                <p className="font-semibold text-[#6B1F2E]">- James T., Wilson</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-yellow-400 text-xl mb-3">★★★★★</div>
                <p className="text-gray-700 mb-4">
                  &quot;After my car accident on I-85, they handled everything with the insurance
                  company. Got me a great settlement!&quot;
                </p>
                <p className="font-semibold text-[#6B1F2E]">- Sarah L., Wilson</p>
              </div>
            </div>
          </div>
        </section>
        {/* Nearby Cities */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-[#6B1F2E] text-center mb-8">
              Also Serving Nearby Communities
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/locations/nc/smithfield"
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-[#C9974D] hover:shadow-md transition-all"
              >
                Smithfield
              </Link>
              <Link
                href="/locations/nc/clayton"
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-[#C9974D] hover:shadow-md transition-all"
              >
                Clayton
              </Link>
              <Link
                href="/locations/nc/selma"
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-[#C9974D] hover:shadow-md transition-all"
              >
                Selma
              </Link>
              <Link
                href="/locations/nc/benson"
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-[#C9974D] hover:shadow-md transition-all"
              >
                Benson
              </Link>
              <Link
                href="/locations/nc/four-oaks"
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-[#C9974D] hover:shadow-md transition-all"
              >
                Four Oaks
              </Link>
              <Link
                href="/locations/nc/pine-level"
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-[#C9974D] hover:shadow-md transition-all"
              >
                Pine Level
              </Link>
              <Link
                href="/locations/nc/princeton"
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-[#C9974D] hover:shadow-md transition-all"
              >
                Princeton
              </Link>
              <Link
                href="/locations/nc/rocky-mount"
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-[#C9974D] hover:shadow-md transition-all"
              >
                Rocky Mount
              </Link>
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section className="py-20 bg-[#6B1F2E] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">Get Legal Help in Wilson Today</h2>
            <p className="text-xl mb-8">
              Don&apos;t face your legal challenges alone. Our experienced attorneys are ready to
              fight for you. Free consultation • Se habla español • Payment plans available
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-[#C9974D] hover:bg-[#D4A574] text-white font-bold rounded-lg transition-all transform hover:scale-105"
              >
                Schedule Free Consultation
              </Link>
              <a
                href="tel:1-844-967-3536"
                className="px-8 py-4 bg-white text-[#6B1F2E] font-bold rounded-lg hover:bg-gray-100 transition-all"
              >
                Call Now: 1-844-YO-PELEO
              </a>
            </div>
            <p className="mt-8 text-sm">Serving Wilson, Wilson County, and all of Eastern NC</p>
          </div>
        </section>
      </div>
    </>
  );
}
