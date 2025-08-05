import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'Abogados DUI/DWI en NC | Salve Su Licencia | Defensa Experta 24/7 | YO PELEO POR TI™',
  description:
    'Abogados expertos en DUI/DWI en Carolina del Norte. Protegemos su licencia, libertad y futuro. Primera ofensa a casos complejos. Disponible 24/7. Consulta GRATIS.',
  keywords:
    'abogado DUI NC, abogado DWI Carolina del Norte, defensa DUI Raleigh, abogado conducir ebrio Charlotte, DWI Durham, suspensión licencia DUI, interruptor ignición NC',
  openGraph: {
    title: 'Abogados DUI/DWI - Vasquez Law Firm | Carolina del Norte',
    description:
      'Defensa experta en casos DUI/DWI. Protegemos su licencia, evitamos cárcel, y minimizamos consecuencias. Disponibles 24/7 para arrestos.',
    images: [{ url: '/images/criminal-defense-dui-dwi.jpg', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/areas-de-practica/defensa-criminal/dui-dwi',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/practice-areas/criminal-defense/dui-dwi',
      'es-ES': 'https://www.vasquezlawnc.com/es/areas-de-practica/defensa-criminal/dui-dwi',
    },
  },
};

const services = [
  {
    title: 'Primera Ofensa DWI',
    description:
      'Defensa especializada para conductores primerizos enfrentando su primer cargo DWI con estrategias para minimizar penalidades.',
    features: [
      'Evitar tiempo de cárcel',
      'Mantener privilegios de conducir',
      'Programas de tratamiento alternativos',
      'Reducción a conducción imprudente',
      'Evitar antecedentes permanentes',
      'Minimizar multas y costos',
    ],
  },
  {
    title: 'DWI con BAC Alto (0.15+)',
    description:
      'Defensa agresiva para casos con niveles de alcohol altos que conllevan penalidades aumentadas automáticamente.',
    features: [
      'Desafío de pruebas de aliento',
      'Cuestionamiento de calibración',
      'Procedimientos de parada incorrectos',
      'Condiciones médicas que afectan BAC',
      'Interruptor de ignición mínimo',
      'Evitar cárcel obligatoria',
    ],
  },
  {
    title: 'DWI Múltiples (Segunda, Tercera+)',
    description:
      'Representación seria para conductores con múltiples DWI enfrentando penalidades severas y tiempo de cárcel obligatorio.',
    features: [
      'Evitar prisión obligatoria',
      'Programas de tratamiento intensivo',
      'Estrategias de mitigación',
      'Restauración de licencia eventual',
      'Protección de empleo y familia',
      'Manejo de casos federales',
    ],
  },
  {
    title: 'Rechazo de Pruebas (Breathalyzer)',
    description:
      'Defensa para conductores que rechazaron pruebas químicas enfrentando suspensión automática de licencia.',
    features: [
      'Audiencias DMV de rechazo',
      'Desafío de suspensión automática',
      'Privilegios de trabajo limitados',
      'Procedimientos de parada impropia',
      'Falta de causa probable',
      'Restauración temprana de licencia',
    ],
  },
  {
    title: 'DWI con Lesiones/Muerte',
    description:
      'Defensa de felonías graves cuando DWI resulta en lesiones serias o muerte de otros.',
    features: [
      'Felonía DWI defensa',
      'Homicidio vehicular',
      'Reconstrucción de accidentes',
      'Evidencia médica compleja',
      'Negociación de cargos reducidos',
      'Evitar décadas de prisión',
    ],
  },
  {
    title: 'DWI de Menores (Bajo 21)',
    description:
      'Protección especial para conductores menores con tolerancia cero y consecuencias educativas únicas.',
    features: [
      'Política de tolerancia cero',
      'BAC 0.08+ vs 0.00+ para menores',
      'Protección de futuro universitario',
      'Evitar antecedentes permanentes',
      'Programas de diversión juvenil',
      'Impacto en ayuda financiera',
    ],
  },
  {
    title: 'DWI de Drogas (No Alcohol)',
    description:
      'Defensa contra cargos de conducir bajo influencia de drogas prescritas, ilegales, o marihuana.',
    features: [
      'Medicamentos prescritos legalmente',
      'Marihuana médica/recreacional',
      'Drogas ilegales',
      'Pruebas de sangre y orina',
      'Reconocimiento de experto en drogas',
      'Condiciones médicas subyacentes',
    ],
  },
  {
    title: 'Suspensión de Licencia y DMV',
    description:
      'Representación en audiencias administrativas para proteger y restaurar privilegios de conducir.',
    features: [
      'Audiencias de suspensión DMV',
      'Privilegios de trabajo limitados',
      'Privilegios de escuela/médicos',
      'Interruptor de ignición',
      'Restauración completa',
      'Licencias de otros estados',
    ],
  },
];

