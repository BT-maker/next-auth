// Single Responsibility Principle: Route protection component only
'use client'

import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'
import { UserRole } from '@/lib/auth/types'

interface ProtectedRouteProps {
  children: ReactNode
  requiredRole?: UserRole
  fallback?: ReactNode
}

export function ProtectedRoute({ 
  children, 
  requiredRole, 
  fallback = <div>Access Denied</div> 
}: ProtectedRouteProps) {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return fallback
  }

  if (requiredRole && session.user?.role !== requiredRole) {
    return fallback
  }

  return <>{children}</>
}
