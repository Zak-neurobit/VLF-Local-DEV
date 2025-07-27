import { Metadata } from 'next';
import { StandardizedPracticeAreaTemplate } from '@/components/templates/StandardizedPracticeAreaTemplate';

export const metadata: Metadata = {
  title: 'Acuerdos Prenupciales | Vasquez Law Firm',
  description: 'Creación y revisión de acuerdos prenupciales',
  keywords: 'acuerdos prenupciales, abogado, servicios legales, derecho familia',
};

export default function AcuerdosPrenupcialesPage() {
  return (
    <StandardizedPracticeAreaTemplate
      practiceArea="derecho-familia"
      subArea="acuerdos-prenupciales"
      language="es"
    />
  );
}
