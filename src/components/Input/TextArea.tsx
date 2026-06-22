import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type TextareaHTMLAttributes,
} from 'react'
import { classes, cssProps } from 'utils/style'
import styles from './TextArea.module.css'

type TextAreaDimensions = {
  lineHeight: number
  paddingHeight: number
}

type TextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> & {
  className?: string
  resize?: string
  value?: string
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void
  minRows?: number
  maxRows?: number
}

export const TextArea = ({
  className,
  resize = 'none',
  value,
  onChange,
  minRows = 1,
  maxRows,
  ...rest
}: TextAreaProps) => {
  const [rows, setRows] = useState(minRows)
  const [textareaDimensions, setTextareaDimensions] =
    useState<TextAreaDimensions | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    if (!textareaRef.current) return

    const style = getComputedStyle(textareaRef.current)
    const lineHeight = parseInt(style.lineHeight, 10)
    const paddingHeight =
      parseInt(style.paddingTop, 10) + parseInt(style.paddingBottom, 10)
    setTextareaDimensions({ lineHeight, paddingHeight })
  }, [])

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(event)

    if (!textareaDimensions) return

    const { lineHeight, paddingHeight } = textareaDimensions
    const previousRows = event.target.rows
    event.target.rows = minRows

    const currentRows = ~~((event.target.scrollHeight - paddingHeight) / lineHeight)

    if (currentRows === previousRows) {
      event.target.rows = currentRows
    }

    if (maxRows && currentRows >= maxRows) {
      event.target.rows = maxRows
      event.target.scrollTop = event.target.scrollHeight
    }

    setRows(maxRows && currentRows > maxRows ? maxRows : currentRows)
  }

  return (
    <textarea
      className={classes(styles.textarea, className)}
      ref={textareaRef}
      onChange={handleChange}
      style={cssProps({ resize })}
      rows={rows}
      value={value}
      {...rest}
    />
  )
}
