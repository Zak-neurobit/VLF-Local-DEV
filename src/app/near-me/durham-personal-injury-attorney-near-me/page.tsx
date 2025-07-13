import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personal Injury Lawyer Near Me in Durham | Vasquez Law Firm',
  description:
    'Find experienced personal injury lawyers near you in Durham, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function DurhamPersonalInjuryNearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Durham',
        state: 'NC',
        description: 'Personal Injury legal services in Durham area. Free consultation available.',
      }}
    />
  );
}
