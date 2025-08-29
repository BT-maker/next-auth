// Single Responsibility Principle: Auth types only
export interface User {
  id: string
  email: string
  name: string
  image?: string
  role: UserRole
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

export interface AuthSession {
  user: User
  expires: string
  accessToken: string
}

export interface AuthError {
  message: string
  code: string
}

export interface AuthConfig {
  auth0Secret: string
  auth0BaseUrl: string
  auth0IssuerBaseUrl: string
  auth0ClientId: string
  auth0ClientSecret: string
  nextAuthSecret: string
  jwtSecret: string
}
