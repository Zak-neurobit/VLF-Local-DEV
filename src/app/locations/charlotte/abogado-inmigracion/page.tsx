import { Metadata } from 'next';
import Script from 'next/script';
import ModernServiceLocationTemplate from '@/components/templates/ModernServiceLocationTemplate';
import { MasterLayout } from '@/design-system/templates/MasterLayout';

export const metadata: Metadata = {
  title: 'Abogado de Inmigración en Charlotte - YO PELEO POR TI™ | Vasquez Law',
  description: 'Abogados de inmigración en Charlotte NC. Defensa contra deportación, green cards, visas de trabajo, ciudadanía. 98% casos ganados. Consulta gratis. Hablamos español.',
  keywords: 'abogado inmigración Charlotte, abogado inmigracion Charlotte NC, abogado deportacion Charlotte, abogado green card Charlotte, abogado visa trabajo Charlotte, abogado ciudadania Charlotte, bufete inmigracion Charlotte',
  openGraph: {
    title: 'Abogado de Inmigración en Charlotte - YO PELEO POR TI™',
    description: 'El bufete de inmigración más confiable de Charlotte. Representación experta para green cards, defensa contra deportación, visas de trabajo y ciudadanía.',
    images: [{ url: '/images/offices/charlotte-abogado-inmigracion.jpg' }],
    type: 'website',
    locale: 'es_US',
    url: 'https://www.vasquezlawfirm.com/locations/charlotte/abogado-inmigracion',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abogado de Inmigración en Charlotte - YO PELEO POR TI™',
    description: 'Servicios legales de inmigración en Charlotte, NC. 98% de éxito. Consulta gratis.',
  },
  alternates: {
    canonical: 'https://www.vasquezlawfirm.com/locations/charlotte/abogado-inmigracion',
    languages: {
      'es-US': 'https://www.vasquezlawfirm.com/locations/charlotte/abogado-inmigracion',
      'en-US': 'https://www.vasquezlawfirm.com/locations/charlotte/immigration-lawyer',
    },
  },
};

