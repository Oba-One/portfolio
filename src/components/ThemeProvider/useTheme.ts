import { useContext } from 'react'
import { ThemeContext } from '.'

export function useTheme() {
  const currentTheme = useContext(ThemeContext)

  if (currentTheme === null) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return currentTheme
}
