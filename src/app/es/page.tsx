import { Metadata } from 'next';
import Link from 'next/link';
import { Phone } from 'lucide-react';

export const metadata: Metadata = {
  title:
    'Bufete de Abogados Vasquez - YO PELEO POR TI™ | Abogados de Inmigración y Lesiones Personales',
  description:
    'Representación legal honesta y confiable a un precio accesible. Más de 60 años de experiencia. Inmigración, lesiones personales, compensación laboral y defensa criminal. Disponible 24/7.',
  openGraph: {
    title: 'Bufete de Abogados Vasquez - YO PELEO POR TI™',
    description:
      'Representación legal honesta y confiable. Más de 30,000 casos ganados. Abogado veterano de la Fuerza Aérea de EE.UU. Disponible 24/7 con asistencia de IA en español.',
  },
};

export default function EsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#6B1F2E] to-[#8B2635] text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">YO PELEO POR TI™</h1>
          <p className="text-xl md:text-2xl max-w-3xl mb-8">
            Representación legal honesta y confiable a un precio accesible. Más de 60 años luchando
            por los derechos de nuestra comunidad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/es/contacto"
              className="bg-[#C9974D] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#B88740] transition-colors inline-block text-center"
            >
              Consulta Gratuita
            </Link>
            <a
              href="tel:1-844-967-3536"
              className="bg-white text-[#6B1F2E] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
            >
              <Phone className="h-5 w-5" />
              1-844-YO-PELEO
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#6B1F2E]">60+</div>
              <div className="text-gray-600 mt-2">Años de Experiencia</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#6B1F2E]">30,000+</div>
              <div className="text-gray-600 mt-2">Casos Ganados</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#6B1F2E]">24/7</div>
              <div className="text-gray-600 mt-2">Disponibilidad</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#6B1F2E]">95%</div>
              <div className="text-gray-600 mt-2">Tasa de Éxito</div>
            </div>
          </div>
        </div>
      </section>

      {/* Áreas de Práctica */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Nuestras Áreas de Práctica
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/es/areas-de-practica/inmigracion" className="group">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-[#6B1F2E]">
                  Inmigración
                </h3>
                <p className="text-gray-600">
                  Visas, tarjetas verdes, ciudadanía, asilo, defensa de deportación, reunificación
                  familiar y más.
                </p>
              </div>
            </Link>
            <Link href="/es/areas-de-practica/lesiones-personales" className="group">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-[#6B1F2E]">
                  Lesiones Personales
                </h3>
                <p className="text-gray-600">
                  Accidentes de auto, resbalones y caídas, lesiones laborales, negligencia médica y
                  más.
                </p>
              </div>
            </Link>
            <Link href="/es/areas-de-practica/compensacion-laboral" className="group">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-[#6B1F2E]">
                  Compensación Laboral
                </h3>
                <p className="text-gray-600">
                  Lesiones en el trabajo, beneficios por discapacidad, disputas con aseguradoras y
                  más.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#C9974D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Necesitas Ayuda Legal?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Contacta a nuestros abogados experimentados hoy para una consulta gratuita
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/es/contacto"
              className="bg-white text-[#6B1F2E] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-block"
            >
              Agendar Consulta
            </Link>
            <a
              href="tel:1-844-967-3536"
              className="bg-[#6B1F2E] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#8B2635] transition-colors inline-flex items-center justify-center gap-2"
            >
              <Phone className="h-5 w-5" />
              Llamar Ahora
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
