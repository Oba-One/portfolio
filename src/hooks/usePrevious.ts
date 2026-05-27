// @ts-nocheck -- legacy JS migration; remove after adding explicit types.
import { useEffect, useRef } from 'react'

export function usePrevious(value) {
  const ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}
