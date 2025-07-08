import { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Zap, AlertTriangle, Heart, Shield, DollarSign, Phone, Clock, Activity, Home } from 'lucide-react';

const ChatWidget = dynamic(() => import('@/components/ChatWidget').then(mod => mod.ChatWidget), {
  ssr: false,
});

const VoiceAssistant = dynamic(() => import('@/components/VirtualAssistant/VirtualAssistantWrapper').then(mod => mod.VirtualAssistantWrapper), {
  ssr: false,
});

export const metadata: Metadata = {
  title: 'Abogados de Lesiones de Médula Espinal en NC | Parálisis | YO PELEO POR TI™',
  description: '¿Sufrió lesión de médula espinal? Abogados expertos en parálisis y lesiones espinales en Carolina del Norte. Luchamos por compensación máxima. Consulta GRATIS.',
  keywords: 'abogado lesiones médula espinal Carolina Norte, parálisis paraplejia tetraplejia, lesión espinal Raleigh, daño columna vertebral Charlotte, compensación parálisis NC',
  openGraph: {
    title: 'Abogados de Lesiones de Médula Espinal - Vasquez Law Firm | NC',
    description: 'Las lesiones de médula espinal requieren cuidado de por vida. Obtenga compensación completa para tratamiento, rehabilitación y adaptaciones. Llame 1-844-YO-PELEO',
    images: [{
      url: '/images/spinal-cord-injury-attorney.jpg',
      width: 1200,
      height: 630,
      alt: 'Abogados de Lesiones de Médula Espinal en Carolina del Norte'
    }],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/lesiones-medula-espinal',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/practice-areas/personal-injury/spinal-cord-injuries',
      'es-ES': 'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/lesiones-medula-espinal',
    },
  },
};

export default function LesionesMedulaEspinalPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-burgundy-900 to-black text-white py-20">
        <div className="absolute inset-0 bg-black/50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Zap className="w-20 h-20 mx-auto mb-6 text-yellow-400" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Abogados de Lesiones de Médula Espinal
            </h1>
            <p className="text-2xl md:text-3xl text-gold-400 font-semibold mb-6">
              Cuando la Vida Cambia en un Instante, Nosotros Luchamos por Su Futuro
            </p>
            <p className="text-xl mb-8">
              Las lesiones de médula espinal son devastadoras y costosas. 
              Obtenga la compensación que necesita para vivir con dignidad.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:18449673536"
                className="bg-red-600 text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-red-700 transition-all transform hover:scale-105 animate-pulse"
              >
                LÍNEA DE CRISIS: 1-844-YO-PELEO
              </a>
              <Link
                href="/es/consulta-gratuita"
                className="bg-gold-500 text-black px-8 py-4 rounded-md font-bold text-lg hover:bg-gold-400 transition-all"
              >
                Evaluación Inmediata Gratis
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-blue-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-4xl font-bold">17,000+</p>
              <p className="text-sm">Nuevas lesiones espinales cada año en USA</p>
            </div>
            <div>
              <p className="text-4xl font-bold">$1-5M</p>
              <p className="text-sm">Costo promedio de por vida</p>
            </div>
            <div>
              <p className="text-4xl font-bold">78%</p>
              <p className="text-sm">Son hombres jóvenes</p>
            </div>
            <div>
              <p className="text-4xl font-bold">38%</p>
              <p className="text-sm">Causadas por accidentes vehiculares</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                Una Lesión de Médula Espinal Cambia Todo Para Siempre
              </h2>
              
              <p className="text-gray-700 mb-6">
                La médula espinal es la autopista de información entre su cerebro y su cuerpo. 
                Cuando se daña, las consecuencias son inmediatas, severas y generalmente permanentes. 
                En Vasquez Law Firm, entendemos la magnitud de estos cambios y luchamos 
                incansablemente por obtener los recursos que necesita para enfrentar esta nueva realidad.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
                <Activity className="w-10 h-10 text-blue-600 mb-3" />
                <p className="text-lg font-semibold text-gray-900">
                  Realidad Médica: No existe cura actual para lesiones completas de médula espinal.
                </p>
                <p className="text-gray-700 mt-2">
                  El enfoque debe ser en maximizar la calidad de vida, independencia y 
                  acceso a las mejores terapias y tecnologías disponibles.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                Tipos de Lesiones de Médula Espinal
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-red-600">
                  <Activity className="w-10 h-10 text-red-600 mb-3" />
                  <h4 className="font-bold text-burgundy-900 mb-2">Tetraplejia (Cuadriplejia)</h4>
                  <p className="text-gray-700 mb-2">
                    Parálisis de brazos, manos, tronco, piernas y órganos pélvicos.
                  </p>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Lesión en segmentos cervicales (C1-C8)</li>
                    <li>• Requiere asistencia 24/7</li>
                    <li>• Puede afectar respiración</li>
                    <li>• Costos anuales: $185,000-$1M+</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-orange-600">
                  <Activity className="w-10 h-10 text-orange-600 mb-3" />
                  <h4 className="font-bold text-burgundy-900 mb-2">Paraplejia</h4>
                  <p className="text-gray-700 mb-2">
                    Parálisis del tronco, piernas y órganos pélvicos.
                  </p>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Lesión torácica, lumbar o sacra</li>
                    <li>• Mantiene uso de brazos</li>
                    <li>• Puede vivir independientemente</li>
                    <li>• Costos anuales: $70,000-$500,000</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 mb-8">
                <AlertTriangle className="w-10 h-10 text-yellow-600 mb-3" />
                <h4 className="font-bold text-burgundy-900 mb-2">Lesiones Completas vs. Incompletas</h4>
                <div className="grid md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="font-semibold">Completa:</p>
                    <p className="text-sm text-gray-700">Pérdida total de función sensorial y motora debajo del nivel de lesión.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Incompleta:</p>
                    <p className="text-sm text-gray-700">Alguna función sensorial o motora permanece. Mejor pronóstico de recuperación.</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                Causas Comunes en Carolina del Norte
              </h3>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></span>
                    <div>
                      <span className="font-semibold">Accidentes de Auto/Camión (38%)</span>
                      <p className="text-sm text-gray-600">Choques a alta velocidad, vuelcos</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></span>
                    <div>
                      <span className="font-semibold">Caídas (30%)</span>
                      <p className="text-sm text-gray-600">Construcción, escaleras, techos</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></span>
                    <div>
                      <span className="font-semibold">Violencia (14%)</span>
                      <p className="text-sm text-gray-600">Heridas de bala, asaltos</p>
                    </div>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></span>
                    <div>
                      <span className="font-semibold">Deportes (9%)</span>
                      <p className="text-sm text-gray-600">Fútbol, gimnasia, buceo</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></span>
                    <div>
                      <span className="font-semibold">Errores Médicos (5%)</span>
                      <p className="text-sm text-gray-600">Cirugías mal ejecutadas</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></span>
                    <div>
                      <span className="font-semibold">Otros (4%)</span>
                      <p className="text-sm text-gray-600">Defectos de productos, etc.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                El Verdadero Costo de Vivir con Lesión Espinal
              </h3>

              <div className="bg-burgundy-50 p-8 rounded-lg mb-8">
                <DollarSign className="w-12 h-12 text-burgundy-700 mb-4" />
                <h4 className="font-bold text-burgundy-900 mb-3">Costos de Por Vida (Estimados)</h4>
                
                <div className="space-y-4">
                  <div className="border-b pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">Tetraplejia Alta (C1-C4)</p>
                        <p className="text-sm text-gray-600">25 años en el momento de lesión</p>
                      </div>
                      <p className="text-2xl font-bold text-red-600">$4.7 millones</p>
                    </div>
                  </div>
                  
                  <div className="border-b pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">Tetraplejia Baja (C5-C8)</p>
                        <p className="text-sm text-gray-600">25 años en el momento de lesión</p>
                      </div>
                      <p className="text-2xl font-bold text-red-600">$3.5 millones</p>
                    </div>
                  </div>
                  
                  <div className="border-b pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">Paraplejia</p>
                        <p className="text-sm text-gray-600">25 años en el momento de lesión</p>
                      </div>
                      <p className="text-2xl font-bold text-red-600">$2.3 millones</p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">Función Motora Preservada</p>
                        <p className="text-sm text-gray-600">25 años en el momento de lesión</p>
                      </div>
                      <p className="text-2xl font-bold text-red-600">$1.6 millones</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mt-4">
                  *Fuente: National Spinal Cord Injury Statistical Center. No incluye pérdida de ingresos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Life Changes Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-burgundy-900 text-center mb-12">
              Cómo Cambia la Vida Después de una Lesión Espinal
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <Home className="w-10 h-10 text-blue-600 mb-3" />
                <h3 className="text-xl font-bold text-burgundy-900 mb-3">Modificaciones del Hogar</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Rampas y elevadores</li>
                  <li>• Baños accesibles ($30,000+)</li>
                  <li>• Puertas ensanchadas</li>
                  <li>• Cocina adaptada</li>
                  <li>• Sistema de emergencia</li>
                  <li>• Camas especiales</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <Shield className="w-10 h-10 text-blue-600 mb-3" />
                <h3 className="text-xl font-bold text-burgundy-900 mb-3">Cuidado Médico Continuo</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Enfermería 24/7 o parcial</li>
                  <li>• Terapia física diaria</li>
                  <li>• Manejo de complicaciones</li>
                  <li>• Medicamentos costosos</li>
                  <li>• Equipo médico especializado</li>
                  <li>• Cirugías adicionales</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <Heart className="w-10 h-10 text-blue-600 mb-3" />
                <h3 className="text-xl font-bold text-burgundy-900 mb-3">Impacto Emocional</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Depresión y ansiedad (común)</li>
                  <li>• Pérdida de independencia</li>
                  <li>• Cambios en relaciones</li>
                  <li>• Aislamiento social</li>
                  <li>• Necesidad de terapia psicológica</li>
                  <li>• Adaptación a nueva identidad</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <DollarSign className="w-10 h-10 text-blue-600 mb-3" />
                <h3 className="text-xl font-bold text-burgundy-900 mb-3">Pérdidas Económicas</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Incapacidad para trabajar</li>
                  <li>• Pérdida de carrera profesional</li>
                  <li>• Gastos médicos astronómicos</li>
                  <li>• Transporte especializado</li>
                  <li>• Tecnología adaptativa</li>
                  <li>• Cuidadores permanentes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-burgundy-900 text-center mb-12">
              Por Qué Somos los Abogados Correctos para Su Caso
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-burgundy-900 mb-2">
                    Equipo de Expertos Médicos
                  </h3>
                  <p className="text-gray-700">
                    Trabajamos con neurocirujanos, especialistas en rehabilitación espinal 
                    y economistas médicos para documentar completamente sus necesidades futuras.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-burgundy-900 mb-2">
                    Comprensión de Tecnología Adaptativa
                  </h3>
                  <p className="text-gray-700">
                    Conocemos las últimas tecnologías: sillas de ruedas motorizadas avanzadas, 
                    sistemas de control ambiental, vehículos adaptados y más.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-burgundy-900 mb-2">
                    Planificación de Vida Completa
                  </h3>
                  <p className="text-gray-700">
                    No solo pensamos en costos inmediatos. Planificamos para décadas de 
                    cuidado, incluyendo inflación médica y avances en tratamientos.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-bold text-burgundy-900 mb-2">
                    Recursos para Casos Complejos
                  </h3>
                  <p className="text-gray-700">
                    Tenemos los recursos financieros para contratar los mejores expertos 
                    y llevar su caso hasta el final, sin importar qué tan grande sea el oponente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Results */}
      <section className="bg-burgundy-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Resultados para Víctimas de Lesiones Espinales
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 p-6 rounded-lg">
                <p className="text-4xl font-bold text-gold-400 mb-3">$8.5M</p>
                <h3 className="text-xl font-bold mb-2">Accidente de Camión - Tetraplejia</h3>
                <p>Hombre de 28 años, padre de 2. Camión comercial ignoró señal de alto. 
                   Compensación cubre cuidado 24/7, modificaciones del hogar y pérdida de ingresos.</p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-lg">
                <p className="text-4xl font-bold text-gold-400 mb-3">$6.2M</p>
                <h3 className="text-xl font-bold mb-2">Caída en Construcción - Paraplejia</h3>
                <p>Trabajador cayó de andamio defectuoso. Empresa no siguió normas OSHA. 
                   Incluye reentrenamiento vocacional y tecnología adaptativa.</p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-lg">
                <p className="text-4xl font-bold text-gold-400 mb-3">$4.8M</p>
                <h3 className="text-xl font-bold mb-2">Negligencia Médica - Lesión Quirúrgica</h3>
                <p>Error durante cirugía de espalda causó daño permanente. 
                   Hospital admitió responsabilidad. Cubre toda vida de cuidados.</p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-lg">
                <p className="text-4xl font-bold text-gold-400 mb-3">$7.3M</p>
                <h3 className="text-xl font-bold mb-2">Accidente de Motocicleta</h3>
                <p>Conductor ebrio golpeó a motociclista. Lesión C5-C6. 
                   Incluye vehículo adaptado y modificaciones extensivas del hogar.</p>
              </div>
            </div>
            
            <p className="text-center mt-8 text-sm">
              *Cada caso es único. Resultados dependen de hechos específicos y leyes aplicables.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-xl">
              <Activity className="w-12 h-12 text-blue-600 mb-4" />
              <p className="text-xl text-gray-700 italic mb-6">
                &ldquo;Después de mi accidente, pensé que mi vida había terminado. No podía mover 
                nada debajo del pecho. Vasquez Law Firm no solo consiguió compensación para 
                mi cuidado médico - me ayudaron a encontrar esperanza. Ahora tengo la mejor 
                tecnología adaptativa, puedo trabajar desde casa, y mi familia está segura 
                financieramente. Son más que abogados - son ángeles.&rdquo;
              </p>
              <div className="border-t pt-4">
                <p className="font-bold text-burgundy-900">- Miguel T.</p>
                <p className="text-gray-600">Tetraplejia por accidente de construcción, Winston-Salem</p>
                <div className="text-gold-500 mt-2">★★★★★</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-900 to-burgundy-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Zap className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
            <h2 className="text-4xl font-bold mb-6">
              Su Vida Vale Más de lo que Ofrece el Seguro
            </h2>
            <p className="text-xl mb-8">
              Las aseguradoras quieren pagar lo mínimo. Usted necesita compensación 
              para DÉCADAS de cuidado especializado. No se conforme con menos.
            </p>
            
            <div className="bg-white text-burgundy-900 p-8 rounded-lg inline-block shadow-2xl">
              <p className="text-3xl font-bold mb-4">YO PELEO POR TI™</p>
              <p className="text-xl mb-2">Evaluación Completa Sin Costo</p>
              <p className="text-lg mb-6">Visitamos Hospitales y Centros de Rehabilitación</p>
              <a
                href="tel:18449673536"
                className="bg-blue-700 text-white px-10 py-5 rounded-md font-bold text-2xl hover:bg-blue-800 transition-all inline-flex items-center"
              >
                <Phone className="mr-3" />
                1-844-YO-PELEO
              </a>
              <p className="mt-6 text-sm">
                Disponible 24/7 • 100% Contingencia • Hablamos Español
              </p>
            </div>
            
            <div className="mt-8 bg-yellow-400 text-black p-4 rounded-lg inline-block">
              <p className="font-bold">
                ⏱️ ACTÚE AHORA: La evidencia se pierde. Los testigos olvidan. 
                El tiempo límite corre.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-burgundy-900 mb-6">
              Recursos y Apoyo Adicional
            </h3>
            <p className="text-gray-700 mb-6">
              Además de luchar por su compensación, conectamos a nuestros clientes con:
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <ul className="space-y-2">
                <li>• Centros de rehabilitación espinal líderes</li>
                <li>• Programas de terapia ocupacional</li>
                <li>• Grupos de apoyo para lesiones espinales</li>
                <li>• Recursos de empleo adaptativo</li>
              </ul>
              <ul className="space-y-2">
                <li>• Proveedores de tecnología adaptativa</li>
                <li>• Contratistas especializados en accesibilidad</li>
                <li>• Programas deportivos adaptados</li>
                <li>• Servicios de salud mental especializados</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* AI Components */}
      <ChatWidget userId="lesiones-medula-espinal-page" language="es" />
      <VoiceAssistant language="es" />

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Vasquez Law Firm - Abogados de Lesiones de Médula Espinal',
            description: 'Abogados especializados en lesiones de médula espinal, parálisis, tetraplejia y paraplejia en Carolina del Norte. Compensación para cuidado de por vida.',
            url: 'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/lesiones-medula-espinal',
            telephone: '+1-844-967-3536',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '6801 Glenwood Ave',
              addressLocality: 'Raleigh',
              addressRegion: 'NC',
              postalCode: '27612',
              addressCountry: 'US'
            },
            areaServed: ['Raleigh', 'Charlotte', 'Durham', 'Winston-Salem', 'Greensboro', 'North Carolina'],
            priceRange: 'Sin costo inicial - Base de contingencia',
            openingHours: 'Mo-Su 00:00-23:59',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '5.0',
              reviewCount: '58'
            }
          }),
        }}
      />
    </div>
  );
}