import { Metadata } from 'next';
import CategoryPageTemplate from '@/components/Blog/CategoryPageTemplate';
import { getCategorySEOData } from '@/lib/blog/categories';

export async function generateMetadata(): Promise<Metadata> {
  const seoData = getCategorySEOData('family-law', 'es');
  
  return {
    title: seoData?.title || 'Blog de Derecho Familiar | Vasquez Law Firm, PLLC',
    description: seoData?.description || 'Divorcio, custodia de menores, pensión alimenticia, división de propiedades y protección contra violencia doméstica.',
    keywords: seoData?.keywords,
    alternates: {
      canonical: seoData?.canonical,
      languages: {
        es: '/es/blog/category/family-law',
        en: '/blog/category/family-law',
      },
    },
    openGraph: {
      ...seoData?.openGraph,
      locale: 'es_US',
    },
  };
}

export default function SpanishFamilyLawBlogCategory() {
  return <CategoryPageTemplate categoryId="family-law" initialLanguage="es" />;
}