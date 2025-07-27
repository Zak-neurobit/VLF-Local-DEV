import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dui | Vasquez Law Firm',
  description: 'Página en español para dui',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Dui"
      description="Esta página necesita ser traducida al español."
    />
  );
}
