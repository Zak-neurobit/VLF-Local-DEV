import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personal Injury Lawyer Near Me in Concord | Vasquez Law Firm',
  description:
    'Find experienced personal injury lawyers near you in Concord, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function ConcordPersonalInjuryNearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Concord',
        state: 'NC',
        description: 'Personal Injury legal services in Concord area. Free consultation available.',
      }}
    />
  );
}
