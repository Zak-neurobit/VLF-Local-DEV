import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Abogados de Accidentes con Maquinaria NC | YO PELEO POR TI™ | Lesiones Industriales',
  description: 'Abogados expertos en accidentes con maquinaria NC. Atrapamiento, amputaciones, cortes, electrocución. Casos complejos industriales. Compensación máxima. Consulta gratuita. Se habla español.',
  keywords: 'accidentes maquinaria NC, atrapamiento maquinaria, amputaciones trabajo, cortes maquinaria industrial, electrocución trabajo, prensas industriales, equipos defectuosos, lesiones graves maquinaria, abogado accidentes industriales Raleigh',
  openGraph: {
    title: 'Abogados de Accidentes con Maquinaria NC | YO PELEO POR TI™',
    description: 'Abogados expertos en accidentes con maquinaria NC. Atrapamiento, amputaciones, cortes, electrocución. Casos complejos industriales. Compensación máxima.',
    url: 'https://www.vasquezlawfirm.com/es/areas-de-practica/compensacion-laboral/accidentes-con-maquinaria',
    siteName: 'Bufete de Abogados Vásquez, PLLC',
    images: [
      {
        url: '/images/practice-areas/machinery-accidents-es.jpg',
        width: 1200,
        height: 630,
        alt: 'Accidentes con Maquinaria Carolina del Norte'
      }
    ],
    locale: 'es_ES',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.vasquezlawfirm.com/es/areas-de-practica/compensacion-laboral/accidentes-con-maquinaria',
    languages: {
      'en-US': 'https://www.vasquezlawfirm.com/practice-areas/workers-compensation/machinery-accidents',
      'es-ES': 'https://www.vasquezlawfirm.com/es/areas-de-practica/compensacion-laboral/accidentes-con-maquinaria'
    }
  }
};

