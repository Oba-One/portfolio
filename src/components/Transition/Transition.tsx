import { AnimatePresence, usePresence } from 'framer-motion'
import { useEffect, useRef, useState, type MutableRefObject, type ReactNode } from 'react'

type TransitionStatus = 'entering' | 'entered' | 'exiting' | 'exited'
type TransitionTimeout = number | { enter: number; exit: number }
type TimeoutRef = MutableRefObject<ReturnType<typeof setTimeout> | undefined>

type TransitionProps = {
  children: (visible: boolean, status: TransitionStatus) => ReactNode
  timeout?: TransitionTimeout
  onEnter?: () => void
  onEntered?: () => void
  onExit?: () => void
  onExited?: () => void
  in?: boolean
  unmount?: boolean
}

type TransitionContentProps = Required<
  Pick<TransitionProps, 'children' | 'timeout'>
> &
  Pick<TransitionProps, 'onEnter' | 'onEntered' | 'onExit' | 'onExited'> & {
    enterTimeout: TimeoutRef
    exitTimeout: TimeoutRef
    show?: boolean
  }

/**
 * A Framer Motion AnimatePresence implementation of `react-transition-group`
 * to be used for vanilla css transitions
 */
export const Transition = ({
  children,
  timeout = 0,
  onEnter,
  onEntered,
  onExit,
  onExited,
  in: show,
  unmount,
}: TransitionProps) => {
  const enterTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const exitTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    if (show) {
      clearTimeout(exitTimeout.current)
    } else {
      clearTimeout(enterTimeout.current)
    }
  }, [show])

  return (
    <AnimatePresence>
      {(show || !unmount) && (
        <TransitionContent
          timeout={timeout}
          enterTimeout={enterTimeout}
          exitTimeout={exitTimeout}
          onEnter={onEnter}
          onEntered={onEntered}
          onExit={onExit}
          onExited={onExited}
          show={show}
        >
          {children}
        </TransitionContent>
      )}
    </AnimatePresence>
  )
}

const TransitionContent = ({
  children,
  timeout,
  enterTimeout,
  exitTimeout,
  onEnter,
  onEntered,
  onExit,
  onExited,
  show,
}: TransitionContentProps) => {
  const [status, setStatus] = useState<TransitionStatus>('exited')
  const [isPresent, safeToRemove] = usePresence()
  const [hasEntered, setHasEntered] = useState(false)
  const splitTimeout = typeof timeout === 'object'

  useEffect(() => {
    if (hasEntered || !show) return

    const actualTimeout = splitTimeout ? timeout.enter : timeout

    clearTimeout(enterTimeout.current)
    clearTimeout(exitTimeout.current)

    setHasEntered(true)
    setStatus('entering')
    onEnter?.()

    enterTimeout.current = setTimeout(() => {
      setStatus('entered')
      onEntered?.()
    }, actualTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onEnter, onEntered, timeout, status, show])

  useEffect(() => {
    if (isPresent && show) return

    const actualTimeout = splitTimeout ? timeout.exit : timeout

    clearTimeout(enterTimeout.current)
    clearTimeout(exitTimeout.current)

    setStatus('exiting')
    onExit?.()

    exitTimeout.current = setTimeout(() => {
      setStatus('exited')
      safeToRemove?.()
      onExited?.()
    }, actualTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPresent, onExit, safeToRemove, timeout, onExited, show])

  return <>{children(hasEntered && show ? isPresent : false, status)}</>
}
