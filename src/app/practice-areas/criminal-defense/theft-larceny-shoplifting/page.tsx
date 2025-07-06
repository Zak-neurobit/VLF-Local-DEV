import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/sections/PageHero'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { PracticeAreaSchema } from '@/components/schemas/PracticeAreaSchema'

export const metadata: Metadata = {
  title: 'Theft, Larceny & Shoplifting Defense Attorney | Vasquez Law Firm',
  description: 'Experienced theft crime defense attorneys in North Carolina. Defending against shoplifting, larceny, embezzlement, and theft charges. Free consultation.',
  keywords: 'theft attorney, larceny lawyer, shoplifting defense, North Carolina theft charges, criminal defense attorney, embezzlement lawyer',
  openGraph: {
    title: 'Theft, Larceny & Shoplifting Defense Attorney | Vasquez Law Firm',
    description: 'Protect your future with experienced theft crime defense. Free consultation available.',
    images: ['/images/practice-areas/theft-defense.jpg'],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/practice-areas/criminal-defense/theft-larceny-shoplifting',
    languages: {
      'en': '/practice-areas/criminal-defense/theft-larceny-shoplifting',
      'es': '/es/areas-de-practica/defensa-criminal/robo-hurto-shoplifting',
    },
  },
}

const theftFAQs = [
  {
    question: "What's the difference between theft, larceny, and shoplifting?",
    answer: "In North Carolina, larceny is the legal term for theft - taking someone else's property without permission with intent to permanently deprive them. Shoplifting is a specific type of larceny involving retail merchandise. The terms are often used interchangeably, but all involve unlawfully taking property."
  },
  {
    question: "What are the penalties for shoplifting in North Carolina?",
    answer: "Penalties depend on the value of items taken. Under $1,000 is typically a Class 1 misdemeanor (up to 120 days in jail). Over $1,000 is a Class H felony (4-25 months in prison). Repeat offenses and organized retail theft carry enhanced penalties."
  },
  {
    question: "Can I be charged with shoplifting if I didn\'t leave the store?",
    answer: "Yes. In North Carolina, you can be charged with shoplifting for concealing merchandise, altering price tags, or transferring items between containers, even if you haven't left the store. Intent to steal is the key element."
  },
  {
    question: "Will a theft conviction affect my employment?",
    answer: "Yes, theft convictions can severely impact employment opportunities. Many employers conduct background checks and view theft crimes as indicators of dishonesty. This is why fighting these charges or seeking alternative resolutions is crucial."
  },
  {
    question: "Can theft charges be dismissed or reduced?",
    answer: "Yes, with proper legal representation. Options may include dismissal for lack of evidence, reduction to a lesser charge, deferred prosecution programs, or conditional discharge for first-time offenders. Each case is unique."
  }
]

