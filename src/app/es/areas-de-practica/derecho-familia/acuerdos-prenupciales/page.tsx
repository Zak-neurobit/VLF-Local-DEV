import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Acuerdos Prenupciales | Vasquez Law Firm',
  description: 'Creación y revisión de acuerdos prenupciales',
  keywords: 'acuerdos prenupciales, abogado, servicios legales, derecho familia',
};

export default function AcuerdosPrenupcialesPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="derecho-familia"
      subArea="acuerdos-prenupciales"
      language="es"
    />
  );
}
