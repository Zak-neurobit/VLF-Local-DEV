import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title:
    'Actualización Legal: Zona de Seguridad; Río Monongahela MM 68-68.5, Rices Landing, PA - Vasquez Law Firm, PLLC',
  description:
    'Información legal sobre la nueva zona de seguridad en el Río Monongahela. YO PELEO POR TI™ - Asesoría especializada en regulaciones de navegación fluvial.',
  keywords:
    'zona de seguridad río Monongahela, Rices Landing PA, regulaciones navegación, derecho marítimo, actualización legal',
  alternates: {
    canonical:
      'https://vasquezlawfirm.com/es/blog/actualizacion-legal-zona-seguridad-rio-monongahela-rices-landing',
    languages: {
      en: 'https://vasquezlawfirm.com/blog/legal-update-1750552563569',
      es: 'https://vasquezlawfirm.com/es/blog/actualizacion-legal-zona-seguridad-rio-monongahela-rices-landing',
    },
  },
  openGraph: {
    title: 'Actualización Legal: Zona de Seguridad en Río Monongahela - YO PELEO POR TI™',
    description:
      'Nueva zona de seguridad establecida en el Río Monongahela MM 68-68.5, Rices Landing, Pennsylvania.',
    url: 'https://vasquezlawfirm.com/es/blog/actualizacion-legal-zona-seguridad-rio-monongahela-rices-landing',
    siteName: 'Vasquez Law Firm',
    locale: 'es_US',
    type: 'article',
  },
};

export const runtime = 'nodejs';

export default function ActualizacionLegalZonaSeguridadRioMonongahelaPage() {
  const post = {
    id: 'actualizacion-legal-zona-seguridad-rio-monongahela-rices-landing',
    title: 'Actualización Legal: Zona de Seguridad; Río Monongahela MM 68-68.5, Rices Landing, PA',
    slug: 'actualizacion-legal-zona-seguridad-rio-monongahela-rices-landing',
    excerpt:
      'Nuevas regulaciones de seguridad establecidas en el Río Monongahela entre las millas náuticas 68-68.5 en Rices Landing, Pennsylvania. Información crucial para operadores de transporte fluvial y navegación comercial.',
    content: `
      <div class="prose prose-lg max-w-none">
        <p class="lead text-xl text-gray-700 mb-8">
          La Guardia Costera de Estados Unidos ha implementado una nueva zona de seguridad 
          en el Río Monongahela entre las millas náuticas 68-68.5 en Rices Landing, Pennsylvania. 
          Esta regulación afecta significativamente las operaciones de navegación en la región.
        </p>

        <h2 class="text-2xl font-bold text-blue-900 mt-8 mb-4">Especificaciones de la Zona de Seguridad</h2>
        <p>
          La zona de seguridad recién establecida incluye:
        </p>
        <ul class="list-disc pl-6 mb-6">
          <li><strong>Coordenadas:</strong> Río Monongahela MM 68-68.5</li>
          <li><strong>Localización:</strong> Rices Landing, Pennsylvania</li>
          <li><strong>Extensión:</strong> Media milla náutica de longitud</li>
          <li><strong>Efectividad:</strong> Inmediata y permanente</li>
        </ul>

        <h2 class="text-2xl font-bold text-blue-900 mt-8 mb-4">Impacto en las Operaciones Comerciales</h2>
        <p>
          Esta nueva regulación impacta directamente a:
        </p>
        <ul class="list-disc pl-6 mb-6">
          <li>Operadores de barcazas de carbón y productos químicos</li>
          <li>Servicios de remolque fluvial</li>
          <li>Embarcaciones de recreo y pesca</li>
          <li>Operaciones de carga y descarga</li>
        </ul>

        <h2 class="text-2xl font-bold text-blue-900 mt-8 mb-4">Procedimientos de Autorización</h2>
        <p>
          Para operar dentro de la zona de seguridad, los operadores deben:
        </p>
        <ol class="list-decimal pl-6 mb-6">
          <li>Solicitar autorización previa a la Guardia Costera</li>
          <li>Proporcionar detalles específicos de la operación planificada</li>
          <li>Mantener comunicación de radio activa en el Canal 16</li>
          <li>Seguir las instrucciones del oficial de patrulla designado</li>
          <li>Reportar cualquier actividad inusual inmediatamente</li>
        </ol>

        <h2 class="text-2xl font-bold text-blue-900 mt-8 mb-4">Sanciones por Incumplimiento</h2>
        <p>
          Las violaciones a esta zona de seguridad pueden resultar en:
        </p>
        <ul class="list-disc pl-6 mb-6">
          <li>Multas civiles de hasta $40,000 por día</li>
          <li>Sanciones penales por violaciones intencionales</li>
          <li>Detención de embarcaciones</li>
          <li>Suspensión de licencias de operación</li>
          <li>Responsabilidad por daños o lesiones causadas</li>
        </ul>

        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 my-8">
          <h3 class="text-lg font-semibold text-yellow-900 mb-2">Aviso Importante</h3>
          <p class="text-yellow-800">
            Cualquier embarcación que ingrese a la zona sin autorización será considerada 
            en violación de las regulaciones federales de seguridad marítima. Las consecuencias 
            pueden ser severas y de largo alcance.
          </p>
        </div>

        <h2 class="text-2xl font-bold text-blue-900 mt-8 mb-4">Nuestros Servicios Legales Especializados</h2>
        <p>
          Vasquez Law Firm ofrece asesoría integral en derecho marítimo, incluyendo:
        </p>
        <ul class="list-disc pl-6 mb-6">
          <li>Representación en procedimientos de la Guardia Costera</li>
          <li>Defensa contra violaciones de zonas de seguridad</li>
          <li>Asesoría en procedimientos de cumplimiento</li>
          <li>Negociación de acuerdos de consentimiento</li>
          <li>Desarrollo de protocolos de seguridad corporativos</li>
        </ul>

        <h2 class="text-2xl font-bold text-blue-900 mt-8 mb-4">Recomendaciones Inmediatas</h2>
        <p>
          Aconsejamos a todos los operadores fluviales:
        </p>
        <ol class="list-decimal pl-6 mb-6">
          <li>Actualizar inmediatamente los mapas de navegación</li>
          <li>Entrenar al personal en los nuevos procedimientos</li>
          <li>Establecer protocolos de comunicación con la Guardia Costera</li>
          <li>Revisar las pólizas de seguro para cobertura de responsabilidad</li>
          <li>Consultar con abogados especializados en derecho marítimo</li>
        </ol>

        <div class="bg-blue-50 border-l-4 border-blue-400 p-6 my-8">
          <h3 class="text-lg font-semibold text-blue-900 mb-2">Proteja Su Operación</h3>
          <p class="text-blue-800">
            No arriesgue su negocio ni su licencia. <strong>YO PELEO POR TI™</strong> 
            para asegurar el cumplimiento total con las nuevas regulaciones. 
            Contacte nuestro equipo legal para una evaluación completa de su operación.
          </p>
        </div>

        <p class="text-gray-600 mt-8">
          <em>Esta información es proporcionada únicamente con fines educativos. 
          Para asesoría legal específica sobre su situación, consulte con los abogados 
          especializados de Vasquez Law Firm.</em>
        </p>
      </div>
    `,
    practiceArea: 'maritime-law',
    language: 'es' as const,
    publishedAt: new Date(),
    readTime: 7,
    author: DEFAULT_BLOG_AUTHOR,
    tags: [
      'zona-seguridad',
      'río-monongahela',
      'rices-landing',
      'regulaciones-marítimas',
      'pennsylvania',
    ],
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
      relatedPosts={[]}
    />
  );
}
