import { Metadata } from 'next';
import { StandardizedPracticeAreaTemplate } from '@/components/templates/StandardizedPracticeAreaTemplate';

export const metadata: Metadata = {
  title: 'Responsabilidad de Producto | Vasquez Law Firm',
  description: 'Reclamos por lesiones causadas por productos defectuosos',
  keywords: 'responsabilidad de producto, abogado, servicios legales, lesiones personales',
};

export default function ResponsabilidaddeProductoPage() {
  return (
    <StandardizedPracticeAreaTemplate
      practiceArea="lesiones-personales"
      subArea="responsabilidad-producto"
      language="es"
    />
  );
}
