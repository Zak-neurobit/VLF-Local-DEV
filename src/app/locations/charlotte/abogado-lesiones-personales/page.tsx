import { Metadata } from 'next';
import Script from 'next/script';
import ModernServiceLocationTemplate from '@/components/templates/ModernServiceLocationTemplate';
import { MasterLayout } from '@/design-system/templates/MasterLayout';

export const metadata: Metadata = {
  title: 'Abogado de Lesiones Personales en Charlotte - Accidentes y Más | Vasquez Law',
  description:
    'Abogados expertos en lesiones personales en Charlotte. Accidentes de auto, camiones, caídas, muerte injusta. No cobramos si no ganamos. Consulta gratis. Hablamos español.',
  keywords:
    'abogado lesiones personales Charlotte, abogado accidentes Charlotte NC, abogado accidente auto Charlotte, abogado accidente camion Charlotte, abogado caidas Charlotte, abogado muerte injusta Charlotte',
  openGraph: {
    title: 'Abogado de Lesiones Personales en Charlotte - YO PELEO POR TI™',
    description:
      'El bufete de lesiones personales más confiable de Charlotte. Luchamos contra las aseguradoras para obtener la máxima compensación. No cobramos si no ganamos.',
    images: [{ url: '/images/offices/charlotte-abogado-lesiones-personales.jpg' }],
    type: 'website',
    locale: 'es_US',
    url: 'https://www.vasquezlawfirm.com/locations/charlotte/abogado-lesiones-personales',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abogado de Lesiones Personales en Charlotte - YO PELEO POR TI™',
    description: '¿Herido en Charlotte? Luchamos por compensación máxima. Consulta gratis.',
  },
  alternates: {
    canonical: 'https://www.vasquezlawfirm.com/locations/charlotte/abogado-lesiones-personales',
    languages: {
      'es-US': 'https://www.vasquezlawfirm.com/locations/charlotte/abogado-lesiones-personales',
      'en-US': 'https://www.vasquezlawfirm.com/locations/charlotte/personal-injury-attorney',
    },
  },
};

