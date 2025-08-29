// Single Responsibility Principle: Login button only
'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { UserRole } from '@/lib/auth/types'

export function LoginButton() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <button className="btn-primary" disabled>
        Loading...
      </button>
    )
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <div className="text-sm">
          <p className="font-medium">{session.user?.name || 'N/A'}</p>
          <p className="text-gray-500">{session.user?.email || 'N/A'}</p>
          <p className="text-xs text-gray-400 capitalize">Role: {session.user?.role || 'N/A'}</p>
        </div>
        <button 
          onClick={() => signOut({ callbackUrl: '/' })}
          className="btn-secondary"
        >
          Sign Out
        </button>
      </div>
    )
  }

  return (
    <button 
      onClick={() => signIn('demo')}
      className="btn-primary"
    >
      Demo Giriş
    </button>
  )
}
