import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Responsabilidad de Producto | Vasquez Law Firm',
  description: 'Reclamos por lesiones causadas por productos defectuosos',
  keywords: 'responsabilidad de producto, abogado, servicios legales, lesiones personales',
};

export default function ResponsabilidaddeProductoPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="lesiones-personales"
      subArea="responsabilidad-producto"
      language="es"
    />
  );
}
