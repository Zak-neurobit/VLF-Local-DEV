import { Metadata } from 'next';
import { NearMeLandingPageTemplate } from '@/components/templates/NearMeLandingPageTemplate';
import { generateNearMeMetadata, generateNearMeContent } from '@/lib/seo/near-me-page-generator';

const pageData = {
  service: 'DUI Lawyer',
  serviceSlug: 'dui-lawyer',
  city: 'Winston-Salem',
  citySlug: 'winston-salem',
  state: 'NC',
  county: 'Forsyth'
};

export const metadata: Metadata = generateNearMeMetadata(pageData);

export default function WinstonSalemDUILawyerNearMePage() {
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