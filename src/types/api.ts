// API-related type definitions

// Webhook types
export interface RetellCallAnalysis {
  summary?: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
  intent?: string;
  case_type?: string;
  requires_follow_up?: boolean;
}

export interface RetellCallMetadata {
  ghl_contact_id?: string;
  requires_callback?: boolean;
  [key: string]: any;
}

export interface PaymentPlanMetadata {
  failedAttempts?: number;
  lastFailedAttempt?: string;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
  [key: string]: any;
}

// Contact form types
export interface ContactFormMetadata {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  caseType: string;
  message: string;
  preferredLanguage?: string;
  referralSource?: string;
  hearAboutUs?: string;
  acceptedTerms: boolean;
  newsletter?: boolean;
  timestamp: string;
  ipAddress?: string;
}

// Dashboard metrics types
export interface ExtractedInfo {
  nextCourtDate?: string;
  caseStatus?: string;
  alienNumber?: string;
  receiptNumber?: string;
  [key: string]: any;
}

// Stripe webhook types
export interface StripeEventData {
  object: {
    id: string;
    amount_paid?: number;
    customer_email?: string;
    payment_intent?: string;
    charge?: string;
    last_finalization_error?: {
      message: string;
    };
    attempt_count?: number;
    [key: string]: any;
  };
}
