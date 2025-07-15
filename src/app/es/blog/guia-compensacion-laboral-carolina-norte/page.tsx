import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title:
    'Guía Completa de Compensación Laboral en Carolina del Norte 2024 | Abogado Experto - Vasquez Law Firm',
  description:
    'Guía integral de compensación laboral en Carolina del Norte. Expertos en lesiones laborales, reclamos denegados, discapacidad permanente y reclamos de terceros. YO PELEO POR TI™ - Luchamos por sus beneficios. Llame (919) 519-3312.',
  keywords: [
    'compensación laboral Carolina del Norte',
    'abogado compensación trabajadores NC',
    'abogado lesiones laborales NC',
    'abogado accidentes trabajo',
    'reclamos compensación denegados',
    'beneficios discapacidad permanente',
    'abogado workers comp español',
    'lesiones trabajo construcción',
    'compensación trabajadores hispanos',
    'abogado accidentes laborales Raleigh',
    'compensación laboral Charlotte',
    'YO PELEO POR TI',
    'abogado veterano militar',
    'abogado que habla español',
    'beneficios trabajadores lesionados',
    'indemnización accidentes trabajo NC',
    'derechos trabajadores lesionados',
    'comisión industrial Carolina Norte',
  ].join(', '),
  authors: [{ name: 'Vasquez Law Firm' }],
  publisher: 'Vasquez Law Firm, PLLC',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Guía Completa de Compensación Laboral en Carolina del Norte 2024 | Abogado Experto',
    description:
      'Guía integral de compensación laboral en Carolina del Norte. Expertos en lesiones laborales, reclamos denegados, discapacidad permanente y reclamos de terceros. YO PELEO POR TI™ - Luchamos por sus beneficios.',
    url: 'https://www.vasquezlawnc.com/es/blog/guia-compensacion-laboral-carolina-norte',
    siteName: 'Vasquez Law Firm',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/blog/guia-compensacion-laboral-carolina-norte.jpg',
        width: 1200,
        height: 630,
        alt: 'Guía de Compensación Laboral Carolina del Norte - Vasquez Law Firm',
      },
    ],
    locale: 'es_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guía Completa de Compensación Laboral en Carolina del Norte 2024 | Abogado Experto',
    description:
      'Guía integral de compensación laboral en Carolina del Norte. Expertos en lesiones laborales, reclamos denegados, discapacidad permanente y reclamos de terceros. YO PELEO POR TI™',
    images: [
      'https://www.vasquezlawnc.com/images/blog/guia-compensacion-laboral-carolina-norte.jpg',
    ],
    creator: '@VasquezLawNC',
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/blog/guia-compensacion-laboral-carolina-norte',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/blog/north-carolina-workers-compensation-guide',
      'es-US': 'https://www.vasquezlawnc.com/es/blog/guia-compensacion-laboral-carolina-norte',
    },
  },
  other: {
    'article:published_time': '2024-01-22T10:00:00.000Z',
    'article:modified_time': new Date().toISOString(),
    'article:author': 'Vasquez Law Firm',
    'article:section': 'Compensación Laboral',
    'article:tag':
      'Compensación Laboral Carolina del Norte, Lesiones Laborales, Reclamos Denegados, Discapacidad Permanente',
  },
};

export const runtime = 'nodejs';

