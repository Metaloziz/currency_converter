import { FC, useState, ChangeEvent, useEffect } from 'react'

import CachedIcon from '@mui/icons-material/Cached'
import { OutlinedInput, FormControl, InputLabel } from '@mui/material'
import { observer } from 'mobx-react-lite'

import style from './Converter.module.scss'

import { Loader } from 'components/Loader/Loader'
import { PopularCurrencies } from 'components/PopularCurrencies/PopularCurrencies'
import { BasicSelect } from 'components/Select/Select'
import { StorageKey } from 'enums/storageKey'
import appStore from 'store/appStore'
import { getLocalStorageData } from 'utils/getLocalStorageData'
import {
  getNewTargetCurrencyValue,
  defaultTargetCurrencyValue,
} from 'utils/getNewTargetCurrencyValue'
import { setLocalStorageData } from 'utils/setLocalStorageData'

export const Converter: FC = observer(() => {
  const {
    baseCurrency,
    currenciesNames,
    setTargetCurrency,
    getCurrencyCourse,
    targetCurrency,
    setBaseCurrency,
    isLoading,
  } = appStore

  const [baseCurrencyValue, setBaseCurrencyValue] = useState<number | null>(null)

  const [targetCurrencyValue, setTargetCurrencyValue] = useState(
    defaultTargetCurrencyValue,
  )

  const rememberData = (): void => {
    setLocalStorageData(StorageKey.baseCurrencyValue, baseCurrencyValue)
    setLocalStorageData(StorageKey.targetCurrencyValue, targetCurrencyValue)
  }

  useEffect(() => {
    const memoValueBaseCurrency = getLocalStorageData(StorageKey.baseCurrencyValue)
    const memoTargetCurrencyValue = getLocalStorageData(StorageKey.targetCurrencyValue)

    if (memoValueBaseCurrency && memoTargetCurrencyValue) {
      setBaseCurrencyValue(memoValueBaseCurrency)
      setTargetCurrencyValue(memoTargetCurrencyValue)
    }
  }, [])

  useEffect(() => {
    if (!isLoading) {
      const course = getCurrencyCourse(targetCurrency)
      const newValue = getNewTargetCurrencyValue(baseCurrencyValue, course)
      setTargetCurrencyValue(newValue)
    }
  }, [baseCurrencyValue, targetCurrency, isLoading])

  const changeHandle = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value !== '') {
      setBaseCurrencyValue(Number(event.target.value))
      rememberData()
    } else {
      setBaseCurrencyValue(null)
      localStorage.removeItem(StorageKey.baseCurrencyValue)
      localStorage.removeItem(StorageKey.targetCurrencyValue)
    }
  }

  return (
    <div className={style.main}>
      <PopularCurrencies setBaseCurrency={setBaseCurrency} />
      <div className={style.targetCurrency}>
        <BasicSelect
          currency={baseCurrency}
          currenciesNames={currenciesNames}
          setCurrency={setBaseCurrency}
          disabled={isLoading}
        />
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">
            Значение конвертируемой валюты
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            label="Значение конвертируемой валюты"
            type="number"
            onChange={changeHandle}
            value={baseCurrencyValue?.toString()} // .toString() для того чтобы нельзя было ввести так 000123
          />
        </FormControl>
      </div>
      <CachedIcon fontSize="large" color="primary" />

      <div className={style.targetCurrency}>
        <BasicSelect
          currency={targetCurrency}
          currenciesNames={currenciesNames}
          setCurrency={setTargetCurrency}
          disabled={isLoading}
        />
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Итоговое значение</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            label="Итоговое значение"
            type="number"
            startAdornment={isLoading ? <Loader /> : null}
            value={targetCurrencyValue}
            readOnly
            disabled={isLoading}
          />
        </FormControl>
      </div>
      <PopularCurrencies setBaseCurrency={setTargetCurrency} />
    </div>
  )
})
