import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Deportation Removal Defense | Vasquez Law Firm',
  description: 'Página en español para deportation-removal-defense',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Deportation Removal Defense"
      description="Esta página necesita ser traducida al español."
    />
  );
}

export const runtime = 'edge';
