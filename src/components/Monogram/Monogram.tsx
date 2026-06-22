import { forwardRef, useId, type SVGProps } from 'react'
import { classes } from 'utils/style'
import styles from './Monogram.module.css'

type MonogramProps = SVGProps<SVGSVGElement> & {
  highlight?: boolean
  className?: string
}

export const Monogram = forwardRef<SVGSVGElement, MonogramProps>(
  ({ highlight, className, ...props }, ref) => {
    const id = useId()
    const maskId = `${id}monogram-mask`

    return (
      <svg
        aria-hidden
        className={classes(styles.monogram, className)}
        width="40"
        height="43"
        viewBox="0 0 48 51"
        fill="none"
        ref={ref}
        {...props}
      >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="51">
          <rect width="48" height="51" fill="black" />
          <g fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round">
            <path
              strokeWidth="1.45"
              d="M24 1.2L46.2 49.4H37.5L33.7 40.7H14.3L10.5 49.4H1.8L24 1.2ZM18.2 32.7H29.8L24 19.5L18.2 32.7Z"
            />
            <path
              strokeWidth="1.35"
              d="M24 6.5L41.3 46.1H35.7L32 37.2H16L12.3 46.1H6.7L24 6.5ZM19.7 29.6H28.3L24 19.7L19.7 29.6Z"
            />
            <path
              strokeWidth="1.25"
              d="M24 12L36.3 43H32.6L29.5 34.6H18.5L15.4 43H11.7L24 12ZM21.1 27H26.9L24 19.9L21.1 27Z"
            />
          </g>
        </mask>
      </defs>
      <rect mask={`url(#${maskId})`} width="100%" height="100%" />
      {highlight && (
        <g mask={`url(#${maskId})`}>
          <rect className={styles.highlight} width="100%" height="100%" />
        </g>
      )}
      </svg>
    )
  }
)
