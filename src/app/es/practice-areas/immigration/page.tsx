import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Immigration | Vasquez Law Firm',
  description: 'Página en español para immigration',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Immigration"
      description="Esta página necesita ser traducida al español."
    />
  );
}

export const runtime = 'edge';
