
export interface UserWithToken {
  user: User
  token: string
}

export interface User {
  _id: string
  name: string
  email: string
  role: string
  createdAt: string
  updatedAt: string
  __v?: number
}

export type UserUpdate = Partial<User> | { password?: string }
