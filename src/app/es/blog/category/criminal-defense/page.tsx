import { Metadata } from 'next';
import CategoryPageTemplate from '@/components/Blog/CategoryPageTemplate';
import { getCategorySEOData } from '@/lib/blog/categories';

export async function generateMetadata(): Promise<Metadata> {
  const seoData = getCategorySEOData('criminal-defense', 'es');
  
  return {
    title: seoData?.title || 'Blog de Defensa Criminal | Vasquez Law Firm, PLLC',
    description: seoData?.description || 'Comprenda sus derechos en casos de DWI/DUI, cargos de drogas, asalto y otros asuntos criminales.',
    keywords: seoData?.keywords,
    alternates: {
      canonical: seoData?.canonical,
      languages: {
        es: '/es/blog/category/criminal-defense',
        en: '/blog/category/criminal-defense',
      },
    },
    openGraph: {
      ...seoData?.openGraph,
      locale: 'es_US',
    },
  };
}

export default function SpanishCriminalDefenseBlogCategory() {
  return <CategoryPageTemplate categoryId="criminal-defense" initialLanguage="es" />;
}