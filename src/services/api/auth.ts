import type { GenericResponse, Result } from 'models'
import type { UserLogin, UserRegister } from 'models/auth.model'
import type { UserWithToken } from 'models/user.model'
import { http } from 'services/http'

export const login = (userData: UserLogin): Result<UserWithToken> =>
  http.post('/login', userData)

export const register = (userData: UserRegister): Result<UserWithToken> =>
  http.post('/register', userData)

export const logout = (): Result<GenericResponse> =>
  http.get('/logout')
