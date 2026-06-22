import { useEffect, useState, type RefObject } from 'react'

export function useInViewport(
  elementRef: RefObject<Element | null>,
  unobserveOnIntersect = false,
  options: IntersectionObserverInit = {},
  shouldObserve = true
) {
  const [intersect, setIntersect] = useState(false)
  const [isUnobserved, setIsUnobserved] = useState(false)

  useEffect(() => {
    if (!elementRef?.current) return

    const observer = new IntersectionObserver(([entry]) => {
      const { isIntersecting, target } = entry

      setIntersect(isIntersecting)

      if (isIntersecting && unobserveOnIntersect) {
        observer.unobserve(target)
        setIsUnobserved(true)
      }
    }, options)

    if (!isUnobserved && shouldObserve) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [elementRef, unobserveOnIntersect, options, isUnobserved, shouldObserve])

  return intersect
}
