import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Pedestrian Accidents | Vasquez Law Firm',
  description: 'Página en español para pedestrian-accidents',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Pedestrian Accidents"
      description="Esta página necesita ser traducida al español."
    />
  );
}
