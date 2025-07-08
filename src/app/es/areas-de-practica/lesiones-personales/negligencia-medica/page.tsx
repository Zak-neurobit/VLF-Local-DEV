import { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Stethoscope, AlertTriangle, Hospital, Brain, Baby, Pill, Clock, Shield, Scale, Phone } from 'lucide-react';

const ChatWidget = dynamic(() => import('@/components/ChatWidget').then(mod => mod.ChatWidget), {
  ssr: false,
});

const VoiceAssistant = dynamic(() => import('@/components/VirtualAssistant/VirtualAssistantWrapper').then(mod => mod.VirtualAssistantWrapper), {
  ssr: false,
});

export const metadata: Metadata = {
  title: 'Abogados de Negligencia Médica en NC | Errores Médicos | YO PELEO POR TI™',
  description: '¿Víctima de error médico? Abogados expertos en negligencia médica en Carolina del Norte. Diagnósticos erróneos, errores quirúrgicos, lesiones de parto. Consulta GRATIS.',
  keywords: 'abogado negligencia médica Carolina Norte, mala práctica médica Raleigh, error médico Charlotte, demanda hospital NC, compensación error diagnóstico',
  openGraph: {
    title: 'Abogados de Negligencia Médica - Vasquez Law Firm | Carolina del Norte',
    description: 'Los errores médicos son la tercera causa de muerte en USA. Si sufrió por negligencia médica, podemos ayudar. Consulta gratuita. Llame 1-844-YO-PELEO',
    images: [{
      url: '/images/medical-malpractice-attorney.jpg',
      width: 1200,
      height: 630,
      alt: 'Abogados de Negligencia Médica en Carolina del Norte'
    }],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/negligencia-medica',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/practice-areas/personal-injury/medical-malpractice',
      'es-ES': 'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/negligencia-medica',
    },
  },
};

