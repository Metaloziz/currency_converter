export type CurrencyType = { code: string; value: number }

export type RatesType = {
  [key: string]: CurrencyType
}

export type CurrenciesType = {
  meta: {
    last_updated_at: string
  }
  data: RatesType
}
