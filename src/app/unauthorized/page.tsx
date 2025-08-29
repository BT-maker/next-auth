import Link from 'next/link'

export default function UnauthorizedPage() {
  return (
    <div className="bg-gray-50 flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="max-w-md mx-auto text-center">
        <div className="card">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Erişim Reddedildi
          </h1>
          <p className="text-gray-600 mb-6">
            Bu sayfaya erişim yetkiniz bulunmamaktadır. Lütfen gerekli yetkilere sahip bir hesapla giriş yapın.
          </p>
          
          <div className="space-y-3">
            <Link href="/" className="btn-primary w-full block">
              Ana Sayfaya Dön
            </Link>
            <Link href="/dashboard" className="btn-secondary w-full block">
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
