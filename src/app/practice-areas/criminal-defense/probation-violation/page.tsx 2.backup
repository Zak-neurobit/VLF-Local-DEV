import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/sections/PageHero'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { PracticeAreaSchema } from '@/components/schemas/PracticeAreaSchema'

export const metadata: Metadata = {
  title: 'Probation Violation Defense Attorney | Vasquez Law Firm',
  description: 'Experienced probation violation defense attorneys in North Carolina. Protect your freedom and avoid jail time. Free consultation available 24/7.',
  keywords: 'probation violation attorney, probation violation lawyer, violated probation, North Carolina probation violation, criminal defense attorney',
  openGraph: {
    title: 'Probation Violation Defense Attorney | Vasquez Law Firm',
    description: 'Protect your freedom with experienced probation violation defense. Available 24/7.',
    images: ['/images/practice-areas/probation-violation.jpg'],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/practice-areas/criminal-defense/probation-violation',
    languages: {
      'en': '/practice-areas/criminal-defense/probation-violation',
      'es': '/es/areas-de-practica/defensa-criminal/violacion-de-libertad-condicional',
    },
  },
}

const probationViolationFAQs = [
  {
    question: "What happens if I violate probation in North Carolina?",
    answer: "If you violate probation in NC, you could face serious consequences including jail time, extended probation, additional fines, or revocation of your probation. The judge has broad discretion in determining penalties, which is why having an experienced attorney is crucial."
  },
  {
    question: "What are common probation violations?",
    answer: "Common violations include: failing drug tests, missing appointments with your probation officer, not completing community service, failing to pay fines or restitution, committing new crimes, leaving the jurisdiction without permission, or violating any specific conditions of your probation."
  },
  {
    question: "Can I go to jail for a probation violation?",
    answer: "Yes, you can be sentenced to jail for violating probation. The judge can activate your suspended sentence, meaning you could serve the original jail time that was suspended when you were placed on probation."
  },
  {
    question: "What should I do if I\'m accused of violating probation?",
    answer: "Contact an attorney immediately. Do not discuss the alleged violation with your probation officer or anyone else without legal representation. An experienced attorney can help you understand your options and develop a defense strategy."
  },
  {
    question: "Can a probation violation be dismissed?",
    answer: "Yes, probation violations can be dismissed or resolved favorably with proper legal representation. Your attorney may be able to negotiate alternatives, challenge the evidence, or demonstrate that the violation was unintentional or due to circumstances beyond your control."
  }
]

export default function ProbationViolationPage() {
  return (
    <>
      <PracticeAreaSchema
        name="Probation Violation Defense"
        description="Experienced legal representation for probation violation cases in North Carolina"
        url="https://www.vasquezlawnc.com/practice-areas/criminal-defense/probation-violation"
        areaServed={["North Carolina", "Raleigh", "Charlotte", "Durham", "Winston-Salem"]}
      />

      <main className="min-h-screen bg-white">
        <PageHero
          title="Probation Violation Defense"
          subtitle="Protect Your Freedom with Experienced Legal Representation"
          backgroundImage="/images/practice-areas/criminal-defense-hero.jpg"
        />

        {/* Introduction Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-700 leading-relaxed mb-6">
                  Being accused of violating probation is a serious matter that can result in jail time, 
                  extended probation, and other severe consequences. At Vasquez Law Firm, our experienced 
                  criminal defense attorneys understand the stress and uncertainty you&apos;re facing. We&apos;re here 
                  to protect your rights and fight for your freedom.
                </p>
                <p className="text-lg text-gray-600">
                  Whether you&apos;re facing allegations of a technical violation or a new criminal charge while 
                  on probation, we have the knowledge and experience to help you navigate this challenging 
                  situation and achieve the best possible outcome.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Types of Violations */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Types of Probation Violations</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-primary-600 mb-4">Technical Violations</h3>
                  <p className="text-gray-600 mb-4">
                    Technical violations occur when you fail to comply with the specific conditions of your probation:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary-600 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Missing appointments with probation officer
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary-600 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Failing drug or alcohol tests
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary-600 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Not completing community service hours
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary-600 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Failing to pay fines or restitution
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary-600 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Leaving jurisdiction without permission
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-primary-600 mb-4">Substantive Violations</h3>
                  <p className="text-gray-600 mb-4">
                    Substantive violations involve committing new criminal offenses while on probation:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary-600 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Being arrested for a new crime
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary-600 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Being convicted of a new offense
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary-600 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Engaging in criminal activity
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary-600 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Violating protective orders
                    </li>
                  </ul>
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
                    <p className="text-sm text-red-800">
                      <strong>Important:</strong> Substantive violations typically carry more severe consequences 
                      than technical violations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Consequences Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Potential Consequences</h2>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      The consequences for violating probation can be severe and life-changing. 
                      Don&apos;t face these charges alone.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-3">Immediate Consequences</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Arrest and detention</li>
                    <li>• Revocation of probation</li>
                    <li>• Activation of suspended sentence</li>
                    <li>• Loss of driving privileges</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-3">Long-term Consequences</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Extended probation period</li>
                    <li>• Additional fines and costs</li>
                    <li>• More restrictive probation terms</li>
                    <li>• Impact on employment</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Defense Strategies */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">How We Defend Probation Violations</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Thorough Investigation</h3>
                  <p className="text-gray-600">
                    We examine all evidence and circumstances surrounding the alleged violation to build 
                    the strongest possible defense.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Strategic Negotiation</h3>
                  <p className="text-gray-600">
                    We negotiate with prosecutors and probation officers to seek alternatives to jail 
                    time and minimize consequences.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Aggressive Advocacy</h3>
                  <p className="text-gray-600">
                    We vigorously defend your rights in court and present compelling arguments for 
                    leniency or dismissal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-primary-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Why Choose Vasquez Law Firm?</h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-yellow-400 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <div className="text-left">
                    <h3 className="font-semibold mb-1">Experienced Defense Team</h3>
                    <p className="text-white/80">Years of experience handling probation violations in North Carolina courts</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-yellow-400 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <div className="text-left">
                    <h3 className="font-semibold mb-1">24/7 Availability</h3>
                    <p className="text-white/80">We&apos;re here when you need us most, day or night</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-yellow-400 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div className="text-left">
                    <h3 className="font-semibold mb-1">Proven Track Record</h3>
                    <p className="text-white/80">Successfully defended countless probation violation cases</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-yellow-400 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  <div className="text-left">
                    <h3 className="font-semibold mb-1">Personal Attention</h3>
                    <p className="text-white/80">We treat every case with the individual attention it deserves</p>
                  </div>
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center bg-white text-primary-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Get Free Consultation
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection
          title="Probation Violation FAQs"
          faqs={probationViolationFAQs}
        />

        {/* CTA Section */}
        <ContactCTA />

        {/* Testimonials */}
        <TestimonialsSection />
      </main>
    </>
  )
}