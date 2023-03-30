import { makeAutoObservable, runInAction } from 'mobx'

import { ConvertRateType } from 'components/BasicTable/BasicTable'
import { apiService } from 'services/appService'
import { initialData } from 'store/initialData/initialData'
import { CurrenciesType, RatesType } from 'types/currenciesType'
import { getTodayDate } from 'utils/getTodayDate'

class AppStore {
  data: CurrenciesType = initialData

  currenciesNames: string[] = ['USD']

  date: string = getTodayDate()

  baseCurrency: string = 'USD'

  targetCurrency: string = 'EUR'

  isLoading = false

  constructor() {
    makeAutoObservable(this)
  }

  execute = async <T>(action: () => Promise<T>): Promise<T | void> => {
    try {
      runInAction(() => {
        this.isLoading = true
      })

      return await action()
    } catch (event: unknown) {
      console.warn(event)
    } finally {
      runInAction(() => {
        this.isLoading = false
      })
    }
  }

  getCurrenciesCourse = (): void => {
    this.execute(async () => {
      const response = await apiService.getData(this.date, this.baseCurrency)

      await runInAction(() => {
        if (response.success) {
          this.data = response
        }

        if (this.baseCurrency !== response.base) {
          this.baseCurrency = response.base
        }

        this.setCurrenciesNames()
      })
    })
  }

  getRates = (): RatesType => this.data.rates

  setCurrenciesNames = (): void => {
    this.currenciesNames = Object.keys(this.getRates())
  }

  setBaseCurrency = (name: string): void => {
    this.baseCurrency = name
  }

  setTargetCurrency = (name: string): void => {
    this.targetCurrency = name
  }

  getCurrencyCourse = (name: string): number => this.data.rates[name]

  getConvertedRates = (): ConvertRateType[] => {
    const rates = this.getRates()

    return Object.keys(rates).map(item => ({
      name: item,
      course: rates[item],
    }))
  }
}

export default new AppStore()
