import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Link from 'next/link';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Abogados de Lesiones Personales en NC | Sin Cargo si No Ganamos | YO PELEO POR TI™',
  description:
    'Compensación máxima para víctimas de accidentes. Accidentes de auto, resbalones, negligencia médica. Sin honorarios hasta ganar. Consulta GRATIS: 1-844-YO-PELEO.',
  keywords:
    'abogado lesiones personales NC, personal injury lawyer Raleigh, car accident attorney Charlotte, slip fall lawyer Durham, wrongful death NC',
  openGraph: {
    title: 'Abogados de Lesiones Personales - Vasquez Law Firm | Carolina del Norte',
    description:
      'Luchamos por la compensación máxima para víctimas de accidentes. No cobramos hasta ganar su caso.',
    images: [{ url: '/images/personal-injury-attorney.jpg', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/practice-areas/personal-injury',
      'es-ES': 'https://www.vasquezlawnc.com/es/areas-de-practica/lesiones-personales',
    },
  },
};

const services = [
  {
    title: 'Accidentes de Auto',
    description:
      'Compensación completa para víctimas de choques, desde lesiones menores hasta casos catastróficos.',
    features: [
      'Choques frontales y traseros',
      'Accidentes T-bone',
      'Conductores sin seguro',
      'Hit and run',
      'Conductores ebrios',
      'Accidentes fatales',
    ],
  },
  {
    title: 'Accidentes de Camión',
    description:
      'Casos complejos contra compañías de transporte con lesiones graves y múltiples responsables.',
    features: [
      'Camiones 18 ruedas',
      'Violaciones DOT',
      'Fatiga del conductor',
      'Carga insegura',
      'Mantenimiento negligente',
      'Investigación de caja negra',
    ],
  },
  {
    title: 'Resbalones y Caídas',
    description:
      'Responsabilidad de propietarios por condiciones peligrosas que causan lesiones graves.',
    features: [
      'Pisos mojados sin aviso',
      'Escaleras defectuosas',
      'Iluminación inadecuada',
      'Aceras rotas',
      'Negligencia de tiendas',
      'Caídas en construcción',
    ],
  },
  {
    title: 'Negligencia Médica',
    description:
      'Errores médicos que causan daño permanente o muerte requieren expertos especializados.',
    features: [
      'Diagnóstico erróneo',
      'Errores quirúrgicos',
      'Medicación incorrecta',
      'Lesiones de parto',
      'Falta de tratamiento',
      'Infección hospitalaria',
    ],
  },
  {
    title: 'Mordidas de Perro',
    description:
      'Responsabilidad estricta de dueños por ataques que causan trauma físico y emocional.',
    features: [
      'Ataques no provocados',
      'Razas peligrosas',
      'Perros sin correa',
      'Historial de agresión',
      'Trauma infantil',
      'Cirugía reconstructiva',
    ],
  },
  {
    title: 'Productos Defectuosos',
    description: 'Demandas contra fabricantes por productos peligrosos que causan lesiones.',
    features: [
      'Defectos de diseño',
      'Fallas de fabricación',
      'Advertencias inadecuadas',
      'Recalls ignorados',
      'Medicamentos peligrosos',
      'Dispositivos médicos',
    ],
  },
  {
    title: 'Muerte Injusta',
    description:
      'Justicia y compensación para familias que perdieron seres queridos por negligencia.',
    features: [
      'Pérdida de ingresos',
      'Gastos funerarios',
      'Pérdida de compañía',
      'Dolor y sufrimiento',
      'Daños punitivos',
      'Beneficiarios múltiples',
    ],
  },
  {
    title: 'Lesiones Laborales',
    description: 'Accidentes en el trabajo que van más allá de compensación laboral estándar.',
    features: [
      'Caídas de altura',
      'Maquinaria peligrosa',
      'Exposición química',
      'Accidentes de construcción',
      'Terceros responsables',
      'OSHA violaciones',
    ],
  },
  {
    title: 'Accidentes de Motocicleta',
    description:
      'Representación agresiva para motociclistas que enfrentan prejuicios y lesiones severas.',
    features: [
      'Conductores que no ven',
      'Giros a la izquierda',
      'Condiciones de carretera',
      'Equipo defectuoso',
      'Lesiones de camino',
      'Daño cerebral traumático',
    ],
  },
];

