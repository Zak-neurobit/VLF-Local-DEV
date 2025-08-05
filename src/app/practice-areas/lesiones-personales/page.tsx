import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Personal Injury | Vasquez Law Firm',
  description: 'Página en español para personal-injury',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Personal Injury"
      description="Esta página necesita ser traducida al español."
    />
  );
}
