import { type NextAuthOptions } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import { type Adapter, type AdapterUser, type AdapterAccount, type AdapterSession, type VerificationToken } from 'next-auth/adapters'
import prisma from '@/lib/prisma'

// Custom Prisma adapter that maps NextAuth operations to the Auth-prefixed models
// so they don't collide with the clinical User/Session models.
function buildCustomAdapter(): Adapter {
  const db = prisma as any // eslint-disable-line @typescript-eslint/no-explicit-any

  return {
    async createUser(data: Omit<AdapterUser, 'id'>): Promise<AdapterUser> {
      const user = await db.authUser.create({
        data: {
          email: data.email,
          emailVerified: data.emailVerified,
          name: data.name,
          image: data.image,
        },
      })
      return user as AdapterUser
    },

    async getUser(id: string): Promise<AdapterUser | null> {
      const user = await db.authUser.findUnique({ where: { id } })
      return user as AdapterUser | null
    },

    async getUserByEmail(email: string): Promise<AdapterUser | null> {
      const user = await db.authUser.findUnique({ where: { email } })
      return user as AdapterUser | null
    },

    async getUserByAccount({ provider, providerAccountId }: { provider: string; providerAccountId: string }): Promise<AdapterUser | null> {
      const account = await db.authAccount.findUnique({
        where: { provider_providerAccountId: { provider, providerAccountId } },
        include: { user: true },
      })
      return account?.user as AdapterUser | null
    },

    async updateUser(data: Partial<AdapterUser> & Pick<AdapterUser, 'id'>): Promise<AdapterUser> {
      const user = await db.authUser.update({
        where: { id: data.id },
        data: {
          email: data.email,
          emailVerified: data.emailVerified,
          name: data.name,
          image: data.image,
        },
      })
      return user as AdapterUser
    },

    async deleteUser(id: string): Promise<void> {
      await db.authUser.delete({ where: { id } })
    },

    async linkAccount(data: AdapterAccount): Promise<AdapterAccount> {
      const account = await db.authAccount.create({
        data: {
          userId: data.userId,
          type: data.type,
          provider: data.provider,
          providerAccountId: data.providerAccountId,
          refresh_token: data.refresh_token,
          access_token: data.access_token,
          id_token: data.id_token,
          expires_at: data.expires_at,
          token_type: data.token_type,
          scope: data.scope,
          session_state: data.session_state as string | undefined,
        },
      })
      return account as AdapterAccount
    },

    async unlinkAccount({ provider, providerAccountId }: { provider: string; providerAccountId: string }): Promise<void> {
      await db.authAccount.delete({
        where: { provider_providerAccountId: { provider, providerAccountId } },
      })
    },

    async createSession(data: { sessionToken: string; userId: string; expires: Date }): Promise<AdapterSession> {
      const session = await db.authSession.create({ data })
      return session as AdapterSession
    },

    async getSessionAndUser(sessionToken: string): Promise<{ session: AdapterSession; user: AdapterUser } | null> {
      const result = await db.authSession.findUnique({
        where: { sessionToken },
        include: { user: true },
      })
      if (!result) return null
      return {
        session: result as AdapterSession,
        user: result.user as AdapterUser,
      }
    },

    async updateSession(data: Partial<AdapterSession> & Pick<AdapterSession, 'sessionToken'>): Promise<AdapterSession> {
      const session = await db.authSession.update({
        where: { sessionToken: data.sessionToken },
        data: {
          expires: data.expires,
          userId: data.userId,
        },
      })
      return session as AdapterSession
    },

    async deleteSession(sessionToken: string): Promise<void> {
      await db.authSession.delete({ where: { sessionToken } })
    },

    async createVerificationToken(data: VerificationToken): Promise<VerificationToken> {
      const vt = await db.verificationToken.create({ data })
      return vt as VerificationToken
    },

    async useVerificationToken({ identifier, token }: { identifier: string; token: string }): Promise<VerificationToken | null> {
      try {
        const vt = await db.verificationToken.delete({
          where: { identifier_token: { identifier, token } },
        })
        return vt as VerificationToken
      } catch {
        return null
      }
    },
  }
}

export const authOptions: NextAuthOptions = {
  adapter: buildCustomAdapter(),

  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST ?? 'smtp.resend.com',
        port: parseInt(process.env.EMAIL_SERVER_PORT ?? '465'),
        auth: {
          user: process.env.EMAIL_SERVER_USER ?? 'resend',
          pass: process.env.EMAIL_SERVER_PASSWORD ?? '',
        },
      },
      from: process.env.EMAIL_FROM ?? 'Lennox Fields <hello@lennoxfields.com>',
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        const db = prisma as any // eslint-disable-line @typescript-eslint/no-explicit-any
        const authUser = await db.authUser.findUnique({
          where: { id: user.id },
          select: { subscriptionStatus: true },
        })
        token.subscriptionStatus = authUser?.subscriptionStatus ?? null
      }
      return token
    },

    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id as string // eslint-disable-line @typescript-eslint/no-explicit-any
        ;(session.user as any).subscriptionStatus = token.subscriptionStatus as string | null // eslint-disable-line @typescript-eslint/no-explicit-any
      }
      return session
    },
  },

  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request',
    error: '/auth/error',
  },
}
