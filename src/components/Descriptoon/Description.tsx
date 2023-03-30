import { FC } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { NavLink } from 'react-router-dom'

import style from './Description.module.scss'

export const Description: FC = () => (
  <Card className={style.main}>
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        Описание:
      </Typography>
      <div className={style.body}>
        <div>
          <b>Тестовое</b> для: ООО АлгоБрейнз Сольюшнз
        </div>
        <div>
          <b>Тема</b>: конвертер валют
        </div>
        <div>
          <b>Стек</b>: React, Type Script, MobX, MUI, axios, react-router-dom
        </div>
        <div>
          <b>Особенности:</b>
          <div>
            1) Используется только один запрос для выбора базовой валюты. Расчёт курса
            происходит в приложение, чтобы не использовать лишний раз сервер (хотя API
            позволяет).
          </div>
          <div>2) Используются форматоры кода</div>
        </div>
        <div>
          <b>Что не сделано:</b>
          <div>
            1) не написаны тесты. Так как столкнулся с проблемой что в Jest нельзя
            импортировать экземпляр класса который использует внутри себя что-то
            импортируемое (в частности в классе есть метод, который использует библиотеку
            axios).
          </div>
          <div>
            2) не убрана ошибка в консоли по поводу неконтролируемого инпута (Итоговое
            значение).
          </div>
        </div>
        <div>
          <b>Ссылка: </b>
          <NavLink to="https://github.com/Metaloziz/currency_converter" title="GitHub">
            GitHub
          </NavLink>
        </div>
        <div>
          <b>Выполнил: </b> Гайтюкевич А.В.
          <NavLink
            to="https://hh.ru/resume/0a4b0dcaff0bb219880039ed1f734530536158"
            title="CV"
          >
            CV
          </NavLink>
        </div>
      </div>
    </CardContent>
  </Card>
)
