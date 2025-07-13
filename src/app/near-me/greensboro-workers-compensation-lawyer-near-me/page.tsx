import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Workers Compensation Lawyer Near Me in Greensboro | Vasquez Law Firm',
  description:
    'Find experienced workers compensation lawyers near you in Greensboro, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function GreensboroWorkersCompensationNearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Greensboro',
        state: 'NC',
        description:
          'Workers Compensation legal services in Greensboro area. Free consultation available.',
      }}
    />
  );
}