const faqs = [
  {
    question: '¿Cuánto vale mi caso de lesiones personales?',
    answer:
      'El valor depende de múltiples factores: gravedad de lesiones, gastos médicos actuales y futuros, salarios perdidos, dolor y sufrimiento, y el impacto en su calidad de vida. Casos con lesiones permanentes o discapacidad valen significativamente más. Ofrecemos evaluación gratuita para estimar el valor real de su caso.',
  },
  {
    question: '¿Qué significa "No Cobramos si No Ganamos"?',
    answer:
      'Trabajamos por contingencia - solo cobramos honorarios si ganamos su caso. Usted no paga nada por adelantado. Nosotros cubrimos todos los costos del caso (expertos, investigación, corte) y solo recuperamos si ganamos. Si no hay recuperación, no debe nada.',
  },
  {
    question: '¿Cuánto tiempo tengo para presentar una demanda?',
    answer:
      'En Carolina del Norte, generalmente tiene 3 años desde el accidente para lesiones personales, pero hay excepciones importantes. Casos contra el gobierno tienen plazos más cortos (6 meses a 1 año). Muerte injusta tiene 2 años. No espere - evidencia se pierde y testigos olvidan.',
  },
  {
    question: '¿Qué debo hacer inmediatamente después de un accidente?',
    answer:
      'Primero, busque atención médica inmediata - su salud es prioridad. Documente todo: fotos, testigos, reporte policial. NO admita culpa ni hable con aseguradoras sin abogado. Guarde toda evidencia. Contáctenos antes de dar declaraciones o firmar documentos.',
  },
  {
    question: '¿Puedo demandar si tuve culpa parcial?',
    answer:
      'Sí. Carolina del Norte usa "negligencia contributiva" - si tuvo CUALQUIER culpa (incluso 1%), puede perder el derecho a compensación. Sin embargo, hay excepciones importantes como "last clear chance" y "negligencia grave". Un abogado experto puede encontrar formas de recuperar a pesar de culpa parcial.',
  },
];

