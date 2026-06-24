import { Icon } from 'components/Icon'
import { tokens } from 'components/ThemeProvider/theme'
import { Transition } from 'components/Transition'
import {
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type FocusEvent,
  type InputHTMLAttributes,
  type InvalidEvent,
  type ReactNode,
} from 'react'
import { classes, cssProps, msToNum } from 'utils/style'
import styles from './Input.module.css'
import { TextArea } from './TextArea'

type FieldEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
type FieldFocusEvent = FocusEvent<HTMLInputElement | HTMLTextAreaElement>
type FieldInvalidEvent = InvalidEvent<HTMLInputElement | HTMLTextAreaElement>

type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'onBlur' | 'onInvalid'
> & {
  id?: string
  label?: ReactNode
  value?: string
  multiline?: boolean
  className?: string
  style?: CSSProperties
  error?: ReactNode
  onBlur?: (event: FieldFocusEvent) => void
  onChange?: (event: FieldEvent) => void
  onInvalid?: (event: FieldInvalidEvent) => void
}

export const Input = ({
  id,
  label,
  value,
  multiline,
  className,
  style,
  error,
  onBlur,
  autoComplete,
  name,
  required,
  maxLength,
  type,
  onChange,
  onInvalid,
  ...rest
}: InputProps) => {
  const [focused, setFocused] = useState(false)
  const generatedId = useId()
  const errorRef = useRef<HTMLDivElement | null>(null)
  const inputId = id || `${generatedId}input`
  const labelId = `${inputId}-label`
  const errorId = `${inputId}-error`
  const InputElement = multiline ? TextArea : 'input'

  const handleBlur = (event: FieldFocusEvent) => {
    setFocused(false)

    if (onBlur) {
      onBlur(event)
    }
  }

  return (
    <div
      className={classes(styles.container, className)}
      data-error={!!error}
      style={style}
      {...rest}
    >
      <div className={styles.content}>
        <label
          className={styles.label}
          data-focused={focused}
          data-filled={!!value}
          id={labelId}
          htmlFor={inputId}
        >
          {label}
        </label>
        <InputElement
          className={styles.input}
          id={inputId}
          aria-labelledby={labelId}
          aria-describedby={error ? errorId : undefined}
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          name={name}
          required={required}
          maxLength={maxLength}
          type={type}
          onInvalid={onInvalid as never}
        />
        <div className={styles.underline} data-focused={focused} />
      </div>
      <Transition unmount in={Boolean(error)} timeout={msToNum(tokens.base.durationM)}>
        {visible => (
          <div
            className={styles.error}
            data-visible={visible}
            id={errorId}
            role="alert"
            style={cssProps({
              height: visible ? errorRef.current?.getBoundingClientRect().height : 0,
            })}
          >
            <div className={styles.errorMessage} ref={errorRef}>
              <Icon icon="error" />
              {error}
            </div>
          </div>
        )}
      </Transition>
    </div>
  )
}
