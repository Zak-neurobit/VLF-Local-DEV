import { Metadata } from 'next';

// Force dynamic rendering for all catch-all routes
export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const fetchCache = 'force-no-store';

// Don't generate any static params - everything is dynamic
export async function generateStaticParams() {
  return [];
}

// Generate metadata dynamically
export async function generateMetadata({ params }: { params: { catchAll: string[] } }): Promise<Metadata> {
  const path = params.catchAll.join('/');
  
  // Handle location pages
  if (path.startsWith('locations/') || path.startsWith('ubicaciones/')) {
    const parts = path.split('/');
    const city = parts[2]?.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    return {
      title: `${city} Attorneys | Vasquez Law Firm`,
      description: `Top-rated attorneys serving ${city}. Immigration, personal injury, criminal defense. Free consultation: 1-844-YO-PELEO`,
    };
  }
  
  // Handle blog pages
  if (path.includes('blog/')) {
    return {
      title: 'Blog | Vasquez Law Firm',
      description: 'Legal insights and updates from Vasquez Law Firm',
    };
  }
  
  return {
    title: 'Vasquez Law Firm',
    description: 'Experienced attorneys serving North Carolina and Florida',
  };
}

// Dynamic route handler
export default async function CatchAllPage({ params }: { params: { catchAll: string[] } }) {
  const path = params.catchAll.join('/');
  
  // For now, show a placeholder
  // In production, this would dynamically import the appropriate component
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">
          Dynamic Page: {path}
        </h1>
        <p className="text-gray-600">
          This page is being rendered dynamically to optimize build performance.
        </p>
      </div>
    </div>
  );
}