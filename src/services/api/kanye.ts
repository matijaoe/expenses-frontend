import { http } from '../http'
import type { KanyeQuote } from './../../models/index'

enum KayneEndpoint {
  quote = 'https://api.kanye.rest/',
}

export const getKanyeQuote = async(): Promise<KanyeQuote> =>
  await http.get(KayneEndpoint.quote)
