// Custom hook for handling logout
'use client'

import { signOut, useSession } from 'next-auth/react'
import { Auth0Logout } from './Auth0Logout'

export const useLogout = () => {
  const { data: session } = useSession()

  const logout = async (returnTo: string = '/') => {
    console.log('Logout başlatılıyor...')
    
    try {
      // Önce NextAuth signOut'u çağır (redirect: false ile)
      await signOut({ 
        callbackUrl: returnTo,
        redirect: false // Manuel yönlendirme yapacağız
      })
      
      // Auth0 ile giriş yapılmışsa Auth0'dan da çıkış yap
      if (session?.provider === 'auth0') {
        console.log('Auth0 ile giriş yapılmış, Auth0 logout yapılıyor...')
        Auth0Logout.logoutFromAuth0(session, returnTo)
      } else {
        // Auth0 ile giriş yapılmamışsa sadece belirtilen sayfaya yönlendir
        console.log('Demo mod ile giriş yapılmış, yönlendiriliyor...')
        window.location.href = returnTo
      }
    } catch (error) {
      console.error('Logout error:', error)
      // Hata durumunda manuel olarak belirtilen sayfaya yönlendir
      window.location.href = returnTo
    }
  }

  return { logout }
}
