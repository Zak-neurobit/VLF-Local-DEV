import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Asylum Refugee Legal Help | Vasquez Law Firm',
  description: 'Página en español para asylum-refugee-legal-help',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Asylum Refugee Legal Help"
      description="Esta página necesita ser traducida al español."
    />
  );
}

export const runtime = 'edge';
