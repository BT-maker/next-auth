// Single Responsibility Principle: NextAuth API route only
import NextAuth from 'next-auth'
import { getNextAuthConfig } from '@/lib/auth/NextAuthConfig'

const handler = NextAuth(getNextAuthConfig())

export { handler as GET, handler as POST }
