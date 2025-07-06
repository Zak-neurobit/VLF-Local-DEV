import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { logger } from '@/lib/logger';
import { WebFetch } from '@/lib/utils/web-fetch';
import { getPrismaClient } from '@/lib/prisma';

export interface SEOBlogGenerationRequest {
  practiceArea: string;
  targetKeywords: string[];
  contentType: 'blog_post' | 'case_study' | 'legal_guide' | 'faq' | 'news_update';
  targetAudience: 'potential_clients' | 'current_clients' | 'other_lawyers' | 'general_public';
  tone: 'professional' | 'conversational' | 'authoritative' | 'empathetic' | 'educational';
  wordCount: number;
  language: 'en' | 'es';
  location?: string;
  urgency: 'low' | 'medium' | 'high';
  includeCallToAction: boolean;
  competitorAnalysis?: boolean;
  trendingTopics?: string[];
  existingContent?: string; // For content updates/optimization
}

export interface SEOOptimization {
  title: string;
  metaDescription: string;
  slug: string;
  headings: {
    h1: string;
    h2: string[];
    h3: string[];
  };
  keywords: {
    primary: string;
    secondary: string[];
    longTail: string[];
  };
  internalLinks: Array<{
    anchor: string;
    url: string;
    context: string;
  }>;
  imageAlt: string[];
  schema: {
    type: string;
    properties: Record<string, unknown>;
  };
}

export interface ContentStructure {
  introduction: string;
  mainSections: Array<{
    heading: string;
    content: string;
    subSections?: Array<{
      subHeading: string;
      content: string;
    }>;
  }>;
  conclusion: string;
  callToAction?: string;
  faq?: Array<{
    question: string;
    answer: string;
  }>;
}

export interface SEOBlogResult {
  id: string;
  title: string;
  content: ContentStructure;
  seoOptimization: SEOOptimization;
  wordCount: number;
  readabilityScore: number;
  seoScore: number;
  competitiveAnalysis?: {
    topCompetitorContent: string[];
    contentGaps: string[];
    differentiationOpportunities: string[];
  };
  performancePredictions: {
    estimatedTraffic: number;
    rankingPotential: 'low' | 'medium' | 'high';
    conversionPotential: 'low' | 'medium' | 'high';
  };
  publishingRecommendations: {
    bestPublishTime: string;
    promotionChannels: string[];
    followUpActions: string[];
  };
  createdAt: Date;
}

export class SEOBlogGenerationAgent {
  private model: ChatOpenAI;
  private webFetch: WebFetch;

