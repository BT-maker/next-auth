// Single Responsibility Principle: Demo data only
import { UserRole } from './types'

export const demoCredentials = [
  { email: 'admin@example.com', password: 'admin123', role: UserRole.ADMIN },
  { email: 'user@example.com', password: 'user123', role: UserRole.USER },
  { email: 'john@example.com', password: 'john123', role: UserRole.USER },
  { email: 'jane@example.com', password: 'jane123', role: UserRole.ADMIN },
]
