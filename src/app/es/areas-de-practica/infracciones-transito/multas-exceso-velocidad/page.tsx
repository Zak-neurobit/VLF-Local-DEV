import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Multas por Exceso de Velocidad | Vasquez Law Firm',
  description: 'Defensa contra multas de velocidad y violaciones de tráfico',
  keywords: 'multas por exceso de velocidad, abogado, servicios legales, infracciones transito',
};

export default function MultasporExcesodeVelocidadPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="infracciones-transito"
      subArea="multas-exceso-velocidad"
      language="es"
    />
  );
}
