import { Metadata } from 'next';
import { NearMeLandingPageTemplate } from '@/components/templates/NearMeLandingPageTemplate';
import { generateNearMeMetadata, generateNearMeContent } from '@/lib/seo/near-me-page-generator';

const pageData = {
  service: 'Immigration Lawyer',
  serviceSlug: 'immigration-lawyer',
  city: 'Concord',
  citySlug: 'concord',
  state: 'NC',
  county: 'Cabarrus'
};

export const metadata: Metadata = generateNearMeMetadata(pageData);

export default function ConcordImmigrationLawyerNearMePage() {
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