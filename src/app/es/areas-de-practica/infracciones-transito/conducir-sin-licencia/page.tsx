import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Conducir sin Licencia | Vasquez Law Firm',
  description: 'Ayuda legal por conducir sin licencia válida',
  keywords: 'conducir sin licencia, abogado, servicios legales, infracciones transito',
};

export default function ConducirsinLicenciaPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="infracciones-transito"
      subArea="conducir-sin-licencia"
      language="es"
    />
  );
}
