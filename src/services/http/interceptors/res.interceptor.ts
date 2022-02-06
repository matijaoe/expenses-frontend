import type { AxiosResponse } from 'axios'

export const ResponseAuthInterceptor = (response: AxiosResponse) => {
//   if (response.status === 200 && response.config.url != null && response.config.url.match(AuthEndpointsEnum.login)) {
//     try {
//       const responseData = response.data as AuthModel;
//       if (responseData != null) {
//         AuthCookieService.instance.setAccessToken(responseData);
//       }
//     } catch (e) {
//       console.error(e);
//     }
//   }
  return response.data
}
