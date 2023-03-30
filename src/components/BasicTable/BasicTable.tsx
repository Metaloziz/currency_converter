import { FC } from 'react'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { observer } from 'mobx-react-lite'

import style from './BasicTable.module.scss'

import appStore from 'store/appStore'

export type ConvertRateType = { name: string; course: number }

export const BasicTable: FC = observer(() => {
  const { getConvertedRates } = appStore

  const rows = getConvertedRates().map(row => (
    <TableRow key={row.name}>
      <TableCell component="th" scope="row">
        {row.name}
      </TableCell>
      <TableCell align="right">{row.course}</TableCell>
    </TableRow>
  ))

  return (
    <TableContainer className={style.main}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>Валюта</TableCell>
            <TableCell align="right">Курс</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{rows}</TableBody>
      </Table>
    </TableContainer>
  )
})
