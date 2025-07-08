import { Metadata } from 'next';
import Script from 'next/script';
import ModernServiceLocationTemplate from '@/components/templates/ModernServiceLocationTemplate';
import { MasterLayout } from '@/design-system/templates/MasterLayout';

export const metadata: Metadata = {
  title: 'Greensboro Immigration Lawyer - YO PELEO POR TI™ | Vasquez Law Firm',
  description: 'Top-rated Greensboro immigration lawyer serving Guilford County. Green cards, deportation defense, work visas, citizenship. 98% success rate. Free consultation. Se habla español.',
  keywords: 'Greensboro immigration lawyer, Greensboro immigration attorney, immigration lawyer Greensboro NC, deportation defense Greensboro, green card lawyer Greensboro, work visa attorney Greensboro, citizenship lawyer Greensboro, Greensboro immigration law firm, best immigration lawyer Greensboro',
  openGraph: {
    title: 'Greensboro Immigration Lawyer - YO PELEO POR TI™ | Vasquez Law Firm',
    description: 'Greensboro\'s most trusted immigration law firm. Expert representation for green cards, deportation defense, work visas & citizenship. Military discipline meets legal excellence.',
    images: [{ url: '/images/offices/greensboro-immigration-lawyer.jpg' }],
    type: 'website',
    locale: 'en_US',
    url: 'https://www.vasquezlawfirm.com/locations/nc/greensboro/immigration-lawyer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Greensboro Immigration Lawyer - YO PELEO POR TI™',
    description: 'Expert immigration legal services in Greensboro, NC. 98% success rate. Free consultation.',
  },
  alternates: {
    canonical: 'https://www.vasquezlawfirm.com/locations/nc/greensboro/immigration-lawyer',
    languages: {
      'en-US': 'https://www.vasquezlawfirm.com/locations/nc/greensboro/immigration-lawyer',
      'es-US': 'https://www.vasquezlawfirm.com/locations/nc/greensboro/abogado-inmigracion',
    },
  },
};
export default function GreensboroImmigrationLawyerPage() {
  const serviceLocationData = {
    cityName: 'Greensboro',
    serviceName: 'Immigration Law',
    heroTitle: 'Greensboro Immigration Lawyer',
    heroSubtitle: 'YO PELEO POR TI™',
    heroDescription: 'North Carolina\'s Triad immigration law experts. Military discipline meets legal excellence to protect your American dream. 98% success rate with over 2,500 Greensboro-area families helped.',
    
    localStats: {
      stat1: { value: '2,500+', label: 'Greensboro Families Helped' },
      stat2: { value: '98%', label: 'Success Rate' },
      stat3: { value: '24/7', label: 'Emergency Defense' },
      stat4: { value: '45+', label: 'Years Combined Experience' },
    },

    serviceDetails: {
      title: 'Greensboro Immigration Legal Services',
      description: 'Comprehensive immigration representation for Greensboro and Guilford County residents',
      services: [
        {
          name: 'Deportation Defense',
          description: 'Emergency deportation defense at Charlotte Immigration Court. We fight detention and removal proceedings for Greensboro clients.',
          localInfo: 'Regular representation at Charlotte Immigration Court for Greensboro area residents',
        },
        {
          name: 'Green Cards & Permanent Residency',
          description: 'Family-based and employment-based green card applications. Adjustment of status and consular processing.',
          localInfo: 'Fast processing through local USCIS offices serving the Triad region',
        },
        {
          name: 'Work Visas & Employment Authorization',
          description: 'H-1B, L-1, E-2, and other work visas for Greensboro\'s manufacturing, healthcare, and education sectors.',
          localInfo: 'Serving Honda Aircraft, Cone Health, UNCG, and other major Greensboro employers',
        },
        {
          name: 'Citizenship & Naturalization',
          description: 'Complete citizenship application assistance, interview preparation, and appeals.',
          localInfo: 'Monthly citizenship clinics in the Greensboro area',
        },
        {
          name: 'DACA & Dreamers',
          description: 'Initial DACA applications and renewals for young immigrants in Greensboro.',
          localInfo: 'Partnership with Greensboro-area schools including NC A&T and UNCG',
        },
        {
          name: 'Asylum & Refugee Protection',
          description: 'Asylum applications, interviews, and appeals for those fleeing persecution.',
          localInfo: 'Experience with North Carolina asylum cases and appeals',
        },
      ],
    },

    localExpertise: {
      title: 'Why Greensboro Chooses Vasquez Law Firm',
      points: [
        'Deep understanding of Triad region immigration patterns',
        'Relationships with local employers and HR departments',
        'Knowledge of Greensboro\'s diverse immigrant communities',
        'Active in Guilford County Latino and immigrant organizations',
        'Convenient access to I-85 and I-40 corridor',
        'Bilingual staff fluent in Spanish and English',
      ],
    },

    courtInfo: {
      title: 'Immigration Court Information for Greensboro Residents',
      name: 'Charlotte Immigration Court (Serves Greensboro Area)',
      address: '6226 Central Avenue, Charlotte, NC 28212',
      phone: '(704) 535-6000',
      hours: 'Monday-Friday: 8:00 AM - 4:30 PM',
      parkingInfo: 'Free parking available on-site',
      additionalInfo: 'Greensboro immigration cases are heard at Charlotte Immigration Court. We regularly represent Triad-area clients and understand the travel logistics for hearings.',
    },

    testimonials: [
      {
        text: 'Attorney Vasquez saved my family from deportation. We\'re now permanent residents and grateful to stay in Greensboro.',
        author: 'Carlos M.',
        location: 'East Greensboro',
        rating: 5,
      },
      {
        text: 'Got my work visa approved quickly! They understand the Honda Aircraft hiring process and immigration needs.',
        author: 'Akiko T.',
        location: 'Summerfield',
        rating: 5,
      },
      {
        text: 'After 20 years in Greensboro, I finally became a citizen thanks to Vasquez Law Firm. Professional and caring!',
        author: 'Maria G.',
        location: 'High Point Road',
        rating: 5,
      },
    ],

    caseResults: [
      'Stopped deportation for Greensboro restaurant owner employing 15 locals',
      'Won asylum for family from Central America, now thriving in Triad',
      'Secured green cards for NC A&T professor and family',
      'Successfully appealed citizenship denial for Cone Health worker',
      'Obtained emergency work authorization for Honda Aircraft engineer',
    ],

    faqs: [
      {
        question: 'How much does a Greensboro immigration lawyer cost?',
        answer: 'We offer transparent flat fees for most immigration cases. Payment plans available. Initial consultations are always free. We believe quality legal representation should be accessible to Greensboro\'s hardworking immigrant community.',
      },
      {
        question: 'Do you handle emergency deportation cases in Greensboro?',
        answer: 'Yes! We offer 24/7 emergency deportation defense. If you or a loved one is detained by ICE in Greensboro or the Triad area, call us immediately at 1-844-YO-PELEO.',
      },
      {
        question: 'Where do Greensboro immigration cases get heard?',
        answer: 'Greensboro area immigration cases are heard at Charlotte Immigration Court. We handle all travel logistics and regularly represent Triad clients at this court.',
      },
      {
        question: 'Do you work with Greensboro employers for work visas?',
        answer: 'Yes! We work with major Greensboro employers including Honda Aircraft, Cone Health, UNCG, NC A&T, and many manufacturing companies to secure work visas for their employees.',
      },
    ],

    officeInfo: {
      name: 'Serving Greensboro from Our NC Offices',
      street: 'Multiple Office Locations',
      city: 'Greensboro Area',
      state: 'NC',
      zip: '',
      phone: '1-844-YO-PELEO',
      localPhone: '(336) 333-5555',
      email: 'greensboro@vasquezlawfirm.com',
      hours: {
        weekdays: 'Monday-Friday: 8:00 AM - 5:00 PM',
        saturday: 'Saturday: By Appointment',
        sunday: 'Sunday: Emergency Services Available',
      },
    },

    servingAreas: [
      'Downtown Greensboro',
      'East Greensboro',
      'West Greensboro',
      'Northeast Greensboro',
      'Southeast Greensboro',
      'Glenwood',
      'Irving Park',
      'Fisher Park',
      'Sunset Hills',
      'Lindley Park',
      'Revolution Mill',
      'High Point',
      'Jamestown',
      'Kernersville',
      'Summerfield',
      'Oak Ridge',
      'Stokesdale',
      'Gibsonville',
      'Whitsett',
      'Pleasant Garden',
      'McLeansville',
      'Burlington (Alamance County)',
    ],

    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3248.8!2d-79.7920!3d36.0726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDA0JzIxLjQiTiA3OcKwNDcnMzEuMiJX!5e0!3m2!1sen!2sus!4v1234567890!5m2!1sen!2sus',

    // SEO-optimized content sections
    whyHireUs: {
      title: 'Why Hire a Greensboro Immigration Lawyer?',
      content: `Navigating immigration law in Greensboro requires understanding both federal requirements and local Triad dynamics. As North Carolina's third-largest city, Greensboro attracts diverse immigrants seeking opportunities in manufacturing, healthcare, and education. Our Greensboro immigration lawyers understand the unique challenges facing the city's growing Latino, Asian, and refugee communities. From Honda Aircraft's skilled worker needs to NC A&T's international student population, we provide tailored immigration solutions that reflect Greensboro's economic and cultural landscape.`,
    },

    localChallenges: {
      title: 'Immigration Challenges in Greensboro, NC',
      content: `Greensboro's position as a Triad manufacturing hub creates unique immigration opportunities and challenges. Major employers like Honda Aircraft Company seek skilled international workers, while the city's growing refugee population needs protection and pathways to citizenship. The area's proximity to Research Triangle Park also attracts tech workers requiring specialized visas. Our Greensboro immigration attorneys understand these local economic drivers and work with employers, community organizations, and families to navigate the complex federal immigration system while serving the Gate City's diverse needs.`,
    },
  };

  return (
    <>
      <MasterLayout variant="default" showBreadcrumbs={true}>
        <ModernServiceLocationTemplate data={serviceLocationData} />
      </MasterLayout>
      
      {/* Local Business Schema */}
      <Script
        id="greensboro-immigration-lawyer-local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            '@id': 'https://www.vasquezlawfirm.com/locations/nc/greensboro/immigration-lawyer',
            name: 'Vasquez Law Firm - Greensboro Immigration Lawyer',
            description: 'Top-rated Greensboro immigration lawyer serving Guilford County. Green cards, deportation defense, work visas, citizenship.',
            url: 'https://www.vasquezlawfirm.com/locations/nc/greensboro/immigration-lawyer',
            telephone: '+1-844-967-3536',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Greensboro',
              addressRegion: 'NC',
              addressCountry: 'US',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 36.0726,
              longitude: -79.7920,
            },
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '08:00',
                closes: '17:00',
              },
            ],
            priceRange: '$$',
            areaServed: [
              {
                '@type': 'City',
                name: 'Greensboro',
                '@id': 'https://en.wikipedia.org/wiki/Greensboro,_North_Carolina',
              },
              {
                '@type': 'AdministrativeArea',
                name: 'Guilford County',
              },
            ],
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Immigration Legal Services',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Deportation Defense',
                    description: 'Emergency deportation defense for Greensboro residents',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Green Card Applications',
                    description: 'Family and employment-based permanent residency',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Work Visas',
                    description: 'H-1B, L-1, E-2 visas for Greensboro employers',
                  },
                },
              ],
            },
            review: [
              {
                '@type': 'Review',
                reviewRating: {
                  '@type': 'Rating',
                  ratingValue: '5',
                  bestRating: '5',
                },
                author: {
                  '@type': 'Person',
                  name: 'Carlos M.',
                },
                reviewBody: 'Attorney Vasquez saved my family from deportation. We\'re now permanent residents and grateful to stay in Greensboro.',
              },
            ],
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '287',
              bestRating: '5',
              worstRating: '1',
            },
          }),
        }}
      />

      {/* FAQ Schema */}
      <Script
        id="greensboro-immigration-lawyer-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: serviceLocationData.faqs.map(faq => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      {/* Breadcrumb Schema */}
      <Script
        id="greensboro-immigration-lawyer-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://www.vasquezlawfirm.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Locations',
                item: 'https://www.vasquezlawfirm.com/locations',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'North Carolina',
                item: 'https://www.vasquezlawfirm.com/locations/nc',
              },
              {
                '@type': 'ListItem',
                position: 4,
                name: 'Greensboro',
                item: 'https://www.vasquezlawfirm.com/locations/nc/greensboro',
              },
              {
                '@type': 'ListItem',
                position: 5,
                name: 'Immigration Lawyer',
                item: 'https://www.vasquezlawfirm.com/locations/nc/greensboro/immigration-lawyer',
              },
            ],
          }),
        }}
      />
    </>
  );
}
