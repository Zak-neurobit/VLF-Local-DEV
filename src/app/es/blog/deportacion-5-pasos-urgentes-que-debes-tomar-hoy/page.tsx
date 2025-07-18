import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Deportación: 5 Pasos Urgentes que Debes Tomar HOY | YO PELEO POR TI™',
  description:
    'EMERGENCIA: Pasos urgentes contra deportación. Abogado veterano en NC/FL con estrategias militares. YO PELEO POR TI™. Llama 1-844-YO-PELEO',
  keywords:
    'deportación, inmigración emergencia, ICE, abogado deportación NC FL, YO PELEO POR TI, defensa inmigración',
  openGraph: {
    title: 'Deportación: 5 Pasos Urgentes que Debes Tomar HOY',
    description:
      'Estrategias militares de emergencia contra deportación. Veterano abogado te defiende ahora.',
    type: 'article',
    locale: 'es_US',
  },
};

export const runtime = 'nodejs';

export default function Deportacion5PasosUrgentesQueDebesTomarHoyPage() {
  const post = {
    id: 'deportacion-5-pasos-urgentes-que-debes-tomar-hoy',
    title: 'Deportación: 5 Pasos Urgentes que Debes Tomar HOY',
    slug: 'deportacion-5-pasos-urgentes-que-debes-tomar-hoy',
    excerpt:
      'Guía de emergencia militar para enfrentar la deportación. Cada minuto cuenta. Estrategias probadas de abogado veterano que YO PELEO POR TI™.',
    content: `
      <div class="prose prose-lg max-w-none">
        <div class="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
          <h2 class="text-2xl font-bold text-red-900 mb-4">🚨 ALERTA MÁXIMA: ACTÚA AHORA O PIERDE TODO</h2>
          <p class="text-red-800 mb-4">
            Si ICE está en tu puerta, si recibiste una orden de deportación, o si tu familiar fue detenido, 
            los próximos pasos pueden salvar tu vida en Estados Unidos. Esta es tu guía de supervivencia legal.
          </p>
          <div class="bg-red-100 p-4 rounded-lg">
            <p class="font-bold text-red-900">⚡ EMERGENCIA INMEDIATA:</p>
            <p class="text-red-800">Llama YA: <a href="tel:1-844-965-3536" class="font-bold underline">1-844-YO-PELEO</a></p>
            <p class="text-red-800">Respuesta 24/7 - Tu guerrero legal está listo</p>
          </div>
        </div>

        <h2 class="text-3xl font-bold text-gray-900 mb-6">Los 5 Pasos Militares Contra la Deportación</h2>

        <div class="bg-blue-50 p-6 rounded-lg mb-8">
          <h3 class="text-2xl font-bold text-blue-900 mb-4">Paso 1: SILENCIO ABSOLUTO - Tu Derecho Más Poderoso</h3>
          <p class="mb-4 font-bold">NO HABLES. Cada palabra puede ser una bala contra ti.</p>
          <ul class="list-disc pl-6 space-y-2 text-gray-800">
            <li><strong>Di SOLO esto:</strong> "Invoco mi derecho a permanecer en silencio. Quiero hablar con mi abogado."</li>
            <li><strong>NO firmes NADA</strong> - Ni en inglés ni en español</li>
            <li><strong>NO abras la puerta</strong> sin una orden judicial</li>
            <li><strong>NO mientas</strong> - El silencio es legal, mentir es un crimen</li>
            <li><strong>NO muestres documentos falsos</strong> - Empeora tu situación</li>
          </ul>
          <div class="mt-4 p-4 bg-blue-100 rounded">
            <p class="font-bold">🛡️ ESCUDO LEGAL:</p>
            <p>La Quinta Enmienda te protege. Úsala. Como veterano, defendí estos derechos. Ahora los uso para defenderte.</p>
          </div>
        </div>

        <div class="bg-green-50 p-6 rounded-lg mb-8">
          <h3 class="text-2xl font-bold text-green-900 mb-4">Paso 2: ACTIVA TU RED DE EMERGENCIA (Primeras 2 Horas)</h3>
          <p class="mb-4">El tiempo es tu enemigo. Muévete RÁPIDO:</p>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-green-100 p-4 rounded">
              <h4 class="font-bold mb-2">📱 Llamadas Críticas:</h4>
              <ol class="list-decimal pl-5 space-y-1">
                <li>Tu abogado de inmigración</li>
                <li>Familiar de confianza (ciudadano/residente)</li>
                <li>Tu empleador (si tienes permiso)</li>
                <li>Consulado de tu país</li>
              </ol>
            </div>
            <div class="bg-green-100 p-4 rounded">
              <h4 class="font-bold mb-2">📄 Documentos Vitales:</h4>
              <ul class="list-disc pl-5 space-y-1">
                <li>Pasaportes de todos</li>
                <li>Actas de nacimiento</li>
                <li>Pruebas de residencia</li>
                <li>Récords médicos importantes</li>
                <li>Evidencia de "buen carácter moral"</li>
              </ul>
            </div>
          </div>
          <div class="mt-4 p-4 bg-yellow-100 rounded">
            <p class="font-bold">⚠️ PLAN B:</p>
            <p>Ten una carpeta de emergencia con copias de TODO. Déjala con alguien de confianza AHORA.</p>
          </div>
        </div>

        <div class="bg-purple-50 p-6 rounded-lg mb-8">
          <h3 class="text-2xl font-bold text-purple-900 mb-4">Paso 3: CONOCE TU SITUACIÓN EXACTA (Día 1)</h3>
          <p class="mb-4">No todos los casos son iguales. Identifica tu batalla:</p>
          
          <div class="space-y-4">
            <div class="bg-purple-100 p-4 rounded">
              <h4 class="font-bold">Si tienes una ORDEN DE DEPORTACIÓN:</h4>
              <ul class="list-disc pl-5 mt-2">
                <li>Verifica si es "in absentia" (sin tu presencia)</li>
                <li>Busca la fecha límite para apelar</li>
                <li>NO te presentes sin abogado</li>
              </ul>
            </div>
            
            <div class="bg-purple-100 p-4 rounded">
              <h4 class="font-bold">Si estás DETENIDO por ICE:</h4>
              <ul class="list-disc pl-5 mt-2">
                <li>Tienes derecho a llamada telefónica</li>
                <li>Pide lista de abogados gratuitos</li>
                <li>Solicita audiencia de fianza</li>
              </ul>
            </div>
            
            <div class="bg-purple-100 p-4 rounded">
              <h4 class="font-bold">Si recibes NOTIFICACIÓN DE CORTE:</h4>
              <ul class="list-disc pl-5 mt-2">
                <li>NUNCA faltes - automática deportación</li>
                <li>Pide tiempo para conseguir abogado</li>
                <li>Solicita intérprete si lo necesitas</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-orange-50 p-6 rounded-lg mb-8">
          <h3 class="text-2xl font-bold text-orange-900 mb-4">Paso 4: CONSTRUYE TU DEFENSA (Días 1-7)</h3>
          <p class="mb-4">Cada caso tiene una estrategia. Estas son tus armas legales:</p>
          
          <div class="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 class="font-bold mb-2">⚔️ Defensas Poderosas:</h4>
              <ul class="list-disc pl-5 space-y-1">
                <li><strong>Asilo:</strong> Si temes persecución</li>
                <li><strong>Cancelación:</strong> 10+ años aquí</li>
                <li><strong>Ajuste:</strong> Familiar ciudadano</li>
                <li><strong>VAWA:</strong> Víctima de violencia</li>
                <li><strong>Visa U:</strong> Víctima de crimen</li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold mb-2">📊 Evidencia Ganadora:</h4>
              <ul class="list-disc pl-5 space-y-1">
                <li>Taxes pagados (todos los años)</li>
                <li>Hijos ciudadanos (actas)</li>
                <li>Propiedades/negocios</li>
                <li>Servicio comunitario</li>
                <li>Récord limpio</li>
              </ul>
            </div>
          </div>
          
          <div class="bg-orange-100 p-4 rounded">
            <p class="font-bold">💡 SECRETO DE VETERANO:</p>
            <p>La preparación gana batallas. Documenta TODO. Una foto de tu hijo en la escuela puede salvarte.</p>
          </div>
        </div>

        <div class="bg-gray-800 text-white p-6 rounded-lg mb-8">
          <h3 class="text-2xl font-bold mb-4">Paso 5: GUERRA TOTAL - Pelea Cada Batalla</h3>
          <p class="mb-4">No te rindas. NUNCA. Aquí está tu plan de guerra:</p>
          
          <div class="space-y-3">
            <div class="flex items-start">
              <span class="text-yellow-400 font-bold mr-3">→</span>
              <div>
                <strong>Audiencia Maestro:</strong> Primera batalla. Pide tiempo, niega cargos.
              </div>
            </div>
            <div class="flex items-start">
              <span class="text-yellow-400 font-bold mr-3">→</span>
              <div>
                <strong>Audiencia Individual:</strong> Tu día en corte. Presenta TODA evidencia.
              </div>
            </div>
            <div class="flex items-start">
              <span class="text-yellow-400 font-bold mr-3">→</span>
              <div>
                <strong>Apelación BIA:</strong> Si pierdes, 30 días para apelar.
              </div>
            </div>
            <div class="flex items-start">
              <span class="text-yellow-400 font-bold mr-3">→</span>
              <div>
                <strong>Corte Federal:</strong> Última línea de defensa.
              </div>
            </div>
          </div>
          
          <div class="bg-yellow-400 text-gray-900 p-4 rounded mt-6">
            <p class="font-bold text-xl text-center">⚔️ YO PELEO POR TI™</p>
            <p class="text-center">Cada batalla, cada apelación, hasta el final.</p>
          </div>
        </div>

        <h2 class="text-3xl font-bold text-gray-900 mb-6">Tus Derechos Sagrados (Memorízalos)</h2>

        <div class="bg-blue-50 border-2 border-blue-500 p-6 rounded-lg mb-8">
          <h3 class="text-2xl font-bold text-blue-900 mb-4">🛡️ Derechos Que ICE No Quiere Que Conozcas</h3>
          <ul class="list-disc pl-6 space-y-3 text-gray-800">
            <li><strong>Derecho al SILENCIO:</strong> No tienes que responder preguntas sobre tu estatus</li>
            <li><strong>Derecho a NO FIRMAR:</strong> Especialmente "salida voluntaria"</li>
            <li><strong>Derecho a ABOGADO:</strong> En la corte (no pagado, pero permitido)</li>
            <li><strong>Derecho a INTÉRPRETE:</strong> En procedimientos oficiales</li>
            <li><strong>Derecho a APELAR:</strong> Casi todas las decisiones</li>
            <li><strong>Derecho a FIANZA:</strong> En muchos casos (no todos)</li>
            <li><strong>Derecho a LLAMADA:</strong> Si te detienen</li>
          </ul>
        </div>

        <h2 class="text-3xl font-bold text-gray-900 mb-6">Emergencias Específicas: Qué Hacer AHORA</h2>

        <div class="space-y-6 mb-8">
          <div class="bg-red-50 p-6 rounded-lg">
            <h3 class="font-bold text-xl text-red-900 mb-3">🚪 "ICE está en mi puerta AHORA"</h3>
            <ol class="list-decimal pl-6 space-y-2">
              <li>NO abras - habla a través de la puerta</li>
              <li>Pregunta: "¿Tienen orden judicial firmada por un juez?"</li>
              <li>Si dicen NO: "No pueden entrar. Por favor váyanse."</li>
              <li>Si dicen SÍ: "Muéstrenla por la ventana"</li>
              <li>Verifica: Debe tener tu nombre y dirección correctos</li>
              <li>Llama a tu abogado INMEDIATAMENTE</li>
            </ol>
          </div>

          <div class="bg-yellow-50 p-6 rounded-lg">
            <h3 class="font-bold text-xl text-yellow-900 mb-3">📱 "Detuvieron a mi familiar"</h3>
            <ol class="list-decimal pl-6 space-y-2">
              <li>Localízalo: ICE Detention Locator online</li>
              <li>Anota: A# (Alien number) - crítico</li>
              <li>NO envíes dinero a desconocidos</li>
              <li>Contacta abogado antes de visitarlo</li>
              <li>Prepara poder notarial para sus asuntos</li>
            </ol>
          </div>

          <div class="bg-green-50 p-6 rounded-lg">
            <h3 class="font-bold text-xl text-green-900 mb-3">📄 "Recibí carta de inmigración"</h3>
            <ol class="list-decimal pl-6 space-y-2">
              <li>NO la ignores - tiene fecha límite</li>
              <li>Fotografía TODO el documento</li>
              <li>Busca: Fecha, lugar, tipo de audiencia</li>
              <li>Confirma cambio de dirección con EOIR</li>
              <li>Abogado debe responder en 10-30 días</li>
            </ol>
          </div>
        </div>

        <h2 class="text-3xl font-bold text-gray-900 mb-6">El Costo de NO Actuar</h2>

        <div class="bg-gray-100 p-6 rounded-lg mb-8">
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h3 class="font-bold text-xl mb-3 text-red-800">❌ Sin Abogado:</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>90% pierden su caso</li>
                <li>Firman su propia deportación</li>
                <li>Prohibidos 10+ años</li>
                <li>Familia destruida</li>
                <li>Pierden todo lo construido</li>
              </ul>
            </div>
            <div>
              <h3 class="font-bold text-xl mb-3 text-green-800">✅ Con Guerrero Legal:</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>5x más probabilidad de ganar</li>
                <li>Conocen TODAS las defensas</li>
                <li>Pelean cada detalle</li>
                <li>Protegen a tu familia</li>
                <li>Buscan residencia permanente</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-gray-900 text-white p-8 rounded-lg mb-8">
          <h2 class="text-3xl font-bold mb-4 text-center">Tu Momento de Verdad</h2>
          <p class="text-xl mb-6 text-center">
            Como veterano que arriesgó su vida por este país, ahora uso esa misma 
            determinación para defender TU derecho a quedarte aquí.
          </p>
          
          <div class="bg-gray-800 p-6 rounded-lg mb-6">
            <h3 class="text-2xl font-bold mb-4 text-yellow-400">Por Qué YO PELEO POR TI™:</h3>
            <ul class="list-disc pl-6 space-y-2 text-lg">
              <li>Veterano militar - Sé luchar cuando todo está en contra</li>
              <li>15+ años defendiendo inmigrantes como tú</li>
              <li>Conozco el dolor de la separación familiar</li>
              <li>Hablo tu idioma y entiendo tu miedo</li>
              <li>NO me rindo hasta ganar</li>
            </ul>
          </div>
          
          <div class="bg-yellow-400 text-gray-900 p-6 rounded-lg text-center">
            <p class="text-2xl font-bold mb-2">⚔️ CONSULTA DE EMERGENCIA GRATIS</p>
            <p class="text-xl mb-4">No esperes a que sea tarde. Cada hora cuenta.</p>
            <p class="text-3xl font-bold">
              <a href="tel:1-844-965-3536" class="hover:underline">1-844-YO-PELEO</a>
            </p>
            <p class="text-lg mt-2">(1-844-965-3536)</p>
            <p class="mt-4 font-bold">24/7 • Hablamos Español • Pago Después de Ganar</p>
          </div>
        </div>

        <div class="bg-blue-50 border-l-4 border-blue-500 p-6">
          <h3 class="font-bold text-lg mb-2">Nota Legal Importante</h3>
          <p class="text-sm text-gray-700">
            Esta información es educativa y no constituye consejo legal específico. Las leyes de 
            inmigración cambian constantemente. Cada caso es único y requiere análisis individual 
            por un abogado licenciado. No tomes decisiones basadas solo en esta guía. La 
            contratación de un abogado es una decisión importante. Resultados pasados no 
            garantizan resultados futuros.
          </p>
        </div>
      </div>
    `,
    practiceArea: 'immigration' as const,
    language: 'es' as const,
    publishedAt: new Date(),
    readTime: 12,
    author: DEFAULT_BLOG_AUTHOR,
    tags: ['deportación', 'inmigración', 'ICE', 'emergencia', 'derechos'],
  };

  const categories = [
    {
      id: 'immigration',
      name: { en: 'Immigration Law', es: 'Ley de Inmigración' },
      slug: { en: 'immigration', es: 'inmigracion' },
      icon: '🌐',
      postCount: 45,
    },
    {
      id: 'personal-injury',
      name: { en: 'Personal Injury', es: 'Lesiones Personales' },
      slug: { en: 'personal-injury', es: 'lesiones-personales' },
      icon: '🏥',
      postCount: 32,
    },
    {
      id: 'criminal-defense',
      name: { en: 'Criminal Defense', es: 'Defensa Criminal' },
      slug: { en: 'criminal-defense', es: 'defensa-criminal' },
      icon: '⚖️',
      postCount: 28,
    },
  ];

  const relatedPosts = [
    {
      id: 'guia-completa-residencia-permanente-2024',
      title: 'Guía Completa de Residencia Permanente 2024',
      slug: 'guia-completa-residencia-permanente-2024',
      excerpt: 'Todo lo que necesitas saber sobre el proceso de residencia permanente en 2024.',
      content: '',
      practiceArea: 'immigration' as const,
      language: 'es' as const,
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      readTime: 15,
      author: DEFAULT_BLOG_AUTHOR,
      tags: ['residencia', 'green card', 'inmigración'],
    },
    {
      id: 'daca-todo-lo-que-necesitas-saber-2024',
      title: 'DACA: Todo lo que Necesitas Saber en 2024',
      slug: 'daca-todo-lo-que-necesitas-saber-2024',
      excerpt: 'Guía completa sobre DACA: requisitos, renovación y cambios en 2024.',
      content: '',
      practiceArea: 'immigration' as const,
      language: 'es' as const,
      publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      readTime: 12,
      author: DEFAULT_BLOG_AUTHOR,
      tags: ['DACA', 'dreamers', 'inmigración'],
    },
  ];

  return (
    <BlogPageTemplate
      posts={[]}
      categories={categories}
      isArticlePage={true}
      currentPost={post}
      relatedPosts={relatedPosts}
    />
  );
}
