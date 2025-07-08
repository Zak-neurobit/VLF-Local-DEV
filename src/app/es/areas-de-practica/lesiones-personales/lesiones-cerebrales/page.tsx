import { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Brain, AlertTriangle, Heart, Shield, Users, Activity, DollarSign, Phone, Clock, FileWarning } from 'lucide-react';

const ChatWidget = dynamic(() => import('@/components/ChatWidget').then(mod => mod.ChatWidget), {
  ssr: false,
});

const VoiceAssistant = dynamic(() => import('@/components/VirtualAssistant/VirtualAssistantWrapper').then(mod => mod.VirtualAssistantWrapper), {
  ssr: false,
});

export const metadata: Metadata = {
  title: 'Abogados de Lesiones Cerebrales en NC | TBI Traumático | YO PELEO POR TI™',
  description: '¿Sufrió lesión cerebral traumática? Abogados expertos en TBI en Carolina del Norte. Luchamos por compensación completa para cuidado de por vida. Consulta GRATIS.',
  keywords: 'abogado lesiones cerebrales Carolina Norte, TBI traumatic brain injury español, conmoción cerebral Raleigh, daño cerebral Charlotte, compensación lesión cabeza NC',
  openGraph: {
    title: 'Abogados de Lesiones Cerebrales Traumáticas - Vasquez Law Firm | NC',
    description: 'Las lesiones cerebrales cambian vidas para siempre. Obtenga compensación para tratamiento médico, rehabilitación y cuidado futuro. Llame 1-844-YO-PELEO',
    images: [{
      url: '/images/brain-injury-attorney.jpg',
      width: 1200,
      height: 630,
      alt: 'Abogados de Lesiones Cerebrales en Carolina del Norte'
    }],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/lesiones-cerebrales',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/practice-areas/personal-injury/brain-injuries',
      'es-ES': 'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/lesiones-cerebrales',
    },
  },
};

