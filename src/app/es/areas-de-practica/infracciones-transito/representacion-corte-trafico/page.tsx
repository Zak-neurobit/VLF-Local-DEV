import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Representación en Corte de Tráfico | Vasquez Law Firm',
  description: 'Representación profesional en corte de tráfico',
  keywords: 'representación en corte de tráfico, abogado, servicios legales, infracciones transito',
};

export default function RepresentacinenCortedeTrficoPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="infracciones-transito"
      subArea="representacion-corte-trafico"
      language="es"
    />
  );
}
