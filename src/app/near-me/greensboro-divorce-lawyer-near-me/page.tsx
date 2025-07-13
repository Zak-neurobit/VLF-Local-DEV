import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Divorce Lawyer Near Me in Greensboro | Vasquez Law Firm',
  description:
    'Find experienced divorce lawyers near you in Greensboro, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function GreensboroDivorceNearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Greensboro',
        state: 'NC',
        description: 'Divorce legal services in Greensboro area. Free consultation available.',
      }}
    />
  );
}
