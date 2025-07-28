import { Metadata } from 'next';
import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';

export const metadata: Metadata = {
  title: 'Violaciones CDL | Vasquez Law Firm',
  description: 'Defensa para violaciones de licencia de conducir comercial',
  keywords: 'violaciones cdl, abogado, servicios legales, infracciones transito',
};

export default function ViolacionesCDLPage() {
  return (
    <StandardizedPracticeAreaTemplate
      practiceArea="infracciones-transito"
      subArea="violaciones-cdl"
      language="es"
    />
  );
}
