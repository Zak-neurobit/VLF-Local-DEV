import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Emergency Vehicle Accident Lawyer NC | Fire Truck, Ambulance & Police Car Accidents',
  description:
    'Injured in an accident with an ambulance, fire truck, or police car in North Carolina? Our emergency vehicle accident attorneys fight for maximum compensation.',
  keywords: [
    'emergency vehicle accident lawyer NC',
    'ambulance accident attorney North Carolina',
    'fire truck accident lawyer',
    'police car accident attorney',
    'emergency vehicle collision NC',
    'Charlotte emergency vehicle lawyer',
  ],
  openGraph: {
    title: 'NC Emergency Vehicle Accident Lawyer | Ambulance & Fire Truck Accidents',
    description:
      'Injured by an emergency vehicle? Get experienced legal representation for accidents involving ambulances, fire trucks, and police cars.',
    images: [
      {
        url: '/images/emergency-vehicle-accidents-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Emergency Vehicle Accident Attorney North Carolina',
      },
    ],
  },
  alternates: {
    canonical:
      'https://www.vasquezlawfirm.com/practice-areas/personal-injury/emergency-vehicle-accidents',
    languages: {
      es: 'https://www.vasquezlawfirm.com/es/areas-de-practica/lesiones-personales/accidentes-vehiculos-emergencia',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function EmergencyVehicleAccidentsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#001845] to-[#003875] text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Emergency Vehicle Accident Lawyer
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-[#FF6B6B] mb-6">
              YO PELEO POR TI™
            </p>
            <p className="text-xl mb-8 text-gray-100">
              Injured in an accident with an ambulance, fire truck, or police car? Emergency
              vehicles aren&apos;t above the law. We fight for your right to compensation when first
              responders cause accidents.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-block bg-[#FF6B6B] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#FF5252] transition-colors text-center"
              >
                Free Case Evaluation
              </Link>
              <a
                href="tel:919-537-8722"
                className="inline-block bg-white text-[#001845] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors text-center"
              >
                Call Now: (919) 537-8722
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Emergency Vehicle Accidents */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Emergency Vehicle Accidents We Handle
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#003875]">
              <h3 className="text-xl font-semibold mb-3">Ambulance Accidents</h3>
              <p className="text-gray-700">
                EMS vehicles running red lights, speeding to emergencies, or making unsafe lane
                changes that cause serious collisions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#003875]">
              <h3 className="text-xl font-semibold mb-3">Fire Truck Accidents</h3>
              <p className="text-gray-700">
                Large fire engines and ladder trucks causing devastating accidents due to their size
                and weight.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#003875]">
              <h3 className="text-xl font-semibold mb-3">Police Vehicle Accidents</h3>
              <p className="text-gray-700">
                Police cars involved in high-speed pursuits or responding to emergency calls without
                proper caution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Complexities Alert */}
      <section className="py-16 bg-[#001845] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">⚖️ Emergency Vehicle Cases Are Complex</h2>
            <p className="text-xl mb-8">
              Emergency vehicles have legal protections, but they&apos;re not unlimited. When they
              act negligently, you have rights. These cases require specialized knowledge of:
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Legal Protections</h3>
                <ul className="space-y-2">
                  <li>• Emergency vehicle exemptions</li>
                  <li>• Sovereign immunity laws</li>
                  <li>• Municipal liability limits</li>
                  <li>• Federal regulations</li>
                </ul>
              </div>
              <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Proving Negligence</h3>
                <ul className="space-y-2">
                  <li>• Excessive speed for conditions</li>
                  <li>• Failure to use proper signals</li>
                  <li>• Inadequate training</li>
                  <li>• Equipment malfunctions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Injuries Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Serious Injuries from Emergency Vehicle Accidents
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 text-center mb-8">
              Emergency vehicles are large, heavy, and often traveling at high speeds. Accidents
              typically result in severe injuries:
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-[#001845]">Catastrophic Injuries</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Traumatic brain injuries</li>
                  <li>• Spinal cord damage</li>
                  <li>• Multiple fractures</li>
                  <li>• Internal organ damage</li>
                  <li>• Severe burns</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-[#001845]">Long-term Impact</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Permanent disability</li>
                  <li>• Ongoing medical care</li>
                  <li>• Lost earning capacity</li>
                  <li>• Pain and suffering</li>
                  <li>• Life care costs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compensation Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Compensation for Emergency Vehicle Accidents
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">
                You May Be Entitled To:
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Economic Damages</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Medical expenses (current and future)</li>
                    <li>• Lost wages and benefits</li>
                    <li>• Reduced earning capacity</li>
                    <li>• Rehabilitation costs</li>
                    <li>• Home modifications</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Non-Economic Damages</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Pain and suffering</li>
                    <li>• Emotional distress</li>
                    <li>• Loss of life enjoyment</li>
                    <li>• Permanent disability</li>
                    <li>• Loss of consortium</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                <p className="text-gray-700">
                  <strong>Important:</strong> Government entities often have claim notice
                  requirements and damage caps. Act quickly to protect your rights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#001845] to-[#003875] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Emergency Vehicle Accidents Require Immediate Legal Action
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Government liability claims have strict deadlines and special procedures. Don&apos;t let
            important deadlines pass. Get experienced legal representation immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/contact"
              className="inline-block bg-[#FF6B6B] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#FF5252] transition-colors"
            >
              Get Help Now
            </Link>
            <a
              href="tel:919-537-8722"
              className="inline-block bg-white text-[#001845] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Call Now: (919) 537-8722
            </a>
          </div>

          <div className="border-t border-white/20 pt-8">
            <h3 className="text-2xl font-semibold mb-6">
              Fighting Government Negligence Across North Carolina
            </h3>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <h4 className="font-semibold mb-2">Raleigh Office</h4>
                <p className="text-sm text-gray-200">6110 Creedmoor Rd.</p>
                <p className="text-sm text-gray-200">Raleigh, NC 27612</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Charlotte Office</h4>
                <p className="text-sm text-gray-200">309 W Bland St.</p>
                <p className="text-sm text-gray-200">Charlotte, NC 28203</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Smithfield Office</h4>
                <p className="text-sm text-gray-200">503 N 3rd St.</p>
                <p className="text-sm text-gray-200">Smithfield, NC 27577</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Orlando Office</h4>
                <p className="text-sm text-gray-200">5401 S Kirkman Rd #310</p>
                <p className="text-sm text-gray-200">Orlando, FL 32819</p>
              </div>
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
            serviceType: 'Personal Injury Emergency Vehicle Accidents Legal Services',
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
            url: 'https://www.vasquezlawfirm.com/practice-areas/personal-injury/emergency-vehicle-accidents/page',
            description:
              'Personal Injury Emergency Vehicle Accidents legal services in North Carolina. Free consultation. Se habla español.',
          }),
        }}
      />
    </div>
  );
}
