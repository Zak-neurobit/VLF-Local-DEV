import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personal Injury Lawyer Near Me in Cary | Vasquez Law Firm',
  description:
    'Find experienced personal injury lawyers near you in Cary, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function CaryPersonalInjuryNearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Cary',
        state: 'NC',
        description: 'Personal Injury legal services in Cary area. Free consultation available.',
      }}
    />
  );
}
