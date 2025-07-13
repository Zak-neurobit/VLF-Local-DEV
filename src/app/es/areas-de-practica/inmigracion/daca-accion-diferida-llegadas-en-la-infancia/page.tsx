import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abogados de DACA en Raleigh NC - Vasquez Law Firm, PLLC',
  description:
    'Vasquez Law Firm in [City], [State] - Immigration, personal injury, criminal defense & family law. Local attorneys who understand your needs. Walk-ins welcome.',
  openGraph: {
    title: 'Abogados de DACA en Raleigh NC - Vasquez Law Firm, PLLC',
    description:
      'Abogados en el Condado de Wake para Aquellos que Buscan Acción Diferida para los Llegados en la Infancia Estados Unidos es una tierra de enormes oportunidades para los extranjeros de todo el mundo. Sin embargo, seguir siendo elegible para vivir y trabajar en los Estados Unidos sin el peligro de ser deportado es una de las principales preocupaciones que enfrentan muchos inmigrantes en el país. En Vasquez Law Firm, PLLC, nuestros abogados de inmigración calificados comprenden este tipo de preocupaciones y la ansiedad que a menudo causan a los inmigrantes y sus familias. También nos damos cuenta de que muchos inmigrantes indocumentados llegaron a los Estados Unidos a una edad temprana y han vivido aquí desde entonces. A medida que envejecen, estas personas a menudo luchan por mantenerse a sí mismas y corren el riesgo de ser deportadas. Si esto describe su situación, puede ser elegible para recibir ayuda a través de la Acción Diferida para los Llegados en la Infancia, también conocida como DACA. ¿Qué es DACA? En 2012, el presidente Barack Obama firmó la orden ejecutiva que creó un programa llamado Acción Diferida para los Llegados en la Infancia (DACA). La intención de DACA es ofrecer protección a […]',
    images: [
      { url: '../../../../wp-content/uploads/2024/04/smithfield-daca-relief-lawyers-1-1.jpg' }

export const runtime = 'nodejs';

export default function DacaAccionDiferidaLlegadasEnLaInfanciaPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'daca-accion-diferida-llegadas-en-la-infancia',
    title: 'Abogados de DACA en Raleigh NC',
    slug: 'daca-accion-diferida-llegadas-en-la-infancia',
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
