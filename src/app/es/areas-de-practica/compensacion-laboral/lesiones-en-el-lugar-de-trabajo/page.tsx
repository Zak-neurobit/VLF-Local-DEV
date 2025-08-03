import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Script from 'next/script';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Abogados de Lesiones en el Lugar de Trabajo NC | YO PELEO POR TI™ | Vásquez Law',
  description:
    'Abogados expertos en lesiones laborales de NC. Caídas, cortes, aplastamientos, quemaduras. Obtenga compensación completa. Consulta gratuita. 60+ años de experiencia. Se habla español.',
  keywords:
    'lesiones lugar trabajo NC, abogado accidentes laborales, caídas trabajo, cortes laborales, aplastamiento trabajo, quemaduras trabajo, lesiones industriales NC, compensación lesiones trabajo, abogado lesiones trabajo Raleigh, abogado accidentes trabajo Charlotte',
  openGraph: {
    title: 'Abogados de Lesiones en el Lugar de Trabajo NC | YO PELEO POR TI™',
    description:
      'Abogados expertos en lesiones laborales de NC. Caídas, cortes, aplastamientos, quemaduras. Obtenga compensación completa. Consulta gratuita.',
    url: 'https://www.vasquezlawfirm.com/es/areas-de-practica/compensacion-laboral/lesiones-en-el-lugar-de-trabajo',
    siteName: 'Bufete de Abogados Vásquez, PLLC',
    images: [
      {
        url: '/images/practice-areas/workplace-injuries-es.jpg',
        width: 1200,
        height: 630,
        alt: 'Lesiones en el Lugar de Trabajo Carolina del Norte',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  alternates: {
    canonical:
      'https://www.vasquezlawfirm.com/es/areas-de-practica/compensacion-laboral/lesiones-en-el-lugar-de-trabajo',
    languages: {
      'en-US':
        'https://www.vasquezlawfirm.com/practice-areas/workers-compensation/workplace-injuries',
      'es-ES':
        'https://www.vasquezlawfirm.com/es/areas-de-practica/compensacion-laboral/lesiones-en-el-lugar-de-trabajo',
    },
  },
};

export default function LesionesEnElLugarDeTrabajoPage() {
  const services = [
    {
      title: 'Caídas y Resbalones en el Trabajo',
      description:
        'Las caídas son la causa principal de lesiones laborales en NC. Manejamos casos de caídas desde escaleras, andamios, techos y superficies resbalosas.',
      features: [
        'Caídas desde altura',
        'Resbalones en superficies mojadas',
        'Tropiezos con obstáculos',
        'Caídas de escaleras y andamios',
        'Superficies desiguales',
        'Falta de equipos de seguridad',
      ],
    },
    {
      title: 'Cortes y Laceraciones',
      description:
        'Herramientas cortantes y maquinaria causan lesiones graves. Obtenemos compensación por cirugías, cicatrices permanentes y discapacidad.',
      features: [
        'Cortes con herramientas eléctricas',
        'Laceraciones con cuchillos',
        'Heridas por vidrios rotos',
        'Cortes profundos con metal',
        'Amputaciones parciales',
        'Cicatrices desfigurantes',
      ],
    },
    {
      title: 'Lesiones por Aplastamiento',
      description:
        'Objetos pesados y maquinaria pueden causar lesiones devastadoras. Luchamos por compensación máxima para estas lesiones graves.',
      features: [
        'Aplastamiento de manos y dedos',
        'Lesiones por objetos pesados',
        'Accidentes con prensas',
        'Aplastamiento por vehículos',
        'Fracturas múltiples',
        'Lesiones de médula espinal',
      ],
    },
    {
      title: 'Quemaduras en el Trabajo',
      description:
        'Químicos, electricidad y calor causan quemaduras graves. Aseguramos tratamiento especializado y compensación por dolor permanente.',
      features: [
        'Quemaduras químicas',
        'Quemaduras eléctricas',
        'Quemaduras por calor extremo',
        'Quemaduras por vapor',
        'Exposición a ácidos',
        'Injertos de piel necesarios',
      ],
    },
    {
      title: 'Lesiones por Objetos que Caen',
      description:
        'Herramientas y materiales que caen causan lesiones graves de cabeza y cuerpo. Probamos negligencia del empleador y fallas de seguridad.',
      features: [
        'Herramientas que caen',
        'Materiales de construcción',
        'Lesiones de cabeza',
        'Fracturas de cráneo',
        'Lesiones cerebrales',
        'Conmociones cerebrales',
      ],
    },
    {
      title: 'Lesiones por Levantamiento',
      description:
        'Levantar objetos pesados causa hernias discales y lesiones de espalda. Documentamos técnicas inadecuadas y sobrecarga de trabajo.',
      features: [
        'Hernias discales',
        'Distensiones musculares',
        'Lesiones de hombro',
        'Desgarros de ligamentos',
        'Lesiones de rodilla',
        'Dolor crónico',
      ],
    },
  ];

  const faqs = [
    {
      question: '¿Qué debo hacer inmediatamente después de una lesión en el trabajo?',
      answer:
        'Busque atención médica inmediata, reporte la lesión a su supervisor por escrito, tome fotos de la escena si es posible, y contacte a un abogado de compensación laboral dentro de 24 horas.',
    },
    {
      question: '¿Mi empleador puede obligarme a regresar al trabajo si estoy lesionado?',
      answer:
        'No. Su empleador no puede forzarlo a trabajar si un médico autorizado dice que no puede. Esto constituye represalia ilegal y podemos demandar por daños adicionales.',
    },
    {
      question: '¿Puedo obtener compensación por cicatrices permanentes?',
      answer:
        'Sí. Las cicatrices y desfiguración son compensables bajo la ley de NC. El monto depende de la ubicación, tamaño y impacto en su vida diaria y capacidad de trabajo.',
    },
    {
      question: '¿Qué pasa si mi lesión empeora con el tiempo?',
      answer:
        'Puede reabrir su caso si su condición empeora significativamente. Es crucial mantener seguimiento médico continuo y documentar cualquier deterioro.',
    },
    {
      question: '¿Cómo prueban que mi empleador fue negligente?',
      answer:
        'Investigamos violaciones de seguridad, entrenamiento inadecuado, equipos defectuosos, y falta de supervisión. Utilizamos expertos en seguridad y testigos para probar negligencia.',
    },
  ];

  return (
    <>
      <ModernPracticeAreaTemplate
        title="Abogados de Lesiones en el Lugar de Trabajo"
        subtitle="Cuando el Trabajo Se Vuelve Peligroso - YO PELEO POR TI™"
        description="¿Se lesionó en el trabajo? Desde caídas hasta cortes y quemaduras, las lesiones laborales pueden cambiar su vida para siempre. Con 60+ años de experiencia, sabemos cómo obtener la máxima compensación por cada tipo de lesión laboral."
        services={services}
        faqs={faqs}
        content={
          <div className="space-y-12">
            {/* Emergency Section */}
            <section className="bg-red-900/20 border border-red-500/30 rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-6 text-red-400">
                🚨 LESIONADO EN EL TRABAJO? ACTÚE AHORA
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-primary mb-3">Pasos Inmediatos:</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>✓ Busque atención médica INMEDIATA</li>
                    <li>✓ Reporte a su supervisor POR ESCRITO</li>
                    <li>✓ Tome fotos de la escena</li>
                    <li>✓ Obtenga nombres de testigos</li>
                    <li>✓ NO admita culpa</li>
                    <li>✓ Llame a un abogado EN 24 HORAS</li>
                  </ul>
                </div>
                <div className="bg-primary/10 rounded-lg p-6 border border-primary/30">
                  <h3 className="text-xl font-bold text-primary mb-3">¿Por Qué Es Urgente?</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Debe reportar en 30 días</li>
                    <li>• Evidencia se pierde rápidamente</li>
                    <li>• Testigos olvidan detalles</li>
                    <li>• Cámaras se sobrescriben</li>
                    <li>• Empleador puede alterar escena</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* NC Statistics */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Estadísticas Alarmantes de NC
              </h2>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                  <div className="text-3xl font-black text-red-400 mb-2">127</div>
                  <div className="text-gray-300">Muertes laborales en NC (2023)</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                  <div className="text-3xl font-black text-orange-400 mb-2">24%</div>
                  <div className="text-gray-300">Caídas fatales en construcción</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                  <div className="text-3xl font-black text-yellow-400 mb-2">15,000+</div>
                  <div className="text-gray-300">Lesiones por cortes anualmente</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                  <div className="text-3xl font-black text-primary mb-2">$2.8B</div>
                  <div className="text-gray-300">Costo de lesiones laborales en NC</div>
                </div>
              </div>
              <p className="text-center text-gray-400 mt-4 text-sm">
                <em>
                  Fuente: Departamento de Trabajo de NC, Administración de Seguridad y Salud
                  Ocupacional
                </em>
              </p>
            </section>

            {/* Industries at Risk */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Industrias de Mayor Riesgo en Carolina del Norte
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-red-400 mb-3">🏗️ Construcción</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• 1 de cada 5 muertes laborales</li>
                    <li>• Caídas (33% de muertes)</li>
                    <li>• Electrocución</li>
                    <li>• Objetos que caen</li>
                    <li>• Atrapamiento</li>
                  </ul>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-orange-400 mb-3">🏭 Manufactura</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Cortes con maquinaria</li>
                    <li>• Atrapamiento en equipos</li>
                    <li>• Quemaduras químicas</li>
                    <li>• Lesiones repetitivas</li>
                    <li>• Exposición tóxica</li>
                  </ul>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-yellow-400 mb-3">🚛 Transporte</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Accidentes vehiculares</li>
                    <li>• Caídas de camiones</li>
                    <li>• Lesiones de carga</li>
                    <li>• Atropellamientos</li>
                    <li>• Fatiga del conductor</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Types of Injuries */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Tipos Comunes de Lesiones Laborales
              </h2>
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-4">
                    Lesiones Traumáticas Agudas
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-2">Lesiones Graves:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Fracturas múltiples</li>
                        <li>• Lesiones cerebrales traumáticas</li>
                        <li>• Lesiones de médula espinal</li>
                        <li>• Amputaciones</li>
                        <li>• Quemaduras de tercer grado</li>
                        <li>• Lesiones oculares permanentes</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-2">Compensación Incluye:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Gastos médicos de por vida</li>
                        <li>• Salarios perdidos completos</li>
                        <li>• Beneficios por discapacidad</li>
                        <li>• Rehabilitación vocacional</li>
                        <li>• Modificaciones del hogar</li>
                        <li>• Cuidado personal futuro</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-4">
                    Lesiones de Desarrollo Gradual
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-2">Condiciones Comunes:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Síndrome del túnel carpiano</li>
                        <li>• Tendinitis crónica</li>
                        <li>• Bursitis</li>
                        <li>• Artritis ocupacional</li>
                        <li>• Pérdida auditiva</li>
                        <li>• Enfermedades respiratorias</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-2">Desafíos Legales:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Probar conexión laboral</li>
                        <li>• Documentación médica extensa</li>
                        <li>• Análisis de tareas laborales</li>
                        <li>• Testimonio de expertos</li>
                        <li>• Historial de exposición</li>
                        <li>• Evaluaciones especializadas</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Legal Process */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Nuestro Proceso Legal Comprobado
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary text-black rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-6 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Investigación Inmediata de la Escena
                    </h3>
                    <p className="text-gray-300 mb-3">
                      Visitamos el lugar del accidente dentro de 24-48 horas para preservar
                      evidencia crucial antes de que desaparezca.
                    </p>
                    <ul className="text-gray-400 text-sm space-y-1">
                      <li>• Fotografía forense de la escena</li>
                      <li>• Mediciones y diagramas detallados</li>
                      <li>• Entrevistas con testigos</li>
                      <li>• Recolección de evidencia física</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary text-black rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-6 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Documentación Médica Completa</h3>
                    <p className="text-gray-300 mb-3">
                      Trabajamos con especialistas médicos para documentar completamente sus
                      lesiones y necesidades futuras.
                    </p>
                    <ul className="text-gray-400 text-sm space-y-1">
                      <li>• Evaluaciones médicas independientes</li>
                      <li>• Pronósticos de recuperación</li>
                      <li>• Cálculos de gastos futuros</li>
                      <li>• Planes de tratamiento a largo plazo</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary text-black rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-6 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Análisis de Responsabilidad</h3>
                    <p className="text-gray-300 mb-3">
                      Identificamos todas las partes responsables y violaciones de seguridad que
                      contribuyeron a su lesión.
                    </p>
                    <ul className="text-gray-400 text-sm space-y-1">
                      <li>• Revisión de protocolos de seguridad</li>
                      <li>• Análisis de entrenamiento</li>
                      <li>• Inspección de equipos</li>
                      <li>• Evaluación de supervisión</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary text-black rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-6 flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Maximización de Compensación</h3>
                    <p className="text-gray-300 mb-3">
                      Luchamos por cada dólar que merece, incluyendo beneficios que las aseguradoras
                      intentan ocultar.
                    </p>
                    <ul className="text-gray-400 text-sm space-y-1">
                      <li>• Beneficios médicos completos</li>
                      <li>• Compensación salarial máxima</li>
                      <li>• Beneficios por discapacidad</li>
                      <li>• Rehabilitación vocacional</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Why Choose Us */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Por Qué Somos Diferentes</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                    <h3 className="text-lg font-bold text-primary mb-3">
                      Experiencia en Seguridad Industrial
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Nuestro equipo incluye ex-inspectores de OSHA y expertos en seguridad que
                      conocen exactamente qué buscar en violaciones que causan lesiones.
                    </p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                    <h3 className="text-lg font-bold text-primary mb-3">
                      Red Médica Especializada
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Trabajamos con los mejores especialistas en lesiones laborales de NC que
                      entienden cómo documentar casos para máxima compensación.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                    <h3 className="text-lg font-bold text-primary mb-3">
                      Tecnología Forense Avanzada
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Utilizamos reconstrucción de accidentes por computadora, análisis biomecánico
                      y modelado 3D para probar exactamente qué pasó.
                    </p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                    <h3 className="text-lg font-bold text-primary mb-3">Apoyo 24/7 en Español</h3>
                    <p className="text-gray-300 text-sm">
                      Entendemos que las lesiones no esperan horarios de oficina. Nuestro equipo
                      bilingüe está disponible cuando nos necesite.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        }
      />

      {/* Structured Data */}
      <Script
        id="workplace-injuries-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Abogados de Lesiones en el Lugar de Trabajo - Bufete de Abogados Vásquez',
            description:
              'Representación legal experta para lesiones en el lugar de trabajo en Carolina del Norte. Caídas, cortes, quemaduras, aplastamientos y más. Consulta gratuita.',
            provider: {
              '@type': 'Attorney',
              name: 'Bufete de Abogados Vásquez, PLLC',
              url: 'https://www.vasquezlawfirm.com',
            },
            areaServed: {
              '@type': 'State',
              name: 'Carolina del Norte',
            },
            serviceType: 'Lesiones en el Lugar de Trabajo',
            offers: {
              '@type': 'Offer',
              name: 'Consulta Gratuita de Emergencia',
              price: '0',
              priceCurrency: 'USD',
            },
            inLanguage: 'es',
          }),
        }}
      />
    </>
  );
}
