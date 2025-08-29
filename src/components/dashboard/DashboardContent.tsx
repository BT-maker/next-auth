'use client'

import { useSession } from 'next-auth/react'

export function DashboardContent() {
  const { data: session } = useSession()

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Dashboard
          </h1>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Kullanıcı Bilgileri</h2>
              <div className="space-y-2">
                <p><strong>Ad:</strong> {session?.user?.name || 'N/A'}</p>
                <p><strong>E-posta:</strong> {session?.user?.email || 'N/A'}</p>
                <p><strong>Rol:</strong> {session?.user?.role || 'N/A'}</p>
                <p><strong>Kullanıcı ID:</strong> {session?.user?.id || 'N/A'}</p>
              </div>
            </div>
            
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Oturum Bilgileri</h2>
              <div className="space-y-2">
                <p><strong>Oturum Süresi:</strong> 24 saat</p>
                <p><strong>Token Tipi:</strong> JWT</p>
                <p><strong>Sağlayıcı:</strong> Demo</p>
                <p><strong>Durum:</strong> Aktif</p>
              </div>
            </div>
          </div>
          
          <div className="card mt-6">
            <h2 className="text-xl font-semibold mb-4">Hızlı İşlemler</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <button className="btn-primary">
                Profil Düzenle
              </button>
              <button className="btn-secondary">
                Ayarlar
              </button>
              <button className="btn-secondary">
                Yardım
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