export default function CharlotteAbogadoLesionesPersonalesPage() {
  const serviceLocationData = {
    cityName: 'Charlotte',
    serviceName: 'Lesiones Personales',
    heroTitle: 'Abogado de Lesiones Personales en Charlotte',
    heroSubtitle: 'YO PELEO POR TI™',
    heroDescription:
      '¿Herido en Charlotte? Luchamos contra las compañías de seguros para obtener la compensación que mereces. No cobramos si no ganamos. Más de $100 millones recuperados para clientes.',

    localStats: {
      stat1: { value: '$100M+', label: 'Recuperados para Clientes' },
      stat2: { value: '3,500+', label: 'Casos Ganados en Charlotte' },
      stat3: { value: '99%', label: 'Satisfacción del Cliente' },
      stat4: { value: 'Sin Costo', label: 'Si No Ganamos' },
    },

    serviceDetails: {
      title: 'Servicios Legales de Lesiones Personales en Charlotte',
      description:
        'Representación completa para accidentes en todo Charlotte y el Condado de Mecklenburg',
      services: [
        {
          name: 'Accidentes de Auto y Camión',
          description:
            'Lesiones graves en choques en I-77, I-85, I-485 y calles de Charlotte. Manejamos todas las negociaciones con seguros.',
          localInfo:
            'Conocimiento experto de las intersecciones y autopistas más peligrosas de Charlotte',
        },
        {
          name: 'Accidentes de Motocicleta',
          description:
            'Protegiendo los derechos de motociclistas después de accidentes. Entendemos el prejuicio que enfrentan de las aseguradoras.',
          localInfo: 'Activos en la comunidad motociclista de Charlotte y defensa de seguridad',
        },
        {
          name: 'Caídas y Resbalones',
          description:
            'Casos de responsabilidad en tiendas, restaurantes, apartamentos y propiedad pública en Charlotte.',
          localInfo:
            'Familiarizados con códigos de propiedad y estándares de seguridad en Mecklenburg',
        },
        {
          name: 'Negligencia Médica',
          description:
            'Responsabilizando a hospitales y doctores de Charlotte por errores médicos y negligencia.',
          localInfo:
            'Experiencia con Atrium Health, Novant y otras instalaciones médicas de Charlotte',
        },
        {
          name: 'Muerte Injusta',
          description:
            'Representación compasiva para familias que han perdido seres queridos por negligencia.',
          localInfo: 'Comprensión de las leyes de Carolina del Norte y procedimientos locales',
        },
        {
          name: 'Compensación Laboral',
          description:
            'Luchando por los derechos de trabajadores lesionados a atención médica y beneficios salariales.',
          localInfo: 'Conocimiento de empleadores principales de Charlotte y patrones de lesiones',
        },
      ],
    },

    localExpertise: {
      title: 'Por Qué las Víctimas de Charlotte Nos Eligen',
      points: [
        'Conocimiento profundo de las carreteras de Charlotte y patrones de accidentes',
        'Relaciones con proveedores médicos locales para tratamiento de clientes',
        'Práctica regular en la Corte Superior del Condado de Mecklenburg',
        'Comprensión de reportes de accidentes del Departamento de Policía de Charlotte',
        'Conexiones con expertos en reconstrucción de accidentes',
        'Equipo bilingüe sirviendo a la comunidad hispana de Charlotte',
      ],
    },

    courtInfo: {
      title: 'Corte del Condado de Mecklenburg',
      name: 'Corte Superior del Condado de Mecklenburg',
      address: '832 E 4th St, Charlotte, NC 28202',
      phone: '(704) 686-0700',
      hours: 'Lunes-Viernes: 8:00 AM - 5:00 PM',
      parkingInfo: 'Estacionamiento pagado disponible en estructuras cercanas',
      additionalInfo:
        'Aparecemos regularmente en las cortes del Condado de Mecklenburg y conocemos a los jueces, procedimientos y reglas locales que pueden impactar el resultado de su caso.',
    },

    testimonials: [
      {
        text: 'Después de mi accidente en I-485, Vasquez Law Firm me consiguió $250,000. Manejaron todo mientras me recuperaba.',
        author: 'Santiago T.',
        location: 'Ballantyne',
        rating: 5,
      },
      {
        text: 'Atropellada por conductor ebrio en el centro. Me consiguieron compensación completa más daños punitivos. ¡Verdaderos luchadores!',
        author: 'Sara M.',
        location: 'NoDa',
        rating: 5,
      },
      {
        text: 'Caí en supermercado de Charlotte. Probaron negligencia y ganaron mi caso. ¡Altamente recomendados!',
        author: 'Roberto L.',
        location: 'Sur de Charlotte',
        rating: 5,
      },
    ],

    caseResults: [
      '$1.2 millones arreglo para familia en accidente de camión en I-77',
      '$850,000 para trabajador de construcción herido en South End',
      '$500,000 caída en tienda principal de Charlotte',
      '$2.5 millones veredicto negligencia médica en hospital local',
      '$750,000 accidente de motocicleta en Independence Boulevard',
    ],

    faqs: [
      {
        question: '¿Cuánto vale mi caso de lesiones en Charlotte?',
        answer:
          'El valor del caso depende de la gravedad de lesiones, costos médicos, salarios perdidos y dolor y sufrimiento. Ofrecemos evaluaciones gratuitas para valorar el potencial de su reclamo. Nuestros abogados han recuperado millones para clientes con lesiones similares.',
      },
      {
        question: '¿Cuánto tiempo tengo para demandar por lesiones en Charlotte?',
        answer:
          'Carolina del Norte tiene 3 años de plazo para la mayoría de casos de lesiones personales. Sin embargo, algunos casos tienen plazos más cortos. Contáctenos inmediatamente para proteger sus derechos - esperar demasiado podría impedir su recuperación.',
      },
      {
        question: '¿Qué pasa si tuve parte de culpa en mi accidente en Charlotte?',
        answer:
          'Carolina del Norte sigue reglas de negligencia contributiva - si tiene incluso 1% de culpa, podría no recuperar nada. Sin embargo, hemos superado esta defensa muchas veces. No asuma que no tiene caso - permítanos evaluarlo gratis.',
      },
      {
        question: '¿Cuánto cobra un abogado de lesiones personales en Charlotte?',
        answer:
          'Trabajamos por contingencia - SIN COSTO si no ganamos su caso. Adelantamos todos los gastos y solo cobramos de su arreglo o veredicto. Las consultas iniciales son siempre gratis sin obligación.',
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
        sunday: 'Domingo: 24/7 para Emergencias',
      },
    },

    servingAreas: [
      'Centro de Charlotte',
      'South End',
      'NoDa',
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
      'Harrisburg',
      'Weddington',
      'Waxhaw',
    ],

    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3259.8651648937!2d-80.8433!3d35.2271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDEzJzM3LjYiTiA4MMKwNTAnMzUuOSJX!5e0!3m2!1sen!2sus!4v1234567890!5m2!1sen!2sus',

    // SEO-optimized content sections
    whyHireUs: {
      title: '¿Por Qué Contratar un Abogado de Lesiones en Charlotte?',
      content: `Después de un accidente en Charlotte, necesita un luchador en su esquina. Las compañías de seguros tienen equipos de abogados trabajando para minimizar su reclamo. Nuestros abogados de lesiones personales en Charlotte nivelan el campo con representación agresiva y resultados comprobados. Conocemos las carreteras de Charlotte, entendemos las tácticas locales de seguros y tenemos los recursos para enfrentar compañías multimillonarias. Con más de $100 millones recuperados y 99% de satisfacción del cliente, somos la elección confiable de Charlotte para casos serios de lesiones.`,
    },

    localChallenges: {
      title: 'Accidentes Comunes de Lesiones en Charlotte, NC',
      content: `El rápido crecimiento de Charlotte trae mayor tráfico y riesgos de accidentes. I-77, I-85 e I-485 ven choques diarios, mientras Independence Boulevard sigue siendo una de las carreteras más mortales de Carolina del Norte. Las zonas de construcción en el centro y South End crean peligros adicionales. Nuestros abogados de lesiones en Charlotte entienden estas zonas de peligro locales y cómo impactan la responsabilidad. Ya sea que esté herido en un choque múltiple en South Boulevard o una colisión en University City, tenemos el conocimiento local para construir un caso ganador.`,
    },
  };

  return (
    <>
      <MasterLayout variant="default" showBreadcrumbs={true}>
        <ModernServiceLocationTemplate data={serviceLocationData} language="es" />
      </MasterLayout>

      {/* Local Business Schema in Spanish */}
      <Script
        id="charlotte-abogado-lesiones-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            '@id': 'https://www.vasquezlawfirm.com/locations/charlotte/abogado-lesiones-personales',
            name: 'Vasquez Law Firm - Abogado de Lesiones Personales en Charlotte',
            description:
              'Abogados expertos en lesiones personales en Charlotte. Accidentes de auto, camiones, caídas. No cobramos si no ganamos.',
            url: 'https://www.vasquezlawfirm.com/locations/charlotte/abogado-lesiones-personales',
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
            priceRange: 'No Cobramos Si No Ganamos',
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
              reviewCount: '523',
              bestRating: '5',
              worstRating: '1',
            },
          }),
        }}
      />
    </>
  );
}
