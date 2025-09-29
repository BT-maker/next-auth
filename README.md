# 🔐 Next.js + NextAuth.js Authentication System

A multi-authentication and authorization system based on Next.js 14, compliant with SOLID principles and 12 Factor App guidelines.

> **Supports Google, GitHub, Facebook, Twitter, Auth0, and Demo logins**

## 🚀 Features

- **🔐 Secure Authentication**: OAuth 2.0 and JWT-based session management with Auth0
- **🛡️ Role-Based Authorization**: Page access control with admin and user roles
- **⚡ Modern Technologies**: Next.js 14, TypeScript, TailwindCSS
- **🏗️ SOLID Principles**: Clean code architecture and maintainable structure
- **📋 12 Factor App**: Cloud-native application development standards
- **🐳 Docker Support**: Containerization and deployment ready

## 🛠️ Technologies

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS
- **Authentication**: NextAuth.js, Auth0 OAuth Provider
- **Security**: JWT (JSON Web Tokens), Middleware Protection
- **Development**: ESLint, PostCSS, Autoprefixer
- **Deployment**: Docker, Docker Compose

## 📁 Project Structure

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

## 🚀 Installation

### 1. Clone Repository

```bash
git clone <repository-url>
cd next-auth-project
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create `.env.local` file:

```bash
cp env.example .env.local
```

Fill in the required variables:

```env
# NextAuth Configuration
NEXTAUTH_URL='http://localhost:3000'
NEXTAUTH_SECRET='your-nextauth-secret'

# JWT Configuration
JWT_SECRET='your-jwt-secret'

# Demo Mode (for testing without Auth0)
DEMO_MODE='true'
```

### 4. Demo Mode (For Testing)

The project runs in demo mode by default. Auth0 setup is not required in this mode.

**Demo Users:**
- **Admin:** admin@example.com (password: admin123)
- **User:** user@example.com (password: user123)
- **John:** john@example.com (password: john123)
- **Jane:** jane@example.com (password: jane123)

### 5. Auth0 Setup (For Real Usage)

For real OAuth integration with Auth0:

1. Go to [Auth0 Dashboard](https://manage.auth0.com/)
2. Create a new Application
3. Select Application Type: "Single Page Application"
4. Add the following URLs in Settings:
   - **Allowed Callback URLs:** `http://localhost:3000/api/auth/callback/auth0`
   - **Allowed Logout URLs:** `http://localhost:3000`
   - **Allowed Web Origins:** `http://localhost:3000`
   - **Allowed Origins (CORS):** `http://localhost:3000`
5. Copy Client ID and Client Secret
6. Note the Domain URL
7. Add Auth0 information to `.env.local` file

### 6. Logout Feature

The system automatically logs out from Auth0 when logged in with Auth0. This ensures:

- **Token Cleanup**: NextAuth session tokens are cleared
- **Auth0 Logout**: Also logs out from Auth0
- **Prevent Auto Login**: Auth0 will ask for credentials again on the next login attempt

**Logout Process:**
1. User clicks "Logout" button
2. NextAuth session is cleared
3. If logged in with Auth0, redirected to Auth0 logout URL
4. After logging out from Auth0, returns to home page
5. All tokens and session data are cleared
6. Set `DEMO_MODE='false'`

### 7. Social Media OAuth Setup (Optional)

If you want real social media logins:

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Create OAuth 2.0 Client ID
4. Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
5. Add Client ID and Client Secret to `.env.local` file

#### GitHub OAuth
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create New OAuth App
3. Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Add Client ID and Client Secret to `.env.local` file

#### Facebook OAuth
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new App
3. Add Facebook Login product
4. Valid OAuth Redirect URIs: `http://localhost:3000/api/auth/callback/facebook`
5. Add App ID and App Secret to `.env.local` file

#### Twitter OAuth
1. Go to [Twitter Developer Portal](https://developer.twitter.com/)
2. Create a new App
3. Configure OAuth 2.0 settings
4. Callback URL: `http://localhost:3000/api/auth/callback/twitter`
5. Add Client ID and Client Secret to `.env.local` file

### 8. Auth0 Setup (Optional)

If you want real Auth0 integration:

1. Go to [Auth0 Dashboard](https://manage.auth0.com/)
2. Create a new Application
3. Select Application Type: "Single Page Application"
4. Allowed Callback URLs: `http://localhost:3000/api/auth/callback/auth0`
5. Allowed Logout URLs: `http://localhost:3000`
6. Add Client ID and Client Secret to `.env.local` file
7. Set `DEMO_MODE='false'`

### 9. Development Server

```bash
npm run dev
```

The application will run at `http://localhost:3000`.

## 🐳 Running with Docker

### Production

```bash
docker-compose up --build
```

### Development

```bash
docker-compose --profile dev up --build
```

## 📋 SOLID Principles Implementation

### 1. Single Responsibility Principle (SRP)
- Each class and module has a single responsibility
- `JWTService`: Only JWT operations
- `AuthConfiguration`: Only configuration management
- `ProtectedRoute`: Only route protection

### 2. Open/Closed Principle (OCP)
- New auth providers can be easily added
- New roles can be extended
- Middleware rules can be extended

### 3. Liskov Substitution Principle (LSP)
- Auth providers can substitute each other
- Different JWT implementations are compatible

### 4. Interface Segregation Principle (ISP)
- Small, purpose-specific interfaces
- Like `AuthConfig`, `JWTPayload`

### 5. Dependency Inversion Principle (DIP)
- High-level modules are not dependent on low-level details
- Dependency injection usage

## 📋 12 Factor App Compliance

### 1. Codebase
- Version control with Git repository
- One codebase, multiple deployments

### 2. Dependencies
- Dependency management with `package.json`
- Explicit dependency declaration

### 3. Config
- Configuration with environment variables
- `.env.local` file

### 4. Backing Services
- Auth0 external service integration
- Stateless service design

### 5. Build, Release, Run
- Build with `npm run build`
- Production run with `npm start`

### 6. Processes
- Stateless process design
- Share-nothing architecture

### 7. Port Binding
- Port binding with environment variable
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

## 🔐 Security Features

- **JWT Token Validation**: Token validation and expiration control
- **Role-Based Access Control**: Role-based page access
- **Middleware Protection**: Route-level protection
- **Environment Variables**: Secure management of sensitive information
- **HTTPS Ready**: SSL ready for production

## 🧪 Testing

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


