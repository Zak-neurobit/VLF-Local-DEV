import { Metadata } from 'next';
import { StandardizedPracticeAreaTemplate } from '@/components/templates/StandardizedPracticeAreaTemplate';

export const metadata: Metadata = {
  title: 'Protección contra Violencia Doméstica | Vasquez Law Firm',
  description: 'Órdenes de protección y asistencia legal contra el abuso',
  keywords: 'protección contra violencia doméstica, abogado, servicios legales, derecho familia',
};

export default function ProteccincontraViolenciaDomsticaPage() {
  return (
    <StandardizedPracticeAreaTemplate
      practiceArea="derecho-familia"
      subArea="proteccion-violencia-domestica"
      language="es"
    />
  );
}
