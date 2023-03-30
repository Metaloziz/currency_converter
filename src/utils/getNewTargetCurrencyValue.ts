export const defaultTargetCurrencyValue = 0

export const getNewTargetCurrencyValue = (
  baseValue: number | null,
  course: number,
): number => {
  if (baseValue === null) return defaultTargetCurrencyValue

  return baseValue * course
}
