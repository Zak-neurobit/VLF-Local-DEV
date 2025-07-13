import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Divorce Lawyer Near Me in Cary | Vasquez Law Firm',
  description:
    'Find experienced divorce lawyers near you in Cary, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function CaryDivorceNearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Cary',
        state: 'NC',
        description: 'Divorce legal services in Cary area. Free consultation available.',
      }}
    />
  );
}
