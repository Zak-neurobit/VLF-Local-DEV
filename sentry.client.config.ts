// This file configures the initialization of Sentry on the client side
// See: https://docs.sentry.io/platforms/javascript/guides/nextjs/

// Temporarily disabled Sentry client configuration
/*
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  debug: false,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 0,
  integrations: [
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  beforeSend(event, hint) {
    if (event.exception?.values?.[0]?.type === 'ChunkLoadError') {
      return null;
    }
    return event;
  },
});
*/