import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Accidentes de Auto: Qué Hacer Inmediatamente Después | YO PELEO POR TI™',
  description:
    'Guía urgente paso a paso después de un accidente. Protege tus derechos ahora. Abogado veterano en NC/FL. YO PELEO POR TI™. Llama 1-844-YO-PELEO',
  keywords:
    'accidente auto, que hacer accidente, abogado accidentes NC FL, compensación accidente, YO PELEO POR TI',
  openGraph: {
    title: 'Accidentes de Auto: Qué Hacer Inmediatamente Después',
    description:
      'Protege tus derechos después de un accidente. Guía urgente de abogado veterano. Llama ahora para ayuda inmediata.',
    type: 'article',
    locale: 'es_US',
  },
};

export const runtime = 'nodejs';

export default function AccidentesAutoQueHacerInmediatamenteDespuesPage() {
  const post = {
    id: 'accidentes-auto-que-hacer-inmediatamente-despues',
    title: 'Accidentes de Auto: Qué Hacer Inmediatamente Después',
    slug: 'accidentes-auto-que-hacer-inmediatamente-despues',
    excerpt: 'Guía completa de emergencia con los pasos críticos que debes tomar inmediatamente después de un accidente automovilístico para proteger tu salud, tus derechos y tu compensación.',
    content: `
      <div class="prose prose-lg max-w-none">
        <div class="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
          <h2 class="text-2xl font-bold text-red-900 mb-4">⚠️ EMERGENCIA: Primeros 30 Minutos Son CRÍTICOS</h2>
          <p class="text-red-800 mb-4">
            Lo que hagas en los primeros minutos después de tu accidente puede determinar si recibes 
            compensación justa o NADA. Esta guía militar te protege paso a paso.
          </p>
          <div class="bg-red-100 p-4 rounded-lg">
            <p class="font-bold text-red-900">🚨 Si estás leyendo esto desde la escena del accidente:</p>
            <p class="text-red-800">Llama AHORA: <a href="tel:1-844-965-3536" class="font-bold underline">1-844-YO-PELEO</a></p>
            <p class="text-red-800">Respuesta inmediata 24/7 - Hablamos español</p>
          </div>
        </div>

        <h2 class="text-3xl font-bold text-gray-900 mb-6">Los 7 Pasos Militares Después del Accidente</h2>

        <div class="bg-blue-50 p-6 rounded-lg mb-8">
          <h3 class="text-2xl font-bold text-blue-900 mb-4">Paso 1: SEGURIDAD PRIMERO (Primeros 60 Segundos)</h3>
          <ul class="list-disc pl-6 space-y-2 text-gray-800">
            <li><strong>DETENTE:</strong> No abandones la escena - es un delito</li>
            <li><strong>ENCIENDE:</strong> Las luces de emergencia inmediatamente</li>
            <li><strong>EVALÚA:</strong> ¿Hay heridos graves? ¿Puedes moverte?</li>
            <li><strong>MUÉVETE:</strong> Si es posible y seguro, sal del tráfico</li>
            <li><strong>MARCA 911:</strong> Si hay heridos o daños significativos</li>
          </ul>
          <div class="mt-4 p-4 bg-blue-100 rounded">
            <p class="font-bold">⚡ ACCIÓN MILITAR: "Secure the perimeter"</p>
            <p>Como veterano, sé que la seguridad es lo primero. Protege la vida antes que nada.</p>
          </div>
        </div>

        <div class="bg-green-50 p-6 rounded-lg mb-8">
          <h3 class="text-2xl font-bold text-green-900 mb-4">Paso 2: DOCUMENTA TODO (Minutos 2-10)</h3>
          <p class="mb-4">Tu teléfono es tu mejor arma legal. Úsalo AHORA:</p>
          <ul class="list-disc pl-6 space-y-2 text-gray-800">
            <li><strong>FOTOGRAFÍA:</strong> 
              <ul class="list-circle pl-6 mt-2">
                <li>Todos los vehículos desde múltiples ángulos</li>
                <li>Placas de todos los carros</li>
                <li>Daños en detalle (zoom in)</li>
                <li>Marcas de frenado en el pavimento</li>
                <li>Señales de tráfico y semáforos</li>
                <li>Condiciones del clima y la carretera</li>
              </ul>
            </li>
            <li><strong>VIDEO:</strong> Graba un video de 360° de toda la escena</li>
            <li><strong>TESTIGOS:</strong> Obtén nombres y números de teléfono</li>
          </ul>
          <div class="mt-4 p-4 bg-green-100 rounded">
            <p class="font-bold">📸 CONSEJO PRO: Activa la ubicación en tu cámara</p>
            <p>Esto prueba exactamente dónde y cuándo ocurrió el accidente.</p>
          </div>
        </div>

        <div class="bg-yellow-50 p-6 rounded-lg mb-8">
          <h3 class="text-2xl font-bold text-yellow-900 mb-4">Paso 3: INTERCAMBIA INFORMACIÓN (Minutos 10-15)</h3>
          <p class="mb-4">Obtén TODA esta información del otro conductor:</p>
          <ul class="list-disc pl-6 space-y-2 text-gray-800">
            <li>Nombre completo y número de teléfono</li>
            <li>Número de licencia de conducir</li>
            <li>Compañía de seguros y número de póliza</li>
            <li>Marca, modelo, año y color del vehículo</li>
            <li>Número de placa</li>
            <li>Nombre del dueño del vehículo (si es diferente)</li>
          </ul>
          <div class="mt-4 p-4 bg-red-100 rounded">
            <p class="font-bold text-red-900">⚠️ ADVERTENCIA CRÍTICA:</p>
            <ul class="list-disc pl-6 mt-2 text-red-800">
              <li>NO admitas culpa - NUNCA digas "fue mi culpa"</li>
              <li>NO discutas quién tuvo la culpa</li>
              <li>NO firmes NADA excepto el reporte policial</li>
              <li>NO aceptes dinero en efectivo en la escena</li>
            </ul>
          </div>
        </div>

        <div class="bg-purple-50 p-6 rounded-lg mb-8">
          <h3 class="text-2xl font-bold text-purple-900 mb-4">Paso 4: REPORTE POLICIAL (Minutos 15-45)</h3>
          <p class="mb-4">El reporte policial es CRÍTICO para tu caso:</p>
          <ul class="list-disc pl-6 space-y-2 text-gray-800">
            <li><strong>INSISTE:</strong> En que venga la policía si hay heridos o daños significativos</li>
            <li><strong>CUENTA TU VERSIÓN:</strong> Clara y honestamente</li>
            <li><strong>OBTÉN:</strong> El número del reporte y tarjeta del oficial</li>
            <li><strong>REVISA:</strong> Que toda la información esté correcta</li>
            <li><strong>CORRIGE:</strong> Cualquier error ANTES de que se vayan</li>
          </ul>
          <div class="mt-4 p-4 bg-purple-100 rounded">
            <p class="font-bold">📋 DATO IMPORTANTE:</p>
            <p>En NC y FL, debes reportar accidentes con daños mayores a $1,000 o cualquier herida.</p>
          </div>
        </div>

        <div class="bg-orange-50 p-6 rounded-lg mb-8">
          <h3 class="text-2xl font-bold text-orange-900 mb-4">Paso 5: BUSCA ATENCIÓN MÉDICA (Dentro de 24 Horas)</h3>
          <p class="mb-4 font-bold">Aunque te sientas bien, VE AL MÉDICO. Aquí está el por qué:</p>
          <ul class="list-disc pl-6 space-y-2 text-gray-800">
            <li>La adrenalina oculta el dolor por horas o días</li>
            <li>Lesiones internas pueden no mostrar síntomas inmediatos</li>
            <li>Sin documentación médica = Sin compensación</li>
            <li>Las aseguradoras usan retrasos médicos para negar reclamos</li>
          </ul>
          <div class="bg-orange-100 p-4 rounded mt-4">
            <p class="font-bold">🏥 OPCIONES MÉDICAS INMEDIATAS:</p>
            <ul class="list-disc pl-6 mt-2">
              <li>Sala de emergencias (si hay dolor severo)</li>
              <li>Urgent care (para evaluación rápida)</li>
              <li>Tu médico primario (cita el mismo día)</li>
              <li>Clínica especializada en accidentes</li>
            </ul>
          </div>
        </div>

        <div class="bg-indigo-50 p-6 rounded-lg mb-8">
          <h3 class="text-2xl font-bold text-indigo-900 mb-4">Paso 6: NOTIFICA A TU SEGURO (Dentro de 24-48 Horas)</h3>
          <p class="mb-4">Llama a tu compañía de seguros, pero RECUERDA:</p>
          <ul class="list-disc pl-6 space-y-2 text-gray-800">
            <li><strong>SÉ BREVE:</strong> Solo los hechos básicos</li>
            <li><strong>NO ESPECULES:</strong> Sobre quién tuvo la culpa</li>
            <li><strong>NO MINIMICES:</strong> Tus heridas o daños</li>
            <li><strong>GRABA:</strong> La llamada si es posible</li>
            <li><strong>OBTÉN:</strong> Número de reclamo y ajustador asignado</li>
          </ul>
          <div class="mt-4 p-4 bg-red-100 rounded">
            <p class="font-bold text-red-900">🚫 NUNCA hagas esto:</p>
            <ul class="list-disc pl-6 mt-2 text-red-800">
              <li>Dar declaración grabada sin abogado</li>
              <li>Aceptar la primera oferta de acuerdo</li>
              <li>Firmar liberación de responsabilidad</li>
              <li>Decir "estoy bien" si tienes alguna molestia</li>
            </ul>
          </div>
        </div>

        <div class="bg-gray-800 text-white p-6 rounded-lg mb-8">
          <h3 class="text-2xl font-bold mb-4">Paso 7: LLAMA A UN ABOGADO GUERRERO (HOY MISMO)</h3>
          <p class="mb-4">Las aseguradoras tienen equipos de abogados trabajando CONTRA ti desde el minuto uno.</p>
          <p class="font-bold text-xl mb-4">Necesitas un GUERRERO LEGAL en tu esquina:</p>
          <ul class="list-disc pl-6 space-y-2">
            <li>Evaluación GRATIS de tu caso</li>
            <li>NO pagas nada por adelantado</li>
            <li>Solo cobramos si ganamos tu caso</li>
            <li>Manejamos TODO con las aseguradoras</li>
            <li>Maximizamos tu compensación</li>
          </ul>
          <div class="bg-yellow-400 text-gray-900 p-4 rounded mt-6">
            <p class="font-bold text-xl text-center">⚔️ YO PELEO POR TI™</p>
            <p class="text-center text-lg">Veterano. Abogado. Tu Guerrero Legal.</p>
            <p class="text-center font-bold text-2xl mt-2">
              <a href="tel:1-844-965-3536" class="hover:underline">1-844-YO-PELEO (965-3536)</a>
            </p>
          </div>
        </div>

        <h2 class="text-3xl font-bold text-gray-900 mb-6">Errores Fatales que DESTRUYEN Tu Caso</h2>

        <div class="bg-red-50 border-2 border-red-500 p-6 rounded-lg mb-8">
          <h3 class="text-2xl font-bold text-red-900 mb-4">❌ Los 10 Errores Más Costosos</h3>
          <ol class="list-decimal pl-6 space-y-3 text-gray-800">
            <li><strong>Admitir culpa en la escena:</strong> "Lo siento" puede costar miles</li>
            <li><strong>No llamar a la policía:</strong> Sin reporte = caso débil</li>
            <li><strong>No buscar atención médica:</strong> Sin récords médicos = sin dolor y sufrimiento</li>
            <li><strong>Hablar demasiado con el seguro:</strong> Usan tus palabras contra ti</li>
            <li><strong>Aceptar la primera oferta:</strong> Siempre es 3-10x menor de lo que mereces</li>
            <li><strong>Publicar en redes sociales:</strong> Facebook/Instagram = evidencia para ellos</li>
            <li><strong>No guardar recibos:</strong> Gastos médicos, uber, medicinas, todo cuenta</li>
            <li><strong>Firmar documentos sin leer:</strong> Puedes renunciar a tus derechos</li>
            <li><strong>Esperar demasiado:</strong> Hay límites de tiempo para demandar</li>
            <li><strong>No contratar abogado:</strong> Pierdes 3-5x más compensación en promedio</li>
          </ol>
        </div>

        <h2 class="text-3xl font-bold text-gray-900 mb-6">Tu Compensación: Qué Puedes Reclamar</h2>

        <div class="bg-green-50 p-6 rounded-lg mb-8">
          <h3 class="text-2xl font-bold text-green-900 mb-4">💰 Daños Económicos (Facturas Reales)</h3>
          <ul class="list-disc pl-6 space-y-2 text-gray-800">
            <li><strong>Gastos médicos:</strong> Emergencia, doctores, terapia, medicinas</li>
            <li><strong>Tratamiento futuro:</strong> Cirugías, rehabilitación continua</li>
            <li><strong>Salarios perdidos:</strong> Tiempo sin trabajar por el accidente</li>
            <li><strong>Capacidad de ganar:</strong> Si no puedes volver a tu trabajo</li>
            <li><strong>Daños a propiedad:</strong> Reparación o valor total del vehículo</li>
            <li><strong>Transporte:</strong> Uber, taxi, renta de auto</li>
          </ul>
        </div>

        <div class="bg-blue-50 p-6 rounded-lg mb-8">
          <h3 class="text-2xl font-bold text-blue-900 mb-4">🏥 Daños No-Económicos (Tu Sufrimiento)</h3>
          <ul class="list-disc pl-6 space-y-2 text-gray-800">
            <li><strong>Dolor y sufrimiento:</strong> Compensación por tu dolor físico</li>
            <li><strong>Angustia emocional:</strong> Trauma, ansiedad, depresión</li>
            <li><strong>Pérdida de disfrute:</strong> Actividades que ya no puedes hacer</li>
            <li><strong>Desfiguración:</strong> Cicatrices o cambios permanentes</li>
            <li><strong>Pérdida de consorcio:</strong> Impacto en relaciones íntimas</li>
          </ul>
        </div>

        <h2 class="text-3xl font-bold text-gray-900 mb-6">Preguntas Frecuentes URGENTES</h2>

        <div class="space-y-6 mb-8">
          <div class="bg-gray-50 p-6 rounded-lg">
            <h3 class="font-bold text-xl mb-2">¿Qué pasa si el otro conductor no tiene seguro?</h3>
            <p>Tu póliza de "motorista sin seguro" (UM/UIM) te protege. Como veterano abogado, 
            sé exactamente cómo maximizar esta cobertura que muchos ignoran.</p>
          </div>

          <div class="bg-gray-50 p-6 rounded-lg">
            <h3 class="font-bold text-xl mb-2">¿Cuánto tiempo tengo para presentar un reclamo?</h3>
            <p><strong>NC:</strong> 3 años para lesiones personales, 3 años para daños a propiedad<br/>
            <strong>FL:</strong> 2 años para lesiones personales, 4 años para daños a propiedad<br/>
            PERO: Mientras más esperes, más difícil es ganar. Llama HOY.</p>
          </div>

          <div class="bg-gray-50 p-6 rounded-lg">
            <h3 class="font-bold text-xl mb-2">¿Qué pasa si yo tuve algo de culpa?</h3>
            <p>NC y FL tienen "negligencia comparativa". Aún puedes recuperar compensación, 
            pero se reduce por tu porcentaje de culpa. Un abogado guerrero minimiza tu culpa.</p>
          </div>

          <div class="bg-gray-50 p-6 rounded-lg">
            <h3 class="font-bold text-xl mb-2">¿Cuánto cuesta un abogado?</h3>
            <p><strong>NADA por adelantado.</strong> Trabajamos por contingencia - solo cobramos 
            si ganamos. Típicamente 33% de tu compensación. Sin victoria = Sin pago.</p>
          </div>
        </div>

        <div class="bg-gray-900 text-white p-8 rounded-lg mb-8">
          <h2 class="text-3xl font-bold mb-4 text-center">Tu Plan de Batalla Legal AHORA</h2>
          <div class="max-w-2xl mx-auto">
            <div class="space-y-4 mb-6">
              <div class="flex items-start">
                <span class="text-yellow-400 font-bold text-xl mr-3">1.</span>
                <p class="text-lg">Sigue los 7 pasos militares de esta guía</p>
              </div>
              <div class="flex items-start">
                <span class="text-yellow-400 font-bold text-xl mr-3">2.</span>
                <p class="text-lg">Documenta TODO - fotos, médicos, gastos</p>
              </div>
              <div class="flex items-start">
                <span class="text-yellow-400 font-bold text-xl mr-3">3.</span>
                <p class="text-lg">NO hables con aseguradoras sin abogado</p>
              </div>
              <div class="flex items-start">
                <span class="text-yellow-400 font-bold text-xl mr-3">4.</span>
                <p class="text-lg">Llama a un guerrero legal HOY</p>
              </div>
            </div>
            <div class="bg-yellow-400 text-gray-900 p-6 rounded-lg text-center">
              <p class="text-2xl font-bold mb-2">⚔️ YO PELEO POR TI™</p>
              <p class="text-xl mb-4">Consulta GRATIS • Hablamos Español • 24/7</p>
              <p class="text-3xl font-bold">
                <a href="tel:1-844-965-3536" class="hover:underline">1-844-YO-PELEO</a>
              </p>
              <p class="text-lg mt-2">(1-844-965-3536)</p>
            </div>
          </div>
        </div>

        <div class="bg-blue-50 border-l-4 border-blue-500 p-6">
          <h3 class="font-bold text-lg mb-2">Descargo Legal</h3>
          <p class="text-sm text-gray-700">
            Esta guía es solo para fines informativos y no constituye asesoramiento legal. 
            Cada accidente es único. Para consejos específicos sobre tu caso, consulta con 
            un abogado licenciado. La contratación de un abogado es una decisión importante 
            que no debe basarse únicamente en publicidad.
          </p>
        </div>
      </div>
    `,
    practiceArea: 'personal-injury' as const,
    language: 'es' as const,
    publishedAt: new Date(),
    readTime: 15,
    author: DEFAULT_BLOG_AUTHOR,
    tags: ['accidentes de auto', 'lesiones personales', 'compensación', 'seguro', 'emergencia'],
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
      id: 'compensacion-maxima-accidente',
      title: 'Cómo Obtener Compensación Máxima por Tu Accidente',
      slug: 'compensacion-maxima-accidente',
      excerpt: 'Estrategias probadas para maximizar tu compensación después de un accidente.',
      practiceArea: 'personal-injury' as const,
      language: 'es' as const,
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      readTime: 10,
      author: DEFAULT_BLOG_AUTHOR,
      tags: ['compensación', 'accidentes', 'seguro'],
    },
    {
      id: 'errores-fatales-reclamo-seguro',
      title: '7 Errores Fatales al Hacer un Reclamo de Seguro',
      slug: 'errores-fatales-reclamo-seguro',
      excerpt: 'Evita estos errores comunes que pueden destruir tu caso de accidente.',
      practiceArea: 'personal-injury' as const,
      language: 'es' as const,
      publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      readTime: 8,
      author: DEFAULT_BLOG_AUTHOR,
      tags: ['seguro', 'errores', 'reclamos'],
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