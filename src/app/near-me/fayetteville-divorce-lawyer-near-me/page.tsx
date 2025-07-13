import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Divorce Lawyer Near Me in Fayetteville | Vasquez Law Firm',
  description:
    'Find experienced divorce lawyers near you in Fayetteville, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function FayettevilleDivorceNearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Fayetteville',
        state: 'NC',
        description: 'Divorce legal services in Fayetteville area. Free consultation available.',
      }}
    />
  );
}