export default function GuiaCompensacionLaboralCarolinaNortePage() {
  const post = {
    id: 'guia-compensacion-laboral-carolina-norte',
    title: 'Guía Completa de Compensación Laboral en Carolina del Norte 2024',
    slug: 'guia-compensacion-laboral-carolina-norte',
    excerpt:
      'Guía integral de compensación laboral en Carolina del Norte cubriendo lesiones laborales, presentación de reclamos, reclamos denegados, discapacidad permanente, tratamiento médico y reclamos de terceros. Representación legal experta con compromiso YO PELEO POR TI™.',
    content: `
      <div class="prose prose-lg max-w-none">
        <!-- Banner de Contacto de Emergencia -->
        <div class="bg-red-600 text-white p-6 rounded-lg mb-8 text-center">
          <h2 class="text-2xl font-bold mb-2">🚨 ¿LESIONADO EN EL TRABAJO? ¡OBTENGA AYUDA AHORA!</h2>
          <p class="text-lg mb-4">No permita que empleadores o compañías de seguros le nieguen sus beneficios legítimos. El tiempo es crítico para su reclamo.</p>
          <div class="flex flex-col md:flex-row gap-4 justify-center items-center">
            <a href="tel:9195193312" class="bg-white text-red-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100">
              📞 LLAME AHORA: (919) 519-3312
            </a>
            <a href="/es/contacto" class="border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-red-600">
              💬 CONSULTA GRATUITA
            </a>
          </div>
          <p class="mt-4 text-sm">La acción inmediata protege sus derechos - No espere para obtener ayuda legal</p>
        </div>

        <!-- Marca YO PELEO POR TI -->
        <div class="bg-blue-900 text-white p-6 rounded-lg mb-8">
          <div class="flex items-center justify-center mb-4">
            <span class="text-4xl mr-4">🇺🇸</span>
            <div>
              <h2 class="text-3xl font-bold text-yellow-400">YO PELEO POR TI™</h2>
              <p class="text-xl">LUCHO POR USTED</p>
            </div>
            <span class="text-4xl ml-4">⚔️</span>
          </div>
          <p class="text-center text-lg">
            La precisión militar se encuentra con la excelencia legal. Como veteranos que servimos nuestro país con dedicación y honor, 
            ahora le servimos a USTED con el mismo compromiso inquebrantable. Su lucha por beneficios de compensación laboral se convierte en nuestra misión.
          </p>
        </div>

        <h1>Guía Completa de Compensación Laboral en Carolina del Norte 2024</h1>
        
        <p class="lead">
          Si ha resultado lesionado en el trabajo en Carolina del Norte, está enfrentando más que solo dolor físico y gastos médicos. 
          Está lidiando con compañías de seguros, posibles salarios perdidos e incertidumbre sobre su futuro. En Vasquez Law Firm, 
          entendemos su lucha y aportamos dedicación de grado militar a pelear por sus beneficios de compensación laboral con nuestro 
          compromiso <strong>YO PELEO POR TI™</strong> - porque literalmente luchamos por usted.
        </p>

        <h2>📋 Tabla de Contenidos</h2>
        <ul>
          <li><a href="#pasos-inmediatos">Pasos Inmediatos Después de una Lesión Laboral</a></li>
          <li><a href="#ley-compensacion-nc">Resumen de la Ley de Compensación Laboral de Carolina del Norte</a></li>
          <li><a href="#lesiones-cubiertas">Qué Lesiones Están Cubiertas</a></li>
          <li><a href="#presentar-reclamos">Cómo Presentar un Reclamo de Compensación Laboral</a></li>
          <li><a href="#beneficios-disponibles">Tipos de Beneficios Disponibles</a></li>
          <li><a href="#reclamos-denegados">Lidiar con Reclamos Denegados</a></li>
          <li><a href="#discapacidad-permanente">Beneficios de Discapacidad Permanente</a></li>
          <li><a href="#tratamiento-medico">Tratamiento Médico y Derechos</a></li>
          <li><a href="#regreso-trabajo">Problemas de Regreso al Trabajo</a></li>
          <li><a href="#reclamos-terceros">Reclamos de Terceros y Lesiones Personales</a></li>
          <li><a href="#tacticas-empleador">Tácticas Comunes de Empleadores y Seguros</a></li>
          <li><a href="#elegir-abogado">Cuándo Necesita un Abogado</a></li>
        </ul>

        <h2 id="pasos-inmediatos">🚨 Pasos Inmediatos Después de una Lesión Laboral</h2>
        
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
          <h3 class="text-xl font-bold text-yellow-800 mb-3">CRÍTICO: Haga Estas Cosas INMEDIATAMENTE</h3>
          <ol class="text-yellow-800">
            <li><strong>Obtenga Atención Médica</strong> - Su salud es la prioridad, incluso para lesiones aparentemente menores</li>
            <li><strong>Reporte la Lesión Inmediatamente</strong> - Informe a su supervisor/empleador inmediatamente (requerido dentro de 30 días)</li>
            <li><strong>Documente Todo</strong> - Fotos de la escena, lesiones, equipo involucrado</li>
            <li><strong>Obtenga Información de Testigos</strong> - Nombres e información de contacto de cualquiera que vio el accidente</li>
            <li><strong>Escriba Lo Que Pasó</strong> - Descripción detallada mientras está fresco en su memoria</li>
            <li><strong>Complete el Formulario 18</strong> - Complete el formulario oficial de reporte de lesión</li>
            <li><strong>Mantenga Todos los Registros</strong> - Facturas médicas, correspondencia, documentación de trabajo perdido</li>
            <li><strong>Contacte a Vasquez Law Firm</strong> - Llame (919) 519-3312 para orientación legal</li>
          </ol>
        </div>

        <h3>Qué NO Hacer Después de una Lesión Laboral</h3>
        <ul>
          <li>❌ NO retrase reportar la lesión a su empleador</li>
          <li>❌ NO firme documentos sin revisión legal</li>
          <li>❌ NO dé declaraciones grabadas a seguros sin un abogado</li>
          <li>❌ NO acepte ofertas rápidas de arreglo</li>
          <li>❌ NO regrese al trabajo si es médicamente inseguro</li>
          <li>❌ NO asuma que su reclamo será aprobado automáticamente</li>
          <li>❌ NO falte a citas médicas o tratamiento</li>
        </ul>

        <h2 id="ley-compensacion-nc">⚖️ Resumen de la Ley de Compensación Laboral de Carolina del Norte</h2>

        <h3>Quién Está Cubierto Bajo la Compensación Laboral de NC</h3>
        <div class="bg-green-50 border-l-4 border-green-400 p-6 mb-6">
          <h4 class="text-xl font-bold text-green-800 mb-3">✅ Empleados Cubiertos</h4>
          <ul class="text-green-800">
            <li><strong>La Mayoría de Empleados:</strong> Trabajadores de tiempo completo, tiempo parcial, temporales y estacionales</li>
            <li><strong>Trabajadores de Construcción:</strong> Todos los empleados de la industria de construcción</li>
            <li><strong>Trabajadores Agrícolas:</strong> Si el empleador tiene 10+ empleados regulares</li>
            <li><strong>Trabajadores de Ferrocarril:</strong> Ciertas categorías cubiertas</li>
            <li><strong>Trabajadores Domésticos:</strong> Si trabajan 20+ horas por semana</li>
            <li><strong>Trabajadores Indocumentados:</strong> Aún tienen derecho a beneficios bajo la ley de NC</li>
          </ul>
        </div>

        <h3>Quién NO Está Cubierto</h3>
        <ul>
          <li>Contratistas independientes (aunque esto a menudo se disputa)</li>
          <li>Empleados casuales trabajando menos de 20 horas por semana</li>
          <li>Empleados federales (cubiertos por compensación laboral federal)</li>
          <li>Ciertos trabajadores agrícolas (granjas con menos de 10 empleados)</li>
          <li>Algunos trabajadores domésticos</li>
        </ul>

        <h3>Límites de Tiempo en Compensación Laboral de Carolina del Norte</h3>
        <div class="bg-red-50 border-l-4 border-red-400 p-6 mb-6">
          <h4 class="text-xl font-bold text-red-800 mb-3">⏰ FECHAS LÍMITE CRÍTICAS</h4>
          <ul class="text-red-800">
            <li><strong>Reportar Lesión:</strong> 30 días desde la fecha del accidente o descubrimiento</li>
            <li><strong>Presentar Reclamo:</strong> 2 años desde la fecha de lesión o último pago de compensación</li>
            <li><strong>Enfermedad Ocupacional:</strong> 2 años desde el descubrimiento de la enfermedad</li>
            <li><strong>Apelar Denegación:</strong> 30 días desde el aviso de denegación</li>
            <li><strong>Tratamiento Médico:</strong> No hay fecha límite específica pero no se retrase</li>
          </ul>
          <p class="mt-4 font-bold">¡Perder estas fechas límite puede impedir permanentemente su reclamo!</p>
        </div>

        <h2 id="lesiones-cubiertas">🏥 Qué Lesiones Están Cubiertas</h2>

        <h3>Tipos de Lesiones Laborales Cubiertas</h3>
        <div class="bg-blue-50 p-6 rounded-lg mb-6">
          <h4>Lesiones por Accidente Súbito</h4>
          <ul>
            <li>Resbalones, tropezones y caídas en el trabajo</li>
            <li>Cortes, laceraciones y heridas punzantes</li>
            <li>Quemaduras por químicos o equipo</li>
            <li>Huesos rotos y fracturas</li>
            <li>Lesiones oculares por escombros o químicos</li>
            <li>Accidentes de maquinaria y lesiones por aplastamiento</li>
            <li>Choque eléctrico y electrocución</li>
            <li>Accidentes vehiculares durante el trabajo</li>
          </ul>

          <h4>Lesiones por Estrés Repetitivo y Uso Excesivo</h4>
          <ul>
            <li>Síndrome del túnel carpiano</li>
            <li>Lesiones de espalda por levantar objetos</li>
            <li>Tendinitis y problemas articulares</li>
            <li>Pérdida auditiva por ruido en el lugar de trabajo</li>
            <li>Problemas de visión por trabajo de computadora</li>
            <li>Discos herniados por movimiento repetitivo</li>
          </ul>

          <h4>Enfermedades Ocupacionales</h4>
          <ul>
            <li>Enfermedades pulmonares por exposición al asbesto</li>
            <li>Envenenamiento químico y exposición</li>
            <li>Condiciones de la piel por químicos del lugar de trabajo</li>
            <li>Cáncer por carcinógenos del lugar de trabajo</li>
            <li>Enfermedades respiratorias por polvo o humos</li>
            <li>Enfermedades infecciosas contraídas en el trabajo</li>
          </ul>
        </div>

        <h3>Probar que Su Lesión Está Relacionada con el Trabajo</h3>
        <p>
          Para recibir beneficios de compensación laboral en Carolina del Norte, debe probar:
        </p>
        <ol>
          <li><strong>Relación de Empleo:</strong> Usted era un empleado (no contratista independiente)</li>
          <li><strong>Lesión por Accidente:</strong> Un incidente específico o inicio gradual debido al trabajo</li>
          <li><strong>Surgiendo del Empleo:</strong> La lesión ocurrió debido a su trabajo</li>
          <li><strong>En el Curso del Empleo:</strong> La lesión ocurrió durante tiempo/actividades de trabajo</li>
          <li><strong>Evidencia Médica:</strong> Prueba médica conectando la lesión al trabajo</li>
        </ol>

        <h3>Escenarios Comunes de Lesiones Relacionadas con el Trabajo</h3>
        <ul>
          <li><strong>Sitios de Construcción:</strong> Caídas, accidentes de equipo, golpeado por objetos</li>
          <li><strong>Manufactura:</strong> Accidentes de maquinaria, lesiones por movimiento repetitivo</li>
          <li><strong>Atención Médica:</strong> Lesiones de espalda por levantar pacientes, pinchazos de aguja</li>
          <li><strong>Trabajo de Oficina:</strong> Túnel carpiano, caídas, lesiones ergonómicas</li>
          <li><strong>Comercio Minorista:</strong> Resbalones y caídas, lesiones por levantar, violencia de clientes</li>
          <li><strong>Transporte:</strong> Accidentes vehiculares, lesiones por cargar/descargar</li>
        </ul>

        <h2 id="presentar-reclamos">📄 Cómo Presentar un Reclamo de Compensación Laboral</h2>

        <h3>Proceso de Presentación Paso a Paso</h3>
        <ol>
          <li><strong>Reportar al Empleador:</strong> Notifique inmediatamente a su supervisor o departamento de RRHH</li>
          <li><strong>Complete el Formulario 18:</strong> Llene el formulario "Aviso al Empleador de Accidente"</li>
          <li><strong>Busque Tratamiento Médico:</strong> Obtenga atención médica inmediata del proveedor aprobado</li>
          <li><strong>Presente el Formulario 18 a la Comisión Industrial:</strong> Envíe dentro de 30 días de la lesión</li>
          <li><strong>El Empleador Presenta el Formulario 19:</strong> El empleador debe presentar "Reporte del Empleador de Lesión"</li>
          <li><strong>Investigación del Seguro:</strong> La aseguradora investiga y toma decisión de cobertura</li>
          <li><strong>Decisión del Formulario 21:</strong> El seguro acepta o niega el reclamo por escrito</li>
          <li><strong>Comienzan los Beneficios:</strong> Si se acepta, los beneficios deben comenzar prontamente</li>
        </ol>

        <h3>Formularios Requeridos y Documentación</h3>
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
          <h4 class="text-xl font-bold text-yellow-800 mb-3">📋 Documentos Esenciales</h4>
          <ul class="text-yellow-800">
            <li><strong>Formulario 18:</strong> Aviso al Empleador de Accidente (usted presenta esto)</li>
            <li><strong>Formulario 19:</strong> Reporte del Empleador de Lesión (el empleador presenta esto)</li>
            <li><strong>Formulario 21:</strong> Admisión o Negación del Reclamo (compañía de seguros)</li>
            <li><strong>Registros Médicos:</strong> Todos los registros de tratamiento y reportes médicos</li>
            <li><strong>Registros de Salarios:</strong> Talones de pago mostrando ganancias antes de la lesión</li>
            <li><strong>Declaraciones de Testigos:</strong> Relatos escritos de compañeros de trabajo</li>
            <li><strong>Reportes de Incidentes:</strong> Cualquier reporte interno de accidentes de la compañía</li>
          </ul>
        </div>

        <h3>La Investigación de la Compañía de Seguros</h3>
        <p>
          Después de que presente su reclamo, la compañía de seguros:
        </p>
        <ul>
          <li>Revisará sus registros médicos y tratamiento</li>
          <li>Lo entrevistará sobre el accidente</li>
          <li>Entrevistará testigos y compañeros de trabajo</li>
          <li>Inspeccionará la escena del accidente</li>
          <li>Revisará registros de empleo y nómina</li>
          <li>Posiblemente conducirá vigilancia de sus actividades</li>
          <li>Le hará un examen con su médico</li>
        </ul>

        <h2 id="beneficios-disponibles">💰 Tipos de Beneficios de Compensación Laboral Disponibles</h2>

        <h3>Beneficios Médicos</h3>
        <div class="bg-green-50 p-6 rounded-lg mb-6">
          <h4>Gastos Médicos Cubiertos</h4>
          <ul>
            <li><strong>Tratamiento de Emergencia:</strong> Atención inmediata después de la lesión</li>
            <li><strong>Visitas Médicas:</strong> Médicos aprobados y especialistas</li>
            <li><strong>Atención Hospitalaria:</strong> Tratamiento de internos y externos</li>
            <li><strong>Cirugía:</strong> Procedimientos quirúrgicos necesarios</li>
            <li><strong>Terapia Física:</strong> Rehabilitación y recuperación</li>
            <li><strong>Medicamentos Recetados:</strong> Relacionados con la lesión laboral</li>
            <li><strong>Equipo Médico:</strong> Sillas de ruedas, aparatos ortopédicos, prótesis</li>
            <li><strong>Millaje:</strong> Viaje a citas médicas aprobadas</li>
          </ul>
        </div>

        <h3>Beneficios de Pérdida de Salarios (Beneficios de Indemnización)</h3>
        <p>
          Carolina del Norte proporciona diferentes tipos de reemplazo de salario basado en su nivel de discapacidad:
        </p>

        <h4>Discapacidad Total Temporal (TTD)</h4>
        <ul>
          <li><strong>Cuándo:</strong> Incapaz de trabajar mientras se recupera</li>
          <li><strong>Cantidad:</strong> 66⅔% del salario semanal promedio</li>
          <li><strong>Máximo:</strong> $1,065 por semana (tasa 2024)</li>
          <li><strong>Período de Espera:</strong> 7 días antes de que comiencen los beneficios</li>
          <li><strong>Duración:</strong> Hasta que pueda regresar al trabajo o alcance mejoría máxima</li>
        </ul>

        <h4>Discapacidad Parcial Temporal (TPD)</h4>
        <ul>
          <li><strong>Cuándo:</strong> Puede trabajar pero a capacidad/salarios reducidos</li>
          <li><strong>Cantidad:</strong> 66⅔% de la diferencia de pérdida de salario</li>
          <li><strong>Ejemplo:</strong> Si ganaba $600/semana pero ahora gana $400, recibe 66⅔% de $200 = $133</li>
        </ul>

        <h4>Discapacidad Parcial Permanente (PPD)</h4>
        <ul>
          <li><strong>Cuándo:</strong> Impedimento permanente pero aún puede trabajar</li>
          <li><strong>Lesiones Programadas:</strong> Compensación específica por pérdida de partes del cuerpo</li>
          <li><strong>Lesiones No Programadas:</strong> Basada en porcentaje de discapacidad total</li>
          <li><strong>Ejemplos:</strong> Pérdida de dedo (40 semanas), pérdida de mano (200 semanas)</li>
        </ul>

        <h4>Discapacidad Total Permanente (PTD)</h4>
        <ul>
          <li><strong>Cuándo:</strong> Permanentemente incapaz de trabajar en cualquier capacidad</li>
          <li><strong>Cantidad:</strong> 66⅔% del salario semanal promedio de por vida</li>
          <li><strong>Raro:</strong> Muy difícil de probar en Carolina del Norte</li>
        </ul>

        <h3>Beneficios por Muerte</h3>
        <div class="bg-blue-50 p-6 rounded-lg mb-6">
          <h4>Beneficios para Sobrevivientes</h4>
          <ul>
            <li><strong>Gastos de Entierro:</strong> Hasta $10,000 para costos funerarios</li>
            <li><strong>Viudo/Viuda:</strong> 66⅔% del salario del trabajador fallecido</li>
            <li><strong>Hijos:</strong> Beneficios adicionales para hijos dependientes</li>
            <li><strong>Duración:</strong> Hasta nuevo matrimonio o muerte para cónyuge; hasta los 18 años para hijos</li>
            <li><strong>Máximo:</strong> Igual al beneficio semanal máximo del trabajador</li>
          </ul>
        </div>

        <h2 id="reclamos-denegados">❌ Lidiar con Reclamos de Compensación Laboral Denegados</h2>

        <h3>Razones Comunes para Denegación de Reclamos</h3>
        <ul>
          <li><strong>Reporte Tardío:</strong> Falla en reportar dentro de 30 días</li>
          <li><strong>No Relacionado con el Trabajo:</strong> El seguro reclama que la lesión no ocurrió en el trabajo</li>
          <li><strong>Condición Preexistente:</strong> Reclamando que la lesión era preexistente</li>
          <li><strong>Contratista Independiente:</strong> Disputando el estatus de empleado</li>
          <li><strong>Intoxicación:</strong> Reclamando que el trabajador estaba ebrio o drogado</li>
          <li><strong>Lesión Intencional:</strong> Alegando que el trabajador se lesionó a sí mismo a propósito</li>
          <li><strong>Fuera del Alcance:</strong> Reclamando que la lesión ocurrió fuera de los deberes laborales</li>
          <li><strong>Disputas Médicas:</strong> No estar de acuerdo con la opinión del médico tratante</li>
        </ul>

        <h3>Qué Hacer Cuando Su Reclamo Es Denegado</h3>
        <div class="bg-red-50 border-l-4 border-red-400 p-6 mb-6">
          <h4 class="text-xl font-bold text-red-800 mb-3">🚨 ACCIÓN INMEDIATA REQUERIDA</h4>
          <ol class="text-red-800">
            <li><strong>No Entre en Pánico:</strong> Las denegaciones son comunes y a menudo se revierten</li>
            <li><strong>Lea la Denegación Cuidadosamente:</strong> Entienda las razones específicas</li>
            <li><strong>Reúna Evidencia:</strong> Recolecte registros médicos, declaraciones de testigos</li>
            <li><strong>Solicite una Audiencia:</strong> Presente el Formulario 33 dentro de 30 días</li>
            <li><strong>Continue el Tratamiento Médico:</strong> No deje de tratar la lesión</li>
            <li><strong>Contacte a un Abogado:</strong> La representación legal es crucial</li>
            <li><strong>Documente Todo:</strong> Mantenga registros detallados</li>
          </ol>
        </div>

        <h3>El Proceso de Apelación</h3>
        <ol>
          <li><strong>Solicitud de Audiencia:</strong> Presente el Formulario 33 con la Comisión Industrial</li>
          <li><strong>Mediación:</strong> Intento de resolver la disputa sin juicio</li>
          <li><strong>Descubrimiento:</strong> Intercambio de evidencia e información</li>
          <li><strong>Conferencia Pre-Juicio:</strong> El juez intenta arreglo</li>
          <li><strong>Audiencia:</strong> Juicio ante el Comisionado Adjunto</li>
          <li><strong>Opinión y Premio:</strong> Decisión escrita del juez</li>
          <li><strong>Apelación:</strong> Puede apelar a la Comisión Completa, luego a la Corte de Apelaciones</li>
        </ol>

        <h3>Construyendo un Caso Fuerte para Apelación</h3>
        <ul>
          <li><strong>Evidencia Médica:</strong> Documentación médica fuerte de lesión relacionada con el trabajo</li>
          <li><strong>Testimonio de Testigos:</strong> Compañeros de trabajo que vieron el accidente</li>
          <li><strong>Testimonio de Expertos:</strong> Expertos médicos apoyando su caso</li>
          <li><strong>Registros de Empleo:</strong> Probando estatus de empleado y deberes laborales</li>
          <li><strong>Documentación del Incidente:</strong> Fotos, reportes, violaciones de seguridad</li>
          <li><strong>Testimonio Creíble:</strong> Relato consistente y honesto de los eventos</li>
        </ul>

        <h2 id="discapacidad-permanente">🦽 Beneficios de Discapacidad Permanente</h2>

        <h3>Entendiendo las Calificaciones de Discapacidad Permanente</h3>
        <p>
          Cuando alcance "mejoría médica máxima" (MMI), un médico evaluará su impedimento permanente. Esta calificación determina sus beneficios continuos.
        </p>

        <h3>Lesiones Programadas vs. No Programadas</h3>
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
          <h4 class="text-xl font-bold text-yellow-800 mb-3">📊 Lesiones Programadas (Partes Específicas del Cuerpo)</h4>
          <ul class="text-yellow-800">
            <li><strong>Brazo:</strong> 240 semanas máximo</li>
            <li><strong>Mano:</strong> 200 semanas máximo</li>
            <li><strong>Pulgar:</strong> 60 semanas máximo</li>
            <li><strong>Primer Dedo:</strong> 40 semanas máximo</li>
            <li><strong>Pierna:</strong> 200 semanas máximo</li>
            <li><strong>Pie:</strong> 144 semanas máximo</li>
            <li><strong>Ojo:</strong> 120 semanas máximo</li>
            <li><strong>Audición (un oído):</strong> 50 semanas máximo</li>
          </ul>
        </div>

        <h4>Lesiones No Programadas (Espalda, Cuello, Cabeza, etc.)</h4>
        <ul>
          <li>Basada en porcentaje de discapacidad total al cuerpo en su totalidad</li>
          <li>Máximo de 300 semanas de beneficios</li>
          <li>Proceso de evaluación más complejo</li>
          <li>Considera impacto en capacidad de ganancia</li>
        </ul>

        <h3>Factores que Afectan las Calificaciones de Discapacidad Permanente</h3>
        <ul>
          <li><strong>Impedimento Médico:</strong> Hallazgos médicos objetivos</li>
          <li><strong>Limitaciones Funcionales:</strong> Lo que puede y no puede hacer</li>
          <li><strong>Edad y Educación:</strong> Impacto en empleabilidad futura</li>
          <li><strong>Experiencia Laboral:</strong> Habilidades y capacidades transferibles</li>
          <li><strong>Dolor y Sufrimiento:</strong> Dolor continuo y limitaciones</li>
          <li><strong>Impacto Vocacional:</strong> Efecto en capacidad para ganar salarios</li>
        </ul>

        <h3>Maximizando Su Calificación de Discapacidad Permanente</h3>
        <ul>
          <li>Complete todo el tratamiento médico recomendado</li>
          <li>Asista a todas las citas médicas</li>
          <li>Sea honesto sobre limitaciones y niveles de dolor</li>
          <li>Siga con la terapia física</li>
          <li>Documente limitaciones diarias y dificultades</li>
          <li>Considere evaluación de rehabilitación vocacional</li>
          <li>Obtenga segundas opiniones médicas cuando sea apropiado</li>
        </ul>

        <h2 id="tratamiento-medico">🏥 Derechos y Problemas de Tratamiento Médico</h2>

        <h3>Su Derecho al Tratamiento Médico</h3>
        <div class="bg-green-50 border-l-4 border-green-400 p-6 mb-6">
          <h4 class="text-xl font-bold text-green-800 mb-3">✅ Sus Derechos Médicos</h4>
          <ul class="text-green-800">
            <li><strong>Atención Inmediata:</strong> Derecho al tratamiento de emergencia</li>
            <li><strong>Tratamiento Continuo:</strong> Toda la atención médica necesaria</li>
            <li><strong>Referencias a Especialistas:</strong> Cuando sea necesario para su condición</li>
            <li><strong>Segundas Opiniones:</strong> Derecho a opiniones médicas adicionales</li>
            <li><strong>Sin Copagos:</strong> Sin costos de bolsillo para tratamiento cubierto</li>
            <li><strong>Cobertura de Prescripciones:</strong> Todos los medicamentos relacionados</li>
            <li><strong>Reembolso de Millaje:</strong> Viaje a citas médicas</li>
          </ul>
        </div>

        <h3>Eligiendo Su Médico</h3>
        <p>
          En Carolina del Norte, la compañía de seguros inicialmente controla el tratamiento médico, pero usted tiene derechos:
        </p>
        <ul>
          <li><strong>Tratamiento Inicial:</strong> La compañía de seguros elige el primer médico</li>
          <li><strong>Cambio de Médicos:</strong> Puede solicitar cambio por causa justificada</li>
          <li><strong>Segundas Opiniones:</strong> Tiene derecho a evaluación médica independiente</li>
          <li><strong>Atención de Especialistas:</strong> Debe proporcionarse cuando sea médicamente necesario</li>
          <li><strong>Atención de Emergencia:</strong> Puede ir a cualquier hospital en emergencia</li>
        </ul>

        <h3>Exámenes Médicos Independientes (IMEs)</h3>
        <div class="bg-red-50 border-l-4 border-red-400 p-6 mb-6">
          <h4 class="text-xl font-bold text-red-800 mb-3">⚠️ Conozca Sus Derechos en los IMEs</h4>
          <ul class="text-red-800">
            <li><strong>Propósito:</strong> El médico de la compañía de seguros evalúa su condición</li>
            <li><strong>Asistencia:</strong> Usualmente requerido asistir</li>
            <li><strong>Traer Abogado:</strong> Puede traer a alguien con usted</li>
            <li><strong>Grabar Examen:</strong> Permitido en algunas circunstancias</li>
            <li><strong>Sea Honesto:</strong> No exagere ni minimice síntomas</li>
            <li><strong>Manténgase Consistente:</strong> Mantenga relatos de limitaciones consistentes</li>
            <li><strong>Sin Tratamiento:</strong> Los médicos de IME no proporcionan tratamiento</li>
          </ul>
        </div>

        <h3>Disputas Comunes de Tratamiento Médico</h3>
        <ul>
          <li><strong>Denegaciones de Tratamiento:</strong> El seguro se niega a autorizar atención</li>
          <li><strong>Aprobaciones de Cirugía:</strong> Disputas sobre necesidad de cirugía</li>
          <li><strong>Cobertura de Medicamentos:</strong> Negándose a pagar prescripciones</li>
          <li><strong>Terapia Física:</strong> Limitando número de sesiones</li>
          <li><strong>Referencias a Especialistas:</strong> Negando acceso a especialistas</li>
          <li><strong>Equipo Médico:</strong> Negándose a sillas de ruedas, aparatos ortopédicos, etc.</li>
        </ul>

        <h2 id="regreso-trabajo">👷 Problemas de Regreso al Trabajo</h2>

        <h3>Tipos de Regreso al Trabajo</h3>
        <ol>
          <li><strong>Regreso al Mismo Trabajo:</strong> Recuperación completa, misma posición y pago</li>
          <li><strong>Trabajo Modificado:</strong> Mismo empleador, diferentes deberes o más ligeros</li>
          <li><strong>Trabajo Ligero:</strong> Restricciones temporales hasta recuperación completa</li>
          <li><strong>Nuevo Empleo:</strong> Trabajo diferente debido a restricciones permanentes</li>
          <li><strong>Rehabilitación Vocacional:</strong> Entrenamiento para nueva carrera</li>
        </ol>

        <h3>Sus Derechos Respecto al Regreso al Trabajo</h3>
        <div class="bg-blue-50 p-6 rounded-lg mb-6">
          <h4>Protecciones Importantes</h4>
          <ul>
            <li><strong>Autorización Médica:</strong> El médico debe aprobar el regreso al trabajo</li>
            <li><strong>Acomodación:</strong> El empleador debe acomodar razonablemente las restricciones</li>
            <li><strong>Sin Represalias:</strong> No puede ser despedido por presentar reclamo de compensación laboral</li>
            <li><strong>Trabajo Adecuado:</strong> El trabajo ofrecido debe estar dentro de sus restricciones</li>
            <li><strong>Pérdida de Salario:</strong> Compensación por capacidad reducida de ganancia</li>
            <li><strong>Derecho a Rechazar:</strong> Puede rechazar ofertas de trabajo inadecuadas</li>
          </ul>
        </div>

        <h3>Trabajo Ligero y Trabajo Modificado</h3>
        <p>
          Cuando su médico le da de alta para trabajo ligero, pueden suceder varias cosas:
        </p>
        <ul>
          <li><strong>El Empleador Ofrece Trabajo Adecuado:</strong> Generalmente debe aceptar</li>
          <li><strong>No Hay Trabajo Adecuado Disponible:</strong> Continue recibiendo beneficios de salario</li>
          <li><strong>El Empleador Se Niega al Trabajo Ligero:</strong> Puede continuar beneficios de salario</li>
          <li><strong>Usted Rechaza Trabajo Adecuado:</strong> Puede perder beneficios de salario</li>
        </ul>

        <h3>Rehabilitación Vocacional</h3>
        <ul>
          <li><strong>Cuándo Disponible:</strong> Si no puede regresar al trabajo anterior</li>
          <li><strong>Servicios Proporcionados:</strong> Reentrenamiento laboral, educación, colocación laboral</li>
          <li><strong>Financiamiento:</strong> Hasta $15,000 en Carolina del Norte</li>
          <li><strong>Duración:</strong> Típicamente 2 años máximo</li>
          <li><strong>Cooperación Requerida:</strong> Debe participar de buena fe</li>
        </ul>

        <h2 id="reclamos-terceros">⚖️ Reclamos de Terceros y Compensación Adicional</h2>

        <h3>Cuándo Puede Presentar Reclamos Adicionales</h3>
        <p>
          La compensación laboral es usualmente su recurso exclusivo contra su empleador, pero puede tener reclamos adicionales contra terceros que contribuyeron a su lesión.
        </p>

        <div class="bg-green-50 border-l-4 border-green-400 p-6 mb-6">
          <h4 class="text-xl font-bold text-green-800 mb-3">💰 Oportunidades de Reclamos de Terceros</h4>
          <ul class="text-green-800">
            <li><strong>Accidentes de Vehículos Motores:</strong> Otros conductores en choques relacionados con el trabajo</li>
            <li><strong>Productos Defectuosos:</strong> Fabricantes de equipo peligroso</li>
            <li><strong>Responsabilidad de Locales:</strong> Dueños de propiedad donde fue lesionado</li>
            <li><strong>Subcontratistas:</strong> Otras compañías trabajando en su sitio de trabajo</li>
            <li><strong>Exposición Química:</strong> Compañías que fabricaron sustancias tóxicas</li>
            <li><strong>Fabricantes de Equipo:</strong> Hacedores de maquinaria defectuosa</li>
          </ul>
        </div>

        <h3>Beneficios de Reclamos de Terceros</h3>
        <ul>
          <li><strong>Recuperación Completa de Salario:</strong> 100% de salarios perdidos vs. 66⅔% en compensación laboral</li>
          <li><strong>Dolor y Sufrimiento:</strong> Compensación por dolor (no disponible en compensación laboral)</li>
          <li><strong>Pérdidas Futuras:</strong> Compensación completa por capacidad reducida de ganancia</li>
          <li><strong>Sin Límites de Beneficios:</strong> Sin límites máximos de beneficios semanales</li>
          <li><strong>Daños Punitivos:</strong> Daños adicionales por negligencia grave</li>
        </ul>

        <h3>Escenarios Comunes de Terceros</h3>
        <h4>Accidentes en Sitios de Construcción</h4>
        <ul>
          <li>Operador de grúa de compañía diferente causa accidente</li>
          <li>Andamio defectuoso fabricado por tercero</li>
          <li>Mantenimiento negligente del dueño de la propiedad</li>
          <li>Prácticas de trabajo inseguras del subcontratista</li>
        </ul>

        <h4>Accidentes Vehiculares Durante el Trabajo</h4>
        <ul>
          <li>Conductor de reparto golpeado por conductor negligente</li>
          <li>Vehículo de compañía con frenos defectuosos</li>
          <li>Condiciones peligrosas del camino mantenidas por municipalidad</li>
          <li>Otro conductor bajo influencia de alcohol/drogas</li>
        </ul>

        <h3>Coordinación de Beneficios</h3>
        <p>
          Si recibe tanto compensación laboral como recuperación de terceros:
        </p>
        <ul>
          <li><strong>Subrogación:</strong> La aseguradora de compensación laboral puede buscar reembolso</li>
          <li><strong>Crédito:</strong> La recuperación de terceros puede reducir futuros beneficios de compensación laboral</li>
          <li><strong>Recuperación Neta:</strong> Usted mantiene la diferencia después del reembolso</li>
          <li><strong>Honorarios de Abogado:</strong> Usualmente deducidos de la recuperación bruta</li>
        </ul>

        <h2 id="tacticas-empleador">🛡️ Tácticas Comunes de Empleadores y Compañías de Seguros</h2>

        <h3>Tácticas de Empleadores a Vigilar</h3>
        <div class="bg-red-50 border-l-4 border-red-400 p-6 mb-6">
          <h4 class="text-xl font-bold text-red-800 mb-3">⚠️ Señales de Alerta del Empleador</h4>
          <ul class="text-red-800">
            <li><strong>Desalentando Reportes:</strong> Diciéndole que no presente un reclamo</li>
            <li><strong>Culpándolo:</strong> Reclamando que la lesión fue su culpa</li>
            <li><strong>Minimizando la Lesión:</strong> Diciendo que la lesión no es seria</li>
            <li><strong>Ofreciendo Trabajo Ligero Inmediatamente:</strong> Para evitar pagar beneficios de salario</li>
            <li><strong>Vigilancia:</strong> Siguiéndolo para atrapar actividades contradictorias</li>
            <li><strong>Presión para Regresar:</strong> Apresurándolo de vuelta al trabajo</li>
            <li><strong>Represalias:</strong> Haciendo su vida laboral difícil</li>
          </ul>
        </div>

        <h3>Tácticas de Compañías de Seguros</h3>
        <ul>
          <li><strong>Tácticas de Retraso:</strong> Esperando que se rinda o acepte arreglo barato</li>
          <li><strong>Vigilancia:</strong> Videograbando sus actividades diarias</li>
          <li><strong>Monitoreo de Redes Sociales:</strong> Vigilando sus publicaciones en línea</li>
          <li><strong>Exámenes Médicos Independientes:</strong> Usando médicos que favorecen la denegación</li>
          <li><strong>Declaraciones Grabadas:</strong> Tratando de obtener declaraciones contradictorias</li>
          <li><strong>Arreglos Rápidos:</strong> Ofertas bajas antes de que conozca el verdadero alcance de la lesión</li>
          <li><strong>Denegaciones de Reclamos:</strong> Esperando que no apele</li>
        </ul>

        <h3>Cómo Protegerse</h3>
        <ul>
          <li><strong>Documente Todo:</strong> Mantenga registros detallados de todas las interacciones</li>
          <li><strong>Siga Consejo Médico:</strong> Asista a todas las citas y siga el tratamiento</li>
          <li><strong>Sea Consistente:</strong> Mantenga su relato del accidente consistente</li>
          <li><strong>Evite Redes Sociales:</strong> Limite publicaciones que puedan sacarse de contexto</li>
          <li><strong>No Dé Declaraciones Grabadas:</strong> Sin abogado presente</li>
          <li><strong>Siga Trabajando si Puede:</strong> No deje trabajo ligero sin excusa médica</li>
          <li><strong>Obtenga Ayuda Legal Temprano:</strong> Contacte a un abogado inmediatamente</li>
        </ul>

        <h2 id="elegir-abogado">🥇 Cuándo Necesita un Abogado de Compensación Laboral</h2>

        <h3>Situaciones que Requieren Representación Legal</h3>
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
          <h4 class="text-xl font-bold text-yellow-800 mb-3">🚨 Obtenga un Abogado Si:</h4>
          <ul class="text-yellow-800">
            <li><strong>Reclamo Denegado:</strong> La compañía de seguros niega su reclamo</li>
            <li><strong>Lesión Seria:</strong> Discapacidad permanente o tratamiento a largo plazo</li>
            <li><strong>Atención Médica Disputada:</strong> El seguro se niega al tratamiento</li>
            <li><strong>Disputas de Regreso al Trabajo:</strong> Problemas con ofertas de trabajo adecuadas</li>
            <li><strong>Reclamos de Terceros:</strong> Partes adicionales pueden ser responsables</li>
            <li><strong>Represalias:</strong> El empleador lo trata diferente</li>
            <li><strong>Ofertas de Arreglo:</strong> El seguro ofrece arreglo</li>
            <li><strong>Terminación de Beneficios:</strong> El seguro deja de pagar beneficios</li>
          </ul>
        </div>

        <h3>Por Qué Elegir Vasquez Law Firm para Compensación Laboral</h3>
        <div class="bg-green-50 border-l-4 border-green-400 p-6 mb-6">
          <h4 class="text-xl font-bold text-green-800 mb-3">🎖️ Representación de Compensación Laboral de Grado Militar</h4>
          <ul class="text-green-800">
            <li><strong>Liderazgo Veterano:</strong> Veteranos militares que entienden servicio y dedicación</li>
            <li><strong>YO PELEO POR TI™:</strong> Literalmente luchamos por sus beneficios con precisión militar</li>
            <li><strong>Honorarios Contingentes:</strong> Sin honorarios a menos que ganemos su caso</li>
            <li><strong>Servicios Bilingües:</strong> Representación completa en inglés y español</li>
            <li><strong>Práctica Estatal:</strong> Con licencia en todo Carolina del Norte</li>
            <li><strong>Experiencia en Comisión Industrial:</strong> Conocimiento profundo del sistema de compensación laboral de NC</li>
            <li><strong>Beneficios Máximos:</strong> Búsqueda agresiva de toda la compensación disponible</li>
            <li><strong>Listo para Juicio:</strong> Preparado para llevar su caso a audiencia cuando sea necesario</li>
          </ul>
        </div>

        <h3>Nuestro Proceso de Compensación Laboral</h3>
        <ol>
          <li><strong>Consulta Gratuita:</strong> Evaluación comprensiva del caso sin costo</li>
          <li><strong>Investigación del Reclamo:</strong> Revisión exhaustiva de su accidente y lesiones</li>
          <li><strong>Coordinación Médica:</strong> Trabajando con sus médicos para tratamiento apropiado</li>
          <li><strong>Maximización de Beneficios:</strong> Asegurando que reciba todos los beneficios a los que tiene derecho</li>
          <li><strong>Representación de Apelaciones:</strong> Luchando contra reclamos denegados ante la Comisión Industrial</li>
          <li><strong>Negociación de Arreglos:</strong> Asegurando compensación máxima por lesiones permanentes</li>
          <li><strong>Reclamos de Terceros:</strong> Buscando compensación adicional de otras partes responsables</li>
          <li><strong>Apoyo Continuo:</strong> Asistencia durante todo su proceso de recuperación</li>
        </ol>

        <h2>📊 Compensación Laboral vs. Lesiones Personales: Diferencias Clave</h2>

        <div class="overflow-x-auto mb-6">
          <table class="w-full border-collapse border border-gray-300">
            <thead>
              <tr class="bg-gray-100">
                <th class="border border-gray-300 p-3 text-left">Aspecto</th>
                <th class="border border-gray-300 p-3 text-left">Compensación Laboral</th>
                <th class="border border-gray-300 p-3 text-left">Demanda de Lesiones Personales</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 p-3 font-semibold">Culpa</td>
                <td class="border border-gray-300 p-3">Sistema sin culpa</td>
                <td class="border border-gray-300 p-3">Debe probar negligencia</td>
              </tr>
              <tr class="bg-gray-50">
                <td class="border border-gray-300 p-3 font-semibold">Beneficios de Salario</td>
                <td class="border border-gray-300 p-3">66⅔% de salarios</td>
                <td class="border border-gray-300 p-3">100% de salarios perdidos</td>
              </tr>
              <tr>
                <td class="border border-gray-300 p-3 font-semibold">Dolor y Sufrimiento</td>
                <td class="border border-gray-300 p-3">No disponible</td>
                <td class="border border-gray-300 p-3">Disponible</td>
              </tr>
              <tr class="bg-gray-50">
                <td class="border border-gray-300 p-3 font-semibold">Beneficios Médicos</td>
                <td class="border border-gray-300 p-3">100% de cobertura</td>
                <td class="border border-gray-300 p-3">100% si gana</td>
              </tr>
              <tr>
                <td class="border border-gray-300 p-3 font-semibold">Tiempo para Resolución</td>
                <td class="border border-gray-300 p-3">Más rápido (meses)</td>
                <td class="border border-gray-300 p-3">Más lento (años)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>📍 Servimos Todo Carolina del Norte</h2>

        <h3>Ciudades Principales que Servimos</h3>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <ul>
            <li>• Raleigh</li>
            <li>• Charlotte</li>
            <li>• Greensboro</li>
            <li>• Durham</li>
            <li>• Winston-Salem</li>
          </ul>
          <ul>
            <li>• Fayetteville</li>
            <li>• Cary</li>
            <li>• Wilmington</li>
            <li>• High Point</li>
            <li>• Greenville</li>
          </ul>
          <ul>
            <li>• Asheville</li>
            <li>• Gastonia</li>
            <li>• Rocky Mount</li>
            <li>• Burlington</li>
            <li>• Wilson</li>
          </ul>
        </div>

        <h3>Industrias que Representamos</h3>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <ul>
            <li>• Construcción</li>
            <li>• Manufactura</li>
            <li>• Atención Médica</li>
            <li>• Transporte</li>
            <li>• Comercio Minorista</li>
          </ul>
          <ul>
            <li>• Almacenamiento</li>
            <li>• Restaurantes</li>
            <li>• Trabajo de Oficina</li>
            <li>• Gobierno</li>
            <li>• Agricultura</li>
          </ul>
          <ul>
            <li>• Minería</li>
            <li>• Servicios Públicos</li>
            <li>• Educación</li>
            <li>• Seguridad Pública</li>
            <li>• Y Muchas Más</li>
          </ul>
        </div>

        <h2>🎯 Tome Acción Ahora - Sus Beneficios Dependen De Ello</h2>

        <div class="bg-red-600 text-white p-8 rounded-lg mb-8">
          <h3 class="text-2xl font-bold mb-4 text-center">⏰ EL TIEMPO ES CRÍTICO PARA SU RECLAMO DE COMPENSACIÓN LABORAL</h3>
          <p class="text-lg mb-6 text-center">
            La evidencia desaparece, las fechas límite pasan, y las compañías de seguros comienzan a construir su defensa inmediatamente. 
            No les permita negar sus beneficios legítimos mientras usted espera.
          </p>
          
          <div class="text-center space-y-4">
            <h4 class="text-xl font-bold">🎖️ YO PELEO POR TI™ - LUCHO POR USTED</h4>
            <p class="text-lg">
              Como veteranos militares, traemos la misma dedicación a su lucha por beneficios de compensación laboral que trajimos a servir nuestro país. 
              Su batalla por beneficios legítimos se convierte en nuestra misión.
            </p>
            
            <div class="flex flex-col md:flex-row gap-4 justify-center items-center mt-6">
              <a href="tel:9195193312" class="bg-yellow-400 text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300">
                📞 LLAME AHORA: (919) 519-3312
              </a>
              <a href="/es/contacto" class="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-red-600">
                💬 CONSULTA GRATUITA
              </a>
            </div>
            
            <p class="text-sm mt-4">
              Sin honorarios a menos que ganemos su caso - La acción inmediata protege sus derechos<br>
              Se habla español - Servicios bilingües disponibles
            </p>
          </div>
        </div>

        <h2>❓ Preguntas Frecuentes</h2>

        <h3>¿Puedo ser despedido por presentar un reclamo de compensación laboral?</h3>
        <p>
          No, la ley de Carolina del Norte prohíbe represalias por presentar un reclamo de compensación laboral. Sin embargo, probar represalias puede ser complejo, y debe contactar a un abogado inmediatamente si enfrenta acciones laborales adversas.
        </p>

        <h3>¿Qué pasa si mi lesión fue mi culpa?</h3>
        <p>
          La compensación laboral es un sistema "sin culpa", significando que puede recibir beneficios incluso si el accidente fue parcial o totalmente su culpa (excepto en casos de lesión intencional propia o intoxicación).
        </p>

        <h3>¿Cuánto costará un abogado de compensación laboral?</h3>
        <p>
          Trabajamos en base de honorarios contingentes, significando que no paga nada a menos que ganemos su caso. Los honorarios de abogado son típicamente un porcentaje de los beneficios recuperados y están regulados por la ley de Carolina del Norte.
        </p>

        <h3>¿Puedo elegir mi propio médico para tratamiento?</h3>
        <p>
          Inicialmente, la compañía de seguros controla el tratamiento médico, pero puede solicitar un cambio de médico por causa justificada, buscar segundas opiniones, y tiene derechos a atención especializada apropiada.
        </p>

        <h3>¿Qué pasa si tengo una condición preexistente?</h3>
        <p>
          Aún puede recibir beneficios de compensación laboral si su lesión laboral agravó o aceleró una condición preexistente. La clave es probar que su trabajo causó un empeoramiento significativo de la condición.
        </p>

        <h3>¿Cuánto duran los beneficios de compensación laboral?</h3>
        <p>
          Depende de su lesión. Los beneficios temporales duran hasta que pueda regresar al trabajo o alcance mejoría médica máxima. Los beneficios de discapacidad parcial permanente tienen límites de tiempo específicos, mientras que los beneficios de discapacidad total permanente pueden durar de por vida.
        </p>

        <h2>📚 Recursos Adicionales</h2>

        <h3>Recursos de Compensación Laboral de Carolina del Norte</h3>
        <ul>
          <li><a href="https://www.ic.nc.gov/" target="_blank">Comisión Industrial de NC</a></li>
          <li><a href="https://www.labor.nc.gov/" target="_blank">Departamento de Trabajo de NC</a></li>
          <li><a href="https://www.osha.gov/" target="_blank">Administración de Seguridad y Salud Ocupacional</a></li>
          <li><a href="https://www.ncdoi.gov/" target="_blank">Departamento de Seguros de NC</a></li>
        </ul>

        <h3>Guías Legales Relacionadas</h3>
        <ul>
          <li><a href="/es/blog/guia-lesiones-personales-carolina-norte">Guía Completa de Lesiones Personales</a></li>
          <li><a href="/es/recursos/seguridad-laboral">Derechos de Seguridad en el Lugar de Trabajo</a></li>
          <li><a href="/es/recursos/beneficios-discapacidad">Información de Beneficios de Discapacidad</a></li>
          <li><a href="/es/recursos/derecho-laboral">Protección de Ley Laboral</a></li>
        </ul>

        <h2>Contacte a Vasquez Law Firm Hoy</h2>

        <div class="bg-blue-900 text-white p-8 rounded-lg">
          <div class="text-center mb-6">
            <h3 class="text-3xl font-bold text-yellow-400 mb-2">YO PELEO POR TI™</h3>
            <p class="text-xl">Veteranos Militares Luchando por Sus Beneficios de Compensación Laboral</p>
          </div>
          
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <h4 class="text-xl font-bold mb-4">📞 Información de Contacto</h4>
              <ul class="space-y-2">
                <li><strong>Teléfono:</strong> <a href="tel:9195193312" class="text-yellow-400">(919) 519-3312</a></li>
                <li><strong>Email:</strong> <a href="mailto:info@vasquezlawnc.com" class="text-yellow-400">info@vasquezlawnc.com</a></li>
                <li><strong>Emergencia 24/7:</strong> Disponible para lesiones laborales serias</li>
                <li><strong>Idiomas:</strong> Inglés y Español</li>
                <li><strong>Honorarios:</strong> Sin honorarios a menos que ganemos</li>
              </ul>
            </div>
            
            <div>
              <h4 class="text-xl font-bold mb-4">🏢 Ubicaciones de Oficinas</h4>
              <ul class="space-y-2">
                <li><strong>Raleigh:</strong> Sirviendo el Condado de Wake y áreas circundantes</li>
                <li><strong>Charlotte:</strong> Sirviendo el Condado de Mecklenburg y áreas circundantes</li>
                <li><strong>Servimos:</strong> Todo Carolina del Norte</li>
                <li><strong>Visitas a Casa/Hospital:</strong> Disponibles para trabajadores severamente lesionados</li>
              </ul>
            </div>
          </div>
          
          <div class="text-center mt-8">
            <a href="/es/contacto" class="bg-yellow-400 text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300">
              PROGRAME SU CONSULTA GRATUITA DE COMPENSACIÓN LABORAL
            </a>
          </div>
        </div>

        <div class="mt-8 text-center text-gray-600">
          <p>
            <strong>Descargo de responsabilidad:</strong> Esta publicación de blog es solo para fines informativos y no constituye asesoramiento legal. 
            Cada caso de compensación laboral es único, y debe consultar con un abogado calificado sobre su situación específica. 
            Publicidad de abogado. Los resultados anteriores no garantizan resultados futuros.
          </p>
        </div>
      </div>
    `,
    practiceArea: 'compensacion-laboral',
    language: 'es' as const,
    publishedAt: new Date('2024-01-22T10:00:00.000Z'),
    readTime: 35,
    author: DEFAULT_BLOG_AUTHOR,
    tags: [
      'Compensación Laboral',
      'Carolina del Norte',
      'Lesiones Laborales',
      'Reclamos Denegados',
      'Discapacidad Permanente',
      'Tratamiento Médico',
      'Regreso al Trabajo',
      'Reclamos de Terceros',
      'Comisión Industrial',
      'YO PELEO POR TI',
      'Abogado Hispano',
      'Servicios Bilingües',
      'Trabajadores Latinos',
      'Beneficios Trabajadores',
    ],
    featuredImage: '/images/blog/guia-compensacion-laboral-carolina-norte.jpg',
    views: 0,
  };

  const categories = [
    {
      id: 'compensacion-laboral',
      name: { en: "Workers' Compensation", es: 'Compensación Laboral' },
      slug: { en: 'workers-compensation', es: 'compensacion-laboral' },
      icon: '👷',
      postCount: 18,
    },
    {
      id: 'lesiones-personales',
      name: { en: 'Personal Injury', es: 'Lesiones Personales' },
      slug: { en: 'personal-injury', es: 'lesiones-personales' },
      icon: '🏥',
      postCount: 32,
    },
    {
      id: 'defensa-criminal',
      name: { en: 'Criminal Defense', es: 'Defensa Criminal' },
      slug: { en: 'criminal-defense', es: 'defensa-criminal' },
      icon: '⚖️',
      postCount: 28,
    },
  ];

  const relatedPosts = [
    {
      id: 'arreglos-lesiones-laborales',
      title: 'Maximizando Su Arreglo de Lesión Laboral en Carolina del Norte',
      slug: 'arreglos-lesiones-laborales-carolina-norte',
      excerpt:
        'Aprenda cómo maximizar su arreglo de compensación laboral en NC, incluyendo calificaciones de discapacidad permanente, reclamos de terceros y estrategias de negociación.',
      practiceArea: 'compensacion-laboral',
      language: 'es' as const,
      publishedAt: new Date('2024-01-18T10:00:00.000Z'),
      readTime: 20,
      author: DEFAULT_BLOG_AUTHOR,
      tags: ['Compensación Laboral', 'Arreglos', 'Carolina del Norte'],
    },
    {
      id: 'reclamos-compensacion-denegados',
      title: 'Qué Hacer Cuando Su Reclamo de Compensación Laboral es Denegado',
      slug: 'reclamos-compensacion-denegados-carolina-norte',
      excerpt:
        'Guía completa para apelar reclamos denegados de compensación laboral en NC, incluyendo razones comunes de denegación y estrategias para ganar apelaciones.',
      practiceArea: 'compensacion-laboral',
      language: 'es' as const,
      publishedAt: new Date('2024-01-15T10:00:00.000Z'),
      readTime: 18,
      author: DEFAULT_BLOG_AUTHOR,
      tags: ['Reclamos Denegados', 'Apelaciones Compensación Laboral', 'Carolina del Norte'],
    },
    {
      id: 'derechos-trabajadores-construccion',
      title: 'Derechos y Seguridad de Trabajadores de Construcción en Carolina del Norte',
      slug: 'derechos-trabajadores-construccion-carolina-norte',
      excerpt:
        'Conozca sus derechos como trabajador de construcción en NC, incluyendo beneficios de compensación laboral, protecciones de seguridad y reclamos de lesiones de terceros.',
      practiceArea: 'compensacion-laboral',
      language: 'es' as const,
      publishedAt: new Date('2024-01-12T10:00:00.000Z'),
      readTime: 16,
      author: DEFAULT_BLOG_AUTHOR,
      tags: ['Trabajadores de Construcción', 'Seguridad Laboral', 'Derechos de Trabajadores'],
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
