import { AxiosResponse } from 'axios'

import { instance } from 'services/instance'
import { CurrenciesType } from 'types/currenciesType'

export const apiService = {
  getData: async (baseCurrency: string) => {
    const { data }: AxiosResponse<CurrenciesType> = await instance.get('', {
      params: { base_currency: baseCurrency },
    })

    return data
  },
}
