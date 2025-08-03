import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

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
