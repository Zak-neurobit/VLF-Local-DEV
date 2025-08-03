import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Traffic Offenses | Vasquez Law Firm',
  description: 'Página en español para traffic-offenses',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Traffic Offenses"
      description="Esta página necesita ser traducida al español."
    />
  );
}
