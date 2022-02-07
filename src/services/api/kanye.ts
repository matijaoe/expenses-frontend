import { http } from './../http/index'
import type { KanyeQuote } from '~/models/kanye.model'

export const getKanyeQuote = (): Promise<KanyeQuote> =>
  http.get('api.kanye.rest')
