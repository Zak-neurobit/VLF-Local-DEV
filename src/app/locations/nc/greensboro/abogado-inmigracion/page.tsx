import { Metadata } from 'next';
import Script from 'next/script';
import ModernServiceLocationTemplate from '@/components/templates/ModernServiceLocationTemplate';
import { MasterLayout } from '@/design-system/templates/MasterLayout';

export const metadata: Metadata = {
  title: 'Abogado de Inmigración en Greensboro - YO PELEO POR TI™ | Vasquez Law',
  description:
    'Abogados de inmigración en Greensboro NC. Defensa contra deportación, green cards, visas de trabajo, ciudadanía. 98% casos ganados. Consulta gratis. Hablamos español.',
  keywords:
    'abogado inmigración Greensboro, abogado inmigracion Greensboro NC, abogado deportacion Greensboro, abogado green card Greensboro, abogado visa trabajo Greensboro, abogado ciudadania Greensboro, bufete inmigracion Greensboro',
  openGraph: {
    title: 'Abogado de Inmigración en Greensboro - YO PELEO POR TI™',
    description:
      'El bufete de inmigración más confiable de Greensboro en el Triad. Representación experta para green cards, defensa contra deportación, visas de trabajo y ciudadanía.',
    images: [{ url: '/images/offices/greensboro-abogado-inmigracion.jpg' }],
    type: 'website',
    locale: 'es_US',
    url: 'https://www.vasquezlawfirm.com/locations/nc/greensboro/abogado-inmigracion',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abogado de Inmigración en Greensboro - YO PELEO POR TI™',
    description:
      'Servicios legales de inmigración en Greensboro, NC. 98% de éxito. Consulta gratis.',
  },
  alternates: {
    canonical: 'https://www.vasquezlawfirm.com/locations/nc/greensboro/abogado-inmigracion',
    languages: {
      'es-US': 'https://www.vasquezlawfirm.com/locations/nc/greensboro/abogado-inmigracion',
      'en-US': 'https://www.vasquezlawfirm.com/locations/nc/greensboro/immigration-lawyer',
    },
  },
};

