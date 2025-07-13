import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spanish Speaking Lawyer Near Me in Durham | Vasquez Law Firm',
  description:
    'Find experienced spanish speaking lawyers near you in Durham, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function DurhamSpanishSpeakingNearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Durham',
        state: 'NC',
        description: 'Spanish Speaking legal services in Durham area. Free consultation available.',
      }}
    />
  );
}
