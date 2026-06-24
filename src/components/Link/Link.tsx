import RouterLink from 'next/link'
import { forwardRef, type ElementType, type ReactNode } from 'react'
import { classes } from 'utils/style'
import styles from './Link.module.css'

// File extensions that can be linked to
const VALID_EXT = ['txt', 'png', 'jpg']

type LinkProps = {
  href?: string
  as?: ElementType
  rel?: string
  target?: string
  children?: ReactNode
  secondary?: boolean
  className?: string
  [key: string]: unknown
}

function isAnchor(href?: string) {
  const isValidExtension = VALID_EXT.includes(href?.split('.').pop() ?? '')
  return href?.includes('://') || href?.[0] === '#' || isValidExtension
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ href, ...rest }, ref) => {
  if (isAnchor(href) || !href) {
    return <LinkContent href={href} ref={ref} {...rest} />
  }

  return <LinkContent as={RouterLink} href={href} scroll={false} ref={ref} {...rest} />
})

export const LinkContent = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    { as, rel, target, children, secondary, className, href, ...rest }: LinkProps,
    ref
  ) => {
    const isExternal = href?.includes('://')
    const relValue = rel || (isExternal ? 'noreferrer noopener' : undefined)
    const targetValue = target || (isExternal ? '_blank' : undefined)
    const Component = (as || 'a') as ElementType

    return (
      <Component
        className={classes(styles.link, className)}
        data-secondary={secondary}
        rel={relValue}
        href={href}
        target={targetValue}
        ref={ref}
        {...rest}
      >
        {children}
      </Component>
    )
  }
)
