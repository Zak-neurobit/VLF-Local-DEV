import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
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
