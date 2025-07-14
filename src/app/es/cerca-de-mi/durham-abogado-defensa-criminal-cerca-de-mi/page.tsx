import { SpanishLocationPageTemplate } from '@/components/templates/SpanishLocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abogado de Defensa Criminal Cerca De Mí Durham NC | Disponible 24/7 | Consulta Gratuita',
  description:
    '¿Busca un abogado de defensa criminal cerca de usted en Durham? ⭐ Calificación 5 Estrellas • 60+ Años de Experiencia • Se Habla Español • Citas el Mismo Día • Llame 1-844-YO-PELEO',
  keywords:
    'abogado de defensa criminal cerca de mi, abogado criminalista cerca de mi, defensa penal cerca de mi, abogado de defensa criminal durham nc cerca de mi, mejor abogado de defensa criminal cerca de mi, abogado de defensa criminal que habla español cerca de mi, abogado de defensa criminal de emergencia cerca de mi',
  openGraph: {
    title: 'Abogado de Defensa Criminal Cerca De Mí en Durham | Vasquez Law Firm',
    description:
      'Ayuda Legal de Emergencia 24/7 en Durham. Consulta Gratuita. 30,000+ Casos Ganados. Se Habla Español.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/durham-abogado-defensa-criminal-cerca-de-mi',
    images: [
      {
        url: '/images/durham-office-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Vasquez Law Firm Durham - Abogado de Defensa Criminal Cerca de Usted',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/cerca-de-mi/durham-abogado-defensa-criminal-cerca-de-mi',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/near-me/durham-criminal-defense-lawyer-near-me',
      'es-ES': 'https://www.vasquezlawnc.com/es/cerca-de-mi/durham-abogado-defensa-criminal-cerca-de-mi',
    },
  },
};

export const runtime = 'nodejs';

export default function DurhamAbogadodefensacriminalCercaDeMiPage() {
  return (
    <SpanishLocationPageTemplate
      data={{
        city: 'Durham',
        state: 'NC',
        population: '280,000+',
        caseCount: '1,200+',
        practiceAreas: [
          {
            title: 'Defensa Criminal',
            icon: '⚖️',
            services: ['DUI/DWI', 'Cargos de Drogas', 'Asalto', 'Delitos de Robo', 'Delitos Violentos'],
            link: '/es/areas-de-practica/defensa-criminal',
          },
          {
            title: 'Ley de Inmigración',
            icon: '🌐',
            services: ['Peticiones Familiares', 'Residencia Permanente', 'Ciudadanía', 'Defensa de Deportación'],
            link: '/es/areas-de-practica/ley-de-inmigracion',
          },
          {
            title: 'Lesiones Personales',
            icon: '🏥',
            services: ['Accidentes de Auto', 'Caídas y Resbalones', 'Negligencia Médica', 'Muerte Injusta'],
            link: '/es/areas-de-practica/lesiones-personales',
          },
          {
            title: 'Derecho Familiar',
            icon: '👥',
            services: ['Divorcio', 'Custodia de Menores', 'Manutención', 'Violencia Doméstica'],
            link: '/es/areas-de-practica/derecho-familiar',
          },
          {
            title: 'Compensación Laboral',
            icon: '💼',
            services: ['Lesiones en el Trabajo', 'Enfermedades Ocupacionales', 'Beneficios Negados'],
            link: '/es/areas-de-practica/compensacion-laboral',
          },
        ],
        localInfo: {
          courts: [
            { name: 'Tribunal de Distrito de Durham County', type: 'Tribunal de Distrito' },
            { name: 'Tribunal Superior de Durham County', type: 'Tribunal Superior' },
            { name: 'Corte Municipal de Durham', type: 'Tribunal Municipal' },
          ],
          commonIssues: [
            'Arrestos por DUI/DWI',
            'Cargos de drogas y narcóticos',
            'Delitos violentos y asalto',
            'Infracciones de tráfico',
            'Casos de violencia doméstica',
            'Defensa de deportación',
            'Servicios legales de emergencia',
            'Consultas bilingües',
          ],
        },
        testimonials: [
          {
            name: 'Miguel A.',
            location: 'Residente de Durham',
            rating: 5,
            text: 'Excelente defensa criminal. Me ayudaron con mi caso de DUI y lograron reducir los cargos. Muy profesionales.',
          },
          {
            name: 'Elena P.',
            location: 'Cliente Local',
            rating: 5,
            text: 'El equipo de Vasquez Law Firm me defendió perfectamente. Hablaron español conmigo todo el tiempo. Muy recomendados.',
          },
          {
            name: 'José R.',
            location: 'Área de Durham',
            rating: 5,
            text: 'Fueron muy rápidos en responder a mi emergencia legal. Me ayudaron cuando más lo necesitaba. Gracias!',
          },
        ],
        nearbyLocations: [
          { name: 'Raleigh', slug: 'raleigh' },
          { name: 'Chapel Hill', slug: 'chapel-hill' },
          { name: 'Cary', slug: 'cary' },
          { name: 'Hillsborough', slug: 'hillsborough' },
          { name: 'Morrisville', slug: 'morrisville' },
          { name: 'Research Triangle Park', slug: 'research-triangle-park' },
        ],
      }}
    />
  );
}