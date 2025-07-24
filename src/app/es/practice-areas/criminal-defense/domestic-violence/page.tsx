import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Domestic Violence | Vasquez Law Firm',
  description: 'Página en español para domestic-violence',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Domestic Violence"
      description="Esta página necesita ser traducida al español."
    />
  );
}

export const runtime = 'edge';
