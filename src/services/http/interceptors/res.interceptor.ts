import type { AxiosResponse } from 'axios'
import type { UserWithToken } from 'models/user.model'
import LocalStorageService from 'services/local_storage'

export enum AuthEndpointsEnum {
  login = '/login',
  register = '/register',
  logout = '/logout',
}

export const ResponseAuthInterceptor = (response: AxiosResponse) => {
  const { data, status, config } = response

  const isSuccess = status.toString().startsWith('2')

  const authEndpoints = [AuthEndpointsEnum.login, AuthEndpointsEnum.register]
  const isAuthEndpoint = authEndpoints
    .some(endpoint => config?.url?.match(endpoint))

  if (isSuccess && isAuthEndpoint) {
    const { token, user } = data as UserWithToken
    if (token && user) {
      LocalStorageService.instance.setAccessToken(token)
      LocalStorageService.instance.setUser(user)
    }
  }

  if (isSuccess && config?.url?.match(AuthEndpointsEnum.logout)) {
    LocalStorageService.instance.removeAccessToken()
    LocalStorageService.instance.removeUser()
  }

  return data
}
