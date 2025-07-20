'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NewsItem {
  id: string;
  title: string;
  titleEs?: string;
  url: string;
  date: string;
  category: 'immigration' | 'workers-comp' | 'personal-injury' | 'criminal' | 'family';
  urgent?: boolean;
}

interface NewsTickerProps {
  className?: string;
  locale?: 'en' | 'es';
}

export function NewsTicker({ className, locale = 'en' }: NewsTickerProps) {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debug: Log component mount only in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[NewsTicker] Component mounted with locale:', locale);
      return () => console.log('[NewsTicker] Component unmounted');
    }
  }, [locale]);

  useEffect(() => {
    // Fetch recent news items
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        setError(null);
        if (process.env.NODE_ENV === 'development') {
          console.log('[NewsTicker] Fetching news for locale:', locale);
        }
        const response = await fetch(
          `/api/news/ticker?category=immigration&limit=10&locale=${locale}`
        );
        if (process.env.NODE_ENV === 'development') {
          console.log('[NewsTicker] Response status:', response.status);
        }
        if (response.ok) {
          const data = await response.json();
          if (process.env.NODE_ENV === 'development') {
            console.log('[NewsTicker] Received data:', data);
          }
          setNewsItems(data.posts || []);
        } else {
          const errorText = await response.text();
          console.error(
            '[NewsTicker] Failed to fetch news, status:',
            response.status,
            'error:',
            errorText
          );
          setError(`Failed to fetch news: ${response.status}`);
        }
      } catch (error) {
        console.error('[NewsTicker] Error fetching news:', error);
        setError(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
    const interval = setInterval(fetchNews, 300000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, [locale]);

  useEffect(() => {
    if (!isPaused && newsItems.length > 0) {
      const ticker = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % newsItems.length);
      }, 5000); // Change every 5 seconds

      return () => clearInterval(ticker);
    }
  }, [isPaused, newsItems.length]);

  // Debug: Log render state only in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[NewsTicker] Render state:', { isLoading, error, itemCount: newsItems.length });
  }

  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-[#6B1F2E] to-[#8b2635] text-white py-2 px-4 h-[32px] flex items-center">
        <div className="max-w-7xl mx-auto text-center text-sm w-full">
          <span className="text-[#C9974D]">Loading news...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-r from-[#6B1F2E] to-[#8b2635] text-white py-2 px-4 h-[32px] flex items-center">
        <div className="max-w-7xl mx-auto text-center text-sm w-full">
          <span className="text-red-300">Error: {error}</span>
        </div>
      </div>
    );
  }

  if (newsItems.length === 0) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[NewsTicker] No news items to display');
    }
    // Return a placeholder to verify the component is mounting
    return (
      <div className="bg-gradient-to-r from-[#6B1F2E] to-[#8b2635] text-white py-2 px-4 h-[32px] flex items-center">
        <div className="max-w-7xl mx-auto text-center text-sm w-full">
          <span className="text-[#C9974D]">No news available</span>
        </div>
      </div>
    );
  }

  const currentItem = newsItems[currentIndex];
  const displayTitle =
    locale === 'es' && currentItem.titleEs ? currentItem.titleEs : currentItem.title;

  return (
    <div
      className={cn(
        'bg-gradient-to-r from-[#6B1F2E] to-[#8b2635] text-white py-2 px-4 overflow-hidden h-[32px] flex items-center',
        'shadow-lg', // Add shadow for visibility
        className
      )}
      style={{
        // Ensure visibility with inline styles as backup
        backgroundColor: '#6B1F2E',
        minHeight: '32px',
        position: 'relative',
        zIndex: 100,
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className="flex items-center space-x-2 shrink-0">
            {currentItem.urgent && <AlertCircle className="w-4 h-4 text-[#C9974D] animate-pulse" />}
            <span className="text-[#C9974D] font-bold text-sm uppercase tracking-wider flex items-center">
              YO PELEO™ NOTICIAS
              <span className="mx-2 text-white/50">|</span>
              {locale === 'es' ? 'Últimas Actualizaciones' : 'Latest Updates'}
            </span>
          </div>

          <div className="flex-1 overflow-hidden">
            <Link
              href={currentItem.url}
              className="group flex items-center space-x-2 hover:text-[#C9974D] transition-colors"
            >
              <span className="truncate text-sm md:text-base">{displayTitle}</span>
              <ChevronRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-2 ml-4">
          {newsItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'w-2 h-2 rounded-full transition-all',
                index === currentIndex ? 'bg-[#C9974D] w-6' : 'bg-white/30 hover:bg-white/50'
              )}
              aria-label={`Go to news item ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Animation is handled by Tailwind, removed manual style injection
