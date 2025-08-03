import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Domestic Violence Protection | Vasquez Law Firm',
  description: 'Obtaining protective orders and legal protection from abuse',
  keywords: 'domestic violence protection, family law, legal services, attorney, lawyer',
};

export default function DomesticViolenceProtectionPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="family-law"
      subArea="domestic-violence-protection"
      language="en"
    />
  );
}
