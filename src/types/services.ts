// Service-related type definitions

// Case Management Types
export interface CaseNote {
  id: string;
  content: string;
  createdAt: Date;
  createdBy: string;
  attachments?: string[];
}

export interface CaseFinancials {
  retainerAmount?: number;
  retainerPaid?: number;
  totalBilled?: number;
  totalPaid?: number;
  outstandingBalance?: number;
  lastPaymentDate?: Date;
  paymentHistory?: Array<{
    date: Date;
    amount: number;
    method: string;
    description: string;
  }>;
}

export interface CaseMetadata {
  notes?: CaseNote[];
  financials?: CaseFinancials;
  tags?: string[];
  customFields?: Record<string, string | number | boolean>;
  lastActivityDate?: Date;
  assignedTo?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
}

// Payment Types
export interface PaymentMetadata {
  invoiceNumber?: string;
  description?: string;
  items?: Array<{
    description: string;
    amount: number;
    quantity?: number;
  }>;
  tax?: number;
  discount?: number;
  customFields?: Record<string, string | number | boolean>;
}

// Email Types
export interface EmailTemplateData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  caseType?: string;
  message?: string;
  appointmentDate?: Date;
  appointmentTime?: string;
  officeName?: string;
  officeAddress?: string;
  officePhone?: string;
  attorneyName?: string;
  caseNumber?: string;
  documentName?: string;
  documentUrl?: string;
  paymentAmount?: number;
  paymentDate?: Date;
  invoiceNumber?: string;
  nextSteps?: string[];
  customData?: Record<string, unknown>;
}

// Agent Types
export interface AgentContext {
  userId?: string;
  sessionId?: string;
  conversationHistory?: Array<{
    role: string;
    content: string;
    timestamp: Date;
  }>;
  userProfile?: {
    name?: string;
    email?: string;
    phone?: string;
    preferredLanguage?: string;
    caseType?: string;
  };
  extractedInfo?: Record<string, string | number | boolean>;
  metadata?: Record<string, unknown>;
}

// SEO Types
export interface SchemaOrgPerson {
  '@type': 'Person';
  name: string;
  jobTitle?: string;
  description?: string;
  image?: string;
  email?: string;
  telephone?: string;
  alumniOf?: Array<{
    '@type': 'Organization';
    name: string;
  }>;
  memberOf?: Array<{
    '@type': 'Organization';
    name: string;
  }>;
  knowsAbout?: string[];
  url?: string;
}

export interface SchemaOrgOrganization {
  '@type': 'Organization' | 'LegalService' | 'Attorney';
  name: string;
  description?: string;
  url?: string;
  logo?: string;
  telephone?: string;
  email?: string;
  address?: {
    '@type': 'PostalAddress';
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  sameAs?: string[];
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: number;
    reviewCount: number;
  };
}

export interface SchemaOrgFAQ {
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

// Document Generator Types
export interface DocumentTemplateData {
  clientName: string;
  clientEmail?: string;
  clientPhone?: string;
  clientAddress?: string;
  caseNumber?: string;
  caseType?: string;
  attorneyName?: string;
  attorneyBarNumber?: string;
  date?: Date;
  customFields?: Record<string, unknown>;
}

// Notification Types
export interface NotificationMetadata {
  urgency?: 'low' | 'medium' | 'high' | 'urgent';
  category?: string;
  actionUrl?: string;
  actionLabel?: string;
  expiresAt?: Date;
  customData?: Record<string, unknown>;
}

// GoHighLevel Types
export interface GHLContactData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  tags?: string[];
  source?: string;
  customFields?: Record<string, string | number | boolean>;
}

export interface GHLTaskData {
  contactId: string;
  title: string;
  body: string;
  dueDate: Date;
  assignedTo?: string;
  priority?: 'low' | 'normal' | 'high';
}

export interface GHLOpportunityData {
  contactId: string;
  pipelineId: string;
  stageId: string;
  name: string;
  value: number;
  source?: string;
  customFields?: Record<string, unknown>;
}

// Retell Types
export interface RetellCallData {
  phoneNumber: string;
  agentId?: string;
  metadata?: Record<string, unknown>;
  transferNumber?: string;
  variables?: Record<string, string>;
}

export interface RetellAgentConfig {
  name: string;
  voiceId: string;
  language: string;
  prompt: string;
  responseDelaySeconds?: number;
  interruptionThreshold?: number;
  voiceSpeed?: number;
  voiceTemperature?: number;
  webhookUrl?: string;
  endCallAfterSilenceSeconds?: number;
  maxCallDurationSeconds?: number;
}

// Analytics Types
export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, unknown>;
  timestamp?: Date;
  userId?: string;
  sessionId?: string;
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
  pageUrl?: string;
}

export interface MetricsData {
  totalCalls?: number;
  successfulCalls?: number;
  failedCalls?: number;
  averageDuration?: number;
  totalCost?: number;
  conversionRate?: number;
  satisfactionScore?: number;
  customMetrics?: Record<string, number>;
}