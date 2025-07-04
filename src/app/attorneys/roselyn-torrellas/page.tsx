import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Roselyn V. Torrellas - Attorney - Vasquez Law Firm, PLLC',
  description: '',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-burgundy-700 to-burgundy-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Roselyn V. Torrellas - Attorney</h1>
            <p className="text-xl md:text-2xl mb-8 text-gold-400 font-semibold">
              YO PELEO POR TI™ - I FIGHT FOR YOU
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-gold-500 text-burgundy-900 font-bold rounded-full hover:bg-gold-400 transition-colors"
              >
                Free Consultation
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

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-4">Family Law Attorney</h2>
                <p className="text-gray-700">
                  Roselyn Torrellas specializes in family law matters including divorce, child
                  custody, and support issues.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-burgundy-900 mb-4">Education</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>J.D., University of Miami School of Law</li>
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-burgundy-900 mb-4">Bar Admissions</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>North Carolina</li>
                  <li>Florida</li>
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-burgundy-900 mb-4">Practice Areas</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Family Law</li>
                  <li>Divorce</li>
                  <li>Child Custody</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-burgundy-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Contact our experienced attorneys today for a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-burgundy-700 text-white font-bold rounded-full hover:bg-burgundy-800 transition-colors"
              >
                Schedule Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="tel:1-844-967-3536"
                className="inline-flex items-center px-8 py-4 bg-gold-500 text-burgundy-900 font-bold rounded-full hover:bg-gold-400 transition-colors"
              >
                <Phone className="mr-2 w-5 h-5" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Data for SEO */}
      <Script
        id="attorney-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Roselyn Torrellas',
            jobTitle: 'Attorney',
            worksFor: {
              '@type': 'LegalService',
              name: 'Vasquez Law Firm, PLLC',
              url: 'https://www.vasquezlawfirm.com',
              telephone: '+1-919-537-8722',
              priceRange: '$$',
            },
            url: 'https://www.vasquezlawfirm.com/attorneys/roselyn-torrellas/page',
            sameAs: [
              'https://www.linkedin.com/company/vasquez-law-firm',
              'https://www.facebook.com/vasquezlawfirm',
            ],
          }),
        }}
      />
    </div>
  );
}
