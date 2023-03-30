import { FC, useState, ChangeEvent, useEffect } from 'react'

import { OutlinedInput, FormControl, InputLabel } from '@mui/material'
import { observer } from 'mobx-react-lite'

import style from './Converter.module.scss'

import { Loader } from 'components/Loader/Loader'
import { BasicSelect } from 'components/Select/Select'
import { LocalStorageKey } from 'enums/localStorageKey'
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

  useEffect(() => {
    const memoValueBaseCurrency = getLocalStorageData(LocalStorageKey.baseCurrencyValue)
    const memoTargetCurrencyValue = getLocalStorageData(
      LocalStorageKey.targetCurrencyValue,
    )

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
      setLocalStorageData(LocalStorageKey.baseCurrencyValue, baseCurrencyValue)
      setLocalStorageData(LocalStorageKey.targetCurrencyValue, targetCurrencyValue)
    }
  }, [baseCurrencyValue, targetCurrency, isLoading])

  const changeHandle = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value !== '') {
      setBaseCurrencyValue(Number(event.target.value))
    } else {
      setBaseCurrencyValue(null)
    }
  }

  return (
    <div className={style.main}>
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
    </div>
  )
})
