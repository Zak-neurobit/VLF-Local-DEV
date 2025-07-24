'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NewsItem {
  id: string;
  title: string;
  titleEs?: string;
  url: string;
  date: string;
  category: string;
  urgent?: boolean;
}

interface ContinuousNewsTickerProps {
  className?: string;
  locale?: 'en' | 'es';
  speed?: number; // pixels per second
}

export function ContinuousNewsTicker({ 
  className, 
  locale = 'en',
  speed = 50 // 50 pixels per second
}: ContinuousNewsTickerProps) {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/news/ticker?category=all&limit=20&locale=${locale}`
        );
        
        if (response.ok) {
          const data = await response.json();
          // Duplicate items to create seamless loop
          const items = data.posts || [];
          if (items.length > 0) {
            setNewsItems([...items, ...items]); // Double the items for seamless scrolling
          }
        }
      } catch (error) {
        console.error('[ContinuousTicker] Error fetching news:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
    const interval = setInterval(fetchNews, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, [locale]);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current || newsItems.length === 0) return;

    const container = containerRef.current;
    const content = contentRef.current;
    
    // Calculate animation duration based on content width and speed
    const contentWidth = content.scrollWidth / 2; // Divided by 2 because we duplicated content
    const duration = contentWidth / speed; // seconds

    // Apply CSS animation
    content.style.animation = `scroll ${duration}s linear infinite`;

    return () => {
      if (content) {
        content.style.animation = '';
      }
    };
  }, [newsItems, speed]);

  if (isLoading || newsItems.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        'bg-gradient-to-r from-[#6B1F2E] to-[#8b2635] text-white py-2 overflow-hidden',
        'fixed top-0 left-0 right-0 z-[9999]', // Always on top
        'shadow-lg',
        className
      )}
    >
      <div className="max-w-full relative" ref={containerRef}>
        {/* Static branding */}
        <div className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#6B1F2E] to-[#8b2635] z-10 px-4 flex items-center border-r border-[#C9974D]/30">
          <span className="text-[#C9974D] font-bold text-sm uppercase tracking-wider whitespace-nowrap">
            YO PELEO™ {locale === 'es' ? 'NOTICIAS' : 'NEWS'}
          </span>
        </div>

        {/* Scrolling content */}
        <div className="ml-[140px] overflow-hidden">
          <div
            ref={contentRef}
            className="flex items-center whitespace-nowrap"
            style={{
              paddingRight: '100vw', // Ensure smooth loop
            }}
          >
            {newsItems.map((item, index) => {
              const displayTitle = locale === 'es' && item.titleEs ? item.titleEs : item.title;
              return (
                <Link
                  key={`${item.id}-${index}`}
                  href={item.url}
                  className="inline-flex items-center mx-8 hover:text-[#C9974D] transition-colors group"
                >
                  {item.urgent && (
                    <AlertCircle className="w-4 h-4 text-[#C9974D] animate-pulse mr-2" />
                  )}
                  <span className="text-sm">{displayTitle}</span>
                  <span className="mx-4 text-white/30">•</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Gradient overlays for smooth edges */}
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#8b2635] to-transparent pointer-events-none" />
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}