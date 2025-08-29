import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { UserRole } from '@/lib/auth/types'

function AdminContent() {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Admin Panel
          </h1>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Kullanıcı Yönetimi</h2>
              <div className="space-y-3">
                <button className="btn-primary w-full">
                  Kullanıcıları Listele
                </button>
                <button className="btn-secondary w-full">
                  Yeni Kullanıcı Ekle
                </button>
                <button className="btn-secondary w-full">
                  Rolleri Yönet
                </button>
              </div>
            </div>
            
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Sistem Ayarları</h2>
              <div className="space-y-3">
                <button className="btn-primary w-full">
                  Auth0 Ayarları
                </button>
                <button className="btn-secondary w-full">
                  JWT Konfigürasyonu
                </button>
                <button className="btn-secondary w-full">
                  Logları Görüntüle
                </button>
              </div>
            </div>
            
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Güvenlik</h2>
              <div className="space-y-3">
                <button className="btn-primary w-full">
                  Güvenlik Raporu
                </button>
                <button className="btn-secondary w-full">
                  IP Kısıtlamaları
                </button>
                <button className="btn-secondary w-full">
                  Oturum Yönetimi
                </button>
              </div>
            </div>
          </div>
          
          <div className="card mt-6">
            <h2 className="text-xl font-semibold mb-4">Sistem Durumu</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-sm text-green-600">Uptime</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">1.2s</div>
                <div className="text-sm text-blue-600">Ortalama Yanıt</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">24</div>
                <div className="text-sm text-yellow-600">Aktif Kullanıcı</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">0</div>
                <div className="text-sm text-purple-600">Hata</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole={UserRole.ADMIN}>
      <AdminContent />
    </ProtectedRoute>
  )
}
