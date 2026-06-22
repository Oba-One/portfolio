import type { ElementType, ReactNode } from 'react'
import { classes } from 'utils/style'
import styles from './Text.module.css'

type TextProps = {
  children?: ReactNode
  size?: string
  as?: ElementType
  align?: string
  weight?: string
  secondary?: boolean
  className?: string
  [key: string]: unknown
}

export const Text = ({
  children,
  size = 'm',
  as: Component = 'span',
  align = 'auto',
  weight = 'auto',
  secondary,
  className,
  ...rest
}: TextProps) => {
  return (
    <Component
      className={classes(styles.text, className)}
      data-align={align}
      data-size={size}
      data-weight={weight}
      data-secondary={secondary}
      {...rest}
    >
      {children}
    </Component>
  )
}
