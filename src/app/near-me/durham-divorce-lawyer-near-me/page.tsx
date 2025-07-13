import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Divorce Lawyer Near Me in Durham | Vasquez Law Firm',
  description:
    'Find experienced divorce lawyers near you in Durham, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function DurhamDivorceNearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Durham',
        state: 'NC',
        description: 'Divorce legal services in Durham area. Free consultation available.',
      }}
    />
  );
}
