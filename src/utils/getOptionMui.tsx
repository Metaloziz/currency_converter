import { ReactNode } from 'react'

import MenuItem from '@mui/material/MenuItem'

export const getOptionMui = (value: string, label: string): ReactNode => (
  <MenuItem key={value} value={value}>
    {label}
  </MenuItem>
)
