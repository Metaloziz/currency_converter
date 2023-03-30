import { FC } from 'react'

import { CircularProgress } from '@mui/material'
import Box from '@mui/material/Box'

import style from './Loader.module.scss'

export const Loader: FC = () => (
  <Box className={style.main}>
    <CircularProgress size={30} />
  </Box>
)
