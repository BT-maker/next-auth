'use client'

import { signIn, getSession } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { SocialLogin } from '@/components/auth/SocialLogin'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const demoUsers = [
    { email: 'bahattok6@gmail.com', password: 'admin123', name: 'Admin User', role: 'Admin' },
    { email: 'user@example.com', password: 'user123', name: 'Regular User', role: 'User' },
    { email: 'john@example.com', password: 'john123', name: 'John Doe', role: 'User' },
    { email: 'jane@example.com', password: 'jane123', name: 'Jane Smith', role: 'Admin' },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('demo', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Giriş başarısız. Lütfen geçerli bir email adresi girin.')
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setIsLoading(false)
    }
  }

  const quickLogin = (userEmail: string) => {
    setEmail(userEmail)
    setPassword('demo123')
  }

  const handleSocialError = (errorMessage: string) => {
    setError(errorMessage)
  }

  const handleSocialSuccess = () => {
    router.push('/dashboard')
  }

  return (
    <div className="bg-gradient-to-br from-primary-50 to-blue-100 flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="max-w-md w-full mx-4">
        <div className="card">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Giriş Yap
            </h1>
            <p className="text-gray-600">
              Demo modda test edebilirsiniz
            </p>
          </div>

          {/* Auth0 Giriş Butonu */}
          <div className="mb-6">
            <button
              onClick={() => signIn('auth0', { callbackUrl: '/dashboard' })}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Auth0 ile Giriş Yap
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Veya demo hesaplarla giriş yap</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="ornek@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Şifre
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Şifrenizi girin"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full"
            >
              {isLoading ? 'Giriş yapılıyor...' : 'Demo Giriş Yap'}
            </button>
          </form>

          {/* Sosyal Medya Giriş */}
          <div className="mt-6">
            <SocialLogin 
              onSuccess={handleSocialSuccess}
              onError={handleSocialError}
            />
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Demo Kullanıcılar
            </h3>
            <div className="space-y-3">
              {demoUsers.map((user) => (
                <button
                  key={user.email}
                  onClick={() => quickLogin(user.email)}
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                  <div className="text-xs text-gray-400 capitalize">Rol: {user.role}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link href="/" className="text-primary-600 hover:text-primary-700">
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
