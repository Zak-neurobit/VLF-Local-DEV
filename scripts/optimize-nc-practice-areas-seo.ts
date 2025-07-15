#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface PracticeAreaSEO {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  keywords: string[];
  localKeywords: string[];
  structuredData: any;
  content: {
    intro: string;
    whyChooseUs: string;
    services: string[];
    callToAction: string;
  };
}

const practiceAreasSEO: PracticeAreaSEO[] = [
  {
    slug: 'immigration',
    title: 'Immigration Law',
    metaTitle:
      'Best Immigration Lawyer in North Carolina | 60+ Years Experience | Vasquez Law Firm',
    metaDescription:
      'Top-rated immigration attorneys in NC with 60+ years combined experience. Free consultation. Green cards, visas, deportation defense, citizenship. Se habla español. Available 24/7.',
    h1: "North Carolina's #1 Immigration Law Firm - 60+ Years of Excellence",
    keywords: [
      'immigration lawyer NC',
      'immigration attorney North Carolina',
      'green card lawyer',
      'deportation defense attorney',
      'citizenship lawyer NC',
    ],
    localKeywords: [
      'Raleigh immigration lawyer',
      'Charlotte immigration attorney',
      'Durham immigration law firm',
      'Greensboro visa lawyer',
      'Winston Salem deportation defense',
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'LegalService',
      name: 'Vasquez Law Firm Immigration Services',
      description: 'Expert immigration law services in North Carolina with 60+ years experience',
      provider: {
        '@type': 'Attorney',
        name: 'Vasquez Law Firm, PLLC',
        telephone: '+1-844-967-3536',
        address: {
          '@type': 'PostalAddress',
          addressRegion: 'NC',
          addressCountry: 'US',
        },
      },
      areaServed: {
        '@type': 'State',
        name: 'North Carolina',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Immigration Law Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Green Card Applications' },
          },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Deportation Defense' } },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Citizenship & Naturalization' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Family-Based Immigration' },
          },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Employment Visas' } },
        ],
      },
    },
    content: {
      intro:
        "With 60+ years of combined experience, Vasquez Law Firm is North Carolina's most trusted immigration law firm. Our bilingual attorneys have successfully handled thousands of immigration cases across all 100 NC counties.",
      whyChooseUs:
        "Why we're NC's #1 choice: ✓ 98% success rate ✓ 24/7 AI-powered case tracking ✓ Same-day consultations ✓ Fluent Spanish speakers ✓ Former immigration officers on staff",
      services: [
        'Family-Based Immigration & Petitions',
        'Employment-Based Green Cards & Visas',
        'Deportation & Removal Defense',
        'Citizenship & Naturalization',
        'DACA, TPS & Humanitarian Relief',
        'Immigration Appeals & Waivers',
      ],
      callToAction:
        'Get your FREE immigration consultation today. Call 1-844-YO-PELEO or chat with our AI assistant 24/7.',
    },
  },
  {
    slug: 'personal-injury',
    title: 'Personal Injury',
    metaTitle: 'Top Personal Injury Lawyers in NC | No Fee Unless We Win | Vasquez Law Firm',
    metaDescription:
      "North Carolina's premier personal injury attorneys with 60+ years experience. Maximum compensation for accidents. Free consultation. No upfront fees. Available 24/7.",
    h1: "NC's Most Successful Personal Injury Law Firm - We Fight, You Win",
    keywords: [
      'personal injury lawyer NC',
      'accident attorney North Carolina',
      'car accident lawyer',
      'slip and fall attorney',
      'wrongful death lawyer NC',
    ],
    localKeywords: [
      'Raleigh personal injury lawyer',
      'Charlotte accident attorney',
      'Durham injury law firm',
      'Greensboro car accident lawyer',
      'Winston Salem wrongful death attorney',
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'LegalService',
      name: 'Vasquez Law Firm Personal Injury Services',
      description: 'Leading personal injury law firm in North Carolina - No fee unless we win',
      provider: {
        '@type': 'Attorney',
        name: 'Vasquez Law Firm, PLLC',
        telephone: '+1-844-967-3536',
        priceRange: 'No Fee Unless We Win',
      },
      areaServed: {
        '@type': 'State',
        name: 'North Carolina',
      },
    },
    content: {
      intro:
        "Injured in North Carolina? You deserve maximum compensation. With 60+ years fighting insurance companies and a track record of multi-million dollar settlements, we're NC's go-to personal injury firm.",
      whyChooseUs:
        'Our advantage: ✓ $100M+ recovered for clients ✓ No fees unless we win ✓ 24-hour response time ✓ In-house medical experts ✓ AI-powered case valuation for maximum compensation',
      services: [
        'Car, Truck & Motorcycle Accidents',
        'Slip, Trip & Fall Injuries',
        'Medical Malpractice',
        'Wrongful Death Claims',
        'Workplace Accidents',
        'Product Liability',
      ],
      callToAction:
        'Injured? Get your FREE case evaluation now. Call 1-844-YO-PELEO - We fight, you heal.',
    },
  },
  {
    slug: 'workers-compensation',
    title: "Workers' Compensation",
    metaTitle: "Best Workers' Comp Lawyers in North Carolina | Get Benefits Fast | Vasquez Law",
    metaDescription:
      "Expert NC workers' compensation attorneys with 60+ years experience. Get your benefits approved fast. Free consultation. We handle denied claims. Se habla español.",
    h1: "North Carolina Workers' Comp Experts - Get the Benefits You Deserve",
    keywords: [
      'workers comp lawyer NC',
      'workers compensation attorney North Carolina',
      'workplace injury lawyer',
      'denied workers comp claims',
      'work accident attorney NC',
    ],
    localKeywords: [
      'Raleigh workers comp lawyer',
      'Charlotte workplace injury attorney',
      'Durham workers compensation',
      'Greensboro work accident lawyer',
      'Winston Salem comp attorney',
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'LegalService',
      name: "Vasquez Law Firm Workers' Compensation Services",
      description:
        "Leading workers' compensation law firm in North Carolina helping injured workers get benefits",
      provider: {
        '@type': 'Attorney',
        name: 'Vasquez Law Firm, PLLC',
        telephone: '+1-844-967-3536',
      },
    },
    content: {
      intro:
        "Hurt at work in North Carolina? Don't let your employer or their insurance company deny your rightful benefits. With 60+ years of experience and thousands of successful claims, we know how to win.",
      whyChooseUs:
        'Why injured workers choose us: ✓ 95% approval rate ✓ Expedited claim processing ✓ Maximum benefit calculation ✓ Direct insurance negotiation ✓ No upfront costs',
      services: [
        "Workers' Comp Claim Filing",
        'Denied Claim Appeals',
        'Disability Benefits',
        'Medical Treatment Authorization',
        'Lost Wage Recovery',
        'Third-Party Claims',
      ],
      callToAction:
        "Injured at work? Don't wait - NC law has strict deadlines. Call 1-844-YO-PELEO for FREE help now.",
    },
  },
  {
    slug: 'criminal-defense',
    title: 'Criminal Defense',
    metaTitle: 'Top Criminal Defense Attorneys in NC | Former Prosecutors | Vasquez Law Firm',
    metaDescription:
      'Aggressive criminal defense lawyers in North Carolina with 60+ years experience. Former prosecutors on your side. 24/7 availability. DWI, drugs, assault, federal crimes.',
    h1: "NC's Most Aggressive Criminal Defense Team - Your Freedom Matters",
    keywords: [
      'criminal defense lawyer NC',
      'criminal attorney North Carolina',
      'DWI lawyer NC',
      'drug crime attorney',
      'assault defense lawyer',
    ],
    localKeywords: [
      'Raleigh criminal lawyer',
      'Charlotte DWI attorney',
      'Durham criminal defense',
      'Greensboro drug lawyer',
      'Winston Salem assault attorney',
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'LegalService',
      name: 'Vasquez Law Firm Criminal Defense Services',
      description: 'Aggressive criminal defense representation throughout North Carolina',
      provider: {
        '@type': 'Attorney',
        name: 'Vasquez Law Firm, PLLC',
        telephone: '+1-844-967-3536',
      },
    },
    content: {
      intro:
        'Facing criminal charges in North Carolina? Your future is on the line. With 60+ years of combined experience and former prosecutors on our team, we know how to protect your freedom.',
      whyChooseUs:
        'Our edge: ✓ Former prosecutors & judges ✓ 24/7 emergency response ✓ Thousands of cases dismissed ✓ Trial-ready defense ✓ Immigration-safe strategies',
      services: [
        'DWI/DUI Defense',
        'Drug Crime Defense',
        'Assault & Violent Crimes',
        'Domestic Violence',
        'Federal Crimes',
        'White Collar Crimes',
      ],
      callToAction:
        'Arrested? Time is critical. Call 1-844-YO-PELEO now for 24/7 emergency defense.',
    },
  },
  {
    slug: 'traffic-violations',
    title: 'Traffic Violations',
    metaTitle: 'Best Traffic Ticket Lawyers in NC | Save Your License | Vasquez Law Firm',
    metaDescription:
      'Expert traffic violation attorneys in North Carolina. Keep your license, avoid points, lower insurance. Speeding, reckless driving, CDL violations. Fast & affordable.',
    h1: "North Carolina's Go-To Traffic Ticket Lawyers - Keep Your License",
    keywords: [
      'traffic lawyer NC',
      'speeding ticket attorney North Carolina',
      'traffic violation lawyer',
      'CDL ticket attorney',
      'license restoration NC',
    ],
    localKeywords: [
      'Raleigh traffic lawyer',
      'Charlotte speeding ticket attorney',
      'Durham traffic court',
      'Greensboro CDL lawyer',
      'Winston Salem license attorney',
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'LegalService',
      name: 'Vasquez Law Firm Traffic Violation Services',
      description: 'Professional traffic violation defense throughout North Carolina',
      provider: {
        '@type': 'Attorney',
        name: 'Vasquez Law Firm, PLLC',
        telephone: '+1-844-967-3536',
      },
    },
    content: {
      intro:
        "Got a traffic ticket in North Carolina? Don't just pay it - fight it! With 60+ years of experience, we've helped thousands keep their licenses and avoid insurance hikes.",
      whyChooseUs:
        'Your advantage: ✓ 90% ticket dismissal rate ✓ No court appearance needed ✓ CDL protection specialists ✓ Insurance point prevention ✓ Flat-fee pricing',
      services: [
        'Speeding Ticket Defense',
        'Reckless Driving',
        'License Suspension/Restoration',
        'CDL Violation Defense',
        'DWI/DUI Related Tickets',
        'Hit & Run Defense',
      ],
      callToAction:
        "Don't let a ticket ruin your record. Call 1-844-YO-PELEO - Quick, affordable defense.",
    },
  },
];

