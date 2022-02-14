import type { AxiosResponse } from 'axios'
import axios from 'axios'
import type { CurrencyRates, ExchangeRateResponse } from 'models/currency.model'
import { Currency } from 'models/currency.model'

export const getExchangeRates = async (
  baseCurrency: Currency = Currency.USD
): Promise<CurrencyRates> => {
  const url = `https://freecurrencyapi.net/api/v2/latest?apikey=${
    import.meta.env.VITE_CURRENCY_API_KEY
  }`

  try {
    const { data }: AxiosResponse<ExchangeRateResponse> = await axios.get(url, {
      params: { base_currency: baseCurrency },
    })
    if (data && data?.data) {
      return data.data
    }
    throw new Error('No data returned from API')
  } catch (err: any) {
    throw new Error(
      err.response.message || err.message || 'Error fetching exchange rates'
    )
  }
}
