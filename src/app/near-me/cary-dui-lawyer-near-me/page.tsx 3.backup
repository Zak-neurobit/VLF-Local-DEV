import { Metadata } from 'next';
import { NearMeLandingPageTemplate } from '@/components/templates/NearMeLandingPageTemplate';
import { generateNearMeMetadata, generateNearMeContent } from '@/lib/seo/near-me-page-generator';

const pageData = {
  service: 'DUI Lawyer',
  serviceSlug: 'dui-lawyer',
  city: 'Cary',
  citySlug: 'cary',
  state: 'NC',
  county: 'Wake'
};

export const metadata: Metadata = generateNearMeMetadata(pageData);

export default function CaryDUILawyerNearMePage() {
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