import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Theft Property Crimes | Vasquez Law Firm',
  description: 'Página en español para theft-property-crimes',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Theft Property Crimes"
      description="Esta página necesita ser traducida al español."
    />
  );
}
