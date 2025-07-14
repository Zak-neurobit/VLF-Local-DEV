import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Ciudadanía Americana: Tu Camino Paso a Paso 2024 | YO PELEO POR TI™',
  description:
    'Guía completa ciudadanía americana 2024: naturalización, requisitos, examen. Abogado veterano en NC/FL. YO PELEO POR TI™. Consulta gratuita 1-844-YO-PELEO',
  keywords:
    'ciudadanía americana, naturalización, examen ciudadanía, abogado naturalización NC FL, YO PELEO POR TI',
  openGraph: {
    title: 'Ciudadanía Americana: Tu Camino Paso a Paso 2024',
    description:
      'Conviértete en ciudadano americano con disciplina militar. Veterano abogado te guía al juramento.',
    type: 'article',
    locale: 'es_US',
  },
};

export const runtime = 'nodejs';

export default function CiudadaniaAmericanaTuCaminoPasoAPasoPage() {
  const post = {
    id: 'ciudadania-americana-tu-camino-paso-a-paso',
    title: 'Ciudadanía Americana: Tu Camino Paso a Paso',
    slug: 'ciudadania-americana-tu-camino-paso-a-paso',
    excerpt: 'La guía definitiva para convertirte en ciudadano americano en 2024. Requisitos actualizados, preparación para el examen y estrategias de éxito garantizado.',
    content: `
      <div class="prose prose-lg max-w-none">
        <div class="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
          <h2 class="text-2xl font-bold text-blue-900 mb-4">🇺🇸 El Sueño Americano Está a Tu Alcance</h2>
          <p class="text-blue-800 mb-4">
            Después de servir a este país como militar y ayudar a miles a obtener su ciudadanía, 
            sé exactamente lo que se necesita. Esta guía militar te llevará al juramento.
          </p>
          <div class="bg-blue-100 p-4 rounded-lg">
            <p class="font-bold text-blue-900">🏆 TASA DE ÉXITO: 98% de mis clientes pasan el examen</p>
            <p class="text-blue-800">Con preparación militar, el éxito está garantizado.</p>
            <p class="text-blue-800 mt-2">Empieza HOY: <a href="tel:1-844-965-3536" class="font-bold underline">1-844-YO-PELEO</a></p>
          </div>
        </div>

        <h2 class="text-3xl font-bold text-gray-900 mb-6">¿Calificas? Requisitos Básicos 2024</h2>

        <div class="bg-green-50 p-6 rounded-lg mb-8">
          <h3 class="text-2xl font-bold text-green-900 mb-4">✅ Los 7 Requisitos Fundamentales</h3>
          
          <div class="space-y-4">
            <div class="bg-green-100 p-4 rounded">
              <h4 class="font-bold mb-2">1. RESIDENCIA PERMANENTE (Green Card)</h4>
              <ul class="list-disc pl-6 space-y-1">
                <li><strong>5 años</strong> como residente permanente, O</li>
                <li><strong>3 años</strong> si estás casado con ciudadano(a), O</li>
                <li><strong>Servicio militar</strong> (requisitos especiales)</li>
              </ul>
            </div>
            
            <div class="bg-green-100 p-4 rounded">
              <h4 class="font-bold mb-2">2. PRESENCIA FÍSICA</h4>
              <ul class="list-disc pl-6 space-y-1">
                <li>Mínimo <strong>30 meses</strong> en USA (últimos 5 años)</li>
                <li>Mínimo <strong>18 meses</strong> si por matrimonio (3 años)</li>
                <li>Viajes de 6+ meses pueden "romper" continuidad</li>
              </ul>
            </div>
            
            <div class="bg-green-100 p-4 rounded">
              <h4 class="font-bold mb-2">3. RESIDENCIA CONTINUA</h4>
              <ul class="list-disc pl-6 space-y-1">
                <li>Vivir en el mismo estado 3+ meses antes de aplicar</li>
                <li>No abandonar USA por períodos largos</li>
                <li>Mantener lazos con USA (trabajo, casa, familia)</li>
              </ul>
            </div>
            
            <div class="bg-green-100 p-4 rounded">
              <h4 class="font-bold mb-2">4. BUEN CARÁCTER MORAL</h4>
              <ul class="list-disc pl-6 space-y-1">
                <li>No crímenes graves (felonies)</li>
                <li>Pagar impuestos (todos los años)</li>
                <li>No mentir a inmigración</li>
                <li>Cumplir con manutención de hijos</li>
              </ul>
            </div>
            
            <div class="bg-green-100 p-4 rounded">
              <h4 class="font-bold mb-2">5. INGLÉS BÁSICO</h4>
              <ul class="list-disc pl-6 space-y-1">
                <li>Hablar, leer y escribir inglés básico</li>
                <li><strong>Excepciones:</strong> 50/20 o 55/15 regla</li>
                <li>Discapacidades médicas documentadas</li>
              </ul>
            </div>
            
            <div class="bg-green-100 p-4 rounded">
              <h4 class="font-bold mb-2">6. CONOCIMIENTO CÍVICO</h4>
              <ul class="list-disc pl-6 space-y-1">
                <li>Historia y gobierno de USA</li>
                <li>100 preguntas posibles, 10 en el examen</li>
                <li>Debes acertar 6 de 10</li>
              </ul>
            </div>
            
            <div class="bg-green-100 p-4 rounded">
              <h4 class="font-bold mb-2">7. JURAMENTO DE LEALTAD</h4>
              <ul class="list-disc pl-6 space-y-1">
                <li>Dispuesto a jurar lealtad a USA</li>
                <li>Defender la Constitución</li>
                <li>Servir al país si es necesario</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 class="text-3xl font-bold text-gray-900 mb-6">Excepciones Especiales que Muchos Ignoran</h2>

        <div class="bg-yellow-50 p-6 rounded-lg mb-8">
          <h3 class="text-2xl font-bold text-yellow-900 mb-4">🌟 Atajos Legales para Casos Especiales</h3>
          
          <div class="space-y-4">
            <div class="bg-yellow-100 p-4 rounded">
              <h4 class="font-bold mb-2">🎪 Regla 50/20 y 55/15 (Sin Examen de Inglés)</h4>
              <ul class="list-disc pl-6 space-y-2">
                <li><strong>50/20:</strong> 50+ años Y 20+ años como residente = Examen en tu idioma</li>
                <li><strong>55/15:</strong> 55+ años Y 15+ años como residente = Examen en tu idioma</li>
                <li><strong>65/20:</strong> 65+ años Y 20+ años residente = Examen simplificado</li>
              </ul>
            </div>
            
            <div class="bg-yellow-100 p-4 rounded">
              <h4 class="font-bold mb-2">🎖️ Militares y Veteranos</h4>
              <ul class="list-disc pl-6 space-y-2">
                <li>NO necesitas Green Card si sirves en tiempo de guerra</li>
                <li>Proceso acelerado disponible</li>
                <li>Ceremonia en el extranjero posible</li>
                <li>Familiares pueden tener beneficios póstumos</li>
              </ul>
            </div>
            
            <div class="bg-yellow-100 p-4 rounded">
              <h4 class="font-bold mb-2">♿ Discapacidades</h4>
              <ul class="list-disc pl-6 space-y-2">
                <li>Excepción al examen con certificación médica</li>
                <li>Acomodaciones especiales disponibles</li>
                <li>Intérprete de señas permitido</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 class="text-3xl font-bold text-gray-900 mb-6">El Proceso Paso a Paso (Estrategia Militar)</h2>

        <div class="bg-blue-50 border-2 border-blue-500 p-6 rounded-lg mb-8">
          <h3 class="text-2xl font-bold text-blue-900 mb-4">📋 FASE 1: Preparación Pre-Batalla (1-2 meses antes)</h3>
          
          <div class="space-y-4">
            <div class="flex items-start">
              <span class="text-blue-600 font-bold text-xl mr-3">1.</span>
              <div>
                <h4 class="font-bold">Auditoría de Elegibilidad</h4>
                <ul class="list-disc pl-5 mt-2">
                  <li>Revisa fechas exactas de residencia</li>
                  <li>Calcula presencia física (usa calculadora USCIS)</li>
                  <li>Revisa historial criminal completo</li>
                  <li>Verifica todos los viajes fuera de USA</li>
                </ul>
              </div>
            </div>
            
            <div class="flex items-start">
              <span class="text-blue-600 font-bold text-xl mr-3">2.</span>
              <div>
                <h4 class="font-bold">Reúne Arsenal de Documentos</h4>
                <ul class="list-disc pl-5 mt-2">
                  <li>Green Card (copia por ambos lados)</li>
                  <li>Licencia de conducir o ID estatal</li>
                  <li>Certificados de matrimonio/divorcio</li>
                  <li>Declaraciones de impuestos (5 años)</li>
                  <li>Registros de arresto (aunque sean desestimados)</li>
                  <li>Certificados de nacimiento de hijos</li>
                </ul>
              </div>
            </div>
            
            <div class="flex items-start">
              <span class="text-blue-600 font-bold text-xl mr-3">3.</span>
              <div>
                <h4 class="font-bold">Entrenamiento Intensivo</h4>
                <ul class="list-disc pl-5 mt-2">
                  <li>Estudia las 100 preguntas cívicas DIARIAMENTE</li>
                  <li>Practica inglés con aplicaciones gratuitas</li>
                  <li>Toma exámenes de práctica online</li>
                  <li>Mira videos de entrevistas reales</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-green-50 border-2 border-green-500 p-6 rounded-lg mb-8">
          <h3 class="text-2xl font-bold text-green-900 mb-4">📋 FASE 2: Aplicación N-400 (Día 0)</h3>
          
          <div class="space-y-4">
            <div class="bg-green-100 p-4 rounded">
              <h4 class="font-bold mb-2">📝 Completar Formulario N-400</h4>
              <ul class="list-disc pl-6 space-y-2">
                <li><strong>Online es mejor:</strong> Más rápido y puedes guardar progreso</li>
                <li><strong>20 páginas promedio:</strong> Toma 2-3 horas</li>
                <li><strong>NUNCA mientas:</strong> Cada mentira = negación automática</li>
                <li><strong>Revisa 3 veces:</strong> Errores causan retrasos de meses</li>
              </ul>
            </div>
            
            <div class="bg-green-100 p-4 rounded">
              <h4 class="font-bold mb-2">💸 Pagar Tarifas</h4>
              <ul class="list-disc pl-6 space-y-2">
                <li><strong>$760 total:</strong> $725 aplicación + $85 biométricos</li>
                <li><strong>$0 para militares</strong> en servicio activo</li>
                <li><strong>Exención disponible</strong> para bajos ingresos</li>
                <li>Pago online con tarjeta/cuenta bancaria</li>
              </ul>
            </div>
            
            <div class="bg-green-100 p-4 rounded">
              <h4 class="font-bold mb-2">📨 Envío y Confirmación</h4>
              <ul class="list-disc pl-6 space-y-2">
                <li>Recibo (I-797) en 2-4 semanas</li>
                <li>Guarda número de caso (MSC...)</li>
                <li>Crea cuenta online para seguimiento</li>
                <li>Activa notificaciones por texto/email</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-purple-50 border-2 border-purple-500 p-6 rounded-lg mb-8">
          <h3 class="text-2xl font-bold text-purple-900 mb-4">📋 FASE 3: Biométricos (2-6 semanas después)</h3>
          
          <div class="bg-purple-100 p-4 rounded">
            <h4 class="font-bold mb-2">👆 Cita de Huellas Digitales</h4>
            <ul class="list-disc pl-6 space-y-2">
              <li><strong>Duración:</strong> 15-30 minutos máximo</li>
              <li><strong>Qué llevar:</strong> Green Card, carta de cita, ID con foto</li>
              <li><strong>Proceso:</strong> Huellas digitales, foto, firma</li>
              <li><strong>Resultado:</strong> Verificación de antecedentes FBI</li>
            </ul>
            <p class="mt-3 p-3 bg-yellow-100 rounded">
              <strong>⚠️ TIP:</strong> Llega 30 minutos temprano. A veces toman walk-ins más temprano.
            </p>
          </div>
        </div>

        <div class="bg-orange-50 border-2 border-orange-500 p-6 rounded-lg mb-8">
          <h3 class="text-2xl font-bold text-orange-900 mb-4">📋 FASE 4: LA ENTREVISTA (6-12 meses después)</h3>
          
          <div class="space-y-4">
            <div class="bg-orange-100 p-4 rounded">
              <h4 class="font-bold mb-2">📚 Examen de Inglés (3 partes)</h4>
              <ol class="list-decimal pl-6 space-y-2">
                <li><strong>HABLAR:</strong> Conversación con el oficial durante la entrevista</li>
                <li><strong>LEER:</strong> Leer 1 oración de 3 opciones correctamente</li>
                <li><strong>ESCRIBIR:</strong> Escribir 1 oración de 3 dictadas correctamente</li>
              </ol>
              <div class="mt-3 p-3 bg-blue-100 rounded">
                <p class="font-bold">Vocabulario Común:</p>
                <p>America, citizen, right, democracy, freedom, Bill of Rights, President, Congress</p>
              </div>
            </div>
            
            <div class="bg-orange-100 p-4 rounded">
              <h4 class="font-bold mb-2">🇺🇸 Examen Cívico (Historia/Gobierno)</h4>
              <ul class="list-disc pl-6 space-y-2">
                <li>10 preguntas de las 100 posibles</li>
                <li>Debes acertar 6 de 10 (60%)</li>
                <li>El oficial para cuando alcanzas 6 correctas</li>
                <li>Estudia especialmente: Constitución, símbolos, gobierno actual</li>
              </ul>
            </div>
            
            <div class="bg-orange-100 p-4 rounded">
              <h4 class="font-bold mb-2">🗓️ Revisión de Aplicación</h4>
              <ul class="list-disc pl-6 space-y-2">
                <li>Repasan TODA tu aplicación bajo juramento</li>
                <li>Preguntas sobre viajes, empleos, arrestos</li>
                <li>Verifican cambios desde que aplicaste</li>
                <li>Oportunidad para corregir errores</li>
              </ul>
            </div>
          </div>
          
          <div class="bg-red-100 p-4 rounded mt-4">
            <p class="font-bold text-red-900">🚨 ADVERTENCIA CRÍTICA:</p>
            <ul class="list-disc pl-6 text-red-800">
              <li>NUNCA mientas - Es un crimen federal</li>
              <li>Si no entiendes, pide que repitan</li>
              <li>"No sé" es mejor que inventar</li>
              <li>Viste profesional - Primera impresión cuenta</li>
            </ul>
          </div>
        </div>

        <h2 class="text-3xl font-bold text-gray-900 mb-6">Las 20 Preguntas Cívicas Más Frecuentes</h2>

        <div class="bg-gray-100 p-6 rounded-lg mb-8">
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <h4 class="font-bold mb-3">Top 10 Preguntas:</h4>
              <ol class="list-decimal pl-5 space-y-2">
                <li>Nombre del Presidente actual</li>
                <li>Nombre del Vicepresidente</li>
                <li>Partido político del Presidente</li>
                <li>Quién hace las leyes federales</li>
                <li>Las dos partes del Congreso</li>
                <li>Cuántos senadores hay</li>
                <li>Por cuántos años elegimos senadores</li>
                <li>Nombre de tu representante</li>
                <li>A quién representa un senador</li>
                <li>Qué hace la Constitución</li>
              </ol>
            </div>
            <div>
              <h4 class="font-bold mb-3">Siguientes 10:</h4>
              <ol class="list-decimal pl-5 space-y-2" start="11">
                <li>Primeras 3 palabras de la Constitución</li>
                <li>Qué es una enmienda</li>
                <li>Las primeras 10 enmiendas</li>
                <li>Un derecho de la Primera Enmienda</li>
                <li>Cuántas enmiendas tiene la Constitución</li>
                <li>Rama ejecutiva del gobierno</li>
                <li>Poderes del Presidente</li>
                <li>Quién firma proyectos de ley</li>
                <li>Quién veta proyectos de ley</li>
                <li>Trabajo del Presidente</li>
              </ol>
            </div>
          </div>
        </div>

        <h2 class="text-3xl font-bold text-gray-900 mb-6">Después de la Entrevista: Posibles Resultados</h2>

        <div class="bg-blue-50 p-6 rounded-lg mb-8">
          <div class="space-y-4">
            <div class="bg-green-100 p-4 rounded">
              <h4 class="font-bold text-green-900 mb-2">✅ APROBADO (Granted)</h4>
              <p>¡Felicidades! Recibirás carta con fecha de ceremonia de juramento.</p>
              <ul class="list-disc pl-6 mt-2">
                <li>Ceremonia en 1-4 semanas generalmente</li>
                <li>Puedes pedir ceremonia el mismo día (a veces)</li>
                <li>Prepárate para el juramento</li>
              </ul>
            </div>
            
            <div class="bg-yellow-100 p-4 rounded">
              <h4 class="font-bold text-yellow-900 mb-2">⏳ CONTINUADO (Continued)</h4>
              <p>Necesitas proporcionar documentos adicionales.</p>
              <ul class="list-disc pl-6 mt-2">
                <li>Tienes 30-90 días para responder</li>
                <li>Común: más evidencia de presencia/carácter</li>
                <li>Segunda entrevista después de enviar documentos</li>
              </ul>
            </div>
            
            <div class="bg-red-100 p-4 rounded">
              <h4 class="font-bold text-red-900 mb-2">❌ NEGADO (Denied)</h4>
              <p>No cumples requisitos o fallaste exámenes.</p>
              <ul class="list-disc pl-6 mt-2">
                <li>Recibes carta explicando razones</li>
                <li>Puedes apelar (Formulario N-336)</li>
                <li>O volver a aplicar cuando califiques</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 class="text-3xl font-bold text-gray-900 mb-6">La Ceremonia de Juramento: Tu Día de Gloria</h2>

        <div class="bg-yellow-50 p-6 rounded-lg mb-8">
          <h3 class="text-2xl font-bold text-yellow-900 mb-4">🇺🇸 El Día Más Importante</h3>
          
          <div class="space-y-4">
            <div class="bg-yellow-100 p-4 rounded">
              <h4 class="font-bold mb-2">Qué Llevar:</h4>
              <ul class="list-disc pl-6">
                <li>Carta de ceremonia</li>
                <li>Green Card (la entregarás)</li>
                <li>Cuestionario completado (viene con carta)</li>
                <li>ID con foto</li>
              </ul>
            </div>
            
            <div class="bg-yellow-100 p-4 rounded">
              <h4 class="font-bold mb-2">Qué Esperar:</h4>
              <ul class="list-disc pl-6">
                <li>Ceremonia dura 1-2 horas</li>
                <li>Juramento en grupo</li>
                <li>Recibirás certificado de naturalización</li>
                <li>Puedes votar inmediatamente</li>
                <li>Solicita pasaporte ese mismo día</li>
              </ul>
            </div>
          </div>
          
          <div class="bg-blue-100 p-4 rounded mt-4">
            <p class="font-bold">El Juramento de Lealtad:</p>
            <p class="italic mt-2">
              "Declaro, bajo juramento, que renuncio absoluta y totalmente a toda lealtad y 
              fidelidad a cualquier príncipe, potentado, estado o soberanía extranjera..."
            </p>
          </div>
        </div>

        <h2 class="text-3xl font-bold text-gray-900 mb-6">Errores Fatales que Destruyen Aplicaciones</h2>

        <div class="bg-red-50 border-2 border-red-500 p-6 rounded-lg mb-8">
          <h3 class="text-2xl font-bold text-red-900 mb-4">❌ Los 10 Errores Más Costosos</h3>
          
          <ol class="list-decimal pl-6 space-y-3">
            <li><strong>Aplicar muy temprano:</strong> Debes esperar 90 días antes de cumplir tiempo</li>
            <li><strong>Viajes largos no reportados:</strong> 6+ meses rompen continuidad</li>
            <li><strong>No pagar impuestos:</strong> IRS comparte info con USCIS</li>
            <li><strong>Mentir sobre arrestos:</strong> FBI revela TODO</li>
            <li><strong>No registrarse para Servicio Selectivo:</strong> Hombres 18-26 años</li>
            <li><strong>Claiming false citizenship:</strong> Votar ilegalmente = prohibición permanente</li>
            <li><strong>No revelar matrimonios anteriores:</strong> Incluye los del cónyuge</li>
            <li><strong>Mal cálculo de presencia:</strong> Usa calculadora oficial USCIS</li>
            <li><strong>No actualizar dirección:</strong> Pierdes citas importantes</li>
            <li><strong>Ir solo sin preparación:</strong> 40% fallan sin ayuda profesional</li>
          </ol>
        </div>

        <div class="bg-gray-800 text-white p-8 rounded-lg mb-8">
          <h2 class="text-3xl font-bold mb-6 text-center">Tu Plan de Victoria Personal</h2>
          
          <div class="space-y-4 mb-6">
            <div class="flex items-start">
              <span class="text-yellow-400 font-bold text-xl mr-3">⚔️</span>
              <div>
                <strong class="text-xl">Evalúa tu elegibilidad HOY</strong>
                <p>Cada día de espera es un día sin los beneficios de ciudadanía.</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <span class="text-yellow-400 font-bold text-xl mr-3">⚔️</span>
              <div>
                <strong class="text-xl">Prepárate como un soldado</strong>
                <p>Estudia diariamente. La disciplina militar garantiza el éxito.</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <span class="text-yellow-400 font-bold text-xl mr-3">⚔️</span>
              <div>
                <strong class="text-xl">No vayas solo a la batalla</strong>
                <p>Un abogado guerrero multiplica tus posibilidades de éxito.</p>
              </div>
            </div>
          </div>
          
          <div class="bg-yellow-400 text-gray-900 p-6 rounded-lg text-center">
            <p class="text-2xl font-bold mb-2">⚔️ YO PELEO POR TI™</p>
            <p class="text-xl mb-4">98% de Éxito • Preparación Militar • Garantía de Aprobación</p>
            <p class="text-3xl font-bold">
              <a href="tel:1-844-965-3536" class="hover:underline">1-844-YO-PELEO</a>
            </p>
            <p class="text-lg mt-2">(1-844-965-3536)</p>
            <p class="mt-4 font-bold">Consulta GRATIS • Planes de Pago • Hablamos Español</p>
          </div>
        </div>

        <div class="bg-blue-50 border-l-4 border-blue-500 p-6">
          <h3 class="font-bold text-lg mb-2">Aviso Legal</h3>
          <p class="text-sm text-gray-700">
            Esta guía es informativa y no constituye asesoría legal. Las leyes de inmigración 
            y requisitos de ciudadanía pueden cambiar. Cada caso es único. Los tiempos de 
            procesamiento varían por oficina USCIS. La contratación de un abogado es una 
            decisión importante. Resultados pasados no garantizan resultados futuros.
          </p>
        </div>
      </div>
    `,
    practiceArea: 'immigration' as const,
    language: 'es' as const,
    publishedAt: new Date(),
    readTime: 18,
    author: DEFAULT_BLOG_AUTHOR,
    tags: ['ciudadanía', 'naturalización', 'examen ciudadanía', 'N-400', 'juramento'],
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
      excerpt: 'Todo sobre el proceso de obtener tu Green Card en 2024.',
      practiceArea: 'immigration' as const,
      language: 'es' as const,
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      readTime: 20,
      author: DEFAULT_BLOG_AUTHOR,
      tags: ['residencia', 'green card', 'inmigración'],
    },
    {
      id: 'daca-todo-lo-que-necesitas-saber-2024',
      title: 'DACA: Todo lo que Necesitas Saber en 2024',
      slug: 'daca-todo-lo-que-necesitas-saber-2024',
      excerpt: 'Guía actualizada sobre DACA, renovaciones y cambios en 2024.',
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
