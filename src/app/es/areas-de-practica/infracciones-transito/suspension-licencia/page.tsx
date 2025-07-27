import { Metadata } from 'next';
import { StandardizedPracticeAreaTemplate } from '@/components/templates/StandardizedPracticeAreaTemplate';

export const metadata: Metadata = {
  title: 'Suspensión de Licencia | Vasquez Law Firm',
  description: 'Luchando contra la suspensión de licencia y restauración',
  keywords: 'suspensión de licencia, abogado, servicios legales, infracciones transito',
};

export default function SuspensindeLicenciaPage() {
  return (
    <StandardizedPracticeAreaTemplate
      practiceArea="infracciones-transito"
      subArea="suspension-licencia"
      language="es"
    />
  );
}
