import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Protección contra Violencia Doméstica | Vasquez Law Firm',
  description: 'Órdenes de protección y asistencia legal contra el abuso',
  keywords: 'protección contra violencia doméstica, abogado, servicios legales, derecho familia',
};

export default function ProteccincontraViolenciaDomsticaPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="derecho-familia"
      subArea="proteccion-violencia-domestica"
      language="es"
    />
  );
}
