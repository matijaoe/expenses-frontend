import type { User } from './user.model'

export interface UserLogin {
  email: string
  password: string
}

export type UserRegister = Omit<User, '_id' | 'createdAt' | 'updatedAt'> | { password: string }
