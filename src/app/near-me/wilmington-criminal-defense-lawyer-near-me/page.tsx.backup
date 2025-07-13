import { Metadata } from 'next';
import { NearMeLandingPageTemplate } from '@/components/templates/NearMeLandingPageTemplate';
import { generateNearMeMetadata, generateNearMeContent } from '@/lib/seo/near-me-page-generator';

const pageData = {
  service: 'Criminal Defense Lawyer',
  serviceSlug: 'criminal-defense-lawyer',
  city: 'Wilmington',
  citySlug: 'wilmington',
  state: 'NC',
  county: 'New Hanover'
};

export const metadata: Metadata = generateNearMeMetadata(pageData);

export default function WilmingtonCriminalDefenseLawyerNearMePage() {
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