import { CurrenciesType } from 'types/currenciesType'

export const initialData: CurrenciesType = {
  success: false,
  timestamp: 0,
  historical: false,
  base: 'USD',
  date: '',
  rates: { USD: 1 },
}
