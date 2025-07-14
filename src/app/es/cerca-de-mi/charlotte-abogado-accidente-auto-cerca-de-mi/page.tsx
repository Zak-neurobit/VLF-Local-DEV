import { SpanishLocationPageTemplate } from '@/components/templates/SpanishLocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abogado de Accidente de Auto Cerca De Mí Charlotte NC | Disponible 24/7 | Consulta Gratuita',
  description:
    '¿Busca un abogado de accidente de auto cerca de usted en Charlotte? ⭐ Calificación 5 Estrellas • 60+ Años de Experiencia • Se Habla Español • Citas el Mismo Día • Llame 1-844-YO-PELEO',
  keywords:
    'abogado de accidente de auto cerca de mi, abogado de accidentes automovilisticos cerca de mi, abogado de colisiones cerca de mi, abogado de accidente de auto charlotte nc cerca de mi, mejor abogado de accidente de auto cerca de mi, abogado de accidente de auto que habla español cerca de mi, abogado de accidente de auto de emergencia cerca de mi',
  openGraph: {
    title: 'Abogado de Accidente de Auto Cerca De Mí en Charlotte | Vasquez Law Firm',
    description:
      'Ayuda Legal de Emergencia 24/7 en Charlotte. Consulta Gratuita. 30,000+ Casos Ganados. Se Habla Español.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/charlotte-abogado-accidente-auto-cerca-de-mi',
    images: [
      {
        url: '/images/charlotte-office-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Vasquez Law Firm Charlotte - Abogado de Accidente de Auto Cerca de Usted',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/cerca-de-mi/charlotte-abogado-accidente-auto-cerca-de-mi',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/near-me/charlotte-car-accident-lawyer-near-me',
      'es-ES': 'https://www.vasquezlawnc.com/es/cerca-de-mi/charlotte-abogado-accidente-auto-cerca-de-mi',
    },
  },
};

export const runtime = 'nodejs';

export default function CharlotteAbogadoaccidenteautoCercaDeMiPage() {
  return (
    <SpanishLocationPageTemplate
      data={{
        city: 'Charlotte',
        state: 'NC',
        population: '900,000+',
        caseCount: '2,500+',
        practiceAreas: [
          {
            title: 'Ley de Inmigración',
            icon: '🌐',
            services: ['Tarjetas Verdes', 'Ciudadanía', 'Visas de Trabajo', 'Defensa de Deportación'],
            link: '/es/areas-de-practica/ley-de-inmigracion',
          },
          {
            title: 'Lesiones Personales',
            icon: '🏥',
            services: ['Accidentes de Auto', 'Caídas y Resbalones', 'Negligencia Médica', 'Muerte Injusta'],
            link: '/es/areas-de-practica/lesiones-personales',
          },
          {
            title: 'Defensa Criminal',
            icon: '⚖️',
            services: ['DUI/DWI', 'Cargos de Drogas', 'Asalto', 'Delitos de Robo'],
            link: '/es/areas-de-practica/defensa-criminal',
          },
          {
            title: 'Derecho Familiar',
            icon: '👥',
            services: ['Divorcio', 'Custodia de Menores', 'Manutención', 'Adopción'],
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
            { name: 'Tribunal de Distrito de Charlotte', type: 'Tribunal de Distrito' },
            { name: 'Tribunal Superior del Condado', type: 'Tribunal Superior' },
            { name: 'Corte Federal de Charlotte', type: 'Tribunal Federal' },
          ],
          commonIssues: [
            'Consultas de servicios legales',
            'Asistencia legal de emergencia',
            'Evaluaciones gratuitas de casos',
            'Servicios legales bilingües',
            'Accidentes de tráfico en I-77 e I-485',
            'Casos de inmigración y ICE',
            'Defensa criminal y DUI',
            'Lesiones en el trabajo en la industria bancaria',
          ],
        },
        testimonials: [
          {
            name: 'María G.',
            location: 'Residente de Charlotte',
            rating: 5,
            text: 'Excelente representación legal. Me ayudaron con mi caso y fueron muy profesionales. El servicio en español fue perfecto.',
          },
          {
            name: 'Juan D.',
            location: 'Cliente Local',
            rating: 5,
            text: 'Gran experiencia con mi caso de accidente de auto. Lucharon duro por mis derechos y obtuvieron una buena compensación.',
          },
          {
            name: 'Carlos M.',
            location: 'Área de Charlotte',
            rating: 5,
            text: 'Abogados muy conocedores. Altamente recomiendo sus servicios legales. Me ayudaron con mi caso de inmigración.',
          },
        ],
        nearbyLocations: [
          { name: 'Concord', slug: 'concord' },
          { name: 'Gastonia', slug: 'gastonia' },
          { name: 'Huntersville', slug: 'huntersville' },
          { name: 'Matthews', slug: 'matthews' },
          { name: 'Mint Hill', slug: 'mint-hill' },
          { name: 'Pineville', slug: 'pineville' },
        ],
      }}
    />
  );
}