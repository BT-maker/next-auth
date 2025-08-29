# Next.js + Auth0 + NextAuth Authentication System

SOLID prensiplerine ve 12 Factor App ilkelerine uygun, Next.js 14 tabanlı kimlik doğrulama ve yetkilendirme sistemi.

## 🚀 Özellikler

- **🔐 Güvenli Kimlik Doğrulama**: Auth0 ile OAuth 2.0 ve JWT tabanlı oturum yönetimi
- **🛡️ Rol Bazlı Yetkilendirme**: Admin ve user rolleri ile sayfa erişim kontrolü
- **⚡ Modern Teknolojiler**: Next.js 14, TypeScript, TailwindCSS
- **🏗️ SOLID Prensipleri**: Temiz kod mimarisi ve sürdürülebilir yapı
- **📋 12 Factor App**: Cloud-native uygulama geliştirme standartları
- **🐳 Docker Desteği**: Containerization ve deployment hazırlığı

## 🛠️ Teknolojiler

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS
- **Authentication**: NextAuth.js, Auth0 OAuth Provider
- **Security**: JWT (JSON Web Tokens), Middleware Protection
- **Development**: ESLint, PostCSS, Autoprefixer
- **Deployment**: Docker, Docker Compose

## 📁 Proje Yapısı

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Auth pages
│   ├── dashboard/         # Protected dashboard
│   ├── admin/             # Admin panel
│   └── unauthorized/      # Access denied page
├── components/            # React components
│   └── auth/             # Auth components
├── lib/                   # Utility libraries
│   └── auth/             # Auth services
└── middleware.ts          # Route protection
```

## 🚀 Kurulum

### 1. Repository Klonlama

```bash
git clone <repository-url>
cd next-auth-project
```

### 2. Bağımlılıkları Yükleme

```bash
npm install
```

### 3. Environment Değişkenleri

`.env.local` dosyasını oluşturun:

```bash
cp env.example .env.local
```

Gerekli değişkenleri doldurun:

```env
# NextAuth Configuration
NEXTAUTH_URL='http://localhost:3000'
NEXTAUTH_SECRET='your-nextauth-secret'

# JWT Configuration
JWT_SECRET='your-jwt-secret'

# Demo Mode (for testing without Auth0)
DEMO_MODE='true'
```

### 4. Demo Mod (Test İçin)

Proje varsayılan olarak demo modda çalışır. Bu modda Auth0 kurulumu gerekmez.

**Demo Kullanıcılar:**
- **Admin:** admin@example.com (şifre: admin123)
- **User:** user@example.com (şifre: user123)
- **John:** john@example.com (şifre: john123)
- **Jane:** jane@example.com (şifre: jane123)

### 5. Auth0 Kurulumu (Gerçek Kullanım İçin)

Auth0 ile gerçek OAuth entegrasyonu için:

1. [Auth0 Dashboard](https://manage.auth0.com/)'a gidin
2. Yeni bir Application oluşturun
3. Application Type: "Single Page Application" seçin
4. Settings'te şu URL'leri ekleyin:
   - **Allowed Callback URLs:** `http://localhost:3000/api/auth/callback/auth0`
   - **Allowed Logout URLs:** `http://localhost:3000`
   - **Allowed Web Origins:** `http://localhost:3000`
   - **Allowed Origins (CORS):** `http://localhost:3000`
5. Client ID ve Client Secret'ı kopyalayın
6. Domain URL'yi not alın
7. `.env.local` dosyasına Auth0 bilgilerini ekleyin
8. `DEMO_MODE='false'` yapın

### 6. Sosyal Medya OAuth Kurulumu (İsteğe Bağlı)

Eğer gerçek sosyal medya girişleri istiyorsanız:

