import { AxiosResponse } from 'axios'

import { instance } from 'services/instance'
import { CurrenciesType } from 'types/currenciesType'

export const apiService = {
  getData: async (date: string, baseCurrency: string) => {
    const { data }: AxiosResponse<CurrenciesType> = await instance.get(date, {
      params: { base: baseCurrency },
    })

    return data
  },
}
