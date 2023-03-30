import { FC, useEffect } from 'react'

import { observer } from 'mobx-react-lite'
import { Route, Routes, HashRouter } from 'react-router-dom'

import style from './App.module.scss'

import { Converter } from 'components/Converter/Converter'
import { Description } from 'components/Descriptoon/Description'
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
      <HashRouter>
        <Header />
        <Routes>
          <Route path={AppRoute.Index.rout} element={<Display />} />
          <Route path={AppRoute.Converter.rout} element={<Converter />} />
        </Routes>
        <Description />
      </HashRouter>
    </div>
  )
})

export default App