#### Google OAuth
1. [Google Cloud Console](https://console.cloud.google.com/)'a gidin
2. Yeni bir proje oluşturun
3. OAuth 2.0 Client ID oluşturun
4. Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
5. Client ID ve Client Secret'ı `.env.local` dosyasına ekleyin

#### GitHub OAuth
1. [GitHub Developer Settings](https://github.com/settings/developers)'a gidin
2. New OAuth App oluşturun
3. Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Client ID ve Client Secret'ı `.env.local` dosyasına ekleyin

#### Facebook OAuth
1. [Facebook Developers](https://developers.facebook.com/)'a gidin
2. Yeni bir App oluşturun
3. Facebook Login ürününü ekleyin
4. Valid OAuth Redirect URIs: `http://localhost:3000/api/auth/callback/facebook`
5. App ID ve App Secret'ı `.env.local` dosyasına ekleyin

#### Twitter OAuth
1. [Twitter Developer Portal](https://developer.twitter.com/)'a gidin
2. Yeni bir App oluşturun
3. OAuth 2.0 ayarlarını yapılandırın
4. Callback URL: `http://localhost:3000/api/auth/callback/twitter`
5. Client ID ve Client Secret'ı `.env.local` dosyasına ekleyin

### 7. Auth0 Kurulumu (İsteğe Bağlı)

Eğer gerçek Auth0 entegrasyonu istiyorsanız:

1. [Auth0 Dashboard](https://manage.auth0.com/)'a gidin
2. Yeni bir Application oluşturun
3. Application Type: "Single Page Application" seçin
4. Allowed Callback URLs: `http://localhost:3000/api/auth/callback/auth0`
5. Allowed Logout URLs: `http://localhost:3000`
6. Client ID ve Client Secret'ı `.env.local` dosyasına ekleyin
7. `DEMO_MODE='false'` yapın

### 8. Geliştirme Sunucusu

```bash
npm run dev
```

Uygulama `http://localhost:3000` adresinde çalışacaktır.

## 🐳 Docker ile Çalıştırma

### Production

```bash
docker-compose up --build
```

### Development

```bash
docker-compose --profile dev up --build
```

## 📋 SOLID Prensipleri Uygulaması

### 1. Single Responsibility Principle (SRP)
- Her sınıf ve modül tek bir sorumluluğa sahip
- `JWTService`: Sadece JWT işlemleri
- `AuthConfiguration`: Sadece konfigürasyon yönetimi
- `ProtectedRoute`: Sadece route koruması

### 2. Open/Closed Principle (OCP)
- Yeni auth provider'lar kolayca eklenebilir
- Yeni roller genişletilebilir
- Middleware kuralları genişletilebilir

### 3. Liskov Substitution Principle (LSP)
- Auth provider'lar birbirinin yerine geçebilir
- Farklı JWT implementasyonları uyumlu

### 4. Interface Segregation Principle (ISP)
- Küçük, özel amaçlı interface'ler
- `AuthConfig`, `JWTPayload` gibi

### 5. Dependency Inversion Principle (DIP)
- Yüksek seviye modüller düşük seviye detaylara bağımlı değil
- Dependency injection kullanımı

## 📋 12 Factor App Uyumluluğu

### 1. Codebase
- Git repository ile versiyon kontrolü
- Tek codebase, çoklu deployment

### 2. Dependencies
- `package.json` ile bağımlılık yönetimi
- Explicit dependency declaration

### 3. Config
- Environment variables ile konfigürasyon
- `.env.local` dosyası

### 4. Backing Services
- Auth0 external service entegrasyonu
- Stateless service design

### 5. Build, Release, Run
- `npm run build` ile build
- `npm start` ile production run

### 6. Processes
- Stateless process design
- Share-nothing architecture

### 7. Port Binding
- Environment variable ile port binding
- `PORT=3000`

### 8. Concurrency
- Horizontal scaling ready
- Stateless design

### 9. Disposability
- Graceful shutdown support
- Health checks

### 10. Dev/Prod Parity
- Same codebase, same dependencies
- Environment-specific configs

### 11. Logs
- stdout/stderr logging
- Structured logging

### 12. Admin Processes
- npm scripts for admin tasks
- Docker support

## 🔐 Güvenlik Özellikleri

- **JWT Token Validation**: Token doğrulama ve süre kontrolü
- **Role-Based Access Control**: Rol bazlı sayfa erişimi
- **Middleware Protection**: Route seviyesinde koruma
- **Environment Variables**: Hassas bilgilerin güvenli yönetimi
- **HTTPS Ready**: Production için SSL hazırlığı

## 🧪 Test

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build
```

## 📦 Deployment

### Vercel

```bash
npm install -g vercel
vercel
```

### Docker

```bash
docker build -t next-auth-app .
docker run -p 3000:3000 next-auth-app
```

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🆘 Destek

Sorularınız için issue açabilir veya [email@example.com] adresine mail atabilirsiniz.
# next-auth
