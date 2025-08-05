import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Property Division | Vasquez Law Firm',
  description: 'Página en español para property-division',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Property Division"
      description="Esta página necesita ser traducida al español."
    />
  );
}
