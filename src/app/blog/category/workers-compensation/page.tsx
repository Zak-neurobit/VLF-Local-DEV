import { Metadata } from 'next';
import CategoryPageTemplate from '@/components/Blog/CategoryPageTemplate';
import { getCategorySEOData } from '@/lib/blog/categories';

export async function generateMetadata(): Promise<Metadata> {
  const seoData = getCategorySEOData('workers-compensation', 'en');
  
  return {
    title: seoData?.title || 'Workers\' Compensation Blog | Vasquez Law Firm, PLLC',
    description: seoData?.description || 'Workplace injury claims, denied benefits, disability compensation, and third-party claims.',
    keywords: seoData?.keywords,
    alternates: {
      canonical: seoData?.canonical,
    },
    openGraph: seoData?.openGraph,
  };
}

export default function WorkersCompensationBlogCategory() {
  return <CategoryPageTemplate categoryId="workers-compensation" />;
}