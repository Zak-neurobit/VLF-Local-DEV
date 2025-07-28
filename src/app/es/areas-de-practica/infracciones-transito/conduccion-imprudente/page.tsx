import { Metadata } from 'next';
import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';

export const metadata: Metadata = {
  title: 'Conducción Imprudente | Vasquez Law Firm',
  description: 'Defensa legal para cargos de conducción imprudente',
  keywords: 'conducción imprudente, abogado, servicios legales, infracciones transito',
};

export default function ConduccinImprudentePage() {
  return (
    <StandardizedPracticeAreaTemplate
      practiceArea="infracciones-transito"
      subArea="conduccion-imprudente"
      language="es"
    />
  );
}
