import { FC, useMemo } from 'react'

import { ButtonGroup, Button } from '@mui/material'

import style from './PopularCurrencies.module.scss'

import { popularCurrencies } from 'constants/popularCurrencies'

type PopularCurrenciesPropsType = {
  setBaseCurrency: (name: string) => void
}

export const PopularCurrencies: FC<PopularCurrenciesPropsType> = ({
  setBaseCurrency,
}) => {
  const buttons = useMemo(
    () =>
      popularCurrencies.map(currency => (
        <Button key={currency} onClick={() => setBaseCurrency(currency)}>
          {currency}
        </Button>
      )),
    [],
  )

  return (
    <ButtonGroup size="large" variant="outlined" className={style.main}>
      {buttons}
    </ButtonGroup>
  )
}
