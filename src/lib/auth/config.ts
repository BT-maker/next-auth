// Single Responsibility Principle: Configuration management only
import { AuthConfig } from './types'

export class AuthConfiguration {
  private static instance: AuthConfiguration
  private config: AuthConfig

  private constructor() {
    const isDemoMode = process.env.DEMO_MODE === 'true'
    
    this.config = {
      auth0Secret: isDemoMode 
        ? this.getOptionalEnvVar('AUTH0_SECRET', 'demo-secret')
        : this.getOptionalEnvVar('AUTH0_SECRET', 'demo-secret'),
      auth0BaseUrl: isDemoMode
        ? this.getOptionalEnvVar('AUTH0_BASE_URL', 'http://localhost:3000')
        : this.getRequiredEnvVar('AUTH0_BASE_URL'),
      auth0IssuerBaseUrl: isDemoMode
        ? this.getOptionalEnvVar('AUTH0_ISSUER_BASE_URL', 'https://demo.auth0.com')
        : this.getRequiredEnvVar('AUTH0_ISSUER_BASE_URL'),
      auth0ClientId: isDemoMode
        ? this.getOptionalEnvVar('AUTH0_CLIENT_ID', 'demo-client-id')
        : this.getRequiredEnvVar('AUTH0_CLIENT_ID'),
      auth0ClientSecret: isDemoMode
        ? this.getOptionalEnvVar('AUTH0_CLIENT_SECRET', 'demo-client-secret')
        : this.getRequiredEnvVar('AUTH0_CLIENT_SECRET'),
      nextAuthSecret: this.getRequiredEnvVar('NEXTAUTH_SECRET'),
      jwtSecret: this.getRequiredEnvVar('JWT_SECRET'),
    }
  }

  // Singleton pattern for configuration
  public static getInstance(): AuthConfiguration {
    if (!AuthConfiguration.instance) {
      AuthConfiguration.instance = new AuthConfiguration()
    }
    return AuthConfiguration.instance
  }

  public getConfig(): AuthConfig {
    return this.config
  }

  private getRequiredEnvVar(key: string): string {
    const value = process.env[key]
    if (!value) {
      throw new Error(`Missing required environment variable: ${key}`)
    }
    return value
  }

  public getOptionalEnvVar(key: string, defaultValue: string = ''): string {
    return process.env[key] || defaultValue
  }
}
