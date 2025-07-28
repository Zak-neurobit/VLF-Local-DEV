import { Metadata } from 'next';
import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';

export const metadata: Metadata = {
  title: 'Representación en Corte de Tráfico | Vasquez Law Firm',
  description: 'Representación profesional en corte de tráfico',
  keywords: 'representación en corte de tráfico, abogado, servicios legales, infracciones transito',
};

export default function RepresentacinenCortedeTrficoPage() {
  return (
    <StandardizedPracticeAreaTemplate
      practiceArea="infracciones-transito"
      subArea="representacion-corte-trafico"
      language="es"
    />
  );
}
