import type { KanyeQuote } from 'models/kanye.model'
import { http } from 'services/http'

export const getKanyeQuote = (): Promise<KanyeQuote> =>
  http.get('api.kanye.rest')
