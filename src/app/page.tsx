import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="bg-gradient-to-br from-primary-50 to-blue-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Next.js + Auth0 + NextAuth
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            SOLID prensiplerine ve 12 Factor App ilkelerine uygun kimlik doğrulama sistemi
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="card">
              <h3 className="text-lg font-semibold mb-2">🔐 Güvenli Kimlik Doğrulama</h3>
              <p className="text-gray-600">
                Auth0 ile OAuth 2.0 ve JWT tabanlı güvenli oturum yönetimi
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold mb-2">🛡️ Rol Bazlı Yetkilendirme</h3>
              <p className="text-gray-600">
                Admin ve user rolleri ile sayfa erişim kontrolü
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold mb-2">⚡ Modern Teknolojiler</h3>
              <p className="text-gray-600">
                Next.js 14, TypeScript, TailwindCSS ile modern geliştirme
              </p>
            </div>
          </div>

          <div className="mt-8 space-x-4">
            <Link href="/dashboard" className="btn-primary">
              Dashboard
            </Link>
            <Link href="/admin" className="btn-secondary">
              Admin Panel
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