export default function TheftLarcenyShopliftingPage() {
  return (
    <>
      <PracticeAreaSchema
        name="Theft, Larceny & Shoplifting Defense"
        description="Experienced legal representation for theft crime cases in North Carolina"
        url="https://www.vasquezlawnc.com/practice-areas/criminal-defense/theft-larceny-shoplifting"
        areaServed={["North Carolina", "Raleigh", "Charlotte", "Durham", "Winston-Salem"]}
      />

      <main className="min-h-screen bg-white">
        <PageHero
          title="Theft, Larceny & Shoplifting Defense"
          subtitle="Protecting Your Rights and Your Future"
          backgroundImage="/images/practice-areas/criminal-defense-hero.jpg"
        />

        {/* Introduction Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-700 leading-relaxed mb-6">
                  Being charged with theft, larceny, or shoplifting can have serious consequences that extend 
                  far beyond potential jail time. These charges can damage your reputation, limit employment 
                  opportunities, and create lasting financial hardship. At Vasquez Law Firm, we understand 
                  what&apos;s at stake and fight aggressively to protect your rights and future.
                </p>
                <p className="text-lg text-gray-600">
                  Our experienced criminal defense attorneys have successfully defended clients against all 
                  types of theft charges, from minor shoplifting cases to serious felony larceny accusations. 
                  We know the law, the local courts, and how to build strong defenses that get results.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Types of Theft Charges */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Types of Theft Charges We Defend</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Shoplifting</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Concealing merchandise</li>
                    <li>• Price tag switching</li>
                    <li>• Under-ringing items</li>
                    <li>• Return fraud</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Larceny</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Misdemeanor larceny</li>
                    <li>• Felony larceny</li>
                    <li>• Larceny by employee</li>
                    <li>• Possession of stolen goods</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Related Charges</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Embezzlement</li>
                    <li>• Identity theft</li>
                    <li>• Credit card fraud</li>
                    <li>• Breaking and entering</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Classification and Penalties */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">North Carolina Theft Classifications</h2>
              
              <div className="space-y-6">
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-800 font-semibold">
                        M
                      </span>
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-xl font-semibold mb-2">Class 1 Misdemeanor Larceny</h3>
                      <p className="text-gray-600 mb-2">Property value under $1,000</p>
                      <p className="text-sm text-gray-700">
                        <strong>Penalties:</strong> Up to 120 days in jail, fines, probation, community service, restitution
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-orange-100 text-orange-800 font-semibold">
                        F
                      </span>
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-xl font-semibold mb-2">Class H Felony Larceny</h3>
                      <p className="text-gray-600 mb-2">Property value $1,000 or more</p>
                      <p className="text-sm text-gray-700">
                        <strong>Penalties:</strong> 4-25 months in prison (depending on prior record), substantial fines, felony record
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border-2 border-red-200 rounded-lg p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-red-100 text-red-800 font-semibold">
                        E
                      </span>
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-xl font-semibold mb-2">Enhanced Penalties</h3>
                      <p className="text-gray-600 mb-2">Special circumstances that increase severity</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Organized retail theft</li>
                        <li>• Multiple prior convictions</li>
                        <li>• Theft from elderly victims</li>
                        <li>• Employee theft</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Defense Strategies */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Our Defense Strategies</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-6">Common Defenses</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-primary-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h4 className="font-semibold">Lack of Intent</h4>
                        <p className="text-gray-600">Proving you didn\&apos;t intend to permanently deprive the owner</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-primary-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h4 className="font-semibold">Mistaken Identity</h4>
                        <p className="text-gray-600">Challenging witness identification and surveillance evidence</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-primary-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h4 className="font-semibold">Ownership Issues</h4>
                        <p className="text-gray-600">Demonstrating you believed you had a right to the property</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-primary-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h4 className="font-semibold">Constitutional Violations</h4>
                        <p className="text-gray-600">Illegal search, improper arrest, or rights violations</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-6">Alternative Resolutions</h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-6 shadow-md">
                      <h4 className="font-semibold text-lg mb-2">Deferred Prosecution</h4>
                      <p className="text-gray-600">First-time offenders may qualify for programs that result in dismissal upon completion</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-6 shadow-md">
                      <h4 className="font-semibold text-lg mb-2">Conditional Discharge</h4>
                      <p className="text-gray-600">Complete probation and community service for potential dismissal</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-6 shadow-md">
                      <h4 className="font-semibold text-lg mb-2">Plea Negotiations</h4>
                      <p className="text-gray-600">Reducing charges to minimize impact on your record and future</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Consequences Beyond Court */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Long-Term Consequences</h2>
              
              <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-8">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">
                      A theft conviction can impact your life for years. Don&apos;t face these charges without experienced legal help.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Employment Impact</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      Failed background checks
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      Loss of professional licenses
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      Ineligibility for certain careers
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      Difficulty finding any employment
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Personal Consequences</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      Immigration consequences
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      Housing application denials
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      Loss of civil rights (felonies)
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      Educational opportunity limits
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection
          title="Theft Crime Defense FAQs"
          faqs={theftFAQs}
        />

        {/* CTA Section */}
        <section className="py-16 bg-primary-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Don&apos;t Let Theft Charges Ruin Your Future</h2>
              <p className="text-xl mb-8">
                Get experienced legal representation now. We offer free consultations and payment plans.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-white text-primary-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Schedule Free Consultation
                </Link>
                <a
                  href="tel:1-866-302-3427"
                  className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white hover:text-primary-600 transition-all"
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

        {/* Testimonials */}
        <TestimonialsSection />
      </main>
    </>
  )
}