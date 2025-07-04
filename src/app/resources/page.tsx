import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/sections/PageHero'

export const metadata: Metadata = {
  title: 'Legal Resources | Vasquez Law Firm',
  description: 'Access helpful legal resources, guides, forms, and information about immigration, personal injury, workers compensation, criminal defense, and family law in North Carolina and Florida.',
  keywords: 'legal resources, immigration forms, legal guides, North Carolina law, Florida law, legal help, free consultation',
  openGraph: {
    title: 'Legal Resources | Vasquez Law Firm',
    description: 'Access helpful legal resources and guides for your legal needs.',
    images: ['/images/resources-hero.jpg'],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/resources',
    languages: {
      'en': '/resources',
      'es': '/es/recursos',
    },
  },
}

export default function ResourcesPage() {
  const resources = {
    immigration: {
      title: 'Immigration Resources',
      icon: '🌎',
      items: [
        {
          title: 'USCIS Official Website',
          description: 'U.S. Citizenship and Immigration Services official website',
          url: 'https://www.uscis.gov',
          type: 'external'
        },
        {
          title: 'Immigration Forms',
          description: 'Download official USCIS forms',
          url: 'https://www.uscis.gov/forms',
          type: 'external'
        },
        {
          title: 'Case Status Check',
          description: 'Check your USCIS case status online',
          url: 'https://egov.uscis.gov/casestatus/landing.do',
          type: 'external'
        },
        {
          title: 'Visa Bulletin',
          description: 'Current priority dates for family and employment-based visas',
          url: 'https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html',
          type: 'external'
        },
        {
          title: 'Immigration Court',
          description: 'Executive Office for Immigration Review',
          url: 'https://www.justice.gov/eoir',
          type: 'external'
        }
      ]
    },
    personalInjury: {
      title: 'Personal Injury Resources',
      icon: '🏥',
      items: [
        {
          title: 'What to Do After an Accident',
          description: 'Step-by-step guide for accident victims',
          url: '/blog/what-to-do-after-car-accident',
          type: 'internal'
        },
        {
          title: 'NC DOT Crash Reports',
          description: 'Request your North Carolina accident report',
          url: 'https://www.ncdot.gov/dmv/vehicle/Pages/vehicle-services.aspx',
          type: 'external'
        },
        {
          title: 'Insurance Commissioner',
          description: 'North Carolina Department of Insurance',
          url: 'https://www.ncdoi.gov',
          type: 'external'
        },
        {
          title: 'Medical Provider Directory',
          description: 'Find medical providers in your area',
          url: '/locations',
          type: 'internal'
        }
      ]
    },
    workersComp: {
      title: 'Workers\' Compensation Resources',
      icon: '👷',
      items: [
        {
          title: 'NC Industrial Commission',
          description: 'Official workers\' compensation information for North Carolina',
          url: 'https://www.ic.nc.gov',
          type: 'external'
        },
        {
          title: 'File a Claim',
          description: 'How to file a workers\' compensation claim',
          url: 'https://www.ic.nc.gov/forms.html',
          type: 'external'
        },
        {
          title: 'Workers\' Rights Guide',
          description: 'Know your rights as an injured worker',
          url: '/blog/workers-compensation-rights-nc',
          type: 'internal'
        },
        {
          title: 'Return to Work Resources',
          description: 'Resources for returning to work after injury',
          url: 'https://www.ic.nc.gov/rtw.html',
          type: 'external'
        }
      ]
    },
    criminalDefense: {
      title: 'Criminal Defense Resources',
      icon: '⚖️',
      items: [
        {
          title: 'NC Court System',
          description: 'North Carolina Judicial Branch',
          url: 'https://www.nccourts.gov',
          type: 'external'
        },
        {
          title: 'Know Your Rights',
          description: 'Understanding your constitutional rights',
          url: '/blog/know-your-rights-criminal-arrest',
          type: 'internal'
        },
        {
          title: 'Court Dates Lookup',
          description: 'Find your court date online',
          url: 'https://www.nccourts.gov/court-dates',
          type: 'external'
        },
        {
          title: 'Expungement Information',
          description: 'Learn about clearing your criminal record',
          url: '/practice-areas/criminal-defense/expungement',
          type: 'internal'
        }
      ]
    },
    familyLaw: {
      title: 'Family Law Resources',
      icon: '👨‍👩‍👧‍👦',
      items: [
        {
          title: 'NC Child Support Services',
          description: 'North Carolina child support resources',
          url: 'https://www.ncdhhs.gov/divisions/child-development-and-early-education/child-support-services',
          type: 'external'
        },
        {
          title: 'Divorce Forms',
          description: 'North Carolina divorce and separation forms',
          url: 'https://www.nccourts.gov/documents/forms',
          type: 'external'
        },
        {
          title: 'Custody Guidelines',
          description: 'Understanding child custody in NC',
          url: '/practice-areas/family-law/child-custody',
          type: 'internal'
        },
        {
          title: 'Domestic Violence Help',
          description: 'Resources for domestic violence victims',
          url: 'https://nccadv.org',
          type: 'external'
        }
      ]
    },
    general: {
      title: 'General Legal Resources',
      icon: '📚',
      items: [
        {
          title: 'Free Consultation',
          description: 'Schedule a free consultation with our attorneys',
          url: '/contact',
          type: 'internal'
        },
        {
          title: 'Legal Aid of NC',
          description: 'Free legal help for low-income residents',
          url: 'https://www.legalaidnc.org',
          type: 'external'
        },
        {
          title: 'NC Bar Association',
          description: 'North Carolina State Bar',
          url: 'https://www.ncbar.gov',
          type: 'external'
        },
        {
          title: 'Florida Bar Association',
          description: 'The Florida Bar',
          url: 'https://www.floridabar.org',
          type: 'external'
        }
      ]
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <PageHero
        title="Legal Resources"
        subtitle="Helpful information and tools for your legal needs"
        backgroundImage="/images/resources-hero.jpg"
      />

      {/* Resources Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Resources by Practice Area
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Find helpful resources, forms, and information organized by legal practice area. 
                These resources are provided for informational purposes only and do not constitute legal advice.
              </p>
            </div>

            <div className="space-y-12">
              {Object.entries(resources).map(([key, category]) => (
                <div key={key} className="bg-gray-50 rounded-2xl p-8">
                  <div className="flex items-center mb-6">
                    <span className="text-4xl mr-4">{category.icon}</span>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {category.title}
                    </h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {category.items.map((item, index) => (
                      <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        {item.type === 'external' ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block group"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 mb-2">
                                  {item.title}
                                </h4>
                                <p className="text-gray-600">{item.description}</p>
                              </div>
                              <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-600 flex-shrink-0 ml-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </div>
                          </a>
                        ) : (
                          <Link href={item.url} className="block group">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 mb-2">
                                  {item.title}
                                </h4>
                                <p className="text-gray-600">{item.description}</p>
                              </div>
                              <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-600 flex-shrink-0 ml-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Resources */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Emergency Resources
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-red-600 mb-4">
                  24/7 Crisis Hotlines
                </h3>
                <ul className="space-y-3 text-left">
                  <li className="flex items-center">
                    <span className="font-medium mr-2">National Domestic Violence Hotline:</span>
                    <a href="tel:1-800-799-7233" className="text-primary-600 hover:underline">1-800-799-7233</a>
                  </li>
                  <li className="flex items-center">
                    <span className="font-medium mr-2">National Suicide Prevention Lifeline:</span>
                    <a href="tel:988" className="text-primary-600 hover:underline">988</a>
                  </li>
                  <li className="flex items-center">
                    <span className="font-medium mr-2">RAINN National Sexual Assault Hotline:</span>
                    <a href="tel:1-800-656-4673" className="text-primary-600 hover:underline">1-800-656-4673</a>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-red-600 mb-4">
                  Immediate Legal Help
                </h3>
                <p className="text-gray-700 mb-4">
                  If you need immediate legal assistance or have been arrested, contact us 24/7:
                </p>
                <a
                  href="tel:1-866-302-3427"
                  className="inline-flex items-center justify-center bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call 1-866-302-3427
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Need Legal Guidance?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              These resources are helpful, but nothing replaces personalized legal advice. 
              Schedule a free consultation with our experienced attorneys.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-white text-primary-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Schedule Free Consultation
              </Link>
              <a
                href="tel:1-866-302-3427"
                className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-primary-600 transition-all"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now: 1-866-302-3427
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}