export default function LesionesCerebralesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-burgundy-900 to-burgundy-800 text-white py-20">
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Brain className="w-20 h-20 mx-auto mb-6 text-purple-300" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Abogados de Lesiones Cerebrales Traumáticas
            </h1>
            <p className="text-2xl md:text-3xl text-gold-400 font-semibold mb-6">
              Las Lesiones Invisibles Necesitan Defensores Visibles
            </p>
            <p className="text-xl mb-8">
              Una lesión cerebral puede cambiar todo en un instante. 
              Luchamos por el cuidado y compensación que necesita para toda la vida.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:18449673536"
                className="bg-purple-600 text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-purple-700 transition-all transform hover:scale-105 animate-pulse"
              >
                URGENTE: 1-844-YO-PELEO
              </a>
              <Link
                href="/es/consulta-gratuita"
                className="bg-gold-500 text-black px-8 py-4 rounded-md font-bold text-lg hover:bg-gold-400 transition-all"
              >
                Evaluación Gratuita del Caso
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Alert Section */}
      <section className="bg-purple-700 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-4">
            <AlertTriangle className="w-8 h-8 animate-pulse" />
            <p className="text-lg font-semibold text-center">
              ADVERTENCIA: Los síntomas de lesiones cerebrales pueden aparecer días o semanas después. 
              No ignore dolores de cabeza, mareos o cambios de comportamiento.
            </p>
            <AlertTriangle className="w-8 h-8 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                Las Lesiones Cerebrales Son Más Comunes de lo que Piensa
              </h2>
              
              <p className="text-gray-700 mb-6">
                Cada año, millones de estadounidenses sufren lesiones cerebrales traumáticas (TBI). 
                Desde conmociones &ldquo;leves&rdquo; hasta daño cerebral severo, estas lesiones pueden tener 
                consecuencias devastadoras y permanentes para las víctimas y sus familias.
              </p>

              <div className="bg-purple-50 border-l-4 border-purple-600 p-6 mb-8">
                <Activity className="w-10 h-10 text-purple-600 mb-3" />
                <p className="text-lg font-semibold text-gray-900">
                  El cerebro controla todo: movimiento, memoria, emociones, habla, visión...
                </p>
                <p className="text-gray-700 mt-2">
                  Una lesión cerebral puede afectar cualquiera o todas estas funciones, 
                  cambiando quien es usted como persona.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                Tipos de Lesiones Cerebrales que Manejamos
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-purple-600">
                  <h4 className="font-bold text-burgundy-900 mb-2">Conmoción Cerebral</h4>
                  <p className="text-gray-700 mb-2">
                    A menudo minimizada como &ldquo;leve&rdquo;, pero puede causar:
                  </p>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Dolores de cabeza crónicos</li>
                    <li>• Problemas de memoria</li>
                    <li>• Sensibilidad a la luz</li>
                    <li>• Cambios de personalidad</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-purple-600">
                  <h4 className="font-bold text-burgundy-900 mb-2">Contusión Cerebral</h4>
                  <p className="text-gray-700 mb-2">
                    Moretón en el cerebro que puede causar:
                  </p>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Pérdida de conciencia</li>
                    <li>• Confusión severa</li>
                    <li>• Problemas de coordinación</li>
                    <li>• Convulsiones</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-purple-600">
                  <h4 className="font-bold text-burgundy-900 mb-2">Lesión Axonal Difusa</h4>
                  <p className="text-gray-700 mb-2">
                    Daño a las conexiones del cerebro:
                  </p>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Coma o estado vegetativo</li>
                    <li>• Daño cognitivo permanente</li>
                    <li>• Pérdida de funciones motoras</li>
                    <li>• Cambios emocionales severos</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-purple-600">
                  <h4 className="font-bold text-burgundy-900 mb-2">Hemorragia Cerebral</h4>
                  <p className="text-gray-700 mb-2">
                    Sangrado dentro o alrededor del cerebro:
                  </p>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Requiere cirugía urgente</li>
                    <li>• Puede ser fatal</li>
                    <li>• Daño permanente común</li>
                    <li>• Rehabilitación extensa</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                Causas Comunes de Lesiones Cerebrales
              </h3>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="text-center bg-purple-100 p-4 rounded-lg">
                  <p className="text-3xl font-bold text-purple-700">47%</p>
                  <p className="font-semibold">Caídas</p>
                  <p className="text-sm text-gray-600">Trabajo, resbalones, escaleras</p>
                </div>
                <div className="text-center bg-purple-100 p-4 rounded-lg">
                  <p className="text-3xl font-bold text-purple-700">15%</p>
                  <p className="font-semibold">Accidentes de Auto</p>
                  <p className="text-sm text-gray-600">Choques, vuelcos, impactos</p>
                </div>
                <div className="text-center bg-purple-100 p-4 rounded-lg">
                  <p className="text-3xl font-bold text-purple-700">17%</p>
                  <p className="font-semibold">Golpes</p>
                  <p className="text-sm text-gray-600">Objetos cayendo, asaltos</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                Síntomas de Lesión Cerebral - No los Ignore
              </h3>

              <div className="bg-red-50 p-6 rounded-lg mb-8">
                <FileWarning className="w-10 h-10 text-red-600 mb-3" />
                <h4 className="font-bold text-burgundy-900 mb-3">Busque Ayuda Médica Inmediata Si Experimenta:</h4>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-burgundy-900 mb-2">Síntomas Físicos</h5>
                    <ul className="text-gray-700 space-y-1 text-sm">
                      <li>• Dolor de cabeza que empeora</li>
                      <li>• Vómitos repetidos</li>
                      <li>• Convulsiones</li>
                      <li>• Pérdida de coordinación</li>
                      <li>• Visión borrosa o doble</li>
                      <li>• Zumbido en los oídos</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-burgundy-900 mb-2">Síntomas Cognitivos/Emocionales</h5>
                    <ul className="text-gray-700 space-y-1 text-sm">
                      <li>• Confusión o desorientación</li>
                      <li>• Pérdida de memoria</li>
                      <li>• Cambios de humor extremos</li>
                      <li>• Depresión o ansiedad</li>
                      <li>• Dificultad para concentrarse</li>
                      <li>• Problemas para dormir</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                El Verdadero Costo de una Lesión Cerebral
              </h3>

              <div className="bg-burgundy-50 p-8 rounded-lg mb-8">
                <DollarSign className="w-12 h-12 text-burgundy-700 mb-4" />
                <p className="text-gray-700 mb-4">
                  Las lesiones cerebrales pueden requerir cuidado de por vida. 
                  Los costos pueden alcanzar millones de dólares:
                </p>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-semibold">Hospitalización inicial</span>
                    <span className="text-burgundy-700 font-bold">$50,000 - $500,000+</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-semibold">Rehabilitación (primer año)</span>
                    <span className="text-burgundy-700 font-bold">$100,000 - $1,000,000+</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-semibold">Cuidado a largo plazo</span>
                    <span className="text-burgundy-700 font-bold">$85,000+ por año</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-semibold">Modificaciones del hogar</span>
                    <span className="text-burgundy-700 font-bold">$20,000 - $200,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Pérdida de ingresos de por vida</span>
                    <span className="text-burgundy-700 font-bold">$1,000,000 - $3,000,000+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact on Family Section */}
      <section className="bg-purple-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-burgundy-900 text-center mb-12">
              El Impacto en Toda la Familia
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <Heart className="w-10 h-10 text-purple-600 mb-3" />
                <h3 className="text-xl font-bold text-burgundy-900 mb-2">Para el Paciente</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Pérdida de independencia</li>
                  <li>• Cambios de personalidad</li>
                  <li>• Frustración y depresión</li>
                  <li>• Incapacidad para trabajar</li>
                  <li>• Pérdida de relaciones</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <Users className="w-10 h-10 text-purple-600 mb-3" />
                <h3 className="text-xl font-bold text-burgundy-900 mb-2">Para la Familia</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Convertirse en cuidadores 24/7</li>
                  <li>• Estrés financiero extremo</li>
                  <li>• Agotamiento emocional</li>
                  <li>• Cambios en dinámica familiar</li>
                  <li>• Sacrificar carreras propias</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 bg-gold-100 p-6 rounded-lg text-center">
              <p className="text-lg font-semibold text-burgundy-900">
                &ldquo;Mi esposo ya no es la misma persona desde el accidente. 
                Vasquez Law Firm nos ayudó a obtener los recursos para darle el cuidado que necesita.&rdquo;
              </p>
              <p className="mt-3 text-gray-600">- Carmen R., Charlotte NC</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-burgundy-900 text-center mb-12">
              Por Qué Necesita Abogados Especializados en Lesiones Cerebrales
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="flex items-start">
                <Shield className="w-8 h-8 text-purple-600 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-burgundy-900 mb-2">Entendemos la Ciencia</h3>
                  <p className="text-gray-700">
                    Trabajamos con neurólogos, neuropsicólogos y especialistas en rehabilitación 
                    para documentar completamente sus lesiones.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Brain className="w-8 h-8 text-purple-600 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-burgundy-900 mb-2">Valoramos el Futuro</h3>
                  <p className="text-gray-700">
                    Calculamos no solo los costos actuales, sino las necesidades de cuidado 
                    y tratamiento para toda la vida.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="w-8 h-8 text-purple-600 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-burgundy-900 mb-2">Actuamos Rápido</h3>
                  <p className="text-gray-700">
                    Preservamos evidencia crítica y comenzamos el tratamiento apropiado 
                    inmediatamente para mejorar resultados.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <DollarSign className="w-8 h-8 text-purple-600 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-burgundy-900 mb-2">Maximizamos Compensación</h3>
                  <p className="text-gray-700">
                    Conocemos todas las fuentes de compensación disponibles y luchamos 
                    por cada centavo que necesita.
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
              Resultados para Víctimas de Lesiones Cerebrales
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 p-6 rounded-lg">
                <p className="text-4xl font-bold text-gold-400 mb-3">$5.2M</p>
                <h3 className="text-xl font-bold mb-2">Accidente de Construcción</h3>
                <p>Trabajador golpeado por viga. TBI severo requiere cuidado 24/7. 
                   Compensación cubre cuidado de por vida y pérdida de ingresos.</p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-lg">
                <p className="text-4xl font-bold text-gold-400 mb-3">$3.8M</p>
                <h3 className="text-xl font-bold mb-2">Choque de Auto</h3>
                <p>Madre de 3 hijos con conmoción &ldquo;leve&rdquo; desarrolló síndrome post-conmoción 
                   crónico. No puede trabajar ni cuidar a sus hijos sin ayuda.</p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-lg">
                <p className="text-4xl font-bold text-gold-400 mb-3">$2.9M</p>
                <h3 className="text-xl font-bold mb-2">Caída en Tienda</h3>
                <p>Anciano resbaló en piso mojado. Hemorragia cerebral requirió cirugía. 
                   Ahora necesita asistencia permanente.</p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-lg">
                <p className="text-4xl font-bold text-gold-400 mb-3">$4.1M</p>
                <h3 className="text-xl font-bold mb-2">Lesión Deportiva Escolar</h3>
                <p>Estudiante atleta sufrió múltiples conmociones no tratadas apropiadamente. 
                   Daño cognitivo permanente afectó futuro académico.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-purple-900 to-burgundy-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Brain className="w-16 h-16 mx-auto mb-6 text-purple-300" />
            <h2 className="text-4xl font-bold mb-6">
              Su Cerebro es Irremplazable - Su Futuro No Tiene Precio
            </h2>
            <p className="text-xl mb-8">
              Las lesiones cerebrales requieren cuidado especializado y compensación sustancial. 
              No deje su futuro en manos de las aseguradoras.
            </p>
            
            <div className="bg-white text-burgundy-900 p-8 rounded-lg inline-block shadow-2xl">
              <p className="text-3xl font-bold mb-4">YO PELEO POR TI™</p>
              <p className="text-xl mb-2">Evaluación Completa GRATIS</p>
              <p className="text-lg mb-6">Conectamos con Especialistas en TBI</p>
              <a
                href="tel:18449673536"
                className="bg-purple-700 text-white px-10 py-5 rounded-md font-bold text-2xl hover:bg-purple-800 transition-all inline-flex items-center"
              >
                <Phone className="mr-3" />
                1-844-YO-PELEO
              </a>
              <p className="mt-6 text-sm">
                Disponible 24/7 • Sin Costo Inicial • Hablamos Español
              </p>
            </div>
            
            <div className="mt-8">
              <p className="text-lg">
                Oficinas en Raleigh, Charlotte, Durham y todo Carolina del Norte
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-burgundy-900 mb-6">
              Recursos Adicionales para Lesiones Cerebrales
            </h3>
            <p className="text-gray-700 mb-4">
              Además de representación legal, conectamos a clientes con:
            </p>
            <ul className="text-left inline-block space-y-2">
              <li>• Centros de rehabilitación especializados en TBI</li>
              <li>• Grupos de apoyo para pacientes y familias</li>
              <li>• Programas de terapia cognitiva</li>
              <li>• Servicios de cuidado en el hogar</li>
              <li>• Recursos educativos sobre lesiones cerebrales</li>
            </ul>
          </div>
        </div>
      </section>

      {/* AI Components */}
      <ChatWidget userId="lesiones-cerebrales-page" language="es" />
      <VoiceAssistant language="es" />

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Vasquez Law Firm - Abogados de Lesiones Cerebrales',
            description: 'Abogados especializados en lesiones cerebrales traumáticas (TBI) en Carolina del Norte. Conmociones, contusiones, daño cerebral permanente.',
            url: 'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/lesiones-cerebrales',
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
              ratingValue: '4.9',
              reviewCount: '71'
            }
          }),
        }}
      />
    </div>
  );
}