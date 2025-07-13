import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Immigration Lawyer Near Me in Fayetteville | Vasquez Law Firm',
  description:
    'Find experienced immigration lawyers near you in Fayetteville, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function FayettevilleImmigrationNearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Fayetteville',
        state: 'NC',
        description:
          'Immigration legal services in Fayetteville area. Free consultation available.',
      }}
    />
  );
}
