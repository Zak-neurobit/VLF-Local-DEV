import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Violaciones CDL | Vasquez Law Firm',
  description: 'Defensa para violaciones de licencia de conducir comercial',
  keywords: 'violaciones cdl, abogado, servicios legales, infracciones transito',
};

export default function ViolacionesCDLPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="infracciones-transito"
      subArea="violaciones-cdl"
      language="es"
    />
  );
}
