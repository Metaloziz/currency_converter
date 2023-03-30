import axios from 'axios'

export const instance = axios.create({
  baseURL: `https://api.currencyapi.com/v3/latest`,
  params: { apikey: process.env.REACT_APP_API_KEY },
})
