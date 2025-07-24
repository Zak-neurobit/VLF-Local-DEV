import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// Force dynamic rendering for all location pages
export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 86400; // 24 hours

// Only pre-generate a few critical location pages
export async function generateStaticParams() {
  // Only generate priority locations at build time
  const priorityLocations = [
    { state: 'nc', city: 'charlotte' },
    { state: 'nc', city: 'raleigh' },
    { state: 'nc', city: 'durham' },
    { state: 'nc', city: 'greensboro' },
    { state: 'nc', city: 'winston-salem' },
    { state: 'fl', city: 'orlando' },
    { state: 'fl', city: 'tampa' },
  ];

  return priorityLocations.map(({ state, city }) => ({
    slug: [state, city],
  }));
}

// Dynamic metadata generation
export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const [state, city, service] = params.slug;

  if (!state || !city) {
    return {
      title: 'Locations | Vasquez Law Firm',
      description: 'Find Vasquez Law Firm offices near you.',
    };
  }

  // Generate metadata inline to avoid import issues
  const cityName = city
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const stateUpper = state.toUpperCase();

  const baseTitle = `${cityName}, ${stateUpper}`;
  const title = service
    ? `${service
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')} in ${baseTitle}`
    : `${baseTitle} Attorneys | Vasquez Law Firm`;

  const description = service
    ? `Expert ${service.replace(/-/g, ' ')} services in ${cityName}, ${stateUpper}. Free consultation: 1-844-YO-PELEO`
    : `Top-rated attorneys serving ${cityName}, ${stateUpper}. Immigration, personal injury, criminal defense, and workers' compensation. Free consultation: 1-844-YO-PELEO`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://vasquezlawnc.com/locations/${state}/${city}${service ? `/${service}` : ''}`,
    },
  };
}

// Dynamic location page that loads the appropriate component
export default async function DynamicLocationPage({ params }: { params: { slug: string[] } }) {
  try {
    // Ensure params exist
    if (!params || !params.slug || !Array.isArray(params.slug)) {
      console.error('Invalid params:', params);
      notFound();
    }

    const [state, city, service] = params.slug;

    if (!state || !city) {
      notFound();
    }

    // For now, always render the default template
    // In production, this would load specific components dynamically
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            {city
              .split('-')
              .map(w => w.charAt(0).toUpperCase() + w.slice(1))
              .join(' ')}
            , {state.toUpperCase()}
          </h1>
          <p className="text-gray-600 mb-8">
            Contact Vasquez Law Firm at 1-844-YO-PELEO for legal assistance in your area.
          </p>
          
          {service && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">
                {service
                  .split('-')
                  .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(' ')} Services
              </h2>
              <p className="text-gray-600">
                Our experienced attorneys specialize in {service.replace(/-/g, ' ')} cases in {city.replace(/-/g, ' ')}, {state.toUpperCase()}.
              </p>
            </div>
          )}

          <div className="mt-12 bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Free Consultation</h3>
            <p className="mb-4">Get expert legal advice for your case.</p>
            <a
              href="/contact"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Schedule Consultation
            </a>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in DynamicLocationPage:', error);
    // Return a fallback page instead of throwing
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Location Page</h1>
          <p className="text-gray-600">
            We're experiencing technical difficulties. Please contact us at 1-844-YO-PELEO.
          </p>
        </div>
      </div>
    );
  }
}
