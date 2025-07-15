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

  useEffect(() => {
    // Fetch recent news items
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `/api/news/ticker?category=immigration&limit=10&locale=${locale}`
        );
        if (response.ok) {
          const data = await response.json();
          setNewsItems(data.posts || []);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
    const interval = setInterval(fetchNews, 300000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isPaused && newsItems.length > 0) {
      const ticker = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % newsItems.length);
      }, 5000); // Change every 5 seconds

      return () => clearInterval(ticker);
    }
  }, [isPaused, newsItems.length]);

  if (newsItems.length === 0) {
    return null;
  }

  const currentItem = newsItems[currentIndex];
  const displayTitle =
    locale === 'es' && currentItem.titleEs ? currentItem.titleEs : currentItem.title;

  return (
    <div
      className={cn(
        'bg-gradient-to-r from-[#6B1F2E] to-[#8b2635] text-white py-2 px-4 overflow-hidden',
        className
      )}
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
              <span className="truncate text-sm md:text-base animate-scroll-left">
                {displayTitle}
              </span>
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

// Add animation styles
const tickerStyles = `
@keyframes scroll-left {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.animate-scroll-left {
  animation: scroll-left 20s linear infinite;
}

.animate-scroll-left:hover {
  animation-play-state: paused;
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = tickerStyles;
  document.head.appendChild(style);
}
