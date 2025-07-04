import { Metadata } from 'next';
import CategoryPageTemplate from '@/components/Blog/CategoryPageTemplate';
import { getCategorySEOData } from '@/lib/blog/categories';

export async function generateMetadata(): Promise<Metadata> {
  const seoData = getCategorySEOData('traffic-violations', 'es');
  
  return {
    title: seoData?.title || 'Blog de Infracciones de Tráfico | Vasquez Law Firm, PLLC',
    description: seoData?.description || 'Multas por exceso de velocidad, restauración de licencia, conducción imprudente y representación en corte de tráfico.',
    keywords: seoData?.keywords,
    alternates: {
      canonical: seoData?.canonical,
      languages: {
        es: '/es/blog/category/traffic-violations',
        en: '/blog/category/traffic-violations',
      },
    },
    openGraph: {
      ...seoData?.openGraph,
      locale: 'es_US',
    },
  };
}

export default function SpanishTrafficViolationsBlogCategory() {
  return <CategoryPageTemplate categoryId="traffic-violations" initialLanguage="es" />;
}