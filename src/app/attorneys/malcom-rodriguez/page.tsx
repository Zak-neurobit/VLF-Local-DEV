import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { AttorneySchema } from '@/components/schemas/AttorneySchema'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'

export const metadata: Metadata = {
  title: 'Malcom Rodriguez - Criminal Defense Attorney | Vasquez Law Firm',
  description: 'Malcom Rodriguez is a bilingual criminal defense attorney at Vasquez Law Firm, focusing on traffic violations, misdemeanor defense, and workers compensation cases in North Carolina.',
  keywords: 'Malcom Rodriguez, criminal defense attorney, traffic attorney, workers compensation lawyer, bilingual attorney, Puerto Rico attorney, North Carolina lawyer',
  openGraph: {
    title: 'Malcom Rodriguez - Criminal Defense Attorney | Vasquez Law Firm',
    description: 'Bilingual criminal defense attorney helping clients with traffic violations, misdemeanor defense, and workers compensation cases.',
    images: ['/images/attorneys/malcom-rodriguez.jpg'],
    type: 'profile',
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/attorneys/malcom-rodriguez',
    languages: {
      'en': '/attorneys/malcom-rodriguez',
      'es': '/es/abogados/malcom-rodriguez',
    },
  },
}

export default function MalcomRodriguezPage() {
  const attorneyData = {
    name: 'Malcom Rodriguez',
    title: 'Criminal Defense Attorney',
    image: '/images/attorneys/malcom-rodriguez.jpg',
    phone: '1-866-302-3427',
    email: 'malcom@vasquezlawnc.com',
    languages: ['English', 'Spanish'],
    barAdmissions: ['North Carolina - Admitted in 2023'],
    education: [
      {
        degree: 'J.D. | Juris Doctorate',
        school: 'Interamerican Law School',
        location: 'San Juan, Puerto Rico',
        year: '2021'
      },
      {
        degree: 'B.A. Pedagogy (ESL Teacher)',
        school: 'University of Puerto Rico',
        location: 'Cayey, Puerto Rico',
        year: '2007'
      }
    ],
    practiceAreas: [
      'Criminal Defense',
      'Traffic Violations',
      'Workers Compensation'
    ],
    experience: [
      {
        position: 'Attorney',
        company: 'Vasquez Law Firm, PLLC',
        period: '2023 - Present'
      },
      {
        position: 'Paralegal/Legal Assistant',
        company: 'Vasquez Law Firm, PLLC',
        period: '2022 - 2023'
      }
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
        url={`https://www.vasquezlawnc.com/attorneys/malcom-rodriguez`}
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
                  
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-primary-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <span className="text-lg">Languages: {attorneyData.languages.join(', ')}</span>
                  </div>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-8">About Malcom Rodriguez</h2>
              <div className="prose prose-lg max-w-none text-gray-600">
                <p className="mb-6">
                  My name is Malcom Rodriguez, and I am originally from Puerto Rico. I have a background on helping students to achieve the goal of becoming bilinguals and better people on a daily basis. I was an ESL teacher in my country for eleven years. I then decided to go to law school understanding I could help people in different areas of their lives if I became an Attorney.
                </p>
                <p className="mb-6">
                  Over a year ago, I started working as a Paralegal/Legal Assistant in Vasquez Law Firm, helping and informing, and translating for our clients in the criminal defense and traffic areas. Now, I have achieved my goal of becoming an Attorney and have transitioned in the firm. I feel very proud of serving our clients, and among them, the Hispanic community.
                </p>
                <p className="mb-6">
                  As a bilingual Attorney I hope to bring ease of mind to clients who prefer to speak to their Attorney directly in their native language. I will focus in the areas of Traffic and Criminal defense (Misdemeanors) but will also integrate in the area of Workers Compensation. With a great sense of responsibility, hard work, and respect for all I wish to help, counsel, and represent our clients zealously in court.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Credentials Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Education */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Education</h3>
                  <div className="space-y-6">
                    {attorneyData.education.map((edu, index) => (
                      <div key={index} className="border-l-4 border-primary-600 pl-6">
                        <h4 className="font-semibold text-lg text-gray-900">{edu.degree}</h4>
                        <p className="text-gray-600">{edu.school}</p>
                        <p className="text-gray-500">{edu.location} • {edu.year}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bar Admissions & Practice Areas */}
                <div>
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Bar Admissions</h3>
                    <ul className="space-y-2">
                      {attorneyData.barAdmissions.map((admission, index) => (
                        <li key={index} className="flex items-center">
                          <svg className="w-5 h-5 text-primary-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {admission}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Practice Areas</h3>
                    <ul className="space-y-2">
                      {attorneyData.practiceAreas.map((area, index) => (
                        <li key={index} className="flex items-center">
                          <svg className="w-5 h-5 text-primary-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {area}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Professional Experience</h3>
              <div className="space-y-6">
                {attorneyData.experience.map((exp, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6">
                    <h4 className="font-semibold text-lg text-gray-900">{exp.position}</h4>
                    <p className="text-primary-600 font-medium">{exp.company}</p>
                    <p className="text-gray-500">{exp.period}</p>
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