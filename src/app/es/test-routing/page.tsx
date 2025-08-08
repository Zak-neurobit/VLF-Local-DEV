export default function TestRoutingPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Test Routing Page</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Location Pages Test</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800 p-4 rounded">
                <h3 className="font-semibold mb-2">North Carolina Cities</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/ubicaciones/nc/charlotte" className="text-blue-600 hover:underline">
                      /locations/nc/charlotte
                    </a>
                  </li>
                  <li>
                    <a href="/ubicaciones/nc/raleigh" className="text-blue-600 hover:underline">
                      /locations/nc/raleigh
                    </a>
                  </li>
                  <li>
                    <a href="/ubicaciones/nc/durham" className="text-blue-600 hover:underline">
                      /locations/nc/durham
                    </a>
                  </li>
                  <li>
                    <a href="/ubicaciones/nc/greensboro" className="text-blue-600 hover:underline">
                      /locations/nc/greensboro
                    </a>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-800 p-4 rounded">
                <h3 className="font-semibold mb-2">Florida Cities</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/ubicaciones/fl/orlando" className="text-blue-600 hover:underline">
                      /locations/fl/orlando
                    </a>
                  </li>
                  <li>
                    <a href="/ubicaciones/fl/tampa" className="text-blue-600 hover:underline">
                      /locations/fl/tampa
                    </a>
                  </li>
                  <li>
                    <a href="/ubicaciones/fl/miami" className="text-blue-600 hover:underline">
                      /locations/fl/miami
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Location + Service Pages Test</h2>
            <ul className="space-y-2">
              <li>
                <a
                  href="/ubicaciones/nc/charlotte/immigration-lawyer"
                  className="text-blue-600 hover:underline"
                >
                  /locations/nc/charlotte/immigration-lawyer
                </a>
              </li>
              <li>
                <a
                  href="/ubicaciones/nc/charlotte/personal-injury-attorney"
                  className="text-blue-600 hover:underline"
                >
                  /locations/nc/charlotte/personal-injury-attorney
                </a>
              </li>
              <li>
                <a
                  href="/ubicaciones/fl/orlando/workers-compensation"
                  className="text-blue-600 hover:underline"
                >
                  /locations/fl/orlando/workers-compensation
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Static Pages Test</h2>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-blue-600 hover:underline">
                  Home (/)
                </a>
              </li>
              <li>
                <a href="/contact" className="text-blue-600 hover:underline">
                  Contacto
                </a>
              </li>
              <li>
                <a href="/attorneys" className="text-blue-600 hover:underline">
                  Abogados
                </a>
              </li>
              <li>
                <a href="/practice-areas" className="text-blue-600 hover:underline">
                  Áreas de Práctica
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Spanish Pages Test</h2>
            <ul className="space-y-2">
              <li>
                <a href="/es" className="text-blue-600 hover:underline">
                  Spanish Home (/es)
                </a>
              </li>
              <li>
                <a href="/es/contacto" className="text-blue-600 hover:underline">
                  Spanish Contacto
                </a>
              </li>
              <li>
                <a href="/es/abogados" className="text-blue-600 hover:underline">
                  Spanish Abogados
                </a>
              </li>
            </ul>
          </section>
        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Debug Info</h3>
          <p className="text-sm text-gray-300">
            This page tests various routes on the website. Click any link to verify it loads
            correctly. If you see a 500 error, check the browser console and Vercel logs for
            details.
          </p>
        </div>
      </div>
    </div>
  );
}
