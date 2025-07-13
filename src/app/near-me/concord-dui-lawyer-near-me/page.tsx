import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DUI Lawyer Near Me in Concord | Vasquez Law Firm',
  description:
    'Find experienced dui lawyers near you in Concord, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function ConcordDUINearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Concord',
        state: 'NC',
        description: 'DUI legal services in Concord area. Free consultation available.',
      }}
    />
  );
}
