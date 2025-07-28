import { Metadata } from 'next';
import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';

export const metadata: Metadata = {
  title: 'Custodia de Hijos | Vasquez Law Firm',
  description: 'Representación legal en casos de custodia de menores',
  keywords: 'custodia de hijos, abogado, servicios legales, derecho familia',
};

export default function CustodiadeHijosPage() {
  return (
    <StandardizedPracticeAreaTemplate
      practiceArea="derecho-familia"
      subArea="custodia-hijos"
      language="es"
    />
  );
}
