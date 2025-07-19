// This file configures the initialization of Sentry for edge features (middleware, edge routes, etc.)
// See: https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry
  debug: false,

  // Disable automatic instrumentation that might bring in Node.js modules
  integrations: integrations => {
    // Filter out any integrations that might not be edge-compatible
    return integrations.filter(integration => {
      // Remove any integration that might use Node.js specific modules
      const name = integration.name || integration.constructor.name;
      return !name.includes('Http') && !name.includes('Undici');
    });
  },

  // Disable features that might not work in edge runtime
  autoSessionTracking: false,

  // Don't capture console errors in edge runtime
  beforeSend(event, hint) {
    // Filter out pino-related errors in edge runtime
    if (event.exception?.values?.[0]?.value?.includes('pino')) {
      return null;
    }
    return event;
  },
});
