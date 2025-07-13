import { Metadata } from 'next';
import { NearMeLandingPageTemplate } from '@/components/templates/NearMeLandingPageTemplate';
import { generateNearMeMetadata, generateNearMeContent } from '@/lib/seo/near-me-page-generator';

const pageData = {
  service: 'Spanish Speaking Lawyer',
  serviceSlug: 'spanish-speaking-lawyer',
  city: 'Fayetteville',
  citySlug: 'fayetteville',
  state: 'NC',
  county: 'Cumberland'
};

export const metadata: Metadata = generateNearMeMetadata(pageData);

export default function FayettevilleSpanishSpeakingLawyerNearMePage() {
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