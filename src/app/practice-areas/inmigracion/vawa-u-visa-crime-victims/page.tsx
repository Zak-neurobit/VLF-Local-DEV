import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vawa U Visa Crime Victims | Vasquez Law Firm',
  description: 'Página en español para vawa-u-visa-crime-victims',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Vawa U Visa Crime Victims"
      description="Esta página necesita ser traducida al español."
    />
  );
}
