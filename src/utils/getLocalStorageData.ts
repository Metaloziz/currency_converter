export const getLocalStorageData = (currentKey: string): any => {
  const result = localStorage.getItem(currentKey)
  if (result) {
    return JSON.parse(result)
  }
}
