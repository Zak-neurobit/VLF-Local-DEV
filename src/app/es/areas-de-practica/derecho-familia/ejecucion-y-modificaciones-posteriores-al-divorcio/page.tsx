import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Abogados en Raleigh, NC Para Modificaciones Posteriores al Divorcio - Vasquez Law Firm, PLLC',
  description:
    'Vasquez Law Firm in [City], [State] - Immigration, personal injury, criminal defense & family law. Local attorneys who understand your needs. Walk-ins welcome.',
  openGraph: {
    title:
      'Abogados en Raleigh, NC Para Modificaciones Posteriores al Divorcio - Vasquez Law Firm, PLLC',
    description:
      'Abogados de Cumplimiento de Ordenes que Prestan Servicios en los Condados de Wake y Johnston Cuando se divorcia, es fácil pensar en su divorcio como un final, en gran parte porque el proceso está destinado específicamente a romper la relación matrimonial entre usted y su cónyuge. En muchos casos, sin embargo, un divorcio puede representar un nuevo comienzo, o al menos el comienzo de una nueva relación con su excónyuge, especialmente si tienen hijos juntos. En Vasquez Law Firm, PLLC, nuestros abogados se dan cuenta de que las órdenes relacionadas con la custodia de los hijos, la manutención de los hijos y la pensión alimenticia generalmente deben permanecer en vigor durante muchos años después de que finalice el divorcio. En ese momento, las circunstancias de su vida y las de su cónyuge pueden cambiar drásticamente, dejando sus pedidos existentes prácticamente obsoletos y anticuados. La ley de Carolina del Norte le permite solicitar una modificación de dichas órdenes, pero el proceso para hacerlo puede ser difícil y las discusiones razonables con su excónyuge pueden volverse desagradables rápidamente. Nuestro equipo de expertos tiene la experiencia y los recursos para ayudarlo a mantener actualizadas sus órdenes de custodia y manutención para que sigan […]',
    images: [
      {
        url: '../../../../wp-content/uploads/2024/04/mecklenburg-county-order-modification-lawyers-1.jpg',
      }

export const runtime = 'nodejs';

export default function EjecucionYModificacionesPosterioresAlDivorcioPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'ejecucion-y-modificaciones-posteriores-al-divorcio',
    title: 'Abogados en Raleigh, NC Para Modificaciones Posteriores al Divorcio',
    slug: 'ejecucion-y-modificaciones-posteriores-al-divorcio',
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
