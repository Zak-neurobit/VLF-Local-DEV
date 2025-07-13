import { Metadata } from 'next';
import { NearMeLandingPageTemplate } from '@/components/templates/NearMeLandingPageTemplate';
import { generateNearMeMetadata, generateNearMeContent } from '@/lib/seo/near-me-page-generator';

const pageData = {
  service: 'Criminal Defense Lawyer',
  serviceSlug: 'criminal-defense-lawyer',
  city: 'Fayetteville',
  citySlug: 'fayetteville',
  state: 'NC',
  county: 'Cumberland'
};

export const metadata: Metadata = generateNearMeMetadata(pageData);

export default function FayettevilleCriminalDefenseLawyerNearMePage() {
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