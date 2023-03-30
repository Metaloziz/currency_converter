import { FC, useEffect } from 'react'

import { observer } from 'mobx-react-lite'
import { Route, BrowserRouter, Routes } from 'react-router-dom'

import style from './App.module.scss'

import { Converter } from 'components/Converter/Converter'
import { Display } from 'components/Display/Display'
import { Header } from 'components/Header/Header'
import { AppRoute } from 'constants/appRoute'
import appStore from 'store/appStore'

const App: FC = observer(() => {
  const { getCurrenciesCourse, baseCurrency } = appStore

  useEffect(() => {
    getCurrenciesCourse()
  }, [baseCurrency])

  return (
    <div className={style.App}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={AppRoute.Index.rout} element={<Display />} />
          <Route path={AppRoute.Converter.rout} element={<Converter />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
})

export default App
