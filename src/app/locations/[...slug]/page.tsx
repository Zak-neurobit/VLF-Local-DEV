import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { loadLocationComponent, loadLocationMetadata, PRIORITY_LOCATIONS } from '@/lib/location-loader';

// Force dynamic rendering for all location pages
export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 86400; // 24 hours

// Only pre-generate a few critical location pages
export async function generateStaticParams() {
  // Only generate priority locations at build time
  return PRIORITY_LOCATIONS.map(({ state, city }) => ({
    slug: [state, city]
  }));
}

// Dynamic metadata generation
export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
  const [state, city, service] = params.slug;
  
  if (!state || !city) {
    return {
      title: 'Locations | Vasquez Law Firm',
      description: 'Find Vasquez Law Firm offices near you.'
    };
  }
  
  return loadLocationMetadata(state, city, service);
}

// Loading component
function LocationLoading() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
}

// Dynamic location page that loads the appropriate component
export default async function DynamicLocationPage({ params }: { params: { slug: string[] } }) {
  const [state, city, service] = params.slug;
  
  if (!state || !city) {
    notFound();
  }
  
  // Dynamically load the location component
  const LocationComponent = await loadLocationComponent(state, city, service);
  
  if (!LocationComponent) {
    // If no specific component exists, render a default template
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            {city.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}, {state.toUpperCase()}
          </h1>
          <p className="text-gray-600">
            Contact Vasquez Law Firm at 1-844-YO-PELEO for legal assistance in your area.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <Suspense fallback={<LocationLoading />}>
      <LocationComponent />
    </Suspense>
  );
}