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
      // Sosyal Medya Provider'ları
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
        }),
      ]),
    ],
    session: {
      strategy: 'jwt',
      maxAge: 60 * 60, // 1 hour (daha kısa süre)
      updateAge: 60 * 5, // 5 minutes
    },
    jwt: {
      encode: async ({ secret, token }) => {
        if (!token) return ''
        
        console.log('JWT Encode - Token:', token)
        
        // Custom JWT encoding using our JWTService
        const user = {
          id: token.sub || '',
          email: token.email || '',
          name: token.name || '',
          image: token.picture || '',
          role: (token.role as UserRole) || UserRole.USER,
        }
        
        const encodedToken = jwtService.generateToken(user)
        console.log('JWT Encode - Encoded Token:', encodedToken)
        
        return encodedToken
      },
      decode: async ({ secret, token }) => {
        if (!token) return null
        
        console.log('JWT Decode - Token:', token)
        
        try {
          const payload = jwtService.verifyToken(token)
          console.log('JWT Decode - Payload:', payload)
          return payload as any
        } catch (error) {
          console.error('JWT Decode - Error:', error)
          return null
        }
      },
    },
    callbacks: {
      async jwt({ token, user, account, profile }) {
        console.log('JWT Callback - Token:', token)
        console.log('JWT Callback - User:', user)
        console.log('JWT Callback - Account:', account)
        
        // Initial sign in
        if (account && user) {
          // Auth0'dan gelen kullanıcı için role belirleme
          let userRole = UserRole.USER
          if (user.email === 'admin@example.com' || user.email?.includes('admin')) {
            userRole = UserRole.ADMIN
          }
          
          const newToken = {
            ...token,
            role: userRole,
            accessToken: account.access_token,
            provider: account.provider, // Provider bilgisini sakla
            sub: user.id || user.email,
          } as any
          
          console.log('JWT Callback - New Token:', newToken)
          return newToken
        }
        return token
      },
      async session({ session, token }) {
        console.log('Session Callback - Token:', token)
        console.log('Session Callback - Session:', session)
        
        if (token && session.user) {
          session.user.id = token.sub || ''
          session.user.role = token.role || UserRole.USER
          session.accessToken = token.accessToken || ''
          session.provider = token.provider || '' // Provider bilgisini session'a ekle
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
