'use client';

import React, { useState } from 'react';
import { Play, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

interface VideoTestimonial {
  id: string;
  name: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  service: string;
  duration: string;
}

const videoTestimonials: VideoTestimonial[] = [
  {
    id: '1',
    name: 'Maria Gonzalez',
    title: 'Green Card Success Story',
    thumbnailUrl: '/images/video-testimonial-1-thumb.jpg',
    videoUrl: 'https://www.youtube.com/embed/example1',
    service: 'Immigration - Green Card',
    duration: '2:45',
  },
  {
    id: '2',
    name: 'John Smith',
    title: 'Car Accident Settlement',
    thumbnailUrl: '/images/video-testimonial-2-thumb.jpg',
    videoUrl: 'https://www.youtube.com/embed/example2',
    service: 'Personal Injury',
    duration: '3:15',
  },
  {
    id: '3',
    name: 'Carlos Rodriguez',
    title: 'Deportation Defense Victory',
    thumbnailUrl: '/images/video-testimonial-3-thumb.jpg',
    videoUrl: 'https://www.youtube.com/embed/example3',
    service: 'Deportation Defense',
    duration: '4:20',
  },
];

export default function VideoTestimonials() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center text-brand-charcoal mb-8">
        Video Testimonials
      </h2>
      <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        Hear directly from our clients about their experiences with Vasquez Law Firm
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videoTestimonials.map(video => (
          <Card key={video.id} className="overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative aspect-video">
              <Image
                src={video.thumbnailUrl}
                alt={`${video.name} testimonial thumbnail`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  onClick={() => setActiveVideo(video.id)}
                  className="bg-white/90 hover:bg-white rounded-full p-4 transition-colors group"
                  aria-label={`Play video testimonial from ${video.name}`}
                >
                  <Play className="w-8 h-8 text-brand-crimson group-hover:scale-110 transition-transform" />
                </button>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                {video.duration}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg text-brand-charcoal mb-1">{video.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{video.title}</p>
              <span className="inline-block bg-brand-skyblue/10 text-brand-skyblue px-3 py-1 rounded-full text-sm">
                {video.service}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              aria-label="Close video"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="aspect-video">
              <iframe
                src={videoTestimonials.find(v => v.id === activeVideo)?.videoUrl}
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
