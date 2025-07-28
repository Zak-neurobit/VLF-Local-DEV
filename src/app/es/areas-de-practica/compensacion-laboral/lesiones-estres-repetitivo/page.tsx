import { Metadata } from 'next';
import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';

export const metadata: Metadata = {
  title: 'Lesiones por Estrés Repetitivo | Vasquez Law Firm',
  description: 'Reclamos por túnel carpiano y otras lesiones por esfuerzo repetitivo',
  keywords: 'lesiones por estrés repetitivo, abogado, servicios legales, compensacion laboral',
};

export default function LesionesporEstrsRepetitivoPage() {
  return (
    <StandardizedPracticeAreaTemplate
      practiceArea="compensacion-laboral"
      subArea="lesiones-estres-repetitivo"
      language="es"
    />
  );
}