const faqs = [
  {
    question: '¿Debo rechazar el breathalyzer?',
    answer:
      'Esta es una decisión compleja. Rechazar resulta en suspensión automática de 1 año, pero puede eliminar evidencia clave contra usted. Cada situación es diferente - llámenos inmediatamente para consejo específico.',
  },
  {
    question: '¿Puedo conducir después de un arresto DWI?',
    answer:
      'Su licencia es confiscada en el arresto, pero puede solicitar audiencia DMV dentro de 10 días para privilegios limitados de conducir. No espere - estos plazos son estrictos.',
  },
  {
    question: '¿Cuánto cuesta una condena DWI?',
    answer:
      'Una primera condena DWI puede costar $10,000+ incluyendo multas, abogado, aumento de seguro, interruptor de ignición, y pérdida de trabajo. Luchamos para evitar estos costos.',
  },
  {
    question: '¿Afectará DWI mi trabajo o inmigración?',
    answer:
      'DWI puede resultar en pérdida de trabajo (especialmente conductores comerciales), problemas de licencias profesionales, y consecuencias migratorias severas incluyendo deportación.',
  },
  {
    question: '¿Puedo obtener mi DWI expungido?',
    answer:
      'En NC, los DWI generalmente NO son elegibles para expungement. Por eso es crucial luchar contra el cargo inicialmente - una condena queda permanentemente.',
  },
];

