import { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Truck, AlertTriangle, Shield, Brain, Stethoscope, DollarSign, Phone, Scale, Clock } from 'lucide-react';

const ChatWidget = dynamic(() => import('@/components/ChatWidget').then(mod => mod.ChatWidget), {
  ssr: false,
});

const VoiceAssistant = dynamic(() => import('@/components/VirtualAssistant/VirtualAssistantWrapper').then(mod => mod.VirtualAssistantWrapper), {
  ssr: false,
});

export const metadata: Metadata = {
  title: 'Abogados de Accidentes de Camión en NC | Lesiones Graves | YO PELEO POR TI™',
  description: 'Accidentes de camiones comerciales causan lesiones devastadoras. Abogados expertos en Raleigh y Charlotte luchan contra grandes empresas. Consulta GRATIS 24/7.',
  keywords: 'abogado accidentes camión Carolina Norte, accidente tráiler Raleigh, choque camión comercial Charlotte, demanda accidente camión NC, compensación lesiones graves',
  openGraph: {
    title: 'Abogados de Accidentes de Camión - Vasquez Law Firm | Carolina del Norte',
    description: 'Lesiones por accidentes de camión? Enfrentamos a las grandes empresas de transporte. Más de 35 años de experiencia. Llame 1-844-YO-PELEO',
    images: [{
      url: '/images/truck-accident-attorney.jpg',
      width: 1200,
      height: 630,
      alt: 'Abogados de Accidentes de Camión en Carolina del Norte'
    }],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/accidentes-de-camion',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/practice-areas/personal-injury/truck-accidents',
      'es-ES': 'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/accidentes-de-camion',
    },
  },
};

