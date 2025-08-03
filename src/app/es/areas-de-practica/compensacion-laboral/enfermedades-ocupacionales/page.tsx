import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Script from 'next/script';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Abogados de Enfermedades Ocupacionales NC | YO PELEO POR TI™ | Asbesto, Químicos',
  description:
    'Abogados expertos en enfermedades ocupacionales NC. Asbesto, químicos tóxicos, pérdida auditiva, cáncer laboral. Casos complejos de exposición. Consulta gratuita. Se habla español.',
  keywords:
    'enfermedades ocupacionales NC, exposición asbesto trabajo, cáncer ocupacional, pérdida auditiva trabajo, enfermedades químicos tóxicos, mesotelioma trabajo, asbestosis, silicosis, abogado enfermedades trabajo Raleigh',
  openGraph: {
    title: 'Abogados de Enfermedades Ocupacionales NC | YO PELEO POR TI™',
    description:
      'Abogados expertos en enfermedades ocupacionales NC. Asbesto, químicos tóxicos, pérdida auditiva, cáncer laboral. Casos complejos de exposición.',
    url: 'https://www.vasquezlawfirm.com/es/areas-de-practica/compensacion-laboral/enfermedades-ocupacionales',
    siteName: 'Bufete de Abogados Vásquez, PLLC',
    images: [
      {
        url: '/images/practice-areas/occupational-diseases-es.jpg',
        width: 1200,
        height: 630,
        alt: 'Enfermedades Ocupacionales Carolina del Norte',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  alternates: {
    canonical:
      'https://www.vasquezlawfirm.com/es/areas-de-practica/compensacion-laboral/enfermedades-ocupacionales',
    languages: {
      'en-US':
        'https://www.vasquezlawfirm.com/practice-areas/workers-compensation/occupational-diseases',
      'es-ES':
        'https://www.vasquezlawfirm.com/es/areas-de-practica/compensacion-laboral/enfermedades-ocupacionales',
    },
  },
};

export default function EnfermedadesOcupacionalesPage() {
  const services = [
    {
      title: 'Enfermedades por Asbesto',
      description:
        'El asbesto causa cánceres mortales décadas después de la exposición. Tenemos experiencia en mesotelioma, asbestosis y cáncer de pulmón relacionado con asbesto.',
      features: [
        'Mesotelioma pleural/peritoneal',
        'Asbestosis pulmonar',
        'Cáncer de pulmón por asbesto',
        'Placas pleurales',
        'Derrame pleural',
        'Exposición en construcción/demolición',
      ],
    },
    {
      title: 'Pérdida Auditiva Ocupacional',
      description:
        'El ruido industrial causa pérdida auditiva permanente. Documentamos exposición al ruido y obtenemos compensación por discapacidad auditiva.',
      features: [
        'Pérdida auditiva neurosensorial',
        'Tinnitus (zumbido de oídos)',
        'Exposición a ruido industrial',
        'Audiometrías especializadas',
        'Audífonos y dispositivos',
        'Calificación de discapacidad auditiva',
      ],
    },
    {
      title: 'Enfermedades Químicas y Tóxicas',
      description:
        'Químicos industriales causan cáncer, daño orgánico y enfermedades neurológicas. Manejamos casos complejos de exposición tóxica.',
      features: [
        'Cánceres ocupacionales',
        'Daño hepático/renal',
        'Enfermedades neurológicas',
        'Dermatitis química',
        'Enfermedades respiratorias',
        'Trastornos reproductivos',
      ],
    },
    {
      title: 'Enfermedades Respiratorias',
      description:
        'Polvos, humos y químicos causan enfermedades pulmonares graves. Obtenemos tratamiento especializado y compensación por discapacidad respiratoria.',
      features: [
        'Silicosis por sílice',
        'Neumoconiosis',
        'Asma ocupacional',
        'Fibrosis pulmonar',
        'Enfermedad pulmonar obstructiva',
        'Cáncer respiratorio',
      ],
    },
    {
      title: 'Lesiones por Radiación',
      description:
        'La exposición a radiación causa cánceres y enfermedades graves. Manejamos casos en medicina, industria nuclear y construcción.',
      features: [
        'Cánceres radioinducidos',
        'Síndrome de radiación',
        'Esterilidad por radiación',
        'Cataratas radiológicas',
        'Daño cromosómico',
        'Exposición médica/industrial',
      ],
    },
    {
      title: 'Enfermedades Infecciosas',
      description:
        'Trabajadores de salud y servicios públicos enfrentan exposición a enfermedades infecciosas. Obtenemos compensación por contagio laboral.',
      features: [
        'COVID-19 ocupacional',
        'Hepatitis B/C',
        'VIH/SIDA ocupacional',
        'Tuberculosis',
        'MRSA y superbacterias',
        'Enfermedades transmitidas por vector',
      ],
    },
  ];

  const faqs = [
    {
      question: '¿Cómo puedo probar que mi enfermedad está relacionada con el trabajo?',
      answer:
        'Requiere evidencia médica, historial de exposición laboral, y testimonio experto. Trabajamos con médicos ocupacionales y epidemiólogos para establecer la conexión causal.',
    },
    {
      question: '¿Tengo plazo para reportar una enfermedad ocupacional?',
      answer:
        'En NC, debe reportar dentro de 2 años de conocer o deber haber sabido que la enfermedad está relacionada con el trabajo. Para enfermedades por asbesto, el plazo puede extenderse.',
    },
    {
      question: '¿Puedo obtener compensación si mi cáncer se desarrolló años después?',
      answer:
        'Sí. Enfermedades como mesotelioma pueden desarrollarse 20-50 años después de la exposición. El plazo comienza cuando se diagnostica la enfermedad, no cuando ocurrió la exposición.',
    },
    {
      question: '¿Qué pasa si trabajé para múltiples empleadores que me expusieron?',
      answer:
        'Puede tener reclamos contra múltiples empleadores. Investigamos toda su historia laboral para identificar todas las fuentes de exposición y responsabilidad.',
    },
    {
      question: '¿Las enfermedades ocupacionales califican para compensación permanente?',
      answer:
        'Sí. Muchas enfermedades ocupacionales causan discapacidad permanente. Utilizamos especialistas para calcular el grado de deterioro y maximizar su compensación.',
    },
  ];

  return (
    <>
      <ModernPracticeAreaTemplate
        title="Abogados de Enfermedades Ocupacionales"
        subtitle="Cuando el Trabajo Causa Enfermedad - YO PELEO POR TI™"
        description="Las enfermedades ocupacionales son traicioneras - se desarrollan lentamente pero pueden ser mortales. Desde asbesto hasta químicos tóxicos, estas condiciones requieren experiencia médica y legal especializada. Con 60+ años manejando los casos más complejos."
        services={services}
        faqs={faqs}
        content={
          <div className="space-y-12">
            {/* Warning Signs Section */}
            <section className="bg-red-900/20 border border-red-500/30 rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-6 text-red-400">
                ⚠️ SEÑALES DE ALERTA DE ENFERMEDADES OCUPACIONALES
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-primary mb-3">
                    Síntomas que NO Debe Ignorar:
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>
                      🫁 <strong>Respiratorios:</strong> Tos persistente, falta de aire, dolor de
                      pecho
                    </li>
                    <li>
                      🧠 <strong>Neurológicos:</strong> Pérdida de memoria, temblores, confusión
                    </li>
                    <li>
                      👂 <strong>Auditivos:</strong> Pérdida auditiva, zumbido constante
                    </li>
                    <li>
                      🤮 <strong>Digestivos:</strong> Náuseas crónicas, pérdida de peso
                    </li>
                    <li>
                      🩸 <strong>Sistémicos:</strong> Fatiga extrema, fiebres recurrentes
                    </li>
                    <li>
                      🔬 <strong>Cambios en sangre:</strong> Anemia, conteos anormales
                    </li>
                  </ul>
                </div>
                <div className="bg-primary/10 rounded-lg p-6 border border-primary/30">
                  <h3 className="text-xl font-bold text-primary mb-3">
                    ACCIÓN INMEDIATA Requerida
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>✓ Busque evaluación médica especializada</li>
                    <li>✓ Documente su historial de exposición</li>
                    <li>✓ Conserve registros de trabajo</li>
                    <li>✓ Reporte síntomas a empleador</li>
                    <li>✓ Contacte abogado especializado</li>
                    <li>✓ NO demore - evidencia se pierde</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* NC Occupational Disease Statistics */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Crisis de Enfermedades Ocupacionales en Carolina del Norte
              </h2>
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                  <div className="text-3xl font-black text-red-400 mb-2">1,200+</div>
                  <div className="text-gray-300">Casos de cáncer ocupacional anuales</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                  <div className="text-3xl font-black text-orange-400 mb-2">15,000+</div>
                  <div className="text-gray-300">Trabajadores con pérdida auditiva</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                  <div className="text-3xl font-black text-yellow-400 mb-2">89%</div>
                  <div className="text-gray-300">Se desarrollan después del retiro</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                  <div className="text-3xl font-black text-primary mb-2">23%</div>
                  <div className="text-gray-300">Tasa de mortalidad</div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  Industrias de Alto Riesgo en Carolina del Norte
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-red-400 mb-3">
                      🏗️ Construcción y Demolición
                    </h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• Asbesto en edificios antiguos</li>
                      <li>• Polvo de sílice</li>
                      <li>• Plomo en pintura</li>
                      <li>• Químicos de soldadura</li>
                      <li>• Ruido de maquinaria pesada</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-400 mb-3">🏭 Manufactura Química</h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• Benceno y derivados</li>
                      <li>• Formaldehído</li>
                      <li>• Metales pesados</li>
                      <li>• Solventes orgánicos</li>
                      <li>• Gases industriales</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-400 mb-3">🏥 Cuidado de Salud</h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• Enfermedades infecciosas</li>
                      <li>• Radiación médica</li>
                      <li>• Químicos de esterilización</li>
                      <li>• Medicamentos quimioterapéuticos</li>
                      <li>• Virus respiratorios</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Disease Categories */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Categorías Principales de Enfermedades Ocupacionales
              </h2>
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-red-500/30">
                  <h3 className="text-xl font-bold text-red-400 mb-4">
                    🔴 CÁNCERES OCUPACIONALES - Latencia 10-50 años
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Asbesto (Más Mortal):</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>
                          • <strong>Mesotelioma:</strong> 95% fatal, compensación $1M+
                        </li>
                        <li>
                          • <strong>Cáncer de pulmón:</strong> Fumadores y no fumadores
                        </li>
                        <li>
                          • <strong>Cáncer de laringe:</strong> Pérdida del habla
                        </li>
                        <li>
                          • <strong>Cáncer de ovario:</strong> Mujeres expuestas
                        </li>
                        <li>
                          • <strong>Asbestosis:</strong> Fibrosis pulmonar fatal
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Químicos Carcinógenos:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>
                          • <strong>Benceno:</strong> Leucemia, linfoma
                        </li>
                        <li>
                          • <strong>Formaldehído:</strong> Cáncer nasal, leucemia
                        </li>
                        <li>
                          • <strong>Cromo hexavalente:</strong> Cáncer de pulmón
                        </li>
                        <li>
                          • <strong>Níquel:</strong> Cáncer nasal, de pulmón
                        </li>
                        <li>
                          • <strong>Cadmio:</strong> Cáncer de próstata, pulmón
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-orange-500/30">
                  <h3 className="text-xl font-bold text-orange-400 mb-4">
                    🟠 ENFERMEDADES RESPIRATORIAS - Progresivas
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Neumoconiosis (Polvo):</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>
                          • <strong>Silicosis:</strong> Polvo de sílice, mortal
                        </li>
                        <li>
                          • <strong>Neumoconiosis del carbón:</strong> Pulmón negro
                        </li>
                        <li>
                          • <strong>Beriliosis:</strong> Berilio, inflamación crónica
                        </li>
                        <li>
                          • <strong>Baritosis:</strong> Polvo de bario
                        </li>
                        <li>
                          • <strong>Siderosis:</strong> Polvo de hierro
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Enfermedades Reactivas:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>
                          • <strong>Asma ocupacional:</strong> Reversible inicialmente
                        </li>
                        <li>
                          • <strong>Alveolitis alérgica:</strong> Polvos orgánicos
                        </li>
                        <li>
                          • <strong>Síndrome tóxico:</strong> Inhalación masiva
                        </li>
                        <li>
                          • <strong>Edema pulmonar:</strong> Gases irritantes
                        </li>
                        <li>
                          • <strong>Fibrosis química:</strong> Cicatrización permanente
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-yellow-500/30">
                  <h3 className="text-xl font-bold text-yellow-400 mb-4">
                    🟡 ENFERMEDADES NEUROLÓGICAS - Degenerativas
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Metales Pesados:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>
                          • <strong>Plomo:</strong> Encefalopatía, neuropatía
                        </li>
                        <li>
                          • <strong>Mercurio:</strong> Temblores, demencia
                        </li>
                        <li>
                          • <strong>Manganeso:</strong> Parkinsonismo
                        </li>
                        <li>
                          • <strong>Arsénico:</strong> Neuropatía periférica
                        </li>
                        <li>
                          • <strong>Aluminio:</strong> Deterioro cognitivo
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Solventes Orgánicos:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>
                          • <strong>Tolueno:</strong> Deterioro cognitivo
                        </li>
                        <li>
                          • <strong>Hexano:</strong> Neuropatía periférica
                        </li>
                        <li>
                          • <strong>Tricloroetileno:</strong> Neurotoxicidad
                        </li>
                        <li>
                          • <strong>Estireno:</strong> Pérdida auditiva, neurológica
                        </li>
                        <li>
                          • <strong>Metanol:</strong> Ceguera, daño cerebral
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-blue-500/30">
                  <h3 className="text-xl font-bold text-blue-400 mb-4">
                    🔵 PÉRDIDA AUDITIVA - Permanente e Irreversible
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">
                        Niveles de Ruido Peligrosos:
                      </h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>
                          • <strong>85 dB:</strong> Daño con exposición prolongada
                        </li>
                        <li>
                          • <strong>90 dB:</strong> Límite OSHA (8 horas)
                        </li>
                        <li>
                          • <strong>100 dB:</strong> Daño en 2 horas
                        </li>
                        <li>
                          • <strong>110 dB:</strong> Daño en 30 minutos
                        </li>
                        <li>
                          • <strong>120+ dB:</strong> Daño inmediato permanente
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Fuentes Comunes en NC:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Manufactura textil (95-100 dB)</li>
                        <li>• Construcción (85-110 dB)</li>
                        <li>• Agricultura (90-105 dB)</li>
                        <li>• Aeropuertos (100-130 dB)</li>
                        <li>• Minería (90-110 dB)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Legal Challenges and Strategy */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Desafíos Legales Únicos y Nuestra Estrategia
              </h2>
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-4">
                    Desafío #1: Probar Conexión Causal
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Obstáculos Comunes:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Latencia de décadas</li>
                        <li>• Múltiples empleadores</li>
                        <li>• Factores de confusión (fumar)</li>
                        <li>• Registros perdidos/destruidos</li>
                        <li>• Negación de las aseguradoras</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Nuestra Solución:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Médicos ocupacionales expertos</li>
                        <li>• Higienistas industriales</li>
                        <li>• Epidemiólogos especializados</li>
                        <li>• Reconstrucción de exposición</li>
                        <li>• Literatura médica actual</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-4">
                    Desafío #2: Documentación de Exposición
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Evidencia que Buscamos:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Registros de personal</li>
                        <li>• Hojas de datos de seguridad</li>
                        <li>• Reportes de inspección</li>
                        <li>• Testimonios de compañeros</li>
                        <li>• Estudios ambientales</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Técnicas Especializadas:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Muestreo retroactivo</li>
                        <li>• Modelos de exposición</li>
                        <li>• Análisis de materiales</li>
                        <li>• Mapeo de procesos históricos</li>
                        <li>• Bases de datos industriales</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-4">
                    Desafío #3: Valoración de Casos Complejos
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">
                        Factores de Compensación:
                      </h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Grado de discapacidad</li>
                        <li>• Expectativa de vida</li>
                        <li>• Costos médicos futuros</li>
                        <li>• Pérdida de capacidad laboral</li>
                        <li>• Sufrimiento y dolor</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Nuestro Enfoque:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Economistas médicos</li>
                        <li>• Planificadores de vida</li>
                        <li>• Expertos en costos médicos</li>
                        <li>• Evaluadores vocacionales</li>
                        <li>• Especialistas en discapacidad</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Treatment and Compensation */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Tratamiento y Compensación Especializada
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                    <h3 className="text-lg font-bold text-primary mb-3">
                      Centros de Tratamiento Especializados
                    </h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>
                        • <strong>Duke Occupational Medicine:</strong> Diagnóstico avanzado
                      </li>
                      <li>
                        • <strong>UNC Lung Center:</strong> Enfermedades respiratorias
                      </li>
                      <li>
                        • <strong>Wake Forest Cancer Center:</strong> Cánceres ocupacionales
                      </li>
                      <li>
                        • <strong>NIEHS:</strong> Investigación y tratamiento
                      </li>
                      <li>
                        • <strong>Clínicas especializadas:</strong> Por tipo de exposición
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                    <h3 className="text-lg font-bold text-primary mb-3">
                      Tratamientos Experimentales
                    </h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• Inmunoterapia para mesotelioma</li>
                      <li>• Terapia génica para cánceres</li>
                      <li>• Quelación para metales pesados</li>
                      <li>• Transplantes de pulmón</li>
                      <li>• Implantes cocleares avanzados</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                    <h3 className="text-lg font-bold text-primary mb-3">
                      Compensación Típica por Enfermedad
                    </h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>
                        • <strong>Mesotelioma:</strong> $1M - $2.5M+
                      </li>
                      <li>
                        • <strong>Cáncer de pulmón por asbesto:</strong> $500K - $1.5M
                      </li>
                      <li>
                        • <strong>Silicosis avanzada:</strong> $300K - $800K
                      </li>
                      <li>
                        • <strong>Pérdida auditiva severa:</strong> $50K - $200K
                      </li>
                      <li>
                        • <strong>Enfermedades neurológicas:</strong> $200K - $1M
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                    <h3 className="text-lg font-bold text-primary mb-3">Resultados Recientes</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• $2.1M - Mesotelioma trabajador construcción</li>
                      <li>• $875K - Silicosis trabajador canteras</li>
                      <li>• $650K - Pérdida auditiva manufactura</li>
                      <li>• $1.3M - Cáncer químicos industriales</li>
                      <li>• 92% de casos resueltos exitosamente</li>
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
        id="occupational-diseases-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Abogados de Enfermedades Ocupacionales - Bufete de Abogados Vásquez',
            description:
              'Representación legal especializada para enfermedades ocupacionales en Carolina del Norte. Asbesto, químicos tóxicos, pérdida auditiva, cáncer laboral. Consulta gratuita.',
            provider: {
              '@type': 'Attorney',
              name: 'Bufete de Abogados Vásquez, PLLC',
              url: 'https://www.vasquezlawfirm.com',
            },
            areaServed: {
              '@type': 'State',
              name: 'Carolina del Norte',
            },
            serviceType: 'Enfermedades Ocupacionales',
            offers: {
              '@type': 'Offer',
              name: 'Consulta Médica-Legal Especializada',
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
