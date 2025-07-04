import { Metadata } from 'next';
import CategoryPageTemplate from '@/components/Blog/CategoryPageTemplate';
import { getCategorySEOData } from '@/lib/blog/categories';

export async function generateMetadata(): Promise<Metadata> {
  const seoData = getCategorySEOData('immigration', 'es');
  
  return {
    title: seoData?.title || 'Blog de Ley de Inmigración | Vasquez Law Firm, PLLC',
    description: seoData?.description || 'Perspectivas expertas sobre visas, tarjetas verdes, ciudadanía, defensa de deportación y cambios en políticas migratorias.',
    keywords: seoData?.keywords,
    alternates: {
      canonical: seoData?.canonical,
      languages: {
        es: '/es/blog/category/immigration',
        en: '/blog/category/immigration',
      },
    },
    openGraph: {
      ...seoData?.openGraph,
      locale: 'es_US',
    },
  };
}

export default function SpanishImmigrationBlogCategory() {
  return <CategoryPageTemplate categoryId="immigration" initialLanguage="es" />;
}