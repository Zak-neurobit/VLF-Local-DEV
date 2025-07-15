import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

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
};

export const runtime = 'nodejs';

export default function BlogPage() {
  const posts = [
    {
      id: 'deportacion-5-pasos-urgentes-que-debes-tomar-hoy',
      title: 'Deportación: 5 Pasos Urgentes que Debes Tomar HOY',
      slug: 'deportacion-5-pasos-urgentes-que-debes-tomar-hoy',
      excerpt: 'Guía de emergencia militar para enfrentar la deportación. Cada minuto cuenta. Estrategias probadas de abogado veterano que YO PELEO POR TI™.',
      practiceArea: 'immigration' as const,
      language: 'es' as const,
      publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      readTime: 12,
      author: DEFAULT_BLOG_AUTHOR,
      tags: ['deportación', 'inmigración', 'ICE', 'emergencia'],
    },
    {
      id: 'guia-completa-residencia-permanente-2024',
      title: 'Guía Completa de Residencia Permanente 2024',
      slug: 'guia-completa-residencia-permanente-2024',
      excerpt: 'La guía definitiva para obtener tu Green Card en 2024. Requisitos actualizados, tiempos de espera reales y estrategias probadas de abogado veterano.',
      practiceArea: 'immigration' as const,
      language: 'es' as const,
      publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      readTime: 20,
      author: DEFAULT_BLOG_AUTHOR,
      tags: ['residencia permanente', 'green card', 'inmigración'],
    },
    {
      id: 'ciudadania-americana-tu-camino-paso-a-paso',
      title: 'Ciudadanía Americana: Tu Camino Paso a Paso',
      slug: 'ciudadania-americana-tu-camino-paso-a-paso',
      excerpt: 'La guía definitiva para convertirte en ciudadano americano en 2024. Requisitos actualizados, preparación para el examen y estrategias de éxito garantizado.',
      practiceArea: 'immigration' as const,
      language: 'es' as const,
      publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      readTime: 18,
      author: DEFAULT_BLOG_AUTHOR,
      tags: ['ciudadanía', 'naturalización', 'examen ciudadanía'],
    },
    {
      id: 'daca-todo-lo-que-necesitas-saber-2024',
      title: 'DACA: Todo lo que Necesitas Saber en 2024',
      slug: 'daca-todo-lo-que-necesitas-saber-2024',
      excerpt: 'La guía definitiva sobre DACA en 2024. Renovaciones, requisitos actualizados, derechos laborales y estrategias de protección de un abogado veterano.',
      practiceArea: 'immigration' as const,
      language: 'es' as const,
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      readTime: 15,
      author: DEFAULT_BLOG_AUTHOR,
      tags: ['DACA', 'dreamers', 'renovación DACA'],
    },
    {
      id: 'accidentes-auto-que-hacer-inmediatamente-despues',
      title: 'Accidentes de Auto: Qué Hacer Inmediatamente Después',
      slug: 'accidentes-auto-que-hacer-inmediatamente-despues',
      excerpt: 'Guía completa de emergencia con los pasos críticos que debes tomar inmediatamente después de un accidente automovilístico para proteger tu salud, tus derechos y tu compensación.',
      practiceArea: 'personal-injury' as const,
      language: 'es' as const,
      publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      readTime: 15,
      author: DEFAULT_BLOG_AUTHOR,
      tags: ['accidentes de auto', 'lesiones personales', 'compensación'],
    },
  ];

  const categories = [
    {
      id: 'immigration',
      name: { en: 'Immigration Law', es: 'Ley de Inmigración' },
      slug: { en: 'immigration', es: 'inmigracion' },
      icon: '🌐',
      postCount: 45,
    },
    {
      id: 'personal-injury',
      name: { en: 'Personal Injury', es: 'Lesiones Personales' },
      slug: { en: 'personal-injury', es: 'lesiones-personales' },
      icon: '🏥',
      postCount: 32,
    },
    {
      id: 'criminal-defense',
      name: { en: 'Criminal Defense', es: 'Defensa Criminal' },
      slug: { en: 'criminal-defense', es: 'defensa-criminal' },
      icon: '⚖️',
      postCount: 28,
    },
    {
      id: 'family-law',
      name: { en: 'Family Law', es: 'Derecho Familiar' },
      slug: { en: 'family-law', es: 'derecho-familiar' },
      icon: '👨‍👩‍👧‍👦',
      postCount: 22,
    },
    {
      id: 'workers-compensation',
      name: { en: 'Workers Compensation', es: 'Compensación Laboral' },
      slug: { en: 'workers-compensation', es: 'compensacion-laboral' },
      icon: '🏭',
      postCount: 18,
    },
  ];

  return (
    <BlogPageTemplate
      posts={posts}
      categories={categories}
      isArticlePage={false}
      currentPost={undefined}
      relatedPosts={[]}
    />
  );
}
