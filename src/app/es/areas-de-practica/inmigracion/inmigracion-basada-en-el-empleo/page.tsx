import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abogados de Inmigración Basados en el Empleo en Raleigh - Vasquez Law Firm, PLLC',
  description:
    'Vasquez Law Firm in [City], [State] - Immigration, personal injury, criminal defense & family law. Local attorneys who understand your needs. Walk-ins welcome.',
  openGraph: {
    title: 'Abogados de Inmigración Basados en el Empleo en Raleigh - Vasquez Law Firm, PLLC',
    description:
      'Abogados del Condado de Wake Para Visas de No Inmigrantes y Relacionadas con el Trabajo El sistema económico mundial continúa estando cada vez más conectado a través de las fronteras internacionales. Con esto en mente, no sorprende que muchas empresas y corporaciones estadounidenses hayan desarrollado un mayor interés en patrocinar a ciudadanos extranjeros para que vengan a trabajar a los Estados Unidos. En Vasquez Law Firm, PLLC, nuestros hábiles abogados de inmigración trabajan en estrecha colaboración con empresas de todos los tamaños y tipos para ayudar a obtener las visas adecuadas para sus trabajadores no ciudadanos. El gobierno de los Estados Unidos ofrece una amplia gama de visas relacionadas con el trabajo y el empleo, y lo ayudaremos a determinar la opción que mejor se adapte a las necesidades de su negocio. También lo ayudaremos a preparar y enviar la documentación necesaria mientras cumplimos con todas las leyes y regulaciones aplicables. Visas de Trabajo Temporal Las leyes de inmigración en los Estados Unidos ofrecen visas temporales para que los ciudadanos extranjeros trabajen en este país por un período de tiempo relativamente corto. Estas visas se clasifican como visas de “no inmigrante” porque, en general, no están destinadas a ser utilizadas […]',
    images: [
      { url: '../../../../wp-content/uploads/2024/04/Employment-Based-Immigration-Lawyers.jpg' },
    ],
  },
};

export const runtime = 'nodejs';

export default function InmigracionBasadaEnElEmpleoPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'inmigracion-basada-en-el-empleo',
    title: 'Abogados de Inmigración Basados en el Empleo en Raleigh',
    slug: 'inmigracion-basada-en-el-empleo',
    excerpt: 'Blog post excerpt here - TODO: extract from content',
    content: `
      <div class="prose prose-lg max-w-none">
        <!-- TODO: Migrate content from original file -->
        <p>This content needs to be migrated from the original file.</p>
      </div>
    `,
    practiceArea: 'general', // TODO: Determine correct practice area
    language: 'en' as const,
    publishedAt: new Date(),
    readTime: 5,
    author: {
      name: 'Vasquez Law Firm',
    },
    tags: [], // TODO: Add relevant tags
  };

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
  ];

  return (
    <BlogPageTemplate
      posts={[]}
      categories={categories}
      isArticlePage={true}
      currentPost={post}
      relatedPosts={[]} // TODO: Add related posts
    />
  );
}
