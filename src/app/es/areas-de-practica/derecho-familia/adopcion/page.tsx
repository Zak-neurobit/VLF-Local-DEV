import { Metadata } from 'next';
import { StandardizedPracticeAreaTemplate } from '@/components/templates/StandardizedPracticeAreaTemplate';

export const metadata: Metadata = {
  title: 'Adopción | Vasquez Law Firm',
  description: 'Asistencia legal con procedimientos de adopción',
  keywords: 'adopción, abogado, servicios legales, derecho familia',
};

export default function AdopcinPage() {
  return (
    <StandardizedPracticeAreaTemplate
      practiceArea="derecho-familia"
      subArea="adopcion"
      language="es"
    />
  );
}
