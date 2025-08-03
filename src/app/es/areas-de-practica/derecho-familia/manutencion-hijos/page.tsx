import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Manutención de Hijos | Vasquez Law Firm',
  description: 'Asistencia legal para establecer o modificar la manutención infantil',
  keywords: 'manutención de hijos, abogado, servicios legales, derecho familia',
};

export default function ManutencindeHijosPage() {
  return (
    <PracticeAreaWrapper practiceArea="derecho-familia" subArea="manutencion-hijos" language="es" />
  );
}