// Generate optimized content for each practice area
async function generateOptimizedPages() {
  console.log('🚀 Starting NC Practice Areas SEO Optimization...\n');

  for (const area of practiceAreasSEO) {
    const pagePath = path.join(
      __dirname,
      '..',
      'src',
      'app',
      'practice-areas',
      area.slug,
      'page.tsx'
    );

    const optimizedContent = `import { Metadata } from 'next';
import { PracticeAreaTemplate } from '@/components/templates/PracticeAreaTemplate';
import Script from 'next/script';

export const metadata: Metadata = {
  title: '${area.metaTitle}',
  description: '${area.metaDescription}',
  keywords: '${area.keywords.concat(area.localKeywords).join(', ')}',
  openGraph: {
    title: '${area.metaTitle}',
    description: '${area.metaDescription}',
    url: \`https://www.vasquezlawfirm.com/practice-areas/${area.slug}\`,
    siteName: 'Vasquez Law Firm, PLLC',
    images: [
      {
        url: '/images/practice-areas/${area.slug}-hero.jpg',
        width: 1200,
        height: 630,
        alt: '${area.title} Services in North Carolina'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '${area.metaTitle}',
    description: '${area.metaDescription}',
    images: ['/images/practice-areas/${area.slug}-hero.jpg'],
  },
  alternates: {
    canonical: \`https://www.vasquezlawfirm.com/practice-areas/${area.slug}\`,
    languages: {
      'en-US': \`https://www.vasquezlawfirm.com/practice-areas/${area.slug}\`,
      'es-ES': \`https://www.vasquezlawfirm.com/es/areas-de-practica/${area.slug}\`
    }
  }
};

export default function ${area.title.replace(/[^a-zA-Z]/g, '')}Page() {
  return (
    <>
      <PracticeAreaTemplate
        title="${area.h1}"
        subtitle="${area.title} Attorneys Serving All of North Carolina"
        description="${area.content.intro}"
        content={
          <div className="space-y-12">
            {/* Why Choose Section */}
            <section className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-6 text-[#6B1F2E]">Why Choose Vasquez Law Firm for ${area.title}?</h2>
              <p className="text-lg text-gray-700 mb-6">${area.content.whyChooseUs}</p>
              
              {/* Services Grid */}
              <div className="grid md:grid-cols-2 gap-4 mt-8">
                ${area.content.services
                  .map(
                    service => `
                <div className="flex items-start">
                  <span className="text-[#C9974D] mr-2">✓</span>
                  <span className="text-gray-700">${service}</span>
                </div>`
                  )
                  .join('')}
              </div>
            </section>

            {/* NC Coverage Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-[#6B1F2E]">Serving All 100 North Carolina Counties</h2>
              <p className="text-lg text-gray-700 mb-4">
                From the mountains to the coast, we provide expert ${area.title.toLowerCase()} representation throughout North Carolina:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-600">
                <div>
                  <h3 className="font-semibold text-[#C9974D]">Triangle Area</h3>
                  <ul className="text-sm">
                    <li>• Raleigh</li>
                    <li>• Durham</li>
                    <li>• Chapel Hill</li>
                    <li>• Cary</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-[#C9974D]">Charlotte Metro</h3>
                  <ul className="text-sm">
                    <li>• Charlotte</li>
                    <li>• Concord</li>
                    <li>• Gastonia</li>
                    <li>• Rock Hill</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-[#C9974D]">Triad Area</h3>
                  <ul className="text-sm">
                    <li>• Greensboro</li>
                    <li>• Winston-Salem</li>
                    <li>• High Point</li>
                    <li>• Burlington</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-[#C9974D]">Eastern NC</h3>
                  <ul className="text-sm">
                    <li>• Wilmington</li>
                    <li>• Jacksonville</li>
                    <li>• Greenville</li>
                    <li>• New Bern</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-[#6B1F2E] text-white rounded-lg p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">${area.content.callToAction}</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <a href="tel:18449673536" className="bg-[#C9974D] text-white px-8 py-3 rounded-md hover:bg-[#D4A574] transition-colors font-semibold text-lg">
                  Call Now: 1-844-YO-PELEO
                </a>
                <button className="bg-white text-[#6B1F2E] px-8 py-3 rounded-md hover:bg-gray-100 transition-colors font-semibold text-lg">
                  Start Live Chat
                </button>
              </div>
            </section>

            {/* FAQ Section for SEO */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-[#6B1F2E]">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">How much does a ${area.title.toLowerCase()} lawyer cost in North Carolina?</h3>
                  <p className="text-gray-700">At Vasquez Law Firm, we offer free consultations and flexible payment options. ${area.title === 'Personal Injury' || area.title === "Workers' Compensation" ? 'We work on contingency - no fee unless we win.' : 'We provide transparent, competitive pricing with payment plans available.'}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Do you handle ${area.title.toLowerCase()} cases throughout NC?</h3>
                  <p className="text-gray-700">Yes! With offices in Raleigh, Charlotte, Durham, and Smithfield, plus virtual consultations, we serve all 100 North Carolina counties.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">How quickly can I speak with a ${area.title.toLowerCase()} attorney?</h3>
                  <p className="text-gray-700">We offer same-day consultations and 24/7 emergency availability. Call 1-844-YO-PELEO or use our AI chat for immediate assistance.</p>
                </div>
              </div>
            </section>
          </div>
        }
      />
      
      {/* Structured Data */}
      <Script
        id="${area.slug}-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(area.structuredData)
        }}
      />
      
      {/* Local Business Structured Data */}
      <Script
        id="${area.slug}-local-business"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Attorney',
            name: 'Vasquez Law Firm, PLLC',
            image: 'https://www.vasquezlawfirm.com/images/vasquez-law-firm-logo.png',
            url: 'https://www.vasquezlawfirm.com',
            telephone: '+1-844-967-3536',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '333 Fayetteville Street, Suite 810',
              addressLocality: 'Raleigh',
              addressRegion: 'NC',
              postalCode: '27601',
              addressCountry: 'US'
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 35.7796,
              longitude: -78.6382
            },
            openingHoursSpecification: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              opens: '08:00',
              closes: '18:00'
            },
            sameAs: [
              'https://www.facebook.com/vasquezlawfirm',
              'https://twitter.com/vasquezlawfirm',
              'https://www.linkedin.com/company/vasquez-law-firm',
              'https://www.youtube.com/vasquezlawfirm'
            ],
            priceRange: '$$'
          })
        }}
      />
    </>
  );
}
`;

    try {
      // Ensure directory exists
      const dirPath = path.dirname(pagePath);
      await fs.mkdir(dirPath, { recursive: true });

      // Write the optimized page
      await fs.writeFile(pagePath, optimizedContent);
      console.log(`✅ Generated SEO-optimized page: ${area.title}`);
    } catch (error) {
      console.error(`❌ Error generating ${area.title} page:`, error);
    }
  }

  // Generate sitemap entries
  const sitemapEntries = practiceAreasSEO.map(area => ({
    url: `https://www.vasquezlawfirm.com/practice-areas/${area.slug}`,
    changefreq: 'weekly',
    priority: '0.9',
  }));

  console.log('\n📋 Sitemap entries for practice areas:');
  console.log(JSON.stringify(sitemapEntries, null, 2));

  console.log(
    '\n✨ SEO optimization complete! NC practice areas are now optimized for search dominance.'
  );
}

// Run the optimization
generateOptimizedPages().catch(console.error);
