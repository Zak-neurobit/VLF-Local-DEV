import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Adjustment Of Status | Vasquez Law Firm',
  description: 'Página en español para adjustment-of-status',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Adjustment Of Status"
      description="Esta página necesita ser traducida al español."
    />
  );
}
