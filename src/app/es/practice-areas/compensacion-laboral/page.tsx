import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Workers Compensation | Vasquez Law Firm',
  description: 'Página en español para workers-compensation',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Workers Compensation"
      description="Esta página necesita ser traducida al español."
    />
  );
}
