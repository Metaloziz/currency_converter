export const setLocalStorageData = (currentKey: string, data: any): void => {
  localStorage.setItem(currentKey, JSON.stringify(data))
}
