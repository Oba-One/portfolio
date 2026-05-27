import { forwardRef, type ElementType, type ReactNode } from 'react'
import { classes } from 'utils/style'
import styles from './VisuallyHidden.module.css'

type VisuallyHiddenProps = {
  className?: string
  showOnFocus?: boolean
  as?: ElementType
  children?: ReactNode
  visible?: boolean
  [key: string]: unknown
}

export const VisuallyHidden = forwardRef<HTMLElement, VisuallyHiddenProps>(
  (
    { className, showOnFocus, as: Component = 'span', children, visible, ...rest },
    ref
  ) => {
    return (
      <Component
        className={classes(styles.hidden, className)}
        data-hidden={!visible && !showOnFocus}
        data-show-on-focus={showOnFocus}
        ref={ref}
        {...rest}
      >
        {children}
      </Component>
    )
  }
)
