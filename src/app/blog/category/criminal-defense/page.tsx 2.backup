import { Metadata } from 'next';
import CategoryPageTemplate from '@/components/Blog/CategoryPageTemplate';
import { getCategorySEOData } from '@/lib/blog/categories';

export async function generateMetadata(): Promise<Metadata> {
  const seoData = getCategorySEOData('criminal-defense', 'en');
  
  return {
    title: seoData?.title || 'Criminal Defense Blog | Vasquez Law Firm, PLLC',
    description: seoData?.description || 'Understanding your rights in DWI/DUI cases, drug charges, assault, and other criminal matters.',
    keywords: seoData?.keywords,
    alternates: {
      canonical: seoData?.canonical,
    },
    openGraph: seoData?.openGraph,
  };
}

export default function CriminalDefenseBlogCategory() {
  return <CategoryPageTemplate categoryId="criminal-defense" />;
}