import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abogados Defensores de Deportación en Raleigh, NC - Vasquez Law Firm, PLLC',
  description:
    'Vasquez Law Firm in [City], [State] - Immigration, personal injury, criminal defense & family law. Local attorneys who understand your needs. Walk-ins welcome.',
  openGraph: {
    title: 'Abogados Defensores de Deportación en Raleigh, NC - Vasquez Law Firm, PLLC',
    description:
      'Abogados que Ayudan a los Clientes de Charlotte que Enfrentan la Deportación de los Estados Unidos Durante la última década más o menos, el término “deportación” se ha vuelto bastante controvertido como un tema político candente, lo que hace que sea bastante difícil discutirlo sin una batalla por ideologías en competencia. Sin embargo, la palabra “remoción” a menudo genera una reacción mucho menos emocional, aunque los dos términos significan exactamente lo mismo. Cuando los funcionarios de inmigración ordenan a un ciudadano no estadounidense que abandone el país, el proceso de obligarlo a irse se conoce como procedimiento de expulsión. Un ciudadano extranjero podría estar sujeto a deportación o remoción por una variedad de razones, pero el proceso generalmente es impulsado por el no ciudadano que comete algún tipo de violación de las leyes estadounidenses. En Vasquez Law Firm, PLLC, sabemos que cualquier persona que se encuentre en los Estados Unidos y que no sea ciudadano estadounidense de pleno derecho siempre corre el riesgo de ser deportada. Una vez expulsado, un inmigrante puede necesitar esperar hasta diez años antes de poder regresar a los Estados Unidos, si su regreso está permitido. Nuestros abogados de inmigración con experiencia comprenden el efecto que […]',
    images: [
      { url: '../../../../wp-content/uploads/2024/04/smithfield-removal-defense-lawyers-1.jpg' },
    ],
  },
};

export const runtime = 'nodejs';

export default function DeportacionRemocionDefensaPage() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: 'deportacion-remocion-defensa',
    title: 'Abogados Defensores de Deportación en Raleigh, NC',
    slug: 'deportacion-remocion-defensa',
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
