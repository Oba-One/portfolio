import { Icon } from 'components/Icon'
import { Loader } from 'components/Loader'
import { Transition } from 'components/Transition'
import RouterLink from 'next/link'
import { forwardRef, type ElementType, type ReactNode } from 'react'
import { classes } from 'utils/style'
import styles from './Button.module.scss'

type ButtonProps = {
  href?: string
  className?: string
  as?: ElementType
  secondary?: boolean
  loading?: boolean
  loadingText?: string
  icon?: string
  iconEnd?: string
  iconHoverShift?: boolean
  iconOnly?: boolean
  children?: ReactNode
  rel?: string
  target?: string
  disabled?: boolean
  [key: string]: unknown
}

function isExternalLink(href?: string) {
  return href?.includes('://')
}

export const Button = forwardRef<HTMLElement, ButtonProps>(({ href, ...rest }, ref) => {
  if (isExternalLink(href) || !href) {
    return <ButtonContent href={href} ref={ref} {...rest} />
  }

  return (
    <RouterLink legacyBehavior passHref href={href} scroll={false}>
      <ButtonContent href={href} ref={ref} {...rest} />
    </RouterLink>
  )
})

const ButtonContent = forwardRef<HTMLElement, ButtonProps>(
  (
    {
      className,
      as,
      secondary,
      loading,
      loadingText = 'loading',
      icon,
      iconEnd,
      iconHoverShift,
      iconOnly,
      children,
      rel,
      target,
      href,
      disabled,
      ...rest
    }: ButtonProps,
    ref
  ) => {
    const isExternal = isExternalLink(href)
    const defaultComponent = href ? 'a' : 'button'
    const Component = (as || defaultComponent) as ElementType

    return (
      <Component
        className={classes(styles.button, className)}
        data-loading={loading}
        data-icon-only={iconOnly}
        data-secondary={secondary}
        data-icon={icon}
        href={href}
        rel={rel || isExternal ? 'noopener noreferrer' : undefined}
        target={target || isExternal ? '_blank' : undefined}
        disabled={disabled}
        ref={ref}
        {...rest}
      >
        {!!icon && (
          <Icon
            className={styles.icon}
            data-start={!iconOnly}
            data-shift={iconHoverShift}
            icon={icon}
          />
        )}
        {!!children && <span className={styles.text}>{children}</span>}
        {!!iconEnd && (
          <Icon
            className={styles.icon}
            data-end={!iconOnly}
            data-shift={iconHoverShift}
            icon={iconEnd}
          />
        )}
        <Transition unmount in={loading}>
          {visible => (
            <Loader
              className={styles.loader}
              size={32}
              text={loadingText}
              data-visible={visible}
            />
          )}
        </Transition>
      </Component>
    )
  }
)
