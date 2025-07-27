import { Metadata } from 'next';
import { StandardizedPracticeAreaTemplate } from '@/components/templates/StandardizedPracticeAreaTemplate';

export const metadata: Metadata = {
  title: 'Manutención de Hijos | Vasquez Law Firm',
  description: 'Asistencia legal para establecer o modificar la manutención infantil',
  keywords: 'manutención de hijos, abogado, servicios legales, derecho familia',
};

export default function ManutencindeHijosPage() {
  return (
    <StandardizedPracticeAreaTemplate
      practiceArea="derecho-familia"
      subArea="manutencion-hijos"
      language="es"
    />
  );
}
