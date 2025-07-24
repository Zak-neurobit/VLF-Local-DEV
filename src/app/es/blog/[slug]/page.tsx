import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllCategories } from '@/lib/blog/categories';
import type { BlogPost } from '@/types/blog';

interface BlogSlugPageProps {
  params: { slug: string };
}

async function getBlogPost(slug: string): Promise<{ post: BlogPost; relatedPosts: BlogPost[] } | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/blog/${slug}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    
    // Transform the data to match the BlogPost type
    const post: BlogPost = {
      id: data.post.id,
      title: data.post.title,
      slug: data.post.slug,
      excerpt: data.post.excerpt,
      content: data.post.content,
      featuredImage: data.post.featuredImage,
      practiceArea: data.post.practiceArea,
      language: data.post.language as 'en' | 'es',
      publishedAt: new Date(data.post.publishedAt),
      readTime: data.post.readTime,
      author: {
        id: typeof data.post.author === 'object' ? data.post.author.id : '1',
        name: typeof data.post.author === 'string' ? data.post.author : data.post.author.name,
        email: typeof data.post.author === 'object' ? data.post.author.email : 'info@vasquezlaw.com',
        avatar: typeof data.post.author === 'object' ? data.post.author.avatar : undefined,
      },
      tags: data.post.keywords || [],
      views: data.post.viewCount,
    };

    // Transform related posts
    const relatedPosts: BlogPost[] = (data.relatedPosts || []).map((related: any) => ({
      id: related.id,
      title: related.title,
      slug: related.slug,
      excerpt: related.excerpt,
      content: '',
      featuredImage: related.featuredImage,
      practiceArea: related.category || data.post.practiceArea,
      language: data.post.language as 'en' | 'es',
      publishedAt: new Date(related.publishedAt),
      readTime: 5,
      author: { 
        id: '1',
        name: 'Equipo Legal Vasquez',
        email: 'info@vasquezlaw.com'
      },
      tags: [],
    }));

    return { post, relatedPosts };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function generateMetadata({ params }: BlogSlugPageProps): Promise<Metadata> {
  const data = await getBlogPost(params.slug);
  
  if (!data) {
    return {
      title: 'Artículo No Encontrado - Vasquez Law Firm, PLLC',
      description: 'El artículo del blog solicitado no se pudo encontrar.',
    };
  }

  const { post } = data;

  return {
    title: `${post.title} - Vasquez Law Firm, PLLC`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt.toISOString(),
      authors: [post.author.name],
      images: post.featuredImage ? [post.featuredImage] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export const runtime = 'nodejs';

export default async function BlogSlugPageSpanish({ params }: BlogSlugPageProps) {
  const data = await getBlogPost(params.slug);

  if (!data) {
    notFound();
  }

  const { post, relatedPosts } = data;
  const categories = getAllCategories().map(cat => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    icon: cat.icon,
    postCount: 0 // This would be populated from a database query in production
  }));

  return (
    <BlogPageTemplate
      posts={[]}
      categories={categories}
      isArticlePage={true}
      currentPost={post}
      relatedPosts={relatedPosts}
    />
  );
}
