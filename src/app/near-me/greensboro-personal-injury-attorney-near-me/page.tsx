import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personal Injury Lawyer Near Me in Greensboro | Vasquez Law Firm',
  description:
    'Find experienced personal injury lawyers near you in Greensboro, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function GreensboroPersonalInjuryNearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Greensboro',
        state: 'NC',
        description:
          'Personal Injury legal services in Greensboro area. Free consultation available.',
      }}
    />
  );
}
