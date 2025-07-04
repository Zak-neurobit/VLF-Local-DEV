'use client';

import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { BLOG_CATEGORIES, getCategoryById, getAllCategories } from '@/lib/blog/categories';

// Dynamic import for client-side only rendering
const ChatWidget = dynamic(() => import('@/components/ChatWidget').then(mod => mod.ChatWidget), {
  ssr: false,
});

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  practiceArea: string;
  language: 'en' | 'es';
  publishedAt: Date;
  readTime: number;
  author: {
    name: string;
    image?: string;
  };
  tags: string[];
  seoScore: number;
}

export default function BlogPage() {
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);

  const content = {
    en: {
      title: 'Legal Insights & News',
      subtitle: 'Stay informed with expert legal analysis and updates for North Carolina and Florida',
      search: 'Search articles...',
      readMore: 'Read More',
      minRead: 'min read',
      by: 'By',
      trending: 'Trending Topics',
      recent: 'Recent Articles',
      allCategories: 'All Categories',
      newsletter: 'Subscribe to Our Newsletter',
      newsletterDesc: 'Get the latest legal updates delivered to your inbox',
      email: 'Enter your email',
      subscribe: 'Subscribe',
      loadMore: 'Load More Articles',
      noResults: 'No articles found matching your search.',
      relatedPosts: 'Related Articles',
      shareArticle: 'Share This Article',
      tags: 'Tags',
      published: 'Published',
      viewAll: 'View All',
      filterBy: 'Filter by Practice Area',
      clearFilters: 'Clear Filters',
    },
    es: {
      title: 'Perspectivas Legales y Noticias',
      subtitle: 'Manténgase informado con análisis legal experto y actualizaciones para Carolina del Norte y Florida',
      search: 'Buscar artículos...',
      readMore: 'Leer Más',
      minRead: 'min de lectura',
      by: 'Por',
      trending: 'Temas Tendencia',
      recent: 'Artículos Recientes',
      allCategories: 'Todas las Categorías',
      newsletter: 'Suscríbase a Nuestro Boletín',
      newsletterDesc: 'Reciba las últimas actualizaciones legales en su correo',
      email: 'Ingrese su correo',
      subscribe: 'Suscribirse',
      loadMore: 'Cargar Más Artículos',
      noResults: 'No se encontraron artículos que coincidan con su búsqueda.',
      relatedPosts: 'Artículos Relacionados',
      shareArticle: 'Compartir Este Artículo',
      tags: 'Etiquetas',
      published: 'Publicado',
      viewAll: 'Ver Todos',
      filterBy: 'Filtrar por Área de Práctica',
      clearFilters: 'Limpiar Filtros',
    },
  };

  const t = content[language];

  useEffect(() => {
    fetchPosts();
  }, [language, selectedCategory, page, searchQuery]);

  useEffect(() => {
    // Fetch recent posts separately
    fetchRecentPosts();
  }, [language]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        language,
        page: page.toString(),
        limit: '12',
      });

      if (selectedCategory !== 'all') {
        params.append('category', selectedCategory);
      }

      if (searchQuery.trim()) {
        params.append('search', searchQuery.trim());
      }

      const response = await fetch(`/api/blog/import?${params}`);
      const data = await response.json();

      if (response.ok) {
        const newPosts = data.posts.map((post: Record<string, unknown>) => ({
          ...post,
          publishedAt: new Date(post.publishedAt as string),
        }));

        setPosts(prevPosts => (page === 1 ? newPosts : [...prevPosts, ...newPosts]));
        setHasMore(data.hasMore);
      } else {
        console.error('Error fetching posts:', data.error);
        setPosts([]);
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentPosts = async () => {
    try {
      const params = new URLSearchParams({
        language,
        page: '1',
        limit: '5',
      });

      const response = await fetch(`/api/blog/import?${params}`);
      const data = await response.json();

      if (response.ok) {
        const posts = data.posts.map((post: Record<string, unknown>) => ({
          ...post,
          publishedAt: new Date(post.publishedAt as string),
        }));
        setRecentPosts(posts);
      }
    } catch (error) {
      console.error('Error fetching recent posts:', error);
    }
  };

  // Reset page when search or category changes
  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    }
  }, [searchQuery, selectedCategory]);

  const trendingTopics =
    language === 'es'
      ? ['Reforma Migratoria 2024', 'Accidentes de Uber', 'Custodia Compartida', 'DUI Primera Ofensa', 'Compensación Laboral']
      : ['Immigration Reform 2024', 'Uber Accidents', 'Joint Custody', 'First DUI Offense', 'Workers Compensation'];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-[#6B1F2E] text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4 text-sm">
            <span>📞 1-844-YO-PELEO (967-3536)</span>
            <span className="hidden sm:inline">📧 info@vasquezlawnc.com</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 text-xs rounded ${language === 'en' ? 'bg-white/20' : 'hover:bg-white/10'}`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('es')}
              className={`px-2 py-1 text-xs rounded ${language === 'es' ? 'bg-white/20' : 'hover:bg-white/10'}`}
            >
              ES
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center">
              <div>
                <h1 className="text-2xl font-bold text-[#6B1F2E]">Vasquez Law Firm, PLLC</h1>
                <p className="text-xs text-[#C9974D] font-semibold">YO PELEO POR TI™</p>
              </div>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/practice-areas"
                className="text-gray-700 hover:text-[#C9974D] transition-colors font-medium"
              >
                {language === 'es' ? 'Áreas de Práctica' : 'Practice Areas'}
              </Link>
              <Link
                href="/attorneys"
                className="text-gray-700 hover:text-[#C9974D] transition-colors font-medium"
              >
                {language === 'es' ? 'Abogados' : 'Attorneys'}
              </Link>
              <Link href="/blog" className="text-[#C9974D] font-medium">
                Blog
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-[#C9974D] transition-colors font-medium"
              >
                {language === 'es' ? 'Contacto' : 'Contact'}
              </Link>
              <button className="px-6 py-2 bg-[#6B1F2E] text-white rounded-md hover:bg-[#8B2635] transition-colors font-medium">
                {language === 'es' ? 'Consulta Gratis' : 'Free Consultation'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t.title}</h1>
            <p className="text-xl text-[#C9974D] font-semibold mb-8">{t.subtitle}</p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder={t.search}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9974D] focus:border-transparent"
                />
                <svg
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-gray-50 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">{t.filterBy}</h2>
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="text-sm text-[#C9974D] hover:underline"
              >
                {t.clearFilters}
              </button>
            )}
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#C9974D] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {t.allCategories}
            </button>
            {getAllCategories().map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full whitespace-nowrap transition-all flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? `${category.color} text-white`
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>{category.icon}</span>
                {category.name[language]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Blog Posts */}
            <div className="lg:col-span-2">
              {loading && page === 1 ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C9974D]"></div>
                </div>
              ) : posts.length === 0 ? (
                <p className="text-center text-gray-600 py-12">{t.noResults}</p>
              ) : (
                <div className="space-y-8">
                  {posts.map((post, index) => {
                    const category = getCategoryById(post.practiceArea);
                    return (
                      <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                      >
                        {post.featuredImage && (
                          <div className="relative h-48 bg-gray-200">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-4xl">{category?.icon || '📰'}</span>
                            </div>
                          </div>
                        )}
                        <div className="p-6">
                          <div className="flex items-center gap-4 mb-4">
                            {category && (
                              <span className={`px-3 py-1 ${category.lightColor} ${category.textColor} rounded-full text-sm font-medium flex items-center gap-1`}>
                                <span>{category.icon}</span>
                                {category.name[language]}
                              </span>
                            )}
                            <span className="text-sm text-gray-500">
                              {post.readTime} {t.minRead}
                            </span>
                            {post.seoScore >= 90 && (
                              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                SEO {post.seoScore}%
                              </span>
                            )}
                          </div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-3">
                            <Link
                              href={`/blog/${post.slug}`}
                              className="hover:text-[#C9974D] transition-colors"
                            >
                              {post.title}
                            </Link>
                          </h2>
                          <p className="text-gray-600 mb-4">{post.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-sm">👤</span>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {post.author.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {t.published}{' '}
                                  {format(post.publishedAt, 'PPP', {
                                    locale: language === 'es' ? es : undefined,
                                  })}
                                </p>
                              </div>
                            </div>
                            <Link
                              href={`/blog/${post.slug}`}
                              className="text-[#C9974D] font-medium hover:underline"
                            >
                              {t.readMore} →
                            </Link>
                          </div>
                          {post.tags.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {post.tags.slice(0, 5).map(tag => (
                                <span
                                  key={tag}
                                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
              )}

              {/* Load More */}
              {hasMore && !loading && posts.length > 0 && (
                <div className="text-center mt-12">
                  <button
                    onClick={() => setPage(page + 1)}
                    className="px-8 py-3 bg-[#C9974D] text-white rounded-md font-medium hover:bg-[#D4A574] transition-colors"
                  >
                    {t.loadMore}
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Recent Posts */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t.recent}</h3>
                <div className="space-y-4">
                  {recentPosts.map((post, index) => {
                    const category = getCategoryById(post.practiceArea);
                    return (
                      <div key={post.id} className="border-b last:border-0 pb-4 last:pb-0">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl flex-shrink-0">{category?.icon || '📄'}</span>
                          <div className="flex-1">
                            <Link
                              href={`/blog/${post.slug}`}
                              className="text-sm font-medium text-gray-900 hover:text-[#C9974D] line-clamp-2"
                            >
                              {post.title}
                            </Link>
                            <p className="text-xs text-gray-500 mt-1">
                              {format(post.publishedAt, 'MMM d, yyyy', {
                                locale: language === 'es' ? es : undefined,
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Category Links */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t.allCategories}</h3>
                <div className="space-y-3">
                  {getAllCategories().map((category) => (
                    <Link
                      key={category.id}
                      href={`/blog/category/${category.id}`}
                      className={`flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-2xl`}>{category.icon}</span>
                        <span className="font-medium text-gray-700 group-hover:text-[#C9974D]">
                          {category.name[language]}
                        </span>
                      </div>
                      <svg
                        className="w-5 h-5 text-gray-400 group-hover:text-[#C9974D]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Trending Topics */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t.trending}</h3>
                <div className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="text-2xl text-[#C9974D]">🔥</span>
                      <button
                        onClick={() => setSearchQuery(topic)}
                        className="text-gray-700 hover:text-[#C9974D] transition-colors text-left"
                      >
                        {topic}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-r from-[#6B1F2E] to-[#8B2635] rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-3">{t.newsletter}</h3>
                <p className="text-sm mb-4">{t.newsletterDesc}</p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder={t.email}
                    className="w-full px-4 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white"
                  />
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-white text-[#6B1F2E] rounded-md font-medium hover:bg-gray-100 transition-colors"
                  >
                    {t.subscribe}
                  </button>
                </form>
              </div>

              {/* AI Assistant CTA */}
              <div className="bg-[#6B1F2E]/10 rounded-lg p-6">
                <div className="text-center">
                  <div className="text-5xl mb-3">🤖</div>
                  <h3 className="text-lg font-bold text-[#6B1F2E] mb-2">
                    {language === 'es' ? '¿Necesita Ayuda Legal?' : 'Need Legal Help?'}
                  </h3>
                  <p className="text-sm text-gray-700 mb-4">
                    {language === 'es'
                      ? 'Nuestro asistente de IA está disponible 24/7'
                      : 'Our AI assistant is available 24/7'}
                  </p>
                  <button className="px-4 py-2 bg-[#6B1F2E] text-white rounded-md font-medium hover:bg-[#8B2635] transition-colors">
                    {language === 'es' ? 'Chatear Ahora' : 'Chat Now'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ChatWidget language={language} />
    </div>
  );
}