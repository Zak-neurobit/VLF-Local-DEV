import { Metadata } from 'next';
import Script from 'next/script';
import ModernLocationTemplate from '@/components/templates/ModernLocationTemplate';
import { MasterLayout } from '@/design-system/templates/MasterLayout';

export const metadata: Metadata = {
  title: 'Raleigh Immigration Lawyers | Personal Injury Attorneys - Vasquez Law Firm',
  description:
    'Raleigh NC immigration lawyers and personal injury attorneys. Main office serving Wake County with deportation defense, family visas, work permits & accident claims.',
  openGraph: {
    title: 'Raleigh Immigration Lawyers | Personal Injury Attorneys - Vasquez Law Firm',
    description: 'Main office serving Wake County & Triangle Area. Immigration, personal injury, workers comp & criminal defense. Free consultation. Se habla español.',
    images: [{ url: '/images/offices/raleigh-office.jpg' }],
  },
};

export default function RaleighPage() {
  const locationData = {
    cityName: 'Raleigh',
    officeName: 'Raleigh Office (Main Office)',
    address: {
      street: '4426 Louisburg Road',
      city: 'Raleigh',
      state: 'NC',
      zip: '27616',
    },
    phone: '1-844-YO-PELEO',
    email: 'leads@vasquezlawfirm.com',
    hours: {
      weekdays: 'Mon-Fri: 8:30 AM - 5:30 PM',
      saturday: 'By Appointment',
      sunday: 'Emergency Services Available',
    },
    servingAreas: [
      'Downtown Raleigh',
      'North Raleigh',
      'Cary',
      'Apex',
      'Garner',
      'Clayton',
      'Knightdale',
      'Wake Forest',
      'Rolesville',
      'Youngsville',
      'Wendell',
      'Zebulon',
      'Morrisville',
      'Holly Springs',
      'Fuquay-Varina',
    ],
    practiceAreas: {
      immigration: [
        'Green Cards & Permanent Residency',
        'Deportation Defense',
        'Work Visas (H-1B, L-1, E-2)',
        'Family-Based Immigration',
        'Citizenship & Naturalization',
        'DACA Applications',
        'Asylum & Refugee Protection',
        'Immigration Appeals',
        'Consular Processing',
        'Waivers & Pardons',
      ],
      personalInjury: [
        'Car Accidents on I-40, I-440, I-540',
        'Truck & Commercial Vehicle Accidents',
        'Motorcycle Accidents',
        'Pedestrian & Bicycle Injuries',
        'Slip and Fall Cases',
        'Wrongful Death Claims',
        'Medical Malpractice',
        'Product Liability',
        'Premises Liability',
        'Dog Bite Cases',
      ],
      workersComp: [
        'Workplace Injuries',
        'Construction Accidents',
        'Repetitive Stress Injuries',
        'Denied Claims Appeals',
        'Disability Benefits',
        'Third-Party Claims',
        'Occupational Diseases',
        'Return to Work Issues',
        'Medical Treatment Disputes',
        'Permanent Disability Claims',
      ],
      criminalDefense: [
        'DWI/DUI Defense',
        'Drug Charges',
        'Domestic Violence',
        'Traffic Violations',
        'Expungements',
        'Federal Crimes',
        'White Collar Crimes',
        'Juvenile Cases',
        'Assault Charges',
        'Theft & Larceny',
      ],
    },
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3236.123456789!2d-78.6569!3d35.8324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQ5JzU2LjYiTiA3OMKwMzknMjQuOSJX!5e0!3m2!1sen!2sus!4v1234567890!5m2!1sen!2sus',
  };

  return (
    <>
      <MasterLayout variant="default" showBreadcrumbs={true}>
        <ModernLocationTemplate data={locationData} />
      </MasterLayout>
      {/* Structured Data for SEO */}
      <Script
        id="location-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Vasquez Law Firm - Raleigh',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '4426 Louisburg Road',
              addressLocality: 'Raleigh',
              addressRegion: 'NC',
              postalCode: '27616',
              addressCountry: 'US',
            },
            telephone: '+1-844-967-3536',
            url: 'https://www.vasquezlawfirm.com/locations/raleigh',
            priceRange: '$$',
            openingHoursSpecification: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              opens: '08:30',
              closes: '17:30',
            },
          }),
        }}
      />
    </>
  );
}
