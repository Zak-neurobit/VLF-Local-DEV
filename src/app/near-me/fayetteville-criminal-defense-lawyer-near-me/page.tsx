import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Criminal Defense Lawyer Near Me in Fayetteville | Vasquez Law Firm',
  description:
    'Find experienced criminal defense lawyers near you in Fayetteville, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function FayettevilleCriminalDefenseNearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Fayetteville',
        state: 'NC',
        description:
          'Criminal Defense legal services in Fayetteville area. Free consultation available.',
      }}
    />
  );
}
