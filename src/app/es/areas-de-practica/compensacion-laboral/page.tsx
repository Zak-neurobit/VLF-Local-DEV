import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Script from 'next/script';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mejores Abogados de Compensación Laboral en Carolina del Norte | YO PELEO POR TI™',
  description: 'Abogados expertos en compensación laboral de NC con 60+ años de experiencia. Obtenga sus beneficios aprobados rápido. Consulta gratuita. Manejamos reclamos denegados. Se habla español.',
  keywords: 'abogado compensación laboral NC, abogado compensación trabajadores Carolina del Norte, abogado lesiones trabajo, reclamos compensación laboral denegados, abogado accidentes trabajo NC, abogado comp laboral Raleigh, abogado lesiones trabajo Charlotte, compensación laboral Durham, abogado accidentes trabajo Greensboro, abogado comp Winston Salem',
  openGraph: {
    title: 'Mejores Abogados de Compensación Laboral en Carolina del Norte | YO PELEO POR TI™',
    description: 'Abogados expertos en compensación laboral de NC con 60+ años de experiencia. Obtenga sus beneficios aprobados rápido. Consulta gratuita. Manejamos reclamos denegados.',
    url: 'https://www.vasquezlawfirm.com/es/areas-de-practica/compensacion-laboral',
    siteName: 'Bufete de Abogados Vásquez, PLLC',
    images: [
      {
        url: '/images/practice-areas/workers-compensation-hero-es.jpg',
        width: 1200,
        height: 630,
        alt: 'Servicios de Compensación Laboral en Carolina del Norte'
      }
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mejores Abogados de Compensación Laboral en Carolina del Norte | YO PELEO POR TI™',
    description: 'Abogados expertos en compensación laboral de NC con 60+ años de experiencia. Obtenga sus beneficios aprobados rápido. Consulta gratuita.',
    images: ['/images/practice-areas/workers-compensation-hero-es.jpg'],
  },
  alternates: {
    canonical: 'https://www.vasquezlawfirm.com/es/areas-de-practica/compensacion-laboral',
    languages: {
      'en-US': 'https://www.vasquezlawfirm.com/practice-areas/workers-compensation',
      'es-ES': 'https://www.vasquezlawfirm.com/es/areas-de-practica/compensacion-laboral'
    }
  }
};

