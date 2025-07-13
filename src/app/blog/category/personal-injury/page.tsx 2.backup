import { Metadata } from 'next';
import CategoryPageTemplate from '@/components/Blog/CategoryPageTemplate';
import { getCategorySEOData } from '@/lib/blog/categories';

export async function generateMetadata(): Promise<Metadata> {
  const seoData = getCategorySEOData('personal-injury', 'en');
  
  return {
    title: seoData?.title || 'Personal Injury Blog | Vasquez Law Firm, PLLC',
    description: seoData?.description || 'Legal guidance on car accidents, slip and falls, medical malpractice, and injury compensation.',
    keywords: seoData?.keywords,
    alternates: {
      canonical: seoData?.canonical,
    },
    openGraph: seoData?.openGraph,
  };
}

export default function PersonalInjuryBlogCategory() {
  return <CategoryPageTemplate categoryId="personal-injury" />;
}