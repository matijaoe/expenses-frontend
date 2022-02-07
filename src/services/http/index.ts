import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { RequestAuthInterceptor, ResponseAuthInterceptor } from './interceptors'

type RequestInterceptor = (config: AxiosRequestConfig) => AxiosRequestConfig
type ResponseInterceptor = (response: AxiosResponse) => any

abstract class HttpClientBase {
  protected readonly _axios: AxiosInstance

  protected constructor(config?: AxiosRequestConfig) {
    this._axios = axios.create(config)
  }

  protected registerRequestInterceptor = (requestInterceptor: RequestInterceptor) => {
    this._axios.interceptors.request.use(requestInterceptor, this._handleError)
  }

  protected registerResponseInterceptor = (responseInterceptor: ResponseInterceptor) => {
    this._axios.interceptors.response.use(responseInterceptor, this._handleError)
  }

  protected _handleError = (error: any) => {
    console.error(error)
    return Promise.reject(error)
  }
}

export class HttpClient extends HttpClientBase {
  private static _instance?: HttpClient

  private constructor() {
    super({
      baseURL: 'https://',
    })
    this.registerRequestInterceptor(RequestAuthInterceptor)
    this.registerResponseInterceptor(ResponseAuthInterceptor)
  }

  static get instance(): AxiosInstance {
    if (!this._instance)
      this._instance = new HttpClient()

    return this._instance._axios
  }
}

export const http = HttpClient.instance