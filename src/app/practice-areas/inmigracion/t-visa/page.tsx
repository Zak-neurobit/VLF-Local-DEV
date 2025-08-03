import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'T Visa | Vasquez Law Firm',
  description: 'Página en español para t-visa',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="T Visa"
      description="Esta página necesita ser traducida al español."
    />
  );
}
