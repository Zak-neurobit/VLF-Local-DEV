import { Metadata } from 'next';
import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';

export const metadata: Metadata = {
  title: 'Product Liability | Vasquez Law Firm',
  description: 'Claims for injuries caused by defective products',
  keywords: 'product liability, personal injury, legal services, attorney, lawyer',
};

export default function ProductLiabilityPage() {
  return (
    <ModernPracticeAreaTemplateV2
      practiceArea="personal-injury"
      subArea="product-liability"
      language="en"
    />
  );
}
