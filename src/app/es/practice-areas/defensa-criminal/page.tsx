import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Criminal Defense | Vasquez Law Firm',
  description: 'Página en español para criminal-defense',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Criminal Defense"
      description="Esta página necesita ser traducida al español."
    />
  );
}
