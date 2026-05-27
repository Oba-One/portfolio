import { forwardRef, type ElementType, type ReactNode } from 'react'
import { classes } from 'utils/style'
import styles from './Section.module.css'

type SectionProps = {
  as?: ElementType
  children?: ReactNode
  className?: string
  [key: string]: unknown
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ as: Component = 'div', children, className, ...rest }, ref) => (
    <Component className={classes(styles.section, className)} ref={ref} {...rest}>
      {children}
    </Component>
  )
)
