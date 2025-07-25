import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Enable static generation with ISR
export const revalidate = 3600; // Revalidate every hour

// Generate all known routes at build time
export async function generateStaticParams() {
  // Return an empty array to let Next.js handle routes normally
  // This prevents the catch-all from interfering with other routes
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

// Catch-all page handler
export default async function CatchAllPage({ params }: { params: { catchAll: string[] } }) {
  // This should rarely be hit as most routes should have their own pages
  // Return 404 for truly unknown routes
  notFound();
}