import { Text } from 'components/Text'
import { Link } from 'components/Link'
import { classes } from 'utils/style'
import styles from './Footer.module.css'

export const Footer = ({ className }) => (
  <footer className={classes(styles.footer, className)}>
    <Text size="s" align="center">
      <span className={styles.date}>
        {`© ${new Date().getFullYear()} Afolabi Aiyeloja.`}
      </span>
      <Link href="/help-im-lost">Click for Nostalgia</Link>
    </Text>
  </footer>
)
