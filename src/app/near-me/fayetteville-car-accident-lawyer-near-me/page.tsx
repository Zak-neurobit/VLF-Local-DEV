import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Car Accident Lawyer Near Me in Fayetteville | Vasquez Law Firm',
  description:
    'Find experienced car accident lawyers near you in Fayetteville, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function FayettevilleCarAccidentNearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Fayetteville',
        state: 'NC',
        description:
          'Car Accident legal services in Fayetteville area. Free consultation available.',
      }}
    />
  );
}
