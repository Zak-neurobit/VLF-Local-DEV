import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { AttorneySchema } from '@/components/schemas/AttorneySchema'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'

export const metadata: Metadata = {
  title: 'Rania Arwani - Of Counsel | Vasquez Law Firm',
  description: 'Rania Arwani is Of Counsel at Vasquez Law Firm, specializing in family law, domestic violence cases, and child welfare. Passionate advocate for women and children\'s rights.',
  keywords: 'Rania Arwani, family law attorney, domestic violence lawyer, child welfare attorney, women rights advocate, Florida attorney, Orange County lawyer',
  openGraph: {
    title: 'Rania Arwani - Of Counsel | Vasquez Law Firm',
    description: 'Family law attorney and passionate advocate for women and children, specializing in domestic violence cases and child welfare matters.',
    images: ['/images/attorneys/rania-arwani.jpg'],
    type: 'profile',
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/attorneys/rania-arwani',
    languages: {
      'en': '/attorneys/rania-arwani',
      'es': '/es/abogados/rania-arwani',
    },
  },
}

export default function RaniaArwaniPage() {
  const attorneyData = {
    name: 'Rania Arwani',
    title: 'Of Counsel',
    image: '/images/attorneys/rania-arwani.jpg',
    phone: '1-866-302-3427',
    email: 'rania@vasquezlawnc.com',
    specialties: [
      'Family Law',
      'Domestic Violence',
      'Child Welfare',
      'Women\'s Rights Advocacy'
    ],
    education: [
      {
        degree: 'J.D.',
        school: 'Barry University School of Law',
        location: 'Florida',
        achievements: [
          'Research Assistant',
          'Certified Legal Intern - Children and Families Clinic'
        ]
      },
      {
        degree: 'B.B.A. in Finance',
        school: 'Texas',
        location: 'Texas'
      }
    ],
    experience: [
      {
        position: 'Of Counsel',
        company: 'Vasquez Law Firm, PLLC',
        period: 'Present'
      },
      {
        position: 'Co-Founder',
        company: 'Arwani Law Firm',
        period: 'Previous'
      },
      {
        position: 'Certified Legal Intern',
        company: 'State Attorney\'s Office - Ninth Judicial Circuit',
        location: 'Orange County, Florida'
      },
      {
        position: 'Volunteer Attorney',
        company: 'Orange County Legal Aid Society',
        description: 'Representing abused women and children'
      }
    ],
    training: [
      'Florida Center for Child Welfare - Domestic Violence',
      'Florida Center for Child Welfare - Substance Abuse',
      'Florida Center for Child Welfare - Sexual Abuse of Children'
    ]
  }

  return (
    <>
      <AttorneySchema
        name={attorneyData.name}
        jobTitle={attorneyData.title}
        image={attorneyData.image}
        telephone={attorneyData.phone}
        email={attorneyData.email}
        url={`https://www.vasquezlawnc.com/attorneys/rania-arwani`}
      />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-primary-50 to-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
              <div className="order-2 md:order-1">
                <div className="mb-6">
                  <Link 
                    href="/attorneys" 
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Attorneys
                  </Link>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {attorneyData.name}
                </h1>
                <p className="text-2xl text-primary-600 mb-6">{attorneyData.title}</p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-primary-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href={`tel:${attorneyData.phone}`} className="text-lg hover:text-primary-600">
                      {attorneyData.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-primary-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href={`mailto:${attorneyData.email}`} className="text-lg hover:text-primary-600">
                      {attorneyData.email}
                    </a>
                  </div>
                </div>

                <div className="mb-8">
                  <p className="text-lg text-gray-600 italic">
                    "Mother, wife, attorney, business owner, woman rights advocate and philanthropist"
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="btn-primary inline-flex items-center"
                >
                  Schedule Consultation
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              
              <div className="order-1 md:order-2">
                <div className="relative rounded-xl overflow-hidden shadow-xl">
                  <Image
                    src={attorneyData.image}
                    alt={attorneyData.name}
                    width={500}
                    height={600}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bio Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">About Rania Arwani</h2>
              <div className="prose prose-lg max-w-none text-gray-600">
                <p className="mb-6">
                  Mother, wife, attorney, business owner, woman rights advocate and philanthropist are one of the few hats that Rania Arwani wears on a daily basis. After gaining her B.B.A. in Finance from Texas, she planned to be a stock market analyst, and after working in that field for a short period of time, she felt that something was missing and that's not where her passion was. Shortly thereafter she relocated to Florida and attended Barry University School of Law, where her commitment to law took root.
                </p>
                <p className="mb-6">
                  Rania acted as a Research Assistant at Barry University School of Law and a Certified Legal Intern for the Children and Families Clinic. At the Children's and Family Clinic, Rania quickly understood and mastered the dual role required of her in her representation of her of minor client. First, she zealously defended the delinquent children against the allegation of the unlawful behaviors, and, advocated for those children to receive the care, treatment and the guidance to help them in shaping their future.
                </p>
                <p className="mb-6">
                  She trained with the Florida Center for Child Welfare to handle a variety of legal matters related to domestic violence, substance abuse and sexual abuse of children. Prior to co-founding Arwani Law Firm Rania was a Certified Legal Intern with the State Attorney's Office in the Ninth Judicial Circuit in Orange County where she gained valuable courtroom experience.
                </p>
                <p className="mb-6">
                  Following her passion affords her the privilege to solve her client's complex legal issues, help families find common ground and reduce conflict and tension as she helps parents co-exist. Her goal is to create a stress-free environment and offer families facing complex legal issues the tools to help them reach a resolution in peace. Her philosophy is to transform people's attitude when met with the so-called failure of their marriage to an end of a triumph.
                </p>
                <p className="mb-6">
                  On a bigger scale, her mission is to make a difference in the fight against domestic violence. She is driven by this mission in all aspects of her life and seeks to inspire others to do the same. Adamant to use her knowledge in the fight against domestic violence, she volunteers for the Orange County Legal Aid Society in representing abused women and children. Her goal is to educate women in abusive relationships to identify the signs of abuse, and motivate them to speak-up, not only for themselves but also for their children.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Specialties & Mission Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Specialties */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Areas of Focus</h3>
                  <ul className="space-y-3">
                    {attorneyData.specialties.map((specialty, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="w-5 h-5 text-primary-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {specialty}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mission */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Mission & Values</h3>
                  <div className="bg-primary-50 rounded-lg p-6">
                    <p className="text-gray-700 leading-relaxed">
                      Dedicated to making a difference in the fight against domestic violence and empowering women and children to speak up and seek justice. Committed to transforming legal challenges into opportunities for positive change.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education & Training Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Education & Training</h3>
              
              <div className="space-y-6 mb-12">
                {attorneyData.education.map((edu, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6">
                    <h4 className="font-semibold text-lg text-gray-900">{edu.degree}</h4>
                    <p className="text-primary-600 font-medium">{edu.school}</p>
                    {edu.location && <p className="text-gray-500">{edu.location}</p>}
                    {edu.achievements && (
                      <ul className="mt-3 space-y-1">
                        {edu.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-gray-600 flex items-start">
                            <span className="text-primary-600 mr-2">•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Specialized Training</h4>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <ul className="space-y-2">
                    {attorneyData.training.map((training, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="w-5 h-5 text-primary-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {training}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Professional Experience</h3>
              <div className="space-y-6">
                {attorneyData.experience.map((exp, index) => (
                  <div key={index} className="border-l-4 border-primary-600 pl-6">
                    <h4 className="font-semibold text-lg text-gray-900">{exp.position}</h4>
                    <p className="text-primary-600 font-medium">{exp.company}</p>
                    {exp.location && <p className="text-gray-500">{exp.location}</p>}
                    {exp.period && <p className="text-gray-500">{exp.period}</p>}
                    {exp.description && <p className="text-gray-600 mt-2">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <ContactCTA />
        
        {/* Testimonials */}
        <TestimonialsSection />
      </main>
    </>
  )
}