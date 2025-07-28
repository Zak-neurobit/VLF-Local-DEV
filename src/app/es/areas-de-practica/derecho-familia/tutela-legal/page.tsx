import { Metadata } from 'next';
import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';

export const metadata: Metadata = {
  title: 'Tutela Legal | Vasquez Law Firm',
  description: 'Establecimiento de tutela legal para menores o adultos incapacitados',
  keywords: 'tutela legal, abogado, servicios legales, derecho familia',
};

export default function TutelaLegalPage() {
  return (
    <StandardizedPracticeAreaTemplate
      practiceArea="derecho-familia"
      subArea="tutela-legal"
      language="es"
    />
  );
}
