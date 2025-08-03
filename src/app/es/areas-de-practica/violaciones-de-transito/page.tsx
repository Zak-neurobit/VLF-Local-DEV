import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Script from 'next/script';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Mejores Abogados de Multas de Tránsito en NC | Salve Su Licencia | YO PELEO POR TI™',
  description:
    'Abogados expertos en violaciones de tránsito en Carolina del Norte. Mantenga su licencia, evite puntos, reduzca seguros. Exceso de velocidad, conducción imprudente, CDL. Rápido y asequible.',
  keywords:
    'abogado multas tránsito NC, abogado exceso velocidad Carolina del Norte, abogado violaciones tránsito, abogado multas CDL, restauración licencia NC, abogado tránsito Raleigh, abogado multas Charlotte, corte tránsito Durham, abogado CDL Greensboro, abogado licencia Winston Salem',
  openGraph: {
    title: 'Mejores Abogados de Multas de Tránsito en NC | Salve Su Licencia | Vasquez Law Firm',
    description:
      'Abogados expertos en violaciones de tránsito en Carolina del Norte. Mantenga su licencia, evite puntos, reduzca seguros. Exceso de velocidad, conducción imprudente, CDL.',
    url: `https://www.vasquezlawnc.com/es/areas-de-practica/violaciones-de-transito`,
    siteName: 'Vasquez Law Firm, PLLC',
    images: [
      {
        url: '/images/practice-areas/traffic-violations-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Servicios de Violaciones de Tránsito en Carolina del Norte',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mejores Abogados de Multas de Tránsito en NC | Salve Su Licencia | Vasquez Law Firm',
    description:
      'Abogados expertos en violaciones de tránsito en Carolina del Norte. Mantenga su licencia, evite puntos, reduzca seguros. Exceso de velocidad, conducción imprudente, CDL.',
    images: ['/images/practice-areas/traffic-violations-hero.jpg'],
  },
  alternates: {
    canonical: `https://www.vasquezlawnc.com/es/areas-de-practica/violaciones-de-transito`,
    languages: {
      'en-US': `https://www.vasquezlawnc.com/practice-areas/traffic-violations`,
      'es-ES': `https://www.vasquezlawnc.com/es/areas-de-practica/violaciones-de-transito`,
    },
  },
};

export default function ViolacionesTransitoPage() {
  const services = [
    {
      title: 'Defensa de Multas por Exceso de Velocidad',
      description:
        'Luchamos contra multas de velocidad para evitar puntos, aumento de seguros y suspensión de licencia. Sabemos cómo desafiar evidencia de radar y errores de procedimiento.',
      features: [
        'Desafíos de radar/láser',
        'Defensas de trampas de velocidad',
        'Problemas de calibración de equipo',
        'Verificación de entrenamiento del oficial',
        'Negociaciones de reducción',
        'Oración para juicio continuado',
      ],
    },
    {
      title: 'Defensa de Conducción Imprudente',
      description:
        'La conducción imprudente es un delito menor grave en NC. Trabajamos para reducir o desestimar cargos que podrían resultar en tiempo de cárcel y récords criminales permanentes.',
      features: [
        'Cargos imprudentes relacionados con velocidad',
        'Defensa de conducción agresiva',
        'Cargos de carreras y competencia',
        'Alegaciones de peligro',
        'Reducción de delito menor',
        'Preservación de licencia',
      ],
    },
    {
      title: 'Suspensión/Restauración de Licencia',
      description:
        '¿Perdió su licencia? Ayudamos a restaurar privilegios de conducir mediante audiencias, privilegios limitados de conducir y desafiando la base para suspensión.',
      features: [
        'Representación en audiencias DMV',
        'Privilegios limitados de conducir',
        'Navegación del sistema de puntos',
        'Estrategias para múltiples infracciones',
        'Problemas de licencia de otro estado',
        'Aplicaciones de licencia por dificultades',
      ],
    },
    {
      title: 'Defensa de Violaciones CDL',
      description:
        'Los conductores comerciales no pueden permitirse multas. Protegemos a portadores de CDL de violaciones que pueden terminar carreras con estrategias especializadas de defensa.',
      features: [
        'Defensa de violaciones DOT',
        'Violaciones de bitácora',
        'Problemas de límite de peso',
        'Violaciones de equipo',
        'Prevención de descalificación CDL',
        'Violaciones de comercio interestatal',
      ],
    },
    {
      title: 'Violaciones de Movimiento',
      description:
        'Desde pasar luces rojas hasta cambios impropios de carril, defendemos contra todas las violaciones de movimiento para proteger su récord y tarifas de seguro.',
      features: [
        'Violaciones de luz roja',
        'Violaciones de señal de alto',
        'Cambio impropio de carril',
        'Seguir muy de cerca',
        'Falta de ceder el paso',
        'Rebase ilegal',
      ],
    },
    {
      title: 'Prevención de Puntos de Seguro',
      description:
        'Incluso multas "menores" pueden aumentar sus tarifas de seguro por años. Luchamos para mantener puntos fuera de su récord y dinero en su bolsillo.',
      features: [
        'Estrategias de reducción de puntos',
        'Protección de tarifas de seguro',
        'Preservación de estatus de conductor seguro',
        'Defensa de múltiples multas',
        'Manejo de multas de otro estado',
        'Programas de mejoramiento del conductor',
      ],
    },
    {
      title: 'Defensa de Atropello y Fuga',
      description:
        'Los cargos de abandonar la escena conllevan penalidades severas. Proporcionamos defensa agresiva para proteger su libertad y privilegios de conducir.',
      features: [
        'Casos de daño a propiedad',
        'Incidentes de lesiones personales',
        'Falta de reportar accidentes',
        'Problemas de identificación de testigos',
        'Desafíos de evidencia',
        'Reducción de cargos de felonía',
      ],
    },
    {
      title: 'Infracciones de Tránsito Relacionadas con DWI',
      description:
        'Las violaciones de tránsito conectadas con cargos DWI requieren atención especial. Coordinamos estrategias de defensa para minimizar consecuencias generales.',
      features: [
        'Violaciones de contenedor abierto',
        'Conducir después de consumir',
        'Problemas de revocación de licencia',
        'Violaciones de interruptor de ignición',
        'Violaciones de privilegio limitado',
        'Infracciones de alcohol para menores',
      ],
    },
    {
      title: 'Equipo y Registro',
      description:
        'Las multas de reparación y problemas de registro pueden escalar rápidamente. Ayudamos a resolver estos asuntos eficientemente para evitar problemas mayores.',
      features: [
        'Registro vencido',
        'Cargos de no tener seguro',
        'Violaciones de equipo',
        'Citaciones de tinte de ventanas',
        'Violaciones de sistema de escape',
        'Problemas de inspección de seguridad',
      ],
    },
  ];

  const faqs = [
    {
      question: '¿Debería simplemente pagar mi multa de tránsito?',
      answer:
        '¡No! Pagar una multa es una admisión de culpabilidad que agrega puntos a su licencia y aumenta las tarifas de seguro. Siempre consulte a un abogado primero - a menudo conseguimos multas reducidas o desestimadas.',
    },
    {
      question: '¿Cuánto cuesta un abogado de tránsito?',
      answer:
        'Nuestra defensa de multas de tránsito comienza con tarifas muy asequibles, a menudo menos que el aumento de costos de seguro por la multa. Ofrecemos tarifas fijas sin costos ocultos.',
    },
    {
      question: '¿Tengo que ir a corte?',
      answer:
        'En la mayoría de casos, podemos aparecer en corte por usted, ahorrándole tiempo y viaje. No necesitará faltar al trabajo o manejar largas distancias.',
    },
    {
      question: '¿Pueden ayudar con licencias de otro estado?',
      answer:
        '¡Sí! Regularmente ayudamos a conductores de otros estados con multas de NC. La mayoría de estados comparten información de violaciones, así que multas de NC pueden afectar su licencia de estado de origen.',
    },
    {
      question: '¿Qué hay sobre multas CDL?',
      answer:
        'Los portadores de CDL enfrentan reglas más estrictas y penalidades más duras. Nos especializamos en proteger privilegios de conducir comercial y entendemos las regulaciones DOT.',
    },
  ];

  return (
    <>
      <ModernPracticeAreaTemplate
        title="La Firma de Defensa de Multas de Tránsito #1 de Carolina del Norte"
        subtitle="Salve Su Licencia - Proteja Su Seguro - Evite Puntos"
        description="No deje que las multas de tránsito descarrilen su vida. Con 60+ años de experiencia y oficinas por todo NC, hacemos que luchar contra multas sea fácil y asequible."
        services={services}
        faqs={faqs}
        content={
          <div className="space-y-12">
            {/* Why Fight Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                ¿Por Qué Luchar Contra Su Multa de Tránsito?
              </h2>
              <p className="text-lg mb-6">
                Esa multa de velocidad &quot;simple&quot; puede costar miles en tarifas de seguro
                aumentadas, arriesgar su licencia, e incluso afectar el empleo. No la pague
                simplemente - luche contra ella con abogados experimentados que saben cómo ganar.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Salve Su Licencia</h3>
                  <p className="text-gray-300">
                    Múltiples multas pueden llevar a suspensión. Protegemos sus privilegios de
                    conducir con estrategias probadas de defensa.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">
                    Tarifas de Seguro Más Bajas
                  </h3>
                  <p className="text-gray-300">
                    Incluso una multa puede aumentar tarifas en 30%+. Luchamos para mantener puntos
                    fuera de su récord.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">
                    Representación Conveniente
                  </h3>
                  <p className="text-gray-300">
                    Aparecemos en corte por usted. No hay trabajo perdido, no hay viajes largos, no
                    hay molestias.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Tarifas Fijas Asequibles</h3>
                  <p className="text-gray-300">
                    Precios claros y directos que a menudo son menos que lo que sería su aumento de
                    seguro.
                  </p>
                </div>
              </div>
            </section>

            {/* NC Points System */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Entendiendo el Sistema de Puntos de NC
              </h2>
              <p className="text-lg mb-6">
                Carolina del Norte usa tanto puntos DMV (afectando su licencia) como puntos de
                seguro (afectando sus tarifas). Aquí está lo que cuestan las violaciones comunes:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-4">Puntos de Licencia</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Velocidad 10 mph o menos: 2 puntos</li>
                    <li>• Velocidad 11-15 mph sobre límite: 3 puntos</li>
                    <li>• Velocidad sobre 55 mph: 3 puntos</li>
                    <li>• Conducción imprudente: 4 puntos</li>
                    <li>• Seguir muy de cerca: 4 puntos</li>
                    <li>• Pasar luz roja: 3 puntos</li>
                  </ul>
                  <p className="mt-4 text-sm text-gray-400">
                    12 puntos en 3 años = suspensión de licencia
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-4">Puntos de Seguro</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Velocidad 10 mph o menos: 1 punto (30% aumento)</li>
                    <li>• Velocidad 11-15 mph sobre límite: 2 puntos (45% aumento)</li>
                    <li>• Velocidad sobre 55 mph: 2 puntos (45% aumento)</li>
                    <li>• Conducción imprudente: 4 puntos (80% aumento)</li>
                    <li>• Accidente culpable: 3 puntos (60% aumento)</li>
                    <li>• DWI: 12 puntos (340% aumento)</li>
                  </ul>
                  <p className="mt-4 text-sm text-gray-400">
                    Puntos permanecen en seguro por 3 años
                  </p>
                </div>
              </div>
            </section>

            {/* Process Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Nuestro Proceso de Defensa de Tránsito
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">1.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Revisión Gratuita de Multa</h3>
                    <p className="text-gray-300">
                      Envíenos su multa para una evaluación gratuita. Le explicaremos sus opciones y
                      resultados probables.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">2.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Cotización de Tarifa Fija</h3>
                    <p className="text-gray-300">
                      Obtenga precios transparentes y asequibles sin tarifas ocultas o sorpresas.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">3.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Nosotros Manejamos Todo</h3>
                    <p className="text-gray-300">
                      Aparecemos en corte, negociamos con fiscales, y luchamos por el mejor
                      resultado posible.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">4.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Notificación de Resultados</h3>
                    <p className="text-gray-300">
                      Le notificamos inmediatamente del resultado y manejamos cualquier seguimiento
                      necesario.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Coverage Area */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Manejamos Multas en Todos los Condados de NC
              </h2>
              <p className="text-lg mb-8">
                ¿Recibió una multa en cualquier lugar de Carolina del Norte? Lo tenemos cubierto.
                Nuestros abogados aparecen regularmente en cortes de tránsito en todos los 100
                condados.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-primary mb-2">Ciudades Principales</h3>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• Raleigh</li>
                    <li>• Charlotte</li>
                    <li>• Durham</li>
                    <li>• Greensboro</li>
                  </ul>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-primary mb-2">Multas de Autopista</h3>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• I-40</li>
                    <li>• I-85</li>
                    <li>• I-95</li>
                    <li>• I-77</li>
                  </ul>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-primary mb-2">Condados Rurales</h3>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• Pueblos pequeños</li>
                    <li>• Trampas de velocidad</li>
                    <li>• Carreteras del condado</li>
                    <li>• Zonas escolares</li>
                  </ul>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-primary mb-2">Áreas Especiales</h3>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• Bases militares</li>
                    <li>• Campus universitarios</li>
                    <li>• Zonas de trabajo</li>
                    <li>• Propiedad federal</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        }
      />

      {/* Structured Data */}
      <Script
        id="traffic-violations-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Servicios Legales de Violaciones de Tránsito - Vasquez Law Firm',
            description:
              'Servicios expertos de defensa de multas de tránsito en Carolina del Norte incluyendo multas de velocidad, conducción imprudente, restauración de licencia y violaciones CDL.',
            provider: {
              '@type': 'Attorney',
              name: 'Vasquez Law Firm, PLLC',
              url: 'https://www.vasquezlawnc.com',
            },
            areaServed: {
              '@type': 'State',
              name: 'Carolina del Norte',
            },
            serviceType: 'Ley de Tránsito',
            offers: {
              '@type': 'Offer',
              name: 'Revisión Gratuita de Multa',
              price: '0',
              priceCurrency: 'USD',
            },
          }),
        }}
      />

      {/* Local Business Structured Data */}
      <Script
        id="traffic-violations-local-business"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Attorney',
            name: 'Vasquez Law Firm, PLLC',
            image: 'https://www.vasquezlawnc.com/images/vasquez-law-firm-logo.png',
            url: 'https://www.vasquezlawnc.com',
            telephone: '+1-844-967-3536',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '333 Fayetteville Street, Suite 810',
              addressLocality: 'Raleigh',
              addressRegion: 'NC',
              postalCode: '27601',
              addressCountry: 'US',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 35.7796,
              longitude: -78.6382,
            },
            openingHoursSpecification: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              opens: '08:00',
              closes: '18:00',
            },
            sameAs: [
              'https://www.facebook.com/vasquezlawfirm',
              'https://twitter.com/vasquezlawfirm',
              'https://www.linkedin.com/company/vasquez-law-firm',
              'https://www.youtube.com/vasquezlawfirm',
            ],
            priceRange: '$$',
          }),
        }}
      />
    </>
  );
}
