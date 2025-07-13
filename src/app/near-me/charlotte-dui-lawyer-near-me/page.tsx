import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DUI Lawyer Near Me in Charlotte | Vasquez Law Firm',
  description:
    'Find experienced dui lawyers near you in Charlotte, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function CharlotteDUINearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Charlotte',
        state: 'NC',
        description: 'DUI legal services in Charlotte area. Free consultation available.',
      }}
    />
  );
}