  constructor() {
    this.model = new ChatOpenAI({
      modelName: 'gpt-4-turbo-preview',
      temperature: 0.4, // Slightly higher for creative content
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
    this.webFetch = new WebFetch();
  }

  async generateSEOBlog(request: SEOBlogGenerationRequest): Promise<SEOBlogResult> {
    try {
      logger.info('Starting SEO blog generation', {
        practiceArea: request.practiceArea,
        contentType: request.contentType,
        wordCount: request.wordCount,
      });

      // Step 1: Research and analyze competitors if requested
      const competitiveAnalysis = request.competitorAnalysis
        ? await this.analyzeCompetitorContent(request)
        : undefined;

      // Step 2: Generate content structure and outline
      const contentOutline = await this.generateContentOutline(request, competitiveAnalysis);

      // Step 3: Generate full content
      const content = await this.generateContent(contentOutline, request);

      // Step 4: Optimize for SEO
      const seoOptimization = await this.optimizeForSEO(content, request);

      // Step 5: Calculate scores and predictions
      const readabilityScore = this.calculateReadabilityScore(content);
      const seoScore = this.calculateSEOScore(content, seoOptimization, request);
      const performancePredictions = await this.predictPerformance(
        content,
        seoOptimization,
        request
      );

      // Step 6: Generate publishing recommendations
      const publishingRecommendations = await this.generatePublishingRecommendations(
        content,
        request
      );

      // Step 7: Store the generated content
      const blogResult = await this.storeBlogContent({
        content,
        seoOptimization,
        readabilityScore,
        seoScore,
        competitiveAnalysis,
        performancePredictions,
        publishingRecommendations,
        request,
      });

      return blogResult;
    } catch (error) {
      logger.error('SEO blog generation error:', error);
      throw new Error('Failed to generate SEO blog content');
    }
  }

  private async analyzeCompetitorContent(request: SEOBlogGenerationRequest) {
    const searchQuery = `${request.practiceArea} ${request.targetKeywords[0]} blog`;

    try {
      // Search for top competitor content
      const searchResults = await this.webFetch.searchGoogle(searchQuery, 10);
      const competitorContent: string[] = [];

      for (const result of searchResults.slice(0, 5)) {
        try {
          const content = await this.webFetch.fetchContent(result.url);
          competitorContent.push(content.substring(0, 2000)); // First 2000 chars
        } catch (error) {
          logger.warn(`Failed to fetch competitor content from ${result.url}`);
        }
      }

      // Analyze competitor content with AI
      const analysisPrompt = `
Analyze these competitor articles for the topic "${request.practiceArea} - ${request.targetKeywords.join(', ')}":

${competitorContent.map((content, i) => `Article ${i + 1}:\n${content}`).join('\n\n')}

Identify:
1. Common topics covered
2. Content gaps and opportunities  
3. Unique angles we could take
4. SEO strategies being used

Respond in JSON format:
{
  "topCompetitorContent": ["topic1", "topic2"],
  "contentGaps": ["gap1", "gap2"], 
  "differentiationOpportunities": ["opportunity1", "opportunity2"]
}
`;

      const response = await this.model.invoke([
        new SystemMessage(
          'You are a content strategist analyzing competitor content for opportunities.'
        ),
        new HumanMessage(analysisPrompt),
      ]);

      return JSON.parse(response.content.toString());
    } catch (error) {
      logger.warn('Failed to analyze competitor content', { error });
      return {
        topCompetitorContent: [],
        contentGaps: ['Personalized legal advice', 'Local jurisdiction specifics'],
        differentiationOpportunities: ['Client success stories', 'Step-by-step guides'],
      };
    }
  }

  private async generateContentOutline(
    request: SEOBlogGenerationRequest,
    competitiveAnalysis?: any
  ): Promise<{ outline: string; structure: any }> {
    const outlinePrompt = this.buildOutlinePrompt(request, competitiveAnalysis);

    const response = await this.model.invoke([
      new SystemMessage(this.getContentGenerationSystemPrompt(request.language)),
      new HumanMessage(outlinePrompt),
    ]);

    const outline = response.content.toString();
    const structure = this.parseContentOutline(outline);

    return { outline, structure };
  }

  private buildOutlinePrompt(request: SEOBlogGenerationRequest, competitiveAnalysis?: any): string {
    const competitorInsights = competitiveAnalysis
      ? `Competitor Analysis Insights:
- Content Gaps: ${competitiveAnalysis.contentGaps?.join(', ')}
- Differentiation Opportunities: ${competitiveAnalysis.differentiationOpportunities?.join(', ')}`
      : '';

    const trendingContext = request.trendingTopics?.length
      ? `Trending Topics to Consider: ${request.trendingTopics.join(', ')}`
      : '';

    return `
Create a comprehensive content outline for a ${request.contentType} about "${request.practiceArea}".

Requirements:
- Target Keywords: ${request.targetKeywords.join(', ')}
- Target Audience: ${request.targetAudience}
- Tone: ${request.tone}
- Word Count: ${request.wordCount}
- Language: ${request.language}
- Location: ${request.location || 'General'}

${competitorInsights}

${trendingContext}

The outline should include:
1. Compelling title with primary keyword
2. Introduction that hooks the reader
3. 4-6 main sections with H2 headings
4. 2-3 subsections per main section with H3 headings
5. Conclusion that summarizes key points
${request.includeCallToAction ? '6. Strong call-to-action' : ''}

Format as structured outline with headings and brief descriptions of content for each section.
Focus on providing valuable, actionable information while establishing legal expertise and trustworthiness.
`;
  }

  private getContentGenerationSystemPrompt(language: 'en' | 'es'): string {
    const prompts = {
      en: `You are an expert legal content writer and SEO specialist. Your role is to:
1. Create compelling, authoritative legal content that builds trust
2. Optimize content for search engines while maintaining readability
3. Provide practical, actionable advice while noting when professional consultation is needed
4. Write in a way that demonstrates legal expertise without being overly technical
5. Include appropriate disclaimers about attorney-client relationships
6. Structure content for both human readers and search engines

Always prioritize accuracy, helpfulness, and ethical legal practice standards.`,

      es: `Eres un escritor experto en contenido legal y especialista en SEO. Tu rol es:
1. Crear contenido legal convincente y autorizado que genere confianza
2. Optimizar contenido para motores de búsqueda manteniendo legibilidad
3. Proporcionar consejos prácticos y accionables notando cuando se necesita consulta profesional
4. Escribir de manera que demuestre experiencia legal sin ser demasiado técnico
5. Incluir descargos de responsabilidad apropiados sobre relaciones abogado-cliente
6. Estructurar contenido tanto para lectores humanos como motores de búsqueda

Siempre prioriza precisión, utilidad y estándares éticos de práctica legal.`,
    };

    return prompts[language];
  }

  private parseContentOutline(outline: string): any {
    // Parse the outline into a structured format
    // This is a simplified parser - in production would be more robust
    const lines = outline.split('\n').filter(line => line.trim());
    const structure = {
      title: '',
      introduction: '',
      sections: [] as Array<{
        heading: string;
        content: string;
        subsections: Array<{ heading: string; content: string }>;
      }>,
      conclusion: '',
      callToAction: '',
    };

    let currentSection: any = null;
    let currentSubsection: any = null;

    for (const line of lines) {
      const trimmed = line.trim();

      if (trimmed.toLowerCase().includes('title') || trimmed.startsWith('# ')) {
        structure.title = trimmed.replace(/^#+\s*|title:\s*/i, '');
      } else if (
        trimmed.toLowerCase().includes('introduction') ||
        trimmed.startsWith('## Introduction')
      ) {
        structure.introduction = trimmed;
      } else if (trimmed.startsWith('## ')) {
        currentSection = {
          heading: trimmed.replace('## ', ''),
          content: '',
          subsections: [],
        };
        structure.sections.push(currentSection);
        currentSubsection = null;
      } else if (trimmed.startsWith('### ') && currentSection) {
        currentSubsection = {
          heading: trimmed.replace('### ', ''),
          content: '',
        };
        currentSection.subsections.push(currentSubsection);
      } else if (trimmed.toLowerCase().includes('conclusion')) {
        structure.conclusion = trimmed;
      } else if (
        trimmed.toLowerCase().includes('call to action') ||
        trimmed.toLowerCase().includes('cta')
      ) {
        structure.callToAction = trimmed;
      }
    }

    return structure;
  }

  private async generateContent(
    outline: { outline: string; structure: any },
    request: SEOBlogGenerationRequest
  ): Promise<ContentStructure> {
    const contentPrompt = this.buildContentPrompt(outline, request);

    const response = await this.model.invoke([
      new SystemMessage(this.getContentGenerationSystemPrompt(request.language)),
      new HumanMessage(contentPrompt),
    ]);

    return this.parseGeneratedContent(response.content.toString(), request);
  }

  private buildContentPrompt(
    outline: { outline: string; structure: any },
    request: SEOBlogGenerationRequest
  ): string {
    return `
Based on this outline, write a complete ${request.contentType} about "${request.practiceArea}":

OUTLINE:
${outline.outline}

WRITING REQUIREMENTS:
- Word Count: ${request.wordCount} words
- Tone: ${request.tone}
- Target Audience: ${request.targetAudience}
- Primary Keywords: ${request.targetKeywords.join(', ')}
- Language: ${request.language}

CONTENT GUIDELINES:
1. Write engaging, informative content that establishes legal expertise
2. Include specific examples and practical advice where appropriate
3. Use clear, accessible language while maintaining professional authority
4. Incorporate target keywords naturally throughout the content
5. Add appropriate legal disclaimers
6. Structure with clear headings and subheadings
7. Include relevant statistics or recent legal developments if applicable
${request.includeCallToAction ? '8. End with a compelling call-to-action' : ''}

Format the response as a complete article with proper headings (H1, H2, H3) and well-structured paragraphs.
Ensure the content is valuable, accurate, and designed to rank well in search results while serving the target audience's needs.
`;
  }

  private parseGeneratedContent(
    content: string,
    request: SEOBlogGenerationRequest
  ): ContentStructure {
    // Parse the generated content into structured format
    const lines = content.split('\n').filter(line => line.trim());

    const structure: ContentStructure = {
      introduction: '',
      mainSections: [],
      conclusion: '',
      callToAction: request.includeCallToAction ? '' : undefined,
      faq: [],
    };

    let currentSection: any = null;
    let currentSubsection: any = null;
    let currentContent: string[] = [];
    let inIntroduction = true;
    let inConclusion = false;
    let inFAQ = false;

    for (const line of lines) {
      const trimmed = line.trim();

      if (trimmed.startsWith('# ')) {
        // H1 - skip, it's the title
        continue;
      } else if (trimmed.startsWith('## ')) {
        // H2 - new main section
        if (currentSection && currentContent.length > 0) {
          if (currentSubsection) {
            currentSubsection.content = currentContent.join('\n');
          } else {
            currentSection.content = currentContent.join('\n');
          }
        }

        const heading = trimmed.replace('## ', '');

        if (heading.toLowerCase().includes('conclusion')) {
          inConclusion = true;
          inIntroduction = false;
          inFAQ = false;
        } else if (
          heading.toLowerCase().includes('faq') ||
          heading.toLowerCase().includes('frequently asked')
        ) {
          inFAQ = true;
          inIntroduction = false;
          inConclusion = false;
        } else {
          inIntroduction = false;
          inConclusion = false;
          inFAQ = false;

          currentSection = {
            heading,
            content: '',
            subSections: [],
          };
          structure.mainSections.push(currentSection);
        }

        currentSubsection = null;
        currentContent = [];
      } else if (trimmed.startsWith('### ') && currentSection && !inConclusion && !inFAQ) {
        // H3 - new subsection
        if (currentSubsection && currentContent.length > 0) {
          currentSubsection.content = currentContent.join('\n');
        } else if (currentContent.length > 0) {
          currentSection.content = currentContent.join('\n');
        }

        currentSubsection = {
          subHeading: trimmed.replace('### ', ''),
          content: '',
        };
        currentSection.subSections = currentSection.subSections || [];
        currentSection.subSections.push(currentSubsection);
        currentContent = [];
      } else if (trimmed.length > 0) {
        // Regular content
        if (inIntroduction) {
          structure.introduction += (structure.introduction ? '\n' : '') + trimmed;
        } else if (inConclusion) {
          structure.conclusion += (structure.conclusion ? '\n' : '') + trimmed;
        } else if (inFAQ && trimmed.includes('?')) {
          // Simple FAQ parsing
          const [question, ...answerParts] = trimmed.split('?');
          if (question && answerParts.length > 0) {
            structure.faq!.push({
              question: question.trim() + '?',
              answer: answerParts.join('?').trim(),
            });
          }
        } else {
          currentContent.push(trimmed);
        }
      }
    }

    // Handle remaining content
    if (currentSection && currentContent.length > 0) {
      if (currentSubsection) {
        currentSubsection.content = currentContent.join('\n');
      } else {
        currentSection.content = currentContent.join('\n');
      }
    }

    return structure;
  }

  private async optimizeForSEO(
    content: ContentStructure,
    request: SEOBlogGenerationRequest
  ): Promise<SEOOptimization> {
    const seoPrompt = `
Optimize this content for SEO:

Practice Area: ${request.practiceArea}
Primary Keywords: ${request.targetKeywords.join(', ')}
Target Audience: ${request.targetAudience}
Location: ${request.location || 'General'}

Content Summary:
Introduction: ${content.introduction.substring(0, 200)}...
Main Sections: ${content.mainSections.map(s => s.heading).join(', ')}

Provide SEO optimization in this JSON format:
{
  "title": "SEO-optimized title with primary keyword (60 chars max)",
  "metaDescription": "Compelling meta description (155 chars max)",
  "slug": "url-friendly-slug",
  "headings": {
    "h1": "Main page heading",
    "h2": ["section heading 1", "section heading 2"],
    "h3": ["subsection 1", "subsection 2"]
  },
  "keywords": {
    "primary": "main keyword",
    "secondary": ["keyword1", "keyword2"],
    "longTail": ["long tail phrase 1", "long tail phrase 2"]
  },
  "internalLinks": [
    {"anchor": "link text", "url": "/relevant-page", "context": "where to place"}
  ],
  "imageAlt": ["alt text 1", "alt text 2"],
  "schema": {
    "type": "Article",
    "properties": {
      "headline": "article title",
      "description": "article description",
      "author": "Vasquez Law Firm"
    }
  }
}
`;

    const response = await this.model.invoke([
      new SystemMessage('You are an SEO expert optimizing legal content for search engines.'),
      new HumanMessage(seoPrompt),
    ]);

    try {
      return JSON.parse(response.content.toString());
    } catch (error) {
      logger.warn('Failed to parse SEO optimization, using fallback');
      return this.generateFallbackSEO(request);
    }
  }

  private generateFallbackSEO(request: SEOBlogGenerationRequest): SEOOptimization {
    const primaryKeyword = request.targetKeywords[0];

    return {
      title: `${request.practiceArea} ${primaryKeyword} | Vasquez Law Firm`,
      metaDescription: `Expert ${request.practiceArea.toLowerCase()} legal advice. Contact Vasquez Law Firm for ${primaryKeyword.toLowerCase()} assistance.`,
      slug: `${request.practiceArea.toLowerCase().replace(/\s+/g, '-')}-${primaryKeyword.toLowerCase().replace(/\s+/g, '-')}`,
      headings: {
        h1: `${request.practiceArea}: ${primaryKeyword}`,
        h2: ['Legal Overview', 'How We Can Help', 'Next Steps'],
        h3: ['Key Considerations', 'Common Questions', 'Contact Information'],
      },
      keywords: {
        primary: primaryKeyword,
        secondary: request.targetKeywords.slice(1, 4),
        longTail: [
          `${primaryKeyword} lawyer`,
          `${primaryKeyword} attorney`,
          `${request.practiceArea.toLowerCase()} legal advice`,
        ],
      },
      internalLinks: [
        { anchor: 'legal consultation', url: '/consultation', context: 'conclusion' },
        { anchor: 'practice areas', url: '/practice-areas', context: 'introduction' },
      ],
      imageAlt: [`${request.practiceArea} lawyer`, `${primaryKeyword} legal advice`],
      schema: {
        type: 'Article',
        properties: {
          headline: `${request.practiceArea}: ${primaryKeyword}`,
          description: `Expert guidance on ${primaryKeyword.toLowerCase()}`,
          author: 'Vasquez Law Firm',
        },
      },
    };
  }

  private calculateReadabilityScore(content: ContentStructure): number {
    // Simplified readability calculation (Flesch Reading Ease approximation)
    const fullText = [
      content.introduction,
      ...content.mainSections.map(s => s.content),
      content.conclusion,
    ].join(' ');

    const sentences = fullText.split(/[.!?]+/).length;
    const words = fullText.split(/\s+/).length;
    const syllables = this.countSyllables(fullText);

    if (sentences === 0 || words === 0) return 0;

    const avgSentenceLength = words / sentences;
    const avgSyllablesPerWord = syllables / words;

    const fleschScore = 206.835 - 1.015 * avgSentenceLength - 84.6 * avgSyllablesPerWord;

    // Convert to 0-100 scale where 100 is most readable
    return Math.max(0, Math.min(100, fleschScore));
  }

  private countSyllables(text: string): number {
    // Simplified syllable counting
    const words = text.toLowerCase().match(/[a-z]+/g) || [];
    return words.reduce((count, word) => {
      const vowels = word.match(/[aeiouy]+/g) || [];
      return count + Math.max(1, vowels.length);
    }, 0);
  }

  private calculateSEOScore(
    content: ContentStructure,
    seo: SEOOptimization,
    request: SEOBlogGenerationRequest
  ): number {
    let score = 0;

    // Title optimization (20 points)
    if (seo.title.includes(request.targetKeywords[0])) score += 20;

    // Meta description (15 points)
    if (seo.metaDescription.length >= 120 && seo.metaDescription.length <= 155) score += 15;

    // Keyword density (20 points)
    const fullText = [
      content.introduction,
      ...content.mainSections.map(s => s.content),
      content.conclusion,
    ].join(' ');
    const keywordCount = request.targetKeywords.reduce((count, keyword) => {
      const regex = new RegExp(keyword, 'gi');
      return count + (fullText.match(regex) || []).length;
    }, 0);
    const keywordDensity = keywordCount / fullText.split(/\s+/).length;
    if (keywordDensity >= 0.01 && keywordDensity <= 0.03) score += 20;

    // Heading structure (15 points)
    if (seo.headings.h2.length >= 3) score += 10;
    if (seo.headings.h3.length >= 3) score += 5;

    // Content length (15 points)
    if (fullText.split(/\s+/).length >= request.wordCount * 0.9) score += 15;

    // Internal links (10 points)
    if (seo.internalLinks.length >= 2) score += 10;

    // FAQ section (5 points)
    if (content.faq && content.faq.length >= 3) score += 5;

    return Math.min(100, score);
  }

  private async predictPerformance(
    content: ContentStructure,
    seo: SEOOptimization,
    request: SEOBlogGenerationRequest
  ) {
    // Mock performance prediction based on content quality and SEO score
    const contentScore = this.calculateReadabilityScore(content);
    const seoScore = this.calculateSEOScore(content, seo, request);

    const avgScore = (contentScore + seoScore) / 2;

    const estimatedTraffic = Math.round((avgScore / 100) * 500 + Math.random() * 200);

    const rankingPotential = avgScore >= 80 ? 'high' : avgScore >= 60 ? 'medium' : 'low';
    const conversionPotential =
      request.includeCallToAction && avgScore >= 70 ? 'high' : avgScore >= 50 ? 'medium' : 'low';

    return {
      estimatedTraffic,
      rankingPotential: rankingPotential as 'low' | 'medium' | 'high',
      conversionPotential: conversionPotential as 'low' | 'medium' | 'high',
    };
  }

  private async generatePublishingRecommendations(
    content: ContentStructure,
    request: SEOBlogGenerationRequest
  ) {
    // Optimal publishing time based on practice area and audience
    const timeMap = {
      potential_clients: '9:00 AM Tuesday',
      current_clients: '2:00 PM Wednesday',
      other_lawyers: '7:00 AM Thursday',
      general_public: '10:00 AM Monday',
    };

    const promotionChannels = [
      'LinkedIn',
      'Google My Business',
      'Email newsletter',
      'Law firm website',
    ];

    if (request.practiceArea.toLowerCase().includes('immigration')) {
      promotionChannels.push('Spanish-language social media');
    }

    const followUpActions = [
      'Monitor search rankings for target keywords',
      'Track website analytics and user engagement',
      'Share on relevant legal forums and communities',
      'Consider paid promotion for high-priority content',
    ];

    if (request.urgency === 'high') {
      followUpActions.unshift('Immediate social media promotion');
    }

    return {
      bestPublishTime: timeMap[request.targetAudience] || '9:00 AM Tuesday',
      promotionChannels,
      followUpActions,
    };
  }

  private async storeBlogContent(data: {
    content: ContentStructure;
    seoOptimization: SEOOptimization;
    readabilityScore: number;
    seoScore: number;
    competitiveAnalysis?: any;
    performancePredictions: any;
    publishingRecommendations: any;
    request: SEOBlogGenerationRequest;
  }): Promise<SEOBlogResult> {
    const blogResult: SEOBlogResult = {
      id: `blog_${Date.now()}_${data.request.practiceArea.replace(/\s+/g, '_')}`,
      title: data.seoOptimization.title,
      content: data.content,
      seoOptimization: data.seoOptimization,
      wordCount: [
        data.content.introduction,
        ...data.content.mainSections.map(s => s.content),
        data.content.conclusion,
      ]
        .join(' ')
        .split(/\s+/).length,
      readabilityScore: data.readabilityScore,
      seoScore: data.seoScore,
      competitiveAnalysis: data.competitiveAnalysis,
      performancePredictions: data.performancePredictions,
      publishingRecommendations: data.publishingRecommendations,
      createdAt: new Date(),
    };

    // Generate slug from title
    const slug = blogResult.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 100);

    // Convert ContentStructure to HTML string
    const contentHtml = this.convertContentToHtml(blogResult.content);

    try {
      await getPrismaClient().blogPost.create({
        data: {
          title: blogResult.title,
          slug: `${slug}-${Date.now()}`, // Add timestamp to ensure uniqueness
          content: contentHtml,
          excerpt: blogResult.content.introduction.substring(0, 200),
          metaDescription: blogResult.seoOptimization.metaDescription,
          metaKeywords: [
            blogResult.seoOptimization.keywords.primary,
            ...blogResult.seoOptimization.keywords.secondary,
            ...blogResult.seoOptimization.keywords.longTail,
          ],
          practiceArea: data.request.practiceArea,
          language: data.request.language,
          status: 'draft',
          author: 'AI Content Generator',
          keywords: data.request.targetKeywords || [],
          seoScore: Math.round(blogResult.seoScore),
          readTime: Math.ceil(blogResult.wordCount / 200), // Avg 200 words per minute
          faqSection: blogResult.content.faq ? { faq: blogResult.content.faq } : undefined,
          featuredImage: null,
          images: [],
        },
      });
    } catch (error) {
      logger.warn('Failed to store blog content in database', error);
    }

    return blogResult;
  }

  private convertContentToHtml(content: ContentStructure): string {
    let html = '';

    // Introduction
    html += `<div class="blog-introduction">${content.introduction}</div>\n\n`;

    // Main sections
    content.mainSections.forEach(section => {
      html += `<h2>${section.heading}</h2>\n`;
      html += `<p>${section.content}</p>\n`;

      if (section.subSections) {
        section.subSections.forEach(subSection => {
          html += `<h3>${subSection.subHeading}</h3>\n`;
          html += `<p>${subSection.content}</p>\n`;
        });
      }
    });

    // Conclusion
    html += `\n<div class="blog-conclusion">${content.conclusion}</div>\n`;

    // Call to Action
    if (content.callToAction) {
      html += `\n<div class="blog-cta">${content.callToAction}</div>\n`;
    }

    // FAQ Section
    if (content.faq && content.faq.length > 0) {
      html += '\n<div class="blog-faq">\n<h2>Frequently Asked Questions</h2>\n';
      content.faq.forEach(item => {
        html += `<div class="faq-item">\n`;
        html += `<h3>${item.question}</h3>\n`;
        html += `<p>${item.answer}</p>\n`;
        html += `</div>\n`;
      });
      html += '</div>\n';
    }

    return html;
  }
}
