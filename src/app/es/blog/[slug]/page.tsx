import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { BlogPostTemplate } from '@/components/templates/BlogPostTemplate';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        status: 'published',
        language: 'es',
      },
      select: {
        slug: true,
      },
    });

    // Filter out slugs that are too long to prevent filesystem errors
    return posts
      .filter(post => post.slug.length <= 200)
      .map((post) => ({
        slug: post.slug,
      }));
  } catch (error) {
    console.error('Error generating static params for Spanish blog posts:', error);
    return [];
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const post = await prisma.blogPost.findUnique({
      where: {
        slug: params.slug,
        status: 'published',
        language: 'es',
      },
    });

    if (!post) {
      return {
        title: 'Artículo No Encontrado',
        description: 'El artículo solicitado no se pudo encontrar.',
      };
    }

    return {
      title: `${post.titleEs || post.title} | Blog de Vasquez Law Firm`,
      description: post.metaDescription || post.excerptEs || post.excerpt || post.contentEs?.substring(0, 160) || post.content.substring(0, 160),
      keywords: post.metaKeywords.join(', '),
      openGraph: {
        title: post.titleEs || post.title,
        description: post.excerptEs || post.excerpt || post.contentEs?.substring(0, 160) || post.content.substring(0, 160),
        type: 'article',
        publishedTime: post.publishedAt?.toISOString(),
        authors: [post.author || 'Vasquez Law Firm'],
        images: post.featuredImage ? [{ url: post.featuredImage }] : undefined,
      },
    };
  } catch (error) {
    console.error('Error generating metadata for Spanish blog post:', error);
    return {
      title: 'Artículo del Blog',
      description: 'Lee nuestro último artículo del blog.',
    };
  }
}

export default async function SpanishBlogPostPage({ params }: BlogPostPageProps) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: {
        slug: params.slug,
        status: 'published',
        language: 'es',
      },
    });

    if (!post) {
      notFound();
    }

    // Get related posts based on category and practice area
    const relatedPosts = await prisma.blogPost.findMany({
      where: {
        status: 'published',
        language: 'es',
        NOT: {
          id: post.id,
        },
        OR: [
          {
            category: post.category,
          },
          {
            practiceArea: post.practiceArea,
          },
          {
            tags: {
              hasSome: post.tags,
            },
          },
        ],
      },
      take: 3,
      orderBy: {
        publishedAt: 'desc',
      },
    });

    return <BlogPostTemplate post={post} relatedPosts={relatedPosts} language="es" />;
  } catch (error) {
    console.error('Error loading Spanish blog post:', error);
    notFound();
  }
}