const content = (
  <>
    <h2 className="text-3xl font-bold mb-6">
      Luchamos Por La Compensación Máxima Que Usted Merece
    </h2>

    <p className="mb-6">
      Cuando sufre lesiones por culpa de otro, enfrenta dolor físico, estrés emocional, y cargas
      financieras que no merece. En Vasquez Law Firm, entendemos que ningún cheque puede borrar su
      sufrimiento, pero la compensación justa puede ayudarle a reconstruir su vida. Con décadas de
      experiencia y millones recuperados para nuestros clientes, sabemos cómo maximizar su
      compensación.
    </p>

    <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-8 text-black">
      <p className="text-lg font-semibold mb-2">✓ No Cobramos Hasta Que Ganemos</p>
      <p>
        Trabajamos 100% por contingencia. No paga consultas, no paga por adelantado, no paga costos
        del caso. Solo cobramos si ganamos. Sin riesgos para usted. Consulta GRATIS:{' '}
        <strong>1-844-YO-PELEO</strong>
      </p>
    </div>

    <h3 className="text-2xl font-bold mb-4">Lo Que Podemos Recuperar Para Usted</h3>

    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white/10 p-6 rounded-lg">
        <h4 className="font-bold text-primary mb-3">Daños Económicos</h4>
        <ul className="space-y-2 text-sm">
          <li>• Gastos médicos completos</li>
          <li>• Tratamiento futuro</li>
          <li>• Salarios perdidos</li>
          <li>• Pérdida de capacidad laboral</li>
          <li>• Modificaciones al hogar</li>
          <li>• Cuidado a largo plazo</li>
        </ul>
      </div>
      <div className="bg-white/10 p-6 rounded-lg">
        <h4 className="font-bold text-primary mb-3">Daños No-Económicos</h4>
        <ul className="space-y-2 text-sm">
          <li>• Dolor y sufrimiento</li>
          <li>• Angustia emocional</li>
          <li>• Pérdida de disfrute de vida</li>
          <li>• Desfiguración/cicatrices</li>
          <li>• Pérdida de consorcio</li>
          <li>• Daños punitivos</li>
        </ul>
      </div>
    </div>

    <h3 className="text-2xl font-bold mb-4">Nuestro Proceso Comprobado</h3>

    <div className="space-y-4 mb-8">
      <div className="flex items-start">
        <div className="bg-primary text-black rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
          1
        </div>
        <div>
          <h4 className="font-bold">Investigación Inmediata</h4>
          <p>
            Preservamos evidencia, entrevistamos testigos, y documentamos la escena antes de que
            desaparezca.
          </p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="bg-primary text-black rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
          2
        </div>
        <div>
          <h4 className="font-bold">Construcción del Caso</h4>
          <p>
            Trabajamos con expertos médicos, de accidentes, y económicos para probar responsabilidad
            y daños.
          </p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="bg-primary text-black rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
          3
        </div>
        <div>
          <h4 className="font-bold">Negociación Agresiva</h4>
          <p>
            Peleamos con aseguradoras que quieren pagar centavos. Conocemos sus trucos y no nos
            intimidamos.
          </p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="bg-primary text-black rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
          4
        </div>
        <div>
          <h4 className="font-bold">Juicio si Necesario</h4>
          <p>
            Si no ofrecen compensación justa, vamos a juicio. Las aseguradoras saben que no tenemos
            miedo.
          </p>
        </div>
      </div>
    </div>

    <h3 className="text-2xl font-bold mb-4">Por Qué El Tiempo Es Crítico</h3>

    <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-8 text-black">
      <ul className="space-y-2">
        <li>
          • <strong>Evidencia desaparece:</strong> Videos se borran, marcas de llantas se desvanecen
        </li>
        <li>
          • <strong>Testigos olvidan:</strong> Memorias se desvanecen, testigos se mudan
        </li>
        <li>
          • <strong>Aseguradoras trabajan contra usted:</strong> Ya están construyendo su defensa
        </li>
        <li>
          • <strong>Plazos legales:</strong> Perder el plazo significa perder su derecho para
          siempre
        </li>
      </ul>
    </div>

    <h3 className="text-2xl font-bold mb-4">Resultados Que Hablan</h3>

    <div className="grid md:grid-cols-3 gap-4 mb-8">
      <div className="text-center bg-black/20 p-4 rounded-lg">
        <div className="text-3xl font-bold text-primary mb-2">$25M+</div>
        <div className="text-sm">Recuperado para Clientes</div>
      </div>
      <div className="text-center bg-black/20 p-4 rounded-lg">
        <div className="text-3xl font-bold text-primary mb-2">1000+</div>
        <div className="text-sm">Casos Ganados</div>
      </div>
      <div className="text-center bg-black/20 p-4 rounded-lg">
        <div className="text-3xl font-bold text-primary mb-2">98%</div>
        <div className="text-sm">Clientes Satisfechos</div>
      </div>
    </div>

    <h3 className="text-2xl font-bold mb-4">Tipos Específicos de Casos</h3>

    <div className="grid md:grid-cols-2 gap-4 mb-8">
      <Link
        href="/es/areas-de-practica/lesiones-personales/accidentes-auto"
        className="block p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
      >
        <h4 className="font-bold text-primary mb-2">Accidentes de Auto →</h4>
        <p className="text-sm">Compensación completa por choques y colisiones</p>
      </Link>
      <Link
        href="/es/areas-de-practica/lesiones-personales/resbalones-caidas"
        className="block p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
      >
        <h4 className="font-bold text-primary mb-2">Resbalones y Caídas →</h4>
        <p className="text-sm">Responsabilidad de propietarios negligentes</p>
      </Link>
    </div>
  </>
);

export default function LesionesPersonalesPage() {
  return (
    <ModernPracticeAreaTemplate
      title="Abogados de Lesiones Personales"
      subtitle="No Cobramos Hasta Que Ganemos Su Caso"
      description="Luchamos agresivamente por la compensación máxima para víctimas de accidentes. Millones recuperados. Consulta gratuita. Disponibles 24/7."
      services={services}
      faqs={faqs}
      content={content}
    />
  );
}
