import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export interface ImportedBlogPost {
  slug: string;
  title: string;
  metaDescription: string;
  publishDate: string;
  modifiedDate?: string;
  author: string;
  headline: string;
  content: string;
  contentHtml: string;
  categories: string[];
  tags: string[];
  featuredImage: string;
  images: Array<{
    src: string;
    alt: string;
    title?: string;
    caption?: string;
  }>;
  language: 'en' | 'es';
  readTime: number;
}

export class BlogImportService {
  private blogPostsDir = path.join(process.cwd(), 'content-import/blog-posts');
  private cachedPosts: Map<string, ImportedBlogPost> = new Map();

  private async processMarkdown(content: string): Promise<string> {
    const result = await remark().use(html).process(content);
    return result.toString();
  }

  private calculateReadTime(text: string): number {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
  }

  private detectLanguage(title: string, content: string): 'en' | 'es' {
    const spanishIndicators = [
      'cómo',
      'qué',
      'dónde',
      'cuándo',
      'por qué',
      'el',
      'la',
      'los',
      'las',
      'de',
      'para',
      'inmigración',
      'abogado',
      'ley',
      'derechos',
    ];

    const text = `${title} ${content}`.toLowerCase();
    const spanishCount = spanishIndicators.filter(word => text.includes(word)).length;

    return spanishCount >= 3 ? 'es' : 'en';
  }

  private generateSlug(filename: string): string {
    return filename
      .replace('.json', '')
      .replace('.md', '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  private mapCategoriesToPracticeAreas(categories: string[]): string[] {
    const categoryMap: Record<string, string> = {
      Immigration: 'immigration',
      Inmigración: 'immigration',
      'Personal Injury': 'personal-injury',
      'Lesiones Personales': 'personal-injury',
      'Workers Compensation': 'workers-compensation',
      'Compensación Laboral': 'workers-compensation',
      'Criminal Defense': 'criminal-defense',
      'Defensa Criminal': 'criminal-defense',
      'Family Law': 'family-law',
      'Derecho Familiar': 'family-law',
      'Traffic Violations': 'traffic-violations',
      'Multas de Tránsito': 'traffic-violations',
    };

    return categories
      .map(cat => categoryMap[cat])
      .filter(Boolean)
      .filter((value, index, self) => self.indexOf(value) === index);
  }

  async importBlogPost(filename: string): Promise<ImportedBlogPost | null> {
    try {
      // Check if it's a JSON file
      if (filename.endsWith('.json')) {
        const jsonPath = path.join(this.blogPostsDir, filename);
        const jsonContent = await fs.readFile(jsonPath, 'utf-8');
        const data = JSON.parse(jsonContent);

        // Skip category pages and non-blog posts
        if (data.type !== 'blog-post' || data.url?.includes('/category/')) {
          return null;
        }

        // Try to find corresponding markdown file
        const mdFilename = filename.replace('.json', '.md');
        const mdPath = path.join(this.blogPostsDir, mdFilename);
        let markdownContent = '';
        let contentHtml = '';

        try {
          const mdContent = await fs.readFile(mdPath, 'utf-8');
          const { content } = matter(mdContent);
          markdownContent = content;
          contentHtml = await this.processMarkdown(content);
        } catch (error) {
          // No markdown file, use any content from JSON
          markdownContent = data.content?.text || '';
          contentHtml = data.content?.html || '';
        }

        const slug = this.generateSlug(filename);
        const language = this.detectLanguage(data.title || '', markdownContent);

        const post: ImportedBlogPost = {
          slug,
          title: data.headline || data.title || 'Untitled Post',
          metaDescription: data.metaDescription || '',
          publishDate: data.publishDate || new Date().toISOString(),
          modifiedDate: data.modifiedDate,
          author: data.author || 'Vasquez Law Firm',
          headline: data.headline || data.title || '',
          content: markdownContent,
          contentHtml,
          categories: this.mapCategoriesToPracticeAreas(data.categories || []),
          tags: data.tags || [],
          featuredImage: data.featuredImage || data.images?.[0]?.src || '',
          images: data.images || [],
          language,
          readTime: this.calculateReadTime(markdownContent),
        };

        this.cachedPosts.set(slug, post);
        return post;
      }
    } catch (error) {
      console.error(`Error importing blog post ${filename}:`, error);
    }

    return null;
  }

  async importAllBlogPosts(): Promise<ImportedBlogPost[]> {
    try {
      const files = await fs.readdir(this.blogPostsDir);
      const jsonFiles = files.filter(file => file.endsWith('.json'));

      const posts = await Promise.all(jsonFiles.map(file => this.importBlogPost(file)));

      return posts.filter((post): post is ImportedBlogPost => post !== null);
    } catch (error) {
      console.error('Error importing blog posts:', error);
      return [];
    }
  }

  async getBlogPost(slug: string): Promise<ImportedBlogPost | null> {
    // Check cache first
    if (this.cachedPosts.has(slug)) {
      return this.cachedPosts.get(slug)!;
    }

    // Try to find and import the post
    const files = await fs.readdir(this.blogPostsDir);
    for (const file of files) {
      if (file.endsWith('.json')) {
        const post = await this.importBlogPost(file);
        if (post && post.slug === slug) {
          return post;
        }
      }
    }

    return null;
  }

  async getRelatedPosts(
    currentPost: ImportedBlogPost,
    limit: number = 3
  ): Promise<ImportedBlogPost[]> {
    const allPosts = await this.importAllBlogPosts();

    // Filter out current post and posts in different languages
    const eligiblePosts = allPosts.filter(
      post => post.slug !== currentPost.slug && post.language === currentPost.language
    );

    // Score posts based on relevance
    const scoredPosts = eligiblePosts.map(post => {
      let score = 0;

      // Same category gets highest score
      if (post.categories.some(cat => currentPost.categories.includes(cat))) {
        score += 10;
      }

      // Shared tags
      const sharedTags = post.tags.filter(tag => currentPost.tags.includes(tag));
      score += sharedTags.length * 2;

      // Title similarity (simple word matching)
      const currentWords = currentPost.title.toLowerCase().split(/\s+/);
      const postWords = post.title.toLowerCase().split(/\s+/);
      const sharedWords = currentWords.filter(word => word.length > 3 && postWords.includes(word));
      score += sharedWords.length;

      return { post, score };
    });

    // Sort by score and return top posts
    return scoredPosts
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.post);
  }

  async getBlogPostsByCategory(
    category: string,
    language: 'en' | 'es' = 'en'
  ): Promise<ImportedBlogPost[]> {
    const allPosts = await this.importAllBlogPosts();

    return allPosts.filter(
      post => post.categories.includes(category) && post.language === language
    );
  }

  async searchBlogPosts(query: string, language: 'en' | 'es' = 'en'): Promise<ImportedBlogPost[]> {
    const allPosts = await this.importAllBlogPosts();
    const searchTerms = query.toLowerCase().split(/\s+/);

    return allPosts.filter(post => {
      if (post.language !== language) return false;

      const searchableText = `
        ${post.title} 
        ${post.metaDescription} 
        ${post.content}
        ${post.tags.join(' ')}
      `.toLowerCase();

      return searchTerms.every(term => searchableText.includes(term));
    });
  }
}

export const blogImportService = new BlogImportService();
