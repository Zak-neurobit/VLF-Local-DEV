import { NextRequest } from 'next/server';
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

interface SignInMessage {
  user: {
    email?: string | null;
    name?: string | null;
    id: string;
  };
  account?: {
    provider?: string;
  } | null;
  profile?: {
    email?: string;
  } | null;
  isNewUser?: boolean;
  __headers?: Record<string, string>;
}

// Create handler that passes request headers to auth options
async function auth(req: NextRequest, context: { params: { nextauth: string[] } }) {
  // Extract headers for IP detection
  const headers: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    headers[key] = value;
  });

  // Create auth options with request context
  const authOptionsWithContext = {
    ...authOptions,
    events: {
      ...authOptions.events,
      signIn: async (message: any) => {
        // Pass headers to the signIn event
        const originalSignIn = authOptions.events?.signIn;
        if (originalSignIn) {
          // Add headers to the context
          message.__headers = headers;
          await originalSignIn(message);
        }
      },
    },
  };

  return NextAuth(req, context, authOptionsWithContext);
}

export { auth as GET, auth as POST };
