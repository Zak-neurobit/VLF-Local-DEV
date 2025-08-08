import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Citizenship Naturalization | Vasquez Law Firm',
  description: 'Página en español para citizenship-naturalization',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Citizenship Naturalization"
      description="Esta página necesita ser traducida al español."
    />
  );
}
