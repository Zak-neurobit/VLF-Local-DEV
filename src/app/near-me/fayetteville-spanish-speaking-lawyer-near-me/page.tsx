import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spanish Speaking Lawyer Near Me in Fayetteville | Vasquez Law Firm',
  description:
    'Find experienced spanish speaking lawyers near you in Fayetteville, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function FayettevilleSpanishSpeakingNearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Fayetteville',
        state: 'NC',
        description:
          'Spanish Speaking legal services in Fayetteville area. Free consultation available.',
      }}
    />
  );
}
