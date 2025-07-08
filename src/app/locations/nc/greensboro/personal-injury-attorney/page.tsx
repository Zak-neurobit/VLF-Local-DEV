import { Metadata } from 'next';
import Script from 'next/script';
import ModernServiceLocationTemplate from '@/components/templates/ModernServiceLocationTemplate';
import { MasterLayout } from '@/design-system/templates/MasterLayout';

export const metadata: Metadata = {
  title: 'Greensboro Personal Injury Attorney - Car Accidents & More | Vasquez Law',
  description: 'Experienced Greensboro personal injury lawyers. Car accidents, truck crashes, slip & fall, wrongful death. No fee unless we win. Free consultation. Se habla español.',
  keywords: 'Greensboro personal injury attorney, Greensboro personal injury lawyer, car accident lawyer Greensboro NC, truck accident attorney Greensboro, slip and fall lawyer Greensboro, wrongful death attorney Greensboro, Greensboro injury law firm, best personal injury lawyer Greensboro',
  openGraph: {
    title: 'Greensboro Personal Injury Attorney - YO PELEO POR TI™ | Vasquez Law',
    description: 'Greensboro\'s trusted personal injury law firm. We fight insurance companies to get you maximum compensation. No fee unless we win your case.',
    images: [{ url: '/images/offices/greensboro-personal-injury-attorney.jpg' }],
    type: 'website',
    locale: 'en_US',
    url: 'https://www.vasquezlawfirm.com/locations/nc/greensboro/personal-injury-attorney',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Greensboro Personal Injury Attorney - YO PELEO POR TI™',
    description: 'Injured in Greensboro? We fight for maximum compensation. Free consultation.',
  },
  alternates: {
    canonical: 'https://www.vasquezlawfirm.com/locations/nc/greensboro/personal-injury-attorney',
    languages: {
      'en-US': 'https://www.vasquezlawfirm.com/locations/nc/greensboro/personal-injury-attorney',
      'es-US': 'https://www.vasquezlawfirm.com/locations/nc/greensboro/abogado-lesiones-personales',
    },
  },
};

