import { NextRequest } from 'next/server';
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';
import type { User } from 'next-auth';

// Define proper types for the signIn event
interface SignInMessage {
  user: User;
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
}

// Create the NextAuth handler
const handler = NextAuth(authOptions);

// Export as named exports for the app router
export { handler as GET, handler as POST };
