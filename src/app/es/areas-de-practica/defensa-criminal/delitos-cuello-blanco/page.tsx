import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Delitos de Cuello Blanco | Vasquez Law Firm',
  description: 'Defensa contra fraude, malversación y delitos financieros',
  keywords: 'delitos de cuello blanco, abogado, servicios legales, defensa criminal',
};

export default function DelitosdeCuelloBlancoPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="defensa-criminal"
      subArea="delitos-cuello-blanco"
      language="es"
    />
  );
}
