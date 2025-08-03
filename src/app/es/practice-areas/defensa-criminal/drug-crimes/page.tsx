import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Drug Crimes | Vasquez Law Firm',
  description: 'Página en español para drug-crimes',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Drug Crimes"
      description="Esta página necesita ser traducida al español."
    />
  );
}
