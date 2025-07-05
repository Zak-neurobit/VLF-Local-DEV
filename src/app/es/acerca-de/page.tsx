import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';
import { MasterLayout } from '@/design-system/templates/MasterLayout';

export const metadata: Metadata = {
  title: 'Acerca de Nosotros | Bufete de Abogados Vasquez - YO PELEO POR TI™',
  description: 'Abogados de inmigración, lesiones personales y defensa criminal. Más de 30,000 casos ganados. Consulta gratuita. Disponible 24/7.',
};

export default function Page() {
  return (
    <MasterLayout variant="default" showBreadcrumbs={true}>
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-secondary to-secondary-dark text-white relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-black to-secondary/10" />
            <div
              className="absolute inset-0"
                          />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div
                          >
              <h1 className="text-4xl md:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-primary to-primary-300 bg-clip-text text-transparent">
                  Acerca de Nosotros
                </span>
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl text-gray-300">
                YO PELEO POR TI™ - Representación legal confiable con más de 60 años de experiencia combinada.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-gradient-to-b from-neutral-950 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
                            className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-black mb-6">
                <span className="bg-gradient-to-r from-primary to-primary-300 bg-clip-text text-transparent">
                  ¿Necesita Ayuda Legal?
                </span>
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Contacte a nuestros abogados experimentados hoy para una consulta gratuita. 
                Disponible 24/7 para ayudarle con sus necesidades legales.
              </p>
            </div>

            <div
                            className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/es/consulta-gratuita"
                className="inline-flex items-center gap-2 bg-primary text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-300 transition-all transform hover:scale-105"
              >
                Agendar Consulta Gratuita
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:1-844-967-3536"
                className="inline-flex items-center justify-center gap-2 bg-transparent text-white border-2 border-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-black transition-all transform hover:scale-105"
              >
                <Phone className="h-5 w-5" />
                1-844-YO-PELEO
              </a>
            </div>
          </div>
        </section>
      </div>
    </MasterLayout>
  );
}
