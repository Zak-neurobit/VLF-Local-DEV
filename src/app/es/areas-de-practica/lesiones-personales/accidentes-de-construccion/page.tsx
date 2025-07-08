import { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { HardHat, AlertTriangle, Construction, Hammer, Shield, DollarSign, Phone, FileWarning, Users, Scale } from 'lucide-react';

const ChatWidget = dynamic(() => import('@/components/ChatWidget').then(mod => mod.ChatWidget), {
  ssr: false,
});

const VoiceAssistant = dynamic(() => import('@/components/VirtualAssistant/VirtualAssistantWrapper').then(mod => mod.VirtualAssistantWrapper), {
  ssr: false,
});

export const metadata: Metadata = {
  title: 'Abogados de Accidentes de Construcción en NC | OSHA | YO PELEO POR TI™',
  description: '¿Herido en obra de construcción? Abogados expertos en accidentes laborales y OSHA en Carolina del Norte. Compensación más allá de workers comp. Consulta GRATIS.',
  keywords: 'abogado accidentes construcción Carolina Norte, caídas andamios Raleigh, lesiones obra Charlotte, violaciones OSHA NC, compensación trabajadores construcción',
  openGraph: {
    title: 'Abogados de Accidentes de Construcción - Vasquez Law Firm | NC',
    description: 'Los sitios de construcción son peligrosos. Si se lesionó, merece más que compensación laboral. Luchamos por justicia completa. Llame 1-844-YO-PELEO',
    images: [{
      url: '/images/construction-accident-attorney.jpg',
      width: 1200,
      height: 630,
      alt: 'Abogados de Accidentes de Construcción en Carolina del Norte'
    }],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/accidentes-de-construccion',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/practice-areas/personal-injury/construction-accidents',
      'es-ES': 'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/accidentes-de-construccion',
    },
  },
};

export default function AccidentesDeConstruccionPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-900 via-burgundy-900 to-black text-white py-20">
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <HardHat className="w-20 h-20 mx-auto mb-6 text-yellow-400" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Abogados de Accidentes de Construcción
            </h1>
            <p className="text-2xl md:text-3xl text-gold-400 font-semibold mb-6">
              Protegemos a los Que Construyen Carolina del Norte
            </p>
            <p className="text-xl mb-8">
              Los trabajadores de construcción arriesgan sus vidas diariamente. 
              Cuando las empresas fallan en protegerlos, nosotros luchamos.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:18449673536"
                className="bg-orange-600 text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-orange-700 transition-all transform hover:scale-105 animate-pulse"
              >
                HERIDO? 1-844-YO-PELEO
              </a>
              <Link
                href="/es/consulta-gratuita"
                className="bg-gold-500 text-black px-8 py-4 rounded-md font-bold text-lg hover:bg-gold-400 transition-all"
              >
                Consulta Gratuita Hoy
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* OSHA Alert Section */}
      <section className="bg-yellow-400 text-black py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-3">
            <AlertTriangle className="w-8 h-8" />
            <p className="text-lg font-bold text-center">
              IMPORTANTE: Tiene derecho a más que Workers&apos; Compensation. 
              Podemos buscar compensación adicional de terceros responsables.
            </p>
            <AlertTriangle className="w-8 h-8" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
                La Construcción es la Industria Más Peligrosa en Carolina del Norte
              </h2>
              
              <p className="text-gray-700 mb-6">
                Cada día, los trabajadores de construcción enfrentan peligros mortales. 
                En 2023, la construcción representó el 20% de todas las muertes laborales 
                en Estados Unidos. Estas tragedias son prevenibles cuando las empresas 
                siguen las normas de seguridad OSHA.
              </p>

              <div className="bg-orange-50 border-l-4 border-orange-600 p-6 mb-8">
                <Construction className="w-10 h-10 text-orange-600 mb-3" />
                <p className="text-lg font-semibold text-gray-900">
                  &ldquo;Los Fatal Four&rdquo; - Las 4 causas principales de muerte en construcción:
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-orange-600">33.5%</p>
                    <p>Caídas</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-orange-600">11%</p>
                    <p>Golpeado por objetos</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-orange-600">8.5%</p>
                    <p>Electrocución</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-orange-600">5.5%</p>
                    <p>Atrapado entre objetos</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                Tipos Comunes de Accidentes en Construcción
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-orange-600">
                  <Hammer className="w-10 h-10 text-orange-600 mb-3" />
                  <h4 className="font-bold text-burgundy-900 mb-2">Caídas desde Altura</h4>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Andamios mal instalados</li>
                    <li>• Falta de arneses de seguridad</li>
                    <li>• Escaleras defectuosas</li>
                    <li>• Techos sin protección</li>
                    <li>• Hoyos sin cubrir</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-orange-600">
                  <Construction className="w-10 h-10 text-orange-600 mb-3" />
                  <h4 className="font-bold text-burgundy-900 mb-2">Accidentes con Maquinaria</h4>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Grúas mal operadas</li>
                    <li>• Excavadoras sin mantenimiento</li>
                    <li>• Montacargas sin certificación</li>
                    <li>• Sierras sin guardas</li>
                    <li>• Equipos defectuosos</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-orange-600">
                  <AlertTriangle className="w-10 h-10 text-orange-600 mb-3" />
                  <h4 className="font-bold text-burgundy-900 mb-2">Peligros del Sitio</h4>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Zanjas sin soporte</li>
                    <li>• Derrumbes de estructuras</li>
                    <li>• Explosiones de gas</li>
                    <li>• Exposición a químicos</li>
                    <li>• Incendios en obra</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-orange-600">
                  <Shield className="w-10 h-10 text-orange-600 mb-3" />
                  <h4 className="font-bold text-burgundy-900 mb-2">Fallas de Seguridad</h4>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Sin equipo de protección (PPE)</li>
                    <li>• Falta de entrenamiento</li>
                    <li>• Presión para trabajar rápido</li>
                    <li>• Ignorar protocolos OSHA</li>
                    <li>• Sin inspecciones regulares</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                Sus Derechos Van Más Allá de Workers&apos; Compensation
              </h3>

              <div className="bg-burgundy-50 p-8 rounded-lg mb-8">
                <Scale className="w-12 h-12 text-burgundy-700 mb-4" />
                <p className="text-gray-700 mb-4">
                  Workers&apos; Compensation solo cubre una fracción de sus pérdidas. 
                  Podemos buscar compensación adicional de:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-burgundy-900 mb-2">Terceros Responsables:</h4>
                    <ul className="text-gray-700 space-y-1 text-sm">
                      <li>✓ Contratistas generales</li>
                      <li>✓ Subcontratistas negligentes</li>
                      <li>✓ Dueños de propiedades</li>
                      <li>✓ Fabricantes de equipo defectuoso</li>
                      <li>✓ Arquitectos/Ingenieros</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-burgundy-900 mb-2">Compensación Completa:</h4>
                    <ul className="text-gray-700 space-y-1 text-sm">
                      <li>✓ 100% de salarios perdidos</li>
                      <li>✓ Dolor y sufrimiento</li>
                      <li>✓ Gastos médicos futuros</li>
                      <li>✓ Incapacidad permanente</li>
                      <li>✓ Daños punitivos</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                Violaciones OSHA Comunes en Carolina del Norte
              </h3>

              <div className="bg-red-50 p-6 rounded-lg mb-8">
                <FileWarning className="w-10 h-10 text-red-600 mb-3" />
                <p className="font-semibold text-burgundy-900 mb-3">
                  Si su empleador violó normas OSHA, tiene un caso más fuerte:
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• No proveer protección contra caídas (29 CFR 1926.501)</li>
                    <li>• Andamios inseguros (29 CFR 1926.451)</li>
                    <li>• Falta de comunicación de peligros</li>
                    <li>• No dar entrenamiento de seguridad</li>
                    <li>• Escaleras defectuosas o mal usadas</li>
                  </ul>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• Protección ocular/facial inadecuada</li>
                    <li>• Excavaciones sin protección</li>
                    <li>• Peligros eléctricos expuestos</li>
                    <li>• Falta de control de energía peligrosa</li>
                    <li>• No reportar lesiones graves</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                Trabajadores Más Vulnerables
              </h3>

              <div className="bg-yellow-50 p-6 rounded-lg mb-8">
                <Users className="w-10 h-10 text-yellow-600 mb-3" />
                <p className="text-gray-700 mb-3">
                  Representamos a TODOS los trabajadores, especialmente:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="font-bold text-burgundy-900">Latinos/Hispanos</p>
                    <p className="text-sm text-gray-600">Mayor riesgo de lesiones fatales</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-burgundy-900">Trabajadores Jóvenes</p>
                    <p className="text-sm text-gray-600">Falta de experiencia/entrenamiento</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-burgundy-900">Indocumentados</p>
                    <p className="text-sm text-gray-600">Tienen derechos completos</p>
                  </div>
                </div>
                <p className="text-center mt-4 font-semibold text-burgundy-900">
                  ¡Su estatus migratorio NO afecta su derecho a compensación!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Injuries Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-burgundy-900 text-center mb-12">
              Lesiones Graves que Vemos en Construcción
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <p className="text-4xl mb-3">🧠</p>
                <h3 className="font-bold text-burgundy-900 mb-2">Lesiones Cerebrales</h3>
                <p className="text-sm text-gray-600">Por caídas o golpes de objetos</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <p className="text-4xl mb-3">🦴</p>
                <h3 className="font-bold text-burgundy-900 mb-2">Fracturas/Amputaciones</h3>
                <p className="text-sm text-gray-600">Maquinaria peligrosa</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <p className="text-4xl mb-3">🔥</p>
                <h3 className="font-bold text-burgundy-900 mb-2">Quemaduras</h3>
                <p className="text-sm text-gray-600">Electricidad, químicos, fuego</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <p className="text-4xl mb-3">👁️</p>
                <h3 className="font-bold text-burgundy-900 mb-2">Pérdida de Visión</h3>
                <p className="text-sm text-gray-600">Partículas, soldadura, químicos</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <p className="text-4xl mb-3">🫁</p>
                <h3 className="font-bold text-burgundy-900 mb-2">Enfermedades Pulmonares</h3>
                <p className="text-sm text-gray-600">Asbesto, sílice, polvo</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <p className="text-4xl mb-3">💀</p>
                <h3 className="font-bold text-burgundy-900 mb-2">Muerte</h3>
                <p className="text-sm text-gray-600">Demandas por muerte injusta</p>
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
              Resultados para Trabajadores de Construcción
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 p-6 rounded-lg">
                <p className="text-4xl font-bold text-gold-400 mb-3">$3.2M</p>
                <h3 className="text-xl font-bold mb-2">Caída de Andamio - Charlotte</h3>
                <p>Trabajador cayó 30 pies. Andamio sin barandales de seguridad. 
                   Lesiones de espalda permanentes. Violaciones OSHA documentadas.</p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-lg">
                <p className="text-4xl font-bold text-gold-400 mb-3">$2.5M</p>
                <h3 className="text-xl font-bold mb-2">Electrocución - Raleigh</h3>
                <p>Líneas eléctricas no marcadas. Quemaduras de tercer grado. 
                   Contratista general no siguió protocolo de seguridad.</p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-lg">
                <p className="text-4xl font-bold text-gold-400 mb-3">$1.8M</p>
                <h3 className="text-xl font-bold mb-2">Derrumbe de Zanja - Durham</h3>
                <p>Zanja sin soporte colapsó. Trabajador atrapado 2 horas. 
                   Trauma físico y psicológico severo.</p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-lg">
                <p className="text-4xl font-bold text-gold-400 mb-3">$4.1M</p>
                <h3 className="text-xl font-bold mb-2">Grúa Defectuosa - Winston-Salem</h3>
                <p>Falla mecánica por falta de mantenimiento. Trabajador aplastado. 
                   Paraplejia permanente. Fabricante y operador responsables.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Do Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-burgundy-900 text-center mb-12">
              Qué Hacer Después de un Accidente de Construcción
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="font-bold text-burgundy-900 mb-4 flex items-center">
                  <span className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">1</span>
                  Acciones Inmediatas
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Busque atención médica urgente</li>
                  <li>✓ Reporte al supervisor inmediatamente</li>
                  <li>✓ Tome fotos del lugar y equipos</li>
                  <li>✓ Obtenga nombres de testigos</li>
                  <li>✓ NO firme nada sin abogado</li>
                </ul>
              </div>
              
              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="font-bold text-burgundy-900 mb-4 flex items-center">
                  <span className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">2</span>
                  Documente Todo
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Guarde toda documentación médica</li>
                  <li>✓ Registre tiempo perdido del trabajo</li>
                  <li>✓ Documente violaciones de seguridad</li>
                  <li>✓ Mantenga copia del reporte OSHA</li>
                  <li>✓ Anote cambios en su salud</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 bg-red-50 p-6 rounded-lg">
              <AlertTriangle className="w-10 h-10 text-red-600 mb-3" />
              <h3 className="font-bold text-burgundy-900 mb-2">⚠️ ADVERTENCIAS IMPORTANTES:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• NO hable con ajustadores de seguros sin abogado</li>
                <li>• NO acepte la primera oferta de compensación</li>
                <li>• NO regrese al trabajo hasta que el médico lo autorice</li>
                <li>• NO tenga miedo de reportar - es ilegal que lo despidan por eso</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-orange-900 to-burgundy-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <HardHat className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
            <h2 className="text-4xl font-bold mb-6">
              Los Trabajadores Construyen América - Nosotros los Protegemos
            </h2>
            <p className="text-xl mb-8">
              No deje que las grandes empresas de construcción y sus aseguradoras 
              lo intimiden. Usted tiene derechos y nosotros sabemos cómo defenderlos.
            </p>
            
            <div className="bg-white text-burgundy-900 p-8 rounded-lg inline-block shadow-2xl">
              <p className="text-3xl font-bold mb-4">YO PELEO POR TI™</p>
              <p className="text-xl mb-2">Consulta 100% GRATUITA</p>
              <p className="text-lg mb-6">No Paga Nada Si No Ganamos</p>
              <a
                href="tel:18449673536"
                className="bg-orange-700 text-white px-10 py-5 rounded-md font-bold text-2xl hover:bg-orange-800 transition-all inline-flex items-center"
              >
                <Phone className="mr-3" />
                1-844-YO-PELEO
              </a>
              <p className="mt-6 text-sm">
                Hablamos Español • Conocemos la Industria • Respetamos a los Trabajadores
              </p>
            </div>
            
            <div className="mt-8">
              <p className="text-lg">
                &ldquo;Sabemos lo duro que trabajan. Cuando se lastiman, 
                peleamos igual de duro por ustedes.&rdquo;
              </p>
              <p className="mt-2">- William Vasquez, Abogado Principal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-burgundy-900 mb-6">
              Representamos Trabajadores en Toda Carolina del Norte
            </h3>
            <p className="text-gray-700 mb-4">
              Sin importar dónde ocurrió su accidente, podemos ayudar:
            </p>
            <p className="font-semibold">
              Raleigh • Charlotte • Durham • Winston-Salem • Greensboro • 
              Wilmington • Asheville • Y todo NC
            </p>
          </div>
        </div>
      </section>

      {/* AI Components */}
      <ChatWidget userId="accidentes-construccion-page" language="es" />
      <VoiceAssistant language="es" />

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Vasquez Law Firm - Abogados de Accidentes de Construcción',
            description: 'Abogados especializados en accidentes de construcción, violaciones OSHA, caídas, lesiones con maquinaria en Carolina del Norte.',
            url: 'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/accidentes-de-construccion',
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
              reviewCount: '82'
            }
          }),
        }}
      />
    </div>
  );
}