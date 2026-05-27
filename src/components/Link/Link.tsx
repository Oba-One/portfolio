import RouterLink from 'next/link'
import { forwardRef, type ReactNode } from 'react'
import { classes } from 'utils/style'
import styles from './Link.module.css'

// File extensions that can be linked to
const VALID_EXT = ['txt', 'png', 'jpg']

type LinkProps = {
  href?: string
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

  return (
    <RouterLink legacyBehavior passHref href={href} scroll={false}>
      <LinkContent ref={ref} {...rest} />
    </RouterLink>
  )
})

export const LinkContent = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ rel, target, children, secondary, className, href, ...rest }: LinkProps, ref) => {
    const isExternal = href?.includes('://')
    const relValue = rel || (isExternal ? 'noreferrer noopener' : undefined)
    const targetValue = target || (isExternal ? '_blank' : undefined)

    return (
      <a
        className={classes(styles.link, className)}
        data-secondary={secondary}
        rel={relValue}
        href={href}
        target={targetValue}
        ref={ref}
        {...rest}
      >
        {children}
      </a>
    )
  }
)
