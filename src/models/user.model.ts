export interface UserWithToken {
  user: User
  token: string
}

export interface User {
  _id: string
  name: string
  email: string
  role: UserRole
  createdAt: string
  updatedAt: string
  __v?: number
}

export enum UserRole {
  Admin = 'admin',
  User = 'user',
}

export type UserUpdate = Partial<User> | { password?: string }
