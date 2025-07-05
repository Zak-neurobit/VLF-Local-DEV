import { Metadata } from 'next';
import Script from 'next/script';
import ModernLocationTemplate from '@/components/templates/ModernLocationTemplate';
import { MasterLayout } from '@/design-system/templates/MasterLayout';

export const metadata: Metadata = {
  title: 'Orlando Immigration Lawyers | Personal Injury Attorneys - Vasquez Law Firm',
  description:
    'Orlando FL immigration lawyers and personal injury attorneys. Serving Orange County with deportation defense, green cards, work visas & accident claims. Free consultation.',
  openGraph: {
    title: 'Orlando Immigration Lawyers | Personal Injury Attorneys - Vasquez Law Firm',
    description: 'Expert legal representation in Orlando FL. Immigration, personal injury, workers comp & criminal defense. Free consultation. Se habla español.',
    images: [{ url: '/images/offices/orlando-office.jpg' }],
  },
};

export default function OrlandoPage() {
  const locationData = {
    cityName: 'Orlando',
    officeName: 'Orlando Office',
    address: {
      street: '555 Winderley Pl Suite 300',
      city: 'Orlando',
      state: 'FL',
      zip: '32751',
    },
    phone: '1-844-YO-PELEO',
    email: 'leads@vasquezlawfirm.com',
    hours: {
      weekdays: 'Mon-Fri: 8:30 AM - 5:30 PM',
      saturday: 'By Appointment',
      sunday: 'Emergency Services Available',
    },
    servingAreas: [
      'Downtown Orlando',
      'Winter Park',
      'Kissimmee',
      'Sanford',
      'Altamonte Springs',
      'Casselberry',
      'Longwood',
      'Lake Mary',
      'Apopka',
      'Oviedo',
      'Winter Garden',
      'Windermere',
      'Dr. Phillips',
      'Universal Studios Area',
      'Disney World Area',
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
        'Immigration Court Representation',
      ],
      personalInjury: [
        'Car Accidents on I-4, I-95, SR-408',
        'Truck & Commercial Vehicle Accidents',
        'Motorcycle Accidents',
        'Pedestrian & Bicycle Injuries',
        'Slip and Fall Cases',
        'Wrongful Death Claims',
        'Medical Malpractice',
        'Product Liability',
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
      ],
    },
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.123456789!2d-81.3792!3d28.5383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDMyJzE3LjkiTiA4McKwMjInNDUuMSJX!5e0!3m2!1sen!2sus!4v1234567890!5m2!1sen!2sus',
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
            name: 'Vasquez Law Firm - Orlando',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '555 Winderley Pl Suite 300',
              addressLocality: 'Orlando',
              addressRegion: 'FL',
              postalCode: '32751',
              addressCountry: 'US',
            },
            telephone: '+1-844-967-3536',
            url: 'https://www.vasquezlawfirm.com/locations/orlando',
            priceRange: '$$',
            openingHoursSpecification: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              opens: '09:00',
              closes: '18:00',
            },
          }),
        }}
      />
    </>
  );
}
