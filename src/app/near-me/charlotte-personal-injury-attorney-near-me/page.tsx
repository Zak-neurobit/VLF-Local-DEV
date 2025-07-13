import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personal Injury Lawyer Near Me in Charlotte | Vasquez Law Firm',
  description:
    'Find experienced personal injury lawyers near you in Charlotte, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function CharlottePersonalInjuryNearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Charlotte',
        state: 'NC',
        description:
          'Personal Injury legal services in Charlotte area. Free consultation available.',
      }}
    />
  );
}
