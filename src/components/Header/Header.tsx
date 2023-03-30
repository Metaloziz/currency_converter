import { FC, useState, SyntheticEvent, useEffect } from 'react'

import AssignmentIcon from '@mui/icons-material/Assignment'
import BalanceIcon from '@mui/icons-material/Balance'
import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'

import style from './Header.module.scss'

import { AppRoute } from 'constants/appRoute'

export const Header: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [value, setValue] = useState(AppRoute.Index.value)

  useEffect(() => {
    // чтобы при перезагрузке страницы конвертации, оставалась активная иконка
    if (location.pathname === AppRoute.Converter.rout) {
      setValue(AppRoute.Converter.value)
    }
  }, [])

  const setPage = (event: SyntheticEvent, newValue: number): void => {
    setValue(newValue)
    if (newValue === AppRoute.Index.value) {
      navigate(AppRoute.Index.rout)
    } else {
      navigate(AppRoute.Converter.rout)
    }
  }

  return (
    <BottomNavigation showLabels value={value} className={style.main} onChange={setPage}>
      <BottomNavigationAction label="Курсы валют" icon={<AssignmentIcon />} />
      <BottomNavigationAction label="Конвертер" icon={<BalanceIcon />} />
    </BottomNavigation>
  )
}
