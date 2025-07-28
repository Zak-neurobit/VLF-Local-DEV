import { Metadata } from 'next';
import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';

export const metadata: Metadata = {
  title: 'Beneficios por Discapacidad | Vasquez Law Firm',
  description: 'Asegurar beneficios por discapacidad por lesiones laborales',
  keywords: 'beneficios por discapacidad, abogado, servicios legales, compensacion laboral',
};

export default function BeneficiosporDiscapacidadPage() {
  return (
    <StandardizedPracticeAreaTemplate
      practiceArea="compensacion-laboral"
      subArea="beneficios-discapacidad"
      language="es"
    />
  );
}
