import { Metadata } from 'next';
import CategoryPageTemplate from '@/components/Blog/CategoryPageTemplate';
import { getCategorySEOData } from '@/lib/blog/categories';

export async function generateMetadata(): Promise<Metadata> {
  const seoData = getCategorySEOData('personal-injury', 'es');
  
  return {
    title: seoData?.title || 'Blog de Lesiones Personales | Vasquez Law Firm, PLLC',
    description: seoData?.description || 'Orientación legal sobre accidentes automovilísticos, resbalones y caídas, mala práctica médica y compensación por lesiones.',
    keywords: seoData?.keywords,
    alternates: {
      canonical: seoData?.canonical,
      languages: {
        es: '/es/blog/category/personal-injury',
        en: '/blog/category/personal-injury',
      },
    },
    openGraph: {
      ...seoData?.openGraph,
      locale: 'es_US',
    },
  };
}

export default function SpanishPersonalInjuryBlogCategory() {
  return <CategoryPageTemplate categoryId="personal-injury" initialLanguage="es" />;
}