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
  ghl_opportunity_id?: string;
  callback_phone?: string;
  callback_time?: string;
  caller_name?: string;
  caller_email?: string;
  case_details?: string;
  priority?: 'high' | 'medium' | 'low';
  tags?: string[];
  custom_fields?: Record<string, string | number | boolean>;
}

export interface PaymentPlanMetadata {
  failedAttempts?: number;
  lastFailedAttempt?: string;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
  retryCount?: number;
  nextRetryDate?: string;
  errorMessage?: string;
  paymentMethod?: string;
  planType?: string;
  billingCycle?: 'monthly' | 'quarterly' | 'annual';
  customFields?: Record<string, string | number | boolean>;
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
  urgency?: 'high' | 'medium' | 'low';
  documentIds?: string[];
  appointmentDate?: string;
  estimatedValue?: number;
  referenceNumber?: string;
  additionalNotes?: string;
  customData?: Record<string, string | number | boolean>;
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
    subscription?: {
      id: string;
      status: string;
      current_period_end?: number;
    };
    metadata?: Record<string, string | number | boolean>;
    billing_details?: {
      name?: string;
      email?: string;
      phone?: string;
      address?: {
        line1?: string;
        line2?: string;
        city?: string;
        state?: string;
        postal_code?: string;
        country?: string;
      };
    };
  };
}
