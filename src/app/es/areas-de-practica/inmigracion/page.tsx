import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Inmigración - Bufete de Abogados Vasquez',
  description:
    'Servicios legales de inmigración. Abogados experimentados listos para ayudarte. Consulta gratuita disponible.',
};

export default function InmigraciónPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-br from-[#6B1F2E] to-[#8B2635] text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Inmigración</h1>
          <p className="text-xl max-w-3xl">
            Abogados experimentados en inmigración listos para luchar por tus derechos.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p>
              Nuestro equipo de abogados especializados en inmigración está comprometido a
              proporcionar representación legal de alta calidad. Con años de experiencia y un
              historial comprobado de éxito, estamos aquí para ayudarte en cada paso del camino.
            </p>

            <h2>¿Por Qué Elegirnos?</h2>
            <ul>
              <li>Más de 35 años de experiencia combinada</li>
              <li>Consultas gratuitas en español</li>
              <li>Disponibles 24/7 para emergencias</li>
              <li>Historial comprobado de casos exitosos</li>
              <li>Representación agresiva y compasiva</li>
            </ul>

            <h2>Cómo Podemos Ayudarte</h2>
            <p>
              No importa la complejidad de tu caso, nuestros abogados tienen la experiencia y
              dedicación necesarias para luchar por el mejor resultado posible. Ofrecemos:
            </p>
            <ul>
              <li>Evaluación gratuita de tu caso</li>
              <li>Estrategias legales personalizadas</li>
              <li>Comunicación clara y constante</li>
              <li>Representación en corte</li>
              <li>Negociación agresiva</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#C9974D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Necesitas Ayuda con Inmigración?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Contactooa a nuestros abogados experimentados hoy para una consulta gratuita
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
              className="bg-[#6B1F2E] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#8B2635] transition-colors inline-block"
            >
              Llamar: 1-844-YO-PELEO
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