export default function CharlotteAbogadoInmigracionPage() {
  const serviceLocationData = {
    cityName: 'Charlotte',
    serviceName: 'Inmigración',
    heroTitle: 'Abogado de Inmigración en Charlotte',
    heroSubtitle: 'YO PELEO POR TI™',
    heroDescription: 'El bufete de inmigración más confiable de Charlotte. Disciplina militar combinada con excelencia legal para proteger tu sueño americano. 98% de casos ganados con más de 30,000 familias ayudadas.',
    
    localStats: {
      stat1: { value: '5,000+', label: 'Familias de Charlotte Ayudadas' },
      stat2: { value: '98%', label: 'Tasa de Éxito' },
      stat3: { value: '24/7', label: 'Defensa de Emergencia' },
      stat4: { value: '60+', label: 'Años de Experiencia' },
    },

    serviceDetails: {
      title: 'Servicios Legales de Inmigración en Charlotte',
      description: 'Representación completa de inmigración para residentes de Charlotte y el Condado de Mecklenburg',
      services: [
        {
          name: 'Defensa Contra Deportación',
          description: 'Defensa de emergencia en la Corte de Inmigración de Charlotte. Luchamos contra detención y procedimientos de remoción.',
          localInfo: 'Representación regular en la Corte de Inmigración de Charlotte en Central Avenue',
        },
        {
          name: 'Green Cards y Residencia Permanente',
          description: 'Aplicaciones familiares y por empleo. Ajuste de estatus y procesamiento consular.',
          localInfo: 'Procesamiento rápido a través de la Oficina de USCIS en Charlotte',
        },
        {
          name: 'Visas de Trabajo y Permisos',
          description: 'H-1B, L-1, E-2 y otras visas para los sectores bancario, tecnológico y de salud de Charlotte.',
          localInfo: 'Servimos a Bank of America, Wells Fargo, Atrium Health y otros empleadores principales',
        },
        {
          name: 'Ciudadanía y Naturalización',
          description: 'Asistencia completa con aplicaciones, preparación para entrevistas y apelaciones.',
          localInfo: 'Clínicas semanales de ciudadanía en nuestra oficina de Charlotte',
        },
        {
          name: 'DACA y Dreamers',
          description: 'Aplicaciones iniciales y renovaciones de DACA para jóvenes inmigrantes en Charlotte.',
          localInfo: 'Asociación con escuelas y universidades del área de Charlotte',
        },
        {
          name: 'Asilo y Protección de Refugiados',
          description: 'Aplicaciones de asilo, entrevistas y apelaciones para quienes huyen de persecución.',
          localInfo: 'Experiencia con procedimientos de asilo en la Corte de Charlotte',
        },
      ],
    },

    localExpertise: {
      title: 'Por Qué Charlotte Elige a Vasquez Law Firm',
      points: [
        'Práctica regular en la Corte de Inmigración de Charlotte',
        'Relaciones profundas con la Oficina de USCIS en Charlotte',
        'Comprensión de sectores locales: banca, salud, energía',
        'Activos en las comunidades hispanas e inmigrantes de Charlotte',
        'Ubicación conveniente cerca de I-85 con estacionamiento gratis',
        'Todo nuestro equipo habla español con fluidez',
      ],
    },

    courtInfo: {
      title: 'Información de la Corte de Inmigración de Charlotte',
      name: 'Corte de Inmigración de Charlotte',
      address: '6226 Central Avenue, Charlotte, NC 28212',
      phone: '(704) 535-6000',
      hours: 'Lunes-Viernes: 8:00 AM - 4:30 PM',
      parkingInfo: 'Estacionamiento gratuito disponible',
      additionalInfo: 'Aparecemos regularmente en la Corte de Inmigración de Charlotte y conocemos a los jueces y procedimientos. Nuestra oficina está a solo 10 minutos para reuniones convenientes.',
    },

    testimonials: [
      {
        text: 'El abogado Vásquez salvó a mi familia de la deportación. Su equipo luchó por nosotros cuando nadie más lo hizo. ¡Ahora somos residentes permanentes!',
        author: 'María G.',
        location: 'Sur de Charlotte',
        rating: 5,
      },
      {
        text: 'Obtuve mi visa de trabajo en tiempo récord. Entienden el mercado laboral de Charlotte y me ayudaron con mi posición en Bank of America.',
        author: 'Raj P.',
        location: 'Centro de Charlotte',
        rating: 5,
      },
      {
        text: 'Después de vivir en Charlotte por 15 años, finalmente me hice ciudadano gracias a Vasquez Law Firm. ¡Hicieron el proceso tan fácil!',
        author: 'Carlos M.',
        location: 'Este de Charlotte',
        rating: 5,
      },
    ],

    caseResults: [
      'Detuvimos deportación de dueño de restaurante, salvando 20 empleos locales',
      'Ganamos asilo para familia huyendo de violencia, ahora contribuyen a Charlotte',
      'Obtuvimos green cards para familia extendida en 6 meses récord',
      'Apelación exitosa de negación de ciudadanía para trabajador de salud',
      'Permiso de trabajo de emergencia para enfermera de Atrium Health',
    ],

    faqs: [
      {
        question: '¿Cuánto cobra un abogado de inmigración en Charlotte?',
        answer: 'Ofrecemos tarifas fijas transparentes para la mayoría de casos. Planes de pago disponibles. Las consultas iniciales son siempre gratis. Creemos que todos merecen representación legal de calidad sin importar su situación financiera.',
      },
      {
        question: '¿Manejan casos de deportación de emergencia en Charlotte?',
        answer: '¡Sí! Ofrecemos defensa contra deportación 24/7. Si usted o un ser querido está detenido por ICE en Charlotte o áreas cercanas, llámenos inmediatamente al 1-844-YO-PELEO.',
      },
      {
        question: '¿Cuánto tiempo toman los casos de inmigración en Charlotte?',
        answer: 'El tiempo varía según el tipo de caso. Los casos en la Corte de Charlotte pueden tomar 2-4 años. Las aplicaciones de USCIS típicamente toman 6-12 meses. Trabajamos para acelerar su caso cuando sea posible.',
      },
      {
        question: '¿Toda su oficina habla español?',
        answer: '¡Sí! Todo nuestro equipo en Charlotte es bilingüe. Realizamos consultas, preparamos documentos y representamos clientes en inglés y español.',
      },
    ],

    officeInfo: {
      name: 'Oficina de Charlotte',
      street: '5701 Executive Center Dr, Suite 103',
      city: 'Charlotte',
      state: 'NC',
      zip: '28212',
      phone: '1-844-YO-PELEO',
      localPhone: '(704) 500-2009',
      email: 'charlotte@vasquezlawfirm.com',
      hours: {
        weekdays: 'Lunes-Viernes: 8:00 AM - 5:00 PM',
        saturday: 'Sábado: Con Cita',
        sunday: 'Domingo: Servicios de Emergencia',
      },
    },

    servingAreas: [
      'Centro de Charlotte',
      'South End',
      'NoDa (North Davidson)',
      'Plaza Midwood',
      'Myers Park',
      'Dilworth',
      'Elizabeth',
      'Ballantyne',
      'University City',
      'Steele Creek',
      'Matthews',
      'Mint Hill',
      'Pineville',
      'Huntersville',
      'Cornelius',
      'Davidson',
      'Mooresville',
      'Indian Trail',
      'Monroe',
      'Gastonia',
      'Concord',
      'Rock Hill, SC',
      'Fort Mill, SC',
    ],

    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3259.8651648937!2d-80.8433!3d35.2271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDEzJzM3LjYiTiA4MMKwNTAnMzUuOSJX!5e0!3m2!1sen!2sus!4v1234567890!5m2!1sen!2sus',

    // SEO-optimized content sections
    whyHireUs: {
      title: '¿Por Qué Contratar un Abogado de Inmigración en Charlotte?',
      content: `Navegar la ley de inmigración en Charlotte requiere experiencia local y resultados comprobados. Charlotte tiene una de las poblaciones inmigrantes de más rápido crecimiento en el sureste, con desafíos y oportunidades únicos. Nuestros abogados de inmigración en Charlotte entienden el panorama local, desde la Corte de Inmigración en Central Avenue hasta los procedimientos de la Oficina de USCIS. Hemos ayudado a más de 5,000 familias del área de Charlotte a lograr su sueño americano a través de representación legal estratégica y defensa inquebrantable.`,
    },

    localChallenges: {
      title: 'Desafíos de Inmigración en Charlotte, NC',
      content: `La economía en auge de Charlotte atrae inmigrantes de todo el mundo, pero también presenta desafíos únicos. Los principales empleadores de la ciudad en banca, salud y tecnología a menudo necesitan trabajadores calificados a través de programas H-1B y otras visas. Mientras tanto, la creciente comunidad latina de Charlotte enfrenta amenazas de deportación y separación familiar. Nuestros abogados de inmigración en Charlotte comprenden estas dinámicas locales y brindan soluciones personalizadas para la situación de cada cliente.`,
    },
  };

  return (
    <>
      <MasterLayout variant="default" showBreadcrumbs={true}>
        <ModernServiceLocationTemplate data={serviceLocationData} language="es" />
      </MasterLayout>
      
      {/* Local Business Schema in Spanish */}
      <Script
        id="charlotte-abogado-inmigracion-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            '@id': 'https://www.vasquezlawfirm.com/locations/charlotte/abogado-inmigracion',
            name: 'Vasquez Law Firm - Abogado de Inmigración en Charlotte',
            description: 'Abogados de inmigración en Charlotte NC. Defensa contra deportación, green cards, visas de trabajo, ciudadanía.',
            url: 'https://www.vasquezlawfirm.com/locations/charlotte/abogado-inmigracion',
            telephone: '+1-844-967-3536',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '5701 Executive Center Dr, Suite 103',
              addressLocality: 'Charlotte',
              addressRegion: 'NC',
              postalCode: '28212',
              addressCountry: 'US',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 35.2271,
              longitude: -80.8433,
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
                name: 'Charlotte',
              },
              {
                '@type': 'AdministrativeArea',
                name: 'Condado de Mecklenburg',
              },
            ],
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '487',
              bestRating: '5',
              worstRating: '1',
            },
          }),
        }}
      />
    </>
  );
}