export default function NegligenciaMedicaPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-burgundy-900 to-burgundy-800 text-white py-20">
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Stethoscope className="w-20 h-20 mx-auto mb-6 text-red-400" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Abogados de Negligencia Médica
            </h1>
            <p className="text-2xl md:text-3xl text-gold-400 font-semibold mb-6">
              Cuando los Médicos Fallan, Nosotros Luchamos
            </p>
            <p className="text-xl mb-8">
              Los profesionales médicos deben cumplir estándares de cuidado. 
              Cuando no lo hacen, las víctimas merecen justicia.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:18449673536"
                className="bg-red-600 text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-red-700 transition-all transform hover:scale-105 animate-pulse"
              >
                URGENTE: 1-844-YO-PELEO
              </a>
              <Link
                href="/es/consulta-gratuita"
                className="bg-gold-500 text-black px-8 py-4 rounded-md font-bold text-lg hover:bg-gold-400 transition-all"
              >
                Evaluación Médico-Legal Gratis
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Banner */}
      <section className="bg-red-700 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-4xl font-bold">250,000+</p>
              <p className="text-lg">Muertes anuales por errores médicos en USA</p>
            </div>
            <div>
              <p className="text-4xl font-bold">3ra</p>
              <p className="text-lg">Causa principal de muerte después de cáncer y corazón</p>
            </div>
            <div>
              <p className="text-4xl font-bold">$3.5 Billones</p>
              <p className="text-lg">Costo anual de negligencia médica</p>
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
                La Negligencia Médica Destruye Vidas - Nosotros Buscamos Justicia
              </h2>
              
              <p className="text-gray-700 mb-6">
                Confiamos en los médicos con nuestras vidas. Cuando traicionan esa confianza 
                por negligencia, descuido o incompetencia, las consecuencias pueden ser devastadoras. 
                En Vasquez Law Firm, tenemos la experiencia y recursos para enfrentar a hospitales 
                y sus equipos legales.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
                <AlertTriangle className="w-10 h-10 text-blue-600 mb-3" />
                <p className="text-lg font-semibold text-gray-900">
                  Tiempo Límite Crítico: En Carolina del Norte, tiene solo 3 años para presentar 
                  una demanda por negligencia médica (1 año para objetos extraños dejados en el cuerpo).
                </p>
              </div>

              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                Tipos Comunes de Negligencia Médica
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-red-600">
                  <Brain className="w-10 h-10 text-red-600 mb-3" />
                  <h4 className="font-bold text-burgundy-900 mb-2">Errores de Diagnóstico</h4>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Falla en diagnosticar cáncer</li>
                    <li>• Ignorar síntomas de ataque cardíaco</li>
                    <li>• Diagnóstico erróneo de condiciones graves</li>
                    <li>• Retraso en diagnóstico crítico</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-red-600">
                  <Hospital className="w-10 h-10 text-red-600 mb-3" />
                  <h4 className="font-bold text-burgundy-900 mb-2">Errores Quirúrgicos</h4>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Operar la parte incorrecta del cuerpo</li>
                    <li>• Dejar instrumentos dentro del paciente</li>
                    <li>• Daño a órganos durante cirugía</li>
                    <li>• Infecciones por falta de esterilización</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-red-600">
                  <Baby className="w-10 h-10 text-red-600 mb-3" />
                  <h4 className="font-bold text-burgundy-900 mb-2">Lesiones de Parto</h4>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Parálisis cerebral por falta de oxígeno</li>
                    <li>• Lesiones del plexo braquial</li>
                    <li>• Falla en realizar cesárea a tiempo</li>
                    <li>• Uso incorrecto de fórceps</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-red-600">
                  <Pill className="w-10 h-10 text-red-600 mb-3" />
                  <h4 className="font-bold text-burgundy-900 mb-2">Errores de Medicación</h4>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Dosis incorrecta o medicamento equivocado</li>
                    <li>• Falla en revisar alergias</li>
                    <li>• Interacciones peligrosas de medicamentos</li>
                    <li>• Errores en anestesia</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                Por Qué los Casos de Negligencia Médica Son Complejos
              </h3>

              <div className="bg-burgundy-50 p-8 rounded-lg mb-8">
                <Scale className="w-12 h-12 text-burgundy-700 mb-4" />
                <p className="text-gray-700 mb-4">
                  Los casos de negligencia médica requieren probar que el profesional médico 
                  violó el &ldquo;estándar de cuidado&rdquo; - lo que un médico razonablemente competente 
                  habría hecho en la misma situación.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Shield className="w-6 h-6 text-burgundy-700 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="font-bold text-burgundy-900">Necesitamos Expertos Médicos</h5>
                      <p className="text-gray-700">Contratamos los mejores especialistas para revisar su caso</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Shield className="w-6 h-6 text-burgundy-700 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="font-bold text-burgundy-900">Análisis de Récords Médicos</h5>
                      <p className="text-gray-700">Examinamos cada detalle de su historial médico</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Shield className="w-6 h-6 text-burgundy-700 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="font-bold text-burgundy-900">Recursos para Ganar</h5>
                      <p className="text-gray-700">Invertimos lo necesario para enfrentar a grandes hospitales</p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                Señales de que Puede Tener un Caso
              </h3>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">⚠️</span>
                    <span>Su condición empeoró después del tratamiento</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">⚠️</span>
                    <span>El médico no ordenó pruebas obvias</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">⚠️</span>
                    <span>Sufrió complicaciones inesperadas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">⚠️</span>
                    <span>Le dieron el medicamento equivocado</span>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">⚠️</span>
                    <span>Un segundo médico cuestionó el tratamiento</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">⚠️</span>
                    <span>El personal médico admitió un error</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">⚠️</span>
                    <span>No le informaron de los riesgos</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">⚠️</span>
                    <span>Operaron sin su consentimiento completo</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hospital Systems Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-burgundy-900 text-center mb-8">
              Enfrentamos a los Grandes Sistemas de Salud de NC
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-white p-6 rounded-lg shadow">
                <Hospital className="w-12 h-12 mx-auto mb-3 text-burgundy-700" />
                <h3 className="font-bold mb-2">Duke Health</h3>
                <p className="text-sm text-gray-600">Durham, Raleigh</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <Hospital className="w-12 h-12 mx-auto mb-3 text-burgundy-700" />
                <h3 className="font-bold mb-2">UNC Health</h3>
                <p className="text-sm text-gray-600">Chapel Hill, Rex</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <Hospital className="w-12 h-12 mx-auto mb-3 text-burgundy-700" />
                <h3 className="font-bold mb-2">WakeMed</h3>
                <p className="text-sm text-gray-600">Raleigh, Cary</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <Hospital className="w-12 h-12 mx-auto mb-3 text-burgundy-700" />
                <h3 className="font-bold mb-2">Atrium Health</h3>
                <p className="text-sm text-gray-600">Charlotte Metro</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <Hospital className="w-12 h-12 mx-auto mb-3 text-burgundy-700" />
                <h3 className="font-bold mb-2">Novant Health</h3>
                <p className="text-sm text-gray-600">Winston-Salem</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <Hospital className="w-12 h-12 mx-auto mb-3 text-burgundy-700" />
                <h3 className="font-bold mb-2">Cone Health</h3>
                <p className="text-sm text-gray-600">Greensboro</p>
              </div>
            </div>
            
            <p className="text-center mt-8 text-gray-700">
              No importa qué tan grande sea el hospital - luchamos por sus derechos.
            </p>
          </div>
        </div>
      </section>

      {/* Case Results */}
      <section className="bg-burgundy-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Resultados en Casos de Negligencia Médica
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 p-6 rounded-lg">
                <p className="text-4xl font-bold text-gold-400 mb-3">$3.2 Millones</p>
                <h3 className="text-xl font-bold mb-2">Falla en Diagnosticar Cáncer</h3>
                <p>Mujer de 42 años - el médico ignoró síntomas obvios durante 18 meses. 
                   Tratamiento tardío resultó en mastectomía y quimioterapia extensa.</p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-lg">
                <p className="text-4xl font-bold text-gold-400 mb-3">$2.8 Millones</p>
                <h3 className="text-xl font-bold mb-2">Lesión de Parto - Parálisis Cerebral</h3>
                <p>Falla en realizar cesárea de emergencia. Bebé sufrió falta de oxígeno 
                   resultando en parálisis cerebral permanente.</p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-lg">
                <p className="text-4xl font-bold text-gold-400 mb-3">$1.5 Millones</p>
                <h3 className="text-xl font-bold mb-2">Error Quirúrgico - Daño Nervioso</h3>
                <p>Cirujano cortó nervio durante operación rutinaria de vesícula. 
                   Paciente con dolor crónico permanente.</p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-lg">
                <p className="text-4xl font-bold text-gold-400 mb-3">$975,000</p>
                <h3 className="text-xl font-bold mb-2">Sobredosis de Medicamento</h3>
                <p>Enfermera administró 10 veces la dosis correcta. 
                   Paciente sufrió daño renal permanente.</p>
              </div>
            </div>
            
            <p className="text-center mt-8 text-sm">
              *Cada caso es único. Resultados pasados no garantizan resultados futuros.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-burgundy-900 text-center mb-12">
              Proceso de Su Caso de Negligencia Médica
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-burgundy-700 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-burgundy-900 mb-1">1. Consulta Inicial Gratuita (1-2 días)</h3>
                  <p className="text-gray-700">Revisamos su caso y determinamos si hay negligencia médica.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-burgundy-700 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-burgundy-900 mb-1">2. Investigación Médica (2-4 semanas)</h3>
                  <p className="text-gray-700">Obtenemos récords médicos y consultamos con expertos.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-burgundy-700 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-burgundy-900 mb-1">3. Presentación de Demanda (1-2 meses)</h3>
                  <p className="text-gray-700">Preparamos y presentamos la demanda formal.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-burgundy-700 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-burgundy-900 mb-1">4. Negociación o Juicio (6-18 meses)</h3>
                  <p className="text-gray-700">Luchamos por compensación máxima a través de acuerdo o juicio.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-900 to-burgundy-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Stethoscope className="w-16 h-16 mx-auto mb-6 text-red-400" />
            <h2 className="text-4xl font-bold mb-6">
              Los Errores Médicos No Deben Quedar Sin Consecuencias
            </h2>
            <p className="text-xl mb-8">
              Si usted o un ser querido sufrió por negligencia médica, necesita abogados 
              con experiencia y recursos para enfrentar al sistema médico.
            </p>
            
            <div className="bg-white text-burgundy-900 p-8 rounded-lg inline-block shadow-2xl">
              <p className="text-3xl font-bold mb-4">YO PELEO POR TI™</p>
              <p className="text-xl mb-2">Evaluación de Caso 100% GRATIS</p>
              <p className="text-lg mb-6">Consultamos con Expertos Médicos</p>
              <a
                href="tel:18449673536"
                className="bg-blue-700 text-white px-10 py-5 rounded-md font-bold text-2xl hover:bg-blue-800 transition-all inline-flex items-center"
              >
                <Phone className="mr-3" />
                1-844-YO-PELEO
              </a>
              <p className="mt-6 text-sm">
                No Cobramos Si No Ganamos • Hablamos Español
              </p>
            </div>
            
            <div className="mt-8 bg-yellow-400 text-black p-4 rounded-lg inline-block">
              <p className="font-bold">
                ⏰ RECUERDE: Solo tiene 3 años para presentar su caso. ¡No espere!
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
              Preguntas Frecuentes sobre Negligencia Médica
            </h3>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="font-bold text-burgundy-900 mb-2">
                  ¿Cuánto cuesta contratar un abogado de negligencia médica?
                </h4>
                <p className="text-gray-700">
                  NADA por adelantado. Trabajamos por contingencia - solo cobramos si ganamos su caso. 
                  Incluso pagamos por los expertos médicos necesarios.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="font-bold text-burgundy-900 mb-2">
                  ¿Cómo sé si tengo un caso válido?
                </h4>
                <p className="text-gray-700">
                  La única forma de saberlo es con una evaluación profesional. Ofrecemos consultas 
                  gratuitas donde revisamos su caso con expertos médicos.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="font-bold text-burgundy-900 mb-2">
                  ¿Afectará esto mi relación con mis médicos?
                </h4>
                <p className="text-gray-700">
                  No tiene que preocuparse. Puede cambiar de médico si lo desea, y la demanda 
                  es contra el seguro de mala práctica, no contra el médico personalmente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Components */}
      <ChatWidget userId="negligencia-medica-page" language="es" />
      <VoiceAssistant language="es" />

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Vasquez Law Firm - Abogados de Negligencia Médica',
            description: 'Abogados especializados en casos de negligencia médica y mala práctica en Carolina del Norte. Errores médicos, diagnósticos erróneos, errores quirúrgicos.',
            url: 'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales/negligencia-medica',
            telephone: '+1-844-967-3536',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '6801 Glenwood Ave',
              addressLocality: 'Raleigh',
              addressRegion: 'NC',
              postalCode: '27612',
              addressCountry: 'US'
            },
            areaServed: ['Raleigh', 'Charlotte', 'Durham', 'Chapel Hill', 'Winston-Salem', 'North Carolina'],
            priceRange: 'Base de contingencia - No cobra si no gana',
            openingHours: 'Mo-Su 00:00-23:59',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '64'
            }
          }),
        }}
      />
    </div>
  );
}