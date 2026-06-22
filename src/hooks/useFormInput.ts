import { useState, type ChangeEvent, type FocusEvent, type InvalidEvent } from 'react'

export function useFormInput(initialValue = '') {
  const [value, setValue] = useState(initialValue)
  const [error, setError] = useState<string | null>(null)
  const [isDirty, setIsDirty] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(event.target.value)
    setIsDirty(true)

    // Resolve errors as soon as input becomes valid
    if (error && event.target.checkValidity()) {
      setError(null)
    }
  }

  const handleInvalid = (event: InvalidEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Prevent native errors appearing
    event.preventDefault()
    setError(event.target.validationMessage)
  }

  const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Only validate when the user has made a change
    if (isDirty) {
      event.target.checkValidity()
    }
  }

  return {
    value,
    error,
    onChange: handleChange,
    onBlur: handleBlur,
    onInvalid: handleInvalid,
  }
}
