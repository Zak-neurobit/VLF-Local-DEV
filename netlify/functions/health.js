/**
 * Netlify Function: Health Check
 * Replaces /api/health for static export
 */

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle OPTIONS request for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: {
        ...headers,
        'Allow': 'GET',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    services: {
      netlify: 'operational',
      functions: 'operational',
      static_site: 'operational',
    },
    deployment: {
      context: process.env.CONTEXT || 'unknown',
      branch: process.env.BRANCH || 'unknown',
      commit: process.env.COMMIT_REF || 'unknown',
    },
    errors: [],
  };

  // Check environment variables
  const requiredEnvVars = [
    'NEXT_PUBLIC_APP_URL',
    'NEXT_PUBLIC_GA_ID',
  ];

  const missingEnvVars = requiredEnvVars.filter(env => !process.env[env]);
  if (missingEnvVars.length > 0) {
    health.errors.push(`Missing environment variables: ${missingEnvVars.join(', ')}`);
    health.status = 'degraded';
  }

  const statusCode = health.status === 'healthy' ? 200 : 503;

  return {
    statusCode,
    headers,
    body: JSON.stringify(health, null, 2),
  };
};