// @ts-nocheck -- legacy JS migration; remove after adding explicit types.
import { useContext } from 'react'
import { ThemeContext } from '.'

export function useTheme() {
  const currentTheme = useContext(ThemeContext)
  return currentTheme
}