export default function CompensaciónLaboralPage() {
  const services = [
    {
      title: 'Presentación de Reclamos de Compensación Laboral',
      description: 'Manejamos todo su reclamo de compensación laboral de principio a fin, asegurando que se cumplan todos los plazos y se presente la documentación correctamente para obtener los máximos beneficios.',
      features: [
        'Preparación de reclamo inicial',
        'Presentación de Formulario 18 y Formulario 19',
        'Notificación al empleador',
        'Comunicación con compañía de seguros',
        'Cumplimiento de plazos',
        'Recopilación de documentación'
      ]
    },
    {
      title: 'Apelaciones de Reclamos Denegados',
      description: 'No acepte una denegación. Nuestros abogados experimentados saben cómo revertir denegaciones injustas y obtenerle los beneficios que merece.',
      features: [
        'Análisis de razón de denegación',
        'Desarrollo de estrategia de apelación',
        'Audiencias de Comisión Industrial',
        'Presentación de evidencia',
        'Coordinación de testigos expertos',
        'Negociación de acuerdos'
      ]
    },
    {
      title: 'Beneficios por Discapacidad',
      description: 'Asegure los beneficios por discapacidad que necesita mientras no puede trabajar. Luchamos por compensación por discapacidad temporal y permanente.',
      features: [
        'Discapacidad total temporal',
        'Discapacidad parcial temporal',
        'Discapacidad parcial permanente',
        'Discapacidad total permanente',
        'Disputas de calificación de discapacidad',
        'Rehabilitación vocacional'
      ]
    },
    {
      title: 'Autorización de Tratamiento Médico',
      description: 'Obtenga la atención médica que necesita sin demoras. Obligamos a las compañías de seguros a autorizar tratamientos y cirugías necesarias.',
      features: [
        'Autorización de tratamiento',
        'Derechos de segunda opinión',
        'Referencias a especialistas',
        'Aprobaciones de cirugía',
        'Acceso a terapia física',
        'Cobertura de medicamentos'
      ]
    },
    {
      title: 'Recuperación de Salarios Perdidos',
      description: 'Recupere dos tercios de su salario semanal promedio mientras se recupera. Aseguramos cálculos precisos y pagos oportunos.',
      features: [
        'Cálculo de salario semanal promedio',
        'Reclamos de pago retroactivo',
        'Monitoreo de beneficios continuos',
        'Ajustes por costo de vida',
        'Inclusión de horas extras',
        'Consideración de bonos'
      ]
    },
    {
      title: 'Lesiones en Sitios de Construcción',
      description: 'Los trabajadores de construcción enfrentan peligros serios diariamente. Nos especializamos en asegurar beneficios máximos para víctimas de accidentes de construcción.',
      features: [
        'Reclamos por caídas de altura',
        'Casos de accidentes con equipos',
        'Lesiones por electrocución',
        'Reclamos por colapso de zanjas',
        'Accidentes de andamios',
        'Responsabilidad de terceros'
      ]
    },
    {
      title: 'Lesiones por Estrés Repetitivo',
      description: 'Los movimientos repetitivos causan lesiones reales. Probamos la conexión entre sus deberes laborales y condiciones como túnel carpiano.',
      features: [
        'Síndrome del túnel carpiano',
        'Reclamos de tendinitis',
        'Lesiones de tensión de espalda',
        'Síndrome de pinzamiento del hombro',
        'Dedo en gatillo',
        'Artritis ocupacional'
      ]
    },
    {
      title: 'Reclamos de Enfermedades Ocupacionales',
      description: 'Las enfermedades relacionadas con el trabajo también merecen compensación. Manejamos reclamos por enfermedades causadas por exposición y condiciones en el lugar de trabajo.',
      features: [
        'Exposición al asbesto',
        'Envenenamiento químico',
        'Reclamos por pérdida auditiva',
        'Enfermedades respiratorias',
        'Condiciones de la piel',
        'Enfermedades infecciosas'
      ]
    },
    {
      title: 'Beneficios por Muerte',
      description: 'Cuando los accidentes laborales cobran vidas, ayudamos a las familias a asegurar beneficios por muerte y garantizar estabilidad financiera durante tiempos difíciles.',
      features: [
        'Beneficios de dependencia',
        'Gastos de entierro',
        'Apoyo familiar continuo',
        'Beneficios para hijos menores',
        'Compensación para cónyuge',
        'Coordinación del patrimonio'
      ]
    }
  ];

  const faqs = [
    {
      question: '¿Cuánto cuesta un abogado de compensación laboral?',
      answer: 'Trabajamos bajo contingencia - no paga nada por adelantado. Nuestros honorarios vienen de su acuerdo o adjudicación, típicamente 25% o menos según regulado por la ley de NC.'
    },
    {
      question: '¿Puedo ver a mi propio doctor por una lesión de trabajo?',
      answer: 'Inicialmente, debe ver a los doctores aprobados por el empleador. Sin embargo, puede tener derechos para cambiar doctores u obtener segundas opiniones. Podemos ayudarle a navegar esto.'
    },
    {
      question: '¿Qué pasa si mi reclamo de compensación laboral fue denegado?',
      answer: '¡No se rinda! Muchas denegaciones son injustas. Tenemos amplia experiencia revirtiendo denegaciones a través de apelaciones y audiencias. Llámenos inmediatamente.'
    },
    {
      question: '¿Cuánto tiempo tengo para presentar un reclamo de compensación laboral en NC?',
      answer: 'Debe reportar lesiones dentro de 30 días y presentar el Formulario 18 dentro de 2 años. Sin embargo, actuar rápidamente es crucial para preservar evidencia y testimonio de testigos.'
    },
    {
      question: '¿Me pueden despedir por presentar un reclamo de compensación laboral?',
      answer: 'Es ilegal que los empleadores tomen represalias contra usted por presentar un reclamo legítimo de compensación laboral. Si esto pasa, puede tener remedios legales adicionales.'
    }
  ];

  return (
    <>
      <ModernPracticeAreaTemplate
        title="Abogados de Compensación Laboral de Confianza en Carolina del Norte"
        subtitle="Obtenga Sus Beneficios Aprobados Rápido - YO PELEO POR TI™"
        description="¿Se lesionó en el trabajo? No deje que las compañías de seguros le nieguen sus beneficios legítimos. Con 60+ años luchando por trabajadores lesionados, obtenemos resultados cuando otros no pueden."
        services={services}
        faqs={faqs}
        content={
          <div className="space-y-12">
            {/* Sub-pages Navigation */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Nuestras Especialidades en Compensación Laboral</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <Link 
                  href="/es/areas-de-practica/compensacion-laboral/lesiones-en-el-lugar-de-trabajo"
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 hover:border-primary transition-all group"
                >
                  <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-primary-300">Lesiones en el Lugar de Trabajo</h3>
                  <p className="text-gray-300">Representamos todo tipo de lesiones laborales, desde caídas hasta accidentes con maquinaria.</p>
                </Link>
                
                <Link 
                  href="/es/areas-de-practica/compensacion-laboral/lesiones-de-espalda"
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 hover:border-primary transition-all group"
                >
                  <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-primary-300">Lesiones de Espalda</h3>
                  <p className="text-gray-300">Especialistas en hernias discales, fracturas espinales y dolor crónico de espalda.</p>
                </Link>
                
                <Link 
                  href="/es/areas-de-practica/compensacion-laboral/accidentes-con-maquinaria"
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 hover:border-primary transition-all group"
                >
                  <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-primary-300">Accidentes con Maquinaria</h3>
                  <p className="text-gray-300">Accidentes graves con equipos industriales y maquinaria pesada.</p>
                </Link>
                
                <Link 
                  href="/es/areas-de-practica/compensacion-laboral/enfermedades-ocupacionales"
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 hover:border-primary transition-all group"
                >
                  <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-primary-300">Enfermedades Ocupacionales</h3>
                  <p className="text-gray-300">Enfermedades causadas por exposición química, asbesto y condiciones del trabajo.</p>
                </Link>
                
                <Link 
                  href="/es/areas-de-practica/compensacion-laboral/negacion-de-beneficios"
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 hover:border-primary transition-all group"
                >
                  <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-primary-300">Negación de Beneficios</h3>
                  <p className="text-gray-300">Apelamos denegaciones injustas y luchamos por los beneficios que merece.</p>
                </Link>
                
                <Link 
                  href="/es/areas-de-practica/compensacion-laboral/audiencias-de-compensacion"
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 hover:border-primary transition-all group"
                >
                  <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-primary-300">Audiencias de Compensación</h3>
                  <p className="text-gray-300">Representación experta en audiencias de la Comisión Industrial de NC.</p>
                </Link>
              </div>
            </section>

            {/* Why Choose Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">¿Por Qué Elegir Bufete de Abogados Vásquez para Compensación Laboral?</h2>
              <p className="text-lg mb-6">
                Las compañías de seguros tienen equipos de abogados protegiendo sus ganancias. Usted necesita luchadores experimentados de su lado. Nivelamos el campo de juego y le conseguimos los beneficios que merece.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Reclamos Denegados Revertidos</h3>
                  <p className="text-gray-300">Hemos revertido miles de denegaciones injustas. No acepte "no" como respuesta final.</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Beneficios Máximos</h3>
                  <p className="text-gray-300">Aseguramos cálculos precisos de salarios y luchamos por cada beneficio al que tiene derecho.</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Acceso a Atención Médica</h3>
                  <p className="text-gray-300">Obligamos a las compañías de seguros a aprobar tratamientos, cirugías y medicamentos necesarios.</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Sin Costos Iniciales</h3>
                  <p className="text-gray-300">No paga nada a menos que ganemos. Nuestros honorarios están limitados por ley y vienen de su acuerdo.</p>
                </div>
              </div>
            </section>

            {/* NC Statistics */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Estadísticas de Lesiones Laborales en Carolina del Norte</h2>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-black text-primary mb-2">89,000+</div>
                    <div className="text-gray-300">Lesiones laborales reportadas anualmente en NC</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-black text-primary mb-2">35%</div>
                    <div className="text-gray-300">De reclamos inicialmente denegados por aseguradoras</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-black text-primary mb-2">$890M</div>
                    <div className="text-gray-300">Pagado en beneficios de compensación laboral en NC</div>
                  </div>
                </div>
                <p className="text-center text-gray-300 mt-6">
                  <em>Fuente: Comisión Industrial de Carolina del Norte, 2023</em>
                </p>
              </div>
            </section>

            {/* Common Injuries Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Lesiones Laborales Comunes Que Manejamos</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-primary mb-2">Espalda y Columna</h3>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• Hernias discales</li>
                    <li>• Fracturas espinales</li>
                    <li>• Dolor crónico de espalda</li>
                    <li>• Ciática</li>
                  </ul>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-primary mb-2">Parte Superior del Cuerpo</h3>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• Desgarros del manguito rotador</li>
                    <li>• Túnel carpiano</li>
                    <li>• Lesiones del cuello</li>
                    <li>• Fracturas de brazo</li>
                  </ul>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-primary mb-2">Lesiones Graves</h3>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• Lesiones cerebrales</li>
                    <li>• Amputaciones</li>
                    <li>• Quemaduras</li>
                    <li>• Pérdida de visión</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Process Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Nuestro Proceso de Compensación Laboral</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">1.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Revisión Gratuita del Caso</h3>
                    <p className="text-gray-300">Evaluamos su reclamo, explicamos sus derechos y desarrollamos una estrategia ganadora - todo sin costo.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">2.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Presentación y Manejo del Reclamo</h3>
                    <p className="text-gray-300">Manejamos todos los documentos, plazos y comunicaciones con empleadores y aseguradoras.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">3.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Maximización de Beneficios</h3>
                    <p className="text-gray-300">Luchamos por reemplazo completo de salarios, cobertura médica completa y calificaciones de discapacidad.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">4.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Apelaciones y Audiencias</h3>
                    <p className="text-gray-300">Si es necesario, lo representamos en audiencias de la Comisión Industrial para asegurar sus beneficios.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Industries Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Industrias Que Servimos</h2>
              <p className="text-lg mb-8">
                Todo trabajador merece protección. Representamos trabajadores lesionados en todas las industrias a través de Carolina del Norte:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20 text-center">
                  <h3 className="font-semibold text-primary">Construcción</h3>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20 text-center">
                  <h3 className="font-semibold text-primary">Manufactura</h3>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20 text-center">
                  <h3 className="font-semibold text-primary">Atención Médica</h3>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20 text-center">
                  <h3 className="font-semibold text-primary">Transporte</h3>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20 text-center">
                  <h3 className="font-semibold text-primary">Ventas al Detalle</h3>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20 text-center">
                  <h3 className="font-semibold text-primary">Hospitalidad</h3>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20 text-center">
                  <h3 className="font-semibold text-primary">Agricultura</h3>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20 text-center">
                  <h3 className="font-semibold text-primary">Gobierno</h3>
                </div>
              </div>
            </section>
          </div>
        }
      />
      
      {/* Structured Data */}
      <Script
        id="workers-compensation-structured-data-es"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Servicios de Compensación Laboral - Bufete de Abogados Vásquez',
            description: 'Servicios legales expertos de compensación laboral en Carolina del Norte incluyendo presentación de reclamos, apelaciones de reclamos denegados, beneficios por discapacidad y representación de lesiones laborales.',
            provider: {
              '@type': 'Attorney',
              name: 'Bufete de Abogados Vásquez, PLLC',
              url: 'https://www.vasquezlawfirm.com'
            },
            areaServed: {
              '@type': 'State',
              name: 'Carolina del Norte'
            },
            serviceType: 'Ley de Compensación Laboral',
            offers: {
              '@type': 'Offer',
              name: 'Consulta Gratuita',
              price: '0',
              priceCurrency: 'USD'
            },
            inLanguage: 'es'
          })
        }}
      />
      
      {/* Local Business Structured Data */}
      <Script
        id="workers-compensation-local-business-es"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Attorney',
            name: 'Bufete de Abogados Vásquez, PLLC',
            image: 'https://www.vasquezlawfirm.com/images/vasquez-law-firm-logo.png',
            url: 'https://www.vasquezlawfirm.com',
            telephone: '+1-844-967-3536',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '333 Fayetteville Street, Suite 810',
              addressLocality: 'Raleigh',
              addressRegion: 'NC',
              postalCode: '27601',
              addressCountry: 'US'
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 35.7796,
              longitude: -78.6382
            },
            openingHoursSpecification: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              opens: '08:00',
              closes: '18:00'
            },
            sameAs: [
              'https://www.facebook.com/vasquezlawfirm',
              'https://twitter.com/vasquezlawfirm',
              'https://www.linkedin.com/company/vasquez-law-firm',
              'https://www.youtube.com/vasquezlawfirm'
            ],
            priceRange: '$$',
            inLanguage: 'es'
          })
        }}
      />
    </>
  );
}
