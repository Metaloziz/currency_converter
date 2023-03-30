import { FC } from 'react'

import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import { getOptionMui } from 'utils/getOptionMui'

type BasicSelectPropsType = {
  currenciesNames: string[]
  setCurrency: (name: string) => void
  currency: string
  disabled: boolean
}

export const BasicSelect: FC<BasicSelectPropsType> = ({
  currency,
  setCurrency,
  currenciesNames,
  disabled,
}) => {
  const items = currenciesNames.map(item => getOptionMui(item, item))

  const handleChange = (event: SelectChangeEvent): void => {
    setCurrency(event.target.value as string)
  }

  // todo baseCurrency as ''
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth disabled={disabled}>
        <InputLabel>Валюта</InputLabel>
        <Select value={currency as ''} label="currency" onChange={handleChange}>
          {items}
        </Select>
      </FormControl>
    </Box>
  )
}
