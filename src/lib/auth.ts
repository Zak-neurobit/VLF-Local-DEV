import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { getPrismaClient } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { emailService } from '@/services/email.service';
import { env } from '@/lib/env';

// Use a simple console logger in edge runtime
const logger = {
  info: (message: string, ...args: any[]) => console.log(`[INFO] ${message}`, ...args),
  error: (message: string, ...args: any[]) => console.error(`[ERROR] ${message}`, ...args),
  warn: (message: string, ...args: any[]) => console.warn(`[WARN] ${message}`, ...args),
};

// Helper function to get client IP from request headers
function getClientIp(headers?: Record<string, string | string[] | undefined>): string {
  if (!headers) return 'unknown';

  // Check various headers that might contain the IP
  const forwardedFor = headers['x-forwarded-for'];
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, get the first one
    const ips = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor;
    return ips.split(',')[0].trim();
  }

  const realIp = headers['x-real-ip'];
  if (realIp) {
    return Array.isArray(realIp) ? realIp[0] : realIp;
  }

  const clientIp = headers['x-client-ip'];
  if (clientIp) {
    return Array.isArray(clientIp) ? clientIp[0] : clientIp;
  }

  return 'unknown';
}

export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  adapter: env.DATABASE_URL ? PrismaAdapter(getPrismaClient()) : undefined as any,
  providers: [
    // Email/Password authentication
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        if (!env.DATABASE_URL) {
          logger.warn('Database not available for authentication');
          // Return a mock user in development without database
          if (env.NODE_ENV === 'development') {
            return {
              id: 'dev-user',
              email: credentials.email,
              name: 'Development User',
              role: 'ADMIN',
              language: 'en',
            };
          }
          return null;
        }

        try {
          const user = await getPrismaClient().user.findUnique({
            where: { email: credentials.email },
          });

          if (!user || !user.password) {
            throw new Error('User not found');
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

          if (!isPasswordValid) {
            throw new Error('Invalid password');
          }

          logger.info(`User logged in: ${user.email}`);

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            language: user.language,
          };
        } catch (error) {
          logger.error('Authentication error:', error);
          return null;
        }
      },
    }),

    // Google OAuth (only if configured)
    ...(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET ? [GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: 'CLIENT',
          language: 'en',
        };
      },
    })] : []),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/dashboard',
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.language = user.language;
      }

      // Handle OAuth account linking
      if (account && account.provider !== 'credentials' && env.DATABASE_URL) {
        try {
          const existingUser = await getPrismaClient().user.findUnique({
            where: { email: token.email! },
          });

          if (!existingUser) {
            // Create new user from OAuth
            const newUser = await getPrismaClient().user.create({
              data: {
                email: token.email!,
                name: token.name!,
                role: 'CLIENT',
                language: 'en',
                image: token.picture,
              },
            });
            token.id = newUser.id;
            token.role = newUser.role;
            token.language = newUser.language;
          } else {
            token.id = existingUser.id;
            token.role = existingUser.role;
            token.language = existingUser.language;
          }
        } catch (error) {
          logger.warn('Database not available during OAuth linking:', error);
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.language = token.language as string;
      }

      return session;
    },

    async signIn({ user, account, profile }) {
      // Log sign-in attempts
      logger.info(`Sign-in attempt: ${user.email} via ${account?.provider}`);

      // Check if user is blocked
      if (user.email && env.DATABASE_URL) {
        try {
          const dbUser = await getPrismaClient().user.findUnique({
            where: { email: user.email },
          });

          if (dbUser?.blocked) {
            logger.warn(`Blocked user attempted sign-in: ${user.email}`);
            return false;
          }
        } catch (error) {
          logger.warn('Database not available for user check:', error);
        }
      }

      return true;
    },
  },

  events: {
    async signIn(message) {
      const { user, account, profile, isNewUser } = message;
      logger.info(`User signed in: ${user.email} via ${account?.provider}`);

      // Track sign-in for analytics
      if (user.id && env.DATABASE_URL) {
        try {
          // Get IP address from the request headers passed from the route handler
          const headers = (message as any).__headers;
          const clientIp = getClientIp(headers);

          await getPrismaClient().userActivity.create({
            data: {
              userId: user.id,
              type: 'SIGN_IN',
              metadata: {
                provider: account?.provider,
                ip: clientIp,
              },
            },
          });
        } catch (error) {
          logger.warn('Failed to track sign-in activity:', error);
        }
      }
    },

    async signOut({ session, token }) {
      logger.info(`User signed out: ${token.email}`);
    },

    async createUser({ user }) {
      logger.info(`New user created: ${user.email}`);

      // Send welcome email
      try {
        await emailService.sendEmail({
          to: user.email!,
          subject: 'Welcome to Vasquez Law Firm',
          template: 'user-welcome',
          data: {
            name: user.name || 'Valued Client',
            email: user.email,
          },
        });
        logger.info(`Welcome email sent to: ${user.email}`);
      } catch (error) {
        logger.error('Failed to send welcome email:', error);
        // Don't throw error to prevent user creation from failing
      }
    },

    async linkAccount({ user, account, profile }) {
      logger.info(`Account linked: ${user.email} with ${account.provider}`);
    },

    async session({ session, token }) {
      // Update last active timestamp
      if (token.id && env.DATABASE_URL) {
        await getPrismaClient()
          .user.update({
            where: { id: token.id as string },
            data: { lastActive: new Date() },
          })
          .catch((err: Error) => logger.error('Failed to update last active:', err));
      }
    },
  },

  debug: env.NODE_ENV === 'development',
  // Add proper error handling for production
  logger: {
    error: (code, metadata) => {
      logger.error('NextAuth error:', { code, metadata });
    },
    warn: (code) => {
      logger.warn('NextAuth warning:', code);
    },
    debug: (code, metadata) => {
      if (env.NODE_ENV === 'development') {
        logger.info('NextAuth debug:', { code, metadata });
      }
    },
  },
};

// Type extensions for TypeScript
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      role: string;
      language: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name?: string | null;
    role: string;
    language: string;
    blocked?: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
    language: string;
  }
}
