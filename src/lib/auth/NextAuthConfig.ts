// Single Responsibility Principle: NextAuth configuration only
import { NextAuthOptions } from 'next-auth'
import Auth0Provider from 'next-auth/providers/auth0'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import FacebookProvider from 'next-auth/providers/facebook'
import TwitterProvider from 'next-auth/providers/twitter'
import { AuthConfiguration } from './config'
import { JWTService } from './JWTService'
import { UserRole } from './types'
import { demoCredentials } from './DemoProvider'

export const getNextAuthConfig = (): NextAuthOptions => {
  const config = AuthConfiguration.getInstance().getConfig()
  const jwtService = JWTService.getInstance()

  const isDemoMode = process.env.DEMO_MODE === 'true'

  return {
    providers: [
      // Demo Provider (for testing without Auth0)
      CredentialsProvider({
        id: 'demo',
        name: 'Demo',
        credentials: {
          email: { label: 'Email', type: 'email' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
          if (!credentials?.email) {
            return null
          }

          // Demo kullanıcıları
          const demoUsers = [
            { email: 'admin@example.com', role: UserRole.ADMIN, name: 'Admin User' },
            { email: 'user@example.com', role: UserRole.USER, name: 'Regular User' },
            { email: 'john@example.com', role: UserRole.USER, name: 'John Doe' },
            { email: 'jane@example.com', role: UserRole.ADMIN, name: 'Jane Smith' },
          ]

          const user = demoUsers.find(u => u.email === credentials.email)
          if (!user) {
            return null
          }

          return {
            id: user.email,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        },
      }),
      // Sosyal Medya Provider'ları (Demo modda devre dışı)
      ...(isDemoMode ? [] : [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID || 'demo-google-client-id',
          clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'demo-google-client-secret',
        }),
        GitHubProvider({
          clientId: process.env.GITHUB_CLIENT_ID || 'demo-github-client-id',
          clientSecret: process.env.GITHUB_CLIENT_SECRET || 'demo-github-client-secret',
        }),
        FacebookProvider({
          clientId: process.env.FACEBOOK_CLIENT_ID || 'demo-facebook-client-id',
          clientSecret: process.env.FACEBOOK_CLIENT_SECRET || 'demo-facebook-client-secret',
        }),
        TwitterProvider({
          clientId: process.env.TWITTER_CLIENT_ID || 'demo-twitter-client-id',
          clientSecret: process.env.TWITTER_CLIENT_SECRET || 'demo-twitter-client-secret',
          version: '2.0',
        }),
      ]),
      // Auth0 Provider (optional)
      ...(isDemoMode ? [] : [
        Auth0Provider({
          clientId: config.auth0ClientId,
          clientSecret: config.auth0ClientSecret,
          issuer: config.auth0IssuerBaseUrl,
          authorization: {
            params: {
              scope: 'openid profile email',
            },
          },
          // Development için daha esnek ayarlar
          allowDangerousEmailAccountLinking: true,
        }),
      ]),
    ],
    session: {
      strategy: 'jwt',
      maxAge: 24 * 60 * 60, // 24 hours
      updateAge: 60 * 60, // 1 hour
    },
    jwt: {
      encode: async ({ secret, token }) => {
        if (!token) return ''
        
        // Custom JWT encoding using our JWTService
        const user = {
          id: token.sub || '',
          email: token.email || '',
          name: token.name || '',
          image: token.picture || '',
          role: (token.role as UserRole) || UserRole.USER,
        }
        
        return jwtService.generateToken(user)
      },
      decode: async ({ secret, token }) => {
        if (!token) return null
        
        try {
          const payload = jwtService.verifyToken(token)
          return payload as any
        } catch (error) {
          return null
        }
      },
    },
    callbacks: {
      async jwt({ token, user, account }) {
        // Initial sign in
        if (account && user) {
          return {
            ...token,
            role: user.role || UserRole.USER,
            accessToken: account.access_token,
          } as any
        }
        return token
      },
      async session({ session, token }) {
        if (token && session.user) {
          session.user.id = token.sub || ''
          session.user.role = token.role || UserRole.USER
          session.accessToken = token.accessToken || ''
        }
        return session
      },
      async redirect({ url, baseUrl }) {
        // Logout sonrası ana sayfaya yönlendir
        if (url.startsWith('/')) return `${baseUrl}${url}`
        else if (new URL(url).origin === baseUrl) return url
        return baseUrl
      },
    },
    pages: {
      signIn: '/auth/signin',
      signOut: '/',
      error: '/auth/error',
    },
    secret: config.nextAuthSecret,
  }
}
