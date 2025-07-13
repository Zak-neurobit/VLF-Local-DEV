import { Metadata } from 'next';
import { NearMeLandingPageTemplate } from '@/components/templates/NearMeLandingPageTemplate';
import { generateNearMeMetadata, generateNearMeContent } from '@/lib/seo/near-me-page-generator';

const pageData = {
  service: 'Car Accident Lawyer',
  serviceSlug: 'car-accident-lawyer',
  city: 'Raleigh',
  citySlug: 'raleigh',
  state: 'NC',
  county: 'Wake'
};

export const metadata: Metadata = generateNearMeMetadata(pageData);

export default function RaleighCarAccidentLawyerNearMePage() {
  const content = generateNearMeContent(pageData);
  
  return (
    <NearMeLandingPageTemplate
      service={pageData.service}
      location={pageData.city}
      state={pageData.state}
      content={content}
    />
  );
}