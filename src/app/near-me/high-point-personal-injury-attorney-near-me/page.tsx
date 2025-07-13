import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personal Injury Lawyer Near Me in High | Vasquez Law Firm',
  description:
    'Find experienced personal injury lawyers near you in High, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function HighPersonalInjuryNearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'High',
        state: 'NC',
        description: 'Personal Injury legal services in High area. Free consultation available.',
      }}
    />
  );
}