export default function GreensboroPersonalInjuryAttorneyPage() {
  const serviceLocationData = {
    cityName: 'Greensboro',
    serviceName: 'Personal Injury',
    heroTitle: 'Greensboro Personal Injury Attorney',
    heroSubtitle: 'YO PELEO POR TI™',
    heroDescription: 'Injured in Greensboro? We fight insurance companies to get you the compensation you deserve. No fee unless we win. Over $75 million recovered for Triad-area clients.',
    
    localStats: {
      stat1: { value: '$75M+', label: 'Recovered for Clients' },
      stat2: { value: '2,200+', label: 'Greensboro Cases Won' },
      stat3: { value: '99%', label: 'Client Satisfaction' },
      stat4: { value: 'No Fee', label: 'Unless We Win' },
    },

    serviceDetails: {
      title: 'Greensboro Personal Injury Legal Services',
      description: 'Comprehensive injury representation for accidents throughout Greensboro and Guilford County',
      services: [
        {
          name: 'Car & Truck Accidents',
          description: 'Serious injuries from crashes on I-85, I-40, US-220, and Greensboro streets. We handle all insurance negotiations.',
          localInfo: 'Expert knowledge of Greensboro\'s most dangerous intersections and highways including I-40/I-85 interchange',
        },
        {
          name: 'Motorcycle Accidents',
          description: 'Protecting bikers\' rights after crashes. We understand the bias motorcyclists face from insurance companies.',
          localInfo: 'Active in Greensboro\'s motorcycle community and safety advocacy',
        },
        {
          name: 'Slip & Fall Injuries',
          description: 'Premises liability cases at stores, restaurants, apartments, and public property throughout Greensboro.',
          localInfo: 'Familiar with property codes and safety standards in Guilford County',
        },
        {
          name: 'Medical Malpractice',
          description: 'Holding Greensboro hospitals and doctors accountable for medical errors and negligence.',
          localInfo: 'Experience with Cone Health, Moses Cone Hospital, and other Triad medical facilities',
        },
        {
          name: 'Wrongful Death',
          description: 'Compassionate representation for families who\'ve lost loved ones due to negligence.',
          localInfo: 'Understanding of North Carolina wrongful death laws and Guilford County court procedures',
        },
        {
          name: 'Workers\' Compensation',
          description: 'Fighting for injured workers\' rights to medical care and wage replacement benefits.',
          localInfo: 'Knowledge of Greensboro\'s manufacturing, healthcare, and education workplace injury patterns',
        },
      ],
    },

    localExpertise: {
      title: 'Why Greensboro Injury Victims Choose Us',
      points: [
        'Deep knowledge of Greensboro roads and accident patterns',
        'Relationships with local medical providers for client treatment',
        'Regular practice in Guilford County Superior Court',
        'Understanding of Greensboro Police Department accident reports',
        'Connections with accident reconstruction experts in the Triad',
        'Bilingual team serving Greensboro\'s Hispanic community',
      ],
    },

    courtInfo: {
      title: 'Guilford County Courthouse',
      name: 'Guilford County Superior Court',
      address: '201 S Eugene St, Greensboro, NC 27401',
      phone: '(336) 641-3000',
      hours: 'Monday-Friday: 8:00 AM - 5:00 PM',
      parkingInfo: 'Paid parking available in nearby lots and decks',
      additionalInfo: 'We regularly appear in Guilford County courts and know the judges, procedures, and local rules that can impact your case outcome.',
    },

    testimonials: [
      {
        text: 'After my accident on I-40, Vasquez Law Firm got me $180,000. They handled everything while I focused on recovery.',
        author: 'Robert T.',
        location: 'Irving Park',
        rating: 5,
      },
      {
        text: 'Hit by a drunk driver near UNCG. They got me full compensation plus punitive damages. True fighters for justice!',
        author: 'Jennifer M.',
        location: 'College Hill',
        rating: 5,
      },
      {
        text: 'Fell at a Greensboro grocery store. They proved negligence and won my case. Highly recommend!',
        author: 'Carlos L.',
        location: 'East Greensboro',
        rating: 5,
      },
    ],

    caseResults: [
      '$850,000 settlement for family in I-85 truck accident near Greensboro',
      '$620,000 for factory worker injured at manufacturing plant',
      '$425,000 slip and fall at major Greensboro retail store',
      '$1.8 million medical malpractice verdict at Moses Cone Hospital',
      '$550,000 motorcycle accident on Battleground Avenue',
    ],

    faqs: [
      {
        question: 'How much is my Greensboro injury case worth?',
        answer: 'Case value depends on injury severity, medical costs, lost wages, and pain and suffering. We offer free case evaluations to assess your claim\'s potential value. Our Greensboro personal injury lawyers have recovered millions for clients with similar injuries.',
      },
      {
        question: 'How long do I have to file a personal injury lawsuit in Greensboro?',
        answer: 'North Carolina has a 3-year statute of limitations for most personal injury cases. However, some cases have shorter deadlines. Contact us immediately to protect your rights - waiting too long could bar your recovery.',
      },
      {
        question: 'What if I was partially at fault for my Greensboro accident?',
        answer: 'North Carolina follows contributory negligence rules - if you\'re even 1% at fault, you may be barred from recovery. However, we\'ve successfully overcome this defense many times. Don\'t assume you have no case - let us evaluate it for free.',
      },
      {
        question: 'How much does a Greensboro personal injury lawyer cost?',
        answer: 'We work on contingency - NO FEE unless we win your case. We advance all costs and only get paid from your settlement or verdict. Initial consultations are always free with no obligation.',
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
        sunday: 'Sunday: 24/7 for Emergencies',
      },
    },

    servingAreas: [
      'Downtown Greensboro',
      'College Hill (UNCG Area)',
      'Irving Park',
      'Fisher Park',
      'Sunset Hills',
      'Lindley Park',
      'Revolution Mill District',
      'Glenwood',
      'Adams Farm',
      'Lake Jeanette',
      'High Point',
      'Burlington',
      'Jamestown',
      'Kernersville',
      'Summerfield',
      'Oak Ridge',
      'Stokesdale',
      'Gibsonville',
      'Whitsett',
      'Pleasant Garden',
      'McLeansville',
      'Proximity',
    ],

    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3248.8!2d-79.7920!3d36.0726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDA0JzIxLjQiTiA3OcKwNDcnMzEuMiJX!5e0!3m2!1sen!2sus!4v1234567890!5m2!1sen!2sus',

    // SEO-optimized content sections
    whyHireUs: {
      title: 'Why Hire a Greensboro Personal Injury Attorney?',
      content: `After an accident in Greensboro, you need a fighter in your corner. Insurance companies have teams of lawyers working to minimize your claim. Our Greensboro personal injury attorneys level the playing field with aggressive representation and proven results. We know Greensboro\'s roads, understand local insurance tactics, and have the resources to take on billion-dollar companies. With over $75 million recovered for Triad clients and a 99% client satisfaction rate, we\'re Greensboro\'s trusted choice for serious injury cases.`,
    },

    localChallenges: {
      title: 'Common Injury Accidents in Greensboro, NC',
      content: `Greensboro\'s position as a major Triad transportation hub brings increased traffic and accident risks. The I-40/I-85 interchange sees daily crashes, while Battleground Avenue and Wendover Avenue remain among the most dangerous roads in Guilford County. UNCG campus area creates additional pedestrian hazards. Construction zones throughout downtown and near PTI Airport create additional risks. Our Greensboro injury lawyers understand these local danger zones and how they impact liability. Whether you\'re hurt in a Gate City Boulevard pile-up or a High Point Road intersection collision, we have the local knowledge to build a winning case.`,
    },
  };

  return (
    <>
      <MasterLayout variant="default" showBreadcrumbs={true}>
        <ModernServiceLocationTemplate data={serviceLocationData} />
      </MasterLayout>
      
      {/* Local Business Schema */}
      <Script
        id="greensboro-personal-injury-attorney-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            '@id': 'https://www.vasquezlawfirm.com/locations/nc/greensboro/personal-injury-attorney',
            name: 'Vasquez Law Firm - Greensboro Personal Injury Attorney',
            description: 'Experienced Greensboro personal injury lawyers. Car accidents, truck crashes, slip & fall, wrongful death. No fee unless we win.',
            url: 'https://www.vasquezlawfirm.com/locations/nc/greensboro/personal-injury-attorney',
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
            priceRange: 'No Fee Unless We Win',
            areaServed: [
              {
                '@type': 'City',
                name: 'Greensboro',
              },
              {
                '@type': 'AdministrativeArea',
                name: 'Guilford County',
              },
            ],
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Personal Injury Legal Services',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Car Accident Representation',
                    description: 'Legal representation for car accident victims in Greensboro',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Truck Accident Cases',
                    description: 'Commercial vehicle and truck accident injury claims',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Slip and Fall Claims',
                    description: 'Premises liability cases for slip and fall injuries',
                  },
                },
              ],
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '423',
              bestRating: '5',
              worstRating: '1',
            },
          }),
        }}
      />

      {/* FAQ Schema */}
      <Script
        id="greensboro-personal-injury-faq-schema"
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
        id="greensboro-personal-injury-breadcrumb-schema"
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
                name: 'Personal Injury Attorney',
                item: 'https://www.vasquezlawfirm.com/locations/nc/greensboro/personal-injury-attorney',
              },
            ],
          }),
        }}
      />
    </>
  );
}