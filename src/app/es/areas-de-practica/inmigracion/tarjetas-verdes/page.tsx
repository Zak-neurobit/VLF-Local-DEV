import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abogados para obtener la tarjeta de residencia en Raleigh NC - Vasquez Law Firm, PLLC',
  description:
    'Vasquez Law Firm in [City], [State] - Immigration, personal injury, criminal defense & family law. Local attorneys who understand your needs. Walk-ins welcome.',
  openGraph: {
    title: 'Abogados para obtener la tarjeta de residencia en Raleigh NC - Vasquez Law Firm, PLLC',
    description:
      'Abogados en el Condado de Wake que Ayudan a los Inmigrantes a Obtener el Estatus de Residente Permanente Legal Si vive en los Estados Unidos, pero tiene familiares cercanos en otro país, es posible que desee traerlos a los Estados Unidos para que todos puedan estar juntos. Cuando ayuda a los miembros de su familia a venir a los Estados Unidos legalmente, les brinda la oportunidad de buscar oportunidades casi ilimitadas de empleo y educación. Sin embargo, el proceso de inmigración puede ser extremadamente complicado y los requisitos para obtener la entrada legal a los EE. UU. pueden ser difíciles de cumplir. En la mayoría de los casos, deberá obtener las visas adecuadas para permitir que los miembros de su familia ingresen al país, pero también querrá iniciarlos en el camino hacia la obtención del estatus de residente permanente legal (LPR), comúnmente conocido como obtener un tarjeta.” En Vasquez Law Firm, PLLC, nuestros abogados de inmigración expertos comprenden los desafíos que los inmigrantes y sus familias a menudo enfrentan para obtener el estatus de LPR. También reconocemos los beneficios que se obtienen al completar con éxito el proceso. Nuestros abogados tienen más de 35 años de experiencia en la práctica […]',
    images: [
      { url: '../../../../wp-content/uploads/2024/04/wake-county-green-card-lawyers-1.jpg' }

export const runtime = 'nodejs';

export default function TarjetasVerdesPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'tarjetas-verdes',
    title: 'Abogados para obtener la tarjeta de residencia en Raleigh NC',
    slug: 'tarjetas-verdes',
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
