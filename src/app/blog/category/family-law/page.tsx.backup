import { Metadata } from 'next';
import CategoryPageTemplate from '@/components/Blog/CategoryPageTemplate';
import { getCategorySEOData } from '@/lib/blog/categories';

export async function generateMetadata(): Promise<Metadata> {
  const seoData = getCategorySEOData('family-law', 'en');
  
  return {
    title: seoData?.title || 'Family Law Blog | Vasquez Law Firm, PLLC',
    description: seoData?.description || 'Divorce, child custody, alimony, property division, and domestic violence protection.',
    keywords: seoData?.keywords,
    alternates: {
      canonical: seoData?.canonical,
    },
    openGraph: seoData?.openGraph,
  };
}

export default function FamilyLawBlogCategory() {
  return <CategoryPageTemplate categoryId="family-law" />;
}