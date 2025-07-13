import { Metadata } from 'next';
import CategoryPageTemplate from '@/components/Blog/CategoryPageTemplate';
import { getCategorySEOData } from '@/lib/blog/categories';

export async function generateMetadata(): Promise<Metadata> {
  const seoData = getCategorySEOData('immigration', 'en');
  
  return {
    title: seoData?.title || 'Immigration Law Blog | Vasquez Law Firm, PLLC',
    description: seoData?.description || 'Expert insights on immigration law, visa applications, deportation defense, and citizenship.',
    keywords: seoData?.keywords,
    alternates: {
      canonical: seoData?.canonical,
    },
    openGraph: seoData?.openGraph,
  };
}

export default function ImmigrationBlogCategory() {
  return <CategoryPageTemplate categoryId="immigration" />;
}