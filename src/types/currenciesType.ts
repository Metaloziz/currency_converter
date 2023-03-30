export type RatesType = {
  [key: string]: number
}

export type CurrenciesType = {
  success: boolean
  timestamp: number
  historical: boolean
  base: string
  date: string
  rates: RatesType
}
