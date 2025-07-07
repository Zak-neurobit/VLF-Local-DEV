import { Metadata } from 'next';
import { MasterLayout } from '@/design-system/templates/MasterLayout';
import ContactPageContent from '@/components/ContactPageContent';

export const metadata: Metadata = {
  title: 'Contact Us | Free Consultation 24/7 | Vasquez Law Firm',
  description: 'Contact Vasquez Law Firm for a free consultation. Available 24/7 with AI assistant. Offices in NC & FL. Call 1-844-YO-PELEO or chat now.',
  keywords: 'contact immigration lawyer, free consultation, 24/7 legal help, immigration attorney near me, personal injury lawyer contact',
};

export default function ContactPage() {
  return (
    <MasterLayout variant="hero" showBreadcrumbs={false}>
      <ContactPageContent />
    </MasterLayout>
  );
}
