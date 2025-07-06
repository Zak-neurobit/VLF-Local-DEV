import { NextRequest } from 'next/server';
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';


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
      signIn: async (message: {
        user: {
          id: string;
          email?: string | null;
          name?: string | null;
          image?: string | null;
        };
        account?: {
          provider: string;
          type: string;
          providerAccountId: string;
          access_token?: string;
          expires_at?: number;
          refresh_token?: string;
          token_type?: string;
          scope?: string;
          id_token?: string;
        } | null;
        profile?: Record<string, unknown>;
        isNewUser?: boolean;
        __headers?: Record<string, string>;
      }) => {
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
