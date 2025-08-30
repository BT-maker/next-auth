// Single Responsibility Principle: Configuration management only
import { AuthConfig } from './types'

export class AuthConfiguration {
  private static instance: AuthConfiguration
  private config: AuthConfig

  private constructor() {
    const isDemoMode = process.env.DEMO_MODE === 'true'
    
    this.config = {
      auth0Secret: isDemoMode 
        ? 'demo-auth0-secret-key-2024'
        : (process.env.AUTH0_SECRET || 'demo-auth0-secret-key-2024'),
      auth0BaseUrl: isDemoMode
        ? 'http://localhost:3000'
        : (process.env.AUTH0_BASE_URL || 'http://localhost:3000'),
      auth0IssuerBaseUrl: isDemoMode
        ? 'https://demo.auth0.com'
        : (process.env.AUTH0_ISSUER_BASE_URL || 'https://dev-3b6re7yppgza2cuq.us.auth0.com'),
      auth0ClientId: isDemoMode
        ? 'demo-client-id'
        : (process.env.AUTH0_CLIENT_ID || 'G5x8R9RdkjhtYWPvFLXuAB9ZmGjli67e'),
      auth0ClientSecret: isDemoMode
        ? 'demo-client-secret'
        : (process.env.AUTH0_CLIENT_SECRET || 'yyb-b13PFT323qCweF0b5loU52161kAgoANlaa vyz 1mFWWos V3UoDygkhKUQe3OM'),
      nextAuthSecret: process.env.NEXTAUTH_SECRET || 'demo-nextauth-secret-key-2024',
      jwtSecret: process.env.JWT_SECRET || 'demo-jwt-secret-key-2024',
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

  public getOptionalEnvVar(key: string, defaultValue: string = ''): string {
    return process.env[key] || defaultValue
  }
}
