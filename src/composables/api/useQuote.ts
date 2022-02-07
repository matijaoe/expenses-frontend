import { useQuery } from 'vue-query'
import { getKanyeQuote } from '../../services/api/kanye'

export const useQuote = () =>
  useQuery('quote', getKanyeQuote)
