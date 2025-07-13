import { Metadata } from 'next';
import { NearMeLandingPageTemplate } from '@/components/templates/NearMeLandingPageTemplate';
import { generateNearMeMetadata, generateNearMeContent } from '@/lib/seo/near-me-page-generator';

const pageData = {
  service: 'Spanish Speaking Lawyer',
  serviceSlug: 'spanish-speaking-lawyer',
  city: 'High Point',
  citySlug: 'high-point',
  state: 'NC',
  county: 'Guilford'
};

export const metadata: Metadata = generateNearMeMetadata(pageData);

export default function HighPointSpanishSpeakingLawyerNearMePage() {
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