import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';
import { MasterLayout } from '@/design-system/templates/MasterLayout';
import { COLORS } from '@/design-system/constants';

export const metadata: Metadata = {
  title: 'Christopher Afanador - Attorney - Vasquez Law Firm, PLLC',
  description: 'Christopher Afanador is an experienced criminal defense attorney at Vasquez Law Firm, successfully defending clients against a wide range of charges in NC.',
};

export default function Page() {
  return (
    <MasterLayout variant="hero" showBreadcrumbs={false}>
      <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24" style={{ background: `linear-gradient(to right, ${COLORS.burgundy[700]}, ${COLORS.burgundy[900]})` }}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">Christopher Afanador</h1>
            <p className="text-xl md:text-2xl mb-8 font-semibold" style={{ color: COLORS.gold[400] }}>
              Criminal Defense Attorney - YO PELEO POR TI™
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 font-bold rounded-full transition-colors"
                style={{ backgroundColor: COLORS.gold[500], color: COLORS.burgundy[900] }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = COLORS.gold[400]}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = COLORS.gold[500]}
              >
                Free Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="tel:1-844-967-3536"
                className="inline-flex items-center px-8 py-4 bg-white font-bold rounded-full hover:bg-gray-100 transition-colors"
                style={{ color: COLORS.burgundy[900] }}
              >
                <Phone className="mr-2 w-5 h-5" />
                1-844-YO-PELEO
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4" style={{ color: COLORS.burgundy[900] }}>
                  Criminal Defense Attorney
                </h2>
                <p style={{ color: COLORS.neutral[700] }}>
                  Christopher Afanador is an experienced criminal defense attorney who has
                  successfully defended clients against a wide range of charges. With his dedication
                  to protecting clients&apos; rights and his thorough understanding of criminal law,
                  he provides aggressive representation for those facing serious legal challenges.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: COLORS.burgundy[900] }}>Education</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2" style={{ color: COLORS.gold[500] }}>•</span>
                      <span>J.D., University of North Carolina School of Law</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: COLORS.burgundy[900] }}>Bar Admissions</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2" style={{ color: COLORS.gold[500] }}>•</span>
                      <span>North Carolina State Bar</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2" style={{ color: COLORS.gold[500] }}>•</span>
                      <span>Federal Courts</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4" style={{ color: COLORS.burgundy[900] }}>Practice Areas</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-3" style={{ color: COLORS.burgundy[700] }}>Criminal Defense</h4>
                    <ul className="space-y-2" style={{ color: COLORS.neutral[700] }}>
                      <li>• DUI/DWI Defense</li>
                      <li>• Drug Crimes</li>
                      <li>• Violent Crimes</li>
                      <li>• White Collar Crimes</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-3" style={{ color: COLORS.burgundy[700] }}>Additional Services</h4>
                    <ul className="space-y-2" style={{ color: COLORS.neutral[700] }}>
                      <li>• Traffic Violations</li>
                      <li>• Expungements</li>
                      <li>• Appeals</li>
                      <li>• Juvenile Defense</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24" style={{ backgroundColor: COLORS.neutral[100] }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: COLORS.burgundy[900] }}>
              Need Criminal Defense?
            </h2>
            <p className="text-xl mb-8" style={{ color: COLORS.neutral[700] }}>
              Contact Christopher Afanador today for aggressive criminal defense representation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 text-white font-bold rounded-full transition-colors"
                style={{ backgroundColor: COLORS.burgundy[700] }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = COLORS.burgundy[800]}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = COLORS.burgundy[700]}
              >
                Schedule Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="tel:1-844-967-3536"
                className="inline-flex items-center px-8 py-4 font-bold rounded-full transition-colors"
                style={{ backgroundColor: COLORS.gold[500], color: COLORS.burgundy[900] }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = COLORS.gold[400]}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = COLORS.gold[500]}
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
            name: 'Christopher Afanador',
            jobTitle: 'Attorney',
            worksFor: {
              '@type': 'LegalService',
              name: 'Vasquez Law Firm, PLLC',
              url: 'https://www.vasquezlawfirm.com',
              telephone: '+1-919-537-8722',
              priceRange: '$$',
            },
            url: 'https://www.vasquezlawfirm.com/attorneys/christopher-afanador/page',
            sameAs: [
              'https://www.linkedin.com/company/vasquez-law-firm',
              'https://www.facebook.com/vasquezlawfirm',
            ],
          }),
        }}
      />
      </div>
    </MasterLayout>
  );
}
