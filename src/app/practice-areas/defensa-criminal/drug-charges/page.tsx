import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Drug Charges | Vasquez Law Firm',
  description: 'Página en español para drug-charges',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Drug Charges"
      description="Esta página necesita ser traducida al español."
    />
  );
}
