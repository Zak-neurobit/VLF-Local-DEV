import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Uninsured Motorist Accident Lawyer NC | UM/UIM Claims Attorney',
  description:
    'Hit by an uninsured or underinsured driver in North Carolina? Our UM/UIM attorneys fight insurance companies for the compensation you deserve.',
  keywords: [
    'uninsured motorist lawyer NC',
    'underinsured motorist attorney North Carolina',
    'UM UIM claims lawyer',
    'uninsured driver accident NC',
    'underinsured motorist coverage',
    'Charlotte uninsured motorist attorney',
  ],
  openGraph: {
    title: 'NC Uninsured/Underinsured Motorist Claims Lawyer',
    description:
      "Hit by an uninsured driver? Don't let lack of insurance leave you without compensation. We fight for your UM/UIM benefits.",
    images: [
      {
        url: '/images/uninsured-motorist-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Uninsured Motorist Claims Attorney North Carolina',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawfirm.com/practice-areas/personal-injury/uninsured-motorist',
    languages: {
      es: 'https://www.vasquezlawfirm.com/es/areas-de-practica/lesiones-personales/motorista-sin-seguro',
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

export default function UninsuredMotoristPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#001845] to-[#003875] text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Uninsured Motorist Claims Lawyer
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-[#FF6B6B] mb-6">
              YO PELEO POR TI™
            </p>
            <p className="text-xl mb-8 text-gray-100">
              Hit by an uninsured or underinsured driver? Don&apos;t let their lack of coverage leave you
              with unpaid medical bills. Your own insurance policy can provide compensation through
              UM/UIM coverage.
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

      {/* NC Uninsured Driver Statistics */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            The Uninsured Driver Problem in North Carolina
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-4xl font-bold text-[#FF6B6B] mb-2">7.5%</p>
              <p className="text-gray-700">NC drivers without insurance</p>
              <p className="text-sm text-gray-500 mt-2">About 1 in 13 drivers</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-4xl font-bold text-[#FF6B6B] mb-2">20%</p>
              <p className="text-gray-700">Drivers carry only minimum coverage</p>
              <p className="text-sm text-gray-500 mt-2">$30,000 bodily injury limit</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-4xl font-bold text-[#FF6B6B] mb-2">$150k+</p>
              <p className="text-gray-700">Average serious injury costs</p>
              <p className="text-sm text-gray-500 mt-2">Far exceeding minimum limits</p>
            </div>
          </div>
        </div>
      </section>

      {/* UM/UIM Coverage Explanation */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Understanding UM/UIM Coverage
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">
                Uninsured Motorist (UM)
              </h3>
              <p className="text-gray-700 mb-4">
                Covers you when hit by a driver with no insurance at all. Also applies to
                hit-and-run accidents where the at-fault driver can&apos;t be identified.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Driver has no insurance</li>
                <li>• Hit-and-run accidents</li>
                <li>• Phantom vehicle accidents</li>
                <li>• Driver&apos;s insurance company is insolvent</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">
                Underinsured Motorist (UIM)
              </h3>
              <p className="text-gray-700 mb-4">
                Covers you when the at-fault driver has insurance, but their limits are too low to
                cover your damages fully.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Driver has insufficient coverage</li>
                <li>• Your damages exceed their limits</li>
                <li>• Serious injuries requiring extensive treatment</li>
                <li>• Lost wages and future medical needs</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
            <p className="text-lg font-semibold mb-2">💡 NC Law Requires UM/UIM Coverage</p>
            <p className="text-gray-700">
              North Carolina law requires all auto insurance policies to include UM/UIM coverage
              equal to your liability limits, unless you specifically reject it in writing.
            </p>
          </div>
        </div>
      </section>

      {/* Insurance Company Tactics Alert */}
      <section className="py-16 bg-[#001845] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              ⚠️ Your Own Insurance Company Becomes the Enemy
            </h2>
            <p className="text-xl mb-8">
              In UM/UIM claims, you&apos;re fighting your own insurance company for benefits. They
              use every trick to minimize payouts, even though you&apos;ve paid premiums for years.
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Common Tactics</h3>
                <ul className="space-y-2">
                  <li>• Claiming coverage doesn&apos;t apply</li>
                  <li>• Questioning medical necessity</li>
                  <li>• Delaying claim processing</li>
                  <li>• Disputing injury causation</li>
                  <li>• Lowball settlement offers</li>
                </ul>
              </div>
              <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Why You Need a Lawyer</h3>
                <ul className="space-y-2">
                  <li>• Level the playing field</li>
                  <li>• Force proper investigation</li>
                  <li>• Challenge bad faith tactics</li>
                  <li>• Maximize your recovery</li>
                  <li>• Handle arbitration if needed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Types of UM/UIM Claims */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            UM/UIM Claims We Handle
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#003875]">
              <h3 className="text-xl font-semibold mb-3">Car Accidents</h3>
              <p className="text-gray-700">
                Traditional vehicle collisions where the at-fault driver lacks adequate insurance
                coverage.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#003875]">
              <h3 className="text-xl font-semibold mb-3">Hit-and-Run Accidents</h3>
              <p className="text-gray-700">
                When the at-fault driver flees the scene and cannot be identified or located.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#003875]">
              <h3 className="text-xl font-semibold mb-3">Motorcycle Accidents</h3>
              <p className="text-gray-700">
                Motorcycle crashes often result in severe injuries that exceed minimum insurance
                limits.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#003875]">
              <h3 className="text-xl font-semibold mb-3">Pedestrian Accidents</h3>
              <p className="text-gray-700">
                Pedestrians struck by uninsured or underinsured drivers can use UM/UIM coverage.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#003875]">
              <h3 className="text-xl font-semibold mb-3">Bicycle Accidents</h3>
              <p className="text-gray-700">
                Cyclists injured by drivers without adequate insurance coverage.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#003875]">
              <h3 className="text-xl font-semibold mb-3">Phantom Vehicle Accidents</h3>
              <p className="text-gray-700">
                Accidents caused by unidentified vehicles that force you off the road or into
                another car.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Limits and Stacking */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Maximizing Your UM/UIM Coverage
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">
                Policy Stacking in North Carolina
              </h3>
              <p className="text-gray-700 mb-6">
                NC allows &quot;stacking&quot; of UM/UIM coverage in certain situations, potentially
                increasing your available benefits:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Intra-Policy Stacking</h4>
                  <p className="text-gray-700 mb-3">
                    Stack coverage across multiple vehicles on the same policy.
                  </p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Must have multiple vehicles insured</li>
                    <li>• Can multiply coverage limits</li>
                    <li>• Must elect this coverage</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Inter-Policy Stacking</h4>
                  <p className="text-gray-700 mb-3">
                    Stack coverage across separate insurance policies.
                  </p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Multiple policies with UM/UIM</li>
                    <li>• Different insurance companies</li>
                    <li>• Can significantly increase benefits</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                <p className="text-gray-700">
                  <strong>Example:</strong> If you have 3 cars each with $100k UM coverage and
                  stacking is elected, you could have up to $300k in coverage available.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Settlement vs Arbitration */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            UM/UIM Dispute Resolution
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">
                Settlement Negotiations
              </h3>
              <p className="text-gray-700 mb-4">
                Most UM/UIM claims settle through negotiations without formal proceedings.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Faster resolution</li>
                <li>• Lower costs</li>
                <li>• More control over outcome</li>
                <li>• Confidential agreements</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">Arbitration</h3>
              <p className="text-gray-700 mb-4">
                When settlement fails, most UM/UIM policies require binding arbitration.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Neutral arbitrator decides</li>
                <li>• Less formal than trial</li>
                <li>• Binding decision</li>
                <li>• Expert testimony allowed</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400">
            <p className="text-lg font-semibold mb-2">⚠️ Arbitration Experience Matters</p>
            <p className="text-gray-700">
              UM/UIM arbitrations have unique rules and procedures. Choose an attorney with
              extensive arbitration experience for the best results.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#001845] to-[#003875] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Don&apos;t Let Uninsured Drivers Leave You With the Bills
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            You pay for UM/UIM coverage - make sure you get the full benefits you deserve. We fight
            insurance companies to maximize your recovery when uninsured drivers cause serious
            injuries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/contact"
              className="inline-block bg-[#FF6B6B] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#FF5252] transition-colors"
            >
              Check Your UM/UIM Coverage
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
              Fighting Insurance Companies Across North Carolina
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
            serviceType: 'Personal Injury Uninsured Motorist Legal Services',
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
            url: 'https://www.vasquezlawfirm.com/practice-areas/personal-injury/uninsured-motorist/page',
            description:
              'Personal Injury Uninsured Motorist legal services in North Carolina. Free consultation. Se habla español.',
          }),
        }}
      />
    </div>
  );
}
