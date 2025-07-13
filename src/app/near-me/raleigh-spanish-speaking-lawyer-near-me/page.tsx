import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spanish Speaking Lawyer Near Me in Raleigh | Vasquez Law Firm',
  description:
    'Find experienced spanish speaking lawyers near you in Raleigh, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function RaleighSpanishSpeakingNearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Raleigh',
        state: 'NC',
        description:
          'Spanish Speaking legal services in Raleigh area. Free consultation available.',
      }}
    />
  );
}
