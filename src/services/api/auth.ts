import type { GenericResponse } from 'models'
import type { UserLogin, UserRegister } from 'models/auth.model'
import type { UserWithToken } from 'models/user.model'
import { http } from 'services/http'

export const login = (credentials: UserLogin): Promise<UserWithToken> =>
  http.post('/login', credentials)

export const register = (userData: UserRegister): Promise<UserWithToken> =>
  http.post('/register', userData)

export const logout = (): Promise<GenericResponse> =>
  http.get('/logout')
