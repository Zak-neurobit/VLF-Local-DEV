import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Abogados Negación Beneficios Compensación Laboral NC | YO PELEO POR TI™',
  description: 'Abogados expertos en apelaciones de compensación laboral denegada NC. Revertimos 89% de denegaciones injustas. Forzamos pagos. Consulta gratuita urgente. Se habla español.',
  keywords: 'compensación laboral denegada NC, apelación reclamo denegado, beneficios negados injustamente, abogado apelaciones compensación, revertir denegación compensación laboral, audiencias comisión industrial NC, forzar pagos compensación',
  openGraph: {
    title: 'Abogados Negación Beneficios Compensación Laboral NC | YO PELEO POR TI™',
    description: 'Abogados expertos en apelaciones de compensación laboral denegada NC. Revertimos 89% de denegaciones injustas. Forzamos pagos.',
    url: 'https://www.vasquezlawfirm.com/es/areas-de-practica/compensacion-laboral/negacion-de-beneficios',
    siteName: 'Bufete de Abogados Vásquez, PLLC',
    images: [
      {
        url: '/images/practice-areas/denied-benefits-es.jpg',
        width: 1200,
        height: 630,
        alt: 'Negación de Beneficios de Compensación Laboral Carolina del Norte'
      }
    ],
    locale: 'es_ES',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.vasquezlawfirm.com/es/areas-de-practica/compensacion-laboral/negacion-de-beneficios',
    languages: {
      'en-US': 'https://www.vasquezlawfirm.com/practice-areas/workers-compensation/denied-benefits',
      'es-ES': 'https://www.vasquezlawfirm.com/es/areas-de-practica/compensacion-laboral/negacion-de-beneficios'
    }
  }
};

