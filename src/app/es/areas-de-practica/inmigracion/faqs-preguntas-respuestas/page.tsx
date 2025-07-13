import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes Sobre Inmigración - Vasquez Law Firm, PLLC',
  description:
    'Expert immigration attorneys handling preguntas frecuentes sobre inmigración. 60+ years experience. Free consultation in English/Spanish. Call 1-844-YO-PELEO.',
  openGraph: {
    title: 'Preguntas Frecuentes Sobre Inmigración - Vasquez Law Firm, PLLC',
    description:
      'Abogados de Inmigración de Carolina del Norte En Vasquez Law Firm, PLLC, nuestros abogados expertos manejan una amplia variedad de asuntos de inmigración. Entendemos que las leyes de inmigración en los Estados Unidos pueden ser increíblemente complejas y confusas. Sin embargo, también nos damos cuenta de que cualquier descuido o error en una solicitud de visa o una petición de tarjeta verde puede causar muchos meses o más de demoras innecesarias. Con esto en mente, ofrecemos orientación sobre algunas de las preguntas más comunes que escuchamos en nuestra práctica. P. ¿Qué es una Visa? R. En el ámbito de la inmigración, una visa de los EE. UU. es un documento que permite a un ciudadano extranjero solicitar la entrada legal a los Estados Unidos. Hay muchos tipos diferentes de visas, pero generalmente se dividen en dos categorías principales: visas de no inmigrante y visas de inmigrante. Las visas de no inmigrante permiten que un ciudadano extranjero viva y / o trabaje en los EE. UU. temporalmente, mientras que las visas de inmigrante son para aquellos que tienen la intención de permanecer en los Estados Unidos de forma permanente. P. ¿Qué Tipo de Visa Necesito? R. El tipo de visa que […]',
    images: [{ url: '/images/og-default.jpg' }],
  },
};

export const runtime = 'nodejs';

export default function FaqsPreguntasRespuestasPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'faqs-preguntas-respuestas',
    title: 'Preguntas Frecuentes Sobre Inmigración',
    slug: 'faqs-preguntas-respuestas',
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
