import { useState } from 'react'

type SetStoredValue<T> = T | ((currentValue: T | undefined) => T)

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T | undefined, (value: SetStoredValue<T>) => void] {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') return

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const setValue = (value: SetStoredValue<T>) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue]
}
