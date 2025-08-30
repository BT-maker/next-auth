// Single Responsibility Principle: Login button only
'use client'

import { signIn, useSession } from 'next-auth/react'
import { UserRole } from '@/lib/auth/types'
import { useLogout } from '@/lib/auth/useLogout'

export function LoginButton() {
  const { data: session, status } = useSession()
  const { logout } = useLogout()

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
          onClick={() => logout('/')}
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
