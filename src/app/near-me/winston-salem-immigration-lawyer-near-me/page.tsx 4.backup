import { Metadata } from 'next';
import { NearMeLandingPageTemplate } from '@/components/templates/NearMeLandingPageTemplate';
import { generateNearMeMetadata, generateNearMeContent } from '@/lib/seo/near-me-page-generator';

const pageData = {
  service: 'Immigration Lawyer',
  serviceSlug: 'immigration-lawyer',
  city: 'Winston-Salem',
  citySlug: 'winston-salem',
  state: 'NC',
  county: 'Forsyth'
};

export const metadata: Metadata = generateNearMeMetadata(pageData);

export default function WinstonSalemImmigrationLawyerNearMePage() {
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