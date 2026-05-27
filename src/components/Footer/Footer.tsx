import { Text } from 'components/Text'
import { Link } from 'components/Link'
import { classes } from 'utils/style'
import styles from './Footer.module.css'

type FooterProps = {
  className?: string
}

export const Footer = ({ className }: FooterProps) => (
  <footer className={classes(styles.footer, className)}>
    <Text size="s" align="center">
      <span className={styles.date}>
        {`© ${new Date().getFullYear()} Afolabi Aiyeloja.`}
      </span>
      <Link href="/help-im-lost">Enter Nostalgia Pit</Link>
    </Text>
  </footer>
)
