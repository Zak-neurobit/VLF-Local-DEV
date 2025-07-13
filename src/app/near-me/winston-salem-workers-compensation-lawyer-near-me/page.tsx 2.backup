import { Metadata } from 'next';
import { NearMeLandingPageTemplate } from '@/components/templates/NearMeLandingPageTemplate';
import { generateNearMeMetadata, generateNearMeContent } from '@/lib/seo/near-me-page-generator';

const pageData = {
  service: 'Workers Compensation Lawyer',
  serviceSlug: 'workers-compensation-lawyer',
  city: 'Winston-Salem',
  citySlug: 'winston-salem',
  state: 'NC',
  county: 'Forsyth'
};

export const metadata: Metadata = generateNearMeMetadata(pageData);

export default function WinstonSalemWorkersCompensationLawyerNearMePage() {
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