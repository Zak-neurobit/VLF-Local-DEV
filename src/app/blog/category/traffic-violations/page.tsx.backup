import { Metadata } from 'next';
import CategoryPageTemplate from '@/components/Blog/CategoryPageTemplate';
import { getCategorySEOData } from '@/lib/blog/categories';

export async function generateMetadata(): Promise<Metadata> {
  const seoData = getCategorySEOData('traffic-violations', 'en');
  
  return {
    title: seoData?.title || 'Traffic Violations Blog | Vasquez Law Firm, PLLC',
    description: seoData?.description || 'Speeding tickets, license restoration, reckless driving, and traffic court representation.',
    keywords: seoData?.keywords,
    alternates: {
      canonical: seoData?.canonical,
    },
    openGraph: seoData?.openGraph,
  };
}

export default function TrafficViolationsBlogCategory() {
  return <CategoryPageTemplate categoryId="traffic-violations" />;
}