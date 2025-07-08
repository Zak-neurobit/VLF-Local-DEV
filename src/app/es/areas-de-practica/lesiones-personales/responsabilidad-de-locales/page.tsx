import { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Building, AlertTriangle, Store, Home, Shield, Camera, DollarSign, Phone, MapPin, Scale } from 'lucide-react';

const ChatWidget = dynamic(() => import('@/components/ChatWidget').then(mod => mod.ChatWidget), {
  ssr: false,
});

const VoiceAssistant = dynamic(() => import('@/components/VirtualAssistant/VirtualAssistantWrapper').then(mod => mod.VirtualAssistantWrapper), {
  ssr: false,
});

export const metadata: Metadata = {
  title: 'Abogados de Responsabilidad de Locales en NC | Propiedad Insegura | YO PELEO POR TI™',
  description: '¿Herido en propiedad ajena? Abogados expertos en responsabilidad de locales en Carolina del Norte. Resbalones, seguridad inadecuada, piscinas. Consulta GRATIS.',
  keywords: 'abogado responsabilidad locales Carolina Norte, premises liability español, propiedad insegura Raleigh, demanda dueño negligente Charlotte, compensación accidente local NC',
  openGraph: {
    title: 'Abogados de Responsabilidad de Locales - Vasquez Law Firm | NC',
    description: 'Los dueños de propiedades deben mantener locales seguros. Si se lesionó por negligencia, podemos ayudar. Sin costo inicial. Llame 1-844-YO-PELEO',
    images: [{
      url: '/images/premises-liability-attorney.jpg',
      width: 1200,
      height: 630,
      alt: 'Abogados de Responsabilidad de Locales en Carolina del Norte'
    }],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/responsabilidad-de-locales',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/practice-areas/personal-injury/premises-liability',
      'es-ES': 'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/responsabilidad-de-locales',
    },
  },
};

export default function ResponsabilidadDeLocalesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-burgundy-900 to-burgundy-800 text-white py-20">
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Building className="w-20 h-20 mx-auto mb-6 text-indigo-300" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Abogados de Responsabilidad de Locales
            </h1>
            <p className="text-2xl md:text-3xl text-gold-400 font-semibold mb-6">
              Los Dueños Son Responsables de Mantener Sus Propiedades Seguras
            </p>
            <p className="text-xl mb-8">
              Desde tiendas hasta apartamentos, los propietarios deben proteger a visitantes. 
              Cuando fallan, nosotros luchamos por usted.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:18449673536"
                className="bg-indigo-600 text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-indigo-700 transition-all transform hover:scale-105 animate-pulse"
              >
                LESIONADO? 1-844-YO-PELEO
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

      {/* Types of Properties Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-burgundy-900 text-center mb-8">
            Tipos de Propiedades Donde Ocurren Accidentes
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center bg-white p-6 rounded-lg shadow">
              <Store className="w-12 h-12 mx-auto mb-3 text-indigo-600" />
              <h3 className="font-bold mb-2">Comerciales</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Walmart, Target</li>
                <li>Restaurantes</li>
                <li>Centros comerciales</li>
                <li>Gasolineras</li>
              </ul>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow">
              <Home className="w-12 h-12 mx-auto mb-3 text-indigo-600" />
              <h3 className="font-bold mb-2">Residenciales</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Apartamentos</li>
                <li>Condominios</li>
                <li>Casas privadas</li>
                <li>Complejos habitacionales</li>
              </ul>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow">
              <Building className="w-12 h-12 mx-auto mb-3 text-indigo-600" />
              <h3 className="font-bold mb-2">Públicas</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Parques</li>
                <li>Edificios gubernamentales</li>
                <li>Escuelas</li>
                <li>Hospitales</li>
              </ul>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow">
              <MapPin className="w-12 h-12 mx-auto mb-3 text-indigo-600" />
              <h3 className="font-bold mb-2">Recreativas</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Gimnasios</li>
                <li>Piscinas</li>
                <li>Parques de diversiones</li>
                <li>Estadios deportivos</li>
              </ul>
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
                La Ley Protege a Visitantes de Propiedades Peligrosas
              </h2>
              
              <p className="text-gray-700 mb-6">
                En Carolina del Norte, los dueños de propiedades tienen el deber legal de 
                mantener sus locales razonablemente seguros para visitantes legales. 
                Esto incluye inspeccionar regularmente, reparar peligros conocidos, 
                y advertir sobre condiciones peligrosas que no pueden arreglar inmediatamente.
              </p>

              <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 mb-8">
                <Scale className="w-10 h-10 text-indigo-600 mb-3" />
                <p className="text-lg font-semibold text-gray-900">
                  La responsabilidad depende de su estatus legal en la propiedad:
                </p>
                <div className="mt-4 space-y-3">
                  <div>
                    <h4 className="font-bold text-burgundy-900">Invitado (Invitee)</h4>
                    <p className="text-gray-700">Clientes en tiendas, pacientes en hospitales - Mayor protección legal</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-burgundy-900">Licenciatario (Licensee)</h4>
                    <p className="text-gray-700">Invitados sociales, visitantes - Protección moderada</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-burgundy-900">Intruso (Trespasser)</h4>
                    <p className="text-gray-700">Sin permiso - Protección limitada (excepto niños)</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                Condiciones Peligrosas Comunes en Propiedades
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-bold text-burgundy-900 mb-3">Interior de Edificios</h4>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• Pisos mojados sin señalización</li>
                    <li>• Alfombras rotas o sueltas</li>
                    <li>• Escaleras sin barandales</li>
                    <li>• Iluminación inadecuada</li>
                    <li>• Ascensores defectuosos</li>
                    <li>• Techos con goteras</li>
                    <li>• Puertas automáticas rotas</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-bold text-burgundy-900 mb-3">Exterior de Propiedades</h4>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• Estacionamientos con hoyos</li>
                    <li>• Aceras agrietadas</li>
                    <li>• Hielo/nieve no removida</li>
                    <li>• Falta de seguridad</li>
                    <li>• Piscinas sin cercas</li>
                    <li>• Árboles peligrosos</li>
                    <li>• Perros agresivos sueltos</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                Seguridad Inadecuada - Un Peligro Creciente
              </h3>

              <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-8">
                <Shield className="w-10 h-10 text-red-600 mb-3" />
                <p className="text-gray-700 mb-3">
                  Los dueños pueden ser responsables por crímenes previsibles en su propiedad:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-bold text-burgundy-900 mb-2">Fallas de Seguridad Comunes</h5>
                    <ul className="text-gray-700 space-y-1 text-sm">
                      <li>• Falta de guardias de seguridad</li>
                      <li>• Cerraduras rotas en puertas</li>
                      <li>• Áreas de estacionamiento oscuras</li>
                      <li>• Sin cámaras de seguridad</li>
                      <li>• Cercas inadecuadas</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-bold text-burgundy-900 mb-2">Crímenes Resultantes</h5>
                    <ul className="text-gray-700 space-y-1 text-sm">
                      <li>• Asaltos y robos</li>
                      <li>• Agresiones sexuales</li>
                      <li>• Secuestros en estacionamientos</li>
                      <li>• Vandalismo que causa lesiones</li>
                      <li>• Tiroteos previsibles</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                Casos Especiales: Niños y "Attractive Nuisance"
              </h3>

              <div className="bg-yellow-50 p-6 rounded-lg mb-8">
                <AlertTriangle className="w-10 h-10 text-yellow-600 mb-3" />
                <p className="text-gray-700 mb-3">
                  Los dueños tienen responsabilidad especial cuando hay condiciones que atraen a niños:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">⚠️</span>
                    <span><strong>Piscinas sin cercar:</strong> Principal causa de ahogamientos infantiles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">⚠️</span>
                    <span><strong>Trampolines:</strong> Lesiones graves sin supervisión</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">⚠️</span>
                    <span><strong>Equipos abandonados:</strong> Refrigeradores viejos, maquinaria</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">⚠️</span>
                    <span><strong>Sitios de construcción:</strong> Sin barreras adecuadas</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                Lo Que Debe Probar para Ganar Su Caso
              </h3>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-burgundy-900">Condición Peligrosa Existía</h4>
                    <p className="text-gray-700">Había un peligro no razonable en la propiedad.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-burgundy-900">El Dueño Sabía o Debía Saber</h4>
                    <p className="text-gray-700">Conocimiento real o constructivo del peligro.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-burgundy-900">Falla en Arreglar o Advertir</h4>
                    <p className="text-gray-700">No tomaron acción razonable para proteger visitantes.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-bold text-burgundy-900">Causó Sus Lesiones</h4>
                    <p className="text-gray-700">Relación directa entre el peligro y sus daños.</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                Evidencia Crítica en Casos de Responsabilidad de Locales
              </h3>

              <div className="bg-indigo-50 p-8 rounded-lg mb-8">
                <Camera className="w-12 h-12 text-indigo-600 mb-4" />
                <p className="text-gray-700 mb-4">
                  La evidencia desaparece rápidamente. Actuamos inmediatamente para preservar:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Video de cámaras de seguridad</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Reportes de incidentes previos</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Registros de mantenimiento</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Políticas de seguridad</span>
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Testimonios de testigos</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Reportes de inspección</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Quejas de otros visitantes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Códigos de construcción violados</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compensation Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-burgundy-900 text-center mb-12">
              Compensación en Casos de Responsabilidad de Locales
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <DollarSign className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h3 className="font-bold text-burgundy-900 mb-2">Médicos</h3>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>Emergencia</li>
                  <li>Cirugías</li>
                  <li>Rehabilitación</li>
                  <li>Medicamentos</li>
                  <li>Futuro tratamiento</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <DollarSign className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h3 className="font-bold text-burgundy-900 mb-2">Económicos</h3>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>Salarios perdidos</li>
                  <li>Capacidad reducida</li>
                  <li>Beneficios perdidos</li>
                  <li>Gastos de transporte</li>
                  <li>Modificaciones hogar</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <DollarSign className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h3 className="font-bold text-burgundy-900 mb-2">Personales</h3>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>Dolor y sufrimiento</li>
                  <li>Angustia emocional</li>
                  <li>Pérdida de disfrute</li>
                  <li>Desfiguración</li>
                  <li>Incapacidad permanente</li>
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
              Resultados en Casos de Responsabilidad de Locales
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 p-6 rounded-lg">
                <p className="text-4xl font-bold text-gold-400 mb-3">$1.2M</p>
                <h3 className="text-xl font-bold mb-2">Asalto en Estacionamiento - Charlotte</h3>
                <p>Mujer atacada en estacionamiento oscuro de apartamentos. 
                   Sin seguridad a pesar de crímenes previos. Trauma permanente.</p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-lg">
                <p className="text-4xl font-bold text-gold-400 mb-3">$850K</p>
                <h3 className="text-xl font-bold mb-2">Escalera Rota en Tienda - Raleigh</h3>
                <p>Cliente cayó por escalón roto en entrada. Gerente sabía del 
                   problema por meses. Cirugía de rodilla y cadera.</p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-lg">
                <p className="text-4xl font-bold text-gold-400 mb-3">$2.3M</p>
                <h3 className="text-xl font-bold mb-2">Niño Ahogado en Piscina - Durham</h3>
                <p>Piscina de apartamentos sin cerca adecuada. Niño de 4 años 
                   con daño cerebral por falta de oxígeno. Cuidado de por vida.</p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-lg">
                <p className="text-4xl font-bold text-gold-400 mb-3">$675K</p>
                <h3 className="text-xl font-bold mb-2">Techo Colapsado - Winston-Salem</h3>
                <p>Techo de restaurante cayó durante tormenta. Propietario ignoró 
                   reportes de daño por agua. Múltiples heridos.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Defenses Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-burgundy-900 text-center mb-12">
              Cómo Combatimos las Defensas de los Propietarios
            </h2>
            
            <div className="bg-yellow-50 p-8 rounded-lg">
              <p className="text-gray-700 mb-6">
                Los dueños y sus aseguradoras siempre intentan evitar responsabilidad. 
                Conocemos sus tácticas:
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded">
                  <h4 className="font-bold text-burgundy-900 mb-2">
                    "El peligro era obvio"
                  </h4>
                  <p className="text-gray-700">
                    <strong>Nuestra respuesta:</strong> Incluso peligros "obvios" requieren advertencias 
                    o barreras, especialmente en condiciones de poca luz o distracción.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded">
                  <h4 className="font-bold text-burgundy-900 mb-2">
                    "No sabíamos del problema"
                  </h4>
                  <p className="text-gray-700">
                    <strong>Nuestra respuesta:</strong> Los propietarios deben inspeccionar regularmente. 
                    La ignorancia no es excusa cuando debieron haber sabido.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded">
                  <h4 className="font-bold text-burgundy-900 mb-2">
                    "La víctima tuvo la culpa"
                  </h4>
                  <p className="text-gray-700">
                    <strong>Nuestra respuesta:</strong> Investigamos completamente para mostrar 
                    cómo la negligencia del propietario fue la causa principal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-indigo-900 to-burgundy-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Building className="w-16 h-16 mx-auto mb-6 text-indigo-300" />
            <h2 className="text-4xl font-bold mb-6">
              Los Propietarios Tienen Seguro - Usted Merece Compensación
            </h2>
            <p className="text-xl mb-8">
              No se sienta mal por buscar justicia. Los dueños tienen seguro precisamente 
              para estos casos. Es su derecho legal obtener compensación completa.
            </p>
            
            <div className="bg-white text-burgundy-900 p-8 rounded-lg inline-block shadow-2xl">
              <p className="text-3xl font-bold mb-4">YO PELEO POR TI™</p>
              <p className="text-xl mb-2">Investigación Completa GRATIS</p>
              <p className="text-lg mb-6">No Cobramos Si No Ganamos</p>
              <a
                href="tel:18449673536"
                className="bg-indigo-700 text-white px-10 py-5 rounded-md font-bold text-2xl hover:bg-indigo-800 transition-all inline-flex items-center"
              >
                <Phone className="mr-3" />
                1-844-YO-PELEO
              </a>
              <p className="mt-6 text-sm">
                Actuamos Rápido • Preservamos Evidencia • Hablamos Español
              </p>
            </div>
            
            <div className="mt-8 bg-yellow-400 text-black p-4 rounded-lg inline-block">
              <p className="font-bold">
                ⏰ URGENTE: Los videos de seguridad se borran en días. 
                Llame AHORA para preservar evidencia crítica.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-burgundy-900 mb-8 text-center">
              Preguntas Frecuentes
            </h3>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="font-bold text-burgundy-900 mb-2">
                  ¿Qué pasa si firmé una exención de responsabilidad?
                </h4>
                <p className="text-gray-700">
                  Las exenciones no siempre son válidas. No protegen contra negligencia grave 
                  o condiciones extremadamente peligrosas. Podemos revisar su caso.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="font-bold text-burgundy-900 mb-2">
                  ¿Puedo demandar al gobierno por propiedad pública insegura?
                </h4>
                <p className="text-gray-700">
                  Sí, pero hay reglas especiales y plazos más cortos. Debe presentar un 
                  reclamo administrativo primero. Actuamos rápidamente en estos casos.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="font-bold text-burgundy-900 mb-2">
                  ¿Y si estaba trabajando cuando me lesioné?
                </h4>
                <p className="text-gray-700">
                  Puede tener derecho a compensación laboral Y una demanda contra el 
                  propietario del lugar. Evaluamos todas sus opciones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-700 mb-2">
            Representamos víctimas de propiedades peligrosas en todo Carolina del Norte
          </p>
          <p className="font-semibold text-burgundy-900">
            Raleigh • Charlotte • Durham • Winston-Salem • Greensboro • Todo NC
          </p>
        </div>
      </section>

      {/* AI Components */}
      <ChatWidget userId="responsabilidad-locales-page" language="es" />
      <VoiceAssistant language="es" />

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Vasquez Law Firm - Abogados de Responsabilidad de Locales',
            description: 'Abogados especializados en responsabilidad de locales, propiedades peligrosas, seguridad inadecuada, resbalones y caídas en Carolina del Norte.',
            url: 'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/responsabilidad-de-locales',
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
              reviewCount: '94'
            }
          }),
        }}
      />
    </div>
  );
}