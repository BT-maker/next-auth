// Single Responsibility Principle: Mock data only
import { User, UserRole } from './types'

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    role: UserRole.ADMIN,
  },
  {
    id: '2',
    email: 'user@example.com',
    name: 'Regular User',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    role: UserRole.USER,
  },
  {
    id: '3',
    email: 'john@example.com',
    name: 'John Doe',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    role: UserRole.USER,
  },
  {
    id: '4',
    email: 'jane@example.com',
    name: 'Jane Smith',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    role: UserRole.ADMIN,
  },
]

export const mockSessions = {
  'admin@example.com': {
    user: mockUsers[0],
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    accessToken: 'mock-admin-token',
  },
  'user@example.com': {
    user: mockUsers[1],
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    accessToken: 'mock-user-token',
  },
  'john@example.com': {
    user: mockUsers[2],
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    accessToken: 'mock-john-token',
  },
  'jane@example.com': {
    user: mockUsers[3],
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    accessToken: 'mock-jane-token',
  },
}

export function findUserByEmail(email: string): User | null {
  return mockUsers.find(user => user.email === email) || null
}

export function findUserById(id: string): User | null {
  return mockUsers.find(user => user.id === id) || null
}
