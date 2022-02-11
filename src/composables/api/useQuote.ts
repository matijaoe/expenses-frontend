import { getKanyeQuote } from 'services/api/kanye'
import { useQuery } from 'vue-query'

export const useQuote = () =>
  useQuery('quote', getKanyeQuote)
