// @ts-nocheck -- legacy JS migration; remove after adding explicit types.
import { AppContext } from 'pages/_app.page'
import { useContext } from 'react'

export function useAppContext() {
  return useContext(AppContext)
}
