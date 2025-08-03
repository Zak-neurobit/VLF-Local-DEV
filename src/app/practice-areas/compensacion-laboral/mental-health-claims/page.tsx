import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Mental Health Claims | Vasquez Law Firm',
  description: 'Página en español para mental-health-claims',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Mental Health Claims"
      description="Esta página necesita ser traducida al español."
    />
  );
}