export default function AccidentesConMaquinariaPage() {
  const services = [
    {
      title: 'Atrapamiento en Maquinaria',
      description: 'El atrapamiento en máquinas causa lesiones devastadoras. Investigamos fallas de seguridad y equipos defectuosos para máxima compensación.',
      features: [
        'Atrapamiento en correas/poleas',
        'Puntos de pellizco',
        'Engranajes expuestos',
        'Prensas industriales',
        'Equipos de procesamiento',
        'Fallas de sistemas LOTO'
      ]
    },
    {
      title: 'Amputaciones Traumáticas',
      description: 'Las amputaciones cambian vidas para siempre. Aseguramos compensación de por vida, prótesis y rehabilitación especializada.',
      features: [
        'Amputación de dedos/manos',
        'Amputación de brazos',
        'Amputación de piernas',
        'Prótesis especializadas',
        'Rehabilitación ocupacional',
        'Modificaciones del hogar'
      ]
    },
    {
      title: 'Cortes Graves por Maquinaria',
      description: 'Sierras, cortadoras y equipos afilados causan laceraciones profundas. Obtenemos tratamiento de trauma y compensación por cicatrices.',
      features: [
        'Cortes con sierras circulares',
        'Laceraciones por prensas',
        'Cortes con guillotinas',
        'Heridas por cuchillas',
        'Cirugía reconstructiva',
        'Tratamiento de cicatrices'
      ]
    },
    {
      title: 'Electrocución y Quemaduras Eléctricas',
      description: 'La electricidad industrial puede matar o causar lesiones permanentes. Investigamos violaciones eléctricas y equipos defectuosos.',
      features: [
        'Electrocución de alto voltaje',
        'Quemaduras eléctricas',
        'Daño neurológico',
        'Paro cardíaco',
        'Quemaduras de arco eléctrico',
        'Cuidado especializado de quemados'
      ]
    },
    {
      title: 'Fallas de Equipos y Mantenimiento',
      description: 'Los equipos mal mantenidos causan accidentes graves. Probamos negligencia de mantenimiento y responsabilidad del fabricante.',
      features: [
        'Falta de mantenimiento preventivo',
        'Guardas de seguridad removidas',
        'Sistemas de parada de emergencia',
        'Equipos obsoletos peligrosos',
        'Falta de entrenamiento',
        'Supervisión inadecuada'
      ]
    },
    {
      title: 'Exposición a Químicos Industriales',
      description: 'Químicos tóxicos en procesos industriales causan enfermedades graves. Manejamos casos de exposición aguda y crónica.',
      features: [
        'Exposición a solventes',
        'Químicos corrosivos',
        'Gases tóxicos',
        'Metales pesados',
        'Enfermedades respiratorias',
        'Daño orgánico permanente'
      ]
    }
  ];

  const faqs = [
    {
      question: '¿Qué debo hacer inmediatamente después de un accidente con maquinaria?',
      answer: 'Busque atención médica de emergencia INMEDIATAMENTE. No mueva la maquinaria. Tome fotos si es seguro. Reporte inmediatamente. Preserve evidencia. Contacte a un abogado especializado en 24 horas.'
    },
    {
      question: '¿Puedo demandar al fabricante del equipo además de compensación laboral?',
      answer: 'Sí. Si el equipo tenía defectos de diseño o fabricación, puede tener un caso de responsabilidad del producto separado que puede resultar en compensación adicional significativa.'
    },
    {
      question: '¿Cómo prueban que fue negligencia del empleador?',
      answer: 'Investigamos violaciones de OSHA, falta de entrenamiento, mantenimiento inadecuado, guardas removidas, procedimientos de seguridad ignorados, y presión para trabajar peligrosamente.'
    },
    {
      question: '¿Qué compensación puedo recibir por una amputación?',
      answer: 'Además de beneficios médicos completos, puede recibir compensación por discapacidad permanente, pérdida de capacidad laboral, prótesis, rehabilitación, y modificaciones del hogar y vehículo.'
    },
    {
      question: '¿Cuánto tiempo tengo para reportar un accidente con maquinaria?',
      answer: 'Debe reportar inmediatamente a su empleador y dentro de 30 días oficialmente. Sin embargo, para preservar evidencia crucial, debe contactar a un abogado dentro de 24-48 horas.'
    }
  ];

  return (
    <>
      <ModernPracticeAreaTemplate
        title="Abogados de Accidentes con Maquinaria"
        subtitle="Cuando las Máquinas Fallan - YO PELEO POR TI™"
        description="Los accidentes con maquinaria industrial son los más devastadores en el lugar de trabajo. Desde amputaciones hasta electrocución, estas lesiones requieren experiencia especializada. Con 60+ años manejando los casos más complejos de maquinaria."
        services={services}
        faqs={faqs}
        content={
          <div className="space-y-12">
            {/* Emergency Section */}
            <section className="bg-red-900/20 border border-red-500/30 rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-6 text-red-400">🚨 ACCIDENTE CON MAQUINARIA - PROTOCOLO DE EMERGENCIA</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-primary mb-3">ACCIÓN INMEDIATA - Primeros 60 Minutos:</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>🚨 <strong>Llamar 911</strong> - Atención médica de emergencia</li>
                    <li>🔒 <strong>Asegurar área</strong> - No mover maquinaria</li>
                    <li>📸 <strong>Documentar escena</strong> - Fotos/video si es seguro</li>
                    <li>👥 <strong>Testigos</strong> - Nombres y contactos</li>
                    <li>⚠️ <strong>NO admitir culpa</strong> - Solo hechos</li>
                    <li>📞 <strong>Abogado especializado</strong> - Dentro de 24 horas</li>
                  </ul>
                </div>
                <div className="bg-red-500/20 border border-red-500 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-red-400 mb-3">⚠️ PRESERVACIÓN CRÍTICA</h3>
                  <p className="text-gray-300 mb-4">La evidencia en accidentes con maquinaria desaparece rápidamente:</p>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Empleador puede reparar/modificar máquina</li>
                    <li>• Sangre y evidencia física se limpia</li>
                    <li>• Testigos son presionados al silencio</li>
                    <li>• Registros de mantenimiento &ldquo;desaparecen&rdquo;</li>
                    <li>• Videos de seguridad se sobrescriben</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Machinery Accident Statistics */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Estadísticas Devastadoras de NC</h2>
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                  <div className="text-3xl font-black text-red-400 mb-2">47</div>
                  <div className="text-gray-300">Muertes por maquinaria (2023)</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                  <div className="text-3xl font-black text-orange-400 mb-2">3,200+</div>
                  <div className="text-gray-300">Amputaciones anuales en NC</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                  <div className="text-3xl font-black text-yellow-400 mb-2">89%</div>
                  <div className="text-gray-300">Podrían haberse prevenido</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                  <div className="text-3xl font-black text-primary mb-2">$1.2M</div>
                  <div className="text-gray-300">Costo promedio de amputación</div>
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
                <h3 className="text-2xl font-bold text-primary mb-4">Industrias de Mayor Riesgo en Carolina del Norte</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-red-400 mb-3">🏭 Manufactura (52% de accidentes)</h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• Textiles y ropa</li>
                      <li>• Procesamiento de alimentos</li>
                      <li>• Muebles y madera</li>
                      <li>• Equipos de transporte</li>
                      <li>• Productos químicos</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-400 mb-3">🏗️ Construcción (23% de accidentes)</h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• Equipos pesados</li>
                      <li>• Grúas y montacargas</li>
                      <li>• Herramientas eléctricas</li>
                      <li>• Maquinaria de movimiento tierra</li>
                      <li>• Equipos de demolición</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-400 mb-3">🚜 Agricultura (15% de accidentes)</h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• Tractores y cosechadoras</li>
                      <li>• Equipos de procesamiento</li>
                      <li>• Sistemas de irrigación</li>
                      <li>• Maquinaria de empaque</li>
                      <li>• Equipos de granjas</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Types of Machinery Accidents */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Tipos de Accidentes con Maquinaria Más Peligrosos</h2>
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-red-500/30">
                  <h3 className="text-xl font-bold text-red-400 mb-4">🔴 NIVEL CRÍTICO - Lesiones Amenazantes de Vida</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Atrapamiento/Aplastamiento:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Prensas hidráulicas (400+ casos/año)</li>
                        <li>• Rodillos industriales</li>
                        <li>• Compactadores</li>
                        <li>• Equipos de forja</li>
                        <li>• Maquinaria textil</li>
                        <li>• <strong>Mortalidad: 85%</strong></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Electrocución Industrial:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Equipos de alto voltaje</li>
                        <li>• Líneas eléctricas aéreas</li>
                        <li>• Equipos mojados/húmedos</li>
                        <li>• Cableado defectuoso</li>
                        <li>• Arco eléctrico</li>
                        <li>• <strong>Mortalidad: 89%</strong></li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-orange-500/30">
                  <h3 className="text-xl font-bold text-orange-400 mb-4">🟠 NIVEL ALTO - Lesiones Permanentes Graves</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Amputaciones/Cortes Severos:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Sierras circulares/bandas</li>
                        <li>• Cortadoras industriales</li>
                        <li>• Guillotinas</li>
                        <li>• Cuchillas rotatorias</li>
                        <li>• Equipos de trituración</li>
                        <li>• <strong>Amputaciones: 3,200/año</strong></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Quemaduras Industriales:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Hornos industriales</li>
                        <li>• Metales fundidos</li>
                        <li>• Equipos de soldadura</li>
                        <li>• Químicos corrosivos</li>
                        <li>• Vapor de alta presión</li>
                        <li>• <strong>Injertos de piel: 67%</strong></li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-yellow-500/30">
                  <h3 className="text-xl font-bold text-yellow-400 mb-4">🟡 NIVEL MODERADO - Lesiones Significativas</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Impactos/Golpes:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Martillos neumáticos</li>
                        <li>• Piezas voladoras</li>
                        <li>• Equipos de perforación</li>
                        <li>• Herramientas eléctricas</li>
                        <li>• Fragmentos de metal</li>
                        <li>• <strong>TBI/Fracturas comunes</strong></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Exposición Química:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Sistemas de pulverización</li>
                        <li>• Tanques con fugas</li>
                        <li>• Vapores tóxicos</li>
                        <li>• Derrames industriales</li>
                        <li>• Sistemas de ventilación fallidos</li>
                        <li>• <strong>Daño orgánico permanente</strong></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Investigation Process */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Proceso de Investigación Especializada</h2>
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-4">Fase 1: Preservación Inmediata de Evidencia (0-72 horas)</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-2">Evidencia Física:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Fotografía forense de escena</li>
                        <li>• Muestras de materiales</li>
                        <li>• Posición de guardas</li>
                        <li>• Estado de controles</li>
                        <li>• Marcas en maquinaria</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-2">Documentación:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Manuales de operación</li>
                        <li>• Registros de mantenimiento</li>
                        <li>• Reportes de inspección</li>
                        <li>• Videos de seguridad</li>
                        <li>• Procedimientos LOTO</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-2">Testimonios:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Entrevistas con testigos</li>
                        <li>• Declaraciones de operadores</li>
                        <li>• Supervisores presentes</li>
                        <li>• Personal de mantenimiento</li>
                        <li>• Respondedores de emergencia</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-4">Fase 2: Análisis Técnico Especializado (1-6 meses)</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Ingeniería Forense:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Análisis de fallas mecánicas</li>
                        <li>• Inspección metalúrgica</li>
                        <li>• Análisis de diseño</li>
                        <li>• Evaluación de seguridad</li>
                        <li>• Reconstrucción de accidente</li>
                        <li>• Modelado por computadora</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Análisis Regulatorio:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Violaciones de OSHA</li>
                        <li>• Estándares de la industria</li>
                        <li>• Códigos de seguridad</li>
                        <li>• Regulaciones estatales</li>
                        <li>• Mejores prácticas</li>
                        <li>• Historial de la empresa</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-4">Fase 3: Construcción del Caso (6-18 meses)</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Responsabilidad Múltiple:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Empleador - negligencia</li>
                        <li>• Fabricante - defecto de diseño</li>
                        <li>• Contratista de mantenimiento</li>
                        <li>• Proveedor de piezas</li>
                        <li>• Empresa de instalación</li>
                        <li>• Compañía de seguridad</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Testimonio Experto:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Ingenieros de seguridad</li>
                        <li>• Expertos en OSHA</li>
                        <li>• Especialistas en ergonomía</li>
                        <li>• Médicos especialistas</li>
                        <li>• Economistas vocacionales</li>
                        <li>• Expertos en discapacidad</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Legal Strategy */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Estrategia Legal Agresiva</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                    <h3 className="text-lg font-bold text-primary mb-3">Múltiples Vías de Compensación</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• <strong>Compensación Laboral:</strong> Beneficios garantizados</li>
                      <li>• <strong>Responsabilidad del Producto:</strong> Equipos defectuosos</li>
                      <li>• <strong>Negligencia de Terceros:</strong> Contratistas</li>
                      <li>• <strong>Violaciones de OSHA:</strong> Multas y responsabilidad</li>
                      <li>• <strong>Casos de Mala Fe:</strong> Aseguradoras que demoran</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                    <h3 className="text-lg font-bold text-primary mb-3">Documentación Médica Especializada</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• Centros de trauma certificados</li>
                      <li>• Cirujanos de amputación</li>
                      <li>• Especialistas en quemados</li>
                      <li>• Neurocirujanos</li>
                      <li>• Planificación de vida futura</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                    <h3 className="text-lg font-bold text-primary mb-3">Presión Legal Máxima</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• Demandas inmediatas</li>
                      <li>• Órdenes de preservación</li>
                      <li>• Investigaciones independientes</li>
                      <li>• Presión mediática cuando apropiado</li>
                      <li>• Reportes a agencias regulatorias</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                    <h3 className="text-lg font-bold text-primary mb-3">Resultados Comprobados</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• $2.3M - Amputación mano prensa</li>
                      <li>• $1.8M - Electrocución industrial</li>
                      <li>• $1.5M - Atrapamiento conveyor</li>
                      <li>• $1.2M - Quemaduras químicas</li>
                      <li>• 95% de casos resueltos favorablemente</li>
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
        id="machinery-accidents-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Abogados de Accidentes con Maquinaria - Bufete de Abogados Vásquez',
            description: 'Representación legal especializada para accidentes con maquinaria industrial en Carolina del Norte. Atrapamiento, amputaciones, electrocución. Consulta gratuita.',
            provider: {
              '@type': 'Attorney',
              name: 'Bufete de Abogados Vásquez, PLLC',
              url: 'https://www.vasquezlawfirm.com'
            },
            areaServed: {
              '@type': 'State',
              name: 'Carolina del Norte'
            },
            serviceType: 'Accidentes con Maquinaria Industrial',
            offers: {
              '@type': 'Offer',
              name: 'Consulta de Emergencia 24/7',
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