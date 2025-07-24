import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Assault | Vasquez Law Firm',
  description: 'Página en español para assault',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Assault"
      description="Esta página necesita ser traducida al español."
    />
  );
}

export const runtime = 'edge';