export default function GreensboroAbogadoInmigracionPage() {
  const serviceLocationData = {
    cityName: 'Greensboro',
    serviceName: 'Inmigración',
    heroTitle: 'Abogado de Inmigración en Greensboro',
    heroSubtitle: 'YO PELEO POR TI™',
    heroDescription:
      'Expertos en inmigración del Triad de Carolina del Norte. Disciplina militar combinada con excelencia legal para proteger tu sueño americano. 98% de casos ganados con más de 2,500 familias de Greensboro ayudadas.',

    localStats: {
      stat1: { value: '2,500+', label: 'Familias de Greensboro Ayudadas' },
      stat2: { value: '98%', label: 'Tasa de Éxito' },
      stat3: { value: '24/7', label: 'Defensa de Emergencia' },
      stat4: { value: '45+', label: 'Años de Experiencia' },
    },

    serviceDetails: {
      title: 'Servicios Legales de Inmigración en Greensboro',
      description:
        'Representación completa de inmigración para residentes de Greensboro y el Condado de Guilford',
      services: [
        {
          name: 'Defensa Contra Deportación',
          description:
            'Defensa de emergencia en la Corte de Inmigración de Charlotte. Luchamos contra detención y procedimientos de remoción para clientes de Greensboro.',
          localInfo:
            'Representación regular en la Corte de Inmigración de Charlotte para residentes del área de Greensboro',
        },
        {
          name: 'Green Cards y Residencia Permanente',
          description:
            'Aplicaciones familiares y por empleo. Ajuste de estatus y procesamiento consular.',
          localInfo:
            'Procesamiento rápido a través de oficinas locales de USCIS que sirven la región del Triad',
        },
        {
          name: 'Visas de Trabajo y Permisos',
          description:
            'H-1B, L-1, E-2 y otras visas para los sectores manufacturero, de salud y educación de Greensboro.',
          localInfo:
            'Servimos a Honda Aircraft, Cone Health, UNCG y otros empleadores principales de Greensboro',
        },
        {
          name: 'Ciudadanía y Naturalización',
          description:
            'Asistencia completa con aplicaciones, preparación para entrevistas y apelaciones.',
          localInfo: 'Clínicas mensuales de ciudadanía en el área de Greensboro',
        },
        {
          name: 'DACA y Dreamers',
          description:
            'Aplicaciones iniciales y renovaciones de DACA para jóvenes inmigrantes en Greensboro.',
          localInfo: 'Asociación con escuelas del área de Greensboro incluyendo NC A&T y UNCG',
        },
        {
          name: 'Asilo y Protección de Refugiados',
          description:
            'Aplicaciones de asilo, entrevistas y apelaciones para quienes huyen de persecución.',
          localInfo: 'Experiencia con casos de asilo en Carolina del Norte y apelaciones',
        },
      ],
    },

    localExpertise: {
      title: 'Por Qué Greensboro Elige a Vasquez Law Firm',
      points: [
        'Comprensión profunda de los patrones de inmigración del Triad',
        'Relaciones con empleadores locales y departamentos de recursos humanos',
        'Conocimiento de las diversas comunidades inmigrantes de Greensboro',
        'Activos en organizaciones latinas e inmigrantes del Condado de Guilford',
        'Acceso conveniente al corredor I-85 e I-40',
        'Todo nuestro equipo habla español con fluidez',
      ],
    },

    courtInfo: {
      title: 'Información de la Corte de Inmigración para Residentes de Greensboro',
      name: 'Corte de Inmigración de Charlotte (Sirve al Área de Greensboro)',
      address: '6226 Central Avenue, Charlotte, NC 28212',
      phone: '(704) 535-6000',
      hours: 'Lunes-Viernes: 8:00 AM - 4:30 PM',
      parkingInfo: 'Estacionamiento gratuito disponible',
      additionalInfo:
        'Los casos de inmigración de Greensboro se escuchan en la Corte de Inmigración de Charlotte. Representamos regularmente a clientes del Triad y entendemos la logística de viaje para las audiencias.',
    },

    testimonials: [
      {
        text: 'El abogado Vásquez salvó a mi familia de la deportación. Ahora somos residentes permanentes y agradecidos de poder quedarnos en Greensboro.',
        author: 'Carlos M.',
        location: 'Este de Greensboro',
        rating: 5,
      },
      {
        text: '¡Obtuve mi visa de trabajo aprobada rápidamente! Entienden el proceso de contratación de Honda Aircraft y las necesidades de inmigración.',
        author: 'Akiko T.',
        location: 'Summerfield',
        rating: 5,
      },
      {
        text: 'Después de 20 años en Greensboro, finalmente me hice ciudadano gracias a Vasquez Law Firm. ¡Profesionales y comprensivos!',
        author: 'María G.',
        location: 'High Point Road',
        rating: 5,
      },
    ],

    caseResults: [
      'Detuvimos deportación de dueño de restaurante empleando 15 locales',
      'Ganamos asilo para familia de Centroamérica, ahora prosperando en el Triad',
      'Obtuvimos green cards para profesor de NC A&T y su familia',
      'Apelación exitosa de negación de ciudadanía para trabajador de Cone Health',
      'Permiso de trabajo de emergencia para ingeniero de Honda Aircraft',
    ],

    faqs: [
      {
        question: '¿Cuánto cobra un abogado de inmigración en Greensboro?',
        answer:
          'Ofrecemos tarifas fijas transparentes para la mayoría de casos de inmigración. Planes de pago disponibles. Las consultas iniciales son siempre gratis. Creemos que la representación legal de calidad debe ser accesible para la comunidad inmigrante trabajadora de Greensboro.',
      },
      {
        question: '¿Manejan casos de deportación de emergencia en Greensboro?',
        answer:
          '¡Sí! Ofrecemos defensa contra deportación 24/7. Si usted o un ser querido está detenido por ICE en Greensboro o el área del Triad, llámenos inmediatamente al 1-844-YO-PELEO.',
      },
      {
        question: '¿Dónde se escuchan los casos de inmigración de Greensboro?',
        answer:
          'Los casos de inmigración del área de Greensboro se escuchan en la Corte de Inmigración de Charlotte. Manejamos toda la logística de viaje y representamos regularmente a clientes del Triad en esta corte.',
      },
      {
        question: '¿Trabajan con empleadores de Greensboro para visas de trabajo?',
        answer:
          '¡Sí! Trabajamos con empleadores principales de Greensboro incluyendo Honda Aircraft, Cone Health, UNCG, NC A&T y muchas empresas manufactureras para obtener visas de trabajo para sus empleados.',
      },
    ],

    officeInfo: {
      name: 'Sirviendo a Greensboro desde Nuestras Oficinas de NC',
      street: 'Múltiples Ubicaciones de Oficina',
      city: 'Área de Greensboro',
      state: 'NC',
      zip: '',
      phone: '1-844-YO-PELEO',
      localPhone: '(336) 333-5555',
      email: 'greensboro@vasquezlawfirm.com',
      hours: {
        weekdays: 'Lunes-Viernes: 8:00 AM - 5:00 PM',
        saturday: 'Sábado: Con Cita',
        sunday: 'Domingo: Servicios de Emergencia',
      },
    },

    servingAreas: [
      'Centro de Greensboro',
      'Este de Greensboro',
      'Oeste de Greensboro',
      'Noreste de Greensboro',
      'Sureste de Greensboro',
      'Glenwood',
      'Irving Park',
      'Fisher Park',
      'Sunset Hills',
      'Lindley Park',
      'Revolution Mill',
      'High Point',
      'Jamestown',
      'Kernersville',
      'Summerfield',
      'Oak Ridge',
      'Stokesdale',
      'Gibsonville',
      'Whitsett',
      'Pleasant Garden',
      'McLeansville',
      'Burlington (Condado de Alamance)',
    ],

    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3248.8!2d-79.7920!3d36.0726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDA0JzIxLjQiTiA3OcKwNDcnMzEuMiJX!5e0!3m2!1sen!2sus!4v1234567890!5m2!1sen!2sus',

    // SEO-optimized content sections
    whyHireUs: {
      title: '¿Por Qué Contratar un Abogado de Inmigración en Greensboro?',
      content: `Navegar la ley de inmigración en Greensboro requiere entender tanto los requisitos federales como las dinámicas locales del Triad. Como la tercera ciudad más grande de Carolina del Norte, Greensboro atrae diversos inmigrantes que buscan oportunidades en manufactura, salud y educación. Nuestros abogados de inmigración en Greensboro comprenden los desafíos únicos que enfrentan las crecientes comunidades latina, asiática y de refugiados de la ciudad. Desde las necesidades de trabajadores especializados de Honda Aircraft hasta la población estudiantil internacional de NC A&T, proporcionamos soluciones de inmigración personalizadas que reflejan el panorama económico y cultural de Greensboro.`,
    },

    localChallenges: {
      title: 'Desafíos de Inmigración en Greensboro, NC',
      content: `La posición de Greensboro como centro manufacturero del Triad crea oportunidades y desafíos únicos de inmigración. Empleadores principales como Honda Aircraft Company buscan trabajadores internacionales especializados, mientras que la creciente población de refugiados de la ciudad necesita protección y caminos hacia la ciudadanía. La proximidad del área al Research Triangle Park también atrae trabajadores tecnológicos que requieren visas especializadas. Nuestros abogados de inmigración en Greensboro comprenden estos motores económicos locales y trabajan con empleadores, organizaciones comunitarias y familias para navegar el complejo sistema federal de inmigración mientras sirven las diversas necesidades de la Ciudad Puerta.`,
    },
  };

  return (
    <>
      <MasterLayout variant="default" showBreadcrumbs={true}>
        <ModernServiceLocationTemplate data={serviceLocationData} language="es" />
      </MasterLayout>

      {/* Local Business Schema in Spanish */}
      <Script
        id="greensboro-abogado-inmigracion-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            '@id': 'https://www.vasquezlawfirm.com/locations/nc/greensboro/abogado-inmigracion',
            name: 'Vasquez Law Firm - Abogado de Inmigración en Greensboro',
            description:
              'Abogados de inmigración en Greensboro NC. Defensa contra deportación, green cards, visas de trabajo, ciudadanía.',
            url: 'https://www.vasquezlawfirm.com/locations/nc/greensboro/abogado-inmigracion',
            telephone: '+1-844-967-3536',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Greensboro',
              addressRegion: 'NC',
              addressCountry: 'US',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 36.0726,
              longitude: -79.792,
            },
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '08:00',
                closes: '17:00',
              },
            ],
            priceRange: '$$',
            inLanguage: 'es',
            areaServed: [
              {
                '@type': 'City',
                name: 'Greensboro',
              },
              {
                '@type': 'AdministrativeArea',
                name: 'Condado de Guilford',
              },
            ],
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '287',
              bestRating: '5',
              worstRating: '1',
            },
          }),
        }}
      />
    </>
  );
}
