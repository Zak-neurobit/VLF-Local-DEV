import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alimony | Vasquez Law Firm',
  description: 'Página en español para alimony',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Alimony"
      description="Esta página necesita ser traducida al español."
    />
  );
}
