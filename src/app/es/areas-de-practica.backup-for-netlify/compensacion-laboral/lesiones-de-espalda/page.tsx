import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Script from 'next/script';
export const metadata: Metadata = {
  title: 'Abogados de Lesiones de Espalda Laborales NC | YO PELEO POR TI™ | Hernias Discales',
  description:
    'Abogados expertos en lesiones de espalda en el trabajo NC. Hernias discales, ciática, fracturas espinales. Cirugías autorizadas. Compensación máxima. Consulta gratuita. Se habla español.',
  keywords:
    'lesiones espalda trabajo NC, hernia discal trabajo, ciática laboral, fracturas espinales trabajo, dolor espalda crónico, cirugía espalda trabajo, compensación lesiones espalda, abogado lesiones columna NC, abogado hernias discales Raleigh',
  openGraph: {
    title: 'Abogados de Lesiones de Espalda Laborales NC | YO PELEO POR TI™',
    description:
      'Abogados expertos en lesiones de espalda en el trabajo NC. Hernias discales, ciática, fracturas espinales. Cirugías autorizadas. Compensación máxima.',
    url: 'https://www.vasquezlawfirm.com/es/areas-de-practica/compensacion-laboral/lesiones-de-espalda',
    siteName: 'Bufete de Abogados Vásquez, PLLC',
    images: [
      {
        url: '/images/practice-areas/back-injuries-work-es.jpg',
        width: 1200,
        height: 630,
        alt: 'Lesiones de Espalda en el Trabajo Carolina del Norte',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  alternates: {
    canonical:
      'https://www.vasquezlawfirm.com/es/areas-de-practica/compensacion-laboral/lesiones-de-espalda',
    languages: {
      'en-US': 'https://www.vasquezlawfirm.com/practice-areas/workers-compensation/back-injuries',
      'es-ES':
        'https://www.vasquezlawfirm.com/es/areas-de-practica/compensacion-laboral/lesiones-de-espalda',
    },
  },
};

export default function LesionesDeEspaldaPage() {
  const services = [
    {
      title: 'Hernias Discales Laborales',
      description:
        'Las hernias discales son las lesiones de espalda más comunes en el trabajo. Forzamos a las aseguradoras a aprobar cirugías necesarias y pagos completos.',
      features: [
        'Hernia discal lumbar L4-L5, L5-S1',
        'Hernia discal cervical C5-C6, C6-C7',
        'Protrusión discal',
        'Ruptura del anillo fibroso',
        'Compresión de nervios',
        'Cirugías de fusión espinal',
      ],
    },
    {
      title: 'Ciática y Dolor Radicular',
      description:
        'El dolor que se irradia por la pierna indica compresión nerviosa grave. Obtenemos tratamiento especializado y compensación por dolor crónico.',
      features: [
        'Ciática severa',
        'Dolor radicular',
        'Entumecimiento permanente',
        'Debilidad muscular',
        'Pérdida de reflejos',
        'Inyecciones epidurales',
      ],
    },
    {
      title: 'Fracturas Espinales',
      description:
        'Las fracturas de vértebras requieren tratamiento inmediato. Aseguramos cirugías de emergencia y compensación por discapacidad permanente.',
      features: [
        'Fracturas por compresión',
        'Fracturas estallido',
        'Fracturas de cuerpo vertebral',
        'Inestabilidad espinal',
        'Cifoplastia/Vertebroplastia',
        'Instrumentación espinal',
      ],
    },
    {
      title: 'Lesiones de Médula Espinal',
      description:
        'Las lesiones medulares cambian vidas para siempre. Luchamos por beneficios de por vida y cuidado médico especializado.',
      features: [
        'Lesión medular incompleta',
        'Síndrome de cola de caballo',
        'Paraplejía parcial',
        'Pérdida función intestinal/vesical',
        'Rehabilitación especializada',
        'Cuidado de por vida',
      ],
    },
    {
      title: 'Lesiones por Levantamiento',
      description:
        'Levantar incorrectamente o cargas excesivas causa lesiones graves. Probamos entrenamiento inadecuado y violaciones de seguridad.',
      features: [
        'Distensiones musculares severas',
        'Desgarros de ligamentos',
        'Síndrome facetario',
        'Espasmos musculares crónicos',
        'Dolor miofascial',
        'Terapia física extensa',
      ],
    },
    {
      title: 'Dolor Crónico de Espalda',
      description:
        'El dolor que persiste más de 6 meses requiere manejo especializado. Aseguramos tratamiento continuo y beneficios permanentes.',
      features: [
        'Síndrome de dolor crónico',
        'Manejo del dolor intervencionista',
        'Estimuladores espinales',
        'Bombas de medicamento',
        'Terapia cognitiva',
        'Modificaciones laborales',
      ],
    },
  ];

  const faqs = [
    {
      question: '¿Cómo sé si mi hernia discal está relacionada con el trabajo?',
      answer:
        'Si desarrolló síntomas después de un incidente específico en el trabajo o después de actividades laborales repetitivas, probablemente está relacionada. Un MRI y evaluación médica pueden confirmar la conexión.',
    },
    {
      question: '¿Mi empleador debe pagar por cirugía de espalda?',
      answer:
        'Sí, si un médico autorizado determina que la cirugía es médicamente necesaria para su lesión laboral. Las aseguradoras a menudo demoran o niegan, pero podemos forzar la aprobación.',
    },
    {
      question: '¿Puedo obtener beneficios permanentes por dolor de espalda crónico?',
      answer:
        'Sí, si el dolor afecta permanentemente su capacidad de trabajo. Utilizamos pruebas funcionales y evaluaciones del dolor para documentar limitaciones permanentes.',
    },
    {
      question: '¿Qué pasa si necesito múltiples cirugías de espalda?',
      answer:
        'Cada cirugía médicamente necesaria debe ser cubierta. Documentamos la progresión de su condición y la necesidad de tratamientos adicionales.',
    },
    {
      question: '¿Cómo calculan mi discapacidad por lesión de espalda?',
      answer:
        'NC usa las Guías AMA para calificar discapacidad. Evaluamos pérdida de movimiento, función neurológica y capacidades laborales para maximizar su calificación.',
    },
  ];

  return (
    <>
      <ModernPracticeAreaTemplate
        title="Abogados de Lesiones de Espalda Laborales"
        subtitle="Su Espalda Sostiene Su Vida - YO PELEO POR TI™"
        description="Las lesiones de espalda en el trabajo pueden ser devastadoras. Desde hernias discales hasta fracturas espinales, su futuro depende de obtener tratamiento correcto y compensación completa. Con 60+ años manejando casos complejos de espalda."
        services={services}
        faqs={faqs}
        content={
          <div className="space-y-12">
            {/* Warning Signs Section */}
            <section className="bg-red-900/20 border border-red-500/30 rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-6 text-red-400">
                ⚠️ SEÑALES DE LESIÓN GRAVE DE ESPALDA
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-primary mb-3">
                    Busque Atención INMEDIATA Si Tiene:
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>🚨 Dolor que baja por la pierna (ciática)</li>
                    <li>🚨 Entumecimiento en piernas o pies</li>
                    <li>🚨 Debilidad en las piernas</li>
                    <li>🚨 Pérdida de control intestinal/vesical</li>
                    <li>🚨 Dolor severo que empeora</li>
                    <li>🚨 Incapacidad para caminar normalmente</li>
                  </ul>
                </div>
                <div className="bg-primary/10 rounded-lg p-6 border border-primary/30">
                  <h3 className="text-xl font-bold text-primary mb-3">
                    NUNCA Ignore Estos Síntomas
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Las lesiones de espalda pueden empeorar rápidamente sin tratamiento adecuado. La
                    demora puede resultar en daño permanente.
                  </p>
                  <div className="bg-red-500/20 border border-red-500 rounded p-4">
                    <p className="text-red-300 font-semibold">
                      Llame al 911 si tiene pérdida súbita de función en las piernas o pérdida de
                      control de esfínteres.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Back Injury Statistics */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Realidad de las Lesiones de Espalda en Carolina del Norte
              </h2>
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                  <div className="text-3xl font-black text-red-400 mb-2">38%</div>
                  <div className="text-gray-300">De lesiones laborales son de espalda</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                  <div className="text-3xl font-black text-orange-400 mb-2">264</div>
                  <div className="text-gray-300">Días promedio fuera del trabajo</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                  <div className="text-3xl font-black text-yellow-400 mb-2">$89K</div>
                  <div className="text-gray-300">Costo promedio de tratamiento</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                  <div className="text-3xl font-black text-primary mb-2">23%</div>
                  <div className="text-gray-300">Requieren cirugía</div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  ¿Por Qué las Lesiones de Espalda Son Tan Costosas?
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-3">Costos Médicos Enormes:</h4>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• MRI: $1,000-3,000</li>
                      <li>• Inyecciones epidurales: $2,000-5,000</li>
                      <li>• Fusión espinal: $80,000-150,000</li>
                      <li>• Terapia física: $200/sesión x 50+ sesiones</li>
                      <li>• Medicamentos para dolor: $500-2,000/mes</li>
                      <li>• Cuidado de por vida: $500,000+</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-3">Pérdida de Ingresos:</h4>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• Tiempo fuera del trabajo extendido</li>
                      <li>• Reducción de capacidad laboral</li>
                      <li>• Incapacidad para trabajos físicos</li>
                      <li>• Jubilación temprana forzada</li>
                      <li>• Pérdida de beneficios</li>
                      <li>• Impacto en carrera profesional</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Common Causes */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Causas Principales de Lesiones de Espalda en el Trabajo
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-red-400 mb-3">
                    🏋️ Levantamiento Inadecuado
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Objetos demasiado pesados</li>
                    <li>• Técnica incorrecta</li>
                    <li>• Falta de entrenamiento</li>
                    <li>• Equipos inadecuados</li>
                    <li>• Presión de tiempo</li>
                    <li>• Múltiples levantamientos</li>
                  </ul>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-orange-400 mb-3">
                    🔄 Movimientos Repetitivos
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Doblarse constantemente</li>
                    <li>• Torcer la espalda</li>
                    <li>• Alcanzar por encima</li>
                    <li>• Posturas forzadas</li>
                    <li>• Vibración prolongada</li>
                    <li>• Falta de descansos</li>
                  </ul>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-yellow-400 mb-3">
                    💥 Accidentes Traumáticos
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Caídas de altura</li>
                    <li>• Resbalones y caídas</li>
                    <li>• Golpes por objetos</li>
                    <li>• Accidentes vehiculares</li>
                    <li>• Atrapamiento</li>
                    <li>• Explosiones</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Treatment Process */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Proceso de Tratamiento y Compensación
              </h2>
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-4">
                    Fase 1: Diagnóstico y Tratamiento Inicial (0-3 meses)
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-2">Evaluaciones Médicas:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Examen físico completo</li>
                        <li>• Rayos X iniciales</li>
                        <li>• MRI de columna</li>
                        <li>• Estudios de conducción nerviosa</li>
                        <li>• Evaluación neurológica</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-2">Tratamiento Conservador:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Medicamentos antiinflamatorios</li>
                        <li>• Terapia física</li>
                        <li>• Trabajo liviano/restricciones</li>
                        <li>• Inyecciones de cortisona</li>
                        <li>• Terapia ocupacional</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-4">
                    Fase 2: Tratamiento Avanzado (3-12 meses)
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-2">
                        Intervenciones Especializadas:
                      </h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Inyecciones epidurales</li>
                        <li>• Ablación por radiofrecuencia</li>
                        <li>• Inyecciones facetarias</li>
                        <li>• Estimuladores espinales</li>
                        <li>• Evaluación quirúrgica</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-2">Manejo del Dolor:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Clínicas especializadas</li>
                        <li>• Medicamentos opioides</li>
                        <li>• Terapias alternativas</li>
                        <li>• Psicología del dolor</li>
                        <li>• Programas de rehabilitación</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-4">
                    Fase 3: Resolución a Largo Plazo (12+ meses)
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-2">Opciones Quirúrgicas:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Discectomía/microdiscectomía</li>
                        <li>• Fusión espinal</li>
                        <li>• Reemplazo de disco artificial</li>
                        <li>• Laminectomía</li>
                        <li>• Cifoplastia/vertebroplastia</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-2">
                        Evaluación de Discapacidad:
                      </h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Calificación de discapacidad</li>
                        <li>• Evaluación funcional</li>
                        <li>• Capacidad laboral residual</li>
                        <li>• Rehabilitación vocacional</li>
                        <li>• Acuerdo final</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Legal Strategy */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Nuestra Estrategia Legal Especializada
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                    <h3 className="text-lg font-bold text-primary mb-3">
                      Documentación Médica Experta
                    </h3>
                    <p className="text-gray-300 text-sm mb-3">
                      Trabajamos con neurocirujanos y ortopedistas especializados en lesiones
                      laborales que saben exactamente cómo documentar para máxima compensación.
                    </p>
                    <ul className="text-gray-400 text-xs space-y-1">
                      <li>• Evaluaciones independientes</li>
                      <li>• Estudios de imagen especializada</li>
                      <li>• Pruebas funcionales</li>
                      <li>• Pronósticos médicos detallados</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                    <h3 className="text-lg font-bold text-primary mb-3">Análisis Biomecánico</h3>
                    <p className="text-gray-300 text-sm mb-3">
                      Utilizamos expertos en ergonomía para probar exactamente cómo sus tareas
                      laborales causaron la lesión de espalda.
                    </p>
                    <ul className="text-gray-400 text-xs space-y-1">
                      <li>• Análisis de video laboral</li>
                      <li>• Medición de fuerzas</li>
                      <li>• Evaluación postural</li>
                      <li>• Reconstrucción de accidentes</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                    <h3 className="text-lg font-bold text-primary mb-3">
                      Maximización de Beneficios
                    </h3>
                    <p className="text-gray-300 text-sm mb-3">
                      Conocemos todas las categorías de beneficios disponibles y cómo calcular el
                      valor máximo de su caso.
                    </p>
                    <ul className="text-gray-400 text-xs space-y-1">
                      <li>• Gastos médicos futuros</li>
                      <li>• Pérdida de capacidad laboral</li>
                      <li>• Calificación de discapacidad óptima</li>
                      <li>• Rehabilitación vocacional</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                    <h3 className="text-lg font-bold text-primary mb-3">Presión en Aseguradoras</h3>
                    <p className="text-gray-300 text-sm mb-3">
                      Las aseguradoras demoran casos de espalda esperando que se rinda. Nosotros
                      aplicamos presión legal constante.
                    </p>
                    <ul className="text-gray-400 text-xs space-y-1">
                      <li>• Demandas por demoras injustificadas</li>
                      <li>• Presión de audiencias</li>
                      <li>• Multas por mala fe</li>
                      <li>• Intereses y penalidades</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        }
      />

      {/* Structured Data */}
      <Script
        id="back-injuries-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Abogados de Lesiones de Espalda Laborales - Bufete de Abogados Vásquez',
            description:
              'Representación legal especializada para lesiones de espalda en el trabajo en Carolina del Norte. Hernias discales, ciática, fracturas espinales. Consulta gratuita.',
            provider: {
              '@type': 'Attorney',
              name: 'Bufete de Abogados Vásquez, PLLC',
              url: 'https://www.vasquezlawfirm.com',
            },
            areaServed: {
              '@type': 'State',
              name: 'Carolina del Norte',
            },
            serviceType: 'Lesiones de Espalda Laborales',
            offers: {
              '@type': 'Offer',
              name: 'Consulta Gratuita Especializada',
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
