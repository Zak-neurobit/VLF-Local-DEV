import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'NC Alimony Lawyer | Spousal Support Attorney | Vasquez Law Firm',
  description:
    'Navigating alimony and spousal support in North Carolina. Whether seeking or defending against alimony, our attorneys protect your financial future. Se habla español.',
  keywords: [
    'alimony lawyer NC',
    'North Carolina spousal support attorney',
    'post separation support lawyer',
    'permanent alimony attorney NC',
    'alimony modification lawyer',
    'Charlotte alimony attorney',
    'Raleigh spousal support lawyer',
    'abogado pension alimenticia',
    'alimony defense attorney NC',
    'spousal support calculation lawyer',
  ],
  openGraph: {
    title: 'NC Alimony & Spousal Support Lawyer',
    description:
      'Experienced representation in alimony cases. We help clients seek fair support or defend against excessive demands.',
    images: [
      {
        url: '/images/alimony-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'North Carolina Alimony Attorney',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawfirm.com/practice-areas/family-law/alimony',
    languages: {
      es: 'https://www.vasquezlawfirm.com/es/areas-de-practica/derecho-familiar/pension-alimenticia',
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

export default function AlimonyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#001845] to-[#003875] text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              North Carolina Alimony & Spousal Support Lawyer
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-[#FF6B6B] mb-6">
              YO PELEO POR TI™
            </p>
            <p className="text-xl mb-8 text-gray-100">
              Alimony can make or break your financial future after divorce. Whether you&apos;re
              seeking support or defending against excessive demands, we fight for fair outcomes
              based on NC law.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-block bg-[#FF6B6B] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#FF5252] transition-colors text-center"
              >
                Protect Your Financial Future
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

      {/* Alimony Basics Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Understanding Alimony in North Carolina
          </h2>
          <p className="text-lg text-gray-700 text-center mb-8 max-w-3xl mx-auto">
            Alimony is financial support paid by one spouse to the other after separation. NC law
            recognizes that marriage is an economic partnership, and alimony helps maintain fairness
            when it ends.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#001845]">Not Automatic</h3>
              <p className="text-gray-700">
                Unlike child support, alimony isn&apos;t guaranteed. The dependent spouse must prove
                need AND the supporting spouse&apos;s ability to pay.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#001845]">Gender Neutral</h3>
              <p className="text-gray-700">
                Either spouse can receive alimony. It&apos;s based on financial circumstances, not
                gender. Men can and do receive alimony in NC.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#001845]">Fault Matters</h3>
              <p className="text-gray-700">
                Marital misconduct like adultery can bar alimony or increase it. NC is one of few
                states where fault significantly impacts alimony.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Alimony Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Types of Spousal Support in NC
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">
                Post-Separation Support (PSS)
              </h3>
              <p className="text-gray-700 mb-4">
                Temporary support during the separation period and divorce process. Designed to
                maintain the status quo until permanent alimony is decided.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Starts after separation</li>
                <li>✓ Based on immediate needs</li>
                <li>✓ Quicker to obtain than alimony</li>
                <li>✓ Ends when alimony is decided</li>
                <li>✓ Can be retroactive to filing date</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#001845]">Permanent Alimony</h3>
              <p className="text-gray-700 mb-4">
                Long-term support after divorce is final. Despite the name, it&apos;s rarely truly
                "permanent" - usually has an end date or conditions.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Decided at trial or settlement</li>
                <li>✓ Can be lump sum or periodic</li>
                <li>✓ May have specific duration</li>
                <li>✓ Ends at death or remarriage</li>
                <li>✓ Can be modified if circumstances change</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
            <p className="text-lg font-semibold mb-2">💡 Rehabilitative Alimony</p>
            <p className="text-gray-700">
              Most common type - provides support while dependent spouse gains education or job
              skills to become self-supporting. Usually 1-5 years with specific goals.
            </p>
          </div>
        </div>
      </section>

      {/* Marital Misconduct Alert */}
      <section className="py-16 bg-[#001845] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              ⚖️ How Marital Misconduct Affects NC Alimony
            </h2>
            <p className="text-xl mb-8">
              North Carolina is unique - marital fault dramatically impacts alimony eligibility and
              amount. Know the rules:
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Bars Alimony Completely</h3>
                <ul className="space-y-2">
                  <li>• Adultery by dependent spouse</li>
                  <li>• Unless supporting spouse also cheated</li>
                  <li>• Must prove with clear evidence</li>
                  <li>• Dating during separation counts</li>
                </ul>
              </div>
              <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Increases/Decreases Amount</h3>
                <ul className="space-y-2">
                  <li>• Abandonment</li>
                  <li>• Cruel treatment</li>
                  <li>• Financial misconduct</li>
                  <li>• Substance abuse</li>
                </ul>
              </div>
            </div>
            <p className="mt-6 text-lg">
              Misconduct must occur before separation date - post-separation behavior generally
              doesn&apos;t count!
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section with Office Locations */}
      <section className="py-16 bg-gradient-to-br from-[#001845] to-[#003875] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Protect Your Financial Future with Experienced Alimony Representation
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Whether seeking fair support or defending against excessive demands, alimony decisions
            impact your finances for years. Don't navigate this alone - get experienced legal
            guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/contact"
              className="inline-block bg-[#FF6B6B] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#FF5252] transition-colors"
            >
              Schedule Your Consultation
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
              Fighting for Fair Outcomes Across North Carolina
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
            serviceType: 'Family Law Alimony Legal Services',
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
            url: 'https://www.vasquezlawfirm.com/practice-areas/family-law/alimony/page',
            description:
              'Family Law Alimony legal services in North Carolina. Free consultation. Se habla español.',
          }),
        }}
      />
    </div>
  );
}
