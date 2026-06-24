type ThemeId = 'dark' | 'light'

export const initialState = {
  theme: 'dark' as ThemeId,
  menuOpen: false,
}

export type AppState = typeof initialState

export type AppAction =
  | { type: 'setTheme'; value: ThemeId }
  | { type: 'toggleTheme' }
  | { type: 'toggleMenu' }

export function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'setTheme':
      return { ...state, theme: action.value }
    case 'toggleTheme': {
      const newThemeId = state.theme === 'dark' ? 'light' : 'dark'
      return { ...state, theme: newThemeId }
    }
    case 'toggleMenu':
      return { ...state, menuOpen: !state.menuOpen }
    default:
      throw new Error('Unknown app action')
  }
}
