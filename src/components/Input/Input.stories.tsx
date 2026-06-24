import { Input } from 'components/Input'
import { useFormInput } from 'hooks'
import type { ComponentPropsWithoutRef } from 'react'

export default {
  title: 'Input',
}

type InputStory = ((args: ComponentPropsWithoutRef<typeof Input>) => JSX.Element) & {
  args?: ComponentPropsWithoutRef<typeof Input>
}

const Story: InputStory = args => {
  const exampleValue = useFormInput('')
  return (
    <div style={{ maxWidth: 400, width: '100%', padding: 30 }}>
      <Input {...exampleValue} {...args} />
    </div>
  )
}

export const Text = Story.bind({})

Text.args = {
  label: 'Your name',
  type: 'text',
}

export const Multiline = Story.bind({})

Multiline.args = {
  label: 'Type a message',
  type: 'text',
  multiline: true,
}
