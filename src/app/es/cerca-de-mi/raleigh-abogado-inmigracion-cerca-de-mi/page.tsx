import { SpanishLocationPageTemplate } from '@/components/templates/SpanishLocationPageTemplate';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abogado de Inmigración Cerca De Mí Raleigh NC | Disponible 24/7 | Consulta Gratuita',
  description:
    '¿Busca un abogado de inmigración cerca de usted en Raleigh? ⭐ Calificación 5 Estrellas • 60+ Años de Experiencia • Se Habla Español • Citas el Mismo Día • Llame 1-844-YO-PELEO',
  keywords:
    'abogado de inmigracion cerca de mi, abogado de deportacion cerca de mi, abogado de ciudadania cerca de mi, abogado de inmigración raleigh nc cerca de mi, mejor abogado de inmigración cerca de mi, abogado de inmigración que habla español cerca de mi, abogado de inmigración de emergencia cerca de mi',
  openGraph: {
    title: 'Abogado de Inmigración Cerca De Mí en Raleigh | Vasquez Law Firm',
    description:
      'Ayuda Legal de Emergencia 24/7 en Raleigh. Consulta Gratuita. 30,000+ Casos Ganados. Se Habla Español.',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/raleigh-abogado-inmigracion-cerca-de-mi',
    images: [
      {
        url: '/images/raleigh-office-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Vasquez Law Firm Raleigh - Abogado de Inmigración Cerca de Usted',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/cerca-de-mi/raleigh-abogado-inmigracion-cerca-de-mi',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/near-me/raleigh-immigration-lawyer-near-me',
      'es-ES': 'https://www.vasquezlawnc.com/es/cerca-de-mi/raleigh-abogado-inmigracion-cerca-de-mi',
    },
  },
};

export const runtime = 'nodejs';

export default function RaleighAbogadoinmigracionCercaDeMiPage() {
  return (
    <SpanishLocationPageTemplate
      data={{
        city: 'Raleigh',
        state: 'NC',
        population: '470,000+',
        caseCount: '1,800+',
        practiceAreas: [
          {
            title: 'Ley de Inmigración',
            icon: '🌐',
            services: ['Peticiones Familiares', 'Residencia Permanente', 'Ciudadanía', 'Visas de Trabajo', 'Defensa de Deportación'],
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
            { name: 'Tribunal de Distrito de Wake County', type: 'Tribunal de Distrito' },
            { name: 'Tribunal Superior de Wake County', type: 'Tribunal Superior' },
            { name: 'Corte Federal de Raleigh', type: 'Tribunal Federal' },
          ],
          commonIssues: [
            'Consultas de servicios legales',
            'Asistencia legal de emergencia',
            'Evaluaciones gratuitas de casos',
            'Servicios legales bilingües',
            'Casos de inmigración y deportación',
            'Accidentes en I-40 e I-440',
            'Defensa criminal y DUI',
            'Casos de familias mixtas',
          ],
        },
        testimonials: [
          {
            name: 'Ana R.',
            location: 'Residente de Raleigh',
            rating: 5,
            text: 'Excelente ayuda con mi caso de inmigración. Me ayudaron a obtener mi residencia permanente. El servicio en español fue perfecto.',
          },
          {
            name: 'Roberto S.',
            location: 'Cliente Local',
            rating: 5,
            text: 'Muy profesionales y conocedores. Me ayudaron con mi caso de ciudadanía sin problemas. Altamente recomendados.',
          },
          {
            name: 'Carmen L.',
            location: 'Área de Raleigh',
            rating: 5,
            text: 'El equipo de Vasquez Law Firm es increíble. Me ayudaron con la petición familiar para mi esposo. Estamos muy agradecidos.',
          },
        ],
        nearbyLocations: [
          { name: 'Durham', slug: 'durham' },
          { name: 'Cary', slug: 'cary' },
          { name: 'Apex', slug: 'apex' },
          { name: 'Wake Forest', slug: 'wake-forest' },
          { name: 'Garner', slug: 'garner' },
          { name: 'Chapel Hill', slug: 'chapel-hill' },
        ],
      }}
    />
  );
}