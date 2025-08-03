import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Script from 'next/script';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Abogados Audiencias Compensación Laboral NC | YO PELEO POR TI™ | Comisión Industrial',
  description:
    'Abogados expertos en audiencias de compensación laboral NC. Representación en Comisión Industrial. 94% éxito en audiencias. Preparación completa. Consulta gratuita. Se habla español.',
  keywords:
    'audiencias compensación laboral NC, comisión industrial carolina del norte, abogado audiencias compensación, representación comisión industrial, audiencias beneficios negados, abogado hearings compensación Raleigh',
  openGraph: {
    title: 'Abogados Audiencias Compensación Laboral NC | YO PELEO POR TI™',
    description:
      'Abogados expertos en audiencias de compensación laboral NC. Representación en Comisión Industrial. 94% éxito en audiencias. Preparación completa.',
    url: 'https://www.vasquezlawfirm.com/es/areas-de-practica/compensacion-laboral/audiencias-de-compensacion',
    siteName: 'Bufete de Abogados Vásquez, PLLC',
    images: [
      {
        url: '/images/practice-areas/compensation-hearings-es.jpg',
        width: 1200,
        height: 630,
        alt: 'Audiencias de Compensación Laboral Carolina del Norte',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  alternates: {
    canonical:
      'https://www.vasquezlawfirm.com/es/areas-de-practica/compensacion-laboral/audiencias-de-compensacion',
    languages: {
      'en-US':
        'https://www.vasquezlawfirm.com/practice-areas/workers-compensation/compensation-hearings',
      'es-ES':
        'https://www.vasquezlawfirm.com/es/areas-de-practica/compensacion-laboral/audiencias-de-compensacion',
    },
  },
};

export default function AudienciasDeCompensacionPage() {
  const services = [
    {
      title: 'Audiencias de Beneficios Denegados',
      description:
        'Cuando las aseguradoras niegan su reclamo, las audiencias son su última oportunidad. Preparamos cada detalle para ganar.',
      features: [
        'Preparación exhaustiva de testigos',
        'Organización de evidencia médica',
        'Estrategia de presentación',
        'Cross-examination de expertos',
        'Argumentos legales persuasivos',
        'Seguimiento post-audiencia',
      ],
    },
    {
      title: 'Audiencias de Autorización Médica',
      description:
        'Forzamos a las aseguradoras a aprobar tratamientos necesarios a través de presentaciones médicas convincentes.',
      features: [
        'Testimonio de médicos tratantes',
        'Evidencia de necesidad médica',
        'Comparación con estándares',
        'Costo-beneficio de tratamiento',
        'Consecuencias de demora',
        'Autorización inmediata',
      ],
    },
    {
      title: 'Audiencias de Discapacidad',
      description:
        'Maximizamos su calificación de discapacidad con evaluaciones independientes y testimonio experto detallado.',
      features: [
        'Evaluaciones funcionales completas',
        'Testimonio de especialistas',
        'Documentación de limitaciones',
        'Análisis de capacidad laboral',
        'Impacto en vida diaria',
        'Calificación óptima',
      ],
    },
    {
      title: 'Audiencias de Salarios y Beneficios',
      description:
        'Aseguramos el cálculo correcto de su salario promedio y beneficios máximos disponibles.',
      features: [
        'Cálculo de salario promedio correcto',
        'Inclusión de horas extras/bonos',
        'Beneficios retroactivos',
        'Ajustes por inflación',
        'Múltiples empleadores',
        'Maximización de pagos',
      ],
    },
    {
      title: 'Audiencias de Rehabilitación Vocacional',
      description:
        'Cuando no puede regresar a su trabajo anterior, obtenemos entrenamiento y beneficios para nueva carrera.',
      features: [
        'Evaluación de capacidades residuales',
        'Análisis del mercado laboral',
        'Planes de entrenamiento',
        'Beneficios durante entrenamiento',
        'Colocación laboral asistida',
        'Seguimiento a largo plazo',
      ],
    },
    {
      title: 'Audiencias de Reapertura',
      description:
        'Cuando su condición empeora o descubre nueva información, reabrimos casos cerrados.',
      features: [
        'Evidencia de empeoramiento',
        'Nueva evidencia médica',
        'Cambio en circunstancias',
        'Evaluaciones actualizadas',
        'Beneficios adicionales',
        'Extensión de tratamiento',
      ],
    },
  ];

  const faqs = [
    {
      question: '¿Qué puedo esperar durante mi audiencia de compensación laboral?',
      answer:
        'La audiencia es formal pero no intimidante. Usted testificará sobre su lesión y limitaciones. Médicos y expertos también pueden testificar. El comisionado hace preguntas y luego decide su caso.',
    },
    {
      question: '¿Cuánto tiempo duran las audiencias de compensación laboral?',
      answer:
        'Típicamente 2-6 horas dependiendo de la complejidad. Casos simples pueden resolverse en una mañana. Casos complejos con múltiples testigos pueden tomar días completos.',
    },
    {
      question: '¿Tengo que testificar en mi propia audiencia?',
      answer:
        'Generalmente sí. Su testimonio sobre el accidente, dolor y limitaciones es crucial. Lo preparamos exhaustivamente para que se sienta cómodo y seguro.',
    },
    {
      question: '¿Qué pasa si no hablo inglés bien?',
      answer:
        'La Comisión provee intérpretes certificados gratuitos. También preparamos su testimonio en español para que comprenda exactamente qué esperar.',
    },
    {
      question: '¿Cuándo sabré el resultado de mi audiencia?',
      answer:
        'El comisionado puede decidir inmediatamente o tomar hasta 30 días para emitir una decisión escrita. Casos complejos generalmente requieren decisiones escritas.',
    },
  ];

  return (
    <>
      <ModernPracticeAreaTemplate
        title="Abogados de Audiencias de Compensación"
        subtitle="Ganamos Donde Otros Pierden - YO PELEO POR TI™"
        description="Las audiencias de compensación laboral determinan su futuro financiero. Con 94% de éxito en audiencias y 60+ años de experiencia, sabemos exactamente cómo ganar ante la Comisión Industrial de Carolina del Norte."
        services={services}
        faqs={faqs}
        content={
          <div className="space-y-12">
            {/* Hearing Preparation Section */}
            <section className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-6 text-blue-400">
                🎯 PREPARACIÓN PARA AUDIENCIA - PROCESO COMPLETO
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-primary mb-3">Su Preparación Personal:</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>
                      📝 <strong>Sesiones de práctica</strong> - Simulamos preguntas reales
                    </li>
                    <li>
                      🎭 <strong>Testimonio ensayado</strong> - Pero natural y auténtico
                    </li>
                    <li>
                      👔 <strong>Presentación profesional</strong> - Imagen apropiada
                    </li>
                    <li>
                      😌 <strong>Manejo de nervios</strong> - Técnicas de relajación
                    </li>
                    <li>
                      ❓ <strong>Manejo de preguntas difíciles</strong> - Respuestas preparadas
                    </li>
                    <li>
                      🕐 <strong>Puntualidad y etiqueta</strong> - Expectativas claras
                    </li>
                  </ul>
                </div>
                <div className="bg-primary/10 rounded-lg p-6 border border-primary/30">
                  <h3 className="text-xl font-bold text-primary mb-3">
                    Nuestra Preparación Legal:
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>✓ Organización completa de evidencia</li>
                    <li>✓ Preparación de testigos expertos</li>
                    <li>✓ Argumentos legales documentados</li>
                    <li>✓ Contra-argumentos anticipados</li>
                    <li>✓ Precedentes legales relevantes</li>
                    <li>✓ Plan B para obstáculos inesperados</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* NC Industrial Commission Statistics */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Estadísticas de la Comisión Industrial de Carolina del Norte
              </h2>
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                  <div className="text-3xl font-black text-green-400 mb-2">94%</div>
                  <div className="text-gray-300">Nuestro éxito en audiencias</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                  <div className="text-3xl font-black text-blue-400 mb-2">67%</div>
                  <div className="text-gray-300">Trabajadores SIN representación pierden</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                  <div className="text-3xl font-black text-yellow-400 mb-2">4.2</div>
                  <div className="text-gray-300">Meses promedio para audiencia</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                  <div className="text-3xl font-black text-primary mb-2">$89K</div>
                  <div className="text-gray-300">Promedio en juego por audiencia</div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  ¿Por Qué la Representación Es Crucial?
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-red-400 mb-3">
                      Sin Abogado - Tasa de Fracaso 67%:
                    </h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• No conocen las reglas de evidencia</li>
                      <li>• No saben qué preguntas hacer</li>
                      <li>• Se intimidan fácilmente</li>
                      <li>• No entienden precedentes legales</li>
                      <li>• Aseguradoras aprovechan inexperiencia</li>
                      <li>• Pierden por tecnicismos</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-400 mb-3">
                      Con Nuestro Bufete - Éxito 94%:
                    </h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• 60+ años de experiencia combinada</li>
                      <li>• Conocemos todos los comisionados</li>
                      <li>• Preparación exhaustiva</li>
                      <li>• Red de expertos médicos</li>
                      <li>• Estrategias probadas</li>
                      <li>• Recursos ilimitados</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Types of Hearings */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Tipos de Audiencias de Compensación Laboral
              </h2>
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-green-500/30">
                  <h3 className="text-xl font-bold text-green-400 mb-4">
                    🟢 AUDIENCIAS DE BENEFICIOS (Más Comunes)
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Qué Se Decide:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• ¿Es la lesión relacionada con trabajo?</li>
                        <li>• ¿Qué tratamiento es necesario?</li>
                        <li>• ¿Cuánta discapacidad tiene?</li>
                        <li>• ¿Puede trabajar y en qué capacidad?</li>
                        <li>• ¿Cuánto debe pagar la aseguradora?</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Evidencia Típica:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Su testimonio personal</li>
                        <li>• Registros médicos completos</li>
                        <li>• Testimonio de médicos</li>
                        <li>• Testigos del accidente</li>
                        <li>• Videos de vigilancia</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-blue-500/30">
                  <h3 className="text-xl font-bold text-blue-400 mb-4">
                    🔵 AUDIENCIAS MÉDICAS (Tratamiento Denegado)
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Enfoque Principal:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Necesidad médica del tratamiento</li>
                        <li>• Razonabilidad del costo</li>
                        <li>• Relación con lesión laboral</li>
                        <li>• Estándares de atención médica</li>
                        <li>• Consecuencias de demora</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Testigos Clave:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Médico tratante</li>
                        <li>• Especialistas independientes</li>
                        <li>• Expertos en estándares médicos</li>
                        <li>• Su testimonio sobre dolor</li>
                        <li>• Familiares sobre deterioro</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-orange-500/30">
                  <h3 className="text-xl font-bold text-orange-400 mb-4">
                    🟠 AUDIENCIAS DE DISCAPACIDAD (Calificación)
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Factores Evaluados:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Pérdida de rango de movimiento</li>
                        <li>• Pérdida de fuerza muscular</li>
                        <li>• Dolor crónico documentado</li>
                        <li>• Limitaciones funcionales</li>
                        <li>• Impacto en actividades diarias</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">
                        Herramientas de Evaluación:
                      </h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Guías AMA para discapacidad</li>
                        <li>• Pruebas funcionales objetivas</li>
                        <li>• Evaluaciones independientes</li>
                        <li>• Estudios de capacidad laboral</li>
                        <li>• Análisis de tareas específicas</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
                  <h3 className="text-xl font-bold text-purple-400 mb-4">
                    🟣 AUDIENCIAS DE REAPERTURA (Casos Cerrados)
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Razones Para Reabrir:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Empeoramiento significativo</li>
                        <li>• Nueva evidencia médica</li>
                        <li>• Diagnóstico incorrecto inicial</li>
                        <li>• Complicaciones inesperadas</li>
                        <li>• Fraude o error descubierto</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Estándares Legales:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Cambio en condición médica</li>
                        <li>• Evidencia no disponible antes</li>
                        <li>• Error de hecho o ley</li>
                        <li>• Fraude probado</li>
                        <li>• Justicia requiere reapertura</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Hearing Process */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Proceso Completo de Audiencia
              </h2>
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-4">
                    Pre-Audiencia (6-8 semanas antes)
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-2">Semana 1-2:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Solicitud formal de audiencia</li>
                        <li>• Notificación a todas las partes</li>
                        <li>• Programación de fecha</li>
                        <li>• Intercambio inicial de documentos</li>
                        <li>• Identificación de testigos</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-2">Semana 3-4:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Deposiciones de testigos clave</li>
                        <li>• Evaluaciones médicas independientes</li>
                        <li>• Recopilación de evidencia adicional</li>
                        <li>• Preparación de exhibiciones</li>
                        <li>• Investigación de precedentes</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-2">Semana 5-6:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Preparación intensiva del cliente</li>
                        <li>• Organización final de evidencia</li>
                        <li>• Preparación de argumentos</li>
                        <li>• Coordinación con testigos</li>
                        <li>• Estrategia final</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-4">Día de la Audiencia</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Agenda Típica:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>
                          • <strong>9:00 AM:</strong> Llegada y preparación final
                        </li>
                        <li>
                          • <strong>9:30 AM:</strong> Procedimientos preliminares
                        </li>
                        <li>
                          • <strong>10:00 AM:</strong> Testimonio del trabajador
                        </li>
                        <li>
                          • <strong>11:30 AM:</strong> Receso
                        </li>
                        <li>
                          • <strong>12:00 PM:</strong> Testimonio médico
                        </li>
                        <li>
                          • <strong>1:00 PM:</strong> Almuerzo
                        </li>
                        <li>
                          • <strong>2:00 PM:</strong> Argumentos finales
                        </li>
                        <li>
                          • <strong>3:00 PM:</strong> Deliberación o aplazamiento
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">
                        Su Papel Durante la Audiencia:
                      </h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Llegar 30 minutos temprano</li>
                        <li>• Vestirse profesionalmente</li>
                        <li>• Ser honesto y directo</li>
                        <li>• Escuchar cuidadosamente preguntas</li>
                        <li>• Responder solo lo que se pregunta</li>
                        <li>• Mantener la calma bajo presión</li>
                        <li>• Dejar que su abogado objete</li>
                        <li>• Mostrar respeto al comisionado</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-4">Post-Audiencia</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">
                        Decisión Inmediata (30% de casos):
                      </h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Casos simples y claros</li>
                        <li>• Decisión oral en audiencia</li>
                        <li>• Orden escrita en 1-2 semanas</li>
                        <li>• Implementación inmediata</li>
                        <li>• Pagos retroactivos rápidos</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">
                        Decisión Diferida (70% de casos):
                      </h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Casos complejos o disputados</li>
                        <li>• Deliberación de 2-4 semanas</li>
                        <li>• Decisión escrita detallada</li>
                        <li>• Posibilidad de apelación</li>
                        <li>• Seguimiento de cumplimiento</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Success Strategies */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Estrategias Ganadoras en Audiencias
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                    <h3 className="text-lg font-bold text-primary mb-3">
                      Preparación de Testimonio
                    </h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>
                        • <strong>Cronología clara:</strong> Eventos en orden exacto
                      </li>
                      <li>
                        • <strong>Detalles específicos:</strong> Hora, lugar, testigos
                      </li>
                      <li>
                        • <strong>Impacto personal:</strong> Cómo cambió su vida
                      </li>
                      <li>
                        • <strong>Honestidad absoluta:</strong> Admitir limitaciones
                      </li>
                      <li>
                        • <strong>Emociones controladas:</strong> Profesional pero humano
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                    <h3 className="text-lg font-bold text-primary mb-3">
                      Evidencia Médica Convincente
                    </h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• Médicos que conocen su caso íntimamente</li>
                      <li>• Explicaciones en términos simples</li>
                      <li>• Conexión clara con trabajo</li>
                      <li>• Pronóstico realista</li>
                      <li>• Tratamientos recomendados específicos</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                    <h3 className="text-lg font-bold text-primary mb-3">
                      Argumentos Legales Sólidos
                    </h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• Precedentes favorables identificados</li>
                      <li>• Estatutos aplicables citados</li>
                      <li>• Regulaciones administrativas</li>
                      <li>• Decisiones previas del comisionado</li>
                      <li>• Políticas públicas de NC</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                    <h3 className="text-lg font-bold text-primary mb-3">Resultados Promedio</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>
                        • <strong>Beneficios aprobados:</strong> 94% de casos
                      </li>
                      <li>
                        • <strong>Tratamiento autorizado:</strong> 97% de casos
                      </li>
                      <li>
                        • <strong>Discapacidad aumentada:</strong> 85% de casos
                      </li>
                      <li>
                        • <strong>Pagos retroactivos:</strong> Promedio $67K
                      </li>
                      <li>
                        • <strong>Satisfacción del cliente:</strong> 98%
                      </li>
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
        id="compensation-hearings-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Abogados de Audiencias de Compensación - Bufete de Abogados Vásquez',
            description:
              'Representación legal especializada para audiencias de compensación laboral en Carolina del Norte. 94% de éxito en audiencias ante la Comisión Industrial.',
            provider: {
              '@type': 'Attorney',
              name: 'Bufete de Abogados Vásquez, PLLC',
              url: 'https://www.vasquezlawfirm.com',
            },
            areaServed: {
              '@type': 'State',
              name: 'Carolina del Norte',
            },
            serviceType: 'Audiencias de Compensación Laboral',
            offers: {
              '@type': 'Offer',
              name: 'Preparación Completa para Audiencia',
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
