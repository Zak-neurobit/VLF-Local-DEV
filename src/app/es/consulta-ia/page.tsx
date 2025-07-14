import { Metadata } from 'next';
import { MasterLayout } from '@/design-system/templates/MasterLayout';
import { VirtualParalegal } from '@/components/VirtualParalegal';
import { ChatWidget } from '@/components/ChatWidget';

export const metadata: Metadata = {
  title: 'Consulta Legal con IA - Bufete de Abogados Vásquez',
  description:
    'Obtenga asesoría legal instantánea con nuestro asistente de inteligencia artificial. Disponible 24/7 en español para responder sus preguntas legales.',
  keywords:
    'consulta legal IA, abogado virtual, asesoría legal gratis, chatbot legal español, inteligencia artificial legal',
  openGraph: {
    title: 'Consulta Legal con IA - Bufete de Abogados Vásquez',
    description:
      'Asistente legal virtual disponible 24/7. Obtenga respuestas inmediatas a sus preguntas legales en español.',
    type: 'website',
    locale: 'es_ES',
    alternateLocale: 'en_US',
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/consulta-ia',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/ai-consultation',
      'es-ES': 'https://www.vasquezlawnc.com/es/consulta-ia',
    },
  },
};

export default function ConsultaIAPage() {
  return (
    <MasterLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Consulta Legal con Inteligencia Artificial
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Obtenga respuestas inmediatas a sus preguntas legales las 24 horas del día, los 7
                días de la semana con nuestro asistente virtual impulsado por IA.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    const chatSection = document.getElementById('virtual-paralegal');
                    chatSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary-dark transition-colors"
                >
                  Comenzar Consulta Gratuita
                </button>
                <a
                  href="tel:18449673536"
                  className="px-8 py-4 bg-white text-secondary font-semibold rounded-lg border-2 border-secondary hover:bg-secondary hover:text-white transition-colors"
                >
                  Llamar: 1-844-YO-PELEO
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                ¿Por Qué Usar Nuestra Consulta con IA?
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-secondary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Disponible 24/7</h3>
                  <p className="text-gray-600">
                    Obtenga respuestas instantáneas en cualquier momento, sin necesidad de cita.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-secondary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">100% en Español</h3>
                  <p className="text-gray-600">
                    Comunicación completa en español, diseñada para nuestra comunidad hispana.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-secondary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Confidencial y Seguro</h3>
                  <p className="text-gray-600">
                    Sus consultas son privadas y protegidas con encriptación de nivel bancario.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Virtual Paralegal Section */}
        <section id="virtual-paralegal" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                Hable con Nuestro Asistente Legal Virtual
              </h2>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <VirtualParalegal language="es" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-secondary text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">¿Prefiere Hablar con un Abogado Real?</h2>
              <p className="text-xl mb-8 text-white/90">
                Nuestro equipo legal está disponible para consultas telefónicas gratuitas. Llámenos
                ahora o programe una cita en persona.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/es/consulta-gratuita"
                  className="px-8 py-4 bg-white text-secondary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Programar Consulta Gratuita
                </a>
                <a
                  href="tel:18449673536"
                  className="px-8 py-4 bg-secondary-dark text-white font-semibold rounded-lg hover:bg-secondary-darker transition-colors"
                >
                  Llamar Ahora: 1-844-YO-PELEO
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Preguntas Frecuentes
              </h2>
              <div className="space-y-6">
                <div className="border-b pb-6">
                  <h3 className="text-xl font-semibold mb-3">¿Es gratis la consulta con IA?</h3>
                  <p className="text-gray-600">
                    Sí, nuestra consulta con IA es completamente gratuita. Puede hacer todas las
                    preguntas que necesite sin ningún costo.
                  </p>
                </div>
                <div className="border-b pb-6">
                  <h3 className="text-xl font-semibold mb-3">
                    ¿Puede la IA reemplazar a un abogado real?
                  </h3>
                  <p className="text-gray-600">
                    No, la IA proporciona información general y orientación inicial, pero no puede
                    reemplazar el consejo legal personalizado de un abogado licenciado. Para casos
                    específicos, siempre recomendamos una consulta con nuestros abogados.
                  </p>
                </div>
                <div className="border-b pb-6">
                  <h3 className="text-xl font-semibold mb-3">
                    ¿Qué tipos de preguntas puedo hacer?
                  </h3>
                  <p className="text-gray-600">
                    Puede preguntar sobre inmigración, lesiones personales, compensación laboral,
                    defensa criminal y derecho familiar. La IA está entrenada en las leyes de
                    Carolina del Norte y Florida.
                  </p>
                </div>
                <div className="border-b pb-6">
                  <h3 className="text-xl font-semibold mb-3">¿Es segura mi información?</h3>
                  <p className="text-gray-600">
                    Absolutamente. Utilizamos encriptación de nivel bancario y no almacenamos
                    información personal identificable. Sus consultas son anónimas y confidenciales.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Floating Chat Widget */}
      <ChatWidget language="es" />
    </MasterLayout>
  );
}