export default function NegacionDeBeneficiosPage() {
  const services = [
    {
      title: 'Apelaciones de Denegaciones Médicas',
      description: 'Las aseguradoras niegan tratamientos médicos necesarios para ahorrar dinero. Forzamos autorizaciones a través de presión legal agresiva.',
      features: [
        'Cirugías denegadas injustamente',
        'MRI y estudios especializados',
        'Medicamentos para dolor',
        'Terapia física extendida',
        'Tratamientos con especialistas',
        'Segundas opiniones médicas'
      ]
    },
    {
      title: 'Beneficios Salariales Suspendidos',
      description: 'Cuando las aseguradoras cortan sus pagos semanales sin justificación, actuamos inmediatamente para restaurar sus ingresos.',
      features: [
        'Pagos cortados abruptamente',
        'Reducción injustificada de beneficios',
        'Disputas de capacidad laboral',
        'Cálculos incorretos de salarios',
        'Demoras en pagos iniciales',
        'Terminación prematura'
      ]
    },
    {
      title: 'Denegaciones por "Falta de Relación Causal"',
      description: 'La excusa más común. Utilizamos evidencia médica y testigos expertos para probar que su lesión SÍ está relacionada con el trabajo.',
      features: [
        'Condiciones preexistentes argumentadas',
        'Eventos no presenciados',
        'Lesiones de desarrollo gradual',
        'Enfermedades ocupacionales',
        'Agravación de condiciones',
        'Múltiples factores causales'
      ]
    },
    {
      title: 'Calificaciones de Discapacidad Incorrectas',
      description: 'Las aseguradoras minimizan deliberadamente su discapacidad. Obtenemos evaluaciones independientes para calificaciones justas.',
      features: [
        'Evaluaciones sesgadas de IME',
        'Calificaciones artificialmente bajas',
        'Limitaciones funcionales ignoradas',
        'Dolor crónico minimizado',
        'Impacto psicológico ignorado',
        'Capacidad laboral mal calculada'
      ]
    },
    {
      title: 'Demoras Tácticas y Mala Fe',
      description: 'Las aseguradoras demoran deliberadamente esperando que se rinda. Imponemos presión legal y buscamos penalidades por mala fe.',
      features: [
        'Investigaciones interminables',
        'Solicitudes repetitivas de documentos',
        'Demoras en autorizar tratamiento',
        'Comunicación inadecuada',
        'Tácticas de intimidación',
        'Violaciones de plazos legales'
      ]
    },
    {
      title: 'Terminaciones Injustas de Casos',
      description: 'Cuando las aseguradoras intentan cerrar permanentemente su caso sin compensación justa, reabrimos y luchamos.',
      features: [
        'Acuerdos presionados injustamente',
        'Terminaciones sin representación',
        'Casos cerrados prematuramente',
        'Beneficios futuros perdidos',
        'Derechos médicos terminados',
        'Reapertura de casos'
      ]
    }
  ];

  const faqs = [
    {
      question: '¿Qué debo hacer inmediatamente si me niegan beneficios?',
      answer: 'NO FIRME NADA. Contacte a un abogado especializado inmediatamente. Tiene plazos estrictos para apelar. Conserve toda documentación y continúe tratamiento médico si es posible.'
    },
    {
      question: '¿Cuánto tiempo tengo para apelar una denegación en NC?',
      answer: 'Generalmente 30 días desde la notificación de denegación. Sin embargo, algunos plazos pueden ser más cortos. Es crucial actuar inmediatamente para preservar sus derechos.'
    },
    {
      question: '¿Puedo obtener tratamiento médico mientras apelo?',
      answer: 'Depende. Si tiene seguro de salud, úselo y mantenga facturas para reembolso posterior. En emergencias, busque tratamiento inmediato y luego contacte a un abogado.'
    },
    {
      question: '¿Las aseguradoras deben pagar mis gastos legales si gano la apelación?',
      answer: 'En algunos casos sí. Si la denegación fue de mala fe o si ganamos en audiencia, la aseguradora puede ser responsable por honorarios de abogado y costos.'
    },
    {
      question: '¿Qué pasa si mi empleador me presiona para no apelar?',
      answer: 'Eso es retaliación ilegal. Su empleador no puede despedirlo, degradarlo o intimidarlo por ejercer sus derechos de compensación laboral. Podemos demandar por daños adicionales.'
    }
  ];

  return (
    <>
      <ModernPracticeAreaTemplate
        title="Abogados de Negación de Beneficios"
        subtitle="Su Negación No Es Final - YO PELEO POR TI™"
        description="¿Le negaron sus beneficios de compensación laboral? ¡NO SE RINDA! El 89% de nuestras apelaciones resultan en beneficios aprobados. Las aseguradoras cuentan con que usted se rinda - nosotros nunca lo hacemos."
        services={services}
        faqs={faqs}
        content={
          <div className="space-y-12">
            {/* Urgent Action Section */}
            <section className="bg-red-900/20 border border-red-500/30 rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-6 text-red-400">🚨 BENEFICIOS DENEGADOS - ACCIÓN URGENTE REQUERIDA</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-primary mb-3">¡NO FIRME NADA! Primero Llame:</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>📞 <strong>Abogado especializado</strong> - DENTRO DE 24 HORAS</li>
                    <li>📄 <strong>Conserve TODO</strong> - Cartas, formularios, documentos</li>
                    <li>🏥 <strong>Continue tratamiento</strong> - Use seguro personal si necesario</li>
                    <li>📝 <strong>No hable con aseguradora</strong> - Sin representación legal</li>
                    <li>⏰ <strong>Plazos estrictos</strong> - 30 días para apelar</li>
                    <li>🚫 <strong>NUNCA acepte</strong> - Primera oferta de acuerdo</li>
                  </ul>
                </div>
                <div className="bg-red-500/20 border border-red-500 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-red-400 mb-3">⚠️ CONSECUENCIAS DE NO ACTUAR</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Pérdida permanente de beneficios</li>
                    <li>• Gastos médicos de su bolsillo</li>
                    <li>• Sin ingresos mientras se recupera</li>
                    <li>• Deterioro de su condición</li>
                    <li>• Pérdida de derechos legales</li>
                    <li>• Bancarrota médica</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Denial Statistics */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">La Crisis de Denegaciones en Carolina del Norte</h2>
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                  <div className="text-3xl font-black text-red-400 mb-2">43%</div>
                  <div className="text-gray-300">De reclamos inicialmente denegados</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                  <div className="text-3xl font-black text-orange-400 mb-2">89%</div>
                  <div className="text-gray-300">De nuestras apelaciones exitosas</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                  <div className="text-3xl font-black text-yellow-400 mb-2">$890M</div>
                  <div className="text-gray-300">Ahorrado por aseguradoras denegando</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                  <div className="text-3xl font-black text-primary mb-2">76%</div>
                  <div className="text-gray-300">Se rinden sin apelar</div>
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
                <h3 className="text-2xl font-bold text-primary mb-4">¿Por Qué las Aseguradoras Niegan Tanto?</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-red-400 mb-3">💰 Motivación Financiera:</h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• Cada denegación ahorra $50,000+ promedio</li>
                      <li>• Bonos para ajustadores que niegan más</li>
                      <li>• Presión de ganancias corporativas</li>
                      <li>• Software automático de denegaciones</li>
                      <li>• Métricas de &ldquo;ahorros&rdquo; por denegaciones</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-400 mb-3">🎯 Táctica Calculada:</h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• 76% de trabajadores se rinden</li>
                      <li>• Trabajadores no conocen sus derechos</li>
                      <li>• Miedo a costos legales</li>
                      <li>• Presión financiera inmediata</li>
                      <li>• Confianza en que no apelarán</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Common Denial Reasons */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Excusas Comunes de Denegación y Cómo las Vencemos</h2>
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-red-500/30">
                  <h3 className="text-xl font-bold text-red-400 mb-4">🔴 &ldquo;No Está Relacionado con el Trabajo&rdquo; (67% de denegaciones)</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Lo Que Dicen:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• &ldquo;Condición preexistente&rdquo;</li>
                        <li>• &ldquo;No hay testigos del accidente&rdquo;</li>
                        <li>• &ldquo;Causado por edad/desgaste&rdquo;</li>
                        <li>• &ldquo;Síntomas demasiado vagos&rdquo;</li>
                        <li>• &ldquo;Incidente menor&rdquo;</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Cómo Lo Probamos:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Testimonio médico experto</li>
                        <li>• Análisis biomecánico</li>
                        <li>• Cronología de síntomas</li>
                        <li>• Testigos de cambio en condición</li>
                        <li>• Precedentes legales</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-orange-500/30">
                  <h3 className="text-xl font-bold text-orange-400 mb-4">🟠 &ldquo;Tratamiento No Necesario&rdquo; (23% de denegaciones)</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Tratamientos Comúnmente Negados:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Cirugías de espalda/cuello</li>
                        <li>• MRI y estudios avanzados</li>
                        <li>• Terapia física extendida</li>
                        <li>• Medicamentos opioides</li>
                        <li>• Tratamientos de dolor</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Nuestra Respuesta:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Segundas opiniones independientes</li>
                        <li>• Evidencia de deterioro</li>
                        <li>• Guías de tratamiento estándar</li>
                        <li>• Precedentes de autorización</li>
                        <li>• Amenaza de mala fe</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-yellow-500/30">
                  <h3 className="text-xl font-bold text-yellow-400 mb-4">🟡 &ldquo;Capaz de Trabajar&rdquo; (18% de denegaciones)</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Tácticas de Vigilancia:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Investigadores privados</li>
                        <li>• Videos de actividades diarias</li>
                        <li>• Redes sociales monitoreadas</li>
                        <li>• Evaluaciones sesgadas</li>
                        <li>• Trabajos &ldquo;disponibles&rdquo; ficticios</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Nuestra Defensa:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Evaluaciones funcionales completas</li>
                        <li>• Documentación de limitaciones</li>
                        <li>• Análisis del mercado laboral real</li>
                        <li>• Testimonio de dolor crónico</li>
                        <li>• Contexto de videos de vigilancia</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Appeal Process */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Proceso de Apelación Agresivo</h2>
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-4">Fase 1: Acción Inmediata (0-30 días)</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-2">Semana 1:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Revisión completa del expediente</li>
                        <li>• Solicitud de todos los documentos</li>
                        <li>• Contacto con médicos tratantes</li>
                        <li>• Preservación de evidencia</li>
                        <li>• Estrategia inicial</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-2">Semana 2-3:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Preparación de apelación formal</li>
                        <li>• Obtención de registros médicos</li>
                        <li>• Identificación de testigos</li>
                        <li>• Análisis de razones de denegación</li>
                        <li>• Consulta con expertos</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-2">Semana 4:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Presentación de apelación</li>
                        <li>• Solicitud de audiencia</li>
                        <li>• Notificación a aseguradora</li>
                        <li>• Comunicación con cliente</li>
                        <li>• Preparación para fase 2</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-4">Fase 2: Construcción del Caso (1-6 meses)</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Desarrollo de Evidencia:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Evaluaciones médicas independientes</li>
                        <li>• Deposiciones de testigos</li>
                        <li>• Análisis de videos de vigilancia</li>
                        <li>• Investigación del lugar de trabajo</li>
                        <li>• Documentación de impacto financiero</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Presión Legal:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Demandas por demoras</li>
                        <li>• Solicitudes de discovery</li>
                        <li>• Mociones para forzar pagos</li>
                        <li>• Amenazas de mala fe</li>
                        <li>• Publicidad de casos atroces</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-4">Fase 3: Audiencia y Resolución (6-18 meses)</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Preparación de Audiencia:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Preparación de testigos</li>
                        <li>• Organizacion de evidencia</li>
                        <li>• Estrategia de presentación</li>
                        <li>• Preparación de cliente</li>
                        <li>• Argumentos legales</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Resultados Típicos:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• 89% de casos ganados</li>
                        <li>• Pagos retroactivos completos</li>
                        <li>• Autorización de tratamientos</li>
                        <li>• Beneficios futuros asegurados</li>
                        <li>• Honorarios de abogado pagados</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Success Stories and Results */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Resultados Recientes en Apelaciones</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                    <h3 className="text-lg font-bold text-primary mb-3">Casos de Alto Valor Revertidos</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• <strong>$450K:</strong> Cirugía de espalda denegada - Revertida</li>
                      <li>• <strong>$380K:</strong> Tratamiento de cáncer ocupacional</li>
                      <li>• <strong>$290K:</strong> Beneficios por discapacidad permanente</li>
                      <li>• <strong>$180K:</strong> Medicamentos de dolor crónico</li>
                      <li>• <strong>$165K:</strong> Terapia física extendida</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                    <h3 className="text-lg font-bold text-primary mb-3">Tiempo Promedio de Resolución</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• <strong>Casos médicos simples:</strong> 2-4 meses</li>
                      <li>• <strong>Disputas de causalidad:</strong> 4-8 meses</li>
                      <li>• <strong>Casos complejos:</strong> 8-18 meses</li>
                      <li>• <strong>Apelaciones múltiples:</strong> 12-24 meses</li>
                      <li>• <strong>Pagos de emergencia:</strong> 1-4 semanas</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                    <h3 className="text-lg font-bold text-primary mb-3">Por Qué Ganamos Tanto</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• <strong>Experiencia especializada:</strong> 60+ años combinados</li>
                      <li>• <strong>Red médica experta:</strong> Mejores especialistas</li>
                      <li>• <strong>Recursos ilimitados:</strong> Sin escatimar en evidencia</li>
                      <li>• <strong>Reputación temida:</strong> Aseguradoras nos conocen</li>
                      <li>• <strong>Compromiso total:</strong> Nunca nos rendimos</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                    <h3 className="text-lg font-bold text-primary mb-3">Beneficios Adicionales Obtenidos</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• Honorarios de abogado pagados por aseguradora</li>
                      <li>• Intereses sobre pagos retrasados</li>
                      <li>• Penalidades por mala fe</li>
                      <li>• Costos médicos reembolsados</li>
                      <li>• Beneficios retroactivos completos</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Why Choose Us */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Por Qué Somos Temidos por las Aseguradoras</h2>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-black text-primary mb-4">89%</div>
                    <h3 className="text-lg font-bold text-gray-200 mb-2">Tasa de Éxito en Apelaciones</h3>
                    <p className="text-gray-300 text-sm">Revertimos 9 de cada 10 denegaciones que tomamos</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-black text-primary mb-4">$23M</div>
                    <h3 className="text-lg font-bold text-gray-200 mb-2">Recuperado en Apelaciones</h3>
                    <p className="text-gray-300 text-sm">Solo en los últimos 3 años para clientes</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-black text-primary mb-4">24/7</div>
                    <h3 className="text-lg font-bold text-gray-200 mb-2">Disponibilidad de Emergencia</h3>
                    <p className="text-gray-300 text-sm">Cuando le niegan, necesita acción inmediata</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        }
      />
      
      {/* Structured Data */}
      <Script
        id="denied-benefits-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Abogados de Negación de Beneficios - Bufete de Abogados Vásquez',
            description: 'Representación legal especializada para apelaciones de compensación laboral denegada en Carolina del Norte. 89% de éxito en revertir denegaciones injustas.',
            provider: {
              '@type': 'Attorney',
              name: 'Bufete de Abogados Vásquez, PLLC',
              url: 'https://www.vasquezlawfirm.com'
            },
            areaServed: {
              '@type': 'State',
              name: 'Carolina del Norte'
            },
            serviceType: 'Apelaciones de Compensación Laboral',
            offers: {
              '@type': 'Offer',
              name: 'Consulta de Emergencia para Denegaciones',
              price: '0',
              priceCurrency: 'USD'
            },
            inLanguage: 'es'
          })
        }}
      />
    </>
  );
}