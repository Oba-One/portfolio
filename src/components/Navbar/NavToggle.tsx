import type { ComponentPropsWithoutRef } from 'react'
import { Icon } from 'components/Icon'
import { Button } from 'components/Button'

import styles from './NavToggle.module.scss'

type NavToggleProps = ComponentPropsWithoutRef<typeof Button> & {
  menuOpen: boolean
}

export const NavToggle = ({ menuOpen, ...rest }: NavToggleProps) => {
  return (
    <Button
      iconOnly
      className={styles.toggle}
      aria-label="Menu"
      aria-expanded={menuOpen}
      {...rest}
    >
      <div className={styles.inner}>
        <Icon className={styles.icon} data-menu={true} data-open={menuOpen} icon="menu" />
        <Icon
          className={styles.icon}
          data-close={true}
          data-open={menuOpen}
          icon="close"
        />
      </div>
    </Button>
  )
}
