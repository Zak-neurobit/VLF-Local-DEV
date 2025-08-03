import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Theft | Vasquez Law Firm',
  description: 'Página en español para theft',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Theft"
      description="Esta página necesita ser traducida al español."
    />
  );
}
