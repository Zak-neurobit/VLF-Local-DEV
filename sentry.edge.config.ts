// This file configures the initialization of Sentry for edge runtime
// See: https://docs.sentry.io/platforms/javascript/guides/nextjs/

// Temporarily disabled Sentry edge configuration
/*
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  debug: false,
});
*/