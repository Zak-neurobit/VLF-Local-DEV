import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Conducción Imprudente | Vasquez Law Firm',
  description: 'Defensa legal para cargos de conducción imprudente',
  keywords: 'conducción imprudente, abogado, servicios legales, infracciones transito',
};

export default function ConduccinImprudentePage() {
  return (
    <PracticeAreaWrapper
      practiceArea="infracciones-transito"
      subArea="conduccion-imprudente"
      language="es"
    />
  );
}
