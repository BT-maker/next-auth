// Single Responsibility Principle: JWT operations only
import jwt from 'jsonwebtoken'
import { User, UserRole } from './types'
import { AuthConfiguration } from './config'

export interface JWTPayload {
  userId: string
  email: string
  role: UserRole
  iat: number
  exp: number
}

export class JWTService {
  private static instance: JWTService
  private secret: string

  private constructor() {
    this.secret = AuthConfiguration.getInstance().getConfig().jwtSecret
  }

  public static getInstance(): JWTService {
    if (!JWTService.instance) {
      JWTService.instance = new JWTService()
    }
    return JWTService.instance
  }

  public generateToken(user: User): string {
    const payload: Omit<JWTPayload, 'iat' | 'exp'> = {
      userId: user.id,
      email: user.email,
      role: user.role,
    }

    return jwt.sign(payload, this.secret, {
      expiresIn: '24h',
      issuer: 'next-auth-app',
      audience: 'next-auth-app-users',
    })
  }

  public verifyToken(token: string): JWTPayload {
    try {
      const decoded = jwt.verify(token, this.secret, {
        issuer: 'next-auth-app',
        audience: 'next-auth-app-users',
      }) as JWTPayload

      return decoded
    } catch (error) {
      throw new Error('Invalid JWT token')
    }
  }

  public decodeToken(token: string): JWTPayload | null {
    try {
      return jwt.decode(token) as JWTPayload
    } catch (error) {
      return null
    }
  }

  public isTokenExpired(token: string): boolean {
    try {
      const decoded = this.decodeToken(token)
      if (!decoded) return true

      const currentTime = Math.floor(Date.now() / 1000)
      return decoded.exp < currentTime
    } catch (error) {
      return true
    }
  }
}