const content = (
  <>
    <h2 className="text-3xl font-bold mb-6">Defensa DWI/DUI Cuando Su Futuro Está en Juego</h2>

    <p className="mb-6">
      Un arresto DWI puede destruir su vida en cuestión de horas. Su licencia, trabajo, familia y
      libertad están inmediatamente en riesgo. Carolina del Norte tiene algunas de las leyes DWI más
      estrictas del país, con consecuencias que duran años. No enfrente esto solo - necesita
      abogados que conocen cada defensa disponible y lucharán incansablemente por su futuro.
    </p>

    <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-8 text-black">
      <p className="text-lg font-semibold mb-2">🚨 ACCIÓN CRÍTICA INMEDIATA</p>
      <p>
        Después de un arresto DWI, usted tiene SOLO 10 días para solicitar audiencia DMV para salvar
        su licencia. No pierda este plazo crítico.
        <strong> Llame AHORA: 1-844-YO-PELEO</strong>
      </p>
    </div>

    <h3 className="text-2xl font-bold mb-4">Cronología Crítica Post-Arresto</h3>

    <div className="space-y-4 mb-8">
      <div className="flex items-start">
        <div className="bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center mr-3 flex-shrink-0 text-xs">
          DÍA 1
        </div>
        <div>
          <h4 className="font-bold">Arresto y Confiscación de Licencia</h4>
          <p>Su licencia es confiscada inmediatamente. Recibe papel temporal por 30 días.</p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="bg-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center mr-3 flex-shrink-0 text-xs">
          DÍA 10
        </div>
        <div>
          <h4 className="font-bold">Plazo Final para Audiencia DMV</h4>
          <p>
            ÚLTIMO DÍA para solicitar audiencia. Si no actúa, su licencia es suspendida
            automáticamente.
          </p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="bg-yellow-600 text-white rounded-full w-12 h-12 flex items-center justify-center mr-3 flex-shrink-0 text-xs">
          DÍA 30
        </div>
        <div>
          <h4 className="font-bold">Papel Temporal Expira</h4>
          <p>Sin audiencia DMV exitosa, usted no puede conducir legalmente.</p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mr-3 flex-shrink-0 text-xs">
          30-60
        </div>
        <div>
          <h4 className="font-bold">Primera Comparecencia en Corte</h4>
          <p>Cargos formales presentados. Estrategia de defensa debe estar en marcha.</p>
        </div>
      </div>
    </div>

    <h3 className="text-2xl font-bold mb-4">Niveles de DWI en Carolina del Norte</h3>

    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white/10 p-6 rounded-lg">
        <h4 className="font-bold text-primary mb-3">Factores Agravantes (Hacen Peor)</h4>
        <ul className="space-y-2 text-sm">
          <li>• BAC 0.15 o mayor</li>
          <li>• Conducción especialmente imprudente</li>
          <li>• Niño menor de 18 en vehículo</li>
          <li>• Conducir con licencia revocada por DWI</li>
          <li>• DWI previo dentro de 7 años</li>
          <li>• Causar accidente</li>
        </ul>
      </div>
      <div className="bg-white/10 p-6 rounded-lg">
        <h4 className="font-bold text-primary mb-3">Factores Mitigantes (Hacen Mejor)</h4>
        <ul className="space-y-2 text-sm">
          <li>• BAC ligeramente sobre límite legal</li>
          <li>• Conducción segura (excepto deterioro)</li>
          <li>• Colaboración con oficial</li>
          <li>• Evaluación de abuso de sustancias voluntaria</li>
          <li>• Sin récord criminal previo</li>
          <li>• Remordimiento genuino mostrado</li>
        </ul>
      </div>
    </div>

    <h3 className="text-2xl font-bold mb-4">Penalidades Potenciales</h3>

    <div className="overflow-x-auto">
      <table className="w-full bg-white/5 rounded-lg overflow-hidden">
        <thead className="bg-primary text-black">
          <tr>
            <th className="p-3 text-left">Ofensa</th>
            <th className="p-3 text-left">Tiempo Cárcel</th>
            <th className="p-3 text-left">Multa</th>
            <th className="p-3 text-left">Suspensión</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-white/10">
            <td className="p-3">Primera DWI</td>
            <td className="p-3">24 horas - 2 años</td>
            <td className="p-3">Hasta $4,000</td>
            <td className="p-3">1 año</td>
          </tr>
          <tr className="border-b border-white/10">
            <td className="p-3">DWI con BAC 0.15+</td>
            <td className="p-3">Mínimo 1 día</td>
            <td className="p-3">Hasta $4,000</td>
            <td className="p-3">1 año + interruptor</td>
          </tr>
          <tr className="border-b border-white/10">
            <td className="p-3">Segunda DWI</td>
            <td className="p-3">Mínimo 7 días</td>
            <td className="p-3">Hasta $4,000</td>
            <td className="p-3">4 años</td>
          </tr>
          <tr>
            <td className="p-3">Tercera DWI+</td>
            <td className="p-3">Mínimo 30 días</td>
            <td className="p-3">Hasta $10,000</td>
            <td className="p-3">Permanente</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3 className="text-2xl font-bold mb-4 mt-8">Nuestras Estrategias de Defensa</h3>

    <div className="grid md:grid-cols-3 gap-4 mb-8">
      <div className="text-center bg-black/20 p-4 rounded-lg">
        <div className="text-xl font-bold text-primary mb-2">Parada Ilegal</div>
        <div className="text-sm">Sin causa probable para la parada inicial</div>
      </div>
      <div className="text-center bg-black/20 p-4 rounded-lg">
        <div className="text-xl font-bold text-primary mb-2">Pruebas Defectuosas</div>
        <div className="text-sm">Equipos mal calibrados o procedimientos incorrectos</div>
      </div>
      <div className="text-center bg-black/20 p-4 rounded-lg">
        <div className="text-xl font-bold text-primary mb-2">Condiciones Médicas</div>
        <div className="text-sm">Diabetes, GERD, otros que afectan pruebas</div>
      </div>
    </div>

    <h3 className="text-2xl font-bold mb-4">Casos Relacionados de Defensa Criminal</h3>

    <div className="grid md:grid-cols-2 gap-4 mb-8">
      <Link
        href="/es/areas-de-practica/defensa-criminal"
        className="block p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
      >
        <h4 className="font-bold text-primary mb-2">Defensa Criminal General →</h4>
        <p className="text-sm">Todos los servicios de defensa criminal</p>
      </Link>
      <Link
        href="/es/areas-de-practica/defensa-criminal/violacion-de-libertad-condicional"
        className="block p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
      >
        <h4 className="font-bold text-primary mb-2">Violación de Probatoria →</h4>
        <p className="text-sm">Si ya está en probatoria</p>
      </Link>
    </div>
  </>
);

export default function DuiDwiPage() {
  return (
    <ModernPracticeAreaTemplate
      title="Abogados DUI/DWI de Carolina del Norte"
      subtitle="Protegiendo Su Licencia, Libertad y Futuro 24/7"
      description="Cuando enfrente cargos DWI, cada minuto cuenta. Nuestros abogados especialistas luchan agresivamente para proteger su licencia, evitar cárcel, y preservar su futuro."
      services={services}
      faqs={faqs}
      content={content}
    />
  );
}
