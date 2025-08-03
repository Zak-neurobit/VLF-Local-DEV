import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Beneficios por Discapacidad | Vasquez Law Firm',
  description: 'Asegurar beneficios por discapacidad por lesiones laborales',
  keywords: 'beneficios por discapacidad, abogado, servicios legales, compensacion laboral',
};

export default function BeneficiosporDiscapacidadPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="compensacion-laboral"
      subArea="beneficios-discapacidad"
      language="es"
    />
  );
}
