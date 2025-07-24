import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Daca Deferred Action Childhood Arrivals | Vasquez Law Firm',
  description: 'Página en español para daca-deferred-action-childhood-arrivals',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Daca Deferred Action Childhood Arrivals"
      description="Esta página necesita ser traducida al español."
    />
  );
}

export const runtime = 'edge';
