import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Defensa de Menores | Vasquez Law Firm',
  description: 'Defensa criminal para menores en corte juvenil',
  keywords: 'defensa de menores, abogado, servicios legales, defensa criminal',
};

export default function DefensadeMenoresPage() {
  return (
    <PracticeAreaWrapper practiceArea="defensa-criminal" subArea="defensa-menores" language="es" />
  );
}
