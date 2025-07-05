'use client';

import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
// Dynamic import for client-side only rendering
const ChatWidget = dynamic(() => import('@/components/ChatWidget').then(mod => mod.ChatWidget), {
  ssr: false,
});

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  metaDescription: string;
  practiceArea: string;
  language: 'en' | 'es';
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  author: string;
  keywords: string[];
  faqSection?: Array<{ question: string; answer: string }>;
  viewCount: number;
  seoScore: number;
  translations: Array<{
    id: string;
    slug: string;
    language: string;
  }>;
}

interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: string;
  publishedAt: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/blog/${params.slug}`);
      const data = await response.json();

      if (response.ok) {
        setPost(data.post);
        setRelatedPosts(data.relatedPosts);
        setLanguage(data.post.language);

        // Inject structured data
        if (data.structuredData) {
          const script = document.createElement('script');
          script.type = 'application/ld+json';
          script.text = JSON.stringify(data.structuredData);
          document.head.appendChild(script);
        }
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const content = {
    en: {
      by: 'By',
      published: 'Published',
      updated: 'Updated',
      minRead: 'min read',
      views: 'views',
      share: 'Share',
      relatedArticles: 'Related Articles',
      faq: 'Frequently Asked Questions',
      toc: 'Table of Contents',
      backToBlog: '← Back to Blog',
      readInSpanish: 'Leer en Español',
      readInEnglish: 'Read in English',
      shareOn: 'Share on',
      copyLink: 'Copy Link',
      linkCopied: 'Link copied!',
      callToAction: 'Need Legal Help?',
      ctaDescription: 'Get a free consultation with our experienced attorneys',
      ctaButton: 'Schedule Consultation',
    },
    es: {
      by: 'Por',
      published: 'Publicado',
      updated: 'Actualizado',
      minRead: 'min de lectura',
      views: 'vistas',
      share: 'Compartir',
      relatedArticles: 'Artículos Relacionados',
      faq: 'Preguntas Frecuentes',
      toc: 'Tabla de Contenidos',
      backToBlog: '← Volver al Blog',
      readInSpanish: 'Leer en Español',
      readInEnglish: 'Read in English',
      shareOn: 'Compartir en',
      copyLink: 'Copiar Enlace',
      linkCopied: '¡Enlace copiado!',
      callToAction: '¿Necesita Ayuda Legal?',
      ctaDescription: 'Obtenga una consulta gratuita con nuestros abogados experimentados',
      ctaButton: 'Programar Consulta',
    },
  };

  const t = content[language];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#188bf6]"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen">
        <Header language={language} setLanguage={setLanguage} />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
            <Link href="/blog" className="text-[#188bf6] hover:underline">
              {t.backToBlog}
            </Link>
          </div>
        </div>
        <Footer language={language} />
      </div>
    );
  }

  const sharePost = (platform: string) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.slug}`;
    const text = post.title;

    switch (platform) {
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
        );
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        );
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        // Show toast notification
        break;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header language={language} setLanguage={setLanguage} />

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link href="/blog" className="text-[#188bf6] hover:underline">
              {t.backToBlog}
            </Link>
          </nav>

          {/* Category & SEO Score */}
          <div className="flex items-center gap-4 mb-6">
            <span className="px-4 py-2 bg-[#188bf6]/10 text-[#188bf6] rounded-full text-sm font-medium">
              {post.practiceArea.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
            {post.seoScore >= 90 && (
              <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                SEO Optimized {post.seoScore}%
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{post.title}</h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8">
            <span>
              {t.by} {post.author}
            </span>
            <span>•</span>
            <span>
              {t.published}{' '}
              {format(new Date(post.publishedAt), 'PPP', {
                locale: language === 'es' ? es : undefined,
              })}
            </span>
            <span>•</span>
            <span>
              {post.readTime} {t.minRead}
            </span>
            <span>•</span>
            <span>
              {post.viewCount} {t.views}
            </span>
          </div>

          {/* Translation Link */}
          {post.translations.length > 0 && (
            <div className="mb-8">
              {post.translations.map(translation => (
                <Link
                  key={translation.id}
                  href={`/blog/${translation.slug}`}
                  className="inline-flex items-center gap-2 text-[#188bf6] hover:underline"
                >
                  🌐 {translation.language === 'es' ? t.readInSpanish : t.readInEnglish}
                </Link>
              ))}
            </div>
          )}

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden bg-gray-200">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl">📰</span>
              </div>
            </div>
          )}

          {/* Share Buttons */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
            <span className="text-sm font-medium text-gray-700">{t.share}:</span>
            <button
              onClick={() => sharePost('twitter')}
              className="p-2 text-gray-600 hover:text-[#1DA1F2] transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </button>
            <button
              onClick={() => sharePost('facebook')}
              className="p-2 text-gray-600 hover:text-[#1877F2] transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
            <button
              onClick={() => sharePost('linkedin')}
              className="p-2 text-gray-600 hover:text-[#0A66C2] transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </button>
            <button
              onClick={() => sharePost('copy')}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>

          {/* Article Content */}
          <div
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* FAQ Section */}
          {post.faqSection && post.faqSection.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.faq}</h2>
              <div className="space-y-6">
                {post.faqSection.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Keywords */}
          {post.keywords.length > 0 && (
            <div className="mb-12">
              <div className="flex flex-wrap gap-2">
                {post.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    #{keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-[#188bf6] to-[#0e5ca8] rounded-lg p-8 text-white text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">{t.callToAction}</h3>
            <p className="text-lg mb-6">{t.ctaDescription}</p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-white text-[#188bf6] rounded-md font-semibold hover:bg-gray-100 transition-colors"
            >
              {t.ctaButton}
            </Link>
          </div>
        </motion.div>
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {t.relatedArticles}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map(related => (
                <motion.article
                  key={related.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {related.featuredImage && (
                    <div className="relative h-48 bg-gray-200">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl">📰</span>
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      <Link
                        href={`/blog/${related.slug}`}
                        className="hover:text-[#188bf6] transition-colors"
                      >
                        {related.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4">{related.excerpt}</p>
                    <Link
                      href={`/blog/${related.slug}`}
                      className="text-[#188bf6] font-medium hover:underline"
                    >
                      {language === 'es' ? 'Leer Más →' : 'Read More →'}
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer language={language} />
      <ChatWidget language={language} />
    </div>
  );
}
