'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface CategoryPageClientProps {
  category: string;
  language?: 'en' | 'es';
}

export default function CategoryPageClient({ category, language = 'en' }: CategoryPageClientProps) {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect to the main blog page with the category filter
    const params = new URLSearchParams({
      category,
      language,
    });
    
    // Use replace to avoid adding to history
    router.replace(`/blog?${params.toString()}`);
  }, [category, language, router]);

  // Show loading while redirecting
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-400">Loading category posts...</p>
      </div>
    </div>
  );
}