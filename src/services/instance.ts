import axios from 'axios'

export const instance = axios.create({
  baseURL: `https://api.apilayer.com/exchangerates_data/`,
  params: { apikey: process.env.REACT_APP_API_KEY },
})
