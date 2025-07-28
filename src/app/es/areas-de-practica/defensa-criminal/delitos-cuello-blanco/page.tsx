import { Metadata } from 'next';
import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';

export const metadata: Metadata = {
  title: 'Delitos de Cuello Blanco | Vasquez Law Firm',
  description: 'Defensa contra fraude, malversación y delitos financieros',
  keywords: 'delitos de cuello blanco, abogado, servicios legales, defensa criminal',
};

export default function DelitosdeCuelloBlancoPage() {
  return (
    <StandardizedPracticeAreaTemplate
      practiceArea="defensa-criminal"
      subArea="delitos-cuello-blanco"
      language="es"
    />
  );
}
