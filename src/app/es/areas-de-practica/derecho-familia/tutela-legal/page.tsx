import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Tutela Legal | Vasquez Law Firm',
  description: 'Establecimiento de tutela legal para menores o adultos incapacitados',
  keywords: 'tutela legal, abogado, servicios legales, derecho familia',
};

export default function TutelaLegalPage() {
  return (
    <PracticeAreaWrapper practiceArea="derecho-familia" subArea="tutela-legal" language="es" />
  );
}