export default function AccidentesDeCamionPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black via-burgundy-900 to-burgundy-800 text-white py-20">
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Truck className="w-20 h-20 mx-auto mb-6 text-gold-400" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Abogados de Accidentes de Camión
            </h1>
            <p className="text-2xl md:text-3xl text-gold-400 font-semibold mb-6">
              Lesiones Graves Requieren Abogados Fuertes
            </p>
            <p className="text-xl mb-8">
              Los accidentes con camiones comerciales son diferentes. 
              Necesita abogados que conocen las leyes federales de transporte.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:18449673536"
                className="bg-red-600 text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-red-700 transition-all transform hover:scale-105 animate-pulse"
              >
                EMERGENCIA: 1-844-YO-PELEO
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

      {/* Warning Banner */}
      <section className="bg-red-700 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-4 text-center">
            <AlertTriangle className="w-8 h-8 animate-pulse" />
            <div>
              <p className="text-xl font-bold">¡ADVERTENCIA!</p>
              <p className="text-lg">
                Las empresas de camiones tienen equipos de abogados trabajando AHORA MISMO. 
                Usted también necesita protección legal inmediata.
              </p>
            </div>
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
                Por Qué los Accidentes de Camión Son Más Peligrosos
              </h2>
              
              <div className="bg-black text-white p-8 rounded-lg mb-8">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <p className="text-4xl font-bold text-gold-400">80,000 lbs</p>
                    <p>Peso máximo legal de un camión</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-gold-400">40%</p>
                    <p>Más distancia para frenar</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-gold-400">500%</p>
                    <p>Mayor fuerza de impacto</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                Lesiones Comunes en Accidentes de Camión
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-red-600">
                  <Brain className="w-10 h-10 text-red-600 mb-3" />
                  <h4 className="font-bold text-burgundy-900 mb-2">Lesiones Cerebrales Traumáticas</h4>
                  <p className="text-gray-700">
                    Daño permanente que afecta memoria, habla y funciones motoras. 
                    Requiere cuidado médico de por vida.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-red-600">
                  <Stethoscope className="w-10 h-10 text-red-600 mb-3" />
                  <h4 className="font-bold text-burgundy-900 mb-2">Lesiones de Médula Espinal</h4>
                  <p className="text-gray-700">
                    Parálisis parcial o completa. Costos médicos pueden superar millones de dólares.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-red-600">
                  <Shield className="w-10 h-10 text-red-600 mb-3" />
                  <h4 className="font-bold text-burgundy-900 mb-2">Fracturas Múltiples</h4>
                  <p className="text-gray-700">
                    Huesos rotos que requieren cirugías, implantes y meses de rehabilitación.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-red-600">
                  <AlertTriangle className="w-10 h-10 text-red-600 mb-3" />
                  <h4 className="font-bold text-burgundy-900 mb-2">Lesiones Internas</h4>
                  <p className="text-gray-700">
                    Daño a órganos vitales que puede ser fatal si no se trata inmediatamente.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-burgundy-900 mb-6">
                Por Qué Somos Diferentes: Nuestra Experiencia en Casos de Camiones
              </h3>

              <div className="bg-gold-50 p-8 rounded-lg mb-8">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Scale className="w-8 h-8 text-burgundy-900 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-burgundy-900">Conocemos las Regulaciones Federales</h4>
                      <p className="text-gray-700">
                        FMCSA, horas de servicio, mantenimiento obligatorio - usamos estas leyes para ganar su caso.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <DollarSign className="w-8 h-8 text-burgundy-900 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-burgundy-900">Recursos para Enfrentar Corporaciones</h4>
                      <p className="text-gray-700">
                        Contratamos expertos en reconstrucción de accidentes y médicos especialistas.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="w-8 h-8 text-burgundy-900 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-burgundy-900">Actuamos Rápido para Preservar Evidencia</h4>
                      <p className="text-gray-700">
                        Logs del conductor, datos GPS, cámaras - obtenemos todo antes de que "desaparezca".
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                Causas Comunes de Accidentes de Camión que Investigamos
              </h3>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                    Fatiga del conductor (violaciones de horas de servicio)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                    Mantenimiento negligente del camión
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                    Carga mal asegurada o sobrepeso
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                    Conductores no calificados o sin licencia CDL
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                    Uso de drogas o alcohol
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                    Distracción al conducir (teléfono, GPS)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                    Presión de la empresa para entregar rápido
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                    Fallas mecánicas (frenos, llantas)
                  </li>
                </ul>
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
              Resultados Reales para Víctimas de Accidentes de Camión
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="bg-white/10 p-6 rounded-lg">
                <p className="text-4xl font-bold text-gold-400 mb-2">$2.3M</p>
                <p className="text-sm">Lesión cerebral por choque con camión de 18 ruedas en I-40</p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg">
                <p className="text-4xl font-bold text-gold-400 mb-2">$1.8M</p>
                <p className="text-sm">Parálisis parcial - conductor de camión dormido al volante</p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg">
                <p className="text-4xl font-bold text-gold-400 mb-2">$975K</p>
                <p className="text-sm">Fracturas múltiples - carga mal asegurada</p>
              </div>
            </div>
            
            <p className="text-center mt-8 text-sm">
              *Resultados pasados no garantizan resultados futuros. Cada caso es único.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-xl">
              <p className="text-xl text-gray-700 italic mb-6">
                "El camión destrozó mi vida. No podía trabajar, las facturas médicas no paraban de llegar. 
                Vasquez Law Firm peleó contra la empresa de transporte y sus abogados. 
                Conseguimos suficiente para cubrir todos mis gastos médicos y asegurar el futuro de mi familia. 
                Son verdaderos guerreros."
              </p>
              <div className="flex items-center">
                <div>
                  <p className="font-bold text-burgundy-900">- Juan Carlos M.</p>
                  <p className="text-gray-600">Víctima de accidente en I-85, Durham NC</p>
                </div>
                <div className="ml-auto text-gold-500">
                  ★★★★★
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-red-700 to-red-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <AlertTriangle className="w-16 h-16 mx-auto mb-6 animate-bounce" />
            <h2 className="text-4xl font-bold mb-6">
              Las Empresas de Camiones Ya Están Trabajando en Su Contra
            </h2>
            <p className="text-xl mb-8">
              Cada minuto cuenta. Mientras usted lee esto, ellos están borrando evidencia 
              y preparando su defensa. No les dé ventaja.
            </p>
            
            <div className="bg-white text-burgundy-900 p-8 rounded-lg inline-block">
              <p className="text-3xl font-bold mb-4">YO PELEO POR TI™</p>
              <p className="text-xl mb-6">Sin Costo Inicial • Sin Riesgo • Solo Cobramos Si Ganamos</p>
              <a
                href="tel:18449673536"
                className="bg-red-700 text-white px-10 py-5 rounded-md font-bold text-2xl hover:bg-red-800 transition-all inline-flex items-center"
              >
                <Phone className="mr-3" />
                1-844-YO-PELEO
              </a>
              <p className="mt-4 text-sm">Disponible 24/7 • Hablamos Español</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-burgundy-900 mb-8 text-center">
              Preguntas Frecuentes Sobre Accidentes de Camión
            </h3>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="font-bold text-burgundy-900 mb-2">
                  ¿Cuánto tiempo tengo para presentar una demanda?
                </h4>
                <p className="text-gray-700">
                  En Carolina del Norte, generalmente tiene 3 años, pero la evidencia se pierde rápido. 
                  Actúe AHORA para proteger sus derechos.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="font-bold text-burgundy-900 mb-2">
                  ¿Puedo demandar si el camión era de otro estado?
                </h4>
                <p className="text-gray-700">
                  Sí. Manejamos casos interestatales y conocemos las leyes federales de transporte comercial.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="font-bold text-burgundy-900 mb-2">
                  ¿Qué pasa si el conductor del camión huyó?
                </h4>
                <p className="text-gray-700">
                  Podemos rastrear al conductor y la empresa usando bases de datos especializadas. 
                  No deje que escapen de la justicia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Components */}
      <ChatWidget userId="accidentes-camion-page" language="es" />
      <VoiceAssistant language="es" />

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Vasquez Law Firm - Abogados de Accidentes de Camión',
            description: 'Abogados especializados en accidentes de camiones comerciales y tráileres en Carolina del Norte. Enfrentamos a las grandes empresas de transporte.',
            url: 'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/accidentes-de-camion',
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
            priceRange: 'Contingencia - No cobramos si no ganamos',
            openingHours: 'Mo-Su 00:00-23:59',
            image: 'https://www.vasquezlawnc.com/images/truck-accident-attorney.jpg',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '89'
            }
          }),
        }}
      />
    </div>
  );
}