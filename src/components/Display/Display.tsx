import { FC } from 'react'

import { observer } from 'mobx-react-lite'

import style from './Display.module.scss'

import { BasicTable } from 'components/BasicTable/BasicTable'
import { Loader } from 'components/Loader/Loader'
import { BasicSelect } from 'components/Select/Select'
import appStore from 'store/appStore'

export const Display: FC = observer(() => {
  const { currenciesNames, baseCurrency, setBaseCurrency, isLoading } = appStore

  return (
    <div className={style.main}>
      <BasicSelect
        currency={baseCurrency}
        currenciesNames={currenciesNames}
        setCurrency={setBaseCurrency}
        disabled={isLoading}
      />
      <div className={style.body}>{isLoading ? <Loader /> : <BasicTable />}</div>
    </div>
  )
})
