import type { User, UserUpdate } from 'models/user.model'
import { http } from 'services/http'

// Current user
export const getCurrentUser = (): Promise<User> => http.get('/users/me')

export const updateCurrentUser = (userData: UserUpdate): Promise<User> =>
  http.patch('/users/me', userData)

export const deleteCurrentUser = (): Promise<User> => http.delete('/users/me')

// All users (ADMIN ONLY)
export const getUser = (id: string): Promise<User> => http.get(`/users/${id}`)

export const getUsers = (): Promise<User[]> => http.get('/users')

export const createUser = (userData: User): Promise<User> =>
  http.post('/users', userData)

export const updateUser = (id: string, userData: UserUpdate): Promise<User> =>
  http.patch(`/users/${id}`, userData)

export const deleteUser = (id: string): Promise<User> =>
  http.delete(`/users/${id}`)
