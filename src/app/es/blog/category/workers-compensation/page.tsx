import { Metadata } from 'next';
import CategoryPageTemplate from '@/components/Blog/CategoryPageTemplate';
import { getCategorySEOData } from '@/lib/blog/categories';

export async function generateMetadata(): Promise<Metadata> {
  const seoData = getCategorySEOData('workers-compensation', 'es');
  
  return {
    title: seoData?.title || 'Blog de Compensación Laboral | Vasquez Law Firm, PLLC',
    description: seoData?.description || 'Reclamos por lesiones laborales, beneficios denegados, compensación por discapacidad y reclamos de terceros.',
    keywords: seoData?.keywords,
    alternates: {
      canonical: seoData?.canonical,
      languages: {
        es: '/es/blog/category/workers-compensation',
        en: '/blog/category/workers-compensation',
      },
    },
    openGraph: {
      ...seoData?.openGraph,
      locale: 'es_US',
    },
  };
}

export default function SpanishWorkersCompensationBlogCategory() {
  return <CategoryPageTemplate categoryId="workers-compensation" initialLanguage="es" />;
}