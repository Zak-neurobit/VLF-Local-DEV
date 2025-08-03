import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Expungement | Vasquez Law Firm',
  description: 'Página en español para expungement',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Expungement"
      description="Esta página necesita ser traducida al español."
    />
  );
}
