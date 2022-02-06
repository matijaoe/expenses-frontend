import type { AxiosRequestConfig } from 'axios'

export const RequestAuthInterceptor = (config: AxiosRequestConfig) => {
//   if (config != null) {
//     const token = AuthCookieService.instance.getAccessToken()
//     if (token && config.headers != null)
//       config.headers.Authorization = `Bearer ${token}`
//   }
  return config
}
