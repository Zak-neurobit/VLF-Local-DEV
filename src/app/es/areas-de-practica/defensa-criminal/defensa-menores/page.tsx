import { Metadata } from 'next';
import { StandardizedPracticeAreaTemplate } from '@/components/templates/StandardizedPracticeAreaTemplate';

export const metadata: Metadata = {
  title: 'Defensa de Menores | Vasquez Law Firm',
  description: 'Defensa criminal para menores en corte juvenil',
  keywords: 'defensa de menores, abogado, servicios legales, defensa criminal',
};

export default function DefensadeMenoresPage() {
  return (
    <StandardizedPracticeAreaTemplate
      practiceArea="defensa-criminal"
      subArea="defensa-menores"
      language="es"
    />
  );
}
