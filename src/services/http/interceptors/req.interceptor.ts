import type { AxiosRequestConfig } from 'axios'
import LocalStorageService from 'services/local_storage'

export const RequestAuthInterceptor = (config: AxiosRequestConfig) => {
  if (config != null) {
    const token = LocalStorageService.instance.getAccessToken()
    if (token && config.headers != null)
      config.headers.Authorization = `Bearer ${token}`
  }

  return config
}
