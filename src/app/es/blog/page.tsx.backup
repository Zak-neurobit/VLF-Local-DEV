import { Metadata } from 'next';
import BlogPageClient from '@/app/blog/BlogPageClient';
import { BlogListStructuredData } from '@/components/Blog/BlogStructuredData';

export const metadata: Metadata = {
  title: 'Blog Legal | Perspectivas y Noticias de Expertos | Bufete de Abogados Vasquez',
  description:
    'Manténgase informado con análisis legal experto sobre inmigración, lesiones personales, defensa criminal, compensación laboral y derecho familiar en Carolina del Norte y Florida.',
  keywords:
    'blog legal, derecho de inmigración, lesiones personales, defensa criminal, compensación laboral, derecho familiar, abogado de Carolina del Norte, abogado de Florida, asesoría legal',
  openGraph: {
    title: 'Blog Legal | Bufete de Abogados Vasquez',
    description:
      'Perspectivas legales expertas y actualizaciones para Carolina del Norte y Florida',
    type: 'website',
    url: 'https://www.vasquezlawnc.com/es/blog',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/blog-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Blog Legal del Bufete de Abogados Vasquez',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Legal | Bufete de Abogados Vasquez',
    description: 'Perspectivas legales expertas sobre inmigración, lesiones personales y más',
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/blog',
    languages: {
      en: '/blog',
      es: '/es/blog',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function BlogPage() {
  return (
    <>
      <BlogListStructuredData language="es" />
      <BlogPageClient language="es" />
    </>
  );
}
