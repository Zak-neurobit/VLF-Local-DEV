import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Car Auto Accidents | Vasquez Law Firm',
  description: 'Página en español para car-auto-accidents',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Car Auto Accidents"
      description="Esta página necesita ser traducida al español."
    />
  );
}
