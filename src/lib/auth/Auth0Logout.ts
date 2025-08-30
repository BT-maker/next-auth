// Auth0 Logout Utility
import { AuthConfiguration } from './config'

export class Auth0Logout {
  private static config = AuthConfiguration.getInstance().getConfig()

  /**
   * Auth0'dan çıkış yapmak için URL oluşturur
   * Bu URL, kullanıcıyı Auth0 logout sayfasına yönlendirir
   * ve sonrasında belirtilen returnTo URL'sine geri döner
   */
  static getLogoutUrl(returnTo: string = '/'): string {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const fullReturnTo = returnTo.startsWith('http') ? returnTo : `${baseUrl}${returnTo}`
    
    const logoutUrl = `${this.config.auth0IssuerBaseUrl}/v2/logout?client_id=${this.config.auth0ClientId}&returnTo=${encodeURIComponent(fullReturnTo)}`
    console.log('Auth0 Logout URL generated:', logoutUrl)
    console.log('Auth0 Config:', {
      issuerBaseUrl: this.config.auth0IssuerBaseUrl,
      clientId: this.config.auth0ClientId,
      returnTo: fullReturnTo
    })
    
    return logoutUrl
  }

  /**
   * Auth0 ile giriş yapılmışsa Auth0'dan da çıkış yapar
   * @param session NextAuth session bilgisi
   * @param returnTo Çıkış sonrası yönlendirilecek URL
   */
  static async logoutFromAuth0(session: any, returnTo: string = '/'): Promise<void> {
    // Eğer Auth0 ile giriş yapılmışsa (session'da provider bilgisi varsa)
    if (session?.provider === 'auth0') {
      const logoutUrl = this.getLogoutUrl(returnTo)
      console.log('Auth0 Logout URL:', logoutUrl)
      
      // Auth0 logout sayfasına yönlendir
      window.location.href = logoutUrl
    } else {
      // Auth0 ile giriş yapılmamışsa sadece ana sayfaya yönlendir
      window.location.href = returnTo
    }
  }

  /**
   * Tüm authentication verilerini temizler
   * Bu fonksiyon NextAuth signOut'tan sonra çağrılmalıdır
   */
  static clearAllAuthData(): void {
    // LocalStorage ve SessionStorage'ı temizle
    if (typeof window !== 'undefined') {
      localStorage.clear()
      sessionStorage.clear()
      
      // NextAuth ile ilgili cookie'leri temizle
      const nextAuthCookies = [
        'next-auth.session-token',
        'next-auth.csrf-token', 
        'next-auth.callback-url',
        '__Secure-next-auth.session-token',
        '__Host-next-auth.csrf-token'
      ]
      
      nextAuthCookies.forEach(cookieName => {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost;`
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.localhost;`
      })
    }
  }
}
