import { Metadata } from 'next';
import { NearMeLandingPageTemplate } from '@/components/templates/NearMeLandingPageTemplate';
import { generateNearMeMetadata, generateNearMeContent } from '@/lib/seo/near-me-page-generator';

const pageData = {
  service: 'Personal Injury Attorney',
  serviceSlug: 'personal-injury-attorney',
  city: 'High Point',
  citySlug: 'high-point',
  state: 'NC',
  county: 'Guilford'
};

export const metadata: Metadata = generateNearMeMetadata(pageData);

export default function HighPointPersonalInjuryAttorneyNearMePage() {
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