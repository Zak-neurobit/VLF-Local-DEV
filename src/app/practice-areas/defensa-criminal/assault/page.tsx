import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
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
