import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Family Law | Vasquez Law Firm',
  description: 'Página en español para family-law',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Family Law"
      description="Esta página necesita ser traducida al español."
    />
  );
}
