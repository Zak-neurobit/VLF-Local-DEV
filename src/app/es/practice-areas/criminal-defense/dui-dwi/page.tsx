import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dui Dwi | Vasquez Law Firm',
  description: 'Página en español para dui-dwi',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Dui Dwi"
      description="Esta página necesita ser traducida al español."
    />
  );
}

export const runtime = 'edge';
