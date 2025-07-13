import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Divorce Lawyer Near Me in Concord | Vasquez Law Firm',
  description:
    'Find experienced divorce lawyers near you in Concord, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function ConcordDivorceNearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Concord',
        state: 'NC',
        description: 'Divorce legal services in Concord area. Free consultation available.',
      }}
    />
  );
}
