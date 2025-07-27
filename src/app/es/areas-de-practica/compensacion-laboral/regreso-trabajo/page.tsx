import { Metadata } from 'next';
import { StandardizedPracticeAreaTemplate } from '@/components/templates/StandardizedPracticeAreaTemplate';

export const metadata: Metadata = {
  title: 'Regreso al Trabajo | Vasquez Law Firm',
  description: 'Navegando el regreso al trabajo después de una lesión laboral',
  keywords: 'regreso al trabajo, abogado, servicios legales, compensacion laboral',
};

export default function RegresoalTrabajoPage() {
  return (
    <StandardizedPracticeAreaTemplate
      practiceArea="compensacion-laboral"
      subArea="regreso-trabajo"
      language="es"
    />
  );
}
