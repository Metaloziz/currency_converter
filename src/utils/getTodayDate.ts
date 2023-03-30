export const getTodayDate = (): string => {
  const FIRST_ARRAY_ITEM = 0

  const date = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })

  return date.split(',')[FIRST_ARRAY_ITEM].split('.').reverse().join('-')
}
